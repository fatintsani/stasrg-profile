<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Display a listing of research insights and news articles.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $tag = $request->query('tag');
        $status = $request->query('status');

        $query = Article::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('title_id', 'like', "%{$search}%")
                    ->orWhere('summary', 'like', "%{$search}%")
                    ->orWhere('summary_id', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%")
                    ->orWhere('tag', 'like', "%{$search}%");
            });
        }

        if ($tag && $tag !== 'all') {
            $query->where('tag', $tag);
        }

        if ($status === 'active') {
            $query->where('is_active', true);
        } elseif ($status === 'featured') {
            $query->where('is_featured', true);
        } elseif ($status === 'inactive') {
            $query->where('is_active', false);
        }

        $articles = $query->orderBy('order')->orderByDesc('id')->get();

        $stats = [
            'total' => Article::count(),
            'active' => Article::where('is_active', true)->count(),
            'featured' => Article::where('is_featured', true)->count(),
            'press_grant' => Article::whereIn('tag', ['PRESS RELEASE', 'STRATEGIC GRANT', 'INDUSTRY PARTNERSHIP'])->count(),
            'reports_events' => Article::whereIn('tag', ['RESEARCH REPORT', 'ACADEMIC EVENT', 'POLICY BRIEF'])->count(),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
            'contact_email' => SiteSetting::get('contact_email', 'stasrg@telkomuniversity.ac.id'),
        ];

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'stats' => $stats,
            'filters' => [
                'search' => $search ?? '',
                'tag' => $tag ?? 'all',
                'status' => $status ?? 'all',
            ],
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Store a newly created article in storage.
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
        if (!$request->filled('content') && $request->filled('content_id')) {
            $request->merge(['content' => $request->input('content_id')]);
        }
        if (!$request->filled('content_id') && $request->filled('content')) {
            $request->merge(['content_id' => $request->input('content')]);
        }

        $validated = $request->validate([
            'tag' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:500'],
            'title_id' => ['nullable', 'string', 'max:500'],
            'slug' => ['nullable', 'string', 'max:500', 'unique:articles,slug'],
            'summary' => ['required', 'string'],
            'summary_id' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'content_id' => ['nullable', 'string'],
            'date' => ['required', 'string', 'max:100'],
            'author' => ['nullable', 'string', 'max:255'],
            'read_time' => ['nullable', 'string', 'max:50'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:3072'],
            'external_url' => ['nullable', 'string', 'max:500'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $imageUrl = $validated['image_url'] ?? '/assets/images/research/autonomous_fleet.png';

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('articles', 'public');
            $imageUrl = '/storage/' . $path;
        }

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);

        // Ensure unique slug
        $originalSlug = $slug;
        $count = 1;
        while (Article::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }

        $order = $validated['order'] ?? ((Article::max('order') ?? 0) + 1);

        Article::create([
            'tag' => strtoupper($validated['tag']),
            'title' => $validated['title'],
            'title_id' => ($validated['title_id'] ?? null) ?: $validated['title'],
            'slug' => $slug,
            'summary' => $validated['summary'],
            'summary_id' => ($validated['summary_id'] ?? null) ?: $validated['summary'],
            'content' => $validated['content'] ?? null,
            'content_id' => ($validated['content_id'] ?? null) ?: ($validated['content'] ?? null),
            'date' => $validated['date'],
            'author' => ($validated['author'] ?? null) ?: 'STAS-RG Editorial Board',
            'read_time' => ($validated['read_time'] ?? null) ?: '4 min read',
            'image_url' => $imageUrl,
            'external_url' => $validated['external_url'] ?? null,
            'is_featured' => $validated['is_featured'] ?? true,
            'is_active' => $validated['is_active'] ?? true,
            'order' => $order,
        ]);

        return redirect()->route('admin.articles.index')
            ->with('status', 'Artikel berita riset baru berhasil ditambahkan.');
    }

    /**
     * Update the specified article in storage.
     */
    public function update(Request $request, Article $article): RedirectResponse
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
        if (!$request->filled('content') && $request->filled('content_id')) {
            $request->merge(['content' => $request->input('content_id')]);
        }
        if (!$request->filled('content_id') && $request->filled('content')) {
            $request->merge(['content_id' => $request->input('content')]);
        }

        $validated = $request->validate([
            'tag' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:500'],
            'title_id' => ['nullable', 'string', 'max:500'],
            'slug' => ['nullable', 'string', 'max:500', 'unique:articles,slug,' . $article->id],
            'summary' => ['required', 'string'],
            'summary_id' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'content_id' => ['nullable', 'string'],
            'date' => ['required', 'string', 'max:100'],
            'author' => ['nullable', 'string', 'max:255'],
            'read_time' => ['nullable', 'string', 'max:50'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:3072'],
            'external_url' => ['nullable', 'string', 'max:500'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $imageUrl = $validated['image_url'] ?? $article->image_url;

        if ($request->hasFile('image_file')) {
            if ($article->image_url && str_starts_with($article->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $article->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image_file')->store('articles', 'public');
            $imageUrl = '/storage/' . $path;
        }

        $slug = !empty($validated['slug'])
            ? Str::slug($validated['slug'])
            : ($article->slug ?: Str::slug($validated['title']));

        $article->update([
            'tag' => strtoupper($validated['tag']),
            'title' => $validated['title'],
            'title_id' => ($validated['title_id'] ?? null) ?: $validated['title'],
            'slug' => $slug,
            'summary' => $validated['summary'],
            'summary_id' => ($validated['summary_id'] ?? null) ?: $validated['summary'],
            'content' => $validated['content'] ?? null,
            'content_id' => ($validated['content_id'] ?? null) ?: ($validated['content'] ?? null),
            'date' => $validated['date'],
            'author' => ($validated['author'] ?? null) ?: 'STAS-RG Editorial Board',
            'read_time' => ($validated['read_time'] ?? null) ?: '4 min read',
            'image_url' => $imageUrl,
            'external_url' => $validated['external_url'] ?? null,
            'is_featured' => $validated['is_featured'] ?? $article->is_featured,
            'is_active' => $validated['is_active'] ?? $article->is_active,
            'order' => $validated['order'] ?? $article->order,
        ]);

        return redirect()->route('admin.articles.index')
            ->with('status', 'Artikel berita riset berhasil diperbarui.');
    }

    /**
     * Remove the specified article from storage.
     */
    public function destroy(Article $article): RedirectResponse
    {
        if ($article->image_url && str_starts_with($article->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $article->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $article->delete();

        return redirect()->route('admin.articles.index')
            ->with('status', 'Artikel berita riset telah berhasil dihapus.');
    }

    /**
     * Toggle the active status of an article.
     */
    public function toggleStatus(Article $article): RedirectResponse
    {
        $article->update([
            'is_active' => !$article->is_active,
        ]);

        $statusText = $article->is_active ? 'dipublikasikan' : 'dinonaktifkan (draft)';

        return redirect()->back()
            ->with('status', "Status artikel '{$article->title}' berhasil {$statusText}.");
    }

    /**
     * Toggle the featured status of an article.
     */
    public function toggleFeatured(Article $article): RedirectResponse
    {
        $article->update([
            'is_featured' => !$article->is_featured,
        ]);

        $statusText = $article->is_featured ? 'dijadikan berita utama' : 'dihapus dari berita utama';

        return redirect()->back()
            ->with('status', "Artikel '{$article->title}' berhasil {$statusText}.");
    }

    /**
     * Reorder articles in bulk.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', 'exists:articles,id'],
            'orders.*.order' => ['required', 'integer'],
        ]);

        foreach ($request->input('orders') as $item) {
            Article::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->back()
            ->with('status', 'Urutan artikel berhasil diperbarui.');
    }
}
