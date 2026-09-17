import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Language } from '../../utils/translations';
import {
    LayoutDashboard,
    Layers,
    Briefcase,
    BookOpen,
    FlaskConical,
    Building2,
    Calendar,
    Newspaper,
    TrendingUp,
    Users,
    SlidersHorizontal,
    ExternalLink,
    Plus,
    ArrowUpRight,
    Search,
    CheckCircle2,
    Clock,
    Tag,
    ChevronRight,
    FileText,
    Sparkles,
    ShieldCheck,
    BarChart3,
    Activity,
    Star,
    GraduationCap,
    MapPin,
    Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { IconHelper } from '../../Components/Common/IconHelper';

interface ResearchProject {
    id: number;
    category: string;
    category_tag?: string;
    title: string;
    title_id?: string;
    slug: string;
    image_url?: string;
    lead_researcher?: string;
    summary?: string;
    featured: boolean;
    order: number;
    created_at?: string;
}

interface Publication {
    id: number;
    badge: string;
    badge_type: string;
    year: number;
    venue: string;
    doi?: string;
    title: string;
    title_id?: string;
    authors: string;
    pdf_url?: string;
    doi_url?: string;
    order: number;
}

interface Article {
    id: number;
    tag: string;
    date: string;
    title: string;
    title_id?: string;
    slug: string;
    summary: string;
    read_time?: string;
    order: number;
}

interface UpcomingEvent {
    id: number;
    tag: string;
    date_display: string;
    time_display?: string;
    title: string;
    title_id?: string;
    description: string;
    location?: string;
    primary_action_text?: string;
    order: number;
}

interface ResearchDomain {
    id: number;
    domain_number: string;
    title: string;
    title_id?: string;
    slug: string;
    icon?: string;
    summary?: string;
    summary_id?: string;
    link?: string;
    order: number;
}

interface ResearchMetric {
    id: number;
    value: string;
    label: string;
    label_id?: string;
    description: string;
    description_id?: string;
    icon?: string;
    source_type?: string;
    order?: number;
}

interface Researcher {
    id: number;
    name: string;
    title_degree?: string;
    role: string;
    role_id?: string;
    specialization: string;
    specialization_id?: string;
    institution?: string;
    avatar_url?: string;
    is_featured?: boolean;
}

interface Partner {
    id: number;
    name: string;
    tier: string;
    logo_url: string;
    country?: string;
}

interface EnterpriseService {
    id: number;
    name: string;
    name_id?: string;
    category: string;
    summary?: string;
    icon?: string;
}

interface DashboardProps {
    stats: {
        projects_count: number;
        active_projects_count?: number;
        publications_count: number;
        partners_count: number;
        articles_count: number;
        events_count: number;
        domains_count: number;
        services_count: number;
        researchers_count: number;
        metrics_count: number;
    };
    recentProjects: ResearchProject[];
    recentPublications: Publication[];
    recentArticles: Article[];
    upcomingEvents: UpcomingEvent[];
    domains: ResearchDomain[];
    headlineMetrics: ResearchMetric[];
    recentResearchers: Researcher[];
    recentPartners: Partner[];
    recentServices: EnterpriseService[];
    siteConfig: {
        center_name?: string;
        institution?: string;
        sub_institution?: string;
        tagline?: string;
        director_name?: string;
        director_title?: string;
        contact_email?: string;
    };
}

export default function Dashboard({
    stats,
    recentProjects = [],
    recentPublications = [],
    recentArticles = [],
    upcomingEvents = [],
    domains = [],
    headlineMetrics = [],
    recentResearchers = [],
    recentPartners = [],
    recentServices = [],
    siteConfig,
}: DashboardProps) {
    const [language, setLanguage] = useState<Language>('ID');

    useEffect(() => {
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }

        const handleStorageChange = () => {
            const updatedLang = localStorage.getItem('stas_lang') as Language;
            if (updatedLang === 'EN' || updatedLang === 'ID') {
                setLanguage(updatedLang);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const isEn = language === 'EN';

    const statCards = [
        {
            title: isEn ? 'Research Projects' : 'Proyek Riset',
            subtitle: isEn ? 'Active & completed R&D' : 'Proyek aktif & selesai',
            count: stats?.projects_count || 0,
            icon: Briefcase,
            color: 'emerald',
            href: '/admin/projects',
        },
        {
            title: isEn ? 'Publications' : 'Publikasi Ilmiah',
            subtitle: isEn ? 'Journal papers & papers' : 'Jurnal Scopus/IEEE',
            count: stats?.publications_count || 0,
            icon: BookOpen,
            color: 'teal',
            href: '/admin/publications',
        },
        {
            title: isEn ? 'Research Areas' : 'Bidang Riset',
            subtitle: isEn ? 'Core focus domains' : 'Fokus pilar keilmuan',
            count: stats?.domains_count || 0,
            icon: Layers,
            color: 'violet',
            href: '/admin/domains',
        },
        {
            title: isEn ? 'Strategic Partners' : 'Mitra Kerjasama',
            subtitle: isEn ? 'Industrial alliances' : 'Mitra industri & global',
            count: stats?.partners_count || 0,
            icon: Building2,
            color: 'blue',
            href: '/admin/partners',
        },
        {
            title: isEn ? 'Researchers & Team' : 'Tim Peneliti',
            subtitle: isEn ? 'Investigators & fellows' : 'Peneliti & perekayasa',
            count: stats?.researchers_count || 0,
            icon: Users,
            color: 'purple',
            href: '/admin/team',
        },
        {
            title: isEn ? 'Events & Workshops' : 'Agenda & Acara',
            subtitle: isEn ? 'Symposia & masterclasses' : 'Simposium & pelatihan',
            count: stats?.events_count || 0,
            icon: Calendar,
            color: 'amber',
            href: '/admin/events',
        },
        {
            title: isEn ? 'Enterprise Services' : 'Layanan Industri',
            subtitle: isEn ? 'Consulting & testing' : 'Konsultasi & uji lab',
            count: stats?.services_count || 0,
            icon: FlaskConical,
            color: 'indigo',
            href: '/admin/services',
        },
        {
            title: isEn ? 'News & Articles' : 'Berita & Artikel',
            subtitle: isEn ? 'Research insights' : 'Wawasan & rilis berita',
            count: stats?.articles_count || 0,
            icon: Newspaper,
            color: 'rose',
            href: '/admin/articles',
        },
    ];

    const quickActions = [
        {
            label: isEn ? 'Add Research Project' : 'Tambah Proyek Riset',
            description: isEn ? 'Register new R&D or applied grant project' : 'Daftarkan proyek riset atau hibah baru',
            icon: Briefcase,
            href: '/admin/projects',
        },
        {
            label: isEn ? 'Upload Publication' : 'Unggah Publikasi',
            description: isEn ? 'Add DOI, IEEE / Scopus Q1 journal paper' : 'Tambah DOI jurnal terindeks Scopus/IEEE',
            icon: BookOpen,
            href: '/admin/publications',
        },
        {
            label: isEn ? 'Manage Researchers' : 'Kelola Tim Peneliti',
            description: isEn ? 'Update academic profiles and credentials' : 'Perbarui profil dan kredensial peneliti',
            icon: Users,
            href: '/admin/team',
        },
        {
            label: isEn ? 'Update Research Metrics' : 'Atur Statistik Riset',
            description: isEn ? 'Customize headline impact counters' : 'Sesuaikan angka indikator capaian utama',
            icon: TrendingUp,
            href: '/admin/metrics',
        },
    ];

    return (
        <AdminLayout
            title={isEn ? 'Dashboard' : 'Dasbor'}
            siteConfig={siteConfig}
        >
            <Head title={isEn ? 'Dashboard - Admin STAS' : 'Dasbor - Admin STAS'} />

            <div className="space-y-8">
                {/* 1. Header Banner & Live Status */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs"
                >
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-[#1AC13B] animate-pulse" />
                            <span>{isEn ? 'Database Live Connected' : 'Database Aktif & Tersinkron'}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {siteConfig?.center_name || 'CoE STAS-RG'}{' '}
                            <span className="text-[#107E27] dark:text-[#1AC13B]">
                                {isEn ? 'Administration Portal' : 'Portal Manajemen'}
                            </span>
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                            {isEn
                                ? 'Unified content management for research tracks, industrial partnerships, Scopus/IEEE publications, and enterprise testing services at Telkom University.'
                                : 'Pengelolaan terpadu untuk riset terapan, kemitraan industri, publikasi Scopus/IEEE, serta layanan pengujian industri di Telkom University.'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <Link
                            href="/"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:border-[#1AC13B]/50 transition-colors"
                        >
                            <ExternalLink className="w-4 h-4 text-[#1AC13B]" />
                            <span>{isEn ? 'Preview Live Site' : 'Lihat Web Publik'}</span>
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#107E27] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>{isEn ? 'System Settings' : 'Pengaturan Sistem'}</span>
                        </Link>
                    </div>
                </motion.div>

                {/* 2. Headline Research Metrics Bar (from database research_metrics) */}
                {headlineMetrics.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                                <TrendingUp className="w-3.5 h-3.5 text-[#1AC13B]" />
                                {isEn ? 'Headline Impact Metrics (Home Bar)' : 'Indikator Capaian Utama (Halaman Depan)'}
                            </h3>
                            <Link
                                href="/admin/metrics"
                                className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1"
                            >
                                {isEn ? 'Manage Metrics' : 'Kelola Indikator'}
                                <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                            {headlineMetrics.map((m) => (
                                <Link
                                    key={m.id}
                                    href="/admin/metrics"
                                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/60 transition group flex items-center gap-3.5 shadow-xs"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#1AC13B]/10 text-[#1AC13B] flex items-center justify-center shrink-0">
                                        <IconHelper name={m.icon || 'TrendingUp'} className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-2xl font-black text-[#1AC13B] tracking-tight">
                                            {m.value}
                                        </div>
                                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                            {isEn ? m.label : (m.label_id || m.label)}
                                        </div>
                                        <div className="text-[10px] text-slate-400 truncate">
                                            {isEn ? m.description : (m.description_id || m.description)}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. Database Statistics Grid (8 modules) */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {isEn ? 'Database Records Overview' : 'Ringkasan Data Database'}
                        </h3>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                            {isEn ? 'Real-time database metrics' : 'Data aktual dari database'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
                        {statCards.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <motion.a
                                    key={card.title}
                                    href={card.href}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/60 dark:hover:border-[#1AC13B]/60 transition-all group flex flex-col justify-between shadow-xs"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-[#EDFBF1] group-hover:text-[#107E27] dark:group-hover:bg-[#10381C] dark:group-hover:text-[#3FD27B] flex items-center justify-center transition-colors">
                                            <Icon className="w-3.5 h-3.5" />
                                        </div>
                                        <ArrowUpRight className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover:text-[#1AC13B] transition-colors" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                            {card.count}
                                        </div>
                                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate mt-0.5">
                                            {card.title}
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                </div>

                {/* 4. Quick Action Cards */}
                <div id="quick-actions">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                        {isEn ? 'Quick Actions' : 'Aksi Cepat'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action) => {
                            const Icon = action.icon;
                            return (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] dark:hover:border-[#1AC13B] transition-all group flex items-start gap-3.5 shadow-xs"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                            {action.label}
                                        </div>
                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                            {action.description}
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* 5. Main Content Grid (Two Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column (7 cols): Projects, Publications, Articles */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Section: Recent Research Projects */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-[#1AC13B]" />
                                        {isEn ? 'Recent Research Projects' : 'Proyek Riset Terkini'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {isEn ? 'Latest R&D tracks and prototypes' : 'Inovasi R&D dan prototipe terbaru di database'}
                                    </p>
                                </div>
                                <Link
                                    href="/admin/projects"
                                    className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1"
                                >
                                    {isEn ? 'View All' : 'Lihat Semua'}
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {recentProjects.length === 0 ? (
                                <div className="text-center py-8 text-xs text-slate-400">
                                    {isEn ? 'No research projects registered yet.' : 'Belum ada proyek riset yang terdaftar di database.'}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentProjects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-[#1AC13B]/60 transition-colors"
                                        >
                                            <div className="space-y-1 min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B]">
                                                        {project.category || 'R&D Track'}
                                                    </span>
                                                    {project.featured && (
                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center gap-1">
                                                            <Star className="w-2.5 h-2.5 fill-amber-500" />
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                                <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors line-clamp-1">
                                                    {isEn ? project.title : (project.title_id || project.title)}
                                                </h5>
                                                {project.lead_researcher && (
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                                        <span className="font-semibold">{isEn ? 'Lead:' : 'Ketua:'}</span> {project.lead_researcher}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                                <Link
                                                    href="/admin/projects"
                                                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                                >
                                                    {isEn ? 'Manage' : 'Kelola'}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section: Academic Publications */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-teal-500" />
                                        {isEn ? 'Recent Publications' : 'Publikasi Ilmiah Terkini'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {isEn ? 'Scopus Q1/Q2 journal articles & conference papers' : 'Karya jurnal ilmiah dan prosiding terindeks'}
                                    </p>
                                </div>
                                <Link
                                    href="/admin/publications"
                                    className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1"
                                >
                                    {isEn ? 'View All' : 'Lihat Semua'}
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {recentPublications.length === 0 ? (
                                <div className="text-center py-6 text-xs text-slate-400">
                                    {isEn ? 'No publications found in database.' : 'Belum ada publikasi ilmiah yang terdaftar.'}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentPublications.map((pub) => (
                                        <div
                                            key={pub.id}
                                            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start justify-between gap-3 group hover:border-[#1AC13B]/60 transition-colors"
                                        >
                                            <div className="min-w-0 flex-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
                                                        {pub.badge}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400">
                                                        {pub.year}
                                                    </span>
                                                </div>
                                                <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors line-clamp-1">
                                                    {isEn ? pub.title : (pub.title_id || pub.title)}
                                                </h5>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                                    {pub.authors} — <span className="italic">{pub.venue}</span>
                                                </p>
                                            </div>
                                            <Link
                                                href="/admin/publications"
                                                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-[#107E27] transition shrink-0"
                                            >
                                                {isEn ? 'Edit' : 'Kelola'}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section: News & Articles */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Newspaper className="w-4 h-4 text-rose-500" />
                                        {isEn ? 'Recent News & Articles' : 'Berita & Artikel Terkini'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {isEn ? 'Published insights and media announcements' : 'Wawasan ilmiah dan siaran pers terbaru'}
                                    </p>
                                </div>
                                <Link
                                    href="/admin/articles"
                                    className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1"
                                >
                                    {isEn ? 'View All' : 'Lihat Semua'}
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {recentArticles.length === 0 ? (
                                <div className="text-center py-6 text-xs text-slate-400">
                                    {isEn ? 'No articles published yet.' : 'Belum ada artikel atau berita yang diterbitkan.'}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentArticles.map((article) => (
                                        <div
                                            key={article.id}
                                            className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start justify-between gap-3 group hover:border-[#1AC13B]/60 transition-colors"
                                        >
                                            <div className="min-w-0 flex-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
                                                        {article.tag}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400">
                                                        {article.date}
                                                    </span>
                                                </div>
                                                <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors line-clamp-1">
                                                    {isEn ? article.title : (article.title_id || article.title)}
                                                </h5>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                                    {article.summary}
                                                </p>
                                            </div>
                                            <Link
                                                href="/admin/articles"
                                                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-[#107E27] transition shrink-0"
                                            >
                                                {isEn ? 'Manage' : 'Kelola'}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column (5 cols): Researchers, Events, Domains, Partners */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Section: Principal Researchers & Team */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Users className="w-4 h-4 text-purple-500" />
                                        {isEn ? 'Research Team & Fellows' : 'Tim Peneliti & Pimpinan'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {isEn ? 'Principal investigators and lab leads' : 'Peneliti utama dan kepala laboratorium'}
                                    </p>
                                </div>
                                <Link
                                    href="/admin/team"
                                    className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1"
                                >
                                    {isEn ? 'View All' : 'Kelola'}
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {recentResearchers.length === 0 ? (
                                <div className="text-center py-6 text-xs text-slate-400">
                                    {isEn ? 'No researchers registered yet.' : 'Belum ada data tim peneliti.'}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentResearchers.map((r) => (
                                        <div
                                            key={r.id}
                                            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-3 hover:border-[#1AC13B]/60 transition-colors"
                                        >
                                            {r.avatar_url ? (
                                                <img
                                                    src={r.avatar_url}
                                                    alt={r.name}
                                                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-[#1AC13B]/10 text-[#1AC13B] font-bold flex items-center justify-center text-xs shrink-0">
                                                    {r.name.substring(0, 2).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <div className="text-xs font-bold text-slate-900 dark:text-white truncate flex items-center gap-1">
                                                    {r.name}
                                                    {r.is_featured && (
                                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                                                    )}
                                                </div>
                                                <div className="text-[11px] text-[#107E27] dark:text-[#1AC13B] font-semibold truncate">
                                                    {isEn ? r.role : (r.role_id || r.role)}
                                                </div>
                                                <div className="text-[10px] text-slate-400 truncate">
                                                    {r.institution}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section: Upcoming Events */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-amber-500" />
                                        {isEn ? 'Upcoming Symposia & Events' : 'Agenda & Acara Mendatang'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {isEn ? 'Academic conferences and bootcamps' : 'Simposium dan pelatihan teknologi'}
                                    </p>
                                </div>
                                <Link
                                    href="/admin/events"
                                    className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1"
                                >
                                    {isEn ? 'View All' : 'Kelola'}
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {upcomingEvents.length === 0 ? (
                                <div className="text-center py-6 text-xs text-slate-400">
                                    {isEn ? 'No upcoming events registered.' : 'Belum ada agenda acara terdaftar.'}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {upcomingEvents.map((evt) => (
                                        <div
                                            key={evt.id}
                                            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3 hover:border-[#1AC13B]/60 transition-colors"
                                        >
                                            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shrink-0 text-center min-w-[52px]">
                                                <div className="text-[10px] font-bold uppercase leading-tight">
                                                    {evt.date_display}
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                                    {evt.tag}
                                                </span>
                                                <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                                                    {isEn ? evt.title : (evt.title_id || evt.title)}
                                                </h5>
                                                {evt.location && (
                                                    <p className="text-[10px] text-slate-400 truncate mt-0.5 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {evt.location}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section: Research Domains (Pillars) */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-violet-500" />
                                        {isEn ? 'Research Focus Domains' : 'Domain Keahlian Riset'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {isEn ? 'Strategic research focus clusters' : 'Klaster pilar keahlian CoE STAS-RG'}
                                    </p>
                                </div>
                                <Link
                                    href="/admin/domains"
                                    className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1"
                                >
                                    {isEn ? 'View All' : 'Kelola'}
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {domains.length === 0 ? (
                                <div className="text-center py-6 text-xs text-slate-400">
                                    {isEn ? 'No research domains registered.' : 'Belum ada bidang riset terdaftar.'}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {domains.map((dom) => (
                                        <div
                                            key={dom.id}
                                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-2.5"
                                        >
                                            <div className="w-6 h-6 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] font-bold text-[10px] flex items-center justify-center shrink-0">
                                                {dom.domain_number}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                                    {isEn ? dom.title : (dom.title_id || dom.title)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section: Strategic Partners */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-blue-500" />
                                        {isEn ? 'Strategic Partners & Industry' : 'Mitra Kerjasama Industri'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {isEn ? 'Collaborative enterprise networks' : 'Jejaring korporasi dan mitra strategis'}
                                    </p>
                                </div>
                                <Link
                                    href="/admin/partners"
                                    className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1"
                                >
                                    {isEn ? 'View All' : 'Kelola'}
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </div>

                            {recentPartners.length === 0 ? (
                                <div className="text-center py-6 text-xs text-slate-400">
                                    {isEn ? 'No partners registered.' : 'Belum ada mitra kerjasama.'}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                    {recentPartners.map((p) => (
                                        <div
                                            key={p.id}
                                            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col items-center text-center justify-center"
                                        >
                                            {p.logo_url ? (
                                                <img
                                                    src={p.logo_url}
                                                    alt={p.name}
                                                    className="h-7 max-w-full object-contain mb-1.5 opacity-80"
                                                />
                                            ) : (
                                                <Building2 className="w-6 h-6 text-slate-400 mb-1" />
                                            )}
                                            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate max-w-full">
                                                {p.name}
                                            </span>
                                            <span className="text-[9px] font-semibold text-slate-400 capitalize">
                                                {p.tier}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
