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
        Schema::create('researchers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title_degree')->nullable(); // e.g. Ph.D., S.T., M.Eng., Prof.
            $table->string('role'); // e.g. Principal Investigator, Senior Researcher, Postdoctoral Fellow, Research Engineer
            $table->string('role_id')->nullable(); // e.g. Peneliti Utama, Peneliti Senior
            $table->string('specialization'); // e.g. Smart Manufacturing, AI & Edge Computing
            $table->string('specialization_id')->nullable();
            $table->string('department')->nullable()->default('School of Industrial Engineering');
            $table->string('institution')->default('Telkom University');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('bio')->nullable();
            $table->text('bio_id')->nullable();
            $table->string('avatar_url')->nullable();
            $table->string('scholar_url')->nullable();
            $table->string('scopus_id')->nullable();
            $table->string('orcid')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->json('focus_areas')->nullable();
            $table->integer('publications_count')->default(0);
            $table->integer('projects_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('researchers');
    }
};
