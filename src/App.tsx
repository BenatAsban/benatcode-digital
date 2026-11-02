import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { InteractiveEstimator } from './components/InteractiveEstimator';
import { WorkProcess } from './components/WorkProcess';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProductPreviewModal } from './components/ProductPreviewModal';
import { CVModal } from './components/CVModal';
import { NetlifyGuideModal } from './components/NetlifyGuideModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Product } from './types/product';
import { authService } from './services/authService';

export default function App() {
  // Navigation / View state
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => authService.isAuthenticated());

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isNetlifyGuideOpen, setIsNetlifyGuideOpen] = useState(false);

  // Platform filter state for products marketplace
  const [activePlatformFilter, setActivePlatformFilter] = useState<'All' | 'SuperProfile' | 'Payhip'>('All');

  // Cross-component contact prefill states
  const [contactProjectType, setContactProjectType] = useState<string>('Digital Tools / In-House Products');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');

  // Handle URL hash navigation and initial auth verification
  useEffect(() => {
    // Check initial hash
    if (window.location.hash === '#admin') {
      setCurrentView('admin');
    }

    // Verify session token with backend if exists
    const verifyAuth = async () => {
      const isAuth = await authService.checkAuthStatus();
      setIsAdminLoggedIn(isAuth);
    };
    verifyAuth();

    // Listen to hash changes (e.g. browser back button or direct #admin link)
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (window.location.hash === '' || window.location.hash === '#home' || window.location.hash === '#products') {
        setCurrentView('store');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToAdmin = () => {
    setCurrentView('admin');
    window.location.hash = '#admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToStore = () => {
    setCurrentView('store');
    if (window.location.hash === '#admin') {
      history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'store') {
      setCurrentView('store');
      history.pushState(null, '', window.location.pathname);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setContactProjectType(serviceTitle);
    setContactInitialMessage(`Hello Benat, I would like to inquire about your "${serviceTitle}" service for my project.`);
    scrollToSection('contact');
  };

  const handleInquireFromModal = (productTitle: string) => {
    setContactProjectType('Digital Tools / Customization');
    setContactInitialMessage(`Hello Benat, I am interested in customizing or licensing "${productTitle}" from BenatCode for my business.`);
    scrollToSection('contact');
  };

  const handleApplyScopeToContact = (scopeText: string, projectType: string) => {
    setContactProjectType(projectType);
    setContactInitialMessage(`Project Scope Inquiry:\n\n${scopeText}`);
    scrollToSection('contact');
  };

  const handleFilterPlatformFromNav = (platform: 'All' | 'SuperProfile' | 'Payhip') => {
    if (currentView !== 'store') {
      setCurrentView('store');
      history.pushState(null, '', window.location.pathname);
    }
    setActivePlatformFilter(platform);
    setTimeout(() => {
      scrollToSection('products');
    }, 50);
  };

  // If in Admin view mode
  if (currentView === 'admin') {
    if (isAdminLoggedIn) {
      return (
        <AdminDashboard
          onReturnToStore={navigateToStore}
          onLogout={async () => {
            await authService.logout();
            setIsAdminLoggedIn(false);
            navigateToStore();
          }}
        />
      );
    }

    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
        }}
        onCancel={navigateToStore}
      />
    );
  }

  // Public Storefront View
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased w-full max-w-full overflow-x-hidden relative">
      {/* Navigation */}
      <Navbar
        onOpenCVModal={() => setIsCVModalOpen(true)}
        onSelectPlatformFilter={handleFilterPlatformFromNav}
        onOpenAdmin={navigateToAdmin}
        isAdmin={isAdminLoggedIn}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 1. Home / Hero Section with Real Photo */}
        <Hero
          onExploreProducts={() => {
            setActivePlatformFilter('All');
            scrollToSection('products');
          }}
          onFilterPlatform={(platform) => {
            setActivePlatformFilter(platform);
            scrollToSection('products');
          }}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* 2. About Me Section with Real Photo */}
        <About
          onOpenCVModal={() => setIsCVModalOpen(true)}
          onExploreProducts={() => scrollToSection('products')}
        />

        {/* 3. Skills & Technologies */}
        <Skills />

        {/* 4. Services Showcase */}
        <Services onSelectService={handleSelectService} />

        {/* 5, 6, 7. All Digital Products Marketplace (with SuperProfile & Payhip views and Admin quick access) */}
        <Products
          onOpenPreview={(product) => setSelectedProduct(product)}
          activePlatformFilter={activePlatformFilter}
          onPlatformFilterChange={(p) => setActivePlatformFilter(p)}
          onOpenAdmin={navigateToAdmin}
        />

        {/* Custom Project & Product Customization Scope Planner */}
        <InteractiveEstimator onApplyScopeToContact={handleApplyScopeToContact} />

        {/* 5-Step Work Process */}
        <WorkProcess />

        {/* Why Work With BenatCode */}
        <WhyWorkWithMe onContactClick={() => scrollToSection('contact')} />

        {/* Frequently Asked Questions */}
        <Faq />

        {/* 8. Contact Section */}
        <Contact
          initialProjectType={contactProjectType}
          initialMessage={contactInitialMessage}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenCVModal={() => setIsCVModalOpen(true)}
        onOpenNetlifyGuide={() => setIsNetlifyGuideOpen(true)}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Interactive Product Details & Demo Modal */}
      <ProductPreviewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onInquire={handleInquireFromModal}
      />

      {/* Developer Profile & CV Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />

      {/* Netlify Deployment Instructions Modal */}
      <NetlifyGuideModal
        isOpen={isNetlifyGuideOpen}
        onClose={() => setIsNetlifyGuideOpen(false)}
      />
    </div>
  );
}
