import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Partner, SiteConfig } from '../../../types';
import { useForm, router, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    Star,
    ExternalLink,
    Calendar,
    Globe,
    Layers,
    Filter,
    X,
    Upload,
    ImageIcon,
    Handshake,
    Landmark,
    GraduationCap,
    Cpu,
    Briefcase,
    Sparkles,
} from 'lucide-react';
import { AlertModal } from '../../../Components/Common/AlertModal';

interface Stats {
    total: number;
    active: number;
    featured: number;
    industry_soe: number;
    academic_tech: number;
}

interface PartnersIndexProps {
    partners: Partner[];
    stats: Stats;
    filters: {
        search?: string;
        category?: string;
        status?: string;
    };
    siteConfig: SiteConfig;
}

const CATEGORY_OPTIONS = [
    { value: 'SOE', label: 'BUMN / State-Owned Enterprise', icon: Landmark, color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800' },
    { value: 'Industry', label: 'Industri Manufaktur & Swasta', icon: Briefcase, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800' },
    { value: 'Technology', label: 'Startup & Kolaborasi Teknologi', icon: Cpu, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800' },
    { value: 'Academic', label: 'Perguruan Tinggi & Riset', icon: GraduationCap, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800' },
    { value: 'Government', label: 'Lembaga Pemerintah / Kementerian', icon: Building2, color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800' },
    { value: 'Other', label: 'Lainnya / Aliansi Lain', icon: Handshake, color: 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700' },
];

const LOGO_PRESETS = [
    { label: 'PT PINDAD', path: '/assets/images/partners/collegue_pindad.png' },
    { label: 'BIO FARMA', path: '/assets/images/partners/collegue_biofarma.png' },
    { label: 'BANDUNG TECHNO PARK', path: '/assets/images/partners/collegue_btp.png' },
    { label: 'TRANSTRACK', path: '/assets/images/partners/collegue_transtrack.png' },
    { label: 'ASYCS', path: '/assets/images/partners/collegue_asycs.png' },
    { label: 'TELKOM UNIVERSITY', path: '/assets/images/telu.png' },
];

export default function PartnersIndex({
    partners,
    stats,
    filters,
    siteConfig,
}: PartnersIndexProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
    const [activeTab, setActiveTab] = useState<'info' | 'logo' | 'desc'>('info');
    const [logoInputType, setLogoInputType] = useState<'preset' | 'url' | 'upload'>('preset');
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);

    // Form
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category: 'Industry',
        partnership_type: '',
        description: '',
        description_id: '',
        logo_text: '',
        logo_url: '',
        logo_file: null as File | null,
        website_url: '',
        established_year: new Date().getFullYear(),
        is_featured: true,
        is_active: true,
        order: 0,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/partners',
            {
                search: searchQuery,
                category: selectedCategory,
                status: selectedStatus,
            },
            { preserveState: true }
        );
    };

    const handleCategoryFilter = (cat: string) => {
        setSelectedCategory(cat);
        router.get(
            '/admin/partners',
            {
                search: searchQuery,
                category: cat,
                status: selectedStatus,
            },
            { preserveState: true }
        );
    };

    const handleStatusFilter = (st: string) => {
        setSelectedStatus(st);
        router.get(
            '/admin/partners',
            {
                search: searchQuery,
                category: selectedCategory,
                status: st,
            },
            { preserveState: true }
        );
    };

    const openCreateModal = () => {
        setEditingPartner(null);
        reset();
        clearErrors();
        setActiveTab('info');
        setLogoInputType('preset');
        setLogoPreview(LOGO_PRESETS[0].path);
        setData({
            name: '',
            category: 'Industry',
            partnership_type: '',
            description: '',
            description_id: '',
            logo_text: '',
            logo_url: LOGO_PRESETS[0].path,
            logo_file: null,
            website_url: 'https://',
            established_year: new Date().getFullYear(),
            is_featured: true,
            is_active: true,
            order: partners.length + 1,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (partner: Partner) => {
        setEditingPartner(partner);
        clearErrors();
        setActiveTab('info');
        setLogoPreview(partner.logo_url || null);
        setLogoInputType(
            partner.logo_url && partner.logo_url.startsWith('/storage/')
                ? 'upload'
                : LOGO_PRESETS.some((p) => p.path === partner.logo_url)
                ? 'preset'
                : 'url'
        );
        setData({
            name: partner.name,
            category: partner.category || 'Industry',
            partnership_type: partner.partnership_type || '',
            description: partner.description || '',
            description_id: partner.description_id || partner.description || '',
            logo_text: partner.logo_text || partner.name,
            logo_url: partner.logo_url || '',
            logo_file: null,
            website_url: partner.website_url || '',
            established_year: partner.established_year || new Date().getFullYear(),
            is_featured: partner.is_featured ?? true,
            is_active: partner.is_active ?? true,
            order: partner.order || 0,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPartner(null);
        reset();
        clearErrors();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo_file', file);
            const previewUrl = URL.createObjectURL(file);
            setLogoPreview(previewUrl);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPartner) {
            // Use post with _method PUT if sending multipart form data
            if (data.logo_file) {
                router.post(`/admin/partners/${editingPartner.id}`, {
                    _method: 'put',
                    ...data,
                }, {
                    onSuccess: () => closeModal(),
                });
            } else {
                put(`/admin/partners/${editingPartner.id}`, {
                    onSuccess: () => closeModal(),
                });
            }
        } else {
            post('/admin/partners', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const confirmDelete = (partner: Partner) => {
        setPartnerToDelete(partner);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (partnerToDelete) {
            router.delete(`/admin/partners/${partnerToDelete.id}`, {
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    setPartnerToDelete(null);
                },
            });
        }
    };

    const handleToggleStatus = (partner: Partner) => {
        router.post(`/admin/partners/${partner.id}/toggle`, {}, { preserveScroll: true });
    };

    const handleToggleFeatured = (partner: Partner) => {
        router.post(`/admin/partners/${partner.id}/toggle-featured`, {}, { preserveScroll: true });
    };

    const getCategoryBadge = (catKey: string) => {
        const cat = CATEGORY_OPTIONS.find((c) => c.value === catKey) || CATEGORY_OPTIONS[1];
        const Icon = cat.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border ${cat.color}`}>
                <Icon className="w-3 h-3" />
                {cat.value}
            </span>
        );
    };

    return (
        <AdminLayout title="Kelola Mitra Kerjasama" siteConfig={siteConfig}>
            {/* 1. Header Banner */}
            <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold border border-[#B2EFC3] dark:border-[#1A5C2F]">
                        <Building2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                        <span>Mitra & Jaringan Kerjasama</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Mitra Kerjasama & Kolaborasi Industri
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                        Kelola data mitra industri, universitas rekanan, dan lembaga riset yang berkolaborasi dengan CoE STAS-RG.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Link
                        href="/#partners"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors shadow-xs"
                    >
                        <ExternalLink className="w-4 h-4 text-[#1AC13B]" />
                        <span>Lihat di Beranda</span>
                    </Link>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white font-bold text-xs shadow-xs transition-all cursor-pointer border-0"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Mitra Baru</span>
                    </button>
                </div>
            </div>

            {/* KPI Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Mitra</span>
                        <Building2 className="w-4 h-4 text-[#1AC13B]" />
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                        {stats.total}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">Instansi & Perusahaan</div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mitra Aktif</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                        {stats.active}
                    </div>
                    <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Ditampilkan di Beranda
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">BUMN & Industri</span>
                        <Landmark className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                        {stats.industry_soe}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">Sektor Manufaktur & Negara</div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mitra Utama</span>
                        <Sparkles className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                        {stats.featured}
                    </div>
                    <div className="mt-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                        Aliansi Strategis Unggulan
                    </div>
                </div>
            </div>

            {/* Filters & Search Toolbar */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari nama mitra, tipe kemitraan, deskripsi..."
                        className="w-full pl-9 pr-9 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B]"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('');
                                router.get(
                                    '/admin/partners',
                                    { category: selectedCategory, status: selectedStatus },
                                    { preserveState: true }
                                );
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </form>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Category Dropdown */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kategori:</span>
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryFilter(e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-[#1AC13B]"
                        >
                            <option value="all">Semua Kategori</option>
                            <option value="SOE">BUMN / SOE</option>
                            <option value="Industry">Industri Manufaktur</option>
                            <option value="Technology">Teknologi & Startup</option>
                            <option value="Academic">Akademik & Riset</option>
                            <option value="Government">Lembaga Pemerintah</option>
                        </select>
                    </div>

                    {/* Status Tabs */}
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                        {[
                            { key: 'all', label: 'Semua' },
                            { key: 'active', label: 'Aktif' },
                            { key: 'featured', label: 'Utama' },
                            { key: 'inactive', label: 'Nonaktif' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleStatusFilter(tab.key)}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                                    selectedStatus === tab.key
                                        ? 'bg-white dark:bg-slate-900 text-[#107E27] dark:text-[#3FD27B] shadow-sm'
                                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Partners Grid or Empty State */}
            {partners.length === 0 ? (
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
                        Tidak ada mitra kerjasama ditemukan
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Coba ubah kata kunci pencarian atau filter kategori, atau tambahkan mitra kerjasama baru.
                    </p>
                    <div>
                        <button
                            onClick={openCreateModal}
                            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold transition-colors cursor-pointer border-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Mitra Baru</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {partners.map((partner) => (
                        <motion.div
                            key={partner.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`rounded-xl bg-white dark:bg-slate-900 border p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#1AC13B]/60 ${
                                partner.is_active === false
                                    ? 'border-dashed border-slate-300 dark:border-slate-800 opacity-60'
                                    : partner.is_featured
                                    ? 'border-[#1AC13B]/40 dark:border-[#1AC13B]/30'
                                    : 'border-slate-200/90 dark:border-slate-800'
                            }`}
                        >
                            <div>
                                {/* Top Card Bar: Category, Status & Action Toggles */}
                                <div className="flex items-center justify-between mb-4">
                                    {getCategoryBadge(partner.category)}

                                    <div className="flex items-center gap-1">
                                        {/* Featured Toggle */}
                                        <button
                                            onClick={() => handleToggleFeatured(partner)}
                                            title={partner.is_featured ? 'Hapus dari Mitra Utama' : 'Jadikan Mitra Utama'}
                                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                                partner.is_featured
                                                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                                                    : 'text-slate-300 hover:text-slate-500 dark:hover:text-slate-300'
                                            }`}
                                        >
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                        </button>

                                        {/* Active Status Toggle */}
                                        <button
                                            onClick={() => handleToggleStatus(partner)}
                                            title={partner.is_active ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'}
                                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                                partner.is_active
                                                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                                                    : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                                            }`}
                                        >
                                            {partner.is_active ? (
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            ) : (
                                                <XCircle className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Logo Presentation Box */}
                                <div className="h-20 w-full rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-3 mb-4 group overflow-hidden">
                                    {partner.logo_url ? (
                                        <img
                                            src={partner.logo_url}
                                            alt={partner.name}
                                            className="max-h-12 max-w-[160px] object-contain transition-transform group-hover:scale-105 dark:brightness-0 dark:invert dark:opacity-90"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <span className="text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-300 text-center">
                                            {partner.logo_text || partner.name}
                                        </span>
                                    )}
                                </div>

                                {/* Partner Info */}
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                                        {partner.name}
                                    </h3>

                                    {partner.partnership_type && (
                                        <p className="mt-1 text-xs font-semibold text-[#107E27] dark:text-[#3FD27B]">
                                            {partner.partnership_type}
                                        </p>
                                    )}

                                    {partner.description_id || partner.description ? (
                                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                            {partner.description_id || partner.description}
                                        </p>
                                    ) : null}

                                    <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                                        {partner.established_year && (
                                            <span className="inline-flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-slate-400" />
                                                Mitra sejak {partner.established_year}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                {partner.website_url ? (
                                    <a
                                        href={partner.website_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                    >
                                        <Globe className="w-3 h-3" />
                                        <span>Website</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                ) : (
                                    <span className="text-[11px] text-slate-400">Urutan: #{partner.order || 0}</span>
                                )}

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => openEditModal(partner)}
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                        title="Edit Mitra"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(partner)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                                        title="Hapus Mitra"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Create / Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {editingPartner ? 'Edit Data Mitra' : 'Tambah Mitra Industri & Lembaga'}
                                    </h2>
                                    <p className="text-xs text-slate-400">
                                        Lengkapi data profil dan kolaborasi strategis mitra
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Modal Tabs */}
                            <div className="px-6 pt-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 text-xs font-bold">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('info')}
                                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
                                        activeTab === 'info'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    1. Informasi Instansi
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('logo')}
                                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
                                        activeTab === 'logo'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    2. Logo & Visual
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('desc')}
                                    className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
                                        activeTab === 'desc'
                                            ? 'border-[#1AC13B] text-[#107E27] dark:text-[#3FD27B]'
                                            : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                    }`}
                                >
                                    3. Deskripsi & Kolaborasi
                                </button>
                            </div>

                            {/* Modal Form Body */}
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                                {activeTab === 'info' && (
                                    <div className="space-y-4 animate-in fade-in duration-150">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Nama Instansi / Perusahaan <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Masukkan nama instansi atau perusahaan mitra..."
                                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                            {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Kategori Mitra <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={data.category}
                                                    onChange={(e) => setData('category', e.target.value)}
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                >
                                                    {CATEGORY_OPTIONS.map((cat) => (
                                                        <option key={cat.value} value={cat.value}>
                                                            {cat.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Tahun Kerjasama Dimulai
                                                </label>
                                                <input
                                                    type="number"
                                                    value={data.established_year}
                                                    onChange={(e) => setData('established_year', parseInt(e.target.value) || 2026)}
                                                    placeholder="2026"
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Fokus / Tipe Kemitraan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.partnership_type}
                                                onChange={(e) => setData('partnership_type', e.target.value)}
                                                placeholder="Masukkan fokus atau tipe kemitraan..."
                                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Teks Alternatif Logo (Fallback Text)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.logo_text}
                                                onChange={(e) => setData('logo_text', e.target.value)}
                                                placeholder="Masukkan teks alternatif logo..."
                                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'logo' && (
                                    <div className="space-y-4 animate-in fade-in duration-150">
                                        {/* Logo Live Preview */}
                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                Preview Tampilan Logo
                                            </span>
                                            <div className="h-16 w-48 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-2">
                                                {logoPreview ? (
                                                    <img
                                                        src={logoPreview}
                                                        alt="Preview"
                                                        className="max-h-12 max-w-full object-contain dark:brightness-0 dark:invert"
                                                    />
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-400">
                                                        Belum ada logo
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Logo Selector Type */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setLogoInputType('preset')}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                                    logoInputType === 'preset'
                                                        ? 'bg-[#EDFBF1] text-[#107E27] dark:bg-[#10381C] dark:text-[#3FD27B] border-[#1AC13B]'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                                }`}
                                            >
                                                Pilihan Logo Sistem
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setLogoInputType('upload')}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                                    logoInputType === 'upload'
                                                        ? 'bg-[#EDFBF1] text-[#107E27] dark:bg-[#10381C] dark:text-[#3FD27B] border-[#1AC13B]'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                                }`}
                                            >
                                                Upload File Baru
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setLogoInputType('url')}
                                                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                                    logoInputType === 'url'
                                                        ? 'bg-[#EDFBF1] text-[#107E27] dark:bg-[#10381C] dark:text-[#3FD27B] border-[#1AC13B]'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                                }`}
                                            >
                                                URL Gambar
                                            </button>
                                        </div>

                                        {logoInputType === 'preset' && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                                                {LOGO_PRESETS.map((preset) => (
                                                    <button
                                                        key={preset.path}
                                                        type="button"
                                                        onClick={() => {
                                                            setData('logo_url', preset.path);
                                                            setData('logo_file', null);
                                                            setLogoPreview(preset.path);
                                                        }}
                                                        className={`p-2.5 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                                            data.logo_url === preset.path
                                                                ? 'border-[#1AC13B] bg-[#EDFBF1]/50 dark:bg-[#10381C]/40 ring-1 ring-[#1AC13B]'
                                                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <img
                                                            src={preset.path}
                                                            alt={preset.label}
                                                            className="h-8 max-w-full object-contain dark:brightness-0 dark:invert"
                                                        />
                                                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate max-w-full">
                                                            {preset.label}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {logoInputType === 'upload' && (
                                            <div className="pt-2">
                                                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:border-[#1AC13B] transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/40">
                                                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        Klik untuk upload logo instansi
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

                                        {logoInputType === 'url' && (
                                            <div className="pt-2">
                                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                    Direct Image URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.logo_url}
                                                    onChange={(e) => {
                                                        setData('logo_url', e.target.value);
                                                        setLogoPreview(e.target.value);
                                                    }}
                                                    placeholder="https://example.com/logo.png"
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'desc' && (
                                    <div className="space-y-4 animate-in fade-in duration-150">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Ringkasan Kemitraan (Bahasa Indonesia)
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={data.description_id}
                                                onChange={(e) => setData('description_id', e.target.value)}
                                                placeholder="Deskripsikan ringkasan cakupan kemitraan riset..."
                                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Partnership Overview (English)
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="Describe partnership scope and collaborative research overview..."
                                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Website Resmi Mitra
                                            </label>
                                            <input
                                                type="url"
                                                value={data.website_url}
                                                onChange={(e) => setData('website_url', e.target.value)}
                                                placeholder="https://partner-website.com"
                                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                            <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={data.is_active}
                                                    onChange={(e) => setData('is_active', e.target.checked)}
                                                    className="w-4 h-4 text-[#1AC13B] rounded focus:ring-0 cursor-pointer"
                                                />
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                                    Status Aktif
                                                </span>
                                            </label>

                                            <label className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={data.is_featured}
                                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                                    className="w-4 h-4 text-[#1AC13B] rounded focus:ring-0 cursor-pointer"
                                                />
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                                    Mitra Utama
                                                </span>
                                            </label>

                                            <div>
                                                <input
                                                    type="number"
                                                    value={data.order}
                                                    onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                                    placeholder="Urutan Tampil"
                                                    className="w-full px-3 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Modal Footer */}
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {activeTab !== 'info' && (
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab(activeTab === 'desc' ? 'logo' : 'info')}
                                                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                            >
                                                Kembali
                                            </button>
                                        )}
                                        {activeTab !== 'desc' && (
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab(activeTab === 'info' ? 'logo' : 'desc')}
                                                className="px-3 py-2 rounded-xl text-xs font-bold text-[#107E27] dark:text-[#3FD27B] hover:bg-[#EDFBF1] dark:hover:bg-[#10381C] cursor-pointer"
                                            >
                                                Lanjut
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-5 py-2 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                                        >
                                            {processing
                                                ? 'Menyimpan...'
                                                : editingPartner
                                                ? 'Simpan Perubahan'
                                                : 'Tambah Mitra'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Custom AlertModal for Delete Confirmation */}
            <AlertModal
                isOpen={deleteModalOpen}
                type="danger"
                title="Hapus Data Mitra"
                message={`Apakah Anda yakin ingin menghapus mitra "${partnerToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Hapus Mitra"
                cancelText="Batal"
                onConfirm={handleDelete}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setPartnerToDelete(null);
                }}
            />
        </AdminLayout>
    );
}
