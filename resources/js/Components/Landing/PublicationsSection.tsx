import React from 'react';
import { SectionHeading } from '../Common/SectionHeading';
import { PillBadge } from '../Common/PillBadge';
import { Publication } from '../../types';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';

interface PublicationsSectionProps {
    publications: Publication[];
    t: TranslationDictionary['publications'];
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({ publications, t }) => {
    const isIndonesian = t.browseAll === 'Buka Seluruh Repositori (150+)→' || t.browseAll.includes('Repositori') || t.browseAll.includes('Buka');

    const activePublications = publications.filter((p) => p.is_active !== false);

    return (
        <section id="publications" className="py-20 md:py-28 bg-[#FBFDFB] dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    pillText={t.pill}
                    title={t.title}
                    subtitle={t.subtitle}
                    align="between"
                    actionLink={{
                        text: t.browseAll,
                        href: '#publications',
                    }}
                />

                <div className="space-y-4">
                    {activePublications.map((pub, index) => {
                        const displayTitle = isIndonesian ? (pub.title_id || pub.title) : (pub.title || pub.title_id);

                        return (
                            <motion.div
                                key={pub.id || index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="p-5 sm:p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B]/70 dark:hover:border-[#1AC13B]/60 transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 group"
                            >
                                <div className="space-y-2.5 max-w-4xl">
                                    {/* Metadata line */}
                                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                                        <PillBadge
                                            variant={pub.badge_type === 'green' ? 'green' : 'gray'}
                                            size="sm"
                                        >
                                            {pub.badge}
                                        </PillBadge>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{pub.year}</span>
                                        <span>•</span>
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">{pub.venue}</span>
                                        <span>•</span>
                                        <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">{pub.doi}</span>
                                    </div>

                                    {/* Paper Title */}
                                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors leading-snug">
                                        {displayTitle}
                                    </h3>

                                    {/* Authors */}
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                        <span className="text-slate-400 dark:text-slate-500">{t.authors} </span>
                                        {pub.authors}
                                    </p>
                                </div>

                                {/* Actions on right */}
                                <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                                    {pub.pdf_url && pub.pdf_url !== '#' && (
                                        <a
                                            href={pub.pdf_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 inline-flex items-center gap-1.5 transition-colors"
                                        >
                                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                                            <span>{t.pdfLink}</span>
                                        </a>
                                    )}
                                    {pub.doi_url && (
                                        <a
                                            href={pub.doi_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] hover:bg-[#1AC13B] hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors border border-[#B2EFC3]/60 dark:border-[#1A5C2F]"
                                        >
                                            <span>{t.doiLink}</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
