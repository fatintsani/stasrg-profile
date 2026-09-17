<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('research_metrics', function (Blueprint $table) {
            $table->string('label_id')->nullable()->after('label');
            $table->string('description_id')->nullable()->after('description');
            $table->string('icon')->nullable()->default('TrendingUp')->after('description_id');
            $table->string('source_type')->default('manual')->after('icon'); // 'manual', 'auto_projects', 'auto_services', 'auto_partners', 'auto_researchers', 'auto_publications'
            $table->boolean('is_active')->default(true)->after('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('research_metrics', function (Blueprint $table) {
            $table->dropColumn([
                'label_id',
                'description_id',
                'icon',
                'source_type',
                'is_active',
            ]);
        });
    }
};
