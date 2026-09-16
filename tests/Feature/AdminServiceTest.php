<?php

namespace Tests\Feature;

use App\Models\EnterpriseService;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminServiceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * Test admin can view services listing page.
     */
    public function test_admin_services_page_renders_successfully(): void
    {
        $response = $this->get('/admin/services');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Services/Index')
            ->has('services', 6)
            ->has('stats')
            ->has('filters')
            ->has('siteConfig')
        );
    }

    /**
     * Test admin can create a new enterprise service.
     */
    public function test_admin_can_create_new_enterprise_service(): void
    {
        $payload = [
            'service_number' => '07',
            'title' => 'Autonomous Robotics & Cobot Systems',
            'title_id' => 'Robotika Otonom & Sistem Cobot',
            'summary' => 'Integration of collaborative robotic arms with AI computer vision for adaptive assembly lines.',
            'summary_id' => 'Integrasi lengan robot kolaboratif dengan computer vision AI untuk lini perakitan adaptif.',
            'action_label' => 'Explore Advisory',
            'action_label_id' => 'Pelajari Layanan',
            'icon' => 'Cpu',
            'features' => ['Cobot Safety Protocols', 'Vision Calibration', 'ROS2 Firmware Deployment'],
            'target_industry' => 'Automotive & Electronics Assembly',
            'lead_advisor' => 'Dr. Ir. Hendra S.',
            'link' => '#services',
            'order' => 7,
            'is_featured' => true,
            'is_active' => true,
        ];

        $response = $this->post('/admin/services', $payload);

        $response->assertRedirect(route('admin.services.index'));
        $response->assertSessionHas('status');

        $this->assertDatabaseHas('enterprise_services', [
            'service_number' => '07',
            'title' => 'Autonomous Robotics & Cobot Systems',
            'title_id' => 'Robotika Otonom & Sistem Cobot',
            'icon' => 'Cpu',
            'target_industry' => 'Automotive & Electronics Assembly',
            'is_featured' => 1,
            'is_active' => 1,
        ]);
    }

    /**
     * Test admin can update an existing enterprise service.
     */
    public function test_admin_can_update_enterprise_service(): void
    {
        $service = EnterpriseService::first();

        $response = $this->put("/admin/services/{$service->id}", [
            'service_number' => '01',
            'title' => 'Updated Custom Industrial R&D',
            'title_id' => 'Litbang Industri Kustom Terupdate',
            'summary' => 'Updated summary in English for industrial advisory.',
            'summary_id' => 'Ringkasan terupdate bahasa Indonesia untuk konsultansi industri.',
            'action_label' => 'Learn More',
            'action_label_id' => 'Pelajari Lebih Lanjut',
            'icon' => 'FlaskConical',
            'features' => ['TRL 4-7 Scale-up', 'Custom Pilot Facility'],
            'target_industry' => 'Aerospace & Defense',
            'lead_advisor' => 'Prof. Dr. Ir. Adiwijaya',
            'link' => '#services',
            'order' => 1,
            'is_featured' => true,
            'is_active' => true,
        ]);

        $response->assertRedirect(route('admin.services.index'));
        $response->assertSessionHas('status');

        $service->refresh();
        $this->assertEquals('Updated Custom Industrial R&D', $service->title);
        $this->assertEquals('Litbang Industri Kustom Terupdate', $service->title_id);
        $this->assertEquals('Aerospace & Defense', $service->target_industry);
        $this->assertTrue((bool)$service->is_featured);
    }

    /**
     * Test admin can toggle active status of an enterprise service.
     */
    public function test_admin_can_toggle_service_status(): void
    {
        $service = EnterpriseService::first();
        $initialStatus = $service->is_active;

        $response = $this->post("/admin/services/{$service->id}/toggle");

        $response->assertRedirect(route('admin.services.index'));

        $service->refresh();
        $this->assertEquals(!$initialStatus, $service->is_active);
    }

    /**
     * Test admin can toggle featured status of an enterprise service.
     */
    public function test_admin_can_toggle_service_featured(): void
    {
        $service = EnterpriseService::first();
        $initialFeatured = (bool)$service->is_featured;

        $response = $this->post("/admin/services/{$service->id}/toggle-featured");

        $response->assertRedirect(route('admin.services.index'));

        $service->refresh();
        $this->assertEquals(!$initialFeatured, (bool)$service->is_featured);
    }

    /**
     * Test admin can delete an enterprise service.
     */
    public function test_admin_can_delete_enterprise_service(): void
    {
        $service = EnterpriseService::first();

        $response = $this->delete("/admin/services/{$service->id}");

        $response->assertRedirect(route('admin.services.index'));
        $this->assertDatabaseMissing('enterprise_services', [
            'id' => $service->id,
        ]);
    }

    /**
     * Test admin can reorder enterprise services.
     */
    public function test_admin_can_reorder_services(): void
    {
        $services = EnterpriseService::take(2)->get();

        $response = $this->post('/admin/services/reorder', [
            'orders' => [
                ['id' => $services[0]->id, 'order' => 15],
                ['id' => $services[1]->id, 'order' => 16],
            ],
        ]);

        $response->assertRedirect(route('admin.services.index'));

        $this->assertEquals(15, $services[0]->fresh()->order);
        $this->assertEquals(16, $services[1]->fresh()->order);
    }
}
