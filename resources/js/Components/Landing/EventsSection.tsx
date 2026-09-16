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
    CheckCircle2,
} from 'lucide-react';
import { TranslationDictionary, Language } from '../../utils/translations';

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
                        href: '#events',
                    }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {events.map((event, index) => {
                        const title = isEn ? (event.title || event.title_id) : (event.title_id || event.title);
                        const description = isEn ? (event.description || event.description_id) : (event.description_id || event.description);

                        return (
                            <motion.div
                                key={event.id || index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#1AC13B]/70 dark:hover:border-[#1AC13B]/60 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl overflow-hidden"
                            >
                                <div>
                                    {/* Event Poster / Cover Image */}
                                    {event.image_url && (
                                        <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            <img
                                                src={event.image_url}
                                                alt={title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/assets/images/research/digital_twin.png';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                                            {/* Tag & Featured Badges */}
                                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase backdrop-blur-md shadow-md">
                                                    {event.tag}
                                                </span>
                                                {event.is_featured && (
                                                    <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 shadow-md backdrop-blur-md">
                                                        <Star className="w-3 h-3 fill-slate-950" />
                                                        {isEn ? 'Featured' : 'Unggulan'}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Schedule Overlay */}
                                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                                                <div className="flex items-center gap-1.5 font-bold tracking-wide text-emerald-300 bg-slate-950/70 px-2.5 py-1 rounded-lg backdrop-blur-md border border-emerald-500/30">
                                                    <Calendar className="w-3.5 h-3.5 text-[#1AC13B]" />
                                                    <span>{event.date_display}</span>
                                                </div>
                                                {event.time_display && (
                                                    <div className="flex items-center gap-1 text-slate-200 bg-slate-950/70 px-2 py-1 rounded-lg backdrop-blur-md text-[11px]">
                                                        <Clock className="w-3 h-3 text-slate-400" />
                                                        <span>{event.time_display}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Main Card Content */}
                                    <div className="p-6 sm:p-7 space-y-4">
                                        {!event.image_url && (
                                            <div className="flex items-center justify-between gap-3 flex-wrap">
                                                <span className="px-2.5 py-1 rounded-md bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] font-extrabold text-[10px] tracking-wider uppercase border border-[#B2EFC3]/60 dark:border-[#1A5C2F]">
                                                    {event.tag}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md border border-slate-200/80 dark:border-slate-700">
                                                    <Calendar className="w-3.5 h-3.5 text-[#1AC13B]" />
                                                    <span>{event.date_display}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Keynote Speaker Pill */}
                                        {event.speaker_name && (
                                            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
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
                                            className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#107E27] dark:group-hover:text-[#1AC13B] transition-colors leading-snug cursor-pointer"
                                        >
                                            {title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                                            {description}
                                        </p>

                                        {/* Location & Quota */}
                                        <div className="space-y-1.5 pt-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                                                <MapPin className="w-3.5 h-3.5 text-[#1AC13B] shrink-0" />
                                                <span className="line-clamp-1">{event.location}</span>
                                            </div>

                                            {event.quota_text && (
                                                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                                    <Ticket className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                    <span>{event.quota_text}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons Footer */}
                                <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4">
                                    <Button
                                        variant={index === 0 ? 'primary' : 'dark'}
                                        size="sm"
                                        onClick={() => {
                                            if (event.registration_link && event.registration_link.startsWith('http')) {
                                                window.open(event.registration_link, '_blank');
                                            } else if (onRegisterClick) {
                                                onRegisterClick(title || 'Symposium Event');
                                            }
                                        }}
                                        icon={<ArrowRight className="w-3.5 h-3.5" />}
                                        className="dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 font-bold"
                                    >
                                        {event.primary_action_text || t.registerBtn}
                                    </Button>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setSelectedEvent(event)}
                                            className="text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                                        >
                                            {isEn ? 'View Details' : 'Rincian Acara'}
                                        </button>

                                        {event.brochure_url && (
                                            <a
                                                href={event.brochure_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors py-1.5"
                                            >
                                                <Download className="w-3.5 h-3.5" />
                                                <span>{event.secondary_action_text || t.brochureLink}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Event Detail & Registration Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden my-8"
                        >
                            {/* Modal Poster */}
                            <div className="relative aspect-[16/8] w-full bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={selectedEvent.image_url || '/assets/images/research/digital_twin.png'}
                                    alt={selectedEvent.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                                
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950 transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider">
                                        {selectedEvent.tag}
                                    </span>
                                    <h3 className="text-xl font-bold leading-tight mt-2">
                                        {isEn ? (selectedEvent.title || selectedEvent.title_id) : (selectedEvent.title_id || selectedEvent.title)}
                                    </h3>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-5">
                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                                    <div>
                                        <span className="text-slate-400 font-semibold uppercase text-[10px] block">{isEn ? 'Date & Schedule' : 'Tanggal & Waktu'}</span>
                                        <span className="font-bold text-slate-900 dark:text-white">
                                            {selectedEvent.date_display} {selectedEvent.time_display ? `(${selectedEvent.time_display})` : ''}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 font-semibold uppercase text-[10px] block">{isEn ? 'Venue & Platform' : 'Lokasi & Ruang'}</span>
                                        <span className="font-bold text-slate-900 dark:text-white truncate block">
                                            {selectedEvent.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Speaker Info */}
                                {selectedEvent.speaker_name && (
                                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
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

                                {/* Full Description */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        {isEn ? 'Event Synopsis & Objectives' : 'Sinopsis & Tujuan Acara'}
                                    </h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                        {isEn ? (selectedEvent.description || selectedEvent.description_id) : (selectedEvent.description_id || selectedEvent.description)}
                                    </p>
                                </div>

                                {/* Quota Info */}
                                {selectedEvent.quota_text && (
                                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                        <Ticket className="w-4 h-4" />
                                        <span>{selectedEvent.quota_text}</span>
                                    </div>
                                )}

                                {/* Footer Action Links */}
                                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                                    {selectedEvent.brochure_url ? (
                                        <a
                                            href={selectedEvent.brochure_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                        >
                                            <Download className="w-4 h-4" />
                                            {selectedEvent.secondary_action_text || t.brochureLink}
                                        </a>
                                    ) : <div />}

                                    <Button
                                        variant="primary"
                                        size="md"
                                        onClick={() => {
                                            const title = isEn ? (selectedEvent.title || selectedEvent.title_id) : (selectedEvent.title_id || selectedEvent.title);
                                            setSelectedEvent(null);
                                            if (selectedEvent.registration_link && selectedEvent.registration_link.startsWith('http')) {
                                                window.open(selectedEvent.registration_link, '_blank');
                                            } else if (onRegisterClick) {
                                                onRegisterClick(title || 'Symposium Event');
                                            }
                                        }}
                                        icon={<ArrowRight className="w-4 h-4" />}
                                        className="font-bold"
                                    >
                                        {selectedEvent.primary_action_text || t.registerBtn}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

