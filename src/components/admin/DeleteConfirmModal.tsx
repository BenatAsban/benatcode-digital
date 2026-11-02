import React from 'react';
import { AlertTriangle, Trash2, X, ShieldAlert, Check } from 'lucide-react';
import { Product } from '../../types/product';

interface DeleteConfirmModalProps {
  product: Product | null;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  product,
  onConfirm,
  onCancel,
  isDeleting
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#0d1424] border border-rose-900/60 rounded-2xl max-w-lg w-full shadow-2xl shadow-black/90 z-10 p-4 sm:p-7 space-y-5">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Confirm Product Removal
              </h3>
              <p className="text-xs text-rose-300">
                Are you sure you want to delete this product?
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 rounded-lg cursor-pointer transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Details Box */}
        <div className="p-3.5 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white truncate mr-2">{product.name}</span>
            <span className="font-mono text-blue-400 shrink-0">{product.price}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Platform: <strong className="text-slate-300">{product.platform}</strong> · Status: <strong className="text-slate-300">{product.status}</strong>
          </div>
          <div className="text-[11px] font-mono text-slate-500 truncate">
            {product.directUrl}
          </div>
        </div>

        {/* Important Clarification on Local vs External Deletion */}
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 space-y-1.5 leading-relaxed">
          <div className="font-bold flex items-center gap-1.5 text-amber-300">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Catalogue Scope Notice:</span>
          </div>
          <p className="text-[11px] text-amber-100/90">
            This action removes <strong>{product.name}</strong> from your <strong>BenatCode public catalogue and database</strong> immediately.
          </p>
          <p className="text-[11px] text-amber-300/80">
            Your live listing on <strong>{product.platform}</strong> remains active on their servers unless you manually delete or archive it from your {product.platform} dashboard.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer text-center"
          >
            Keep Product
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 rounded-xl transition-all shadow-md shadow-rose-900/30 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Removing...' : 'Yes, Remove from BenatCode'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
