<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ResearchDomain;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DomainController extends Controller
{
    /**
     * Display a listing of research domains in the admin panel.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $query = ResearchDomain::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('title_id', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%")
                  ->orWhere('summary_id', 'like', "%{$search}%")
                  ->orWhere('domain_number', 'like', "%{$search}%")
                  ->orWhere('lead_researcher', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '') {
            $query->where('is_active', $status === 'active' || $status === '1');
        }

        $domains = $query->orderBy('order', 'asc')->get();

        $stats = [
            'total_domains' => ResearchDomain::count(),
            'active_domains' => ResearchDomain::where('is_active', true)->count(),
            'inactive_domains' => ResearchDomain::where('is_active', false)->count(),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
        ];

        return Inertia::render('Admin/Domains/Index', [
            'domains' => $domains,
            'stats' => $stats,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? '',
            ],
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Store a newly created research domain in storage.
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
            'domain_number' => ['required', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'title_id' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:research_domains,slug'],
            'icon' => ['required', 'string', 'max:50'],
            'summary' => ['required', 'string'],
            'summary_id' => ['nullable', 'string'],
            'focus_areas' => ['nullable', 'array'],
            'focus_areas.*' => ['string', 'max:100'],
            'lead_researcher' => ['nullable', 'string', 'max:255'],
            'link' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        // Ensure unique slug
        $originalSlug = $slug;
        $count = 1;
        while (ResearchDomain::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        $order = $validated['order'] ?? ((ResearchDomain::max('order') ?? 0) + 1);

        ResearchDomain::create([
            'domain_number' => $validated['domain_number'],
            'title' => $validated['title'],
            'title_id' => $validated['title_id'] ?? $validated['title'],
            'slug' => $slug,
            'icon' => $validated['icon'],
            'summary' => $validated['summary'],
            'summary_id' => $validated['summary_id'] ?? $validated['summary'],
            'focus_areas' => $validated['focus_areas'] ?? [],
            'lead_researcher' => $validated['lead_researcher'] ?? null,
            'link' => $validated['link'] ?? '#',
            'order' => $order,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->route('admin.domains.index')
            ->with('status', 'Domain Riset baru berhasil ditambahkan!');
    }

    /**
     * Update the specified research domain in storage.
     */
    public function update(Request $request, ResearchDomain $domain): RedirectResponse
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
            'domain_number' => ['required', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'title_id' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:research_domains,slug,' . $domain->id],
            'icon' => ['required', 'string', 'max:50'],
            'summary' => ['required', 'string'],
            'summary_id' => ['nullable', 'string'],
            'focus_areas' => ['nullable', 'array'],
            'focus_areas.*' => ['string', 'max:100'],
            'lead_researcher' => ['nullable', 'string', 'max:255'],
            'link' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : $domain->slug;

        $domain->update([
            'domain_number' => $validated['domain_number'],
            'title' => $validated['title'],
            'title_id' => $validated['title_id'] ?? $validated['title'],
            'slug' => $slug,
            'icon' => $validated['icon'],
            'summary' => $validated['summary'],
            'summary_id' => $validated['summary_id'] ?? $validated['summary'],
            'focus_areas' => $validated['focus_areas'] ?? [],
            'lead_researcher' => $validated['lead_researcher'] ?? null,
            'link' => $validated['link'] ?? '#',
            'order' => $validated['order'] ?? $domain->order,
            'is_active' => $validated['is_active'] ?? $domain->is_active,
        ]);

        return redirect()->route('admin.domains.index')
            ->with('status', 'Domain Riset berhasil diperbarui!');
    }

    /**
     * Remove the specified research domain from storage.
     */
    public function destroy(ResearchDomain $domain): RedirectResponse
    {
        $domain->delete();

        return redirect()->route('admin.domains.index')
            ->with('status', 'Research Domain successfully removed.');
    }

    /**
     * Toggle active status of a research domain.
     */
    public function toggleStatus(ResearchDomain $domain): RedirectResponse
    {
        $domain->update([
            'is_active' => !$domain->is_active,
        ]);

        return redirect()->route('admin.domains.index')
            ->with('status', 'Domain status updated successfully.');
    }

    /**
     * Reorder research domains.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'domains' => ['required', 'array'],
            'domains.*.id' => ['required', 'exists:research_domains,id'],
            'domains.*.order' => ['required', 'integer'],
        ]);

        foreach ($validated['domains'] as $item) {
            ResearchDomain::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->route('admin.domains.index')
            ->with('status', 'Domain ordering successfully updated!');
    }
}
