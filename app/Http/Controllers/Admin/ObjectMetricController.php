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
            'import_errors' => session('import_errors', []),
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
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',

                // Level 2 Criteria Group 1
                'l2_cg1_a' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg1_b' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg1_c' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg1_d' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg1_e' => 'required|numeric|min:0|max:999999999.9999',

                // Level 2 Criteria Group 2
                'l2_cg2_a' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg2_b' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg2_c' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg2_d' => 'required|numeric|min:0|max:999999999.9999',

                // Level 2 Criteria Group 3
                'l2_cg3_a' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg3_b' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg3_c' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg3_d' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg3_e' => 'required|numeric|min:0|max:999999999.9999',
            ], [
                'name.required' => 'Nama metrik wajib diisi.',
                'name.string' => 'Nama metrik harus berupa teks.',
                'name.max' => 'Nama metrik maksimal 255 karakter.',

                '*.required' => 'Field ini wajib diisi.',
                '*.numeric' => 'Field ini harus berupa angka.',
                '*.min' => 'Nilai minimum adalah 0.',
                '*.max' => 'Nilai maksimum adalah 999999999.9999.',
            ]);

            ObjectMetric::create($validated);

            return redirect()->route('admin.object-metrics.index')
                ->with('success', 'Metrik berhasil dibuat.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput()
                ->with('error', 'Terdapat kesalahan dalam data yang dimasukkan.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage());
        }
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
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',

                // Level 2 Criteria Group 1
                'l2_cg1_a' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg1_b' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg1_c' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg1_d' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg1_e' => 'required|numeric|min:0|max:999999999.9999',

                // Level 2 Criteria Group 2
                'l2_cg2_a' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg2_b' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg2_c' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg2_d' => 'required|numeric|min:0|max:999999999.9999',

                // Level 2 Criteria Group 3
                'l2_cg3_a' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg3_b' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg3_c' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg3_d' => 'required|numeric|min:0|max:999999999.9999',
                'l2_cg3_e' => 'required|numeric|min:0|max:999999999.9999',
            ], [
                'name.required' => 'Nama metrik wajib diisi.',
                'name.string' => 'Nama metrik harus berupa teks.',
                'name.max' => 'Nama metrik maksimal 255 karakter.',

                '*.required' => 'Field ini wajib diisi.',
                '*.numeric' => 'Field ini harus berupa angka.',
                '*.min' => 'Nilai minimum adalah 0.',
                '*.max' => 'Nilai maksimum adalah 999999999.9999.',
            ]);

            $objectMetric->update($validated);

            return redirect()->route('admin.object-metrics.index')
                ->with('success', 'Metrik berhasil diperbarui.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput()
                ->with('error', 'Terdapat kesalahan dalam data yang dimasukkan.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage());
        }
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
            $errors = [];

            while (($data = fgetcsv($handle)) !== false) {
                if (count($data) >= 15) { // Ensure we have enough columns (15 without ID)
                    try {
                        // Validate name field (now at index 0)
                        $name = trim($data[0] ?? '');
                        if (empty($name)) {
                            throw new \Exception("Nama aplikasi tidak boleh kosong");
                        }

                        // Validate and convert numeric values with proper field mapping (shifted by 1 index)
                        $fieldMapping = [
                            'l2_cg1_a' => ['value' => $data[1] ?? 0, 'label' => 'Ukuran File'],
                            'l2_cg1_b' => ['value' => $data[2] ?? 0, 'label' => 'Total Rating'],
                            'l2_cg1_c' => ['value' => $data[3] ?? 0, 'label' => 'User Rated'],
                            'l2_cg1_d' => ['value' => $data[4] ?? 0, 'label' => 'Total Install'],
                            'l2_cg1_e' => ['value' => $data[5] ?? 0, 'label' => 'Release Date'],
                            'l2_cg2_a' => ['value' => $data[6] ?? 0, 'label' => 'Giro'],
                            'l2_cg2_b' => ['value' => $data[7] ?? 0, 'label' => 'Tabungan'],
                            'l2_cg2_c' => ['value' => $data[8] ?? 0, 'label' => 'Deposito'],
                            'l2_cg2_d' => ['value' => $data[9] ?? 0, 'label' => 'Laba Bersih'],
                            'l2_cg3_a' => ['value' => $data[10] ?? 0, 'label' => 'Happiness'],
                            'l2_cg3_b' => ['value' => $data[11] ?? 0, 'label' => 'Engagement'],
                            'l2_cg3_c' => ['value' => $data[12] ?? 0, 'label' => 'Adoption'],
                            'l2_cg3_d' => ['value' => $data[13] ?? 0, 'label' => 'Retention'],
                            'l2_cg3_e' => ['value' => $data[14] ?? 0, 'label' => 'Task Success'],
                        ];

                        $validatedFields = [];
                        foreach ($fieldMapping as $field => $fieldData) {
                            $value = trim($fieldData['value']);

                            // Skip empty values (set to 0)
                            if (empty($value)) {
                                $validatedFields[$field] = 0;
                                continue;
                            }

                            // Validate numeric format
                            if (!is_numeric($value)) {
                                throw new \Exception("{$fieldData['label']} harus berupa angka: {$value}");
                            }

                            $decimalValue = (float) $value;

                            // Validate range
                            if ($decimalValue < 0) {
                                throw new \Exception("{$fieldData['label']} tidak boleh negatif: {$value}");
                            }

                            if ($decimalValue > 999999999.9999) {
                                throw new \Exception("{$fieldData['label']} melebihi batas maksimum (999999999.9999): {$value}");
                            }

                            $validatedFields[$field] = $decimalValue;
                        }

                        // Create the record
                        ObjectMetric::create([
                            'name' => $name,
                            ...$validatedFields
                        ]);
                        $imported++;

                    } catch (\Exception $e) {
                        $errors[] = "Baris " . ($imported + 1) . ": " . $e->getMessage();
                    }
                } else {
                    $errors[] = "Baris " . ($imported + 1) . ": Data tidak lengkap (minimal 15 kolom)";
                }
            }

            fclose($handle);
            DB::commit();

            $message = "Berhasil mengimpor {$imported} data metrik.";
            if (!empty($errors)) {
                $message .= " Terdapat " . count($errors) . " baris dengan kesalahan.";
            }

            return redirect()->route('admin.object-metrics.index')
                ->with('success', $message)
                ->with('import_errors', $errors);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('admin.object-metrics.index')
                ->with('error', 'Gagal mengimpor data: ' . $e->getMessage());
        }
    }

    /**
     * Download sample import template
     */
    public function downloadTemplate()
    {
        $filename = 'object_metrics_template_' . date('Y-m-d') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () {
            $file = fopen('php://output', 'w');

            // Header row with descriptions (without ID)
            fputcsv($file, [
                'Nama Aplikasi',
                'L2_CG1_A (Ukuran File)',
                'L2_CG1_B (Total Rating)',
                'L2_CG1_C (User Rated)',
                'L2_CG1_D (Total Install)',
                'L2_CG1_E (Release Date)',
                'L2_CG2_A (Giro)',
                'L2_CG2_B (Tabungan)',
                'L2_CG2_C (Deposito)',
                'L2_CG2_D (Laba Bersih)',
                'L2_CG3_A (Happiness)',
                'L2_CG3_B (Engagement)',
                'L2_CG3_C (Adoption)',
                'L2_CG3_D (Retention)',
                'L2_CG3_E (Task Success)'
            ]);

            // Sample data row (without ID)
            fputcsv($file, [
                'Sample App',
                '123456.7890',
                '4.5000',
                '1000.0000',
                '50000.0000',
                '2024.0101',
                '1000000.0000',
                '2000000.0000',
                '500000.0000',
                '150000.0000',
                '85.5000',
                '90.2500',
                '75.7500',
                '88.0000',
                '92.5000'
            ]);

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

}
