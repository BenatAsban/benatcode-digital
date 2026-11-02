import React from 'react';
import { X, Printer, Mail, MessageSquare, MapPin, CheckCircle, GraduationCap, Code2, ShoppingBag } from 'lucide-react';
import { PERSONAL_DETAILS, SKILLS_DATA, DIGITAL_PRODUCTS } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0d1424] border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl z-10 p-4 sm:p-8 space-y-6 text-slate-100">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Verified Developer & Product Creator Profile
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Container */}
        <div className="space-y-6 print:text-black">
          
          {/* Header Lockup */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {PERSONAL_DETAILS.ownerName}
              </h2>
              <div className="text-sm font-semibold text-blue-400">
                {PERSONAL_DETAILS.title} · {PERSONAL_DETAILS.brandName}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{PERSONAL_DETAILS.location}</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-1.5 sm:text-right font-mono">
              <div>Email: <a href={`mailto:${PERSONAL_DETAILS.email}`} className="text-blue-400 hover:underline">{PERSONAL_DETAILS.email}</a></div>
              <div>WhatsApp: <a href={PERSONAL_DETAILS.whatsappUrl} className="text-emerald-400 hover:underline">{PERSONAL_DETAILS.whatsappNumber}</a></div>
              <div className="text-slate-400">Status: Available for Digital Products & Projects</div>
            </div>
          </div>

          {/* Professional Objective & Rigor */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Professional Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Disciplined software engineer and digital products developer with an academic background in Mathematics. Creator of BenatCode, publishing practical business management software, compliance alert engines, and developer templates distributed across SuperProfile and Payhip.
            </p>
          </div>

          {/* Education & Academic Rigor */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Academic Education</span>
            </h3>
            <div className="p-3.5 rounded-xl bg-[#0a0f1d] border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-200 font-semibold">
                <span>Degree in Mathematics</span>
                <span className="text-slate-400">Tamil Nadu, India</span>
              </div>
              <p className="text-slate-400">
                Core strengths: Algorithmic modeling, logical problem breakdown, numerical rigor, and structured reasoning applied to digital software engineering.
              </p>
            </div>
          </div>

          {/* Technical Skills Overview */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Technical Proficiencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1">
                <span className="font-semibold text-blue-400">Frontend:</span>
                <p className="text-slate-300">
                  React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, React Hooks, Context API, Redux, React Router
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1">
                <span className="font-semibold text-indigo-400">Backend & API:</span>
                <p className="text-slate-300">
                  Node.js, Express.js, Python, Django, REST APIs, JSON data structures
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1">
                <span className="font-semibold text-cyan-400">Databases:</span>
                <p className="text-slate-300">
                  Cloud Firestore, Firebase Auth, MySQL, MongoDB
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1">
                <span className="font-semibold text-emerald-400">Distribution & Tooling:</span>
                <p className="text-slate-300">
                  SuperProfile Store, Payhip Store, Git, GitHub, Postman, Vite, Netlify CI/CD
                </p>
              </div>
            </div>
          </div>

          {/* Key In-House Products */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Published Digital Products (SuperProfile & Payhip)
            </h3>
            <div className="space-y-2 text-xs">
              {DIGITAL_PRODUCTS.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{p.name}</span>
                    <span className="text-[11px] font-mono text-blue-400">{p.platform} · {p.price}</span>
                  </div>
                  <p className="text-slate-400">{p.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            Official profile documentation from BenatCode.
          </span>
          <a
            href={PERSONAL_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect with Benat Asban S</span>
          </a>
        </div>

      </div>
    </div>
  );
};
