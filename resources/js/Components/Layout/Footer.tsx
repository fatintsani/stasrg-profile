import React from 'react';
import { BrandLogo } from '../Common/BrandLogo';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { SiteConfig } from '../../types';
import { TranslationDictionary } from '../../utils/translations';

interface FooterProps {
    siteConfig?: SiteConfig;
    t: TranslationDictionary['footer'];
}

export const Footer: React.FC<FooterProps> = ({ siteConfig, t }) => {
    return (
        <footer id="contact" className="bg-[#0A1C12] text-slate-300 pt-16 pb-12 border-t border-[#143821] transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#143821]/80">
                    {/* Left Brand Summary Column */}
                    <div className="lg:col-span-4 space-y-5">
                        <BrandLogo variant="light" size="lg" showSubtitle />

                        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-sm">
                            {t.desc}
                        </p>

                        {/* Institutional Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#102B1C] border border-[#19452D] text-xs text-slate-200">
                            <span className="w-2 h-2 rounded-full bg-[#1AC13B] animate-pulse" />
                            <span className="font-bold text-white">{t.univ}</span>
                            <span className="text-slate-500">|</span>
                            <span className="text-slate-300">{t.faculty}</span>
                        </div>

                        {/* Direct Contact Snapshot */}
                        <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-[#1AC13B] shrink-0 mt-0.5" />
                                <span>{siteConfig?.address || 'Center of Excellence STAS-RG, Telkom University, Jl. Telekomunikasi No. 1, Bandung, Indonesia'}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-[#1AC13B] shrink-0" />
                                <a href={`mailto:${siteConfig?.contact_email || 'stasrg@telkomuniversity.ac.id'}`} className="hover:text-[#1AC13B] transition-colors">
                                    {siteConfig?.contact_email || 'stasrg@telkomuniversity.ac.id'}
                                </a>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-[#1AC13B] shrink-0" />
                                <span>{siteConfig?.contact_phone || '+62 22 756 4108'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 1: Research Focus */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#1AC13B] pl-2.5">
                            {t.colFocus}
                        </div>
                        <ul className="space-y-2.5 text-xs text-slate-300">
                            <li><a href="#domains" className="hover:text-[#1AC13B] transition-colors">Sustainable Green Systems</a></li>
                            <li><a href="#domains" className="hover:text-[#1AC13B] transition-colors">Smart Manufacturing 4.0</a></li>
                            <li><a href="#domains" className="hover:text-[#1AC13B] transition-colors">Supply Chain Optimization</a></li>
                            <li><a href="#domains" className="hover:text-[#1AC13B] transition-colors">Applied Data Science & AI</a></li>
                            <li><a href="#domains" className="hover:text-[#1AC13B] transition-colors">Environmental Tech</a></li>
                            <li><a href="#domains" className="hover:text-[#1AC13B] transition-colors">Renewable Microgrids</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Academic & Publications */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#1AC13B] pl-2.5">
                            {t.colPubs}
                        </div>
                        <ul className="space-y-2.5 text-xs text-slate-300">
                            <li><a href="#publications" className="hover:text-[#1AC13B] transition-colors">Peer-Reviewed Journals</a></li>
                            <li><a href="#publications" className="hover:text-[#1AC13B] transition-colors">Conference Proceedings</a></li>
                            <li><a href="#publications" className="hover:text-[#1AC13B] transition-colors">Policy Whitepapers</a></li>
                            <li><a href="#publications" className="hover:text-[#1AC13B] transition-colors">Open Data Repositories</a></li>
                            <li><a href="#publications" className="hover:text-[#1AC13B] transition-colors">Patents & IP Filings</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Enterprise Services */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#1AC13B] pl-2.5">
                            {t.colServices}
                        </div>
                        <ul className="space-y-2.5 text-xs text-slate-300">
                            <li><a href="#services" className="hover:text-[#1AC13B] transition-colors">Custom Industrial R&D</a></li>
                            <li><a href="#services" className="hover:text-[#1AC13B] transition-colors">Supply Chain Advisory</a></li>
                            <li><a href="#services" className="hover:text-[#1AC13B] transition-colors">Lab Testing & Stress Audits</a></li>
                            <li><a href="#services" className="hover:text-[#1AC13B] transition-colors">ESG & Carbon Accounting</a></li>
                            <li><a href="#services" className="hover:text-[#1AC13B] transition-colors">Corporate Bootcamps</a></li>
                            <li><a href="#services" className="hover:text-[#1AC13B] transition-colors">Technology Licensing</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Quick Links / Resources */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#1AC13B] pl-2.5">
                            {t.colConnect}
                        </div>
                        <ul className="space-y-2.5 text-xs text-slate-300">
                            <li><a href="#about" className="hover:text-[#1AC13B] transition-colors">About CoE STAS-RG</a></li>
                            <li><a href="#events" className="hover:text-[#1AC13B] transition-colors">Upcoming Symposia</a></li>
                            <li><a href="#news" className="hover:text-[#1AC13B] transition-colors">News & Insights</a></li>
                            <li><a href="https://telkomuniversity.ac.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#1AC13B] transition-colors">
                                Telkom University <ArrowUpRight className="w-3 h-3 text-[#1AC13B]" />
                            </a></li>
                            <li><a href="https://research.telkomuniversity.ac.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#1AC13B] transition-colors">
                                PPM Tel-U <ArrowUpRight className="w-3 h-3 text-[#1AC13B]" />
                            </a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Legal & Copyright Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                    <div>
                        © {new Date().getFullYear()} Center of Excellence for Sustainable Technology and Applied Science (CoE STAS-RG) - Telkom University. {t.rights}
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#privacy" className="hover:text-white transition-colors">{t.privacy}</a>
                        <a href="#terms" className="hover:text-white transition-colors">{t.terms}</a>
                        <a href="#ethics" className="hover:text-white transition-colors">{t.ethics}</a>
                        <a href="#sitemap" className="hover:text-white transition-colors">{t.sitemap}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
