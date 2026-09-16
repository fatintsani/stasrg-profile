import React from 'react';
import { SectionHeading } from '../Common/SectionHeading';
import { PillBadge } from '../Common/PillBadge';
import { Button } from '../Common/Button';
import { UpcomingEvent } from '../../types';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Download, ArrowRight } from 'lucide-react';
import { TranslationDictionary } from '../../utils/translations';

interface EventsSectionProps {
    events: UpcomingEvent[];
    t: TranslationDictionary['events'];
    onRegisterClick?: (eventTitle: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events, t, onRegisterClick }) => {
    return (
        <section id="events" className="py-20 md:py-28 bg-[#FBFDFB] dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    pillText={t.pill}
                    title={t.title}
                    subtitle={t.subtitle}
                    align="between"
                    actionLink={{
                        text: t.calendarLink,
                        href: '#events',
                    }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id || index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 sm:p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B]/70 dark:hover:border-[#1AC13B]/60 transition-all flex flex-col justify-between group"
                        >
                            <div className="space-y-4">
                                {/* Top Badge & Date Header */}
                                <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <span className="px-2.5 py-1 rounded-md bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] font-extrabold text-[10px] tracking-wider uppercase border border-[#B2EFC3]/60 dark:border-[#1A5C2F]">
                                        {event.tag}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md border border-slate-200/80 dark:border-slate-700">
                                        <Calendar className="w-3.5 h-3.5 text-[#1AC13B]" />
                                        <span>{event.date_display}</span>
                                    </div>
                                </div>

                                {/* Event Title */}
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors leading-snug">
                                    {event.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {event.description}
                                </p>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium pt-1">
                                    <MapPin className="w-3.5 h-3.5 text-[#1AC13B] shrink-0" />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                                <Button
                                    variant={index === 0 ? 'primary' : 'dark'}
                                    size="sm"
                                    onClick={() => onRegisterClick && onRegisterClick(event.title)}
                                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                                    className="dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700"
                                >
                                    {t.registerBtn}
                                </Button>

                                <a
                                    href="#events"
                                    className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors py-1.5"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>{t.brochureLink}</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
