<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\EnterpriseService;
use App\Models\Publication;
use App\Models\ResearchDomain;
use App\Models\ResearchProject;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ErrorController extends Controller
{
    /**
     * Display the error page for a specific HTTP status.
     */
    public function show(Request $request, int|string $status = 404): \Symfony\Component\HttpFoundation\Response
    {
        $status = is_numeric($status) ? (int) $status : 404;

        $allowedStatuses = [400, 401, 403, 404, 419, 422, 429, 500, 503];

        if (! in_array($status, $allowedStatuses)) {
            $status = 404;
        }

        $domains = ResearchDomain::where('is_active', true)->orderBy('order')->get();
        $projects = ResearchProject::where('is_active', true)->orderBy('order')->get();
        $publications = Publication::where('is_active', true)->orderBy('order')->get();
        $services = EnterpriseService::where('is_active', true)->orderBy('order')->get();
        $articles = Article::where('is_active', true)->orderBy('order')->orderByDesc('id')->get();

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'tagline' => SiteSetting::get('tagline', 'Advancing Sustainable Technology Through Research & Innovation'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
            'sub_institution' => SiteSetting::get('sub_institution', 'School of Industrial & Systems Engineering'),
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

        return Inertia::render('Error', [
            'status' => $status,
            'domains' => $domains,
            'projects' => $projects,
            'publications' => $publications,
            'services' => $services,
            'articles' => $articles,
            'siteConfig' => $siteConfig,
        ])->toResponse($request)->setStatusCode($status);
    }
}
