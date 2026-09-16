import React from 'react';
import { PillBadge } from '../Common/PillBadge';
import { Card } from '../Common/Card';
import { IconHelper } from '../Common/IconHelper';
import { AboutHighlight, SiteConfig } from '../../types';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';

interface AboutSectionProps {
    highlights: AboutHighlight[];
    siteConfig?: SiteConfig;
    t: TranslationDictionary['about'];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ highlights, siteConfig, t }) => {
    // Dynamic pillars based on translation
    const localizedPillars = [
        { icon: 'Cpu', title: t.pillars.appliedRd.title, desc: t.pillars.appliedRd.desc },
        { icon: 'Network', title: t.pillars.industryIntegration.title, desc: t.pillars.industryIntegration.desc },
        { icon: 'Users', title: t.pillars.capacityBuilding.title, desc: t.pillars.capacityBuilding.desc },
        { icon: 'Leaf', title: t.pillars.sustainableImpact.title, desc: t.pillars.sustainableImpact.desc },
    ];

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
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1AC13B] shrink-0" />
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
                        <div className="p-5 sm:p-6 rounded-xl bg-[#F6FDF8] dark:bg-[#0E2C17]/40 border border-[#B2EFC3] dark:border-[#1A5C2F] relative">
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] shrink-0">
                                    <Quote className="w-5 h-5" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 italic leading-snug">
                                        "{t.quote}"
                                    </p>
                                    <div className="pt-1 flex items-center gap-2 flex-wrap">
                                        <div className="w-2 h-2 rounded-full bg-[#1AC13B]" />
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                                            {t.directorName}
                                        </span>
                                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                            – {t.directorTitle}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: 2x2 Highlights Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                    >
                        {localizedPillars.map((item, index) => (
                            <Card
                                key={index}
                                padding="md"
                                className="group hover:border-[#1AC13B]/70"
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center mb-4 group-hover:bg-[#1AC13B] group-hover:text-white transition-colors">
                                    <IconHelper name={item.icon} className="w-5 h-5" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </Card>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
