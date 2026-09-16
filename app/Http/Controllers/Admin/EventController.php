<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\UpcomingEvent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    /**
     * Display a listing of upcoming academic symposia, masterclasses, and workshops.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $tag = $request->query('tag');
        $status = $request->query('status');

        $query = UpcomingEvent::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('title_id', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('description_id', 'like', "%{$search}%")
                    ->orWhere('speaker_name', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
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

        $events = $query->orderBy('order')->orderByDesc('id')->get();

        $stats = [
            'total' => UpcomingEvent::count(),
            'active' => UpcomingEvent::where('is_active', true)->count(),
            'featured' => UpcomingEvent::where('is_featured', true)->count(),
            'symposia_masterclass' => UpcomingEvent::whereIn('tag', ['UPCOMING SYMPOSIUM', 'EXECUTIVE MASTERCLASS', 'INDUSTRY ROUNDTABLE'])->count(),
            'workshops_webinars' => UpcomingEvent::whereIn('tag', ['HANDS-ON WORKSHOP', 'PUBLIC WEBINAR', 'TECHNICAL BOOTCAMP'])->count(),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
            'contact_email' => SiteSetting::get('contact_email', 'stasrg@telkomuniversity.ac.id'),
        ];

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
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
     * Store a newly created upcoming event in storage.
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
        if (!$request->filled('description') && $request->filled('description_id')) {
            $request->merge(['description' => $request->input('description_id')]);
        }
        if (!$request->filled('description_id') && $request->filled('description')) {
            $request->merge(['description_id' => $request->input('description')]);
        }

        $validated = $request->validate([
            'tag' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:500'],
            'title_id' => ['nullable', 'string', 'max:500'],
            'description' => ['required', 'string'],
            'description_id' => ['nullable', 'string'],
            'date_display' => ['required', 'string', 'max:100'],
            'time_display' => ['nullable', 'string', 'max:100'],
            'location' => ['required', 'string', 'max:255'],
            'speaker_name' => ['nullable', 'string', 'max:255'],
            'speaker_title' => ['nullable', 'string', 'max:255'],
            'registration_link' => ['nullable', 'string', 'max:500'],
            'brochure_url' => ['nullable', 'string', 'max:500'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:3072'],
            'quota_text' => ['nullable', 'string', 'max:100'],
            'primary_action_text' => ['nullable', 'string', 'max:100'],
            'secondary_action_text' => ['nullable', 'string', 'max:100'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
            'event_date' => ['nullable', 'date'],
        ]);

        $imageUrl = $validated['image_url'] ?? '/assets/images/research/digital_twin.png';

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('events', 'public');
            $imageUrl = '/storage/' . $path;
        }

        $order = $validated['order'] ?? ((UpcomingEvent::max('order') ?? 0) + 1);

        UpcomingEvent::create([
            'tag' => strtoupper($validated['tag']),
            'title' => $validated['title'],
            'title_id' => ($validated['title_id'] ?? null) ?: $validated['title'],
            'description' => $validated['description'],
            'description_id' => ($validated['description_id'] ?? null) ?: $validated['description'],
            'date_display' => $validated['date_display'],
            'time_display' => ($validated['time_display'] ?? null) ?: '09:00 - 16:00 WIB',
            'location' => $validated['location'],
            'speaker_name' => $validated['speaker_name'] ?? null,
            'speaker_title' => $validated['speaker_title'] ?? null,
            'registration_link' => ($validated['registration_link'] ?? null) ?: '#contact',
            'brochure_url' => $validated['brochure_url'] ?? null,
            'image_url' => $imageUrl,
            'quota_text' => ($validated['quota_text'] ?? null) ?: 'Terbatas / Registrasi Dibuka',
            'primary_action_text' => ($validated['primary_action_text'] ?? null) ?: 'Daftar Sekarang',
            'secondary_action_text' => ($validated['secondary_action_text'] ?? null) ?: 'Unduh Brosur',
            'is_featured' => $validated['is_featured'] ?? true,
            'is_active' => $validated['is_active'] ?? true,
            'order' => $order,
            'event_date' => $validated['event_date'] ?? null,
        ]);

        return redirect()->route('admin.events.index')
            ->with('status', 'Agenda kegiatan ilmiah baru berhasil ditambahkan.');
    }

    /**
     * Update the specified upcoming event in storage.
     */
    public function update(Request $request, UpcomingEvent $event): RedirectResponse
    {
        // Auto fallback between ID and EN if one is provided
        if (!$request->filled('title') && $request->filled('title_id')) {
            $request->merge(['title' => $request->input('title_id')]);
        }
        if (!$request->filled('title_id') && $request->filled('title')) {
            $request->merge(['title_id' => $request->input('title')]);
        }
        if (!$request->filled('description') && $request->filled('description_id')) {
            $request->merge(['description' => $request->input('description_id')]);
        }
        if (!$request->filled('description_id') && $request->filled('description')) {
            $request->merge(['description_id' => $request->input('description')]);
        }

        $validated = $request->validate([
            'tag' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:500'],
            'title_id' => ['nullable', 'string', 'max:500'],
            'description' => ['required', 'string'],
            'description_id' => ['nullable', 'string'],
            'date_display' => ['required', 'string', 'max:100'],
            'time_display' => ['nullable', 'string', 'max:100'],
            'location' => ['required', 'string', 'max:255'],
            'speaker_name' => ['nullable', 'string', 'max:255'],
            'speaker_title' => ['nullable', 'string', 'max:255'],
            'registration_link' => ['nullable', 'string', 'max:500'],
            'brochure_url' => ['nullable', 'string', 'max:500'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:3072'],
            'quota_text' => ['nullable', 'string', 'max:100'],
            'primary_action_text' => ['nullable', 'string', 'max:100'],
            'secondary_action_text' => ['nullable', 'string', 'max:100'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'order' => ['nullable', 'integer'],
            'event_date' => ['nullable', 'date'],
        ]);

        $imageUrl = $validated['image_url'] ?? $event->image_url;

        if ($request->hasFile('image_file')) {
            if ($event->image_url && str_starts_with($event->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $event->image_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image_file')->store('events', 'public');
            $imageUrl = '/storage/' . $path;
        }

        $event->update([
            'tag' => strtoupper($validated['tag']),
            'title' => $validated['title'],
            'title_id' => ($validated['title_id'] ?? null) ?: $validated['title'],
            'description' => $validated['description'],
            'description_id' => ($validated['description_id'] ?? null) ?: $validated['description'],
            'date_display' => $validated['date_display'],
            'time_display' => ($validated['time_display'] ?? null) ?: $event->time_display,
            'location' => $validated['location'],
            'speaker_name' => $validated['speaker_name'] ?? null,
            'speaker_title' => $validated['speaker_title'] ?? null,
            'registration_link' => ($validated['registration_link'] ?? null) ?: $event->registration_link,
            'brochure_url' => $validated['brochure_url'] ?? null,
            'image_url' => $imageUrl,
            'quota_text' => ($validated['quota_text'] ?? null) ?: $event->quota_text,
            'primary_action_text' => ($validated['primary_action_text'] ?? null) ?: $event->primary_action_text,
            'secondary_action_text' => ($validated['secondary_action_text'] ?? null) ?: $event->secondary_action_text,
            'is_featured' => $validated['is_featured'] ?? $event->is_featured,
            'is_active' => $validated['is_active'] ?? $event->is_active,
            'order' => $validated['order'] ?? $event->order,
            'event_date' => $validated['event_date'] ?? $event->event_date,
        ]);

        return redirect()->route('admin.events.index')
            ->with('status', 'Agenda kegiatan ilmiah berhasil diperbarui.');
    }

    /**
     * Remove the specified upcoming event from storage.
     */
    public function destroy(UpcomingEvent $event): RedirectResponse
    {
        if ($event->image_url && str_starts_with($event->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $event->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $event->delete();

        return redirect()->route('admin.events.index')
            ->with('status', 'Agenda kegiatan ilmiah telah berhasil dihapus.');
    }

    /**
     * Toggle the active status of an event.
     */
    public function toggleStatus(UpcomingEvent $event): RedirectResponse
    {
        $event->update([
            'is_active' => !$event->is_active,
        ]);

        $statusText = $event->is_active ? 'dipublikasikan' : 'dinonaktifkan (draft)';

        return redirect()->back()
            ->with('status', "Status agenda '{$event->title}' berhasil {$statusText}.");
    }

    /**
     * Toggle the featured status of an event.
     */
    public function toggleFeatured(UpcomingEvent $event): RedirectResponse
    {
        $event->update([
            'is_featured' => !$event->is_featured,
        ]);

        $statusText = $event->is_featured ? 'dijadikan agenda utama' : 'dihapus dari agenda utama';

        return redirect()->back()
            ->with('status', "Agenda '{$event->title}' berhasil {$statusText}.");
    }

    /**
     * Reorder events in bulk.
     */
    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'orders' => ['required', 'array'],
            'orders.*.id' => ['required', 'exists:upcoming_events,id'],
            'orders.*.order' => ['required', 'integer'],
        ]);

        foreach ($request->input('orders') as $item) {
            UpcomingEvent::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->back()
            ->with('status', 'Urutan agenda berhasil diperbarui.');
    }
}
