<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ErrorPagesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test all error statuses render correctly via Error component.
     */
    public function test_error_pages_render_successfully(): void
    {
        $statuses = [401, 403, 404, 419, 422, 429, 500, 503];

        foreach ($statuses as $status) {
            $response = $this->get("/errors/{$status}");

            $response->assertStatus(200);
            $response->assertInertia(fn (Assert $page) => $page
                ->component('Error')
                ->where('status', $status)
                ->has('siteConfig')
            );
        }
    }

    /**
     * Test default error route fallback to 404.
     */
    public function test_default_error_route_falls_back_to_404(): void
    {
        $response = $this->get('/errors');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Error')
            ->where('status', 404)
        );
    }
}
