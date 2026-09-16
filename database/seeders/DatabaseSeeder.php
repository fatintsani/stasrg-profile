<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(LandingPageSeeder::class);

        User::firstOrCreate(
            ['email' => 'admin@stasrg.telu.ac.id'],
            [
                'name' => 'Admin Researcher',
                'username' => 'admin',
                'password' => bcrypt('password'),
                'role' => 'principal_researcher',
                'institution' => 'Telkom University',
                'email_verified_at' => now(),
            ]
        );
    }
}
