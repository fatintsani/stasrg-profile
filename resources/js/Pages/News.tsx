import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Newspaper,
    Search,
    ChevronRight,
    ArrowRight,
    Sparkles,
    Calendar,
    Clock,
    User,
    ExternalLink,
    X,
    BookOpen,
    Layers
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { EmptyState } from '../Components/Common/EmptyState';
import { Article, ResearchDomain, Publication, EnterpriseService, SiteConfig } from '../types';

interface NewsPageProps {
    articles?: Article[];
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    siteConfig?: SiteConfig;
}

export default function News({
    articles = [],
    domains = [],
    publications = [],
    services = [],
    siteConfig,
}: NewsPageProps) {
    const [language, setLanguage] = useState<Language>('EN');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string>('all');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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
        const unique = Array.from(new Set(articles.map((a) => a.tag).filter(Boolean)));
        return [
            { id: 'all', label: isEn ? 'All News & Insights' : 'Semua Berita' },
            ...unique.map((tag) => ({ id: tag, label: tag })),
        ];
    }, [articles, isEn]);

    // Filtered articles
    const filteredArticles = useMemo(() => {
        return articles.filter((a) => {
            const matchesTag =
                selectedTag === 'all' ||
                (a.tag || '').toLowerCase() === selectedTag.toLowerCase();

            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesTag;

            const titleMatch = (a.title || '').toLowerCase().includes(query);
            const titleIdMatch = (a.title_id || '').toLowerCase().includes(query);
            const summaryMatch = (a.summary || '').toLowerCase().includes(query);
            const summaryIdMatch = (a.summary_id || '').toLowerCase().includes(query);
            const authorMatch = (a.author || '').toLowerCase().includes(query);

            return matchesTag && (titleMatch || titleIdMatch || summaryMatch || summaryIdMatch || authorMatch);
        });
    }, [articles, selectedTag, searchQuery]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${isEn ? 'News & Research Insights' : 'Berita & Warta Riset'} — ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
                <meta
                    name="description"
                    content="Latest research announcements, laboratory breakthroughs, technical articles, and academic dispatches from CoE STAS-RG Telkom University."
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
                                {isEn ? 'News & Insights' : 'Berita & Artikel'}
                            </span>
                        </div>
                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {isEn ? 'News &' : 'Berita &'}{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107E27] via-[#1AC13B] to-[#129E2F] dark:from-[#1AC13B] dark:to-[#7FE39F]">
                                    {isEn ? 'Research Insights' : 'Warta Terkini'}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn
                                    ? 'Stay informed with the latest scientific breakthroughs, grant awards, international symposia, and lab developments.'
                                    : 'Ikuti perkembangan terbaru mengenai terobosan ilmiah, perolehan hibah riset, simposium internasional, dan aktivitas laboratorium.'}
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
                                    placeholder={isEn ? 'Search articles, keywords...' : 'Cari berita, topik...'}
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

                {/* 3. News Grid */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredArticles.length === 0 ? (
                            <div className="max-w-md mx-auto">
                                <EmptyState
                                    title={isEn ? 'No Articles Found' : 'Tidak Ada Artikel Ditemukan'}
                                    description={isEn ? 'Try adjusting your search query or tag selection.' : 'Coba ubah kata kunci pencarian atau pilihan kategori.'}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {filteredArticles.map((a) => {
                                    const titleText = isEn ? a.title : (a.title_id || a.title);
                                    const summaryText = isEn ? a.summary : (a.summary_id || a.summary);

                                    return (
                                        <div
                                            key={a.id}
                                            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all flex flex-col justify-between shadow-xs hover:shadow-md overflow-hidden group cursor-pointer"
                                            onClick={() => setSelectedArticle(a)}
                                        >
                                            <div>
                                                {/* Image Banner */}
                                                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                                    {a.image_url ? (
                                                        <img
                                                            src={a.image_url}
                                                            alt={titleText}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-[#10381C] to-slate-900 flex items-center justify-center text-emerald-400 p-6">
                                                            <Newspaper className="w-12 h-12 opacity-40" />
                                                        </div>
                                                    )}
                                                    <div className="absolute top-3 left-3">
                                                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#107E27] dark:text-[#7FE39F] shadow-xs uppercase tracking-wider">
                                                            {a.tag || 'Research Insight'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                                        <span className="flex items-center gap-1 font-medium">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {a.date}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1 font-medium">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {a.read_time || '4 min read'}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors" title={titleText}>
                                                        {titleText}
                                                    </h3>

                                                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                                                        {summaryText}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate max-w-[60%]">
                                                    <User className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                                    <span className="truncate">{a.author || 'STAS-RG Editorial'}</span>
                                                </div>

                                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                    <span>{isEn ? 'Read Article' : 'Baca Artikel'}</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Article Detail Modal / Reader */}
            {selectedArticle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
                    <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#7FE39F] uppercase mb-2">
                                    {selectedArticle.tag || 'News'}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                                    {isEn ? selectedArticle.title : (selectedArticle.title_id || selectedArticle.title)}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                                    <span>{selectedArticle.date}</span>
                                    <span>•</span>
                                    <span>{selectedArticle.author || 'STAS-RG Editorial'}</span>
                                    <span>•</span>
                                    <span>{selectedArticle.read_time || '4 min read'}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {selectedArticle.image_url && (
                            <img
                                src={selectedArticle.image_url}
                                alt={selectedArticle.title}
                                className="w-full h-64 object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
                            />
                        )}

                        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 whitespace-pre-line">
                            {isEn
                                ? (selectedArticle.content || selectedArticle.summary)
                                : (selectedArticle.content_id || selectedArticle.summary_id || selectedArticle.summary)}
                        </div>

                        {selectedArticle.external_url && (
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <a
                                    href={selectedArticle.external_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition flex items-center gap-1.5"
                                >
                                    <span>{isEn ? 'View Original Source' : 'Buka Sumber Berita'}</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        )}
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
