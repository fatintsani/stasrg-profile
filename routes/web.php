<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\ErrorController;

Route::get('/', [LandingPageController::class, 'index'])->name('home');

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');

Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.submit');

Route::get('/forgot-password', [AuthController::class, 'showForgotPassword'])->name('password.request');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('password.email');

Route::get('/reset-password/{token}', [AuthController::class, 'showResetPassword'])->name('password.reset');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');

Route::match(['get', 'post'], '/logout', [AuthController::class, 'logout'])->name('logout');

use App\Http\Controllers\Admin\DomainController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\PublicationController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\EventController;

// Admin Management Portal Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    // Research Domains Management
    Route::get('/domains', [DomainController::class, 'index'])->name('domains.index');
    Route::post('/domains', [DomainController::class, 'store'])->name('domains.store');
    Route::put('/domains/{domain}', [DomainController::class, 'update'])->name('domains.update');
    Route::delete('/domains/{domain}', [DomainController::class, 'destroy'])->name('domains.destroy');
    Route::post('/domains/{domain}/toggle', [DomainController::class, 'toggleStatus'])->name('domains.toggle');
    Route::post('/domains/reorder', [DomainController::class, 'reorder'])->name('domains.reorder');

    // Research Projects Management
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
    Route::post('/projects/{project}/toggle', [ProjectController::class, 'toggleStatus'])->name('projects.toggle');
    Route::post('/projects/{project}/toggle-featured', [ProjectController::class, 'toggleFeatured'])->name('projects.toggle-featured');
    Route::post('/projects/reorder', [ProjectController::class, 'reorder'])->name('projects.reorder');

    // Academic Publications Management
    Route::get('/publications', [PublicationController::class, 'index'])->name('publications.index');
    Route::post('/publications', [PublicationController::class, 'store'])->name('publications.store');
    Route::put('/publications/{publication}', [PublicationController::class, 'update'])->name('publications.update');
    Route::delete('/publications/{publication}', [PublicationController::class, 'destroy'])->name('publications.destroy');
    Route::post('/publications/{publication}/toggle', [PublicationController::class, 'toggleStatus'])->name('publications.toggle');
    Route::post('/publications/{publication}/toggle-featured', [PublicationController::class, 'toggleFeatured'])->name('publications.toggle-featured');
    Route::post('/publications/reorder', [PublicationController::class, 'reorder'])->name('publications.reorder');

    // Enterprise & Advisory Services Management
    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');
    Route::post('/services/{service}/toggle', [ServiceController::class, 'toggleStatus'])->name('services.toggle');
    Route::post('/services/{service}/toggle-featured', [ServiceController::class, 'toggleFeatured'])->name('services.toggle-featured');
    Route::post('/services/reorder', [ServiceController::class, 'reorder'])->name('services.reorder');

    // Strategic Partners & Industrial Alliances Management
    Route::get('/partners', [PartnerController::class, 'index'])->name('partners.index');
    Route::post('/partners', [PartnerController::class, 'store'])->name('partners.store');
    Route::put('/partners/{partner}', [PartnerController::class, 'update'])->name('partners.update');
    Route::delete('/partners/{partner}', [PartnerController::class, 'destroy'])->name('partners.destroy');
    Route::post('/partners/{partner}/toggle', [PartnerController::class, 'toggleStatus'])->name('partners.toggle');
    Route::post('/partners/{partner}/toggle-featured', [PartnerController::class, 'toggleFeatured'])->name('partners.toggle-featured');
    Route::post('/partners/reorder', [PartnerController::class, 'reorder'])->name('partners.reorder');

    // News & Research Insights Articles Management
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    Route::post('/articles/{article}/toggle', [ArticleController::class, 'toggleStatus'])->name('articles.toggle');
    Route::post('/articles/{article}/toggle-featured', [ArticleController::class, 'toggleFeatured'])->name('articles.toggle-featured');
    Route::post('/articles/reorder', [ArticleController::class, 'reorder'])->name('articles.reorder');

    // Upcoming Academic Symposia & Masterclasses Management
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');
    Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');
    Route::post('/events/{event}/toggle', [EventController::class, 'toggleStatus'])->name('events.toggle');
    Route::post('/events/{event}/toggle-featured', [EventController::class, 'toggleFeatured'])->name('events.toggle-featured');
    Route::post('/events/reorder', [EventController::class, 'reorder'])->name('events.reorder');
});

// Error Pages Route
Route::get('/errors/{status?}', [ErrorController::class, 'show'])->name('errors.show');
