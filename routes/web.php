<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

Route::get('/', [LandingPageController::class, 'index'])->name('home');

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/forgot-password', [AuthController::class, 'showForgotPassword'])->name('password.request');
Route::post('/forgot-password', [AuthController::class, 'sendResetLink'])->name('password.email');

// Admin Portal Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('index');
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/projects', [AdminDashboardController::class, 'index'])->name('projects');
    Route::get('/domains', [AdminDashboardController::class, 'index'])->name('domains');
    Route::get('/publications', [AdminDashboardController::class, 'index'])->name('publications');
    Route::get('/researchers', [AdminDashboardController::class, 'index'])->name('researchers');
    Route::get('/services', [AdminDashboardController::class, 'index'])->name('services');
    Route::get('/news-events', [AdminDashboardController::class, 'index'])->name('news.events');
    Route::get('/assets', [AdminDashboardController::class, 'index'])->name('assets');
    Route::get('/messages', [AdminDashboardController::class, 'index'])->name('messages');
    Route::get('/templates', [AdminDashboardController::class, 'index'])->name('templates');
    Route::get('/analytics', [AdminDashboardController::class, 'index'])->name('analytics');
    Route::get('/settings', [AdminDashboardController::class, 'index'])->name('settings');
});

