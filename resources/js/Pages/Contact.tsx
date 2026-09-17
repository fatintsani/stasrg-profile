import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    Building2,
    Globe,
    Compass,
    Sparkles,
    Calendar,
    Users,
    Shield,
    MessageSquare,
    Copy,
    Check,
    ArrowRight,
    HelpCircle,
    ChevronDown,
    ChevronRight,
    ExternalLink,
    Car,
    Train,
    Plane,
    Share2,
    Printer,
    FileText,
    Laptop,
    ArrowLeft,
    CheckSquare
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { ResearchDomain, Publication, EnterpriseService, ResearchProject, Article, SiteConfig } from '../types';

interface ContactPageProps {
    siteConfig?: SiteConfig;
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    projects?: ResearchProject[];
    articles?: Article[];
}

type InquiryCategory = 'collaboration' | 'research' | 'enterprise' | 'academic' | 'general';
type PriorityLevel = 'normal' | 'high' | 'urgent';

interface DepartmentHub {
    id: string;
    name: { EN: string; ID: string };
    lead: string;
    email: string;
    phone: string;
    room: { EN: string; ID: string };
    description: { EN: string; ID: string };
    badge: { EN: string; ID: string };
}

const DEPARTMENT_HUBS: DepartmentHub[] = [
    {
        id: 'research',
        name: {
            EN: 'Research & Joint Innovation',
            ID: 'Divisi Riset & Inovasi Bersama'
        },
        lead: 'Dr. Ir. Asep Suhendi, M.T.',
        email: 'research@stas-rg.telkomuniversity.ac.id',
        phone: '+62 812-3456-7890',
        room: {
            EN: 'Research Hub, 2nd Floor, Room D204',
            ID: 'Pusat Riset, Lantai 2, Ruang D204'
        },
        description: {
            EN: 'Joint research proposals, grant collaborations, international research exchanges, and intellectual property development.',
            ID: 'Proposal riset gabungan, kolaborasi hibah penelitian, pertukaran riset internasional, dan pengembangan HKI/paten.'
        },
        badge: {
            EN: 'Grant & Publications',
            ID: 'Hibah & Publikasi'
        }
    },
    {
        id: 'enterprise',
        name: {
            EN: 'Enterprise & Industry Solutions',
            ID: 'Layanan Industri & Audit Teknologi'
        },
        lead: 'Enterprise Relations Team',
        email: 'enterprise@stas-rg.telkomuniversity.ac.id',
        phone: '+62 811-9876-5432',
        room: {
            EN: 'Applied Innovation Lab, Room D208',
            ID: 'Lab Inovasi Terapan, Ruang D208'
        },
        description: {
            EN: 'Smart device testing, IoT telemetry deployment, cybersecurity audit, and custom software architecture consultation.',
            ID: 'Pengujian perangkat pintar, implementasi telemetri IoT, audit keamanan siber, dan konsultasi arsitektur sistem cerdas.'
        },
        badge: {
            EN: 'Commercial & Testing',
            ID: 'Komersial & Pengujian'
        }
    },
    {
        id: 'academic',
        name: {
            EN: 'Academic & Talent Fellowship',
            ID: 'Akademik & Magang Riset (MBKM)'
        },
        lead: 'Academic Affairs Coordinator',
        email: 'fellowship@stas-rg.telkomuniversity.ac.id',
        phone: '+62 813-2233-4455',
        room: {
            EN: 'Student Research Hall, Room D202',
            ID: 'Ruang Riset Mahasiswa, Ruang D202'
        },
        description: {
            EN: 'Certified research internships, undergraduate/postgraduate thesis co-supervision, and student innovation bootcamps.',
            ID: 'Magang riset bersertifikat MBKM, pembimbingan tugas akhir/tesis, dan program inkubasi inovasi mahasiswa.'
        },
        badge: {
            EN: 'Internship & Thesis',
            ID: 'Magang & Tugas Akhir'
        }
    },
    {
        id: 'secretariat',
        name: {
            EN: 'Executive Secretariat & General Inquiries',
            ID: 'Sekretariat Utama & Humas'
        },
        lead: 'Executive Secretary',
        email: 'secretariat@stas-rg.telkomuniversity.ac.id',
        phone: '+62 22 7564108',
        room: {
            EN: 'Administration Office, Room D201',
            ID: 'Kantor Administrasi, Ruang D201'
        },
        description: {
            EN: 'Official administrative correspondence, legal agreements, MoU/MoA signing, lab visit booking, and general inquiries.',
            ID: 'Surat menyurat resmi, administrasi MoU/MoA, reservasi kunjungan laboratorium, dan informasi publik CoE.'
        },
        badge: {
            EN: 'Administration & MoU',
            ID: 'Administrasi & MoU'
        }
    }
];

