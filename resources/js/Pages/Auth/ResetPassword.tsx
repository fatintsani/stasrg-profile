import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { BrandLogo } from "../../Components/Common/BrandLogo";
import { FlagIcon } from "../../Components/Common/FlagIcon";
import { Language, translations } from "../../utils/translations";
import {
    Eye,
    EyeOff,
    Sun,
    Moon,
    CheckCircle2,
    Lock,
    KeyRound,
    Cpu,
    BookOpen,
    Leaf,
    ShieldCheck,
    AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResetPasswordProps {
    token: string;
    email?: string;
    siteConfig?: {
        center_name?: string;
    };
    status?: string;
}

export default function ResetPassword({
    token,
    email = "",
    siteConfig,
    status,
}: ResetPasswordProps) {
    const [language, setLanguage] = useState<Language>("EN");
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token || "",
        email: email || "",
        password: "",
        password_confirmation: "",
    });

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

    const t = translations[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reset-password', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const isEn = language === "EN";

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col justify-between">
            <Head>
                <title>{`${isEn ? 'Reset Password' : 'Atur Ulang Kata Sandi'} - ${siteConfig?.center_name || "CoE STAS-RG"}`}</title>
            </Head>

            {/* Top Navigation Bar */}
            <header className="w-full px-4 sm:px-8 lg:px-12 py-4 border-b border-slate-100 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-20">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <BrandLogo
                            size="md"
                            variant={theme === "dark" ? "light" : "dark"}
                        />
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleToggleLanguage}
                            aria-label="Toggle language"
                            title={t.nav.langTooltip}
                            className="p-2 hover:scale-110 active:scale-95 transition-transform cursor-pointer bg-transparent border-0 inline-flex items-center justify-center rounded-full"
                        >
                            <FlagIcon language={language} size="md" />
                        </button>

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

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Left Form Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="lg:col-span-6 max-w-md w-full mx-auto lg:mx-0"
                    >
                        <div className="mb-6 text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                {isEn ? 'Set New Password' : 'Atur Kata Sandi Baru'}
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                {isEn
                                    ? 'Create a strong, unique password to secure your CoE STAS-RG researcher account.'
                                    : 'Buat kata sandi baru yang kuat dan unik untuk mengamankan akun peneliti CoE STAS-RG Anda.'}
                            </p>
                        </div>

                        {status && (
                            <div className="mb-5 p-3.5 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] border border-[#B2EFC3] dark:border-[#1A5C2F] text-xs font-semibold text-[#107E27] dark:text-[#3FD27B] flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>{status}</span>
                            </div>
                        )}

                        {Object.keys(errors).length > 0 && (
                            <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs font-semibold text-red-600 dark:text-red-400 space-y-1">
                                {Object.entries(errors).map(([key, msg]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{msg}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                            <input type="hidden" name="token" value={data.token} />

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                    {isEn ? 'Email Address' : 'Alamat Email'}
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                    {isEn ? 'New Password' : 'Kata Sandi Baru'}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder={isEn ? 'Enter at least 8 characters' : 'Minimal 8 karakter'}
                                        className="w-full pl-4 pr-11 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                    {isEn ? 'Confirm New Password' : 'Konfirmasi Kata Sandi Baru'}
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder={isEn ? 'Re-type your new password' : 'Ketik ulang kata sandi baru'}
                                        className="w-full pl-4 pr-11 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#1AC13B] hover:bg-[#159F30] text-white font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 border-0 flex items-center justify-center gap-2"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                <span>
                                    {processing
                                        ? (isEn ? 'Updating...' : 'Menyimpan...')
                                        : (isEn ? 'Save New Password' : 'Simpan Kata Sandi Baru')}
                                </span>
                            </button>
                        </form>

                        <div className="mt-7 text-center">
                            <Link
                                href="/login"
                                className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline transition-colors"
                            >
                                {isEn ? 'Back to Sign In' : 'Kembali ke Halaman Masuk'}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Visual Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hidden lg:block lg:col-span-6 h-full"
                    >
                        <div className="relative w-full h-[640px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#0B132B] flex flex-col justify-between p-8 text-white group">
                            <img
                                src="/assets/images/auth_artwork.jpg"
                                alt="STAS-RG Sustainable Technology"
                                className="absolute inset-0 w-full h-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/80 to-transparent pointer-events-none" />

                            <div className="relative z-10 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-[#3FD27B]">
                                    <Leaf className="w-3.5 h-3.5 text-[#1AC13B]" />
                                    <span>Sustainable Technology & Applied Sciences</span>
                                </div>

                                <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
                                    High-Security Researcher Management Infrastructure
                                </h2>

                                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                                    Encrypted token-based recovery adhering to Telkom University enterprise cybersecurity guidelines.
                                </p>
                            </div>

                            <div className="relative z-10 grid grid-cols-2 gap-3 my-auto">
                                <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                                    <Lock className="w-4 h-4 text-[#1AC13B] mb-2" />
                                    <div className="text-xs font-bold text-white">Bcrypt 12 Rounds</div>
                                    <div className="text-[11px] text-slate-400">Salted & Hashed</div>
                                </div>
                                <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                                    <KeyRound className="w-4 h-4 text-[#1AC13B] mb-2" />
                                    <div className="text-xs font-bold text-white">One-Time Token</div>
                                    <div className="text-[11px] text-slate-400">60-Minute Expiry</div>
                                </div>
                            </div>

                            <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/15 p-4 rounded-xl select-none">
                                <p className="text-xs text-slate-200 leading-relaxed italic">
                                    "Securing our academic and industrial research outputs starts with rigorous access control and integrity."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <footer className="w-full py-5 px-6 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-400">
                <p>© {new Date().getFullYear()} CoE STAS-RG | Telkom University.</p>
            </footer>
        </div>
    );
}
