<?php

namespace Tests\Feature;

use App\Models\UpcomingEvent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminEventTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_admin_events_page_renders_successfully(): void
    {
        $response = $this->get('/admin/events');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Events/Index')
            ->has('events')
            ->has('stats')
            ->has('filters')
            ->has('siteConfig')
        );
    }

    public function test_admin_can_filter_events_by_search_and_tag(): void
    {
        $response = $this->get('/admin/events?tag=UPCOMING+SYMPOSIUM');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Events/Index')
            ->has('events')
        );

        $responseSearch = $this->get('/admin/events?search=Symposium');
        $responseSearch->assertStatus(200);
        $responseSearch->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Events/Index')
            ->has('events')
        );
    }

    public function test_admin_can_create_event_with_bilingual_fallback(): void
    {
        $payload = [
            'tag' => 'UPCOMING SYMPOSIUM',
            'title_id' => 'Simposium Kecerdasan Artifisial & Otomasi Industri 2026',
            'description_id' => 'Deskripsi komprehensif mengenai simposium kecerdasan buatan nasional.',
            'date_display' => '10-12 NOV 2026',
            'time_display' => '08:00 - 17:00 WIB',
            'location' => 'Auditorium Gd. Damar Telkom University',
            'speaker_name' => 'Prof. Dr. Ir. Adiwijaya',
            'speaker_title' => 'Lead Advisor & Research Director',
            'registration_link' => 'https://stasrg.org/register-ai',
            'brochure_url' => 'https://stasrg.org/tor-ai.pdf',
            'quota_text' => 'Terbuka untuk 100 Peserta',
            'is_featured' => true,
            'is_active' => true,
        ];

        $response = $this->post('/admin/events', $payload);
        $response->assertRedirect('/admin/events');
        $response->assertSessionHas('status');

        $this->assertDatabaseHas('upcoming_events', [
            'title_id' => 'Simposium Kecerdasan Artifisial & Otomasi Industri 2026',
            'speaker_name' => 'Prof. Dr. Ir. Adiwijaya',
            'location' => 'Auditorium Gd. Damar Telkom University',
            'is_featured' => true,
            'is_active' => true,
        ]);
    }

    public function test_admin_can_create_event_with_uploaded_poster(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('symposium_poster.jpg', 800, 600);

        $payload = [
            'tag' => 'HANDS-ON WORKSHOP',
            'title' => 'Advanced Microgrid Hardware Integration Lab',
            'description' => 'Hands-on training session for hardware integration.',
            'date_display' => '20 NOV 2026',
            'location' => 'Microgrid Lab 4th Floor',
            'image_file' => $file,
            'is_featured' => true,
            'is_active' => true,
        ];

        $response = $this->post('/admin/events', $payload);
        $response->assertRedirect('/admin/events');

        $event = UpcomingEvent::where('title', 'Advanced Microgrid Hardware Integration Lab')->first();
        $this->assertNotNull($event);
        $this->assertStringStartsWith('/storage/events/', $event->image_url);
    }

    public function test_admin_can_update_event(): void
    {
        $event = UpcomingEvent::first();

        $payload = [
            'tag' => 'EXECUTIVE MASTERCLASS',
            'title' => 'Updated Masterclass Title',
            'title_id' => 'Judul Masterclass Diperbarui',
            'description' => 'Updated description content.',
            'description_id' => 'Deskripsi konten diperbarui.',
            'date_display' => '30 NOV 2026',
            'location' => 'BTP Meeting Room',
            'is_featured' => false,
            'is_active' => true,
        ];

        $response = $this->put("/admin/events/{$event->id}", $payload);
        $response->assertRedirect('/admin/events');

        $this->assertDatabaseHas('upcoming_events', [
            'id' => $event->id,
            'title' => 'Updated Masterclass Title',
            'tag' => 'EXECUTIVE MASTERCLASS',
            'is_featured' => false,
        ]);
    }

    public function test_admin_can_toggle_event_status(): void
    {
        $event = UpcomingEvent::first();
        $initialStatus = $event->is_active;

        $response = $this->post("/admin/events/{$event->id}/toggle");
        $response->assertRedirect();

        $this->assertEquals(!$initialStatus, $event->fresh()->is_active);
    }

    public function test_admin_can_toggle_event_featured(): void
    {
        $event = UpcomingEvent::first();
        $initialFeatured = $event->is_featured;

        $response = $this->post("/admin/events/{$event->id}/toggle-featured");
        $response->assertRedirect();

        $this->assertEquals(!$initialFeatured, $event->fresh()->is_featured);
    }

    public function test_admin_can_delete_event(): void
    {
        $event = UpcomingEvent::first();

        $response = $this->delete("/admin/events/{$event->id}");
        $response->assertRedirect('/admin/events');

        $this->assertDatabaseMissing('upcoming_events', [
            'id' => $event->id,
        ]);
    }

    public function test_admin_can_reorder_events(): void
    {
        $events = UpcomingEvent::take(2)->get();
        if ($events->count() >= 2) {
            $payload = [
                'orders' => [
                    ['id' => $events[0]->id, 'order' => 99],
                    ['id' => $events[1]->id, 'order' => 100],
                ],
            ];

            $response = $this->post('/admin/events/reorder', $payload);
            $response->assertRedirect();

            $this->assertEquals(99, $events[0]->fresh()->order);
            $this->assertEquals(100, $events[1]->fresh()->order);
        }
    }
}
