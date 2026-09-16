<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ResearchProject;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of research projects in the admin panel.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $category = $request->query('category');
        $status = $request->query('status');

        $query = ResearchProject::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('title_id', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%")
                  ->orWhere('summary_id', 'like', "%{$search}%")
                  ->orWhere('lead_researcher', 'like', "%{$search}%")
                  ->orWhere('category_tag', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }

        if ($category) {
            $query->where('category', $category);
        }

        if ($status !== null && $status !== '') {
            if ($status === 'featured') {
                $query->where('featured', true);
            } elseif ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        $projects = $query->orderBy('order', 'asc')->orderBy('id', 'desc')->get();

        $allCategories = ResearchProject::distinct()->pluck('category')->filter()->values();

        $stats = [
            'total_projects' => ResearchProject::count(),
            'featured_projects' => ResearchProject::where('featured', true)->count(),
            'active_projects' => ResearchProject::where('is_active', true)->count(),
            'categories_count' => $allCategories->count(),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
        ];

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'stats' => $stats,
            'categories' => $allCategories,
            'filters' => [
                'search' => $search ?? '',
                'category' => $category ?? '',
                'status' => $status ?? '',
            ],
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Store a newly created research project in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // Auto fallback between ID and EN if one is provided
        if (!$request->filled('title') && $request->filled('title_id')) {
            $request->merge(['title' => $request->input('title_id')]);
        }
        if (!$request->filled('title_id') && $request->filled('title')) {
            $request->merge(['title_id' => $request->input('title')]);
        }
        if (!$request->filled('summary') && $request->filled('summary_id')) {
            $request->merge(['summary' => $request->input('summary_id')]);
        }
        if (!$request->filled('summary_id') && $request->filled('summary')) {
            $request->merge(['summary_id' => $request->input('summary')]);
        }

        $validated = $request->validate([
            'category' => ['required', 'string', 'max:100'],
            'category_tag' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:255'],
            'title_id' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:research_projects,slug'],
            'image_url' => ['required', 'string', 'max:500'],
            'lead_researcher' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string'],
            'summary_id' => ['nullable', 'string'],
            'tech_stack' => ['nullable', 'array'],
            'tech_stack.*' => ['string', 'max:100'],
            'case_study_url' => ['nullable', 'string', 'max:255'],
            'funding_source' => ['nullable', 'string', 'max:255'],
            'start_year' => ['nullable', 'integer'],
            'end_year' => ['nullable', 'integer'],
            'featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        // Ensure unique slug
        $originalSlug = $slug;
        $count = 1;
        while (ResearchProject::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        $order = $validated['order'] ?? ((ResearchProject::max('order') ?? 0) + 1);

        ResearchProject::create([
            'category' => $validated['category'],
            'category_tag' => strtoupper($validated['category_tag']),
            'title' => $validated['title'],
            'title_id' => $validated['title_id'] ?: $validated['title'],
            'slug' => $slug,
            'image_url' => $validated['image_url'],
            'lead_researcher' => $validated['lead_researcher'],
            'summary' => $validated['summary'],
            'summary_id' => $validated['summary_id'] ?: $validated['summary'],
            'tech_stack' => $validated['tech_stack'] ?? [],
            'case_study_url' => $validated['case_study_url'] ?: "#project-{$slug}",
            'funding_source' => $validated['funding_source'] ?? null,
            'start_year' => $validated['start_year'] ?? null,
            'end_year' => $validated['end_year'] ?? null,
            'featured' => $validated['featured'] ?? true,
            'is_active' => $validated['is_active'] ?? true,
            'order' => $order,
        ]);

        return redirect()->route('admin.projects.index')
            ->with('status', 'Proyek Riset Unggulan baru berhasil ditambahkan.');
    }

    /**
     * Update the specified research project in storage.
     */
    public function update(Request $request, ResearchProject $project): RedirectResponse
    {
        // Auto fallback between ID and EN if one is provided
        if (!$request->filled('title') && $request->filled('title_id')) {
            $request->merge(['title' => $request->input('title_id')]);
        }
        if (!$request->filled('title_id') && $request->filled('title')) {
            $request->merge(['title_id' => $request->input('title')]);
        }
        if (!$request->filled('summary') && $request->filled('summary_id')) {
            $request->merge(['summary' => $request->input('summary_id')]);
        }
        if (!$request->filled('summary_id') && $request->filled('summary')) {
            $request->merge(['summary_id' => $request->input('summary')]);
        }

        $validated = $request->validate([
            'category' => ['required', 'string', 'max:100'],
            'category_tag' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:255'],
            'title_id' => ['nullable', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:research_projects,slug,' . $project->id],
            'image_url' => ['required', 'string', 'max:500'],
            'lead_researcher' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string'],
            'summary_id' => ['nullable', 'string'],
            'tech_stack' => ['nullable', 'array'],
            'tech_stack.*' => ['string', 'max:100'],
            'case_study_url' => ['nullable', 'string', 'max:255'],
            'funding_source' => ['nullable', 'string', 'max:255'],
            'start_year' => ['nullable', 'integer'],
            'end_year' => ['nullable', 'integer'],
            'featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $project->update([
            'category' => $validated['category'],
            'category_tag' => strtoupper($validated['category_tag']),
            'title' => $validated['title'],
            'title_id' => $validated['title_id'] ?: $validated['title'],
            'slug' => Str::slug($validated['slug']),
            'image_url' => $validated['image_url'],
            'lead_researcher' => $validated['lead_researcher'],
            'summary' => $validated['summary'],
            'summary_id' => $validated['summary_id'] ?: $validated['summary'],
            'tech_stack' => $validated['tech_stack'] ?? [],
            'case_study_url' => $validated['case_study_url'] ?: "#project-{$project->slug}",
            'funding_source' => $validated['funding_source'] ?? null,
            'start_year' => $validated['start_year'] ?? null,
            'end_year' => $validated['end_year'] ?? null,
            'featured' => $validated['featured'] ?? false,
            'is_active' => $validated['is_active'] ?? false,
            'order' => $validated['order'] ?? $project->order,
        ]);

        return redirect()->route('admin.projects.index')
            ->with('status', 'Perubahan pada proyek riset berhasil disimpan.');
    }

    /**
     * Remove the specified research project from storage.
     */
    public function destroy(ResearchProject $project): RedirectResponse
    {
        $projectTitle = $project->title_id ?: $project->title;
        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('status', "Proyek riset \"{$projectTitle}\" berhasil dihapus.");
    }

    /**
     * Toggle active publication status.
     */
    public function toggleStatus(ResearchProject $project): RedirectResponse
    {
        $project->update([
            'is_active' => !$project->is_active,
        ]);

        $statusLabel = $project->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->route('admin.projects.index')
            ->with('status', "Status proyek riset berhasil {$statusLabel}.");
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured(ResearchProject $project): RedirectResponse
    {
        $project->update([
            'featured' => !$project->featured,
        ]);

        $statusLabel = $project->featured ? 'dijadikan Proyek Unggulan' : 'dihapus dari Proyek Unggulan';

        return redirect()->route('admin.projects.index')
            ->with('status', "Proyek riset berhasil {$statusLabel}.");
    }

    /**
     * Reorder research projects list.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', 'exists:research_projects,id'],
            'orders.*.order' => ['required', 'integer'],
        ]);

        foreach ($request->input('orders') as $item) {
            ResearchProject::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->route('admin.projects.index')
            ->with('status', 'Urutan proyek riset berhasil diperbarui.');
    }
}
