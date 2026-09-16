<?php

namespace Tests\Feature;

use App\Models\Partner;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPartnerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * Test admin can view partners listing page.
     */
    public function test_admin_partners_page_renders_successfully(): void
    {
        $response = $this->get('/admin/partners');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Partners/Index')
            ->has('partners', 6)
            ->has('stats')
            ->has('filters')
            ->has('siteConfig')
        );
    }

    /**
     * Test admin can create a new partner with url.
     */
    public function test_admin_can_create_new_partner(): void
    {
        $payload = [
            'name' => 'PT LEN INDUSTRI (PERSERO)',
            'category' => 'SOE',
            'partnership_type' => 'Renewable Microgrid Inverters & IoT Control',
            'description' => 'Collaboration on national microgrid smart inverter engineering and telemetry hardware testing.',
            'description_id' => 'Kolaborasi rekayasa inverter pintar microgrid nasional dan pengujian perangkat keras telemetri.',
            'logo_text' => 'PT LEN INDUSTRI',
            'logo_url' => '/assets/images/partners/collegue_pindad.png',
            'website_url' => 'https://len.co.id',
            'established_year' => 2025,
            'is_featured' => true,
            'is_active' => true,
            'order' => 7,
        ];

        $response = $this->post('/admin/partners', $payload);

        $response->assertRedirect(route('admin.partners.index'));
        $response->assertSessionHas('status');

        $this->assertDatabaseHas('partners', [
            'name' => 'PT LEN INDUSTRI (PERSERO)',
            'category' => 'SOE',
            'partnership_type' => 'Renewable Microgrid Inverters & IoT Control',
            'website_url' => 'https://len.co.id',
            'is_featured' => 1,
            'is_active' => 1,
        ]);
    }

    /**
     * Test admin can create partner with uploaded logo file.
     */
    public function test_admin_can_create_partner_with_uploaded_logo(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('custom_partner.png', 200, 100);

        $payload = [
            'name' => 'KEMENPERIN RI',
            'category' => 'Government',
            'partnership_type' => 'Smart Manufacturing 4.0 Standard',
            'logo_file' => $file,
            'website_url' => 'https://kemenperin.go.id',
            'established_year' => 2024,
            'is_featured' => true,
            'is_active' => true,
        ];

        $response = $this->post('/admin/partners', $payload);

        $response->assertRedirect(route('admin.partners.index'));

        $partner = Partner::where('name', 'KEMENPERIN RI')->first();
        $this->assertNotNull($partner);
        $this->assertStringStartsWith('/storage/partners/', $partner->logo_url);

        $storedPath = str_replace('/storage/', '', $partner->logo_url);
        Storage::disk('public')->assertExists($storedPath);
    }

    /**
     * Test admin can update an existing partner.
     */
    public function test_admin_can_update_partner(): void
    {
        $partner = Partner::first();

        $response = $this->put("/admin/partners/{$partner->id}", [
            'name' => 'PT PINDAD (PERSERO) TBK',
            'category' => 'SOE',
            'partnership_type' => 'Updated Precision Engineering R&D',
            'description' => 'Updated English partnership description.',
            'description_id' => 'Deskripsi kemitraan bahasa Indonesia terupdate.',
            'logo_text' => 'PINDAD TBK',
            'logo_url' => $partner->logo_url,
            'website_url' => 'https://pindad.com/updated',
            'established_year' => 2024,
            'is_featured' => true,
            'is_active' => true,
            'order' => 1,
        ]);

        $response->assertRedirect(route('admin.partners.index'));
        $response->assertSessionHas('status');

        $partner->refresh();
        $this->assertEquals('PT PINDAD (PERSERO) TBK', $partner->name);
        $this->assertEquals('Updated Precision Engineering R&D', $partner->partnership_type);
        $this->assertEquals('https://pindad.com/updated', $partner->website_url);
    }

    /**
     * Test admin can toggle active status of a partner.
     */
    public function test_admin_can_toggle_partner_status(): void
    {
        $partner = Partner::first();
        $initialStatus = $partner->is_active;

        $response = $this->post("/admin/partners/{$partner->id}/toggle");

        $response->assertRedirect(route('admin.partners.index'));

        $partner->refresh();
        $this->assertEquals(!$initialStatus, $partner->is_active);
    }

    /**
     * Test admin can toggle featured status of a partner.
     */
    public function test_admin_can_toggle_partner_featured(): void
    {
        $partner = Partner::first();
        $initialFeatured = (bool)$partner->is_featured;

        $response = $this->post("/admin/partners/{$partner->id}/toggle-featured");

        $response->assertRedirect(route('admin.partners.index'));

        $partner->refresh();
        $this->assertEquals(!$initialFeatured, (bool)$partner->is_featured);
    }

    /**
     * Test admin can delete a partner.
     */
    public function test_admin_can_delete_partner(): void
    {
        $partner = Partner::first();

        $response = $this->delete("/admin/partners/{$partner->id}");

        $response->assertRedirect(route('admin.partners.index'));
        $this->assertDatabaseMissing('partners', [
            'id' => $partner->id,
        ]);
    }

    /**
     * Test admin can reorder partners.
     */
    public function test_admin_can_reorder_partners(): void
    {
        $partners = Partner::take(2)->get();

        $response = $this->post('/admin/partners/reorder', [
            'orders' => [
                ['id' => $partners[0]->id, 'order' => 50],
                ['id' => $partners[1]->id, 'order' => 51],
            ],
        ]);

        $response->assertRedirect(route('admin.partners.index'));

        $this->assertEquals(50, $partners[0]->fresh()->order);
        $this->assertEquals(51, $partners[1]->fresh()->order);
    }
}
