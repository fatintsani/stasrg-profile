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
        Schema::table('articles', function (Blueprint $table) {
            $table->string('title_id', 500)->nullable()->after('title');
            $table->text('summary_id')->nullable()->after('summary');
            $table->longText('content')->nullable()->after('summary_id');
            $table->longText('content_id')->nullable()->after('content');
            $table->string('image_url', 500)->nullable()->after('content_id');
            $table->string('author', 255)->nullable()->after('image_url');
            $table->string('external_url', 500)->nullable()->after('read_time');
            $table->boolean('is_featured')->default(true)->after('external_url');
            $table->boolean('is_active')->default(true)->after('is_featured');
            $table->timestamp('published_at')->nullable()->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn([
                'title_id',
                'summary_id',
                'content',
                'content_id',
                'image_url',
                'author',
                'external_url',
                'is_featured',
                'is_active',
                'published_at',
            ]);
        });
    }
};
