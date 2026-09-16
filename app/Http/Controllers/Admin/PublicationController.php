<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PublicationController extends Controller
{
    /**
     * Display a listing of publications in the admin panel.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $year = $request->query('year');
        $quartile = $request->query('quartile');
        $status = $request->query('status');

        $query = Publication::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('title_id', 'like', "%{$search}%")
                  ->orWhere('authors', 'like', "%{$search}%")
                  ->orWhere('venue', 'like', "%{$search}%")
                  ->orWhere('doi', 'like', "%{$search}%")
                  ->orWhere('indexing', 'like', "%{$search}%");
            });
        }

        if ($year) {
            $query->where('year', (int) $year);
        }

        if ($quartile) {
            if ($quartile === 'Q1') {
                $query->where(function ($q) {
                    $q->where('quartile', 'Q1')->orWhere('badge', 'like', '%Q1%');
                });
            } elseif ($quartile === 'Conference') {
                $query->where(function ($q) {
                    $q->where('badge_type', 'gray')->orWhere('badge', 'like', '%Conference%');
                });
            } else {
                $query->where('quartile', $quartile);
            }
        }

        if ($status !== null && $status !== '') {
            if ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            } elseif ($status === 'featured') {
                $query->where('is_featured', true);
            }
        }

        $publications = $query->orderBy('year', 'desc')->orderBy('order', 'asc')->orderBy('id', 'desc')->get();

        $allYears = Publication::distinct()->pluck('year')->filter()->sortDesc()->values();

        $stats = [
            'total_publications' => Publication::count(),
            'q1_count' => Publication::where('badge_type', 'green')->orWhere('quartile', 'Q1')->count(),
            'conference_count' => Publication::where('badge_type', 'gray')->orWhere('badge', 'like', '%Conference%')->count(),
            'total_citations' => Publication::sum('citation_count'),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
        ];

        return Inertia::render('Admin/Publications/Index', [
            'publications' => $publications,
            'stats' => $stats,
            'years' => $allYears,
            'filters' => [
                'search' => $search ?? '',
                'year' => $year ?? '',
                'quartile' => $quartile ?? '',
                'status' => $status ?? '',
            ],
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Store a newly created publication in storage.
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
        if (!$request->filled('abstract') && $request->filled('abstract_id')) {
            $request->merge(['abstract' => $request->input('abstract_id')]);
        }
        if (!$request->filled('abstract_id') && $request->filled('abstract')) {
            $request->merge(['abstract_id' => $request->input('abstract')]);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:500'],
            'title_id' => ['nullable', 'string', 'max:500'],
            'authors' => ['required', 'string', 'max:500'],
            'venue' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:2000', 'max:2050'],
            'doi' => ['required', 'string', 'max:255'],
            'doi_url' => ['nullable', 'string', 'max:500'],
            'pdf_url' => ['nullable', 'string', 'max:500'],
            'badge' => ['required', 'string', 'max:100'],
            'badge_type' => ['required', 'string', 'in:green,gray,blue'],
            'quartile' => ['nullable', 'string', 'max:50'],
            'indexing' => ['nullable', 'string', 'max:100'],
            'domain_tag' => ['nullable', 'string', 'max:100'],
            'abstract' => ['nullable', 'string'],
            'abstract_id' => ['nullable', 'string'],
            'citation_count' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $order = $validated['order'] ?? ((Publication::max('order') ?? 0) + 1);

        $doiUrl = !empty($validated['doi_url'])
            ? $validated['doi_url']
            : (str_starts_with($validated['doi'], 'http') ? $validated['doi'] : 'https://doi.org/' . preg_replace('/^DOI:\s*/i', '', $validated['doi']));

        Publication::create([
            'title' => $validated['title'],
            'title_id' => $validated['title_id'] ?: $validated['title'],
            'authors' => $validated['authors'],
            'venue' => $validated['venue'],
            'year' => (int) $validated['year'],
            'doi' => $validated['doi'],
            'doi_url' => $doiUrl,
            'pdf_url' => $validated['pdf_url'] ?: '#',
            'badge' => $validated['badge'],
            'badge_type' => $validated['badge_type'],
            'quartile' => $validated['quartile'] ?? 'Q1',
            'indexing' => $validated['indexing'] ?? 'Scopus / WoS',
            'domain_tag' => $validated['domain_tag'] ?? null,
            'abstract' => $validated['abstract'] ?? null,
            'abstract_id' => $validated['abstract_id'] ?: ($validated['abstract'] ?? null),
            'citation_count' => $validated['citation_count'] ?? 0,
            'is_featured' => $validated['is_featured'] ?? true,
            'is_active' => $validated['is_active'] ?? true,
            'slug' => Str::slug($validated['title']),
            'order' => $order,
        ]);

        return redirect()->route('admin.publications.index')
            ->with('status', 'Publikasi ilmiah baru berhasil ditambahkan ke repositori.');
    }

    /**
     * Update the specified publication in storage.
     */
    public function update(Request $request, Publication $publication): RedirectResponse
    {
        // Auto fallback between ID and EN if one is provided
        if (!$request->filled('title') && $request->filled('title_id')) {
            $request->merge(['title' => $request->input('title_id')]);
        }
        if (!$request->filled('title_id') && $request->filled('title')) {
            $request->merge(['title_id' => $request->input('title')]);
        }
        if (!$request->filled('abstract') && $request->filled('abstract_id')) {
            $request->merge(['abstract' => $request->input('abstract_id')]);
        }
        if (!$request->filled('abstract_id') && $request->filled('abstract')) {
            $request->merge(['abstract_id' => $request->input('abstract')]);
        }
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:500'],
            'title_id' => ['nullable', 'string', 'max:500'],
            'authors' => ['required', 'string', 'max:500'],
            'venue' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:2000', 'max:2050'],
            'doi' => ['required', 'string', 'max:255'],
            'doi_url' => ['nullable', 'string', 'max:500'],
            'pdf_url' => ['nullable', 'string', 'max:500'],
            'badge' => ['required', 'string', 'max:100'],
            'badge_type' => ['required', 'string', 'in:green,gray,blue'],
            'quartile' => ['nullable', 'string', 'max:50'],
            'indexing' => ['nullable', 'string', 'max:100'],
            'domain_tag' => ['nullable', 'string', 'max:100'],
            'abstract' => ['nullable', 'string'],
            'abstract_id' => ['nullable', 'string'],
            'citation_count' => ['nullable', 'integer', 'min:0'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $doiUrl = !empty($validated['doi_url'])
            ? $validated['doi_url']
            : (str_starts_with($validated['doi'], 'http') ? $validated['doi'] : 'https://doi.org/' . preg_replace('/^DOI:\s*/i', '', $validated['doi']));

        $publication->update([
            'title' => $validated['title'],
            'title_id' => $validated['title_id'] ?: $validated['title'],
            'authors' => $validated['authors'],
            'venue' => $validated['venue'],
            'year' => (int) $validated['year'],
            'doi' => $validated['doi'],
            'doi_url' => $doiUrl,
            'pdf_url' => $validated['pdf_url'] ?: '#',
            'badge' => $validated['badge'],
            'badge_type' => $validated['badge_type'],
            'quartile' => $validated['quartile'] ?? $publication->quartile,
            'indexing' => $validated['indexing'] ?? $publication->indexing,
            'domain_tag' => $validated['domain_tag'] ?? $publication->domain_tag,
            'abstract' => $validated['abstract'] ?? $publication->abstract,
            'abstract_id' => $validated['abstract_id'] ?: ($validated['abstract'] ?? $publication->abstract_id),
            'citation_count' => $validated['citation_count'] ?? $publication->citation_count,
            'is_featured' => $validated['is_featured'] ?? false,
            'is_active' => $validated['is_active'] ?? false,
            'order' => $validated['order'] ?? $publication->order,
        ]);

        return redirect()->route('admin.publications.index')
            ->with('status', 'Perubahan pada data publikasi berhasil disimpan.');
    }

    /**
     * Remove the specified publication from storage.
     */
    public function destroy(Publication $publication): RedirectResponse
    {
        $pubTitle = $publication->title_id ?: $publication->title;
        $publication->delete();

        return redirect()->route('admin.publications.index')
            ->with('status', "Publikasi \"{$pubTitle}\" berhasil dihapus.");
    }

    /**
     * Toggle active publication status.
     */
    public function toggleStatus(Publication $publication): RedirectResponse
    {
        $publication->update([
            'is_active' => !$publication->is_active,
        ]);

        $statusLabel = $publication->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->route('admin.publications.index')
            ->with('status', "Status publikasi berhasil {$statusLabel}.");
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured(Publication $publication): RedirectResponse
    {
        $publication->update([
            'is_featured' => !$publication->is_featured,
        ]);

        $statusLabel = $publication->is_featured ? 'dijadikan Publikasi Utama' : 'dihapus dari Publikasi Utama';

        return redirect()->route('admin.publications.index')
            ->with('status', "Publikasi berhasil {$statusLabel}.");
    }

    /**
     * Reorder publications list.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', 'exists:publications,id'],
            'orders.*.order' => ['required', 'integer'],
        ]);

        foreach ($request->input('orders') as $item) {
            Publication::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->route('admin.publications.index')
            ->with('status', 'Urutan publikasi berhasil diperbarui.');
    }
}
