<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the admin dashboard renders with all statistics, recent items, and site config.
     */
    public function test_admin_dashboard_renders_successfully(): void
    {
        $this->seed();

        $response = $this->get('/admin');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Dashboard')
            ->has('stats')
            ->has('stats.projects_count')
            ->has('stats.publications_count')
            ->has('stats.partners_count')
            ->has('stats.domains_count')
            ->has('recentProjects')
            ->has('recentPublications')
            ->has('recentArticles')
            ->has('upcomingEvents')
            ->has('domains')
            ->has('siteConfig')
        );
    }

    /**
     * Test that /admin/dashboard also maps correctly.
     */
    public function test_admin_dashboard_alternate_route_works(): void
    {
        $this->seed();

        $response = $this->get('/admin/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Dashboard')
        );
    }
}
