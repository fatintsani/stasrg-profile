<?php

namespace Tests\Feature;

use App\Models\User;
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

    /**
     * Test that a user can login with valid credentials and redirects to admin dashboard.
     */
    public function test_user_can_login_with_valid_credentials(): void
    {
        $this->seed();

        $response = $this->post('/login', [
            'email' => 'admin@stasrg.com',
            'password' => 'password',
            'remember' => true,
        ]);

        $response->assertRedirect('/admin/dashboard');
        $this->assertAuthenticated();
    }

    /**
     * Test that a user cannot login with invalid credentials.
     */
    public function test_user_cannot_login_with_invalid_credentials(): void
    {
        $this->seed();

        $response = $this->post('/login', [
            'email' => 'admin@stasrg.com',
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    /**
     * Test that a user can register a new account and is authenticated.
     */
    public function test_user_can_register_new_account(): void
    {
        $response = $this->post('/register', [
            'name' => 'Dr. Jane Doe',
            'email' => 'jane.doe@telkomuniversity.ac.id',
            'institution' => 'CoE STAS-RG',
            'role' => 'faculty_researcher',
            'password' => 'secret12345',
            'password_confirmation' => 'secret12345',
        ]);

        $response->assertRedirect('/admin/dashboard');
        $this->assertDatabaseHas('users', [
            'email' => 'jane.doe@telkomuniversity.ac.id',
            'name' => 'Dr. Jane Doe',
        ]);
        $this->assertAuthenticated();
    }

    /**
     * Test password recovery link request.
     */
    public function test_user_can_request_password_reset(): void
    {
        $this->seed();

        $response = $this->post('/forgot-password', [
            'email' => 'admin@stasrg.com',
        ]);

        $response->assertSessionHas('status');
    }

    /**
     * Test user logout.
     */
    public function test_user_can_logout(): void
    {
        $this->seed();
        $user = User::where('email', 'admin@stasrg.com')->first();

        $response = $this->actingAs($user)->post('/logout');

        $response->assertRedirect('/login');
        $this->assertGuest();
    }
}
