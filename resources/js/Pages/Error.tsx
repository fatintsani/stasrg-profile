import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { Language, translations } from "../utils/translations";
import { Navbar } from "../Components/Layout/Navbar";
import { Footer } from "../Components/Layout/Footer";
import { SearchModal } from "../Components/Common/SearchModal";
import { ContactModal } from "../Components/Common/ContactModal";
import { LoginModal } from "../Components/Common/LoginModal";
import {
    ArrowLeft,
    Home,
    RotateCcw,
    LogIn,
    Mail,
    Search
} from "lucide-react";
import { motion } from "framer-motion";
import {
    ResearchDomain,
    Publication,
    EnterpriseService,
    ResearchProject,
    Article,
    SiteConfig
} from "../types";

interface ErrorPageProps {
    status?: number;
    message?: string;
    siteConfig?: SiteConfig;
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    projects?: ResearchProject[];
    articles?: Article[];
}

interface ErrorContent {
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    image: string;
    primaryAction: "home" | "login" | "reload" | "back";
}

const ERROR_CONFIGS: Record<number, ErrorContent> = {
    400: {
        titleEn: "Bad Request",
        titleId: "Permintaan Tidak Valid",
        descEn: "The server could not understand the request due to invalid syntax or corrupted parameters.",
        descId: "Server tidak dapat memproses permintaan Anda karena sintaks atau parameter yang dikirim tidak valid.",
        image: "/assets/icon/errors/tidakvalid.png",
        primaryAction: "back",
    },
    401: {
        titleEn: "Authentication Required",
        titleId: "Autentikasi Diperlukan",
        descEn: "You need valid researcher credentials to access this protected scientific resource. Please sign in to continue.",
        descId: "Anda memerlukan kredensial peneliti yang valid untuk mengakses sumber daya riset ini. Silakan masuk terlebih dahulu.",
        image: "/assets/icon/errors/autentikasi.png",
        primaryAction: "login",
    },
    403: {
        titleEn: "Access Prohibited",
        titleId: "Akses Ditolak",
        descEn: "You do not have permission or clearance to access this system cluster or laboratory workspace.",
        descId: "Anda tidak memiliki hak akses atau izin otorisasi untuk membuka klaster sistem atau laboratorium ini.",
        image: "/assets/icon/errors/aksesditolak.png",
        primaryAction: "home",
    },
    404: {
        titleEn: "Page Not Found",
        titleId: "Halaman Tidak Ditemukan",
        descEn: "The scientific resource, publication, or page you are looking for has been moved, archived, or does not exist.",
        descId: "Dokumen riset, publikasi ilmiah, atau halaman yang Anda cari mungkin telah dipindahkan, diarsipkan, atau tidak tersedia.",
        image: "/assets/icon/errors/notfound.png",
        primaryAction: "home",
    },
    419: {
        titleEn: "Security Session Expired",
        titleId: "Sesi Kedaluwarsa",
        descEn: "Your session token has expired due to inactivity to protect data integrity. Please refresh and try again.",
        descId: "Token keamanan sesi Anda telah kedaluwarsa demi melindungi integritas data. Silakan muat ulang halaman.",
        image: "/assets/icon/errors/sesikedaluwarsa.png",
        primaryAction: "reload",
    },
    422: {
        titleEn: "Invalid Request Payload",
        titleId: "Permintaan Tidak Valid",
        descEn: "The data submitted could not be processed due to validation conflicts or missing parameters.",
        descId: "Data formulir yang dikirim tidak dapat diproses karena tidak memenuhi kriteria validasi yang ditentukan.",
        image: "/assets/icon/errors/tidakvalid.png",
        primaryAction: "back",
    },
    429: {
        titleEn: "Rate Limit Exceeded",
        titleId: "Terlalu Banyak Permintaan",
        descEn: "Too many security or API requests were detected in a short time. Please wait a moment before trying again.",
        descId: "Sistem mendeteksi terlalu banyak permintaan dalam waktu singkat. Harap tunggu beberapa saat sebelum mencoba kembali.",
        image: "/assets/icon/errors/terlalubanyakpermintaan.png",
        primaryAction: "reload",
    },
    500: {
        titleEn: "Internal Server Error",
        titleId: "Kesalahan Server Internal",
        descEn: "An unexpected error occurred on our research servers. Our technical team has been notified.",
        descId: "Terjadi gangguan tak terduga pada server kami. Tim teknis CoE STAS-RG telah menerima laporan ini.",
        image: "/assets/icon/errors/kesalahanserver.png",
        primaryAction: "reload",
    },
    503: {
        titleEn: "System Under Maintenance",
        titleId: "Sedang Dalam Pemeliharaan",
        descEn: "We are currently performing routine infrastructure upgrades and maintenance. Service will resume shortly.",
        descId: "Kami sedang melakukan pemeliharaan dan peningkatan infrastruktur server secara berkala. Layanan akan segera kembali aktif.",
        image: "/assets/icon/errors/pemeliharaan.png",
        primaryAction: "reload",
    },
};

