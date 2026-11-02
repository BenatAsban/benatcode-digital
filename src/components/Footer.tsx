import React from 'react';
import { Mail, MessageSquare, MapPin, ArrowUp, CloudUpload, FileText, Code2, ShoppingBag, Lock, Download } from 'lucide-react';
import { PERSONAL_DETAILS, SERVICES_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenCVModal: () => void;
  onOpenNetlifyGuide: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCVModal, onOpenNetlifyGuide, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070b14] border-t border-slate-800 text-slate-400 text-xs w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-blue-600/30">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                {PERSONAL_DETAILS.brandName}
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Founded by {PERSONAL_DETAILS.ownerName}. Digital products and software solutions platform building practical tools for business operations, compliance tracking, and developer productivity distributed on SuperProfile and Payhip.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={onOpenCVModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Developer Profile & CV</span>
              </button>

              <button
                onClick={onOpenNetlifyGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors cursor-pointer"
              >
                <CloudUpload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Netlify Guide</span>
              </button>

              <a
                href="/benatcode-project.zip"
                download="benatcode-project.zip"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/70 hover:bg-blue-900/90 text-blue-300 hover:text-white border border-blue-800/80 text-xs transition-colors cursor-pointer shadow-sm"
                title="Download complete project ZIP ready for GitHub & Render"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Download Project ZIP</span>
              </a>

              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0d1424] hover:bg-slate-800 text-slate-400 hover:text-blue-300 border border-slate-800 text-xs transition-colors cursor-pointer"
                  title="Admin Portal"
                >
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Admin Portal</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Me', href: '#about' },
                { label: 'Skills & Tech', href: '#skills' },
                { label: 'Services', href: '#services' },
                { label: 'All Digital Products', href: '#products' },
                { label: 'SuperProfile Store', href: '#superprofile-products' },
                { label: 'Payhip Store', href: '#payhip-products' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="hover:text-blue-400 transition-colors line-clamp-1"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{PERSONAL_DETAILS.location}</span>
              </div>

              <a
                href={PERSONAL_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{PERSONAL_DETAILS.whatsappNumber}</span>
              </a>

              <a
                href={`mailto:${PERSONAL_DETAILS.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors truncate"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">{PERSONAL_DETAILS.email}</span>
              </a>

              <div className="pt-2 text-[11px] text-slate-500">
                Direct developer collaboration with zero agency markups.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-12 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {PERSONAL_DETAILS.brandName} · Founded & Developed by {PERSONAL_DETAILS.ownerName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
