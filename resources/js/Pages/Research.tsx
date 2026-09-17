import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Cpu,
    Search,
    ChevronRight,
    ArrowRight,
    Sparkles,
    User,
    CheckCircle2,
    Layers,
    Activity,
    Zap,
    Shield,
    Bot,
    Globe,
    ExternalLink,
    Mail,
    X,
    FolderKanban
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { EmptyState } from '../Components/Common/EmptyState';
import { ResearchDomain, ResearchProject, Publication, EnterpriseService, Researcher, SiteConfig } from '../types';

interface ResearchPageProps {
    domains?: ResearchDomain[];
    projects?: ResearchProject[];
    publications?: Publication[];
    services?: EnterpriseService[];
    researchers?: Researcher[];
    siteConfig?: SiteConfig;
}

export default function Research({
    domains = [],
    projects = [],
    publications = [],
    services = [],
    researchers = [],
    siteConfig,
}: ResearchPageProps) {
    const [language, setLanguage] = useState<Language>('EN');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDomain, setSelectedDomain] = useState<ResearchDomain | null>(null);

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

    const filteredDomains = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return domains;
        return domains.filter((d) => {
            const titleMatch = (d.title || '').toLowerCase().includes(query);
            const titleIdMatch = (d.title_id || '').toLowerCase().includes(query);
            const summaryMatch = (d.summary || '').toLowerCase().includes(query);
            const summaryIdMatch = (d.summary_id || '').toLowerCase().includes(query);
            const leadMatch = (d.lead_researcher || '').toLowerCase().includes(query);
            const focusMatch = (d.focus_areas || []).some((f) => f.toLowerCase().includes(query));
            return titleMatch || titleIdMatch || summaryMatch || summaryIdMatch || leadMatch || focusMatch;
        });
    }, [domains, searchQuery]);

    const handleInquireDomain = (domainTitle: string) => {
        setContactSubject(`Research Collaboration Inquiry: ${domainTitle}`);
        setContactOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${isEn ? 'Research Areas & Domains' : 'Bidang Riset & Pilar Unggulan'} — ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
                <meta
                    name="description"
                    content="Explore the 8 core research domains of CoE STAS-RG Telkom University in Smart Manufacturing, Sustainable Energy, AI, Green IoT, and Industrial Automation."
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
                                {isEn ? 'Research Areas' : 'Bidang Riset'}
                            </span>
                        </div>

                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {isEn ? 'Research' : 'Pilar & Bidang'}{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107E27] via-[#1AC13B] to-[#129E2F] dark:from-[#1AC13B] dark:to-[#7FE39F]">
                                    {isEn ? 'Focus Areas' : 'Riset Terapan'}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn
                                    ? 'Our multidisciplinary research tracks combine advanced mathematical modeling, industrial sensing, and AI-driven automation for sustainable impact.'
                                    : 'Trek riset multidisiplin kami memadukan pemodelan matematika lanjut, penginderaan industri, dan otomasi berbasis AI untuk dampak yang berkelanjutan.'}
                            </p>
                        </div>
                    </div>

                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1AC13B]/10 rounded-full blur-3xl pointer-events-none" />
                </section>

                {/* 2. Live Filter & Search Bar */}
                <section className="py-8 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                {isEn ? `Showing ${filteredDomains.length} Research Domains` : `Menampilkan ${filteredDomains.length} Bidang Riset`}
                            </div>
                            <div className="relative w-full sm:w-80">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={isEn ? 'Search research pillars, keywords...' : 'Cari bidang riset, topik fokus...'}
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

                {/* 3. Research Domains Grid */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredDomains.length === 0 ? (
                            <div className="max-w-md mx-auto">
                                <EmptyState
                                    title={isEn ? 'No Research Domains Found' : 'Tidak Ada Bidang Riset Ditemukan'}
                                    description={isEn ? 'Try adjusting your search query.' : 'Coba sesuaikan kata kunci pencarian Anda.'}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {filteredDomains.map((d) => {
                                    const titleText = isEn ? d.title : (d.title_id || d.title);
                                    const summaryText = isEn ? d.summary : (d.summary_id || d.summary);

                                    return (
                                        <div
                                            key={d.id}
                                            className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all flex flex-col justify-between shadow-xs hover:shadow-md group relative overflow-hidden"
                                        >
                                            <div>
                                                {/* Top Badge & Number */}
                                                <div className="flex items-center justify-between mb-5">
                                                    <span className="text-xs font-black text-[#107E27] dark:text-[#1AC13B] px-3 py-1 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C]/70">
                                                        {d.domain_number || '01'}
                                                    </span>
                                                    <div className="w-10 h-10 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] flex items-center justify-center font-bold group-hover:rotate-6 transition-transform">
                                                        <Cpu className="w-5 h-5" />
                                                    </div>
                                                </div>

                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                                    {titleText}
                                                </h3>

                                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-5">
                                                    {summaryText}
                                                </p>

                                                {/* Focus Area Tags */}
                                                {d.focus_areas && d.focus_areas.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                                        {d.focus_areas.map((tag, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Footer: Lead PI & Inquire Button */}
                                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                                                {d.lead_researcher ? (
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
                                                        <User className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                                        <span className="truncate">{d.lead_researcher}</span>
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-slate-400 italic">
                                                        {isEn ? 'Principal Investigator' : 'Peneliti Utama'}
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => handleInquireDomain(titleText)}
                                                    className="px-3 py-1.5 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] hover:bg-[#107E27] hover:text-white dark:hover:bg-[#1AC13B] dark:hover:text-slate-950 text-xs font-bold transition cursor-pointer shrink-0"
                                                >
                                                    {isEn ? 'Inquire' : 'Kerjasama'}
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
