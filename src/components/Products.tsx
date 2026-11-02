import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ExternalLink, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Tag, 
  Filter, 
  ArrowUpRight, 
  ArrowRight,
  Eye, 
  ShieldCheck, 
  Layers, 
  Info,
  HelpCircle,
  Zap,
  Lock
} from 'lucide-react';
import { Product, ProductCategory, SellingPlatform } from '../types/product';
import { productService } from '../services/productService';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface ProductsProps {
  onOpenPreview: (product: Product) => void;
  activePlatformFilter?: 'All' | 'SuperProfile' | 'Payhip';
  onPlatformFilterChange?: (platform: 'All' | 'SuperProfile' | 'Payhip') => void;
  onOpenAdmin?: () => void;
}

export const Products: React.FC<ProductsProps> = ({ 
  onOpenPreview, 
  activePlatformFilter = 'All',
  onPlatformFilterChange,
  onOpenAdmin
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [platformFilter, setPlatformFilter] = useState<'All' | 'SuperProfile' | 'Payhip'>(activePlatformFilter);

  // Subscribe to real-time product updates from database
  useEffect(() => {
    const unsubscribe = productService.subscribe((updatedList) => {
      // In the public store, display published products only
      const publishedOnly = updatedList.filter(p => p.status === 'Published');
      setProducts(publishedOnly);
    });

    productService.fetchProducts();

    return () => unsubscribe();
  }, []);

  // Sync if parent changes activePlatformFilter
  useEffect(() => {
    if (activePlatformFilter) {
      setPlatformFilter(activePlatformFilter);
    }
  }, [activePlatformFilter]);

  const handleSetPlatform = (p: 'All' | 'SuperProfile' | 'Payhip') => {
    setPlatformFilter(p);
    if (onPlatformFilterChange) {
      onPlatformFilterChange(p);
    }
  };

  const categories = [
    'All',
    'Business & Accounting',
    'Compliance & Legal',
    'Productivity & AI',
    'Developer & Templates',
    'Other Tools'
  ];

  // Filter products by platform, category, and search query
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Platform match
      if (platformFilter !== 'All' && product.platform !== platformFilter) {
        return false;
      }
      // Category match
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesTag = product.tagline.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [products, platformFilter, selectedCategory, searchQuery]);

  const superProfileCount = products.filter(p => p.platform === 'SuperProfile').length;
  const payhipCount = products.filter(p => p.platform === 'Payhip').length;

  return (
    <section id="products" className="py-20 md:py-28 bg-[#0a0f1d] relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              <ShoppingBag className="w-4 h-4 text-blue-400" />
              <span>BenatCode Digital Store</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              All Digital Products & Software Solutions
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Discover and purchase self-contained digital products, business tools, and software templates built by Benat Asban S. Every product button redirects directly to its official purchasing page on SuperProfile or Payhip.
            </p>
          </div>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-[#0d1424] hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer shrink-0 self-start md:self-auto"
              title="Manage products in Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin Management</span>
            </button>
          )}
        </div>

        {/* Platform Selector Tabs: Anchor for #superprofile-products and #payhip-products */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 w-full max-w-full">
          
          {/* Platform Segmented Control - Mobile scrollable without stretching viewport */}
          <div className="w-full sm:w-auto overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#0d1424] rounded-xl border border-slate-800 min-w-max">
              <button
                onClick={() => handleSetPlatform('All')}
                className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  platformFilter === 'All'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                All Products ({products.length})
              </button>

              <button
                id="superprofile-products"
                onClick={() => handleSetPlatform('SuperProfile')}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  platformFilter === 'SuperProfile'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <span>SuperProfile Store ({superProfileCount})</span>
              </button>

              <button
                id="payhip-products"
                onClick={() => handleSetPlatform('Payhip')}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  platformFilter === 'Payhip'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>Payhip Store ({payhipCount})</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#0d1424] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 my-6 max-w-full">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-blue-400 border border-blue-500/50 shadow-sm'
                  : 'bg-[#0d1424] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0d1424] border border-slate-800 space-y-3">
            <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-base font-bold text-white">No products found matching your filters</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search terms or reset category and platform filters to explore the complete catalogue.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPlatformFilter('All');
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product: Product) => {
              const isSuperProfile = product.platform === 'SuperProfile';

              return (
                <div
                  key={product.id}
                  className="bg-[#0d1424] rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-950/20 transition-all duration-300 group"
                >
                  <div>
                    {/* Thumbnail container */}
                    <div 
                      className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-slate-800 cursor-pointer"
                      onClick={() => onOpenPreview(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent opacity-70" />
                      
                      {/* Platform label (SuperProfile or Payhip) */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide backdrop-blur-md shadow-md ${
                          isSuperProfile
                            ? 'bg-blue-950/90 text-blue-300 border border-blue-700/80'
                            : 'bg-emerald-950/90 text-emerald-300 border border-emerald-700/80'
                        }`}>
                          {product.platform}
                        </span>
                      </div>

                      {/* Price Badge with Optional Original Price */}
                      <div className="absolute top-3 right-3 bg-[#0a0f1d]/90 backdrop-blur-md px-3 py-1 rounded-md border border-slate-700 text-xs font-mono font-bold text-white shadow-md flex items-center gap-1.5">
                        <span>{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-slate-500 line-through font-normal">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Tagline overlay */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-xs font-medium text-slate-300 block line-clamp-1">
                          {product.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                      
                      {/* Category metadata */}
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="text-blue-400 font-medium">{product.category}</span>
                        <span className="text-[11px] text-slate-500">{product.deliveryFormat}</span>
                      </div>

                      {/* Product Name */}
                      <h3 
                        onClick={() => onOpenPreview(product)}
                        className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors cursor-pointer leading-snug break-words"
                      >
                        {product.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>

                      {/* Key features bullets */}
                      <div className="space-y-1.5 pt-1 text-xs text-slate-300">
                        {product.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-slate-300">
                            <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Card Actions: Buy Now & Details */}
                  <div className="p-4 sm:p-6 pt-0 mt-2 space-y-2.5">
                    
                    {/* Exact Redirection CTA: Open specific product page in new tab */}
                    <a
                      href={product.directUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-bold rounded-xl transition-all shadow-md group-hover:shadow-lg cursor-pointer ${
                        isSuperProfile
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25 hover:shadow-blue-600/40'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 hover:shadow-emerald-600/40'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Buy on {product.platform} ({product.price})</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>

                    {/* Preview / Full Specs */}
                    <button
                      onClick={() => onOpenPreview(product)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-[#0a0f1d] hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">View Specs & Demo</span>
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Platform Guidance Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0d1424] border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-[#0a0f1d] border border-blue-900/40 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <h4 className="text-sm font-bold text-white">SuperProfile Products (India / UPI)</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ideal for Indian clients and entrepreneurs. Supports instant checkout via Google Pay, PhonePe, Paytm, UPI, Netbanking, and domestic credit/debit cards in INR (₹).
            </p>
            <div className="pt-1">
              <button
                onClick={() => handleSetPlatform('SuperProfile')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Filter SuperProfile products ({superProfileCount})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0f1d] border border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h4 className="text-sm font-bold text-white">Payhip Products (Global / USD)</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ideal for international developers and businesses worldwide. Supports instant automated digital delivery, PayPal, Visa, Mastercard, and global debit cards in USD ($).
            </p>
            <div className="pt-1">
              <button
                onClick={() => handleSetPlatform('Payhip')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Filter Payhip products ({payhipCount})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
