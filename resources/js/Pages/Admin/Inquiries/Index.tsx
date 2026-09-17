import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Inquiry } from '../../../types';
import { router } from '@inertiajs/react';
import {
    Mail,
    Search,
    Trash2,
    CheckCircle2,
    Clock,
    AlertCircle,
    Building2,
    Phone,
    User,
    Calendar,
    Send,
    Eye,
    MessageSquare,
    Sparkles,
    ExternalLink,
    Copy,
    RefreshCw,
    X,
    FileText,
    Laptop,
    Users,
    Table as TableIcon,
    LayoutGrid,
    ShieldAlert,
    Award
} from 'lucide-react';
import { AlertModal } from '../../../Components/Common/AlertModal';

interface Stats {
    total: number;
    unread: number;
    in_progress: number;
    resolved: number;
    urgent: number;
}

interface InquiriesIndexProps {
    inquiries: Inquiry[];
    stats: Stats;
    filters: {
        search?: string;
        status?: string;
        category?: string;
        priority?: string;
    };
}

const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
    collaboration: {
        label: 'Kemitraan & MoU',
        color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        icon: Building2
    },
    research: {
        label: 'Riset & Hibah',
        color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        icon: Sparkles
    },
    enterprise: {
        label: 'Industri & Pengujian',
        color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
        icon: Laptop
    },
    academic: {
        label: 'Akademik & MBKM',
        color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        icon: Users
    },
    general: {
        label: 'Pertanyaan Umum',
        color: 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        icon: MessageSquare
    }
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
    unread: {
        label: 'Pesan Baru',
        color: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800'
    },
    in_progress: {
        label: 'Sedang Diproses',
        color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    },
    resolved: {
        label: 'Selesai',
        color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    },
    archived: {
        label: 'Diarsipkan',
        color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
    }
};

const PRIORITY_CONFIG: Record<string, { label: string; badge: string }> = {
    normal: {
        label: 'Biasa',
        badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
    },
    high: {
        label: 'Tinggi',
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold'
    },
    urgent: {
        label: 'Mendesak',
        badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold'
    }
};

