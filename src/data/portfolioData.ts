export interface DigitalProduct {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Business & Accounting' | 'Compliance & Legal' | 'Productivity & AI' | 'Developer & Templates';
  platform: 'SuperProfile' | 'Payhip';
  price: string;
  currency: 'INR' | 'USD';
  directUrl: string;
  image: string;
  features: string[];
  idealFor: string;
  deliveryFormat: string;
  isPopular?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  typicalTimeline: string;
  idealFor: string;
}

export const PERSONAL_DETAILS = {
  brandName: "BenatCode",
  ownerName: "Benat Asban S",
  title: "Founder & Digital Solutions Developer",
  location: "Madurai, Tamil Nadu, India",
  photoUrl: "/assets/aistudio/hero-ime_801397eb.jpeg",
  email: "benatasban@gmail.com",
  whatsappNumber: "+91 84283 41029",
  whatsappUrl: "https://wa.me/918428341029",
  superProfileStoreUrl: "https://superprofile.bio/benatcode",
  payhipStoreUrl: "https://payhip.com/benatcode",
  headline: "Smart Digital Products & Software Solutions Engineered For Real Businesses.",
  supportingText: "I'm Benat Asban S, founder of BenatCode. I design and build high-utility digital tools, lightweight business software, and practical web solutions to solve everyday operational friction.",
  aboutBio: [
    "I am an independent software engineer and digital product creator based in Madurai, Tamil Nadu. My academic foundation in Mathematics instills a disciplined, analytical approach to logical modeling, numerical accuracy, and efficient software architecture.",
    "Through BenatCode, I build and publish self-contained digital products—ranging from daily retail cash registers and compliance expiry monitors to developer templates and productivity systems.",
    "My products are distributed globally and locally through trusted creator platforms including SuperProfile (with instant UPI / Indian payment support) and Payhip (for international card / PayPal purchases)."
  ],
  academicHighlights: [
    { label: "Academic Foundation", value: "Degree in Mathematics" },
    { label: "Engineering Mindset", value: "Algorithmic logic, numerical rigor & maintainable code" },
    { label: "Primary Focus", value: "Digital Products, Business Automation & Full-Stack Web Tools" },
    { label: "Location & Scope", value: "Madurai, Tamil Nadu, India (Serving clients & users globally)" }
  ]
};

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: "docexpiry-india",
    name: "DocExpiry India - Compliance & License Tracker",
    tagline: "Proactive validity & deadline monitoring for Indian businesses",
    shortDescription: "A specialized compliance tracking tool for GST, FSSAI, Trade licenses, permits, and vehicle insurance to eliminate penalty fees and operational halts.",
    fullDescription: "Indian business owners and transport operators lose thousands of rupees every year due to forgotten statutory renewal dates. DocExpiry India organizes your key legal filings and licenses, computes real-time days-left alerts, and sends early warning notifications at 30, 15, and 7 days prior to expiry.",
    category: "Compliance & Legal",
    platform: "SuperProfile",
    price: "₹499",
    currency: "INR",
    directUrl: "https://superprofile.bio/benatcode/docexpiry-india",
    image: "/src/assets/images/product_docexpiry_india_1793445362822.jpg",
    features: [
      "Dedicated presets for GST, FSSAI, Trade License, Vehicle Insurance & Pollution certificates",
      "Dynamic days-remaining indicator with critical deadline color coding",
      "Automated advance alert schedules (30, 15, and 7 days notice)",
      "Centralized document reference vault with emergency notes",
      "Downloadable statutory compliance calendar report"
    ],
    idealFor: "Shopkeepers, logistics providers, restaurants, clinics, and SMEs in India",
    deliveryFormat: "Instant Web Access & Lifetime Updates",
    isPopular: true
  },
  {
    id: "cashbook-manager",
    name: "Daily Sales & Cash Book Ledger",
    tagline: "Ultra-fast daily accounting & cash reconciliation for retail counters",
    shortDescription: "A lightweight, clutter-free cash book that calculates daily gross sales, cash-in, cash-out, and closing drawer balances in seconds on mobile or PC.",
    fullDescription: "Traditional accounting suites are cumbersome for shop and restaurant counters. The Daily Sales & Cash Book Ledger gives retail owners an immediate, one-tap method to log cash sales, UPI collections, and cash expenses with zero bookkeeping complexity.",
    category: "Business & Accounting",
    platform: "SuperProfile",
    price: "₹399",
    currency: "INR",
    directUrl: "https://superprofile.bio/benatcode/cashbook-ledger",
    image: "/src/assets/images/product_cashbook_manager_1793445362751.jpg",
    features: [
      "One-tap transaction logging: Cash Sale, Card, UPI / GPay, and Outflow Expense",
      "Automatic real-time cash drawer balance reconciliation",
      "Daily summary cards showing Net Inflow vs Outflow",
      "One-click end-of-day settlement text formatted for WhatsApp",
      "Works seamlessly across smartphones, tablets, and POS desktop screens"
    ],
    idealFor: "Bakeries, grocery stores, cafes, retail boutiques, and service workshops",
    deliveryFormat: "Instant Web Tool & Offline Storage",
    isPopular: true
  },
  {
    id: "client-payment-recovery",
    name: "Client Payment Recovery & Overdue Tracker",
    tagline: "Receivables manager and follow-up organizer for freelancers & agencies",
    shortDescription: "Track unpaid milestone invoices, analyze aging debts, and generate polite, persuasive payment reminder messages in seconds.",
    fullDescription: "Freelancers and service agencies lose significant revenue simply by failing to follow up on milestone invoices on schedule. This tool provides an aging debt radar and structured follow-up cadences that get invoices cleared without awkward confrontation.",
    category: "Business & Accounting",
    platform: "SuperProfile",
    price: "₹349",
    currency: "INR",
    directUrl: "https://superprofile.bio/benatcode/payment-recovery-tracker",
    image: "/src/assets/images/project_password_vault_1793445363087.jpg",
    features: [
      "Overdue balance radar categorized by aging: 1-15 days, 16-30 days, 30+ days",
      "Battle-tested polite email & WhatsApp reminder templates",
      "Milestone payment schedule tracking for multi-phase projects",
      "Client payment history logs and settlement verification records"
    ],
    idealFor: "Freelance web designers, consultants, agency owners, and independent contractors",
    deliveryFormat: "Web App & Digital Workflow Templates"
  },
  {
    id: "gst-msme-toolkit",
    name: "GST & MSME Business Compliance Toolkit",
    tagline: "Statutory checklist and documentation organizer for small enterprises",
    shortDescription: "Essential regulatory timelines, mandatory renewal checklists, and filing readiness guidelines structured for Indian small businesses.",
    fullDescription: "Avoid surprise penalties with a structured statutory checklist designed specifically for Indian proprietors, partnerships, and private limited companies navigating annual returns and tax filings.",
    category: "Compliance & Legal",
    platform: "SuperProfile",
    price: "₹199",
    currency: "INR",
    directUrl: "https://superprofile.bio/benatcode/gst-msme-toolkit",
    image: "/src/assets/images/product_docexpiry_india_1793445362822.jpg",
    features: [
      "Complete annual statutory timeline covering GST, TDS, and advance tax dates",
      "Audit preparation checklist for books and vouchers",
      "MSME registration benefits and scheme navigation reference",
      "Editable digital spreadsheet & printable PDF reference sheets"
    ],
    idealFor: "New entrepreneurs, sole proprietors, and small business managers",
    deliveryFormat: "Digital Toolkit & Editable Worksheets"
  },
  {
    id: "resume-ai-pro",
    name: "Resume AI Pro - ATS Developer Resume Builder",
    tagline: "Clean, ATS-parsable technical resumes with live preview",
    shortDescription: "Format technical resumes that pass Applicant Tracking Systems without graphical parsing errors or expensive recurring subscriptions.",
    fullDescription: "Most modern resume builders use multi-column graphical templates that break automated ATS parsers. Resume AI Pro produces clean, standards-compliant resumes with real-time typography scaling, structured skill hierarchies, and one-click print-to-PDF output.",
    category: "Productivity & AI",
    platform: "Payhip",
    price: "$12.00",
    currency: "USD",
    directUrl: "https://payhip.com/b/resume-ai-pro",
    image: "/src/assets/images/hero_developer_visual_1793445360772.jpg",
    features: [
      "Single-column ATS-friendly typography optimized for automated parsers",
      "Real-time split-pane live document preview",
      "Dynamic skill category structuring (Frontend, Backend, Tools)",
      "Instant browser print-to-PDF with clean margin styling",
      "Lifetime access with zero monthly recurring fees"
    ],
    idealFor: "Software engineers, tech graduates, and professionals switching careers",
    deliveryFormat: "Digital Web Application & Templates",
    isPopular: true
  },
  {
    id: "smart-money-manager",
    name: "Smart Money Manager - Private Cash Flow System",
    tagline: "Private browser-based cash flow budgeting without third-party tracking",
    shortDescription: "Track monthly income, fixed commitments, and variable expenses with pure client-side privacy and clear mathematical breakdowns.",
    fullDescription: "Modern budgeting apps demand sensitive bank logins and sell user financial data. Smart Money Manager runs entirely within your browser using secure local storage, ensuring your numbers remain completely private.",
    category: "Business & Accounting",
    platform: "Payhip",
    price: "$9.00",
    currency: "USD",
    directUrl: "https://payhip.com/b/smart-money-manager",
    image: "/src/assets/images/product_cashbook_manager_1793445362751.jpg",
    features: [
      "Zero server logging: 100% private client-side data storage",
      "Visual percentage budget cap indicators for core living costs",
      "Recurring monthly subscription & commitment auditor",
      "Monthly savings rate calculator and year-to-date projection"
    ],
    idealFor: "Privacy-conscious individuals, digital nomads, and disciplined savers",
    deliveryFormat: "Web App & Offline Storage"
  },
  {
    id: "react-admin-dashboard",
    name: "React Admin Portal & SaaS Starter Kit",
    tagline: "Production-grade React + Tailwind admin scaffold with responsive data grids",
    shortDescription: "Skip weeks of boilerplate when building client portals, admin panels, and internal company management tools.",
    fullDescription: "A clean, modern React.js admin portal starter equipped with responsive data tables, search filters, metrics overview cards, user management layouts, and dark theme support out of the box.",
    category: "Developer & Templates",
    platform: "Payhip",
    price: "$24.00",
    currency: "USD",
    directUrl: "https://payhip.com/b/react-admin-dashboard",
    image: "/src/assets/images/project_password_vault_1793445363087.jpg",
    features: [
      "React 19 + Tailwind CSS modular architecture",
      "Searchable data grid with sorting, pagination, and multi-filter hooks",
      "KPI summary widgets with responsive layout rhythm",
      "Role-based permission layout guards and clean component structure",
      "Complete source code with lifetime commercial license"
    ],
    idealFor: "Frontend developers, agencies, and solo founders building SaaS MVPs",
    deliveryFormat: "Full Source Code Zip & Documentation",
    isPopular: true
  },
  {
    id: "invoice-receipt-generator",
    name: "Small Business Invoice & Receipt Generator",
    tagline: "Create and download clean PDF invoices in under 60 seconds",
    shortDescription: "A high-speed invoice and receipt creation web tool with customizable taxes, multiple currency symbols, and instant print-to-PDF output.",
    fullDescription: "Generate professional, clean invoices for clients without watermarks or subscription requirements. Pre-configure your business details, add line items with automatic tax calculation, and export print-ready invoices immediately.",
    category: "Business & Accounting",
    platform: "Payhip",
    price: "$14.00",
    currency: "USD",
    directUrl: "https://payhip.com/b/invoice-receipt-generator",
    image: "/src/assets/images/product_cashbook_manager_1793445362751.jpg",
    features: [
      "Multi-currency support (₹ INR, $ USD, € EUR, £ GBP)",
      "Automatic subtotal, tax rate, and discount computations",
      "Custom business logo and payment instruction fields",
      "Direct browser PDF generator with clean print typography",
      "Saves client details locally for rapid repeat invoicing"
    ],
    idealFor: "Independent contractors, small shop owners, service providers, and tutors",
    deliveryFormat: "Instant Web Tool & Offline Storage"
  }
];

