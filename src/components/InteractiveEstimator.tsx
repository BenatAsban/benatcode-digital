import React, { useState } from 'react';
import { Calculator, Check, MessageSquare, ArrowRight, Sparkles, Send } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface InteractiveEstimatorProps {
  onApplyScopeToContact: (scopeText: string, projectType: string) => void;
}

export const InteractiveEstimator: React.FC<InteractiveEstimatorProps> = ({ onApplyScopeToContact }) => {
  const [projectType, setProjectType] = useState<'website' | 'webapp' | 'dashboard' | 'product'>('website');
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'priority'>('standard');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Responsive Mobile Layout',
    'WhatsApp Inquiry Integration'
  ]);

  const featureOptions: Record<string, string[]> = {
    website: [
      'Responsive Mobile Layout',
      'WhatsApp Inquiry Integration',
      'SEO & Meta Optimization',
      'Google Maps Location Integration',
      'Netlify Automated Hosting Setup',
      'Photo & Product Showcase Gallery'
    ],
    webapp: [
      'Responsive Mobile Layout',
      'User Authentication (Firebase/JWT)',
      'Database Modeling (MongoDB/Firestore)',
      'Custom Workflow Dashboard',
      'REST API Endpoints',
      'Automated Data Validation'
    ],
    dashboard: [
      'Tabular Data Filtering & Search',
      'Visual Chart Summaries',
      'Export to CSV / PDF',
      'Role-based Access Levels',
      'Receipt / Invoice Generation',
      'Audit Logging'
    ],
    product: [
      'MVP SaaS Architecture',
      'Landing Page & Presentation',
      'Subscriber / Customer Onboarding',
      'Payment Gateway Integration',
      'Document / Storage Pipeline',
      'Cross-Platform PWA Setup'
    ]
  };

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const projectLabels: Record<string, string> = {
    website: 'Business / Portfolio Website',
    webapp: 'Custom Web Application',
    dashboard: 'Dashboard & Internal Portal',
    product: 'Digital Product / SaaS MVP'
  };

  // Honest timeline calculation based on feature count
  const baseDays = projectType === 'website' ? 7 : projectType === 'dashboard' ? 14 : 21;
  const featureDays = selectedFeatures.length * 2;
  const estimatedDays = timelineSpeed === 'priority' 
    ? Math.max(5, Math.round((baseDays + featureDays) * 0.75))
    : baseDays + featureDays;

  const scopeSummary = `Project Type: ${projectLabels[projectType]}
Timeline Preference: ${timelineSpeed === 'priority' ? 'Expedited Delivery' : 'Standard Delivery (~' + estimatedDays + ' business days)'}
Required Modules:
${selectedFeatures.map(f => `- ${f}`).join('\n')}`;

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Benat, I used the Scope Planner on BenatCode:\n\n${scopeSummary}\n\nCan we discuss the estimate and timeline?`
    );
    window.open(`${PERSONAL_DETAILS.whatsappUrl}?text=${text}`, '_blank');
  };

  const handleTransferToContact = () => {
    onApplyScopeToContact(scopeSummary, projectLabels[projectType]);
  };

  return (
    <section className="py-20 md:py-28 bg-[#0a0f1d] relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Interactive Scope Planner
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Plan Your Project Scope & Timeline
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Select your target solution and required modules to generate a clear scope brief. You can immediately share this with Benat via WhatsApp or the contact form.
          </p>
        </div>

        {/* Planner Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configuration Column */}
          <div className="lg:col-span-7 bg-[#0d1424] rounded-2xl border border-slate-800 p-4 sm:p-7 space-y-6">
            
            {/* Step 1: Solution Type */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                1. Select Solution Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'website', label: 'Website' },
                  { id: 'webapp', label: 'Web App' },
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'product', label: 'SaaS MVP' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setProjectType(item.id as any);
                      // Reset default features for selected type
                      setSelectedFeatures(featureOptions[item.id].slice(0, 2));
                    }}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center cursor-pointer ${
                      projectType === item.id
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                        : 'bg-[#0a0f1d] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Features checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  2. Select Desired Capabilities ({selectedFeatures.length} selected)
                </label>
                <span className="text-[11px] text-slate-500">Click to toggle</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {featureOptions[projectType].map((feat) => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => toggleFeature(feat)}
                      className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-blue-950/40 border-blue-500/60 text-slate-100'
                          : 'bg-[#0a0f1d] border-slate-800/80 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <span className="pr-2">{feat}</span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        isChecked ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Delivery Cadence */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                3. Delivery Timeline Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimelineSpeed('standard')}
                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    timelineSpeed === 'standard'
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-[#0a0f1d] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-white">Standard Milestones</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Thorough review cycles & testing</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTimelineSpeed('priority')}
                  className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    timelineSpeed === 'priority'
                      ? 'bg-blue-600/20 border-blue-500 text-white'
                      : 'bg-[#0a0f1d] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold text-white">Priority / Fast-Track</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Accelerated sprints & early release</div>
                </button>
              </div>
            </div>

          </div>

          {/* Scope Summary Card */}
          <div className="lg:col-span-5 bg-[#0d1424] rounded-2xl border border-slate-800 p-4 sm:p-7 space-y-6">
            <div className="pb-4 border-b border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                <Calculator className="w-3.5 h-3.5" />
                <span>Generated Scope Brief</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {projectLabels[projectType]}
              </h3>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Estimated Delivery</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">
                  ~{estimatedDays} Working Days
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Selected Modules</div>
                <div className="text-base font-bold text-blue-400 font-mono mt-0.5">
                  {selectedFeatures.length} Key Features
                </div>
              </div>
            </div>

            {/* Scope Output Box */}
            <div className="p-3.5 rounded-xl bg-[#0a0f1d] border border-slate-800 font-mono text-xs text-slate-300 space-y-1 max-h-44 overflow-y-auto">
              <div className="text-slate-500">// Scope Summary for discussion:</div>
              <div className="text-blue-300 font-semibold">{projectLabels[projectType]}</div>
              <div className="text-slate-400 pt-1">
                {selectedFeatures.map(f => (
                  <div key={f} className="truncate">• {f}</div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md shadow-emerald-950/30 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Scope Brief via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleTransferToContact}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium text-slate-200 hover:text-white bg-[#0a0f1d] hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-blue-400" />
                <span>Fill into Contact Form Below</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-500 text-center">
              Direct developer evaluation · Transparent estimate · No sales reps
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
