import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../Common/SectionHeading';
import { Card } from '../Common/Card';
import { Article } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Calendar,
    Clock,
    User,
    Sparkles,
    X,
    ExternalLink,
    FileText,
    Newspaper,
} from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';
import { EmptyState } from '../Common/EmptyState';

interface NewsSectionProps {
    articles: Article[];
    t: TranslationDictionary['news'];
}

type Language = 'ID' | 'EN';

export const NewsSection: React.FC<NewsSectionProps> = ({ articles, t }) => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [lang, setLang] = useState<Language>('ID');

    useEffect(() => {
        const saved = localStorage.getItem('stas_lang') as Language;
        if (saved === 'EN' || saved === 'ID') {
            setLang(saved);
        }

        const handleLangChange = () => {
            const updated = localStorage.getItem('stas_lang') as Language;
            if (updated === 'EN' || updated === 'ID') {
                setLang(updated);
            }
        };

        window.addEventListener('storage', handleLangChange);
        window.addEventListener('stas_lang_change', handleLangChange);
        return () => {
            window.removeEventListener('storage', handleLangChange);
            window.removeEventListener('stas_lang_change', handleLangChange);
        };
    }, []);

    const isEn = lang === 'EN';

    const getArticleTitle = (article: Article) => {
        return isEn ? (article.title || article.title_id) : (article.title_id || article.title);
    };

    const getArticleSummary = (article: Article) => {
        return isEn ? (article.summary || article.summary_id) : (article.summary_id || article.summary);
    };

    const getArticleContent = (article: Article) => {
        return isEn ? (article.content || article.content_id) : (article.content_id || article.content);
    };

    const activeArticles = (articles || []).filter((a) => a.is_active !== false);

    return (
        <section id="news" className="py-20 md:py-28 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    pillText={t.pill}
                    title={t.title}
                    subtitle={t.subtitle}
                    align="between"
                    actionLink={{
                        text: t.viewAll,
                        href: '/news',
                    }}
                />

                {activeArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                        {activeArticles.map((article, index) => (
                            <motion.div
                                key={article.id || index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <Card
                                    padding="none"
                                    className="h-full flex flex-col justify-between group hover:border-[#1AC13B]/70 overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedArticle(article)}
                                >
                                    <div>
                                        {/* Cover Image */}
                                        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                                            {article.image_url ? (
                                                <img
                                                    src={article.image_url}
                                                    alt={getArticleTitle(article)}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                                                    <Newspaper className="w-12 h-12" />
                                                </div>
                                            )}
                                            {/* Tag badge overlay */}
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-[#107E27] dark:text-[#3FD27B] font-extrabold text-[10px] tracking-wider uppercase border border-[#B2EFC3]/80 dark:border-[#1A5C2F] shadow-xs">
                                                    {article.tag}
                                                </span>
                                            </div>
                                            {/* Featured badge overlay */}
                                            {article.is_featured && (
                                                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-amber-500/95 backdrop-blur-xs text-white text-[10px] font-black flex items-center gap-1 shadow-xs">
                                                    <Sparkles className="w-3 h-3" />
                                                    <span>FEATURED</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-5 space-y-3">
                                            {/* Meta line */}
                                            <div className="flex items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
                                                <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 text-[11px]">
                                                    <Calendar className="w-3.5 h-3.5 text-[#1AC13B]" />
                                                    {article.date}
                                                </span>
                                                <span className="flex items-center gap-1 text-[11px]">
                                                    <Clock className="w-3 h-3" />
                                                    {article.read_time}
                                                </span>
                                            </div>

                                            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors line-clamp-2 leading-snug">
                                                {getArticleTitle(article)}
                                            </h3>

                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                                {getArticleSummary(article)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-5 pt-0 mt-auto">
                                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                                            <span className="font-bold text-[#107E27] dark:text-[#1AC13B] group-hover:text-[#12A02E] inline-flex items-center gap-1.5 transition-colors">
                                                {t.readMore}
                                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                            </span>
                                            {article.author && (
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate max-w-[140px]">
                                                    {article.author}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title={isEn ? 'No news & articles found' : 'Tidak ada data berita & wawasan ditemukan'}
                        description={isEn ? 'Articles and research insights are not available in the database.' : 'Publikasi artikel dan rilis berita belum tersedia di database.'}
                    />
                )}
            </div>


            {/* Article Detail Modal */}
            <AnimatePresence>
                {selectedArticle && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="w-full max-w-3xl max-h-[88vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header Cover */}
                            <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                                {selectedArticle.image_url ? (
                                    <img
                                        src={selectedArticle.image_url}
                                        alt={getArticleTitle(selectedArticle)}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Newspaper className="w-16 h-16" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer border-0"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <span className="px-2.5 py-1 rounded-md bg-[#1AC13B] text-white text-[10px] font-black uppercase tracking-wider">
                                        {selectedArticle.tag}
                                    </span>
                                    <h2 className="text-lg sm:text-xl font-black text-white mt-1.5 leading-snug line-clamp-2">
                                        {getArticleTitle(selectedArticle)}
                                    </h2>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {/* Meta Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                                            <Calendar className="w-4 h-4 text-[#1AC13B]" />
                                            {selectedArticle.date}
                                        </span>
                                        {selectedArticle.author && (
                                            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                                <User className="w-4 h-4 text-slate-400" />
                                                {selectedArticle.author}
                                            </span>
                                        )}
                                    </div>
                                    <span className="flex items-center gap-1 font-semibold text-slate-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        {selectedArticle.read_time}
                                    </span>
                                </div>

                                {/* Summary Box */}
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        {isEn ? 'Executive Summary' : 'Ringkasan Eksekutif'}
                                    </h4>
                                    <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {getArticleSummary(selectedArticle)}
                                    </p>
                                </div>

                                {/* Full Content Body */}
                                {getArticleContent(selectedArticle) ? (
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
                                        {getArticleContent(selectedArticle)}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-xs text-slate-400">
                                        {isEn ? 'Complete report documentation is available through official channels.' : 'Dokumentasi laporan lengkap dapat diakses melalui saluran resmi kemitraan.'}
                                    </div>
                                )}

                                {/* External Document Action */}
                                {selectedArticle.external_url && (
                                    <div className="pt-2">
                                        <a
                                            href={selectedArticle.external_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] hover:bg-[#B2EFC3]/60 text-xs font-bold transition-colors border border-[#B2EFC3] dark:border-[#1A5C2F]"
                                        >
                                            <FileText className="w-4 h-4 text-[#1AC13B]" />
                                            <span>{isEn ? 'Open Full Press Document' : 'Buka Dokumen Publikasi Lengkap'}</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                                <span className="text-[11px] text-slate-400">
                                    Center of Excellence for Sustainable Technology & Applied Sciences (CoE STAS-RG)
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedArticle(null)}
                                    className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer border-0"
                                >
                                    {isEn ? 'Close' : 'Tutup'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
