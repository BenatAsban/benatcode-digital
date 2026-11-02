import React, { useState } from 'react';
import { X, Check, Copy, Terminal, ExternalLink, CloudUpload, ArrowRight } from 'lucide-react';

interface NetlifyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetlifyGuideModal: React.FC<NetlifyGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      num: "01",
      title: "Download The Complete Project",
      desc: "Export or download the entire project repository from Google AI Studio to your local development machine.",
      command: null
    },
    {
      num: "02",
      title: "Install Dependencies",
      desc: "Open your terminal in the extracted folder and install all locked dependencies:",
      command: "npm install"
    },
    {
      num: "03",
      title: "Run Locally & Verify",
      desc: "Start the local Vite dev server on port 3000 to preview the site locally:",
      command: "npm run dev"
    },
    {
      num: "04",
      title: "Build For Production",
      desc: "Generate the optimized static output bundle into the 'dist' directory:",
      command: "npm run build"
    },
    {
      num: "05",
      title: "Deploy on Netlify",
      desc: "Option A (Instant Drop): Drag and drop the generated 'dist/' folder directly into app.netlify.com/drop.\nOption B (GitHub CI/CD): Push your repository to GitHub, link the repo in Netlify dashboard, and enable automated continuous deployments on git push.",
      command: null
    },
    {
      num: "06",
      title: "Configure Build Settings in Netlify",
      desc: "Netlify will automatically detect the pre-configured 'netlify.toml' in the repository root, but confirm these settings:",
      command: "Build command: npm run build\nPublish directory: dist"
    },
    {
      num: "07",
      title: "Verify SPA Redirects & Direct Refresh",
      desc: "The project includes 'public/_redirects' with '/* /index.html 200' and 'netlify.toml' rules so that deep links and page refreshes work flawlessly.",
      command: "/*    /index.html   200"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0d1424] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl z-10 p-4 sm:p-8 space-y-6 text-slate-100">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <CloudUpload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Netlify Deployment Guide
              </h3>
              <p className="text-xs text-slate-400">
                Official step-by-step instructions for hosting Loyal Digital Tools on Netlify
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={step.num} className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    Step {step.num}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {step.title}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                {step.desc}
              </p>

              {step.command && (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#070b14] border border-slate-800 font-mono text-xs text-emerald-300">
                  <span className="truncate">{step.command}</span>
                  <button
                    onClick={() => copyToClipboard(step.command!, idx)}
                    className="ml-2 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pre-configured Files Notice */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-slate-300 space-y-1">
          <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Pre-Configured Files in this Codebase:</span>
          </div>
          <ul className="list-disc list-inside text-slate-400 space-y-0.5 pt-1 pl-1">
            <li><code className="text-slate-300">/netlify.toml</code> - Specifies build command & publish dir</li>
            <li><code className="text-slate-300">/public/_redirects</code> - Guarantees SPA routing across all URLs</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
