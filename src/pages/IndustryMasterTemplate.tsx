// src/pages/IndustryMasterTemplate.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import industryData from '../data/industries.json';

type IndustrySlug = keyof typeof industryData;

export default function IndustryMasterTemplate({ previewSlug, previewState }: { previewSlug?: string, previewState?: any }) {
  const params = useParams<{ industrySlug: string }>();
  
  // Normalize slug matching
  let rawSlug = previewSlug || params.industrySlug || 'dentist';
  if (rawSlug === 'Premium Dental Clinic') rawSlug = 'dentist';
  if (rawSlug === '24/7 Emergency Plumbing') rawSlug = 'emergency-plumber';
  if (rawSlug === 'Epoxy & Timber Flooring') rawSlug = 'epoxy-flooring';
  if (rawSlug === 'Heavy Crane & Rigging Hire') rawSlug = 'crane-hire';
  if (rawSlug === 'Audio Engineering & Studio') rawSlug = 'sound-engineer';
  if (rawSlug === 'CNC Machining & Fabrication') rawSlug = 'cnc-machining';

  const industrySlug = (industryData as any)[rawSlug] ? rawSlug : 'dentist';
  const config = (industryData as any)[industrySlug];
  const clientState = previewState || {};

  // Navigation State for Multi-Page Architecture
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'services' | 'contact'>('home');

  // Interactive Tool States
  const [sqm, setSqm] = useState<number>(50);
  const [customRate, setCustomRate] = useState<number>(config?.variables?.baseRate || 100);
  const [selectedEquipment, setSelectedEquipment] = useState<string>('50-Ton All Terrain Crane');
  const [rentalDays, setRentalDays] = useState<number>(3);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender: string, text: string}[]>([
    { sender: 'bot', text: 'Hello! How can we assist with your project today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    if (config?.variables?.baseRate) {
      setCustomRate(config.variables.baseRate);
    }
  }, [industrySlug]);

  if (!config) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading Engine...</div>;

  const businessName = clientState?.businessName || "";
  const phone = clientState?.phone || "";
  const email = clientState?.email || "";
  const address = clientState?.streetAddress || "";
  const suburb = clientState?.suburb || "";
  const logo = clientState?.logo;
  const externalCalendarUrl = clientState?.externalCalendarUrl || ""; // Calendly / Google Calendar Embed Link
  const activeSections = clientState?.activeSections || { about: true, services: true, projects: false, reviews: true, contact: true };
  const headers = clientState?.headers || { services: { main: 'Our Services' }, projects: { main: 'Projects' }, reviews: { main: 'Client Reviews' } };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 w-full overflow-x-hidden relative flex flex-col justify-between">
      
      {/* HEADER & MULTI-PAGE NAVIGATION */}
      <header className={`sticky top-0 w-full z-45 backdrop-blur-lg border-b shadow-sm ${config.variables.emergencyMode ? 'bg-red-900/95 border-red-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentPage('home')}>
            {logo ? <img src={logo} alt="Logo" className="h-10 object-contain" /> : <div className={`font-black text-xl tracking-tight ${config.variables.emergencyMode ? 'text-white' : 'text-slate-900'}`}>{businessName || "Business Name"}</div>}
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
            <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>Home</button>
            <button onClick={() => setCurrentPage('about')} className={`${currentPage === 'about' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>About Us</button>
            <button onClick={() => setCurrentPage('services')} className={`${currentPage === 'services' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>Services</button>
            <button onClick={() => setCurrentPage('contact')} className={`${currentPage === 'contact' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>Contact Us</button>
          </nav>

          <div className="flex items-center gap-4">
            {phone && (
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Call Us 24/7</span>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-base font-black text-slate-900">{phone}</a>
              </div>
            )}
            <button onClick={() => setCurrentPage('contact')} className="px-5 py-2.5 rounded-full font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition">
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
            <section className="text-center max-w-4xl mx-auto space-y-6">
              <div className="text-xs font-black tracking-widest uppercase text-blue-600 bg-blue-50 py-1 px-4 rounded-full inline-block">{clientState?.heroTagline || "Industry Leader"}</div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">{clientState?.heroHeadline || "Professional Enterprise Solutions"}</h1>
              <p className="text-lg text-slate-600">{clientState?.heroSubheadline || "Delivering uncompromising quality and precision engineering for commercial and residential clients."}</p>
              <div className="flex justify-center gap-4 pt-4">
                <button onClick={() => setCurrentPage('contact')} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/25 transition">Get Started Today</button>
                <button onClick={() => setCurrentPage('services')} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition">Explore Services</button>
              </div>
            </section>

            {/* SPECIALIZED INDUSTRY TOOL EMBED MATRIX */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* TOOL A: AREA / M2 ESTIMATOR */}
              {config.defaultTool === 'estimator' && (
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 border border-slate-100">
                  <h3 className="text-2xl font-black mb-6">Instant Project Cost Calculator</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                        Total Area ({config.variables.calcUnit})
                        <span className="text-blue-600">{sqm} m²</span>
                      </label>
                      <input type="range" min="10" max="1000" value={sqm} onChange={(e) => setSqm(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Rate per {config.variables.calcUnit} ($)</label>
                      <input type="number" value={customRate} onChange={(e) => setCustomRate(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900" />
                    </div>
                    <div className="p-6 bg-slate-900 text-white rounded-2xl flex justify-between items-center shadow-lg">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estimated Investment</span>
                      <span className="text-3xl font-black text-emerald-400">${(sqm * customRate).toLocaleString()}</span>
                    </div>
                    <button onClick={() => setCurrentPage('contact')} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-500 transition">Lock In This Estimate & Book</button>
                  </div>
                </div>
              )}

              {/* TOOL B: FLEET & EQUIPMENT AVAILABILITY CHECKER */}
              {config.defaultTool === 'equipmentChecker' && (
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 border border-slate-100 space-y-6">
                  <h3 className="text-2xl font-black">Live Equipment Availability</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Select Machinery / Crane Unit</label>
                      <select value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900">
                        <option>50-Ton All Terrain Crane</option>
                        <option>100-Ton Hydraulic Crane</option>
                        <option>250-Ton Heavy Crawler Crane</option>
                        <option>Franna Pick & Carry Crane</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Rental Duration (Days)</label>
                      <input type="number" min="1" max="90" value={rentalDays} onChange={(e) => setRentalDays(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900" />
                    </div>
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                      <span className="text-emerald-600 font-black text-xl">✓</span>
                      <span className="text-xs font-bold text-emerald-900">{selectedEquipment} is available for your requested dates!</span>
                    </div>
                    <button onClick={() => setCurrentPage('contact')} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-500 transition">Reserve Equipment Now</button>
                  </div>
                </div>
              )}

              {/* TOOL C: UNIVERSAL EXTERNAL CALENDAR EMBED (OR WIZARD) */}
              {(config.defaultTool === 'booking' || externalCalendarUrl) && (
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                  <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                    <h3 className="text-xl font-black">Book Your Consultation</h3>
                    <span className="text-xs bg-emerald-500 text-slate-950 px-3 py-1 rounded-full font-black">Instant Sync</span>
                  </div>
                  {externalCalendarUrl ? (
                    <div className="w-full h-[450px]">
                      <iframe src={externalCalendarUrl} width="100%" height="100%" frameBorder="0" title="External Calendar"></iframe>
                    </div>
                  ) : (
                    <div className="p-8 text-center space-y-6">
                      <p className="text-sm text-slate-600">Select a time to speak directly with our lead specialist.</p>
                      <button onClick={() => setCurrentPage('contact')} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-500 transition">Open Booking Calendar</button>
                    </div>
                  )}
                </div>
              )}

              {/* TRUST MARKERS & COMPLIANCE BADGES */}
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
          </div>
        )}

        {/* PAGE 2: ABOUT US */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-black tracking-tight">About {businessName || "Our Company"}</h1>
              <p className="text-lg text-slate-600">Committed to excellence, safety, and industry-leading performance.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
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
              {(clientState?.servicesList?.length > 0 ? clientState.servicesList : config.variables.services?.map((s: string, idx: number) => ({ id: idx, title: s, desc: 'Professional grade execution tailored to commercial and residential specifications.' }))).map((svc: any) => (
                <div key={svc.id || svc.title} className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4">
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
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-10 space-y-8 animate-in fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-black">Get in Touch With Us</h1>
              <p className="text-sm text-slate-500">Fill out the form below or call our dispatch desk directly.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Inquiry submitted successfully! Our team will contact you shortly."); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium" required />
                <input type="tel" placeholder="Phone Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium" required />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium" required />
              <textarea placeholder="Describe your project requirements..." rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium" required></textarea>
              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xl shadow-blue-600/20 transition">Send Secure Message</button>
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