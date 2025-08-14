<?php

namespace Database\Seeders;

use App\Models\ObjectMetric;
use Illuminate\Database\Seeder;

class ObjectMetricSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $metrics = [
            [1, 'Bank 01', 1, 10, 10, 10, 10, 9, 9, 9, 9, 8, 8, 8, 8, 8],
            [2, 'Bank 02', 10, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3],
            [3, 'Bank 03', 4, 8, 3, 5, 6, 4, 1, 6, 2, 8, 8, 2, 7, 7],
            [4, 'Bank 04', 4, 2, 3, 2, 7, 7, 10, 10, 7, 3, 4, 9, 9, 9],
            [5, 'Bank 05', 6, 6, 2, 1, 2, 4, 3, 3, 1, 6, 5, 2, 4, 4],
            [6, 'Bank 06', 9, 3, 7, 8, 8, 2, 7, 1, 2, 3, 2, 3, 3, 5],
            [7, 'Bank 07', 3, 1, 8, 7, 7, 8, 7, 9, 7, 4, 1, 3, 10, 9],
            [8, 'Bank 08', 4, 2, 7, 7, 3, 6, 2, 7, 8, 9, 3, 8, 8, 7],
            [9, 'Bank 09', 10, 4, 10, 8, 3, 6, 5, 10, 1, 3, 10, 4, 1, 4],
            [10, 'Bank 10', 3, 8, 6, 7, 1, 3, 7, 6, 7, 3, 10, 4, 1, 1],
            [11, 'Bank 11', 2, 10, 1, 8, 1, 5, 9, 2, 7, 7, 9, 3, 5, 2],
            [12, 'Bank 12', 8, 1, 6, 5, 7, 9, 10, 6, 7, 3, 8, 2, 1, 10],
            [13, 'Bank 13', 7, 5, 6, 6, 7, 1, 1, 10, 7, 10, 7, 6, 7, 7],
            [14, 'Bank 14', 2, 10, 4, 4, 8, 7, 5, 10, 2, 5, 6, 9, 7, 8],
            [15, 'Bank 15', 9, 3, 10, 7, 10, 1, 2, 3, 5, 8, 7, 10, 1, 2],
            [16, 'Bank 16', 1, 9, 8, 9, 6, 2, 9, 7, 10, 3, 6, 3, 8, 5],
            [17, 'Bank 17', 2, 10, 1, 5, 8, 3, 2, 1, 4, 3, 10, 9, 4, 3]
        ];

        foreach ($metrics as $metric) {
            ObjectMetric::create([
                'id' => $metric[0],
                'name' => $metric[1],

                // Level 2 Criteria Group 1 - App Metrics
                'l2_cg1_a' => $metric[2],  // Ukuran File
                'l2_cg1_b' => $metric[3],  // Total Rating
                'l2_cg1_c' => $metric[4],  // User Rated
                'l2_cg1_d' => $metric[5],  // Total Install
                'l2_cg1_e' => $metric[6],  // Release Date

                // Level 2 Criteria Group 2 - Financial Metrics
                'l2_cg2_a' => $metric[7],  // Giro
                'l2_cg2_b' => $metric[8],  // Tabungan
                'l2_cg2_c' => $metric[9],  // Deposito
                'l2_cg2_d' => $metric[10], // Laba Bersih

                // Level 2 Criteria Group 3 - User Experience Metrics
                'l2_cg3_a' => $metric[11], // Happiness
                'l2_cg3_b' => $metric[12], // Engagement
                'l2_cg3_c' => $metric[13], // Adoption
                'l2_cg3_d' => $metric[14], // Retention
                'l2_cg3_e' => $metric[15], // Task Success
            ]);
        }
    }
}
