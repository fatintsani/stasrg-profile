import React, { useState, useEffect } from 'react';
import { Search, X, Cpu, FlaskConical, FileText } from 'lucide-react';
import { ResearchDomain, ResearchProject, Publication, EnterpriseService, Article } from '../../types';
import { TranslationDictionary } from '../../utils/translations';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    domains: ResearchDomain[];
    projects: ResearchProject[];
    publications: Publication[];
    services: EnterpriseService[];
    articles: Article[];
    t: TranslationDictionary['search'];
}

export const SearchModal: React.FC<SearchModalProps> = ({
    isOpen,
    onClose,
    domains,
    projects,
    publications,
    services,
    articles,
    t,
}) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const lowerQuery = query.toLowerCase().trim();

    const matchedDomains = query
        ? domains.filter((d) => d.title.toLowerCase().includes(lowerQuery) || d.summary.toLowerCase().includes(lowerQuery))
        : domains.slice(0, 3);

    const matchedProjects = query
        ? projects.filter((p) => p.title.toLowerCase().includes(lowerQuery) || p.summary.toLowerCase().includes(lowerQuery))
        : projects.slice(0, 2);

    const matchedPubs = query
        ? publications.filter((p) => p.title.toLowerCase().includes(lowerQuery) || p.authors.toLowerCase().includes(lowerQuery))
        : publications.slice(0, 2);

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Bar Input */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <Search className="w-5 h-5 text-[#1AC13B] shrink-0" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t.placeholder}
                        autoFocus
                        className="w-full text-sm font-medium text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none bg-transparent"
                    />
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Results Container */}
                <div className="p-4 overflow-y-auto space-y-5 text-left">
                    {/* Domains */}
                    {matchedDomains.length > 0 && (
                        <div className="space-y-2">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {t.domainsLabel}
                            </div>
                            <div className="space-y-1">
                                {matchedDomains.map((domain) => (
                                    <a
                                        key={domain.slug}
                                        href="#domains"
                                        onClick={onClose}
                                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#EDFBF1] dark:hover:bg-slate-800 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Cpu className="w-4 h-4 text-[#1AC13B]" />
                                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B]">
                                                {domain.title}
                                            </span>
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B]">
                                            {domain.domain_number}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {matchedProjects.length > 0 && (
                        <div className="space-y-2">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {t.projectsLabel}
                            </div>
                            <div className="space-y-1">
                                {matchedProjects.map((project) => (
                                    <a
                                        key={project.slug}
                                        href="#projects"
                                        onClick={onClose}
                                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#EDFBF1] dark:hover:bg-slate-800 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FlaskConical className="w-4 h-4 text-[#1AC13B]" />
                                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] truncate max-w-md">
                                                {project.title}
                                            </div>
                                        </div>
                                        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
                                            {project.category_tag}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Publications */}
                    {matchedPubs.length > 0 && (
                        <div className="space-y-2">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {t.pubsLabel}
                            </div>
                            <div className="space-y-1">
                                {matchedPubs.map((pub) => (
                                    <a
                                        key={pub.title}
                                        href="#publications"
                                        onClick={onClose}
                                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#EDFBF1] dark:hover:bg-slate-800 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-[#1AC13B]" />
                                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] truncate max-w-md">
                                                {pub.title}
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{pub.year}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer status */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
                    <span>{t.pressEsc}</span>
                    <span className="text-[#107E27] dark:text-[#1AC13B] font-semibold">{t.knowledgeBase}</span>
                </div>
            </div>
        </div>
    );
};
