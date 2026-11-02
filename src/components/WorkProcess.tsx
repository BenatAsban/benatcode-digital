import React from 'react';
import { ArrowRight, CheckCircle2, FileCheck } from 'lucide-react';
import { WORK_PROCESS } from '../data/portfolioData';

export const WorkProcess: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-[#0a0f1d] relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Methodology
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            A Structured 5-Step Development Process
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Every project follows a predictable, transparent workflow from initial idea to live production deployment. No surprises, no unexplained delays.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {WORK_PROCESS.map((item, index) => (
            <div
              key={item.step}
              className="bg-[#0d1424] rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-blue-500/40 transition-colors relative group"
            >
              <div className="space-y-3">
                {/* Step indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-blue-400">
                    {item.step}
                  </span>
                  {index < WORK_PROCESS.length - 1 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  )}
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Deliverable tag */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-[10px] uppercase font-semibold text-slate-500 mb-1">
                  Deliverable
                </div>
                <div className="text-xs text-emerald-400 font-medium flex items-start gap-1">
                  <FileCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{item.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
