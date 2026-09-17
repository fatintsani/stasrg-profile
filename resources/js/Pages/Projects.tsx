import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    FolderKanban,
    Search,
    ChevronRight,
    ArrowRight,
    Sparkles,
    User,
    Calendar,
    Coins,
    Layers,
    ExternalLink,
    X,
    Building2,
    CheckCircle2,
    Cpu,
    Zap,
    Shield
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { EmptyState } from '../Components/Common/EmptyState';
import { ResearchProject, ResearchDomain, Publication, EnterpriseService, SiteConfig } from '../types';

interface ProjectsPageProps {
    projects?: ResearchProject[];
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    siteConfig?: SiteConfig;
}

export default function Projects({
    projects = [],
    domains = [],
    publications = [],
    services = [],
    siteConfig,
}: ProjectsPageProps) {
    const [language, setLanguage] = useState<Language>('EN');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);

    const [searchOpen, setSearchOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [contactSubject, setContactSubject] = useState('');

    useEffect(() => {
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') setLanguage(savedLang);

        const savedTheme = localStorage.getItem('stas_theme') as 'light' | 'dark';
        if (savedTheme === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const handleToggleLanguage = () => {
        const nextLang: Language = language === 'EN' ? 'ID' : 'EN';
        setLanguage(nextLang);
        localStorage.setItem('stas_lang', nextLang);
    };

    const handleToggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        localStorage.setItem('stas_theme', nextTheme);
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const isEn = language === 'EN';
    const t = translations[language];

    // Extract dynamic categories from projects
    const categories = useMemo(() => {
        const unique = Array.from(new Set(projects.map((p) => p.category_tag || p.category).filter(Boolean)));
        return [
            { id: 'all', label: isEn ? 'All Projects' : 'Semua Proyek' },
            ...unique.map((cat) => ({ id: cat, label: cat })),
        ];
    }, [projects, isEn]);

    // Filtered projects
    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            const matchesCat =
                selectedCategory === 'all' ||
                (p.category_tag || p.category || '').toLowerCase() === selectedCategory.toLowerCase();

            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesCat;

            const titleMatch = (p.title || '').toLowerCase().includes(query);
            const titleIdMatch = (p.title_id || '').toLowerCase().includes(query);
            const summaryMatch = (p.summary || '').toLowerCase().includes(query);
            const summaryIdMatch = (p.summary_id || '').toLowerCase().includes(query);
            const leadMatch = (p.lead_researcher || '').toLowerCase().includes(query);
            const techMatch = (p.tech_stack || []).some((tech) => tech.toLowerCase().includes(query));
            const fundingMatch = (p.funding_source || '').toLowerCase().includes(query);

            return matchesCat && (titleMatch || titleIdMatch || summaryMatch || summaryIdMatch || leadMatch || techMatch || fundingMatch);
        });
    }, [projects, selectedCategory, searchQuery]);

    const handleInquireProject = (projectTitle: string) => {
        setContactSubject(`Inquiry regarding Project: ${projectTitle}`);
        setContactOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${isEn ? 'Research Projects & Case Studies' : 'Proyek Riset Terapan & Inovasi'} — ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
                <meta
                    name="description"
                    content="Explore the applied research projects and industrial case studies developed by CoE STAS-RG Telkom University."
                />
            </Head>

            {/* Top Navbar */}
            <Navbar
                language={language}
                onToggleLanguage={handleToggleLanguage}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenLogin={() => setLoginOpen(true)}
                t={t.nav}
            />

            {/* Main Content Area */}
            <main className="flex-grow">
                {/* 1. Header Banner & Breadcrumbs */}
                <section className="relative overflow-hidden bg-gradient-to-b from-[#F2FBF5] via-white to-white dark:from-slate-900/70 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 pt-28 sm:pt-32 pb-12 sm:pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                            <Link href="/" className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors">
                                {isEn ? 'Home' : 'Beranda'}
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <span className="text-slate-900 dark:text-white">
                                {isEn ? 'Research Projects' : 'Proyek Riset'}
                            </span>
                        </div>

                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {isEn ? 'Applied' : 'Katalog'}{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107E27] via-[#1AC13B] to-[#129E2F] dark:from-[#1AC13B] dark:to-[#7FE39F]">
                                    {isEn ? 'Research Projects' : 'Proyek Riset Unggulan'}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn
                                    ? 'A portfolio of end-to-end applied research prototypes, industrial testbeds, and collaborative innovation projects validated under real-world conditions.'
                                    : 'Portofolio purwarupa riset terapan, testbed industri, dan proyek inovasi kolaboratif yang divalidasi langsung dalam kondisi operasional riil.'}
                            </p>
                        </div>
                    </div>

                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1AC13B]/10 rounded-full blur-3xl pointer-events-none" />
                </section>

                {/* 2. Controls: Category Pills & Search */}
                <section className="py-8 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Category Pills */}
                            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                                            selectedCategory === cat.id
                                                ? 'bg-[#107E27] dark:bg-[#1AC13B] text-white border-transparent shadow-xs'
                                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative w-full md:w-80 shrink-0">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={isEn ? 'Search projects, tech stack, PI...' : 'Cari proyek, teknologi, peneliti...'}
                                    className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] transition"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Projects Grid */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredProjects.length === 0 ? (
                            <div className="max-w-md mx-auto">
                                <EmptyState
                                    title={isEn ? 'No Projects Found' : 'Tidak Ada Proyek Ditemukan'}
                                    description={isEn ? 'Try adjusting your search criteria or filter tags.' : 'Coba ubah kata kunci pencarian atau kategori filter.'}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {filteredProjects.map((p) => {
                                    const titleText = isEn ? p.title : (p.title_id || p.title);
                                    const summaryText = isEn ? p.summary : (p.summary_id || p.summary);

                                    return (
                                        <div
                                            key={p.id}
                                            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all flex flex-col justify-between shadow-xs hover:shadow-md overflow-hidden group"
                                        >
                                            <div>
                                                {/* Project Image Banner */}
                                                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                                    {p.image_url ? (
                                                        <img
                                                            src={p.image_url}
                                                            alt={titleText}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-[#10381C] to-slate-900 flex items-center justify-center text-emerald-400 p-6">
                                                            <Cpu className="w-12 h-12 opacity-40" />
                                                        </div>
                                                    )}
                                                    <div className="absolute top-3 left-3">
                                                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#107E27] dark:text-[#7FE39F] shadow-xs uppercase tracking-wider">
                                                            {p.category_tag || p.category}
                                                        </span>
                                                    </div>
                                                    {p.funding_source && (
                                                        <div className="absolute bottom-3 left-3 right-3">
                                                            <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-slate-200 truncate max-w-full">
                                                                {p.funding_source}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors" title={titleText}>
                                                        {titleText}
                                                    </h3>
                                                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                                                        {summaryText}
                                                    </p>

                                                    {/* Tech Tags */}
                                                    {p.tech_stack && p.tech_stack.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                                            {p.tech_stack.map((tech, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate max-w-[55%]">
                                                    <User className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                                    <span className="truncate">{p.lead_researcher}</span>
                                                </div>

                                                <button
                                                    onClick={() => setSelectedProject(p)}
                                                    className="px-3 py-1.5 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] hover:bg-[#107E27] hover:text-white dark:hover:bg-[#1AC13B] dark:hover:text-slate-950 text-xs font-bold transition cursor-pointer shrink-0"
                                                >
                                                    {isEn ? 'Details' : 'Rincian'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Project Details Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
                    <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#7FE39F] uppercase mb-2">
                                    {selectedProject.category_tag || selectedProject.category}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {isEn ? selectedProject.title : (selectedProject.title_id || selectedProject.title)}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                {isEn ? 'Executive Summary' : 'Ringkasan Eksekutif'}
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn ? selectedProject.summary : (selectedProject.summary_id || selectedProject.summary)}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        {selectedProject.tech_stack && selectedProject.tech_stack.length > 0 && (
                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                    {isEn ? 'Technology Stack' : 'Tumpukan Teknologi'}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedProject.tech_stack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Lead Investigator & Funding */}
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">
                                    {isEn ? 'Principal Investigator' : 'Peneliti Utama'}
                                </div>
                                <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                                    {selectedProject.lead_researcher}
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">
                                    {isEn ? 'Funding / Sponsor' : 'Sumber Pendanaan'}
                                </div>
                                <div className="font-semibold text-[#107E27] dark:text-[#1AC13B] mt-0.5">
                                    {selectedProject.funding_source || 'Telkom University Research Grant'}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => {
                                    handleInquireProject(selectedProject.title);
                                    setSelectedProject(null);
                                }}
                                className="px-5 py-2.5 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                            >
                                <FolderKanban className="w-3.5 h-3.5" />
                                <span>{isEn ? 'Inquire on Collaboration' : 'Konsultasi Proyek Riset'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer
                siteConfig={siteConfig}
                domains={domains}
                publications={publications}
                services={services}
                t={t.footer}
            />

            {/* Modals */}
            <SearchModal
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                domains={domains}
                publications={publications}
                services={services}
                t={t.search}
            />
            <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} t={t.auth} />
            <ContactModal
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
                prefilledSubject={contactSubject}
            />
        </div>
    );
}
