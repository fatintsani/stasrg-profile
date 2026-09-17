import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Network,
    Home,
    Layers,
    Briefcase,
    BookOpen,
    FlaskConical,
    Newspaper,
    Calendar,
    Shield,
    Lock,
    Search,
    Printer,
    ArrowLeft,
    Clock,
    AlertCircle,
    ChevronRight,
    Building2,
    Mail,
    Phone,
    MapPin,
    Share2,
    Check,
    ArrowUpRight,
    Globe,
    FileCode,
    Sparkles,
    CheckCircle2,
    Compass,
    SlidersHorizontal,
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import {
    ResearchDomain,
    Publication,
    EnterpriseService,
    ResearchProject,
    Article,
    UpcomingEvent,
    SiteConfig,
} from '../types';

interface SitemapProps {
    siteConfig?: SiteConfig;
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    projects?: ResearchProject[];
    articles?: Article[];
    events?: UpcomingEvent[];
    lastUpdated?: string;
}

interface SiteLinkItem {
    title: {
        EN: string;
        ID: string;
    };
    href: string;
    desc: {
        EN: string;
        ID: string;
    };
    badge?: string;
    isExternal?: boolean;
}

interface SiteCategory {
    id: string;
    name: {
        EN: string;
        ID: string;
    };
    icon: React.ReactNode;
    color: string;
    links: SiteLinkItem[];
}

