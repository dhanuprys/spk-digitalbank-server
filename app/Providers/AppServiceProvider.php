<?php

namespace App\Providers;

use App\Models\ObjectMetric;
use App\Modules\MagiqMarcos\MagiqMarcos;
use App\Modules\MagiqMarcos\ObjectEntity;
use App\Services\FileUploadService;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register services
        $this->app->singleton(FileUploadService::class);
        $this->app->singleton(UserService::class);
        $this->app->singleton(MagiqMarcos::class, function () {
            $objectMetrics = ObjectMetric::all()->map(
                fn(ObjectMetric $objectMetric) => new ObjectEntity(
                    id: $objectMetric->id,
                    name: $objectMetric->name,

                    // Level 2 Criteria Group 1
                    l2_cg1_a: $objectMetric->l2_cg1_a,
                    l2_cg1_b: $objectMetric->l2_cg1_b,
                    l2_cg1_c: $objectMetric->l2_cg1_c,
                    l2_cg1_d: $objectMetric->l2_cg1_d,
                    l2_cg1_e: $objectMetric->l2_cg1_e,

                    // Level 2 Criteria Group 2
                    l2_cg2_a: $objectMetric->l2_cg2_a,
                    l2_cg2_b: $objectMetric->l2_cg2_b,
                    l2_cg2_c: $objectMetric->l2_cg2_c,
                    l2_cg2_d: $objectMetric->l2_cg2_d,

                    // Level 2 Criteria Group 3
                    l2_cg3_a: $objectMetric->l2_cg3_a,
                    l2_cg3_b: $objectMetric->l2_cg3_b,
                    l2_cg3_c: $objectMetric->l2_cg3_c,
                    l2_cg3_d: $objectMetric->l2_cg3_d,
                    l2_cg3_e: $objectMetric->l2_cg3_e,
                )
            )->toArray();

            return new MagiqMarcos($objectMetrics);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
