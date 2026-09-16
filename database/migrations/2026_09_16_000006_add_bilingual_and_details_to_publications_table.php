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
        Schema::table('publications', function (Blueprint $table) {
            $table->string('title_id')->nullable()->after('title');
            $table->text('abstract')->nullable()->after('title_id');
            $table->text('abstract_id')->nullable()->after('abstract');
            $table->string('quartile')->nullable()->after('badge_type'); // e.g. Q1, Q2, Scopus, WoS
            $table->string('indexing')->nullable()->after('quartile'); // e.g. Scopus Q1, IEEE Xplore, Web of Science
            $table->string('domain_tag')->nullable()->after('indexing'); // e.g. Sustainable Energy, Smart Manufacturing
            $table->integer('citation_count')->default(0)->after('domain_tag');
            $table->boolean('is_featured')->default(true)->after('citation_count');
            $table->boolean('is_active')->default(true)->after('is_featured');
            $table->string('slug')->nullable()->after('doi_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('publications', function (Blueprint $table) {
            $table->dropColumn([
                'title_id',
                'abstract',
                'abstract_id',
                'quartile',
                'indexing',
                'domain_tag',
                'citation_count',
                'is_featured',
                'is_active',
                'slug',
            ]);
        });
    }
};
