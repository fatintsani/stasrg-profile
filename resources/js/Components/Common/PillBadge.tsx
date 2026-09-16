import React from 'react';

interface PillBadgeProps {
    children: React.ReactNode;
    variant?: 'green' | 'gray' | 'dark' | 'outline';
    showDot?: boolean;
    className?: string;
    size?: 'sm' | 'md';
}

export const PillBadge: React.FC<PillBadgeProps> = ({
    children,
    variant = 'green',
    showDot = false,
    className = '',
    size = 'sm',
}) => {
    const variantStyles = {
        green: 'bg-[#EDFBF1] dark:bg-[#0E2C17] text-[#107E27] dark:text-[#3FD27B] border border-[#B2EFC3]/70 dark:border-[#1A5C2F]',
        gray: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
        dark: 'bg-slate-900 dark:bg-black text-slate-200 border border-slate-800',
        outline: 'bg-transparent text-[#107E27] dark:text-[#3FD27B] border border-[#1AC13B]/50',
    };

    const sizeStyles = {
        sm: 'text-[11px] py-1 px-3 gap-1.5',
        md: 'text-xs py-1.5 px-4 gap-2',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full font-bold tracking-wider uppercase transition-colors select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {showDot && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#1AC13B] shrink-0 animate-pulse" />
            )}
            {children}
        </span>
    );
};
