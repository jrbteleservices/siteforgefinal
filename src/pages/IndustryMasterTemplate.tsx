// src/pages/IndustryMasterTemplate.tsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import industryData from '../data/industries.json';

type IndustrySlug = keyof typeof industryData;

export default function IndustryMasterTemplate({ previewSlug, previewState }: { previewSlug?: string, previewState?: any }) {
  const params = useParams<{ industrySlug: string }>();
  
  // Normalize the slug: if it's a display name like "Premium Dental Clinic", map it back to "dentist"
  let rawSlug = previewSlug || params.industrySlug || 'dentist';
  if (rawSlug === 'Premium Dental Clinic') rawSlug = 'dentist';
  if (rawSlug === '24/7 Emergency Plumbing') rawSlug = 'emergency-plumber';
  if (rawSlug === 'Commercial Concreting') rawSlug = 'commercial-concreters';
  if (rawSlug === 'Cosmetic & Aesthetic Clinic') rawSlug = 'aesthetic-clinic';
  if (rawSlug === 'Premium Smash Repairs') rawSlug = 'smash-repairs';
  if (rawSlug === 'Custom Home Builders') rawSlug = 'custom-home-builders';

  const industrySlug = (industryData as any)[rawSlug] ? rawSlug : 'dentist';
  
  const [config, setConfig] = useState<any>((industryData as any)[industrySlug]);
  const [clientState, setClientState] = useState<any>(null);

  // Feature States
  const [sqm, setSqm] = useState<number>(50);
  const [wizardStep, setWizardStep] = useState(1);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (industrySlug && (industryData as any)[industrySlug]) {
      setConfig((industryData as any)[industrySlug]);
    }
    
    if (previewState) {
      setClientState(previewState);
    } else {
      try {
        const saved = JSON.parse(localStorage.getItem('siteforge_published_state') || 'null');
        if (saved && saved.templateProps) {
          setClientState(saved.templateProps);
        }
      } catch (e) { console.error(e); }
    }
  }, [industrySlug, previewState]);

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white w-full h-full">
        <h1 className="text-4xl font-black mb-4">System Initializing...</h1>
        <p className="text-slate-400 mb-8">Please select a valid Industry Theme.</p>
      </div>
    );
  }

  const businessName = clientState?.businessName || config.name;
  const phone = clientState?.phone || "1300 000 000";
  const hours = clientState?.operatingHours || [];
  const logo = clientState?.logo;
  const activeSections = clientState?.activeSections || { about: true, services: true, projects: false, reviews: true };
  const headers = clientState?.headers || { services: { main: 'Our Services' }, projects: { main: 'Projects' }, reviews: { main: 'Reviews' } };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 w-full overflow-x-hidden">
      
      {/* HEADER */}
      <header className={`sticky top-0 w-full z-50 backdrop-blur-lg border-b shadow-sm ${config.variables.emergencyMode ? 'bg-red-900/95 border-red-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {logo ? <img src={logo} alt="Logo" className="h-10 object-contain" /> : <div className={`font-black text-xl tracking-tight ${config.variables.emergencyMode ? 'text-white' : 'text-slate-900'}`}>{businessName}</div>}
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col text-right">
              <span className={`text-[10px] font-bold tracking-widest uppercase ${config.variables.emergencyMode ? 'text-red-200 animate-pulse' : 'text-slate-400'}`}>
                {config.variables.emergencyMode ? '24/7 Rapid Dispatch' : 'Call Us Directly'}
              </span>
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className={`text-lg font-black ${config.variables.emergencyMode ? 'text-white' : 'text-slate-900'}`}>{phone}</a>
            </div>
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className={`px-6 py-2.5 rounded-full font-bold text-sm shadow-xl transition-transform hover:scale-105 ${config.variables.emergencyMode ? 'bg-white text-red-900 shadow-red-900/20' : 'bg-blue-600 text-white shadow-blue-600/20'}`}>
              {config.variables.ctaLabel}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
        
        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">{clientState?.heroHeadline || `${config.name} Specialists.`}</h1>
          <p className="text-lg text-slate-600">{clientState?.heroSubheadline || "Providing top-tier services tailored to your exact needs."}</p>
          {config.variables.guaranteeText && (
            <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full uppercase tracking-widest">✓ {config.variables.guaranteeText}</div>
          )}
        </section>

        {/* DYNAMIC FEATURES ENGINE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-12">
            {config.features.areaCalculator && (
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                <h3 className="text-xl font-black mb-6">Instant Project Estimator</h3>
                <div className="space-y-6">
                  <div>
                    <label className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                      Total {config.variables.calcUnit}
                      <span className="text-blue-600">{sqm}</span>
                    </label>
                    <input type="range" min="10" max="500" value={sqm} onChange={(e) => setSqm(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  </div>
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Projected Base Cost</span>
                    <span className="text-3xl font-black text-slate-900">${(sqm * config.variables.baseRate).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {config.features.fileUpload && (
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                <h3 className="text-xl font-black mb-2">Upload Site Photos</h3>
                <p className="text-sm text-slate-500 mb-6">Securely upload images of the project site for an accurate assessment.</p>
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
                  className={`w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}
                >
                  <span className="text-4xl mb-3">📸</span>
                  <span className="text-sm font-bold text-slate-700">Drag & Drop photos here</span>
                  <span className="text-xs text-slate-400 mt-1">or click to browse</span>
                </div>
              </div>
            )}
            
            {!config.features.areaCalculator && !config.features.fileUpload && activeSections.about && (
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                <h3 className="text-2xl font-black mb-4">{clientState?.aboutTitle || "About Us"}</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{clientState?.aboutBody || "Write your about us description here."}</p>
              </div>
            )}
          </div>

          <div>
            {config.features.bookingCalendar && (
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                <div className="bg-slate-900 p-6 text-white">
                  <h3 className="text-xl font-black">Schedule Your Appointment</h3>
                </div>
                {config.variables.useExternalEmbed ? (
                  <div className="w-full h-[500px]">
                    <iframe src={config.variables.externalEmbedUrl} width="100%" height="100%" frameBorder="0" title="Booking" className="w-full h-full"></iframe>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {wizardStep === 1 && (
                      <div className="space-y-4 animate-in fade-in">
                        <label className="text-sm font-bold text-slate-700">Select Service</label>
                        <div className="grid grid-cols-1 gap-3">
                          {config.variables.services?.map((svc: string) => (
                            <label key={svc} className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                              <input type="radio" name="service" className="w-4 h-4 text-blue-600" />
                              <span className="ml-3 font-bold text-slate-700">{svc}</span>
                            </label>
                          ))}
                        </div>
                        <button type="button" onClick={() => setWizardStep(2)} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl mt-4">Next Step &rarr;</button>
                      </div>
                    )}
                    {wizardStep === 2 && (
                      <div className="space-y-4 animate-in fade-in">
                        <label className="text-sm font-bold text-slate-700">Select Available Slot</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['09:00 AM', '11:30 AM', '02:00 PM'].map(time => (
                            <button key={time} type="button" className="py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:border-blue-500 transition">{time}</button>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button type="button" onClick={() => setWizardStep(1)} className="px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl">&larr; Back</button>
                          <button type="button" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl">Confirm Booking</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SERVICES SECTION */}
        {activeSections.services && clientState?.servicesList?.length > 0 && (
          <section className="pt-8 border-t border-slate-200">
            <h3 className="text-3xl font-black text-center mb-10">{headers.services.main}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clientState.servicesList.map((svc: any) => (
                <div key={svc.id} className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
                  {svc.image && <img src={svc.image} className="w-full h-40 object-cover rounded-xl mb-4" />}
                  <h4 className="text-lg font-bold mb-2">{svc.title}</h4>
                  <p className="text-slate-600 text-sm">{svc.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BEFORE & AFTER SLIDER */}
        {config.features.beforeAfterSlider && (
          <section className="py-12 border-t border-slate-200">
            <h3 className="text-2xl font-black text-center mb-8">Our Transformative Results</h3>
            <div className="max-w-4xl mx-auto relative h-[400px] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize group">
              <div className="absolute inset-0 bg-slate-800 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-slate-600 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80')] bg-cover bg-center" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}></div>
              <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" />
              <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 pointer-events-none" style={{ left: `${sliderPos}%` }}>
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"><span className="text-slate-900 text-xs font-black">&lt;&gt;</span></div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="font-black text-white text-xl">{businessName}</div>
            <p className="text-sm">Delivering uncompromising quality strictly adhering to compliance and safety standards.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Trust & Compliance</h4>
            <ul className="space-y-2 text-sm">
              {config.variables.trustMarkers?.map((marker: string) => (
                <li key={marker} className="flex items-center gap-2"><span className="text-emerald-500">✓</span> {marker}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Operating Hours</h4>
            <ul className="space-y-2 text-sm">
              {hours && hours.length > 0 ? (
                hours.map((hr: any) => (
                  <li key={hr.id} className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="font-medium text-slate-300">{hr.days}</span><span className="text-slate-500">{hr.hours}</span>
                  </li>
                ))
              ) : (<li className="text-slate-500 italic">Contact us for operating hours.</li>)}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}