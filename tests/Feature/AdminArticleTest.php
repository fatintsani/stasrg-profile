<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminArticleTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_admin_articles_page_renders_successfully(): void
    {
        $response = $this->get('/admin/articles');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Articles/Index')
            ->has('articles')
            ->has('stats')
            ->has('filters')
            ->has('siteConfig')
        );
    }

    public function test_admin_can_filter_articles_by_search_and_tag(): void
    {
        $response = $this->get('/admin/articles?tag=STRATEGIC+GRANT');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Articles/Index')
            ->has('articles')
        );

        $responseSearch = $this->get('/admin/articles?search=Supply+Chain');
        $responseSearch->assertStatus(200);
        $responseSearch->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Articles/Index')
            ->has('articles')
        );
    }

    public function test_admin_can_create_article_with_bilingual_fallback(): void
    {
        $payload = [
            'tag' => 'PRESS RELEASE',
            'title_id' => 'Peluncuran Hub Energi Transportasi Hijau Baru',
            'summary_id' => 'Ringkasan inovasi transportasi hijau masa depan di Bandung.',
            'date' => 'NOV 01 - 2026',
            'author' => 'Dr. Hendra',
            'read_time' => '3 min read',
            'is_featured' => true,
            'is_active' => true,
        ];

        $response = $this->post('/admin/articles', $payload);

        $response->assertRedirect(route('admin.articles.index'));
        $this->assertDatabaseHas('articles', [
            'tag' => 'PRESS RELEASE',
            'title' => 'Peluncuran Hub Energi Transportasi Hijau Baru',
            'title_id' => 'Peluncuran Hub Energi Transportasi Hijau Baru',
            'slug' => 'peluncuran-hub-energi-transportasi-hijau-baru',
            'author' => 'Dr. Hendra',
        ]);
    }

    public function test_admin_can_upload_cover_image_for_article(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('cover.jpg', 800, 600);

        $payload = [
            'tag' => 'RESEARCH REPORT',
            'title' => 'Edge AI Textile Defect Detection Research',
            'summary' => 'Real-time defect analysis using high-speed cameras.',
            'date' => 'DEC 12 - 2026',
            'image_file' => $file,
        ];

        $response = $this->post('/admin/articles', $payload);

        $response->assertRedirect(route('admin.articles.index'));

        $article = Article::where('slug', 'edge-ai-textile-defect-detection-research')->first();
        $this->assertNotNull($article);
        $this->assertStringStartsWith('/storage/articles/', $article->image_url);
    }

    public function test_admin_can_update_article(): void
    {
        $article = Article::first();

        $payload = [
            'tag' => 'STRATEGIC GRANT',
            'title' => 'Updated Article Title',
            'title_id' => 'Judul Artikel Terupdate',
            'slug' => 'updated-article-title',
            'summary' => 'Updated Summary Text',
            'summary_id' => 'Ringkasan Terupdate',
            'date' => 'OCT 05 - 2026',
            'author' => 'STAS Editorial Team',
            'read_time' => '5 min read',
        ];

        $response = $this->put("/admin/articles/{$article->id}", $payload);

        $response->assertRedirect(route('admin.articles.index'));
        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
            'tag' => 'STRATEGIC GRANT',
            'title' => 'Updated Article Title',
            'title_id' => 'Judul Artikel Terupdate',
        ]);
    }

    public function test_admin_can_toggle_active_and_featured_status(): void
    {
        $article = Article::first();
        $initialActive = $article->is_active;
        $initialFeatured = $article->is_featured;

        $this->post("/admin/articles/{$article->id}/toggle");
        $this->assertEquals(!$initialActive, $article->fresh()->is_active);

        $this->post("/admin/articles/{$article->id}/toggle-featured");
        $this->assertEquals(!$initialFeatured, $article->fresh()->is_featured);
    }

    public function test_admin_can_delete_article(): void
    {
        $article = Article::first();

        $response = $this->delete("/admin/articles/{$article->id}");

        $response->assertRedirect(route('admin.articles.index'));
        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    }
}
