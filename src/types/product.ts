export type SellingPlatform = 'SuperProfile' | 'Payhip';
export type ProductStatus = 'Published' | 'Draft';
export type ProductCategory = 
  | 'Business & Accounting' 
  | 'Compliance & Legal' 
  | 'Productivity & AI' 
  | 'Developer & Templates'
  | 'Other Tools';

export type ProductType = 
  | 'Web Tool' 
  | 'Digital Download' 
  | 'Template / Starter Kit' 
  | 'Checklist / Guide'
  | 'Consulting / Custom';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: ProductCategory;
  platform: SellingPlatform;
  price: string;
  originalPrice?: string;
  currency: 'INR' | 'USD';
  directUrl: string;
  image: string;
  productType: ProductType;
  status: ProductStatus;
  features: string[];
  idealFor: string;
  deliveryFormat: string;
  isPopular?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminStats {
  totalProducts: number;
  superProfileProducts: number;
  payhipProducts: number;
  publishedProducts: number;
  draftProducts: number;
  recentlyUpdated: Product[];
}

export interface StoreSettings {
  storeName: string;
  superProfileHandle: string;
  superProfileBaseUrl: string;
  payhipHandle: string;
  payhipBaseUrl: string;
  supportWhatsApp: string;
  supportEmail: string;
  adminUsername: string;
  apiIntegrations: {
    superProfile: {
      status: string;
      officialApiSupport: boolean;
      mcpServerUrl: string;
      note: string;
    };
    payhip: {
      status: string;
      officialApiSupport: string | boolean;
      note: string;
    };
  };
  updatedAt?: string;
}
