<?php

namespace Tests\Feature;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AuthFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * Test login page renders with initial tab.
     */
    public function test_login_page_renders_successfully(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Auth/Login')
            ->where('initialTab', 'login')
            ->has('siteConfig')
        );
    }

    /**
     * Test user can authenticate with valid email credentials.
     */
    public function test_user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'username' => 'alex_lead',
            'email' => 'researcher@telu.ac.id',
            'password' => Hash::make('secret12345'),
        ]);

        $response = $this->post('/login', [
            'email' => 'researcher@telu.ac.id',
            'password' => 'secret12345',
            'remember' => true,
        ]);

        $response->assertRedirect('/admin');
        $this->assertAuthenticatedAs($user);
    }

    /**
     * Test user can authenticate with username instead of email.
     */
    public function test_user_can_login_with_valid_username(): void
    {
        $user = User::factory()->create([
            'username' => 'alex_lead',
            'email' => 'researcher2@telu.ac.id',
            'password' => Hash::make('secret12345'),
        ]);

        $response = $this->post('/login', [
            'email' => 'alex_lead',
            'password' => 'secret12345',
            'remember' => true,
        ]);

        $response->assertRedirect('/admin');
        $this->assertAuthenticatedAs($user);
    }

    /**
     * Test user cannot authenticate with invalid credentials.
     */
    public function test_user_cannot_login_with_invalid_credentials(): void
    {
        $response = $this->post('/login', [
            'email' => 'nonexistent@telu.ac.id',
            'password' => 'wrongpassword',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    /**
     * Test user can register a new researcher account with username.
     */
    public function test_user_can_register_new_account(): void
    {
        $response = $this->post('/register', [
            'name' => 'Dr. Alex Pratama',
            'username' => 'alex_pratama',
            'email' => 'alex.pratama@telu.ac.id',
            'institution' => 'Telkom University',
            'role' => 'principal_researcher',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertRedirect(route('login'));
        $response->assertSessionHas('status');

        $this->assertDatabaseHas('users', [
            'name' => 'Dr. Alex Pratama',
            'username' => 'alex_pratama',
            'email' => 'alex.pratama@telu.ac.id',
            'institution' => 'Telkom University',
            'role' => 'principal_researcher',
        ]);

        $this->assertGuest();
    }

    /**
     * Test registration fails with invalid or duplicate email.
     */
    public function test_registration_validation_fails_on_duplicate_email(): void
    {
        User::factory()->create([
            'username' => 'existing_user',
            'email' => 'existing@telu.ac.id',
        ]);

        $response = $this->post('/register', [
            'name' => 'Duplicate User',
            'username' => 'new_user',
            'email' => 'existing@telu.ac.id',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertSessionHasErrors('email');
    }

    /**
     * Test registration fails with duplicate username.
     */
    public function test_registration_validation_fails_on_duplicate_username(): void
    {
        User::factory()->create([
            'username' => 'existing_user',
            'email' => 'existing@telu.ac.id',
        ]);

        $response = $this->post('/register', [
            'name' => 'Duplicate Username User',
            'username' => 'existing_user',
            'email' => 'new.unique@telu.ac.id',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertSessionHasErrors('username');
    }

    /**
     * Test forgot password page renders successfully.
     */
    public function test_forgot_password_page_renders(): void
    {
        $response = $this->get('/forgot-password');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Auth/ForgotPassword')
            ->has('siteConfig')
        );
    }

    /**
     * Test password reset email is dispatched via Mailpit / Mailable.
     */
    public function test_user_can_request_password_reset_email(): void
    {
        Mail::fake();

        $user = User::factory()->create([
            'email' => 'lead.researcher@telu.ac.id',
        ]);

        $response = $this->post('/forgot-password', [
            'email' => 'lead.researcher@telu.ac.id',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('status');

        $this->assertDatabaseHas('password_reset_tokens', [
            'email' => 'lead.researcher@telu.ac.id',
        ]);

        Mail::assertSent(ResetPasswordMail::class, function ($mail) use ($user) {
            return $mail->hasTo('lead.researcher@telu.ac.id') &&
                   $mail->userEmail === $user->email &&
                   !empty($mail->resetUrl);
        });
    }

    /**
     * Test reset password view renders with valid token.
     */
    public function test_reset_password_page_renders_with_token(): void
    {
        $token = Str::random(64);

        $response = $this->get('/reset-password/' . $token . '?email=researcher@telu.ac.id');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Auth/ResetPassword')
            ->where('token', $token)
            ->where('email', 'researcher@telu.ac.id')
        );
    }

    /**
     * Test user can reset password with valid token.
     */
    public function test_user_can_reset_password_with_valid_token(): void
    {
        $user = User::factory()->create([
            'email' => 'researcher.reset@telu.ac.id',
            'password' => Hash::make('oldpassword123'),
        ]);

        $token = Str::random(64);

        DB::table('password_reset_tokens')->insert([
            'email' => 'researcher.reset@telu.ac.id',
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);

        $response = $this->post('/reset-password', [
            'token' => $token,
            'email' => 'researcher.reset@telu.ac.id',
            'password' => 'newpassword123',
            'password_confirmation' => 'newpassword123',
        ]);

        $response->assertRedirect(route('login'));
        $response->assertSessionHas('status');

        $user->refresh();
        $this->assertTrue(Hash::check('newpassword123', $user->password));

        $this->assertDatabaseMissing('password_reset_tokens', [
            'email' => 'researcher.reset@telu.ac.id',
        ]);
    }

    /**
     * Test user can log out successfully.
     */
    public function test_user_can_logout(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/logout');

        $response->assertRedirect(route('login'));
        $this->assertGuest();
    }
}
