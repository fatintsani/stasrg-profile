import React from 'react';
import { PillBadge } from '../Common/PillBadge';
import { Button } from '../Common/Button';
import { SiteConfig } from '../../types';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';

interface CtaBannerProps {
    siteConfig?: SiteConfig;
    t: TranslationDictionary['cta'];
    onInitiateProposal?: () => void;
    onScheduleCall?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
    siteConfig,
    t,
    onInitiateProposal,
    onScheduleCall,
}) => {
    const benefits = [t.b1, t.b2, t.b3];

    return (
        <section className="py-20 md:py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="p-8 sm:p-12 lg:p-14 rounded-2xl bg-gradient-to-br from-[#F4FBF6] via-white to-[#F0FAF3] dark:from-[#0B1E13] dark:via-slate-900 dark:to-[#07170E] border border-[#B2EFC3] dark:border-[#143B22] relative overflow-hidden"
                >
                    {/* Background accent ring */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#1AC13B]/5 dark:bg-[#1AC13B]/10 pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/assets/icon/profile_cs.png"
                                    alt="Collaboration Support"
                                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md"
                                />
                                <PillBadge variant="green" showDot>
                                    {t.pill}
                                </PillBadge>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                                {t.titlePart1} <br className="hidden sm:inline" />
                                Join Hands With <span className="text-[#1AC13B]">{t.titleHighlight}</span>.
                            </h2>

                            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                                {t.subtitle}
                            </p>

                            {/* Bullet points */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center shrink-0 border border-[#B2EFC3]/60 dark:border-[#1A5C2F]">
                                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                                        </div>
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Action Box */}
                        <div className="lg:col-span-5 flex flex-col items-stretch sm:items-center lg:items-end gap-3.5">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full sm:w-auto text-center"
                                onClick={onInitiateProposal}
                                icon={<ArrowRight className="w-4 h-4" />}
                            >
                                {t.initiateBtn}
                            </Button>

                            <Button
                                variant="secondary"
                                size="md"
                                className="w-full sm:w-auto text-center dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:hover:bg-slate-800"
                                onClick={onScheduleCall}
                            >
                                {t.scheduleBtn}
                            </Button>

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center lg:text-right pt-2 font-medium">
                                {t.officialContact}{' '}
                                <a
                                    href={`mailto:${siteConfig?.contact_email || 'stasrg@telkomuniversity.ac.id'}`}
                                    className="font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline"
                                >
                                    {siteConfig?.contact_email || 'stasrg@telkomuniversity.ac.id'}
                                </a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
