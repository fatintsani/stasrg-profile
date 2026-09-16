<?php

namespace Database\Seeders;

use App\Models\AboutHighlight;
use App\Models\Article;
use App\Models\EnterpriseService;
use App\Models\Partner;
use App\Models\Publication;
use App\Models\ResearchDomain;
use App\Models\ResearchMetric;
use App\Models\ResearchProject;
use App\Models\SiteSetting;
use App\Models\UpcomingEvent;
use Illuminate\Database\Seeder;

class LandingPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Research Metrics
        $metrics = [
            [
                'value' => '50+',
                'label' => 'Research Projects',
                'description' => 'Completed & Active Industrial Tracks',
                'order' => 1,
            ],
            [
                'value' => '30+',
                'label' => 'Industrial Applications',
                'description' => 'Tested in Real-World Environments',
                'order' => 2,
            ],
            [
                'value' => '20+',
                'label' => 'Strategic Partners',
                'description' => 'Global & National Collaborators',
                'order' => 3,
            ],
            [
                'value' => '15+',
                'label' => 'Principal Researchers',
                'description' => 'And Interdisciplinary Fellows',
                'order' => 4,
            ],
        ];
        foreach ($metrics as $metric) {
            ResearchMetric::updateOrCreate(['label' => $metric['label']], $metric);
        }

        // 2. About Highlights
        $highlights = [
            [
                'icon' => 'Cpu',
                'title' => 'Applied R&D',
                'description' => 'Translating theoretical breakthroughs into scalable, industrially hardened solutions across Southeast Asia.',
                'order' => 1,
            ],
            [
                'icon' => 'Network',
                'title' => 'Industry Integration',
                'description' => 'Bridging academic laboratory research with direct manufacturing execution systems and real-world deployment.',
                'order' => 2,
            ],
            [
                'icon' => 'Users',
                'title' => 'Capacity Building',
                'description' => 'Training next-generation engineers, data scientists, and executive industrial leaders.',
                'order' => 3,
            ],
            [
                'icon' => 'Leaf',
                'title' => 'Sustainable Impact',
                'description' => 'Targeting measurable net-zero decarbonization, energy efficiency, and ESG circularity metrics.',
                'order' => 4,
            ],
        ];
        foreach ($highlights as $hl) {
            AboutHighlight::updateOrCreate(['title' => $hl['title']], $hl);
        }

        // 3. Research Domains
        $domains = [
            [
                'domain_number' => '01 / DOMAIN',
                'title' => 'Sustainable Technology & Green Systems',
                'slug' => 'sustainable-tech-green-systems',
                'icon' => 'Leaf',
                'summary' => 'Eco-efficiency frameworks, carbon lifecycle analysis, and circular materials development.',
                'link' => '#',
                'order' => 1,
            ],
            [
                'domain_number' => '02 / DOMAIN',
                'title' => 'Smart Manufacturing & Industry 4.0',
                'slug' => 'smart-manufacturing-industry-4',
                'icon' => 'Cpu',
                'summary' => 'Cyber-physical systems, autonomous robotics, digital shopfloors, and intelligent MES architectures.',
                'link' => '#',
                'order' => 2,
            ],
            [
                'domain_number' => '03 / DOMAIN',
                'title' => 'Supply Chain & Logistics Optimization',
                'slug' => 'supply-chain-logistics-optimization',
                'icon' => 'Truck',
                'summary' => 'Predictive logistics networks, maritime routing, inventory digital twins, and resilient sourcing models.',
                'link' => '#',
                'order' => 3,
            ],
            [
                'domain_number' => '04 / DOMAIN',
                'title' => 'Applied Data Science & Industrial AI',
                'slug' => 'applied-data-science-industrial-ai',
                'icon' => 'Binary',
                'summary' => 'Physics-informed neural networks, computer vision quality assurance, and edge AI telemetry.',
                'link' => '#',
                'order' => 4,
            ],
            [
                'domain_number' => '05 / DOMAIN',
                'title' => 'Environmental Tech & Circular Economy',
                'slug' => 'environmental-tech-circular-economy',
                'icon' => 'Recycle',
                'summary' => 'Industrial waste upcycling, bio-reactor wastewater treatment, and secondary resource harvesting.',
                'link' => '#',
                'order' => 5,
            ],
            [
                'domain_number' => '06 / DOMAIN',
                'title' => 'Renewable Energy & Smart Grid Systems',
                'slug' => 'renewable-energy-smart-grid',
                'icon' => 'Zap',
                'summary' => 'Microgrid scheduling, battery energy storage analytics, and decentralized green power management.',
                'link' => '#',
                'order' => 6,
            ],
            [
                'domain_number' => '07 / DOMAIN',
                'title' => 'Applied Ergonomics & Human Factors',
                'slug' => 'applied-ergonomics-human-factors',
                'icon' => 'UserCheck',
                'summary' => 'Human-machine interfaces, cognitive workload assessment, worker ergonomics, and occupational safety.',
                'link' => '#',
                'order' => 7,
            ],
            [
                'domain_number' => '08 / DOMAIN',
                'title' => 'Industrial Automation & Digitalization',
                'slug' => 'industrial-automation-digitalization',
                'icon' => 'Sliders',
                'summary' => 'PLC integration, SCADA telemetry, industrial IoT sensor meshes, and process automation.',
                'link' => '#',
                'order' => 8,
            ],
        ];
        foreach ($domains as $domain) {
            ResearchDomain::updateOrCreate(['slug' => $domain['slug']], $domain);
        }

        // 4. Featured Research Projects
        $projects = [
            [
                'category' => 'Supply Chain',
                'category_tag' => 'AI & LOGISTICS',
                'title' => 'Autonomous Fleet Logistics & Predictive Cost Optimization',
                'slug' => 'autonomous-fleet-logistics',
                'image_url' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                'lead_researcher' => 'Lead Researcher: Dr. Ir. Hendra S.',
                'summary' => 'Integrated optimization framework combining routing heuristics and deep reinforcement learning for high-density metropolitan delivery networks.',
                'featured' => true,
                'order' => 1,
            ],
            [
                'category' => 'Sustainable Energy',
                'category_tag' => 'RENEWABLE ENERGY',
                'title' => 'AI-Driven Smart Microgrid Management for Distributed Rural Infrastructure',
                'slug' => 'smart-microgrid-management',
                'image_url' => 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
                'lead_researcher' => 'Lead Researcher: Prof. Dr. Siti Rahmawati, S.T., M.T.',
                'summary' => 'Decentralized control algorithms predicting renewable variability and orchestrating hybrid storage dispatch across remote island clusters.',
                'featured' => true,
                'order' => 2,
            ],
            [
                'category' => 'Smart Manufacturing',
                'category_tag' => 'SMART FACTORY',
                'title' => 'Digital Twin Implementation for Sustainable Textile Manufacturing',
                'slug' => 'digital-twin-textile',
                'image_url' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
                'lead_researcher' => 'Lead Researcher: Dr. Agung P. W., M.Eng.',
                'summary' => 'Physics-guided deep learning models delivering real-time energy profiling, fiber defect detection, and automated loom parameter adjustments.',
                'featured' => true,
                'order' => 3,
            ],
        ];
        foreach ($projects as $proj) {
            ResearchProject::updateOrCreate(['slug' => $proj['slug']], $proj);
        }

        // 5. Academic Publications
        $publications = [
            [
                'badge' => 'Journal Paper (Q1)',
                'badge_type' => 'green',
                'year' => 2026,
                'venue' => 'IEEE Transactions on Sustainable Energy',
                'doi' => 'DOI: 10.1109/TSTE.2026.14209',
                'title' => 'Decentralized Energy Scheduling in Hybrid Microgrids Using Multi-Agent Reinforcement Learning',
                'authors' => 'Rahmawati, S., Hendra, S., Pratama, A., & Chen, W.',
                'pdf_url' => '#',
                'doi_url' => 'https://doi.org/10.1109/TSTE.2026.14209',
                'order' => 1,
            ],
            [
                'badge' => 'Conference Paper',
                'badge_type' => 'gray',
                'year' => 2025,
                'venue' => 'Proc. 15th Int. Conf. on Industrial Engineering & Operations Management',
                'doi' => 'DOI: 10.1016/j.cie.2025.10982',
                'title' => 'Real-Time Defect Detection in High-Speed Textile Manufacturing Using Edge AI',
                'authors' => 'Agung, P. W., Wijaya, B., & Setiawan, R.',
                'pdf_url' => '#',
                'doi_url' => 'https://doi.org/10.1016/j.cie.2025.10982',
                'order' => 2,
            ],
            [
                'badge' => 'Journal Paper (Q1)',
                'badge_type' => 'green',
                'year' => 2025,
                'venue' => 'Journal of Cleaner Production',
                'doi' => 'DOI: 10.1016/j.jclepro.2025.14120',
                'title' => 'Modular Bio-reactor System for High-Yield Industrial Wastewater Treatment',
                'authors' => 'Kurniawan, D., Lestari, M., & Nurhadi, T.',
                'pdf_url' => '#',
                'doi_url' => 'https://doi.org/10.1016/j.jclepro.2025.14120',
                'order' => 3,
            ],
        ];
        foreach ($publications as $pub) {
            Publication::updateOrCreate(['title' => $pub['title']], $pub);
        }

        // 6. Enterprise Services
        $services = [
            [
                'service_number' => '01',
                'title' => 'Custom Industrial R&D',
                'summary' => 'Tailored engineering research, prototype development, and technical validation for complex manufacturing challenges.',
                'icon' => 'FlaskConical',
                'action_label' => 'Explore Service',
                'order' => 1,
            ],
            [
                'service_number' => '02',
                'title' => 'Supply Chain Advisory',
                'summary' => 'End-to-end network optimization, logistics decarbonization roadmaps, and digital inventory transformation.',
                'icon' => 'TrendingUp',
                'action_label' => 'Explore Service',
                'order' => 2,
            ],
            [
                'service_number' => '03',
                'title' => 'Lab Testing & Validation',
                'summary' => 'Certified industrial simulation, material durability stress testing, and IoT sensor benchmarking protocols.',
                'icon' => 'CheckCircle',
                'action_label' => 'Explore Service',
                'order' => 3,
            ],
            [
                'service_number' => '04',
                'title' => 'ESG & Carbon Audits',
                'summary' => 'Comprehensive Scope 1-3 GHG accounting, life cycle assessments (LCA), and circularity transition roadmaps.',
                'icon' => 'ShieldCheck',
                'action_label' => 'Explore Service',
                'order' => 4,
            ],
            [
                'service_number' => '05',
                'title' => 'Executive Talent Training',
                'summary' => 'Custom corporate bootcamps in Industrial AI, Lean Operations 4.0, and sustainable systems management.',
                'icon' => 'Award',
                'action_label' => 'Explore Service',
                'order' => 5,
            ],
            [
                'service_number' => '06',
                'title' => 'Technology Commercialization',
                'summary' => 'IP licensing, patent valorization, technology transfer, and joint venture spin-off incubation support.',
                'icon' => 'Layers',
                'action_label' => 'Explore Service',
                'order' => 6,
            ],
        ];
        foreach ($services as $srv) {
            EnterpriseService::updateOrCreate(['service_number' => $srv['service_number']], $srv);
        }

        // 7. Partners
        $partners = [
            [
                'name' => 'PT PINDAD',
                'category' => 'Industry',
                'logo_text' => 'PT PINDAD',
                'logo_url' => '/assets/images/partners/collegue_pindad.png',
                'order' => 1,
            ],
            [
                'name' => 'BIO FARMA',
                'category' => 'Industry',
                'logo_text' => 'BIO FARMA',
                'logo_url' => '/assets/images/partners/collegue_biofarma.png',
                'order' => 2,
            ],
            [
                'name' => 'BANDUNG TECHNO PARK',
                'category' => 'Industry',
                'logo_text' => 'BANDUNG TECHNO PARK',
                'logo_url' => '/assets/images/partners/collegue_btp.png',
                'order' => 3,
            ],
            [
                'name' => 'TRANSTRACK',
                'category' => 'Industry',
                'logo_text' => 'TRANSTRACK',
                'logo_url' => '/assets/images/partners/collegue_transtrack.png',
                'order' => 4,
            ],
            [
                'name' => 'ASYCS',
                'category' => 'Industry',
                'logo_text' => 'ASYCS',
                'logo_url' => '/assets/images/partners/collegue_asycs.png',
                'order' => 5,
            ],
            [
                'name' => 'TELKOM UNIVERSITY',
                'category' => 'Academic',
                'logo_text' => 'TELKOM UNIVERSITY',
                'logo_url' => '/assets/images/telu.png',
                'order' => 6,
            ],
        ];
        Partner::truncate();
        foreach ($partners as $ptr) {
            Partner::create($ptr);
        }

        // 8. Articles
        $articles = [
            [
                'tag' => 'PRESS RELEASE',
                'date' => 'Sep 10, 2026',
                'title' => 'STAS-RG Secures Major Grant for Green Electric Transportation Energy Hubs',
                'slug' => 'stas-rg-secures-grant-green-transport',
                'summary' => 'National research consortium awards IDR 8.5B to develop smart charging networks with integrated battery swapping telemetry.',
                'read_time' => '4 min read',
                'order' => 1,
            ],
            [
                'tag' => 'RESEARCH REPORT',
                'date' => 'Aug 28, 2026',
                'title' => 'Policy Report: Resilient Supply Chains & Decarbonization in Indonesian MSMEs',
                'slug' => 'policy-report-resilient-supply-chains',
                'summary' => 'Comprehensive study provides policy recommendations for integrating circular logistics standards across West Java manufacturers.',
                'read_time' => '6 min read',
                'order' => 2,
            ],
            [
                'tag' => 'ACADEMIC EVENT',
                'date' => 'Jul 15, 2026',
                'title' => 'Telkom University Researchers Win Best Paper at Applied Science Symposium',
                'slug' => 'telkom-university-researchers-win-best-paper',
                'summary' => 'CoE STAS-RG faculty awarded best technical presentation for multi-agent reinforcement learning optimization in microgrid clusters.',
                'read_time' => '3 min read',
                'order' => 3,
            ],
        ];
        foreach ($articles as $art) {
            Article::updateOrCreate(['slug' => $art['slug']], $art);
        }

        // 9. Events
        $events = [
            [
                'tag' => 'UPCOMING SYMPOSIUM',
                'date_display' => 'NOV 24 - 2026',
                'title' => 'International Symposium on Sustainable Technology & Smart Systems (IS-STSS 2026)',
                'description' => 'Join global researchers, industrial executives, and policy leaders for keynote tracks on decarbonization, smart manufacturing, and AI telemetry.',
                'location' => 'Hybrid / Telkom Univ. Convention Hall & Zoom',
                'primary_action_text' => 'Register Now',
                'secondary_action_text' => 'Download Brochure',
                'order' => 1,
            ],
            [
                'tag' => 'HANDS-ON WORKSHOP',
                'date_display' => 'DEC 05 - 2026',
                'title' => 'Hands-on Masterclass: Industrial IoT & Real-Time Energy Telemetry Architectures',
                'description' => 'Intensive 2-day technical workshop for practicing engineers covering edge microcontroller telemetry, MQTT pipelines, and Grafana energy dashboards.',
                'location' => 'IoT Embedded Systems Lab, 4th Floor',
                'primary_action_text' => 'Join Workshop',
                'secondary_action_text' => 'Syllabus PDF',
                'order' => 2,
            ],
        ];
        foreach ($events as $evt) {
            UpcomingEvent::updateOrCreate(['title' => $evt['title']], $evt);
        }

        // 10. Site Settings
        $settings = [
            'center_name' => 'CoE STAS-RG',
            'tagline' => 'Advancing Sustainable Technology Through Research & Innovation',
            'institution' => 'Telkom University',
            'sub_institution' => 'Center of Excellence',
            'director_quote' => 'Pioneering sustainable technology with impact. We build solutions that scale beyond laboratories.',
            'director_name' => 'Prof. Dr. Ir. Adiwijaya, S.Si., M.Si.',
            'director_title' => 'Lead Advisor & Research Center Director',
            'contact_email' => 'stasrg@telkomuniversity.ac.id',
            'contact_phone' => '+62 22 756 4108',
            'address' => 'Center of Excellence STAS-RG, Telkom University, Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung, West Java 40257, Indonesia',
        ];
        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
