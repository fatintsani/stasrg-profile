import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Primary top bar navigation
    const primaryNavLinks = [
        { name: t.home, href: '#hero' },
        { name: t.about, href: '#about' },
        { name: t.research, href: '#domains' },
        { name: t.projects, href: '#projects' },
        { name: t.publications, href: '#publications' },
    ];

    // Submenu items under "More"
    const moreLinks = [
        { name: t.services, href: '#services', desc: language === 'EN' ? 'Custom R&D, advisory & lab testing' : 'R&D kustom, konsultansi & pengujian lab' },
        { name: t.partners, href: '#partners', desc: language === 'EN' ? 'Industry & government collaborators' : 'Mitra industri & lembaga pemerintah' },
        { name: t.news, href: '#news', desc: language === 'EN' ? 'Press releases & policy whitepapers' : 'Siaran pers & kajian kebijakan' },
        { name: t.events, href: '#events', desc: language === 'EN' ? 'Academic symposia & masterclasses' : 'Simposium akademik & masterclass' },
    ];

    const mobileLinks = [
        ...primaryNavLinks,
        { name: t.services, href: '#services' },
        { name: t.partners, href: '#partners' },
        { name: t.news, href: '#news' },
        { name: t.events, href: '#events' },
        { name: t.contact, href: '#contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                isScrolled
                    ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-3'
                    : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-900 py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand Logo */}
                    <a href="#hero" className="flex items-center">
                        <BrandLogo size="md" variant={theme === 'dark' ? 'light' : 'dark'} />
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5">
                        {primaryNavLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-[#EDFBF1]/70 dark:hover:bg-[#10381C]/40 rounded-lg transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* More Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                                onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-[#EDFBF1]/70 dark:hover:bg-[#10381C]/40 rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer"
                            >
                                <span>{t.more}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#107E27] dark:text-[#1AC13B]' : 'text-slate-400'}`} />
                            </button>

                            {moreDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                    {moreLinks.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMoreDropdownOpen(false)}
                                            className="block p-2.5 rounded-lg hover:bg-[#EDFBF1] dark:hover:bg-slate-800 transition-colors group"
                                        >
                                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] flex items-center justify-between">
                                                <span>{item.name}</span>
                                                <span className="text-[10px] text-slate-400 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                            </div>
                                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                {item.desc}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <a
                            href="#contact"
                            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-[#EDFBF1]/70 dark:hover:bg-[#10381C]/40 rounded-lg transition-colors"
                        >
                            {t.contact}
                        </a>
                    </nav>

                    {/* Right Tools (Clean, Frameless Icon-Only: Flag, Theme, Search) & Login Button */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* 1-Click Instant Language Switcher (Flag Only, Pure Flag without text & icon) */}
                        <button
                            onClick={onToggleLanguage}
                            aria-label="Toggle language"
                            title={t.langTooltip}
                            className="p-2 hover:opacity-80 hover:scale-110 active:scale-95 transition-all cursor-pointer bg-transparent border-0 inline-flex items-center justify-center rounded-full"
                        >
                            <FlagIcon language={language} size="md" />
                        </button>

                        {/* Theme Mode Toggle (Sun/Moon Icon Only, No Border, No BG) */}
                        <button
                            onClick={onToggleTheme}
                            aria-label="Toggle dark/light theme"
                            title={t.themeTooltip}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#1AC13B] dark:hover:text-[#1AC13B] transition-colors cursor-pointer bg-transparent border-0"
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
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#1AC13B] dark:hover:text-[#1AC13B] transition-colors cursor-pointer bg-transparent border-0"
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        {/* Primary Login Button */}
                        <Button
                            variant="primary"
                            size="sm"
                            href="/login"
                            className="ml-1 px-4 py-2"
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
                        {mobileLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] hover:bg-[#EDFBF1] dark:hover:bg-slate-900 rounded-lg transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
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
