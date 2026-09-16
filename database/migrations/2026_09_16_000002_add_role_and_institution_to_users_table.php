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
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('faculty_researcher')->after('email');
            }
            if (!Schema::hasColumn('users', 'institution')) {
                $table->string('institution')->default('Telkom University')->after('role');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $cols = [];
            if (Schema::hasColumn('users', 'role')) $cols[] = 'role';
            if (Schema::hasColumn('users', 'institution')) $cols[] = 'institution';
            if (!empty($cols)) {
                $table->dropColumn($cols);
            }
        });
    }
};
