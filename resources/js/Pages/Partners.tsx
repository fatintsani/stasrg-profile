import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Search,
    ChevronRight,
    ArrowRight,
    Sparkles,
    ExternalLink,
    Shield,
    Globe,
    Handshake,
    CheckCircle2,
    Layers,
    X
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { EmptyState } from '../Components/Common/EmptyState';
import { Partner, ResearchDomain, Publication, EnterpriseService, SiteConfig } from '../types';

interface PartnersPageProps {
    partners?: Partner[];
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    siteConfig?: SiteConfig;
}

export default function Partners({
    partners = [],
    domains = [],
    publications = [],
    services = [],
    siteConfig,
}: PartnersPageProps) {
    const [language, setLanguage] = useState<Language>('EN');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

    // Category Tabs
    const categories = [
        { id: 'all', label: isEn ? 'All Partners' : 'Semua Mitra' },
        { id: 'SOE', label: isEn ? 'State-Owned Enterprises' : 'BUMN & Korporasi' },
        { id: 'Industry', label: isEn ? 'Industry Leaders' : 'Mitra Industri' },
        { id: 'Government', label: isEn ? 'Government & Defense' : 'Pemerintah & Pertahanan' },
        { id: 'Academic', label: isEn ? 'Academic Consortia' : 'Mitra Akademik' },
    ];

    // Filtered partners
    const filteredPartners = useMemo(() => {
        return partners.filter((p) => {
            const matchesCat =
                selectedCategory === 'all' ||
                (p.category || '').toLowerCase() === selectedCategory.toLowerCase();

            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesCat;

            const nameMatch = (p.name || '').toLowerCase().includes(query);
            const descMatch = (p.description || '').toLowerCase().includes(query);
            const descIdMatch = (p.description_id || '').toLowerCase().includes(query);
            const typeMatch = (p.partnership_type || '').toLowerCase().includes(query);

            return matchesCat && (nameMatch || descMatch || descIdMatch || typeMatch);
        });
    }, [partners, selectedCategory, searchQuery]);

    const handleOpenPartnerInquiry = () => {
        setContactSubject('Institutional & Industrial Partnership Proposal');
        setContactOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${isEn ? 'Strategic Partners & Alliances' : 'Mitra Kerjasama Strategis'} — ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
                <meta
                    name="description"
                    content="Strategic industrial partners, government collaborations, state-owned enterprises, and academic alliances of CoE STAS-RG Telkom University."
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
                                {isEn ? 'Partners' : 'Mitra Kerjasama'}
                            </span>
                        </div>

                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {isEn ? 'Strategic' : 'Jejaring'}{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107E27] via-[#1AC13B] to-[#129E2F] dark:from-[#1AC13B] dark:to-[#7FE39F]">
                                    {isEn ? 'Partners & Alliances' : 'Mitra Strategis'}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn
                                    ? 'We actively build long-term partnerships with industry leaders, defense institutions, government bodies, and international universities to scale applied innovation.'
                                    : 'Kami membangun kemitraan strategis jangka panjang bersama korporasi industri, sektor pertahanan, kementerian, dan universitas mitra untuk hilirisasi inovasi.'}
                            </p>
                        </div>
                    </div>

                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1AC13B]/10 rounded-full blur-3xl pointer-events-none" />
                </section>

                {/* 2. Controls: Filter Pills & Search */}
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
                                    placeholder={isEn ? 'Search partner name, MoU type...' : 'Cari nama mitra, jenis kerjasama...'}
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

                {/* 3. Partners Grid */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredPartners.length === 0 ? (
                            <div className="max-w-md mx-auto">
                                <EmptyState
                                    title={isEn ? 'No Partners Found' : 'Tidak Ada Mitra Ditemukan'}
                                    description={isEn ? 'Try adjusting your search criteria.' : 'Coba sesuaikan kata kunci pencarian Anda.'}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {filteredPartners.map((p) => {
                                    const descText = isEn ? p.description : (p.description_id || p.description);

                                    return (
                                        <div
                                            key={p.id}
                                            className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all flex flex-col justify-between shadow-xs hover:shadow-md group relative"
                                        >
                                            <div>
                                                {/* Header: Logo / Avatar & Category */}
                                                <div className="flex items-start justify-between gap-4 mb-5">
                                                    {p.logo_url ? (
                                                        <img
                                                            src={p.logo_url}
                                                            alt={p.name}
                                                            className="h-12 w-auto max-w-[120px] object-contain shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-2xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] font-black text-lg flex items-center justify-center shrink-0">
                                                            {p.logo_text || p.name.substring(0, 2).toUpperCase()}
                                                        </div>
                                                    )}

                                                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                                        {p.category || 'Strategic Partner'}
                                                    </span>
                                                </div>

                                                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                                    {p.name}
                                                </h3>

                                                {p.partnership_type && (
                                                    <div className="text-xs font-semibold text-[#107E27] dark:text-[#1AC13B] mb-3">
                                                        {p.partnership_type}
                                                    </div>
                                                )}

                                                {descText && (
                                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                                                        {descText}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Card Footer: Website Link */}
                                            {p.website_url && (
                                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                                    <a
                                                        href={p.website_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline inline-flex items-center gap-1.5"
                                                    >
                                                        <span>{isEn ? 'Visit Official Portal' : 'Kunjungi Portal'}</span>
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* 4. Partner With Us CTA */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F5A1F] via-[#107E27] to-[#1AC13B] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                <img
                                    src="/assets/icon/profile_cs.png"
                                    alt="Partnership Support"
                                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0 drop-shadow-lg"
                                />
                                <div className="space-y-2 max-w-xl">
                                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                        {isEn ? 'Join Our Industrial & Research Alliance' : 'Bergabunglah dalam Jejaring Mitra Kami'}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                                        {isEn
                                            ? 'We invite enterprise leaders and governmental institutions to initiate joint research agreements (PKS/MoU) and applied technological pilots.'
                                            : 'Kami mengundang para pimpinan industri dan lembaga pemerintah untuk menjalin kerjasama riset (MoU/PKS) dan uji coba purwarupa.'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleOpenPartnerInquiry}
                                className="px-6 py-3 rounded-xl bg-white text-[#107E27] font-bold text-xs hover:bg-emerald-50 transition shadow-sm cursor-pointer shrink-0"
                            >
                                {isEn ? 'Initiate Partnership' : 'Jajaki Kemitraan'}
                            </button>
                        </div>
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
