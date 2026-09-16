import React from 'react';
import { Language } from '../../utils/translations';

interface FlagIconProps {
    language: Language;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const FlagIcon: React.FC<FlagIconProps> = ({
    language,
    className = '',
    size = 'md',
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    if (language === 'ID') {
        return (
            <span
                className={`inline-flex items-center justify-center rounded-full overflow-hidden shadow-none ring-1 ring-slate-200/80 dark:ring-slate-700/80 shrink-0 ${sizeClasses[size]} ${className}`}
                title="Bahasa Indonesia"
            >
                <svg viewBox="0 0 512 512" className="w-full h-full object-cover">
                    <rect width="512" height="256" fill="#E70011" />
                    <rect y="256" width="512" height="256" fill="#FFFFFF" />
                </svg>
            </span>
        );
    }

    // Default to UK flag for EN
    return (
        <span
            className={`inline-flex items-center justify-center rounded-full overflow-hidden shadow-none ring-1 ring-slate-200/80 dark:ring-slate-700/80 shrink-0 ${sizeClasses[size]} ${className}`}
            title="English"
        >
            <svg viewBox="0 0 512 512" className="w-full h-full object-cover">
                <rect width="512" height="512" fill="#012169" />
                <path d="M0 0l512 512m0-512L0 512" stroke="#FFFFFF" strokeWidth="60" />
                <path d="M0 0l512 512m0-512L0 512" stroke="#C8102E" strokeWidth="36" />
                <path d="M256 0v512M0 256h512" stroke="#FFFFFF" strokeWidth="100" />
                <path d="M256 0v512M0 256h512" stroke="#C8102E" strokeWidth="60" />
            </svg>
        </span>
    );
};
