import React from 'react';
import { ResearchMetric } from '../../types';
import { motion } from 'framer-motion';
import { TranslationDictionary } from '../../utils/translations';

interface MetricsBarProps {
    metrics: ResearchMetric[];
    t: TranslationDictionary['metrics'];
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ metrics, t }) => {
    // Localized labels based on order/index
    const localizedMetrics = [
        { value: '50+', label: t.projects, desc: t.projectsDesc },
        { value: '30+', label: t.applications, desc: t.applicationsDesc },
        { value: '20+', label: t.partners, desc: t.partnersDesc },
        { value: '15+', label: t.researchers, desc: t.researchersDesc },
    ];

    return (
        <section className="relative z-20 w-full bg-white dark:bg-slate-950 -mt-8 sm:-mt-12 pt-2 pb-8 sm:pb-12 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-none"
                >
                    {localizedMetrics.map((metric, index) => (
                        <div
                            key={index}
                            className="p-6 sm:p-7 flex flex-col justify-center transition-colors hover:bg-[#F9FDFB] dark:hover:bg-slate-800/60 group"
                        >
                            <div className="text-3xl sm:text-4xl font-extrabold text-[#1AC13B] tracking-tight flex items-baseline gap-1">
                                {metric.value}
                            </div>
                            <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                {metric.label}
                            </div>
                            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-normal">
                                {metric.desc}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
