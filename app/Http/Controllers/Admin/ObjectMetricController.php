<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ObjectMetric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ObjectMetricController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ObjectMetric::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        $objectMetrics = $query->latest()->paginate(10);

        return Inertia::render('admin/object-metrics/Index', [
            'objectMetrics' => $objectMetrics,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/object-metrics/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',

            // Level 2 Criteria Group 1
            'l2_cg1_a' => 'required|integer',
            'l2_cg1_b' => 'required|integer',
            'l2_cg1_c' => 'required|integer',
            'l2_cg1_d' => 'required|integer',
            'l2_cg1_e' => 'required|integer',

            // Level 2 Criteria Group 2
            'l2_cg2_a' => 'required|integer',
            'l2_cg2_b' => 'required|integer',
            'l2_cg2_c' => 'required|integer',
            'l2_cg2_d' => 'required|integer',

            // Level 2 Criteria Group 3
            'l2_cg3_a' => 'required|integer',
            'l2_cg3_b' => 'required|integer',
            'l2_cg3_c' => 'required|integer',
            'l2_cg3_d' => 'required|integer',
            'l2_cg3_e' => 'required|integer',
        ]);

        ObjectMetric::create($validated);

        return redirect()->route('admin.object-metrics.index')
            ->with('success', 'Metrik berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ObjectMetric $objectMetric)
    {
        return Inertia::render('admin/object-metrics/Show', [
            'objectMetric' => $objectMetric,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ObjectMetric $objectMetric)
    {
        return Inertia::render('admin/object-metrics/Edit', [
            'objectMetric' => $objectMetric,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ObjectMetric $objectMetric)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',

            // Level 2 Criteria Group 1
            'l2_cg1_a' => 'required|integer',
            'l2_cg1_b' => 'required|integer',
            'l2_cg1_c' => 'required|integer',
            'l2_cg1_d' => 'required|integer',
            'l2_cg1_e' => 'required|integer',

            // Level 2 Criteria Group 2
            'l2_cg2_a' => 'required|integer',
            'l2_cg2_b' => 'required|integer',
            'l2_cg2_c' => 'required|integer',
            'l2_cg2_d' => 'required|integer',

            // Level 2 Criteria Group 3
            'l2_cg3_a' => 'required|integer',
            'l2_cg3_b' => 'required|integer',
            'l2_cg3_c' => 'required|integer',
            'l2_cg3_d' => 'required|integer',
            'l2_cg3_e' => 'required|integer',
        ]);

        $objectMetric->update($validated);

        return redirect()->route('admin.object-metrics.index')
            ->with('success', 'Metrik berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ObjectMetric $objectMetric)
    {
        $objectMetric->delete();

        return redirect()->route('admin.object-metrics.index')
            ->with('success', 'Metrik berhasil dihapus.');
    }

    /**
     * Delete multiple object metrics
     */
    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:object_metrics,id'
        ]);

        ObjectMetric::whereIn('id', $request->ids)->delete();

        return redirect()->route('admin.object-metrics.index')
            ->with('success', 'Metrik yang dipilih berhasil dihapus.');
    }

    /**
     * Import object metrics from CSV
     */
    public function import(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt|max:2048'
        ]);

        try {
            DB::beginTransaction();

            $file = $request->file('csv_file');
            $handle = fopen($file->getPathname(), 'r');

            // Skip header row
            $header = fgetcsv($handle);

            $imported = 0;
            while (($data = fgetcsv($handle)) !== false) {
                if (count($data) >= 16) { // Ensure we have enough columns
                    ObjectMetric::create([
                        'name' => $data[1] ?? '',

                        // Level 2 Criteria Group 1
                        'l2_cg1_a' => $data[2] ? (int) $data[2] : 0,
                        'l2_cg1_b' => $data[3] ? (int) $data[3] : 0,
                        'l2_cg1_c' => $data[4] ? (int) $data[4] : 0,
                        'l2_cg1_d' => $data[5] ? (int) $data[5] : 0,
                        'l2_cg1_e' => $data[6] ? (int) $data[6] : 0,

                        // Level 2 Criteria Group 2
                        'l2_cg2_a' => $data[7] ? (int) $data[7] : 0,
                        'l2_cg2_b' => $data[8] ? (int) $data[8] : 0,
                        'l2_cg2_c' => $data[9] ? (int) $data[9] : 0,
                        'l2_cg2_d' => $data[10] ? (int) $data[10] : 0,

                        // Level 2 Criteria Group 3
                        'l2_cg3_a' => $data[11] ? (int) $data[11] : 0,
                        'l2_cg3_b' => $data[12] ? (int) $data[12] : 0,
                        'l2_cg3_c' => $data[13] ? (int) $data[13] : 0,
                        'l2_cg3_d' => $data[14] ? (int) $data[14] : 0,
                        'l2_cg3_e' => $data[15] ? (int) $data[15] : 0,
                    ]);
                    $imported++;
                }
            }

            fclose($handle);
            DB::commit();

            return redirect()->route('admin.object-metrics.index')
                ->with('success', "Berhasil mengimpor {$imported} data metrik.");

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.object-metrics.index')
                ->with('error', 'Gagal mengimpor data: ' . $e->getMessage());
        }
    }

    /**
     * Export object metrics to CSV
     */
    public function export()
    {
        $objectMetrics = ObjectMetric::all();

        $filename = 'object_metrics_' . date('Y-m-d_H-i-s') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($objectMetrics) {
            $file = fopen('php://output', 'w');

            // Header row
            fputcsv($file, [
                'ID',
                'Nama',
                'L2_CG1_A',
                'L2_CG1_B',
                'L2_CG1_C',
                'L2_CG1_D',
                'L2_CG1_E',
                'L2_CG2_A',
                'L2_CG2_B',
                'L2_CG2_C',
                'L2_CG2_D',
                'L2_CG3_A',
                'L2_CG3_B',
                'L2_CG3_C',
                'L2_CG3_D',
                'L2_CG3_E'
            ]);

            // Data rows
            foreach ($objectMetrics as $metric) {
                fputcsv($file, [
                    $metric->id,
                    $metric->name,
                    $metric->l2_cg1_a,
                    $metric->l2_cg1_b,
                    $metric->l2_cg1_c,
                    $metric->l2_cg1_d,
                    $metric->l2_cg1_e,
                    $metric->l2_cg2_a,
                    $metric->l2_cg2_b,
                    $metric->l2_cg2_c,
                    $metric->l2_cg2_d,
                    $metric->l2_cg3_a,
                    $metric->l2_cg3_b,
                    $metric->l2_cg3_c,
                    $metric->l2_cg3_d,
                    $metric->l2_cg3_e,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
