import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { BrandLogo } from '../Common/BrandLogo';
import { Button } from '../Common/Button';
import { FlagIcon } from '../Common/FlagIcon';
import { Search, Sun, Moon, ChevronDown, Menu, X, LogIn } from 'lucide-react';
import { Language, TranslationDictionary } from '../../utils/translations';

interface NavbarProps {
    language: Language;
    onToggleLanguage: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    onOpenSearch: () => void;
    onOpenLogin: () => void;
    t: TranslationDictionary['nav'];
}

export const Navbar: React.FC<NavbarProps> = ({
    language,
    onToggleLanguage,
    theme,
    onToggleTheme,
    onOpenSearch,
    onOpenLogin,
    t,
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

    const { url } = usePage();
    const currentPath = url ? url.split('?')[0].split('#')[0] : (typeof window !== 'undefined' ? window.location.pathname : '');

    const isActive = (href: string) => {
        if (href === '/') {
            return currentPath === '/' || currentPath === '';
        }
        return currentPath === href || currentPath.startsWith(`${href}/`);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Primary top bar navigation (The most essential 4 pillars)
    const primaryNavLinks = [
        { name: t.home, href: '/' },
        { name: t.about, href: '/about' },
        { name: t.research, href: '/research' },
        { name: t.publications, href: '/publications' },
    ];

    // Submenu items under "More" (Organized secondary & ecosystem features)
    const moreLinks = [
        { 
            name: t.team, 
            href: '/team', 
            iconSrc: '/assets/icon/nav/TimPeneliti.png',
            desc: language === 'EN' ? 'Lecturers, fellows & student contributors' : 'Dosen peneliti, asisten riset & kontributor' 
        },
        { 
            name: t.projects, 
            href: '/projects', 
            iconSrc: '/assets/icon/nav/ProyekRiset.png',
            desc: language === 'EN' ? 'Applied research projects & case studies' : 'Portofolio inovasi & studi kasus industri' 
        },
        { 
            name: t.services, 
            href: '/services', 
            iconSrc: '/assets/icon/nav/LayananKonsultasi.png',
            desc: language === 'EN' ? 'Industrial R&D, consulting & lab tests' : 'Riset terapan, konsultasi & uji lab' 
        },
        { 
            name: t.partners, 
            href: '/partners', 
            iconSrc: '/assets/icon/nav/MitraKerjasama.png',
            desc: language === 'EN' ? 'Industry, SOE & academic partners' : 'Mitra industri, BUMN & instansi rekanan' 
        },
        { 
            name: t.news, 
            href: '/news', 
            iconSrc: '/assets/icon/nav/BeritaArtikel.png',
            desc: language === 'EN' ? 'Research breakthroughs & tech dispatches' : 'Kabar riset & artikel teknologi' 
        },
        { 
            name: t.events, 
            href: '/events', 
            iconSrc: '/assets/icon/nav/AgendaAcara.png',
            desc: language === 'EN' ? 'Symposia, workshops & conferences' : 'Simposium, workshop & agenda kegiatan' 
        },
    ];

    const isMoreActive = moreLinks.some((item) => isActive(item.href));

    const mobileLinks = [
        ...primaryNavLinks,
        { name: t.team, href: '/team' },
        { name: t.projects, href: '/projects' },
        { name: t.services, href: '/services' },
        { name: t.partners, href: '/partners' },
        { name: t.news, href: '/news' },
        { name: t.events, href: '/events' },
        { name: t.contact, href: '/contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                isScrolled
                    ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-2.5'
                    : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-900 py-3.5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand Logo */}
                    <a href="/" className="flex items-center shrink-0 mr-3 xl:mr-6">
                        <BrandLogo size="md" variant={theme === 'dark' ? 'light' : 'dark'} />
                    </a>

                    {/* Desktop Navigation Links (Compact size & Active state highlighting) */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
                        {primaryNavLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`px-2.5 xl:px-3 py-1.5 text-xs xl:text-[12.5px] whitespace-nowrap rounded-lg transition-all ${
                                        active
                                            ? 'text-[#107E27] dark:text-[#1AC13B] font-bold bg-[#EDFBF1] dark:bg-[#10381C]/60 shadow-xs ring-1 ring-[#1AC13B]/25 dark:ring-[#1AC13B]/35'
                                            : 'text-slate-600 dark:text-slate-300 font-medium hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-[#EDFBF1]/70 dark:hover:bg-[#10381C]/40'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}

                        {/* More Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                                onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 250)}
                                className={`px-2.5 xl:px-3 py-1.5 text-xs xl:text-[12.5px] whitespace-nowrap rounded-lg inline-flex items-center gap-1 transition-all cursor-pointer ${
                                    isMoreActive
                                        ? 'text-[#107E27] dark:text-[#1AC13B] font-bold bg-[#EDFBF1] dark:bg-[#10381C]/60 shadow-xs ring-1 ring-[#1AC13B]/25 dark:ring-[#1AC13B]/35'
                                        : 'text-slate-600 dark:text-slate-300 font-medium hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-[#EDFBF1]/70 dark:hover:bg-[#10381C]/40'
                                }`}
                            >
                                <span>{t.more}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#107E27] dark:text-[#1AC13B]' : 'text-slate-400'}`} />
                            </button>

                            {moreDropdownOpen && (
                                <div className="absolute top-full right-0 lg:left-0 mt-2 w-[340px] sm:w-[460px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-2.5 shadow-xl shadow-slate-900/10 dark:shadow-black/40 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                        {moreLinks.map((item) => {
                                            const active = isActive(item.href);
                                            return (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setMoreDropdownOpen(false)}
                                                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors group ${
                                                        active
                                                            ? 'bg-[#EDFBF1] dark:bg-[#10381C]/70 ring-1 ring-[#1AC13B]/30'
                                                            : 'hover:bg-[#EDFBF1]/80 dark:hover:bg-slate-800/80'
                                                    }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform overflow-hidden p-1 ${
                                                        active
                                                            ? 'bg-white dark:bg-slate-900 shadow-xs'
                                                            : 'bg-[#EDFBF1] dark:bg-[#10381C]/50'
                                                    }`}>
                                                        <img
                                                            src={item.iconSrc}
                                                            alt={item.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className={`text-xs flex items-center justify-between ${
                                                            active
                                                                ? 'font-bold text-[#107E27] dark:text-[#1AC13B]'
                                                                : 'font-semibold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B]'
                                                        }`}>
                                                            <span className="truncate">{item.name}</span>
                                                            {active && (
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#1AC13B] shrink-0 ml-1.5" />
                                                            )}
                                                        </div>
                                                        <div className="text-[10.5px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                                            {item.desc}
                                                        </div>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Link */}
                        <a
                            href="/contact"
                            className={`px-2.5 xl:px-3 py-1.5 text-xs xl:text-[12.5px] whitespace-nowrap rounded-lg transition-all ${
                                isActive('/contact')
                                    ? 'text-[#107E27] dark:text-[#1AC13B] font-bold bg-[#EDFBF1] dark:bg-[#10381C]/60 shadow-xs ring-1 ring-[#1AC13B]/25 dark:ring-[#1AC13B]/35'
                                    : 'text-slate-600 dark:text-slate-300 font-medium hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-[#EDFBF1]/70 dark:hover:bg-[#10381C]/40'
                            }`}
                        >
                            {t.contact}
                        </a>
                    </nav>

                    {/* Right Tools (Clean, Frameless Icon-Only: Flag, Theme, Search) & Login Button */}
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                        {/* 1-Click Instant Language Switcher (Flag Only, Pure Flag without text & icon) */}
                        <button
                            onClick={onToggleLanguage}
                            aria-label="Toggle language"
                            title={t.langTooltip}
                            className="p-1.5 hover:opacity-80 hover:scale-110 active:scale-95 transition-all cursor-pointer bg-transparent border-0 inline-flex items-center justify-center rounded-full"
                        >
                            <FlagIcon language={language} size="md" />
                        </button>

                        {/* Theme Mode Toggle (Sun/Moon Icon Only, No Border, No BG) */}
                        <button
                            onClick={onToggleTheme}
                            aria-label="Toggle dark/light theme"
                            title={t.themeTooltip}
                            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-[#1AC13B] dark:hover:text-[#1AC13B] transition-colors cursor-pointer bg-transparent border-0"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                            ) : (
                                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
                            )}
                        </button>

                        {/* Search Button (Icon Only, No Border, No BG) */}
                        <button
                            onClick={onOpenSearch}
                            aria-label="Search"
                            title={t.searchTooltip}
                            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-[#1AC13B] dark:hover:text-[#1AC13B] transition-colors cursor-pointer bg-transparent border-0"
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        {/* Primary Login Button */}
                        <Button
                            variant="primary"
                            size="sm"
                            href="/login"
                            className="ml-1 px-3.5 py-1.5 text-xs"
                            icon={<LogIn className="w-3.5 h-3.5" />}
                        >
                            {t.login}
                        </Button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-[#1AC13B] bg-transparent border-0 cursor-pointer ml-1"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
                    <div className="grid grid-cols-2 gap-2 pt-2 border-b border-slate-100 dark:border-slate-900 pb-3">
                        {mobileLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                                        active
                                            ? 'font-bold text-[#107E27] dark:text-[#1AC13B] bg-[#EDFBF1] dark:bg-[#10381C]/70 ring-1 ring-[#1AC13B]/30'
                                            : 'font-medium text-slate-700 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-[#EDFBF1] dark:hover:bg-slate-900'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                        <Button
                            variant="primary"
                            size="md"
                            className="w-full"
                            href="/login"
                            icon={<LogIn className="w-4 h-4" />}
                        >
                            {t.login}
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};
