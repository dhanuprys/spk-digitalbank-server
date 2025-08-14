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
        Schema::create('object_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            // Level 2 Criteria Group 1
            $table->integer('l2_cg1_a'); // Ukuran File
            $table->integer('l2_cg1_b'); // Total Rating
            $table->integer('l2_cg1_c'); // User Rated
            $table->integer('l2_cg1_d'); // Total Install
            $table->integer('l2_cg1_e'); // Release Date

            // Level 2 Criteria Group 2
            $table->integer('l2_cg2_a'); // Giro
            $table->integer('l2_cg2_b'); // Tabungan
            $table->integer('l2_cg2_c'); // Deposito
            $table->integer('l2_cg2_d'); // Laba Bersih

            // Level 2 Criteria Group 3
            $table->integer('l2_cg3_a'); // Happiness
            $table->integer('l2_cg3_b'); // Engagement
            $table->integer('l2_cg3_c'); // Adoption
            $table->integer('l2_cg3_d'); // Retention
            $table->integer('l2_cg3_e'); // Task Success

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('object_metrics');
    }
};
