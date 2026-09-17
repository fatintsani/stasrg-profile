import React, { useState } from 'react';
import { X, CheckCircle2, Send, Building2, User, Mail } from 'lucide-react';
import { Button } from './Button';
import { PillBadge } from './PillBadge';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    prefilledSubject?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
    isOpen,
    onClose,
    prefilledSubject = '',
}) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        interest: prefilledSubject || 'Custom Industrial R&D',
        message: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 2200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <PillBadge variant="green" showDot className="mb-1.5">
                            PARTNERSHIP INQUIRY
                        </PillBadge>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Partner With CoE STAS-RG
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body Form */}
                {submitted ? (
                    <div className="p-8 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">Inquiry Received!</h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                            Our research liaison will review your proposal and get in touch within 24 hours.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#1AC13B] bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Work Email</label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter your work email address"
                                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#1AC13B] bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Company / Institution</label>
                            <div className="relative">
                                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    required
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    placeholder="Enter your company or institution name"
                                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#1AC13B] bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Collaboration Interest</label>
                            <select
                                value={formData.interest}
                                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#1AC13B] bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                                <option>Custom Industrial R&D</option>
                                <option>Supply Chain Advisory</option>
                                <option>Lab Testing & Validation</option>
                                <option>ESG & Carbon Audits</option>
                                <option>Executive Training</option>
                                <option>Symposium Registration</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Project Scope / Message</label>
                            <textarea
                                rows={3}
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Briefly describe your objectives, scope, or research interest..."
                                className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#1AC13B] bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                            />
                        </div>

                        <div className="pt-2">
                            <Button
                                variant="primary"
                                size="md"
                                type="submit"
                                className="w-full"
                                icon={<Send className="w-3.5 h-3.5" />}
                            >
                                Submit Inquiry
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
