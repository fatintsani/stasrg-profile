import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { FlagIcon } from '../Components/Common/FlagIcon';
import { Language, translations } from '../utils/translations';
import {
    LayoutDashboard,
    Bot,
    FolderKanban,
    LayoutTemplate,
    BarChart3,
    Image,
    GraduationCap,
    UserCheck,
    HelpCircle,
    Activity,
    Settings,
    ChevronDown,
    Menu,
    X,
    Search,
    Sun,
    Moon,
    Bell,
    LogOut,
    ExternalLink,
    ChevronRight,
    Sparkles,
    Shield,
    Layers,
    BookOpen,
    Briefcase,
    Newspaper,
    MessageSquare,
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    currentMenu?: string;
    siteConfig?: {
        center_name?: string;
    };
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
    children,
    currentMenu = 'dashboard',
    siteConfig,
}) => {
    // 1. Language & Theme State
    const [language, setLanguage] = useState<Language>('ID');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 2. Sidebar & Navigation State
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(true);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }

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

    const menuItems = [
        {
            id: 'dashboard',
            label: language === 'EN' ? 'Dashboard Overview' : 'Dashboard Overview',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
        },
        {
            id: 'nara',
            label: 'NARA AI Assistant',
            href: '#nara',
            icon: Sparkles,
            badge: 'AI',
        },
        {
            id: 'projects',
            label: language === 'EN' ? 'Projects & Innovation' : 'Proyek Riset & Flyer',
            href: '/admin/projects',
            icon: FolderKanban,
            hasSubmenu: true,
        },
        {
            id: 'domains',
            label: language === 'EN' ? 'Research Domains' : 'Klaster & Fokus Riset',
            href: '/admin/domains',
            icon: Layers,
        },
        {
            id: 'publications',
            label: language === 'EN' ? 'Publications & Papers' : 'Publikasi Ilmiah',
            href: '/admin/publications',
            icon: BookOpen,
        },
        {
            id: 'researchers',
            label: language === 'EN' ? 'Researchers & Team' : 'Tim & Direktori Peneliti',
            href: '/admin/researchers',
            icon: GraduationCap,
        },
        {
            id: 'services',
            label: language === 'EN' ? 'Services & Partners' : 'Layanan & Kemitraan',
            href: '/admin/services',
            icon: Briefcase,
        },
        {
            id: 'news',
            label: language === 'EN' ? 'News & Symposia' : 'Berita & Agenda Event',
            href: '/admin/news-events',
            icon: Newspaper,
        },
        {
            id: 'assets',
            label: language === 'EN' ? 'Templates & Media Hub' : 'Template Hub & Media',
            href: '/admin/assets',
            icon: LayoutTemplate,
        },
        {
            id: 'messages',
            label: language === 'EN' ? 'Inquiries & Collab' : 'Pesan & Kolaborasi',
            href: '/admin/messages',
            icon: MessageSquare,
        },
        {
            id: 'settings',
            label: language === 'EN' ? 'System Settings' : 'Pengaturan Sistem',
            href: '/admin/settings',
            icon: Settings,
        },
    ];

    return (
        <div className="h-screen w-screen overflow-hidden bg-[#F8FAFB] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex">
            {/* 1. Desktop & Mobile Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 transition-all duration-300 lg:static lg:h-full lg:min-h-0 shrink-0 ${
                    sidebarCollapsed ? 'w-20' : 'w-64'
                } ${
                    mobileSidebarOpen
                        ? 'translate-x-0 shadow-2xl'
                        : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Top Section: Brand Header & Scrollable Nav */}
                <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                    {/* Sidebar Brand Header */}
                    <div className="h-16 px-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between shrink-0">
                        <Link href="/admin/dashboard" className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-8 h-8 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] flex items-center justify-center shrink-0 border border-[#B2EFC3]/60 dark:border-[#1A5C2F]">
                                <img
                                    src="/assets/images/telu_noname.png"
                                    alt="STAS Logo"
                                    className="w-5 h-5 object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/stas.png';
                                    }}
                                />
                            </div>
                            {!sidebarCollapsed && (
                                <div className="leading-tight">
                                    <div className="text-sm font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
                                        <span>STAS RG</span>
                                        <span className="text-[#107E27] dark:text-[#1AC13B]">Projects</span>
                                    </div>
                                </div>
                            )}
                        </Link>

                        {/* Mobile Close Button */}
                        <button
                            onClick={() => setMobileSidebarOpen(false)}
                            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Menu List */}
                    <nav className="p-2.5 space-y-0.5 overflow-y-auto flex-1 min-h-0 custom-scrollbar">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentMenu === item.id;

                            return (
                                <div key={item.id}>
                                    <Link
                                        href={item.href}
                                        onClick={() => {
                                            if (item.hasSubmenu) {
                                                setProjectsDropdownOpen(!projectsDropdownOpen);
                                            }
                                            setMobileSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11.5px] font-bold transition-all group ${
                                            isActive
                                                ? 'bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] border border-[#B2EFC3]/60 dark:border-[#1A5C2F]'
                                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 border border-transparent'
                                        }`}
                                        title={sidebarCollapsed ? item.label : undefined}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Icon
                                                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                                                    isActive
                                                        ? 'text-[#107E27] dark:text-[#3FD27B]'
                                                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                                                }`}
                                            />
                                            {!sidebarCollapsed && <span>{item.label}</span>}
                                        </div>

                                        {!sidebarCollapsed && item.badge && (
                                            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#1AC13B] text-white">
                                                {item.badge}
                                            </span>
                                        )}

                                        {!sidebarCollapsed && item.hasSubmenu && (
                                            <ChevronDown
                                                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                                                    projectsDropdownOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        )}
                                    </Link>
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Sidebar Widgets & User Profile (Permanently Pinned at Bottom) */}
                <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2 shrink-0 bg-white dark:bg-slate-900">
                    {/* Developer Support Card */}
                    {!sidebarCollapsed && (
                        <div className="p-2.5 rounded-xl bg-[#EDFBF1]/80 dark:bg-[#10381C]/50 border border-[#B2EFC3]/60 dark:border-[#1A5C2F] flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-[#1AC13B] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-white dark:ring-slate-900">
                                    DS
                                </div>
                                <div className="leading-tight">
                                    <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                                        Developer Support
                                    </div>
                                    <div className="text-[10px] font-mono text-[#107E27] dark:text-[#3FD27B]">
                                        0831-3297-9214
                                    </div>
                                </div>
                            </div>
                            <a
                                href="https://wa.me/6283132979214"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-[#107E27] dark:text-[#3FD27B] hover:scale-110 transition-transform"
                                title="Contact Developer Support"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    )}

                    {/* Administrator Profile Card */}
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0">
                                A
                            </div>
                            {!sidebarCollapsed && (
                                <div className="leading-tight truncate">
                                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                        Administrator
                                    </div>
                                    <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                                        admin@stasrg.com
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/"
                            className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                            title="Exit to Landing Page"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* 2. Main Viewport & Header Bar */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                    
                    {/* Top Header Bar */}
                    <header className="h-16 px-4 sm:px-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-30 flex items-center justify-between gap-4">
                        
                        {/* Left: Sidebar Toggle & Search Bar */}
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
                            {/* Mobile Sidebar Trigger */}
                            <button
                                onClick={() => setMobileSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                aria-label="Open sidebar"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* Desktop Collapse Toggle */}
                            <button
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                className="hidden lg:flex p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                aria-label="Toggle sidebar collapse"
                            >
                                <Menu className="w-4 h-4" />
                            </button>

                            {/* Global Search Input */}
                            <div className="relative w-full max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Search className="w-3.5 h-3.5" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={
                                        language === 'EN'
                                            ? 'Search project, deliverable, or document template...'
                                            : 'Cari proyek, deliverable, atau template dokumen...'
                                    }
                                    className="w-full pl-9 pr-14 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#1AC13B] focus:ring-1 focus:ring-[#1AC13B] transition-all"
                                />
                                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                                    <kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 border border-slate-300/80 dark:border-slate-600">
                                        ⌘K
                                    </kbd>
                                </div>
                            </div>
                        </div>

                        {/* Right: Tools & Admin Profile Menu */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Language Switcher */}
                            <button
                                onClick={handleToggleLanguage}
                                aria-label="Toggle language"
                                title="Toggle Language (ID / EN)"
                                className="p-2 hover:scale-110 active:scale-95 transition-transform cursor-pointer bg-transparent border-0 inline-flex items-center justify-center rounded-full"
                            >
                                <FlagIcon language={language} size="md" />
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={handleToggleTheme}
                                aria-label="Toggle dark/light theme"
                                title="Toggle Theme"
                                className="p-2 text-slate-500 dark:text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors cursor-pointer bg-transparent border-0"
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                                ) : (
                                    <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
                                )}
                            </button>

                            {/* Notification Bell */}
                            <button
                                type="button"
                                className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors cursor-pointer bg-transparent border-0"
                                title="Notifications"
                            >
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1AC13B]" />
                            </button>

                            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

                            {/* Admin Profile Dropdown Button */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#1AC13B] text-white flex items-center justify-center font-bold text-xs">
                                        A
                                    </div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
                                        Administrator
                                    </span>
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                </button>

                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                                            <div className="text-xs font-bold text-slate-900 dark:text-white">
                                                Administrator
                                            </div>
                                            <div className="text-[10px] text-slate-400">admin@stasrg.com</div>
                                        </div>
                                        <Link
                                            href="/"
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-[#EDFBF1] dark:hover:bg-slate-800 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Lihat Landing Page</span>
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                        >
                                            <LogOut className="w-3.5 h-3.5" />
                                            <span>Keluar</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* Content Scroll Viewport */}
                    <div className="flex-1 overflow-y-auto min-h-0 flex flex-col justify-between">
                        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
                            {children}
                        </main>

                        {/* Admin Footer */}
                        <footer className="w-full shrink-0 py-4 px-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-center text-xs text-slate-400 dark:text-slate-500">
                            <p>© {new Date().getFullYear()} CoE STAS-RG | Telkom University. All rights reserved.</p>
                        </footer>
                    </div>
                </div>
        </div>
    );
};
