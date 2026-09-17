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
use App\Models\Researcher;
use App\Models\SiteSetting;
use App\Models\UpcomingEvent;
use App\Models\User;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    /**
     * Reusable site configuration helper with fallback defaults.
     */
    private function getSiteConfig(): array
    {
        return [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'tagline' => SiteSetting::get('tagline', 'Advancing Sustainable Technology Through Research & Innovation'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
            'sub_institution' => SiteSetting::get('sub_institution', 'School of Industrial & Systems Engineering'),
            'director_quote' => SiteSetting::get('director_quote', 'Pioneering sustainable technology with impact. We build solutions that scale beyond laboratories.'),
            'director_name' => SiteSetting::get('director_name', 'Prof. Dr. Ir. Adiwijaya, S.Si., M.Si.'),
            'director_title' => SiteSetting::get('director_title', 'Lead Advisor & Research Center Director'),
            'contact_email' => SiteSetting::get('contact_email', 'stas-rg@telkomuniversity.ac.id'),
            'contact_phone' => SiteSetting::get('contact_phone', '+62 22 756 4108'),
            'address' => SiteSetting::get('address', 'Jl. Telekomunikasi No.1, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257'),
            'maps_url' => SiteSetting::get('maps_url', 'https://maps.app.goo.gl/EQHpqHavYCoRyzST9'),
            'university_url' => SiteSetting::get('university_url', 'https://tel-u.ac.id/stasrg'),
            'social_links' => [
                'linkedin' => SiteSetting::get('social_linkedin', 'https://id.linkedin.com/company/coe-stas-rg'),
                'instagram' => SiteSetting::get('social_instagram', 'https://www.instagram.com/stas.rg'),
                'youtube' => SiteSetting::get('social_youtube', 'https://www.youtube.com/@stas_rg'),
                'github' => SiteSetting::get('social_github', 'https://github.com/stas-rg'),
                'twitter' => SiteSetting::get('social_twitter', 'https://twitter.com/stas_rg'),
            ],
        ];
    }

    /**
     * Display the CoE STAS-RG landing page (Highlights & Overview).
     */
    public function index(): Response
    {
        $projectsCount = ResearchProject::where('is_active', true)->count();
        $publicationsCount = Publication::where('is_active', true)->count();
        $partnersCount = Partner::where('is_active', true)->count();
        $researchersCount = max(
            Researcher::where('is_active', true)->count(),
            User::where('role', '!=', 'student')->count(),
            User::count()
        );

        $metrics = collect([
            [
                'id' => 1,
                'value' => $projectsCount > 0 ? "{$projectsCount}+" : (string) $projectsCount,
                'label' => 'Research Projects',
                'label_id' => 'Proyek Riset',
                'description' => 'Industrial & applied research tracks',
                'description_id' => 'Trek riset industri & terapan aktif',
            ],
            [
                'id' => 2,
                'value' => $publicationsCount > 0 ? "{$publicationsCount}+" : (string) $publicationsCount,
                'label' => 'Publications',
                'label_id' => 'Publikasi Ilmiah',
                'description' => 'Scopus & international indexed papers',
                'description_id' => 'Jurnal & prosiding internasional terindeks',
            ],
            [
                'id' => 3,
                'value' => $partnersCount > 0 ? "{$partnersCount}+" : (string) $partnersCount,
                'label' => 'Strategic Partners',
                'label_id' => 'Mitra Kerjasama',
                'description' => 'Global & industry collaborations',
                'description_id' => 'Kolaborasi industri & mitra internasional',
            ],
            [
                'id' => 4,
                'value' => $researchersCount > 0 ? "{$researchersCount}+" : (string) $researchersCount,
                'label' => 'Research Fellows',
                'label_id' => 'Tim Peneliti',
                'description' => 'Principal researchers & domain experts',
                'description_id' => 'Peneliti utama & ahli multidisiplin',
            ],
        ]);

        $aboutHighlights = AboutHighlight::orderBy('order')->get();
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $projects = ResearchProject::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();
        $partners = Partner::where('is_active', true)->orderBy('order')->get();
        $articles = Article::where('is_active', true)->orderBy('order')->orderByDesc('id')->get();
        $events = UpcomingEvent::orderBy('order')->get();

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
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Dedicated About Us & Center History Page.
     */
    public function about(): Response
    {
        $aboutHighlights = AboutHighlight::orderBy('order')->get();
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('About', [
            'aboutHighlights' => $aboutHighlights,
            'domains' => $domains,
            'publications' => $publications,
            'services' => $services,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Dedicated Research Team & Investigators Directory Page.
     */
    public function team(): Response
    {
        $researchers = Researcher::where('is_active', true)->orderBy('order')->get();
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Team', [
            'researchers' => $researchers,
            'domains' => $domains,
            'publications' => $publications,
            'services' => $services,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Dedicated Research Domains & Focus Pillars Page.
     */
    public function research(): Response
    {
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $projects = ResearchProject::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();
        $researchers = Researcher::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Research', [
            'domains' => $domains,
            'projects' => $projects,
            'publications' => $publications,
            'services' => $services,
            'researchers' => $researchers,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Dedicated Applied Research Projects Catalog Page.
     */
    public function projects(): Response
    {
        $projects = ResearchProject::where('is_active', true)->orderBy('order')->get();
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Projects', [
            'projects' => $projects,
            'domains' => $domains,
            'publications' => $publications,
            'services' => $services,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Dedicated Academic Publications Repository Page.
     */
    public function publications(): Response
    {
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Publications', [
            'publications' => $publications,
            'domains' => $domains,
            'services' => $services,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Dedicated Enterprise Services & Lab Testing Page.
     */
    public function services(): Response
    {
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Services', [
            'services' => $services,
            'domains' => $domains,
            'publications' => $publications,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Dedicated Strategic Partners & Industry Alliances Page.
     */
    public function partners(): Response
    {
        $partners = Partner::where('is_active', true)->orderBy('order')->get();
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Partners', [
            'partners' => $partners,
            'domains' => $domains,
            'publications' => $publications,
            'services' => $services,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Dedicated News, Research Insights & Dispatches Page.
     */
    public function news(): Response
    {
        $articles = Article::where('is_active', true)->orderBy('order')->orderByDesc('id')->get();
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('News', [
            'articles' => $articles,
            'domains' => $domains,
            'publications' => $publications,
            'services' => $services,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Dedicated Academic Symposia & Workshops Page.
     */
    public function events(): Response
    {
        $events = UpcomingEvent::orderBy('order')->get();
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();

        return Inertia::render('Events', [
            'events' => $events,
            'domains' => $domains,
            'publications' => $publications,
            'services' => $services,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Display the CoE STAS-RG comprehensive Privacy Policy page.
     */
    public function privacy(): Response
    {
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $projects = ResearchProject::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();
        $articles = Article::where('is_active', true)->orderBy('order')->orderByDesc('id')->get();

        return Inertia::render('PrivacyPolicy', [
            'domains' => $domains,
            'projects' => $projects,
            'publications' => $publications,
            'services' => $services,
            'articles' => $articles,
            'siteConfig' => $this->getSiteConfig(),
            'lastUpdated' => date('d F Y'),
        ]);
    }

    /**
     * Display the CoE STAS-RG comprehensive Terms of Use & Association page.
     */
    public function terms(): Response
    {
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $projects = ResearchProject::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();
        $articles = Article::where('is_active', true)->orderBy('order')->orderByDesc('id')->get();

        return Inertia::render('TermsOfUse', [
            'domains' => $domains,
            'projects' => $projects,
            'publications' => $publications,
            'services' => $services,
            'articles' => $articles,
            'siteConfig' => $this->getSiteConfig(),
            'lastUpdated' => date('d F Y'),
        ]);
    }

    /**
     * Display the CoE STAS-RG comprehensive Academic Ethics & Research Integrity page.
     */
    public function ethics(): Response
    {
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $projects = ResearchProject::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();
        $articles = Article::where('is_active', true)->orderBy('order')->orderByDesc('id')->get();

        return Inertia::render('AcademicEthics', [
            'domains' => $domains,
            'projects' => $projects,
            'publications' => $publications,
            'services' => $services,
            'articles' => $articles,
            'siteConfig' => $this->getSiteConfig(),
            'lastUpdated' => date('d F Y'),
        ]);
    }

    /**
     * Display the CoE STAS-RG comprehensive Sitemap & Directory page.
     */
    public function sitemap(): Response
    {
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $projects = ResearchProject::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();
        $articles = Article::where('is_active', true)->orderBy('order')->orderByDesc('id')->get();
        $events = UpcomingEvent::orderBy('order')->get();

        return Inertia::render('Sitemap', [
            'domains' => $domains,
            'projects' => $projects,
            'publications' => $publications,
            'services' => $services,
            'articles' => $articles,
            'events' => $events,
            'siteConfig' => $this->getSiteConfig(),
            'lastUpdated' => date('d F Y'),
        ]);
    }

    /**
     * Display the CoE STAS-RG comprehensive Contact & Campus Location page.
     */
    public function contact(): Response
    {
        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $projects = ResearchProject::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();
        $articles = Article::where('is_active', true)->orderBy('order')->orderByDesc('id')->get();

        return Inertia::render('Contact', [
            'domains' => $domains,
            'projects' => $projects,
            'publications' => $publications,
            'services' => $services,
            'articles' => $articles,
            'siteConfig' => $this->getSiteConfig(),
        ]);
    }

    /**
     * Handle public contact & proposal inquiry form submissions.
     */
    public function submitContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'organization' => 'nullable|string|max:255',
            'category' => 'required|string|max:100',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $validated['ip_address'] = $request->ip();
        $validated['status'] = 'unread';
        $validated['priority'] = 'normal';

        Inquiry::create($validated);

        return redirect()->back()->with('success', 'Pesan permohonan Anda telah berhasil dikirim. Tim sekretariat riset kami akan segera menghubungi Anda.');
    }
}
