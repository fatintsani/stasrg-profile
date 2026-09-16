import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { ResearchProject } from '../../../types';
import { Language } from '../../../utils/translations';
import { AlertModal } from '../../../Components/Common/AlertModal';
import {
    Briefcase,
    Plus,
    Search,
    Edit3,
    Trash2,
    CheckCircle2,
    ExternalLink,
    X,
    UserCheck,
    Globe2,
    Star,
    Sparkles,
    Calendar,
    Award,
    Image as ImageIcon,
    Tag,
    Layers,
    Cpu,
    Zap,
    Truck,
    Factory,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsIndexProps {
    projects: ResearchProject[];
    stats: {
        total_projects: number;
        featured_projects: number;
        active_projects: number;
        categories_count: number;
    };
    categories: string[];
    filters: {
        search?: string;
        category?: string;
        status?: string;
    };
    siteConfig?: {
        center_name?: string;
        institution?: string;
    };
    status?: string;
}

// Preset Curated Image Options for quick project creation
const IMAGE_PRESETS = [
    {
        label: 'Logistics & Fleet AI',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        category: 'Supply Chain',
        tag: 'AI & LOGISTICS',
    },
    {
        label: 'Renewable Smart Microgrid',
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
        category: 'Sustainable Energy',
        tag: 'RENEWABLE ENERGY',
    },
    {
        label: 'Digital Twin & Smart Factory',
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        category: 'Smart Manufacturing',
        tag: 'SMART FACTORY',
    },
    {
        label: 'Industrial Robotics & Edge AI',
        url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
        category: 'Smart Manufacturing',
        tag: 'ROBOTICS & IIOT',
    },
    {
        label: 'Clean Water & Bio-Reactor',
        url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
        category: 'Circular Economy',
        tag: 'BIO-RESOURCES',
    },
];

export default function ProjectsIndex({
    projects,
    stats,
    categories,
    filters,
    siteConfig,
    status,
}: ProjectsIndexProps) {
    const [language, setLanguage] = useState<Language>('ID');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<ResearchProject | null>(null);
    const [projectToDelete, setProjectToDelete] = useState<ResearchProject | null>(null);
    const [activeLangTab, setActiveLangTab] = useState<'ID' | 'EN'>('ID');

    // Filter states
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [newTagInput, setNewTagInput] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('stas_lang') as Language;
        if (saved === 'EN' || saved === 'ID') {
            setLanguage(saved);
        }
    }, []);

    const isEn = language === 'EN';

    // Form handler using Inertia useForm
    const form = useForm({
        category: 'Supply Chain',
        category_tag: 'AI & LOGISTICS',
        title: '',
        title_id: '',
        slug: '',
        image_url: IMAGE_PRESETS[0].url,
        lead_researcher: '',
        summary: '',
        summary_id: '',
        tech_stack: [] as string[],
        case_study_url: '',
        funding_source: '',
        start_year: new Date().getFullYear() - 1,
        end_year: new Date().getFullYear() + 1,
        featured: true,
        is_active: true,
        order: 1,
    });

    const openCreateModal = () => {
        setEditingProject(null);
        form.setData({
            category: 'Supply Chain',
            category_tag: 'AI & LOGISTICS',
            title: '',
            title_id: '',
            slug: '',
            image_url: IMAGE_PRESETS[0].url,
            lead_researcher: '',
            summary: '',
            summary_id: '',
            tech_stack: ['Machine Learning', 'Edge Computing', 'Telemetry'],
            case_study_url: '',
            funding_source: 'National Research Grant (DIKTI)',
            start_year: new Date().getFullYear(),
            end_year: new Date().getFullYear() + 1,
            featured: true,
            is_active: true,
            order: (projects.length || 0) + 1,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const openEditModal = (project: ResearchProject) => {
        setEditingProject(project);
        form.setData({
            category: project.category,
            category_tag: project.category_tag,
            title: project.title,
            title_id: project.title_id || project.title,
            slug: project.slug,
            image_url: project.image_url,
            lead_researcher: project.lead_researcher || '',
            summary: project.summary,
            summary_id: project.summary_id || project.summary,
            tech_stack: project.tech_stack || [],
            case_study_url: project.case_study_url || `#project-${project.slug}`,
            funding_source: project.funding_source || '',
            start_year: project.start_year || new Date().getFullYear(),
            end_year: project.end_year || new Date().getFullYear() + 1,
            featured: project.featured ?? true,
            is_active: project.is_active ?? true,
            order: project.order || 1,
        });
        setActiveLangTab('ID');
        setIsModalOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProject) {
            form.put(`/admin/projects/${editingProject.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        } else {
            form.post('/admin/projects', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                },
            });
        }
    };

    const handleDelete = () => {
        if (!projectToDelete) return;
        router.delete(`/admin/projects/${projectToDelete.id}`, {
            onSuccess: () => setProjectToDelete(null),
        });
    };

    const handleToggleStatus = (project: ResearchProject) => {
        router.post(`/admin/projects/${project.id}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleToggleFeatured = (project: ResearchProject) => {
        router.post(`/admin/projects/${project.id}/toggle-featured`, {}, {
            preserveScroll: true,
        });
    };

    const handleAddTechTag = (e: React.KeyboardEvent | React.MouseEvent) => {
        if ('key' in e && e.key !== 'Enter') return;
        e.preventDefault();
        const trimmed = newTagInput.trim();
        if (trimmed && !form.data.tech_stack.includes(trimmed)) {
            form.setData('tech_stack', [...form.data.tech_stack, trimmed]);
            setNewTagInput('');
        }
    };

    const handleRemoveTechTag = (tagToRemove: string) => {
        form.setData(
            'tech_stack',
            form.data.tech_stack.filter((t) => t !== tagToRemove)
        );
    };

    const handleFilterChange = (newSearch: string, newCat: string, newStatus: string) => {
        setSearchQuery(newSearch);
        setCategoryFilter(newCat);
        setStatusFilter(newStatus);
        router.get(
            '/admin/projects',
            { search: newSearch, category: newCat, status: newStatus },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AdminLayout
            title={isEn ? 'Featured Research Projects' : 'Kelola Proyek Riset Unggulan'}
            siteConfig={siteConfig}
        >
            <div className="space-y-6">
                {/* 1. Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{isEn ? 'Flagship Industrial Initiatives' : 'Inisiatif Riset Unggulan & Kolaborasi'}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {isEn ? 'Featured Research Projects' : 'Proyek Riset Unggulan'}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            {isEn
                                ? 'Manage strategic research initiatives, industry case studies, and applied technology scale-ups across CoE STAS-RG specialized research laboratories.'
                                : 'Kelola inisiatif riset strategis, studi kasus kolaborasi industri, dan prototipe teknologi terapan di laboratorium penelitian CoE STAS-RG.'}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/#projects"
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
                            <span>{isEn ? 'Add Flagship Project' : 'Tambah Proyek Baru'}</span>
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
                            {isEn ? 'Total Projects' : 'Total Proyek'}
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                            {stats.total_projects}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'All recorded projects' : 'Seluruh portofolio proyek'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-[#107E27] dark:text-[#3FD27B] uppercase tracking-wider flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-[#1AC13B]" />
                            <span>{isEn ? 'Flagship Featured' : 'Proyek Unggulan'}</span>
                        </div>
                        <div className="text-2xl font-black text-[#107E27] dark:text-[#1AC13B]">
                            {stats.featured_projects}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Featured on landing showcase' : 'Ditampilkan di showcase utama'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                            {isEn ? 'Published & Active' : 'Aktif di Publik'}
                        </div>
                        <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
                            {stats.active_projects}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Visible to public visitors' : 'Dapat diakses publik'}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {isEn ? 'Category Tracks' : 'Klaster Kategori'}
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                            {stats.categories_count}
                        </div>
                        <div className="text-[10px] text-slate-500">
                            {isEn ? 'Specialized industry tracks' : 'Bidang industri spesifik'}
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
                            onChange={(e) => handleFilterChange(e.target.value, categoryFilter, statusFilter)}
                            placeholder={isEn ? 'Search by title, category, lead researcher...' : 'Cari judul proyek, kategori, ketua peneliti...'}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] transition-all"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {/* Category Dropdown */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => handleFilterChange(searchQuery, e.target.value, statusFilter)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#1AC13B] cursor-pointer"
                        >
                            <option value="">{isEn ? 'All Categories' : 'Semua Kategori'}</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => handleFilterChange(searchQuery, categoryFilter, e.target.value)}
                            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#1AC13B] cursor-pointer"
                        >
                            <option value="">{isEn ? 'All Statuses' : 'Semua Status'}</option>
                            <option value="featured">{isEn ? 'Featured Only' : 'Hanya Unggulan'}</option>
                            <option value="active">{isEn ? 'Active Only' : 'Hanya Aktif'}</option>
                            <option value="inactive">{isEn ? 'Draft Only' : 'Hanya Non-Aktif'}</option>
                        </select>
                    </div>
                </div>

                {/* 4. Projects Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.04 }}
                            className={`rounded-2xl bg-white dark:bg-slate-900 border transition-all flex flex-col justify-between overflow-hidden group ${
                                project.is_active
                                    ? 'border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/70'
                                    : 'border-slate-200/50 dark:border-slate-800/50 opacity-60 bg-slate-50/50 dark:bg-slate-900/40'
                            }`}
                        >
                            <div>
                                {/* Project Thumbnail Image */}
                                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                                    {/* Top Category Badge */}
                                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                        <span className="px-2.5 py-1 rounded-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-[#107E27] dark:text-[#3FD27B] border border-slate-200/60 dark:border-slate-800 shadow-xs">
                                            {project.category_tag}
                                        </span>
                                    </div>

                                    {/* Top Right Quick Badges */}
                                    <div className="absolute top-3 right-3 flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleFeatured(project)}
                                            title={project.featured ? 'Featured Project' : 'Mark as Featured'}
                                            className={`p-1.5 rounded-lg backdrop-blur-md transition-colors cursor-pointer border-0 ${
                                                project.featured
                                                    ? 'bg-amber-400 text-slate-950'
                                                    : 'bg-slate-900/60 text-white hover:bg-slate-900/80'
                                            }`}
                                        >
                                            <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-current' : ''}`} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleToggleStatus(project)}
                                            title={project.is_active ? 'Published' : 'Draft'}
                                            className={`px-2 py-1 rounded-lg backdrop-blur-md text-[10px] font-bold transition-colors cursor-pointer border-0 ${
                                                project.is_active
                                                    ? 'bg-[#1AC13B] text-white'
                                                    : 'bg-slate-800/80 text-slate-300'
                                            }`}
                                        >
                                            {project.is_active ? (isEn ? 'Live' : 'Aktif') : 'Draft'}
                                        </button>
                                    </div>

                                    {/* Bottom Image Overlay Info */}
                                    <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium flex items-center justify-between">
                                        <span className="truncate">{project.category}</span>
                                        {project.start_year && (
                                            <span className="shrink-0 text-slate-300 text-[10px] font-mono">
                                                {project.start_year} - {project.end_year || 'Ongoing'}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-5 space-y-3">
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                                            {project.title_id || project.title}
                                        </h3>
                                        {project.title_id && project.title !== project.title_id && (
                                            <div className="text-[11px] text-slate-400 dark:text-slate-500 italic line-clamp-1">
                                                EN: {project.title}
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                        {project.summary_id || project.summary}
                                    </p>

                                    {/* Tech Stack Tags */}
                                    {project.tech_stack && project.tech_stack.length > 0 && (
                                        <div className="flex flex-wrap gap-1 pt-1">
                                            {project.tech_stack.slice(0, 4).map((tech, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech_stack.length > 4 && (
                                                <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-400">
                                                    +{project.tech_stack.length - 4}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Lead Researcher */}
                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                        <UserCheck className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                        <span className="truncate font-medium">{project.lead_researcher}</span>
                                    </div>

                                    {project.funding_source && (
                                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                            <Award className="w-3 h-3 text-amber-500 shrink-0" />
                                            <span className="truncate">{project.funding_source}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Card Footer Actions */}
                            <div className="p-4 pt-0 mt-auto border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                <a
                                    href={project.case_study_url || `/#project-${project.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1"
                                >
                                    <span>{isEn ? 'Case Study' : 'Lihat Studi'}</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>

                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(project)}
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-0"
                                        title={isEn ? 'Edit Project' : 'Ubah Proyek'}
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setProjectToDelete(project)}
                                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer border-0"
                                        title={isEn ? 'Delete Project' : 'Hapus Proyek'}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 5. Create / Edit Project Modal Dialog */}
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
                                            {editingProject
                                                ? (isEn ? 'Edit Research Project' : 'Ubah Proyek Riset')
                                                : (isEn ? 'Add Flagship Research Project' : 'Tambah Proyek Riset Unggulan')}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            {isEn
                                                ? 'Configure project details, bilingual abstract, researcher profile, and visual showcase.'
                                                : 'Konfigurasi informasi proyek riset, abstrak dwibahasa, ketua peneliti, dan visual studi kasus.'}
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
                                    {/* Category & Tag Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Research Category / Domain Track' : 'Kategori Klaster Riset'} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.category}
                                                onChange={(e) => form.setData('category', e.target.value)}
                                                placeholder="e.g. Supply Chain, Sustainable Energy, Smart Manufacturing"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Category Tag Badge' : 'Label Badge Kategori'} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.category_tag}
                                                onChange={(e) => form.setData('category_tag', e.target.value)}
                                                placeholder="e.g. AI & LOGISTICS, RENEWABLE ENERGY, SMART FACTORY"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold uppercase text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>

                                    {/* Bilingual Content Tabs */}
                                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                                            <div className="flex items-center gap-2">
                                                <Globe2 className="w-4 h-4 text-[#1AC13B]" />
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                    {isEn ? 'Bilingual Title & Executive Summary' : 'Judul & Ringkasan Dwibahasa'}
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
                                                        Judul Proyek Riset (ID) *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={form.data.title_id}
                                                        onChange={(e) => form.setData('title_id', e.target.value)}
                                                        placeholder="contoh: Logistik Armada Otonom & Optimasi Biaya Prediktif"
                                                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Ringkasan & Cakupan Eksekutif (ID) *
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        required
                                                        value={form.data.summary_id}
                                                        onChange={(e) => form.setData('summary_id', e.target.value)}
                                                        placeholder="contoh: Kerangka kerja optimasi terintegrasi yang menggabungkan heuristik perutean dan deep reinforcement learning untuk jaringan pengiriman metropolitan berkepadatan tinggi."
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            /* English Content Fields */
                                            <div className="space-y-3.5">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Project Title (EN) *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={form.data.title}
                                                        onChange={(e) => form.setData('title', e.target.value)}
                                                        placeholder="e.g. Autonomous Fleet Logistics & Predictive Cost Optimization"
                                                        className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                        Executive Summary & Scope (EN) *
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        required
                                                        value={form.data.summary}
                                                        onChange={(e) => form.setData('summary', e.target.value)}
                                                        placeholder="e.g. Integrated optimization framework combining routing heuristics and deep reinforcement learning for high-density metropolitan delivery networks."
                                                        className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Lead Researcher & Slug Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Lead Researcher' : 'Ketua Peneliti / Penanggung Jawab'} *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={form.data.lead_researcher}
                                                onChange={(e) => form.setData('lead_researcher', e.target.value)}
                                                placeholder="e.g. Dr. Ir. Hendra S."
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Custom Slug / Case Study Anchor' : 'Slug / Anchor URL'}
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.slug}
                                                onChange={(e) => form.setData('slug', e.target.value)}
                                                placeholder="autonomous-fleet-logistics"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>

                                    {/* Image Showcase URL & Presets */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                            {isEn ? 'Image Showcase URL' : 'URL Gambar Showcase'} *
                                        </label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                required
                                                value={form.data.image_url}
                                                onChange={(e) => form.setData('image_url', e.target.value)}
                                                placeholder="https://images.unsplash.com/..."
                                                className="flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        {/* Curated Presets */}
                                        <div className="space-y-1.5">
                                            <div className="text-[11px] font-bold text-slate-400">
                                                {isEn ? 'Or select a curated preset image:' : 'Atau pilih gambar preset:'}
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                                {IMAGE_PRESETS.map((preset, pIdx) => {
                                                    const isSelected = form.data.image_url === preset.url;
                                                    return (
                                                        <button
                                                            key={pIdx}
                                                            type="button"
                                                            onClick={() => {
                                                                form.setData({
                                                                    ...form.data,
                                                                    image_url: preset.url,
                                                                    category: form.data.category || preset.category,
                                                                    category_tag: form.data.category_tag || preset.tag,
                                                                });
                                                            }}
                                                            className={`relative rounded-xl overflow-hidden border text-left p-1 cursor-pointer transition-all ${
                                                                isSelected
                                                                    ? 'border-[#1AC13B] ring-2 ring-[#1AC13B]/20'
                                                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                                            }`}
                                                        >
                                                            <div className="h-14 w-full rounded-lg overflow-hidden bg-slate-100">
                                                                <img
                                                                    src={preset.url}
                                                                    alt={preset.label}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate mt-1">
                                                                {preset.label}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Stack Tags Manager */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                            {isEn ? 'Technology Stack & Keywords' : 'Teknologi & Kata Kunci Terkait'}
                                        </label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={newTagInput}
                                                onChange={(e) => setNewTagInput(e.target.value)}
                                                onKeyDown={handleAddTechTag}
                                                placeholder={isEn ? 'Type tech tag (e.g. Deep RL) and press Add' : 'Ketik teknologi (contoh: Deep RL, IoT) lalu tekan Tambah'}
                                                className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddTechTag}
                                                className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-[#EDFBF1] hover:text-[#107E27] text-xs font-bold transition-colors cursor-pointer border-0"
                                            >
                                                {isEn ? 'Add Tag' : 'Tambah'}
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                                            {form.data.tech_stack.length === 0 ? (
                                                <span className="text-[11px] text-slate-400 italic">
                                                    {isEn ? 'No tags added yet.' : 'Belum ada tag teknologi.'}
                                                </span>
                                            ) : (
                                                form.data.tech_stack.map((tag, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200"
                                                    >
                                                        <span>{tag}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveTechTag(tag)}
                                                            className="text-slate-400 hover:text-red-500 cursor-pointer border-0 bg-transparent p-0"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Funding, Years & Case Study URL */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Funding / Grant Partner' : 'Sumber Pendanaan / Hibah'}
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.funding_source}
                                                onChange={(e) => form.setData('funding_source', e.target.value)}
                                                placeholder="e.g. DIKTI Matching Fund & Transtrack"
                                                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {isEn ? 'Timeline (Start - End Year)' : 'Tahun Pelaksanaan'}
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={form.data.start_year}
                                                    onChange={(e) => form.setData('start_year', parseInt(e.target.value) || 2025)}
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                                <span className="text-slate-400">-</span>
                                                <input
                                                    type="number"
                                                    value={form.data.end_year}
                                                    onChange={(e) => form.setData('end_year', parseInt(e.target.value) || 2026)}
                                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                                />
                                            </div>
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
                                                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                            />
                                        </div>
                                    </div>

                                    {/* Status Toggles */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                                        <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={form.data.featured}
                                                onChange={(e) => form.setData('featured', e.target.checked)}
                                                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
                                            />
                                            <div>
                                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                                                    {isEn ? 'Showcase as Featured Flagship' : 'Jadikan Proyek Unggulan'}
                                                </span>
                                                <span className="text-[10px] text-slate-500">
                                                    {isEn ? 'Displayed on homepage top showcase' : 'Tampil di bagian atas beranda publik'}
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
                                                    {isEn ? 'Visible on website' : 'Dapat dilihat oleh pengunjung'}
                                                </span>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Modal Submit Actions */}
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
                                                : editingProject
                                                    ? (isEn ? 'Update Project' : 'Perbarui Proyek')
                                                    : (isEn ? 'Save Flagship Project' : 'Simpan Proyek')}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* 6. Delete Confirmation Modal (Custom Alert Template) */}
                <AlertModal
                    isOpen={!!projectToDelete}
                    onClose={() => setProjectToDelete(null)}
                    onConfirm={handleDelete}
                    type="danger"
                    title={isEn ? 'Delete Research Project?' : 'Hapus Proyek Riset Ini?'}
                    message={
                        projectToDelete ? (
                            isEn ? (
                                `Are you sure you want to delete "${projectToDelete.title}"? This action cannot be undone.`
                            ) : (
                                `Apakah Anda yakin ingin menghapus proyek "${projectToDelete.title_id || projectToDelete.title}"? Tindakan ini tidak dapat dibatalkan.`
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
