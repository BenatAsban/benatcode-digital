import React, { useState } from 'react';
import { 
  X, 
  Check, 
  AlertCircle, 
  Calendar, 
  Plus, 
  Wallet, 
  ShoppingBag, 
  ArrowUpRight, 
  MessageSquare, 
  Tag, 
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Product } from '../types/product';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface ProductPreviewModalProps {
  product: Product | null;
  onClose: () => void;
  onInquire: (productName: string) => void;
}

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({ product, onClose, onInquire }) => {
  if (!product) return null;

  // Interactive micro-simulation state for DocExpiry India
  const [demoDocs, setDemoDocs] = useState([
    { name: "GST Annual Filing", category: "Tax", expiryDate: "2026-12-31", daysLeft: 61, status: "safe" },
    { name: "Commercial Vehicle Insurance", category: "Transport", expiryDate: "2026-11-15", daysLeft: 15, status: "approaching" },
    { name: "FSSAI Food Hygiene Permit", category: "Food & Safety", expiryDate: "2026-11-05", daysLeft: 5, status: "critical" },
  ]);
  const [newDocName, setNewDocName] = useState("");
  const [newDocCategory, setNewDocCategory] = useState("Tax");
  const [newDocDays, setNewDocDays] = useState("45");

  const handleAddDemoDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    const days = parseInt(newDocDays) || 30;
    const status = days <= 7 ? "critical" : days <= 20 ? "approaching" : "safe";
    setDemoDocs([
      ...demoDocs,
      {
        name: newDocName,
        category: newDocCategory,
        expiryDate: `2026-${(11 + Math.floor(days/30)).toString().padStart(2,'0')}-${((days % 28)+1).toString().padStart(2,'0')}`,
        daysLeft: days,
        status: status
      }
    ]);
    setNewDocName("");
  };

  // Interactive micro-simulation state for Daily Cash Book Ledger
  const [cashTxns, setCashTxns] = useState([
    { type: 'in', description: 'Counter Cash Sales', amount: 8450, time: '10:30 AM' },
    { type: 'in', description: 'UPI Settlement / GPay', amount: 4200, time: '01:15 PM' },
    { type: 'out', description: 'Fresh Produce Vendor', amount: 1600, time: '02:45 PM' },
    { type: 'out', description: 'Electricity & Utility Cash', amount: 850, time: '04:10 PM' },
  ]);
  const [txnDesc, setTxnDesc] = useState("");
  const [txnAmount, setTxnAmount] = useState("");
  const [txnType, setTxnType] = useState<'in' | 'out'>('in');

  const totalIn = cashTxns.filter(t => t.type === 'in').reduce((acc, c) => acc + c.amount, 0);
  const totalOut = cashTxns.filter(t => t.type === 'out').reduce((acc, c) => acc + c.amount, 0);
  const netBalance = totalIn - totalOut;

  const handleAddTxn = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(txnAmount);
    if (!txnDesc.trim() || isNaN(val) || val <= 0) return;
    setCashTxns([
      ...cashTxns,
      { type: txnType, description: txnDesc, amount: val, time: 'Just now' }
    ]);
    setTxnDesc("");
    setTxnAmount("");
  };

  const isSuperProfile = product.platform === 'SuperProfile';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0d1424] border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl shadow-black/90 z-10 p-4 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                isSuperProfile
                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {product.platform}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-blue-400">{product.category}</span>
              <span className="text-slate-500">·</span>
              <span className="text-white font-mono font-bold text-sm">{product.price}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1.5 break-words">
              {product.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 break-words">{product.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Preview */}
        <div className="rounded-xl overflow-hidden aspect-[16/9] border border-slate-800 relative bg-slate-900">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-[#0a0f1d]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono font-bold text-white">
            Official Price: {product.price}
          </div>
        </div>

        {/* Full Narrative Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Product Summary
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {product.fullDescription}
          </p>
        </div>

        {/* Target Audience & Delivery Format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-blue-400 uppercase">Designed Specifically For:</span>
            <p className="text-slate-200">{product.idealFor}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1">
            <span className="text-[11px] font-bold text-emerald-400 uppercase">Access & Delivery:</span>
            <p className="text-slate-200">{product.deliveryFormat}</p>
          </div>
        </div>

        {/* Interactive Feature Demo if DocExpiry */}
        {product.id === 'docexpiry-india' && (
          <div className="p-5 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white">Interactive Preview: Expiry Calculator</span>
              </div>
              <span className="text-[11px] text-slate-400">Test live threshold math</span>
            </div>

            <div className="space-y-2">
              {demoDocs.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-[#0d1424] border border-slate-800 text-xs">
                  <div>
                    <div className="font-semibold text-slate-200">{doc.name}</div>
                    <div className="text-[11px] text-slate-400">{doc.category} · Expiry: {doc.expiryDate}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                      doc.status === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      doc.status === 'approaching' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {doc.daysLeft} days left
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddDemoDoc} className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="e.g. FSSAI License"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                className="col-span-1 sm:col-span-2 px-3 py-1.5 text-xs bg-[#0d1424] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
              <select
                value={newDocDays}
                onChange={(e) => setNewDocDays(e.target.value)}
                className="px-2 py-1.5 text-xs bg-[#0d1424] border border-slate-700 rounded-lg text-slate-200 focus:outline-none"
              >
                <option value="4">Expires in 4 days (Critical)</option>
                <option value="14">Expires in 14 days (Soon)</option>
                <option value="60">Expires in 60 days (Safe)</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Test Add</span>
              </button>
            </form>
          </div>
        )}

        {/* Interactive Feature Demo if CashBook */}
        {product.id === 'cashbook-manager' && (
          <div className="p-5 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white">Interactive Preview: Counter Drawer Reconciliation</span>
              </div>
              <span className="text-[11px] text-slate-400">Real-time ledger math</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-[#0d1424] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-medium">Total Cash In</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">₹{totalIn.toLocaleString()}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0d1424] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-medium">Total Cash Out</div>
                <div className="text-sm font-bold text-rose-400 font-mono">₹{totalOut.toLocaleString()}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0d1424] border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-medium">Net in Drawer</div>
                <div className="text-sm font-bold text-blue-400 font-mono">₹{netBalance.toLocaleString()}</div>
              </div>
            </div>

            <form onSubmit={handleAddTxn} className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
              <select
                value={txnType}
                onChange={(e) => setTxnType(e.target.value as 'in' | 'out')}
                className="px-2 py-1.5 text-xs bg-[#0d1424] border border-slate-700 rounded-lg text-slate-200"
              >
                <option value="in">+ Cash In (Sale)</option>
                <option value="out">- Cash Out (Expense)</option>
              </select>
              <input
                type="text"
                placeholder="Description"
                value={txnDesc}
                onChange={(e) => setTxnDesc(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#0d1424] border border-slate-700 rounded-lg text-white"
              />
              <input
                type="number"
                placeholder="Amount (₹)"
                value={txnAmount}
                onChange={(e) => setTxnAmount(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#0d1424] border border-slate-700 rounded-lg text-white font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Record</span>
              </button>
            </form>
          </div>
        )}

        {/* Feature List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Key Capabilities & Included Items
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {product.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#0a0f1d] border border-slate-800/80">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons: Direct external purchasing redirect */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Direct checkout on {product.platform} · Instant digital access</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <a
              href={`${PERSONAL_DETAILS.whatsappUrl}?text=${encodeURIComponent(`Hi Benat, I want to ask about "${product.name}" listed on BenatCode.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap text-center"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask via WhatsApp</span>
            </a>

            <a
              href={product.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md text-center ${
                isSuperProfile
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Buy Now on {product.platform} ({product.price})</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
