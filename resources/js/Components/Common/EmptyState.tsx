import React from 'react';

interface EmptyStateProps {
    title?: string;
    description?: string;
    imageSrc?: string;
    className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'Tidak ada data ditemukan',
    description,
    imageSrc = '/assets/icon/errors/notfound.png',
    className = '',
}) => {
    return (
        <div
            className={`w-full py-10 px-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center my-4 ${className}`}
        >
            <div className="mb-4">
                <img
                    src={imageSrc}
                    alt="Tidak ada data"
                    className="w-28 sm:w-36 h-auto object-contain mx-auto select-none pointer-events-none drop-shadow-xs"
                    onError={(e) => {
                        // Fallback if image path has alternate location
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('/icon/errors/notfound.png')) {
                            target.src = '/assets/icon/errors/notfound.png';
                        }
                    }}
                />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                {title}
            </h4>
            {description && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};

