import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AdminLayout } from '../../Layouts/AdminLayout';
import { motion } from 'framer-motion';
import {
    Plus,
    Eye,
    Edit3,
    FileText,
    TrendingUp,
    Globe,
    FileEdit,
    Tag,
    BookOpen,
    Briefcase,
    Search,
    ChevronDown,
    ArrowUpRight,
    FolderKanban,
    Layers,
    Fingerprint,
    ExternalLink,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    Download,
    Printer,
} from 'lucide-react';

interface FlyerProject {
    id: number;
    title: string;
    headline: string;
    category: string;
    partner: string;
    status: 'Published' | 'Draft';
    updated_at: string;
    thumbnail_url: string;
    has_qr?: boolean;
}

interface ClusterDistribution {
    name: string;
    count: number;
    percentage: number;
}

interface DashboardProps {
    stats: {
        total_riset: number;
        di_landing: number;
        draft_internal: number;
        klaster_riset: number;
        publikasi_ilmiah: number;
        mitra_kustom: number;
    };
    flyerProjects: FlyerProject[];
    clusters: ClusterDistribution[];
    user: {
        name: string;
        email: string;
        role: string;
        avatar: string | null;
    };
    siteConfig?: {
        center_name?: string;
    };
}

export default function Dashboard({
    stats,
    flyerProjects = [],
    clusters = [],
    user,
    siteConfig,
}: DashboardProps) {
    const [selectedTab, setSelectedTab] = useState<'all' | 'published' | 'draft'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [previewProject, setPreviewProject] = useState<FlyerProject | null>(null);

    // Filter and sort flyer projects
    const filteredProjects = useMemo(() => {
        return flyerProjects
            .filter((p) => {
                if (selectedTab === 'published' && p.status !== 'Published') return false;
                if (selectedTab === 'draft' && p.status !== 'Draft') return false;
                if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
                if (searchQuery.trim() !== '') {
                    const query = searchQuery.toLowerCase();
                    const matchTitle = p.title.toLowerCase().includes(query);
                    const matchHeadline = p.headline.toLowerCase().includes(query);
                    const matchCategory = p.category.toLowerCase().includes(query);
                    const matchPartner = p.partner.toLowerCase().includes(query);
                    if (!matchTitle && !matchHeadline && !matchCategory && !matchPartner) return false;
                }
                return true;
            })
            .sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.id - b.id;
                }
                return b.id - a.id;
            });
    }, [flyerProjects, selectedTab, categoryFilter, sortOrder, searchQuery]);

    // Unique categories for filter dropdown
    const availableCategories = useMemo(() => {
        const set = new Set<string>();
        flyerProjects.forEach((p) => set.add(p.category));
        return Array.from(set);
    }, [flyerProjects]);

    const currentDateFormatted = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    return (
        <AdminLayout currentMenu="dashboard" siteConfig={siteConfig}>
            <Head title="Dashboard Overview - CoE STAS-RG Projects" />

            <div className="space-y-6">
                
                {/* 1. Welcome Header Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div className="space-y-1.5 max-w-2xl">
                        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                            {currentDateFormatted}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Selamat Datang, {user?.name || 'Administrator'}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Pusat kendali riset terintegrasi {siteConfig?.center_name || 'CoE STAS-RG'}. Kelola lembar publikasi resmi A4, klaster inovasi teknologi, publikasi jurnal, dan kemitraan strategis.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        {/* Secondary Button: Lihat Showcase */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer"
                        >
                            <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                            <span>Lihat Showcase</span>
                        </Link>

                        {/* Primary Button: + Buat Project Baru */}
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#159A2F] text-white text-xs font-black transition-all cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Buat Flyer Baru</span>
                        </Link>
                    </div>
                </motion.div>

                {/* 2. Key Stats Metrics Grid (6 Cards) */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5"
                >
                    {/* Stat 1: Total Riset */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-[#1AC13B]/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                                Total Riset
                            </span>
                            <div className="w-6 h-6 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center">
                                <TrendingUp className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-black text-slate-900 dark:text-white">
                                {stats.total_riset}
                            </div>
                            <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                                <span className="text-[#107E27] dark:text-[#3FD27B] font-bold">↗</span> Inovasi Aktif
                            </div>
                        </div>
                    </div>

                    {/* Stat 2: Di Landing */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-[#1AC13B]/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                                Di Landing
                            </span>
                            <div className="w-6 h-6 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center">
                                <Globe className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-black text-slate-900 dark:text-white">
                                {stats.di_landing}
                            </div>
                            <div className="text-[10px] font-medium text-[#107E27] dark:text-[#3FD27B] mt-0.5 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1AC13B]" /> Publik & Live
                            </div>
                        </div>
                    </div>

                    {/* Stat 3: Draft Internal */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-amber-400/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                                Draft Flyer
                            </span>
                            <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                                <FileEdit className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-black text-slate-900 dark:text-white">
                                {stats.draft_internal}
                            </div>
                            <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                                Dalam pengerjaan
                            </div>
                        </div>
                    </div>

                    {/* Stat 4: Klaster Riset */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-blue-400/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                                Klaster Riset
                            </span>
                            <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                <Layers className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-black text-slate-900 dark:text-white">
                                {stats.klaster_riset}
                            </div>
                            <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                                Domain Inovasi
                            </div>
                        </div>
                    </div>

                    {/* Stat 5: Publikasi Ilmiah */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-purple-400/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                                Publikasi
                            </span>
                            <div className="w-6 h-6 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <BookOpen className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-black text-slate-900 dark:text-white">
                                {stats.publikasi_ilmiah}
                            </div>
                            <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                                Q1 / Scopus / IEEE
                            </div>
                        </div>
                    </div>

                    {/* Stat 6: Mitra Industri */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-pink-400/40 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                                Mitra Industri
                            </span>
                            <div className="w-6 h-6 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                                <Briefcase className="w-3.5 h-3.5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-2xl font-black text-slate-900 dark:text-white">
                                {stats.mitra_kustom}
                            </div>
                            <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                                Mitra Kolaboratif
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 3. Main Two-Column Layout (Project Table & Side Cards) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* Left Column (Wide 2/3): Project Riset & Flyer Terbaru */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 space-y-5"
                    >
                        {/* Section Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                                    Project Riset & Flyer Terbaru
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    Daftar dokumen flyer inovasi visual yang siap diedit, dicetak/disimpan ke PDF, dan diunduh sebagai PNG.
                                </p>
                            </div>

                            <Link
                                href="/admin/projects"
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#107E27] dark:text-[#3FD27B] hover:underline shrink-0"
                            >
                                <span>Lihat Semua ({flyerProjects.length})</span>
                                <span>›</span>
                            </Link>
                        </div>

                        {/* Filter Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            
                            {/* Left Tabs: Semua / Published / Draft */}
                            <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-slate-800 rounded-xl">
                                <button
                                    onClick={() => setSelectedTab('all')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        selectedTab === 'all'
                                            ? 'bg-[#1AC13B] text-white'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    Semua
                                </button>
                                <button
                                    onClick={() => setSelectedTab('published')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        selectedTab === 'published'
                                            ? 'bg-[#1AC13B] text-white'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    Published
                                </button>
                                <button
                                    onClick={() => setSelectedTab('draft')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        selectedTab === 'draft'
                                            ? 'bg-[#1AC13B] text-white'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    Draft
                                </button>
                            </div>

                            {/* Center & Right Filters */}
                            <div className="flex flex-wrap items-center gap-2">
                                
                                {/* Category Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                                        onBlur={() => setTimeout(() => setCategoryDropdownOpen(false), 200)}
                                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 inline-flex items-center gap-2 cursor-pointer"
                                    >
                                        <span>
                                            {categoryFilter === 'all' ? 'Semua Kategori' : categoryFilter}
                                        </span>
                                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                    </button>

                                    {categoryDropdownOpen && (
                                        <div className="absolute left-0 mt-1 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 z-30 animate-in fade-in">
                                            <button
                                                onClick={() => setCategoryFilter('all')}
                                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                                    categoryFilter === 'all'
                                                        ? 'bg-[#EDFBF1] text-[#107E27] font-bold'
                                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                                }`}
                                            >
                                                Semua Kategori
                                            </button>
                                            {availableCategories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setCategoryFilter(cat)}
                                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors truncate ${
                                                        categoryFilter === cat
                                                            ? 'bg-[#EDFBF1] text-[#107E27] font-bold'
                                                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                                    }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                                        onBlur={() => setTimeout(() => setSortDropdownOpen(false), 200)}
                                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 inline-flex items-center gap-2 cursor-pointer"
                                    >
                                        <span>
                                            {sortOrder === 'desc' ? 'Terbaru Diperbarui' : 'Terlama Diperbarui'}
                                        </span>
                                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                    </button>

                                    {sortDropdownOpen && (
                                        <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 z-30 animate-in fade-in">
                                            <button
                                                onClick={() => setSortOrder('desc')}
                                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                                                    sortOrder === 'desc'
                                                        ? 'bg-[#EDFBF1] text-[#107E27] font-bold'
                                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                                }`}
                                            >
                                                Terbaru Diperbarui
                                            </button>
                                            <button
                                                onClick={() => setSortOrder('asc')}
                                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                                                    sortOrder === 'asc'
                                                        ? 'bg-[#EDFBF1] text-[#107E27] font-bold'
                                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                                }`}
                                            >
                                                Terlama Diperbarui
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Table Search Input */}
                                <div className="relative">
                                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Cari riset, headline..."
                                        className="pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div>
                                Menampilkan {filteredProjects.length} dari {flyerProjects.length} proyek riset
                            </div>
                            <div>
                                Sort: <span className="font-semibold text-slate-700 dark:text-slate-300">Pembaruan ({sortOrder.toUpperCase()})</span>
                            </div>
                        </div>

                        {/* Project Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200/80 dark:border-slate-800 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        <th className="py-2.5 px-3">Thumbnail</th>
                                        <th className="py-2.5 px-3">Nama Riset & Headline</th>
                                        <th className="py-2.5 px-3">Kategori & Mitra</th>
                                        <th className="py-2.5 px-3">Status</th>
                                        <th className="py-2.5 px-3">Update</th>
                                        <th className="py-2.5 px-3 text-right">Aksi Flyer</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                                    {filteredProjects.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-slate-400">
                                                Tidak ada data proyek riset yang sesuai dengan filter.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProjects.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="group hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                                            >
                                                {/* Thumbnail */}
                                                <td className="py-3 px-3">
                                                    <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
                                                        <img
                                                            src={item.thumbnail_url}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                        />
                                                    </div>
                                                </td>

                                                {/* Title & Headline */}
                                                <td className="py-3 px-3 max-w-[200px]">
                                                    <div className="font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                                                        {item.title}
                                                    </div>
                                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                                        {item.headline}
                                                    </div>
                                                </td>

                                                {/* Category & Partner */}
                                                <td className="py-3 px-3 max-w-[180px]">
                                                    <div className="text-[11px] font-bold text-[#107E27] dark:text-[#3FD27B] truncate">
                                                        {item.category}
                                                    </div>
                                                    <div className="text-[10px] text-slate-400 truncate">
                                                        {item.partner}
                                                    </div>
                                                </td>

                                                {/* Status Badge */}
                                                <td className="py-3 px-3">
                                                    {item.status === 'Published' ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] border border-[#B2EFC3]/60 dark:border-[#1A5C2F]">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#1AC13B]" />
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                            Draft
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Update Date */}
                                                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                    {item.updated_at}
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3 px-3 text-right whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-1.5 text-slate-400">
                                                        <button
                                                            onClick={() => setPreviewProject(item)}
                                                            className="p-1.5 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                                            title="Preview Lembar Flyer A4"
                                                        >
                                                            <Eye className="w-3.5 h-3.5" />
                                                        </button>
                                                        <Link
                                                            href="/admin/projects"
                                                            className="p-1.5 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                            title="Edit Konten Riset"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => alert(`Mengunduh lembar flyer A4 resmi untuk "${item.title}"...`)}
                                                            className="p-1.5 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                                            title="Cetak / Simpan PDF"
                                                        >
                                                            <Printer className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Right Column (Narrow 1/3): Cluster Distribution & Shortcuts */}
                    <div className="space-y-6">
                        
                        {/* Card 1: Distribusi Klaster Riset */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center">
                                        <Layers className="w-3.5 h-3.5" />
                                    </div>
                                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                                        Distribusi Klaster Riset
                                    </h3>
                                </div>
                                <span className="text-[11px] font-bold text-slate-400">
                                    {clusters.length} Klaster
                                </span>
                            </div>

                            {/* Progress Bars */}
                            <div className="space-y-3 pt-1">
                                {clusters.map((cluster, idx) => (
                                    <div key={idx} className="space-y-1.5">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[190px]">
                                                {cluster.name}
                                            </span>
                                            <span className="text-slate-400 font-mono text-[11px] shrink-0">
                                                {cluster.percentage}%
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#1AC13B] rounded-full transition-all duration-500"
                                                style={{ width: `${cluster.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Card 2: Pintasan Modul Website */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 space-y-3.5"
                        >
                            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Pintasan Navigasi Modul
                            </h3>

                            <div className="grid grid-cols-2 gap-2.5">
                                {/* Shortcut 1: Proyek & Flyer */}
                                <Link
                                    href="/admin/projects"
                                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:bg-[#EDFBF1] dark:hover:bg-[#10381C]/60 hover:border-[#B2EFC3] dark:hover:border-[#1A5C2F] transition-all group"
                                >
                                    <FolderKanban className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-[#107E27] dark:group-hover:text-[#3FD27B] transition-colors" />
                                    <div className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                                        Proyek Riset
                                    </div>
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                        Flyer A4 siap cetak
                                    </div>
                                </Link>

                                {/* Shortcut 2: Klaster Riset */}
                                <Link
                                    href="/admin/domains"
                                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:bg-[#EDFBF1] dark:hover:bg-[#10381C]/60 hover:border-[#B2EFC3] dark:hover:border-[#1A5C2F] transition-all group"
                                >
                                    <Layers className="w-4 h-4 text-[#107E27] dark:text-[#3FD27B]" />
                                    <div className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                                        Klaster Riset
                                    </div>
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                        8 Domain strategis
                                    </div>
                                </Link>

                                {/* Shortcut 3: Publikasi Q1 */}
                                <Link
                                    href="/admin/publications"
                                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:bg-[#EDFBF1] dark:hover:bg-[#10381C]/60 hover:border-[#B2EFC3] dark:hover:border-[#1A5C2F] transition-all group"
                                >
                                    <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                    <div className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                                        Publikasi Ilmiah
                                    </div>
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                        Scopus & IEEE papers
                                    </div>
                                </Link>

                                {/* Shortcut 4: Mitra & Layanan */}
                                <Link
                                    href="/admin/services"
                                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:bg-[#EDFBF1] dark:hover:bg-[#10381C]/60 hover:border-[#B2EFC3] dark:hover:border-[#1A5C2F] transition-all group"
                                >
                                    <Briefcase className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                                    <div className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                                        Layanan Industri
                                    </div>
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500">
                                        Kemitraan & Advisory
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 4. Bottom Full-Width CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="p-6 sm:p-8 rounded-2xl bg-[#1AC13B] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
                >
                    <div className="flex items-center gap-5 z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30">
                            <img
                                src="/assets/images/telu_noname.png"
                                alt="STAS Mascot"
                                className="w-9 h-9 object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/stas.png';
                                }}
                            />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white">
                                Ingin Menerbitkan Lembar Riset & Flyer Baru?
                            </h3>
                            <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
                                Lengkapi foto prototype riset, spesifikasi teknologi, poin manfaat, dan tautan video untuk langsung meng-generate lembar publikasi resmi A4 siap cetak.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/admin/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-black shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10"
                    >
                        <span>Buat Sekarang</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>

            </div>

            {/* Flyer Quick Preview Modal */}
            {previewProject && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#107E27] dark:text-[#3FD27B]">
                                Lembar Riset A4 Preview
                            </span>
                            <button
                                onClick={() => setPreviewProject(null)}
                                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-bold cursor-pointer"
                            >
                                Tutup ✕
                            </button>
                        </div>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                            <img
                                src={previewProject.thumbnail_url}
                                alt={previewProject.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                {previewProject.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {previewProject.headline}
                            </p>
                            <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                                <span>Mitra: <strong className="text-slate-700 dark:text-slate-200">{previewProject.partner}</strong></span>
                            </div>
                        </div>
                        <div className="pt-2 flex gap-2">
                            <button
                                onClick={() => {
                                    alert(`Mencetak dokumen resmi A4: ${previewProject.title}`);
                                    setPreviewProject(null);
                                }}
                                className="flex-1 py-2.5 rounded-xl bg-[#1AC13B] text-white text-xs font-bold hover:bg-[#159A2F] transition-colors cursor-pointer"
                            >
                                Cetak ke PDF
                            </button>
                            <button
                                onClick={() => setPreviewProject(null)}
                                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
