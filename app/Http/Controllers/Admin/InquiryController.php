<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    /**
     * Display a listing of client and partner inquiries in the admin panel.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');
        $category = $request->query('category');
        $priority = $request->query('priority');

        $query = Inquiry::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('organization', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '' && $status !== 'all') {
            $query->where('status', $status);
        }

        if ($category !== null && $category !== '' && $category !== 'all') {
            $query->where('category', $category);
        }

        if ($priority !== null && $priority !== '' && $priority !== 'all') {
            $query->where('priority', $priority);
        }

        $inquiries = $query->orderBy('created_at', 'desc')->get();

        $stats = [
            'total_inquiries' => Inquiry::count(),
            'unread_inquiries' => Inquiry::where('status', 'unread')->count(),
            'in_progress_inquiries' => Inquiry::where('status', 'in_progress')->count(),
            'resolved_inquiries' => Inquiry::where('status', 'resolved')->count(),
        ];

        $siteConfig = [
            'center_name' => SiteSetting::get('center_name', 'CoE STAS-RG'),
            'institution' => SiteSetting::get('institution', 'Telkom University'),
        ];

        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries,
            'stats' => $stats,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? '',
                'category' => $category ?? '',
                'priority' => $priority ?? '',
            ],
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Update the specified inquiry's status, priority, or notes.
     */
    public function update(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:unread,in_progress,resolved,archived',
            'priority' => 'nullable|in:normal,high,urgent',
            'admin_notes' => 'nullable|string',
            'mark_replied' => 'nullable|boolean',
        ]);

        if (!empty($validated['mark_replied']) && !$inquiry->replied_at) {
            $validated['replied_at'] = now();
        }

        $inquiry->update($validated);

        return redirect()->back()->with('success', 'Status pesan/permohonan berhasil diperbarui.');
    }

    /**
     * Quick status update endpoint.
     */
    public function updateStatus(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:unread,in_progress,resolved,archived',
        ]);

        $inquiry->update([
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Status pesan berhasil diubah.');
    }

    /**
     * Remove the specified inquiry from database.
     */
    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return redirect()->back()->with('success', 'Pesan permohonan berhasil dihapus.');
    }
}