export default function ErrorPage({
    status = 404,
    message,
    siteConfig,
    domains = [],
    publications = [],
    services = [],
    projects = [],
    articles = [],
}: ErrorPageProps) {
    const [language, setLanguage] = useState<Language>("ID");
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // Modal state
    const [searchOpen, setSearchOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const errorConfig = ERROR_CONFIGS[status] || {
        titleEn: "Unexpected Error",
        titleId: "Terjadi Kesalahan",
        descEn: message || "An unexpected error occurred while processing your request.",
        descId: message || "Terjadi kesalahan yang tidak terduga saat memproses permintaan Anda.",
        image: "/assets/icon/errors/tidakvalid.png",
        primaryAction: "home",
    };

    // Load saved language and theme from localStorage
    useEffect(() => {
        const savedLang = (localStorage.getItem("stas_lang") || localStorage.getItem("lang")) as Language | null;
        if (savedLang === "EN" || savedLang === "ID") {
            setLanguage(savedLang);
        }

        const savedTheme = (localStorage.getItem("theme") || localStorage.getItem("stas_theme")) as "light" | "dark" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

    const handleToggleLanguage = () => {
        const nextLang: Language = language === "EN" ? "ID" : "EN";
        setLanguage(nextLang);
        localStorage.setItem("stas_lang", nextLang);
        localStorage.setItem("lang", nextLang);
    };

    const handleToggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        localStorage.setItem("stas_theme", nextTheme);
        if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const isEn = language === "EN";
    const t = translations[language];

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B11] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col justify-between">
            <Head>
                <title>{`${status} - ${isEn ? errorConfig.titleEn : errorConfig.titleId} — ${siteConfig?.center_name || "CoE STAS-RG"}`}</title>
            </Head>

            {/* Official Global Navigation Bar */}
            <Navbar
                language={language}
                onToggleLanguage={handleToggleLanguage}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenLogin={() => setLoginOpen(true)}
                t={t.nav}
            />

            {/* Centered Main Error Content (Frameless & Responsive Friendly, No Card Wrapper, No Badge) */}
            <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-center space-y-6 sm:space-y-8 my-auto"
                >
                    {/* Custom 3D Error Artwork Illustration */}
                    <div className="relative mx-auto w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
                        <img
                            src={errorConfig.image}
                            alt={isEn ? errorConfig.titleEn : errorConfig.titleId}
                            className="w-full h-full object-contain select-none"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/icon/errors/tidakvalid.png';
                            }}
                        />
                    </div>

                    {/* Error Heading & Narrative */}
                    <div className="space-y-3 max-w-lg mx-auto">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {isEn ? errorConfig.titleEn : errorConfig.titleId}
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                            {isEn ? errorConfig.descEn : errorConfig.descId}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
                        {errorConfig.primaryAction === "login" ? (
                            <Link
                                href="/login"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>{isEn ? "Sign In to Portal" : "Masuk ke Portal"}</span>
                            </Link>
                        ) : errorConfig.primaryAction === "reload" ? (
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer border-0"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>{isEn ? "Refresh Page" : "Muat Ulang Halaman"}</span>
                            </button>
                        ) : (
                            <Link
                                href="/"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
                            >
                                <Home className="w-4 h-4" />
                                <span>{isEn ? "Back to Home" : "Kembali ke Beranda"}</span>
                            </Link>
                        )}

                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>{isEn ? "Previous Page" : "Halaman Sebelumnya"}</span>
                        </button>
                    </div>

                    {/* Quick Search & Support Trigger Links */}
                    <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="inline-flex items-center gap-1.5 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors cursor-pointer"
                        >
                            <Search className="w-3.5 h-3.5" />
                            <span>{isEn ? "Search Research Assets" : "Cari Sumber Daya Riset"}</span>
                        </button>
                        <span>•</span>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{isEn ? "Contact Support" : "Hubungi Bantuan"}</span>
                        </Link>
                    </div>
                </motion.div>
            </main>

            {/* Official Global Footer */}
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
