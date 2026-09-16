import React, { useState } from 'react';
import { PillBadge } from '../Common/PillBadge';
import { ResearchProject } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, UserCheck } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';

interface ProjectsSectionProps {
    projects: ResearchProject[];
    t: TranslationDictionary['projects'];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, t }) => {
    const [activeTabKey, setActiveTabKey] = useState<'all' | 'smartMfg' | 'sustEnergy' | 'supplyChain'>('all');

    const tabs: Array<{ key: 'all' | 'smartMfg' | 'sustEnergy' | 'supplyChain'; label: string; filterCategory: string }> = [
        { key: 'all', label: t.tabs.all, filterCategory: 'All' },
        { key: 'smartMfg', label: t.tabs.smartMfg, filterCategory: 'Smart Manufacturing' },
        { key: 'sustEnergy', label: t.tabs.sustEnergy, filterCategory: 'Sustainable Energy' },
        { key: 'supplyChain', label: t.tabs.supplyChain, filterCategory: 'Supply Chain' },
    ];

    const currentTab = tabs.find((t) => t.key === activeTabKey) || tabs[0];

    const filteredProjects = projects.filter((project) => {
        if (currentTab.filterCategory === 'All') return true;
        return project.category.toLowerCase().includes(currentTab.filterCategory.toLowerCase());
    });

    return (
        <section id="projects" className="py-20 md:py-28 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Filter Tabs */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#107E27] dark:text-[#1AC13B] tracking-wider uppercase mb-2.5 select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1AC13B] shrink-0" />
                            {t.pill}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            {t.title}
                        </h2>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        {tabs.map((tab) => {
                            const isActive = activeTabKey === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTabKey(tab.key)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none border ${
                                        isActive
                                            ? 'bg-[#1AC13B] text-white border-[#1AC13B]'
                                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id || index}
                                layout
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-[#1AC13B]/70 transition-colors"
                            >
                                <div>
                                    {/* Project Image */}
                                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        {/* Category Badge overlay */}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 rounded-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-wider text-[#107E27] dark:text-[#3FD27B] border border-slate-200/60 dark:border-slate-800">
                                                {project.category_tag}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6 space-y-3">
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors line-clamp-2 leading-snug">
                                            {project.title}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                            {project.summary}
                                        </p>

                                        {/* Researcher info */}
                                        <div className="pt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                                            <UserCheck className="w-3.5 h-3.5 text-[#1AC13B] shrink-0" />
                                            <span className="truncate">{project.lead_researcher}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="p-5 sm:p-6 pt-0">
                                    <a
                                        href={`#project-${project.slug}`}
                                        className="inline-flex items-center gap-2 text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:text-[#12A02E] group/link transition-colors pt-3 border-t border-slate-100 dark:border-slate-800 w-full"
                                    >
                                        <span>{t.viewCaseStudy}</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
