import React from 'react';
import { BookOpen, Compass, Code, Cpu, MapPin, ArrowRight, FileText, ShoppingBag, ShieldCheck } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface AboutProps {
  onOpenCVModal: () => void;
  onExploreProducts: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenCVModal, onExploreProducts }) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#0d1424] border-y border-slate-800 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            About The Creator
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Mathematics Analytical Rigor In Every Digital Product
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photograph Presentation */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0a0f1d] shadow-xl p-3 sm:p-4">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80">
                <img
                  src={PERSONAL_DETAILS.photoUrl}
                  alt={`${PERSONAL_DETAILS.ownerName} - Founder of ${PERSONAL_DETAILS.brandName}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#0d1424]/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{PERSONAL_DETAILS.ownerName}</div>
                    <div className="text-[11px] text-blue-400">{PERSONAL_DETAILS.title}</div>
                  </div>
                  <div className="text-[11px] text-slate-400 text-right">
                    <span>{PERSONAL_DETAILS.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Prose & Values */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base">
            <p className="text-lg text-slate-200 font-normal">
              I am <strong className="text-white font-semibold">{PERSONAL_DETAILS.ownerName}</strong>, 
              founder of <strong className="text-white font-semibold">{PERSONAL_DETAILS.brandName}</strong>, 
              building practical software and digital tools from Madurai, Tamil Nadu, India.
            </p>

            {PERSONAL_DETAILS.aboutBio.map((paragraph, idx) => (
              <p key={idx} className="text-slate-300">
                {paragraph}
              </p>
            ))}

            {/* Core Values List */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Mathematics Foundation</span>
                </div>
                <p className="text-xs text-slate-400">
                  Disciplined mental model for algorithmic breakdown, logic verification, and systematic debugging.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span>Independent Digital Products</span>
                </div>
                <p className="text-xs text-slate-400">
                  Published and sold directly through SuperProfile and Payhip with zero third-party fluff.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Code className="w-4 h-4 text-indigo-400" />
                  <span>Real Business Solutions</span>
                </div>
                <p className="text-xs text-slate-400">
                  Software that solves everyday friction for local retailers, shopkeepers, and independent contractors.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Continuous Development</span>
                </div>
                <p className="text-xs text-slate-400">
                  Consistently improving existing tools and rolling out new digital software utilities.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all cursor-pointer shadow-sm text-center"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>Explore Digital Products Store</span>
              </button>

              <button
                onClick={onOpenCVModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all cursor-pointer text-center"
              >
                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                <span>View Full CV & Technical Profile</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