export default function InquiriesIndex({
    inquiries = [],
    stats = { total: 0, unread: 0, in_progress: 0, resolved: 0, urgent: 0 },
    filters = {}
}: InquiriesIndexProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || 'all');
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

    // Modal states
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [adminNotes, setAdminNotes] = useState('');
    const [isSavingNotes, setIsSavingNotes] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    // Delete modal
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);

    // Filter inquiries locally for fast interactive search & filter
    const filteredInquiries = useMemo(() => {
        return inquiries.filter((inq) => {
            const matchesSearch =
                !searchQuery ||
                inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inq.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (inq.organization && inq.organization.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
            const matchesCategory = categoryFilter === 'all' || inq.category === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [inquiries, searchQuery, statusFilter, categoryFilter]);

    const handleOpenDetail = (inq: Inquiry) => {
        setSelectedInquiry(inq);
        setAdminNotes(inq.admin_notes || '');
        setIsDetailModalOpen(true);

        if (inq.status === 'unread') {
            router.patch(`/admin/inquiries/${inq.id}/status`, { status: 'in_progress' }, { preserveScroll: true });
        }
    };

    const handleUpdateStatus = (inqId: number, newStatus: string) => {
        router.patch(`/admin/inquiries/${inqId}/status`, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedInquiry && selectedInquiry.id === inqId) {
                    setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
                }
            }
        });
    };

    const handleSaveNotes = () => {
        if (!selectedInquiry) return;
        setIsSavingNotes(true);
        router.put(`/admin/inquiries/${selectedInquiry.id}`, {
            admin_notes: adminNotes,
            status: selectedInquiry.status,
            priority: selectedInquiry.priority
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSavingNotes(false);
                setSelectedInquiry({ ...selectedInquiry, admin_notes: adminNotes });
            },
            onError: () => {
                setIsSavingNotes(false);
            }
        });
    };

    const handleDeleteConfirm = () => {
        if (!inquiryToDelete) return;
        router.delete(`/admin/inquiries/${inquiryToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModalOpen(false);
                if (selectedInquiry?.id === inquiryToDelete.id) {
                    setIsDetailModalOpen(false);
                }
                setInquiryToDelete(null);
            }
        });
    };

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleReplyEmail = (inq: Inquiry) => {
        const subject = encodeURIComponent(`Re: [STAS-RG] ${inq.subject}`);
        const body = encodeURIComponent(
            `Halo ${inq.name},\n\nTerima kasih telah menghubungi Center of Excellence Smart Telecommunication & Autonomous System (CoE STAS-RG) Telkom University mengenai "${inq.subject}".\n\n---\nSalam hormat,\nTim Sekretariat CoE STAS-RG\nTelkom University Bandung`
        );
        window.location.href = `mailto:${inq.email}?subject=${subject}&body=${body}`;
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* 1. HEADER CARD (Matching Admin Standard) */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2.5">
                            <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Pesan & Hubungan Kemitraan</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Pesan & Kontak Masuk
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                            Kelola siaran pesan kegiatan riset, permohonan kerjasama industri, pengajuan magang MBKM, dan permohonan informasi publik CoE STAS-RG.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href="/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 shadow-sm transition-all"
                        >
                            <ExternalLink className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>Lihat di Beranda</span>
                        </a>
                        <button
                            onClick={() => router.reload()}
                            className="px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh Data</span>
                        </button>
                    </div>
                </div>

                {/* 2. 4-COLUMN KPI METRIC CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* TOTAL PESAN */}
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                TOTAL PESAN
                            </span>
                            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                                <Mail className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                            {stats.total}
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5">
                            Semua Pesan Masuk
                        </p>
                    </div>

                    {/* PESAN BARU */}
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                PESAN BARU
                            </span>
                            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
                            {stats.unread}
                        </div>
                        <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-1.5 font-medium">
                            Memerlukan Tinjauan Awal
                        </p>
                    </div>

                    {/* SEDANG DIPROSES */}
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                SEDANG DIPROSES
                            </span>
                            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                                <Sparkles className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-2">
                            {stats.in_progress}
                        </div>
                        <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1.5 font-medium">
                            Dalam Tindak Lanjut Tim
                        </p>
                    </div>

                    {/* PESAN SELESAI */}
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                PESAN SELESAI
                            </span>
                            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                                <Award className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
                            {stats.resolved}
                        </div>
                        <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1.5 font-medium">
                            Telah Ditanggapi & Tuntas
                        </p>
                    </div>
                </div>

                {/* 3. SEARCH & FILTER CONTROLS TOOLBAR */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Search Input (Left) */}
                    <div className="relative flex-1 md:max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama pengirim, email, instansi, atau tag..."
                            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1AC13B]"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Inline Filter Controls (Right) */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 whitespace-nowrap">
                                KATEGORI:
                            </span>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1AC13B]"
                            >
                                <option value="all">Semua Kategori</option>
                                <option value="collaboration">Kemitraan & MoU</option>
                                <option value="research">Riset & Hibah</option>
                                <option value="enterprise">Industri & Pengujian</option>
                                <option value="academic">Akademik & MBKM</option>
                                <option value="general">Pertanyaan Umum</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 whitespace-nowrap">
                                STATUS:
                            </span>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1AC13B]"
                            >
                                <option value="all">Semua Status</option>
                                <option value="unread">Pesan Baru</option>
                                <option value="in_progress">Sedang Diproses</option>
                                <option value="resolved">Selesai</option>
                                <option value="archived">Diarsipkan</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-3">
                            <button
                                onClick={() => setViewMode('cards')}
                                className={`p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                                    viewMode === 'cards'
                                        ? 'bg-[#1AC13B] text-white border-[#1AC13B] shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                }`}
                                title="Tampilan Kartu"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                                    viewMode === 'table'
                                        ? 'bg-[#1AC13B] text-white border-[#1AC13B] shadow-sm'
                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                }`}
                                title="Tampilan Tabel"
                            >
                                <TableIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. CONTENT AREA: EMPTY STATE OR LIST */}
                {filteredInquiries.length === 0 ? (
                    <div className="p-12 md:p-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
                        {/* 3D Illustration Mockup matching the image */}
                        <div className="mb-4">
                            <img
                                src="/assets/icon/errors/notfound.png"
                                alt="Tidak ada data"
                                className="w-28 sm:w-36 h-auto object-contain mx-auto select-none pointer-events-none drop-shadow-xs"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/assets/icon/errors/notfound.png';
                                }}
                            />
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            Tidak ada pesan atau kontak ditemukan
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                            Coba ubah kata kunci pencarian atau filter kategori, atau buka formulir kontak publik untuk mengirim pesan baru.
                        </p>
                        <a
                            href="/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold shadow-sm transition-all"
                        >
                            <span>Buka Formulir Kontak</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                ) : viewMode === 'table' ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                                <thead className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800">
                                    <tr>
                                        <th className="px-5 py-4">Rincian Pengirim</th>
                                        <th className="px-5 py-4">Kategori & Subjek</th>
                                        <th className="px-5 py-4">Prioritas</th>
                                        <th className="px-5 py-4">Status Alur</th>
                                        <th className="px-5 py-4">Waktu Masuk</th>
                                        <th className="px-5 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                    {filteredInquiries.map((inq) => {
                                        const cat = CATEGORY_CONFIG[inq.category] || CATEGORY_CONFIG.general;
                                        const status = STATUS_CONFIG[inq.status] || STATUS_CONFIG.unread;
                                        const priority = PRIORITY_CONFIG[inq.priority] || PRIORITY_CONFIG.normal;
                                        const isUnread = inq.status === 'unread';

                                        return (
                                            <tr
                                                key={inq.id}
                                                className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                                                    isUnread ? 'bg-rose-500/5 font-medium' : ''
                                                }`}
                                            >
                                                {/* Sender */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200 dark:border-emerald-800">
                                                            {inq.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-slate-900 dark:text-white truncate">
                                                                {inq.name}
                                                            </div>
                                                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                                                {inq.email}
                                                            </div>
                                                            {inq.organization && (
                                                                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium truncate flex items-center gap-1 mt-0.5">
                                                                    <Building2 className="w-2.5 h-2.5" />
                                                                    <span>{inq.organization}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Category & Subject */}
                                                <td className="px-5 py-4 max-w-xs">
                                                    <div className="space-y-1">
                                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${cat.color}`}>
                                                            {cat.label}
                                                        </span>
                                                        <div className="font-semibold text-slate-900 dark:text-white truncate" title={inq.subject}>
                                                            {inq.subject}
                                                        </div>
                                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                                            {inq.message}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Priority */}
                                                <td className="px-5 py-4">
                                                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] ${priority.badge}`}>
                                                        {priority.label}
                                                    </span>
                                                </td>

                                                {/* Status Dropdown */}
                                                <td className="px-5 py-4">
                                                    <select
                                                        value={inq.status}
                                                        onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                                                        className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#1AC13B] ${status.color}`}
                                                    >
                                                        <option value="unread">Pesan Baru</option>
                                                        <option value="in_progress">Sedang Diproses</option>
                                                        <option value="resolved">Selesai</option>
                                                        <option value="archived">Diarsipkan</option>
                                                    </select>
                                                </td>

                                                {/* Date */}
                                                <td className="px-5 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap text-[11px]">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3 text-slate-400" />
                                                        <span>{new Date(inq.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                    </div>
                                                    <div className="text-[10px] text-slate-400 mt-0.5">
                                                        {new Date(inq.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => handleOpenDetail(inq)}
                                                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-colors"
                                                            title="Buka Pesan & Catatan"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReplyEmail(inq)}
                                                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                                                            title="Balas via Email"
                                                        >
                                                            <Send className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setInquiryToDelete(inq);
                                                                setDeleteModalOpen(true);
                                                            }}
                                                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-200 hover:text-rose-600 transition-colors"
                                                            title="Hapus Pesan"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
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
                ) : (
                    /* CARD VIEW */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredInquiries.map((inq) => {
                            const cat = CATEGORY_CONFIG[inq.category] || CATEGORY_CONFIG.general;
                            const status = STATUS_CONFIG[inq.status] || STATUS_CONFIG.unread;
                            const priority = PRIORITY_CONFIG[inq.priority] || PRIORITY_CONFIG.normal;

                            return (
                                <div
                                    key={inq.id}
                                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-[#1AC13B]/50 transition-all flex flex-col justify-between space-y-4"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${cat.color}`}>
                                                {cat.label}
                                            </span>
                                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${priority.badge}`}>
                                                {priority.label}
                                            </span>
                                        </div>

                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                                            {inq.subject}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                                            {inq.message}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                                        <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold">
                                            <span>{inq.name}</span>
                                            <span className="text-[10px] text-slate-400 font-normal">
                                                {new Date(inq.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                            {inq.email} {inq.organization ? `• ${inq.organization}` : ''}
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <select
                                                value={inq.status}
                                                onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                                                className={`text-[10px] font-bold py-1 px-2 rounded-lg border cursor-pointer ${status.color}`}
                                            >
                                                <option value="unread">Pesan Baru</option>
                                                <option value="in_progress">Sedang Diproses</option>
                                                <option value="resolved">Selesai</option>
                                                <option value="archived">Diarsipkan</option>
                                            </select>

                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleOpenDetail(inq)}
                                                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-[#1AC13B] text-slate-600 dark:text-slate-300"
                                                    title="Buka Rincian"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleReplyEmail(inq)}
                                                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-blue-500 text-slate-600 dark:text-slate-300"
                                                    title="Balas"
                                                >
                                                    <Send className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setInquiryToDelete(inq);
                                                        setDeleteModalOpen(true);
                                                    }}
                                                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-rose-500 text-slate-600 dark:text-slate-300"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* DETAIL & RESPONSE MODAL */}
                {isDetailModalOpen && selectedInquiry && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
                                <div>
                                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold border mb-1.5 ${CATEGORY_CONFIG[selectedInquiry.category]?.color || ''}`}>
                                        {CATEGORY_CONFIG[selectedInquiry.category]?.label}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {selectedInquiry.subject}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsDetailModalOpen(false)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-5 sm:p-6 space-y-6">
                                {/* Sender Info Card */}
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <span className="text-slate-400 block text-[11px]">Nama Lengkap</span>
                                        <div className="font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>{selectedInquiry.name}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-slate-400 block text-[11px]">Alamat Email</span>
                                        <div className="font-mono text-slate-900 dark:text-white mt-0.5 flex items-center justify-between">
                                            <span className="truncate">{selectedInquiry.email}</span>
                                            <button
                                                onClick={() => handleCopy(selectedInquiry.email, 'email')}
                                                className="text-[#1AC13B] hover:underline font-sans text-[11px] cursor-pointer"
                                            >
                                                {copiedField === 'email' ? 'Tersalin' : 'Salin'}
                                            </button>
                                        </div>
                                    </div>

                                    {selectedInquiry.phone && (
                                        <div>
                                            <span className="text-slate-400 block text-[11px]">No. Telepon / WhatsApp</span>
                                            <div className="font-mono text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                <span>{selectedInquiry.phone}</span>
                                            </div>
                                        </div>
                                    )}

                                    {selectedInquiry.organization && (
                                        <div>
                                            <span className="text-slate-400 block text-[11px]">Instansi / Lembaga</span>
                                            <div className="font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                                                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                                <span>{selectedInquiry.organization}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Message Content */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                        Isi Pesan / Rincian Kebutuhan
                                    </h4>
                                    <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed border border-slate-200 dark:border-slate-700">
                                        {selectedInquiry.message}
                                    </div>
                                </div>

                                {/* Quick Status & Priority Toolbar */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                            Status Alur Kerja
                                        </label>
                                        <select
                                            value={selectedInquiry.status}
                                            onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value)}
                                            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                                        >
                                            <option value="unread">Pesan Baru</option>
                                            <option value="in_progress">Sedang Diproses Tim</option>
                                            <option value="resolved">Selesai (Tuntas)</option>
                                            <option value="archived">Diarsipkan</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                            Tingkat Prioritas
                                        </label>
                                        <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold capitalize text-slate-900 dark:text-white">
                                            Prioritas {PRIORITY_CONFIG[selectedInquiry.priority]?.label || selectedInquiry.priority}
                                        </div>
                                    </div>
                                </div>

                                {/* Internal Admin Notes */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                            <FileText className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Catatan Internal Sekretariat & Admin</span>
                                        </label>
                                        <span className="text-[10px] text-slate-400">Hanya terlihat oleh tim admin</span>
                                    </div>
                                    <textarea
                                        rows={3}
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Tuliskan catatan internal, nama PIC tindak lanjut, atau progres rapat..."
                                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1AC13B]"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <button
                                            onClick={handleSaveNotes}
                                            disabled={isSavingNotes}
                                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                                        >
                                            {isSavingNotes ? 'Menyimpan...' : 'Simpan Catatan'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/30">
                                <button
                                    onClick={() => {
                                        setInquiryToDelete(selectedInquiry);
                                        setDeleteModalOpen(true);
                                    }}
                                    className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Hapus Pesan</span>
                                </button>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsDetailModalOpen(false)}
                                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                    >
                                        Tutup
                                    </button>
                                    <button
                                        onClick={() => handleReplyEmail(selectedInquiry)}
                                        className="px-4 py-2 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#1AC13B]/20 transition-all cursor-pointer"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Balas via Email</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* DELETE CONFIRMATION MODAL */}
                <AlertModal
                    isOpen={deleteModalOpen}
                    onClose={() => {
                        setDeleteModalOpen(false);
                        setInquiryToDelete(null);
                    }}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Pesan Kontak"
                    message={`Apakah Anda yakin ingin menghapus pesan dari "${inquiryToDelete?.name}" terkait "${inquiryToDelete?.subject}"? Tindakan ini tidak dapat dibatalkan.`}
                    confirmText="Ya, Hapus"
                    cancelText="Batal"
                    type="danger"
                />
            </div>
        </AdminLayout>
    );
}
