import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { BrandLogo } from "../../Components/Common/BrandLogo";
import { FlagIcon } from "../../Components/Common/FlagIcon";
import { Language, translations } from "../../utils/translations";
import {
    ArrowLeft,
    Mail,
    Sun,
    Moon,
    CheckCircle2,
    AlertCircle,
    KeyRound,
    Cpu,
    BookOpen,
    Leaf,
    ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ForgotPasswordProps {
    siteConfig?: {
        center_name?: string;
    };
    status?: string | null;
}

export default function ForgotPassword({
    siteConfig,
    status,
}: ForgotPasswordProps) {
    // 1. Language & Theme State
    const [language, setLanguage] = useState<Language>("EN");
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // 2. Inertia Form State
    const form = useForm({
        email: "",
    });

    useEffect(() => {
        // Load saved language
        const savedLang = localStorage.getItem("stas_lang") as Language;
        if (savedLang === "EN" || savedLang === "ID") {
            setLanguage(savedLang);
        }

        // Load saved theme
        const savedTheme = localStorage.getItem("stas_theme") as
            | "light"
            | "dark";
        if (savedTheme === "dark") {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else if (savedTheme === "light") {
            setTheme("light");
            document.documentElement.classList.remove("dark");
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

    const t = translations[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post("/forgot-password", {
            preserveScroll: true,
        });
    };

    const isSuccess = !!status;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col justify-between">
            <Head>
                <title>{`${t.auth.forgotPasswordTitle} - ${siteConfig?.center_name || "CoE STAS-RG"}`}</title>
                <meta
                    name="description"
                    content="Password Recovery Portal for CoE STAS-RG"
                />
            </Head>

            {/* Top Navigation Bar Matching Main Navbar */}
            <header className="w-full px-4 sm:px-8 lg:px-12 py-4 border-b border-slate-100 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-20">
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

            {/* Split Screen Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Left Form Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="lg:col-span-6 max-w-md w-full mx-auto lg:mx-0"
                    >
                        {/* Contextual Back to Sign In Link */}
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#107E27] dark:text-slate-400 dark:hover:text-[#1AC13B] transition-colors mb-4 group w-fit"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                            <span>{t.auth.backToSignIn}</span>
                        </Link>

                        {/* Heading & Subtitle */}
                        <div className="mb-6 text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                {t.auth.forgotPasswordTitle}
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                {t.auth.forgotPasswordSubtitle}
                            </p>
                        </div>

                        {/* Success Notification */}
                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 p-4 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] border border-[#B2EFC3] dark:border-[#1A5C2F] text-xs font-semibold text-[#107E27] dark:text-[#3FD27B] flex items-start gap-3"
                                >
                                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#1AC13B]" />
                                    <div>
                                        <p className="font-bold text-[#107E27] dark:text-[#3FD27B]">
                                            {language === "EN"
                                                ? "Verification Link Dispatched"
                                                : "Tautan Verifikasi Terkirim"}
                                        </p>
                                        <p className="mt-1 font-normal leading-relaxed text-slate-600 dark:text-slate-300">
                                            {status}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {form.errors.email && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2.5"
                                >
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{form.errors.email}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form */}
                        {!isSuccess ? (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 text-left"
                            >
                                {/* Email Address Input */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t.auth.emailLabel}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={form.data.email}
                                            onChange={(e) =>
                                                form.setData(
                                                    "email",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="researcher@telkomuniversity.ac.id"
                                            className="w-full pl-10 pr-3.5 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Main Submit Button */}
                                <button
                                    type="submit"
                                    disabled={
                                        form.processing || !form.data.email.trim()
                                    }
                                    className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#1AC13B] hover:bg-[#159F30] text-white font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 border-0 flex items-center justify-center gap-2"
                                >
                                    <KeyRound className="w-4 h-4" />
                                    <span>
                                        {form.processing
                                            ? language === "EN"
                                                ? "Dispatching..."
                                                : "Mengirim..."
                                            : t.auth.forgotPasswordSendBtn}
                                    </span>
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-3">
                                <Link
                                    href="/login"
                                    className="w-full py-3.5 px-4 rounded-xl bg-[#1AC13B] hover:bg-[#159F30] text-white font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 cursor-pointer border-0 flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>{t.auth.backToSignIn}</span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        form.reset("email");
                                        window.location.reload();
                                    }}
                                    className="w-full py-3 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-[#EDFBF1]/50 dark:hover:bg-[#10381C]/30 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                                >
                                    {language === "EN"
                                        ? "Try Another Email Address"
                                        : "Coba Alamat Email Lain"}
                                </button>
                            </div>
                        )}

                        {/* Bottom Switcher */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 text-center">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {language === "EN"
                                    ? "Remember your password?"
                                    : "Ingat kata sandi Anda?"}{" "}
                            </span>
                            <Link
                                href="/login"
                                className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline transition-colors cursor-pointer ml-1"
                            >
                                {t.auth.signInBtn}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Visual Card Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hidden lg:block lg:col-span-6 h-full"
                    >
                        <div className="relative w-full h-[640px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#0B132B] flex flex-col justify-between p-8 text-white group">
                            {/* Background Artwork Layer with Subtle Overlay */}
                            <img
                                src="/assets/images/auth_artwork.jpg"
                                alt="STAS-RG Sustainable Technology"
                                className="absolute inset-0 w-full h-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/80 to-transparent pointer-events-none" />

                            {/* Top Header Card Info */}
                            <div className="relative z-10 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-[#3FD27B]">
                                    <Leaf className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    <span>
                                        Sustainable Technology & Applied
                                        Sciences
                                    </span>
                                </div>

                                <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
                                    Pioneering Applied Research & Industrial
                                    Innovation
                                </h2>

                                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                                    Integrated research laboratory ecosystem at
                                    Telkom University bridging smart
                                    manufacturing, renewable energy systems, and
                                    cyber-physical operations.
                                </p>
                            </div>

                            {/* Center Feature Highlights */}
                            <div className="relative z-10 grid grid-cols-2 gap-3 my-auto">
                                <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                                    <Cpu className="w-4 h-4 text-[#1AC13B] mb-2" />
                                    <div className="text-xs font-bold text-white">
                                        8 Focus Domains
                                    </div>
                                    <div className="text-[11px] text-slate-400">
                                        Industry 4.0 & Green Tech
                                    </div>
                                </div>
                                <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                                    <BookOpen className="w-4 h-4 text-[#1AC13B] mb-2" />
                                    <div className="text-xs font-bold text-white">
                                        50+ Publications
                                    </div>
                                    <div className="text-[11px] text-slate-400">
                                        Indexed Q1 & IEEE Journals
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Researcher Testimonial Box */}
                            <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/15 p-4 rounded-xl select-none">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-9 h-9 rounded-full bg-[#1AC13B] text-white font-bold flex items-center justify-center text-xs ring-2 ring-white/30 shrink-0">
                                        PA
                                    </div>
                                    <div className="leading-tight">
                                        <div className="text-xs font-bold text-white">
                                            {t.auth.testimonialAuthor}
                                        </div>
                                        <div className="text-[10px] text-slate-300 font-medium">
                                            {t.auth.testimonialHandle}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-200 leading-relaxed italic">
                                    "{t.auth.testimonialQuote}"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer Minimal Matching Main Style */}
            <footer className="w-full py-5 px-6 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-400">
                <p>
                    © {new Date().getFullYear()} CoE STAS-RG | Telkom
                    University.
                </p>
            </footer>
        </div>
    );
}
