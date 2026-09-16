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
        Schema::table('research_domains', function (Blueprint $table) {
            if (!Schema::hasColumn('research_domains', 'title_id')) {
                $table->string('title_id')->nullable()->after('title');
            }
            if (!Schema::hasColumn('research_domains', 'summary_id')) {
                $table->text('summary_id')->nullable()->after('summary');
            }
            if (!Schema::hasColumn('research_domains', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('order');
            }
            if (!Schema::hasColumn('research_domains', 'focus_areas')) {
                $table->json('focus_areas')->nullable()->after('summary_id');
            }
            if (!Schema::hasColumn('research_domains', 'lead_researcher')) {
                $table->string('lead_researcher')->nullable()->after('focus_areas');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('research_domains', function (Blueprint $table) {
            $cols = [];
            if (Schema::hasColumn('research_domains', 'title_id')) $cols[] = 'title_id';
            if (Schema::hasColumn('research_domains', 'summary_id')) $cols[] = 'summary_id';
            if (Schema::hasColumn('research_domains', 'is_active')) $cols[] = 'is_active';
            if (Schema::hasColumn('research_domains', 'focus_areas')) $cols[] = 'focus_areas';
            if (Schema::hasColumn('research_domains', 'lead_researcher')) $cols[] = 'lead_researcher';
            if (!empty($cols)) {
                $table->dropColumn($cols);
            }
        });
    }
};
