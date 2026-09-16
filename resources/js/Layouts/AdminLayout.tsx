import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { BrandLogo } from '../Components/Common/BrandLogo';
import { FlagIcon } from '../Components/Common/FlagIcon';
import { Language, translations } from '../utils/translations';
import {
    LayoutDashboard,
    Layers,
    Briefcase,
    BookOpen,
    FlaskConical,
    Building2,
    Calendar,
    Newspaper,
    TrendingUp,
    Users,
    SlidersHorizontal,
    ExternalLink,
    Search,
    Bell,
    Sun,
    Moon,
    Menu,
    X,
    ChevronDown,
    LogOut,
    User,
    Shield,
    CheckCircle2,
    PanelLeftClose,
    PanelLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
    siteConfig?: {
        center_name?: string;
        institution?: string;
        sub_institution?: string;
    };
}

export default function AdminLayout({
    children,
    title = 'Dashboard',
    siteConfig,
}: AdminLayoutProps) {
    const { url } = usePage();

    // 1. Language & Theme State
    const [language, setLanguage] = useState<Language>('EN');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 2. Navigation & Drawer State
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    useEffect(() => {
        // Load saved language
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('stas_theme') as 'light' | 'dark';
        if (savedTheme === 'dark') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            setTheme('light');
            document.documentElement.classList.remove('dark');
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

    // Navigation Menu Structure tailored for CoE STAS-RG
    const navigationGroups = [
        {
            groupName: isEn ? 'OVERVIEW' : 'RINGKASAN',
            items: [
                {
                    name: isEn ? 'Dashboard' : 'Dasbor Utama',
                    href: '/admin',
                    icon: LayoutDashboard,
                    active: url === '/admin' || url === '/admin/dashboard',
                },
            ],
        },
        {
            groupName: isEn ? 'RESEARCH & R&D' : 'RISET & PENGEMBANGAN',
            items: [
                {
                    name: isEn ? 'Research Domains' : 'Domain Riset',
                    href: '/admin/domains',
                    icon: Layers,
                    active: url === '/admin/domains' || url.startsWith('/admin/domains'),
                    badge: '8',
                },
                {
                    name: isEn ? 'Featured Projects' : 'Proyek Riset Unggulan',
                    href: '/admin/projects',
                    icon: Briefcase,
                    active: url === '/admin/projects' || url.startsWith('/admin/projects'),
                },
                {
                    name: isEn ? 'Peer-Reviewed Repository' : 'Repositori Publikasi',
                    href: '/admin/publications',
                    icon: BookOpen,
                    active: url === '/admin/publications' || url.startsWith('/admin/publications'),
                },
            ],
        },
        {
            groupName: isEn ? 'ENGAGEMENT & INDUSTRIAL' : 'KOLABORASI & INDUSTRI',
            items: [
                {
                    name: isEn ? 'Enterprise Services' : 'Layanan Industri',
                    href: '/admin/services',
                    icon: FlaskConical,
                    active: url === '/admin/services' || url.startsWith('/admin/services'),
                },
                {
                    name: isEn ? 'Strategic Partners' : 'Mitra Kerjasama',
                    href: '/admin/partners',
                    icon: Building2,
                    active: url === '/admin/partners' || url.startsWith('/admin/partners'),
                },
                {
                    name: isEn ? 'Symposia & Events' : 'Simposium & Agenda',
                    href: '/admin/events',
                    icon: Calendar,
                    active: url === '/admin/events' || url.startsWith('/admin/events'),
                },
                {
                    name: isEn ? 'News & Insights' : 'Berita & Wawasan',
                    href: '/admin/articles',
                    icon: Newspaper,
                    active: url === '/admin/articles' || url.startsWith('/admin/articles'),
                },
            ],
        },
        {
            groupName: isEn ? 'MANAGEMENT' : 'PENGATURAN',
            items: [
                {
                    name: isEn ? 'Impact Metrics' : 'Metrik Kinerja',
                    href: '/admin#metrics',
                    icon: TrendingUp,
                    active: url.includes('/admin/metrics'),
                },
                {
                    name: isEn ? 'Researchers & Team' : 'Tim Peneliti',
                    href: '/admin#team',
                    icon: Users,
                    active: url.includes('/admin/team'),
                },
                {
                    name: isEn ? 'Portal Settings' : 'Pengaturan Situs',
                    href: '/admin#settings',
                    icon: SlidersHorizontal,
                    active: url.includes('/admin/settings'),
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
            <Head>
                <title>{`${title} - Admin Management Portal | ${siteConfig?.center_name || 'CoE STAS-RG'}`}</title>
            </Head>

            <div className="flex flex-1 overflow-hidden">
                {/* 1. Desktop Sidebar */}
                <aside
                    className={`hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-30 ${
                        desktopCollapsed ? 'w-20' : 'w-64 xl:w-72'
                    }`}
                >
                    {/* Sidebar Brand Header */}
                    <div className="h-16 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        {!desktopCollapsed ? (
                            <Link href="/admin" className="flex items-center">
                                <BrandLogo size="sm" variant={theme === 'dark' ? 'light' : 'dark'} />
                            </Link>
                        ) : (
                            <Link href="/admin" className="mx-auto flex items-center justify-center">
                                <div className="w-8 h-8 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] flex items-center justify-center text-[#107E27] dark:text-[#3FD27B] font-black text-xs">
                                    STAS
                                </div>
                            </Link>
                        )}
                        <button
                            onClick={() => setDesktopCollapsed(!desktopCollapsed)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title={desktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {desktopCollapsed ? (
                                <PanelLeft className="w-4 h-4" />
                            ) : (
                                <PanelLeftClose className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {/* Navigation Menu Links */}
                    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                        {navigationGroups.map((group) => (
                            <div key={group.groupName} className="space-y-1">
                                {!desktopCollapsed && (
                                    <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                                        {group.groupName}
                                    </div>
                                )}
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                                                item.active
                                                    ? 'bg-[#EDFBF1] text-[#107E27] dark:bg-[#10381C] dark:text-[#3FD27B] border-l-2 border-[#1AC13B]'
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                                            } ${desktopCollapsed ? 'justify-center px-2' : ''}`}
                                            title={desktopCollapsed ? item.name : undefined}
                                        >
                                            <Icon
                                                className={`w-4 h-4 shrink-0 transition-colors ${
                                                    item.active
                                                        ? 'text-[#107E27] dark:text-[#1AC13B]'
                                                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                                                }`}
                                            />
                                            {!desktopCollapsed && (
                                                <div className="flex-1 flex items-center justify-between">
                                                    <span>{item.name}</span>
                                                    {item.badge && (
                                                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}

                        {/* Live Site Link in Sidebar */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                            <Link
                                href="/"
                                target="_blank"
                                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-[#EDFBF1]/60 dark:hover:bg-[#10381C]/40 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors group ${
                                    desktopCollapsed ? 'justify-center px-2' : ''
                                }`}
                                title={isEn ? 'View Live Landing Page' : 'Lihat Halaman Utama'}
                            >
                                <ExternalLink className="w-4 h-4 shrink-0 text-[#1AC13B]" />
                                {!desktopCollapsed && (
                                    <span>{isEn ? 'View Live Website' : 'Kunjungi Beranda'}</span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar Bottom User Profile Card */}
                    <div className="p-3 border-t border-slate-200 dark:border-slate-800">
                        <div
                            className={`flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 ${
                                desktopCollapsed ? 'justify-center p-1.5' : ''
                            }`}
                        >
                            <div className="w-8 h-8 rounded-lg bg-[#1AC13B] text-white font-bold flex items-center justify-center text-xs shrink-0">
                                AD
                            </div>
                            {!desktopCollapsed && (
                                <div className="flex-1 min-w-0 leading-tight">
                                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                        Admin Researcher
                                    </div>
                                    <div className="text-[10px] text-slate-400 truncate">
                                        admin@stasrg.telu.ac.id
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* 2. Mobile Drawer Sidebar */}
                <AnimatePresence>
                    {mobileSidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileSidebarOpen(false)}
                                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
                            />
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-50 lg:hidden"
                            >
                                <div className="h-16 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <BrandLogo size="sm" variant={theme === 'dark' ? 'light' : 'dark'} />
                                    <button
                                        onClick={() => setMobileSidebarOpen(false)}
                                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
                                    {navigationGroups.map((group) => (
                                        <div key={group.groupName} className="space-y-1">
                                            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                                                {group.groupName}
                                            </div>
                                            {group.items.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        onClick={() => setMobileSidebarOpen(false)}
                                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                                                            item.active
                                                                ? 'bg-[#EDFBF1] text-[#107E27] dark:bg-[#10381C] dark:text-[#3FD27B]'
                                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                        }`}
                                                    >
                                                        <Icon className="w-4 h-4 shrink-0 text-[#1AC13B]" />
                                                        <span>{item.name}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    ))}
                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                        <Link
                                            href="/"
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#107E27]"
                                        >
                                            <ExternalLink className="w-4 h-4 text-[#1AC13B]" />
                                            <span>{isEn ? 'View Live Website' : 'Kunjungi Beranda'}</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* 3. Main Content Wrapper */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {/* Header / Top Navigation Bar */}
                    <header className="h-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-20">
                        <div className="flex items-center gap-3">
                            {/* Mobile Hamburger Toggle */}
                            <button
                                onClick={() => setMobileSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                aria-label="Open sidebar"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* Page Header Title */}
                            <div className="hidden sm:block">
                                <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    {title}
                                </h1>
                            </div>
                        </div>

                        {/* Search Input on Desktop */}
                        <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-md mx-4">
                            <div className="relative w-full">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder={isEn ? 'Search research projects, publications, records...' : 'Cari proyek riset, publikasi ilmiah, data...'}
                                    className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                />
                            </div>
                        </div>

                        {/* Header Right Action Items */}
                        <div className="flex items-center gap-1 sm:gap-2.5">
                            {/* Live Website Shortcut */}
                            <Link
                                href="/"
                                target="_blank"
                                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:border-[#1AC13B]/50 transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5 text-[#1AC13B]" />
                                <span>{isEn ? 'Live Site' : 'Website'}</span>
                            </Link>

                            {/* Language Switcher */}
                            <button
                                onClick={handleToggleLanguage}
                                aria-label="Toggle language"
                                title={isEn ? 'Switch to Indonesian' : 'Ganti ke Bahasa Inggris'}
                                className="p-2 hover:scale-110 active:scale-95 transition-transform cursor-pointer bg-transparent border-0 inline-flex items-center justify-center rounded-full"
                            >
                                <FlagIcon language={language} size="md" />
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={handleToggleTheme}
                                aria-label="Toggle dark/light theme"
                                title={isEn ? 'Toggle color scheme' : 'Ganti mode gelap/terang'}
                                className="p-2 text-slate-500 dark:text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors cursor-pointer bg-transparent border-0"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                                ) : (
                                    <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
                                )}
                            </button>

                            {/* Notifications Dropdown Trigger */}
                            <div className="relative">
                                <button
                                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                                    onBlur={() => setTimeout(() => setNotificationsOpen(false), 200)}
                                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
                                    aria-label="Notifications"
                                >
                                    <Bell className="w-4 h-4" />
                                    <span className="w-2 h-2 rounded-full bg-[#1AC13B] absolute top-1.5 right-1.5" />
                                </button>

                                {notificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                {isEn ? 'Notifications' : 'Pemberitahuan'}
                                            </span>
                                            <span className="text-[10px] font-semibold text-[#107E27] dark:text-[#1AC13B]">
                                                2 New
                                            </span>
                                        </div>
                                        <div className="py-2 space-y-2 text-xs">
                                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                                                <div className="font-bold text-slate-800 dark:text-slate-200">
                                                    IS-STSS 2026 Registration
                                                </div>
                                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                    New participant registered from Indonesia Power.
                                                </div>
                                            </div>
                                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                                                <div className="font-bold text-slate-800 dark:text-slate-200">
                                                    Q1 Paper Published
                                                </div>
                                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                    IEEE Transactions citation updated.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

                            {/* User Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#1AC13B] text-white font-bold flex items-center justify-center text-xs shrink-0">
                                        AD
                                    </div>
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                                </button>

                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                                                Principal Lead
                                            </div>
                                            <div className="text-[10px] text-slate-400 truncate">
                                                admin@stasrg.telu.ac.id
                                            </div>
                                        </div>

                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <User className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{isEn ? 'Researcher Profile' : 'Profil Peneliti'}</span>
                                        </Link>

                                        <Link
                                            href="/admin#settings"
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <Shield className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{isEn ? 'Access & Security' : 'Keamanan & Hak Akses'}</span>
                                        </Link>

                                        <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-semibold text-left cursor-pointer"
                                        >
                                            <LogOut className="w-3.5 h-3.5" />
                                            <span>{isEn ? 'Sign Out' : 'Keluar'}</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* Main Scrollable Content */}
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                        <div className="max-w-7xl mx-auto space-y-6">
                            {children}
                        </div>
                    </main>

                    {/* Admin Footer */}
                    <footer className="h-12 px-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#1AC13B] inline-block" />
                            <span className="font-semibold text-slate-600 dark:text-slate-400">
                                {isEn ? 'CoE STAS-RG Management System' : 'Sistem Pengelolaan CoE STAS-RG'}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline font-mono text-[11px]">v2.0 Modern Minimalist</span>
                        </div>
                        <div>
                            <span>© {new Date().getFullYear()} Telkom University</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
