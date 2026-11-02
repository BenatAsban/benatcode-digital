import { Product, AdminStats, StoreSettings } from '../types/product';
import { authService } from './authService';
import { DIGITAL_PRODUCTS as INITIAL_FALLBACK_PRODUCTS } from '../data/portfolioData';

const STORAGE_CACHE_KEY = 'bc_products_cache_v2';
const SETTINGS_CACHE_KEY = 'bc_settings_cache_v2';

type ProductListener = (products: Product[]) => void;

class ProductService {
  private products: Product[] = [];
  private listeners: Set<ProductListener> = new Set();
  private isInitialized = false;

  constructor() {
    this.loadFromCache();
  }

  private loadFromCache() {
    try {
      const cached = localStorage.getItem(STORAGE_CACHE_KEY);
      if (cached) {
        this.products = JSON.parse(cached);
      } else {
        // Initialize with initial products mapped to type
        this.products = INITIAL_FALLBACK_PRODUCTS.map(p => ({
          ...p,
          productType: 'Web Tool',
          status: 'Published',
          features: p.features || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })) as Product[];
        this.saveToCache();
      }
    } catch (e) {
      this.products = INITIAL_FALLBACK_PRODUCTS as any;
    }
  }

  private saveToCache() {
    try {
      localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(this.products));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  private notify() {
    this.listeners.forEach(fn => fn([...this.products]));
  }

  public subscribe(listener: ProductListener): () => void {
    this.listeners.add(listener);
    // Send immediate state
    listener([...this.products]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Fetch from backend API and sync with cache
  public async fetchProducts(forceRefresh = false): Promise<Product[]> {
    const token = authService.getToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch('/api/products', { headers });
      if (res.ok) {
        const remoteProducts: Product[] = await res.json();
        if (Array.isArray(remoteProducts) && remoteProducts.length > 0) {
          this.products = remoteProducts;
          this.saveToCache();
          this.notify();
          this.isInitialized = true;
          return this.products;
        }
      }
    } catch (err) {
      // Offline fallback: Use current cached state
      console.info('Backend unavailable; using local persistent store.');
    }

    this.isInitialized = true;
    return this.products;
  }

  public getProductsSync(includeDrafts = false): Product[] {
    if (includeDrafts) {
      return this.products;
    }
    return this.products.filter(p => p.status === 'Published');
  }

  public async getProductById(id: string): Promise<Product | null> {
    const local = this.products.find(p => p.id === id);
    if (local) return local;

    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    return null;
  }

  public async createProduct(productData: Partial<Product>): Promise<{ success: boolean; product?: Product; error?: string }> {
    const token = authService.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers,
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        const result = await res.json();
        const created = result.product;
        // Update local memory and notify
        this.products = [created, ...this.products.filter(p => p.id !== created.id)];
        this.saveToCache();
        this.notify();
        return { success: true, product: created };
      } else {
        const err = await res.json().catch(() => ({ error: 'Failed to create product' }));
        return { success: false, error: err.error || 'Server error creating product' };
      }
    } catch (networkErr) {
      // Fallback for static Netlify deployment
      const baseId = (productData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const id = `${baseId}-${Date.now().toString(36)}`;
      const now = new Date().toISOString();

      const newProduct: Product = {
        id,
        name: productData.name || 'Untitled Product',
        tagline: productData.tagline || '',
        shortDescription: productData.shortDescription || '',
        fullDescription: productData.fullDescription || (productData.shortDescription || ''),
        category: productData.category || 'Business & Accounting',
        platform: productData.platform || 'SuperProfile',
        price: productData.price || (productData.platform === 'Payhip' ? '$9.00' : '₹399'),
        originalPrice: productData.originalPrice || '',
        currency: productData.currency || (productData.platform === 'Payhip' ? 'USD' : 'INR'),
        directUrl: productData.directUrl || '',
        image: productData.image || '/src/assets/images/product_cashbook_manager_1793445362751.jpg',
        productType: productData.productType || 'Web Tool',
        status: productData.status || 'Published',
        features: productData.features || [],
        idealFor: productData.idealFor || 'Businesses and creators',
        deliveryFormat: productData.deliveryFormat || 'Instant Web Access & Updates',
        isPopular: !!productData.isPopular,
        createdAt: now,
        updatedAt: now
      };

      this.products.unshift(newProduct);
      this.saveToCache();
      this.notify();
      return { success: true, product: newProduct };
    }
  }

  public async updateProduct(id: string, updateData: Partial<Product>): Promise<{ success: boolean; product?: Product; error?: string }> {
    const token = authService.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData)
      });

      if (res.ok) {
        const result = await res.json();
        const updated = result.product;
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
          this.products[index] = updated;
        } else {
          this.products.unshift(updated);
        }
        this.saveToCache();
        this.notify();
        return { success: true, product: updated };
      } else {
        const err = await res.json().catch(() => ({ error: 'Failed to update product' }));
        return { success: false, error: err.error || 'Server error updating product' };
      }
    } catch (networkErr) {
      // Local cache fallback
      const index = this.products.findIndex(p => p.id === id);
      if (index === -1) {
        return { success: false, error: 'Product not found in catalogue' };
      }

      const updated: Product = {
        ...this.products[index],
        ...updateData,
        id: this.products[index].id,
        updatedAt: new Date().toISOString()
      };

      this.products[index] = updated;
      this.saveToCache();
      this.notify();
      return { success: true, product: updated };
    }
  }

  public async deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
    const token = authService.getToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers
      });

      if (res.ok) {
        this.products = this.products.filter(p => p.id !== id);
        this.saveToCache();
        this.notify();
        return { success: true };
      } else {
        const err = await res.json().catch(() => ({ error: 'Failed to delete product' }));
        return { success: false, error: err.error || 'Server error deleting product' };
      }
    } catch (networkErr) {
      // Local fallback
      this.products = this.products.filter(p => p.id !== id);
      this.saveToCache();
      this.notify();
      return { success: true };
    }
  }

  public async toggleProductStatus(id: string): Promise<{ success: boolean; newStatus?: 'Published' | 'Draft' }> {
    const target = this.products.find(p => p.id === id);
    if (!target) return { success: false };

    const newStatus = target.status === 'Published' ? 'Draft' : 'Published';
    const res = await this.updateProduct(id, { status: newStatus });
    return { success: res.success, newStatus };
  }

  public getAdminStats(): AdminStats {
    const total = this.products.length;
    const superProfile = this.products.filter(p => p.platform === 'SuperProfile').length;
    const payhip = this.products.filter(p => p.platform === 'Payhip').length;
    const published = this.products.filter(p => p.status === 'Published').length;
    const draft = this.products.filter(p => p.status === 'Draft').length;

    // Sort by updatedAt descending
    const recentlyUpdated = [...this.products]
      .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime())
      .slice(0, 5);

    return {
      totalProducts: total,
      superProfileProducts: superProfile,
      payhipProducts: payhip,
      publishedProducts: published,
      draftProducts: draft,
      recentlyUpdated
    };
  }

  public async getSettings(): Promise<StoreSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        return await res.json();
      }
    } catch {}

    const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }

    return {
      storeName: 'BenatCode Digital Store',
      superProfileHandle: 'benatcode',
      superProfileBaseUrl: 'https://superprofile.bio/benatcode',
      payhipHandle: 'benatcode',
      payhipBaseUrl: 'https://payhip.com/benatcode',
      supportWhatsApp: '+91 84283 41029',
      supportEmail: 'benatasban@gmail.com',
      adminUsername: 'admin',
      apiIntegrations: {
        superProfile: {
          status: 'Manual Link Integration',
          officialApiSupport: false,
          mcpServerUrl: 'https://mcp.superprofile.bio/mcp',
          note: 'SuperProfile provides AI-based Model Context Protocol (MCP) and dashboard page generation (/app/payment_pages), but no direct public REST CRUD API for arbitrary product creation.'
        },
        payhip: {
          status: 'Manual Link Integration',
          officialApiSupport: 'Limited (Coupons & License Keys only)',
          note: 'Payhip REST API v2 exclusively supports Coupon and License Key management. Direct product creation endpoints are not exposed in their public API and must be published via Payhip dashboard (/products).'
        }
      }
    };
  }

  public async updateSettings(settings: Partial<StoreSettings>): Promise<boolean> {
    const token = authService.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers,
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(data.settings));
        return true;
      }
    } catch {}

    // Fallback
    const current = await this.getSettings();
    const merged = { ...current, ...settings, updatedAt: new Date().toISOString() };
    localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(merged));
    return true;
  }
}

export const productService = new ProductService();
