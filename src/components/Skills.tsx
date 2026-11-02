import React, { useState } from 'react';
import { Layout, Server, Database, Wrench, CheckCircle2 } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Development': <Layout className="w-5 h-5 text-blue-400" />,
    'Backend & APIs': <Server className="w-5 h-5 text-indigo-400" />,
    'Databases & Storage': <Database className="w-5 h-5 text-cyan-400" />,
    'Developer Tools & Deployment': <Wrench className="w-5 h-5 text-emerald-400" />
  };

  const filteredCategories = selectedCategory === 'All' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(c => c.category === selectedCategory);

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#0a0f1d] relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Technical Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Skills & Verified Technologies
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Technologies I use daily to build production web applications, automated tools, and business solutions. Presented with clear context, without arbitrary percentage ratings.
          </p>
        </div>

        {/* Interactive Filter Controls */}
        <div className="w-full sm:w-fit overflow-x-auto max-w-full pb-1 sm:pb-0 mb-10 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#0d1424] rounded-xl border border-slate-800 min-w-max">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              All Disciplines
            </button>
            {SKILLS_DATA.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.category
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((group) => (
            <div
              key={group.category}
              className="bg-[#0d1424] rounded-2xl border border-slate-800/90 p-6 sm:p-7 hover:border-slate-700 transition-all space-y-5"
            >
              {/* Category Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {categoryIcons[group.category]}
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {group.category}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">
                    {group.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
                  {group.skills.length} tools
                </span>
              </div>

              {/* Skills List as Clean Unboxed Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800/80 hover:border-slate-700/80 transition-colors flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-slate-200">
                        {skill.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400/80 shrink-0" />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {skill.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
