import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Plus, 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Check, 
  AlertCircle, 
  ArrowLeft, 
  Layers, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Upload, 
  RefreshCw, 
  Tag, 
  TrendingUp, 
  Clock, 
  Zap,
  Globe,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Product, SellingPlatform, ProductStatus, StoreSettings } from '../../types/product';
import { productService } from '../../services/productService';
import { authService } from '../../services/authService';
import { ProductForm } from './ProductForm';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { PlatformApiGuide } from './PlatformApiGuide';

interface AdminDashboardProps {
  onReturnToStore: () => void;
  onLogout: () => void;
}

type AdminTab = 'dashboard' | 'all-products' | 'superprofile' | 'payhip' | 'add-product' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToStore, onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);

  // Search & filter states for product table
  const [tableSearch, setTableSearch] = useState('');
  const [tableCategory, setTableCategory] = useState('All');
  const [tableStatus, setTableStatus] = useState<'All' | 'Published' | 'Draft'>('All');

  // Modal / form states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Settings form
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);

  // Load and subscribe to products
  useEffect(() => {
    const unsubscribe = productService.subscribe((updated) => {
      setProducts(updated);
    });

    productService.fetchProducts(true);

    productService.getSettings().then(s => setSettings(s));

    return () => unsubscribe();
  }, []);

  const stats = productService.getAdminStats();

  const showNotice = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // CRUD Handlers
  const handleSaveProduct = async (productData: Partial<Product>) => {
    setIsSaving(true);
    try {
      if (editingProduct) {
        const res = await productService.updateProduct(editingProduct.id, productData);
        if (res.success) {
          showNotice('success', `Product "${productData.name}" updated successfully.`);
          setEditingProduct(null);
          setActiveTab('all-products');
        } else {
          showNotice('error', res.error || 'Failed to update product.');
        }
      } else {
        const res = await productService.createProduct(productData);
        if (res.success) {
          showNotice('success', `New product "${productData.name}" created and saved to catalogue.`);
          setActiveTab('all-products');
        } else {
          showNotice('error', res.error || 'Failed to create product.');
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      const res = await productService.deleteProduct(productToDelete.id);
      if (res.success) {
        showNotice('success', `Product "${productToDelete.name}" removed from BenatCode.`);
        setProductToDelete(null);
      } else {
        showNotice('error', res.error || 'Could not delete product.');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (product: Product) => {
    const res = await productService.toggleProductStatus(product.id);
    if (res.success) {
      showNotice('success', `"${product.name}" status changed to ${res.newStatus}.`);
    }
  };

  // Filter products for the table
  const displayedProducts = products.filter(p => {
    // Tab filter
    if (activeTab === 'superprofile' && p.platform !== 'SuperProfile') return false;
    if (activeTab === 'payhip' && p.platform !== 'Payhip') return false;

    // Status filter
    if (tableStatus !== 'All' && p.status !== tableStatus) return false;

    // Category filter
    if (tableCategory !== 'All' && p.category !== tableCategory) return false;

    // Search query
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchTag = p.tagline.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchTag && !matchCat) return false;
    }

    return true;
  });

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `benatcode-products-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotice('success', 'Catalogue backup downloaded successfully.');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          // Update via local cache
          localStorage.setItem('bc_products_cache_v2', JSON.stringify(imported));
          setProducts(imported);
          showNotice('success', `Restored ${imported.length} products successfully.`);
        }
      } catch {
        showNotice('error', 'Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800 py-3 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-blue-500/20">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base text-white tracking-tight">BenatCode</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-950 text-blue-300 border border-blue-800">
                Admin Console
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Digital Product Management System</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Button to view public website */}
          <button
            onClick={onReturnToStore}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="View public website"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">View Public Store</span>
            <span className="sm:hidden">Store</span>
          </button>

          {/* User badge */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs text-slate-400">
            <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-300 font-bold text-[11px]">
              BA
            </div>
            <span>Benat Asban S</span>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              authService.logout();
              onLogout();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-950/60 hover:bg-rose-950 border border-rose-900/60 rounded-lg transition-colors cursor-pointer"
            title="Log out of admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#0a0f1d] border-b md:border-b-0 md:border-r border-slate-800 p-4 space-y-6 shrink-0">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3">
              Navigation
            </span>

            {/* Nav items */}
            <nav className="space-y-1 pt-1">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setActiveTab('dashboard');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setActiveTab('all-products');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'all-products'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>All Products</span>
                </div>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-300">
                  {stats.totalProducts}
                </span>
              </button>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setActiveTab('superprofile');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'superprofile'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>SuperProfile Products</span>
                </div>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-blue-300">
                  {stats.superProfileProducts}
                </span>
              </button>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setActiveTab('payhip');
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'payhip'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Payhip Products</span>
                </div>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-emerald-300">
                  {stats.payhipProducts}
                </span>
              </button>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setActiveTab('add-product');
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'add-product' && !editingProduct
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add New Product</span>
              </button>
            </nav>
          </div>

          {/* Secondary actions */}
          <div className="pt-4 border-t border-slate-800/80 space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3">
              System
            </span>
            <button
              onClick={() => {
                setEditingProduct(null);
                setActiveTab('settings');
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Platform & API Settings</span>
            </button>
          </div>

          {/* Quick backup button */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <button
              onClick={handleExportBackup}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-[#0d1424] hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Backup Catalogue (JSON)</span>
            </button>

            <a
              href="/benatcode-project.zip"
              download="benatcode-project.zip"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-300 hover:text-white bg-blue-950/50 hover:bg-blue-900/70 border border-blue-800/80 rounded-xl transition-colors cursor-pointer"
              title="Download entire code repository ready for GitHub & Render"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Download Project ZIP</span>
            </a>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl overflow-y-auto">
          
          {/* Top alert notice */}
          {notification && (
            <div className={`mb-6 p-4 rounded-xl flex items-center justify-between gap-3 text-xs shadow-lg ${
              notification.type === 'success'
                ? 'bg-emerald-950/90 border border-emerald-700 text-emerald-200'
                : 'bg-rose-950/90 border border-rose-700 text-rose-200'
            }`}>
              <div className="flex items-center gap-2">
                {notification.type === 'success' ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                <span>{notification.message}</span>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {/* VIEW: ADD OR EDIT PRODUCT */}
          {(activeTab === 'add-product' || editingProduct) && (
            <ProductForm
              initialProduct={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setEditingProduct(null);
                setActiveTab('all-products');
              }}
              isSaving={isSaving}
            />
          )}

          {/* VIEW: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && !editingProduct && (
            <div className="space-y-8">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Product Management Overview
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live catalogue stats, active platform inventory, and recent updates.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('add-product')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Product</span>
                </button>
              </div>

              {/* 5 KPI Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* Total */}
                <div className="p-4 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Total Products
                  </div>
                  <div className="text-2xl font-extrabold text-white font-mono">
                    {stats.totalProducts}
                  </div>
                  <div className="text-[11px] text-slate-500">Across both platforms</div>
                </div>

                {/* SuperProfile */}
                <div className="p-4 rounded-2xl bg-[#0d1424] border border-blue-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">SuperProfile</span>
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white font-mono">
                    {stats.superProfileProducts}
                  </div>
                  <div className="text-[11px] text-blue-300">Indian Market (UPI/INR)</div>
                </div>

                {/* Payhip */}
                <div className="p-4 rounded-2xl bg-[#0d1424] border border-emerald-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Payhip</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white font-mono">
                    {stats.payhipProducts}
                  </div>
                  <div className="text-[11px] text-emerald-300">Global Market (USD/Cards)</div>
                </div>

                {/* Published */}
                <div className="p-4 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Published Live
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                    {stats.publishedProducts}
                  </div>
                  <div className="text-[11px] text-slate-500">Visible on public store</div>
                </div>

                {/* Drafts */}
                <div className="p-4 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Draft Products
                  </div>
                  <div className="text-2xl font-extrabold text-amber-400 font-mono">
                    {stats.draftProducts}
                  </div>
                  <div className="text-[11px] text-slate-500">Hidden from public</div>
                </div>

              </div>

              {/* Quick Platform Management Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* SuperProfile quick card */}
                <div className="p-6 rounded-2xl bg-[#0d1424] border border-blue-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                        SP
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">SuperProfile Integration</h4>
                        <span className="text-[11px] text-slate-400">{settings?.superProfileBaseUrl}</span>
                      </div>
                    </div>
                    <a
                      href="https://superprofile.bio/app/payment_pages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Creator Dashboard</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Products linked to SuperProfile accept payments in INR via UPI, PhonePe, Paytm, Google Pay, and domestic cards.
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setActiveTab('superprofile')}
                      className="px-3.5 py-2 text-xs font-semibold text-blue-300 bg-blue-950/80 hover:bg-blue-900 border border-blue-800/80 rounded-xl transition-colors cursor-pointer"
                    >
                      Manage {stats.superProfileProducts} SuperProfile Items
                    </button>
                  </div>
                </div>

                {/* Payhip quick card */}
                <div className="p-6 rounded-2xl bg-[#0d1424] border border-emerald-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                        PH
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Payhip Integration</h4>
                        <span className="text-[11px] text-slate-400">{settings?.payhipBaseUrl}</span>
                      </div>
                    </div>
                    <a
                      href="https://payhip.com/products"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Payhip Store</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Products linked to Payhip accept payments in USD via PayPal and international credit/debit cards with instant delivery.
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setActiveTab('payhip')}
                      className="px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/80 rounded-xl transition-colors cursor-pointer"
                    >
                      Manage {stats.payhipProducts} Payhip Items
                    </button>
                  </div>
                </div>

              </div>

              {/* Recently Updated Products List */}
              <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Recently Updated Products
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('all-products')}
                    className="text-xs text-blue-400 hover:underline cursor-pointer"
                  >
                    View All {products.length} Products →
                  </button>
                </div>

                <div className="space-y-2">
                  {stats.recentlyUpdated.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-[#0a0f1d] border border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">{p.name}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2">
                            <span className={p.platform === 'SuperProfile' ? 'text-blue-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                              {p.platform}
                            </span>
                            <span>·</span>
                            <span>{p.category}</span>
                            <span>·</span>
                            <span className="font-mono text-slate-300">{p.price}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={p.directUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-blue-400 bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Open External Product Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* VIEW: ALL PRODUCTS / SUPERPROFILE / PAYHIP TABLE */}
          {(activeTab === 'all-products' || activeTab === 'superprofile' || activeTab === 'payhip') && !editingProduct && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    {activeTab === 'superprofile' 
                      ? 'SuperProfile Products' 
                      : activeTab === 'payhip' 
                      ? 'Payhip Products' 
                      : 'All Digital Products'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {displayedProducts.length} products listed in catalogue · Real-time sync with public website.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('add-product')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Table Toolbar */}
              <div className="p-4 rounded-2xl bg-[#0d1424] border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, category, or tagline..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500 font-medium">Status:</span>
                  {(['All', 'Published', 'Draft'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setTableStatus(s)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        tableStatus === s
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-[#0a0f1d] text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Category Filter */}
                <select
                  value={tableCategory}
                  onChange={(e) => setTableCategory(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-slate-300 focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Business & Accounting">Business & Accounting</option>
                  <option value="Compliance & Legal">Compliance & Legal</option>
                  <option value="Productivity & AI">Productivity & AI</option>
                  <option value="Developer & Templates">Developer & Templates</option>
                  <option value="Other Tools">Other Tools</option>
                </select>

              </div>

              {/* Products Table */}
              <div className="bg-[#0d1424] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0a0f1d] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Platform</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">External URL</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {displayedProducts.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-10 text-center text-slate-500">
                            No products match your search or filter criteria.
                          </td>
                        </tr>
                      ) : (
                        displayedProducts.map((product) => {
                          const isSuperProfile = product.platform === 'SuperProfile';
                          return (
                            <tr key={product.id} className="hover:bg-slate-900/40 transition-colors">
                              
                              {/* Product Thumbnail & Name */}
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                                  />
                                  <div className="min-w-0 max-w-xs">
                                    <div className="font-bold text-white truncate text-xs">
                                      {product.name}
                                    </div>
                                    <div className="text-[11px] text-slate-400 truncate">
                                      {product.tagline}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Platform */}
                              <td className="py-3 px-4">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  isSuperProfile
                                    ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                }`}>
                                  {product.platform}
                                </span>
                              </td>

                              {/* Price */}
                              <td className="py-3 px-4 font-mono font-bold text-white">
                                {product.price}
                                {product.originalPrice && (
                                  <span className="text-[10px] text-slate-500 line-through ml-1 font-normal">
                                    {product.originalPrice}
                                  </span>
                                )}
                              </td>

                              {/* Category */}
                              <td className="py-3 px-4 text-slate-300">
                                {product.category}
                              </td>

                              {/* Status Toggle Switch */}
                              <td className="py-3 px-4">
                                <button
                                  type="button"
                                  onClick={() => handleToggleStatus(product)}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                                    product.status === 'Published'
                                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/80'
                                      : 'bg-amber-950/80 text-amber-300 border border-amber-700/80'
                                  }`}
                                  title="Click to toggle Published / Draft"
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'Published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                  <span>{product.status}</span>
                                </button>
                              </td>

                              {/* External URL Preview */}
                              <td className="py-3 px-4 font-mono text-[11px]">
                                <a
                                  href={product.directUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:underline inline-flex items-center gap-1 max-w-[180px] truncate"
                                  title={product.directUrl}
                                >
                                  <span className="truncate">{product.directUrl}</span>
                                  <ExternalLink className="w-3 h-3 shrink-0" />
                                </a>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setEditingProduct(product)}
                                    className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                                    title="Edit Product"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => setProductToDelete(product)}
                                    className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-rose-950 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>

                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* VIEW: SETTINGS & PLATFORM APIS */}
          {activeTab === 'settings' && !editingProduct && (
            <div className="space-y-8">
              
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Platform & API Settings
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage external store configurations, review official API capabilities, and maintain catalogue backups.
                </p>
              </div>

              {/* API Integration Guide Panel */}
              <PlatformApiGuide />

              {/* Store & Contact Settings Form */}
              <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-6 space-y-5">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <span>Store Profile & External Handles</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">
                      SuperProfile Base Store URL
                    </label>
                    <input
                      type="text"
                      value={settings?.superProfileBaseUrl || ''}
                      onChange={(e) => setSettings(settings ? { ...settings, superProfileBaseUrl: e.target.value } : null)}
                      className="w-full px-3.5 py-2 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">
                      Payhip Store Base URL
                    </label>
                    <input
                      type="text"
                      value={settings?.payhipBaseUrl || ''}
                      onChange={(e) => setSettings(settings ? { ...settings, payhipBaseUrl: e.target.value } : null)}
                      className="w-full px-3.5 py-2 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">
                      Support WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={settings?.supportWhatsApp || ''}
                      onChange={(e) => setSettings(settings ? { ...settings, supportWhatsApp: e.target.value } : null)}
                      className="w-full px-3.5 py-2 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">
                      Support Email Address
                    </label>
                    <input
                      type="text"
                      value={settings?.supportEmail || ''}
                      onChange={(e) => setSettings(settings ? { ...settings, supportEmail: e.target.value } : null)}
                      className="w-full px-3.5 py-2 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={async () => {
                      if (!settings) return;
                      setIsUpdatingSettings(true);
                      await productService.updateSettings(settings);
                      setIsUpdatingSettings(false);
                      showNotice('success', 'Platform settings saved successfully.');
                    }}
                    disabled={isUpdatingSettings}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors cursor-pointer"
                  >
                    {isUpdatingSettings ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>

              {/* Backup & Restore Panel */}
              <div className="bg-[#0d1424] rounded-2xl border border-slate-800 p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Catalogue Data Backup & Restoration</span>
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Export a full snapshot of your BenatCode products catalogue as a JSON file, or restore a previously saved backup.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleExportBackup}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                    <span>Download JSON Backup ({products.length} products)</span>
                  </button>

                  <label className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Import JSON Backup</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportBackup}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

            </div>
          )}

        </main>

      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        product={productToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
        isDeleting={isDeleting}
      />

    </div>
  );
};
