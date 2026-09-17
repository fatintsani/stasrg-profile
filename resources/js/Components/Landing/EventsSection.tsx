import React, { useState } from 'react';
import { SectionHeading } from '../Common/SectionHeading';
import { Button } from '../Common/Button';
import { UpcomingEvent } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Download,
    ArrowRight,
    Clock,
    UserCheck,
    Star,
    Ticket,
    X,
    ExternalLink,
    Sparkles,
} from 'lucide-react';
import { TranslationDictionary, Language } from '../../utils/translations';
import { EmptyState } from '../Common/EmptyState';

interface EventsSectionProps {
    events: UpcomingEvent[];
    t: TranslationDictionary['events'];
    language?: Language;
    onRegisterClick?: (eventTitle: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
    events,
    t,
    language = 'EN',
    onRegisterClick,
}) => {
    const isEn = language === 'EN';
    const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);
    const activeEvents = (events || []).filter((e) => e.is_active !== false);

    return (
        <section id="events" className="py-20 md:py-28 bg-[#FBFDFB] dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 transition-colors relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeading
                    pillText={t.pill}
                    title={t.title}
                    subtitle={t.subtitle}
                    align="between"
                    actionLink={{
                        text: t.calendarLink,
                        href: '/events',
                    }}
                />

                {activeEvents.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {activeEvents.map((event, index) => {
                            const title = isEn ? (event.title || event.title_id) : (event.title_id || event.title);
                            const description = isEn ? (event.description || event.description_id) : (event.description_id || event.description);

                            return (
                                <motion.div
                                    key={event.id || index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B]/70 dark:hover:border-[#1AC13B]/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-xs hover:shadow-lg"
                                >
                                    <div>
                                        {/* Event Poster / Cover Image */}
                                        <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            {event.image_url ? (
                                                <img
                                                    src={event.image_url}
                                                    alt={title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/assets/images/research/digital_twin.png';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                                                    <Calendar className="w-12 h-12" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                                            {/* Tag & Featured Badges */}
                                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                                <span className="px-2.5 py-1 rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs text-[#107E27] dark:text-[#3FD27B] font-extrabold text-[10px] tracking-wider uppercase border border-[#B2EFC3]/80 dark:border-[#1A5C2F] shadow-xs">
                                                    {event.tag}
                                                </span>
                                                {event.is_featured && (
                                                    <div className="px-2 py-0.5 rounded-md bg-amber-500/95 backdrop-blur-xs text-white text-[10px] font-black flex items-center gap-1 shadow-xs">
                                                        <Sparkles className="w-3 h-3" />
                                                        <span>FEATURED</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Schedule Overlay */}
                                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                                                <div className="flex items-center gap-1.5 font-bold tracking-wide text-white bg-slate-950/80 px-2.5 py-1 rounded-lg backdrop-blur-xs border border-white/10 text-xs">
                                                    <Calendar className="w-3.5 h-3.5 text-[#1AC13B]" />
                                                    <span>{event.date_display}</span>
                                                </div>
                                                {event.time_display && (
                                                    <div className="flex items-center gap-1 text-slate-200 bg-slate-950/80 px-2 py-1 rounded-lg backdrop-blur-xs text-[11px] border border-white/10">
                                                        <Clock className="w-3 h-3 text-slate-300" />
                                                        <span>{event.time_display}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Main Card Content */}
                                        <div className="p-6 space-y-4">
                                            {/* Keynote Speaker Card */}
                                            {event.speaker_name && (
                                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                                                    <div className="w-8 h-8 rounded-lg bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center shrink-0">
                                                        <UserCheck className="w-4 h-4" />
                                                    </div>
                                                    <div className="truncate text-xs">
                                                        <div className="font-bold text-slate-900 dark:text-white truncate">
                                                            {event.speaker_name}
                                                        </div>
                                                        {event.speaker_title && (
                                                            <div className="text-slate-500 dark:text-slate-400 truncate text-[11px]">
                                                                {event.speaker_title}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Event Title */}
                                            <h3
                                                onClick={() => setSelectedEvent(event)}
                                                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors leading-snug cursor-pointer line-clamp-2"
                                            >
                                                {title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                                {description}
                                            </p>

                                            {/* Location & Quota */}
                                            <div className="space-y-1.5 pt-1 text-xs">
                                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                                                    <MapPin className="w-3.5 h-3.5 text-[#1AC13B] shrink-0" />
                                                    <span className="line-clamp-1">{event.location}</span>
                                                </div>

                                                {event.quota_text && (
                                                    <div className="flex items-center gap-2 font-semibold text-[#107E27] dark:text-[#3FD27B]">
                                                        <Ticket className="w-3.5 h-3.5 text-[#1AC13B] shrink-0" />
                                                        <span>{event.quota_text}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons Footer */}
                                    <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 mt-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (event.registration_link && event.registration_link.startsWith('http')) {
                                                    window.open(event.registration_link, '_blank');
                                                } else if (onRegisterClick) {
                                                    onRegisterClick(title || 'Symposium Event');
                                                }
                                            }}
                                            className="px-4 py-2 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer border-0"
                                        >
                                            <span>{event.primary_action_text || t.registerBtn}</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>

                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedEvent(event)}
                                                className="text-xs font-bold text-[#107E27] dark:text-[#1AC13B] hover:text-[#12A02E] transition-colors cursor-pointer border-0 bg-transparent"
                                            >
                                                {isEn ? 'View Details' : 'Rincian Acara'}
                                            </button>

                                            {event.brochure_url && (
                                                <a
                                                    href={event.brochure_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                                >
                                                    <Download className="w-3.5 h-3.5 text-[#1AC13B]" />
                                                    <span>{event.secondary_action_text || t.brochureLink}</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <EmptyState
                        title={isEn ? 'No upcoming events found' : 'Tidak ada agenda acara ditemukan'}
                        description={isEn ? 'Academic symposia and event schedules are not available in the database.' : 'Agenda simposium dan masterclass riset belum tersedia di database.'}
                    />
                )}
            </div>

            {/* Event Detail & Registration Modal */}
            <AnimatePresence>
                {selectedEvent && (
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
                                {selectedEvent.image_url ? (
                                    <img
                                        src={selectedEvent.image_url}
                                        alt={selectedEvent.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Calendar className="w-16 h-16" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
                                
                                <button
                                    type="button"
                                    onClick={() => setSelectedEvent(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer border-0"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                                    <span className="px-2.5 py-1 rounded-md bg-[#1AC13B] text-white text-[10px] font-black uppercase tracking-wider">
                                        {selectedEvent.tag}
                                    </span>
                                    <h2 className="text-lg sm:text-xl font-black text-white mt-1.5 leading-snug line-clamp-2">
                                        {isEn ? (selectedEvent.title || selectedEvent.title_id) : (selectedEvent.title_id || selectedEvent.title)}
                                    </h2>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-5">
                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
                                    <div>
                                        <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">
                                            {isEn ? 'Date & Schedule' : 'Tanggal & Waktu'}
                                        </span>
                                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            {selectedEvent.date_display} {selectedEvent.time_display ? `(${selectedEvent.time_display})` : ''}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">
                                            {isEn ? 'Venue & Platform' : 'Lokasi & Platform'}
                                        </span>
                                        <span className="font-bold text-slate-900 dark:text-white truncate block">
                                            {selectedEvent.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Speaker Highlight */}
                                {selectedEvent.speaker_name && (
                                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#EDFBF1] dark:bg-[#10381C]/50 border border-[#B2EFC3] dark:border-[#1A5C2F]">
                                        <div className="w-10 h-10 rounded-xl bg-[#1AC13B] text-white flex items-center justify-center font-bold shrink-0">
                                            <UserCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-900 dark:text-white">
                                                {selectedEvent.speaker_name}
                                            </div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400">
                                                {selectedEvent.speaker_title}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Summary Box */}
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        {isEn ? 'Event Synopsis & Objectives' : 'Sinopsis & Tujuan Acara'}
                                    </h4>
                                    <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                        {isEn ? (selectedEvent.description || selectedEvent.description_id) : (selectedEvent.description_id || selectedEvent.description)}
                                    </p>
                                </div>

                                {/* Quota Pill */}
                                {selectedEvent.quota_text && (
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#107E27] dark:text-[#3FD27B]">
                                        <Ticket className="w-4 h-4 text-[#1AC13B]" />
                                        <span>{selectedEvent.quota_text}</span>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {selectedEvent.brochure_url && (
                                        <a
                                            href={selectedEvent.brochure_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5 text-[#1AC13B]" />
                                            <span>{selectedEvent.secondary_action_text || t.brochureLink}</span>
                                        </a>
                                    )}
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedEvent(null)}
                                        className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer border-0"
                                    >
                                        {isEn ? 'Close' : 'Tutup'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const title = isEn ? (selectedEvent.title || selectedEvent.title_id) : (selectedEvent.title_id || selectedEvent.title);
                                            setSelectedEvent(null);
                                            if (selectedEvent.registration_link && selectedEvent.registration_link.startsWith('http')) {
                                                window.open(selectedEvent.registration_link, '_blank');
                                            } else if (onRegisterClick) {
                                                onRegisterClick(title || 'Symposium Event');
                                            }
                                        }}
                                        className="px-4 py-1.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer border-0 shadow-xs"
                                    >
                                        <span>{selectedEvent.primary_action_text || t.registerBtn}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};


