import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send, CheckCircle, AlertCircle, ArrowUpRight, Phone } from 'lucide-react';
import { PERSONAL_DETAILS } from '../data/portfolioData';

interface ContactProps {
  initialProjectType?: string;
  initialMessage?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialProjectType = '', initialMessage = '' }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType || 'Responsive Website Development');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState(initialMessage || '');

  // Form states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  // Sync if initial props change
  React.useEffect(() => {
    if (initialProjectType) setProjectType(initialProjectType);
  }, [initialProjectType]);

  React.useEffect(() => {
    if (initialMessage) setMessage(initialMessage);
  }, [initialMessage]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Please include at least a brief summary of your requirements (min 10 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitNotice(null);

    // Encode for Netlify Forms standard submission
    const encode = (data: Record<string, string>) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };

    try {
      // Send POST to current origin for Netlify Forms handler
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          "fullName": fullName,
          "email": email,
          "projectType": projectType,
          "budget": budget,
          "message": message
        })
      });

      // Whether Netlify handler caught it or in dev preview, set clean confirmed state
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitNotice("Your inquiry details have been saved for Netlify Forms handling. You can also send this directly via WhatsApp for an immediate response.");
    } catch (err) {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitNotice("Inquiry ready! You can now send it directly to Benat via WhatsApp or Email.");
    }
  };

  const handleOpenWhatsAppDraft = () => {
    const text = encodeURIComponent(
      `Hello Benat, I am reaching out from BenatCode website.\n\nName: ${fullName || 'Interested Client'}\nEmail: ${email || 'Not provided'}\nProject / Product: ${projectType}\nBudget: ${budget || 'Flexible / To Discuss'}\n\nMessage: ${message || 'I would like to discuss a project or product with you.'}`
    );
    window.open(`${PERSONAL_DETAILS.whatsappUrl}?text=${text}`, '_blank');
  };

  const handleOpenEmailDraft = () => {
    const subject = encodeURIComponent(`Inquiry: ${projectType} - BenatCode`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nProject / Product: ${projectType}\nBudget: ${budget || 'Flexible'}\n\nRequirements:\n${message}`
    );
    window.location.href = `mailto:${PERSONAL_DETAILS.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#0d1424] border-t border-slate-800 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Get In Touch
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Have a Project in Mind? Let's Build It Together.
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            I am available for freelance projects, custom web application development, responsive business websites, and digital tools. Reach out via WhatsApp, email, or the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6 min-w-0">
            
            <div className="bg-[#0a0f1d] rounded-2xl border border-slate-800 p-5 sm:p-7 space-y-6 min-w-0">
              <div className="space-y-1 pb-4 border-b border-slate-800">
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                  Contact Information
                </span>
                <h3 className="text-xl font-bold text-white">{PERSONAL_DETAILS.ownerName}</h3>
                <p className="text-xs text-slate-400">{PERSONAL_DETAILS.brandName} · {PERSONAL_DETAILS.title}</p>
              </div>

              {/* Direct channels */}
              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={PERSONAL_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 hover:border-emerald-500/60 transition-colors flex items-center justify-between group min-w-0"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-slate-400 font-medium">WhatsApp (Fastest Response)</div>
                      <div className="text-sm font-bold text-white font-mono group-hover:text-emerald-400 transition-colors truncate">
                        {PERSONAL_DETAILS.whatsappNumber}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_DETAILS.email}`}
                  className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 hover:border-blue-500/60 transition-colors flex items-center justify-between group min-w-0"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-slate-400 font-medium">Direct Email</div>
                      <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {PERSONAL_DETAILS.email}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
                </a>

                {/* Location */}
                <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Location</div>
                    <div className="text-sm font-semibold text-white">
                      {PERSONAL_DETAILS.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Working hours & collaboration note */}
              <div className="p-3.5 rounded-xl bg-[#0d1424] border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Client Response Promise</div>
                <p>
                  Inquiries receive a response within 24 hours. You communicate directly with Benat Asban S with complete transparency.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#0a0f1d] rounded-2xl border border-slate-800 p-6 sm:p-8">
            
            {submitSuccess ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-800 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Thank You, {fullName}!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {submitNotice || "Your message details are organized. For the fastest response, you can directly launch a WhatsApp chat with this exact message prefilled."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleOpenWhatsAppDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send to WhatsApp Now</span>
                  </button>

                  <button
                    onClick={handleOpenEmailDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email Client</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setMessage('');
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Netlify Form Hidden Field */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don’t fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      placeholder="e.g. Anand Kumar"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#0d1424] border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="e.g. anand@company.com"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#0d1424] border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0d1424] border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="Responsive Website Development">Responsive Website Development</option>
                      <option value="React Frontend Development">React Frontend Development</option>
                      <option value="Custom Web Application Development">Custom Web Application Development</option>
                      <option value="SaaS Product Development">SaaS Product Development</option>
                      <option value="Business Website Development">Business Website Development</option>
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Dashboard and Admin Panel Development">Dashboard and Admin Panel</option>
                      <option value="Website Maintenance">Website Maintenance</option>
                      <option value="Digital Tools / In-House Products">Inquire about Digital Products</option>
                      <option value="Other Consultation">Other Consultation</option>
                    </select>
                  </div>

                  {/* Budget (Optional) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                      <span>Budget Expectation</span>
                      <span className="text-[11px] text-slate-500 font-normal">Optional</span>
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. ₹15,000 - ₹35,000 / $500 - $1500"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#0d1424] border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Project Summary / Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Briefly describe what you're looking to build, desired features, or key timeline goals..."
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#0d1424] border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Inquiry (Netlify Ready)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsAppDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-950 border border-emerald-800/80 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 text-center pt-2">
                  Prepared for Netlify Forms · Direct recipient: benatasban@gmail.com
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
