import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';
import { Button } from './Button';
import { PillBadge } from './PillBadge';
import { BrandLogo } from './BrandLogo';
import { TranslationDictionary } from '../../utils/translations';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    t: TranslationDictionary['auth'];
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, t }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 1500);
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
                    <div>
                        <BrandLogo size="sm" className="mb-2" />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                            {t.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {t.subtitle}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content */}
                {success ? (
                    <div className="p-8 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#1AC13B] flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Authenticated</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Redirecting to CoE STAS-RG Workspace...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="p-5 sm:p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                {t.emailLabel}
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@telkomuniversity.ac.id"
                                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                                    {t.passwordLabel}
                                </label>
                                <a href="#forgot" className="text-[11px] font-semibold text-[#107E27] dark:text-[#1AC13B] hover:underline">
                                    {t.forgotPass}
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-[#1AC13B]"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="w-3.5 h-3.5 text-[#1AC13B] rounded border-slate-300 focus:ring-0 cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                                {t.rememberMe}
                            </label>
                        </div>

                        <div className="space-y-2 pt-1">
                            <Button
                                variant="primary"
                                size="md"
                                type="submit"
                                disabled={loading}
                                className="w-full"
                                icon={<ArrowRight className="w-4 h-4" />}
                            >
                                {loading ? 'Signing in...' : t.signInBtn}
                            </Button>

                            <button
                                type="button"
                                onClick={() => {
                                    setLoading(true);
                                    setTimeout(() => {
                                        setLoading(false);
                                        setSuccess(true);
                                        setTimeout(onClose, 1200);
                                    }, 800);
                                }}
                                className="w-full py-2.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                                <div className="w-4 h-4 rounded-full bg-[#EDFBF1] text-[#107E27] font-bold text-[9px] flex items-center justify-center">
                                    T
                                </div>
                                <span>{t.ssoBtn}</span>
                            </button>
                        </div>

                        <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                            <span>{t.noAccount} </span>
                            <a href="#contact" onClick={onClose} className="font-bold text-[#107E27] dark:text-[#1AC13B] hover:underline">
                                {t.requestAccess}
                            </a>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
