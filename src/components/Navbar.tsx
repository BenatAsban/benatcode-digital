import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare, FileText, ShoppingBag, Code2, Lock, ShieldCheck } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface NavbarProps {
  onOpenCVModal: () => void;
  onSelectPlatformFilter?: (platform: 'All' | 'SuperProfile' | 'Payhip') => void;
  onOpenAdmin: () => void;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCVModal, 
  onSelectPlatformFilter,
  onOpenAdmin,
  isAdmin = false
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'All Products', href: '#products' },
    { label: 'SuperProfile', href: '#superprofile-products' },
    { label: 'Payhip', href: '#payhip-products' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#superprofile-products' && onSelectPlatformFilter) {
      onSelectPlatformFilter('SuperProfile');
    } else if (href === '#payhip-products' && onSelectPlatformFilter) {
      onSelectPlatformFilter('Payhip');
    } else if (href === '#products' && onSelectPlatformFilter) {
      onSelectPlatformFilter('All');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full ${
        isScrolled 
          ? 'bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20' 
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-2 sm:gap-6 lg:gap-8 w-full">
          
          {/* Zone 1: Brand wordmark */}
          <a 
            href="#home" 
            className="group flex items-center gap-2 sm:gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="font-heading text-base sm:text-lg tracking-tight group-hover:text-blue-400 transition-colors">
              {PERSONAL_DETAILS.brandName}
            </span>
          </a>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="whitespace-nowrap shrink-0 hover:text-blue-400 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary actions & Admin Access */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {isAdmin ? (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Dashboard</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 p-1.5 text-slate-400 hover:text-white hover:bg-slate-850 border border-transparent hover:border-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Admin Login"
                aria-label="Admin Login"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            <a
              href="#products"
              onClick={() => handleLinkClick('#products')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:text-white bg-blue-950/50 hover:bg-blue-900/50 border border-blue-800/60 rounded-lg transition-all whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Digital Store</span>
            </a>

            <a
              href={PERSONAL_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-600/30 transition-all hover:shadow-blue-600/50 hover:-translate-y-0.5 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile hamburger toggle & quick access */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            <button
              onClick={onOpenAdmin}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg text-xs transition-colors cursor-pointer"
              title="Admin Login"
              aria-label="Admin Access"
            >
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <a
              href="#products"
              onClick={() => handleLinkClick('#products')}
              className="p-1.5 sm:p-2 text-blue-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg text-xs transition-colors"
              title="View Products"
              aria-label="View Products"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d1424] border-b border-slate-800 px-4 pt-3 pb-6 mt-2 space-y-3 shadow-xl max-w-full overflow-hidden">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4 text-blue-400" />
              <span>{isAdmin ? 'Open Admin Dashboard' : 'Admin Login'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCVModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Developer Profile & Resume Summary</span>
            </button>

            <a
              href={PERSONAL_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 84283 41029)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
