import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline-green' | 'ghost' | 'dark' | 'white';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    className?: string;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    href,
    icon,
    iconPosition = 'right',
    className = '',
    children,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg';

    const variants = {
        primary: 'bg-[#1AC13B] text-white hover:bg-[#12A02E] active:bg-[#107E27] border border-[#1AC13B]',
        secondary: 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100',
        'outline-green': 'bg-white text-[#107E27] border border-[#1AC13B] hover:bg-[#EDFBF1] active:bg-[#D8F7E0]',
        ghost: 'bg-transparent text-slate-700 hover:text-[#107E27] hover:bg-slate-100/60 border border-transparent',
        dark: 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 border border-slate-900',
        white: 'bg-white text-slate-900 hover:bg-slate-100 border border-white',
    };

    const sizes = {
        sm: 'text-xs px-3.5 py-2 gap-1.5',
        md: 'text-sm px-5 py-2.5 gap-2',
        lg: 'text-base px-6 py-3.5 gap-2.5',
    };

    const content = (
        <>
            {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{icon}</span>}
        </>
    );

    const fullClassName = `group ${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <a href={href} className={fullClassName}>
                {content}
            </a>
        );
    }

    return (
        <button className={fullClassName} {...props}>
            {content}
        </button>
    );
};
