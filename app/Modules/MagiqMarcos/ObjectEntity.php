<?php

namespace App\Modules\MagiqMarcos;

class ObjectEntity
{
    public function __construct(
        public int $id,
        public string $name,

        // Ukuran File
        public int $l2_cg1_a,
        // Total Rating
        public int $l2_cg1_b,
        // User Rated
        public int $l2_cg1_c,
        // Total Install
        public int $l2_cg1_d,
        // Release Date
        public int $l2_cg1_e,

        // Giro
        public int $l2_cg2_a,
        // Tabungan
        public int $l2_cg2_b,
        // Deposito
        public int $l2_cg2_c,
        // Laba Bersih
        public int $l2_cg2_d,

        // Happiness
        public int $l2_cg3_a,
        // Engangement
        public int $l2_cg3_b,
        // Adoption
        public int $l2_cg3_c,
        // Retention
        public int $l2_cg3_d,
        // Task Success
        public int $l2_cg3_e,
    ) {
    }
}