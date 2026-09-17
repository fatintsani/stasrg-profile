import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Briefcase,
    Search,
    ChevronRight,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Building2,
    Shield,
    Cpu,
    Zap,
    Layers,
    FileText,
    Check,
    MessageSquare,
    Users,
    Activity,
    SlidersHorizontal
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { EnterpriseService, ResearchDomain, Publication, SiteConfig } from '../types';

interface ServicesPageProps {
    services?: EnterpriseService[];
    domains?: ResearchDomain[];
    publications?: Publication[];
    siteConfig?: SiteConfig;
}

export default function Services({
    services = [],
    domains = [],
    publications = [],
    siteConfig,
}: ServicesPageProps) {
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

    const workflowSteps = [
        {
            step: '01',
            title: isEn ? 'Initial Discovery & Scoping' : 'Identifikasi Awal & Perumusan Masalah',
            desc: isEn
                ? 'Technical alignment with enterprise stakeholders to specify challenges, data availability, and performance goals.'
                : 'Penyelarasan teknis dengan pemangku kepentingan industri untuk merumuskan tantangan, ketersediaan data, dan target kinerja.',
        },
        {
            step: '02',
            title: isEn ? 'Formal Agreement & R&D Plan' : 'Perjanjian Formal & Rencana Riset (MoU/PKS)',
            desc: isEn
                ? 'Structuring joint research terms, milestone timelines, intellectual property provisions, and laboratory resource allocation.'
                : 'Penyusunan perjanjian kerjasama riset (PKS), garis waktu target, ketentuan hak kekayaan intelektual (HKI), dan alokasi fasilitas lab.',
        },
        {
            step: '03',
            title: isEn ? 'Simulation & Prototyping' : 'Simulasi, Uji Lab & Purwarupa',
            desc: isEn
                ? 'Developing custom algorithmic models, IoT hardware testbeds, or software architectures validated in lab conditions.'
                : 'Pengembangan model analitik kustom, testbed perangkat IoT, atau arsitektur perangkat lunak yang diuji ketat di lab.',
        },
        {
            step: '04',
            title: isEn ? 'Field Pilot & Technology Transfer' : 'Uji Lapangan & Alih Teknologi',
            desc: isEn
                ? 'Deploying pilots in production environments with comprehensive documentation, training, and operational handoff.'
                : 'Implementasi uji coba pada lingkungan produksi riil disertai dokumentasi komprehensif, pelatihan staf, dan serah terima sistem.',
        },
    ];

    const handleOpenInquiry = (serviceTitle: string) => {
        setContactSubject(`Consultancy & Service Inquiry: ${serviceTitle}`);
        setContactOpen(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${isEn ? 'Enterprise Services & Consultancy' : 'Layanan Riset Industri & Konsultasi'} — ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
                <meta
                    name="description"
                    content="Enterprise R&D consultancy, smart living technology prototyping, IoT testing, and technical advisory services by CoE STAS-RG Telkom University."
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
                                {isEn ? 'Services & Consulting' : 'Layanan & Konsultasi'}
                            </span>
                        </div>

                        <div className="max-w-3xl">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {isEn ? 'Enterprise' : 'Layanan Riset &'}{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107E27] via-[#1AC13B] to-[#129E2F] dark:from-[#1AC13B] dark:to-[#7FE39F]">
                                    {isEn ? 'R&D & Lab Services' : 'Konsultasi Teknologi'}
                                </span>
                            </h1>
                            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {isEn
                                    ? 'We collaborate with state-owned enterprises, industrial partners, and governmental bodies to deliver custom prototypes, technology feasibility audits, and specialized training.'
                                    : 'Kami berkolaborasi dengan BUMN, korporasi industri, dan kementerian untuk menghasilkan purwarupa kustom, audit kelayakan teknologi, dan pelatihan terapan.'}
                            </p>
                        </div>
                    </div>

                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1AC13B]/10 rounded-full blur-3xl pointer-events-none" />
                </section>

                {/* 2. Services Grid */}
                <section className="py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {services.map((s) => {
                                const titleText = isEn ? s.title : (s.title_id || s.title);
                                const summaryText = isEn ? s.summary : (s.summary_id || s.summary);

                                return (
                                    <div
                                        key={s.id}
                                        className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B] transition-all flex flex-col justify-between shadow-xs hover:shadow-md group relative"
                                    >
                                        <div>
                                            {/* Service Number & Icon */}
                                            <div className="flex items-center justify-between mb-5">
                                                <span className="text-xs font-black text-[#107E27] dark:text-[#1AC13B] px-3 py-1 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C]/70">
                                                    {s.service_number || '01'}
                                                </span>
                                                <div className="w-10 h-10 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] flex items-center justify-center font-bold">
                                                    <Briefcase className="w-5 h-5" />
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                                {titleText}
                                            </h3>

                                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                                                {summaryText}
                                            </p>

                                            {/* Deliverables / Features */}
                                            {s.features && s.features.length > 0 && (
                                                <div className="space-y-2 mb-6">
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                        {isEn ? 'Key Deliverables' : 'Lingkup Layanan'}
                                                    </div>
                                                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                                                        {s.features.map((feat, i) => (
                                                            <li key={i} className="flex items-start gap-2">
                                                                <Check className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0 mt-0.5" />
                                                                <span>{feat}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Footer: Advisor & Action */}
                                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                                            {s.lead_advisor ? (
                                                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                    <span className="font-semibold">{s.lead_advisor}</span>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-slate-400">
                                                    {isEn ? 'Advisory Team' : 'Tim Konsultan'}
                                                </div>
                                            )}

                                            <button
                                                onClick={() => handleOpenInquiry(titleText)}
                                                className="px-3.5 py-1.5 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition cursor-pointer shadow-xs shrink-0"
                                            >
                                                {isEn ? 'Consult Now' : 'Konsultasi'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 3. Engagement Process Workflow */}
                <section className="py-16 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {isEn ? 'How We Collaborate with Industry' : 'Tahapan Kolaborasi & Eksekusi'}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {isEn
                                    ? 'A structured four-stage methodology ensuring accountable execution from problem formulation to live pilot deployment.'
                                    : 'Metodologi empat tahap terstruktur untuk memastikan eksekusi yang transparan dan akuntabel.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {workflowSteps.map((ws) => (
                                <div
                                    key={ws.step}
                                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs"
                                >
                                    <div>
                                        <div className="text-3xl font-black text-[#107E27] dark:text-[#1AC13B] mb-3">
                                            {ws.step}
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                                            {ws.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {ws.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Call-To-Action */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F5A1F] via-[#107E27] to-[#1AC13B] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                <img
                                    src="/assets/icon/profile_cs.png"
                                    alt="Consultation Support"
                                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0 drop-shadow-lg"
                                />
                                <div className="space-y-2 max-w-xl">
                                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                        {isEn ? 'Need a Custom Technical Assessment?' : 'Butuh Kajian Teknis & Uji Kelayakan?'}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                                        {isEn
                                            ? 'Connect with our principal advisors to schedule an initial scoping session or technical feasibility consultation.'
                                            : 'Hubungi konsultan utama kami untuk menjadwalkan sesi identifikasi kebutuhan riset atau konsultasi teknis.'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleOpenInquiry('General Technical Consultation')}
                                className="px-6 py-3 rounded-xl bg-white text-[#107E27] font-bold text-xs hover:bg-emerald-50 transition shadow-sm cursor-pointer shrink-0"
                            >
                                {isEn ? 'Initiate Consultation' : 'Mulai Konsultasi'}
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
