import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Publication } from '../../../types';
import { Language } from '../../../utils/translations';
import { AlertModal } from '../../../Components/Common/AlertModal';
import { PillBadge } from '../../../Components/Common/PillBadge';
import {
    BookOpen,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    ExternalLink,
    X,
    FileText,
    Award,
    Star,
    Globe2,
    Calendar,
    Users,
    Quote,
    Layers,
    SlidersHorizontal,
    BookmarkCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PublicationsIndexProps {
    publications: Publication[];
    stats: {
        total_publications: number;
        q1_count: number;
        conference_count: number;
        total_citations: number;
    };
    years: number[];
    filters: {
        search?: string;
        year?: string;
        quartile?: string;
        status?: string;
    };
    siteConfig?: {
        center_name?: string;
        institution?: string;
    };
    status?: string;
}

const BADGE_PRESETS = [
    {
        label: 'Journal Paper (Q1)',
        badge: 'Journal Paper (Q1)',
        badge_type: 'green' as const,
        quartile: 'Q1',
        indexing: 'Scopus Q1 / Web of Science',
    },
    {
        label: 'Journal Paper (Q2)',
        badge: 'Journal Paper (Q2)',
        badge_type: 'blue' as const,
        quartile: 'Q2',
        indexing: 'Scopus Q2 / Elsevier',
    },
    {
        label: 'Conference Paper',
        badge: 'Conference Paper',
        badge_type: 'gray' as const,
        quartile: 'Scopus',
        indexing: 'Scopus / IEEE Xplore',
    },
];

export default function PublicationsIndex({
    publications,
    stats,
    years,
    filters,
    siteConfig,
    status,
}: PublicationsIndexProps) {
    const [language, setLanguage] = useState<Language>('ID');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPub, setEditingPub] = useState<Publication | null>(null);
    const [pubToDelete, setPubToDelete] = useState<Publication | null>(null);
    const [activeLangTab, setActiveLangTab] = useState<'ID' | 'EN'>('ID');

    // Filter states
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [yearFilter, setYearFilter] = useState(filters.year || '');
    const [quartileFilter, setQuartileFilter] = useState(filters.quartile || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    useEffect(() => {
        const saved = localStorage.getItem('stas_lang') as Language;
        if (saved === 'EN' || saved === 'ID') {
            setLanguage(saved);
        }
    }, []);

    const isEn = language === 'EN';

    // Form handler using Inertia useForm
    const form = useForm({
        badge: BADGE_PRESETS[0].badge,
        badge_type: BADGE_PRESETS[0].badge_type as 'green' | 'gray' | 'blue',
        quartile: BADGE_PRESETS[0].quartile,
        indexing: BADGE_PRESETS[0].indexing,
        domain_tag: 'Sustainable Energy',
        year: new Date().getFullYear(),
        venue: '',
        doi: '',
        doi_url: '',
        pdf_url: '#',
        title: '',
        title_id: '',
        abstract: '',
        abstract_id: '',
        authors: '',
        citation_count: 0,
        is_featured: true,
        is_active: true,
        order: 1,
    });

    const openCreateModal = () => {
        setEditingPub(null);
        form.setData({
            badge: BADGE_PRESETS[0].badge,
            badge_type: BADGE_PRESETS[0].badge_type,
            quartile: BADGE_PRESETS[0].quartile,
            indexing: BADGE_PRESETS[0].indexing,
            domain_tag: 'Sustainable Energy',
            year: new Date().getFullYear(),
            venue: 'IEEE Transactions on Sustainable Energy',
            doi: 'DOI: 10.1109/TSTE.2026.',
            doi_url: '',
            pdf_url: '#',
            title: '',
            title_id: '',
            abstract: '',
            abstract_id: '',
            authors: '',
            citation_count: 0,
            is_featured: true,
            is_active: true,
            order: (publications.length || 0) + 1,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const openEditModal = (pub: Publication) => {
        setEditingPub(pub);
        form.setData({
            badge: pub.badge,
            badge_type: pub.badge_type,
            quartile: pub.quartile || 'Q1',
            indexing: pub.indexing || 'Scopus Q1',
            domain_tag: pub.domain_tag || '',
            year: pub.year,
            venue: pub.venue,
            doi: pub.doi,
            doi_url: pub.doi_url || '',
            pdf_url: pub.pdf_url || '#',
            title: pub.title,
            title_id: pub.title_id || pub.title,
            abstract: pub.abstract || '',
            abstract_id: pub.abstract_id || pub.abstract || '',
            authors: pub.authors,
            citation_count: pub.citation_count || 0,
            is_featured: pub.is_featured ?? true,
            is_active: pub.is_active ?? true,
            order: pub.order || 1,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPub) {
            form.put(`/admin/publications/${editingPub.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        } else {
            form.post('/admin/publications', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        }
    };

    const handleDelete = () => {
        if (!pubToDelete) return;
        router.delete(`/admin/publications/${pubToDelete.id}`, {
            onSuccess: () => setPubToDelete(null),
        });
    };

    const handleToggleStatus = (pub: Publication) => {
        router.post(`/admin/publications/${pub.id}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleToggleFeatured = (pub: Publication) => {
        router.post(`/admin/publications/${pub.id}/toggle-featured`, {}, {
            preserveScroll: true,
        });
    };

    const handleFilterChange = (newSearch: string, newYear: string, newQuartile: string, newStatus: string) => {
        setSearchQuery(newSearch);
        setYearFilter(newYear);
        setQuartileFilter(newQuartile);
        setStatusFilter(newStatus);
        router.get(
            '/admin/publications',
            { search: newSearch, year: newYear, quartile: newQuartile, status: newStatus },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AdminLayout
            title={isEn ? 'Peer-Reviewed Repository' : 'Kelola Repositori Publikasi'}
            siteConfig={siteConfig}
        >
            <div className="space-y-6">
                {/* 1. Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{isEn ? 'Peer-Reviewed Scholarly Repository' : 'Repositori Publikasi Ilmiah Bereputasi'}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {isEn ? 'Peer-Reviewed Academic Repository' : 'Repositori Akademik Peer-Reviewed'}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            {isEn
                                ? 'Manage high-impact research papers, international Q1 journal articles, and conference proceedings indexed in Scopus & Web of Science at CoE STAS-RG.'
                                : 'Kelola direktori makalah riset bereputasi tinggi, artikel jurnal internasional Q1, dan prosiding konferensi terindeks Scopus & Web of Science di CoE STAS-RG.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/#publications"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                        >
                            <ExternalLink className="w-4 h-4 text-[#1AC13B]" />
                            <span>{isEn ? 'View Live Repository' : 'Lihat di Web'}</span>
                        </Link>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#16a331] text-white text-xs font-bold transition-all shadow-none cursor-pointer border-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{isEn ? 'Add Paper' : 'Tambah Publikasi Baru'}</span>
                        </button>
                    </div>
                </div>

                {/* Status Alert Notification */}
                <AnimatePresence>
                    {status && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] border border-[#B2EFC3] dark:border-[#1A5C2F] text-xs font-semibold text-[#107E27] dark:text-[#3FD27B] flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#1AC13B]" />
                                <span>{status}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 2. KPI Statistics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {isEn ? 'Total Papers' : 'Total Publikasi'}
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                            {stats.total_publications}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Indexed publications' : 'Makalah tercatat'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-[#107E27] dark:text-[#3FD27B] uppercase tracking-wider flex items-center gap-1">
                            <BookmarkCheck className="w-3 h-3 text-[#1AC13B]" />
                            <span>{isEn ? 'Q1 Top Journals' : 'Jurnal Top Q1'}</span>
                        </div>
                        <div className="text-2xl font-black text-[#107E27] dark:text-[#1AC13B]">
                            {stats.q1_count}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Scopus & WoS Q1 tier' : 'Jurnal kuartil Q1'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                            {isEn ? 'Conferences' : 'Prosiding Konferensi'}
                        </div>
                        <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
                            {stats.conference_count}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'IEEE & IEOM proceedings' : 'Terindeks Scopus/IEEE'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            <Quote className="w-3 h-3" />
                            <span>{isEn ? 'Total Citations' : 'Total Sitasi'}</span>
                        </div>
                        <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                            {stats.total_citations}+
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Cumulative Google Scholar citations' : 'Akumulasi sitasi ilmiah'}
                        </div>
                    </div>
                </div>

                {/* 3. Search & Filter Bar */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="relative w-full md:max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleFilterChange(e.target.value, yearFilter, quartileFilter, statusFilter)}
                            placeholder={isEn ? 'Search by title, authors, venue, DOI...' : 'Cari judul makalah, penulis, venue, DOI...'}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] transition-all"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {/* Year Filter */}
                        <select
                            value={yearFilter}
                            onChange={(e) => handleFilterChange(searchQuery, e.target.value, quartileFilter, statusFilter)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#1AC13B] cursor-pointer"
                        >
                            <option value="">{isEn ? 'All Years' : 'Semua Tahun'}</option>
                            {years.map((y) => (
                                <option key={y} value={y.toString()}>
                                    {y}
                                </option>
                            ))}
                        </select>

                        {/* Quartile / Type Filter */}
                        <select
                            value={quartileFilter}
                            onChange={(e) => handleFilterChange(searchQuery, yearFilter, e.target.value, statusFilter)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#1AC13B] cursor-pointer"
                        >
                            <option value="">{isEn ? 'All Types' : 'Semua Tipe'}</option>
                            <option value="Q1">{isEn ? 'Q1 Journals Only' : 'Hanya Jurnal Q1'}</option>
                            <option value="Conference">{isEn ? 'Conferences Only' : 'Hanya Konferensi'}</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => handleFilterChange(searchQuery, yearFilter, quartileFilter, e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#1AC13B] cursor-pointer"
                        >
                            <option value="">{isEn ? 'All Statuses' : 'Semua Status'}</option>
                            <option value="active">{isEn ? 'Active Only' : 'Hanya Aktif'}</option>
                            <option value="featured">{isEn ? 'Featured Only' : 'Hanya Utama'}</option>
                            <option value="inactive">{isEn ? 'Draft Only' : 'Hanya Non-Aktif'}</option>
                        </select>
                    </div>
                </div>

                {/* 4. Publications List Container */}
                <div className="space-y-4">
                    {publications.map((pub, index) => (
                        <motion.div
                            key={pub.id}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.04 }}
                            className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 group ${
                                pub.is_active
                                    ? 'border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/70'
                                    : 'border-slate-200/50 dark:border-slate-800/50 opacity-60 bg-slate-50/50 dark:bg-slate-900/40'
                            }`}
                        >
                            <div className="space-y-3 max-w-4xl">
                                {/* Metadata line */}
                                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                    <PillBadge
                                        variant={pub.badge_type === 'green' ? 'green' : 'gray'}
                                        size="sm"
                                    >
                                        {pub.badge}
                                    </PillBadge>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{pub.year}</span>
                                    <span>•</span>
                                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{pub.venue}</span>
                                    <span>•</span>
                                    <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">{pub.doi}</span>
                                    {pub.indexing && (
                                        <>
                                            <span>•</span>
                                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                                {pub.indexing}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Paper Title (Bilingual) */}
                                <div className="space-y-1">
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors leading-snug">
                                        {pub.title_id || pub.title}
                                    </h3>
                                    {pub.title_id && pub.title !== pub.title_id && (
                                        <div className="text-xs text-slate-400 dark:text-slate-500 italic">
                                            EN: {pub.title}
                                        </div>
                                    )}
                                </div>

                                {/* Abstract if present */}
                                {(pub.abstract_id || pub.abstract) && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                        {pub.abstract_id || pub.abstract}
                                    </p>
                                )}

                                {/* Authors and Citations */}
                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                                    <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <span>{pub.authors}</span>
                                    </div>

                                    {pub.citation_count !== undefined && pub.citation_count > 0 && (
                                        <div className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md text-[10px]">
                                            <Quote className="w-3 h-3" />
                                            <span>{pub.citation_count} Citations</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions on right */}
                            <div className="flex flex-wrap items-center gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                                {pub.pdf_url && pub.pdf_url !== '#' && (
                                    <a
                                        href={pub.pdf_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 inline-flex items-center gap-1.5 transition-colors"
                                    >
                                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                                        <span>PDF</span>
                                    </a>
                                )}

                                {pub.doi_url && (
                                    <a
                                        href={pub.doi_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] hover:bg-[#1AC13B] hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors border border-[#B2EFC3]/60 dark:border-[#1A5C2F]"
                                    >
                                        <span>DOI Link</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}

                                {/* Quick Switch Active */}
                                <button
                                    type="button"
                                    onClick={() => handleToggleStatus(pub)}
                                    title={pub.is_active ? 'Click to deactivate' : 'Click to activate'}
                                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border-0 ${
                                        pub.is_active
                                            ? 'bg-slate-100 dark:bg-slate-800 text-[#107E27] dark:text-[#3FD27B]'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                    }`}
                                >
                                    {pub.is_active ? (isEn ? 'Active' : 'Aktif') : 'Draft'}
                                </button>

                                {/* Edit & Delete Buttons */}
                                <button
                                    type="button"
                                    onClick={() => openEditModal(pub)}
                                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-0"
                                    title={isEn ? 'Edit Publication' : 'Ubah Publikasi'}
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPubToDelete(pub)}
                                    className="p-2 rounded-xl text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer border-0"
                                    title={isEn ? 'Delete Publication' : 'Hapus Publikasi'}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 5. Create / Edit Publication Modal Dialog */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
                            />

                            {/* Modal Box */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto z-10"
                            >
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                            {editingPub
                                                ? (isEn ? 'Edit Academic Publication' : 'Ubah Data Publikasi Ilmiah')
                                                : (isEn ? 'Add Academic Publication' : 'Tambah Publikasi Ilmiah Baru')}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            {isEn
                                                ? 'Enter peer-reviewed publication metadata, indexing quartile, DOI links, and abstract.'
                                                : 'Masukkan metadata publikasi peer-reviewed, kuartil indeks, tautan DOI, dan abstrak.'}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleFormSubmit} className="space-y-5">
                                    {/* Badge Type Preset Selector */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                            {isEn ? 'Publication Tier & Indexing Preset' : 'Tipe Publikasi & Kuartil Indeks'} *
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                            {BADGE_PRESETS.map((preset, idx) => {
                                                const isSelected = form.data.badge === preset.badge;
                                                return (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => {
                                                            form.setData({
                                                                ...form.data,
                                                                badge: preset.badge,
                                                                badge_type: preset.badge_type,
                                                                quartile: preset.quartile,
                                                                indexing: preset.indexing,
                                                            });
                                                        }}
                                                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                                                            isSelected
                                                                ? 'border-[#1AC13B] bg-[#EDFBF1] dark:bg-[#10381C] ring-2 ring-[#1AC13B]/20'
                                                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-slate-50 dark:bg-slate-800'
                                                        }`}
                                                    >
                                                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                                                            {preset.label}
                                                        </div>
                                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                            {preset.indexing}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Bilingual Content Tabs */}
                                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                                            <div className="flex items-center gap-2">
                                                <Globe2 className="w-4 h-4 text-[#1AC13B]" />
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                    {isEn ? 'Bilingual Title & Abstract' : 'Judul & Abstrak Dwibahasa'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800 p-0.5 rounded-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveLangTab('ID')}
                                                    className={`px-3 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer border-0 ${
                                                        activeLangTab === 'ID'
                                                            ? 'bg-white dark:bg-slate-700 text-[#107E27] dark:text-[#3FD27B] shadow-xs'
                                                            : 'text-slate-600 dark:text-slate-400'
                                                    }`}
                                                >
                                                    Bahasa Indonesia (ID)
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveLangTab('EN')}
                                                    className={`px-3 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer border-0 ${
                                                        activeLangTab === 'EN'
                                                            ? 'bg-white dark:bg-slate-700 text-[#107E27] dark:text-[#3FD27B] shadow-xs'
                                                            : 'text-slate-600 dark:text-slate-400'
                                                    }`}
                                                >
                                                    English (EN)
                                                </button>
                                            </div>
                                        </div>

                                        {activeLangTab === 'ID' ? (
                                            /* Indonesian Content Fields */
                                            <div className="space-y-3.5">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Judul Makalah / Publikasi (ID) *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={form.data.title_id}
                                                        onChange={(e) => form.setData('title_id', e.target.value)}
                                                        placeholder="contoh: Penjadwalan Energi Terdesentralisasi pada Microgrid Hibrida Menggunakan Pembelajaran Penguatan Multi-Agen"
                                                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Abstrak / Ringkasan Ilmiah (ID)
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        value={form.data.abstract_id}
                                                        onChange={(e) => form.setData('abstract_id', e.target.value)}
                                                        placeholder="contoh: Makalah ini menyajikan strategi penjadwalan terdesentralisasi menggunakan pembelajaran penguatan multi-agen..."
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            /* English Content Fields */
                                            <div className="space-y-3.5">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Publication Title (EN) *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={form.data.title}
                                                        onChange={(e) => form.setData('title', e.target.value)}
                                                        placeholder="e.g. Decentralized Energy Scheduling in Hybrid Microgrids Using Multi-Agent Reinforcement Learning"
                                                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Scientific Abstract (EN)
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        value={form.data.abstract}
                                                        onChange={(e) => form.setData('abstract', e.target.value)}
                                                        placeholder="e.g. This paper presents a decentralized scheduling strategy using multi-agent deep reinforcement learning..."
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Authors & Venue Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Authors List' : 'Daftar Penulis'} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.authors}
                                                onChange={(e) => form.setData('authors', e.target.value)}
                                                placeholder="e.g. Rahmawati, S., Hendra, S., Pratama, A., & Chen, W."
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Journal / Conference Venue' : 'Nama Jurnal / Konferensi'} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.venue}
                                                onChange={(e) => form.setData('venue', e.target.value)}
                                                placeholder="e.g. IEEE Transactions on Sustainable Energy"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>

                                    {/* Year, DOI & Citation Count */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Publication Year' : 'Tahun Publikasi'} *
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min="2000"
                                                max="2050"
                                                value={form.data.year}
                                                onChange={(e) => form.setData('year', parseInt(e.target.value) || 2026)}
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'DOI Identifier' : 'Nomor DOI'} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.doi}
                                                onChange={(e) => form.setData('doi', e.target.value)}
                                                placeholder="DOI: 10.1109/TSTE.2026.14209"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Citations Count' : 'Jumlah Sitasi'}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={form.data.citation_count}
                                                onChange={(e) => form.setData('citation_count', parseInt(e.target.value) || 0)}
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>

                                    {/* External Links: DOI URL & PDF URL */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Direct DOI URL' : 'Tautan Langsung DOI'}
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.doi_url}
                                                onChange={(e) => form.setData('doi_url', e.target.value)}
                                                placeholder="https://doi.org/10.1109/TSTE.2026.14209"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'PDF / Preprint URL' : 'Tautan File PDF / Preprint'}
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.pdf_url}
                                                onChange={(e) => form.setData('pdf_url', e.target.value)}
                                                placeholder="https://arxiv.org/pdf/... or #"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>

                                    {/* Status & Featured Toggles */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                                        <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={form.data.is_featured}
                                                onChange={(e) => form.setData('is_featured', e.target.checked)}
                                                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                                            />
                                            <div>
                                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                                                    {isEn ? 'Showcase as Featured Paper' : 'Jadikan Publikasi Pilihan'}
                                                </span>
                                                <span className="text-[10px] text-slate-500">
                                                    {isEn ? 'Highlighted in showcase section' : 'Disorot di bagian publikasi beranda'}
                                                </span>
                                            </div>
                                        </label>

                                        <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={form.data.is_active}
                                                onChange={(e) => form.setData('is_active', e.target.checked)}
                                                className="w-4 h-4 rounded text-[#1AC13B] focus:ring-[#1AC13B] cursor-pointer"
                                            />
                                            <div>
                                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                                                    {form.data.is_active ? (isEn ? 'Published & Visible' : 'Publikasikan (Aktif)') : (isEn ? 'Save as Draft' : 'Simpan sebagai Draft')}
                                                </span>
                                                <span className="text-[10px] text-slate-500">
                                                    {isEn ? 'Visible on repository page' : 'Dapat diakses oleh publik'}
                                                </span>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Submit Actions */}
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                        >
                                            {isEn ? 'Cancel' : 'Batal'}
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={form.processing}
                                            className="px-6 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#16a331] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer border-0"
                                        >
                                            {form.processing
                                                ? (isEn ? 'Saving...' : 'Menyimpan...')
                                                : editingPub
                                                    ? (isEn ? 'Update Paper' : 'Perbarui Publikasi')
                                                    : (isEn ? 'Save Paper' : 'Simpan Publikasi')}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* 6. Delete Confirmation Modal (Custom Alert Template) */}
                <AlertModal
                    isOpen={!!pubToDelete}
                    onClose={() => setPubToDelete(null)}
                    onConfirm={handleDelete}
                    type="danger"
                    title={isEn ? 'Delete Academic Publication?' : 'Hapus Publikasi Ilmiah Ini?'}
                    message={
                        pubToDelete ? (
                            isEn ? (
                                `Are you sure you want to delete "${pubToDelete.title}"? This action cannot be undone.`
                            ) : (
                                `Apakah Anda yakin ingin menghapus publikasi "${pubToDelete.title_id || pubToDelete.title}"? Tindakan ini tidak dapat dibatalkan.`
                            )
                        ) : (
                            ''
                        )
                    }
                    confirmText={isEn ? 'Yes, Delete' : 'Ya, Hapus'}
                    cancelText={isEn ? 'Cancel' : 'Batal'}
                />
            </div>
        </AdminLayout>
    );
}
