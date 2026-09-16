<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EnterpriseService;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of enterprise services in the admin panel.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $query = EnterpriseService::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('title_id', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%")
                  ->orWhere('summary_id', 'like', "%{$search}%")
                  ->orWhere('service_number', 'like', "%{$search}%")
                  ->orWhere('target_industry', 'like', "%{$search}%")
                  ->orWhere('lead_advisor', 'like', "%{$search}%");
            });
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

        $services = $query->orderBy('order', 'asc')->orderBy('service_number', 'asc')->get();

        $stats = [
            'total_services' => EnterpriseService::count(),
            'active_services' => EnterpriseService::where('is_active', true)->count(),
            'featured_services' => EnterpriseService::where('is_featured', true)->count(),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
        ];

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
            'stats' => $stats,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? '',
            ],
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Store a newly created enterprise service in storage.
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
            'service_number' => ['required', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'title_id' => ['nullable', 'string', 'max:255'],
            'summary' => ['required', 'string'],
            'summary_id' => ['nullable', 'string'],
            'icon' => ['required', 'string', 'max:50'],
            'action_label' => ['nullable', 'string', 'max:100'],
            'action_label_id' => ['nullable', 'string', 'max:100'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string', 'max:100'],
            'target_industry' => ['nullable', 'string', 'max:255'],
            'lead_advisor' => ['nullable', 'string', 'max:255'],
            'link' => ['nullable', 'string', 'max:255'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $order = $validated['order'] ?? ((EnterpriseService::max('order') ?? 0) + 1);

        EnterpriseService::create([
            'service_number' => $validated['service_number'],
            'title' => $validated['title'],
            'title_id' => $validated['title_id'] ?: $validated['title'],
            'summary' => $validated['summary'],
            'summary_id' => $validated['summary_id'] ?: $validated['summary'],
            'icon' => $validated['icon'],
            'action_label' => $validated['action_label'] ?: 'Explore Service',
            'action_label_id' => $validated['action_label_id'] ?: 'Pelajari Layanan',
            'features' => $validated['features'] ?? [],
            'target_industry' => $validated['target_industry'] ?? null,
            'lead_advisor' => $validated['lead_advisor'] ?? null,
            'link' => $validated['link'] ?: '#contact',
            'is_featured' => $validated['is_featured'] ?? true,
            'is_active' => $validated['is_active'] ?? true,
            'order' => $order,
        ]);

        return redirect()->route('admin.services.index')
            ->with('status', 'Layanan industri baru berhasil ditambahkan.');
    }

    /**
     * Update the specified enterprise service in storage.
     */
    public function update(Request $request, EnterpriseService $service): RedirectResponse
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
            'service_number' => ['required', 'string', 'max:50'],
            'title' => ['required', 'string', 'max:255'],
            'title_id' => ['nullable', 'string', 'max:255'],
            'summary' => ['required', 'string'],
            'summary_id' => ['nullable', 'string'],
            'icon' => ['required', 'string', 'max:50'],
            'action_label' => ['nullable', 'string', 'max:100'],
            'action_label_id' => ['nullable', 'string', 'max:100'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string', 'max:100'],
            'target_industry' => ['nullable', 'string', 'max:255'],
            'lead_advisor' => ['nullable', 'string', 'max:255'],
            'link' => ['nullable', 'string', 'max:255'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $service->update([
            'service_number' => $validated['service_number'],
            'title' => $validated['title'],
            'title_id' => $validated['title_id'] ?: $validated['title'],
            'summary' => $validated['summary'],
            'summary_id' => $validated['summary_id'] ?: $validated['summary'],
            'icon' => $validated['icon'],
            'action_label' => $validated['action_label'] ?: 'Explore Service',
            'action_label_id' => $validated['action_label_id'] ?: 'Pelajari Layanan',
            'features' => $validated['features'] ?? [],
            'target_industry' => $validated['target_industry'] ?? null,
            'lead_advisor' => $validated['lead_advisor'] ?? null,
            'link' => $validated['link'] ?: '#contact',
            'is_featured' => $validated['is_featured'] ?? false,
            'is_active' => $validated['is_active'] ?? false,
            'order' => $validated['order'] ?? $service->order,
        ]);

        return redirect()->route('admin.services.index')
            ->with('status', 'Perubahan pada data layanan industri berhasil disimpan.');
    }

    /**
     * Remove the specified enterprise service from storage.
     */
    public function destroy(EnterpriseService $service): RedirectResponse
    {
        $serviceTitle = $service->title_id ?: $service->title;
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('status', "Layanan industri \"{$serviceTitle}\" berhasil dihapus.");
    }

    /**
     * Toggle active service status.
     */
    public function toggleStatus(EnterpriseService $service): RedirectResponse
    {
        $service->update([
            'is_active' => !$service->is_active,
        ]);

        $statusLabel = $service->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->route('admin.services.index')
            ->with('status', "Status layanan industri berhasil {$statusLabel}.");
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured(EnterpriseService $service): RedirectResponse
    {
        $service->update([
            'is_featured' => !$service->is_featured,
        ]);

        $statusLabel = $service->is_featured ? 'dijadikan Layanan Utama' : 'dihapus dari Layanan Utama';

        return redirect()->route('admin.services.index')
            ->with('status', "Layanan industri berhasil {$statusLabel}.");
    }

    /**
     * Reorder enterprise services list.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', 'exists:enterprise_services,id'],
            'orders.*.order' => ['required', 'integer'],
        ]);

        foreach ($request->input('orders') as $item) {
            EnterpriseService::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->route('admin.services.index')
            ->with('status', 'Urutan layanan industri berhasil diperbarui.');
    }
}
