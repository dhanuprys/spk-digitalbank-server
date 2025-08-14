<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObjectMetric extends Model
{
    use HasFactory;

    protected $table = 'object_metrics';

    protected $fillable = [
        'name',

        // Level 2 Criteria Group 1
        'l2_cg1_a', // Ukuran File
        'l2_cg1_b', // Total Rating
        'l2_cg1_c', // User Rated
        'l2_cg1_d', // Total Install
        'l2_cg1_e', // Release Date

        // Level 2 Criteria Group 2
        'l2_cg2_a', // Giro
        'l2_cg2_b', // Tabungan
        'l2_cg2_c', // Deposito
        'l2_cg2_d', // Laba Bersih

        // Level 2 Criteria Group 3
        'l2_cg3_a', // Happiness
        'l2_cg3_b', // Engagement
        'l2_cg3_c', // Adoption
        'l2_cg3_d', // Retention
        'l2_cg3_e', // Task Success
    ];

    protected $casts = [
        // Level 2 Criteria Group 1
        'l2_cg1_a' => 'integer',
        'l2_cg1_b' => 'integer',
        'l2_cg1_c' => 'integer',
        'l2_cg1_d' => 'integer',
        'l2_cg1_e' => 'integer',

        // Level 2 Criteria Group 2
        'l2_cg2_a' => 'integer',
        'l2_cg2_b' => 'integer',
        'l2_cg2_c' => 'integer',
        'l2_cg2_d' => 'integer',

        // Level 2 Criteria Group 3
        'l2_cg3_a' => 'integer',
        'l2_cg3_b' => 'integer',
        'l2_cg3_c' => 'integer',
        'l2_cg3_d' => 'integer',
        'l2_cg3_e' => 'integer',
    ];

    /**
     * Get all Level 2 Criteria Group 1 values
     */
    public function getL2CG1Criteria(): array
    {
        return [
            'cg1_a' => [
                'value' => $this->l2_cg1_a,
                'label' => 'Ukuran File'
            ],
            'cg1_b' => [
                'value' => $this->l2_cg1_b,
                'label' => 'Total Rating'
            ],
            'cg1_c' => [
                'value' => $this->l2_cg1_c,
                'label' => 'User Rated'
            ],
            'cg1_d' => [
                'value' => $this->l2_cg1_d,
                'label' => 'Total Install'
            ],
            'cg1_e' => [
                'value' => $this->l2_cg1_e,
                'label' => 'Release Date'
            ],
        ];
    }

    /**
     * Get all Level 2 Criteria Group 2 values
     */
    public function getL2CG2Criteria(): array
    {
        return [
            'cg2_a' => [
                'value' => $this->l2_cg2_a,
                'label' => 'Giro'
            ],
            'cg2_b' => [
                'value' => $this->l2_cg2_b,
                'label' => 'Tabungan'
            ],
            'cg2_c' => [
                'value' => $this->l2_cg2_c,
                'label' => 'Deposito'
            ],
            'cg2_d' => [
                'value' => $this->l2_cg2_d,
                'label' => 'Laba Bersih'
            ],
        ];
    }

    /**
     * Get all Level 2 Criteria Group 3 values
     */
    public function getL2CG3Criteria(): array
    {
        return [
            'cg3_a' => [
                'value' => $this->l2_cg3_a,
                'label' => 'Happiness'
            ],
            'cg3_b' => [
                'value' => $this->l2_cg3_b,
                'label' => 'Engagement'
            ],
            'cg3_c' => [
                'value' => $this->l2_cg3_c,
                'label' => 'Adoption'
            ],
            'cg3_d' => [
                'value' => $this->l2_cg3_d,
                'label' => 'Retention'
            ],
            'cg3_e' => [
                'value' => $this->l2_cg3_e,
                'label' => 'Task Success'
            ],
        ];
    }

    /**
     * Calculate total score for Level 2 Criteria Group 1
     */
    public function getL2CG1TotalScore(): int
    {
        return $this->l2_cg1_a + $this->l2_cg1_b + $this->l2_cg1_c +
            $this->l2_cg1_d + $this->l2_cg1_e;
    }

    /**
     * Calculate total score for Level 2 Criteria Group 2
     */
    public function getL2CG2TotalScore(): int
    {
        return $this->l2_cg2_a + $this->l2_cg2_b + $this->l2_cg2_c + $this->l2_cg2_d;
    }

    /**
     * Calculate total score for Level 2 Criteria Group 3
     */
    public function getL2CG3TotalScore(): int
    {
        return $this->l2_cg3_a + $this->l2_cg3_b + $this->l2_cg3_c +
            $this->l2_cg3_d + $this->l2_cg3_e;
    }

    /**
     * Calculate overall total score
     */
    public function getTotalScore(): int
    {
        return $this->getL2CG1TotalScore() + $this->getL2CG2TotalScore() + $this->getL2CG3TotalScore();
    }
}
