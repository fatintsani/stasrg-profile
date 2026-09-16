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
        Schema::table('partners', function (Blueprint $table) {
            $table->string('partnership_type')->nullable()->after('category');
            $table->text('description')->nullable()->after('partnership_type');
            $table->text('description_id')->nullable()->after('description');
            $table->string('website_url')->nullable()->after('logo_url');
            $table->integer('established_year')->nullable()->after('website_url');
            $table->boolean('is_featured')->default(true)->after('established_year');
            $table->boolean('is_active')->default(true)->after('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('partners', function (Blueprint $table) {
            $table->dropColumn([
                'partnership_type',
                'description',
                'description_id',
                'website_url',
                'established_year',
                'is_featured',
                'is_active',
            ]);
        });
    }
};
