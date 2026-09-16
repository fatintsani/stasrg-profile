import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { HomePageProps } from '../types';
import { Language, translations } from '../utils/translations';

import { Navbar } from '../Components/Layout/Navbar';
import { Footer } from '../Components/Layout/Footer';

import { HeroSection } from '../Components/Landing/HeroSection';
import { MetricsBar } from '../Components/Landing/MetricsBar';
import { AboutSection } from '../Components/Landing/AboutSection';
import { DomainsSection } from '../Components/Landing/DomainsSection';
import { ProjectsSection } from '../Components/Landing/ProjectsSection';
import { PublicationsSection } from '../Components/Landing/PublicationsSection';
import { ServicesSection } from '../Components/Landing/ServicesSection';
import { PartnersSection } from '../Components/Landing/PartnersSection';
import { NewsSection } from '../Components/Landing/NewsSection';
import { EventsSection } from '../Components/Landing/EventsSection';
import { CtaBanner } from '../Components/Landing/CtaBanner';

import { SearchModal } from '../Components/Common/SearchModal';
import { ContactModal } from '../Components/Common/ContactModal';
import { LoginModal } from '../Components/Common/LoginModal';

export default function Home({
    metrics,
    aboutHighlights,
    domains,
    projects,
    publications,
    services,
    partners,
    articles,
    events,
    siteConfig,
}: HomePageProps) {
    // 1. Language State (1-click instant switch)
    const [language, setLanguage] = useState<Language>('EN');

    // 2. Theme State (Dark / Light mode)
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Modals
    const [searchOpen, setSearchOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [contactSubject, setContactSubject] = useState('');

    useEffect(() => {
        // Load saved language
        const savedLang = localStorage.getItem('stas_lang') as Language;
        if (savedLang === 'EN' || savedLang === 'ID') {
            setLanguage(savedLang);
        }

        // Load saved theme (default to light mode unless explicitly set)
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

    const handleOpenContactWithSubject = (subject: string) => {
        setContactSubject(subject);
        setContactOpen(true);
    };

    const t = translations[language];

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#1AC13B]/20 selection:text-[#0F5A1F] dark:selection:text-[#7FE39F] transition-colors duration-200">
            <Head>
                <title>{`${siteConfig?.center_name || 'CoE STAS-RG'} - Sustainable Technology & Applied Science`}</title>
                <meta
                    name="description"
                    content="Center of Excellence for Sustainable Technology & Applied Science Research Group (CoE STAS-RG) | Telkom University"
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

            {/* Main Landing Sections */}
            <main className="flex-grow">
                {/* 1. Hero Section */}
                <HeroSection
                    t={t.hero}
                    onExploreClick={() => {
                        const el = document.getElementById('projects');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onPartnerClick={() => handleOpenContactWithSubject('R&D Partnership')}
                />

                {/* 2. Key Metrics Bar */}
                <MetricsBar metrics={metrics} t={t.metrics} />

                {/* 3. About & Mission Section */}
                <AboutSection highlights={aboutHighlights} siteConfig={siteConfig} t={t.about} />

                {/* 4. Research Domains (8 Focus Areas) */}
                <DomainsSection domains={domains} t={t.domains} />

                {/* 5. Featured Projects with Filter Tabs */}
                <ProjectsSection projects={projects} t={t.projects} />

                {/* 6. Academic Publications Repository */}
                <PublicationsSection publications={publications} t={t.publications} />

                {/* 7. Enterprise Services & Consultancy */}
                <ServicesSection services={services} t={t.services} />

                {/* 8. Partners & Collaborators Showcase */}
                <PartnersSection partners={partners} t={t.partners} />

                {/* 9. News & Research Insights */}
                <NewsSection articles={articles} t={t.news} />

                {/* 10. Upcoming Events & Symposia */}
                <EventsSection
                    events={events}
                    t={t.events}
                    language={language}
                    onRegisterClick={(eventTitle) => handleOpenContactWithSubject(`Event Registration: ${eventTitle}`)}
                />

                {/* 11. Call-to-Action Banner */}
                <CtaBanner
                    siteConfig={siteConfig}
                    t={t.cta}
                    onInitiateProposal={() => handleOpenContactWithSubject('Collaborative Research Proposal')}
                    onScheduleCall={() => handleOpenContactWithSubject('Exploration Call Schedule')}
                />
            </main>

            {/* Footer */}
            <Footer siteConfig={siteConfig} t={t.footer} />

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

            {/* Partnership & Proposal Contact Modal */}
            <ContactModal
                isOpen={contactOpen}
                onClose={() => setContactOpen(false)}
                prefilledSubject={contactSubject}
            />
        </div>
    );
}
