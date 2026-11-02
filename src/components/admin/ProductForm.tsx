import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  Image as ImageIcon, 
  Check, 
  AlertCircle, 
  Tag, 
  ShoppingBag, 
  HelpCircle,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import { Product, ProductCategory, SellingPlatform, ProductStatus, ProductType } from '../../types/product';

interface ProductFormProps {
  initialProduct?: Product | null;
  onSave: (productData: Partial<Product>) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  onSave,
  onCancel,
  isSaving
}) => {
  const isEditing = !!initialProduct;

  // Form fields
  const [name, setName] = useState(initialProduct?.name || '');
  const [tagline, setTagline] = useState(initialProduct?.tagline || '');
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialProduct?.fullDescription || '');
  const [category, setCategory] = useState<ProductCategory>(initialProduct?.category || 'Business & Accounting');
  const [platform, setPlatform] = useState<SellingPlatform>(initialProduct?.platform || 'SuperProfile');
  const [price, setPrice] = useState(initialProduct?.price || '₹499');
  const [originalPrice, setOriginalPrice] = useState(initialProduct?.originalPrice || '');
  const [currency, setCurrency] = useState<'INR' | 'USD'>(initialProduct?.currency || 'INR');
  const [directUrl, setDirectUrl] = useState(initialProduct?.directUrl || '');
  const [image, setImage] = useState(initialProduct?.image || '/src/assets/images/product_docexpiry_india_1793445362822.jpg');
  const [productType, setProductType] = useState<ProductType>(initialProduct?.productType || 'Web Tool');
  const [status, setStatus] = useState<ProductStatus>(initialProduct?.status || 'Published');
  const [idealFor, setIdealFor] = useState(initialProduct?.idealFor || 'Business owners, entrepreneurs and freelancers');
  const [deliveryFormat, setDeliveryFormat] = useState(initialProduct?.deliveryFormat || 'Instant Web Access & Updates');
  const [isPopular, setIsPopular] = useState(initialProduct?.isPopular || false);

  // Features tag builder
  const [features, setFeatures] = useState<string[]>(
    initialProduct?.features && initialProduct.features.length > 0
      ? initialProduct.features
      : ['Immediate digital access', 'Lifetime feature updates']
  );
  const [newFeatureText, setNewFeatureText] = useState('');

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Preset image library choices for easy picking
  const presetImages = [
    { label: 'DocExpiry & Compliance UI', path: '/src/assets/images/product_docexpiry_india_1793445362822.jpg' },
    { label: 'Cash Book & Ledger UI', path: '/src/assets/images/product_cashbook_manager_1793445362751.jpg' },
    { label: 'Security & Tech Vault UI', path: '/src/assets/images/project_password_vault_1793445363087.jpg' },
    { label: 'Developer Code & Tools UI', path: '/src/assets/images/hero_developer_visual_1793445360772.jpg' },
  ];

  // Auto-switch currency defaults when platform toggles (only if user hasn't explicitly changed it)
  const handlePlatformChange = (newPlatform: SellingPlatform) => {
    setPlatform(newPlatform);
    if (!isEditing) {
      if (newPlatform === 'SuperProfile') {
        setCurrency('INR');
        if (price.startsWith('$')) setPrice('₹499');
      } else {
        setCurrency('USD');
        if (price.startsWith('₹')) setPrice('$12.00');
      }
    }
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeatureText.trim()) return;
    setFeatures([...features, newFeatureText.trim()]);
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Product name is required';
    if (!directUrl.trim()) {
      errs.directUrl = 'Direct product URL is required';
    } else {
      try {
        new URL(directUrl);
      } catch {
        errs.directUrl = 'Please provide a valid URL (e.g. https://superprofile.bio/... or https://payhip.com/b/...)';
      }
    }
    if (!price.trim()) errs.price = 'Price is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSave({
      name: name.trim(),
      tagline: tagline.trim(),
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim() || shortDescription.trim(),
      category,
      platform,
      price: price.trim(),
      originalPrice: originalPrice.trim() || undefined,
      currency,
      directUrl: directUrl.trim(),
      image,
      productType,
      status,
      features,
      idealFor: idealFor.trim(),
      deliveryFormat: deliveryFormat.trim(),
      isPopular
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {isEditing ? `Edit Product: ${initialProduct?.name}` : 'Create New Digital Product'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure product metadata, pricing, platform destination, and public visibility.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <Check className="w-4 h-4 shrink-0" />
            <span>{isSaving ? 'Saving...' : isEditing ? 'Update Product' : 'Publish Product'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Main Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card: Basic Identity */}
          <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-400" />
              <span>1. Product Identity & Category</span>
            </h3>

            <div className="space-y-4">
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Product Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Daily Sales & Cash Book Ledger"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#0a0f1d] border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                  }`}
                />
                {errors.name && (
                  <span className="text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Short Tagline / Hook
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Ultra-fast daily accounting & cash reconciliation for retail counters"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Business & Accounting">Business & Accounting</option>
                    <option value="Compliance & Legal">Compliance & Legal</option>
                    <option value="Productivity & AI">Productivity & AI</option>
                    <option value="Developer & Templates">Developer & Templates</option>
                    <option value="Other Tools">Other Tools</option>
                  </select>
                </div>

                {/* Product Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Product Format Type
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value as ProductType)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Web Tool">Web Tool</option>
                    <option value="Digital Download">Digital Download</option>
                    <option value="Template / Starter Kit">Template / Starter Kit</option>
                    <option value="Checklist / Guide">Checklist / Guide</option>
                    <option value="Consulting / Custom">Consulting / Custom</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Card Short Description (Shown in marketplace cards)
                </label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="1-2 sentences highlighting the primary problem solved..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Full Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Full Description (Shown in detail modal)
                </label>
                <textarea
                  rows={4}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Detailed breakdown of how the product works, who it helps, and what is included..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Card: Features Builder */}
          <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>2. Feature Bullets & Key Capabilities</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500 font-normal">
                {features.length} features
              </span>
            </h3>

            {/* Existing Features List */}
            <div className="space-y-2">
              {features.map((feat, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a0f1d] border border-slate-800 text-xs text-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove feature"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add feature input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature(e);
                  }
                }}
                placeholder="Add a new feature bullet (e.g. 1-tap WhatsApp settlement export)..."
                className="flex-1 px-3.5 py-2 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Card: Target Users & Access */}
          <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              3. Target Audience & Delivery Format
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Ideal For / Target Audience
                </label>
                <input
                  type="text"
                  value={idealFor}
                  onChange={(e) => setIdealFor(e.target.value)}
                  placeholder="e.g. Small shopkeepers, bakeries, cafes"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Delivery / License Format
                </label>
                <input
                  type="text"
                  value={deliveryFormat}
                  onChange={(e) => setDeliveryFormat(e.target.value)}
                  placeholder="e.g. Instant Web Tool & Lifetime Updates"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Settings: Platform, Price & Link (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Platform & Direct Link Card */}
          <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-400" />
              <span>Platform & Buy Link</span>
            </h3>

            {/* Platform Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Selling Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handlePlatformChange('SuperProfile')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    platform === 'SuperProfile'
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-[#0a0f1d] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-sm">SuperProfile</div>
                  <div className="text-[10px] text-blue-300 font-normal mt-0.5">India · UPI / INR</div>
                </button>

                <button
                  type="button"
                  onClick={() => handlePlatformChange('Payhip')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    platform === 'Payhip'
                      ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-md'
                      : 'bg-[#0a0f1d] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-sm">Payhip</div>
                  <div className="text-[10px] text-emerald-300 font-normal mt-0.5">Global · Cards / USD</div>
                </button>
              </div>
            </div>

            {/* Direct Product URL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  Exact Product Purchasing URL <span className="text-rose-400">*</span>
                </label>
                {directUrl && (
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                required
                value={directUrl}
                onChange={(e) => {
                  setDirectUrl(e.target.value);
                  if (errors.directUrl) setErrors({ ...errors, directUrl: '' });
                }}
                placeholder={
                  platform === 'SuperProfile'
                    ? 'https://superprofile.bio/benatcode/your-product'
                    : 'https://payhip.com/b/your-product'
                }
                className={`w-full px-3.5 py-2.5 text-xs bg-[#0a0f1d] border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.directUrl ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.directUrl && (
                <span className="text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.directUrl}
                </span>
              )}
              <p className="text-[11px] text-slate-500 leading-normal">
                {platform === 'SuperProfile'
                  ? 'Paste the payment page URL generated from your SuperProfile dashboard (/app/payment_pages).'
                  : 'Paste the direct product link from your Payhip dashboard (/products).'}
              </p>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Selling Price <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={platform === 'SuperProfile' ? '₹499' : '$12.00'}
                  className="w-full px-3.5 py-2 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Original Price
                </label>
                <input
                  type="text"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder={platform === 'SuperProfile' ? '₹999' : '$24.00'}
                  className="w-full px-3.5 py-2 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status & Highlights */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Catalogue Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus('Published')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all text-center cursor-pointer ${
                      status === 'Published'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-[#0a0f1d] border-slate-800 text-slate-400'
                    }`}
                  >
                    Published (Live)
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('Draft')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all text-center cursor-pointer ${
                      status === 'Draft'
                        ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                        : 'bg-[#0a0f1d] border-slate-800 text-slate-400'
                    }`}
                  >
                    Draft (Hidden)
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0"
                />
                <span>Mark as Featured / Popular Product</span>
              </label>
            </div>

          </div>

          {/* Thumbnail / Image Card */}
          <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span>Product Thumbnail</span>
            </h3>

            {/* Current Image Preview */}
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative">
              <img
                src={image}
                alt="Product preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white font-mono">
                Preview
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Image Path or Custom URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/src/assets/images/... or https://..."
                className="w-full px-3 py-2 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold text-slate-400">
                Or select high-res preset:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {presetImages.map((p) => (
                  <button
                    key={p.path}
                    type="button"
                    onClick={() => setImage(p.path)}
                    className={`p-2 rounded-lg border text-[11px] text-left truncate transition-colors cursor-pointer ${
                      image === p.path
                        ? 'bg-blue-950 border-blue-500 text-blue-200'
                        : 'bg-[#0a0f1d] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </form>
  );
};
