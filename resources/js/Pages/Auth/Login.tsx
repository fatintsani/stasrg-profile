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
    User,
    AtSign,
    Building2,
    Fingerprint,
    ShieldCheck,
    Cpu,
    BookOpen,
    Leaf,
    AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAlertModal } from "../../hooks/useAlertModal";

interface AuthPageProps {
    initialTab?: "login" | "register";
    siteConfig?: {
        center_name?: string;
    };
    status?: string;
}

export default function AuthPage({
    initialTab = "login",
    siteConfig,
    status,
}: AuthPageProps) {
    // 1. Language & Theme State
    const [language, setLanguage] = useState<Language>("EN");
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // 2. Auth Mode State
    const [isRegisterMode, setIsRegisterMode] = useState(
        initialTab === "register",
    );
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { showAlert, AlertModalComponent } = useAlertModal();

    // Form handlers using Inertia useForm
    const loginForm = useForm({
        email: "",
        password: "",
        remember: true,
    });

    const registerForm = useForm({
        name: "",
        username: "",
        email: "",
        institution: "Telkom University",
        role: "faculty_researcher",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (status) {
            setIsRegisterMode(false);
        } else {
            setIsRegisterMode(initialTab === "register");
        }
    }, [initialTab, status]);

    useEffect(() => {
        const savedLang = localStorage.getItem("stas_lang") as Language;
        if (savedLang === "EN" || savedLang === "ID") {
            setLanguage(savedLang);
        }

        const savedTheme = localStorage.getItem("stas_theme") as "light" | "dark";
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

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginForm.post('/login', {
            onFinish: () => loginForm.reset('password'),
        });
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerForm.post('/register', {
            onFinish: () => registerForm.reset('password', 'password_confirmation'),
        });
    };

    const isProcessing = isRegisterMode ? registerForm.processing : loginForm.processing;
    const currentErrors = isRegisterMode ? registerForm.errors : loginForm.errors;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col justify-between">
            <Head>
                <title>{`${isRegisterMode ? t.auth.tabRegister : t.auth.title} - ${siteConfig?.center_name || "CoE STAS-RG"}`}</title>
                <meta
                    name="description"
                    content="Authentication & Researcher Access Portal for CoE STAS-RG"
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
                        {/* Heading & Subtitle */}
                        <div className="mb-6 text-left">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                {isRegisterMode
                                    ? t.auth.tabRegister
                                    : t.auth.title}
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                {isRegisterMode
                                    ? language === "EN"
                                        ? "Join CoE STAS-RG scientific network, lab facilities, and academic repositories."
                                        : "Bergabunglah dengan jaringan riset ilmiah, fasilitas lab, dan repositori CoE STAS-RG."
                                    : t.auth.subtitle}
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mb-5 p-3.5 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] border border-[#B2EFC3] dark:border-[#1A5C2F] text-xs font-semibold text-[#107E27] dark:text-[#3FD27B] flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>{status}</span>
                            </div>
                        )}

                        {/* Error Messages */}
                        {Object.keys(currentErrors).length > 0 && (
                            <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs font-semibold text-red-600 dark:text-red-400 space-y-1">
                                {Object.entries(currentErrors).map(([key, msg]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{msg}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Authentication Form */}
                        {isRegisterMode ? (
                            /* Register Form */
                            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t.auth.fullNameLabel}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={registerForm.data.name}
                                            onChange={(e) => registerForm.setData('name', e.target.value)}
                                            placeholder={language === 'ID' ? 'Masukkan nama lengkap beserta gelar Anda' : 'Enter your full name with academic title'}
                                            className="w-full pl-10 pr-3.5 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t.auth.usernameLabel}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <AtSign className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={registerForm.data.username}
                                            onChange={(e) => registerForm.setData('username', e.target.value)}
                                            placeholder={t.auth.usernamePlaceholder}
                                            className="w-full pl-10 pr-3.5 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all lowercase"
                                        />
                                    </div>
                                </div>

                                {/* Institution */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t.auth.institutionLabel}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Building2 className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={registerForm.data.institution}
                                            onChange={(e) => registerForm.setData('institution', e.target.value)}
                                            placeholder={language === 'ID' ? 'Masukkan nama instansi, departemen, atau mitra' : 'Enter your institution or organization name'}
                                            className="w-full pl-10 pr-3.5 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                        />
                                    </div>
                                </div>


                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t.auth.emailOrUsernameLabel}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={registerForm.data.email}
                                        onChange={(e) => registerForm.setData('email', e.target.value)}
                                        placeholder={t.auth.emailOrUsernamePlaceholder}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t.auth.passwordLabel}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={registerForm.data.password}
                                            onChange={(e) => registerForm.setData('password', e.target.value)}
                                            placeholder={t.auth.passwordPlaceholder}
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
                                        {t.auth.confirmPassLabel}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={registerForm.data.password_confirmation}
                                            onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                                            placeholder={t.auth.passwordPlaceholder}
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
                                    disabled={registerForm.processing}
                                    className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#1AC13B] hover:bg-[#159F30] text-white font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 border-0 flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>
                                        {registerForm.processing ? "Creating Account..." : t.auth.signUpBtn}
                                    </span>
                                </button>
                            </form>
                        ) : (
                            /* Login Form */
                            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                                {/* Email / Username */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t.auth.emailOrUsernameLabel}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={loginForm.data.email}
                                        onChange={(e) => loginForm.setData('email', e.target.value)}
                                        placeholder={t.auth.emailOrUsernamePlaceholder}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                                        {t.auth.passwordLabel}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={loginForm.data.password}
                                            onChange={(e) => loginForm.setData('password', e.target.value)}
                                            placeholder={t.auth.passwordPlaceholder}
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

                                {/* Keep Signed In & Forgot Password */}
                                <div className="flex items-center justify-between pt-1">
                                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={loginForm.data.remember}
                                            onChange={(e) => loginForm.setData('remember', e.target.checked)}
                                            className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-[#1AC13B] focus:ring-[#1AC13B] bg-slate-50 dark:bg-slate-900 cursor-pointer"
                                        />
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                                            {t.auth.keepSignedIn}
                                        </span>
                                    </label>

                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline transition-colors"
                                    >
                                        {t.auth.resetPassword}
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loginForm.processing}
                                    className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#1AC13B] hover:bg-[#159F30] text-white font-bold text-xs sm:text-sm tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 border-0 flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>
                                        {loginForm.processing ? "Authenticating..." : t.auth.signInBtn}
                                    </span>
                                </button>
                            </form>
                        )}

                        {/* Divider */}
                        <div className="relative my-6 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                            </div>
                            <span className="relative px-3 bg-white dark:bg-slate-950 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                {t.auth.orContinueWith}
                            </span>
                        </div>

                        {/* Multi Provider Buttons */}
                        <div className="space-y-2.5">
                            {/* Continue with Google */}
                            <button
                                type="button"
                                onClick={() => {
                                    showAlert({
                                        title: language === "EN" ? "Google OAuth 2.0 Identity" : "Autentikasi Google OAuth 2.0",
                                        message:
                                            language === "EN"
                                                ? "Google OAuth 2.0 Identity Service is configured for live production domains. Direct Google sign-in will authenticate your academic account."
                                                : "Layanan Autentikasi Google OAuth 2.0 dikonfigurasi untuk domain publik. Akses masuk Google otomatis menautkan akun akademik Anda.",
                                        type: "info",
                                        confirmText: language === "EN" ? "Got It" : "Mengerti",
                                    });
                                }}
                                className="w-full py-3 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-[#EDFBF1]/50 dark:hover:bg-[#10381C]/30 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/60 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-3 cursor-pointer group"
                            >
                                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                </svg>
                                <span>{t.auth.googleBtn}</span>
                            </button>

                            {/* Continue with Passkey */}
                            <button
                                type="button"
                                onClick={() => {
                                    showAlert({
                                        title: language === "EN" ? "Biometric Passkey Authentication" : "Autentikasi Kunci Biometrik",
                                        message:
                                            language === "EN"
                                                ? "FIDO2 / WebAuthn biometric hardware passkey is ready. You can authenticate using Windows Hello, TouchID, or your physical security key."
                                                : "Kunci keamanan biometrik FIDO2 / WebAuthn siap digunakan. Anda dapat login dengan Windows Hello, Touch ID, atau security key fisik.",
                                        type: "success",
                                        confirmText: language === "EN" ? "Continue" : "Lanjutkan",
                                    });
                                }}
                                className="w-full py-3 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-[#EDFBF1]/50 dark:hover:bg-[#10381C]/30 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B]/60 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-3 cursor-pointer group"
                            >
                                <Fingerprint className="w-4 h-4 text-[#107E27] dark:text-[#1AC13B] group-hover:scale-110 transition-transform" />
                                <span>{t.auth.passkeyBtn}</span>
                            </button>

                            {/* Continue with SSO Telkom University */}
                            <button
                                type="button"
                                onClick={() => {
                                    showAlert({
                                        title: language === "EN" ? "Telkom University SSO Gateway" : "Portal SSO Telkom University",
                                        message:
                                            language === "EN"
                                                ? "Connecting to Telkom University Central Single Sign-On (SSO) authentication gateway with CAS protocol."
                                                : "Mengalihkan ke Portal Single Sign-On (SSO) Telkom University untuk verifikasi akun civitas akademika.",
                                        type: "info",
                                        confirmText: language === "EN" ? "Proceed to SSO" : "Lanjutkan ke SSO",
                                    });
                                }}
                                className="w-full py-3 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-[#EDFBF1]/70 dark:hover:bg-[#10381C]/40 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-3 cursor-pointer group"
                            >
                                <img
                                    src="/assets/images/telu_noname.png"
                                    alt="Telkom University"
                                    className="w-4 h-4 object-contain shrink-0"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/assets/images/telu.png';
                                    }}
                                />
                                <span>{t.auth.ssoTelkomBtn}</span>
                            </button>
                        </div>

                        {/* Bottom Switcher */}
                        <div className="mt-7 text-center">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {isRegisterMode
                                    ? t.auth.haveAccount
                                    : t.auth.noAccount}{" "}
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsRegisterMode(!isRegisterMode);
                                }}
                                className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline transition-colors cursor-pointer ml-1"
                            >
                                {isRegisterMode
                                    ? t.auth.signInBtn
                                    : t.auth.requestAccess}
                            </button>
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
                                    Pioneering Applied Research & Industrial Innovation
                                </h2>

                                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                                    Integrated research laboratory ecosystem at Telkom University bridging smart
                                    manufacturing, renewable energy systems, and cyber-physical operations.
                                </p>
                            </div>

                            <div className="relative z-10 grid grid-cols-2 gap-3 my-auto">
                                <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                                    <Cpu className="w-4 h-4 text-[#1AC13B] mb-2" />
                                    <div className="text-xs font-bold text-white">8 Focus Domains</div>
                                    <div className="text-[11px] text-slate-400">Industry 4.0 & Green Tech</div>
                                </div>
                                <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                                    <BookOpen className="w-4 h-4 text-[#1AC13B] mb-2" />
                                    <div className="text-xs font-bold text-white">50+ Publications</div>
                                    <div className="text-[11px] text-slate-400">Indexed Q1 & IEEE Journals</div>
                                </div>
                            </div>

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

            <footer className="w-full py-5 px-6 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 text-center text-xs text-slate-500 dark:text-slate-400">
                <p>© {new Date().getFullYear()} CoE STAS-RG | Telkom University.</p>
            </footer>

            {/* Custom Template Alert Modal */}
            {AlertModalComponent}
        </div>
    );
}
