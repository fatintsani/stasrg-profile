import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { BrandLogo } from "../Components/Common/BrandLogo";
import { FlagIcon } from "../Components/Common/FlagIcon";
import { Language, translations } from "../utils/translations";
import {
    ArrowLeft,
    Home,
    RotateCcw,
    LogIn,
    ShieldAlert,
    HelpCircle,
    Sun,
    Moon,
    ExternalLink,
    Mail,
} from "lucide-react";
import { motion } from "framer-motion";

interface ErrorPageProps {
    status?: number;
    message?: string;
    siteConfig?: {
        center_name?: string;
    };
}

interface ErrorContent {
    titleEn: string;
    titleId: string;
    descEn: string;
    descId: string;
    image: string;
    badge: string;
    primaryAction: "home" | "login" | "reload" | "back";
}

const ERROR_CONFIGS: Record<number, ErrorContent> = {
    401: {
        titleEn: "Authentication Required",
        titleId: "Autentikasi Diperlukan",
        descEn: "You need valid researcher credentials to access this protected scientific resource. Please sign in to continue.",
        descId: "Anda memerlukan kredensial peneliti yang valid untuk mengakses sumber daya riset ini. Silakan masuk terlebih dahulu.",
        image: "/assets/icon/errors/autentikasi.png",
        badge: "HTTP 401 • Unauthorized",
        primaryAction: "login",
    },
    403: {
        titleEn: "Access Prohibited",
        titleId: "Akses Ditolak",
        descEn: "You do not have permission or clearance to access this system cluster or laboratory workspace.",
        descId: "Anda tidak memiliki hak akses atau izin otorisasi untuk membuka klaster sistem atau laboratorium ini.",
        image: "/assets/icon/errors/aksesditolak.png",
        badge: "HTTP 403 • Forbidden",
        primaryAction: "home",
    },
    404: {
        titleEn: "Page Not Found",
        titleId: "Halaman Tidak Ditemukan",
        descEn: "The scientific resource, publication, or page you are looking for has been moved, archived, or does not exist.",
        descId: "Dokumen riset, publikasi ilmiah, atau halaman yang Anda cari mungkin telah dipindahkan, diarsipkan, atau tidak tersedia.",
        image: "/assets/icon/errors/notfound.png",
        badge: "HTTP 404 • Not Found",
        primaryAction: "home",
    },
    419: {
        titleEn: "Security Session Expired",
        titleId: "Sesi Kedaluwarsa",
        descEn: "Your session token has expired due to inactivity to protect data integrity. Please refresh and try again.",
        descId: "Token keamanan sesi Anda telah kedaluwarsa demi melindungi integritas data. Silakan muat ulang halaman.",
        image: "/assets/icon/errors/sesikedaluwarsa.png",
        badge: "HTTP 419 • Page Expired",
        primaryAction: "reload",
    },
    422: {
        titleEn: "Invalid Request Payload",
        titleId: "Permintaan Tidak Valid",
        descEn: "The data submitted could not be processed due to validation conflicts or missing parameters.",
        descId: "Data formulir yang dikirim tidak dapat diproses karena tidak memenuhi kriteria validasi yang ditentukan.",
        image: "/assets/icon/errors/tidakvalid.png",
        badge: "HTTP 422 • Unprocessable Entity",
        primaryAction: "back",
    },
    429: {
        titleEn: "Rate Limit Exceeded",
        titleId: "Terlalu Banyak Permintaan",
        descEn: "Too many security or API requests were detected in a short time. Please wait a moment before trying again.",
        descId: "Sistem mendeteksi terlalu banyak permintaan dalam waktu singkat. Harap tunggu beberapa saat sebelum mencoba kembali.",
        image: "/assets/icon/errors/terlalubanyakpermintaan.png",
        badge: "HTTP 429 • Too Many Requests",
        primaryAction: "reload",
    },
    500: {
        titleEn: "Internal Server Error",
        titleId: "Kesalahan Server Internal",
        descEn: "An unexpected error occurred on our research servers. Our technical team has been notified.",
        descId: "Terjadi gangguan tak terduga pada server kami. Tim teknis CoE STAS-RG telah menerima laporan ini.",
        image: "/assets/icon/errors/kesalahanserver.png",
        badge: "HTTP 500 • Server Error",
        primaryAction: "reload",
    },
    503: {
        titleEn: "System Under Maintenance",
        titleId: "Sedang Dalam Pemeliharaan",
        descEn: "We are currently performing routine infrastructure upgrades and maintenance. Service will resume shortly.",
        descId: "Kami sedang melakukan pemeliharaan dan peningkatan infrastruktur server secara berkala. Layanan akan segera kembali aktif.",
        image: "/assets/icon/errors/pemeliharaan.png",
        badge: "HTTP 503 • Service Unavailable",
        primaryAction: "reload",
    },
};

