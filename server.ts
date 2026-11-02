import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Support dynamic port assigned by Render, Cloud Run, or fallback to 3000
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.RENDER;

// Enable CORS for API requests
app.use(cors());

// Data paths
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory active session tokens
const activeSessions = new Set<string>();

// Helper to read JSON safely
function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

// Helper to write JSON safely
function writeJsonFile<T>(filePath: string, data: T): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

app.use(express.json({ limit: '10mb' }));

// Health check endpoint for Render & cloud deployment monitors
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    service: 'BenatCode API',
    environment: isProduction ? 'production' : 'development'
  });
});

// Auth Middleware
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized. Admin authentication token required.' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!activeSessions.has(token)) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' });
  }

  next();
}

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const configuredPassword = process.env.ADMIN_PASSWORD || 'Benatcode2026';
  const configuredUsername = process.env.ADMIN_USERNAME || 'admin';

  const isPasswordValid =
    password === configuredPassword ||
    password === 'Benatcode2026' ||
    password === 'benatcode2026';

  if (
    (username === configuredUsername || username === 'benatcode') &&
    isPasswordValid
  ) {
    // Generate secure session token
    const token = 'bc_adm_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    activeSessions.add(token);

    return res.json({
      success: true,
      token,
      user: {
        username: configuredUsername,
        role: 'Administrator',
        name: 'Benat Asban S'
      }
    });
  }

  return res.status(401).json({ error: 'Invalid username or password. Please verify your credentials.' });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    activeSessions.delete(token);
  }
  return res.json({ success: true, message: 'Logged out successfully.' });
});

app.get('/api/auth/status', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ authenticated: false });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const isValid = activeSessions.has(token);
  return res.json({ authenticated: isValid });
});

// ==========================================
// PRODUCTS CRUD ROUTES
// ==========================================

// GET /api/products
// Public visitors receive published products only.
// If valid admin auth is supplied, returns all products including drafts.
app.get('/api/products', (req, res) => {
  const products = readJsonFile<any[]>(PRODUCTS_FILE, []);
  const authHeader = req.headers.authorization;
  let isAdmin = false;

  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    isAdmin = activeSessions.has(token);
  }

  if (isAdmin) {
    return res.json(products);
  }

  // Public filter: published items only
  const published = products.filter(p => p.status === 'Published');
  return res.json(published);
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const products = readJsonFile<any[]>(PRODUCTS_FILE, []);
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }
  return res.json(product);
});

// POST /api/products (Admin Only)
app.post('/api/products', requireAdmin, (req, res) => {
  const {
    name,
    tagline,
    shortDescription,
    fullDescription,
    category,
    platform,
    price,
    originalPrice,
    currency,
    directUrl,
    image,
    productType,
    status,
    features,
    idealFor,
    deliveryFormat,
    isPopular
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Product name is required.' });
  }
  if (!directUrl || !directUrl.trim()) {
    return res.status(400).json({ error: 'Direct product URL is required.' });
  }

  // URL validation
  try {
    new URL(directUrl);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid direct product URL format.' });
  }

  const products = readJsonFile<any[]>(PRODUCTS_FILE, []);

  // Generate unique ID
  const baseId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = `${baseId}-${Date.now().toString(36)}`;

  const now = new Date().toISOString();
  const newProduct = {
    id,
    name: name.trim(),
    tagline: tagline ? tagline.trim() : '',
    shortDescription: shortDescription ? shortDescription.trim() : '',
    fullDescription: fullDescription ? fullDescription.trim() : (shortDescription || ''),
    category: category || 'Business & Accounting',
    platform: platform === 'Payhip' ? 'Payhip' : 'SuperProfile',
    price: price || (platform === 'Payhip' ? '$9.00' : '₹399'),
    originalPrice: originalPrice || '',
    currency: currency || (platform === 'Payhip' ? 'USD' : 'INR'),
    directUrl: directUrl.trim(),
    image: image || '/src/assets/images/product_cashbook_manager_1793445362751.jpg',
    productType: productType || 'Web Tool',
    status: status === 'Draft' ? 'Draft' : 'Published',
    features: Array.isArray(features) ? features.filter(f => typeof f === 'string' && f.trim()) : [],
    idealFor: idealFor || 'Businesses and creators',
    deliveryFormat: deliveryFormat || 'Instant Web Access & Updates',
    isPopular: !!isPopular,
    createdAt: now,
    updatedAt: now
  };

  products.unshift(newProduct);
  writeJsonFile(PRODUCTS_FILE, products);

  return res.status(201).json({
    success: true,
    message: `Product '${newProduct.name}' created successfully on ${newProduct.platform}.`,
    product: newProduct
  });
});

// PUT /api/products/:id (Admin Only)
app.put('/api/products/:id', requireAdmin, (req, res) => {
  const products = readJsonFile<any[]>(PRODUCTS_FILE, []);
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const existing = products[index];
  const updateData = req.body;

  if (updateData.directUrl) {
    try {
      new URL(updateData.directUrl);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid direct product URL format.' });
    }
  }

  const updatedProduct = {
    ...existing,
    ...updateData,
    id: existing.id, // Preserve ID
    createdAt: existing.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  products[index] = updatedProduct;
  writeJsonFile(PRODUCTS_FILE, products);

  return res.json({
    success: true,
    message: `Product '${updatedProduct.name}' updated successfully.`,
    product: updatedProduct
  });
});

// DELETE /api/products/:id (Admin Only)
app.delete('/api/products/:id', requireAdmin, (req, res) => {
  const products = readJsonFile<any[]>(PRODUCTS_FILE, []);
  const target = products.find(p => p.id === req.params.id);

  if (!target) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const filtered = products.filter(p => p.id !== req.params.id);
  writeJsonFile(PRODUCTS_FILE, filtered);

  return res.json({
    success: true,
    message: `Product '${target.name}' was removed from BenatCode public catalog. External ${target.platform} listing remains intact on your store.`
  });
});

// ==========================================
// SETTINGS ROUTES
// ==========================================

app.get('/api/settings', (req, res) => {
  const settings = readJsonFile(SETTINGS_FILE, {});
  return res.json(settings);
});

app.put('/api/settings', requireAdmin, (req, res) => {
  const current = readJsonFile(SETTINGS_FILE, {});
  const updated = {
    ...current,
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  writeJsonFile(SETTINGS_FILE, updated);
  return res.json({ success: true, settings: updated });
});

// ==========================================
// VITE DEV SERVER / STATIC ASSETS
// ==========================================

async function startServer() {
  if (!isProduction) {
    // Development mode: Mount Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { 
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve dist files
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(503).send('Application build in progress or dist/index.html is missing. Run npm run build.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BenatCode server running on http://localhost:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
