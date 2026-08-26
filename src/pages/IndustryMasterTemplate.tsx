// src/pages/IndustryMasterTemplate.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import industryData from '../data/industries.json';
import { DESIGN_FAMILIES } from '../data/themeEngine';
import ToolRenderer from '../components/tools/ToolRenderer';

export default function IndustryMasterTemplate({ previewSlug, previewState, selectedThemeId }: { previewSlug?: string, previewState?: any, selectedThemeId?: string }) {
  const params = useParams<{ industrySlug: string }>();
  
  let rawSlug = previewSlug || params.industrySlug || 'plumbing';
  if (rawSlug === 'Premium Dental Clinic') rawSlug = 'dentist';
  if (rawSlug === '24/7 Emergency Plumbing') rawSlug = 'emergency-plumber';
  if (rawSlug === 'Epoxy & Timber Flooring') rawSlug = 'epoxy-flooring';
  if (rawSlug === 'Heavy Crane & Rigging Hire') rawSlug = 'crane-hire';

  const industrySlug = (industryData as any)[rawSlug] ? rawSlug : 'plumbing';
  const config = (industryData as any)[industrySlug];
  const clientState = previewState || {};

  // Theme Resolution: Matches industry type to design family or user selection
  const themeKey = selectedThemeId || (industrySlug === 'dentist' ? 'modern-clinical' : industrySlug === 'crane-hire' ? 'heavy-industrial' : industrySlug === 'restaurant' ? 'warm-hospitality' : 'modern-contractor');
  const theme = DESIGN_FAMILIES[themeKey] || DESIGN_FAMILIES['modern-contractor'];

  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'contact'>('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([
    { sender: 'bot', text: 'Hello! How can we assist with your project today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  if (!config) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading Engine...</div>;

  const businessName = clientState?.businessName || "";
  const phone = clientState?.phone || "";
  const email = clientState?.email || "";
  const address = clientState?.streetAddress || "";
  const suburb = clientState?.suburb || "";
  const logo = clientState?.logo;
  const externalCalendarUrl = clientState?.externalCalendarUrl || "";
  const activeSections = clientState?.activeSections || { about: true, services: true, projects: false, reviews: true, contact: true };
  const headers = clientState?.headers || { services: { main: 'Our Services' }, projects: { main: 'Projects' }, reviews: { main: 'Client Reviews' } };

  return (
    <div className={`min-h-screen ${theme.palette.background} font-sans ${theme.palette.text} w-full overflow-x-hidden relative flex flex-col justify-between`}>
      
      {/* THEME-AWARE HEADER */}
      <header className={`sticky top-0 w-full z-45 backdrop-blur-lg border-b shadow-sm ${theme.palette.surface} border-slate-200/60`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentPage('home')}>
            {logo ? <img src={logo} alt="Logo" className="h-10 object-contain" /> : <div className={`font-black text-xl tracking-tight ${theme.typography.heading}`}>{businessName || "Business Name"}</div>}
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
            <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? theme.palette.accent : theme.palette.muted + ' hover:' + theme.palette.text}`}>Home</button>
            <button onClick={() => setCurrentPage('about')} className={`${currentPage === 'about' ? theme.palette.accent : theme.palette.muted + ' hover:' + theme.palette.text}`}>About Us</button>
            <button onClick={() => setCurrentPage('services')} className={`${currentPage === 'services' ? theme.palette.accent : theme.palette.muted + ' hover:' + theme.palette.text}`}>Services</button>
            <button onClick={() => setCurrentPage('contact')} className={`${currentPage === 'contact' ? theme.palette.accent : theme.palette.muted + ' hover:' + theme.palette.text}`}>Contact Us</button>
          </nav>

          <div className="flex items-center gap-4">
            {phone && (
              <div className="hidden lg:flex flex-col text-right">
                <span className={`text-[10px] font-bold tracking-widest uppercase ${theme.palette.muted}`}>Call Us 24/7</span>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className={`text-base font-black ${theme.palette.text}`}>{phone}</a>
              </div>
            )}
            <button onClick={() => setCurrentPage('contact')} className={`px-6 py-2.5 font-bold text-sm transition transform hover:scale-105 ${theme.palette.primary} ${theme.style.buttonStyle}`}>
              {config.variables.ctaLabel}
            </button>
          </div>
        </div>
      </header>

      {/* DYNAMIC PAGE ROUTING CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-12 space-y-16">
        
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <div className="space-y-16 animate-in fade-in">
            <section className={theme.style.heroStyle}>
              <div className={`text-xs font-black tracking-widest uppercase px-4 py-1 rounded-full inline-block ${theme.palette.secondary}`}>{clientState?.heroTagline || "Industry Leader"}</div>
              <h1 className={`text-5xl md:text-6xl ${theme.typography.heading}`}>{clientState?.heroHeadline || "Professional Enterprise Solutions"}</h1>
              <p className={`text-lg ${theme.typography.body}`}>{clientState?.heroSubheadline || "Delivering uncompromising quality and precision engineering for commercial and residential clients."}</p>
              <div className="flex justify-center gap-4 pt-4">
                <button onClick={() => setCurrentPage('contact')} className={`px-8 py-4 ${theme.palette.primary} font-bold ${theme.style.buttonStyle} transition`}>Get Started Today</button>
                <button onClick={() => setCurrentPage('services')} className={`px-8 py-4 bg-slate-200/50 hover:bg-slate-200 text-slate-800 font-bold ${theme.style.borderRadius} transition`}>Explore Services</button>
              </div>
            </section>

            {/* --- DYNAMICALLY MOUNT ALL ENABLED TOOLS WITH PHASE 8 INTEGRATION ENFORCEMENT --- */}
            <div className="space-y-12">
              {Object.entries(clientState?.activeTools || {}).map(([toolId, isEnabled]) => {
                if (!isEnabled) return null;

                // PHASE 8 INTEGRATION VALIDATION & ERROR ENFORCEMENT
                if (toolId === 'external-booking' && !externalCalendarUrl) {
                  return (
                    <div key={toolId} className="p-8 bg-amber-50 border border-amber-200 rounded-3xl text-center space-y-2 shadow-sm">
                      <span className="text-amber-600 font-black text-lg">⚠️ Configuration Required</span>
                      <p className="text-xs text-amber-900 font-bold">Booking integration requires configuration in the agency dashboard settings.</p>
                    </div>
                  );
                }

                return (
                  <div key={toolId} className="w-full">
                    <ToolRenderer 
                      toolId={toolId} 
                      config={{ ...clientState?.toolConfigs?.[toolId], bookingUrl: externalCalendarUrl }} 
                      businessName={businessName} 
                      themePalette={theme.palette} 
                    />
                  </div>
                );
              })}
            </div>

            {/* TRUST MARKERS */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">Industry Compliance & Trust</h4>
                <ul className="space-y-4">
                  {config.variables.trustMarkers?.map((marker: string) => (
                    <li key={marker} className="flex items-center gap-3 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">✓</span>
                      {marker}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* PAGE 2: ABOUT US */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-black tracking-tight">About {businessName || "Our Company"}</h1>
              <p className="text-lg text-slate-600">Committed to excellence, safety, and industry-leading performance.</p>
            </div>
            <div className={`${theme.palette.surface} ${theme.style.borderRadius} ${theme.style.cardStyle} p-8 space-y-6`}>
              <h3 className="text-2xl font-black">Our Mission & Standards</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{clientState?.aboutBody || "We provide top-tier professional services backed by decades of combined experience, strict safety compliance, and cutting-edge operational technology."}</p>
            </div>
          </div>
        )}

        {/* PAGE 3: SERVICES */}
        {currentPage === 'services' && (
          <div className="space-y-12 animate-in fade-in">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-black tracking-tight">{headers.services.main}</h1>
              <p className="text-lg text-slate-600">Comprehensive solutions tailored to your operational needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(clientState?.servicesList?.length > 0 ? clientState.servicesList : config.variables.services?.map((s: string, idx: number) => ({ id: idx, title: s, desc: 'Professional grade execution tailored to commercial specifications.' }))).map((svc: any) => (
                <div key={svc.id || svc.title} className={`${theme.palette.surface} ${theme.style.borderRadius} ${theme.style.cardStyle} p-8 space-y-4`}>
                  {svc.image && <img src={svc.image} className="w-full h-48 object-cover rounded-2xl mb-4" />}
                  <h3 className="text-xl font-black">{svc.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE 4: CONTACT US */}
        {currentPage === 'contact' && (
          <div className={`max-w-3xl mx-auto ${theme.palette.surface} ${theme.style.borderRadius} ${theme.style.cardStyle} p-10 space-y-8 animate-in fade-in`}>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black">Get in Touch With Us</h1>
              <p className="text-sm text-slate-500">Fill out the form below or call our dispatch desk directly.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Inquiry submitted successfully!"); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium" required />
                <input type="tel" placeholder="Phone Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium" required />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium" required />
              <textarea placeholder="Describe your project requirements..." rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium" required></textarea>
              <button type="submit" className={`w-full py-4 ${theme.palette.primary} font-bold ${theme.style.buttonStyle} shadow-xl transition`}>Send Secure Message</button>
            </form>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="font-black text-white text-xl">{businessName || "SiteForge Enterprise"}</div>
            <p className="text-sm">Delivering uncompromising quality strictly adhering to compliance and safety standards.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-white">About Us</button></li>
              <li><button onClick={() => setCurrentPage('services')} className="hover:text-white">Services</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact Us</button></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">HQ Contact</h4>
            <p className="text-sm">{address ? `${address}, ${suburb}` : "Global Operations"}</p>
            {phone && <p className="text-sm font-bold text-white">{phone}</p>}
          </div>
        </div>
      </footer>
    </div>
  );
}