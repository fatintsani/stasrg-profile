<?php

namespace Tests\Feature;

use App\Models\ResearchProject;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminProjectTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * Test admin can view projects listing page.
     */
    public function test_admin_projects_page_renders_successfully(): void
    {
        $response = $this->get('/admin/projects');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Projects/Index')
            ->has('projects', 3)
            ->has('stats')
            ->has('categories')
            ->has('filters')
            ->has('siteConfig')
        );
    }

    /**
     * Test admin can create a new research project.
     */
    public function test_admin_can_create_new_research_project(): void
    {
        $payload = [
            'category' => 'Circular Economy',
            'category_tag' => 'BIO-RESOURCES',
            'title' => 'Modular Bio-reactor System for Industrial Upcycling',
            'title_id' => 'Sistem Bio-reaktor Modular untuk Daur Ulang Industri',
            'slug' => 'modular-bio-reactor-system',
            'image_url' => 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
            'lead_researcher' => 'Dr. Rina Novita, S.T., M.Eng.',
            'summary' => 'Bio-chemical catalyst models accelerating waste water degradation and harvesting secondary valuable metals.',
            'summary_id' => 'Model katalis biokimia mempercepat degradasi air limbah dan pemanenan logam sekunder berharga.',
            'tech_stack' => ['Bio-reactor', 'Catalyst AI', 'Circular Systems'],
            'case_study_url' => '#project-modular-bio-reactor',
            'funding_source' => 'Ministry of Environment & Forestry Grant',
            'start_year' => 2025,
            'end_year' => 2027,
            'featured' => true,
            'is_active' => true,
            'order' => 4,
        ];

        $response = $this->post('/admin/projects', $payload);

        $response->assertRedirect(route('admin.projects.index'));
        $response->assertSessionHas('status');

        $this->assertDatabaseHas('research_projects', [
            'category_tag' => 'BIO-RESOURCES',
            'title' => 'Modular Bio-reactor System for Industrial Upcycling',
            'title_id' => 'Sistem Bio-reaktor Modular untuk Daur Ulang Industri',
            'slug' => 'modular-bio-reactor-system',
            'is_active' => 1,
            'featured' => 1,
        ]);
    }

    /**
     * Test admin can update an existing research project.
     */
    public function test_admin_can_update_research_project(): void
    {
        $project = ResearchProject::first();

        $response = $this->put("/admin/projects/{$project->id}", [
            'category' => 'Supply Chain Logistics',
            'category_tag' => 'AI & LOGISTICS 4.0',
            'title' => 'Updated Autonomous Fleet Logistics Title',
            'title_id' => 'Judul Logistik Armada Otonom Terupdate',
            'slug' => $project->slug,
            'image_url' => $project->image_url,
            'lead_researcher' => 'Dr. Ir. Hendra S., Updated',
            'summary' => 'Updated summary in English.',
            'summary_id' => 'Ringkasan terupdate dalam bahasa Indonesia.',
            'tech_stack' => ['Deep RL', 'Heuristics', 'Fleet Telemetry'],
            'case_study_url' => '#project-autonomous-fleet-logistics',
            'funding_source' => 'DIKTI Matching Fund',
            'start_year' => 2025,
            'end_year' => 2026,
            'featured' => true,
            'is_active' => true,
            'order' => 1,
        ]);

        $response->assertRedirect(route('admin.projects.index'));
        $response->assertSessionHas('status');

        $project->refresh();
        $this->assertEquals('Updated Autonomous Fleet Logistics Title', $project->title);
        $this->assertEquals('Judul Logistik Armada Otonom Terupdate', $project->title_id);
        $this->assertEquals('AI & LOGISTICS 4.0', $project->category_tag);
    }

    /**
     * Test admin can toggle active status of a project.
     */
    public function test_admin_can_toggle_project_status(): void
    {
        $project = ResearchProject::first();
        $initialStatus = $project->is_active;

        $response = $this->post("/admin/projects/{$project->id}/toggle");

        $response->assertRedirect(route('admin.projects.index'));

        $project->refresh();
        $this->assertEquals(!$initialStatus, $project->is_active);
    }

    /**
     * Test admin can toggle featured status of a project.
     */
    public function test_admin_can_toggle_project_featured(): void
    {
        $project = ResearchProject::first();
        $initialFeatured = $project->featured;

        $response = $this->post("/admin/projects/{$project->id}/toggle-featured");

        $response->assertRedirect(route('admin.projects.index'));

        $project->refresh();
        $this->assertEquals(!$initialFeatured, $project->featured);
    }

    /**
     * Test admin can delete a research project.
     */
    public function test_admin_can_delete_research_project(): void
    {
        $project = ResearchProject::first();

        $response = $this->delete("/admin/projects/{$project->id}");

        $response->assertRedirect(route('admin.projects.index'));
        $this->assertDatabaseMissing('research_projects', [
            'id' => $project->id,
        ]);
    }

    /**
     * Test admin can reorder research projects.
     */
    public function test_admin_can_reorder_projects(): void
    {
        $projects = ResearchProject::take(2)->get();

        $response = $this->post('/admin/projects/reorder', [
            'orders' => [
                ['id' => $projects[0]->id, 'order' => 10],
                ['id' => $projects[1]->id, 'order' => 11],
            ],
        ]);

        $response->assertRedirect(route('admin.projects.index'));

        $this->assertEquals(10, $projects[0]->fresh()->order);
        $this->assertEquals(11, $projects[1]->fresh()->order);
    }
}
