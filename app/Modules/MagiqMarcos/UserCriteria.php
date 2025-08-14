<?php

namespace App\Modules\MagiqMarcos;

class UserCriteria
{
    public function __construct(
        // ---------------- BASE ---------------------
        // Ukuran File
        public float $l2_cg1_a_value,
        public bool $l2_cg1_a_max,
        // Total Rating
        public float $l2_cg1_b_value,
        public bool $l2_cg1_b_max,
        // User Rated
        public float $l2_cg1_c_value,
        public bool $l2_cg1_c_max,
        // Total Install
        public float $l2_cg1_d_value,
        public bool $l2_cg1_d_max,
        // Release Date
        public float $l2_cg1_e_value,
        public bool $l2_cg1_e_max,

        // Giro
        public float $l2_cg2_a_value,
        public bool $l2_cg2_a_max,
        // Tabungan
        public float $l2_cg2_b_value,
        public bool $l2_cg2_b_max,
        // Deposito
        public float $l2_cg2_c_value,
        public bool $l2_cg2_c_max,
        // Laba Bersih
        public float $l2_cg2_d_value,
        public bool $l2_cg2_d_max,

        // Happiness
        public float $l2_cg3_a_value,
        public bool $l2_cg3_a_max,
        // Engangement
        public float $l2_cg3_b_value,
        public bool $l2_cg3_b_max,
        // Adoption
        public float $l2_cg3_c_value,
        public bool $l2_cg3_c_max,
        // Retention
        public float $l2_cg3_d_value,
        public bool $l2_cg3_d_max,
        // Task Success
        public float $l2_cg3_e_value,
        public bool $l2_cg3_e_max,

        // Performa Apps
        public float $l1_cg1_a_value,
        public bool $l1_cg1_a_max,
        // Laporan Keuangan
        public float $l1_cg1_b_value,
        public bool $l1_cg1_b_max,
        // User Experience
        public float $l1_cg1_c_value,
        public bool $l1_cg1_c_max,

        // ----------- RESULT -----------------
        public int $limit = 10,
        public bool $ascending = false,
    ) {
    }
}