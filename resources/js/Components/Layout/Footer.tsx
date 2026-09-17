import React from "react";
import { BrandLogo } from "../Common/BrandLogo";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import {
    SiteConfig,
    ResearchDomain,
    EnterpriseService,
    Publication,
} from "../../types";
import { TranslationDictionary } from "../../utils/translations";

interface FooterProps {
    siteConfig?: SiteConfig;
    domains?: ResearchDomain[];
    publications?: Publication[];
    services?: EnterpriseService[];
    t: TranslationDictionary["footer"];
}

export const Footer: React.FC<FooterProps> = ({
    siteConfig,
    domains = [],
    publications = [],
    services = [],
    t,
}) => {
    const activeDomains = domains
        .filter((d) => d.is_active !== false)
        .slice(0, 6);
    const activePubs = publications
        .filter((p) => p.is_active !== false)
        .slice(0, 5);
    const activeServices = services
        .filter((s) => s.is_active !== false)
        .slice(0, 6);

    return (
        <footer
            id="contact"
            className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-16 pb-12 border-t border-slate-200/90 dark:border-slate-800 transition-colors"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-200 dark:border-slate-800/80">
                    {/* Left Brand Summary Column */}
                    <div className="lg:col-span-4 space-y-5">
                        <BrandLogo variant="dark" size="lg" showSubtitle />

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                            {t.desc}
                        </p>

                        {/* Direct Contact Snapshot */}
                        <div className="space-y-2.5 pt-2 text-xs text-slate-600 dark:text-slate-300">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-[#107E27] dark:text-[#1AC13B] shrink-0 mt-0.5" />
                                <a
                                    href={siteConfig?.maps_url || "https://maps.app.goo.gl/EQHpqHavYCoRyzST9"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                >
                                    {siteConfig?.address ||
                                        "Jl. Telekomunikasi No.1, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257"}
                                </a>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                <a
                                    href={`mailto:${siteConfig?.contact_email || "stasrg@telkomuniversity.ac.id"}`}
                                    className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                >
                                    {siteConfig?.contact_email ||
                                        "stasrg@telkomuniversity.ac.id"}
                                </a>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-[#107E27] dark:text-[#1AC13B] shrink-0" />
                                <span>
                                    {siteConfig?.contact_phone ||
                                        "+62 22 756 4108"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Column 1: Research Focus from DB */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-l-2 border-[#107E27] dark:border-[#1AC13B] pl-2.5">
                            {t.colFocus}
                        </div>
                        <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                            {activeDomains.length > 0 ? (
                                activeDomains.map((d) => (
                                    <li key={d.id || d.slug}>
                                        <a
                                            href="/research"
                                            className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors line-clamp-1"
                                        >
                                            {d.title}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li className="text-slate-400 dark:text-slate-600 italic text-xs">
                                    Tidak ada data
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Column 2: Academic & Publications from DB */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-l-2 border-[#107E27] dark:border-[#1AC13B] pl-2.5">
                            {t.colPubs}
                        </div>
                        <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                            {activePubs.length > 0 ? (
                                activePubs.map((pub) => (
                                    <li key={pub.id || pub.doi}>
                                        <a
                                            href="/publications"
                                            className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors line-clamp-1"
                                            title={pub.title}
                                        >
                                            {pub.title}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li className="text-slate-400 dark:text-slate-600 italic text-xs">
                                    Tidak ada data
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Column 3: Enterprise Services from DB */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-l-2 border-[#107E27] dark:border-[#1AC13B] pl-2.5">
                            {t.colServices}
                        </div>
                        <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                            {activeServices.length > 0 ? (
                                activeServices.map((s) => (
                                    <li key={s.id || s.service_number}>
                                        <a
                                            href="/services"
                                            className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors line-clamp-1"
                                        >
                                            {s.title}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li className="text-slate-400 dark:text-slate-600 italic text-xs">
                                    Tidak ada data
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Column 4: Quick Links / Resources */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-l-2 border-[#107E27] dark:border-[#1AC13B] pl-2.5">
                            {t.colConnect}
                        </div>
                        <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                            <li>
                                <a
                                    href="/contact"
                                    className="text-[#107E27] dark:text-[#1AC13B] font-semibold hover:underline flex items-center gap-1 transition-colors"
                                >
                                    <span>Contact Hub & Maps</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                >
                                    About CoE STAS-RG
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/team"
                                    className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                >
                                    Our Research Team
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/projects"
                                    className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                >
                                    Applied Projects
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/events"
                                    className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                >
                                    Upcoming Symposia
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/news"
                                    className="hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                >
                                    News & Insights
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://tel-u.ac.id/stasrg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 hover:text-[#107E27] dark:hover:text-[#1AC13B] transition-colors"
                                >
                                    Tel-U STAS-RG{" "}
                                    <ArrowUpRight className="w-3 h-3 text-[#107E27] dark:text-[#1AC13B]" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Legal & Copyright Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div>
                        © {new Date().getFullYear()}{" "}
                        {siteConfig?.center_name ||
                            "Center of Excellence for Sustainable Technology and Applied Science (CoE STAS-RG)"}{" "}
                        - {siteConfig?.institution || "Telkom University"}.{" "}
                        {t.rights}
                    </div>
                    <div className="flex items-center gap-6">
                        <a
                            href="/privacy"
                            className="hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            {t.privacy}
                        </a>
                        <a
                            href="/terms"
                            className="hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            {t.terms}
                        </a>
                        <a
                            href="/ethics"
                            className="hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            {t.ethics}
                        </a>
                        <a
                            href="/sitemap"
                            className="hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            {t.sitemap}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
