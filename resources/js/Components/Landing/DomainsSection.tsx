import React from 'react';
import { SectionHeading } from '../Common/SectionHeading';
import { Card } from '../Common/Card';
import { IconHelper } from '../Common/IconHelper';
import { ResearchDomain } from '../../types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';

interface DomainsSectionProps {
    domains: ResearchDomain[];
    t: TranslationDictionary['domains'];
}

export const DomainsSection: React.FC<DomainsSectionProps> = ({ domains, t }) => {
    return (
        <section id="domains" className="py-20 md:py-28 bg-[#FBFDFB] dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    pillText={t.pill}
                    title={t.title}
                    subtitle={t.subtitle}
                    align="between"
                    actionLink={{
                        text: t.actionLink,
                        href: '#domains',
                    }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {domains
                        .filter((d) => d.is_active !== false)
                        .map((domain, index) => {
                            const isIndonesian = t.exploreLink === 'Pelajari Domain' || t.exploreLink.includes('Pelajari');
                            const displayTitle = isIndonesian ? (domain.title_id || domain.title) : (domain.title || domain.title_id);
                            const displaySummary = isIndonesian ? (domain.summary_id || domain.summary) : (domain.summary || domain.summary_id);

                            return (
                                <motion.div
                                    key={domain.id || index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <Card
                                        padding="md"
                                        className="h-full flex flex-col justify-between group hover:border-[#1AC13B]/70"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-9 h-9 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center group-hover:bg-[#1AC13B] group-hover:text-white transition-colors">
                                                    <IconHelper name={domain.icon} className="w-4 h-4" />
                                                </div>
                                                <span className="text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                                                    {domain.domain_number}
                                                </span>
                                            </div>

                                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors line-clamp-2">
                                                {displayTitle}
                                            </h3>

                                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                                {displaySummary}
                                            </p>
                                        </div>

                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] group-hover:text-[#12A02E] inline-flex items-center gap-1.5 transition-colors">
                                            {t.exploreLink}
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