export const SKILLS_DATA = [
  {
    category: "Frontend Development",
    description: "Crafting fast, accessible, and reactive user interfaces that feel effortless.",
    skills: [
      { name: "React.js", note: "Component patterns, lifecycle & custom hooks" },
      { name: "JavaScript ES6+", note: "Modern syntax, async/await & DOM APIs" },
      { name: "Tailwind CSS", note: "Utility-first design & responsive grids" },
      { name: "HTML5 & CSS3", note: "Semantic structure & responsive layouts" },
      { name: "React Hooks", note: "State encapsulation & reactive primitives" },
      { name: "Context API", note: "Centralized application state management" },
      { name: "Redux", note: "Predictable state architecture for complex apps" },
      { name: "React Router", note: "Client-side routing & dynamic navigation" }
    ]
  },
  {
    category: "Backend & APIs",
    description: "Robust application logic, secure endpoints, and modular services.",
    skills: [
      { name: "Node.js", note: "High-performance JavaScript runtime" },
      { name: "Express.js", note: "RESTful API routing & custom middleware" },
      { name: "Python", note: "Scripting, logic processing & data utilities" },
      { name: "Django", note: "Rapid full-stack web application framework" }
    ]
  },
  {
    category: "Databases & Storage",
    description: "Persistent schema architecture, querying, and realtime synchronizations.",
    skills: [
      { name: "Firebase", note: "Authentication, hosting & cloud functions" },
      { name: "Cloud Firestore", note: "NoSQL document store with live listeners" },
      { name: "MySQL", note: "Relational modeling, indexing & transactions" },
      { name: "MongoDB", note: "Flexible document databases for rapid iteration" }
    ]
  },
  {
    category: "Developer Tools & Deployment",
    description: "Version control, automated pipelines, and testing environments.",
    skills: [
      { name: "Git & GitHub", note: "Source control, branching & release workflows" },
      { name: "Vite", note: "Next-gen lightning fast frontend build tooling" },
      { name: "Postman", note: "API contract testing & payload verification" },
      { name: "Netlify", note: "Static & SPA hosting with automated CI/CD" },
      { name: "Vercel", note: "Modern edge deployment & preview environments" }
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "responsive-website",
    number: "01",
    title: "Responsive Website Development",
    shortDesc: "Pixel-perfect, mobile-first websites designed to showcase your business or personal brand with speed and clarity.",
    deliverables: ["Fully responsive layouts (Mobile/Tablet/Desktop)", "SEO-optimized semantic markup", "Fast asset loading & minimal bundle weight", "Contact and inquiry forms"],
    typicalTimeline: "1 - 2 weeks",
    idealFor: "Local shops, independent professionals, consultants, and service providers"
  },
  {
    id: "react-frontend",
    number: "02",
    title: "React Frontend Development",
    shortDesc: "Dynamic, stateful user interfaces built with React.js, clean component hierarchies, and modern styling libraries.",
    deliverables: ["Modular React component architecture", "State management with Hooks & Context API", "Custom UI micro-interactions & feedback states", "Clean cross-browser compatibility"],
    typicalTimeline: "2 - 3 weeks",
    idealFor: "Startups and teams requiring an interactive web frontend"
  },
  {
    id: "custom-web-app",
    number: "03",
    title: "Custom Web Application Development",
    shortDesc: "Tailored full-stack web applications designed around your exact operational workflows and business logic.",
    deliverables: ["End-to-end frontend and backend architecture", "RESTful API integration & data persistence", "Role-based user flows and authentication", "Scalable relational or NoSQL database setup"],
    typicalTimeline: "3 - 5 weeks",
    idealFor: "Businesses replacing manual spreadsheets with dedicated web tools"
  },
  {
    id: "saas-product",
    number: "04",
    title: "SaaS Product Development",
    shortDesc: "End-to-end MVP engineering for software-as-a-service products, from landing page to authenticated dashboard.",
    deliverables: ["Subscription/account workflow architecture", "User onboarding and profile management", "Database tenancy and secure access controls", "Clean foundation for feature scaling"],
    typicalTimeline: "4 - 6 weeks",
    idealFor: "Solo founders, entrepreneurs, and early-stage software ventures"
  },
  {
    id: "business-website",
    number: "05",
    title: "Business Website Development",
    shortDesc: "Credible, conversion-focused websites engineered to convert prospective inquiries into real paying customers.",
    deliverables: ["Clear service presentation and value hierarchy", "Direct WhatsApp & Email inquiry integrations", "Google Maps location integration & business hours", "Speed optimization for mobile 4G/5G connections"],
    typicalTimeline: "1 - 2 weeks",
    idealFor: "SMEs, restaurants, clinics, retailers, and tradespeople"
  },
  {
    id: "website-redesign",
    number: "06",
    title: "Website Redesign & Modernization",
    shortDesc: "Transforming dated, slow, or non-responsive websites into sleek modern web experiences that reflect your true standard.",
    deliverables: ["Complete visual and UX audit", "Modernized typography, colors, and layout rhythm", "Mobile responsiveness overhaul", "Preservation of existing SEO value and structure"],
    typicalTimeline: "1 - 3 weeks",
    idealFor: "Companies with an outdated site looking for a fresh digital presence"
  },
  {
    id: "dashboard-admin",
    number: "07",
    title: "Dashboard & Admin Panel Development",
    shortDesc: "Intuitive internal portals and operational dashboards to monitor metrics, manage inventory, and supervise records.",
    deliverables: ["Tabular data grids with search & filtering", "Actionable visual analytics & charts", "CRUD operations with validation feedback", "Exportable report views (CSV/PDF)"],
    typicalTimeline: "2 - 4 weeks",
    idealFor: "Operations managers, founders, and administrative teams"
  },
  {
    id: "website-maintenance",
    number: "08",
    title: "Website Maintenance & Optimization",
    shortDesc: "Ongoing maintenance, security hardening, package updates, and performance tuning to keep your systems running smoothly.",
    deliverables: ["Dependency updates and security patches", "Bug fixes and layout adjustments", "Hosting and domain configuration assistance", "Periodic backups and uptime sanity checks"],
    typicalTimeline: "Ongoing / Retainer",
    idealFor: "Existing site owners seeking a dependable technical partner"
  }
];

export const WORK_PROCESS = [
  {
    step: "01",
    title: "Understand Requirements",
    description: "We begin with a detailed discussion regarding your business goals, target audience, must-have features, and design preferences. No assumptions are made.",
    deliverable: "Clear Scope Outline & Feature Checklist"
  },
  {
    step: "02",
    title: "Plan the Solution",
    description: "Mapping out the architecture, selecting the optimal technical stack, drafting data structures, and establishing realistic milestone timelines.",
    deliverable: "Technical Roadmap & Component Strategy"
  },
  {
    step: "03",
    title: "Design the Interface",
    description: "Structuring clean, accessible layouts with responsive desktop and mobile hierarchies, prioritizing legibility, whitespace, and user comfort.",
    deliverable: "Interactive Layouts & Visual Polish"
  },
  {
    step: "04",
    title: "Develop & Test",
    description: "Writing maintainable, modular code. Testing rigorously across devices, validating form submissions, optimizing asset loading, and debugging edge cases.",
    deliverable: "Tested, Production-Ready Codebase"
  },
  {
    step: "05",
    title: "Deploy & Deliver",
    description: "Configuring production hosting on Netlify or client infrastructure, setting up custom domains, verifying redirects, and handing over complete documentation.",
    deliverable: "Live Deployment & Ownership Handover"
  }
];

export const WHY_WORK_WITH_ME = [
  {
    title: "Direct Creator Communication",
    description: "You work directly with Benat Asban S—the developer building each product. No account managers or middle layers."
  },
  {
    title: "Practical Business Software",
    description: "Every tool is engineered around tangible operational problems: daily cash management, compliance expiry tracking, and streamlined invoicing."
  },
  {
    title: "Dual Platform Convenience",
    description: "Instant UPI and Indian payment checkout on SuperProfile, plus international cards & PayPal checkout on Payhip."
  },
  {
    title: "Clean & Maintainable Architecture",
    description: "Built with modern React.js, Tailwind CSS, and secure client-side encryption without bloated third-party dependencies."
  },
  {
    title: "Transparent & Honest Pricing",
    description: "Clear fixed pricing with no hidden surprises, no forced recurring subscriptions, and direct digital delivery."
  },
  {
    title: "Tailored Customization",
    description: "Need custom features, multi-branch support, or bespoke workflows? Every digital tool can be customized for your exact operations."
  }
];

export const FAQS = [
  {
    q: "How do I purchase and access your digital products?",
    a: "Every product links directly to its official listing on SuperProfile or Payhip. On SuperProfile, you can pay seamlessly using UPI, GPay, PhonePe, Netbanking, or Indian cards. On Payhip, you can purchase using international credit/debit cards or PayPal. You receive immediate access and instructions after checkout."
  },
  {
    q: "Can you customize a digital product for my specific business?",
    a: "Yes! If you like the core functionality of any product (such as DocExpiry India or the Daily Cash Book Ledger) but need custom fields, multi-user access, or custom branding, reach out via WhatsApp (+91 84283 41029) or the contact form for a bespoke version."
  },
  {
    q: "What types of custom development services do you offer?",
    a: "Through BenatCode, I build responsive business websites, custom React web applications, internal operational dashboards, and MVP software products for startups, shops, and entrepreneurs."
  },
  {
    q: "How do we get started on a custom project?",
    a: "You can reach out directly via WhatsApp (+91 84283 41029) or send an inquiry through the form below. We will discuss your exact requirements and establish a clear timeline and proposal before writing any code."
  }
];
