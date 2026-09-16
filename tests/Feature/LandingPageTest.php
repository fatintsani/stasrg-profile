<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class LandingPageTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the landing page renders with all required CMS sections.
     */
    public function test_landing_page_renders_successfully(): void
    {
        $this->seed();

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('metrics', 4)
            ->has('aboutHighlights', 4)
            ->has('domains', 8)
            ->has('projects', 3)
            ->has('publications', 3)
            ->has('services', 6)
            ->has('partners', 6)
            ->has('articles', 3)
            ->has('events', 4)
            ->has('siteConfig')
        );
    }
}
