import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Award,
    Shield,
    FileText,
    BookOpen,
    AlertTriangle,
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
    Bot,
    Eye,
    Scale,
    Lock,
    Users,
    Fingerprint,
} from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';
import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';
import { Button } from '../Components/Common/Button';
import { ResearchDomain, Publication, EnterpriseService, ResearchProject, Article, SiteConfig } from '../types';

interface AcademicEthicsProps {
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

export default function AcademicEthics({
    siteConfig,
    domains = [],
    publications = [],
    services = [],
    projects = [],
    articles = [],
    lastUpdated = '17 September 2026',
}: AcademicEthicsProps) {
    // 1. Language State
    const [language, setLanguage] = useState<Language>('ID');

    // 2. Theme State
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 3. Search & Filter within ethics
    const [searchQuery, setSearchQuery] = useState('');

    // 4. Active Section for ScrollSpy
    const [activeSection, setActiveSection] = useState('principles');

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

    const handleOpenEthicsContact = (subject: string) => {
        setContactSubject(subject);
        setContactOpen(true);
    };

    const t = translations[language];

    // Ethics Content Structure
    const ethicsSections: SectionItem[] = [
        {
            id: 'principles',
            title: {
                EN: '1. Statement of Research Integrity & Scope',
                ID: '1. Komitmen Integritas Ilmiah & Ruang Lingkup',
            },
            icon: <Award className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            The <strong>Center of Excellence for Sustainable Technology & Applied Science (CoE STAS-RG)</strong> at Telkom University is committed to maintaining the highest benchmarks of academic rigor, intellectual honesty, and ethical conduct. This Academic Ethics Code applies to all research fellows, faculty advisors, post-graduate students, laboratory technicians, and visiting industrial researchers affiliated with our center.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Global Benchmark
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Aligned with the <em>Singapore Statement on Research Integrity</em> and the guidelines of the <em>Committee on Publication Ethics (COPE)</em>.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Institutional Oversight
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Monitored by the Directorate of Research and Community Service (PPM) & University Ethics Review Board.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            <strong>Center of Excellence for Sustainable Technology & Applied Science (CoE STAS-RG)</strong> Telkom University memegang teguh komitmen moral dan profesional terhadap kejujuran ilmiah, ketelitian eksperimen, serta integritas riset. Kode Etik Akademik ini mengikat seluruh peneliti utama, dosen pembimbing, mahasiswa tugas akhir/magang, laboran, dan ilmuwan tamu yang berkolaborasi dalam ekosistem riset STAS-RG.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Standar Internasional
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Mengacu pada <em>Singapore Statement on Research Integrity</em> dan standar <em>Committee on Publication Ethics (COPE)</em>.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                                <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] uppercase tracking-wider block mb-1">
                                    Pengawasan Kelembagaan
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Diawasi secara resmi oleh Direktorat Penelitian dan Pengabdian Masyarakat (PPM) & Komisi Etik Telkom University.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'authorship-contributorship',
            title: {
                EN: '2. Authorship & Contributorship Guidelines',
                ID: '2. Standar Kepengarangan & Kontribusi Riset',
            },
            icon: <Users className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Authorship on academic papers, patents, and technical monographs must accurately reflect significant scientific contributions (ICMJE/COPE standards):
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                    Mandatory Authorship Criteria
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    (1) Substantial contributions to conception, algorithm design, or data acquisition; (2) Drafting or critical revision of intellectual content; (3) Final approval of the version to be published; and (4) Agreement to be accountable for all aspects of the research.
                                </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-red-600 dark:text-red-400 block mb-1">
                                    Prohibited Practices
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <em>Ghost authorship</em> (omitting contributing researchers), <em>gift/honorary authorship</em> (listing individuals without scientific contribution), or coercive authorship demands are strictly forbidden.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Pencantuman nama penulis pada publikasi jurnal terindeks, paten, dan prosiding ilmiah wajib memenuhi 4 kriteria kepengarangan standar internasional:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                                    Kriteria Wajib Penulis
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    (1) Kontribusi substantif pada perancangan konsep, algoritma, atau pengujian lab; (2) Penulisan draf atau revisi kritis substansi naskah; (3) Persetujuan final naskah publikasi; dan (4) Tanggung jawab penuh atas validitas data riset.
                                </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                <span className="text-xs font-bold text-red-600 dark:text-red-400 block mb-1">
                                    Praktik yang Dilarang Keras
                                </span>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    <em>Ghost authorship</em> (menghilangkan nama peneliti yang berkontribusi), <em>gift authorship</em> (mencantumkan nama tanpa kontribusi keilmuan), atau pemaksaan kepengarangan hierarkis.
                                </p>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'plagiarism-similarity',
            title: {
                EN: '3. Plagiarism Prevention & Similarity Thresholds',
                ID: '3. Pencegahan Plagiarisme & Ambang Batas Turnitin',
            },
            icon: <Fingerprint className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            CoE STAS-RG maintains strict zero-tolerance protocols for intellectual theft, mosaic plagiarism, and unauthorized self-plagiarism:
                        </p>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span>Turnitin Maximum Similarity Index for Journal Submissions</span>
                                <strong className="text-[#107E27] dark:text-[#1AC13B]">&le; 20% (Max 1% single-source)</strong>
                            </div>
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span>Conference Proceedings & Book Chapters</span>
                                <strong className="text-[#107E27] dark:text-[#1AC13B]">&le; 20%</strong>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Student Research Thesis & Capstone Project</span>
                                <strong className="text-[#107E27] dark:text-[#1AC13B]">&le; 20%</strong>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            CoE STAS-RG menerapkan protokol nol toleransi terhadap segala bentuk penjiplakan, plagiasi mosaik, serta *auto-plagiarisme* (daur ulang naskah sendiri tanpa atribusi):
                        </p>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span>Batas Maksimal Indeks Kesamaan Turnitin (Jurnal Internasional)</span>
                                <strong className="text-[#107E27] dark:text-[#1AC13B]">&le; 20% (Maksimal 1% per sumber tunggal)</strong>
                            </div>
                            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                <span>Prosiding Konferensi Ilmiah & Bab Buku (Book Chapter)</span>
                                <strong className="text-[#107E27] dark:text-[#1AC13B]">&le; 20%</strong>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Skripsi, Tesis, dan Laporan Proyek Akhir Mahasiswa</span>
                                <strong className="text-[#107E27] dark:text-[#1AC13B]">&le; 20%</strong>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'data-fabrication',
            title: {
                EN: '4. Data Fabrication, Falsification & Integrity',
                ID: '4. Larangan Fabrikasi & Falsifikasi Data Riset',
            },
            icon: <AlertTriangle className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Fabricating experimental data or manipulating laboratory sensor logs is the most severe violation of scientific integrity:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Raw Data Retention:</strong> All raw IoT logs, simulation seed states, and laboratory bench test measurements must be securely archived for a minimum of 5 years.
                            </li>
                            <li>
                                • <strong>Image & Graph Authenticity:</strong> Scientific graphs, microscopic imagery, and visual charts must not be selectively altered to obscure confounding experimental results.
                            </li>
                        </ul>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Pemalsuan data uji laboratorium (*fabrication*) atau manipulasi sengaja terhadap parameter eksperimen (*falsification*) merupakan pelanggaran berat integritas ilmiah:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Arsip Data Mentah:</strong> Seluruh log mentah sensor IoT industri, *source code* komputasi, dan catatan pengujian laboratorium wajib diarsipkan minimal 5 tahun untuk verifikasi audit.
                            </li>
                            <li>
                                • <strong>Keaslian Visual & Grafik:</strong> Citra mikroskopik, visualisasi data, dan grafik hasil uji tidak boleh dimanipulasi secara digital untuk menyembunyikan galat (*error*) atau anomali.
                            </li>
                        </ul>
                    </div>
                ),
            },
        },
        {
            id: 'ai-ethics',
            title: {
                EN: '5. Ethical Use of Artificial Intelligence & Generative LLMs',
                ID: '5. Etika Penggunaan AI & Model Bahasa Besar (LLM)',
            },
            icon: <Bot className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            In accordance with global scholarly guidelines (Elsevier, Springer Nature, IEEE, COPE), the use of Generative AI tools (e.g. ChatGPT, Claude, Copilot) must follow strict ethical boundaries:
                        </p>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>AI Cannot Be an Author:</strong> AI tools cannot meet authorship requirements because they cannot take legal and scientific responsibility for the work.
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>Mandatory AI Disclosure Statement:</strong> Authors must disclose the specific generative AI models used (prompting methodology, coding assistance, grammatical editing) in the methodology or acknowledgements section.
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>Human Accountability:</strong> Authors bear 100% accountability for fact-checking AI-generated outputs, preventing hallucinations, and verifying cited references.
                                </span>
                            </div>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            Sesuai pedoman penerbit ilmiah global (Elsevier, Springer Nature, IEEE, COPE), pemanfaatan teknologi Generative AI (seperti ChatGPT, Claude, Copilot) diatur dengan batasan etika berikut:
                        </p>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>AI Tidak Dapat Menjadi Penulis:</strong> Perangkat AI tidak dapat dicantumkan sebagai *author* karena tidak dapat memikul tanggung jawab hukum dan etika ilmiah atas isi naskah.
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>Kewajiban Deklarasi AI (*Disclosure*):</strong> Penggunaan AI untuk bantuan penulisan kode atau perbaikan tata bahasa wajib dideklarasikan secara transparan pada bagian metodologi atau *acknowledgement*.
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-[#1AC13B] font-bold">•</span>
                                <span>
                                    <strong>Tanggung Jawab Penuh Peneliti:</strong> Peneliti manusia bertanggung jawab mutlak atas kebenaran fakta, pencegahan halusinasi data, dan keabsahan sitasi yang dihasilkan oleh AI.
                                </span>
                            </div>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'conflict-of-interest',
            title: {
                EN: '6. Conflict of Interest & Funding Transparency',
                ID: '6. Transparansi Konflik Kepentingan & Pendanaan',
            },
            icon: <Scale className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Researchers must provide full disclosure of any financial, personal, or professional affiliations that could introduce bias into experimental interpretations:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Grant Funding Transparency:</strong> Every publication must explicitly cite grant sponsor numbers (e.g., BRIN, LPDP, Telkom University Internal Research Grants, or industrial funding contracts).
                            </li>
                            <li>
                                • <strong>Commercial Affiliations:</strong> Any equity, consultancy stipends, or advisory roles held with partner corporations must be documented in formal conflict-of-interest declarations.
                            </li>
                        </ul>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Peneliti wajib mendeklarasikan secara transparan segala hubungan finansial, profesional, atau komersial yang berpotensi memengaruhi objektivitas riset:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Pencantuman Sumber Dana:</strong> Setiap karya ilmiah wajib mencantumkan nomor kontrak dan nama pemberi hibah riset (BRIN, LPDP, Hibah Internal Telkom University, atau dana mitra industri).
                            </li>
                            <li>
                                • <strong>Hubungan Bisnis/Konsultasi:</strong> Kepemilikan saham, posisi penasihat, atau imbalan konsultasi di perusahaan mitra wajib dideklarasikan secara tertulis.
                            </li>
                        </ul>
                    </div>
                ),
            },
        },
        {
            id: 'ethical-clearance',
            title: {
                EN: '7. Ethical Clearance & Human Subject Protection',
                ID: '7. Persetujuan Etik Riset (Ethical Clearance) & Subjek Manusia',
            },
            icon: <Shield className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Studies involving ergonomics testing, human-in-the-loop IoT interfaces, or enterprise worker telemetry must obtain prior Ethical Clearance from the Institutional Review Board (IRB):
                        </p>
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                            <p>
                                1. <strong>Informed Consent:</strong> Human participants must sign written voluntary consent forms outlining research objectives, non-harm guarantees, and data privacy safeguards.
                            </p>
                            <p>
                                2. <strong>Anonymization:</strong> Biometric and performance telemetry gathered during industrial trials must be pseudonymized to prevent individual employee profiling.
                            </p>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Penelitian yang melibatkan subjek manusia, ergonomi kerja di pabrik, atau pemantauan data performa operator wajib memperoleh Persetujuan Etik (*Ethical Clearance*) sebelum pengambilan data:
                        </p>
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                            <p>
                                1. <strong>Persetujuan Tertulis (*Informed Consent*):</strong> Partisipan wajib menandatangani lembar persetujuan yang menjelaskan tujuan riset, jaminan tanpa risiko bahaya, dan kerahasiaan identitas.
                            </p>
                            <p>
                                2. <strong>Anonimisasi Data:</strong> Rekaman biometrik atau telemetri kerja operator pabrik wajib dianonimkan agar tidak digunakan untuk evaluasi personal yang merugikan.
                            </p>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'whistleblowing',
            title: {
                EN: '8. Confidential Whistleblowing & Witness Protection',
                ID: '8. Saluran Pengaduan Rahasia (Whistleblowing) & Perlindungan Saksi',
            },
            icon: <Eye className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            CoE STAS-RG provides a secure, confidential whistleblowing channel for reporting suspected academic misconduct, data manipulation, or authorship coercion:
                        </p>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2 text-xs text-amber-900 dark:text-amber-300">
                            <p className="font-bold flex items-center gap-2">
                                <Lock className="w-3.5 h-3.5" />
                                Guaranteed Whistleblower Protection
                            </p>
                            <p>
                                All reports submitted through the ethics secretariat are encrypted and treated with strict confidentiality. Retaliation against any student, researcher, or staff member reporting misconduct in good faith is punishable under university disciplinary bylaws.
                            </p>
                        </div>
                        <div className="pt-1">
                            <Button
                                variant="outline-green"
                                size="sm"
                                onClick={() => handleOpenEthicsContact('Confidential Academic Ethics Whistleblowing Report')}
                                className="text-xs"
                            >
                                {language === 'EN' ? 'Submit Confidential Report' : 'Kirim Pengaduan Rahasia'}
                            </Button>
                        </div>
                    </div>
                ),
                ID: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            CoE STAS-RG menyediakan saluran pengaduan rahasia (*whistleblowing system*) bagi siapa pun yang menyaksikan indikasi kecurangan akademik, pemalsuan data, atau pemaksaan kepengarangan:
                        </p>
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2 text-xs text-amber-900 dark:text-amber-300">
                            <p className="font-bold flex items-center gap-2">
                                <Lock className="w-3.5 h-3.5" />
                                Jaminan Perlindungan Pelapor
                            </p>
                            <p>
                                Identitas pelapor dilindungi kerahasiaannya secara mutlak oleh Komite Etik. Segala bentuk intimidasi atau tindakan balasan terhadap mahasiswa, dosen, atau laboran yang melapor dengan itikad baik dilarang keras dan akan ditindak tegas.
                            </p>
                        </div>
                        <div className="pt-1">
                            <Button
                                variant="outline-green"
                                size="sm"
                                onClick={() => handleOpenEthicsContact('Pelaporan Rahasia Pelanggaran Etika Akademik')}
                                className="text-xs"
                            >
                                {language === 'EN' ? 'Submit Confidential Report' : 'Kirim Pengaduan Rahasia'}
                            </Button>
                        </div>
                    </div>
                ),
            },
        },
        {
            id: 'sanctions',
            title: {
                EN: '9. Investigation Procedures & Disciplinary Sanctions',
                ID: '9. Prosedur Investigasi Pelanggaran & Sanksi Akademik',
            },
            icon: <Scale className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Upon receiving a credible report, the Ethics Committee initiates an independent fact-finding inquiry following due process:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Sanctions for Proven Breaches:</strong> Formal retraction of publications from indexing repositories, termination of research grant disbursements, revocation of laboratory access, and referral to university disciplinary authorities for academic sanctions.
                            </li>
                        </ul>
                    </div>
                ),
                ID: (
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            Setelah menerima laporan yang berdasar, Komite Etik akan membentuk tim independen untuk melakukan audit data laboratorium dan klarifikasi para pihak:
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-2">
                            <li>
                                • <strong>Sanksi Pelanggaran:</strong> Penarikan resmi naskah (*retraction*) dari penerbit jurnal ilmiah, pembatalan hibah riset, penonaktifan akses laboratorium, serta sanksi skorsing/pemecatan akademik sesuai Statuta Telkom University.
                            </li>
                        </ul>
                    </div>
                ),
            },
        },
        {
            id: 'ethics-contact',
            title: {
                EN: '10. Ethics Committee & Secretariat Contact',
                ID: '10. Komite Etik Riset & Kontak Sekretariat',
            },
            icon: <Mail className="w-4 h-4 text-[#1AC13B]" />,
            content: {
                EN: (
                    <div className="space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            To apply for Ethical Clearance, consult on authorship disputes, or submit research ethics inquiries, please reach our Ethics Review Secretariat:
                        </p>
                        <div className="p-4 rounded-xl bg-[#EDFBF1]/80 dark:bg-[#0A1C12] border border-[#1AC13B]/30 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#1AC13B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                    ETHICS
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Research Ethics & Academic Integrity Board
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
                            Untuk pengajuan surat izin etik riset (*Ethical Clearance*), konsultasi sengketa kepengarangan, atau pengaduan etika akademik, silakan hubungi Sekretariat Komisi Etik:
                        </p>
                        <div className="p-4 rounded-xl bg-[#EDFBF1]/80 dark:bg-[#0A1C12] border border-[#1AC13B]/30 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#1AC13B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                    ETHICS
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Komisi Etika Riset & Integritas Akademik
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
                EN: 'Can I use generative AI (e.g. ChatGPT) to write parts of my paper?',
                ID: 'Bolehkah saya menggunakan Generative AI (seperti ChatGPT) untuk menulis bagian naskah ilmiah?',
            },
            a: {
                EN: 'Generative AI may be used strictly for language polishing or code drafting assistance, but all AI usage must be transparently declared. AI cannot be listed as an author, and researchers are fully responsible for ensuring accuracy and preventing hallucinations.',
                ID: 'AI boleh digunakan sebatas alat bantu perbaikan tata bahasa atau draf algoritma, namun penggunaannya wajib dideklarasikan secara tertulis di naskah. AI tidak boleh menjadi *co-author*, dan peneliti bertanggung jawab mutlak atas keabsahan seluruh isi naskah.',
            },
        },
        {
            q: {
                EN: 'How should student-faculty authorship order be determined?',
                ID: 'Bagaimana penentuan urutan nama penulis antara dosen dan mahasiswa?',
            },
            a: {
                EN: 'The student who conducted the primary experiments and drafted the initial thesis manuscript is typically the First Author. The supervising faculty member who provided conceptual guidance and funding oversight is designated as the Corresponding Author.',
                ID: 'Mahasiswa yang melakukan eksperimen utama dan menulis draf naskah umumnya ditempatkan sebagai Penulis Pertama (*First Author*). Dosen pembimbing yang mengarahkan konsep dan pendanaan bertindak sebagai Penulis Korespondensi (*Corresponding Author*).',
            },
        },
        {
            q: {
                EN: 'How is the anonymity of an ethics whistleblower guaranteed?',
                ID: 'Bagaimana kerahasiaan identitas pelapor (whistleblower) dijamin?',
            },
            a: {
                EN: 'Reports submitted through our ethics portal are routed directly to the designated Ethics Chair with end-to-end encryption. Identifying metadata is scrubbed before evidence is examined by the review board.',
                ID: 'Laporan dugaan pelanggaran masuk ke sistem terenkripsi yang hanya dapat diakses oleh Ketua Komisi Etik. Seluruh metadata pengenal dianonimkan sebelum bukti-bukti diperiksa oleh panel komite.',
            },
        },
    ];

    // Filter sections based on search query
    const filteredSections = useMemo(() => {
        if (!searchQuery.trim()) return ethicsSections;
        const q = searchQuery.toLowerCase();
        return ethicsSections.filter((section) => {
            const titleMatch =
                section.title.EN.toLowerCase().includes(q) || section.title.ID.toLowerCase().includes(q);
            return titleMatch;
        });
    }, [searchQuery, ethicsSections]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{language === 'EN' ? 'Academic Ethics & Research Integrity - CoE STAS-RG' : 'Etika Akademik & Integritas Riset - CoE STAS-RG'}</title>
                <meta
                    name="description"
                    content="Official Academic Ethics and Research Integrity Framework of Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG), Telkom University."
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
                                {language === 'EN' ? 'Academic Ethics' : 'Etika Akademik'}
                            </span>
                        </div>

                        {/* Title Header */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div className="max-w-3xl">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                    {language === 'EN'
                                        ? 'Academic Ethics & Publication Integrity'
                                        : 'Etika Akademik & Integritas Riset'}
                                </h1>
                                <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {language === 'EN'
                                        ? 'Upholding uncompromising academic honesty, anti-plagiarism standards, ethical AI utilization, and transparent authorship for sustainable scientific impact.'
                                        : 'Menjunjung tinggi kejujuran ilmiah, pencegahan plagiarisme, etika pemanfaatan kecerdasan buatan, dan transparansi kepengarangan demi kemajuan iptek yang berkelanjutan.'}
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
                                        <span>COPE Publication Standards Aligned</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                        <Shield className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>PPM Telkom University Approved</span>
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
                                    onClick={() => handleOpenEthicsContact('Ethical Clearance / Ethics Inquiry')}
                                    className="text-xs"
                                >
                                    {language === 'EN' ? 'Ethics Board' : 'Komisi Etik'}
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
                                        htmlFor="ethicsSearch"
                                        className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2"
                                    >
                                        {language === 'EN' ? 'Search Ethics Clauses' : 'Cari Klausul Etika'}
                                    </label>
                                    <div className="relative">
                                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            id="ethicsSearch"
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder={
                                                language === 'EN'
                                                    ? 'Filter by keyword or ethical guideline...'
                                                    : 'Masukkan kata kunci atau panduan etika...'
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
                                            {ethicsSections.length} Sections
                                        </span>
                                    </div>

                                    <nav className="space-y-1">
                                        {ethicsSections.map((section) => {
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
                                        <Award className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>{language === 'EN' ? 'STAS-RG Code of Honor' : 'Ikrar Integritas STAS-RG'}</span>
                                    </h4>
                                    <ul className="space-y-2 text-[11px] text-slate-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Zero tolerance for plagiarism & data fabrication</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Transparent AI disclosure in manuscripts</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>Full protection for ethics whistleblowers</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>

                        {/* Right Ethics Clauses Content */}
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
                                                ? 'Common questions regarding AI usage, authorship order, and whistleblower protection'
                                                : 'Pertanyaan seputar aturan AI dalam penulisan ilmiah, urutan kepengarangan, dan perlindungan saksi'}
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
                                        alt="Ethics Support"
                                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain shrink-0 drop-shadow-lg"
                                    />
                                    <div className="space-y-1.5">
                                        <span className="text-xs font-bold text-[#1AC13B] uppercase tracking-wider">
                                            {language === 'EN' ? 'Ethics Review & Inquiries' : 'Layanan Komisi Etik'}
                                        </span>
                                        <h3 className="text-lg font-bold text-white">
                                            {language === 'EN'
                                                ? 'Require an Ethical Clearance Certificate?'
                                                : 'Membutuhkan Surat Persetujuan Etik Riset?'}
                                        </h3>
                                        <p className="text-xs text-slate-300 max-w-md">
                                            {language === 'EN'
                                                ? 'Our Ethics Review Board assists researchers with protocol validation, human-subjects safety reviews, and ethical clearance certificates.'
                                                : 'Komisi Etik Riset kami siap memproses telaah protokol eksperimen, sertifikasi ethical clearance, dan mediasi integritas ilmiah.'}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    size="md"
                                    onClick={() => handleOpenEthicsContact('Ethical Clearance Protocol Review Application')}
                                    className="shrink-0"
                                >
                                    {language === 'EN' ? 'Apply for Clearance' : 'Ajukan Izin Etik'}
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

            {/* Contact / Ethics Board Modal */}
            <ContactModal
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
                prefilledSubject={contactSubject}
            />
        </div>
    );
}
