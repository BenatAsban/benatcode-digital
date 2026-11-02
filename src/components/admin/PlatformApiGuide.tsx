import React from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  HelpCircle, 
  Zap, 
  Layers, 
  Link2,
  Workflow
} from 'lucide-react';

export const PlatformApiGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-slate-900 border border-blue-800/40 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Official Platform API & Integration Report</span>
        </div>
        <h3 className="text-xl font-bold text-white">
          How BenatCode Integrates with SuperProfile & Payhip
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          We conducted an exhaustive technical audit of the public developer endpoints available for both <strong>SuperProfile</strong> and <strong>Payhip</strong>. Below is the honest, verified breakdown of what official APIs support, and how BenatCode delivers the most reliable digital product management workflow.
        </p>
      </div>

      {/* Grid: 2 Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SuperProfile Report */}
        <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold text-xs">
                SP
              </div>
              <div>
                <h4 className="text-base font-bold text-white">SuperProfile</h4>
                <p className="text-[11px] text-slate-400">superprofile.bio · India (UPI / Cards)</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
              Verified Status
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-300">Official API Capabilities:</span>
              <ul className="space-y-1 text-slate-400">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Model Context Protocol (MCP):</strong> SuperProfile provides an official MCP Server endpoint (<code>https://mcp.superprofile.bio/mcp</code>) allowing AI assistants with OAuth to draft payment pages.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Direct REST Product CRUD API:</strong> SuperProfile does <em>not</em> provide an open public HTTP REST API for external webhooks or headless product creation without logging into their dashboard.</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1.5">
              <span className="font-bold text-blue-300">Recommended 2-Step Publishing Workflow:</span>
              <ol className="list-decimal list-inside text-slate-400 space-y-1 pl-1">
                <li>Create payment page in <a href="https://superprofile.bio/app/payment_pages" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">SuperProfile Dashboard</a>.</li>
                <li>Copy the direct payment page URL (e.g. <code>https://superprofile.bio/benatcode/your-item</code>) and save it in BenatCode Admin. It instantly appears on your public storefront!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Payhip Report */}
        <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold text-xs">
                PH
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Payhip</h4>
                <p className="text-[11px] text-slate-400">payhip.com · Global (USD / PayPal / Cards)</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Verified Status
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-300">Official API Capabilities:</span>
              <ul className="space-y-1 text-slate-400">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Coupons & License Keys:</strong> Payhip REST API v2 allows creating discount coupons and verifying software license keys.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Outbound Webhooks:</strong> Payhip sends notification payloads to your server immediately upon completed purchase.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>No Product Creation Endpoints:</strong> Payhip does not expose REST endpoints to create, edit or upload product files programmatically. Products must be created in Payhip dashboard.</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1.5">
              <span className="font-bold text-emerald-300">Recommended 2-Step Publishing Workflow:</span>
              <ol className="list-decimal list-inside text-slate-400 space-y-1 pl-1">
                <li>Create product in <a href="https://payhip.com/products" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Payhip Dashboard</a>.</li>
                <li>Copy the direct product link (e.g. <code>https://payhip.com/b/your-item</code>) and save it in BenatCode Admin. It instantly appears on your public storefront!</li>
              </ol>
            </div>
          </div>
        </div>

      </div>

      {/* BenatCode Value Statement */}
      <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800 text-xs text-slate-300 space-y-1 leading-relaxed">
        <div className="font-bold text-white flex items-center gap-1.5">
          <Workflow className="w-4 h-4 text-blue-400" />
          <span>Why BenatCode Gives You The Best of Both Worlds:</span>
        </div>
        <p className="text-slate-400">
          SuperProfile and Payhip each handle the complex merchant-of-record, international taxes, and payment gateways (UPI in India, PayPal/Stripe abroad). <strong>BenatCode gives you complete independent control over your brand, showcase catalog, pricing display, search, and direct buyer redirection</strong>—with full CRUD management from a single unified dashboard without touching a line of code!
        </p>
      </div>

    </div>
  );
};
