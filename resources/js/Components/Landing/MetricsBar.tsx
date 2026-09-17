import React from 'react';
import { ResearchMetric } from '../../types';
import { motion } from 'framer-motion';
import { TranslationDictionary } from '../../utils/translations';
import { EmptyState } from '../Common/EmptyState';

interface MetricsBarProps {
    metrics: ResearchMetric[];
    t: TranslationDictionary['metrics'];
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ metrics, t }) => {
    const hasMetrics = Array.isArray(metrics) && metrics.length > 0;

    // Helper to get translated labels & descriptions
    const getMetricInfo = (metric: ResearchMetric, index: number) => {
        const isIndonesian = t?.projects === 'Proyek Riset';
        if (isIndonesian) {
            return {
                label: metric.label_id || (index === 0 ? t?.projects : index === 1 ? t?.applications : index === 2 ? t?.partners : index === 3 ? t?.researchers : metric.label),
                description: metric.description_id || (index === 0 ? t?.projectsDesc : index === 1 ? t?.applicationsDesc : index === 2 ? t?.partnersDesc : index === 3 ? t?.researchersDesc : metric.description) || metric.description,
            };
        }
        return {
            label: metric.label,
            description: metric.description,
        };
    };

    return (
        <section className="relative z-20 w-full bg-white dark:bg-slate-950 -mt-8 sm:-mt-12 pt-2 pb-8 sm:pb-12 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {hasMetrics ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(metrics.length, 4)} divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-none`}
                    >
                        {metrics.map((metric, index) => {
                            const info = getMetricInfo(metric, index);
                            return (
                                <div
                                    key={metric.id || index}
                                    className="p-6 sm:p-7 flex flex-col justify-center transition-colors hover:bg-[#F9FDFB] dark:hover:bg-slate-800/60 group"
                                >
                                    <div className="text-3xl sm:text-4xl font-extrabold text-[#1AC13B] tracking-tight flex items-baseline gap-1">
                                        {metric.value}
                                    </div>
                                    <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors">
                                        {info.label}
                                    </div>
                                    {info.description && (
                                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-normal">
                                            {info.description}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <EmptyState
                        title="Tidak ada data metrik ditemukan"
                        description="Data indikator riset belum tersedia di database."
                    />
                )}
            </div>
        </section>
    );
};
