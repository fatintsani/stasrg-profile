import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
    borderAccent?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hoverable = true,
    borderAccent = false,
    padding = 'md',
    onClick,
}) => {
    const paddings = {
        none: 'p-0',
        sm: 'p-4 sm:p-5',
        md: 'p-6 sm:p-7',
        lg: 'p-7 sm:p-9',
    };

    return (
        <div
            className={`
                bg-white dark:bg-slate-900 
                rounded-xl 
                border 
                ${borderAccent ? 'border-[#B2EFC3] dark:border-[#10381C]' : 'border-slate-200/90 dark:border-slate-800'} 
                ${hoverable ? 'transition-all duration-200 hover:border-[#1AC13B]/70 dark:hover:border-[#1AC13B]/60 hover:-translate-y-0.5' : ''} 
                ${paddings[padding]} 
                ${className}
            `}
        >
            {children}
        </div>
    );
};
