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
use App\Models\SiteSetting;
use App\Models\UpcomingEvent;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MetricController extends Controller
{
    /**
     * Get live count for specific metric source.
     */
    protected function getLiveCount(string $sourceType): int
    {
        return match ($sourceType) {
            'auto_projects' => ResearchProject::where('is_active', true)->count(),
            'auto_services' => EnterpriseService::where('is_active', true)->count(),
            'auto_partners' => Partner::where('is_active', true)->count(),
            'auto_researchers' => max(
                \App\Models\Researcher::where('is_active', true)->count(),
                User::count()
            ),
            'auto_publications' => Publication::where('is_active', true)->count(),
            'auto_domains' => ResearchDomain::where('is_active', true)->count(),
            'auto_articles' => Article::where('is_active', true)->count(),
            'auto_events' => UpcomingEvent::where('is_active', true)->count(),
            default => 0,
        };
    }

    /**
     * Format a count into a display string (e.g. "50+" or "12").
     */
    protected function formatCount(int $count, bool $withPlus = true): string
    {
        if ($count <= 0) {
            return '0';
        }
        return ($withPlus && $count >= 5) ? "{$count}+" : (string) $count;
    }

    /**
     * Display a listing of research metrics/statistics in the admin panel.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $query = ResearchMetric::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('label', 'like', "%{$search}%")
                  ->orWhere('label_id', 'like', "%{$search}%")
                  ->orWhere('value', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('description_id', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '') {
            $query->where('is_active', $status === 'active' || $status === '1');
        }

        $metrics = $query->orderBy('order', 'asc')->get();

        // Calculate real-time database counts
        $liveCounts = [
            'projects' => ResearchProject::where('is_active', true)->count(),
            'services' => EnterpriseService::where('is_active', true)->count(),
            'partners' => Partner::where('is_active', true)->count(),
            'researchers' => max(
                \App\Models\Researcher::where('is_active', true)->count(),
                User::count()
            ),
            'publications' => Publication::where('is_active', true)->count(),
            'domains' => ResearchDomain::where('is_active', true)->count(),
            'articles' => Article::where('is_active', true)->count(),
            'events' => UpcomingEvent::where('is_active', true)->count(),
        ];

        $stats = [
            'total_metrics' => ResearchMetric::count(),
            'active_metrics' => ResearchMetric::where('is_active', true)->count(),
            'inactive_metrics' => ResearchMetric::where('is_active', false)->count(),
            'dynamic_metrics' => ResearchMetric::where('source_type', '!=', 'manual')->count(),
            'connected_records' => array_sum($liveCounts),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
        ];

        return Inertia::render('Admin/Metrics/Index', [
            'metrics' => $metrics,
            'stats' => $stats,
            'liveCounts' => $liveCounts,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? '',
            ],
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Store a newly created research metric in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // Auto fallback between ID and EN if one is provided
        if (!$request->filled('label') && $request->filled('label_id')) {
            $request->merge(['label' => $request->input('label_id')]);
        }
        if (!$request->filled('label_id') && $request->filled('label')) {
            $request->merge(['label_id' => $request->input('label')]);
        }
        if (!$request->filled('description') && $request->filled('description_id')) {
            $request->merge(['description' => $request->input('description_id')]);
        }
        if (!$request->filled('description_id') && $request->filled('description')) {
            $request->merge(['description_id' => $request->input('description')]);
        }

        $validated = $request->validate([
            'value' => ['required', 'string', 'max:50'],
            'label' => ['required', 'string', 'max:255'],
            'label_id' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'description_id' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'source_type' => ['nullable', 'string', 'max:50'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $sourceType = $validated['source_type'] ?? 'manual';
        $value = $validated['value'];

        // If source is auto and user chose auto-value
        if ($sourceType !== 'manual' && empty($value)) {
            $count = $this->getLiveCount($sourceType);
            $value = $this->formatCount($count);
        }

        $maxOrder = ResearchMetric::max('order') ?? 0;

        ResearchMetric::create([
            'value' => $value,
            'label' => $validated['label'],
            'label_id' => $validated['label_id'] ?? $validated['label'],
            'description' => $validated['description'],
            'description_id' => $validated['description_id'] ?? $validated['description'],
            'icon' => $validated['icon'] ?? 'TrendingUp',
            'source_type' => $sourceType,
            'order' => $validated['order'] ?? ($maxOrder + 1),
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->route('admin.metrics.index')
            ->with('success', 'Indikator statistik riset berhasil ditambahkan.');
    }

    /**
     * Update the specified research metric in storage.
     */
    public function update(Request $request, ResearchMetric $metric): RedirectResponse
    {
        // Auto fallback between ID and EN if one is provided
        if (!$request->filled('label') && $request->filled('label_id')) {
            $request->merge(['label' => $request->input('label_id')]);
        }
        if (!$request->filled('label_id') && $request->filled('label')) {
            $request->merge(['label_id' => $request->input('label')]);
        }
        if (!$request->filled('description') && $request->filled('description_id')) {
            $request->merge(['description' => $request->input('description_id')]);
        }
        if (!$request->filled('description_id') && $request->filled('description')) {
            $request->merge(['description_id' => $request->input('description')]);
        }

        $validated = $request->validate([
            'value' => ['required', 'string', 'max:50'],
            'label' => ['required', 'string', 'max:255'],
            'label_id' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'description_id' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:50'],
            'source_type' => ['nullable', 'string', 'max:50'],
            'order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $sourceType = $validated['source_type'] ?? $metric->source_type ?? 'manual';
        $value = $validated['value'];

        $metric->update([
            'value' => $value,
            'label' => $validated['label'],
            'label_id' => $validated['label_id'] ?? $validated['label'],
            'description' => $validated['description'],
            'description_id' => $validated['description_id'] ?? $validated['description'],
            'icon' => $validated['icon'] ?? $metric->icon ?? 'TrendingUp',
            'source_type' => $sourceType,
            'order' => $validated['order'] ?? $metric->order,
            'is_active' => $validated['is_active'] ?? $metric->is_active,
        ]);

        return redirect()->route('admin.metrics.index')
            ->with('success', 'Indikator statistik riset berhasil diperbarui.');
    }

    /**
     * Remove the specified research metric from storage.
     */
    public function destroy(ResearchMetric $metric): RedirectResponse
    {
        $metric->delete();

        return redirect()->route('admin.metrics.index')
            ->with('success', 'Indikator statistik riset berhasil dihapus.');
    }

    /**
     * Toggle the active status of the specified research metric.
     */
    public function toggleStatus(ResearchMetric $metric): RedirectResponse
    {
        $metric->update([
            'is_active' => !$metric->is_active,
        ]);

        $status = $metric->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->route('admin.metrics.index')
            ->with('success', "Indikator statistik riset berhasil {$status}.");
    }

    /**
     * Reorder research metrics.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', 'integer', 'exists:research_metrics,id'],
            'orders.*.order' => ['required', 'integer'],
        ]);

        foreach ($validated['orders'] as $item) {
            ResearchMetric::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->route('admin.metrics.index')
            ->with('success', 'Urutan indikator statistik riset berhasil diperbarui.');
    }

    /**
     * Sync live values from database into all dynamic metrics.
     */
    public function syncLive(): RedirectResponse
    {
        $metrics = ResearchMetric::where('source_type', '!=', 'manual')->get();
        $updated = 0;

        foreach ($metrics as $metric) {
            $count = $this->getLiveCount($metric->source_type);
            $newValue = $this->formatCount($count);
            $metric->update(['value' => $newValue]);
            $updated++;
        }

        return redirect()->route('admin.metrics.index')
            ->with('success', "Berhasil menyinkronkan {$updated} indikator statistik dengan data database terbaru.");
    }
}
