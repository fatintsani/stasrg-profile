import React, { useState, useEffect } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Researcher } from '../../../types';
import { Language } from '../../../utils/translations';
import { AlertModal } from '../../../Components/Common/AlertModal';
import {
    Users,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    AlertCircle,
    X,
    ExternalLink,
    Filter,
    Check,
    ArrowUpDown,
    Eye,
    EyeOff,
    Sparkles,
    Star,
    Mail,
    Phone,
    BookOpen,
    Briefcase,
    Building2,
    GraduationCap,
    Award,
    Tag,
    Globe2,
    Share2,
    Layers,
    LayoutGrid,
    Table as TableIcon,
    MoveUp,
    MoveDown,
    Image as ImageIcon,
    RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamIndexProps {
    researchers: Researcher[];
    stats: {
        total_researchers: number;
        active_researchers: number;
        inactive_researchers: number;
        featured_researchers: number;
        principal_investigators: number;
    };
    filters: {
        search: string;
        role: string;
        status: string;
    };
    siteConfig?: {
        center_name?: string;
        institution?: string;
    };
    status?: string;
}

const ROLE_PRESETS = [
    { labelEn: 'Principal Investigator & Research Director', labelId: 'Peneliti Utama & Direktur Riset' },
    { labelEn: 'Lead Researcher - Smart Manufacturing Lab', labelId: 'Ketua Peneliti - Lab Manufaktur Cerdas' },
    { labelEn: 'Principal Researcher - Green Energy & Decarbonization', labelId: 'Peneliti Utama - Energi Bersih & Dekarbonisasi' },
    { labelEn: 'Senior Research Fellow - Logistics & Supply Chain AI', labelId: 'Peneliti Senior - Logistik & AI Rantai Pasok' },
    { labelEn: 'Lead Software & Edge AI Systems Engineer', labelId: 'Perekayasa Utama Perangkat Lunak & Sistem AI Edge' },
    { labelEn: 'Postdoctoral Research Fellow', labelId: 'Peneliti Pascadoktoral' },
    { labelEn: 'Graduate Research Assistant', labelId: 'Asisten Peneliti Pascasarjana' },
    { labelEn: 'Scientific Advisory Board', labelId: 'Dewan Penasihat Ilmiah' },
];

const AVATAR_PRESETS = [
    { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', label: 'Senior Leader 1' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', label: 'Lead Researcher 2' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', label: 'Principal Scientist 3' },
    { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', label: 'Senior Fellow 4' },
    { url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80', label: 'Research Engineer 5' },
    { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80', label: 'Research Fellow 6' },
];

export default function TeamIndex({
    researchers = [],
    stats,
    filters,
    siteConfig,
    status,
}: TeamIndexProps) {
    const [language, setLanguage] = useState<Language>('ID');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [isReordering, setIsReordering] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingResearcher, setEditingResearcher] = useState<Researcher | null>(null);
    const [researcherToDelete, setResearcherToDelete] = useState<Researcher | null>(null);
    const [activeLangTab, setActiveLangTab] = useState<'ID' | 'EN'>('ID');
    const [tagInput, setTagInput] = useState('');
    const [avatarInputType, setAvatarInputType] = useState<'preset' | 'custom'>('preset');

    useEffect(() => {
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }
    }, []);

    const isEn = language === 'EN';

    // Inertia Form for Create/Update
    const form = useForm({
        name: '',
        title_degree: '',
        role: '',
        role_id: '',
        specialization: '',
        specialization_id: '',
        department: 'School of Industrial Engineering',
        institution: 'Telkom University',
        email: '',
        phone: '',
        bio: '',
        bio_id: '',
        avatar_url: AVATAR_PRESETS[0].url,
        scholar_url: '',
        scopus_id: '',
        orcid: '',
        linkedin_url: '',
        focus_areas: [] as string[],
        publications_count: 0,
        projects_count: 0,
        is_featured: false,
        is_active: true,
        order: (researchers.length || 0) + 1,
    });

    const openCreateModal = () => {
        setEditingResearcher(null);
        form.reset();
        form.clearErrors();
        form.setData({
            name: '',
            title_degree: '',
            role: ROLE_PRESETS[0].labelEn,
            role_id: ROLE_PRESETS[0].labelId,
            specialization: '',
            specialization_id: '',
            department: 'School of Industrial Engineering',
            institution: 'Telkom University',
            email: '',
            phone: '',
            bio: '',
            bio_id: '',
            avatar_url: AVATAR_PRESETS[0].url,
            scholar_url: '',
            scopus_id: '',
            orcid: '',
            linkedin_url: '',
            focus_areas: [],
            publications_count: 0,
            projects_count: 0,
            is_featured: false,
            is_active: true,
            order: (researchers.length || 0) + 1,
        });
        setTagInput('');
        setAvatarInputType('preset');
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const openEditModal = (researcher: Researcher) => {
        setEditingResearcher(researcher);
        form.clearErrors();
        form.setData({
            name: researcher.name || '',
            title_degree: researcher.title_degree || '',
            role: researcher.role || '',
            role_id: researcher.role_id || researcher.role || '',
            specialization: researcher.specialization || '',
            specialization_id: researcher.specialization_id || researcher.specialization || '',
            department: researcher.department || 'School of Industrial Engineering',
            institution: researcher.institution || 'Telkom University',
            email: researcher.email || '',
            phone: researcher.phone || '',
            bio: researcher.bio || '',
            bio_id: researcher.bio_id || researcher.bio || '',
            avatar_url: researcher.avatar_url || AVATAR_PRESETS[0].url,
            scholar_url: researcher.scholar_url || '',
            scopus_id: researcher.scopus_id || '',
            orcid: researcher.orcid || '',
            linkedin_url: researcher.linkedin_url || '',
            focus_areas: Array.isArray(researcher.focus_areas) ? researcher.focus_areas : [],
            publications_count: researcher.publications_count || 0,
            projects_count: researcher.projects_count || 0,
            is_featured: researcher.is_featured ?? false,
            is_active: researcher.is_active ?? true,
            order: researcher.order ?? 1,
        });
        setTagInput('');
        setAvatarInputType(
            AVATAR_PRESETS.some((p) => p.url === researcher.avatar_url) ? 'preset' : 'custom'
        );
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (trimmed && !form.data.focus_areas.includes(trimmed)) {
            form.setData('focus_areas', [...form.data.focus_areas, trimmed]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (indexToRemove: number) => {
        form.setData(
            'focus_areas',
            form.data.focus_areas.filter((_, i) => i !== indexToRemove)
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingResearcher) {
            form.put(`/admin/team/${editingResearcher.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        } else {
            form.post('/admin/team', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        }
    };

    const handleDelete = () => {
        if (!researcherToDelete) return;
        router.delete(`/admin/team/${researcherToDelete.id}`, {
            onSuccess: () => setResearcherToDelete(null),
        });
    };

    const handleToggleStatus = (researcher: Researcher) => {
        router.post(`/admin/team/${researcher.id}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleToggleFeatured = (researcher: Researcher) => {
        router.post(`/admin/team/${researcher.id}/toggle-featured`, {}, {
            preserveScroll: true,
        });
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= researchers.length) return;

        const newItems = [...researchers];
        const [movedItem] = newItems.splice(index, 1);
        newItems.splice(targetIndex, 0, movedItem);

        const orders = newItems.map((item, idx) => ({
            id: item.id,
            order: idx + 1,
        }));

        router.post('/admin/team/reorder', { orders }, { preserveScroll: true });
    };

    // Filtered researchers
    const filteredResearchers = researchers.filter((r) => {
        const matchesSearch =
            !searchQuery ||
            r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (r.title_degree && r.title_degree.toLowerCase().includes(searchQuery.toLowerCase())) ||
            r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (r.role_id && r.role_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
            r.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (r.specialization_id && r.specialization_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (r.email && r.email.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesRole =
            !roleFilter ||
            r.role.toLowerCase().includes(roleFilter.toLowerCase()) ||
            (r.role_id && r.role_id.toLowerCase().includes(roleFilter.toLowerCase()));

        const matchesStatus =
            !statusFilter ||
            (statusFilter === 'active' && r.is_active) ||
            (statusFilter === 'inactive' && !r.is_active) ||
            (statusFilter === 'featured' && r.is_featured);

        return matchesSearch && matchesRole && matchesStatus;
    });

    const getRoleBadgeStyle = (role: string) => {
        const lower = role.toLowerCase();
        if (lower.includes('director') || lower.includes('direktur') || lower.includes('principal') || lower.includes('utama')) {
            return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
        }
        if (lower.includes('lead') || lower.includes('ketua') || lower.includes('senior')) {
            return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800';
        }
        if (lower.includes('engineer') || lower.includes('perekayasa')) {
            return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
        }
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800';
    };

    return (
        <AdminLayout
            title={isEn ? 'Researchers & Team' : 'Kelola Tim Peneliti'}
            siteConfig={siteConfig}
        >
            <Head title={isEn ? 'Researchers & Team - Admin STAS' : 'Tim Peneliti - Admin STAS'} />

            <div className="space-y-6">
                {/* 1. Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold border border-[#B2EFC3] dark:border-[#1A5C2F]">
                            <Users className="w-3.5 h-3.5 text-[#1AC13B]" />
                            <span>Tim Peneliti & Anggota</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Tim Peneliti & Anggota Riset
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            Kelola profil saintifik, afiliasi akademik, indeks Google Scholar / Scopus, dan spesialisasi riset para anggota dan peneliti STAS-RG.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 flex-wrap">
                        <Link
                            href="/#researchers"
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
                            <span>Tambah Peneliti Baru</span>
                        </button>
                    </div>
                </div>

                {/* 2. KPI Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TOTAL PENELITI</span>
                            <Users className="w-4 h-4 text-[#1AC13B]" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.total_researchers}
                        </div>
                        <div className="text-[11px] text-slate-400">Peneliti & Rekan Riset</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PROFIL AKTIF</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.active_researchers}
                        </div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Tampil di Beranda Utama
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PENELITI UTAMA</span>
                            <GraduationCap className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.principal_investigators}
                        </div>
                        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                            Direktur & Ketua Lab
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PENELITI UNGGULAN</span>
                            <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                            {stats.featured_researchers}
                        </div>
                        <div className="text-[11px] text-slate-400">Sorotan Profil Riset</div>
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
                            placeholder="Cari nama peneliti, gelar, spesialisasi, atau peran..."
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
                        {/* Role Dropdown */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PERAN:</span>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#1AC13B]"
                            >
                                <option value="">Semua Peran</option>
                                <option value="principal">Peneliti Utama & Direktur</option>
                                <option value="lead">Senior / Ketua Lab</option>
                                <option value="engineer">Perekayasa / Engineer</option>
                                <option value="fellow">Fellow & Peneliti Tamu</option>
                            </select>
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">STATUS:</span>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#1AC13B]"
                            >
                                <option value="">Semua Status</option>
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                                <option value="featured">Unggulan</option>
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

                {/* 4. Researchers List (Grid or Table) */}
                {filteredResearchers.length === 0 ? (
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
                                Tidak ada peneliti ditemukan
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                                Coba ubah kata kunci pencarian atau filter peran, atau tambahkan profil peneliti baru.
                            </p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold transition-all shadow-sm cursor-pointer border-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Peneliti Baru</span>
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredResearchers.map((researcher, index) => {
                            const roleStyle = getRoleBadgeStyle(researcher.role);
                            return (
                                <motion.div
                                    key={researcher.id}
                                    layout
                                    className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between relative group ${
                                        researcher.is_active
                                            ? 'border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/50 hover:shadow-sm'
                                            : 'border-slate-200/60 dark:border-slate-800/60 opacity-60 bg-slate-50/50 dark:bg-slate-900/50'
                                    }`}
                                >
                                    {/* Top Profile Row */}
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <div className="flex items-center gap-3.5">
                                                <div className="relative shrink-0">
                                                    {researcher.avatar_url ? (
                                                        <img
                                                            src={researcher.avatar_url}
                                                            alt={researcher.name}
                                                            className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-xs"
                                                        />
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-2xl bg-[#1AC13B]/10 text-[#1AC13B] flex items-center justify-center font-bold text-lg border-2 border-white dark:border-slate-800">
                                                            {researcher.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span
                                                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                                                            researcher.is_active ? 'bg-[#1AC13B]' : 'bg-slate-400'
                                                        }`}
                                                        title={researcher.is_active ? 'Active Profile' : 'Inactive'}
                                                    />
                                                </div>

                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                                        {researcher.name}
                                                    </h3>
                                                    {researcher.title_degree && (
                                                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
                                                            {researcher.title_degree}
                                                        </p>
                                                    )}
                                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                                                        <Building2 className="w-3 h-3" />
                                                        <span className="truncate">{researcher.institution}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Featured Star & Reorder */}
                                            <div className="flex items-center gap-1 shrink-0">
                                                <button
                                                    onClick={() => handleToggleFeatured(researcher)}
                                                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                                                        researcher.is_featured
                                                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100'
                                                            : 'text-slate-300 dark:text-slate-600 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                    }`}
                                                    title={researcher.is_featured ? 'Unggulan (Featured)' : 'Jadikan Unggulan'}
                                                >
                                                    <Star className={`w-4 h-4 ${researcher.is_featured ? 'fill-amber-500' : ''}`} />
                                                </button>

                                                {isReordering && (
                                                    <div className="flex items-center gap-0.5">
                                                        <button
                                                            onClick={() => handleMove(index, 'up')}
                                                            disabled={index === 0}
                                                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 disabled:opacity-30 cursor-pointer"
                                                        >
                                                            <MoveUp className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleMove(index, 'down')}
                                                            disabled={index === filteredResearchers.length - 1}
                                                            className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 disabled:opacity-30 cursor-pointer"
                                                        >
                                                            <MoveDown className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Role Badge */}
                                        <div className="mb-3">
                                            <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-xl border ${roleStyle}`}>
                                                {isEn ? researcher.role : (researcher.role_id || researcher.role)}
                                            </span>
                                        </div>

                                        {/* Specialization */}
                                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2 line-clamp-2">
                                            {isEn ? researcher.specialization : (researcher.specialization_id || researcher.specialization)}
                                        </div>

                                        {/* Bio Snippet */}
                                        {(researcher.bio || researcher.bio_id) && (
                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                                                {isEn ? researcher.bio : (researcher.bio_id || researcher.bio)}
                                            </p>
                                        )}

                                        {/* Focus Area Tags */}
                                        {Array.isArray(researcher.focus_areas) && researcher.focus_areas.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {researcher.focus_areas.slice(0, 3).map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {researcher.focus_areas.length > 3 && (
                                                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-50 dark:bg-slate-800/60 text-slate-400 rounded-lg">
                                                        +{researcher.focus_areas.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Academic stats & External links */}
                                        <div className="flex items-center gap-2 text-slate-400 text-xs py-2 border-t border-slate-100 dark:border-slate-800/80">
                                            {researcher.email && (
                                                <a
                                                    href={`mailto:${researcher.email}`}
                                                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition"
                                                    title={researcher.email}
                                                >
                                                    <Mail className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                            {researcher.scholar_url && (
                                                <a
                                                    href={researcher.scholar_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-500 transition"
                                                    title="Google Scholar Profile"
                                                >
                                                    <GraduationCap className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                            {researcher.scopus_id && (
                                                <span
                                                    className="px-1.5 py-0.5 text-[10px] font-mono bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded border border-orange-200 dark:border-orange-800 font-bold"
                                                    title={`Scopus Author ID: ${researcher.scopus_id}`}
                                                >
                                                    Scopus
                                                </span>
                                            )}
                                            {researcher.orcid && (
                                                <span
                                                    className="px-1.5 py-0.5 text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded border border-emerald-200 dark:border-emerald-800 font-bold"
                                                    title={`ORCID: ${researcher.orcid}`}
                                                >
                                                    ORCID
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bottom action row */}
                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                        <button
                                            onClick={() => handleToggleStatus(researcher)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                                                researcher.is_active
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 hover:bg-emerald-100'
                                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
                                            }`}
                                        >
                                            {researcher.is_active ? (
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
                                                onClick={() => openEditModal(researcher)}
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                                                title={isEn ? 'Edit profile' : 'Edit profil peneliti'}
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => setResearcherToDelete(researcher)}
                                                className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                                title={isEn ? 'Delete profile' : 'Hapus peneliti'}
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
                                        <th className="py-3.5 px-4">{isEn ? 'Researcher' : 'Nama Peneliti'}</th>
                                        <th className="py-3.5 px-4">{isEn ? 'Role / Position' : 'Posisi / Peran'}</th>
                                        <th className="py-3.5 px-4">{isEn ? 'Specialization' : 'Spesialisasi'}</th>
                                        <th className="py-3.5 px-4">{isEn ? 'Contact & Academic IDs' : 'Kontak & Profil'}</th>
                                        <th className="py-3.5 px-4">{isEn ? 'Status' : 'Status'}</th>
                                        <th className="py-3.5 px-4 text-right">{isEn ? 'Actions' : 'Aksi'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                                    {filteredResearchers.map((researcher) => {
                                        const roleStyle = getRoleBadgeStyle(researcher.role);
                                        return (
                                            <tr
                                                key={researcher.id}
                                                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                                            >
                                                <td className="py-3.5 px-4">
                                                    <div className="flex items-center gap-3">
                                                        {researcher.avatar_url ? (
                                                            <img
                                                                src={researcher.avatar_url}
                                                                alt={researcher.name}
                                                                className="w-9 h-9 rounded-xl object-cover shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-9 h-9 rounded-xl bg-[#1AC13B]/10 text-[#1AC13B] font-bold flex items-center justify-center shrink-0">
                                                                {researcher.name.substring(0, 2).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                                                {researcher.name}
                                                                {researcher.is_featured && (
                                                                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                                )}
                                                            </div>
                                                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                                                {researcher.title_degree || researcher.institution}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${roleStyle}`}>
                                                        {isEn ? researcher.role : (researcher.role_id || researcher.role)}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium max-w-xs truncate">
                                                    {isEn ? researcher.specialization : (researcher.specialization_id || researcher.specialization)}
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-500">
                                                    <div className="flex items-center gap-2">
                                                        {researcher.email && (
                                                            <span className="truncate max-w-[140px] text-[11px]">{researcher.email}</span>
                                                        )}
                                                        {researcher.scopus_id && (
                                                            <span className="px-1 py-0.5 text-[9px] bg-orange-50 text-orange-600 rounded font-mono font-bold">
                                                                SCOPUS
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    <button
                                                        onClick={() => handleToggleStatus(researcher)}
                                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold cursor-pointer ${
                                                            researcher.is_active
                                                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                                                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                                        }`}
                                                    >
                                                        {researcher.is_active ? (isEn ? 'Active' : 'Aktif') : (isEn ? 'Hidden' : 'Nonaktif')}
                                                    </button>
                                                </td>
                                                <td className="py-3.5 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            onClick={() => openEditModal(researcher)}
                                                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => setResearcherToDelete(researcher)}
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

            {/* 5. Create / Edit Researcher Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#1AC13B]/10 flex items-center justify-center text-[#1AC13B]">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                            {editingResearcher
                                                ? isEn
                                                    ? 'Edit Researcher Profile'
                                                    : 'Edit Profil Peneliti'
                                                : isEn
                                                ? 'Add Researcher Profile'
                                                : 'Tambah Anggota Tim Peneliti'}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {isEn
                                                ? 'Configure academic credentials, research topics, and publications'
                                                : 'Atur kredensial akademik, topik riset, dan publikasi'}
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
                                {/* Avatar Selector */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {isEn ? 'Researcher Photo / Avatar' : 'Foto Profil Peneliti'}
                                    </label>
                                    <div className="flex items-center gap-3 mb-3">
                                        <button
                                            type="button"
                                            onClick={() => setAvatarInputType('preset')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                                avatarInputType === 'preset'
                                                    ? 'bg-[#1AC13B] text-white'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                            }`}
                                        >
                                            Galeri Foto Profil
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAvatarInputType('custom')}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                                avatarInputType === 'custom'
                                                    ? 'bg-[#1AC13B] text-white'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                            }`}
                                        >
                                            Custom URL Foto
                                        </button>
                                    </div>

                                    {avatarInputType === 'preset' ? (
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                            {AVATAR_PRESETS.map((preset) => (
                                                <div
                                                    key={preset.url}
                                                    onClick={() => form.setData('avatar_url', preset.url)}
                                                    className={`cursor-pointer rounded-xl overflow-hidden border-2 transition relative aspect-square ${
                                                        form.data.avatar_url === preset.url
                                                            ? 'border-[#1AC13B] ring-2 ring-[#1AC13B]/20'
                                                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                                                    }`}
                                                >
                                                    <img
                                                        src={preset.url}
                                                        alt={preset.label}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            value={form.data.avatar_url}
                                            onChange={(e) => form.setData('avatar_url', e.target.value)}
                                            placeholder="https://example.com/photo.jpg"
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    )}
                                </div>

                                {/* Full Name & Academic Degree */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            {isEn ? 'Full Name' : 'Nama Lengkap'}
                                            <span className="text-rose-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.name}
                                            onChange={(e) => form.setData('name', e.target.value)}
                                            placeholder={isEn ? 'Enter researcher full name...' : 'Masukkan nama lengkap peneliti...'}
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1AC13B]/20 focus:border-[#1AC13B]"
                                            required
                                        />
                                        {form.errors.name && (
                                            <p className="text-xs text-rose-500 mt-1">{form.errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            {isEn ? 'Academic Title / Degree' : 'Gelar Akademik'}
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.title_degree}
                                            onChange={(e) => form.setData('title_degree', e.target.value)}
                                            placeholder={isEn ? 'Enter academic degree...' : 'Masukkan gelar akademik...'}
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1AC13B]/20 focus:border-[#1AC13B]"
                                        />
                                    </div>
                                </div>

                                {/* Role Selection & Quick Presets */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                        {isEn ? 'Role / Position Presets' : 'Pilihan Cepat Posisi / Peran'}
                                    </label>
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {ROLE_PRESETS.map((p) => (
                                            <button
                                                key={p.labelEn}
                                                type="button"
                                                onClick={() => {
                                                    form.setData({
                                                        ...form.data,
                                                        role: p.labelEn,
                                                        role_id: p.labelId,
                                                    });
                                                }}
                                                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition cursor-pointer ${
                                                    form.data.role === p.labelEn
                                                        ? 'bg-[#1AC13B] text-white border-[#1AC13B]'
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                                                }`}
                                            >
                                                {isEn ? p.labelEn : p.labelId}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Bilingual Tabs for Role, Specialization & Bio */}
                                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            {isEn ? 'Bilingual Content (ID / EN)' : 'Konten Dua Bahasa'}
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
                                                    Posisi / Peran (Bahasa Indonesia) *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.role_id}
                                                    onChange={(e) => form.setData('role_id', e.target.value)}
                                                    placeholder="Masukkan posisi atau peran peneliti..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Bidang Spesialisasi & Keahlian (Bahasa Indonesia) *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.specialization_id}
                                                    onChange={(e) => form.setData('specialization_id', e.target.value)}
                                                    placeholder="Masukkan bidang keahlian dan fokus spesialisasi..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Biografi Ringkas Peneliti (Bahasa Indonesia)
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={form.data.bio_id}
                                                    onChange={(e) => form.setData('bio_id', e.target.value)}
                                                    placeholder="Deskripsikan riwayat penelitian dan fokus karya ilmiah..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Role / Position (English) *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.role}
                                                    onChange={(e) => form.setData('role', e.target.value)}
                                                    placeholder="Enter researcher role or position..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Specialization (English) *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.specialization}
                                                    onChange={(e) => form.setData('specialization', e.target.value)}
                                                    placeholder="Enter research expertise and specialization..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Short Biography (English)
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={form.data.bio}
                                                    onChange={(e) => form.setData('bio', e.target.value)}
                                                    placeholder="Describe research career, scientific contributions, and laboratory focus..."
                                                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Institution & Department */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            {isEn ? 'Institution' : 'Institusi / Universitas'}
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.institution}
                                            onChange={(e) => form.setData('institution', e.target.value)}
                                            placeholder="Telkom University"
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            {isEn ? 'Department / Faculty' : 'Fakultas / Program Studi'}
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.department}
                                            onChange={(e) => form.setData('department', e.target.value)}
                                            placeholder="School of Industrial Engineering"
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Focus Areas Tags */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {isEn ? 'Research Focus Tags' : 'Topik / Keahlian Riset'}
                                    </label>
                                    <div className="flex items-center gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddTag();
                                                }
                                            }}
                                            placeholder={isEn ? 'Enter focus topic and press Add...' : 'Masukkan topik fokus lalu tekan Tambah...'}
                                            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddTag}
                                            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                                        >
                                            + Tambah Tag
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {form.data.focus_areas.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B]"
                                            >
                                                #{tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(idx)}
                                                    className="hover:text-rose-500 cursor-pointer"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Academic IDs & Contact Links */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Email Resmi
                                        </label>
                                        <input
                                            type="email"
                                            value={form.data.email}
                                            onChange={(e) => form.setData('email', e.target.value)}
                                            placeholder="Masukkan alamat email resmi..."
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Google Scholar URL
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.scholar_url}
                                            onChange={(e) => form.setData('scholar_url', e.target.value)}
                                            placeholder="Masukkan tautan profil Google Scholar..."
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Scopus Author ID
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.scopus_id}
                                            onChange={(e) => form.setData('scopus_id', e.target.value)}
                                            placeholder="Masukkan Scopus Author ID..."
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            ORCID iD
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.orcid}
                                            onChange={(e) => form.setData('orcid', e.target.value)}
                                            placeholder="Masukkan 16 digit ORCID iD..."
                                            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                                        />
                                    </div>
                                </div>

                                {/* Order, Featured & Active */}
                                <div className="grid grid-cols-3 gap-4 pt-2">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            {isEn ? 'Order' : 'Nomor Urutan'}
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
                                            {isEn ? 'Featured' : 'Unggulan'}
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => form.setData('is_featured', !form.data.is_featured)}
                                            className={`w-full px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                                                form.data.is_featured
                                                    ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
                                                    : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                            }`}
                                        >
                                            <Star className={`w-3.5 h-3.5 ${form.data.is_featured ? 'fill-amber-500' : ''}`} />
                                            {form.data.is_featured ? 'Unggulan' : 'Biasa'}
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            {isEn ? 'Status' : 'Status Tampil'}
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => form.setData('is_active', !form.data.is_active)}
                                            className={`w-full px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                                                form.data.is_active
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                                                    : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                            }`}
                                        >
                                            {form.data.is_active ? (
                                                <>
                                                    <Check className="w-3.5 h-3.5" />
                                                    Aktif
                                                </>
                                            ) : (
                                                <>
                                                    <X className="w-3.5 h-3.5" />
                                                    Nonaktif
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Buttons */}
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
                                        {editingResearcher
                                            ? isEn
                                                ? 'Save Changes'
                                                : 'Simpan Perubahan'
                                            : isEn
                                            ? 'Create Profile'
                                            : 'Tambah Peneliti'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 6. Delete Confirmation Modal */}
            <AlertModal
                isOpen={!!researcherToDelete}
                onClose={() => setResearcherToDelete(null)}
                onConfirm={handleDelete}
                title={isEn ? 'Delete Researcher Profile?' : 'Hapus Profil Peneliti?'}
                message={
                    isEn
                        ? `Are you sure you want to delete "${researcherToDelete?.name}"? This will remove their profile and all academic references.`
                        : `Apakah Anda yakin ingin menghapus profil "${researcherToDelete?.name}"? Profil dan seluruh data penelitiannya akan dihapus.`
                }
                confirmText={isEn ? 'Delete Profile' : 'Ya, Hapus'}
                cancelText={isEn ? 'Cancel' : 'Batal'}
                type="danger"
            />
        </AdminLayout>
    );
}
