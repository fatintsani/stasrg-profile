import React from 'react';
import { PillBadge } from '../Common/PillBadge';
import { Button } from '../Common/Button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TranslationDictionary } from '../../utils/translations';

interface HeroSectionProps {
    t: TranslationDictionary['hero'];
    onExploreClick?: () => void;
    onPartnerClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    t,
    onExploreClick,
    onPartnerClick,
}) => {
    return (
        <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden transition-colors">
            {/* Official Hero Background Image (hero_bg.jpeg) with subtle opacity & upward gradient fade */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                    src="/assets/images/hero_bg.jpeg"
                    alt="CoE STAS-RG Hero Background"
                    className="w-full h-full object-cover object-center opacity-15 dark:opacity-10 scale-105 transition-opacity duration-300"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/hero_bg.jpeg';
                    }}
                />
                
                {/* Top-to-center ambient tint */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F2FAF4]/90 via-[#F8FCF9]/80 to-transparent dark:from-slate-950/95 dark:via-slate-950/85 dark:to-transparent transition-colors" />

                {/* Bottom Upward Gradient (Gradasi Halus dari Bawah ke Atas) */}
                <div className="absolute bottom-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-t from-white via-white/85 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent transition-colors" />
            </div>

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none z-0"
                style={{
                    backgroundImage: `radial-gradient(#1AC13B 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Ambient emerald glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#1AC13B]/10 to-[#7FE39F]/10 dark:from-[#1AC13B]/15 dark:to-[#12A02E]/15 blur-[100px] rounded-full pointer-events-none z-0" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex justify-center mb-6"
                >
                    <PillBadge variant="green" showDot size="sm">
                        {t.pill}
                    </PillBadge>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]"
                >
                    {t.titlePart1}{' '}
                    <span className="text-[#1AC13B] inline-block relative">
                        {t.titleHighlight}
                    </span>
                    <br className="hidden sm:inline" /> {t.titlePart2}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    className="mt-6 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
                >
                    {t.subtitle}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
                >
                    <Button
                        variant="primary"
                        size="lg"
                        href="#projects"
                        onClick={onExploreClick}
                        icon={<ArrowRight className="w-4 h-4" />}
                    >
                        {t.exploreBtn}
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        href="#contact"
                        onClick={onPartnerClick}
                        className="dark:bg-slate-900 dark:text-white dark:border-slate-800 dark:hover:bg-slate-800"
                    >
                        {t.partnerBtn}
                    </Button>
                </motion.div>

                {/* Institutional Accreditation Pill */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    className="mt-12 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 select-none shadow-none"
                >
                    <img
                        src="/assets/images/telu_noname.png"
                        alt="Telkom University"
                        className="w-4 h-4 object-contain shrink-0"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/images/telu.png';
                        }}
                    />
                    <span className="font-bold text-slate-900 dark:text-white">{t.accreditationUniv}</span>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <span className="text-slate-600 dark:text-slate-400">{t.accreditationFaculty}</span>
                </motion.div>
            </div>
        </section>
    );
};
