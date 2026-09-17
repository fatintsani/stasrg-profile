import React, { useState, useEffect } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { ResearchMetric } from '../../../types';
import { IconHelper } from '../../../Components/Common/IconHelper';
import { Language } from '../../../utils/translations';
import { AlertModal } from '../../../Components/Common/AlertModal';
import {
    TrendingUp,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    AlertCircle,
    X,
    Filter,
    Check,
    ArrowUpDown,
    Eye,
    EyeOff,
    Sparkles,
    Briefcase,
    Building2,
    Users,
    BookOpen,
    FlaskConical,
    Layers,
    Newspaper,
    Calendar,
    RefreshCw,
    Sliders,
    Zap,
    Cpu,
    Award,
    Globe2,
    Activity,
    BarChart3,
    Table as TableIcon,
    LayoutGrid,
    MoveUp,
    MoveDown,
    ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MetricsIndexProps {
    metrics: ResearchMetric[];
    stats: {
        total_metrics: number;
        active_metrics: number;
        inactive_metrics: number;
        dynamic_metrics: number;
        connected_records: number;
    };
    liveCounts: {
        projects: number;
        services: number;
        partners: number;
        researchers: number;
        publications: number;
        domains: number;
        articles: number;
        events: number;
    };
    filters: {
        search: string;
        status: string;
    };
    siteConfig?: {
        center_name?: string;
        institution?: string;
    };
    status?: string;
}

const AVAILABLE_ICONS = [
    { name: 'TrendingUp', label: 'Trending / Growth' },
    { name: 'Briefcase', label: 'Research Projects' },
    { name: 'Cpu', label: 'Technology & Smart Applications' },
    { name: 'Building2', label: 'Partners & Industry' },
    { name: 'Users', label: 'Researchers & Team' },
    { name: 'BookOpen', label: 'Publications & Papers' },
    { name: 'FlaskConical', label: 'Lab & Consulting Services' },
    { name: 'Layers', label: 'Research Domains' },
    { name: 'Award', label: 'Awards & Honors' },
    { name: 'Globe2', label: 'Global Collaboration' },
    { name: 'Zap', label: 'Energy & Innovation' },
    { name: 'Activity', label: 'Clinical / Active Projects' },
    { name: 'BarChart3', label: 'Analytics & Insights' },
];

const SOURCE_OPTIONS = [
    { value: 'manual', labelEn: 'Manual Custom Value', labelId: 'Manual (Nilai Kustom Tetap)', descId: 'Nilai diinput manual oleh admin' },
    { value: 'auto_projects', labelEn: 'Auto: Research Projects Count', labelId: 'Otomatis: Jumlah Proyek Riset', descId: 'Tersinkron otomatis dari data Proyek Riset aktif' },
    { value: 'auto_services', labelEn: 'Auto: Industrial Services Count', labelId: 'Otomatis: Jumlah Layanan Industri', descId: 'Tersinkron otomatis dari data Layanan & Konsultasi' },
    { value: 'auto_partners', labelEn: 'Auto: Strategic Partners Count', labelId: 'Otomatis: Jumlah Mitra Kerjasama', descId: 'Tersinkron otomatis dari data Mitra Industri' },
    { value: 'auto_researchers', labelEn: 'Auto: Principal Researchers Count', labelId: 'Otomatis: Jumlah Peneliti', descId: 'Tersinkron otomatis dari data Peneliti & Pengguna' },
    { value: 'auto_publications', labelEn: 'Auto: Publications Count', labelId: 'Otomatis: Jumlah Publikasi Ilmiah', descId: 'Tersinkron otomatis dari data Publikasi Akademik' },
    { value: 'auto_domains', labelEn: 'Auto: Research Areas Count', labelId: 'Otomatis: Jumlah Bidang Riset', descId: 'Tersinkron otomatis dari data Bidang Riset' },
];

export default function MetricsIndex({
    metrics = [],
    stats,
    liveCounts,
    filters,
    siteConfig,
    status,
}: MetricsIndexProps) {
    const [language, setLanguage] = useState<Language>('ID');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [isReordering, setIsReordering] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMetric, setEditingMetric] = useState<ResearchMetric | null>(null);
    const [metricToDelete, setMetricToDelete] = useState<ResearchMetric | null>(null);
    const [activeLangTab, setActiveLangTab] = useState<'ID' | 'EN'>('ID');

    useEffect(() => {
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }
    }, []);

    const isEn = language === 'EN';

    // Inertia Form for Create/Update
    const form = useForm({
        value: '50+',
        label: '',
        label_id: '',
        description: '',
        description_id: '',
        icon: 'TrendingUp',
        source_type: 'manual',
        order: (metrics.length || 0) + 1,
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingMetric(null);
        form.reset();
        form.clearErrors();
        form.setData({
            value: '50+',
            label: '',
            label_id: '',
            description: '',
            description_id: '',
            icon: 'TrendingUp',
            source_type: 'manual',
            order: (metrics.length || 0) + 1,
            is_active: true,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const openEditModal = (metric: ResearchMetric) => {
        setEditingMetric(metric);
        form.clearErrors();
        form.setData({
            value: metric.value || '',
            label: metric.label || '',
            label_id: metric.label_id || metric.label || '',
            description: metric.description || '',
            description_id: metric.description_id || metric.description || '',
            icon: metric.icon || 'TrendingUp',
            source_type: metric.source_type || 'manual',
            order: metric.order ?? 1,
            is_active: metric.is_active ?? true,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const handleSourceTypeChange = (source: string) => {
        form.setData((prev) => {
            let autoVal = prev.value;
            let autoLabel = prev.label;
            let autoLabelId = prev.label_id;
            let autoDesc = prev.description;
            let autoDescId = prev.description_id;
            let autoIcon = prev.icon;

            if (source === 'auto_projects') {
                const count = liveCounts.projects || 0;
                autoVal = count >= 5 ? `${count}+` : `${count}`;
                autoLabel = 'Research Projects';
                autoLabelId = 'Proyek Riset';
                autoDesc = 'Completed & Active Industrial Tracks';
                autoDescId = 'Jalur Riset Industri Aktif & Selesai';
                autoIcon = 'Briefcase';
            } else if (source === 'auto_services') {
                const count = liveCounts.services || 0;
                autoVal = count >= 5 ? `${count}+` : `${count}`;
                autoLabel = 'Industrial Applications';
                autoLabelId = 'Aplikasi Industri';
                autoDesc = 'Tested in Real-World Environments';
                autoDescId = 'Telah Diuji di Lingkungan Nyata';
                autoIcon = 'Cpu';
            } else if (source === 'auto_partners') {
                const count = liveCounts.partners || 0;
                autoVal = count >= 5 ? `${count}+` : `${count}`;
                autoLabel = 'Strategic Partners';
                autoLabelId = 'Mitra Strategis';
                autoDesc = 'Global & National Collaborators';
                autoDescId = 'Kolaborator Nasional & Global';
                autoIcon = 'Building2';
            } else if (source === 'auto_researchers') {
                const count = liveCounts.researchers || 0;
                autoVal = count >= 5 ? `${count}+` : `${count}`;
                autoLabel = 'Principal Researchers';
                autoLabelId = 'Peneliti Utama';
                autoDesc = 'And Interdisciplinary Fellows';
                autoDescId = 'Dan Anggota Peneliti Multidisiplin';
                autoIcon = 'Users';
            } else if (source === 'auto_publications') {
                const count = liveCounts.publications || 0;
                autoVal = count >= 5 ? `${count}+` : `${count}`;
                autoLabel = 'Academic Publications';
                autoLabelId = 'Publikasi Ilmiah';
                autoDesc = 'Indexed Scopus Q1/Q2 Journals';
                autoDescId = 'Jurnal Terindeks Scopus Q1/Q2';
                autoIcon = 'BookOpen';
            } else if (source === 'auto_domains') {
                const count = liveCounts.domains || 0;
                autoVal = count >= 5 ? `${count}+` : `${count}`;
                autoLabel = 'Research Focus Areas';
                autoLabelId = 'Bidang Riset';
                autoDesc = 'Multidisciplinary Pillars';
                autoDescId = 'Pilar Riset Multidisiplin';
                autoIcon = 'Layers';
            }

            return {
                ...prev,
                source_type: source,
                value: autoVal,
                label: autoLabel,
                label_id: autoLabelId,
                description: autoDesc,
                description_id: autoDescId,
                icon: autoIcon,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingMetric) {
            form.put(`/admin/metrics/${editingMetric.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        } else {
            form.post('/admin/metrics', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        }
    };

    const handleDelete = () => {
        if (!metricToDelete) return;
        router.delete(`/admin/metrics/${metricToDelete.id}`, {
            onSuccess: () => setMetricToDelete(null),
        });
    };

    const handleToggleStatus = (metric: ResearchMetric) => {
        router.post(`/admin/metrics/${metric.id}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleSyncLive = () => {
        setIsSyncing(true);
        router.post('/admin/metrics/sync-live', {}, {
            preserveScroll: true,
            onFinish: () => setIsSyncing(false),
        });
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= metrics.length) return;

        const newMetrics = [...metrics];
        const [movedItem] = newMetrics.splice(index, 1);
        newMetrics.splice(targetIndex, 0, movedItem);

        const orders = newMetrics.map((item, idx) => ({
            id: item.id,
            order: idx + 1,
        }));

        router.post('/admin/metrics/reorder', { orders }, { preserveScroll: true });
    };

    // Filtered Metrics
    const filteredMetrics = metrics.filter((metric) => {
        const matchesSearch =
            !searchQuery ||
            metric.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (metric.label_id && metric.label_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
            metric.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
            metric.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (metric.description_id && metric.description_id.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus =
            !statusFilter ||
            (statusFilter === 'active' && metric.is_active) ||
            (statusFilter === 'inactive' && !metric.is_active) ||
            (statusFilter === 'auto' && metric.source_type && metric.source_type !== 'manual') ||
            (statusFilter === 'manual' && (!metric.source_type || metric.source_type === 'manual'));

        return matchesSearch && matchesStatus;
    });

    const getSourceBadge = (source?: string) => {
        switch (source) {
            case 'auto_projects':
                return { text: isEn ? 'Auto: Projects' : 'Auto: Proyek Riset', bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' };
            case 'auto_services':
                return { text: isEn ? 'Auto: Services' : 'Auto: Layanan', bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800' };
            case 'auto_partners':
                return { text: isEn ? 'Auto: Partners' : 'Auto: Mitra', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800' };
            case 'auto_researchers':
                return { text: isEn ? 'Auto: Researchers' : 'Auto: Peneliti', bg: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' };
            case 'auto_publications':
                return { text: isEn ? 'Auto: Publications' : 'Auto: Publikasi', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800' };
            case 'auto_domains':
                return { text: isEn ? 'Auto: Domains' : 'Auto: Bidang Riset', bg: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800' };
            default:
                return { text: isEn ? 'Manual' : 'Manual Kustom', bg: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' };
        }
    };

    return (
        <AdminLayout
            title={isEn ? 'Research Metrics & Key Stats' : 'Kelola Statistik Riset'}
            siteConfig={siteConfig}
        >
            <Head title={isEn ? 'Research Metrics - Admin STAS' : 'Statistik Riset - Admin STAS'} />

            <div className="space-y-6">
                {/* 1. Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold border border-[#B2EFC3] dark:border-[#1A5C2F]">
                            <TrendingUp className="w-3.5 h-3.5 text-[#1AC13B]" />
                            <span>Statistik & Indikator Riset</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Indikator & Statistik Riset
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            Kelola angka capaian utama, statistik dampak riset, dan sinkronisasi data langsung dengan database CoE STAS-RG.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 flex-wrap">
                        <button
                            onClick={handleSyncLive}
                            disabled={isSyncing}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors shadow-xs cursor-pointer"
                        >
                            <RefreshCw className={`w-4 h-4 text-[#1AC13B] ${isSyncing ? 'animate-spin' : ''}`} />
                            <span>Sinkron Database</span>
                        </button>
                        <Link
                            href="/#metrics"
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
                            <span>Tambah Indikator Baru</span>
                        </button>
                    </div>
                </div>

                {/* 2. KPI Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TOTAL INDIKATOR</span>
                            <TrendingUp className="w-4 h-4 text-[#1AC13B]" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.total_metrics}
                        </div>
                        <div className="text-[11px] text-slate-400">Statistik Utama Riset</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">INDIKATOR AKTIF</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.active_metrics}
                        </div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Tampil di Beranda Utama
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">OTOMATIS (SINKRON)</span>
                            <Sparkles className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.dynamic_metrics}
                        </div>
                        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                            Data Database Langsung
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">DATA TERKAIT</span>
                            <Award className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.connected_records}
                        </div>
                        <div className="text-[11px] text-slate-400">Total Entri Terhubung</div>
                    </div>
                </div>

                {/* 3. Filters & Search Toolbar */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari label indikator, nilai, atau deskripsi..."
                            className="w-full pl-9 pr-9 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B]"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Filters & View Toggle */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        {/* Status Dropdown */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">STATUS:</span>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#1AC13B]"
                            >
                                <option value="">Semua Status</option>
                                <option value="active">Aktif (Tampil di Beranda)</option>
                                <option value="inactive">Nonaktif (Disembunyikan)</option>
                                <option value="auto">Otomatis (Database)</option>
                                <option value="manual">Manual (Kustom)</option>
                            </select>
                        </div>

                        {/* Reorder Button */}
                        <button
                            onClick={() => setIsReordering(!isReordering)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border cursor-pointer flex items-center gap-1.5 ${
                                isReordering
                                    ? 'bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] border-[#1AC13B]'
                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                            }`}
                            title="Atur urutan tampilan"
                        >
                            <ArrowUpDown className="w-3.5 h-3.5" />
                            <span>{isReordering ? 'Selesai' : 'Urutkan'}</span>
                        </button>

                        {/* View Switcher */}
                        <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                    viewMode === 'grid'
                                        ? 'bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B]'
                                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                                title="Tampilan Grid"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                    viewMode === 'table'
                                        ? 'bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B]'
                                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                }`}
                                title="Tampilan Tabel"
                            >
                                <TableIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. Content List (Grid or Table) */}
                {filteredMetrics.length === 0 ? (
                    <div className="p-12 sm:p-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-center space-y-4">
                        <img
                            src="/assets/icon/errors/notfound.png"
                            alt="Tidak ada data"
                            className="w-28 sm:w-36 h-auto object-contain mx-auto select-none pointer-events-none drop-shadow-xs"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/icon/errors/notfound.png';
                            }}
                        />
                        <div className="space-y-1">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                Tidak ada indikator riset ditemukan
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                                Coba ubah kata kunci pencarian atau filter status, atau tambahkan indikator statistik riset baru.
                            </p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold transition-all shadow-sm cursor-pointer border-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Indikator Baru</span>
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredMetrics.map((metric, index) => {
                            const badge = getSourceBadge(metric.source_type);
                            return (
                                <motion.div
                                    key={metric.id}
                                    layout
                                    className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between relative group ${
                                        metric.is_active
                                            ? 'border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/50 hover:shadow-sm'
                                            : 'border-slate-200/60 dark:border-slate-800/60 opacity-60 bg-slate-50/50 dark:bg-slate-900/50'
                                    }`}
                                >
                                    {/* Top badges & actions */}
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 rounded-xl bg-[#1AC13B]/10 flex items-center justify-center text-[#1AC13B]">
                                                    <IconHelper name={metric.icon || 'TrendingUp'} className="w-5 h-5" />
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                                                    {badge.text}
                                                </span>
                                            </div>

                                            {/* Reorder controls if active */}
                                            {isReordering && (
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => handleMove(index, 'up')}
                                                        disabled={index === 0}
                                                        className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                                                        title="Geser ke Atas"
                                                    >
                                                        <MoveUp className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleMove(index, 'down')}
                                                        disabled={index === filteredMetrics.length - 1}
                                                        className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                                                        title="Geser ke Bawah"
                                                    >
                                                        <MoveDown className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Value & Labels */}
                                        <div className="text-3xl sm:text-4xl font-extrabold text-[#1AC13B] tracking-tight mb-1">
                                            {metric.value}
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                                            {isEn ? metric.label : (metric.label_id || metric.label)}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                            {isEn ? metric.description : (metric.description_id || metric.description)}
                                        </p>
                                    </div>

                                    {/* Bottom action buttons */}
                                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                        <button
                                            onClick={() => handleToggleStatus(metric)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                                                metric.is_active
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 hover:bg-emerald-100'
                                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
                                            }`}
                                        >
                                            {metric.is_active ? (
                                                <>
                                                    <Eye className="w-3 h-3" />
                                                    {isEn ? 'Active' : 'Aktif'}
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff className="w-3 h-3" />
                                                    {isEn ? 'Hidden' : 'Disembunyikan'}
                                                </>
                                            )}
                                        </button>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => openEditModal(metric)}
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                                title={isEn ? 'Edit metric' : 'Edit indikator'}
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => setMetricToDelete(metric)}
                                                className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                                title={isEn ? 'Delete metric' : 'Hapus indikator'}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    /* Table View */
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        <th className="py-3.5 px-4">{isEn ? 'Order' : 'Urutan'}</th>
                                        <th className="py-3.5 px-4">{isEn ? 'Value' : 'Nilai Capaian'}</th>
                                        <th className="py-3.5 px-4">{isEn ? 'Label' : 'Nama Indikator'}</th>
                                        <th className="py-3.5 px-4">{isEn ? 'Description' : 'Deskripsi'}</th>
                                        <th className="py-3.5 px-4">{isEn ? 'Source Type' : 'Sumber Data'}</th>
                                        <th className="py-3.5 px-4">{isEn ? 'Status' : 'Status'}</th>
                                        <th className="py-3.5 px-4 text-right">{isEn ? 'Actions' : 'Aksi'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                                    {filteredMetrics.map((metric, index) => {
                                        const badge = getSourceBadge(metric.source_type);
                                        return (
                                            <tr
                                                key={metric.id}
                                                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                                            >
                                                <td className="py-3.5 px-4 font-mono text-slate-400">
                                                    #{metric.order ?? index + 1}
                                                </td>
                                                <td className="py-3.5 px-4 font-extrabold text-[#1AC13B] text-base">
                                                    {metric.value}
                                                </td>
                                                <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-lg bg-[#1AC13B]/10 flex items-center justify-center text-[#1AC13B] shrink-0">
                                                            <IconHelper name={metric.icon || 'TrendingUp'} className="w-3.5 h-3.5" />
                                                        </div>
                                                        <div>
                                                            <div>{metric.label_id || metric.label}</div>
                                                            {metric.label_id && (
                                                                <div className="text-[10px] text-slate-400">{metric.label}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                                                    {metric.description_id || metric.description}
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                                                        {badge.text}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    <button
                                                        onClick={() => handleToggleStatus(metric)}
                                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold cursor-pointer ${
                                                            metric.is_active
                                                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                                        }`}
                                                    >
                                                        {metric.is_active ? (isEn ? 'Active' : 'Aktif') : (isEn ? 'Hidden' : 'Nonaktif')}
                                                    </button>
                                                </td>
                                                <td className="py-3.5 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            onClick={() => openEditModal(metric)}
                                                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => setMetricToDelete(metric)}
                                                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
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

            {/* 5. Create / Edit Metric Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#1AC13B]/10 flex items-center justify-center text-[#1AC13B]">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                            {editingMetric
                                                ? isEn
                                                    ? 'Edit Research Metric'
                                                    : 'Edit Indikator Riset'
                                                : isEn
                                                ? 'Add Research Metric'
                                                : 'Tambah Indikator Riset'}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {isEn
                                                ? 'Configure headline numbers & impact descriptions'
                                                : 'Atur angka capaian dan deskripsi indikator'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Modal Form Body */}
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                                {/* Source Type Selection */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {isEn ? 'Metric Source & Mode' : 'Sumber Data & Mode Penghitungan'}
                                    </label>
                                    <select
                                        value={form.data.source_type}
                                        onChange={(e) => handleSourceTypeChange(e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1AC13B]/20 focus:border-[#1AC13B]"
                                    >
                                        {SOURCE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {isEn ? opt.labelEn : opt.labelId}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                                        {SOURCE_OPTIONS.find((s) => s.value === form.data.source_type)?.descId}
                                    </p>
                                </div>

                                {/* Value Input with Quick Helpers */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {isEn ? 'Display Value (Number)' : 'Nilai Capaian / Angka Indikator'}
                                        <span className="text-rose-500 ml-1">*</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={form.data.value}
                                            onChange={(e) => form.setData('value', e.target.value)}
                                            placeholder={isEn ? 'Enter metric numeric value...' : 'Masukkan nilai numerik indikator...'}
                                            className="flex-1 px-3.5 py-2.5 text-base font-extrabold text-[#1AC13B] rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1AC13B]/20 focus:border-[#1AC13B]"
                                            required
                                        />
                                        <div className="flex items-center gap-1">
                                            {['+', '%', 'k+', 'x'].map((suf) => (
                                                <button
                                                    key={suf}
                                                    type="button"
                                                    onClick={() => {
                                                        if (!form.data.value.endsWith(suf)) {
                                                            form.setData('value', `${form.data.value.replace(/[^0-9]/g, '')}${suf}`);
                                                        }
                                                    }}
                                                    className="px-2.5 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                                                >
                                                    {suf}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {form.errors.value && (
                                        <p className="text-xs text-rose-500 mt-1">{form.errors.value}</p>
                                    )}
                                </div>

                                {/* Language Tabs for Labels & Descriptions */}
                                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            {isEn ? 'Bilingual Texts' : 'Teks Dua Bahasa'}
                                        </span>
                                        <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg">
                                            <button
                                                type="button"
                                                onClick={() => setActiveLangTab('ID')}
                                                className={`px-3 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                                                    activeLangTab === 'ID'
                                                        ? 'bg-white dark:bg-slate-900 text-[#1AC13B] shadow-xs'
                                                        : 'text-slate-600 dark:text-slate-400'
                                                }`}
                                            >
                                                🇮🇩 Bahasa Indonesia
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setActiveLangTab('EN')}
                                                className={`px-3 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                                                    activeLangTab === 'EN'
                                                        ? 'bg-white dark:bg-slate-900 text-[#1AC13B] shadow-xs'
                                                        : 'text-slate-600 dark:text-slate-400'
                                                }`}
                                            >
                                                🇬🇧 English
                                            </button>
                                        </div>
                                    </div>

                                    {activeLangTab === 'ID' ? (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Nama Indikator (Bahasa Indonesia)
                                                    <span className="text-rose-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.label_id}
                                                    onChange={(e) => form.setData('label_id', e.target.value)}
                                                    placeholder="Masukkan nama indikator metrik..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1AC13B]/20 focus:border-[#1AC13B]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Deskripsi Singkat (Bahasa Indonesia)
                                                    <span className="text-rose-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.description_id}
                                                    onChange={(e) => form.setData('description_id', e.target.value)}
                                                    placeholder="Masukkan deskripsi singkat metrik..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1AC13B]/20 focus:border-[#1AC13B]"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Metric Label (English)
                                                    <span className="text-rose-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.label}
                                                    onChange={(e) => form.setData('label', e.target.value)}
                                                    placeholder="Enter metric label in English..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1AC13B]/20 focus:border-[#1AC13B]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Short Description (English)
                                                    <span className="text-rose-500 ml-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.description}
                                                    onChange={(e) => form.setData('description', e.target.value)}
                                                    placeholder="Enter short description in English..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Icon Selector */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {isEn ? 'Select Icon' : 'Pilih Ikon Indikator'}
                                    </label>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                        {AVAILABLE_ICONS.map((ico) => {
                                            const isSelected = form.data.icon === ico.name;
                                            return (
                                                <button
                                                    key={ico.name}
                                                    type="button"
                                                    onClick={() => form.setData('icon', ico.name)}
                                                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                                                        isSelected
                                                            ? 'border-[#1AC13B] bg-[#1AC13B]/10 text-[#1AC13B] ring-2 ring-[#1AC13B]/20'
                                                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-600 dark:text-slate-300'
                                                    }`}
                                                    title={ico.label}
                                                >
                                                    <IconHelper name={ico.name} className="w-5 h-5" />
                                                    <span className="text-[9px] truncate max-w-full font-medium">
                                                        {ico.name}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Live Preview Card */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {isEn ? 'Landing Page Live Preview' : 'Pratinjau Tampilan di Halaman Utama'}
                                    </label>
                                    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-[#F9FDFB] dark:bg-slate-800/60 flex flex-col justify-center">
                                        <div className="text-3xl font-extrabold text-[#1AC13B] tracking-tight">
                                            {form.data.value || '0+'}
                                        </div>
                                        <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                                            {form.data.label_id || form.data.label || 'Nama Indikator'}
                                        </div>
                                        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                            {form.data.description_id || form.data.description || 'Deskripsi singkat indikator'}
                                        </div>
                                    </div>
                                </div>

                                {/* Order & Active Toggle */}
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            {isEn ? 'Display Order' : 'Nomor Urutan'}
                                        </label>
                                        <input
                                            type="number"
                                            value={form.data.order}
                                            onChange={(e) => form.setData('order', parseInt(e.target.value) || 1)}
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            min={1}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            {isEn ? 'Active Status' : 'Status Tampil'}
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => form.setData('is_active', !form.data.is_active)}
                                            className={`w-full px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border ${
                                                form.data.is_active
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                                                    : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                            }`}
                                        >
                                            {form.data.is_active ? (
                                                <>
                                                    <Check className="w-3.5 h-3.5" />
                                                    {isEn ? 'Active (Visible)' : 'Aktif (Ditampilkan)'}
                                                </>
                                            ) : (
                                                <>
                                                    <X className="w-3.5 h-3.5" />
                                                    {isEn ? 'Hidden (Inactive)' : 'Disembunyikan (Nonaktif)'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Actions */}
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                                    >
                                        {isEn ? 'Cancel' : 'Batal'}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={form.processing}
                                        className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1AC13B] text-white hover:bg-[#107E27] transition shadow-xs disabled:opacity-50 cursor-pointer flex items-center gap-2"
                                    >
                                        {form.processing && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                                        {editingMetric
                                            ? isEn
                                                ? 'Save Changes'
                                                : 'Simpan Perubahan'
                                            : isEn
                                            ? 'Create Metric'
                                            : 'Tambah Indikator'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 6. Delete Confirmation Modal */}
            <AlertModal
                isOpen={!!metricToDelete}
                onClose={() => setMetricToDelete(null)}
                onConfirm={handleDelete}
                title={isEn ? 'Delete Research Metric?' : 'Hapus Indikator Riset?'}
                message={
                    isEn
                        ? `Are you sure you want to delete "${metricToDelete?.label}"? This will remove it from the home page metrics bar.`
                        : `Apakah Anda yakin ingin menghapus indikator "${metricToDelete?.label_id || metricToDelete?.label}"? Indikator ini tidak akan muncul lagi di halaman utama.`
                }
                confirmText={isEn ? 'Delete Metric' : 'Ya, Hapus'}
                cancelText={isEn ? 'Cancel' : 'Batal'}
                type="danger"
            />
        </AdminLayout>
    );
}
