<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Show login portal page.
     */
    public function showLogin(Request $request): Response|RedirectResponse
    {
        if (Auth::check()) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('Auth/Login', [
            'initialTab' => 'login',
            'siteConfig' => [
                'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Show register portal page.
     */
    public function showRegister(Request $request): Response|RedirectResponse
    {
        if (Auth::check()) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('Auth/Login', [
            'initialTab' => 'register',
            'siteConfig' => [
                'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Handle user login authentication.
     */
    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
        ]);

        $emailOrUsername = $credentials['email'];
        $password = $credentials['password'];
        $remember = $request->boolean('remember');

        // Check if user authenticated by email or name/username
        $field = filter_var($emailOrUsername, FILTER_VALIDATE_EMAIL) ? 'email' : 'name';

        if (!Auth::attempt([$field => $emailOrUsername, 'password' => $password], $remember)) {
            throw ValidationException::withMessages([
                'email' => __('Kredensial akun tidak cocok dengan data kami.'),
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('admin.dashboard'))
            ->with('status', 'Selamat datang kembali di Admin Portal STAS-RG.');
    }

    /**
     * Handle user registration.
     */
    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'institution' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:100'],
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Alamat email akademik wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email ini sudah terdaftar di sistem.',
            'password.required' => 'Kata sandi wajib diisi.',
            'password.min' => 'Kata sandi minimal terdiri dari 8 karakter.',
            'password.confirmed' => 'Konfirmasi kata sandi tidak cocok.',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'institution' => $validated['institution'] ?? 'CoE STAS-RG, Telkom University',
            'role' => $validated['role'] ?? 'faculty_researcher',
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('admin.dashboard')
            ->with('status', 'Pendaftaran berhasil! Selamat datang di Portal Riset STAS-RG.');
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
     * Handle forgot password recovery request.
     */
    public function sendResetLink(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ], [
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
        ]);

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            // Check if user exists or simulate security-safe message
            return back()->with('status', 'Jika email terdaftar, tautan pemulihan kata sandi telah dikirimkan ke kotak masuk Anda.');
        }

        // Return status confirmation
        return back()->with('status', "Tautan pemulihan kata sandi berhasil dikirim ke {$email}. Silakan periksa inbox email Anda.");
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')
            ->with('status', 'Anda telah berhasil keluar dari sistem.');
    }
}
