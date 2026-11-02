import React from 'react';
import { ArrowRight, Check, Clock, Users } from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/portfolioData';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 md:py-28 bg-[#0d1424] border-y border-slate-800 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Services & Expertise
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Digital Solutions Engineered For Real Results
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            From modern responsive storefronts for local businesses to custom full-stack web applications and SaaS MVPs. Select a service to initiate a discussion.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bg-[#0a0f1d] rounded-2xl border border-slate-800 p-5 sm:p-6 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Number & Ideal For */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-blue-400 font-semibold">{service.number}</span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{service.typicalTimeline}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Deliverables */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Core Deliverables
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-slate-800/60">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-850 hover:bg-blue-600 hover:text-white border border-slate-700 hover:border-blue-500 rounded-xl transition-all cursor-pointer group-hover:shadow-md"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
