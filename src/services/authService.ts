const TOKEN_KEY = 'bc_admin_token';
const USER_KEY = 'bc_admin_user';

export interface AdminUser {
  username: string;
  role: string;
  name: string;
}

export const authService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  getCurrentUser(): AdminUser | null {
    const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  async login(username: string, password: string, remember: boolean = true): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEY, data.token);
        storage.setItem(USER_KEY, JSON.stringify(data.user));
        return { success: true };
      } else {
        const err = await response.json().catch(() => ({ error: 'Invalid credentials' }));
        return { success: false, error: err.error || 'Authentication failed' };
      }
    } catch (networkErr) {
      // Offline fallback for Netlify static preview
      if ((username === 'admin' || username === 'benatcode') && (password === 'Benatcode2026' || password === 'benatcode2026')) {
        const fallbackToken = 'bc_local_session_' + Date.now();
        const fallbackUser = { username: 'admin', role: 'Administrator', name: 'Benat Asban S' };
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEY, fallbackToken);
        storage.setItem(USER_KEY, JSON.stringify(fallbackUser));
        return { success: true };
      }
      return { success: false, error: 'Could not connect to server or invalid credentials.' };
    }
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch {
        // Ignore network errors on logout
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  async checkAuthStatus(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    // Fast-path for local fallback token
    if (token.startsWith('bc_local_session_')) return true;

    try {
      const res = await fetch('/api/auth/status', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        return !!data.authenticated;
      }
      return false;
    } catch {
      // In offline/static mode, trust the existing session token
      return true;
    }
  }
};
