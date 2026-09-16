<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    /**
     * Display a listing of strategic partners and industrial alliances.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $status = $request->input('status');

        $query = Partner::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('partnership_type', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('description_id', 'like', "%{$search}%");
            });
        }

        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        if ($status === 'active') {
            $query->where('is_active', true);
        } elseif ($status === 'featured') {
            $query->where('is_featured', true);
        } elseif ($status === 'inactive') {
            $query->where('is_active', false);
        }

        $partners = $query->orderBy('order')->orderBy('id')->get();

        $stats = [
            'total' => Partner::count(),
            'active' => Partner::where('is_active', true)->count(),
            'featured' => Partner::where('is_featured', true)->count(),
            'industry_soe' => Partner::whereIn('category', ['Industry', 'SOE'])->count(),
            'academic_tech' => Partner::whereIn('category', ['Academic', 'Technology'])->count(),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
            'contact_email' => SiteSetting::get('contact_email', 'stasrg@telkomuniversity.ac.id'),
        ];

        return Inertia::render('Admin/Partners/Index', [
            'partners' => $partners,
            'stats' => $stats,
            'filters' => [
                'search' => $search,
                'category' => $category ?? 'all',
                'status' => $status ?? 'all',
            ],
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Store a newly created partner in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:50'],
            'partnership_type' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'description_id' => ['nullable', 'string'],
            'logo_text' => ['nullable', 'string', 'max:100'],
            'logo_url' => ['nullable', 'string', 'max:500'],
            'logo_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:3072'],
            'website_url' => ['nullable', 'string', 'max:500'],
            'established_year' => ['nullable', 'integer', 'min:1900', 'max:2100'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $logoUrl = $validated['logo_url'] ?? null;

        if ($request->hasFile('logo_file')) {
            $path = $request->file('logo_file')->store('partners', 'public');
            $logoUrl = '/storage/' . $path;
        }

        $order = $validated['order'] ?? (Partner::max('order') + 1);

        Partner::create([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'partnership_type' => $validated['partnership_type'] ?? null,
            'description' => $validated['description'] ?? null,
            'description_id' => ($validated['description_id'] ?? null) ?: ($validated['description'] ?? null),
            'logo_text' => ($validated['logo_text'] ?? null) ?: $validated['name'],
            'logo_url' => $logoUrl,
            'website_url' => $validated['website_url'] ?? null,
            'established_year' => $validated['established_year'] ?? date('Y'),
            'is_featured' => $validated['is_featured'] ?? true,
            'is_active' => $validated['is_active'] ?? true,
            'order' => $order,
        ]);

        return redirect()->route('admin.partners.index')
            ->with('status', 'Mitra industri/lembaga baru berhasil ditambahkan.');
    }

    /**
     * Update the specified partner in storage.
     */
    public function update(Request $request, Partner $partner): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:50'],
            'partnership_type' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'description_id' => ['nullable', 'string'],
            'logo_text' => ['nullable', 'string', 'max:100'],
            'logo_url' => ['nullable', 'string', 'max:500'],
            'logo_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:3072'],
            'website_url' => ['nullable', 'string', 'max:500'],
            'established_year' => ['nullable', 'integer', 'min:1900', 'max:2100'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $logoUrl = $validated['logo_url'] ?? $partner->logo_url;

        if ($request->hasFile('logo_file')) {
            // Remove old uploaded logo if exists in storage
            if ($partner->logo_url && str_starts_with($partner->logo_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $partner->logo_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('logo_file')->store('partners', 'public');
            $logoUrl = '/storage/' . $path;
        }

        $partner->update([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'partnership_type' => $validated['partnership_type'] ?? null,
            'description' => $validated['description'] ?? null,
            'description_id' => ($validated['description_id'] ?? null) ?: ($validated['description'] ?? null),
            'logo_text' => ($validated['logo_text'] ?? null) ?: $validated['name'],
            'logo_url' => $logoUrl,
            'website_url' => $validated['website_url'] ?? null,
            'established_year' => $validated['established_year'] ?? $partner->established_year,
            'is_featured' => $validated['is_featured'] ?? false,
            'is_active' => $validated['is_active'] ?? false,
            'order' => $validated['order'] ?? $partner->order,
        ]);

        return redirect()->route('admin.partners.index')
            ->with('status', 'Perubahan pada data mitra berhasil disimpan.');
    }

    /**
     * Remove the specified partner from storage.
     */
    public function destroy(Partner $partner): RedirectResponse
    {
        $partnerName = $partner->name;

        // Delete uploaded file if exists in storage
        if ($partner->logo_url && str_starts_with($partner->logo_url, '/storage/')) {
            $path = str_replace('/storage/', '', $partner->logo_url);
            Storage::disk('public')->delete($path);
        }

        $partner->delete();

        return redirect()->route('admin.partners.index')
            ->with('status', "Mitra \"{$partnerName}\" berhasil dihapus.");
    }

    /**
     * Toggle active partner status.
     */
    public function toggleStatus(Partner $partner): RedirectResponse
    {
        $partner->update([
            'is_active' => !$partner->is_active,
        ]);

        $statusLabel = $partner->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->route('admin.partners.index')
            ->with('status', "Status mitra berhasil {$statusLabel}.");
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured(Partner $partner): RedirectResponse
    {
        $partner->update([
            'is_featured' => !$partner->is_featured,
        ]);

        $statusLabel = $partner->is_featured ? 'dijadikan Mitra Utama' : 'dihapus dari Mitra Utama';

        return redirect()->route('admin.partners.index')
            ->with('status', "Mitra berhasil {$statusLabel}.");
    }

    /**
     * Reorder partners list.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', 'exists:partners,id'],
            'orders.*.order' => ['required', 'integer'],
        ]);

        foreach ($request->input('orders') as $item) {
            Partner::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->route('admin.partners.index')
            ->with('status', 'Urutan mitra berhasil diperbarui.');
    }
}
