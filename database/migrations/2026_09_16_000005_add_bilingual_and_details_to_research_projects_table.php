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
        Schema::table('research_projects', function (Blueprint $table) {
            $table->string('title_id')->nullable()->after('title');
            $table->text('summary_id')->nullable()->after('summary');
            $table->json('tech_stack')->nullable()->after('summary_id');
            $table->string('case_study_url')->nullable()->after('tech_stack');
            $table->string('funding_source')->nullable()->after('case_study_url');
            $table->integer('start_year')->nullable()->after('funding_source');
            $table->integer('end_year')->nullable()->after('start_year');
            $table->boolean('is_active')->default(true)->after('featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('research_projects', function (Blueprint $table) {
            $table->dropColumn([
                'title_id',
                'summary_id',
                'tech_stack',
                'case_study_url',
                'funding_source',
                'start_year',
                'end_year',
                'is_active',
            ]);
        });
    }
};
