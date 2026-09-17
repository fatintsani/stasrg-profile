import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Search,
    ChevronRight,
    ArrowRight,
    Sparkles,
    ExternalLink,
    Copy,
    Check,
    Download,
    FileText,
    Calendar,
    Users,
    Layers,
    ChevronDown,
    X,
    Filter
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { EmptyState } from '../Components/Common/EmptyState';
import { Publication, ResearchDomain, EnterpriseService, SiteConfig } from '../types';

interface PublicationsPageProps {
    publications?: Publication[];
    domains?: ResearchDomain[];
    services?: EnterpriseService[];
    siteConfig?: SiteConfig;
}

export default function Publications({
    publications = [],
    domains = [],
    services = [],
    siteConfig,
}: PublicationsPageProps) {
    const [language, setLanguage] = useState<Language>('EN');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedQuartile, setSelectedQuartile] = useState<string>('all');
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [expandedAbstracts, setExpandedAbstracts] = useState<Record<number, boolean>>({});
    const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

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

    // Unique years
    const years = useMemo(() => {
        const unique = Array.from(new Set(publications.map((p) => p.year).filter(Boolean))).sort((a, b) => b - a);
        return ['all', ...unique.map(String)];
    }, [publications]);

    // Filter categories
    const quartileFilters = [
        { id: 'all', label: isEn ? 'All Publications' : 'Semua Publikasi' },
        { id: 'Q1', label: 'Scopus Q1' },
        { id: 'Q2', label: 'Scopus Q2' },
        { id: 'conference', label: isEn ? 'Conference / IEEE' : 'Prosiding / IEEE' },
    ];

    const toggleAbstract = (id: number) => {
        setExpandedAbstracts((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const copyCitation = (pub: Publication) => {
        const citation = `${pub.authors} (${pub.year}). "${pub.title}". ${pub.venue}. DOI: ${pub.doi}`;
        navigator.clipboard.writeText(citation);
        setCopiedDoi(pub.doi || String(pub.id));
        setTimeout(() => setCopiedDoi(null), 2000);
    };

    // Filtered Publications
    const filteredPublications = useMemo(() => {
        return publications.filter((p) => {
            const matchesQuartile =
                selectedQuartile === 'all' ||
                (selectedQuartile === 'Q1' && (p.badge?.includes('Q1') || p.quartile?.includes('Q1'))) ||
                (selectedQuartile === 'Q2' && (p.badge?.includes('Q2') || p.quartile?.includes('Q2'))) ||
                (selectedQuartile === 'conference' && (p.badge?.toLowerCase().includes('conf') || p.venue?.toLowerCase().includes('ieee') || p.venue?.toLowerCase().includes('conference')));

            const matchesYear = selectedYear === 'all' || String(p.year) === selectedYear;

            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesQuartile && matchesYear;

            const titleMatch = (p.title || '').toLowerCase().includes(query);
            const authorsMatch = (p.authors || '').toLowerCase().includes(query);
            const venueMatch = (p.venue || '').toLowerCase().includes(query);
            const doiMatch = (p.doi || '').toLowerCase().includes(query);
            const abstractMatch = (p.abstract || '').toLowerCase().includes(query);

            return matchesQuartile && matchesYear && (titleMatch || authorsMatch || venueMatch || doiMatch || abstractMatch);
        });
    }, [publications, selectedQuartile, selectedYear, searchQuery]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${isEn ? 'Academic Publications & Papers' : 'Publikasi Ilmiah & Jurnal'} — ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
                <meta
                    name="description"
                    content="Browse high-impact indexed publications, journal papers (Q1/Q2), and IEEE conference proceedings from CoE STAS-RG Telkom University."
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
                                {isEn ? 'Publications' : 'Publikasi Ilmiah'}
                            </span>
                        </div>

                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {isEn ? 'Academic' : 'Publikasi'}{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107E27] via-[#1AC13B] to-[#129E2F] dark:from-[#1AC13B] dark:to-[#7FE39F]">
                                    {isEn ? 'Publications & Papers' : 'Jurnal & Prosiding'}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn
                                    ? 'Explore peer-reviewed articles, international journals, and conference proceedings published by STAS-RG research fellows.'
                                    : 'Jelajahi artikel jurnal internasional bereputasi (Scopus Q1/Q2) dan prosiding konferensi ilmiah yang diterbitkan sivitas peneliti STAS-RG.'}
                            </p>
                        </div>
                    </div>

                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1AC13B]/10 rounded-full blur-3xl pointer-events-none" />
                </section>

                {/* 2. Controls: Filter Pills & Search */}
                <section className="py-8 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                            {/* Quartile Tabs & Year Selector */}
                            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                                    {quartileFilters.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => setSelectedQuartile(q.id)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                                                selectedQuartile === q.id
                                                    ? 'bg-[#107E27] dark:bg-[#1AC13B] text-white border-transparent shadow-xs'
                                                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]'
                                            }`}
                                        >
                                            {q.label}
                                        </button>
                                    ))}
                                </div>

                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#1AC13B] cursor-pointer"
                                >
                                    <option value="all">{isEn ? 'All Years' : 'Semua Tahun'}</option>
                                    {years.filter((y) => y !== 'all').map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Live Search */}
                            <div className="relative w-full lg:w-80 shrink-0">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={isEn ? 'Search title, author, venue, DOI...' : 'Cari judul, penulis, jurnal, DOI...'}
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

                {/* 3. Publications List */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredPublications.length === 0 ? (
                            <div className="max-w-md mx-auto">
                                <EmptyState
                                    title={isEn ? 'No Publications Found' : 'Tidak Ada Publikasi Ditemukan'}
                                    description={isEn ? 'Try adjusting your search query or filter tags.' : 'Coba sesuaikan kata kunci pencarian atau filter tahun.'}
                                />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredPublications.map((pub) => {
                                    const isAbstractOpen = !!expandedAbstracts[pub.id];
                                    const isCopied = copiedDoi === (pub.doi || String(pub.id));

                                    return (
                                        <div
                                            key={pub.id}
                                            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all shadow-xs hover:shadow-md"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                <div className="space-y-2 flex-1">
                                                    {/* Top Badges */}
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#7FE39F] border border-[#1AC13B]/20">
                                                            {pub.badge || 'Scopus'}
                                                        </span>
                                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {pub.year}
                                                        </span>
                                                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                                                            • {pub.venue}
                                                        </span>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                                                        {pub.title}
                                                    </h3>

                                                    {/* Authors */}
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                                        <Users className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                                        <span>{pub.authors}</span>
                                                    </div>

                                                    {/* Abstract Drawer */}
                                                    {pub.abstract && (
                                                        <div className="pt-2">
                                                            <button
                                                                onClick={() => toggleAbstract(pub.id)}
                                                                className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline inline-flex items-center gap-1 cursor-pointer"
                                                            >
                                                                <span>{isAbstractOpen ? (isEn ? 'Hide Abstract' : 'Tutup Abstrak') : (isEn ? 'Show Abstract' : 'Lihat Abstrak')}</span>
                                                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAbstractOpen ? 'rotate-180' : ''}`} />
                                                            </button>
                                                            {isAbstractOpen && (
                                                                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 animate-in fade-in duration-150">
                                                                    {pub.abstract}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0">
                                                    {pub.doi_url ? (
                                                        <a
                                                            href={pub.doi_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3.5 py-2 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"
                                                        >
                                                            <span>DOI / Publisher</span>
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </a>
                                                    ) : pub.doi ? (
                                                        <a
                                                            href={`https://doi.org/${pub.doi}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3.5 py-2 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs whitespace-nowrap"
                                                        >
                                                            <span>DOI Link</span>
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </a>
                                                    ) : null}

                                                    <button
                                                        onClick={() => copyCitation(pub)}
                                                        className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                                                        title="Copy APA Citation"
                                                    >
                                                        {isCopied ? (
                                                            <>
                                                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                                                <span className="text-emerald-600">{isEn ? 'Copied!' : 'Tersalin!'}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="w-3.5 h-3.5" />
                                                                <span>{isEn ? 'Cite' : 'Kutip'}</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>

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
