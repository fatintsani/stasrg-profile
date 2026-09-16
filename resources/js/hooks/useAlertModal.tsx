import React, { useState, useCallback } from 'react';
import { AlertModal, AlertType } from '@/Components/Common/AlertModal';
import { LucideIcon } from 'lucide-react';

export interface AlertOptions {
    title: string;
    message: React.ReactNode;
    type?: AlertType;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    onConfirm?: () => void | Promise<void>;
    customIcon?: LucideIcon;
}

export function useAlertModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<AlertOptions>({
        title: '',
        message: '',
        type: 'info',
        showCancel: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const showAlert = useCallback((opts: Omit<AlertOptions, 'showCancel'>) => {
        setOptions({
            ...opts,
            type: opts.type || 'info',
            showCancel: false,
            confirmText: opts.confirmText || 'OK',
        });
        setIsOpen(true);
    }, []);

    const showConfirm = useCallback((opts: AlertOptions) => {
        setOptions({
            ...opts,
            type: opts.type || 'danger',
            showCancel: opts.showCancel ?? true,
            confirmText: opts.confirmText || (opts.type === 'danger' ? 'Ya, Hapus' : 'Lanjutkan'),
            cancelText: opts.cancelText || 'Batal',
        });
        setIsOpen(true);
    }, []);

    const closeAlert = useCallback(() => {
        setIsOpen(false);
        setIsLoading(false);
    }, []);

    const handleConfirm = useCallback(async () => {
        if (options.onConfirm) {
            try {
                setIsLoading(true);
                await options.onConfirm();
            } finally {
                setIsLoading(false);
                setIsOpen(false);
            }
        } else {
            setIsOpen(false);
        }
    }, [options]);

    const AlertModalComponent = (
        <AlertModal
            isOpen={isOpen}
            onClose={closeAlert}
            onConfirm={handleConfirm}
            title={options.title}
            message={options.message}
            type={options.type}
            confirmText={options.confirmText}
            cancelText={options.cancelText}
            showCancel={options.showCancel}
            isLoading={isLoading}
            customIcon={options.customIcon}
        />
    );

    return {
        showAlert,
        showConfirm,
        closeAlert,
        AlertModalComponent,
        isOpen,
    };
}

export default useAlertModal;
