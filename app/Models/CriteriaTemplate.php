<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CriteriaTemplate extends Model
{
    use HasFactory;

    protected $table = 'criteria_templates';

    protected $fillable = [
        'name',
        'description',

        // Level 2 Criteria Group 1
        'l2_cg1_a_value',
        'l2_cg1_a_max',
        'l2_cg1_b_value',
        'l2_cg1_b_max',
        'l2_cg1_c_value',
        'l2_cg1_c_max',
        'l2_cg1_d_value',
        'l2_cg1_d_max',
        'l2_cg1_e_value',
        'l2_cg1_e_max',

        // Level 2 Criteria Group 2
        'l2_cg2_a_value',
        'l2_cg2_a_max',
        'l2_cg2_b_value',
        'l2_cg2_b_max',
        'l2_cg2_c_value',
        'l2_cg2_c_max',
        'l2_cg2_d_value',
        'l2_cg2_d_max',

        // Level 2 Criteria Group 3
        'l2_cg3_a_value',
        'l2_cg3_a_max',
        'l2_cg3_b_value',
        'l2_cg3_b_max',
        'l2_cg3_c_value',
        'l2_cg3_c_max',
        'l2_cg3_d_value',
        'l2_cg3_d_max',
        'l2_cg3_e_value',
        'l2_cg3_e_max',

        // Level 1 Criteria Group 1
        'l1_cg1_a_value',
        'l1_cg1_a_max',
        'l1_cg1_b_value',
        'l1_cg1_b_max',
        'l1_cg1_c_value',
        'l1_cg1_c_max',

        // Result
        'limit',
        'ascending',
    ];

    protected $casts = [
        // Level 2 Criteria Group 1
        'l2_cg1_a_max' => 'boolean',
        'l2_cg1_b_max' => 'boolean',
        'l2_cg1_c_max' => 'boolean',
        'l2_cg1_d_max' => 'boolean',
        'l2_cg1_e_max' => 'boolean',

        // Level 2 Criteria Group 2
        'l2_cg2_a_max' => 'boolean',
        'l2_cg2_b_max' => 'boolean',
        'l2_cg2_c_max' => 'boolean',
        'l2_cg2_d_max' => 'boolean',

        // Level 2 Criteria Group 3
        'l2_cg3_a_max' => 'boolean',
        'l2_cg3_b_max' => 'boolean',
        'l2_cg3_c_max' => 'boolean',
        'l2_cg3_d_max' => 'boolean',
        'l2_cg3_e_max' => 'boolean',

        // Level 1 Criteria Group 1
        'l1_cg1_a_max' => 'boolean',
        'l1_cg1_b_max' => 'boolean',
        'l1_cg1_c_max' => 'boolean',

        'ascending' => 'boolean',
        'limit' => 'integer',
    ];

    /**
     * Get all Level 2 Criteria Group 1 values
     */
    public function getL2CG1Criteria(): array
    {
        return [
            'cg1_a' => [
                'value' => $this->l2_cg1_a_value,
                'max' => $this->l2_cg1_a_max,
                'label' => 'Ukuran File'
            ],
            'cg1_b' => [
                'value' => $this->l2_cg1_b_value,
                'max' => $this->l2_cg1_b_max,
                'label' => 'Total Rating'
            ],
            'cg1_c' => [
                'value' => $this->l2_cg1_c_value,
                'max' => $this->l2_cg1_c_max,
                'label' => 'User Rated'
            ],
            'cg1_d' => [
                'value' => $this->l2_cg1_d_value,
                'max' => $this->l2_cg1_d_max,
                'label' => 'Total Install'
            ],
            'cg1_e' => [
                'value' => $this->l2_cg1_e_value,
                'max' => $this->l2_cg1_e_max,
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
                'value' => $this->l2_cg2_a_value,
                'max' => $this->l2_cg2_a_max,
                'label' => 'Giro'
            ],
            'cg2_b' => [
                'value' => $this->l2_cg2_b_value,
                'max' => $this->l2_cg2_b_max,
                'label' => 'Tabungan'
            ],
            'cg2_c' => [
                'value' => $this->l2_cg2_c_value,
                'max' => $this->l2_cg2_c_max,
                'label' => 'Deposito'
            ],
            'cg2_d' => [
                'value' => $this->l2_cg2_d_value,
                'max' => $this->l2_cg2_d_max,
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
                'value' => $this->l2_cg3_a_value,
                'max' => $this->l2_cg3_a_max,
                'label' => 'Happiness'
            ],
            'cg3_b' => [
                'value' => $this->l2_cg3_b_value,
                'max' => $this->l2_cg3_b_max,
                'label' => 'Engagement'
            ],
            'cg3_c' => [
                'value' => $this->l2_cg3_c_value,
                'max' => $this->l2_cg3_c_max,
                'label' => 'Adoption'
            ],
            'cg3_d' => [
                'value' => $this->l2_cg3_d_value,
                'max' => $this->l2_cg3_d_max,
                'label' => 'Retention'
            ],
            'cg3_e' => [
                'value' => $this->l2_cg3_e_value,
                'max' => $this->l2_cg3_e_max,
                'label' => 'Task Success'
            ],
        ];
    }

    /**
     * Get all Level 1 Criteria Group 1 values
     */
    public function getL1CG1Criteria(): array
    {
        return [
            'cg1_a' => [
                'value' => $this->l1_cg1_a_value,
                'max' => $this->l1_cg1_a_max,
                'label' => 'Performa Apps'
            ],
            'cg1_b' => [
                'value' => $this->l1_cg1_b_value,
                'max' => $this->l1_cg1_b_max,
                'label' => 'Laporan Keuangan'
            ],
            'cg1_c' => [
                'value' => $this->l1_cg1_c_value,
                'max' => $this->l1_cg1_c_max,
                'label' => 'User Experience'
            ],
        ];
    }
}
