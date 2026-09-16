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
        Schema::table('upcoming_events', function (Blueprint $table) {
            $table->string('title_id', 500)->nullable()->after('title');
            $table->text('description_id')->nullable()->after('description');
            $table->string('speaker_name', 255)->nullable()->after('description_id');
            $table->string('speaker_title', 255)->nullable()->after('speaker_name');
            $table->string('time_display', 100)->nullable()->after('date_display');
            $table->string('registration_link', 500)->nullable()->after('location');
            $table->string('brochure_url', 500)->nullable()->after('registration_link');
            $table->string('image_url', 500)->nullable()->after('brochure_url');
            $table->string('quota_text', 100)->nullable()->after('image_url');
            $table->boolean('is_featured')->default(true)->after('quota_text');
            $table->boolean('is_active')->default(true)->after('is_featured');
            $table->date('event_date')->nullable()->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('upcoming_events', function (Blueprint $table) {
            $table->dropColumn([
                'title_id',
                'description_id',
                'speaker_name',
                'speaker_title',
                'time_display',
                'registration_link',
                'brochure_url',
                'image_url',
                'quota_text',
                'is_featured',
                'is_active',
                'event_date',
            ]);
        });
    }
};
