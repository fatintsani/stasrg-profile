import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Compass,
    Target,
    Award,
    Shield,
    Calendar,
    Users,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Quote,
    Building2,
    Cpu,
    Zap,
    Layers,
    Globe,
    ExternalLink,
    ChevronRight,
    Milestone
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { AboutHighlight, ResearchDomain, Publication, EnterpriseService, SiteConfig } from '../types';

interface AboutPageProps {
    aboutHighlights?: AboutHighlight[];
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    siteConfig?: SiteConfig;
}

export default function About({
    aboutHighlights = [],
    domains = [],
    publications = [],
    services = [],
    siteConfig,
}: AboutPageProps) {
    const [language, setLanguage] = useState<Language>('EN');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

    const milestones = [
        {
            year: '2022',
            title: isEn ? 'Foundation & Initial Focus' : 'Pendirian & Fokus Awal',
            desc: isEn
                ? 'STAS-RG began with a focused mannequin research agenda and early defense-sector collaboration.'
                : 'STAS-RG memulai dengan agenda riset manekin terfokus dan kolaborasi awal pada sektor pertahanan strategis.',
            highlight: isEn ? 'Defense & Simulation Research' : 'Riset Pertahanan & Simulasi',
            icon: Shield,
        },
        {
            year: '2023',
            title: isEn ? 'Applied Systems Expansion' : 'Ekspansi Sistem Terapan',
            desc: isEn
                ? 'The lab expanded its applied systems work and strengthened its research process with more structured validation.'
                : 'Laboratorium memperluas kerja sistem terapan dan memperkuat proses riset dengan validasi yang lebih terstruktur.',
            highlight: isEn ? 'Field Testing & Methodology' : 'Pengujian Lapangan & Metodologi',
            icon: Zap,
        },
        {
            year: '2024',
            title: isEn ? 'Cross-Sector Convergence' : 'Konvergensi Lintas Sektor',
            desc: isEn
                ? 'Cross-campus and industry partnerships widened the project scope across smart security, monitoring, and automation.'
                : 'Kemitraan lintas kampus dan industri memperluas cakupan proyek di bidang keamanan cerdas, pemantauan, dan otomasi industri.',
            highlight: isEn ? 'Industry & Security Partnerships' : 'Kemitraan Industri & Keamanan',
            icon: Building2,
        },
        {
            year: '2025',
            title: isEn ? 'Accelerated Pipeline' : 'Akselerasi Purwarupa & Produk',
            desc: isEn
                ? 'The team reorganized its product and research pipeline to move faster from prototypes to usable systems.'
                : 'Tim mereorganisasi alur produk dan pipa riset untuk bergerak lebih cepat dari purwarupa menuju sistem yang siap digunakan.',
            highlight: isEn ? 'Production-Ready Implementations' : 'Implementasi Siap Pakai',
            icon: Cpu,
        },
    ];

    const visionPillars = [
        {
            number: '01',
            title: isEn ? 'Practical Technology Outcomes' : 'Hasil Teknologi Relevan & Praktis',
            desc: isEn
                ? 'Undertaking integrated research collaborations for the Telkom University academic community.'
                : 'Melaksanakan kolaborasi riset terintegrasi bagi sivitas akademika Telkom University.',
            detail: isEn
                ? 'Create relevant and practical technology outcomes.'
                : 'Menciptakan luaran teknologi yang aplikatif dan tepat guna.',
            icon: Target,
        },
        {
            number: '02',
            title: isEn ? 'Campus-Industry Synergy' : 'Sinergi Kampus & Industri',
            desc: isEn
                ? 'Creating and developing research activities that can be used by society through service programs.'
                : 'Menciptakan dan mengembangkan kegiatan riset yang dapat dimanfaatkan langsung oleh masyarakat melalui program pengabdian dan hilirisasi.',
            detail: isEn
                ? 'Strengthen collaboration between campus and industry.'
                : 'Memperkuat kolaborasi strategis antara universitas dan sektor industri.',
            icon: Users,
        },
        {
            number: '03',
            title: isEn ? 'Multidisciplinary Culture' : 'Budaya Riset Multidisiplin',
            desc: isEn
                ? 'Building research activity in close dialogue with industry needs and implementation realities.'
                : 'Membangun aktivitas riset yang berdialog erat dengan kebutuhan industri serta realitas implementasi di lapangan.',
            detail: isEn
                ? 'Build a sustainable and multidisciplinary research culture.'
                : 'Membangun budaya riset yang berkelanjutan, akuntabel, dan lintas bidang.',
            icon: Sparkles,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${isEn ? 'About Us & History' : 'Tentang Kami & Jejak Riset'} — ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
                <meta
                    name="description"
                    content="About the Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG). History, vision, mission, and research governance."
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
                                {isEn ? 'About CoE STAS-RG' : 'Tentang CoE STAS-RG'}
                            </span>
                        </div>

                        {/* Title */}
                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {isEn ? 'About' : 'Tentang'}{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107E27] via-[#1AC13B] to-[#129E2F] dark:from-[#1AC13B] dark:to-[#7FE39F]">
                                    {siteConfig?.center_name || 'CoE STAS-RG'}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn
                                    ? 'STAS-RG advances smart systems by connecting research quality with implementation discipline and collaboration.'
                                    : 'CoE STAS-RG memajukan sistem cerdas dengan menghubungkan kualitas riset ilmiah, kedisiplinan implementasi, dan kolaborasi strategis.'}
                            </p>
                        </div>
                    </div>

                    {/* Subtle Background Elements */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1AC13B]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-1/2 -left-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                </section>

                {/* 2. Core Philosophy Narrative */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-7 space-y-5">
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    {isEn ? 'Bridging Rigorous Science & Real Industrial Constraints' : 'Menjembatani Sains Presisi & Kebutuhan Nyata Industri'}
                                </h2>
                                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {isEn
                                        ? 'STAS-RG focuses on connectivity and convergence for smart living with an applied research mindset. The lab grows by translating technical ideas into systems that can be tested with real partners and real constraints.'
                                        : 'STAS-RG berfokus pada konektivitas dan konvergensi untuk smart living dengan pola pikir riset terapan. Laboratorium kami berkembang dengan mentransformasikan ide-ide teknis menjadi sistem nyata yang dapat diuji bersama mitra industri dengan batasan operasional riil.'}
                                </p>
                                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {isEn
                                        ? 'STAS-RG grows through practical collaboration, consistent field validation, and a research culture focused on usable outcomes.'
                                        : 'STAS-RG bertumbuh melalui kolaborasi praktis, validasi lapangan yang konsisten, dan budaya riset yang berorientasi pada luaran yang siap pakai.'}
                                </p>
                                <div className="pt-2 flex flex-wrap items-center gap-3">
                                    <Link
                                        href="/team"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition shadow-xs"
                                    >
                                        <Users className="w-4 h-4" />
                                        <span>{isEn ? 'Meet Our Researchers' : 'Kenali Tim Peneliti'}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] text-slate-700 dark:text-slate-200 text-xs font-bold transition"
                                    >
                                        <span>{isEn ? 'Explore Partnership' : 'Jajaki Kerjasama'}</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Director Card Quote */}
                            <div className="lg:col-span-5">
                                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F6FCF8] to-emerald-50/30 dark:from-slate-900 dark:to-slate-900/60 border border-[#1AC13B]/20 relative shadow-sm">
                                    <Quote className="w-10 h-10 text-[#1AC13B] opacity-30 mb-3" />
                                    <blockquote className="text-sm sm:text-base text-slate-700 dark:text-slate-200 italic leading-relaxed">
                                        "{siteConfig?.director_quote || 'Pioneering sustainable technology with impact. We build solutions that scale beyond laboratories.'}"
                                    </blockquote>
                                    <div className="mt-6 pt-5 border-t border-[#1AC13B]/20 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#107E27] to-[#1AC13B] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                                            {siteConfig?.director_name ? siteConfig.director_name.charAt(0) : 'A'}
                                        </div>
                                        <div>
                                            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                                                {siteConfig?.director_name || 'Prof. Dr. Ir. Adiwijaya, S.Si., M.Si.'}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {siteConfig?.director_title || 'Lead Advisor & Research Center Director'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Vision & Mission Cards */}
                <section className="py-12 sm:py-16 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDFBF1] dark:bg-[#10381C]/50 border border-[#1AC13B]/30 text-[#107E27] dark:text-[#7FE39F] text-xs font-bold mb-3 tracking-wide uppercase">
                                <Target className="w-3.5 h-3.5" />
                                <span>{isEn ? 'Guiding Principles' : 'Prinsip & Haluan Riset'}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {isEn ? 'Our Vision and Mission' : 'Visi dan Misi Utama'}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {isEn
                                    ? 'A strategic commitment to translate fundamental research into scalable and sustainable societal value.'
                                    : 'Komitmen strategis dalam mentransformasikan riset fundamental menjadi nilai guna yang berkelanjutan.'}
                            </p>
                        </div>

                        {/* Vision & Mission Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {/* Vision Card */}
                            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all shadow-xs relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1AC13B]/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                                <div className="w-12 h-12 rounded-2xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] flex items-center justify-center font-bold mb-5 shadow-xs">
                                    <Target className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">
                                    {isEn ? 'Vision' : 'Visi'}
                                </h3>
                                <p className="text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                                    {isEn
                                        ? 'Build smart systems that connect research insight with real social and industrial impact.'
                                        : 'Membangun sistem cerdas yang menghubungkan wawasan riset dengan dampak sosial dan industri yang nyata.'}
                                </p>
                            </div>

                            {/* Mission Card */}
                            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all shadow-xs relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                                <div className="w-12 h-12 rounded-2xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] flex items-center justify-center font-bold mb-5 shadow-xs">
                                    <Compass className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">
                                    {isEn ? 'Mission' : 'Misi'}
                                </h3>
                                <p className="text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                                    {isEn
                                        ? 'Develop multidisciplinary solutions in sensing, automation, AI, and digital systems through accountable implementation.'
                                        : 'Mengembangkan solusi multidisiplin dalam penginderaan, otomasi, AI, dan sistem digital melalui implementasi yang dapat dipertanggungjawabkan.'}
                                </p>
                            </div>
                        </div>

                        {/* 3 Core Pillars / Illustrations */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {visionPillars.map((pillar) => {
                                const IconComponent = pillar.icon;
                                return (
                                    <div
                                        key={pillar.number}
                                        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-xs font-black text-[#107E27] dark:text-[#1AC13B] px-2.5 py-1 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C]/60">
                                                    {pillar.number}
                                                </div>
                                                <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-[#1AC13B] transition-colors" />
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                                                {pillar.detail}
                                            </h4>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {pillar.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 4. History & Milestone Timeline (2022 - 2025) */}
                <section className="py-16 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDFBF1] dark:bg-[#10381C]/50 border border-[#1AC13B]/30 text-[#107E27] dark:text-[#7FE39F] text-xs font-bold mb-3 tracking-wide uppercase">
                                <Milestone className="w-3.5 h-3.5" />
                                <span>{isEn ? 'Laboratory Milestones' : 'Jejak Perjalanan & Perkembangan'}</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {isEn ? 'The Evolution of STAS-RG' : 'Perjalanan Riset STAS-RG'}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {isEn
                                    ? 'A continuous progression from specialized simulation prototypes to enterprise-grade smart living deployments.'
                                    : 'Perjalanan konsisten dari purwarupa manekin pertahanan hingga implementasi sistem cerdas di industri.'}
                            </p>
                        </div>

                        {/* Timeline Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                            {milestones.map((m, idx) => {
                                const IconComp = m.icon;
                                return (
                                    <div
                                        key={m.year}
                                        className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all flex flex-col justify-between shadow-xs group"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-2xl font-black text-[#107E27] dark:text-[#1AC13B]">
                                                    {m.year}
                                                </span>
                                                <div className="w-9 h-9 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] flex items-center justify-center">
                                                    <IconComp className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <div className="text-[11px] font-bold text-[#107E27] dark:text-[#7FE39F] uppercase tracking-wider mb-1">
                                                {m.highlight}
                                            </div>
                                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                                                {m.title}
                                            </h3>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {m.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 5. Call-To-Action Banner */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F5A1F] via-[#107E27] to-[#1AC13B] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                <img
                                    src="/assets/icon/profile_cs.png"
                                    alt="Collaboration Support"
                                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0 drop-shadow-lg"
                                />
                                <div className="space-y-2 max-w-xl">
                                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                        {isEn ? 'Collaborate with Our Research Fellows' : 'Bermitra dengan Tim Peneliti Kami'}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                                        {isEn
                                            ? 'Discover opportunities for joint industrial grants, academic publications, and advanced prototyping.'
                                            : 'Temukan peluang kerjasama riset industri, publikasi bersama, dan pengembangan purwarupa teknologi mutakhir.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 shrink-0">
                                <Link
                                    href="/team"
                                    className="px-6 py-3 rounded-xl bg-white text-[#107E27] font-bold text-xs hover:bg-emerald-50 transition shadow-sm"
                                >
                                    {isEn ? 'View Researcher Directory' : 'Lihat Direktori Peneliti'}
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-6 py-3 rounded-xl bg-[#0B4618]/60 hover:bg-[#0B4618]/80 text-white font-bold text-xs border border-white/20 transition"
                                >
                                    {isEn ? 'Get In Touch' : 'Hubungi Kami'}
                                </Link>
                            </div>
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
