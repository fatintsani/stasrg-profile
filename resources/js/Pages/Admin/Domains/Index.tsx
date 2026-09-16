import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { ResearchDomain } from '../../../types';
import { IconHelper } from '../../../Components/Common/IconHelper';
import { Language } from '../../../utils/translations';
import { AlertModal } from '../../../Components/Common/AlertModal';
import {
    Layers,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    AlertCircle,
    X,
    ExternalLink,
    Filter,
    Check,
    ArrowUpDown,
    Eye,
    EyeOff,
    Sparkles,
    UserCheck,
    Tag,
    Globe2,
    Sliders,
    Zap,
    Cpu,
    Leaf,
    Truck,
    Brain,
    Recycle,
    FlaskConical,
    Network,
    Building2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DomainsIndexProps {
    domains: ResearchDomain[];
    stats: {
        total_domains: number;
        active_domains: number;
        inactive_domains: number;
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
    { name: 'Leaf', label: 'Green / Sustainability' },
    { name: 'Cpu', label: 'Smart Manufacturing / Computing' },
    { name: 'Truck', label: 'Logistics / Supply Chain' },
    { name: 'Brain', label: 'AI & Data Science' },
    { name: 'Recycle', label: 'Circular Economy / Waste' },
    { name: 'Zap', label: 'Renewable Energy / Smart Grid' },
    { name: 'UserCheck', label: 'Ergonomics & Human Factors' },
    { name: 'Sliders', label: 'Automation & SCADA' },
    { name: 'Layers', label: 'Multidisciplinary System' },
    { name: 'FlaskConical', label: 'Laboratory / Materials' },
    { name: 'Network', label: 'IoT & Telemetry' },
    { name: 'Building2', label: 'Enterprise / Factory' },
];

export default function DomainsIndex({
    domains = [],
    stats,
    filters,
    siteConfig,
    status,
}: DomainsIndexProps) {
    const [language, setLanguage] = useState<Language>('EN');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDomain, setEditingDomain] = useState<ResearchDomain | null>(null);
    const [domainToDelete, setDomainToDelete] = useState<ResearchDomain | null>(null);
    const [activeLangTab, setActiveLangTab] = useState<'EN' | 'ID'>('ID');
    const [newTagInput, setNewTagInput] = useState('');

    useEffect(() => {
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }
    }, []);

    const isEn = language === 'EN';

    // Inertia Form for Create/Update
    const form = useForm({
        domain_number: '01 / DOMAIN',
        title: '',
        title_id: '',
        slug: '',
        icon: 'Leaf',
        summary: '',
        summary_id: '',
        focus_areas: [] as string[],
        lead_researcher: '',
        link: '#',
        order: (domains.length || 0) + 1,
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingDomain(null);
        form.reset();
        form.clearErrors();
        const nextOrder = domains.length + 1;
        const formattedNumber = nextOrder < 10 ? `0${nextOrder} / DOMAIN` : `${nextOrder} / DOMAIN`;
        form.setData({
            domain_number: formattedNumber,
            title: '',
            title_id: '',
            slug: '',
            icon: 'Leaf',
            summary: '',
            summary_id: '',
            focus_areas: [],
            lead_researcher: '',
            link: '#',
            order: nextOrder,
            is_active: true,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const openEditModal = (domain: ResearchDomain) => {
        setEditingDomain(domain);
        form.clearErrors();
        form.setData({
            domain_number: domain.domain_number,
            title: domain.title,
            title_id: domain.title_id || domain.title,
            slug: domain.slug,
            icon: domain.icon,
            summary: domain.summary,
            summary_id: domain.summary_id || domain.summary,
            focus_areas: domain.focus_areas || [],
            lead_researcher: domain.lead_researcher || '',
            link: domain.link || '#',
            order: domain.order || 1,
            is_active: domain.is_active ?? true,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const titleFinal = form.data.title || form.data.title_id;
        const titleIdFinal = form.data.title_id || form.data.title;
        const summaryFinal = form.data.summary || form.data.summary_id;
        const summaryIdFinal = form.data.summary_id || form.data.summary;

        form.transform((data) => ({
            ...data,
            title: titleFinal,
            title_id: titleIdFinal,
            summary: summaryFinal,
            summary_id: summaryIdFinal,
        }));

        if (editingDomain) {
            form.put(`/admin/domains/${editingDomain.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        } else {
            form.post('/admin/domains', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        }
    };

    const handleDelete = () => {
        if (!domainToDelete) return;
        router.delete(`/admin/domains/${domainToDelete.id}`, {
            onSuccess: () => setDomainToDelete(null),
        });
    };

    const handleToggleStatus = (domain: ResearchDomain) => {
        router.post(`/admin/domains/${domain.id}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleAddFocusTag = (e: React.KeyboardEvent | React.MouseEvent) => {
        if ('key' in e && e.key !== 'Enter') return;
        e.preventDefault();
        const trimmed = newTagInput.trim();
        if (trimmed && !form.data.focus_areas.includes(trimmed)) {
            form.setData('focus_areas', [...form.data.focus_areas, trimmed]);
            setNewTagInput('');
        }
    };

    const handleRemoveFocusTag = (tagToRemove: string) => {
        form.setData(
            'focus_areas',
            form.data.focus_areas.filter((tag) => tag !== tagToRemove)
        );
    };

    const handleFilterChange = (newSearch: string, newStatus: string) => {
        setSearchQuery(newSearch);
        setStatusFilter(newStatus);
        router.get(
            '/admin/domains',
            { search: newSearch, status: newStatus },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AdminLayout
            title={isEn ? 'Research Focus Domains' : 'Kelola Domain Riset'}
            siteConfig={siteConfig}
        >
            <div className="space-y-6">
                {/* 1. Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold">
                            <Layers className="w-3.5 h-3.5" />
                            <span>{isEn ? 'Multidisciplinary Scientific Clusters' : 'Klaster Riset Multidisiplin'}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {isEn ? 'Research Focus Domains' : 'Domain Ilmiah Multidisiplin'}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            {isEn
                                ? 'Configure the specialized research divisions driving sustainable engineering, smart manufacturing, and applied industrial innovation at CoE STAS-RG.'
                                : 'Kelola divisi riset terspesialisasi yang mendorong inovasi rekayasa berkelanjutan, manufaktur cerdas, dan komputasi industri di CoE STAS-RG.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/#domains"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                        >
                            <ExternalLink className="w-4 h-4 text-[#1AC13B]" />
                            <span>{isEn ? 'Preview Section' : 'Lihat di Web'}</span>
                        </Link>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#16a331] text-white text-xs font-bold transition-all shadow-none cursor-pointer border-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{isEn ? 'Add Focus Domain' : 'Tambah Domain Baru'}</span>
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
                            {isEn ? 'Total Domains' : 'Total Domain'}
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                            {stats.total_domains}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? '8 Core strategic clusters' : '8 Klaster strategis utama'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-[#107E27] dark:text-[#3FD27B] uppercase tracking-wider">
                            {isEn ? 'Active & Published' : 'Aktif di Publik'}
                        </div>
                        <div className="text-2xl font-black text-[#107E27] dark:text-[#1AC13B]">
                            {stats.active_domains}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Displayed on landing page' : 'Tampil di beranda utama'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                            {isEn ? 'Draft / Inactive' : 'Non-Aktif / Draft'}
                        </div>
                        <div className="text-2xl font-black text-slate-700 dark:text-slate-300">
                            {stats.inactive_domains}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Hidden from public view' : 'Disembunyikan dari publik'}
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
                            {isEn ? 'Full dual-language sync' : 'Sinkronisasi dwibahasa penuh'}
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
                            placeholder={isEn ? 'Search by title, domain number, keywords...' : 'Cari domain riset, nomor, kata kunci...'}
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
                            <option value="inactive">{isEn ? 'Inactive Only' : 'Hanya Non-Aktif'}</option>
                        </select>

                        <button
                            onClick={openCreateModal}
                            className="sm:hidden w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1AC13B] text-white text-xs font-bold"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{isEn ? 'Add' : 'Tambah'}</span>
                        </button>
                    </div>
                </div>

                {/* 4. Domain Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {domains.map((domain, index) => (
                        <motion.div
                            key={domain.id}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between group ${
                                domain.is_active
                                    ? 'border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/70'
                                    : 'border-slate-200/50 dark:border-slate-800/50 opacity-60 bg-slate-50/50 dark:bg-slate-900/40'
                            }`}
                        >
                            <div className="space-y-3.5">
                                {/* Top Badges & Actions */}
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-9 h-9 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#1AC13B] group-hover:text-white transition-colors">
                                            <IconHelper name={domain.icon} className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                {domain.domain_number}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Active Toggle Switch */}
                                    <button
                                        onClick={() => handleToggleStatus(domain)}
                                        title={domain.is_active ? 'Click to disable' : 'Click to enable'}
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer border-0 flex items-center gap-1 ${
                                            domain.is_active
                                                ? 'bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B]'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${domain.is_active ? 'bg-[#1AC13B]' : 'bg-slate-400'}`} />
                                        <span>{domain.is_active ? (isEn ? 'Active' : 'Aktif') : (isEn ? 'Draft' : 'Draft')}</span>
                                    </button>
                                </div>

                                {/* Titles (ID & EN) */}
                                <div className="space-y-1">
                                    <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                                        {domain.title_id || domain.title}
                                    </div>
                                    {domain.title_id && domain.title !== domain.title_id && (
                                        <div className="text-[11px] text-slate-400 dark:text-slate-500 italic line-clamp-1">
                                            EN: {domain.title}
                                        </div>
                                    )}
                                </div>

                                {/* Summary */}
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                    {domain.summary_id || domain.summary}
                                </p>

                                {/* Focus Areas Tag Pills */}
                                {domain.focus_areas && domain.focus_areas.length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-1">
                                        {domain.focus_areas.map((tag, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[10px] font-medium text-slate-600 dark:text-slate-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Lead Researcher */}
                                {domain.lead_researcher && (
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                                        <UserCheck className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                        <span className="truncate">{domain.lead_researcher}</span>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Card Actions */}
                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-mono">
                                    #{domain.order} • /{domain.slug}
                                </span>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => openEditModal(domain)}
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-0"
                                        title={isEn ? 'Edit Domain' : 'Ubah Domain'}
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setDomainToDelete(domain)}
                                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer border-0"
                                        title={isEn ? 'Delete Domain' : 'Hapus Domain'}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 5. Create / Edit Modal Dialog */}
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

                            {/* Modal Content Box */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
                            >
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                            {editingDomain
                                                ? (isEn ? 'Edit Research Domain' : 'Ubah Domain Riset')
                                                : (isEn ? 'Create New Research Domain' : 'Tambah Domain Riset Baru')}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            {isEn ? 'Configure multidisciplinary scientific focus and metadata.' : 'Konfigurasi informasi ilmiah, ikon, dan fokus riset domain.'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-0"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleFormSubmit} className="space-y-5">
                                    {/* Form Error Banner */}
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

                                    {/* Domain Number & Order & Status Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Domain Number' : 'Nomor Domain'} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.domain_number}
                                                onChange={(e) => form.setData('domain_number', e.target.value)}
                                                placeholder="01 / DOMAIN"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                            {form.errors.domain_number && (
                                                <p className="mt-1 text-[11px] text-red-500">{form.errors.domain_number}</p>
                                            )}
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
                                                {isEn ? 'Publication Status' : 'Status Publikasi'}
                                            </label>
                                            <label className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer h-[39px]">
                                                <input
                                                    type="checkbox"
                                                    checked={form.data.is_active}
                                                    onChange={(e) => form.setData('is_active', e.target.checked)}
                                                    className="w-4 h-4 rounded text-[#1AC13B] focus:ring-[#1AC13B] cursor-pointer"
                                                />
                                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                    {form.data.is_active ? (isEn ? 'Published' : 'Aktif') : (isEn ? 'Draft' : 'Draft')}
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Icon Picker */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            {isEn ? 'Scientific Icon' : 'Ikon Representasi Domain'} *
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
                                                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
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
                                        {form.errors.icon && (
                                            <p className="mt-1 text-[11px] text-red-500">{form.errors.icon}</p>
                                        )}
                                    </div>

                                    {/* Language Switch Tabs for Content */}
                                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                                            <div className="flex items-center gap-2">
                                                <Globe2 className="w-4 h-4 text-[#1AC13B]" />
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                    {isEn ? 'Bilingual Content Definition' : 'Definisi Konten Dwibahasa'}
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
                                                    {(form.errors.title_id || form.errors.summary_id) && (
                                                        <span className="ml-1 text-red-500 font-black">•</span>
                                                    )}
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
                                                    {(form.errors.title || form.errors.summary) && (
                                                        <span className="ml-1 text-red-500 font-black">•</span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {activeLangTab === 'ID' ? (
                                            /* Indonesian Form Fields */
                                            <div className="space-y-3.5">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Judul Domain Riset (ID) *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={form.data.title_id}
                                                        onChange={(e) => form.setData('title_id', e.target.value)}
                                                        placeholder="contoh: Teknologi Berkelanjutan & Sistem Hijau"
                                                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                    {(form.errors.title_id || form.errors.title) && (
                                                        <p className="mt-1 text-[11px] text-red-500">
                                                            {form.errors.title_id || form.errors.title}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Ringkasan / Cakupan Riset (ID) *
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        value={form.data.summary_id}
                                                        onChange={(e) => form.setData('summary_id', e.target.value)}
                                                        placeholder="contoh: Kerangka eko-efisiensi, analisis siklus hidup karbon, dan material sirkular."
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                    {(form.errors.summary_id || form.errors.summary) && (
                                                        <p className="mt-1 text-[11px] text-red-500">
                                                            {form.errors.summary_id || form.errors.summary}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            /* English Form Fields */
                                            <div className="space-y-3.5">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Research Domain Title (EN) *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={form.data.title}
                                                        onChange={(e) => form.setData('title', e.target.value)}
                                                        placeholder="e.g. Sustainable Technology & Green Systems"
                                                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                    {(form.errors.title || form.errors.title_id) && (
                                                        <p className="mt-1 text-[11px] text-red-500">
                                                            {form.errors.title || form.errors.title_id}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Research Summary & Scope (EN) *
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        value={form.data.summary}
                                                        onChange={(e) => form.setData('summary', e.target.value)}
                                                        placeholder="e.g. Eco-efficiency frameworks, carbon lifecycle analysis, and circular materials development."
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                    {(form.errors.summary || form.errors.summary_id) && (
                                                        <p className="mt-1 text-[11px] text-red-500">
                                                            {form.errors.summary || form.errors.summary_id}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Focus Areas Sub-tags Manager */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                            {isEn ? 'Specialized Focus Areas / Topics' : 'Sub-Topik / Bidang Spesialisasi Riset'}
                                        </label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={newTagInput}
                                                onChange={(e) => setNewTagInput(e.target.value)}
                                                onKeyDown={handleAddFocusTag}
                                                placeholder={isEn ? 'Type focus topic (e.g. Digital Twins) and press Add' : 'Ketik sub-topik (contoh: Analisis Siklus Karbon) lalu tekan Tambah'}
                                                className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddFocusTag}
                                                className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-[#EDFBF1] hover:text-[#107E27] text-xs font-bold transition-colors cursor-pointer border-0"
                                            >
                                                {isEn ? 'Add Tag' : 'Tambah'}
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                            {form.data.focus_areas.length === 0 ? (
                                                <span className="text-[11px] text-slate-400 italic">
                                                    {isEn ? 'No focus tags added yet.' : 'Belum ada tag topik yang ditambahkan.'}
                                                </span>
                                            ) : (
                                                form.data.focus_areas.map((tag, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200"
                                                    >
                                                        <span>{tag}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFocusTag(tag)}
                                                            className="text-slate-400 hover:text-red-500 cursor-pointer border-0 bg-transparent p-0"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Lead Researcher & Action Link Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Lead Researcher / Coordinator' : 'Ketua Peneliti / Koordinator'}
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.lead_researcher}
                                                onChange={(e) => form.setData('lead_researcher', e.target.value)}
                                                placeholder="e.g. Dr. Ir. Wahyu H., M.T."
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Detail External / Anchor Link' : 'Tautan Detail / Anchor'}
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.link}
                                                onChange={(e) => form.setData('link', e.target.value)}
                                                placeholder="#domains"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Buttons */}
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
                                                : editingDomain
                                                    ? (isEn ? 'Update Domain' : 'Perbarui Domain')
                                                    : (isEn ? 'Create Domain' : 'Simpan Domain')}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* 6. Delete Confirmation Modal (Custom Alert Template) */}
                <AlertModal
                    isOpen={!!domainToDelete}
                    onClose={() => setDomainToDelete(null)}
                    onConfirm={handleDelete}
                    type="danger"
                    title={isEn ? 'Hapus Domain Riset Ini?' : 'Hapus Domain Riset Ini?'}
                    message={
                        domainToDelete ? (
                            isEn ? (
                                `Are you sure you want to delete "${domainToDelete.title}"? This action cannot be undone.`
                            ) : (
                                `Apakah Anda yakin ingin menghapus "${domainToDelete.title_id || domainToDelete.title}"? Tindakan ini tidak dapat dibatalkan.`
                            )
                        ) : (
                            ''
                        )
                    }
                    confirmText={isEn ? 'Ya, Hapus' : 'Ya, Hapus'}
                    cancelText={isEn ? 'Batal' : 'Batal'}
                />
            </div>
        </AdminLayout>
    );
}
