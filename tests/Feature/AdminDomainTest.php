<?php

namespace Tests\Feature;

use App\Models\ResearchDomain;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminDomainTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * Test admin can view domain listing page.
     */
    public function test_admin_domains_page_renders_successfully(): void
    {
        $response = $this->get('/admin/domains');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Domains/Index')
            ->has('domains', 8)
            ->has('stats')
            ->has('filters')
            ->has('siteConfig')
        );
    }

    /**
     * Test admin can create a new research domain.
     */
    public function test_admin_can_create_new_research_domain(): void
    {
        $payload = [
            'domain_number' => '09 / DOMAIN',
            'title' => 'Quantum Computing & Nanomaterials',
            'title_id' => 'Komputasi Kuantum & Nanomaterial',
            'slug' => 'quantum-computing-nanomaterials',
            'icon' => 'Brain',
            'summary' => 'Quantum error correction, superconducting qubits, and advanced topological materials for next-generation hardware.',
            'summary_id' => 'Koreksi kesalahan kuantum, qubit superkonduktor, dan material topologis mutakhir.',
            'focus_areas' => ['Quantum Hardware', 'Nanomaterials', 'Cryogenic Telemetry'],
            'lead_researcher' => 'Prof. Dr. Andi Wijaya, Ph.D.',
            'link' => '#',
            'order' => 9,
            'is_active' => true,
        ];

        $response = $this->post('/admin/domains', $payload);

        $response->assertRedirect(route('admin.domains.index'));
        $response->assertSessionHas('status');

        $this->assertDatabaseHas('research_domains', [
            'domain_number' => '09 / DOMAIN',
            'title' => 'Quantum Computing & Nanomaterials',
            'title_id' => 'Komputasi Kuantum & Nanomaterial',
            'slug' => 'quantum-computing-nanomaterials',
            'icon' => 'Brain',
            'is_active' => 1,
        ]);
    }

    /**
     * Test admin can update an existing research domain.
     */
    public function test_admin_can_update_research_domain(): void
    {
        $domain = ResearchDomain::first();

        $response = $this->put("/admin/domains/{$domain->id}", [
            'domain_number' => '01 / DOMAIN',
            'title' => 'Updated Sustainable Tech Title',
            'title_id' => 'Judul Teknologi Berkelanjutan Terupdate',
            'slug' => $domain->slug,
            'icon' => 'Leaf',
            'summary' => 'Updated summary in English.',
            'summary_id' => 'Ringkasan terupdate dalam bahasa Indonesia.',
            'focus_areas' => ['Circular Economy', 'Green IoT'],
            'lead_researcher' => 'Dr. Wahyu Updated',
            'link' => '#',
            'order' => 1,
            'is_active' => true,
        ]);

        $response->assertRedirect(route('admin.domains.index'));
        $response->assertSessionHas('status');

        $domain->refresh();
        $this->assertEquals('Updated Sustainable Tech Title', $domain->title);
        $this->assertEquals('Judul Teknologi Berkelanjutan Terupdate', $domain->title_id);
    }

    /**
     * Test admin can toggle active status of a research domain.
     */
    public function test_admin_can_toggle_domain_status(): void
    {
        $domain = ResearchDomain::first();
        $initialStatus = $domain->is_active;

        $response = $this->post("/admin/domains/{$domain->id}/toggle");

        $response->assertRedirect(route('admin.domains.index'));

        $domain->refresh();
        $this->assertEquals(!$initialStatus, $domain->is_active);
    }

    /**
     * Test admin can delete a research domain.
     */
    public function test_admin_can_delete_research_domain(): void
    {
        $domain = ResearchDomain::first();

        $response = $this->delete("/admin/domains/{$domain->id}");

        $response->assertRedirect(route('admin.domains.index'));
        $this->assertDatabaseMissing('research_domains', [
            'id' => $domain->id,
        ]);
    }

    /**
     * Test admin can reorder research domains.
     */
    public function test_admin_can_reorder_domains(): void
    {
        $domains = ResearchDomain::take(2)->get();

        $response = $this->post('/admin/domains/reorder', [
            'domains' => [
                ['id' => $domains[0]->id, 'order' => 20],
                ['id' => $domains[1]->id, 'order' => 21],
            ],
        ]);

        $response->assertRedirect(route('admin.domains.index'));

        $this->assertEquals(20, $domains[0]->fresh()->order);
        $this->assertEquals(21, $domains[1]->fresh()->order);
    }
}
