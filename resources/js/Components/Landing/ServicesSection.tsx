import React from 'react';
import { SectionHeading } from '../Common/SectionHeading';
import { Card } from '../Common/Card';
import { IconHelper } from '../Common/IconHelper';
import { EnterpriseService } from '../../types';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';

interface ServicesSectionProps {
    services: EnterpriseService[];
    t: TranslationDictionary['services'];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, t }) => {
    const isIndonesian = t.exploreService === 'Pelajari Layanan' || t.exploreService.includes('Pelajari');

    return (
        <section id="services" className="py-20 md:py-28 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    pillText={t.pill}
                    title={t.title}
                    subtitle={t.subtitle}
                    align="between"
                    actionLink={{
                        text: t.actionLink,
                        href: '#services',
                    }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services
                        .filter((s) => s.is_active !== false)
                        .map((service, index) => {
                            const displayTitle = isIndonesian ? (service.title_id || service.title) : (service.title || service.title_id);
                            const displaySummary = isIndonesian ? (service.summary_id || service.summary) : (service.summary || service.summary_id);
                            const displayActionLabel = isIndonesian 
                                ? (service.action_label_id || service.action_label || t.exploreService)
                                : (service.action_label || service.action_label_id || t.exploreService);

                            const features = Array.isArray(service.features)
                                ? service.features
                                : typeof service.features === 'string'
                                ? JSON.parse(service.features || '[]')
                                : [];

                            return (
                                <motion.div
                                    key={service.id || index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.06 }}
                                >
                                    <Card
                                        padding="lg"
                                        className={`h-full flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:border-[#1AC13B]/70 ${
                                            service.is_featured ? 'border-[#1AC13B]/40 dark:border-[#1AC13B]/30' : ''
                                        }`}
                                    >
                                        <div>
                                            {/* Header: Number pill & Icon & Featured Badge */}
                                            <div className="flex items-center justify-between mb-5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-9 h-9 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] font-black text-xs flex items-center justify-center group-hover:bg-[#1AC13B] group-hover:text-white transition-colors">
                                                        {service.service_number}
                                                    </div>
                                                    {service.icon && (
                                                        <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                                            <IconHelper name={service.icon} className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </div>

                                                {service.target_industry ? (
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700 max-w-[150px] truncate">
                                                        {service.target_industry}
                                                    </span>
                                                ) : service.is_featured ? (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800">
                                                        <Sparkles className="w-2.5 h-2.5" /> Featured
                                                    </span>
                                                ) : null}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors leading-snug">
                                                {displayTitle}
                                            </h3>

                                            {/* Summary */}
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                                                {displaySummary}
                                            </p>

                                            {/* Deliverables / Features List */}
                                            {features.length > 0 && (
                                                <div className="mb-5 space-y-1.5 pt-2 border-t border-dashed border-slate-100 dark:border-slate-800">
                                                    {features.slice(0, 3).map((feat: string, fIdx: number) => (
                                                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1AC13B] shrink-0" />
                                                            <span className="truncate">{feat}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Lead Advisor */}
                                            {service.lead_advisor && (
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-4">
                                                    <UserCheck className="w-3.5 h-3.5 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                                    <span className="truncate">{service.lead_advisor}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Link Footer */}
                                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                            <a
                                                href={service.link || '#services'}
                                                className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] group-hover:text-[#12A02E] inline-flex items-center gap-1.5 transition-colors"
                                            >
                                                <span>{displayActionLabel}</span>
                                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                            </a>
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
