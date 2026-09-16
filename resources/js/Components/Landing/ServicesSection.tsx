import React from 'react';
import { SectionHeading } from '../Common/SectionHeading';
import { Card } from '../Common/Card';
import { EnterpriseService } from '../../types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';

interface ServicesSectionProps {
    services: EnterpriseService[];
    t: TranslationDictionary['services'];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, t }) => {
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
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id || index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                        >
                            <Card
                                padding="lg"
                                className="h-full flex flex-col justify-between group hover:border-[#1AC13B]/70"
                            >
                                <div>
                                    {/* Number pill */}
                                    <div className="w-9 h-9 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] font-black text-xs flex items-center justify-center mb-5 group-hover:bg-[#1AC13B] group-hover:text-white transition-colors">
                                        {service.service_number}
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                        {service.summary}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] group-hover:text-[#12A02E] inline-flex items-center gap-1.5 transition-colors">
                                        {t.exploreService}
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
