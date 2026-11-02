import React from 'react';
import { ArrowRight, MessageSquare, MapPin, CheckCircle, ShoppingBag, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface HeroProps {
  onExploreProducts: () => void;
  onFilterPlatform: (platform: 'SuperProfile' | 'Payhip') => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts, onFilterPlatform, onContactClick }) => {
  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-grid-pattern w-full max-w-full">
      {/* Ambient background glows with viewport relative sizing to prevent overflow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[60vw] max-w-[350px] h-[250px] bg-indigo-600/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6 min-w-0">
            
            {/* Editorial brand kicker without pills */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-blue-400 tracking-wide">
              <span className="text-white font-bold">{PERSONAL_DETAILS.brandName}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{PERSONAL_DETAILS.ownerName}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{PERSONAL_DETAILS.title}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>Madurai, TN, India</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.2] sm:leading-[1.15] break-words">
              {PERSONAL_DETAILS.headline}
            </h1>

            {/* Supporting Prose */}
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light break-words">
              {PERSONAL_DETAILS.supportingText}
            </p>

            {/* Platform Trust Notice */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-300 py-1">
              <span className="text-slate-400 w-full sm:w-auto">Available on official platforms:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d1424] border border-blue-900/60 text-blue-300 font-medium text-[11px] sm:text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span>SuperProfile (UPI / INR Instant Access)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d1424] border border-emerald-900/60 text-emerald-300 font-medium text-[11px] sm:text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Payhip (Global Card & PayPal)</span>
              </span>
            </div>

            {/* Action Buttons: Commercial and Direct Contact */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:shadow-blue-600/40 hover:-translate-y-0.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse Digital Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onFilterPlatform('SuperProfile')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-3 text-xs font-semibold text-blue-300 hover:text-white bg-blue-950/40 hover:bg-blue-900/40 border border-blue-800/60 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>SuperProfile Store</span>
              </button>

              <button
                onClick={() => onFilterPlatform('Payhip')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-3 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/60 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Payhip Store</span>
              </button>

              <a
                href={PERSONAL_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Genuine Principles & Academic Foundation */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Mathematics Academic Background</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Verified Direct Product Purchasing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Zero Fake Statistics</span>
              </div>
            </div>

          </div>

          {/* Right Column: Benat Asban S's Real Photograph Profile Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame matching BenatCode visual language */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1424] shadow-2xl shadow-black/70 group">
                
                {/* Real Photograph with authentic face appearance */}
                <div className="relative aspect-[4/5] sm:aspect-[1/1] overflow-hidden bg-slate-900">
                  <img
                    src={PERSONAL_DETAILS.photoUrl}
                    alt="Benat Asban S - Founder & Digital Solutions Developer at BenatCode"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent opacity-80" />
                  
                  {/* Verified Founder Badge */}
                  <div className="absolute top-3 left-3 bg-[#0a0f1d]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>Benat Asban S</span>
                  </div>

                  {/* Brand Tag */}
                  <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-white tracking-wide shadow-md">
                    BenatCode
                  </div>
                </div>

                {/* Profile details & direct store status */}
                <div className="p-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800/80">
                    <span className="text-slate-300 font-semibold font-sans">
                      Founder & Solutions Developer
                    </span>
                    <span className="text-emerald-400 text-[11px] font-sans flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active Products
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-300 font-sans">
                    <div className="flex items-center justify-between py-1 border-b border-slate-800/40 text-xs">
                      <span className="text-slate-400">Academic Background:</span>
                      <span className="text-white font-medium">Degree in Mathematics</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-800/40 text-xs">
                      <span className="text-slate-400">Product Focus:</span>
                      <span className="text-blue-300 font-medium">Business Software & Digital Tools</span>
                    </div>
                    <div className="flex items-center justify-between py-1 text-xs">
                      <span className="text-slate-400">Location:</span>
                      <span className="text-slate-200">Madurai, Tamil Nadu, India</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-sans">
                    <a
                      href="#products"
                      onClick={onExploreProducts}
                      className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                    >
                      <span>View 8 Published Products</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                    <span className="text-slate-400">SuperProfile · Payhip</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 4-Pillar Strip Below the Hero Split */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Engineering</div>
            <div className="text-sm font-semibold text-white">Mathematics Rigor</div>
            <div className="text-xs text-slate-400">Logical accuracy & structured algorithmic software</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">E-Commerce</div>
            <div className="text-sm font-semibold text-white">SuperProfile Store</div>
            <div className="text-xs text-slate-400">Instant UPI, GPay & Indian payment checkout</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Global Reach</div>
            <div className="text-sm font-semibold text-white">Payhip Store</div>
            <div className="text-xs text-slate-400">Instant digital downloads with Card & PayPal</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Support</div>
            <div className="text-sm font-semibold text-white">Direct WhatsApp</div>
            <div className="text-xs text-slate-400">Direct technical support & custom builds</div>
          </div>
        </div>

      </div>
    </section>
  );
};
