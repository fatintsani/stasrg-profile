<?php

namespace App\Http\Controllers;

use App\Models\AboutHighlight;
use App\Models\Article;
use App\Models\EnterpriseService;
use App\Models\Partner;
use App\Models\Publication;
use App\Models\ResearchDomain;
use App\Models\ResearchMetric;
use App\Models\ResearchProject;
use App\Models\SiteSetting;
use App\Models\UpcomingEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    /**
     * Display the CoE STAS-RG landing page.
     */
    public function index(): Response
    {
        $metrics = ResearchMetric::orderBy('order')->get();
        $aboutHighlights = AboutHighlight::orderBy('order')->get();
        $domains = ResearchDomain::orderBy('order')->get();
        $projects = ResearchProject::where('featured', true)->orderBy('order')->get();
        $publications = Publication::orderBy('order')->get();
        $services = EnterpriseService::orderBy('order')->get();
        $partners = Partner::orderBy('order')->get();
        $articles = Article::orderBy('order')->get();
        $events = UpcomingEvent::orderBy('order')->get();

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'tagline' => SiteSetting::get('tagline', 'Advancing Sustainable Technology Through Research & Innovation'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
            'sub_institution' => SiteSetting::get('sub_institution', 'School of Industrial & Systems Engineering'),
            'director_quote' => SiteSetting::get('director_quote', 'Pioneering sustainable technology with impact. We build solutions that scale beyond laboratories.'),
            'director_name' => SiteSetting::get('director_name', 'Prof. Dr. Ir. Adiwijaya, S.Si., M.Si.'),
            'director_title' => SiteSetting::get('director_title', 'Lead Advisor & Research Center Director'),
            'contact_email' => SiteSetting::get('contact_email', 'stasrg@telkomuniversity.ac.id'),
            'contact_phone' => SiteSetting::get('contact_phone', '+62 22 756 4108'),
            'address' => SiteSetting::get('address', 'School of Industrial & Systems Engineering, Telkom University, Bandung, Indonesia'),
            'social_links' => [
                'linkedin' => 'https://linkedin.com/company/stas-rg',
                'github' => 'https://github.com/stas-rg',
                'youtube' => 'https://youtube.com/@stas-rg',
                'twitter' => 'https://twitter.com/stas_rg',
            ],
        ];

        return Inertia::render('Home', [
            'metrics' => $metrics,
            'aboutHighlights' => $aboutHighlights,
            'domains' => $domains,
            'projects' => $projects,
            'publications' => $publications,
            'services' => $services,
            'partners' => $partners,
            'articles' => $articles,
            'events' => $events,
            'siteConfig' => $siteConfig,
        ]);
    }
}
