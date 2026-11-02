import React from 'react';
import { MessageSquare, Cpu, Smartphone, Code, HeartHandshake, ShieldCheck } from 'lucide-react';
import { WHY_WORK_WITH_ME, PERSONAL_DETAILS } from '../data/portfolioData';

interface WhyWorkWithMeProps {
  onContactClick: () => void;
}

export const WhyWorkWithMe: React.FC<WhyWorkWithMeProps> = ({ onContactClick }) => {
  const icons = [
    <MessageSquare className="w-5 h-5 text-blue-400" />,
    <Cpu className="w-5 h-5 text-indigo-400" />,
    <Smartphone className="w-5 h-5 text-cyan-400" />,
    <Code className="w-5 h-5 text-emerald-400" />,
    <HeartHandshake className="w-5 h-5 text-amber-400" />,
    <ShieldCheck className="w-5 h-5 text-violet-400" />
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0d1424] border-t border-slate-800 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Professional Values
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Why Work With BenatCode?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            I believe technology should reduce friction, not introduce it. Here is what you can rely on when collaborating with me.
          </p>
        </div>

        {/* 6 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_WORK_WITH_ME.map((item, index) => (
            <div
              key={item.title}
              className="p-5 sm:p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center">
                {icons[index % icons.length]}
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick CTA Banner */}
        <div className="mt-12 p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-slate-900/40 border border-blue-800/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Ready to discuss your project or digital tool idea?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Get an honest appraisal, architecture recommendation, and clear scope proposal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onContactClick}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap text-center"
            >
              Start Project Discussion
            </button>
            <a
              href={PERSONAL_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 text-xs font-medium text-emerald-300 bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-800/80 rounded-xl transition-all whitespace-nowrap text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
