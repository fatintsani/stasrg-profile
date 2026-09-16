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
        Schema::table('enterprise_services', function (Blueprint $table) {
            $table->string('title_id')->nullable()->after('title');
            $table->text('summary_id')->nullable()->after('summary');
            $table->string('action_label_id')->nullable()->after('action_label');
            $table->json('features')->nullable()->after('action_label_id');
            $table->string('target_industry')->nullable()->after('features');
            $table->string('lead_advisor')->nullable()->after('target_industry');
            $table->string('link')->default('#services')->after('lead_advisor');
            $table->boolean('is_featured')->default(true)->after('link');
            $table->boolean('is_active')->default(true)->after('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('enterprise_services', function (Blueprint $table) {
            $table->dropColumn([
                'title_id',
                'summary_id',
                'action_label_id',
                'features',
                'target_industry',
                'lead_advisor',
                'link',
                'is_featured',
                'is_active',
            ]);
        });
    }
};
