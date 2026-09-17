import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Scale,
    Shield,
    FileText,
    Key,
    Cpu,
    BookOpen,
    AlertTriangle,
    UserX,
    Gavel,
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
    Share2,
    Check,
    Layers,
    Lock,
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { ResearchDomain, Publication, EnterpriseService, ResearchProject, Article, SiteConfig } from '../types';

interface TermsOfUseProps {
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

export default function TermsOfUse({
    siteConfig,
    domains = [],
    publications = [],
    services = [],
    projects = [],
    articles = [],
    lastUpdated = '17 September 2026',
}: TermsOfUseProps) {
    // 1. Language State
    const [language, setLanguage] = useState<Language>('ID');

    // 2. Theme State
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 3. Search & Filter within terms
    const [searchQuery, setSearchQuery] = useState('');

    // 4. Active Section for ScrollSpy
    const [activeSection, setActiveSection] = useState('acceptance');

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

    const handleOpenLegalContact = (subject: string) => {
        setContactSubject(subject);
        setContactOpen(true);
    };

    const t = translations[language];

    // Terms Content Structure
    const termsSections: SectionItem[] = [
        {
            id: 'acceptance',
            title: {
                EN: '1. Acceptance & Scope of Agreement',
                ID: '1. Penerimaan Ketentuan & Ruang Lingkup',
            },
            icon: <Scale className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Welcome to the official web portal and digital research infrastructure of the <strong>Center of Excellence for Sustainable Technology & Applied Science (CoE STAS-RG)</strong>, Telkom University. By accessing or using our websites, research repositories, High-Performance Computing (HPC) clusters, or consulting services, you agree to be bound by these Terms of Use and Association.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Governing Body
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    CoE STAS-RG, School of Industrial & Systems Engineering, Telkom University, Bandung, Indonesia.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Applicable Users
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Faculty researchers, students, industrial partners (SOEs and private corporations), visiting scientists, and portal guests.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Selamat datang di portal resmi dan infrastruktur riset digital <strong>Center of Excellence for Sustainable Technology & Applied Science (CoE STAS-RG)</strong>, Telkom University. Dengan mengakses atau memanfaatkan situs web kami, repositori data riset, klaster komputasi kinerja tinggi (HPC), maupun layanan konsultasi industri kami, Anda menyatakan setuju untuk terikat pada Ketentuan Penggunaan dan Tata Kelola Asosiasi ini.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Badan Pengelola
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    CoE STAS-RG, Fakultas Rekayasa Industri, Telkom University, Jl. Telekomunikasi No. 1, Bandung, Indonesia.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Pengguna yang Terikat
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Dosen peneliti, mahasiswa, asisten lab, mitra industri (BUMN & swasta), peneliti tamu, dan pengunjung umum portal.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'account-eligibility',
            title: {
                EN: '2. User Accounts, SSO & Access Credentials',
                ID: '2. Akun Pengguna, Akses SSO & Kredensial',
            },
            icon: <Key className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Access to specific research modules, computing nodes, and collaborative datasets requires an authorized user account or Telkom University Single Sign-On (SSO):
                        </p>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Account Confidentiality:</strong> Users must maintain the absolute confidentiality of their login credentials. Account sharing or transferring research credentials to unauthorized third parties is strictly prohibited.
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Verification & Accuracy:</strong> You agree to provide accurate, current, and verifiable academic identity information upon registration.
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Immediate Notification:</strong> Any suspected security breach, unauthorized credential use, or data compromise must be immediately reported to our security administration.
                                </span>
                            </li>
                        </ul>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Akses ke modul riset khusus, server komputasi, dan repositori kolaboratif memerlukan akun terverifikasi atau integrasi Single Sign-On (SSO) Telkom University:
                        </p>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Kerahasiaan Akun:</strong> Pengguna wajib menjaga kerahasiaan kredensial dan kata sandi. Peminjaman akun (*account sharing*) atau penyerahan akses server kepada pihak luar yang tidak berwenang dilarang keras.
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Akurasi Identitas:</strong> Anda setuju untuk memberikan data profil akademik yang valid, benar, dan dapat dipertanggungjawabkan saat melakukan pendaftaran.
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Kewajiban Pelaporan:</strong> Segala indikasi pelanggaran keamanan akun atau kebocoran akses harus segera dilaporkan kepada administrator sistem kami.
                                </span>
                            </li>
                        </ul>
                    </div>
                ),
            },
        },
        {
            id: 'intellectual-property',
            title: {
                EN: '3. Intellectual Property & Research Rights',
                ID: '3. Hak Kekayaan Intelektual (HKI) & Hak Riset',
            },
            icon: <BookOpen className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            All materials, algorithms, datasets, publications, and visual designs available on the CoE STAS-RG platform are protected under national copyright and IP regulations:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Shield className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Center & University Ownership
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Patents, industrial designs, trademarks, and source codes developed under core center funding remain the intellectual property of Telkom University and respective principal researchers.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Joint Industrial IP
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Intellectual property arising from contract research with industrial partners is governed by specific Memorandum of Agreement (MoA) and collaborative IP clauses.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Mandatory Citation & Attribution
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Any scholarly use of open datasets, papers, or lab test methodologies must cite <em>"Center of Excellence for Sustainable Technology and Applied Science (CoE STAS-RG), Telkom University"</em>.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Layers className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Open Access Licensing
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Open-access publications are distributed under Creative Commons (CC BY-NC 4.0) licenses unless specified otherwise by the publication publisher.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Seluruh materi, algoritma, dataset, publikasi ilmiah, dan identitas visual di portal CoE STAS-RG dilindungi oleh Undang-Undang Hak Cipta dan regulasi Hak Kekayaan Intelektual (HKI):
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Shield className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Kepemilikan Universitas & Peneliti
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Paten, desain industri, hak cipta software, dan metode riset yang didanai secara internal merupakan hak kekayaan intelektual Telkom University dan para peneliti terkait.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    HKI Kemitraan Industri
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Hak cipta dan paten hasil kolaborasi industri diatur secara khusus dalam perjanjian kerja sama (MoA) dan klausul pembagian royalti yang disepakati bersama.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Kewajiban Sitasi & Atribusi
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Setiap penggunaan dataset terbuka, publikasi, atau metodologi riset wajib menyertakan atribusi formal: <em>"Center of Excellence for Sustainable Technology and Applied Science (CoE STAS-RG), Telkom University"</em>.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Layers className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    Lisensi Akses Terbuka (Open Access)
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Publikasi berlabel akses terbuka didistribusikan di bawah lisensi Creative Commons (CC BY-NC 4.0) non-komersial, kecuali diatur secara berbeda oleh penerbit jurnal ilmiah.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'acceptable-use',
            title: {
                EN: '4. Acceptable Use Policy for Lab & HPC Resources',
                ID: '4. Tata Tertib Penggunaan Fasilitas Lab & Komputasi',
            },
            icon: <Cpu className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Users granted access to our computing clusters, IoT testbeds, and physical laboratories must strictly adhere to the following operational policies:
                        </p>
                        <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-bold flex items-center justify-center shrink-0 text-xs">
                                    ✕
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Prohibited Network Misuse
                                    </strong>
                                    Cryptocurrency mining, network scanning, DDoS attacks, unauthorized vulnerability probing, or executing malicious scripts on university servers is strictly prohibited.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-bold flex items-center justify-center shrink-0 text-xs">
                                    ✕
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Unauthorized Data Exfiltration
                                    </strong>
                                    Copying, downloading, or transferring raw industrial datasets without formal authorization from the Principal Investigator is a severe contractual violation.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    ✓
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Safety & Lab Standard Compliance
                                    </strong>
                                    Adhering to laboratory occupational health and safety (K3) protocols when operating physical testing machines and electronic testbeds.
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Pengguna yang memperoleh izin akses ke fasilitas komputasi, sensor laboratorium, dan alat uji wajib menaati tata tertib operasional berikut:
                        </p>
                        <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-bold flex items-center justify-center shrink-0 text-xs">
                                    ✕
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Larangan Penyalahgunaan Komputasi
                                    </strong>
                                    Aktivitas penambangan mata uang kripto (*crypto mining*), pemindaian port tidak sah (*port scanning*), serangan DoS/DDoS, atau eksekusi skrip perusak dilarang keras.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-bold flex items-center justify-center shrink-0 text-xs">
                                    ✕
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Larangan Pengunduhan Data Tanpa Izin
                                    </strong>
                                    Menggandakan atau memindahkan dataset mentah pabrik mitra tanpa persetujuan tertulis dari Ketua Peneliti (Principal Investigator) merupakan pelanggaran berat.
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                                <div className="w-6 h-6 rounded-md bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold flex items-center justify-center shrink-0 text-xs">
                                    ✓
                                </div>
                                <div>
                                    <strong className="text-slate-900 dark:text-white block mb-0.5">
                                        Kepatuhan Standar K3 Laboratorium
                                    </strong>
                                    Mematuhi prosedur Keselamatan dan Kesehatan Kerja (K3) serta standar operasional prosedur saat menggunakan instrumen uji fisik dan mesin laboratorium.
                                </div>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'confidentiality-nda',
            title: {
                EN: '5. Industrial Confidentiality & Non-Disclosure (NDA)',
                ID: '5. Kerahasiaan Data Industri & Perjanjian Non-Disclosure',
            },
            icon: <Lock className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Research projects conducted in partnership with industrial corporations (state-owned enterprises, multinational companies, and government agencies) involve sensitive commercial data protected by strict NDAs:
                        </p>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>Embargo Periods:</strong> Research findings containing patentable inventions are subjected to confidentiality embargoes until formal patent applications are filed.
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>Binding Obligation:</strong> All participating research assistants, students, and consultants must execute formal non-disclosure agreements prior to accessing client project workspaces.
                                </span>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Proyek penelitian yang dijalankan bersama mitra industri (BUMN, korporasi swasta, dan instansi pemerintah) memuat data operasional sensitif yang dilindungi oleh perjanjian kerahasiaan (NDA):
                        </p>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>Masa Embargo Data:</strong> Temuan riset yang berpotensi paten dikenakan masa embargo kerahasiaan hingga berkas pendaftaran paten resmi terdaftar di DJKI Kemenkumham.
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>Kewajiban Personal:</strong> Seluruh asisten riset, mahasiswa magang, dan tenaga ahli wajib menandatangani surat komitmen kerahasiaan individual sebelum mengakses data mitra.
                                </span>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'academic-integrity',
            title: {
                EN: '6. Academic Integrity & Anti-Plagiarism Policy',
                ID: '6. Standar Etika & Integritas Publikasi Akademik',
            },
            icon: <Scale className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            CoE STAS-RG upholds uncompromised academic ethics under the standards of Telkom University and the international Committee on Publication Ethics (COPE):
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Zero Tolerance for Plagiarism:</strong> All papers and articles submitted through our portal undergo automated similarity screening.
                            </li>
                            <li>
                                • <strong>Data Fabrication Prohibition:</strong> Falsifying laboratory measurements, sensor telemetries, or simulation outputs is grounds for immediate termination of research fellowships.
                            </li>
                            <li>
                                • <strong>Authorship Transparency:</strong> Authorship must reflect substantial intellectual contribution to experimental design, analysis, or manuscript drafting.
                            </li>
                        </ul>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            CoE STAS-RG menjunjung tinggi standar etika dan integritas ilmiah sesuai pedoman Telkom University dan *Committee on Publication Ethics* (COPE):
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Nol Toleransi Plagiarisme:</strong> Naskah karya ilmiah dan laporan proyek yang diunggah wajib melalui uji kesamaan (*similarity check*) Turnitin.
                            </li>
                            <li>
                                • <strong>Larangan Fabrikasi Data:</strong> Pemalsuan atau manipulasi angka uji laboratorium dan telemetri sensor akan dikenakan sanksi pencabutan keanggotaan riset secara permanen.
                            </li>
                            <li>
                                • <strong>Transparansi Kepengarangan:</strong> Pencantuman nama penulis (*authorship*) harus mencerminkan kontribusi intelektual nyata dalam perancangan, eksperimen, atau penulisan naskah.
                            </li>
                        </ul>
                    </div>
                ),
            },
        },
        {
            id: 'disclaimers-liability',
            title: {
                EN: '7. Disclaimers & Limitation of Liability',
                ID: '7. Batasan Tanggung Jawab & Jaminan Layanan',
            },
            icon: <AlertTriangle className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            While CoE STAS-RG strives for uninterrupted computing uptime and analytical accuracy, digital services and open datasets are provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis:
                        </p>
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
                            <p>
                                1. We do not warrant that server connectivity will be completely uninterrupted, error-free, or exempt from scheduled server maintenance.
                            </p>
                            <p>
                                2. To the maximum extent permitted by Indonesian law, CoE STAS-RG and Telkom University shall not be held liable for indirect, incidental, or consequential damages resulting from platform downtime or experimental data loss.
                            </p>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Meskipun CoE STAS-RG senantiasa menjaga ketersediaan server dan akurasi analitik, layanan digital dan dataset terbuka disediakan berdasarkan prinsip <strong>"SEBAGAIMANA ADANYA" (AS IS)</strong>:
                        </p>
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
                            <p>
                                1. Kami tidak menjamin bahwa akses jaringan server akan bebas dari gangguan teknis tak terduga atau periode pemeliharaan berkala (*scheduled maintenance*).
                            </p>
                            <p>
                                2. Sejauh diizinkan oleh hukum Republik Indonesia, CoE STAS-RG dan Telkom University tidak bertanggung jawab atas kerugian tidak langsung akibat kehilangan data eksperimen di luar kendali wajar.
                            </p>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'termination-sanctions',
            title: {
                EN: '8. Account Suspension & Breach Sanctions',
                ID: '8. Penghentian Akses & Sanksi Pelanggaran',
            },
            icon: <UserX className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            CoE STAS-RG reserves the right to suspend or terminate user access upon verification of material breaches:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Immediate Revocation:</strong> Unauthorized server penetration, deliberate IP theft, or breach of industrial NDAs results in immediate access revocation.
                            </li>
                            <li>
                                • <strong>Academic Referral:</strong> Breaches committed by university students or faculty members will be referred to the Telkom University Academic Ethics Committee for statutory disciplinary action.
                            </li>
                        </ul>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            CoE STAS-RG berhak menangguhkan atau menghentikan hak akses pengguna apabila ditemukan pelanggaran terhadap ketentuan ini:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Pencabutan Akses Seketika:</strong> Upaya peretasan infrastruktur, pencurian HKI, atau pembocoran data NDA industri akan mengakibatkan penutupan akun secara seketika.
                            </li>
                            <li>
                                • <strong>Rujukan Komisi Etik:</strong> Pelanggaran yang dilakukan oleh sivitas akademika Telkom University akan diteruskan ke Dewan Kehormatan Etik Universitas untuk sanksi akademik sesuai statuta.
                            </li>
                        </ul>
                    </div>
                ),
            },
        },
        {
            id: 'governing-law',
            title: {
                EN: '9. Governing Law & Dispute Resolution',
                ID: '9. Hukum yang Berlaku & Penyelesaian Sengketa',
            },
            icon: <Gavel className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            These Terms shall be governed by and construed in accordance with the laws of the <strong>Republic of Indonesia</strong>. Any dispute arising from these Terms or research collaborations shall first be resolved amicably through mutual deliberation. In the event an agreement cannot be reached, the dispute shall be submitted to the exclusive jurisdiction of the District Court of Bandung (Pengadilan Negeri Bandung) or arbitration under BANI (Badan Arbitrase Nasional Indonesia).
                        </p>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di <strong>Negara Kesatuan Republik Indonesia</strong>. Segala sengketa yang timbul akan diselesaikan terlebih dahulu melalui musyawarah untuk mufakat. Apabila kesepakatan tidak tercapai, perselisihan akan diselesaikan melalui yurisdiksi Pengadilan Negeri Bandung atau Badan Arbitrase Nasional Indonesia (BANI).
                        </p>
                    </div>
                ),
            },
        },
        {
            id: 'legal-contact',
            title: {
                EN: '10. Legal Secretariat & Inquiries',
                ID: '10. Sekretariat Hukum & Kontak Resmi',
            },
            icon: <Mail className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            For licensing inquiries, research contract reviews (MoU/MoA), or formal legal notices, please contact our Legal and Secretariat Directorate:
                        </p>
                        <div className="p-4 rounded-xl bg-[#EDFBF1]/80 dark:bg-[#0A1C12] border border-[#1AC13B]/30 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#1AC13B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                    LEGAL
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Research Governance & Legal Secretariat
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        CoE STAS-RG | Telkom University
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
                            Untuk permohonan lisensi HKI, peninjauan draf kerja sama riset (MoU/MoA), atau korespondensi hukum resmi, silakan hubungi Sekretariat Hukum CoE STAS-RG:
                        </p>
                        <div className="p-4 rounded-xl bg-[#EDFBF1]/80 dark:bg-[#0A1C12] border border-[#1AC13B]/30 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#1AC13B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                    LEGAL
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Sekretariat Hukum & Tata Kelola Riset
                                    </h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        CoE STAS-RG | Telkom University
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
                EN: 'Can students utilize STAS-RG laboratory datasets for their undergraduate/graduate theses?',
                ID: 'Apakah mahasiswa dapat menggunakan dataset lab STAS-RG untuk skripsi/tesis?',
            },
            a: {
                EN: 'Yes, provided that the student is registered under an active research track and has secured written authorization from the lead researcher. Commercial partner datasets protected by NDAs require explicit client release.',
                ID: 'Bisa, dengan syarat mahasiswa terdaftar dalam skema riset aktif dan telah memperoleh izin tertulis dari Ketua Peneliti (Lead Researcher). Dataset proyek industri khusus tetap tunduk pada persetujuan tertulis mitra.',
            },
        },
        {
            q: {
                EN: 'How is joint patent ownership structured between industrial partners and Telkom University?',
                ID: 'Bagaimana pembagian kepemilikan paten bersama antara mitra industri dan Telkom University?',
            },
            a: {
                EN: 'Joint patent ownership and royalty distributions are established on a case-by-case basis through a formal Memorandum of Agreement (MoA), reflecting respective resource investments and researcher contributions.',
                ID: 'Kepemilikan paten bersama dan pembagian royalti komersialisasi diatur secara spesifik dalam Memorandum of Agreement (MoA) berdasarkan proporsi investasi dana dan kontribusi keilmuan para pihak.',
            },
        },
        {
            q: {
                EN: 'What are the technical guidelines for requesting HPC computing cluster allocation?',
                ID: 'Bagaimana tata cara mengajukan alokasi klaster komputasi kinerja tinggi (HPC)?',
            },
            a: {
                EN: 'Faculty and visiting researchers may submit a computing resource allocation proposal through our portal specifying GPU/CPU core requirements, software stack, and project milestones.',
                ID: 'Peneliti dan mitra dapat mengajukan proposal alokasi sumber daya komputasi melalui formulir portal dengan menyertakan estimasi kebutuhan core GPU/CPU, durasi penggunaan, dan deskripsi proyek riset.',
            },
        },
    ];

    // Filter sections based on search query
    const filteredSections = useMemo(() => {
        if (!searchQuery.trim()) return termsSections;
        const q = searchQuery.toLowerCase();
        return termsSections.filter((section) => {
            const titleMatch =
                section.title.EN.toLowerCase().includes(q) || section.title.ID.toLowerCase().includes(q);
            return titleMatch;
        });
    }, [searchQuery, termsSections]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{language === 'EN' ? 'Terms of Use & Association - CoE STAS-RG' : 'Ketentuan Penggunaan & Asosiasi Riset - CoE STAS-RG'}</title>
                <meta
                    name="description"
                    content="Official Terms of Use and Research Association Framework of Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG), Telkom University."
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
                                {language === 'EN' ? 'Terms of Use' : 'Ketentuan Penggunaan'}
                            </span>
                        </div>

                        {/* Title Header */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div className="max-w-3xl">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                    {language === 'EN'
                                        ? 'Terms of Use & Association Framework'
                                        : 'Ketentuan Penggunaan & Tata Kelola Asosiasi'}
                                </h1>
                                <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {language === 'EN'
                                        ? 'Official terms governing the access, collaborative utilization of computing laboratories, intellectual property rights, and industrial partnerships under Telkom University regulations.'
                                        : 'Ketentuan resmi yang mengatur hak akses, pemanfaatan fasilitas laboratorium komputasi, hak kekayaan intelektual (HKI), dan kolaborasi riset industri di lingkungan Telkom University.'}
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
                                        <span>Indonesian Copyright & IP Law Compliant</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                        <Shield className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>Telkom University R&D Regulation</span>
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
                                    onClick={() => handleOpenLegalContact('Legal & Terms Inquiry')}
                                    className="text-xs"
                                >
                                    {language === 'EN' ? 'Contact Legal' : 'Kontak Legal'}
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
                                        htmlFor="termsSearch"
                                        className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2"
                                    >
                                        {language === 'EN' ? 'Search Clauses' : 'Cari Klausul Ketentuan'}
                                    </label>
                                    <div className="relative">
                                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            id="termsSearch"
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder={
                                                language === 'EN'
                                                    ? 'Filter by keyword or clause topic...'
                                                    : 'Masukkan kata kunci atau topik klausul...'
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
                                            {termsSections.length} Sections
                                        </span>
                                    </div>

                                    <nav className="space-y-1">
                                        {termsSections.map((section) => {
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
                                                {language === 'EN' ? '11. Frequently Asked Questions' : '11. Pertanyaan Umum (FAQ)'}
                                            </span>
                                            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        </a>
                                    </nav>
                                </div>

                                {/* Key Assurance Summary Box */}
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0A1C12] to-[#143821] text-slate-200 border border-[#143821]">
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                        <Scale className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>{language === 'EN' ? 'STAS-RG Legal Principles' : 'Prinsip Tata Kelola STAS-RG'}</span>
                                    </h4>
                                    <ul className="space-y-2 text-[11px] text-slate-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Clear intellectual property & patent allocation</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Strict industrial non-disclosure agreements</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Academic integrity & ethical research standards</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>

                        {/* Right Terms Clauses Content */}
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

                            {/* Section 11: Frequently Asked Questions Accordion */}
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
                                            {language === 'EN' ? '11. Frequently Asked Questions' : '11. Pertanyaan Umum (FAQ)'}
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            {language === 'EN'
                                                ? 'Common questions regarding student dataset access, joint patenting, and HPC allocation'
                                                : 'Pertanyaan seputar izin dataset tugas akhir, kepemilikan paten bersama, dan alokasi komputasi HPC'}
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
                                        alt="Legal Support"
                                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0 drop-shadow-lg"
                                    />
                                    <div className="space-y-1.5">
                                        <span className="text-xs font-bold text-[#1AC13B] uppercase tracking-wider">
                                            {language === 'EN' ? 'Legal & Partnership Secretariat' : 'Sekretariat Legal & Kemitraan'}
                                        </span>
                                        <h3 className="text-lg font-bold text-white">
                                            {language === 'EN'
                                                ? 'Planning a Collaborative R&D Agreement?'
                                                : 'Rencana Perjanjian Kerja Sama R&D?'}
                                        </h3>
                                        <p className="text-xs text-slate-300 max-w-md">
                                            {language === 'EN'
                                                ? 'Our Legal and Research Governance team is available to assist with MoU drafting, industrial licensing, and laboratory access permits.'
                                                : 'Tim Hukum dan Tata Kelola Riset kami siap mendampingi penyusunan MoU/MoA, perizinan lisensi industri, dan pengajuan alokasi laboratorium.'}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    size="md"
                                    onClick={() => handleOpenLegalContact('Formal Legal / MoA Collaboration Inquiry')}
                                    className="shrink-0"
                                >
                                    {language === 'EN' ? 'Contact Legal Team' : 'Hubungi Tim Legal'}
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

            {/* Contact / Legal Inquiry Modal */}
            <ContactModal
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
                prefilledSubject={contactSubject}
            />
        </div>
    );
}
