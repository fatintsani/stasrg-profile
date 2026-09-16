import React from 'react';
import { Partner } from '../../types';
import { motion } from 'framer-motion';
import { TranslationDictionary } from '../../utils/translations';

interface PartnersSectionProps {
    partners: Partner[];
    t: TranslationDictionary['partners'];
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({ partners, t }) => {
    const activePartners = partners.filter((p) => p.is_active !== false);

    return (
        <section id="partners" className="py-16 md:py-20 bg-[#FBFDFB] dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 md:mb-10"
                >
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#107E27] dark:text-[#1AC13B] tracking-wider uppercase mb-2 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1AC13B] shrink-0" />
                        {t.pill}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {t.title}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    {activePartners.map((partner, index) => {
                        const CardWrapper = partner.website_url ? 'a' : 'div';
                        const linkProps = partner.website_url
                            ? {
                                  href: partner.website_url,
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  title: `${partner.name}${partner.partnership_type ? ` • ${partner.partnership_type}` : ''}`,
                              }
                            : {
                                  title: `${partner.name}${partner.partnership_type ? ` • ${partner.partnership_type}` : ''}`,
                              };

                        return (
                            <motion.div
                                key={partner.id || index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <CardWrapper
                                    {...linkProps}
                                    className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B]/60 transition-all duration-200 flex flex-col items-center justify-center min-h-[84px] h-full group relative overflow-hidden cursor-pointer"
                                >
                                    {partner.logo_url ? (
                                        <img
                                            src={partner.logo_url}
                                            alt={partner.name}
                                            className="max-h-10 sm:max-h-12 w-auto max-w-[120px] object-contain transition-all duration-300 opacity-90 dark:brightness-0 dark:invert dark:opacity-90 group-hover:opacity-100 group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                if (target.nextElementSibling) {
                                                    (target.nextElementSibling as HTMLElement).style.display = 'block';
                                                }
                                            }}
                                        />
                                    ) : null}
                                    <span
                                        className={`text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-200 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors text-center ${
                                            partner.logo_url ? 'hidden' : 'block'
                                        }`}
                                    >
                                        {partner.logo_text || partner.name}
                                    </span>
                                </CardWrapper>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
