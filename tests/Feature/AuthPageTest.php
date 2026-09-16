<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class AuthPageTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the login page loads successfully via Inertia.
     */
    public function test_login_page_renders_successfully(): void
    {
        $this->seed();

        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Auth/Login')
            ->has('initialTab')
            ->where('initialTab', 'login')
        );
    }

    /**
     * Test that the register page loads successfully via Inertia.
     */
    public function test_register_page_renders_successfully(): void
    {
        $this->seed();

        $response = $this->get('/register');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Auth/Login')
            ->has('initialTab')
            ->where('initialTab', 'register')
        );
    }

    /**
     * Test that the forgot password page loads successfully via Inertia.
     */
    public function test_forgot_password_page_renders_successfully(): void
    {
        $this->seed();

        $response = $this->get('/forgot-password');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Auth/ForgotPassword')
            ->has('siteConfig')
        );
    }
}

