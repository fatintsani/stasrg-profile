import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Article, SiteConfig } from '../../../types';
import { useForm, router, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Newspaper,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    Star,
    ExternalLink,
    Calendar,
    Globe2,
    Layers,
    Filter,
    X,
    Upload,
    ImageIcon,
    Clock,
    User,
    Sparkles,
    FileText,
    Megaphone,
    BookOpen,
    Landmark,
    Award,
    Eye,
    LayoutGrid,
    ListFilter,
    Table as TableIcon,
} from 'lucide-react';
import { AlertModal } from '../../../Components/Common/AlertModal';

interface Stats {
    total: number;
    active: number;
    featured: number;
    press_grant: number;
    reports_events: number;
}

interface ArticlesIndexProps {
    articles: Article[];
    stats: Stats;
    filters: {
        search?: string;
        tag?: string;
        status?: string;
    };
    siteConfig: SiteConfig;
}

type Language = 'ID' | 'EN';

const TAG_OPTIONS = [
    { value: 'PRESS RELEASE', label: 'Siaran Pers / Press Release', icon: Megaphone, color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800' },
    { value: 'RESEARCH REPORT', label: 'Laporan Riset & Insight Ilmiah', icon: FileText, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800' },
    { value: 'STRATEGIC GRANT', label: 'Hibah Riset & Pendanaan Strategis', icon: Award, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800' },
    { value: 'INDUSTRY PARTNERSHIP', label: 'Kemitraan Industri & Implementasi', icon: Landmark, color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-800' },
    { value: 'ACADEMIC EVENT', label: 'Simposium & Agenda Akademik', icon: BookOpen, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800' },
    { value: 'POLICY BRIEF', label: 'Rekomendasi Kebijakan & ESG', icon: Layers, color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800' },
];

const IMAGE_PRESETS = [
    { label: 'Autonomous Fleet Logistics', url: '/assets/images/research/autonomous_fleet.png' },
    { label: 'Smart Microgrid Energy', url: '/assets/images/research/smart_microgrid.png' },
    { label: 'Digital Twin Manufacturing', url: '/assets/images/research/digital_twin.png' },
    { label: 'Sustainable Energy Systems', url: '/assets/images/publications/sustainable_energy.png' },
    { label: 'Edge AI Defect Detection', url: '/assets/images/publications/edge_ai_defect.png' },
    { label: 'Bioreactor Technology', url: '/assets/images/publications/bioreactor_system.png' },
];

export default function ArticlesIndex({
    articles,
    stats,
    filters,
    siteConfig,
}: ArticlesIndexProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedTag, setSelectedTag] = useState(filters.tag || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [activeTab, setActiveTab] = useState<'info' | 'media' | 'content' | 'settings'>('info');
    const [activeLangTab, setActiveLangTab] = useState<Language>('ID');
    const [imageInputType, setImageInputType] = useState<'preset' | 'upload' | 'url'>('preset');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

    // Form handler
    const form = useForm({
        tag: 'PRESS RELEASE',
        title: '',
        title_id: '',
        slug: '',
        summary: '',
        summary_id: '',
        content: '',
        content_id: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase().replace(',', ' -'),
        author: 'CoE STAS-RG Editorial Team',
        read_time: '4 min read',
        image_url: IMAGE_PRESETS[0].url,
        image_file: null as File | null,
        external_url: '',
        is_featured: true,
        is_active: true,
        order: 1,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/articles',
            {
                search: searchQuery,
                tag: selectedTag,
                status: selectedStatus,
            },
            { preserveState: true }
        );
    };

    const handleTagFilter = (t: string) => {
        setSelectedTag(t);
        router.get(
            '/admin/articles',
            {
                search: searchQuery,
                tag: t,
                status: selectedStatus,
            },
            { preserveState: true }
        );
    };

    const handleStatusFilter = (st: string) => {
        setSelectedStatus(st);
        router.get(
            '/admin/articles',
            {
                search: searchQuery,
                tag: selectedTag,
                status: st,
            },
            { preserveState: true }
        );
    };

    const openCreateModal = () => {
        setEditingArticle(null);
        form.reset();
        form.clearErrors();
        setActiveTab('info');
        setActiveLangTab('ID');
        setImageInputType('preset');
        setImagePreview(IMAGE_PRESETS[0].url);
        const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase().replace(',', ' -');
        form.setData({
            tag: 'PRESS RELEASE',
            title: '',
            title_id: '',
            slug: '',
            summary: '',
            summary_id: '',
            content: '',
            content_id: '',
            date: formattedDate,
            author: 'CoE STAS-RG Editorial Team',
            read_time: '4 min read',
            image_url: IMAGE_PRESETS[0].url,
            image_file: null,
            external_url: '',
            is_featured: true,
            is_active: true,
            order: articles.length + 1,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (article: Article) => {
        setEditingArticle(article);
        form.clearErrors();
        setActiveTab('info');
        setActiveLangTab('ID');
        setImagePreview(article.image_url || IMAGE_PRESETS[0].url);
        setImageInputType(
            article.image_url && article.image_url.startsWith('/storage/')
                ? 'upload'
                : IMAGE_PRESETS.some((p) => p.url === article.image_url)
                ? 'preset'
                : 'url'
        );
        form.setData({
            tag: article.tag || 'PRESS RELEASE',
            title: article.title,
            title_id: article.title_id || article.title,
            slug: article.slug,
            summary: article.summary,
            summary_id: article.summary_id || article.summary,
            content: article.content || '',
            content_id: article.content_id || article.content || '',
            date: article.date,
            author: article.author || 'CoE STAS-RG Editorial Team',
            read_time: article.read_time || '4 min read',
            image_url: article.image_url || IMAGE_PRESETS[0].url,
            image_file: null,
            external_url: article.external_url || '',
            is_featured: article.is_featured ?? true,
            is_active: article.is_active ?? true,
            order: article.order || 1,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingArticle(null);
        form.reset();
        form.clearErrors();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setData('image_file', file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Auto fallback between ID and EN before submitting
        const titleFinal = form.data.title || form.data.title_id;
        const titleIdFinal = form.data.title_id || form.data.title;
        const summaryFinal = form.data.summary || form.data.summary_id;
        const summaryIdFinal = form.data.summary_id || form.data.summary;
        const contentFinal = form.data.content || form.data.content_id;
        const contentIdFinal = form.data.content_id || form.data.content;

        form.transform((data) => ({
            ...data,
            title: titleFinal,
            title_id: titleIdFinal,
            summary: summaryFinal,
            summary_id: summaryIdFinal,
            content: contentFinal,
            content_id: contentIdFinal,
        }));

        if (editingArticle) {
            if (form.data.image_file) {
                router.post(`/admin/articles/${editingArticle.id}`, {
                    _method: 'put',
                    ...form.data,
                    title: titleFinal,
                    title_id: titleIdFinal,
                    summary: summaryFinal,
                    summary_id: summaryIdFinal,
                    content: contentFinal,
                    content_id: contentIdFinal,
                }, {
                    onSuccess: () => closeModal(),
                });
            } else {
                form.put(`/admin/articles/${editingArticle.id}`, {
                    onSuccess: () => closeModal(),
                });
            }
        } else {
            form.post('/admin/articles', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (article: Article) => {
        setArticleToDelete(article);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (articleToDelete) {
            router.delete(`/admin/articles/${articleToDelete.id}`, {
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    setArticleToDelete(null);
                },
            });
        }
    };

    const handleToggleStatus = (article: Article) => {
        router.post(`/admin/articles/${article.id}/toggle`, {}, { preserveScroll: true });
    };

    const handleToggleFeatured = (article: Article) => {
        router.post(`/admin/articles/${article.id}/toggle-featured`, {}, { preserveScroll: true });
    };

    const getTagBadge = (tag: string) => {
        const found = TAG_OPTIONS.find((t) => t.value === tag);
        return found || {
            value: tag,
            label: tag,
            color: 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
        };
    };

    return (
        <AdminLayout
            title="Kelola Berita Riset & Wawasan Terkini"
            siteConfig={siteConfig}
        >
            <div className="space-y-6">
                {/* 1. Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold border border-[#B2EFC3] dark:border-[#1A5C2F]">
                            <Newspaper className="w-3.5 h-3.5 text-[#1AC13B]" />
                            <span>Media Publikasi & Wawasan Strategis</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Berita Riset & Wawasan Terkini
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            Kelola siaran pers terobosan riset terbaru, pengumuman hibah kemitraan industri, dan laporan kebijakan strategis CoE STAS-RG.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/#news"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors shadow-xs"
                        >
                            <ExternalLink className="w-4 h-4 text-[#1AC13B]" />
                            <span>Lihat di Beranda</span>
                        </Link>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold transition-all shadow-sm cursor-pointer border-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Artikel Baru</span>
                        </button>
                    </div>
                </div>

                {/* 2. KPI Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Artikel</span>
                            <Newspaper className="w-4 h-4 text-[#1AC13B]" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.total}
                        </div>
                        <div className="text-[11px] text-slate-400">Siaran Pers & Laporan Riset</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Artikel Aktif</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.active}
                        </div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Tampil di Beranda Utama
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Berita Utama</span>
                            <Sparkles className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.featured}
                        </div>
                        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                            Sorotan Artikel Unggulan
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pers & Hibah</span>
                            <Award className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.press_grant}
                        </div>
                        <div className="text-[11px] text-slate-400">Publikasi Strategis</div>
                    </div>
                </div>

                {/* 3. Filters & Search Toolbar */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari judul artikel, ringkasan, penulis, atau tag..."
                            className="w-full pl-9 pr-9 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B]"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    router.get(
                                        '/admin/articles',
                                        { tag: selectedTag, status: selectedStatus },
                                        { preserveState: true }
                                    );
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </form>

                    {/* Filters & View Toggle */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        {/* Tag Dropdown */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kategori:</span>
                            <select
                                value={selectedTag}
                                onChange={(e) => handleTagFilter(e.target.value)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#1AC13B]"
                            >
                                <option value="all">Semua Kategori</option>
                                {TAG_OPTIONS.map((tag) => (
                                    <option key={tag.value} value={tag.value}>
                                        {tag.value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status:</span>
                            <select
                                value={selectedStatus}
                                onChange={(e) => handleStatusFilter(e.target.value)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#1AC13B]"
                            >
                                <option value="all">Semua Status</option>
                                <option value="active">Hanya Aktif</option>
                                <option value="featured">Berita Utama</option>
                                <option value="inactive">Nonaktif / Draft</option>
                            </select>
                        </div>

                        {/* View Switcher */}
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800">
                            <button
                                type="button"
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-colors cursor-pointer border-0 ${
                                    viewMode === 'grid'
                                        ? 'bg-white dark:bg-slate-700 text-[#107E27] dark:text-[#3FD27B] shadow-xs'
                                        : 'text-slate-400 hover:text-slate-700'
                                }`}
                                title="Grid View"
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('table')}
                                className={`p-1.5 rounded-md transition-colors cursor-pointer border-0 ${
                                    viewMode === 'table'
                                        ? 'bg-white dark:bg-slate-700 text-[#107E27] dark:text-[#3FD27B] shadow-xs'
                                        : 'text-slate-400 hover:text-slate-700'
                                }`}
                                title="Table View"
                            >
                                <TableIcon className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. Articles Content (Grid or Table) */}
                {articles.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <Newspaper className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                            Tidak ada artikel berita ditemukan
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                            Coba ubah kata kunci pencarian atau filter kategori, atau tambahkan artikel berita baru.
                        </p>
                        <button
                            onClick={openCreateModal}
                            className="mt-4 px-4 py-2 rounded-xl bg-[#1AC13B] text-white text-xs font-bold hover:bg-[#12A02E] transition-colors cursor-pointer border-0"
                        >
                            Tambah Artikel Baru
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {articles.map((article) => {
                            const badge = getTagBadge(article.tag);
                            return (
                                <motion.div
                                    key={article.id}
                                    layout
                                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-[#1AC13B]/60 transition-all shadow-xs group"
                                >
                                    <div className="space-y-3.5">
                                        {/* Cover Image Thumbnail */}
                                        <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60">
                                            {article.image_url ? (
                                                <img
                                                    src={article.image_url}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                    <Newspaper className="w-10 h-10" />
                                                </div>
                                            )}
                                            {/* Tag Badge overlay */}
                                            <div className="absolute top-2.5 left-2.5">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border shadow-xs ${badge.color}`}>
                                                    {article.tag}
                                                </span>
                                            </div>
                                            {/* Featured Star overlay */}
                                            {article.is_featured && (
                                                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-500/90 text-white text-[10px] font-black flex items-center gap-1 shadow-xs">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span>UTAMA</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Date, Author, Read Time Meta */}
                                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                                            <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                                                <Calendar className="w-3 h-3 text-[#1AC13B]" />
                                                {article.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {article.read_time}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                            {article.title_id || article.title}
                                        </h3>

                                        {/* Summary Excerpt */}
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                            {article.summary_id || article.summary}
                                        </p>

                                        {/* Author info */}
                                        {article.author && (
                                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] text-slate-400">
                                                <User className="w-3 h-3 text-slate-400 shrink-0" />
                                                <span className="truncate">{article.author}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            {/* Toggle Active Button */}
                                            <button
                                                type="button"
                                                onClick={() => handleToggleStatus(article)}
                                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                                                    article.is_active
                                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                                }`}
                                            >
                                                {article.is_active ? 'Aktif' : 'Draft'}
                                            </button>

                                            {/* Toggle Featured Button */}
                                            <button
                                                type="button"
                                                onClick={() => handleToggleFeatured(article)}
                                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                                    article.is_featured
                                                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                                                        : 'text-slate-300 hover:text-amber-500 border-transparent hover:border-slate-200'
                                                }`}
                                                title={article.is_featured ? 'Hapus dari Berita Utama' : 'Jadikan Berita Utama'}
                                            >
                                                <Star className={`w-3.5 h-3.5 ${article.is_featured ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => openEditModal(article)}
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-0"
                                                title="Edit Artikel"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => confirmDelete(article)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer border-0"
                                                title="Hapus Artikel"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    /* Table View */
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                    <tr>
                                        <th className="px-4 py-3.5">Artikel & Cover</th>
                                        <th className="px-4 py-3.5">Kategori / Tag</th>
                                        <th className="px-4 py-3.5">Penulis & Tanggal</th>
                                        <th className="px-4 py-3.5">Status</th>
                                        <th className="px-4 py-3.5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {articles.map((article) => {
                                        const badge = getTagBadge(article.tag);
                                        return (
                                            <tr key={article.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                                                            {article.image_url ? (
                                                                <img src={article.image_url} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-slate-400"><Newspaper className="w-4 h-4" /></div>
                                                            )}
                                                        </div>
                                                        <div className="max-w-md">
                                                            <div className="font-bold text-slate-900 dark:text-white truncate">
                                                                {article.title_id || article.title}
                                                            </div>
                                                            <div className="text-[11px] text-slate-400 truncate">
                                                                {article.summary_id || article.summary}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${badge.color}`}>
                                                        {article.tag}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="font-semibold text-slate-700 dark:text-slate-300">
                                                        {article.date}
                                                    </div>
                                                    <div className="text-[11px] text-slate-400">
                                                        {article.author || 'STAS Editorial'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleToggleStatus(article)}
                                                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border cursor-pointer ${
                                                                article.is_active
                                                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200'
                                                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 border-slate-200'
                                                            }`}
                                                        >
                                                            {article.is_active ? 'Aktif' : 'Draft'}
                                                        </button>
                                                        {article.is_featured && (
                                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                                                                ★ Utama
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            onClick={() => openEditModal(article)}
                                                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#107E27] hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border-0"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => confirmDelete(article)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer border-0"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* 5. Create / Edit Article Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 15 }}
                            className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {editingArticle ? 'Edit Artikel Berita Riset' : 'Tambah Artikel Berita & Wawasan Baru'}
                                    </h2>
                                    <p className="text-xs text-slate-400">
                                        Publikasikan terobosan ilmiah, pengumuman hibah, dan laporan strategis CoE STAS-RG
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border-0"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Modal Navigation Tabs */}
                            <div className="px-6 pt-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs font-bold">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('info')}
                                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer border-0 bg-transparent ${
                                        activeTab === 'info'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    1. Informasi Utama
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('media')}
                                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer border-0 bg-transparent ${
                                        activeTab === 'media'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    2. Cover & Visual
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('content')}
                                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer border-0 bg-transparent ${
                                        activeTab === 'content'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    3. Ringkasan & Konten
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('settings')}
                                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer border-0 bg-transparent ${
                                        activeTab === 'settings'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    4. Publikasi
                                </button>
                            </div>

                            {/* Modal Form Body */}
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                                {/* Error Alert Banner */}
                                {Object.keys(form.errors).length > 0 && (
                                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 space-y-1">
                                        <div className="font-bold flex items-center gap-1.5">
                                            <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                            <span>Mohon periksa data input berikut:</span>
                                        </div>
                                        <ul className="list-disc list-inside text-[11px] pl-1 space-y-0.5">
                                            {Object.entries(form.errors).map(([key, err]) => (
                                                <li key={key}>{err}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* TAB 1: INFORMASI UTAMA */}
                                {activeTab === 'info' && (
                                    <div className="space-y-4 animate-in fade-in duration-150">
                                        {/* Bilingual Title Box */}
                                        <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                                            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                                                <div className="flex items-center gap-2">
                                                    <Globe2 className="w-4 h-4 text-[#1AC13B]" />
                                                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                        Judul Artikel (Bilingual)
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
                                                        Indonesia (ID)
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
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                        Judul Artikel (Bahasa Indonesia) <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={form.data.title_id}
                                                        onChange={(e) => form.setData('title_id', e.target.value)}
                                                        placeholder="Contoh: STAS-RG dan PT PINDAD Luncurkan Optimasi Logistik Armada Otonom Cerdas"
                                                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                        Article Title (English) <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={form.data.title}
                                                        onChange={(e) => form.setData('title', e.target.value)}
                                                        placeholder="Example: STAS-RG and PT PINDAD Launch Autonomous Fleet Logistics Optimization"
                                                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Tag/Category & Date Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Kategori / Label Berita <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={form.data.tag}
                                                    onChange={(e) => form.setData('tag', e.target.value)}
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                >
                                                    {TAG_OPTIONS.map((tag) => (
                                                        <option key={tag.value} value={tag.value}>
                                                            {tag.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Tanggal Publikasi (Format Tampilan) <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.date}
                                                    onChange={(e) => form.setData('date', e.target.value)}
                                                    placeholder="Contoh: NOV 24 - 2026 atau 15 OKT 2026"
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                            </div>
                                        </div>

                                        {/* Author & Read Time Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Penulis / Tim Editorial
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.author}
                                                    onChange={(e) => form.setData('author', e.target.value)}
                                                    placeholder="Contoh: Dr. Ir. Hendra S. & Tim Editorial STAS"
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Estimasi Waktu Baca
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.read_time}
                                                    onChange={(e) => form.setData('read_time', e.target.value)}
                                                    placeholder="Contoh: 4 min read atau 5 menit baca"
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 2: COVER & MEDIA */}
                                {activeTab === 'media' && (
                                    <div className="space-y-4 animate-in fade-in duration-150">
                                        {/* Live Preview */}
                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                Preview Cover Artikel
                                            </span>
                                            <div className="h-44 w-full max-w-md rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                                                        <ImageIcon className="w-4 h-4" /> Belum ada cover dipilih
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Selector Type Tabs */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setImageInputType('preset')}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                                    imageInputType === 'preset'
                                                        ? 'bg-[#EDFBF1] text-[#107E27] dark:bg-[#10381C] dark:text-[#3FD27B] border-[#1AC13B]'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                                }`}
                                            >
                                                Pilihan Gambar Preset Riset
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setImageInputType('upload')}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                                    imageInputType === 'upload'
                                                        ? 'bg-[#EDFBF1] text-[#107E27] dark:bg-[#10381C] dark:text-[#3FD27B] border-[#1AC13B]'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                                }`}
                                            >
                                                Upload Gambar Baru
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setImageInputType('url')}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                                    imageInputType === 'url'
                                                        ? 'bg-[#EDFBF1] text-[#107E27] dark:bg-[#10381C] dark:text-[#3FD27B] border-[#1AC13B]'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                                }`}
                                            >
                                                Direct Image URL
                                            </button>
                                        </div>

                                        {imageInputType === 'preset' && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                                                {IMAGE_PRESETS.map((preset) => (
                                                    <button
                                                        key={preset.url}
                                                        type="button"
                                                        onClick={() => {
                                                            form.setData('image_url', preset.url);
                                                            form.setData('image_file', null);
                                                            setImagePreview(preset.url);
                                                        }}
                                                        className={`p-2 rounded-xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer overflow-hidden ${
                                                            form.data.image_url === preset.url
                                                                ? 'border-[#1AC13B] bg-[#EDFBF1]/50 dark:bg-[#10381C]/40 ring-2 ring-[#1AC13B]/30'
                                                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <img
                                                            src={preset.url}
                                                            alt={preset.label}
                                                            className="h-20 w-full object-cover rounded-lg"
                                                        />
                                                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate">
                                                            {preset.label}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {imageInputType === 'upload' && (
                                            <div className="pt-2">
                                                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:border-[#1AC13B] transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/40">
                                                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        Klik untuk upload cover artikel
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 mt-0.5">
                                                        Format PNG, JPG, WEBP, atau SVG (Maks 3MB)
                                                    </span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        )}

                                        {imageInputType === 'url' && (
                                            <div className="pt-2">
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Direct Image URL
                                                </label>
                                                <input
                                                    type="url"
                                                    value={form.data.image_url}
                                                    onChange={(e) => {
                                                        form.setData('image_url', e.target.value);
                                                        setImagePreview(e.target.value);
                                                    }}
                                                    placeholder="https://images.unsplash.com/..."
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* TAB 3: RINGKASAN & KONTEN LENGKAP */}
                                {activeTab === 'content' && (
                                    <div className="space-y-4 animate-in fade-in duration-150">
                                        {/* Bilingual Content Switch */}
                                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                Bahasa Penulisan Konten:
                                            </span>
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
                                            <div className="space-y-3.5">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                        Ringkasan Eksekutif Berita (ID) <span className="text-red-500">*</span>
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        value={form.data.summary_id}
                                                        onChange={(e) => form.setData('summary_id', e.target.value)}
                                                        placeholder="Ringkasan singkat yang ditampilkan di kartu berita beranda (2-3 kalimat)..."
                                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                        Isi Artikel Lengkap (ID)
                                                    </label>
                                                    <textarea
                                                        rows={6}
                                                        value={form.data.content_id}
                                                        onChange={(e) => form.setData('content_id', e.target.value)}
                                                        placeholder="Tuliskan isi berita, rilis pers, atau laporan lengkap dalam Bahasa Indonesia..."
                                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-3.5">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                        Executive Summary (EN) <span className="text-red-500">*</span>
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        value={form.data.summary}
                                                        onChange={(e) => form.setData('summary', e.target.value)}
                                                        placeholder="Brief summary displayed on landing page news card (2-3 sentences)..."
                                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                        Full Article Body (EN)
                                                    </label>
                                                    <textarea
                                                        rows={6}
                                                        value={form.data.content}
                                                        onChange={(e) => form.setData('content', e.target.value)}
                                                        placeholder="Full press release or research report text in English..."
                                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Tautan Dokumen / Eksternal (Opsional)
                                            </label>
                                            <input
                                                type="url"
                                                value={form.data.external_url}
                                                onChange={(e) => form.setData('external_url', e.target.value)}
                                                placeholder="https://example.com/press-release-pdf"
                                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* TAB 4: PUBLIKASI & PENGATURAN */}
                                {activeTab === 'settings' && (
                                    <div className="space-y-4 animate-in fade-in duration-150">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={form.data.is_active}
                                                    onChange={(e) => form.setData('is_active', e.target.checked)}
                                                    className="w-4 h-4 text-[#1AC13B] rounded focus:ring-0 cursor-pointer"
                                                />
                                                <div>
                                                    <div className="text-xs font-bold text-slate-800 dark:text-white">
                                                        Status Publikasi Aktif
                                                    </div>
                                                    <div className="text-[11px] text-slate-400">
                                                        Tampilkan artikel di halaman depan publik
                                                    </div>
                                                </div>
                                            </label>

                                            <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={form.data.is_featured}
                                                    onChange={(e) => form.setData('is_featured', e.target.checked)}
                                                    className="w-4 h-4 text-[#1AC13B] rounded focus:ring-0 cursor-pointer"
                                                />
                                                <div>
                                                    <div className="text-xs font-bold text-slate-800 dark:text-white">
                                                        Jadikan Berita Utama (Featured)
                                                    </div>
                                                    <div className="text-[11px] text-slate-400">
                                                        Beri lencana bintang dan prioritas tampilan
                                                    </div>
                                                </div>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Urutan Tampil (Order Number)
                                            </label>
                                            <input
                                                type="number"
                                                value={form.data.order}
                                                onChange={(e) => form.setData('order', parseInt(e.target.value) || 1)}
                                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Modal Footer */}
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {activeTab !== 'info' && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (activeTab === 'settings') setActiveTab('content');
                                                    else if (activeTab === 'content') setActiveTab('media');
                                                    else if (activeTab === 'media') setActiveTab('info');
                                                }}
                                                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border-0 bg-transparent"
                                            >
                                                Kembali
                                            </button>
                                        )}
                                        {activeTab !== 'settings' && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (activeTab === 'info') setActiveTab('media');
                                                    else if (activeTab === 'media') setActiveTab('content');
                                                    else if (activeTab === 'content') setActiveTab('settings');
                                                }}
                                                className="px-3 py-2 rounded-xl text-xs font-bold text-[#107E27] dark:text-[#3FD27B] hover:bg-[#EDFBF1] dark:hover:bg-[#10381C] cursor-pointer border-0 bg-transparent"
                                            >
                                                Lanjut
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer border-0 bg-transparent"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={form.processing}
                                            className="px-5 py-2 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer border-0 shadow-xs"
                                        >
                                            {form.processing
                                                ? 'Menyimpan...'
                                                : editingArticle
                                                ? 'Simpan Perubahan'
                                                : 'Tambah Artikel'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 6. Delete Confirmation AlertModal */}
            <AlertModal
                isOpen={deleteModalOpen}
                type="danger"
                title="Hapus Artikel Berita"
                message={`Apakah Anda yakin ingin menghapus artikel "${articleToDelete?.title_id || articleToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Hapus Artikel"
                cancelText="Batal"
                onConfirm={handleDelete}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setArticleToDelete(null);
                }}
            />
        </AdminLayout>
    );
}
