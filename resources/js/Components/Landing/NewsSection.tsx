import React from 'react';
import { SectionHeading } from '../Common/SectionHeading';
import { PillBadge } from '../Common/PillBadge';
import { Card } from '../Common/Card';
import { Article } from '../../types';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';

interface NewsSectionProps {
    articles: Article[];
    t: TranslationDictionary['news'];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ articles, t }) => {
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
                        href: '#news',
                    }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.id || index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                            <Card
                                padding="md"
                                className="h-full flex flex-col justify-between group hover:border-[#1AC13B]/70"
                            >
                                <div className="space-y-3">
                                    {/* Meta line */}
                                    <div className="flex items-center justify-between gap-2 text-xs">
                                        <span className="px-2 py-0.5 rounded bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] font-bold text-[10px] tracking-wider uppercase border border-[#B2EFC3]/60 dark:border-[#1A5C2F]">
                                            {article.tag}
                                        </span>
                                        <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                                            <Calendar className="w-3 h-3 text-slate-400" />
                                            {article.date}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors line-clamp-2 leading-snug">
                                        {article.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                        {article.summary}
                                    </p>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                                    <span className="font-bold text-[#107E27] dark:text-[#1AC13B] group-hover:text-[#12A02E] inline-flex items-center gap-1.5 transition-colors">
                                        {t.readMore}
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <span className="text-slate-400 dark:text-slate-500">{article.read_time}</span>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