export default function Contact({
    siteConfig,
    domains = [],
    publications = [],
    services = [],
    projects = [],
    articles = [],
}: ContactPageProps) {
    const [language, setLanguage] = useState<Language>('ID');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    const [copiedToast, setCopiedToast] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [searchOpen, setSearchOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);
    const [submissionTicket, setSubmissionTicket] = useState<string>('');

    // Form handling with Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        organization: '',
        category: 'collaboration' as InquiryCategory,
        priority: 'normal' as PriorityLevel,
        subject: '',
        message: '',
        consent: true
    });

    const t = translations[language];

    // Theme & language initialization matching main site
    useEffect(() => {
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }

        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleToggleLanguage = () => {
        const nextLang: Language = language === 'EN' ? 'ID' : 'EN';
        setLanguage(nextLang);
        localStorage.setItem('stas_lang', nextLang);
    };

    // Calculate live business hour status (WIB: UTC+7)
    const officeStatus = useMemo(() => {
        const now = new Date();
        const utcHours = now.getUTCHours();
        const wibHours = (utcHours + 7) % 24;
        const wibDay = (now.getUTCDay() + (utcHours + 7 >= 24 ? 1 : 0)) % 7;

        const isWeekday = wibDay >= 1 && wibDay <= 5;
        const isOpen = isWeekday && wibHours >= 8 && wibHours < 17;

        return {
            isOpen,
            timeString: `${String(wibHours).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} WIB`,
            message: isOpen
                ? (language === 'EN' ? 'Open for in-person consultation & lab visits' : 'Buka untuk konsultasi langsung & kunjungan lab')
                : (language === 'EN' ? 'Closed currently • Online queue is actively logged' : 'Sedang tutup • Antrean online tetap tercatat aktif')
        };
    }, [language]);

    const handleCopyEmail = (email: string) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 2500);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: language === 'EN' ? 'Contact CoE STAS-RG — Telkom University' : 'Hub Kontak & Kemitraan — CoE STAS-RG',
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopiedToast(true);
            setTimeout(() => setCopiedToast(false), 2000);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSubmitInquiry = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                const randomTicket = 'INQ-' + Math.floor(100000 + Math.random() * 900000);
                setSubmissionTicket(randomTicket);
                setIsSuccessSubmitted(true);
                reset('subject', 'message', 'phone', 'organization');
            }
        });
    };

    const categoryOptions = [
        {
            value: 'collaboration',
            label: { EN: 'Strategic Partnership & MoU', ID: 'Kemitraan Strategis & MoU' },
            desc: { EN: 'Joint ventures, organizational alliances & MoU agreements', ID: 'Kerjasama kelembagaan, aliansi & penandatanganan MoU' },
            icon: Building2
        },
        {
            value: 'research',
            label: { EN: 'Research & Joint Publication', ID: 'Kolaborasi Riset & Publikasi' },
            desc: { EN: 'Joint research grant, IEEE/Scopus publications, testbeds', ID: 'Hibah riset bersama, publikasi ilmiah & eksperimen' },
            icon: Sparkles
        },
        {
            value: 'enterprise',
            label: { EN: 'Enterprise & Tech Testing', ID: 'Solusi Industri & Pengujian' },
            desc: { EN: 'IoT device certification, security audits, consultancy', ID: 'Sertifikasi alat, audit siber & konsultasi teknis' },
            icon: Laptop
        },
        {
            value: 'academic',
            label: { EN: 'Internship & Academic Fellowship', ID: 'Magang MBKM & Tugas Akhir' },
            desc: { EN: 'Research internships, thesis supervision, visiting scholar', ID: 'Program magang riset, tugas akhir, & visiting scholar' },
            icon: Users
        },
        {
            value: 'general',
            label: { EN: 'General Inquiry & Media', ID: 'Pertanyaan Umum & Media' },
            desc: { EN: 'Public information, guest lecturing, visit permits', ID: 'Informasi publik, kuliah tamu, & izin kunjungan' },
            icon: MessageSquare
        }
    ];

    const faqs = [
        {
            q: {
                EN: 'What is the standard turnaround time for inquiries?',
                ID: 'Berapa lama estimasi waktu respon permohonan informasi/kerjasama?'
            },
            a: {
                EN: 'Our secretariat reviews inquiries within 1-2 business days. For formal research proposals or enterprise consultation requests, a dedicated research lead will schedule a preliminary discovery meeting within 3 business days.',
                ID: 'Sekretariat kami merespons dalam 1-2 hari kerja. Untuk proposal riset formal atau permintaan audit industri, tim peneliti terkait akan menjadwalkan sesi diskusi awal dalam maksimal 3 hari kerja.'
            }
        },
        {
            q: {
                EN: 'Can external institutions and companies schedule on-site lab visits?',
                ID: 'Bisakah instansi atau perusahaan luar melakukan kunjungan langsung ke lab?'
            },
            a: {
                EN: 'Yes. We welcome academic delegations, government agencies, and industry partners. Please submit a visit request at least 5 business days in advance to ensure our research fellows and demo equipment are available.',
                ID: 'Ya, kami sangat terbuka untuk kunjungan delegasi akademik, dinas pemerintahan, dan mitra industri. Mohon ajukan permohonan minimal 5 hari kerja sebelum tanggal kunjungan agar jadwal demo lab dan peneliti dapat disiapkan.'
            }
        },
        {
            q: {
                EN: 'How does STAS-RG handle intellectual property and NDAs during enterprise engagements?',
                ID: 'Bagaimana CoE STAS-RG menangani kerahasiaan data (NDA) dan HKI industri?'
            },
            a: {
                EN: 'All enterprise consulting and custom tech development projects are governed under strict Non-Disclosure Agreements (NDA) and formal MoA contracts through Telkom University Directorate of Research & Community Service (DPM).',
                ID: 'Seluruh proyek konsultasi industri dan pengembangan teknologi dilindungi perjanjian kerahasiaan (NDA) resmi dan kontrak kerja sama (MoA) yang difasilitasi oleh Direktorat Penelitian & Pengabdian Masyarakat (DPM) Telkom University.'
            }
        },
        {
            q: {
                EN: 'Are research internship opportunities open to non-Telkom University students?',
                ID: 'Apakah lowongan magang riset terbuka untuk mahasiswa di luar Telkom University?'
            },
            a: {
                EN: 'Yes! We actively accept internship fellows across Indonesia under the Merdeka Belajar Kampus Merdeka (MBKM) program as well as independent academic research fellowships.',
                ID: 'Ya! Kami menerima mahasiswa magang riset dari berbagai perguruan tinggi di seluruh Indonesia melalui program MBKM Riset maupun skema magang mandiri bersertifikat.'
            }
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B11] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
            <Head>
                <title>
                    {language === 'EN'
                        ? 'Contact & Strategic Partnership — CoE STAS-RG'
                        : 'Hub Kontak & Kemitraan — CoE STAS-RG'}
                </title>
                <meta
                    name="description"
                    content="Hubungi Center of Excellence Smart Telecommunication & Autonomous System (CoE STAS-RG) Telkom University. Layanan kolaborasi riset, solusi industri, magang MBKM, dan konsultasi teknologi."
                />
            </Head>

            {/* Top Navigation Bar */}
            <Navbar
                language={language}
                onToggleLanguage={handleToggleLanguage}
                theme={theme}
                onToggleTheme={toggleTheme}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenLogin={() => setLoginOpen(true)}
                t={t.nav}
            />

            <main className="pt-28 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs Navigation */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
                        <Link
                            href="/"
                            className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                        >
                            {language === 'EN' ? 'Home' : 'Beranda'}
                        </Link>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                        <span className="text-slate-900 dark:text-white font-medium">
                            {language === 'EN' ? 'Contact & Strategic Partnership' : 'Hub Kontak & Kemitraan'}
                        </span>
                    </div>

                    {/* HERO HEADER SECTION (Clean, Minimalist, High-Contrast) */}
                    <section className="p-6 sm:p-8 md:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 mb-10 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="space-y-3 max-w-3xl">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                                    {language === 'EN' ? (
                                        <>
                                            Contact & Strategic{' '}
                                            <span className="text-[#1AC13B]">
                                                Partnership Hub
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            Hub Kontak & Kemitraan{' '}
                                            <span className="text-[#1AC13B]">
                                                Strategis
                                            </span>
                                        </>
                                    )}
                                </h1>
                                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                                    {language === 'EN'
                                        ? 'Connect with our research group for joint academic inquiries, industrial testing, MBKM research fellowships, or technology advisory services.'
                                        : 'Terhubung dengan kelompok keahlian kami untuk permohonan riset bersama, pengujian perangkat industri, magang MBKM, maupun konsultasi teknologi terapan.'}
                                </p>
                            </div>

                            {/* Utility Buttons & Status */}
                            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    <span className={`w-2 h-2 rounded-full ${officeStatus.isOpen ? 'bg-[#1AC13B] animate-ping' : 'bg-amber-500'}`} />
                                    <span>{officeStatus.timeString}</span>
                                    <span className="text-slate-400">•</span>
                                    <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                                        {officeStatus.isOpen
                                            ? (language === 'EN' ? 'Office Open' : 'Layanan Buka')
                                            : (language === 'EN' ? 'Online Queue Active' : 'Antrean Online Aktif')}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleShare}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                                        title={language === 'EN' ? 'Share page' : 'Bagikan tautan'}
                                    >
                                        {copiedToast ? <Check className="w-3.5 h-3.5 text-[#1AC13B]" /> : <Share2 className="w-3.5 h-3.5" />}
                                        <span>{copiedToast ? (language === 'EN' ? 'Copied!' : 'Tersalin!') : (language === 'EN' ? 'Share' : 'Bagikan')}</span>
                                    </button>
                                    <button
                                        onClick={handlePrint}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                                        title={language === 'EN' ? 'Print page' : 'Cetak halaman'}
                                    >
                                        <Printer className="w-3.5 h-3.5" />
                                        <span>{language === 'EN' ? 'Print' : 'Cetak'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* MAIN TWO-COLUMN CONTENT GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* LEFT COLUMN: FORM & MAP (7 COLS) */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* FORM CARD */}
                            <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
                                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
                                    <div className="w-8 h-8 rounded-lg bg-[#1AC13B]/10 dark:bg-[#1AC13B]/20 flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-4 h-4 text-[#1AC13B]" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                            {language === 'EN' ? 'Official Inquiries & Proposal Form' : 'Formulir Permohonan & Kontak Resmi'}
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            {language === 'EN'
                                                ? 'Route your request directly to the appropriate research lead'
                                                : 'Pesan Anda akan langsung diteruskan ke ketua kelompok riset terkait'}
                                        </p>
                                    </div>
                                </div>

                                {isSuccessSubmitted ? (
                                    <div className="p-8 text-center space-y-4">
                                        <div className="w-14 h-14 mx-auto rounded-full bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] flex items-center justify-center">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                            {language === 'EN' ? 'Inquiry Dispatched Successfully!' : 'Pesan Berhasil Terkirim!'}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                                            {language === 'EN'
                                                ? 'Thank you for contacting CoE STAS-RG. Your inquiry has been registered in our admin portal with reference ticket:'
                                                : 'Terima kasih telah menghubungi CoE STAS-RG. Pesan Anda telah terdaftar pada portal admin kami dengan nomor tiket:'}
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
                                            <span>{submissionTicket}</span>
                                        </div>
                                        <div className="pt-4">
                                            <Button
                                                variant="outline-green"
                                                onClick={() => setIsSuccessSubmitted(false)}
                                            >
                                                {language === 'EN' ? 'Send Another Message' : 'Kirim Pesan Baru'}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmitInquiry} className="space-y-5">
                                        {/* Category Select */}
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                                {language === 'EN' ? 'Inquiry Category' : 'Kategori Keperluan'} <span className="text-rose-500">*</span>
                                            </label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {categoryOptions.map((cat) => {
                                                    const IconComp = cat.icon;
                                                    const isSelected = data.category === cat.value;
                                                    return (
                                                        <button
                                                            key={cat.value}
                                                            type="button"
                                                            onClick={() => setData('category', cat.value as InquiryCategory)}
                                                            className={`p-3 rounded-xl text-left border transition-all flex items-start gap-2.5 cursor-pointer ${
                                                                isSelected
                                                                    ? 'bg-[#EDFBF1] dark:bg-[#10381C]/40 border-[#1AC13B] text-slate-900 dark:text-white'
                                                                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                                                            }`}
                                                        >
                                                            <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-[#1AC13B] text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                                                <IconComp className="w-3.5 h-3.5" />
                                                            </div>
                                                            <div>
                                                                <span className="text-xs font-bold block">{cat.label[language]}</span>
                                                                <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{cat.desc[language]}</span>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Name & Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                    {language === 'EN' ? 'Full Name' : 'Nama Lengkap'} <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder={language === 'EN' ? 'Enter your full name' : 'Masukkan nama lengkap Anda'}
                                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1AC13B] transition-colors"
                                                />
                                                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                    {language === 'EN' ? 'Work / Academic Email' : 'Email Instansi / Pribadi'} <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    placeholder={language === 'EN' ? 'Enter your email address' : 'Masukkan alamat email Anda'}
                                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1AC13B] transition-colors"
                                                />
                                                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                                            </div>
                                        </div>

                                        {/* Phone & Organization */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                    {language === 'EN' ? 'Phone / WhatsApp' : 'Nomor Telepon / WhatsApp'}
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    placeholder={language === 'EN' ? 'Enter your phone or WhatsApp number' : 'Masukkan nomor telepon atau WhatsApp Anda'}
                                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1AC13B] transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                    {language === 'EN' ? 'Organization / University' : 'Instansi / Perusahaan / Kampus'}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.organization}
                                                    onChange={(e) => setData('organization', e.target.value)}
                                                    placeholder={language === 'EN' ? 'Enter your organization or institution name' : 'Masukkan nama instansi, perusahaan, atau universitas'}
                                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1AC13B] transition-colors"
                                                />
                                            </div>
                                        </div>

                                        {/* Priority & Subject */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                    {language === 'EN' ? 'Priority Level' : 'Tingkat Prioritas'}
                                                </label>
                                                <select
                                                    value={data.priority}
                                                    onChange={(e) => setData('priority', e.target.value as PriorityLevel)}
                                                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#1AC13B]"
                                                >
                                                    <option value="normal">{language === 'EN' ? 'Normal' : 'Biasa'}</option>
                                                    <option value="high">{language === 'EN' ? 'High (< 24h)' : 'Tinggi (< 24 Jam)'}</option>
                                                    <option value="urgent">{language === 'EN' ? 'Urgent' : 'Mendesak'}</option>
                                                </select>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                    {language === 'EN' ? 'Subject' : 'Subjek Pesan'} <span className="text-rose-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={data.subject}
                                                    onChange={(e) => setData('subject', e.target.value)}
                                                    placeholder={language === 'EN' ? 'Enter the subject of your inquiry' : 'Masukkan subjek atau topik pesan Anda'}
                                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1AC13B] transition-colors"
                                                />
                                                {errors.subject && <p className="text-xs text-rose-500 mt-1">{errors.subject}</p>}
                                            </div>
                                        </div>

                                        {/* Message Body */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                                {language === 'EN' ? 'Detailed Message / Scope of Request' : 'Rincian Pesan / Kebutuhan Kerjasama'} <span className="text-rose-500">*</span>
                                            </label>
                                            <textarea
                                                rows={4}
                                                required
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                placeholder={
                                                    language === 'EN'
                                                        ? 'Provide context regarding your objectives, required timelines, or technical specifications...'
                                                        : 'Jelaskan latar belakang, tujuan, perkiraan jadwal, target luaran, atau spesifikasi teknis...'
                                                }
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1AC13B] transition-colors resize-y"
                                            />
                                            {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                                        </div>

                                        {/* Consent & Submit */}
                                        <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                                            <label className="flex items-start gap-2.5 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={data.consent}
                                                    onChange={(e) => setData('consent', e.target.checked)}
                                                    className="mt-0.5 rounded border-slate-300 text-[#1AC13B] focus:ring-[#1AC13B] dark:border-slate-700 dark:bg-slate-950"
                                                />
                                                <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                                    {language === 'EN'
                                                        ? 'I agree that CoE STAS-RG may process this information for official correspondence in accordance with the Privacy Policy.'
                                                        : 'Saya menyetujui bahwa data yang diberikan diproses untuk korespondensi resmi sesuai Kebijakan Privasi.'}
                                                </span>
                                            </label>

                                            <button
                                                type="submit"
                                                disabled={processing || !data.consent}
                                                className="w-full py-3 px-6 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                                            >
                                                {processing ? (
                                                    <span>{language === 'EN' ? 'Dispatching...' : 'Mengirimkan...'}</span>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        <span>{language === 'EN' ? 'Submit Official Inquiry' : 'Kirim Permohonan Resmi'}</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </section>

                            {/* LOCATION & MAP CARD */}
                            <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-5">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                                    <div className="w-8 h-8 rounded-lg bg-[#1AC13B]/10 dark:bg-[#1AC13B]/20 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-[#1AC13B]" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                                            {language === 'EN' ? 'Laboratory Location & Transit' : 'Lokasi Laboratorium & Panduan Rute'}
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Gedung Deli (Cacuk Sudarijanto), Lantai 2, Kampus Telkom University Bandung
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 h-64 bg-slate-100 dark:bg-slate-950">
                                    <iframe
                                        title="CoE STAS-RG Telkom University Location Map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.301389429158!2d107.6292350757912!3d-6.973747168285559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9adf177bf05%3A0x6336e4f1642e1376!2sTelkom%20University!5e0!3m2!1sen!2sid!4v1710600000000!5m2!1sen!2sid"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>

                                {/* Official Visit & Location Box */}
                                <div className="p-4 rounded-2xl bg-[#EDFBF1] dark:bg-[#10381C]/40 border border-[#B2EFC3] dark:border-[#143B22] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-[#1AC13B] shrink-0" />
                                            <span>{language === 'EN' ? 'Visit Us' : 'Alamat Kampus'}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                            Jl. Telekomunikasi No.1, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
                                        </p>
                                    </div>
                                    <a
                                        href="https://maps.app.goo.gl/EQHpqHavYCoRyzST9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs"
                                    >
                                        <span>{language === 'EN' ? 'Open in Maps' : 'Buka di Maps'}</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>

                                {/* Official Social & Web Channels */}
                                <div className="pt-2">
                                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                                        {language === 'EN' ? 'Official Channels & Networks' : 'Saluran & Media Resmi'}
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                        <a
                                            href="https://www.instagram.com/stas.rg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition"
                                        >
                                            <span>Instagram</span>
                                            <ExternalLink className="w-3 h-3 text-slate-400" />
                                        </a>
                                        <a
                                            href="mailto:stas-rg@telkomuniversity.ac.id"
                                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition"
                                        >
                                            <span>Email</span>
                                            <Mail className="w-3 h-3 text-slate-400" />
                                        </a>
                                        <a
                                            href="https://tel-u.ac.id/stasrg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition"
                                        >
                                            <span>Situs Web</span>
                                            <ExternalLink className="w-3 h-3 text-slate-400" />
                                        </a>
                                        <a
                                            href="https://www.youtube.com/@stas_rg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition"
                                        >
                                            <span>YouTube</span>
                                            <ExternalLink className="w-3 h-3 text-slate-400" />
                                        </a>
                                        <a
                                            href="https://id.linkedin.com/company/coe-stas-rg"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between transition col-span-2 sm:col-span-2"
                                        >
                                            <span>LinkedIn: CoE STAS-RG</span>
                                            <ExternalLink className="w-3 h-3 text-slate-400" />
                                        </a>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
                                            <Train className="w-3.5 h-3.5 text-red-500" />
                                            <span>Whoosh Tegalluar</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                            15 menit via shuttle feeder / taksi online.
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
                                            <Car className="w-3.5 h-3.5 text-blue-500" />
                                            <span>Tol Buahbatu</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                            5 menit (1.5 km) ke arah selatan kampus.
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-1">
                                            <Plane className="w-3.5 h-3.5 text-emerald-500" />
                                            <span>Bandara Kertajati</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                            Shuttle Damri ke Bandung + 20 menit ke lab.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN: HUBS, WHATSAPP, FAQ (5 COLS) */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* DEPARTMENT HUBS */}
                            <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4">
                                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                                    <div className="w-8 h-8 rounded-lg bg-[#1AC13B]/10 dark:bg-[#1AC13B]/20 flex items-center justify-center shrink-0">
                                        <Building2 className="w-4 h-4 text-[#1AC13B]" />
                                    </div>
                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                            {language === 'EN' ? 'Department Communication Hubs' : 'Hub Komunikasi Departemen'}
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {language === 'EN' ? 'Direct channels with division coordinators' : 'Kontak langsung koordinator divisi riset'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {DEPARTMENT_HUBS.map((hub) => (
                                        <div
                                            key={hub.id}
                                            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-bold text-slate-900 dark:text-white text-xs">
                                                    {hub.name[language]}
                                                </span>
                                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C]/60 text-[#107E27] dark:text-[#1AC13B] border border-[#B2EFC3] dark:border-[#143B22]">
                                                    {hub.badge[language]}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                                {hub.description[language]}
                                            </p>
                                            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                                                <span className="font-mono text-slate-600 dark:text-slate-300 truncate max-w-[170px]">
                                                    {hub.email}
                                                </span>
                                                <button
                                                    onClick={() => handleCopyEmail(hub.email)}
                                                    className="text-[#107E27] dark:text-[#1AC13B] hover:underline font-semibold cursor-pointer"
                                                >
                                                    {copiedEmail === hub.email ? (language === 'EN' ? 'Copied' : 'Tersalin') : (language === 'EN' ? 'Copy' : 'Salin')}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* INSTANT WHATSAPP CARD */}
                            <div className="p-5 rounded-2xl bg-[#EDFBF1] dark:bg-[#10381C]/30 border border-[#B2EFC3] dark:border-[#143B22] flex items-center justify-between gap-4">
                                <div className="space-y-0.5">
                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>{language === 'EN' ? 'WhatsApp Helpdesk' : 'Layanan Cepat WhatsApp'}</span>
                                    </h4>
                                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                                        {language === 'EN' ? 'Direct chat with secretariat' : 'Respon cepat untuk permohonan darurat'}
                                    </p>
                                </div>
                                <a
                                    href="https://wa.me/6281234567890?text=Halo%20Sekretariat%20CoE%20STAS-RG,%20saya%20ingin%20berkonsultasi..."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold shrink-0 inline-flex items-center gap-1 transition-all"
                                >
                                    <span>Chat WA</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                            {/* FAQ ACCORDION */}
                            <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4">
                                <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                                    <div className="w-8 h-8 rounded-lg bg-[#1AC13B]/10 dark:bg-[#1AC13B]/20 flex items-center justify-center shrink-0">
                                        <HelpCircle className="w-4 h-4 text-[#1AC13B]" />
                                    </div>
                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                            {language === 'EN' ? 'Frequently Asked Questions' : 'Pertanyaan yang Sering Diajukan'}
                                        </h2>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {language === 'EN' ? 'Common inquiries on research & visits' : 'Informasi seputar kerjasama & kunjungan lab'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    {faqs.map((faq, idx) => {
                                        const isOpen = openFaq === idx;
                                        return (
                                            <div
                                                key={idx}
                                                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
                                            >
                                                <button
                                                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                                                >
                                                    <span className="text-xs font-bold text-slate-900 dark:text-white pr-3">
                                                        {faq.q[language]}
                                                    </span>
                                                    <ChevronDown
                                                        className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                                                            isOpen ? 'rotate-180 text-[#1AC13B]' : ''
                                                        }`}
                                                    />
                                                </button>
                                                {isOpen && (
                                                    <div className="px-4 py-3 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                                                        {faq.a[language]}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* OFFICIAL CLOSING CARD (Matching PrivacyPolicy.tsx style) */}
                    <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#0A1C12] text-white border border-[#143821] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                            <img
                                src="/assets/icon/profile_cs.png"
                                alt="Secretariat Support"
                                className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0 drop-shadow-lg"
                            />
                            <div className="space-y-1.5">
                                <span className="text-xs font-bold text-[#1AC13B] uppercase tracking-wider">
                                    {language === 'EN' ? 'Institutional Backing' : 'Kerjasama Resmi Kelembagaan'}
                                </span>
                                <h3 className="text-base sm:text-lg font-bold text-white">
                                    {language === 'EN'
                                        ? 'Need a Formal Institutional MoU/MoA Agreement?'
                                        : 'Memerlukan Penandatanganan MoU/MoA Resmi?'}
                                </h3>
                                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                                    {language === 'EN'
                                        ? 'Direct correspondence is facilitated through the Directorate of Research & Community Service (DPM) Telkom University.'
                                        : 'Seluruh perikatan hukum dan hibah resmi difasilitasi oleh Direktorat Penelitian & Pengabdian Masyarakat (DPM) Telkom University.'}
                                </p>
                            </div>
                        </div>
                        <a
                            href="mailto:secretariat@stas-rg.telkomuniversity.ac.id?subject=Permohonan%20MoU%20Resmi%20CoE%20STAS-RG"
                            className="px-5 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold shrink-0 transition-all cursor-pointer"
                        >
                            {language === 'EN' ? 'Contact Secretariat' : 'Hubungi Sekretariat'}
                        </a>
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

            {/* Modals */}
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
            <LoginModal
                isOpen={loginOpen}
                onClose={() => setLoginOpen(false)}
                t={t.auth}
            />
            <ContactModal
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
            />
        </div>
    );
}
