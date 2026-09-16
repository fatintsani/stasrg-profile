<?php

namespace Tests\Feature;

use App\Models\Publication;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminPublicationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /**
     * Test admin can view publications repository listing page.
     */
    public function test_admin_publications_page_renders_successfully(): void
    {
        $response = $this->get('/admin/publications');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Publications/Index')
            ->has('publications', 3)
            ->has('stats')
            ->has('years')
            ->has('filters')
            ->has('siteConfig')
        );
    }

    /**
     * Test admin can create a new academic publication.
     */
    public function test_admin_can_create_new_publication(): void
    {
        $payload = [
            'badge' => 'Journal Paper (Q1)',
            'badge_type' => 'green',
            'quartile' => 'Q1',
            'indexing' => 'Scopus Q1 / IEEE',
            'domain_tag' => 'Smart Manufacturing',
            'year' => 2026,
            'venue' => 'IEEE Transactions on Industrial Informatics',
            'doi' => 'DOI: 10.1109/TII.2026.19823',
            'doi_url' => 'https://doi.org/10.1109/TII.2026.19823',
            'pdf_url' => '#',
            'title' => 'Federated Learning for Cyber-Physical Security in Distributed Microgrids',
            'title_id' => 'Pembelajaran Federasi untuk Keamanan Siber-Fisik pada Microgrid Terdistribusi',
            'abstract' => 'Privacy-preserving decentralized consensus protocol for detecting anomaly vectors.',
            'abstract_id' => 'Protokol konsensus terdesentralisasi yang menjaga privasi untuk mendeteksi vektor anomali.',
            'authors' => 'Fauzi, A., Setiawan, R., & Rahmawati, S.',
            'citation_count' => 5,
            'is_featured' => true,
            'is_active' => true,
            'order' => 4,
        ];

        $response = $this->post('/admin/publications', $payload);

        $response->assertRedirect(route('admin.publications.index'));
        $response->assertSessionHas('status');

        $this->assertDatabaseHas('publications', [
            'doi' => 'DOI: 10.1109/TII.2026.19823',
            'title' => 'Federated Learning for Cyber-Physical Security in Distributed Microgrids',
            'title_id' => 'Pembelajaran Federasi untuk Keamanan Siber-Fisik pada Microgrid Terdistribusi',
            'badge' => 'Journal Paper (Q1)',
            'is_active' => 1,
        ]);
    }

    /**
     * Test admin can update an existing publication.
     */
    public function test_admin_can_update_publication(): void
    {
        $pub = Publication::first();

        $response = $this->put("/admin/publications/{$pub->id}", [
            'badge' => 'Journal Paper (Q1)',
            'badge_type' => 'green',
            'quartile' => 'Q1',
            'indexing' => 'IEEE Xplore / Scopus Q1',
            'domain_tag' => 'Sustainable Energy',
            'year' => 2026,
            'venue' => 'IEEE Transactions on Sustainable Energy (Updated)',
            'doi' => $pub->doi,
            'doi_url' => $pub->doi_url,
            'pdf_url' => '#',
            'title' => 'Updated Decentralized Energy Scheduling Title',
            'title_id' => 'Judul Penjadwalan Energi Terdesentralisasi Terupdate',
            'abstract' => 'Updated English abstract content.',
            'abstract_id' => 'Abstrak terupdate dalam bahasa Indonesia.',
            'authors' => 'Rahmawati, S., Hendra, S., Pratama, A., & Chen, W. (Updated)',
            'citation_count' => 18,
            'is_featured' => true,
            'is_active' => true,
            'order' => 1,
        ]);

        $response->assertRedirect(route('admin.publications.index'));
        $response->assertSessionHas('status');

        $pub->refresh();
        $this->assertEquals('Updated Decentralized Energy Scheduling Title', $pub->title);
        $this->assertEquals('Judul Penjadwalan Energi Terdesentralisasi Terupdate', $pub->title_id);
        $this->assertEquals(18, $pub->citation_count);
    }

    /**
     * Test admin can toggle active status of a publication.
     */
    public function test_admin_can_toggle_publication_status(): void
    {
        $pub = Publication::first();
        $initialStatus = $pub->is_active;

        $response = $this->post("/admin/publications/{$pub->id}/toggle");

        $response->assertRedirect(route('admin.publications.index'));

        $pub->refresh();
        $this->assertEquals(!$initialStatus, $pub->is_active);
    }

    /**
     * Test admin can toggle featured status of a publication.
     */
    public function test_admin_can_toggle_publication_featured(): void
    {
        $pub = Publication::first();
        $initialFeatured = $pub->is_featured;

        $response = $this->post("/admin/publications/{$pub->id}/toggle-featured");

        $response->assertRedirect(route('admin.publications.index'));

        $pub->refresh();
        $this->assertEquals(!$initialFeatured, $pub->is_featured);
    }

    /**
     * Test admin can delete a publication.
     */
    public function test_admin_can_delete_publication(): void
    {
        $pub = Publication::first();

        $response = $this->delete("/admin/publications/{$pub->id}");

        $response->assertRedirect(route('admin.publications.index'));
        $this->assertDatabaseMissing('publications', [
            'id' => $pub->id,
        ]);
    }

    /**
     * Test admin can reorder publications.
     */
    public function test_admin_can_reorder_publications(): void
    {
        $pubs = Publication::take(2)->get();

        $response = $this->post('/admin/publications/reorder', [
            'orders' => [
                ['id' => $pubs[0]->id, 'order' => 10],
                ['id' => $pubs[1]->id, 'order' => 11],
            ],
        ]);

        $response->assertRedirect(route('admin.publications.index'));

        $this->assertEquals(10, $pubs[0]->fresh()->order);
        $this->assertEquals(11, $pubs[1]->fresh()->order);
    }
}
