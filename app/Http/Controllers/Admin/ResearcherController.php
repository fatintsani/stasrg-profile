<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Researcher;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResearcherController extends Controller
{
    /**
     * Display a listing of research team members / investigators in the admin panel.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $roleFilter = $request->query('role');
        $status = $request->query('status');

        $query = Researcher::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('title_degree', 'like', "%{$search}%")
                  ->orWhere('role', 'like', "%{$search}%")
                  ->orWhere('role_id', 'like', "%{$search}%")
                  ->orWhere('specialization', 'like', "%{$search}%")
                  ->orWhere('specialization_id', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($roleFilter) {
            $query->where(function ($q) use ($roleFilter) {
                $q->where('role', 'like', "%{$roleFilter}%")
                  ->orWhere('role_id', 'like', "%{$roleFilter}%");
            });
        }

        if ($status !== null && $status !== '') {
            $query->where('is_active', $status === 'active' || $status === '1');
        }

        $researchers = $query->orderBy('order', 'asc')->orderBy('id', 'asc')->get();

        $stats = [
            'total_researchers' => Researcher::count(),
            'active_researchers' => Researcher::where('is_active', true)->count(),
            'inactive_researchers' => Researcher::where('is_active', false)->count(),
            'featured_researchers' => Researcher::where('is_featured', true)->count(),
            'principal_investigators' => Researcher::where(function ($q) {
                $q->where('role', 'like', '%Principal%')
                  ->orWhere('role_id', 'like', '%Utama%')
                  ->orWhere('role', 'like', '%Director%');
            })->count(),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
        ];

        return Inertia::render('Admin/Team/Index', [
            'researchers' => $researchers,
            'stats' => $stats,
            'filters' => [
                'search' => $search ?? '',
                'role' => $roleFilter ?? '',
                'status' => $status ?? '',
            ],
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Store a newly created researcher in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // Auto fallback between ID and EN if one is provided
        if (!$request->filled('role') && $request->filled('role_id')) {
            $request->merge(['role' => $request->input('role_id')]);
        }
        if (!$request->filled('role_id') && $request->filled('role')) {
            $request->merge(['role_id' => $request->input('role')]);
        }
        if (!$request->filled('specialization') && $request->filled('specialization_id')) {
            $request->merge(['specialization' => $request->input('specialization_id')]);
        }
        if (!$request->filled('specialization_id') && $request->filled('specialization')) {
            $request->merge(['specialization_id' => $request->input('specialization')]);
        }
        if (!$request->filled('bio') && $request->filled('bio_id')) {
            $request->merge(['bio' => $request->input('bio_id')]);
        }
        if (!$request->filled('bio_id') && $request->filled('bio')) {
            $request->merge(['bio_id' => $request->input('bio')]);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title_degree' => ['nullable', 'string', 'max:150'],
            'role' => ['required', 'string', 'max:255'],
            'role_id' => ['nullable', 'string', 'max:255'],
            'specialization' => ['required', 'string', 'max:255'],
            'specialization_id' => ['nullable', 'string', 'max:255'],
            'department' => ['nullable', 'string', 'max:255'],
            'institution' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'bio' => ['nullable', 'string'],
            'bio_id' => ['nullable', 'string'],
            'avatar_url' => ['nullable', 'string', 'max:500'],
            'scholar_url' => ['nullable', 'string', 'max:500'],
            'scopus_id' => ['nullable', 'string', 'max:100'],
            'orcid' => ['nullable', 'string', 'max:100'],
            'linkedin_url' => ['nullable', 'string', 'max:500'],
            'focus_areas' => ['nullable', 'array'],
            'focus_areas.*' => ['string', 'max:100'],
            'publications_count' => ['nullable', 'integer', 'min:0'],
            'projects_count' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $maxOrder = Researcher::max('order') ?? 0;

        Researcher::create([
            'name' => $validated['name'],
            'title_degree' => $validated['title_degree'] ?? null,
            'role' => $validated['role'],
            'role_id' => $validated['role_id'] ?? $validated['role'],
            'specialization' => $validated['specialization'],
            'specialization_id' => $validated['specialization_id'] ?? $validated['specialization'],
            'department' => $validated['department'] ?? 'School of Industrial Engineering',
            'institution' => $validated['institution'] ?? 'Telkom University',
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'bio_id' => $validated['bio_id'] ?? $validated['bio'] ?? null,
            'avatar_url' => $validated['avatar_url'] ?? null,
            'scholar_url' => $validated['scholar_url'] ?? null,
            'scopus_id' => $validated['scopus_id'] ?? null,
            'orcid' => $validated['orcid'] ?? null,
            'linkedin_url' => $validated['linkedin_url'] ?? null,
            'focus_areas' => $validated['focus_areas'] ?? [],
            'publications_count' => $validated['publications_count'] ?? 0,
            'projects_count' => $validated['projects_count'] ?? 0,
            'is_featured' => $validated['is_featured'] ?? false,
            'is_active' => $validated['is_active'] ?? true,
            'order' => $validated['order'] ?? ($maxOrder + 1),
        ]);

        return redirect()->route('admin.team.index')
            ->with('success', 'Profil anggota tim peneliti berhasil ditambahkan.');
    }

    /**
     * Update the specified researcher in storage.
     */
    public function update(Request $request, Researcher $researcher): RedirectResponse
    {
        // Auto fallback between ID and EN if one is provided
        if (!$request->filled('role') && $request->filled('role_id')) {
            $request->merge(['role' => $request->input('role_id')]);
        }
        if (!$request->filled('role_id') && $request->filled('role')) {
            $request->merge(['role_id' => $request->input('role')]);
        }
        if (!$request->filled('specialization') && $request->filled('specialization_id')) {
            $request->merge(['specialization' => $request->input('specialization_id')]);
        }
        if (!$request->filled('specialization_id') && $request->filled('specialization')) {
            $request->merge(['specialization_id' => $request->input('specialization')]);
        }
        if (!$request->filled('bio') && $request->filled('bio_id')) {
            $request->merge(['bio' => $request->input('bio_id')]);
        }
        if (!$request->filled('bio_id') && $request->filled('bio')) {
            $request->merge(['bio_id' => $request->input('bio')]);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title_degree' => ['nullable', 'string', 'max:150'],
            'role' => ['required', 'string', 'max:255'],
            'role_id' => ['nullable', 'string', 'max:255'],
            'specialization' => ['required', 'string', 'max:255'],
            'specialization_id' => ['nullable', 'string', 'max:255'],
            'department' => ['nullable', 'string', 'max:255'],
            'institution' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'bio' => ['nullable', 'string'],
            'bio_id' => ['nullable', 'string'],
            'avatar_url' => ['nullable', 'string', 'max:500'],
            'scholar_url' => ['nullable', 'string', 'max:500'],
            'scopus_id' => ['nullable', 'string', 'max:100'],
            'orcid' => ['nullable', 'string', 'max:100'],
            'linkedin_url' => ['nullable', 'string', 'max:500'],
            'focus_areas' => ['nullable', 'array'],
            'focus_areas.*' => ['string', 'max:100'],
            'publications_count' => ['nullable', 'integer', 'min:0'],
            'projects_count' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $researcher->update([
            'name' => $validated['name'],
            'title_degree' => $validated['title_degree'] ?? null,
            'role' => $validated['role'],
            'role_id' => $validated['role_id'] ?? $validated['role'],
            'specialization' => $validated['specialization'],
            'specialization_id' => $validated['specialization_id'] ?? $validated['specialization'],
            'department' => $validated['department'] ?? $researcher->department,
            'institution' => $validated['institution'] ?? $researcher->institution,
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'bio_id' => $validated['bio_id'] ?? $validated['bio'] ?? null,
            'avatar_url' => $validated['avatar_url'] ?? $researcher->avatar_url,
            'scholar_url' => $validated['scholar_url'] ?? null,
            'scopus_id' => $validated['scopus_id'] ?? null,
            'orcid' => $validated['orcid'] ?? null,
            'linkedin_url' => $validated['linkedin_url'] ?? null,
            'focus_areas' => $validated['focus_areas'] ?? [],
            'publications_count' => $validated['publications_count'] ?? $researcher->publications_count,
            'projects_count' => $validated['projects_count'] ?? $researcher->projects_count,
            'is_featured' => $validated['is_featured'] ?? $researcher->is_featured,
            'is_active' => $validated['is_active'] ?? $researcher->is_active,
            'order' => $validated['order'] ?? $researcher->order,
        ]);

        return redirect()->route('admin.team.index')
            ->with('success', 'Profil anggota tim peneliti berhasil diperbarui.');
    }

    /**
     * Remove the specified researcher from storage.
     */
    public function destroy(Researcher $researcher): RedirectResponse
    {
        $researcher->delete();

        return redirect()->route('admin.team.index')
            ->with('success', 'Anggota tim peneliti berhasil dihapus.');
    }

    /**
     * Toggle the active status of the specified researcher.
     */
    public function toggleStatus(Researcher $researcher): RedirectResponse
    {
        $researcher->update([
            'is_active' => !$researcher->is_active,
        ]);

        $status = $researcher->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->route('admin.team.index')
            ->with('success', "Status anggota tim berhasil {$status}.");
    }

    /**
     * Toggle the featured status of the specified researcher.
     */
    public function toggleFeatured(Researcher $researcher): RedirectResponse
    {
        $researcher->update([
            'is_featured' => !$researcher->is_featured,
        ]);

        $status = $researcher->is_featured ? 'dijadikan peneliti unggulan' : 'dihapus dari peneliti unggulan';

        return redirect()->route('admin.team.index')
            ->with('success', "Peneliti berhasil {$status}.");
    }

    /**
     * Reorder researchers.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', 'integer', 'exists:researchers,id'],
            'orders.*.order' => ['required', 'integer'],
        ]);

        foreach ($validated['orders'] as $item) {
            Researcher::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->route('admin.team.index')
            ->with('success', 'Urutan anggota tim peneliti berhasil diperbarui.');
    }
}
