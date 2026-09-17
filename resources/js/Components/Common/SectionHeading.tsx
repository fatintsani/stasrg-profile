import React from 'react';

interface SectionHeadingProps {
    pillText?: string;
    title: string | React.ReactNode;
    subtitle?: string | React.ReactNode;
    align?: 'left' | 'center' | 'between';
    actionLink?: {
        text: string;
        href: string;
    };
    className?: string;
    light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
    pillText,
    title,
    subtitle,
    align = 'left',
    actionLink,
    className = '',
    light = false,
}) => {
    const isBetween = align === 'between' && actionLink;
    const isCenter = align === 'center';

    return (
        <div className={`mb-8 md:mb-12 ${className}`}>
            <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${isBetween ? 'md:flex-row md:items-end md:justify-between' : ''} gap-4`}>
                <div className={`max-w-3xl ${isCenter ? 'mx-auto' : ''}`}>
                    {pillText && (
                        <div className="mb-2.5">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#107E27] dark:text-[#1AC13B] tracking-wider uppercase select-none">
                                {pillText}
                            </span>
                        </div>
                    )}
                    <h2
                        className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
                            light ? 'text-white' : 'text-slate-900 dark:text-white'
                        }`}
                    >
                        {title}
                    </h2>
                    {subtitle && (
                        <p
                            className={`mt-2.5 text-sm sm:text-base leading-relaxed ${
                                light ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                            }`}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {actionLink && (
                    <div className="shrink-0 pt-2 md:pt-0">
                        <a
                            href={actionLink.href}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#107E27] dark:text-[#1AC13B] hover:text-[#12A02E] dark:hover:text-[#42D276] group transition-colors"
                        >
                            <span>{actionLink.text}</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
