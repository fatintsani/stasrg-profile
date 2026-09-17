<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Display the system settings configuration panel.
     */
    public function index(): Response
    {
        $allSettings = SiteSetting::all()->pluck('value', 'key')->toArray();

        // Default fallbacks if keys not yet in DB
        $defaults = [
            // 1. General Profile
            'center_name' => 'CoE STAS-RG',
            'tagline' => 'Advancing Sustainable Technology Through Research & Innovation',
            'tagline_id' => 'Memajukan Teknologi Berkelanjutan Melalui Riset & Inovasi Terapan',
            'institution' => 'Telkom University',
            'sub_institution' => 'Center of Excellence',
            'logo_url' => '/assets/images/logo_stas.png',
            'about_brief' => 'Center of Excellence Sustainable Technology & Applied Systems (STAS-RG) conducts cutting-edge multidisciplinary applied research in smart manufacturing, renewable microgrids, and intelligent logistics.',
            'about_brief_id' => 'Center of Excellence Sustainable Technology & Applied Systems (STAS-RG) menyelenggarakan riset terapan multidisiplin terdepan dalam manufaktur cerdas, microgrid energi terbarukan, dan logistik cerdas.',

            // 2. Director & Leadership
            'director_name' => 'Prof. Dr. Ir. Adiwijaya, S.Si., M.Si.',
            'director_title' => 'Lead Advisor & Research Center Director',
            'director_title_id' => 'Penasihat Utama & Direktur Pusat Riset',
            'director_quote' => 'Pioneering sustainable technology with impact. We build solutions that scale beyond laboratories into real-world industrial environments.',
            'director_quote_id' => 'Merintis teknologi berkelanjutan yang berdampak nyata. Kami membangun solusi yang dapat diterapkan melampaui laboratorium menuju lingkungan industri nyata.',
            'director_photo_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',

            // 3. Contact & Lab Location
            'contact_email' => 'stasrg@telkomuniversity.ac.id',
            'contact_phone' => '+62 22 756 4108',
            'whatsapp_contact' => '+62 812 3456 7890',
            'address' => 'Center of Excellence STAS-RG, Telkom University, Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung, West Java 40257, Indonesia',
            'operating_hours' => 'Senin - Jumat: 08:00 - 17:00 WIB',
            'maps_embed_url' => '',

            // 4. Social & External Links
            'social_linkedin' => 'https://linkedin.com/company/stasrg',
            'social_github' => 'https://github.com/stasrg',
            'social_youtube' => 'https://youtube.com/@stasrg',
            'social_twitter' => 'https://x.com/stasrg',
            'university_url' => 'https://telkomuniversity.ac.id',
            'scholar_group_url' => 'https://scholar.google.com',

            // 5. SEO & Meta
            'meta_title' => 'CoE STAS-RG - Center of Excellence Sustainable Technology & Applied Systems',
            'meta_description' => 'Center of Excellence STAS-RG Telkom University focuses on multidisciplinary R&D in Smart Manufacturing, Green Energy Decarbonization, and Predictive Logistics.',
            'meta_keywords' => 'STAS-RG, Telkom University, Sustainable Technology, Smart Manufacturing, AI, Energy Systems, Decarbonization, Logistics',

            // 6. Security & System Preferences
            'allow_registration' => '1',
            'maintenance_mode' => '0',
            'enable_public_events' => '1',
            'default_language' => 'ID',
        ];

        $settings = array_merge($defaults, $allSettings);

        $systemInfo = [
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'PHP CLI / Built-in',
            'app_environment' => config('app.env'),
            'app_debug' => config('app.debug') ? 'Enabled' : 'Disabled',
            'database_driver' => config('database.default'),
            'timezone' => config('app.timezone', 'Asia/Jakarta'),
        ];

        $siteConfig = [
            'center_name' => $settings['center_name'],
            'institution' => $settings['institution'],
        ];

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
            'systemInfo' => $systemInfo,
            'siteConfig' => $siteConfig,
        ]);
    }

    /**
     * Update system settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $data = $request->except(['_token', '_method']);

        foreach ($data as $key => $value) {
            // Convert booleans to string 1/0 if needed
            if (is_bool($value)) {
                $value = $value ? '1' : '0';
            } elseif (is_array($value)) {
                $value = json_encode($value);
            }
            SiteSetting::updateOrCreate(['key' => $key], ['value' => (string) $value]);
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Pengaturan sistem berhasil diperbarui.');
    }

    /**
     * Clear system caches.
     */
    public function clearCache(): RedirectResponse
    {
        try {
            Artisan::call('optimize:clear');
            return redirect()->route('admin.settings.index')
                ->with('success', 'Cache sistem (config, route, view) berhasil dibersihkan.');
        } catch (\Throwable $e) {
            return redirect()->route('admin.settings.index')
                ->with('error', 'Gagal membersihkan cache: ' . $e->getMessage());
        }
    }
}
