<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\EnterpriseService;
use App\Models\Partner;
use App\Models\Publication;
use App\Models\ResearchDomain;
use App\Models\ResearchProject;
use App\Models\SiteSetting;
use App\Models\UpcomingEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the Admin Dashboard with CMS metrics and recent items.
     */
    public function index(Request $request): Response
    {
        $stats = [
            'projects_count' => ResearchProject::count(),
            'publications_count' => Publication::count(),
            'partners_count' => Partner::count(),
            'articles_count' => Article::count(),
            'events_count' => UpcomingEvent::count(),
            'domains_count' => ResearchDomain::count(),
            'services_count' => EnterpriseService::count(),
        ];

        $recentProjects = ResearchProject::orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $recentPublications = Publication::orderBy('created_at', 'desc')
            ->take(4)
            ->get();

        $recentArticles = Article::orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        $upcomingEvents = UpcomingEvent::orderBy('order', 'asc')
            ->take(3)
            ->get();

        $domains = ResearchDomain::orderBy('order', 'asc')->get();

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
            'sub_institution' => SiteSetting::get('sub_institution', 'Center of Excellence'),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentProjects' => $recentProjects,
            'recentPublications' => $recentPublications,
            'recentArticles' => $recentArticles,
            'upcomingEvents' => $upcomingEvents,
            'domains' => $domains,
            'siteConfig' => $siteConfig,
        ]);
    }
}
