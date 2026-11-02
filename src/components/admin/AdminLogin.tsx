import React, { useState } from 'react';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle, Eye, EyeOff, KeyRound } from 'lucide-react';
import { authService } from '../../services/authService';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await authService.login(username.trim(), password.trim(), rememberMe);
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.error || 'Invalid credentials. Please verify your username and password.');
      }
    } catch {
      setError('An unexpected error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col justify-center py-16 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden w-full max-w-full bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Return to BenatCode Store</span>
          <span className="sm:hidden">Store</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Logo and Lockup */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/20 text-white mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            BenatCode Admin Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Digital Product Management System · SuperProfile & Payhip
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-[#0d1424] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800/80 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#0a0f1d] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0"
                />
                <span>Remember session</span>
              </label>
              <span className="text-slate-500 text-[11px]">Protected Dashboard</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Access Admin Dashboard</span>
                </>
              )}
            </button>

          </form>

        </div>

        {/* Security notice */}
        <div className="text-center text-xs text-slate-500 mt-6">
          BenatCode · Digital Product Management System v2.0
        </div>
      </div>
    </div>
  );
};
