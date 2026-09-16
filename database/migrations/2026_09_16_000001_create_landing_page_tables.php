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
        Schema::create('research_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('value'); // e.g. 50+
            $table->string('label'); // e.g. Research Projects
            $table->string('description'); // e.g. Completed & Active Industrial Tracks
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('about_highlights', function (Blueprint $table) {
            $table->id();
            $table->string('icon'); // icon identifier
            $table->string('title');
            $table->text('description');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('research_domains', function (Blueprint $table) {
            $table->id();
            $table->string('domain_number'); // e.g. 01 / DOMAIN
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('icon');
            $table->text('summary');
            $table->string('link')->default('#');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('research_projects', function (Blueprint $table) {
            $table->id();
            $table->string('category'); // e.g. Smart Manufacturing, Sustainable Energy, Supply Chain
            $table->string('category_tag'); // e.g. AI & LOGISTICS
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('image_url');
            $table->string('lead_researcher');
            $table->text('summary');
            $table->boolean('featured')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('badge'); // e.g. Journal Paper (Q1), Conference Paper
            $table->string('badge_type')->default('green'); // green, gray, blue
            $table->integer('year');
            $table->string('venue'); // e.g. IEEE Transactions on Sustainable Energy
            $table->string('doi');
            $table->string('title');
            $table->string('authors');
            $table->string('pdf_url')->nullable();
            $table->string('doi_url')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('enterprise_services', function (Blueprint $table) {
            $table->id();
            $table->string('service_number'); // e.g. 01, 02
            $table->string('title');
            $table->text('summary');
            $table->string('icon')->default('Briefcase');
            $table->string('action_label')->default('Explore Service');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category')->default('Industry');
            $table->string('logo_text')->nullable();
            $table->string('logo_url')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('tag'); // PRESS RELEASE, RESEARCH REPORT, ACADEMIC EVENT
            $table->string('date');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->string('read_time')->default('4 min read');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('upcoming_events', function (Blueprint $table) {
            $table->id();
            $table->string('tag'); // UPCOMING SYMPOSIUM, HANDS-ON WORKSHOP
            $table->string('date_display'); // NOV 24 - 2026
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->string('primary_action_text')->default('Register Now');
            $table->string('secondary_action_text')->default('Download Brochure');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('upcoming_events');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('partners');
        Schema::dropIfExists('enterprise_services');
        Schema::dropIfExists('publications');
        Schema::dropIfExists('research_projects');
        Schema::dropIfExists('research_domains');
        Schema::dropIfExists('about_highlights');
        Schema::dropIfExists('research_metrics');
    }
};
