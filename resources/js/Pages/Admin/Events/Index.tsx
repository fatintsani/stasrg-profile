import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { UpcomingEvent, SiteConfig } from '../../../types';
import { useForm, router, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    Star,
    ExternalLink,
    Clock,
    MapPin,
    Users,
    Sparkles,
    FileText,
    LayoutGrid,
    Table as TableIcon,
    X,
    Upload,
    ImageIcon,
    UserCheck,
    GraduationCap,
    Presentation,
    Flame,
    Ticket,
    SlidersHorizontal,
    Globe2,
    Layers,
} from 'lucide-react';
import { AlertModal } from '../../../Components/Common/AlertModal';

interface Stats {
    total: number;
    active: number;
    featured: number;
    symposia_masterclass: number;
    workshops_webinars: number;
}

interface EventsIndexProps {
    events: UpcomingEvent[];
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
    { value: 'UPCOMING SYMPOSIUM', label: 'Simposium Akademik & Riset (Symposium)', icon: Presentation, color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800' },
    { value: 'EXECUTIVE MASTERCLASS', label: 'Masterclass Eksekutif & Industri', icon: GraduationCap, color: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800' },
    { value: 'HANDS-ON WORKSHOP', label: 'Workshop Teknis & Praktik Lab', icon: Flame, color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800' },
    { value: 'INDUSTRY ROUNDTABLE', label: 'Roundtable Kemitraan Strategis', icon: Users, color: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800' },
    { value: 'PUBLIC WEBINAR', label: 'Webinar Publik & Diseminasi', icon: Globe2, color: 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border-teal-300 dark:border-teal-800' },
    { value: 'TECHNICAL BOOTCAMP', label: 'Bootcamp Rekayasa & AI', icon: Sparkles, color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800' },
];

const POSTER_PRESETS = [
    { label: 'Autonomous Fleet & Robotics', url: '/assets/images/research/autonomous_fleet.png' },
    { label: 'Smart Microgrid Energy', url: '/assets/images/research/smart_microgrid.png' },
    { label: 'Digital Twin Manufacturing', url: '/assets/images/research/digital_twin.png' },
    { label: 'Sustainable Energy Systems', url: '/assets/images/publications/sustainable_energy.png' },
    { label: 'Edge AI Defect Detection', url: '/assets/images/publications/edge_ai_defect.png' },
    { label: 'Bioreactor & Process Automation', url: '/assets/images/publications/bioreactor_system.png' },
];

export default function EventsIndex({
    events,
    stats,
    filters,
    siteConfig,
}: EventsIndexProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedTag, setSelectedTag] = useState(filters.tag || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<UpcomingEvent | null>(null);
    const [activeTab, setActiveTab] = useState<'info' | 'media' | 'content' | 'settings'>('info');
    const [activeLangTab, setActiveLangTab] = useState<Language>('ID');
    const [imageInputType, setImageInputType] = useState<'preset' | 'upload' | 'url'>('preset');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

    // Delete confirmation modal state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<UpcomingEvent | null>(null);

    // Form setup with Inertia useForm
    const form = useForm({
        tag: 'UPCOMING SYMPOSIUM',
        title: '',
        title_id: '',
        description: '',
        description_id: '',
        date_display: '',
        time_display: '09:00 - 16:00 WIB',
        location: 'Auditorium Damar, Gd. Pelatihan Telkom University / Hybrid Zoom',
        speaker_name: '',
        speaker_title: '',
        registration_link: '#contact',
        brochure_url: '',
        image_url: '/assets/images/research/digital_twin.png',
        image_file: null as File | null,
        quota_text: 'Terbuka untuk 100 Peserta',
        primary_action_text: 'Daftar Sekarang',
        secondary_action_text: 'Unduh Brosur',
        is_featured: true,
        is_active: true,
        order: 1,
        event_date: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/events',
            {
                search: searchQuery || undefined,
                tag: selectedTag !== 'all' ? selectedTag : undefined,
                status: selectedStatus !== 'all' ? selectedStatus : undefined,
            },
            { preserveState: true }
        );
    };

    const handleTagChange = (tag: string) => {
        setSelectedTag(tag);
        router.get(
            '/admin/events',
            {
                search: searchQuery || undefined,
                tag: tag !== 'all' ? tag : undefined,
                status: selectedStatus !== 'all' ? selectedStatus : undefined,
            },
            { preserveState: true }
        );
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        router.get(
            '/admin/events',
            {
                search: searchQuery || undefined,
                tag: selectedTag !== 'all' ? selectedTag : undefined,
                status: status !== 'all' ? status : undefined,
            },
            { preserveState: true }
        );
    };

    const openCreateModal = () => {
        setEditingEvent(null);
        form.reset();
        form.clearErrors();
        form.setData({
            tag: 'UPCOMING SYMPOSIUM',
            title: '',
            title_id: '',
            description: '',
            description_id: '',
            date_display: '24-25 OKTOBER 2026',
            time_display: '09:00 - 16:30 WIB',
            location: 'Auditorium Damar, Gd. Pelatihan Telkom University / Hybrid Zoom',
            speaker_name: 'Prof. Dr. Ir. H. Ahmad Dahlan, M.Eng., IPU',
            speaker_title: 'Senior Principal Researcher, Automation & Robotics Lab',
            registration_link: '#contact',
            brochure_url: '',
            image_url: '/assets/images/research/digital_twin.png',
            image_file: null,
            quota_text: 'Terbuka untuk 120 Peserta',
            primary_action_text: 'Daftar Sekarang',
            secondary_action_text: 'Unduh Brosur',
            is_featured: true,
            is_active: true,
            order: (events.length || 0) + 1,
            event_date: new Date().toISOString().split('T')[0],
        });
        setImagePreview('/assets/images/research/digital_twin.png');
        setImageInputType('preset');
        setActiveTab('info');
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const openEditModal = (event: UpcomingEvent) => {
        setEditingEvent(event);
        form.clearErrors();
        form.setData({
            tag: event.tag || 'UPCOMING SYMPOSIUM',
            title: event.title || '',
            title_id: event.title_id || event.title || '',
            description: event.description || '',
            description_id: event.description_id || event.description || '',
            date_display: event.date_display || '',
            time_display: event.time_display || '09:00 - 16:00 WIB',
            location: event.location || '',
            speaker_name: event.speaker_name || '',
            speaker_title: event.speaker_title || '',
            registration_link: event.registration_link || '#contact',
            brochure_url: event.brochure_url || '',
            image_url: event.image_url || '/assets/images/research/digital_twin.png',
            image_file: null,
            quota_text: event.quota_text || 'Terbuka untuk 100 Peserta',
            primary_action_text: event.primary_action_text || 'Daftar Sekarang',
            secondary_action_text: event.secondary_action_text || 'Unduh Brosur',
            is_featured: event.is_featured ?? true,
            is_active: event.is_active ?? true,
            order: event.order || 1,
            event_date: event.event_date ? event.event_date.split('T')[0] : '',
        });
        setImagePreview(event.image_url || '/assets/images/research/digital_twin.png');
        setImageInputType(event.image_url?.startsWith('/storage/') ? 'upload' : 'preset');
        setActiveTab('info');
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            form.setData('image_file', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure title and description fallbacks
        form.transform((data) => ({
            ...data,
            title: data.title || data.title_id || 'Symposium Event',
            title_id: data.title_id || data.title || 'Agenda Simposium',
            description: data.description || data.description_id || 'Event summary details',
            description_id: data.description_id || data.description || 'Ringkasan agenda kegiatan ilmiah',
        }));

        if (editingEvent) {
            form.post(`/admin/events/${editingEvent.id}`, {
                headers: { 'X-HTTP-Method-Override': 'PUT' },
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        } else {
            form.post('/admin/events', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        }
    };

    const handleToggleStatus = (id: number) => {
        router.post(`/admin/events/${id}/toggle`, {}, { preserveScroll: true });
    };

    const handleToggleFeatured = (id: number) => {
        router.post(`/admin/events/${id}/toggle-featured`, {}, { preserveScroll: true });
    };

    const confirmDelete = (event: UpcomingEvent) => {
        setEventToDelete(event);
        setDeleteModalOpen(true);
    };

    const executeDelete = () => {
        if (eventToDelete) {
            router.delete(`/admin/events/${eventToDelete.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    setEventToDelete(null);
                },
            });
        }
    };

    const getTagStyle = (tagValue: string) => {
        const found = TAG_OPTIONS.find((t) => t.value === tagValue);
        return found ? found.color : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700';
    };

    return (
        <AdminLayout
            title="Kelola Agenda & Acara"
            siteConfig={siteConfig}
        >
            <div className="space-y-6">
                {/* 1. Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold border border-[#B2EFC3] dark:border-[#1A5C2F]">
                            <Calendar className="w-3.5 h-3.5 text-[#1AC13B]" />
                            <span>Agenda & Acara Riset</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Agenda Simposium, Workshop & Pelatihan
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            Kelola jadwal simposium ilmiah, workshop laboratorium, webinar publik, dan pelatihan riset CoE STAS-RG.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/#events"
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
                            <span>Tambah Agenda Baru</span>
                        </button>
                    </div>
                </div>

                {/* 2. KPI Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Agenda</span>
                            <Calendar className="w-4 h-4 text-[#1AC13B]" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.total}
                        </div>
                        <div className="text-[11px] text-slate-400">Seluruh Agenda Kegiatan</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Agenda Aktif</span>
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
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Agenda Utama</span>
                            <Sparkles className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.featured}
                        </div>
                        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                            Sorotan Acara Unggulan
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Simposium / Master</span>
                            <Presentation className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.symposia_masterclass}
                        </div>
                        <div className="text-[11px] text-slate-400">Simposium & Masterclass</div>
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
                            placeholder="Cari judul agenda, pembicara, lokasi, atau tag..."
                            className="w-full pl-9 pr-9 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B]"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    router.get(
                                        '/admin/events',
                                        { tag: selectedTag !== 'all' ? selectedTag : undefined, status: selectedStatus !== 'all' ? selectedStatus : undefined },
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
                        {/* Status Dropdown */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status:</span>
                            <select
                                value={selectedStatus}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#1AC13B]"
                            >
                                <option value="all">Semua Status</option>
                                <option value="active">Hanya Aktif</option>
                                <option value="featured">Hanya Unggulan</option>
                                <option value="inactive">Hanya Draft</option>
                            </select>
                        </div>

                        {/* View Switcher */}
                        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                    viewMode === 'grid'
                                        ? 'bg-white dark:bg-slate-700 text-[#107E27] dark:text-[#3FD27B] shadow-xs'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                                }`}
                                title="Tampilan Grid Kartu"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                    viewMode === 'table'
                                        ? 'bg-white dark:bg-slate-700 text-[#107E27] dark:text-[#3FD27B] shadow-xs'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                                }`}
                                title="Tampilan Tabel Rinci"
                            >
                                <TableIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tag Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => handleTagChange('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border cursor-pointer ${
                            selectedTag === 'all'
                                ? 'bg-[#1AC13B] text-white border-[#1AC13B] shadow-xs'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                        Semua Kategori ({stats.total})
                    </button>
                    {TAG_OPTIONS.map((tag) => (
                        <button
                            key={tag.value}
                            onClick={() => handleTagChange(tag.value)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border cursor-pointer ${
                                selectedTag === tag.value
                                    ? 'bg-[#1AC13B] text-white border-[#1AC13B] shadow-xs'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                        >
                            <tag.icon className="w-3.5 h-3.5" />
                            {tag.value}
                        </button>
                    ))}
                </div>

                {/* 4. Events Content Display (Grid or Table) */}
                {events.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                        <img
                            src="/assets/icon/errors/notfound.png"
                            alt="Tidak ada data"
                            className="w-28 sm:w-36 h-auto object-contain mx-auto select-none pointer-events-none drop-shadow-xs mb-2"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/icon/errors/notfound.png';
                            }}
                        />
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                            Tidak ada agenda acara ditemukan
                        </h3>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                            Coba ubah kata kunci pencarian atau filter kategori, atau tambahkan agenda acara baru.
                        </p>
                        <div>
                            <button
                                onClick={openCreateModal}
                                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold transition-colors cursor-pointer border-0"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Tambah Agenda Baru</span>
                            </button>
                        </div>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className={`group bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col overflow-hidden relative ${
                                    event.is_featured
                                        ? 'border-emerald-300 dark:border-emerald-800/70 shadow-xs shadow-emerald-500/5'
                                        : 'border-slate-200 dark:border-slate-800 shadow-xs'
                                }`}
                            >
                                {/* Poster Image & Badges */}
                                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={event.image_url || '/assets/images/research/digital_twin.png'}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/assets/images/research/digital_twin.png';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                                    {/* Top badges */}
                                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase border shadow-xs backdrop-blur-md ${getTagStyle(event.tag)}`}>
                                            {event.tag}
                                        </span>

                                        <div className="flex items-center gap-1.5">
                                            {event.is_featured && (
                                                <span className="px-2 py-1 rounded-lg bg-amber-500/90 text-slate-950 text-[11px] font-bold flex items-center gap-1 shadow-xs backdrop-blur-md">
                                                    <Star className="w-3 h-3 fill-slate-950" />
                                                    Unggulan
                                                </span>
                                            )}
                                            <span
                                                className={`px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-xs backdrop-blur-md ${
                                                    event.is_active
                                                        ? 'bg-emerald-500/90 text-slate-950'
                                                        : 'bg-slate-800/90 text-slate-300 border border-slate-700'
                                                }`}
                                            >
                                                {event.is_active ? 'Tayang' : 'Draft'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Date Display Overlay */}
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                                        <div className="flex items-center gap-1.5 font-bold tracking-wide text-emerald-300 bg-slate-950/70 px-2.5 py-1 rounded-lg backdrop-blur-md border border-emerald-500/30">
                                            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                                            {event.date_display}
                                        </div>
                                        {event.time_display && (
                                            <div className="flex items-center gap-1 text-slate-200 bg-slate-950/70 px-2 py-1 rounded-lg backdrop-blur-md">
                                                <Clock className="w-3 h-3 text-slate-400" />
                                                {event.time_display}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Body Info */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-3">
                                        {/* Speaker Pill */}
                                        {event.speaker_name && (
                                            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                                                <div className="w-7 h-7 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center shrink-0">
                                                    <UserCheck className="w-4 h-4" />
                                                </div>
                                                <div className="truncate text-xs">
                                                    <div className="font-semibold text-slate-900 dark:text-white truncate">
                                                        {event.speaker_name}
                                                    </div>
                                                    {event.speaker_title && (
                                                        <div className="text-slate-500 dark:text-slate-400 truncate text-[11px]">
                                                            {event.speaker_title}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#107E27] dark:group-hover:text-[#3FD27B] transition-colors">
                                            {event.title_id || event.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                            {event.description_id || event.description}
                                        </p>

                                        {/* Location */}
                                        <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>

                                        {/* Quota & Registration */}
                                        {event.quota_text && (
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#107E27] dark:text-[#3FD27B]">
                                                <Ticket className="w-3.5 h-3.5" />
                                                <span>{event.quota_text}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons Bar */}
                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleToggleStatus(event.id)}
                                                className={`p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                                    event.is_active
                                                        ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                                                        : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                }`}
                                                title={event.is_active ? 'Sembunyikan dari web' : 'Publikasikan ke web'}
                                            >
                                                {event.is_active ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => handleToggleFeatured(event.id)}
                                                className={`p-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                                    event.is_featured
                                                        ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                                                        : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                }`}
                                                title={event.is_featured ? 'Hapus dari agenda utama' : 'Jadikan agenda utama'}
                                            >
                                                <Star className={`w-4 h-4 ${event.is_featured ? 'fill-amber-500' : ''}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => openEditModal(event)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition cursor-pointer"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(event)}
                                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                                title="Hapus agenda"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Table View */
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold text-xs border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="px-4 py-3.5">Agenda & Judul</th>
                                        <th className="px-4 py-3.5">Kategori / Tag</th>
                                        <th className="px-4 py-3.5">Jadwal & Waktu</th>
                                        <th className="px-4 py-3.5">Pembicara</th>
                                        <th className="px-4 py-3.5">Lokasi</th>
                                        <th className="px-4 py-3.5 text-center">Status</th>
                                        <th className="px-4 py-3.5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {events.map((event) => (
                                        <tr key={event.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                                            <td className="px-4 py-3.5 max-w-xs">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={event.image_url || '/assets/images/research/digital_twin.png'}
                                                        alt={event.title}
                                                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/assets/images/research/digital_twin.png';
                                                        }}
                                                    />
                                                    <div className="truncate">
                                                        <div className="font-bold text-slate-900 dark:text-white truncate">
                                                            {event.title_id || event.title}
                                                        </div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                            {event.quota_text || 'Reg. Terbuka'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3.5">
                                                <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${getTagStyle(event.tag)}`}>
                                                    {event.tag}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                                                    {event.date_display}
                                                </div>
                                                <div className="text-[11px] text-slate-500">
                                                    {event.time_display || '09:00 - 16:00 WIB'}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3.5 text-xs text-slate-700 dark:text-slate-300">
                                                {event.speaker_name ? (
                                                    <div>
                                                        <div className="font-semibold">{event.speaker_name}</div>
                                                        <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{event.speaker_title}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400 italic">-</span>
                                                )}
                                            </td>

                                            <td className="px-4 py-3.5 text-xs text-slate-600 dark:text-slate-400 max-w-[160px] truncate">
                                                {event.location}
                                            </td>

                                            <td className="px-4 py-3.5 text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <button
                                                        onClick={() => handleToggleStatus(event.id)}
                                                        className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                                                            event.is_active
                                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                        }`}
                                                    >
                                                        {event.is_active ? 'Tayang' : 'Draft'}
                                                    </button>
                                                    {event.is_featured && (
                                                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3.5 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => openEditModal(event)}
                                                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                                        title="Edit agenda"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => confirmDelete(event)}
                                                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                                                        title="Hapus agenda"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* ========================================================================= */}
            {/* 5. Comprehensive Create & Edit Modal (4 Tabs) */}
            {/* ========================================================================= */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-3xl overflow-hidden my-8"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center font-bold">
                                        <Calendar className="w-5 h-5 text-[#1AC13B]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                            {editingEvent ? 'Perbarui Agenda Simposium / Masterclass' : 'Tambah Agenda Ilmiah Baru'}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Lengkapi detail pelaksanaan simposium, pembicara pakar, brosur, dan tautan pendaftaran.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Navigation Tabs */}
                            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900 px-6 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('info')}
                                    className={`py-3 px-3 text-xs font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
                                        activeTab === 'info'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Calendar className="w-4 h-4" />
                                    1. Info & Jadwal Acara
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('media')}
                                    className={`py-3 px-3 text-xs font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
                                        activeTab === 'media'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <ImageIcon className="w-4 h-4" />
                                    2. Pembicara & Poster
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('content')}
                                    className={`py-3 px-3 text-xs font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
                                        activeTab === 'content'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <FileText className="w-4 h-4" />
                                    3. Deskripsi & Registrasi
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('settings')}
                                    className={`py-3 px-3 text-xs font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
                                        activeTab === 'settings'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <SlidersHorizontal className="w-4 h-4" />
                                    4. Publikasi & Visibilitas
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {/* TAB 1: Info & Jadwal Acara */}
                                {activeTab === 'info' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Category Tag */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Kategori / Jenis Agenda <span className="text-rose-500">*</span>
                                                </label>
                                                <select
                                                    value={form.data.tag}
                                                    onChange={(e) => form.setData('tag', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                >
                                                    {TAG_OPTIONS.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                {form.errors.tag && <p className="text-xs text-rose-500 mt-1">{form.errors.tag}</p>}
                                            </div>

                                            {/* Quota / Status Ticket */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Status Kuota / Pendaftaran
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan status kuota atau kapasitas pendaftaran..."
                                                    value={form.data.quota_text}
                                                    onChange={(e) => form.setData('quota_text', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Date Display */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Teks Tanggal <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan format tampilan tanggal..."
                                                    value={form.data.date_display}
                                                    onChange={(e) => form.setData('date_display', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition font-mono text-xs"
                                                />
                                                {form.errors.date_display && <p className="text-xs text-rose-500 mt-1">{form.errors.date_display}</p>}
                                            </div>

                                            {/* Time Display */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Waktu Pelaksanaan
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan format jam pelaksanaan..."
                                                    value={form.data.time_display}
                                                    onChange={(e) => form.setData('time_display', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>

                                            {/* Date Picker (Calendar Sort) */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Kalender Acara (Sorting)
                                                </label>
                                                <input
                                                    type="date"
                                                    value={form.data.event_date}
                                                    onChange={(e) => form.setData('event_date', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                Lokasi Pelaksanaan & Ruang <span className="text-rose-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan nama gedung, ruangan, atau link hybrid..."
                                                    value={form.data.location}
                                                    onChange={(e) => form.setData('location', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>
                                            {form.errors.location && <p className="text-xs text-rose-500 mt-1">{form.errors.location}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* TAB 2: Pembicara & Poster */}
                                {activeTab === 'media' && (
                                    <div className="space-y-5">
                                        {/* Speaker Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Nama Pembicara / Keynote Speaker
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan nama lengkap pembicara utama..."
                                                    value={form.data.speaker_name}
                                                    onChange={(e) => form.setData('speaker_name', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Gelar / Jabatan Pembicara
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan gelar atau jabatan pembicara..."
                                                    value={form.data.speaker_title}
                                                    onChange={(e) => form.setData('speaker_title', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>
                                        </div>

                                        {/* Poster Choice Header */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                                    Poster / Gambar Banner Kegiatan
                                                </label>
                                                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                                    <button
                                                        type="button"
                                                        onClick={() => setImageInputType('preset')}
                                                        className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                                                            imageInputType === 'preset'
                                                                ? 'bg-white dark:bg-slate-700 text-[#107E27] dark:text-[#3FD27B] shadow-xs'
                                                                : 'text-slate-500 hover:text-slate-900'
                                                        }`}
                                                    >
                                                        Galeri Lab
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setImageInputType('upload')}
                                                        className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                                                            imageInputType === 'upload'
                                                                ? 'bg-white dark:bg-slate-700 text-[#107E27] dark:text-[#3FD27B] shadow-xs'
                                                                : 'text-slate-500 hover:text-slate-900'
                                                        }`}
                                                    >
                                                        Unggah File
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setImageInputType('url')}
                                                        className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                                                            imageInputType === 'url'
                                                                ? 'bg-white dark:bg-slate-700 text-[#107E27] dark:text-[#3FD27B] shadow-xs'
                                                                : 'text-slate-500 hover:text-slate-900'
                                                        }`}
                                                    >
                                                        Custom URL
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Gallery Presets */}
                                            {imageInputType === 'preset' && (
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-56 overflow-y-auto p-1 no-scrollbar">
                                                    {POSTER_PRESETS.map((preset) => (
                                                        <div
                                                            key={preset.url}
                                                            onClick={() => {
                                                                form.setData('image_url', preset.url);
                                                                setImagePreview(preset.url);
                                                            }}
                                                            className={`cursor-pointer group rounded-xl overflow-hidden border-2 transition relative ${
                                                                form.data.image_url === preset.url
                                                                    ? 'border-[#1AC13B] ring-2 ring-[#1AC13B]/20'
                                                                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                                                            }`}
                                                        >
                                                            <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800">
                                                                <img
                                                                    src={preset.url}
                                                                    alt={preset.label}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition"
                                                                />
                                                            </div>
                                                            <div className="p-2 bg-white dark:bg-slate-900 text-[11px] font-medium text-slate-800 dark:text-slate-200 truncate">
                                                                {preset.label}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* File Upload Input */}
                                            {imageInputType === 'upload' && (
                                                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-[#1AC13B] transition">
                                                    <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                        Pilih file poster (JPG, PNG, WebP) maks 3MB
                                                    </p>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        className="mt-3 block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#EDFBF1] file:text-[#107E27] hover:file:bg-[#EDFBF1]/80 dark:file:bg-[#10381C] dark:file:text-[#3FD27B] cursor-pointer"
                                                    />
                                                </div>
                                            )}

                                            {/* Custom URL Input */}
                                            {imageInputType === 'url' && (
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="https://example.com/poster-symposium.jpg"
                                                        value={form.data.image_url}
                                                        onChange={(e) => {
                                                            form.setData('image_url', e.target.value);
                                                            setImagePreview(e.target.value);
                                                        }}
                                                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                    />
                                                </div>
                                            )}

                                            {/* Live Poster Preview */}
                                            {imagePreview && (
                                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Poster Preview"
                                                        className="w-20 h-12 object-cover rounded-lg border border-slate-300 dark:border-slate-600"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/assets/images/research/digital_twin.png';
                                                        }}
                                                    />
                                                    <div className="text-xs">
                                                        <span className="font-semibold text-slate-800 dark:text-slate-200">Pratinjau Banner Poster</span>
                                                        <p className="text-[11px] text-slate-500 truncate max-w-sm">{form.data.image_url}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* TAB 3: Deskripsi & Registrasi */}
                                {activeTab === 'content' && (
                                    <div className="space-y-4">
                                        {/* Language Switcher for Content */}
                                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                Bahasa Judul & Ringkasan Acara
                                            </span>
                                            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveLangTab('ID')}
                                                    className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
                                                        activeLangTab === 'ID'
                                                            ? 'bg-[#1AC13B] text-white shadow-xs'
                                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                                                    }`}
                                                >
                                                    Bahasa Indonesia (ID)
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveLangTab('EN')}
                                                    className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
                                                        activeLangTab === 'EN'
                                                            ? 'bg-[#1AC13B] text-white shadow-xs'
                                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                                                    }`}
                                                >
                                                    English (EN)
                                                </button>
                                            </div>
                                        </div>

                                        {/* Bilingual Title */}
                                        {activeLangTab === 'ID' ? (
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Judul Acara (Bahasa Indonesia) <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan judul agenda atau simposium ilmiah..."
                                                    value={form.data.title_id}
                                                    onChange={(e) => form.setData('title_id', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition font-semibold"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Event Title (English) <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter symposium or event title in English..."
                                                    value={form.data.title}
                                                    onChange={(e) => form.setData('title', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition font-semibold"
                                                />
                                            </div>
                                        )}

                                        {/* Bilingual Description */}
                                        {activeLangTab === 'ID' ? (
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Deskripsi & Sinopsis Acara (Bahasa Indonesia) <span className="text-rose-500">*</span>
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Jelaskan tujuan, topik pembahasan, target peserta, dan keluaran yang diharapkan dari simposium/workshop ini..."
                                                    value={form.data.description_id}
                                                    onChange={(e) => form.setData('description_id', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                    Description & Synopsis (English) <span className="text-rose-500">*</span>
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Explain the objectives, core topics, target audience, and expected takeaways..."
                                                    value={form.data.description}
                                                    onChange={(e) => form.setData('description', e.target.value)}
                                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>
                                        )}

                                        {/* Action Buttons & Links */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                            {/* Registration Link & Label */}
                                            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                                                <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                                                    Tautan Pendaftaran (Form / URL)
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan tautan pendaftaran acara..."
                                                    value={form.data.registration_link}
                                                    onChange={(e) => form.setData('registration_link', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Label Tombol: Daftar Sekarang"
                                                    value={form.data.primary_action_text}
                                                    onChange={(e) => form.setData('primary_action_text', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>

                                            {/* Brochure Link & Label */}
                                            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                                                <label className="block text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                                                    Tautan Unduh Brosur / TOR (PDF)
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Masukkan tautan unduh brosur PDF..."
                                                    value={form.data.brochure_url}
                                                    onChange={(e) => form.setData('brochure_url', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Label Tombol: Unduh Brosur"
                                                    value={form.data.secondary_action_text}
                                                    onChange={(e) => form.setData('secondary_action_text', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB 4: Publikasi & Visibilitas */}
                                {activeTab === 'settings' && (
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Status Switch */}
                                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                <input
                                                    type="checkbox"
                                                    id="is_active"
                                                    checked={form.data.is_active}
                                                    onChange={(e) => form.setData('is_active', e.target.checked)}
                                                    className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                                />
                                                <label htmlFor="is_active" className="cursor-pointer">
                                                    <span className="font-bold text-sm text-slate-900 dark:text-white block">
                                                        Publikasikan ke Landing Page
                                                    </span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        Jika dinonaktifkan, agenda akan disimpan sebagai draft tersembunyi.
                                                    </span>
                                                </label>
                                            </div>

                                            {/* Featured Switch */}
                                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                <input
                                                    type="checkbox"
                                                    id="is_featured"
                                                    checked={form.data.is_featured}
                                                    onChange={(e) => form.setData('is_featured', e.target.checked)}
                                                    className="mt-1 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                                                />
                                                <label htmlFor="is_featured" className="cursor-pointer">
                                                    <span className="font-bold text-sm text-slate-900 dark:text-white block flex items-center gap-1.5">
                                                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                        Agenda Utama (Featured)
                                                    </span>
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                                        Mendapat sorotan khusus, badge emas, dan prioritas di bagian terdepan.
                                                    </span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Order */}
                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                                                Nomor Urutan Tampilan
                                            </label>
                                            <input
                                                type="number"
                                                min={1}
                                                value={form.data.order}
                                                onChange={(e) => form.setData('order', parseInt(e.target.value) || 1)}
                                                className="w-32 px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B] transition font-bold"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">
                                                Agenda dengan urutan terkecil (misal 1, 2) akan tampil di posisi awal kalender.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Modal Actions Footer */}
                                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <div className="text-xs text-slate-400">
                                        * Pastikan semua tab terisi dengan informasi yang valid
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition cursor-pointer"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={form.processing}
                                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white font-bold text-xs shadow-xs transition disabled:opacity-50 cursor-pointer"
                                        >
                                            {form.processing ? (
                                                'Menyimpan...'
                                            ) : editingEvent ? (
                                                'Perbarui Agenda'
                                            ) : (
                                                'Simpan Agenda Baru'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Alert Modal */}
            <AlertModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={executeDelete}
                title="Hapus Agenda Kegiatan?"
                message={`Apakah Anda yakin ingin menghapus agenda "${eventToDelete?.title_id || eventToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Ya, Hapus Agenda"
                cancelText="Batal"
                type="danger"
            />
        </AdminLayout>
    );
}
