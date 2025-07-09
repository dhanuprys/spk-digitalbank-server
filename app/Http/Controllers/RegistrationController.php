<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\EventYear;
use App\Models\Participant;
use App\Models\ParticipantSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function index()
    {
        $eventYears = EventYear::where('show_start', '<=', now())
            ->where('show_end', '>=', now())
            ->orderBy('registration_start')
            ->get();

        $categories = Category::where('is_active', true)->get();

        return Inertia::render('registration', [
            'eventYears' => $eventYears,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'team_name' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'company' => 'required|string|max:100',
            'category_id' => 'required|exists:categories,id',
            'leader_name' => 'required|string|max:100',
            'leader_email' => 'required|email|max:100',
            'leader_whatsapp' => 'required|string|max:20',
            'student_card_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'payment_evidence_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // Get the active event year
        $activeEventYear = EventYear::where('show_start', '<=', now())
            ->where('show_end', '>=', now())
            ->where('registration_start', '<=', now())
            ->where('registration_end', '>=', now())
            ->orderBy('registration_start')
            ->first();

        if (!$activeEventYear) {
            return back()->withErrors(['general' => 'Tidak ada event yang sedang berlangsung']);
        }

        // Generate unique PIN
        do {
            $pin = mt_rand(100000, 999999);
        } while (Participant::where('pin', $pin)->exists());

        // Handle file uploads
        $studentCardPath = $request->file('student_card_file')->store('student-cards', 'public');
        $paymentEvidencePath = $request->file('payment_evidence_file')->store('payment-evidence', 'public');

        $participant = Participant::create([
            'event_year_id' => $activeEventYear->id,
            'pin' => $pin,
            'team_name' => $validated['team_name'],
            'city' => $validated['city'],
            'company' => $validated['company'],
            'category_id' => $validated['category_id'],
            'leader_name' => $validated['leader_name'],
            'leader_email' => $validated['leader_email'],
            'leader_whatsapp' => $validated['leader_whatsapp'],
            'student_card_file' => $studentCardPath,
            'payment_evidence_file' => $paymentEvidencePath,
        ]);

        // Create session for the new participant
        $session = ParticipantSession::createSession(
            $participant,
            $request->ip(),
            $request->userAgent()
        );

        return redirect()->route('registration.success', ['token' => $session->token]);
    }

    public function success(Request $request)
    {
        $token = $request->query('token');
        $session = ParticipantSession::findByToken($token);

        if (!$session) {
            return redirect()->route('status.index')
                ->withErrors(['session' => 'Sesi telah berakhir atau tidak valid. Silakan masukkan PIN untuk melihat status.']);
        }

        // Update last accessed time
        $session->updateLastAccessed();

        $participant = $session->participant->load(['eventYear', 'category', 'verifiedBy', 'films']);

        return Inertia::render('registration-success', [
            'participant' => $participant,
            'session' => [
                'token' => $session->token,
                'expires_at' => $session->expires_at,
                'last_accessed_at' => $session->last_accessed_at,
            ],
        ]);
    }

    public function download(Request $request, $pin, $type)
    {
        $participant = Participant::where('pin', $pin)->first();

        if (!$participant) {
            abort(404);
        }

        $filePath = null;
        $filename = '';

        switch ($type) {
            case 'student-card':
                $filePath = $participant->student_card_file;
                $filename = 'student-card-' . $participant->team_name . '.' . pathinfo($filePath, PATHINFO_EXTENSION);
                break;
            case 'payment-evidence':
                $filePath = $participant->payment_evidence_file;
                $filename = 'payment-evidence-' . $participant->team_name . '.' . pathinfo($filePath, PATHINFO_EXTENSION);
                break;
            default:
                abort(404);
        }

        if (!$filePath || !file_exists(storage_path('app/public/' . $filePath))) {
            abort(404);
        }

        return response()->download(storage_path('app/public/' . $filePath), $filename);
    }
}
