<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\EnterpriseService;
use App\Models\Partner;
use App\Models\Publication;
use App\Models\ResearchDomain;
use App\Models\ResearchMetric;
use App\Models\ResearchProject;
use App\Models\Researcher;
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
            'active_projects_count' => ResearchProject::where('is_active', true)->count(),
            'publications_count' => Publication::count(),
            'partners_count' => Partner::count(),
            'articles_count' => Article::count(),
            'events_count' => UpcomingEvent::count(),
            'domains_count' => ResearchDomain::count(),
            'services_count' => EnterpriseService::count(),
            'researchers_count' => Researcher::count(),
            'metrics_count' => ResearchMetric::count(),
        ];

        $recentProjects = ResearchProject::where('is_active', true)
            ->orderBy('order', 'asc')
            ->orderBy('id', 'desc')
            ->take(5)
            ->get();

        $recentPublications = Publication::where('is_active', true)
            ->orderBy('order', 'asc')
            ->orderBy('year', 'desc')
            ->take(4)
            ->get();

        $recentArticles = Article::where('is_active', true)
            ->orderBy('order', 'asc')
            ->orderBy('id', 'desc')
            ->take(3)
            ->get();

        $upcomingEvents = UpcomingEvent::where('is_active', true)
            ->orderBy('order', 'asc')
            ->take(3)
            ->get();

        $domains = ResearchDomain::where('is_active', true)
            ->orderBy('order', 'asc')
            ->take(6)
            ->get();

        $headlineMetrics = ResearchMetric::where('is_active', true)
            ->orderBy('order', 'asc')
            ->take(4)
            ->get();

        $recentResearchers = Researcher::where('is_active', true)
            ->orderBy('order', 'asc')
            ->take(4)
            ->get();

        $recentPartners = Partner::where('is_active', true)
            ->orderBy('order', 'asc')
            ->take(6)
            ->get();

        $recentServices = EnterpriseService::where('is_active', true)
            ->orderBy('order', 'asc')
            ->take(3)
            ->get();

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
            'sub_institution' => SiteSetting::get('sub_institution', 'Center of Excellence'),
            'tagline' => SiteSetting::get('tagline', 'Advancing Sustainable Technology Through Research & Innovation'),
            'director_name' => SiteSetting::get('director_name', 'Prof. Dr. Ir. Adiwijaya, S.Si., M.Si.'),
            'director_title' => SiteSetting::get('director_title', 'Lead Advisor & Research Center Director'),
            'contact_email' => SiteSetting::get('contact_email', 'stasrg@telkomuniversity.ac.id'),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentProjects' => $recentProjects,
            'recentPublications' => $recentPublications,
            'recentArticles' => $recentArticles,
            'upcomingEvents' => $upcomingEvents,
            'domains' => $domains,
            'headlineMetrics' => $headlineMetrics,
            'recentResearchers' => $recentResearchers,
            'recentPartners' => $recentPartners,
            'recentServices' => $recentServices,
            'siteConfig' => $siteConfig,
        ]);
    }
}
