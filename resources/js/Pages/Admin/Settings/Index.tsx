import React, { useState, useEffect } from "react";
import { Head, useForm, router, Link } from "@inertiajs/react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { Language } from "../../../utils/translations";
import { AlertModal } from "../../../Components/Common/AlertModal";
import {
    SlidersHorizontal,
    Building2,
    GraduationCap,
    MapPin,
    Share2,
    Search,
    Shield,
    Save,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Info,
    ExternalLink,
    Mail,
    Phone,
    Globe2,
    Server,
    Database,
    Zap,
    Sparkles,
    Trash2,
    Quote,
    Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsIndexProps {
    settings: Record<string, string>;
    systemInfo: {
        php_version: string;
        laravel_version: string;
        server_software: string;
        app_environment: string;
        app_debug: string;
        database_driver: string;
        timezone: string;
    };
    siteConfig?: {
        center_name?: string;
        institution?: string;
    };
}

export default function SettingsIndex({
    settings,
    systemInfo,
    siteConfig,
}: SettingsIndexProps) {
    const [language, setLanguage] = useState<Language>("ID");
    const [activeTab, setActiveTab] = useState<
        "general" | "director" | "contact" | "social" | "seo" | "system"
    >("general");
    const [isClearCacheOpen, setIsClearCacheOpen] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem("stas_lang") as Language;
        if (savedLang === "EN" || savedLang === "ID") {
            setLanguage(savedLang);
        }
    }, []);

    const isEn = language === "EN";

    const form = useForm({
        // 1. General Profile
        center_name: settings.center_name || "CoE STAS-RG",
        tagline: settings.tagline || "",
        tagline_id: settings.tagline_id || "",
        institution: settings.institution || "Telkom University",
        sub_institution: settings.sub_institution || "Center of Excellence",
        logo_url: settings.logo_url || "/assets/images/logo_stas.png",
        about_brief: settings.about_brief || "",
        about_brief_id: settings.about_brief_id || "",

        // 2. Director & Leadership
        director_name: settings.director_name || "",
        director_title: settings.director_title || "",
        director_title_id: settings.director_title_id || "",
        director_quote: settings.director_quote || "",
        director_quote_id: settings.director_quote_id || "",
        director_photo_url: settings.director_photo_url || "",

        // 3. Contact & Location
        contact_email: settings.contact_email || "",
        contact_phone: settings.contact_phone || "",
        whatsapp_contact: settings.whatsapp_contact || "",
        address: settings.address || "",
        operating_hours: settings.operating_hours || "",
        maps_embed_url: settings.maps_embed_url || "",

        // 4. Social & External Links
        social_linkedin: settings.social_linkedin || "",
        social_github: settings.social_github || "",
        social_youtube: settings.social_youtube || "",
        social_twitter: settings.social_twitter || "",
        university_url: settings.university_url || "",
        scholar_group_url: settings.scholar_group_url || "",

        // 5. SEO & Meta
        meta_title: settings.meta_title || "",
        meta_description: settings.meta_description || "",
        meta_keywords: settings.meta_keywords || "",

        // 6. Security & Preferences
        allow_registration:
            settings.allow_registration === "1" ||
            settings.allow_registration === "true",
        maintenance_mode:
            settings.maintenance_mode === "1" ||
            settings.maintenance_mode === "true",
        enable_public_events:
            settings.enable_public_events === "1" ||
            settings.enable_public_events === "true",
        default_language: settings.default_language || "ID",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post("/admin/settings", {
            preserveScroll: true,
        });
    };

    const handleClearCache = () => {
        setIsClearing(true);
        router.post(
            "/admin/settings/clear-cache",
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsClearing(false);
                    setIsClearCacheOpen(false);
                },
            },
        );
    };

    const TABS = [
        {
            id: "general",
            labelEn: "Center Profile",
            labelId: "Profil Pusat Riset",
            icon: Building2,
            descId: "Identitas utama, nama lembaga, dan slogan resmi",
        },
        {
            id: "director",
            labelEn: "Director & Leadership",
            labelId: "Pimpinan & Sambutan",
            icon: GraduationCap,
            descId: "Profil Direktur, kutipan visi, dan sambutan resmi",
        },
        {
            id: "contact",
            labelEn: "Contact & Location",
            labelId: "Kontak & Alamat Lab",
            icon: MapPin,
            descId: "Email resmi, telepon, dan alamat laboratorium",
        },
        {
            id: "social",
            labelEn: "Social & Academic Links",
            labelId: "Jejaring & Tautan",
            icon: Share2,
            descId: "LinkedIn, GitHub, YouTube, dan Google Scholar",
        },
        {
            id: "seo",
            labelEn: "SEO & Metadata",
            labelId: "SEO & Mesin Pencari",
            icon: Search,
            descId: "Judul meta, deskripsi pencarian Google, dan kata kunci",
        },
        {
            id: "system",
            labelEn: "System & Maintenance",
            labelId: "Sistem & Pemeliharaan",
            icon: Shield,
            descId: "Registrasi, status server, dan pembersihan cache",
        },
    ];

    return (
        <AdminLayout
            title={
                isEn
                    ? "System Settings & Profile"
                    : "Pengaturan Sistem & Profil"
            }
            siteConfig={siteConfig}
        >
            <Head
                title={
                    isEn
                        ? "System Settings - Admin STAS"
                        : "Pengaturan Sistem - Admin STAS"
                }
            />

            <div className="space-y-6">
                {/* 1. Header Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#EDFBF1] dark:bg-[#10381C] text-[#107E27] dark:text-[#3FD27B] text-xs font-bold border border-[#B2EFC3] dark:border-[#1A5C2F]">
                            <SlidersHorizontal className="w-3.5 h-3.5 text-[#1AC13B]" />
                            <span>Konfigurasi & Profil</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Pengaturan Sistem & Profil Lembaga
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                            Kelola konfigurasi identitas pusat riset, sambutan
                            pimpinan, kontak resmi, tautan jejaring, metadata
                            SEO, dan pemeliharaan sistem.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 flex-wrap">
                        <button
                            onClick={() => setIsClearCacheOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors shadow-xs cursor-pointer"
                            title="Bersihkan cache config, route, dan view aplikasi"
                        >
                            <RefreshCw className="w-4 h-4 text-[#1AC13B]" />
                            <span>
                                {isEn ? "Clear Cache" : "Bersihkan Cache"}
                            </span>
                        </button>
                        <Link
                            href="/"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors shadow-xs"
                        >
                            <ExternalLink className="w-4 h-4 text-[#1AC13B]" />
                            <span>Lihat di Beranda</span>
                        </Link>
                        <button
                            onClick={handleSubmit}
                            disabled={form.processing}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1AC13B] hover:bg-[#12A02E] text-white text-xs font-bold transition-all shadow-sm cursor-pointer border-0 disabled:opacity-50"
                        >
                            {form.processing ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            <span>
                                {isEn ? "Save Settings" : "Simpan Pengaturan"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* 2. Main Tabbed Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Tabs Navigation Sidebar */}
                    <div className="lg:col-span-4 xl:col-span-3 space-y-2">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs space-y-1">
                            {TABS.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() =>
                                            setActiveTab(tab.id as any)
                                        }
                                        className={`w-full flex items-start gap-3 p-3 rounded-xl transition text-left cursor-pointer ${
                                            isActive
                                                ? "bg-[#1AC13B]/10 text-[#107E27] dark:text-[#1AC13B] font-bold border border-[#1AC13B]/30"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                        }`}
                                    >
                                        <div
                                            className={`p-2 rounded-lg shrink-0 ${
                                                isActive
                                                    ? "bg-[#1AC13B] text-white"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold leading-tight">
                                                {isEn
                                                    ? tab.labelEn
                                                    : tab.labelId}
                                            </div>
                                            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1 font-normal">
                                                {tab.descId}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Live Quick Preview Box */}
                        <div className="bg-gradient-to-br from-[#F9FDFB] to-slate-50 dark:from-slate-900 dark:to-slate-900/60 rounded-2xl border border-[#1AC13B]/20 p-4 shadow-xs">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#107E27] dark:text-[#1AC13B] mb-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                {isEn
                                    ? "Quick Brand Preview"
                                    : "Pratinjau Identitas STAS"}
                            </div>
                            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                                {form.data.center_name}
                            </div>
                            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                                {form.data.institution}
                            </div>
                            <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 italic">
                                "{form.data.tagline_id || form.data.tagline}"
                            </div>
                        </div>
                    </div>

                    {/* Tabs Content Panel */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6"
                        >
                            {/* TAB 1: General Profile */}
                            {activeTab === "general" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-5"
                                >
                                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <Building2 className="w-5 h-5 text-[#1AC13B]" />
                                            {isEn
                                                ? "Center of Excellence Profile"
                                                : "Profil & Identitas Lembaga Riset"}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Informasi utama identitas pusat
                                            riset dan nama universitas.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Nama Pusat Riset (Center Name) *
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.center_name}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "center_name",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan nama resmi pusat riset..."
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Nama Universitas / Institusi *
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.institution}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "institution",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan nama universitas / institusi induk..."
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Kategori Lembaga
                                                (Sub-Institution)
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    form.data.sub_institution
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        "sub_institution",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan kategori atau jenis lembaga..."
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                URL Logo Lembaga
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.logo_url}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "logo_url",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan URL atau path logo lembaga..."
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Slogan / Tagline Resmi (Bahasa
                                            Indonesia) *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.tagline_id}
                                            onChange={(e) =>
                                                form.setData(
                                                    "tagline_id",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Masukkan slogan atau tagline resmi pusat riset..."
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Official Tagline (English) *
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.tagline}
                                            onChange={(e) =>
                                                form.setData(
                                                    "tagline",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter official research center tagline in English..."
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Deskripsi Profil Singkat (Bahasa
                                            Indonesia)
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.data.about_brief_id}
                                            onChange={(e) =>
                                                form.setData(
                                                    "about_brief_id",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Masukkan ringkasan profil dan komitmen pusat riset..."
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Short Profile Brief (English)
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.data.about_brief}
                                            onChange={(e) =>
                                                form.setData(
                                                    "about_brief",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter short profile brief in English..."
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 2: Director & Leadership */}
                            {activeTab === "director" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-5"
                                >
                                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <GraduationCap className="w-5 h-5 text-[#1AC13B]" />
                                            {isEn
                                                ? "Director Leadership & Vision Quote"
                                                : "Pimpinan & Sambutan Direktur"}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Atur profil Direktur Pusat Riset dan
                                            kutipan sambutan resmi pada halaman
                                            depan.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Nama Lengkap & Gelar Direktur *
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.director_name}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "director_name",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan nama lengkap direktur beserta gelar"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                URL Foto Resmi Direktur
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    form.data.director_photo_url
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        "director_photo_url",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan URL tautan foto resmi direktur"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Jabatan Resmi (Bahasa Indonesia)
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    form.data.director_title_id
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        "director_title_id",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan jabatan resmi direktur dalam Bahasa Indonesia"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Official Title (English)
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.director_title}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "director_title",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Enter director's official title in English"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Kutipan Visi & Sambutan (Bahasa
                                            Indonesia) *
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.data.director_quote_id}
                                            onChange={(e) =>
                                                form.setData(
                                                    "director_quote_id",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Tuliskan kutipan visi dan sambutan direktur dalam Bahasa Indonesia..."
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Vision Quote & Remarks (English) *
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.data.director_quote}
                                            onChange={(e) =>
                                                form.setData(
                                                    "director_quote",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter director's vision quote and remarks in English..."
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    {/* Preview Box */}
                                    <div className="p-4 rounded-2xl bg-[#F9FDFB] dark:bg-slate-800/60 border border-[#1AC13B]/20 flex items-start gap-4">
                                        <Quote className="w-8 h-8 text-[#1AC13B] shrink-0 opacity-40" />
                                        <div>
                                            <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                                                "
                                                {form.data.director_quote_id ||
                                                    form.data.director_quote ||
                                                    "Kutipan visi sambutan direktur..."}
                                                "
                                            </p>
                                            <div className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                                                —{" "}
                                                {form.data.director_name ||
                                                    "Nama Direktur"}
                                            </div>
                                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                                {form.data.director_title_id ||
                                                    form.data.director_title}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 3: Contact & Location */}
                            {activeTab === "contact" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-5"
                                >
                                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-[#1AC13B]" />
                                            {isEn
                                                ? "Laboratory Contacts & Location"
                                                : "Kontak & Alamat Laboratorium"}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Saluran komunikasi resmi, nomor
                                            WhatsApp, dan lokasi fisik
                                            laboratorium.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Email Resmi *
                                            </label>
                                            <input
                                                type="email"
                                                value={form.data.contact_email}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "contact_email",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan alamat email resmi laboratorium"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Telepon Kantor
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.contact_phone}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "contact_phone",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan nomor telepon kantor laboratorium"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Nomor WhatsApp Helpdesk
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    form.data.whatsapp_contact
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        "whatsapp_contact",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan nomor kontak WhatsApp layanan"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Alamat Fisik Laboratorium & Gedung
                                            Riset *
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.data.address}
                                            onChange={(e) =>
                                                form.setData(
                                                    "address",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Masukkan alamat lengkap gedung dan laboratorium riset..."
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Jam Operasional Layanan Lab
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.operating_hours}
                                            onChange={(e) =>
                                                form.setData(
                                                    "operating_hours",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Masukkan jadwal jam operasional layanan laboratorium"
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 4: Social & Academic Links */}
                            {activeTab === "social" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-5"
                                >
                                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <Share2 className="w-5 h-5 text-[#1AC13B]" />
                                            {isEn
                                                ? "Social Networks & Academic Profiles"
                                                : "Jejaring Sosial & Tautan Eksternal"}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Tautan media sosial dan repositori
                                            kode publik STAS-RG.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                LinkedIn Organization URL
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    form.data.social_linkedin
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        "social_linkedin",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan URL tautan halaman LinkedIn organisasi"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                GitHub Organization URL
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.social_github}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "social_github",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan URL repositori GitHub organisasi"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                YouTube Channel URL
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.social_youtube}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "social_youtube",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan URL channel YouTube resmi organisasi"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                X / Twitter Profile URL
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.social_twitter}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "social_twitter",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan URL profil akun X/Twitter resmi organisasi"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Website Utama Universitas
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.university_url}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "university_url",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan URL website utama universitas"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                                Google Scholar Group URL
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    form.data.scholar_group_url
                                                }
                                                onChange={(e) =>
                                                    form.setData(
                                                        "scholar_group_url",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan URL profil Google Scholar organisasi atau grup riset"
                                                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 5: SEO & Metadata */}
                            {activeTab === "seo" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-5"
                                >
                                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <Search className="w-5 h-5 text-[#1AC13B]" />
                                            {isEn
                                                ? "Search Engine Optimization (SEO)"
                                                : "SEO & Metadata Mesin Pencari"}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Optimalkan keterlihatan portal riset
                                            STAS pada hasil pencarian Google.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Meta Title (Judul Tab & Mesin
                                            Pencari)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.meta_title}
                                            onChange={(e) =>
                                                form.setData(
                                                    "meta_title",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Masukkan judul meta default untuk halaman portal riset"
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Meta Description (Cuplikan Deskripsi
                                            Google)
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={form.data.meta_description}
                                            onChange={(e) =>
                                                form.setData(
                                                    "meta_description",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Tuliskan deskripsi ringkas meta description untuk mesin pencari..."
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                                            Meta Keywords (Kata Kunci)
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.meta_keywords}
                                            onChange={(e) =>
                                                form.setData(
                                                    "meta_keywords",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Masukkan kata kunci SEO yang dipisahkan dengan koma"
                                            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* TAB 6: System & Maintenance */}
                            {activeTab === "system" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-[#1AC13B]" />
                                            {isEn
                                                ? "System Preferences & Server Diagnostics"
                                                : "Preferensi Sistem & Diagnostik Server"}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Pengaturan hak akses, mode
                                            pemeliharaan, dan informasi teknis
                                            lingkungan server.
                                        </p>
                                    </div>

                                    {/* Toggle Preferences */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                            <div>
                                                <div className="text-xs font-bold text-slate-900 dark:text-white">
                                                    Pendaftaran Peneliti Baru
                                                    (User Registration)
                                                </div>
                                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                    Izinkan pendaftaran akun
                                                    peneliti baru melalui
                                                    halaman registrasi.
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    form.setData(
                                                        "allow_registration",
                                                        !form.data
                                                            .allow_registration,
                                                    )
                                                }
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                                                    form.data.allow_registration
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400"
                                                        : "bg-slate-200 text-slate-600 border-slate-300 dark:bg-slate-700 dark:text-slate-400"
                                                }`}
                                            >
                                                {form.data.allow_registration
                                                    ? "Diaktifkan"
                                                    : "Dinonaktifkan"}
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                            <div>
                                                <div className="text-xs font-bold text-slate-900 dark:text-white">
                                                    Publikasi Agenda & Workshop
                                                    Terbuka
                                                </div>
                                                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                    Tampilkan modul pendaftaran
                                                    agenda simposium pada
                                                    landing page.
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    form.setData(
                                                        "enable_public_events",
                                                        !form.data
                                                            .enable_public_events,
                                                    )
                                                }
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                                                    form.data
                                                        .enable_public_events
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400"
                                                        : "bg-slate-200 text-slate-600 border-slate-300 dark:bg-slate-700 dark:text-slate-400"
                                                }`}
                                            >
                                                {form.data.enable_public_events
                                                    ? "Diaktifkan"
                                                    : "Dinonaktifkan"}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Server Info Cards */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                                            <Server className="w-4 h-4 text-slate-400" />
                                            Informasi Lingkungan Server &
                                            Framework
                                        </h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                <div className="text-[11px] text-slate-400">
                                                    PHP Version
                                                </div>
                                                <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                                                    v{systemInfo.php_version}
                                                </div>
                                            </div>
                                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                <div className="text-[11px] text-slate-400">
                                                    Laravel Version
                                                </div>
                                                <div className="font-bold text-[#1AC13B] mt-0.5">
                                                    v
                                                    {systemInfo.laravel_version}
                                                </div>
                                            </div>
                                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                <div className="text-[11px] text-slate-400">
                                                    Environment
                                                </div>
                                                <div className="font-bold text-slate-900 dark:text-white mt-0.5 uppercase">
                                                    {systemInfo.app_environment}
                                                </div>
                                            </div>
                                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                <div className="text-[11px] text-slate-400">
                                                    Database Driver
                                                </div>
                                                <div className="font-bold text-slate-900 dark:text-white mt-0.5 uppercase">
                                                    {systemInfo.database_driver}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Save Button Row */}
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#1AC13B] text-white hover:bg-[#107E27] transition shadow-xs disabled:opacity-50 cursor-pointer flex items-center gap-2"
                                >
                                    {form.processing ? (
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    {isEn
                                        ? "Save System Settings"
                                        : "Simpan Semua Pengaturan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Clear Cache AlertModal */}
            <AlertModal
                isOpen={isClearCacheOpen}
                onClose={() => setIsClearCacheOpen(false)}
                onConfirm={handleClearCache}
                title={
                    isEn
                        ? "Clear Application Cache?"
                        : "Bersihkan Cache Sistem?"
                }
                message={
                    isEn
                        ? "This will clear compiled views, route caches, and configuration caches. The application will rebuild them automatically."
                        : "Tindakan ini akan mengosongkan cache konfigurasi, route, dan view. Sistem akan membangun ulang cache secara otomatis saat halaman diakses."
                }
                confirmText={isEn ? "Clear Cache Now" : "Ya, Bersihkan Cache"}
                cancelText={isEn ? "Cancel" : "Batal"}
                type="warning"
                isLoading={isClearing}
            />
        </AdminLayout>
    );
}