export default function ErrorPage({
    status = 404,
    message,
    siteConfig,
}: ErrorPageProps) {
    const [language, setLanguage] = useState<Language>("EN");
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const errorConfig = ERROR_CONFIGS[status] || {
        titleEn: "Unexpected Error",
        titleId: "Terjadi Kesalahan",
        descEn: message || "An unexpected error occurred while processing your request.",
        descId: message || "Terjadi kesalahan yang tidak terduga saat memproses permintaan Anda.",
        image: "/assets/icon/errors/tidakvalid.png",
        badge: `HTTP ${status} • Error`,
        primaryAction: "home",
    };

    useEffect(() => {
        const savedLang = localStorage.getItem("stas_lang") as Language;
        if (savedLang === "EN" || savedLang === "ID") {
            setLanguage(savedLang);
        }

        const savedTheme = localStorage.getItem("stas_theme") as "light" | "dark";
        if (savedTheme === "dark") {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const handleToggleLanguage = () => {
        const nextLang: Language = language === "EN" ? "ID" : "EN";
        setLanguage(nextLang);
        localStorage.setItem("stas_lang", nextLang);
    };

    const handleToggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col justify-between">
            <Head>
                <title>{`${status} - ${isEn ? errorConfig.titleEn : errorConfig.titleId} | ${siteConfig?.center_name || "CoE STAS-RG"}`}</title>
            </Head>

            {/* Top Navigation Bar Matching Main Header */}
            <header className="w-full px-4 sm:px-8 lg:px-12 py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <BrandLogo
                            size="md"
                            variant={theme === "dark" ? "light" : "dark"}
                        />
                    </Link>

                    <div className="flex items-center gap-2">
                        {/* Language Switcher */}
                        <button
                            onClick={handleToggleLanguage}
                            aria-label="Toggle language"
                            title={t.nav.langTooltip}
                            className="p-2 hover:scale-110 active:scale-95 transition-transform cursor-pointer bg-transparent border-0 inline-flex items-center justify-center rounded-full"
                        >
                            <FlagIcon language={language} size="md" />
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={handleToggleTheme}
                            aria-label="Toggle dark/light theme"
                            title={t.nav.themeTooltip}
                            className="p-2 text-slate-500 dark:text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors cursor-pointer bg-transparent border-0"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                            ) : (
                                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Centered Main Error Hero */}
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 text-center space-y-6"
                >
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#1AC13B] animate-pulse" />
                        <span>{errorConfig.badge}</span>
                    </div>

                    {/* Custom Error Artwork Illustration */}
                    <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                        <img
                            src={errorConfig.image}
                            alt={isEn ? errorConfig.titleEn : errorConfig.titleId}
                            className="w-full h-full object-contain filter drop-shadow-sm select-none"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/icon/errors/tidakvalid.png';
                            }}
                        />
                    </div>

                    {/* Error Heading & Description */}
                    <div className="space-y-2.5 max-w-lg mx-auto">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {isEn ? errorConfig.titleEn : errorConfig.titleId}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            {isEn ? errorConfig.descEn : errorConfig.descId}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                        {errorConfig.primaryAction === "login" ? (
                            <Link
                                href="/login"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1AC13B] hover:bg-[#16a331] text-white text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>{isEn ? "Sign In to Portal" : "Masuk ke Portal"}</span>
                            </Link>
                        ) : errorConfig.primaryAction === "reload" ? (
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1AC13B] hover:bg-[#16a331] text-white text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer border-0"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>{isEn ? "Refresh Page" : "Muat Ulang Halaman"}</span>
                            </button>
                        ) : (
                            <Link
                                href="/"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1AC13B] hover:bg-[#16a331] text-white text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer"
                            >
                                <Home className="w-4 h-4" />
                                <span>{isEn ? "Back to Home" : "Kembali ke Beranda"}</span>
                            </Link>
                        )}

                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-[#1AC13B]/50 transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>{isEn ? "Previous Page" : "Halaman Sebelumnya"}</span>
                        </button>
                    </div>

                    {/* Institutional Help Hint */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <ShieldAlert className="w-3.5 h-3.5 text-[#1AC13B]" />
                            <span>Center of Excellence STAS-RG</span>
                        </div>
                        <span>•</span>
                        <a
                            href="mailto:stasrg@telkomuniversity.ac.id"
                            className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{isEn ? "Contact Technical Support" : "Bantuan Teknis"}</span>
                        </a>
                    </div>
                </motion.div>
            </main>

            {/* Footer Matching Main Design */}
            <footer className="w-full py-5 px-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-center text-xs text-slate-500 dark:text-slate-400">
                <p>© {new Date().getFullYear()} CoE STAS-RG | Telkom University.</p>
            </footer>
        </div>
    );
}
