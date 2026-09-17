import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, CheckCircle2, Info, X, ShieldAlert, LucideIcon } from 'lucide-react';

export type AlertType = 'danger' | 'warning' | 'success' | 'info';

export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    message?: React.ReactNode;
    description?: React.ReactNode;
    type?: AlertType;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    isLoading?: boolean;
    customIcon?: LucideIcon;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    description,
    type = 'danger',
    confirmText,
    cancelText,
    showCancel = true,
    isLoading = false,
    customIcon,
}) => {
    // Handle ESC key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !isLoading) {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isLoading, onClose]);

    // Icon & color styling according to alert type
    const getBadgeConfig = () => {
        if (customIcon) {
            const Custom = customIcon;
            return {
                icon: <Custom className="w-5 h-5" />,
                badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
                btnClass: 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900',
            };
        }

        switch (type) {
            case 'danger':
                return {
                    icon: <Trash2 className="w-5 h-5" />,
                    badgeClass: 'bg-red-50 dark:bg-red-950/50 text-red-500 dark:text-red-400 border-red-100 dark:border-red-900/40',
                    btnClass: 'bg-[#E50914] hover:bg-[#c90812] text-white',
                };
            case 'warning':
                return {
                    icon: <AlertTriangle className="w-5 h-5" />,
                    badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-500 dark:text-amber-400 border-amber-100 dark:border-amber-900/40',
                    btnClass: 'bg-amber-500 hover:bg-amber-600 text-white',
                };
            case 'success':
                return {
                    icon: <CheckCircle2 className="w-5 h-5" />,
                    badgeClass: 'bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] border-[#B2EFC3] dark:border-[#1A5C2F]',
                    btnClass: 'bg-[#1AC13B] hover:bg-[#16a331] text-white',
                };
            case 'info':
            default:
                return {
                    icon: <Info className="w-5 h-5" />,
                    badgeClass: 'bg-blue-50 dark:bg-blue-950/50 text-blue-500 dark:text-blue-400 border-blue-100 dark:border-blue-900/40',
                    btnClass: 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900',
                };
        }
    };

    const config = getBadgeConfig();
    const defaultConfirmText = type === 'danger' ? 'Ya, Hapus' : 'OK';
    const defaultCancelText = 'Batal';

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        } else {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => !isLoading && onClose()}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 10 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl z-10"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="alert-modal-title"
                        aria-describedby="alert-modal-description"
                    >
                        {/* Top Icon Badge */}
                        <div
                            className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 ${config.badgeClass}`}
                        >
                            {config.icon}
                        </div>

                        {/* Title & Description */}
                        <div className="mt-4 space-y-1.5">
                            <h4
                                id="alert-modal-title"
                                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight"
                            >
                                {title}
                            </h4>
                            <div
                                id="alert-modal-description"
                                className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal"
                            >
                                {typeof (message || description) === 'string' ? <p>{message || description}</p> : (message || description)}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex items-center justify-end gap-2.5">
                            {showCancel && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="px-5 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    {cancelText || defaultCancelText}
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={isLoading}
                                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border-0 shadow-xs disabled:opacity-50 ${config.btnClass}`}
                            >
                                {isLoading ? 'Memproses...' : confirmText || defaultConfirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AlertModal;
