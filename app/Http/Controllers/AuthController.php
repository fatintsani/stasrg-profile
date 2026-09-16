<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\SiteSetting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Show login portal page.
     */
    public function showLogin(Request $request): Response
    {
        return Inertia::render('Auth/Login', [
            'initialTab' => 'login',
            'siteConfig' => [
                'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Handle authentication login attempt.
     */
    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
        ]);

        $loginInput = trim($credentials['email']);
        $password = $credentials['password'];
        $remember = (bool) ($credentials['remember'] ?? false);

        // Allow logging in via either email or username
        $user = User::where('email', $loginInput)
            ->orWhere('username', $loginInput)
            ->orWhere('name', $loginInput)
            ->first();

        if ($user && Hash::check($password, $user->password)) {
            Auth::login($user, $remember);
            $request->session()->regenerate();

            return redirect()->intended('/admin');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    /**
     * Show register portal page.
     */
    public function showRegister(Request $request): Response
    {
        return Inertia::render('Auth/Login', [
            'initialTab' => 'register',
            'siteConfig' => [
                'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Handle user account creation.
     */
    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'alpha_dash', 'unique:users,username'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'institution' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:100'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        User::create([
            'name' => $validated['name'],
            'username' => strtolower($validated['username']),
            'email' => strtolower($validated['email']),
            'institution' => $validated['institution'] ?? 'Telkom University',
            'role' => $validated['role'] ?? 'faculty_researcher',
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('login')->with('status', 'Account created successfully! Please sign in with your username or email.');
    }

    /**
     * Show forgot password recovery page.
     */
    public function showForgotPassword(Request $request): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'siteConfig' => [
                'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Dispatch password reset email via Mailpit.
     */
    public function forgotPassword(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'string'],
        ]);

        $input = trim($request->input('email'));

        $user = User::where('email', $input)
            ->orWhere('username', $input)
            ->orWhere('name', $input)
            ->first();

        if (! $user) {
            return back()->withErrors([
                'email' => 'We could not find a registered researcher account with that email or username.',
            ])->onlyInput('email');
        }

        // Generate a cryptographically secure token
        $rawToken = Str::random(64);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => $rawToken,
                'created_at' => Carbon::now(),
            ]
        );

        // Send customized HTML email via configured Mailer (Mailpit)
        try {
            Mail::to($user->email)->send(new ResetPasswordMail(
                $user,
                $rawToken,
                $request->ip() ?? '127.0.0.1',
                60
            ));
        } catch (\Throwable $e) {
            report($e);
            return back()->withErrors([
                'email' => 'Failed to dispatch email: ' . $e->getMessage(),
            ]);
        }

        return back()->with('status', 'Verification link dispatched successfully. Please check your inbox in Mailpit.');
    }

    /**
     * Show reset password form.
     */
    public function showResetPassword(Request $request, string $token): Response
    {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => $request->query('email', ''),
            'siteConfig' => [
                'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Handle password reset submission.
     */
    public function resetPassword(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ]);

        $record = DB::table('password_reset_tokens')
            ->where('email', strtolower($request->email))
            ->first();

        if (! $record || $record->token !== $request->token) {
            return back()->withErrors([
                'email' => 'This password reset token is invalid.',
            ]);
        }

        // Check 60-minute token expiration
        if (Carbon::parse($record->created_at)->addMinutes(60)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();

            return back()->withErrors([
                'email' => 'This password reset token has expired. Please request a new one.',
            ]);
        }

        $user = User::where('email', strtolower($request->email))->first();

        if (! $user) {
            return back()->withErrors([
                'email' => 'We could not find an account with this email address.',
            ]);
        }

        $user->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return redirect()->route('login')->with('status', 'Your password has been successfully reset! Please sign in with your new credentials.');
    }

    /**
     * Handle logout.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('status', 'You have been signed out successfully.');
    }
}
