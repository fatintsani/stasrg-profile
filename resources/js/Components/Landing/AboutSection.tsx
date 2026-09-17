import React from 'react';
import { Card } from '../Common/Card';
import { IconHelper } from '../Common/IconHelper';
import { AboutHighlight, SiteConfig } from '../../types';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';
import { EmptyState } from '../Common/EmptyState';

interface AboutSectionProps {
    highlights: AboutHighlight[];
    siteConfig?: SiteConfig;
    t: TranslationDictionary['about'];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ highlights, siteConfig, t }) => {
    const hasHighlights = Array.isArray(highlights) && highlights.length > 0;
    const directorQuote = siteConfig?.director_quote || t.quote;
    const directorName = siteConfig?.director_name || t.directorName;
    const directorTitle = siteConfig?.director_title || t.directorTitle;

    return (
        <section id="about" className="py-20 md:py-28 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column: Mission Narrative & Director Quote */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 space-y-6"
                    >
                        <div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#107E27] dark:text-[#1AC13B] tracking-wider uppercase mb-2.5 select-none">
                                {t.pill}
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {t.title}
                            </h2>
                        </div>

                        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                            <p>{t.p1}</p>
                            <p>{t.p2}</p>
                        </div>

                        {/* Callout Quote Card */}
                        {directorQuote && (
                            <div className="p-5 sm:p-6 rounded-xl bg-[#F6FDF8] dark:bg-[#0E2C17]/40 border border-[#B2EFC3] dark:border-[#1A5C2F] relative">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] shrink-0">
                                        <Quote className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 italic leading-snug">
                                            "{directorQuote}"
                                        </p>
                                        <div className="pt-1 flex items-center gap-2 flex-wrap">
                                            <div className="w-2 h-2 rounded-full bg-[#1AC13B]" />
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                {directorName}
                                            </span>
                                            {directorTitle && (
                                                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                                    – {directorTitle}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="pt-2 flex items-center gap-3">
                            <a
                                href="/about"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#107E27] hover:bg-[#0E6820] text-white text-xs font-bold transition shadow-xs"
                            >
                                <span>{siteConfig?.director_quote?.includes('Pioneering') ? 'Explore Our Heritage' : 'Pelajari Selengkapnya'}</span>
                                <span className="text-sm">→</span>
                            </a>
                            <a
                                href="/team"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1AC13B] text-slate-700 dark:text-slate-200 text-xs font-bold transition"
                            >
                                <span>{siteConfig?.director_quote?.includes('Pioneering') ? 'Meet Our Researchers' : 'Kenali Tim Peneliti'}</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Dynamic Highlights Grid from Database */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6"
                    >
                        {hasHighlights ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                {highlights.map((item, index) => (
                                    <Card
                                        key={item.id || index}
                                        padding="md"
                                        className="group hover:border-[#1AC13B]/70"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center mb-4 group-hover:bg-[#1AC13B] group-hover:text-white transition-colors">
                                            <IconHelper name={item.icon || 'Cpu'} className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="Tidak ada data pilar riset ditemukan"
                                description="Data keunggulan & pilar riset belum tersedia di database."
                            />
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