export default function Sitemap({
    siteConfig,
    domains = [],
    publications = [],
    services = [],
    projects = [],
    articles = [],
    events = [],
    lastUpdated = '17 September 2026',
}: SitemapProps) {
    // 1. Language State
    const [language, setLanguage] = useState<Language>('ID');

    // 2. Theme State
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 3. Search & Filter query
    const [searchQuery, setSearchQuery] = useState('');

    // 4. Category Filter Tab
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // 5. Share Copied Toast
    const [copiedToast, setCopiedToast] = useState(false);

    // Modals
    const [searchOpen, setSearchOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [contactSubject, setContactSubject] = useState('');

    useEffect(() => {
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }

        const savedTheme = localStorage.getItem('stas_theme') as 'light' | 'dark';
        if (savedTheme === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // 1-Click Language Switch
    const handleToggleLanguage = () => {
        const nextLang: Language = language === 'EN' ? 'ID' : 'EN';
        setLanguage(nextLang);
        localStorage.setItem('stas_lang', nextLang);
    };

    // Theme Switch
    const handleToggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        localStorage.setItem('stas_theme', nextTheme);
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShareLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopiedToast(true);
            setTimeout(() => setCopiedToast(false), 2500);
        }
    };

    const handleOpenContact = (subject: string) => {
        setContactSubject(subject);
        setContactOpen(true);
    };

    const t = translations[language];

    // Build categories structure dynamically
    const categories: SiteCategory[] = useMemo(() => {
        return [
            {
                id: 'main',
                name: {
                    EN: 'Main Landing & Institutional Overview',
                    ID: 'Beranda Utama & Profil Lembaga',
                },
                icon: <Home className="w-4 h-4" />,
                color: 'text-[#1AC13B]',
                links: [
                    {
                        title: { EN: 'Hero Section & Mission Statement', ID: 'Beranda & Visi Misi Riset' },
                        href: '/#hero',
                        desc: { EN: 'Flagship introduction and center research mandate', ID: 'Pengantar utama dan mandat riset CoE STAS-RG' },
                        badge: 'Core',
                    },
                    {
                        title: { EN: 'Key Research Metrics & Impact', ID: 'Metrik & Dampak Kinerja Riset' },
                        href: '/#about',
                        desc: { EN: 'Live statistics on active projects, papers, and fellows', ID: 'Statistik capaian proyek, publikasi, dan peneliti' },
                    },
                    {
                        title: { EN: 'About CoE STAS-RG & Four Pillars', ID: 'Tentang STAS-RG & 4 Pilar Keunggulan' },
                        href: '/#about',
                        desc: { EN: 'Applied R&D, industry integration, capacity building, and sustainability', ID: 'Riset terapan, integrasi industri, dan keberlanjutan' },
                    },
                    {
                        title: { EN: 'Strategic Industrial Partners & Network', ID: 'Mitra Kerjasama Strategis BUMN & Swasta' },
                        href: '/#partners',
                        desc: { EN: 'Collaborative alliances with SOEs, tech companies, and universities', ID: 'Jejaring kemitraan industri, BUMN, dan universitas' },
                    },
                    {
                        title: { EN: 'Contact & Laboratory Location', ID: 'Kontak Resmi & Lokasi Laboratorium' },
                        href: '/#contact',
                        desc: { EN: 'Campus map, direct inquiry hotline, and official email', ID: 'Peta kampus Telkom University, alamat, dan nomor kontak' },
                    },
                ],
            },
            {
                id: 'domains',
                name: {
                    EN: 'Research Domains (8 Focus Areas)',
                    ID: '8 Bidang Riset Unggulan',
                },
                icon: <Layers className="w-4 h-4" />,
                color: 'text-emerald-500',
                links: domains.length > 0
                    ? domains.map((d) => ({
                          title: {
                              EN: d.title,
                              ID: d.title_id || d.title,
                          },
                          href: `/#domains`,
                          desc: {
                              EN: d.summary,
                              ID: d.summary_id || d.summary,
                          },
                          badge: d.domain_number || 'Domain',
                      }))
                    : [
                          {
                              title: { EN: 'Sustainable Technology & Green Systems', ID: 'Teknologi Berkelanjutan & Sistem Hijau' },
                              href: '/#domains',
                              desc: { EN: 'Energy efficiency, carbon life-cycle assessment, eco-materials', ID: 'Efisiensi energi, analisis jejak karbon, material hijau' },
                          },
                          {
                              title: { EN: 'Smart Manufacturing & Industry 4.0', ID: 'Manufaktur Cerdas & Industri 4.0' },
                              href: '/#domains',
                              desc: { EN: 'Industrial robotics, digital twins, production system automation', ID: 'Robotika industri, otomasi pabrik, dan digital twin' },
                          },
                          {
                              title: { EN: 'Supply Chain Optimization & Logistics', ID: 'Optimasi Rantai Pasok & Logistik Cerdas' },
                              href: '/#domains',
                              desc: { EN: 'Warehouse automation, routing optimization, resilient logistics', ID: 'Otomasi pergudangan dan optimasi rute distribusi' },
                          },
                      ],
            },
            {
                id: 'projects',
                name: {
                    EN: 'Applied Research Projects',
                    ID: 'Proyek Riset Terapan',
                },
                icon: <Briefcase className="w-4 h-4" />,
                color: 'text-blue-500',
                links: projects.length > 0
                    ? projects.map((p) => ({
                          title: {
                              EN: p.title,
                              ID: p.title_id || p.title,
                          },
                          href: p.case_study_url || '/#projects',
                          desc: {
                              EN: `Lead Researcher: ${p.lead_researcher} | Category: ${p.category}`,
                              ID: `Ketua Peneliti: ${p.lead_researcher} | Kategori: ${p.category}`,
                          },
                          badge: p.category_tag || 'Project',
                          isExternal: !!p.case_study_url && p.case_study_url.startsWith('http'),
                      }))
                    : [
                          {
                              title: { EN: 'All Featured Projects Repository', ID: 'Repositori Proyek Riset Unggulan' },
                              href: '/#projects',
                              desc: { EN: 'Showcase of industrial R&D deployments', ID: 'Penerapan riset industri di lapangan' },
                          },
                      ],
            },
            {
                id: 'publications',
                name: {
                    EN: 'Academic Publications & Indexing',
                    ID: 'Publikasi Ilmiah & Jurnal Terindeks',
                },
                icon: <BookOpen className="w-4 h-4" />,
                color: 'text-purple-500',
                links: publications.length > 0
                    ? publications.map((pub) => ({
                          title: {
                              EN: pub.title,
                              ID: pub.title_id || pub.title,
                          },
                          href: pub.doi_url || pub.pdf_url || '/#publications',
                          desc: {
                              EN: `${pub.venue} (${pub.year}) - Authors: ${pub.authors}`,
                              ID: `${pub.venue} (${pub.year}) - Penulis: ${pub.authors}`,
                          },
                          badge: pub.badge || 'Scopus',
                          isExternal: true,
                      }))
                    : [
                          {
                              title: { EN: 'Scopus & International Indexed Papers', ID: 'Jurnal Ilmiah Terindeks Scopus/IEEE' },
                              href: '/#publications',
                              desc: { EN: 'Peer-reviewed articles, conference proceedings, and monographs', ID: 'Artikel jurnal terakreditasi dan prosiding konferensi' },
                          },
                      ],
            },
            {
                id: 'services',
                name: {
                    EN: 'Enterprise Services & Lab Testing',
                    ID: 'Layanan & Konsultasi Industri',
                },
                icon: <FlaskConical className="w-4 h-4" />,
                color: 'text-amber-500',
                links: services.length > 0
                    ? services.map((s) => ({
                          title: {
                              EN: s.title,
                              ID: s.title_id || s.title,
                          },
                          href: '/#services',
                          desc: {
                              EN: s.summary,
                              ID: s.summary_id || s.summary,
                          },
                          badge: s.service_number || 'Service',
                      }))
                    : [
                          {
                              title: { EN: 'Contract R&D & Advisory Services', ID: 'Riset Kontrak & Konsultasi Industri' },
                              href: '/#services',
                              desc: { EN: 'Custom engineering solutions and industrial trial testing', ID: 'Solusi rekayasa industri dan pendampingan implementasi' },
                          },
                      ],
            },
            {
                id: 'news-events',
                name: {
                    EN: 'News, Insights & Academic Events',
                    ID: 'Berita, Artikel & Agenda Kegiatan',
                },
                icon: <Newspaper className="w-4 h-4" />,
                color: 'text-cyan-500',
                links: [
                    {
                        title: { EN: 'News & Research Insights Archive', ID: 'Arsip Berita & Artikel Riset' },
                        href: '/#news',
                        desc: { EN: 'Breakthrough innovations, awards, and field testing reports', ID: 'Kabar penemuan teknologi dan liputan kegiatan riset' },
                        badge: 'Articles',
                    },
                    {
                        title: { EN: 'Upcoming Academic Symposia & Masterclasses', ID: 'Agenda Simposium & Pelatihan Laboratorium' },
                        href: '/#events',
                        desc: { EN: 'Conferences, workshops, and certified executive masterclasses', ID: 'Simposium internasional, lokakarya, dan pelatihan eksekutif' },
                        badge: 'Events',
                    },
                ],
            },
            {
                id: 'governance',
                name: {
                    EN: 'Legal, Compliance & Governance',
                    ID: 'Tata Kelola, Legal & Etika',
                },
                icon: <Shield className="w-4 h-4" />,
                color: 'text-[#1AC13B]',
                links: [
                    {
                        title: { EN: 'Privacy Policy & Data Governance', ID: 'Kebijakan Privasi & Perlindungan Data (UU PDP)' },
                        href: '/privacy',
                        desc: { EN: 'Personal data protection under Indonesian PDP Law (UU No. 27/2022) and ISO 27001', ID: 'Pelindungan data pribadi sesuai UU No. 27/2022 dan standar ISO/IEC 27001' },
                        badge: 'Law 27/2022',
                    },
                    {
                        title: { EN: 'Terms of Use & Association Framework', ID: 'Ketentuan Penggunaan & Asosiasi Riset' },
                        href: '/terms',
                        desc: { EN: 'Intellectual property rights, HPC acceptable use policy, and NDA rules', ID: 'Hak kekayaan intelektual (HKI), tata tertib lab HPC, dan NDA industri' },
                        badge: 'Terms',
                    },
                    {
                        title: { EN: 'Academic Ethics & Research Integrity Code', ID: 'Etika Akademik & Integritas Publikasi Ilmiah' },
                        href: '/ethics',
                        desc: { EN: 'Anti-plagiarism protocols, ethical AI utilization, and whistleblower protection', ID: 'Pencegahan plagiarisme, etika pemanfaatan AI, dan perlindungan pelapor' },
                        badge: 'COPE',
                    },
                    {
                        title: { EN: 'Portal Sitemap & Index Directory', ID: 'Peta Situs & Direktori Portal Lengkap' },
                        href: '/sitemap',
                        desc: { EN: 'Complete tree navigation and crawler indexing directory', ID: 'Struktur direktori pohon navigasi portal CoE STAS-RG' },
                        badge: 'Active',
                    },
                ],
            },
            {
                id: 'admin',
                name: {
                    EN: 'Authentication & Administration Gateway',
                    ID: 'Autentikasi & Portal Manajemen Admin',
                },
                icon: <Lock className="w-4 h-4" />,
                color: 'text-slate-400',
                links: [
                    {
                        title: { EN: 'Researcher & Faculty SSO Login', ID: 'Masuk Akun Peneliti / SSO Telkom University' },
                        href: '/login',
                        desc: { EN: 'Secure authentication gateway for authorized researchers and students', ID: 'Akses masuk portal menggunakan akun SSO atau kredensial terdaftar' },
                        badge: 'Auth',
                    },
                    {
                        title: { EN: 'New Research Fellow Registration', ID: 'Pendaftaran Akun Peneliti Baru' },
                        href: '/register',
                        desc: { EN: 'Submit an onboarding registration for computing lab permissions', ID: 'Pengajuan akun baru untuk asisten riset dan dosen' },
                    },
                    {
                        title: { EN: 'Account Password Recovery', ID: 'Layanan Pemulihan Kata Sandi Akun' },
                        href: '/forgot-password',
                        desc: { EN: 'Reset forgotten account credentials via institutional email verification', ID: 'Instruksi reset kata sandi akun melalui email institusi' },
                    },
                    {
                        title: { EN: 'Admin Management Portal Dashboard', ID: 'Panel Manajemen & Pengaturan Portal Admin' },
                        href: '/admin/dashboard',
                        desc: { EN: 'Content management, project tracking, and site analytics dashboard', ID: 'Pengelolaan data proyek, publikasi, artikel, dan pengaturan situs' },
                        badge: 'Admin Only',
                    },
                ],
            },
        ];
    }, [domains, projects, publications, services, articles, events]);

    // Calculate total indexed links
    const totalLinksCount = useMemo(() => {
        return categories.reduce((acc, cat) => acc + cat.links.length, 0);
    }, [categories]);

    // Filter categories and links based on search query and category tab
    const filteredCategories = useMemo(() => {
        let result = categories;

        if (selectedCategory !== 'all') {
            result = result.filter((cat) => cat.id === selectedCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result
                .map((cat) => ({
                    ...cat,
                    links: cat.links.filter((link) => {
                        const titleMatch =
                            link.title.EN.toLowerCase().includes(q) ||
                            link.title.ID.toLowerCase().includes(q);
                        const descMatch =
                            link.desc.EN.toLowerCase().includes(q) ||
                            link.desc.ID.toLowerCase().includes(q);
                        const badgeMatch = link.badge?.toLowerCase().includes(q);
                        return titleMatch || descMatch || badgeMatch;
                    }),
                }))
                .filter((cat) => cat.links.length > 0);
        }

        return result;
    }, [categories, selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{language === 'EN' ? 'Sitemap & Portal Directory - CoE STAS-RG' : 'Peta Situs & Direktori Portal - CoE STAS-RG'}</title>
                <meta
                    name="description"
                    content="Complete Sitemap and Navigational Tree Directory of Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG), Telkom University."
                />
            </Head>

            {/* Navigation Header */}
            <Navbar
                language={language}
                onToggleLanguage={handleToggleLanguage}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenLogin={() => setLoginOpen(true)}
                t={t.nav}
            />

            <main className="flex-grow">
                {/* Header Hero Banner */}
                <div className="relative bg-gradient-to-b from-[#EDFBF1]/60 via-transparent to-transparent dark:from-[#0A1C12]/40 dark:via-transparent border-b border-slate-200/80 dark:border-slate-800/80 pt-28 sm:pt-32 pb-10 sm:pb-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
                            <Link href="/" className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors">
                                {language === 'EN' ? 'Home' : 'Beranda'}
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-400 dark:text-slate-500">
                                {language === 'EN' ? 'Portal Overview' : 'Ikhtisar Portal'}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[#107E27] dark:text-[#1AC13B]">
                                {language === 'EN' ? 'Sitemap & Directory' : 'Peta Situs'}
                            </span>
                        </div>

                        {/* Title Header */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div className="max-w-3xl">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                    {language === 'EN'
                                        ? 'Sitemap & Navigational Directory'
                                        : 'Peta Situs & Direktori Portal'}
                                </h1>
                                <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {language === 'EN'
                                        ? 'Comprehensive visual directory of all research domains, project repositories, publications, industrial advisory services, and academic governance documents.'
                                        : 'Peta navigasi menyeluruh yang menghubungkan seluruh bidang riset, studi kasus proyek terapan, publikasi ilmiah, layanan konsultasi industri, dan tata kelola etika CoE STAS-RG.'}
                                </p>

                                {/* Badges */}
                                <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                        <Clock className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>
                                            {language === 'EN' ? 'Index Updated:' : 'Diperbarui:'}{' '}
                                            <strong>{lastUpdated}</strong>
                                        </span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>{totalLinksCount} Indexed Endpoints</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                        <Globe className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>Search Engine Crawler Ready</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                        <span>Version 2.4 (Active)</span>
                                    </span>
                                </div>
                            </div>

                            {/* Action Utilities */}
                            <div className="flex items-center gap-2.5 shrink-0">
                                <button
                                    onClick={handleShareLink}
                                    aria-label="Share Link"
                                    title={language === 'EN' ? 'Copy page URL' : 'Salin tautan halaman'}
                                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] border border-slate-200 dark:border-slate-800 text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
                                >
                                    {copiedToast ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>{language === 'EN' ? 'Copied!' : 'Tersalin!'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-3.5 h-3.5" />
                                            <span>{language === 'EN' ? 'Share' : 'Bagikan'}</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handlePrint}
                                    aria-label="Print Document"
                                    title={language === 'EN' ? 'Print or save as PDF' : 'Cetak atau simpan sebagai PDF'}
                                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] border border-slate-200 dark:border-slate-800 text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
                                >
                                    <Printer className="w-3.5 h-3.5" />
                                    <span>{language === 'EN' ? 'Print PDF' : 'Cetak PDF'}</span>
                                </button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleOpenContact('Sitemap & General Navigation Inquiry')}
                                    className="text-xs"
                                >
                                    {language === 'EN' ? 'Contact Secretariat' : 'Kontak Sekretariat'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter & Live Search Bar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                            {/* Search Input */}
                            <div className="relative flex-grow max-w-xl">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={
                                        language === 'EN'
                                            ? 'Search any page, research domain, paper, or legal doc...'
                                            : 'Cari nama halaman, bidang riset, publikasi, layanan, atau dokumen legal...'
                                    }
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] transition-colors"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline"
                                    >
                                        {language === 'EN' ? 'Clear' : 'Reset'}
                                    </button>
                                )}
                            </div>

                            {/* Match Counter */}
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 shrink-0">
                                <Compass className="w-4 h-4 text-[#1AC13B]" />
                                <span>
                                    {language === 'EN'
                                        ? `Showing ${filteredCategories.reduce((sum, cat) => sum + cat.links.length, 0)} matching endpoint(s)`
                                        : `Menampilkan ${filteredCategories.reduce((sum, cat) => sum + cat.links.length, 0)} tautan aktif`}
                                </span>
                            </div>
                        </div>

                        {/* Category Filter Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 no-scrollbar text-xs">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                                    selectedCategory === 'all'
                                        ? 'bg-[#1AC13B] text-white'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                            >
                                {language === 'EN' ? 'All Sections' : 'Semua Bagian'} ({totalLinksCount})
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                                        selectedCategory === cat.id
                                            ? 'bg-[#1AC13B] text-white'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    <span>{cat.name[language]}</span>
                                    <span className="text-[10px] opacity-75">({cat.links.length})</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Directory Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                    {filteredCategories.length === 0 ? (
                        <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {language === 'EN' ? 'No Matching Endpoints Found' : 'Tidak Ditemukan Tautan yang Cocok'}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                                {language === 'EN'
                                    ? 'Try adjusting your keyword filter or select "All Sections" to browse the full directory.'
                                    : 'Silakan gunakan kata kunci lain atau pilih tab "Semua Bagian" untuk melihat seluruh pohon tautan portal.'}
                            </p>
                            <Button
                                variant="outline-green"
                                size="sm"
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="mt-4 text-xs"
                            >
                                {language === 'EN' ? 'Reset Filters' : 'Reset Pencarian'}
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-[#1AC13B]/40 transition-all shadow-sm group"
                                >
                                    <div>
                                        {/* Category Title Header */}
                                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-lg bg-[#1AC13B]/10 dark:bg-[#1AC13B]/20 text-[#107E27] dark:text-[#1AC13B] flex items-center justify-center shrink-0">
                                                    {category.icon}
                                                </div>
                                                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                                    {category.name[language]}
                                                </h2>
                                            </div>
                                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                {category.links.length} {language === 'EN' ? 'links' : 'tautan'}
                                            </span>
                                        </div>

                                        {/* Links List */}
                                        <ul className="space-y-3">
                                            {category.links.map((link, idx) => (
                                                <li key={idx} className="group/item">
                                                    <a
                                                        href={link.href}
                                                        target={link.isExternal ? '_blank' : undefined}
                                                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                                                        className="block p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover/item:text-[#107E27] dark:group-hover/item:text-[#1AC13B] transition-colors flex items-center gap-1.5 flex-wrap">
                                                                <span>{link.title[language]}</span>
                                                                {link.badge && (
                                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EDFBF1] dark:bg-[#10381C]/60 text-[#107E27] dark:text-[#1AC13B] border border-[#1AC13B]/20">
                                                                        {link.badge}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {link.isExternal ? (
                                                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#1AC13B] shrink-0 mt-0.5 transition-colors" />
                                                            ) : (
                                                                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#1AC13B] shrink-0 mt-0.5 transition-transform group-hover/item:translate-x-0.5" />
                                                            )}
                                                        </div>
                                                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                                            {link.desc[language]}
                                                        </p>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* SEO & Machine Readable XML Section */}
                    <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0A1C12] to-[#143821] text-slate-200 border border-[#143821] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                            <img
                                src="/assets/icon/profile_cs.png"
                                alt="Sitemap Support"
                                className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0 drop-shadow-lg"
                            />
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1AC13B] uppercase tracking-wider">
                                    <FileCode className="w-4 h-4" />
                                    <span>{language === 'EN' ? 'Search Engine XML Sitemap' : 'Peta Situs Format Mesin (XML)'}</span>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-white">
                                    {language === 'EN'
                                        ? 'Automated XML Feeds for Web Crawlers & Academic Indexers'
                                        : 'Indeks Terstruktur Otomatis untuk Bot Perayap & Pengindeks Ilmiah'}
                                </h3>
                                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                                    {language === 'EN'
                                        ? 'Our repository is formatted with semantic OpenGraph metadata, JSON-LD academic schemas, and XML sitemaps to optimize visibility across Google Scholar, Scopus, and SINTA.'
                                        : 'Seluruh struktur halaman CoE STAS-RG dilengkapi metadata OpenGraph, skema akademik JSON-LD, serta standar sitemap.xml untuk pengindeksan optimal di Google Scholar, Scopus, dan SINTA.'}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <a
                                href="/sitemap.xml"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2.5 rounded-xl bg-[#1AC13B] text-white hover:bg-[#12A02E] font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
                            >
                                <FileCode className="w-3.5 h-3.5" />
                                <span>sitemap.xml</span>
                            </a>
                            <Button
                                variant="dark"
                                size="sm"
                                onClick={() => handleOpenContact('Indexing & API Integration Inquiry')}
                                className="text-xs border border-slate-700"
                            >
                                {language === 'EN' ? 'API Integration' : 'Integrasi API'}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Dynamic Footer matching Main Design */}
            <Footer
                siteConfig={siteConfig}
                domains={domains}
                publications={publications}
                services={services}
                t={t.footer}
            />

            {/* Quick Search Modal */}
            <SearchModal
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                domains={domains}
                projects={projects}
                publications={publications}
                services={services}
                articles={articles}
                t={t.search}
            />

            {/* Login Modal */}
            <LoginModal
                isOpen={loginOpen}
                onClose={() => setLoginOpen(false)}
                t={t.auth}
            />

            {/* Contact / Inquiries Modal */}
            <ContactModal
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
                prefilledSubject={contactSubject}
            />
        </div>
    );
}
