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
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ResearchProject {
    id: number;
    category: string;
    category_tag?: string;
    title: string;
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
    slug: string;
    summary: string;
    read_time?: string;
    order: number;
}

interface UpcomingEvent {
    id: number;
    tag: string;
    date_display: string;
    title: string;
    description: string;
    location?: string;
    primary_action_text?: string;
    secondary_action_text?: string;
    order: number;
}

interface ResearchDomain {
    id: number;
    domain_number: string;
    title: string;
    slug: string;
    icon?: string;
    summary?: string;
    link?: string;
    order: number;
}

interface DashboardProps {
    stats: {
        projects_count: number;
        publications_count: number;
        partners_count: number;
        articles_count: number;
        events_count: number;
        domains_count: number;
        services_count: number;
    };
    recentProjects: ResearchProject[];
    recentPublications: Publication[];
    recentArticles: Article[];
    upcomingEvents: UpcomingEvent[];
    domains: ResearchDomain[];
    siteConfig: {
        center_name?: string;
        institution?: string;
        sub_institution?: string;
    };
}

export default function Dashboard({
    stats,
    recentProjects = [],
    recentPublications = [],
    recentArticles = [],
    upcomingEvents = [],
    domains = [],
    siteConfig,
}: DashboardProps) {
    const [language, setLanguage] = useState<Language>('EN');

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
            subtitle: isEn ? 'Active & completed R&D' : 'R&D aktif & terapan',
            count: stats?.projects_count || 0,
            icon: Briefcase,
            color: 'emerald',
            href: '#projects',
        },
        {
            title: isEn ? 'Indexed Publications' : 'Publikasi Ilmiah',
            subtitle: isEn ? 'Scopus Q1 & IEEE journals' : 'Jurnal Scopus Q1 & IEEE',
            count: stats?.publications_count || 0,
            icon: BookOpen,
            color: 'teal',
            href: '#publications',
        },
        {
            title: isEn ? 'Strategic Partners' : 'Mitra Industri',
            subtitle: isEn ? 'Corporate & global institutions' : 'Korporasi & universitas global',
            count: stats?.partners_count || 0,
            icon: Building2,
            color: 'blue',
            href: '#partners',
        },
        {
            title: isEn ? 'Research Domains' : 'Domain Riset',
            subtitle: isEn ? 'Specialized focus groups' : 'Kelompok keahlian khusus',
            count: stats?.domains_count || 0,
            icon: Layers,
            color: 'violet',
            href: '#domains',
        },
        {
            title: isEn ? 'Symposia & Events' : 'Simposium & Agenda',
            subtitle: isEn ? 'Conferences & workshops' : 'Konferensi & lokakarya',
            count: stats?.events_count || 0,
            icon: Calendar,
            color: 'amber',
            href: '#events',
        },
        {
            title: isEn ? 'Enterprise Services' : 'Layanan Industri',
            subtitle: isEn ? 'Consulting & lab solutions' : 'Konsultasi & solusi lab',
            count: stats?.services_count || 0,
            icon: FlaskConical,
            color: 'indigo',
            href: '#services',
        },
    ];

    const quickActions = [
        {
            label: isEn ? 'Add Research Project' : 'Tambah Proyek Riset',
            description: isEn ? 'Register new R&D or applied grant project' : 'Daftarkan proyek riset atau hibah baru',
            icon: Plus,
            href: '#projects',
        },
        {
            label: isEn ? 'Upload Publication' : 'Unggah Publikasi',
            description: isEn ? 'Add DOI, IEEE / Scopus Q1 journal paper' : 'Tambah DOI jurnal terindeks Scopus/IEEE',
            icon: BookOpen,
            href: '#publications',
        },
        {
            label: isEn ? 'Partner Partnership' : 'Kelola Mitra Kerjasama',
            description: isEn ? 'Manage industry MoUs and lab agreements' : 'Kelola MoU industri dan kerjasama lab',
            icon: Building2,
            href: '#partners',
        },
        {
            label: isEn ? 'Publish News / Whitepaper' : 'Terbitkan Berita / Artikel',
            description: isEn ? 'Release research highlights and updates' : 'Rilis highlight riset dan kabar terbaru',
            icon: Newspaper,
            href: '#articles',
        },
    ];

    return (
        <AdminLayout
            title={isEn ? 'Dashboard' : 'Dasbor'}
            siteConfig={siteConfig}
        >
            <div className="space-y-8">
                {/* 1. Header Banner & Live Status */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-[#1AC13B] animate-pulse" />
                            <span>{isEn ? 'Control Hub Active' : 'Pusat Kendali Aktif'}</span>
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
                        <a
                            href="#quick-actions"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#16a331] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{isEn ? 'Quick Create' : 'Tambah Konten'}</span>
                        </a>
                    </div>
                </motion.div>

                {/* 2. Key Performance Indicators Grid */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {isEn ? 'Research & Engagement Overview' : 'Ringkasan Riset & Kolaborasi'}
                        </h3>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                            {isEn ? 'Real-time database metrics' : 'Metrik database terkini'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
                        {statCards.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <motion.a
                                    key={card.title}
                                    href={card.href}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/60 dark:hover:border-[#1AC13B]/60 transition-all group flex flex-col justify-between"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-[#EDFBF1] group-hover:text-[#107E27] dark:group-hover:bg-[#10381C] dark:group-hover:text-[#3FD27B] flex items-center justify-center transition-colors">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-[#1AC13B] transition-colors" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                            {card.count}
                                        </div>
                                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate mt-0.5">
                                            {card.title}
                                        </div>
                                        <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                            {card.subtitle}
                                        </div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Quick Action Cards */}
                <div id="quick-actions">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                        {isEn ? 'Quick Actions' : 'Aksi Cepat'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, idx) => {
                            const Icon = action.icon;
                            return (
                                <a
                                    key={action.label}
                                    href={action.href}
                                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] dark:hover:border-[#1AC13B] transition-all group flex items-start gap-3.5"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
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
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* 4. Main Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Recent Projects & Research Domains (7/12) */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Section: Recent Research Projects */}
                        <div id="projects" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        {isEn ? 'Recent Research Projects' : 'Proyek Riset Terkini'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {isEn ? 'Latest R&D tracks, grants, and prototypes' : 'Inovasi R&D, hibah riset, dan prototipe terbaru'}
                                    </p>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                    {recentProjects.length} {isEn ? 'items' : 'item'}
                                </span>
                            </div>

                            {recentProjects.length === 0 ? (
                                <div className="text-center py-8 text-xs text-slate-400">
                                    {isEn ? 'No research projects registered yet.' : 'Belum ada proyek riset yang terdaftar.'}
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
                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>
                                                <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors line-clamp-1">
                                                    {project.title}
                                                </h5>
                                                {project.lead_researcher && (
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                                        <span className="font-semibold">{isEn ? 'Lead:' : 'Ketua:'}</span> {project.lead_researcher}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                                <Link
                                                    href="/"
                                                    target="_blank"
                                                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                                >
                                                    {isEn ? 'View' : 'Lihat'}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section: Research Domains Grid */}
                        <div id="domains" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        {isEn ? 'Research Focus Domains' : 'Domain Keahlian Riset'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {isEn ? '8 strategic focus clusters of CoE STAS-RG' : '8 klaster fokus strategis CoE STAS-RG'}
                                    </p>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B]">
                                    {domains.length} {isEn ? 'Domains' : 'Domain'}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {domains.map((domain) => (
                                    <div
                                        key={domain.id}
                                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3 hover:border-[#1AC13B]/60 transition-colors"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center font-bold text-xs shrink-0">
                                            {domain.domain_number}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                                {domain.title}
                                            </div>
                                            {domain.summary && (
                                                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                                    {domain.summary}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section: News & Whitepapers */}
                        <div id="articles" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        {isEn ? 'Recent Articles & News' : 'Berita & Artikel Terkini'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {isEn ? 'Published insights and media announcements' : 'Wawasan ilmiah dan siaran pers terbaru'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                        {recentArticles.length} {isEn ? 'Articles' : 'Artikel'}
                                    </span>
                                    <Link
                                        href="/admin/articles"
                                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] hover:bg-[#B2EFC3]/60 transition-colors"
                                    >
                                        {isEn ? 'Manage All →' : 'Kelola Semua →'}
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {recentArticles.map((article) => (
                                    <div
                                        key={article.id}
                                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start justify-between gap-3"
                                    >
                                        <div className="space-y-1 min-w-0 flex-1">
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                                <span className="font-bold text-[#107E27] dark:text-[#3FD27B]">
                                                    {article.tag}
                                                </span>
                                                <span>•</span>
                                                <span>{article.date}</span>
                                            </div>
                                            <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                                                {article.title}
                                            </div>
                                        </div>
                                        {article.read_time && (
                                            <span className="text-[10px] text-slate-400 shrink-0 self-center">
                                                {article.read_time}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Publications, Symposia, and Institutional Profile (5/12) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Section: Latest Indexed Publications */}
                        <div id="publications" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        {isEn ? 'Latest Publications' : 'Publikasi Ilmiah Terbaru'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {isEn ? 'Scopus Q1 & IEEE Transactions papers' : 'Jurnal Scopus Q1 & IEEE Transactions'}
                                    </p>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B]">
                                    {recentPublications.length} {isEn ? 'Papers' : 'Paper'}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {recentPublications.map((pub) => (
                                    <div
                                        key={pub.id}
                                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2 hover:border-[#1AC13B]/60 transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                                                {pub.badge || 'Q1 Journal'}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                                {pub.year}
                                            </span>
                                        </div>

                                        <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                                            {pub.title}
                                        </h5>

                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                            {pub.authors}
                                        </div>

                                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px]">
                                            <span className="font-semibold text-slate-600 dark:text-slate-300 truncate">
                                                {pub.venue}
                                            </span>
                                            {pub.doi && (
                                                <span className="text-[#107E27] dark:text-[#1AC13B] font-mono shrink-0">
                                                    DOI Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section: Upcoming Conferences & Symposia */}
                        <div id="events" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                        {isEn ? 'Conferences & Symposia' : 'Simposium & Konferensi'}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {isEn ? 'IS-STSS 2026 & scheduled events' : 'IS-STSS 2026 & agenda mendatang'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {upcomingEvents.map((evt) => (
                                    <div
                                        key={evt.id}
                                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B]">
                                                {evt.tag}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                                {evt.date_display}
                                            </span>
                                        </div>

                                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                                            {evt.title}
                                        </div>

                                        {evt.location && (
                                            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                                <span>📍</span>
                                                <span>{evt.location}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section: Institutional Summary */}
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#EDFBF1] to-white dark:from-[#10381C]/40 dark:to-slate-900 border border-[#1AC13B]/30 dark:border-[#1AC13B]/20 space-y-3">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#107E27] dark:text-[#1AC13B]" />
                                <h4 className="text-xs font-bold text-[#107E27] dark:text-[#3FD27B] uppercase tracking-wider">
                                    {isEn ? 'Center of Excellence Status' : 'Status Center of Excellence'}
                                </h4>
                            </div>
                            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                                <div className="font-bold text-slate-900 dark:text-white">
                                    {siteConfig?.center_name || 'CoE STAS-RG'}
                                </div>
                                <div>
                                    {siteConfig?.institution || 'Telkom University'} — Bandung, Indonesia
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                {isEn
                                    ? 'Designated institutional research center focusing on Energy Transition, Intelligent IoT, and Sustainable Circular Economy.'
                                    : 'Pusat riset unggulan berfokus pada Transisi Energi, IoT Cerdas, dan Ekonomi Sirkular Berkelanjutan.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
