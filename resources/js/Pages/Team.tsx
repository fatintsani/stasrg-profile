import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    Search,
    GraduationCap,
    BookOpen,
    Briefcase,
    Mail,
    ExternalLink,
    Building2,
    ChevronRight,
    Award,
    Filter,
    Layers,
    Sparkles,
    Check,
    Globe,
    FileText,
    FolderKanban,
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
import { Researcher, ResearchDomain, Publication, EnterpriseService, SiteConfig } from '../types';

interface TeamPageProps {
    researchers?: Researcher[];
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    siteConfig?: SiteConfig;
}

export default function Team({
    researchers = [],
    domains = [],
    publications = [],
    services = [],
    siteConfig,
}: TeamPageProps) {
    const [language, setLanguage] = useState<Language>('EN');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedResearcher, setSelectedResearcher] = useState<Researcher | null>(null);

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

    // Filter categories
    const categories = [
        { id: 'all', label: isEn ? 'All Members' : 'Semua Anggota' },
        { id: 'lecturer', label: isEn ? 'Lecturers & Lead PIs' : 'Dosen & Peneliti Utama' },
        { id: 'researcher', label: isEn ? 'Research Fellows' : 'Peneliti & Ahli Riset' },
        { id: 'student', label: isEn ? 'Student Contributors' : 'Kontributor Mahasiswa' },
        { id: 'advisory', label: isEn ? 'Advisory Board' : 'Dewan Penasihat' },
    ];

    // Filtered researchers list
    const filteredResearchers = useMemo(() => {
        return researchers.filter((r) => {
            const role = (r.role || '').toLowerCase();
            const matchesCategory =
                selectedCategory === 'all' ||
                (selectedCategory === 'lecturer' && (role.includes('lead') || role.includes('dosen') || role.includes('lecturer') || role.includes('principal') || role.includes('head'))) ||
                (selectedCategory === 'researcher' && (role.includes('fellow') || role.includes('researcher') || role.includes('peneliti') || role.includes('postdoc') || role.includes('engineer'))) ||
                (selectedCategory === 'student' && (role.includes('student') || role.includes('mahasiswa') || role.includes('assistant') || role.includes('contributor') || role.includes('intern'))) ||
                (selectedCategory === 'advisory' && (role.includes('advisor') || role.includes('advisory') || role.includes('penasihat') || role.includes('director')));

            const query = searchQuery.toLowerCase().trim();
            if (!query) return matchesCategory;

            const nameMatch = (r.name || '').toLowerCase().includes(query);
            const degreeMatch = (r.title_degree || '').toLowerCase().includes(query);
            const specMatch = (r.specialization || '').toLowerCase().includes(query);
            const specIdMatch = (r.specialization_id || '').toLowerCase().includes(query);
            const bioMatch = (r.bio || '').toLowerCase().includes(query);
            const focusMatch = (r.focus_areas || []).some((f) => f.toLowerCase().includes(query));

            return matchesCategory && (nameMatch || degreeMatch || specMatch || specIdMatch || bioMatch || focusMatch);
        });
    }, [researchers, selectedCategory, searchQuery]);

    const handleOpenContactWithResearcher = (researcherName: string) => {
        setContactSubject(`Research Collaboration Inquiry with ${researcherName}`);
        setContactOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${isEn ? 'Our Team & Researchers' : 'Tim Peneliti & Sivitas Laboratorium'} — ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
                <meta
                    name="description"
                    content="A dedicated team page for lecturers, principal investigators, research fellows, and student contributors at CoE STAS-RG Telkom University."
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
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                            <Link href="/" className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors">
                                {isEn ? 'Home' : 'Beranda'}
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <span className="text-slate-900 dark:text-white">
                                {isEn ? 'Our Team' : 'Tim Peneliti'}
                            </span>
                        </div>

                        {/* Title */}
                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {isEn ? 'Our' : 'Tim'}{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107E27] via-[#1AC13B] to-[#129E2F] dark:from-[#1AC13B] dark:to-[#7FE39F]">
                                    {isEn ? 'Research Team' : 'Peneliti & Inovator'}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn
                                    ? 'A dedicated team page for lecturers, principal investigators, and student contributors driving applied smart living and sustainable technology innovations.'
                                    : 'Halaman direktori khusus untuk dosen, peneliti utama, dan kontributor mahasiswa yang menggerakkan inovasi sistem cerdas dan teknologi berkelanjutan.'}
                            </p>
                        </div>
                    </div>

                    {/* Subtle Background Elements */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1AC13B]/10 rounded-full blur-3xl pointer-events-none" />
                </section>

                {/* 2. Directory Controls: Category Filters & Live Search */}
                <section id="team-directory" className="py-8 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Category Filter Pills */}
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

                            {/* Live Search Input */}
                            <div className="relative w-full md:w-80 shrink-0">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={isEn ? 'Search by name, expertise, or title...' : 'Cari nama, keahlian, atau gelar...'}
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

                {/* 3. Team Cards Grid */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {filteredResearchers.length === 0 ? (
                            <div className="max-w-md mx-auto">
                                <EmptyState
                                    title={isEn ? 'No Researchers Found' : 'Tidak Ada Peneliti Ditemukan'}
                                    description={
                                        isEn
                                            ? 'Try clearing your search query or selecting a different category filter.'
                                            : 'Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.'
                                    }
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {filteredResearchers.map((r) => {
                                    const displayName = r.title_degree ? `${r.name}, ${r.title_degree}` : r.name;
                                    const roleText = isEn ? r.role : (r.role_id || r.role);
                                    const specText = isEn ? r.specialization : (r.specialization_id || r.specialization);

                                    return (
                                        <div
                                            key={r.id}
                                            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all flex flex-col justify-between shadow-xs hover:shadow-md group"
                                        >
                                            <div>
                                                {/* Header / Avatar & Role */}
                                                <div className="flex items-start gap-4 mb-4">
                                                    {r.avatar_url ? (
                                                        <img
                                                            src={r.avatar_url}
                                                            alt={r.name}
                                                            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shrink-0 group-hover:scale-105 transition-transform"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#107E27] to-[#1AC13B] text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-xs">
                                                            {r.name.charAt(0)}
                                                        </div>
                                                    )}

                                                    <div className="min-w-0 flex-1">
                                                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#EDFBF1] dark:bg-[#10381C]/70 text-[#107E27] dark:text-[#7FE39F] mb-1 truncate max-w-full">
                                                            {roleText}
                                                        </span>
                                                        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors" title={displayName}>
                                                            {displayName}
                                                        </h3>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                            {r.department || 'Telkom University'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Specialization & Bio */}
                                                <div className="space-y-2 mb-4">
                                                    <div className="text-xs font-semibold text-[#107E27] dark:text-[#1AC13B]">
                                                        {specText}
                                                    </div>
                                                    {(r.bio || r.bio_id) && (
                                                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                                                            {isEn ? r.bio : (r.bio_id || r.bio)}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Focus Area Badges */}
                                                {r.focus_areas && r.focus_areas.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                                        {r.focus_areas.slice(0, 3).map((tag, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {r.focus_areas.length > 3 && (
                                                            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400">
                                                                +{r.focus_areas.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bottom Card Footer: Metrics & Academic Links */}
                                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                                                {/* Output Indicators */}
                                                <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                                                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300" title="Indexed Publications">
                                                        <BookOpen className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B]" />
                                                        {r.publications_count || 0}
                                                    </span>
                                                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300" title="Active Projects">
                                                        <FolderKanban className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B]" />
                                                        {r.projects_count || 0}
                                                    </span>
                                                </div>

                                                {/* External Academic Links */}
                                                <div className="flex items-center gap-1.5">
                                                    {r.scholar_url && (
                                                        <a
                                                            href={r.scholar_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#107E27] hover:bg-[#EDFBF1] dark:hover:bg-slate-800 transition"
                                                            title="Google Scholar Profile"
                                                        >
                                                            <GraduationCap className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                    {r.email && (
                                                        <a
                                                            href={`mailto:${r.email}`}
                                                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#107E27] hover:bg-[#EDFBF1] dark:hover:bg-slate-800 transition"
                                                            title="Send Email"
                                                        >
                                                            <Mail className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                    <button
                                                        onClick={() => setSelectedResearcher(r)}
                                                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] hover:opacity-90 transition cursor-pointer"
                                                    >
                                                        {isEn ? 'Bio' : 'Profil'}
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

            {/* Researcher Profile Detail Modal */}
            {selectedResearcher && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
                    <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                                {selectedResearcher.avatar_url ? (
                                    <img
                                        src={selectedResearcher.avatar_url}
                                        alt={selectedResearcher.name}
                                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#107E27] to-[#1AC13B] text-white font-extrabold text-xl flex items-center justify-center shrink-0">
                                        {selectedResearcher.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        {selectedResearcher.title_degree
                                            ? `${selectedResearcher.name}, ${selectedResearcher.title_degree}`
                                            : selectedResearcher.name}
                                    </h3>
                                    <div className="text-xs font-semibold text-[#107E27] dark:text-[#1AC13B] mt-0.5">
                                        {isEn ? selectedResearcher.role : (selectedResearcher.role_id || selectedResearcher.role)}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        {selectedResearcher.institution || 'Telkom University'}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedResearcher(null)}
                                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Specialization & Bio */}
                        <div className="space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                {isEn ? 'Academic Biography' : 'Biografi Akademik'}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-48 overflow-y-auto">
                                {isEn
                                    ? (selectedResearcher.bio || 'Active researcher at CoE STAS-RG focusing on applied smart systems and industrial connectivity.')
                                    : (selectedResearcher.bio_id || selectedResearcher.bio || 'Peneliti aktif di CoE STAS-RG yang berfokus pada sistem cerdas terapan dan konektivitas industri.')}
                            </p>
                        </div>

                        {/* Focus Areas */}
                        {selectedResearcher.focus_areas && selectedResearcher.focus_areas.length > 0 && (
                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                    {isEn ? 'Research Focus' : 'Fokus Riset'}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedResearcher.focus_areas.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#7FE39F]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Academic IDs & Links */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
                            {selectedResearcher.scopus_id && (
                                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <div className="text-[10px] text-slate-400 font-bold uppercase">Scopus ID</div>
                                    <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{selectedResearcher.scopus_id}</div>
                                </div>
                            )}
                            {selectedResearcher.orcid && (
                                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <div className="text-[10px] text-slate-400 font-bold uppercase">ORCID iD</div>
                                    <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{selectedResearcher.orcid}</div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                onClick={() => {
                                    handleOpenContactWithResearcher(selectedResearcher.name);
                                    setSelectedResearcher(null);
                                }}
                                className="px-5 py-2.5 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                            >
                                <Mail className="w-3.5 h-3.5" />
                                <span>{isEn ? 'Send Collaboration Inquiry' : 'Ajukan Kolaborasi Riset'}</span>
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
