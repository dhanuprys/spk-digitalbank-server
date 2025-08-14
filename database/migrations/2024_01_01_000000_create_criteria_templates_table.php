<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('criteria_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');

            // ---------------- BASE ---------------------
            // Level 2 Criteria Group 1
            // Ukuran File
            $table->decimal('l2_cg1_a_value', 10, 6);
            $table->boolean('l2_cg1_a_max');
            // Total Rating
            $table->decimal('l2_cg1_b_value', 10, 6);
            $table->boolean('l2_cg1_b_max');
            // User Rated
            $table->decimal('l2_cg1_c_value', 10, 6);
            $table->boolean('l2_cg1_c_max');
            // Total Install
            $table->decimal('l2_cg1_d_value', 10, 6);
            $table->boolean('l2_cg1_d_max');
            // Release Date
            $table->decimal('l2_cg1_e_value', 10, 6);
            $table->boolean('l2_cg1_e_max');

            // Level 2 Criteria Group 2
            // Giro
            $table->decimal('l2_cg2_a_value', 10, 6);
            $table->boolean('l2_cg2_a_max');
            // Tabungan
            $table->decimal('l2_cg2_b_value', 10, 6);
            $table->boolean('l2_cg2_b_max');
            // Deposito
            $table->decimal('l2_cg2_c_value', 10, 6);
            $table->boolean('l2_cg2_c_max');
            // Laba Bersih
            $table->decimal('l2_cg2_d_value', 10, 6);
            $table->boolean('l2_cg2_d_max');

            // Level 2 Criteria Group 3
            // Happiness
            $table->decimal('l2_cg3_a_value', 10, 6);
            $table->boolean('l2_cg3_a_max');
            // Engagement
            $table->decimal('l2_cg3_b_value', 10, 6);
            $table->boolean('l2_cg3_b_max');
            // Adoption
            $table->decimal('l2_cg3_c_value', 10, 6);
            $table->boolean('l2_cg3_c_max');
            // Retention
            $table->decimal('l2_cg3_d_value', 10, 6);
            $table->boolean('l2_cg3_d_max');
            // Task Success
            $table->decimal('l2_cg3_e_value', 10, 6);
            $table->boolean('l2_cg3_e_max');

            // Level 1 Criteria Group 1
            // Performa Apps
            $table->decimal('l1_cg1_a_value', 10, 6);
            $table->boolean('l1_cg1_a_max');
            // Laporan Keuangan
            $table->decimal('l1_cg1_b_value', 10, 6);
            $table->boolean('l1_cg1_b_max');
            // User Experience
            $table->decimal('l1_cg1_c_value', 10, 6);
            $table->boolean('l1_cg1_c_max');

            // ----------- RESULT -----------------
            $table->integer('limit')->default(10);
            $table->boolean('ascending')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('criteria_templates');
    }
};
