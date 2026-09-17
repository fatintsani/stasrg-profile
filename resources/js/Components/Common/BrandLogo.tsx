import React from 'react';

interface BrandLogoProps {
    variant?: 'light' | 'dark';
    className?: string;
    showSubtitle?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
    variant = 'dark',
    className = '',
    showSubtitle = true,
    size = 'md',
}) => {
    const isDark = variant === 'dark';
    
    const iconHeights = {
        sm: 'h-7',
        md: 'h-9',
        lg: 'h-11',
    };

    const textSizes = {
        sm: 'text-xs sm:text-sm',
        md: 'text-sm sm:text-base',
        lg: 'text-lg sm:text-xl',
    };

    const subSizes = {
        sm: 'text-[7.5px]',
        md: 'text-[8.5px] sm:text-[9px]',
        lg: 'text-[10px] sm:text-[10.5px]',
    };

    const textColor = isDark ? 'text-slate-900 dark:text-white' : 'text-white';
    const subColor = isDark ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300';

    return (
        <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
            {/* Official STAS Logo Image - Pure image without container box */}
            <div className="relative flex items-center justify-center shrink-0">
                <img
                    src="/stas.png"
                    alt="STAS Research Group Logo"
                    className={`${iconHeights[size]} w-auto object-contain drop-shadow-none`}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/stas.png';
                    }}
                />
            </div>

            <div className="flex flex-col justify-center">
                <div className={`flex items-baseline gap-1 leading-tight ${textColor} ${textSizes[size]}`}>
                    <span className="font-extrabold tracking-tight">STAS</span>
                    <span className="font-normal tracking-tight opacity-90">
                        Research Group
                    </span>
                </div>
                {showSubtitle && (
                    <span className={`font-medium tracking-tight mt-0.5 leading-none ${subColor} ${subSizes[size]}`}>
                        Sustainable Technology and Applied Sciences
                    </span>
                )}
            </div>
        </div>
    );
};
