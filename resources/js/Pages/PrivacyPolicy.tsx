import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ShieldCheck,
    Lock,
    FileText,
    Key,
    Database,
    Globe,
    UserCheck,
    CheckCircle2,
    Search,
    Printer,
    ArrowLeft,
    Clock,
    AlertCircle,
    ChevronRight,
    ChevronDown,
    Building2,
    Mail,
    Phone,
    MapPin,
    HelpCircle,
    SlidersHorizontal,
    Share2,
    Check,
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { ResearchDomain, Publication, EnterpriseService, ResearchProject, Article, SiteConfig } from '../types';

interface PrivacyPolicyProps {
    siteConfig?: SiteConfig;
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    projects?: ResearchProject[];
    articles?: Article[];
    lastUpdated?: string;
}

interface SectionItem {
    id: string;
    title: {
        EN: string;
        ID: string;
    };
    icon: React.ReactNode;
    content: {
        EN: React.ReactNode;
        ID: React.ReactNode;
    };
}

export default function PrivacyPolicy({
    siteConfig,
    domains = [],
    publications = [],
    services = [],
    projects = [],
    articles = [],
    lastUpdated = '17 September 2026',
}: PrivacyPolicyProps) {
    // 1. Language State
    const [language, setLanguage] = useState<Language>('ID');

    // 2. Theme State
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 3. Search & Filter within policy
    const [searchQuery, setSearchQuery] = useState('');

    // 4. Active Section for ScrollSpy
    const [activeSection, setActiveSection] = useState('scope');

    // 5. FAQ Accordion Open State
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    // 6. Share Copied Toast
    const [copiedToast, setCopiedToast] = useState(false);

    // Modals
    const [searchOpen, setSearchOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [contactSubject, setContactSubject] = useState('');

    useEffect(() => {
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }

        const savedTheme = localStorage.getItem('stas_theme') as 'light' | 'dark';
        if (savedTheme === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    // 1-Click Language Switch
    const handleToggleLanguage = () => {
        const nextLang: Language = language === 'EN' ? 'ID' : 'EN';
        setLanguage(nextLang);
        localStorage.setItem('stas_lang', nextLang);
    };

    // Theme Switch
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

    // ScrollSpy observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -60% 0px' }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleShareLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopiedToast(true);
            setTimeout(() => setCopiedToast(false), 2500);
        }
    };

    const handleOpenDpoContact = (subject: string) => {
        setContactSubject(subject);
        setContactOpen(true);
    };

    const t = translations[language];

    // Policy Content Structure
    const policySections: SectionItem[] = [
        {
            id: 'scope',
            title: {
                EN: '1. Executive Summary & Scope',
                ID: '1. Ringkasan Eksekutif & Cakupan Kebijakan',
            },
            icon: <FileText className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            This Privacy Policy sets out the commitment of the <strong>Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG)</strong>, hosted under <strong>Telkom University</strong>, regarding the protection, lawful processing, and integrity of personal data and confidential research materials collected through our portal (<code>stasrg.telkomuniversity.ac.id</code>), research laboratories, collaborative systems, and joint industrial R&D programs.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Entity in Charge
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    CoE STAS-RG, School of Industrial & Systems Engineering, Telkom University, Bandung, Indonesia.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Target Stakeholders
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Principal investigators, students, industrial partners, visiting researchers, webinar participants, and website visitors.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Kebijakan Privasi ini merupakan komitmen resmi dari <strong>Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG)</strong> di bawah naungan <strong>Telkom University</strong> dalam melindungi, mengelola, dan menjamin keamanan data pribadi serta integritas data riset yang diperoleh melalui situs web resmi (<code>stasrg.telkomuniversity.ac.id</code>), repositori riset laboratorium, fasilitas komputasi, serta program kemitraan industri.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Pengendali Data
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    CoE STAS-RG, Fakultas Rekayasa Industri, Telkom University, Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Subjek Kebijakan
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Peneliti, dosen, mahasiswa, mitra industri BUMN/swasta, peserta simposium/pelatihan, dan pengunjung portal riset.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'legal-framework',
            title: {
                EN: '2. Legal Basis & Governance Standards',
                ID: '2. Landasan Hukum & Standar Kepatuhan',
            },
            icon: <ShieldCheck className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Our data processing activities strictly comply with applicable national and international regulatory frameworks:
                        </p>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Republic of Indonesia Law No. 27 of 2022</strong> on Personal Data Protection (UU PDP).
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>ISO/IEC 27001:2022</strong> Information Security Management Framework adopted by Telkom University.
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>General Data Protection Regulation (GDPR)</strong> standards (Art. 6 & Art. 89) for transnational academic research and joint international consortiums.
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Academic Code of Conduct & Research Ethics</strong> issued by the Directorate of Research and Community Service (PPM Telkom University).
                                </span>
                            </li>
                        </ul>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Seluruh pemrosesan data pribadi dan tata kelola informasi di CoE STAS-RG tunduk dan patuh pada ketentuan regulasi berikut:
                        </p>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Undang-Undang RI No. 27 Tahun 2022</strong> tentang Pelindungan Data Pribadi (UU PDP).
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Standar Sistem Manajemen Keamanan Informasi ISO/IEC 27001:2022</strong> yang diterapkan di lingkungan Telkom University.
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>General Data Protection Regulation (GDPR)</strong> untuk kolaborasi konsorsium riset internasional dan publikasi jurnal terindeks global.
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Kode Etik Riset & Integritas Akademik</strong> Direktorat Penelitian dan Pengabdian Masyarakat (PPM) Telkom University.
                                </span>
                            </li>
                        </ul>
                    </div>
                ),
            },
        },
        {
            id: 'collected-data',
            title: {
                EN: '3. Categories of Data Collected',
                ID: '3. Kategori Data Pribadi yang Kami Kumpulkan',
            },
            icon: <Database className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            We collect data proportionally and strictly for legitimate academic, administrative, and collaborative operational purposes:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Key className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Identity & Account Details
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Full name, institutional email, phone number, academic title, staff/student ID (NIP/NIM), home institution, and research specialization.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Research & Industry Inquiries
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Project proposal submissions, laboratory testing requests, consultancy briefs, NDAs, and mutual collaboration agreements.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Globe className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Technical Telemetry & Server Logs
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    IP address, browser user-agent, operating system, timestamp of access, error logs, and session tokens.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Scientific Datasets & Artifacts
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Experimental telemetry data, sensor readings, algorithm code, and academic publication manuscripts uploaded to our secure workspace.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Kami mengumpulkan data pribadi secara proporsional dan hanya untuk tujuan riset, administrasi akademik, dan operasional kerja sama yang sah:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Key className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Identitas & Akun Pengguna
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Nama lengkap dengan gelar akademik, NIP/NIM, alamat email institusi, nomor telepon, instansi asal, dan bidang keahlian riset.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Data Permohonan & Kemitraan
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Proposal penelitian terapan, permohonan pengujian laboratorium, permintaan konsultasi industri, serta dokumen NDA kerja sama.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Globe className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Log Teknis & Telemetri Server
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Alamat IP, tipe peramban (browser), sistem operasi, stempel waktu aktivitas, log audit keamanan, dan session token otentikasi.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Dataset Riset & Hasil Uji Laboratorium
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Data mentah sensor IoT industri, model kecerdasan buatan, data optimasi rantai pasok, dan naskah publikasi ilmiah yang diunggah ke repositori.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'purposes',
            title: {
                EN: '4. Purposes of Data Processing',
                ID: '4. Tujuan & Dasar Hukum Pemrosesan Data',
            },
            icon: <SlidersHorizontal className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Personal data collected by CoE STAS-RG is strictly used for the following legitimate purposes:
                        </p>
                        <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    1
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Academic Research Execution & Computing Access
                                    </strong>
                                    Facilitating secure login via Telkom University SSO, managing permissions to HPC clusters, IoT testbeds, and research workspaces.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    2
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Industrial Collaboration & Consultancy Execution
                                    </strong>
                                    Managing joint R&D pipelines, project milestones, testing certifications, and official client correspondence with industrial partners.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    3
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Scientific Publication Attribution & Integrity
                                    </strong>
                                    Ensuring accurate author indexing on international repositories (Scopus, IEEE Xplore, Google Scholar, SINTA) and maintaining academic integrity.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    4
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Infrastructure Security & Threat Prevention
                                    </strong>
                                    Monitoring suspicious access patterns, preventing unauthorized intrusion, and meeting institutional audit requirements.
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Data pribadi yang dikumpulkan hanya digunakan untuk tujuan-tujuan yang sah berikut:
                        </p>
                        <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    1
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Operasional Riset & Akses Komputasi Laboratorium
                                    </strong>
                                    Otentikasi akses akun via Single Sign-On (SSO) Telkom University, alokasi hak akses cluster komputasi, dan manajemen repositori proyek riset.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    2
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Pengelolaan Kemitraan & Layanan Konsultasi Industri
                                    </strong>
                                    Memproses pengajuan proposal R&D bersama mitra BUMN/swasta, uji sertifikasi laboratorium, dan korespondensi resmi proyek riset.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    3
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Atribusi Publikasi Ilmiah & Integritas Akademik
                                    </strong>
                                    Pencantuman identitas penulis pada indeks bereputasi (Scopus, IEEE Xplore, SINTA, Web of Science) serta pelaporan resmi ke Kemendikbudristek/BRIN.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    4
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Keamanan Sistem & Pencegahan Serangan Siber
                                    </strong>
                                    Pemantauan log keamanan server, mitigasi akses tidak sah, dan audit berkala kepatuhan ISO/IEC 27001.
                                </div>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'security-retention',
            title: {
                EN: '5. Security Safeguards & Retention Periods',
                ID: '5. Pengamanan Enkripsi & Masa Retensi Data',
            },
            icon: <Lock className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            We implement multi-layered technical and organizational security controls to protect your data against unauthorized disclosure, loss, or manipulation:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center sm:text-left">
                                <div className="text-[#1AC13B] font-bold text-sm mb-1">AES-256 & TLS 1.3</div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                    End-to-end encryption in transit and cryptographic data protection at rest.
                                </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center sm:text-left">
                                <div className="text-[#1AC13B] font-bold text-sm mb-1">Strict RBAC Access</div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                    Role-Based Access Controls with principle of least privilege for laboratory databases.
                                </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center sm:text-left">
                                <div className="text-[#1AC13B] font-bold text-sm mb-1">Automated Backups</div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                    Encrypted geo-redundant disaster recovery snapshots tested quarterly.
                                </p>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
                            <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                            <span>
                                <strong>Retention Policy:</strong> Personal account data is retained for the duration of the research fellow's active tenure plus 5 years for academic accreditation audits. Technical access logs are purged after 12 months.
                            </span>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Kami menerapkan kontrol keamanan teknis dan organisasi berlapis untuk mencegah akses ilegal, manipulasi data, atau kebocoran informasi:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center sm:text-left">
                                <div className="text-[#1AC13B] font-bold text-sm mb-1">AES-256 & TLS 1.3</div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                    Enkripsi data saat transit dan enkripsi kriptografis database pada penyimpanan server.
                                </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center sm:text-left">
                                <div className="text-[#1AC13B] font-bold text-sm mb-1">Kontrol Akses RBAC</div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                    Pembatasan hak akses berjenjang berbasis peran dengan prinsip *least privilege*.
                                </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center sm:text-left">
                                <div className="text-[#1AC13B] font-bold text-sm mb-1">Cadangan Terenkripsi</div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                                    Backup otomatis berkala dengan prosedur pemulihan bencana (*disaster recovery*).
                                </p>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
                            <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                            <span>
                                <strong>Ketentuan Retensi:</strong> Data akun peneliti disimpan selama periode keanggotaan aktif ditambah 5 tahun untuk keperluan audit akreditasi akademik. Log audit teknis server dimusnahkan secara berkala setelah 12 bulan.
                            </span>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'third-party-sharing',
            title: {
                EN: '6. Third-Party Disclosures & International Transfers',
                ID: '6. Pembagian Data ke Pihak Ketiga & Transfer Internasional',
            },
            icon: <Globe className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0" />
                            <span>CoE STAS-RG DOES NOT SELL or commercialize your personal information to any third parties or advertisers.</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Data is only disclosed under strict conditions:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Academic Indexing & Repositories:</strong> Author name and affiliations shared with Scopus, IEEE, Springer, and SINTA for open scientific indexing.
                            </li>
                            <li>
                                • <strong>Research Grant Donors:</strong> Aggregate project reports submitted to funding bodies (Kemenristek, LPDP, Horizon Europe) without disclosing personal data.
                            </li>
                            <li>
                                • <strong>Legal Compliance:</strong> If mandated by valid law enforcement warrants issued under the laws of the Republic of Indonesia.
                            </li>
                        </ul>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0" />
                            <span>CoE STAS-RG TIDAK PERNAH MENJUAL atau mengomersialkan data pribadi Anda kepada pihak ketiga atau pengiklan.</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Pengungkapan data hanya dapat dilakukan pada kondisi berikut:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Pengindeks Jurnal Bereputasi:</strong> Nama penulis dan afiliasi institusi dibagikan ke Scopus, IEEE, Springer, dan SINTA untuk sitasi publikasi ilmiah.
                            </li>
                            <li>
                                • <strong>Pemberi Hibah Riset:</strong> Laporan luaran riset dalam bentuk data agregat anonim kepada pemberi dana (BRIN, LPDP, Kemenristek).
                            </li>
                            <li>
                                • <strong>Kewajiban Hukum:</strong> Apabila diwajibkan oleh penetapan pengadilan atau perintah penegak hukum resmi Negara Republik Indonesia.
                            </li>
                        </ul>
                    </div>
                ),
            },
        },
        {
            id: 'user-rights',
            title: {
                EN: '7. Your Statutory Data Subject Rights',
                ID: '7. Hak-Hak Pemilik Data Pribadi (Data Subject Rights)',
            },
            icon: <UserCheck className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Under Indonesian Law No. 27/2022 (UU PDP) and GDPR principles, you possess enforceable legal rights regarding your personal information:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Right to Access & Copy
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Request confirmation and a copy of all personal records we hold about you.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Data Subject Request: Right of Access')}
                                    className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Request Records</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Right to Rectification
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Correct outdated or inaccurate academic degrees, affiliations, or contact details.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Data Subject Request: Right to Rectification')}
                                    className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Update Data</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Right to Erasure (RTBF)
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Request deletion of your profile data subject to statutory archive retention laws.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Data Subject Request: Right to Erasure')}
                                    className="text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Request Erasure</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Data Portability
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Obtain your experimental dataset metadata in structured JSON/CSV format.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Data Subject Request: Data Portability')}
                                    className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Export Datasets</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Restriction & Objection
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Restrict specific processing activities or withdraw previous voluntary consent.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Data Subject Request: Restrict Processing')}
                                    className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Restrict Processing</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Lodge DPO Complaint
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Submit a formal inquiry directly to the Data Protection Officer.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('DPO Formal Privacy Complaint')}
                                    className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Contact Officer</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Berdasarkan UU No. 27/2022 (UU PDP) dan standar privasi internasional, Anda memiliki hak-hak hukum berikut:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Hak Akses & Salinan Data
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Memperoleh konfirmasi dan salinan data pribadi yang tersimpan dalam sistem kami.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Permintaan Hak Akses Data Pribadi')}
                                    className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Ajukan Permohonan</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Hak Perbaikan & Pemutakhiran
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Memperbarui data gelar, afiliasi, kontak, atau profil peneliti yang tidak akurat.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Permintaan Pemutakhiran Data Pribadi')}
                                    className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Perbarui Data</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Hak Penghapusan Data
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Meminta penghapusan data akun pribadi sesuai batas ketentuan arsip akademik.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Permintaan Penghapusan Data Pribadi (Right to Erasure)')}
                                    className="text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Minta Hapus</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Hak Portabilitas Data
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Mendapatkan metadata dataset dan hasil riset Anda dalam format terstruktur (JSON/CSV).
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Permintaan Portabilitas Data Riset')}
                                    className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Ekspor Dataset</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Hak Pembatasan & Penolakan
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Membatasi pemrosesan data tertentu atau menarik persetujuan yang telah diberikan.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Permintaan Pembatasan Pemrosesan Data')}
                                    className="text-[11px] font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Batasi Pemrosesan</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                        Pengaduan Pejabat DPO
                                    </span>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                                        Menyampaikan pertanyaan atau keluhan langsung ke Petugas Pelindungan Data.
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleOpenDpoContact('Pengaduan Resmi Perlindungan Data Pribadi')}
                                    className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>Hubungi DPO</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'cookies-tracking',
            title: {
                EN: '8. Cookies & Zero-Ad Analytics Policy',
                ID: '8. Kebijakan Cookie & Analitik Bebas Iklan',
            },
            icon: <SlidersHorizontal className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Our portal only utilizes essential session cookies and privacy-preserving anonymous performance metrics. We do not integrate third-party ad retargeting pixels or tracking brokers.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                    Essential Functional Cookies
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Required for CSRF token security, SSO authentication sessions, and user interface preferences (Language EN/ID, Dark/Light Mode).
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                    Zero Commercial Tracking
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    We do not track cross-site browsing activity and do not monetize visitor analytics.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Situs web CoE STAS-RG hanya menggunakan cookie fungsional esensial untuk keamanan dan preferensi pengguna. Kami tidak memasang pelacak iklan komersial dari pihak ketiga.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                    Cookie Fungsional Wajib
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Dibutuhkan untuk keamanan sesi CSRF, autentikasi SSO, dan preferensi tampilan (Pilihan Bahasa ID/EN, Mode Gelap/Terang).
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                    Bebas Pelacak Komersial
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Kami tidak melacak riwayat penjelajahan lintas situs Anda dan tidak membagikan data kepada jaringan periklanan.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'dpo-contact',
            title: {
                EN: '9. Data Protection Officer (DPO) & Contact Information',
                ID: '9. Pejabat Pelindungan Data (DPO) & Saluran Pengaduan',
            },
            icon: <Mail className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            If you have inquiries regarding this Privacy Policy, wish to exercise your data subject rights, or need to report a suspected security concern, please contact our designated Data Protection team:
                        </p>
                        <div className="p-4 rounded-xl bg-[#EDFBF1]/80 dark:bg-[#0A1C12] border border-[#1AC13B]/30 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#1AC13B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                    DPO
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Data Protection & Ethics Committee
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        Center of Excellence STAS-RG | Telkom University
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <Mail className="w-4 h-4 text-[#1AC13B] shrink-0" />
                                    <a
                                        href={`mailto:${siteConfig?.contact_email || 'stasrg@telkomuniversity.ac.id'}`}
                                        className="hover:text-[#1AC13B] font-semibold truncate"
                                    >
                                        {siteConfig?.contact_email || 'stasrg@telkomuniversity.ac.id'}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <Phone className="w-4 h-4 text-[#1AC13B] shrink-0" />
                                    <span>{siteConfig?.contact_phone || '+62 22 756 4108'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <MapPin className="w-4 h-4 text-[#1AC13B] shrink-0" />
                                    <span className="truncate">Bandung, Jawa Barat, Indonesia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Untuk pertanyaan seputar Kebijakan Privasi, pelaksanaan hak subjek data, atau pelaporan insiden keamanan informasi, silakan hubungi tim Pejabat Pelindungan Data (DPO) kami:
                        </p>
                        <div className="p-4 rounded-xl bg-[#EDFBF1]/80 dark:bg-[#0A1C12] border border-[#1AC13B]/30 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#1AC13B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                    DPO
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Komite Etika & Pelindungan Data Pribadi
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        Center of Excellence STAS-RG | Telkom University
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <Mail className="w-4 h-4 text-[#1AC13B] shrink-0" />
                                    <a
                                        href={`mailto:${siteConfig?.contact_email || 'stasrg@telkomuniversity.ac.id'}`}
                                        className="hover:text-[#1AC13B] font-semibold truncate"
                                    >
                                        {siteConfig?.contact_email || 'stasrg@telkomuniversity.ac.id'}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <Phone className="w-4 h-4 text-[#1AC13B] shrink-0" />
                                    <span>{siteConfig?.contact_phone || '+62 22 756 4108'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <MapPin className="w-4 h-4 text-[#1AC13B] shrink-0" />
                                    <span className="truncate">Bandung, Jawa Barat, Indonesia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
    ];

    // FAQ Items
    const faqItems = [
        {
            q: {
                EN: 'Are research lab dataset uploads made public automatically?',
                ID: 'Apakah dataset yang diunggah ke laboratorium riset otomatis menjadi publik?',
            },
            a: {
                EN: 'No. All research datasets uploaded to our private computing repositories remain strictly confidential under the respective Project Investigator’s permission model. Only explicitly approved Open Data publications are released to public repositories.',
                ID: 'Tidak. Seluruh dataset eksperimen yang diunggah ke server riset bersifat rahasia dan hanya dapat diakses oleh tim peneliti yang berwenang. Dataset hanya dipublikasikan jika terdapat persetujuan tertulis untuk rilis Open Science.',
            },
        },
        {
            q: {
                EN: 'How does Telkom University Single Sign-On (SSO) share credentials?',
                ID: 'Bagaimana integrasi Single Sign-On (SSO) Telkom University mengelola kredensial?',
            },
            a: {
                EN: 'Our portal authenticates through the official Telkom University OAuth2/OpenID Connect protocol. Your plaintext password is never stored or processed directly by the STAS-RG application server.',
                ID: 'Portal kami menggunakan protokol terenkripsi OAuth2/OpenID Connect resmi Telkom University. Kata sandi akun SSO Anda tidak pernah disimpan secara langsung di database internal STAS-RG.',
            },
        },
        {
            q: {
                EN: 'How do we protect confidential industrial intellectual property (IP)?',
                ID: 'Bagaimana CoE STAS-RG melindungi kerahasiaan data industri & HKI mitra?',
            },
            a: {
                EN: 'All collaborative R&D engagements with state-owned enterprises (BUMN) and private corporations are bound by legally binding Non-Disclosure Agreements (NDAs). Laboratory telemetry and commercial algorithms are isolated in air-gapped or dedicated secure network segments.',
                ID: 'Setiap kemitraan R&D terapan dilindungi perjanjian kerahasiaan (NDA) yang mengikat secara hukum. Data pengujian pabrik dan algoritma industri diisolasi pada jaringan komputasi tertutup dengan proteksi ketat.',
            },
        },
    ];

    // Filter sections based on search query
    const filteredSections = useMemo(() => {
        if (!searchQuery.trim()) return policySections;
        const q = searchQuery.toLowerCase();
        return policySections.filter((section) => {
            const titleMatch =
                section.title.EN.toLowerCase().includes(q) || section.title.ID.toLowerCase().includes(q);
            return titleMatch;
        });
    }, [searchQuery, policySections]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{language === 'EN' ? 'Privacy Policy & Data Governance - CoE STAS-RG' : 'Kebijakan Privasi & Tata Kelola Data - CoE STAS-RG'}</title>
                <meta
                    name="description"
                    content="Official Privacy Policy and Research Data Governance Framework of Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG), Telkom University."
                />
            </Head>

            {/* Navigation Header */}
            <Navbar
                language={language}
                onToggleLanguage={handleToggleLanguage}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenLogin={() => setLoginOpen(true)}
                t={t.nav}
            />

            <main className="flex-grow">
                {/* Header Hero Banner */}
                <div className="relative bg-gradient-to-b from-[#EDFBF1]/60 via-transparent to-transparent dark:from-[#0A1C12]/40 dark:via-transparent border-b border-slate-200/80 dark:border-slate-800/80 pt-28 sm:pt-32 pb-10 sm:pb-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
                            <Link href="/" className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors">
                                {language === 'EN' ? 'Home' : 'Beranda'}
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-400 dark:text-slate-500">
                                {language === 'EN' ? 'Legal & Governance' : 'Legal & Tata Kelola'}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[#107E27] dark:text-[#1AC13B]">
                                {language === 'EN' ? 'Privacy Policy' : 'Kebijakan Privasi'}
                            </span>
                        </div>

                        {/* Title Header */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div className="max-w-3xl">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                    {language === 'EN'
                                        ? 'Privacy Policy & Research Data Governance'
                                        : 'Kebijakan Privasi & Tata Kelola Data'}
                                </h1>
                                <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {language === 'EN'
                                        ? 'Committed to safeguarding personal information, experimental telemetry, and collaborative industrial data under Indonesian PDP Law (UU No. 27/2022) and ISO/IEC 27001 standards.'
                                        : 'Komitmen resmi CoE STAS-RG Telkom University dalam menjamin pelindungan data pribadi, kerahasiaan riset industri, dan integritas data akademik sesuai UU PDP No. 27/2022 dan ISO/IEC 27001.'}
                                </p>

                                {/* Badges */}
                                <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                        <Clock className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>
                                            {language === 'EN' ? 'Effective Date:' : 'Berlaku Sejak:'}{' '}
                                            <strong>{lastUpdated}</strong>
                                        </span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>UU No. 27/2022 PDP Compliant</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                        <Lock className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>ISO/IEC 27001 Standard</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                        <span>Version 2.4 (Active)</span>
                                    </span>
                                </div>
                            </div>

                            {/* Action Utilities */}
                            <div className="flex items-center gap-2.5 shrink-0">
                                <button
                                    onClick={handleShareLink}
                                    aria-label="Share Link"
                                    title={language === 'EN' ? 'Copy page URL' : 'Salin tautan halaman'}
                                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] border border-slate-200 dark:border-slate-800 text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
                                >
                                    {copiedToast ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>{language === 'EN' ? 'Copied!' : 'Tersalin!'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-3.5 h-3.5" />
                                            <span>{language === 'EN' ? 'Share' : 'Bagikan'}</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handlePrint}
                                    aria-label="Print Document"
                                    title={language === 'EN' ? 'Print or save as PDF' : 'Cetak atau simpan sebagai PDF'}
                                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] border border-slate-200 dark:border-slate-800 text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
                                >
                                    <Printer className="w-3.5 h-3.5" />
                                    <span>{language === 'EN' ? 'Print PDF' : 'Cetak PDF'}</span>
                                </button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleOpenDpoContact('DPO Privacy Inquiry')}
                                    className="text-xs"
                                >
                                    {language === 'EN' ? 'Contact DPO' : 'Kontak DPO'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout with Sticky Sidebar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Left Sticky Sidebar (ToC & Search) */}
                        <aside className="lg:col-span-4 space-y-6">
                            <div className="sticky top-28 space-y-6">
                                {/* Clause Search Box */}
                                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <label
                                        htmlFor="policySearch"
                                        className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2"
                                    >
                                        {language === 'EN' ? 'Search Clauses' : 'Cari Klausul Kebijakan'}
                                    </label>
                                    <div className="relative">
                                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            id="policySearch"
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder={
                                                language === 'EN'
                                                    ? 'Filter by keyword or policy topic...'
                                                    : 'Masukkan kata kunci atau topik kebijakan...'
                                            }
                                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] transition-colors"
                                        />
                                    </div>
                                    {searchQuery && (
                                        <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                                            <span>
                                                {language === 'EN'
                                                    ? `Found ${filteredSections.length} section(s)`
                                                    : `Ditemukan ${filteredSections.length} bagian`}
                                            </span>
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="text-[#107E27] dark:text-[#1AC13B] font-bold hover:underline"
                                            >
                                                {language === 'EN' ? 'Clear' : 'Reset'}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Table of Contents */}
                                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                                            <FileText className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            {language === 'EN' ? 'Document Navigation' : 'Daftar Klausul'}
                                        </span>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                                            {policySections.length} Sections
                                        </span>
                                    </div>

                                    <nav className="space-y-1">
                                        {policySections.map((section) => {
                                            const isActive = activeSection === section.id;
                                            return (
                                                <a
                                                    key={section.id}
                                                    href={`#${section.id}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const el = document.getElementById(section.id);
                                                        if (el) {
                                                            el.scrollIntoView({ behavior: 'smooth' });
                                                            setActiveSection(section.id);
                                                        }
                                                    }}
                                                    className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                                                        isActive
                                                            ? 'bg-[#EDFBF1] dark:bg-[#10381C]/50 text-[#107E27] dark:text-[#1AC13B] border-l-2 border-[#1AC13B]'
                                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                                                    }`}
                                                >
                                                    <span className="truncate pr-2">{section.title[language]}</span>
                                                    <ChevronRight
                                                        className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                                                            isActive
                                                                ? 'text-[#1AC13B] translate-x-0.5'
                                                                : 'text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5'
                                                        }`}
                                                    />
                                                </a>
                                            );
                                        })}
                                        <a
                                            href="#faq"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const el = document.getElementById('faq');
                                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all"
                                        >
                                            <span className="truncate pr-2">
                                                {language === 'EN' ? '10. Frequently Asked Questions' : '10. Pertanyaan Umum (FAQ)'}
                                            </span>
                                            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        </a>
                                    </nav>
                                </div>

                                {/* Key Assurance Summary Box */}
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0A1C12] to-[#143821] text-slate-200 border border-[#143821]">
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                        <Lock className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>{language === 'EN' ? 'STAS-RG Privacy Pledge' : 'Jaminan Privasi STAS-RG'}</span>
                                    </h4>
                                    <ul className="space-y-2 text-[11px] text-slate-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Zero third-party advertisement brokers</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Full Indonesian PDP Law (UU 27/2022) compliance</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Strict industrial non-disclosure protocols</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>

                        {/* Right Policy Clauses Content */}
                        <div className="lg:col-span-8 space-y-8">
                            {filteredSections.length === 0 ? (
                                <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                                    <img
                                        src="/assets/icon/errors/notfound.png"
                                        alt="Tidak ada data"
                                        className="w-24 sm:w-28 h-auto object-contain mx-auto mb-3 select-none pointer-events-none"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/assets/icon/errors/notfound.png';
                                        }}
                                    />
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                        {language === 'EN' ? 'No Matching Clauses Found' : 'Tidak Ada Klausul yang Cocok'}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                                        {language === 'EN'
                                            ? 'Please try different keywords or reset your search query to view all sections.'
                                            : 'Silakan gunakan kata kunci lain atau reset kotak pencarian untuk melihat seluruh klausul.'}
                                    </p>
                                    <Button
                                        variant="outline-green"
                                        size="sm"
                                        onClick={() => setSearchQuery('')}
                                        className="mt-4 text-xs"
                                    >
                                        {language === 'EN' ? 'Show All Sections' : 'Tampilkan Semua Bagian'}
                                    </Button>
                                </div>
                            ) : (
                                filteredSections.map((section) => (
                                    <section
                                        key={section.id}
                                        id={section.id}
                                        className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all hover:border-[#1AC13B]/40"
                                    >
                                        {/* Section Header */}
                                        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                                            <div className="w-8 h-8 rounded-lg bg-[#1AC13B]/10 dark:bg-[#1AC13B]/20 flex items-center justify-center shrink-0">
                                                {section.icon}
                                            </div>
                                            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                                {section.title[language]}
                                            </h2>
                                        </div>

                                        {/* Section Content */}
                                        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                            {section.content[language]}
                                        </div>
                                    </section>
                                ))
                            )}

                            {/* Section 10: Frequently Asked Questions Accordion */}
                            <section
                                id="faq"
                                className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800"
                            >
                                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
                                    <div className="w-8 h-8 rounded-lg bg-[#1AC13B]/10 dark:bg-[#1AC13B]/20 flex items-center justify-center shrink-0">
                                        <HelpCircle className="w-4 h-4 text-[#1AC13B]" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                            {language === 'EN' ? '10. Frequently Asked Questions' : '10. Pertanyaan Umum (FAQ)'}
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            {language === 'EN'
                                                ? 'Common questions regarding research confidentiality, SSO data, and lab testing'
                                                : 'Pertanyaan seputar kerahasiaan data riset laboratorium, akun SSO, dan pengujian industri'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {faqItems.map((faq, index) => {
                                        const isOpen = openFaq === index;
                                        return (
                                            <div
                                                key={index}
                                                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
                                            >
                                                <button
                                                    onClick={() => setOpenFaq(isOpen ? null : index)}
                                                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                                                >
                                                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white pr-4">
                                                        {faq.q[language]}
                                                    </span>
                                                    <ChevronDown
                                                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                                                            isOpen ? 'rotate-180 text-[#1AC13B]' : ''
                                                        }`}
                                                    />
                                                </button>
                                                {isOpen && (
                                                    <div className="px-4 py-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 leading-relaxed animate-in fade-in duration-150">
                                                        {faq.a[language]}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Official Closing & Contact Trigger Card */}
                            <div className="p-6 sm:p-8 rounded-2xl bg-[#0A1C12] text-white border border-[#143821] flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                                    <img
                                        src="/assets/icon/profile_cs.png"
                                        alt="Privacy Support"
                                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0 drop-shadow-lg"
                                    />
                                    <div className="space-y-1.5">
                                        <span className="text-xs font-bold text-[#1AC13B] uppercase tracking-wider">
                                            {language === 'EN' ? 'Official Inquiries' : 'Pusat Bantuan Resmi'}
                                        </span>
                                        <h3 className="text-lg font-bold text-white">
                                            {language === 'EN'
                                                ? 'Have Questions Regarding Your Data?'
                                                : 'Butuh Bantuan Mengenai Data Pribadi Anda?'}
                                        </h3>
                                        <p className="text-xs text-slate-300 max-w-md">
                                            {language === 'EN'
                                                ? 'Our Data Protection team is ready to assist you with compliance inquiries, NDA reviews, or data subject requests.'
                                                : 'Tim Pelindungan Data kami siap membantu Anda terkait permohonan hak data, peninjauan NDA riset, atau klarifikasi kebijakan.'}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    size="md"
                                    onClick={() => handleOpenDpoContact('Formal DPO Inquiry / Privacy Request')}
                                    className="shrink-0"
                                >
                                    {language === 'EN' ? 'Submit Inquiry' : 'Kirim Permohonan'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Dynamic Footer matching Main Design */}
            <Footer
                siteConfig={siteConfig}
                domains={domains}
                publications={publications}
                services={services}
                t={t.footer}
            />

            {/* Quick Search Modal */}
            <SearchModal
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                domains={domains}
                projects={projects}
                publications={publications}
                services={services}
                articles={articles}
                t={t.search}
            />

            {/* Login Modal */}
            <LoginModal
                isOpen={loginOpen}
                onClose={() => setLoginOpen(false)}
                t={t.auth}
            />

            {/* Contact / DPO Inquiry Modal */}
            <ContactModal
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
                prefilledSubject={contactSubject}
            />
        </div>
    );
}
