import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    Search,
    ChevronRight,
    ArrowRight,
    Sparkles,
    Clock,
    MapPin,
    User,
    Ticket,
    Download,
    ExternalLink,
    CheckCircle2,
    Users,
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
import { UpcomingEvent, ResearchDomain, Publication, EnterpriseService, SiteConfig } from '../types';

interface EventsPageProps {
    events?: UpcomingEvent[];
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    siteConfig?: SiteConfig;
}

export default function Events({
    events = [],
    domains = [],
    publications = [],
    services = [],
    siteConfig,
}: EventsPageProps) {
    const [language, setLanguage] = useState<Language>('EN');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string>('all');

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

    // Unique tags
    const tags = useMemo(() => {
        const unique = Array.from(new Set(events.map((e) => e.tag).filter(Boolean)));
        return [
            { id: 'all', label: isEn ? 'All Symposia & Events' : 'Semua Agenda' },
            ...unique.map((tag) => ({ id: tag, label: tag })),
        ];
    }, [events, isEn]);

    // Filtered events
    const filteredEvents = useMemo(() => {
        return events.filter((e) => {
            const matchesTag =
                selectedTag === 'all' ||
                (e.tag || '').toLowerCase() === selectedTag.toLowerCase();

            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesTag;

            const titleMatch = (e.title || '').toLowerCase().includes(query);
            const titleIdMatch = (e.title_id || '').toLowerCase().includes(query);
            const descMatch = (e.description || '').toLowerCase().includes(query);
            const descIdMatch = (e.description_id || '').toLowerCase().includes(query);
            const speakerMatch = (e.speaker_name || '').toLowerCase().includes(query);
            const locationMatch = (e.location || '').toLowerCase().includes(query);

            return matchesTag && (titleMatch || titleIdMatch || descMatch || descIdMatch || speakerMatch || locationMatch);
        });
    }, [events, selectedTag, searchQuery]);

    const handleRegisterEvent = (eventTitle: string) => {
        setContactSubject(`Registration Request: ${eventTitle}`);
        setContactOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${isEn ? 'Events, Symposia & Workshops' : 'Agenda Simposium & Workshop'} — ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
                <meta
                    name="description"
                    content="Academic symposia, research workshops, industrial training, and masterclasses hosted by CoE STAS-RG Telkom University."
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
                                {isEn ? 'Events & Workshops' : 'Agenda & Acara'}
                            </span>
                        </div>

                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {isEn ? 'Events &' : 'Agenda &'}{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107E27] via-[#1AC13B] to-[#129E2F] dark:from-[#1AC13B] dark:to-[#7FE39F]">
                                    {isEn ? 'Symposia Calendar' : 'Simposium Ilmiah'}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn
                                    ? 'Join our upcoming international conferences, technical training, hybrid webinars, and hands-on laboratory workshops.'
                                    : 'Ikuti konferensi internasional, pelatihan teknis, webinar hibrida, dan lokakarya laboratorium bersama para pakar terkemuka.'}
                            </p>
                        </div>
                    </div>

                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1AC13B]/10 rounded-full blur-3xl pointer-events-none" />
                </section>

                {/* 2. Controls: Filter Pills & Search */}
                <section className="py-8 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Category Filter Pills */}
                            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                                {tags.map((tItem) => (
                                    <button
                                        key={tItem.id}
                                        onClick={() => setSelectedTag(tItem.id)}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                                            selectedTag === tItem.id
                                                ? 'bg-[#107E27] dark:bg-[#1AC13B] text-white border-transparent shadow-xs'
                                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]'
                                        }`}
                                    >
                                        {tItem.label}
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
                                    placeholder={isEn ? 'Search events, speakers...' : 'Cari acara, pembicara...'}
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

                {/* 3. Events Grid */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredEvents.length === 0 ? (
                            <div className="max-w-md mx-auto">
                                <EmptyState
                                    title={isEn ? 'No Events Found' : 'Tidak Ada Agenda Ditemukan'}
                                    description={isEn ? 'Try adjusting your search criteria.' : 'Coba sesuaikan kata kunci pencarian Anda.'}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {filteredEvents.map((e) => {
                                    const titleText = isEn ? e.title : (e.title_id || e.title);
                                    const descText = isEn ? e.description : (e.description_id || e.description);

                                    return (
                                        <div
                                            key={e.id}
                                            className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all flex flex-col justify-between shadow-xs hover:shadow-md group relative"
                                        >
                                            <div>
                                                {/* Header: Tag & Date */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#7FE39F] uppercase tracking-wider">
                                                        {e.tag || 'Symposium'}
                                                    </span>
                                                    <div className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{e.date_display}</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors leading-snug">
                                                    {titleText}
                                                </h3>

                                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
                                                    {descText}
                                                </p>

                                                {/* Details: Speaker, Time, Location */}
                                                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-6 text-xs text-slate-600 dark:text-slate-300">
                                                    {e.speaker_name && (
                                                        <div className="flex items-center gap-2">
                                                            <User className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                                            <span className="font-semibold text-slate-900 dark:text-white truncate">
                                                                {e.speaker_name} {e.speaker_title ? `(${e.speaker_title})` : ''}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {e.time_display && (
                                                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                                            <Clock className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                                            <span>{e.time_display}</span>
                                                        </div>
                                                    )}
                                                    {e.location && (
                                                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                                            <MapPin className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                                            <span className="truncate">{e.location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Card Footer: Quota & Action */}
                                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                                                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                    <Ticket className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B]" />
                                                    {e.quota_text || (isEn ? 'Open Registration' : 'Pendaftaran Terbuka')}
                                                </span>

                                                <button
                                                    onClick={() => handleRegisterEvent(titleText)}
                                                    className="px-4 py-2 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-1.5"
                                                >
                                                    <span>{isEn ? 'Register' : 'Daftar'}</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
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
