import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { EnterpriseService } from '../../../types';
import { Language } from '../../../utils/translations';
import { AlertModal } from '../../../Components/Common/AlertModal';
import { IconHelper } from '../../../Components/Common/IconHelper';
import {
    FlaskConical,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    ExternalLink,
    X,
    Globe2,
    Star,
    Award,
    Building2,
    UserCheck,
    TrendingUp,
    CheckCircle,
    ShieldCheck,
    Layers,
    Cpu,
    Zap,
    Sliders,
    Leaf,
    Truck,
    Brain,
    Recycle,
    Tag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServicesIndexProps {
    services: EnterpriseService[];
    stats: {
        total_services: number;
        active_services: number;
        featured_services: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
    siteConfig?: {
        center_name?: string;
        institution?: string;
    };
    status?: string;
}

const AVAILABLE_ICONS = [
    { name: 'FlaskConical', label: 'Custom R&D / Testing' },
    { name: 'TrendingUp', label: 'Supply Chain / Analytics' },
    { name: 'CheckCircle', label: 'Lab Validation / Quality' },
    { name: 'ShieldCheck', label: 'ESG / Audits / Security' },
    { name: 'Award', label: 'Executive Training / Talent' },
    { name: 'Layers', label: 'Commercialization / IP' },
    { name: 'Cpu', label: 'Industry 4.0 / Digital Twin' },
    { name: 'Zap', label: 'Renewable & Clean Energy' },
    { name: 'Truck', label: 'Logistics Optimization' },
    { name: 'Brain', label: 'Industrial AI / Machine Learning' },
    { name: 'Recycle', label: 'Circular Economy' },
    { name: 'Sliders', label: 'Automation & SCADA' },
];

export default function ServicesIndex({
    services,
    stats,
    filters,
    siteConfig,
    status,
}: ServicesIndexProps) {
    const [language, setLanguage] = useState<Language>('ID');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<EnterpriseService | null>(null);
    const [serviceToDelete, setServiceToDelete] = useState<EnterpriseService | null>(null);
    const [activeLangTab, setActiveLangTab] = useState<'ID' | 'EN'>('ID');

    // Filter states
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [newFeatureInput, setNewFeatureInput] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('stas_lang') as Language;
        if (saved === 'EN' || saved === 'ID') {
            setLanguage(saved);
        }
    }, []);

    const isEn = language === 'EN';

    // Form handler using Inertia useForm
    const form = useForm({
        service_number: '01',
        title: '',
        title_id: '',
        summary: '',
        summary_id: '',
        icon: 'FlaskConical',
        action_label: 'Explore Service',
        action_label_id: 'Pelajari Layanan',
        features: [] as string[],
        target_industry: '',
        lead_advisor: '',
        link: '#contact',
        is_featured: true,
        is_active: true,
        order: 1,
    });

    const openCreateModal = () => {
        setEditingService(null);
        const nextNumber = String((services.length || 0) + 1).padStart(2, '0');
        form.setData({
            service_number: nextNumber,
            title: '',
            title_id: '',
            summary: '',
            summary_id: '',
            icon: 'FlaskConical',
            action_label: 'Explore Service',
            action_label_id: 'Pelajari Layanan',
            features: ['Technical Feasibility Study', 'Prototype Validation', 'Executive Consultation'],
            target_industry: 'Manufacturing & Industrial Enterprises',
            lead_advisor: 'Dr. Ir. Hendra S.',
            link: '#contact',
            is_featured: true,
            is_active: true,
            order: (services.length || 0) + 1,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const openEditModal = (srv: EnterpriseService) => {
        setEditingService(srv);
        form.setData({
            service_number: srv.service_number,
            title: srv.title,
            title_id: srv.title_id || srv.title,
            summary: srv.summary,
            summary_id: srv.summary_id || srv.summary,
            icon: srv.icon,
            action_label: srv.action_label || 'Explore Service',
            action_label_id: srv.action_label_id || 'Pelajari Layanan',
            features: srv.features || [],
            target_industry: srv.target_industry || '',
            lead_advisor: srv.lead_advisor || '',
            link: srv.link || '#contact',
            is_featured: srv.is_featured ?? true,
            is_active: srv.is_active ?? true,
            order: srv.order || 1,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            form.put(`/admin/services/${editingService.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        } else {
            form.post('/admin/services', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        }
    };

    const handleDelete = () => {
        if (!serviceToDelete) return;
        router.delete(`/admin/services/${serviceToDelete.id}`, {
            onSuccess: () => setServiceToDelete(null),
        });
    };

    const handleToggleStatus = (srv: EnterpriseService) => {
        router.post(`/admin/services/${srv.id}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleToggleFeatured = (srv: EnterpriseService) => {
        router.post(`/admin/services/${srv.id}/toggle-featured`, {}, {
            preserveScroll: true,
        });
    };

    const handleAddFeature = (e: React.KeyboardEvent | React.MouseEvent) => {
        if ('key' in e && e.key !== 'Enter') return;
        e.preventDefault();
        const trimmed = newFeatureInput.trim();
        if (trimmed && !form.data.features.includes(trimmed)) {
            form.setData('features', [...form.data.features, trimmed]);
            setNewFeatureInput('');
        }
    };

    const handleRemoveFeature = (featureToRemove: string) => {
        form.setData(
            'features',
            form.data.features.filter((f) => f !== featureToRemove)
        );
    };

    const handleFilterChange = (newSearch: string, newStatus: string) => {
        setSearchQuery(newSearch);
        setStatusFilter(newStatus);
        router.get(
            '/admin/services',
            { search: newSearch, status: newStatus },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AdminLayout
            title={isEn ? 'Enterprise Services' : 'Kelola Layanan Industri'}
            siteConfig={siteConfig}
        >
            <div className="space-y-6">
                {/* 1. Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold">
                            <FlaskConical className="w-3.5 h-3.5" />
                            <span>{isEn ? 'Production-Ready Advisory & Testing' : 'Layanan Rekayasa & Konsultansi Siap Produksi'}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {isEn ? 'Enterprise & Industrial Advisory' : 'Layanan Kerjasama Industri'}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            {isEn
                                ? 'Configure specialized consultancy tracks, custom industrial R&D, certified lab testing, ESG audits, and technology commercialization at CoE STAS-RG.'
                                : 'Kelola portofolio layanan konsultansi, riset kustom R&D, pengujian laboratorium, audit ESG, dan komersialisasi teknologi di CoE STAS-RG.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/#services"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                        >
                            <ExternalLink className="w-4 h-4 text-[#1AC13B]" />
                            <span>{isEn ? 'View Live Section' : 'Lihat di Web'}</span>
                        </Link>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#16a331] text-white text-xs font-bold transition-all shadow-none cursor-pointer border-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{isEn ? 'Add Service' : 'Tambah Layanan Baru'}</span>
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
                            {isEn ? 'Total Services' : 'Total Layanan'}
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                            {stats.total_services}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Industrial service tracks' : 'Layanan konsultansi industri'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-[#107E27] dark:text-[#3FD27B] uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-[#1AC13B]" />
                            <span>{isEn ? 'Active & Published' : 'Aktif di Publik'}</span>
                        </div>
                        <div className="text-2xl font-black text-[#107E27] dark:text-[#1AC13B]">
                            {stats.active_services}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Visible on website' : 'Dapat diakses klien'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-amber-500" />
                            <span>{isEn ? 'Flagship Featured' : 'Layanan Utama'}</span>
                        </div>
                        <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
                            {stats.featured_services}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Featured on landing section' : 'Ditampilkan di beranda'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {isEn ? 'Language Support' : 'Dukungan Bahasa'}
                        </div>
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 mt-1">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs">ID</span>
                            <span className="text-slate-300">•</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs">EN</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Dual-language sync' : 'Sinkronisasi dwibahasa'}
                        </div>
                    </div>
                </div>

                {/* 3. Search & Filter Bar */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleFilterChange(e.target.value, statusFilter)}
                            placeholder={isEn ? 'Search by service name, number, advisor...' : 'Cari nama layanan, nomor 01-06, konsultan...'}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => handleFilterChange(searchQuery, e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#1AC13B] cursor-pointer"
                        >
                            <option value="">{isEn ? 'All Statuses' : 'Semua Status'}</option>
                            <option value="active">{isEn ? 'Active Only' : 'Hanya Aktif'}</option>
                            <option value="featured">{isEn ? 'Featured Only' : 'Hanya Utama'}</option>
                            <option value="inactive">{isEn ? 'Draft Only' : 'Hanya Non-Aktif'}</option>
                        </select>
                    </div>
                </div>

                {/* 4. Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.04 }}
                            className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between group ${
                                service.is_active
                                    ? 'border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/70'
                                    : 'border-slate-200/50 dark:border-slate-800/50 opacity-60 bg-slate-50/50 dark:bg-slate-900/40'
                            }`}
                        >
                            <div className="space-y-4">
                                {/* Top Badges: Service Number & Icon */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-10 h-10 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center font-black text-sm group-hover:bg-[#1AC13B] group-hover:text-white transition-colors shrink-0">
                                            {service.service_number}
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                                            <IconHelper name={service.icon} className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Quick Status switches */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleFeatured(service)}
                                            title={service.is_featured ? 'Featured Service' : 'Mark as Featured'}
                                            className={`p-1.5 rounded-lg transition-colors cursor-pointer border-0 ${
                                                service.is_featured
                                                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                            }`}
                                        >
                                            <Star className={`w-3.5 h-3.5 ${service.is_featured ? 'fill-current' : ''}`} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleToggleStatus(service)}
                                            title={service.is_active ? 'Published' : 'Draft'}
                                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer border-0 ${
                                                service.is_active
                                                    ? 'bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B]'
                                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                            }`}
                                        >
                                            {service.is_active ? (isEn ? 'Live' : 'Aktif') : 'Draft'}
                                        </button>
                                    </div>
                                </div>

                                {/* Title (Bilingual) */}
                                <div className="space-y-1">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors leading-snug">
                                        {service.title_id || service.title}
                                    </h3>
                                    {service.title_id && service.title !== service.title_id && (
                                        <div className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                                            EN: {service.title}
                                        </div>
                                    )}
                                </div>

                                {/* Summary */}
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                    {service.summary_id || service.summary}
                                </p>

                                {/* Deliverables / Features Tags */}
                                {service.features && service.features.length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-1">
                                        {service.features.map((feat, fIdx) => (
                                            <span
                                                key={fIdx}
                                                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300"
                                            >
                                                {feat}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Metadata: Target Industry & Advisor */}
                                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                                    {service.target_industry && (
                                        <div className="flex items-center gap-1.5">
                                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <span className="truncate">{service.target_industry}</span>
                                        </div>
                                    )}
                                    {service.lead_advisor && (
                                        <div className="flex items-center gap-1.5">
                                            <UserCheck className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                            <span className="truncate">{service.lead_advisor}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Card Actions */}
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                <span className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B]">
                                    {service.action_label_id || service.action_label || 'Pelajari Layanan'}
                                </span>

                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(service)}
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-0"
                                        title={isEn ? 'Edit Service' : 'Ubah Layanan'}
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setServiceToDelete(service)}
                                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer border-0"
                                        title={isEn ? 'Delete Service' : 'Hapus Layanan'}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 5. Create / Edit Service Modal Dialog */}
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
                                            {editingService
                                                ? (isEn ? 'Edit Enterprise Service' : 'Ubah Layanan Industri')
                                                : (isEn ? 'Add Enterprise Service' : 'Tambah Layanan Industri Baru')}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            {isEn
                                                ? 'Configure industrial consultancy tracks, deliverables, advisor profiles, and action anchors.'
                                                : 'Konfigurasi informasi layanan industri, cakupan deliverables, konsultan penanggung jawab, dan aksi konsultansi.'}
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
                                    {/* Number, Icon & Order Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Service Number' : 'Nomor Layanan'} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.service_number}
                                                onChange={(e) => form.setData('service_number', e.target.value)}
                                                placeholder="01, 02, 03..."
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-black text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Display Order' : 'Urutan Tampil'}
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={form.data.order}
                                                onChange={(e) => form.setData('order', parseInt(e.target.value) || 1)}
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Action Link Anchor' : 'Tautan Aksi / Anchor'}
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.link}
                                                onChange={(e) => form.setData('link', e.target.value)}
                                                placeholder="#contact or #services"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>

                                    {/* Icon Picker */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            {isEn ? 'Representation Icon' : 'Ikon Representasi Layanan'} *
                                        </label>
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                            {AVAILABLE_ICONS.map((ico) => {
                                                const isSelected = form.data.icon === ico.name;
                                                return (
                                                    <button
                                                        key={ico.name}
                                                        type="button"
                                                        onClick={() => form.setData('icon', ico.name)}
                                                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                                                            isSelected
                                                                ? 'border-[#1AC13B] bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] ring-2 ring-[#1AC13B]/20'
                                                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                                        }`}
                                                        title={ico.label}
                                                    >
                                                        <IconHelper name={ico.name} className="w-4 h-4" />
                                                        <span className="text-[10px] font-bold truncate max-w-full">
                                                            {ico.name}
                                                        </span>
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
                                                    {isEn ? 'Bilingual Service Definition' : 'Definisi Layanan Dwibahasa'}
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
                                                        Nama Layanan Industri (ID) *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={form.data.title_id}
                                                        onChange={(e) => form.setData('title_id', e.target.value)}
                                                        placeholder="contoh: R&D Industri Kustom, Konsultasi Rantai Pasok"
                                                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Deskripsi & Cakupan Layanan (ID) *
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        required
                                                        value={form.data.summary_id}
                                                        onChange={(e) => form.setData('summary_id', e.target.value)}
                                                        placeholder="contoh: Riset rekayasa khusus, pengembangan prototipe, dan validasi teknis untuk tantangan manufaktur yang kompleks."
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Teks Tombol Aksi (ID)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={form.data.action_label_id}
                                                        onChange={(e) => form.setData('action_label_id', e.target.value)}
                                                        placeholder="Pelajari Layanan"
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            /* English Content Fields */
                                            <div className="space-y-3.5">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Service Track Title (EN) *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={form.data.title}
                                                        onChange={(e) => form.setData('title', e.target.value)}
                                                        placeholder="e.g. Custom Industrial R&D, Supply Chain Advisory"
                                                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Service Scope & Summary (EN) *
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        required
                                                        value={form.data.summary}
                                                        onChange={(e) => form.setData('summary', e.target.value)}
                                                        placeholder="e.g. Tailored engineering research, prototype development, and technical validation for complex manufacturing challenges."
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Action Button Text (EN)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={form.data.action_label}
                                                        onChange={(e) => form.setData('action_label', e.target.value)}
                                                        placeholder="Explore Service"
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Features / Deliverables Manager */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                            {isEn ? 'Key Deliverables & Methodologies' : 'Cakupan Deliverables & Metodologi Layanan'}
                                        </label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={newFeatureInput}
                                                onChange={(e) => setNewFeatureInput(e.target.value)}
                                                onKeyDown={handleAddFeature}
                                                placeholder={isEn ? 'Type deliverable (e.g. Rapid Prototyping) and press Add' : 'Ketik deliverable (contoh: Uji Stres Material) lalu tekan Tambah'}
                                                className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddFeature}
                                                className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-[#EDFBF1] hover:text-[#107E27] text-xs font-bold transition-colors cursor-pointer border-0"
                                            >
                                                {isEn ? 'Add' : 'Tambah'}
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                            {form.data.features.length === 0 ? (
                                                <span className="text-[11px] text-slate-400 italic">
                                                    {isEn ? 'No deliverables added yet.' : 'Belum ada deliverables yang ditambahkan.'}
                                                </span>
                                            ) : (
                                                form.data.features.map((feat, fIdx) => (
                                                    <span
                                                        key={fIdx}
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200"
                                                    >
                                                        <span>{feat}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFeature(feat)}
                                                            className="text-slate-400 hover:text-red-500 cursor-pointer border-0 bg-transparent p-0"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Target Industry & Advisor Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Target Industry Sector' : 'Sektor Target Industri'}
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.target_industry}
                                                onChange={(e) => form.setData('target_industry', e.target.value)}
                                                placeholder="e.g. Automotive & Heavy Manufacturing"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Lead Advisor / Coordinator' : 'Konsultan Penanggung Jawab'}
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.lead_advisor}
                                                onChange={(e) => form.setData('lead_advisor', e.target.value)}
                                                placeholder="e.g. Dr. Ir. Hendra S."
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
                                                    {isEn ? 'Showcase as Flagship Track' : 'Jadikan Layanan Utama'}
                                                </span>
                                                <span className="text-[10px] text-slate-500">
                                                    {isEn ? 'Highlighted on home page' : 'Disorot di beranda utama'}
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
                                                    {form.data.is_active ? (isEn ? 'Published & Active' : 'Publikasikan (Aktif)') : (isEn ? 'Save as Draft' : 'Simpan sebagai Draft')}
                                                </span>
                                                <span className="text-[10px] text-slate-500">
                                                    {isEn ? 'Visible on website' : 'Dapat diakses publik'}
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
                                                : editingService
                                                    ? (isEn ? 'Update Service' : 'Perbarui Layanan')
                                                    : (isEn ? 'Save Service' : 'Simpan Layanan')}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* 6. Delete Confirmation Modal (Custom Alert Template) */}
                <AlertModal
                    isOpen={!!serviceToDelete}
                    onClose={() => setServiceToDelete(null)}
                    onConfirm={handleDelete}
                    type="danger"
                    title={isEn ? 'Delete Enterprise Service?' : 'Hapus Layanan Industri Ini?'}
                    message={
                        serviceToDelete ? (
                            isEn ? (
                                `Are you sure you want to delete "${serviceToDelete.title}"? This action cannot be undone.`
                            ) : (
                                `Apakah Anda yakin ingin menghapus layanan "${serviceToDelete.title_id || serviceToDelete.title}"? Tindakan ini tidak dapat dibatalkan.`
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
