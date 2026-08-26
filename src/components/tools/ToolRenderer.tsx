// src/components/tools/ToolRenderer.tsx

import React, { useState } from 'react';
import { supabase } from '../../supabase';

interface ToolRendererProps {
  toolId: string;
  config: any;
  businessName: string;
  themePalette: any;
}

export default function ToolRenderer({ toolId, config, businessName, themePalette }: ToolRendererProps) {
  // 1. LEAD CAPTURE FORM STATE
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // 4. CALCULATOR ENGINE STATE
  const [calcInput, setCalcInput] = useState<number>(50);
  const baseMultiplier = config?.baseMultiplier || 100;

  // 5. MEASUREMENT ENGINE STATE
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(5);
  const [unit, setUnit] = useState<string>('m');

  // 6. FILE UPLOAD STATE
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState('');

  // 8. PRODUCT CONFIGURATOR STATE
  const [selectedColor, setSelectedColor] = useState('Matte Black');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [addonIncluded, setAddonIncluded] = useState(false);
  const basePrice = 299;
  const computedPrice = basePrice + (selectedSize === 'Large' ? 100 : 0) + (addonIncluded ? 50 : 0);

  // 10. BEFORE/AFTER SLIDER STATE
  const [sliderPos, setSliderPos] = useState(50);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!leadName || !leadEmail) {
      setFormError('Please fill in all required fields.');
      return;
    }
    try {
      // Store submission in Supabase or localStorage fallback
      const submission = { business: businessName, name: leadName, email: leadEmail, phone: leadPhone, company: leadCompany, message: leadMessage, date: new Date().toISOString() };
      const existing = JSON.parse(localStorage.getItem('siteforge_leads') || '[]');
      localStorage.setItem('siteforge_leads', JSON.stringify([submission, ...existing]));
      setFormSubmitted(true);
    } catch (err: any) {
      setFormError('Submission failed. Please try again.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const path = `vault/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error } = await supabase.storage.from('site-assets').upload(path, file);
      if (error) throw error;
      setFileName(file.name);
      setUploadSuccess(true);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  switch (toolId) {
    case 'lead-form':
      return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <h3 className="text-2xl font-black">Send Us a Message</h3>
          {formSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <span className="text-emerald-600 font-black text-2xl">✓</span>
              <p className="font-bold text-emerald-900">{config?.successMessage || "Submission received successfully!"}</p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              {formError && <p className="text-xs text-red-500 font-bold">{formError}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name *" value={leadName} onChange={e => setLeadName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" required />
                <input type="email" placeholder="Email Address *" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="tel" placeholder="Phone Number" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
                {config?.requireCompany && <input type="text" placeholder="Company Name" value={leadCompany} onChange={e => setLeadCompany(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />}
              </div>
              <textarea placeholder="How can we help you?" rows={3} value={leadMessage} onChange={e => setLeadMessage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" required></textarea>
              <button type="submit" className={`w-full py-3.5 font-bold rounded-xl text-xs transition ${themePalette.primary}`}>
                {config?.submitButtonText || 'Send Secure Message'}
              </button>
            </form>
          )}
        </div>
      );

    case 'external-booking':
      return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <h3 className="text-lg font-black">Schedule via {config?.provider || 'Calendly'}</h3>
            <span className="text-xs bg-emerald-500 text-slate-950 px-2.5 py-1 rounded font-bold">Live Sync</span>
          </div>
          {config?.displayMode === 'embedded' ? (
            <div className="w-full h-[400px]">
              <iframe src={config?.bookingUrl || 'https://calendly.com/'} width="100%" height="100%" frameBorder="0" title="Booking"></iframe>
            </div>
          ) : (
            <div className="p-8 text-center space-y-4">
              <p className="text-sm text-slate-600">Click below to open our secure external scheduling calendar.</p>
              <a href={config?.bookingUrl || 'https://calendly.com/'} target="_blank" rel="noreferrer" className={`inline-block px-8 py-4 font-bold rounded-xl shadow-lg transition ${themePalette.primary}`}>
                {config?.buttonText || 'Book Appointment Now'}
              </a>
            </div>
          )}
        </div>
      );

    case 'calculator-engine':
      return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <h3 className="text-2xl font-black">Instant Formula Estimator</h3>
          <div className="space-y-4">
            <div>
              <label className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                Input Quantity ({config?.unitLabel || 'Units'})
                <span className="text-blue-600 font-black">{calcInput}</span>
              </label>
              <input type="range" min="1" max="500" value={calcInput} onChange={e => setCalcInput(Number(e.target.value))} className="w-full accent-blue-600 cursor-pointer" />
            </div>
            <div className="p-6 bg-slate-900 text-white rounded-2xl flex justify-between items-center shadow-lg">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Calculated Total</span>
              <span className="text-3xl font-black text-emerald-400">${(calcInput * baseMultiplier).toLocaleString()}</span>
            </div>
          </div>
        </div>
      );

    case 'measurement-engine':
      return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <h3 className="text-2xl font-black">Area & Measurement Engine</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Length ({unit})</label>
              <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Width ({unit})</label>
              <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold" />
            </div>
          </div>
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Area</span>
            <span className="text-2xl font-black text-slate-900">{(length * width).toLocaleString()} {unit}²</span>
          </div>
        </div>
      );

    case 'file-upload':
      return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-4 text-center">
          <h3 className="text-2xl font-black text-left">Secure Document Vault</h3>
          <p className="text-xs text-slate-500 text-left">Upload project briefs, CAD drawings, or PDFs securely.</p>
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 bg-slate-50 flex flex-col items-center justify-center relative hover:bg-slate-100 transition">
            {uploading ? (
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 animate-pulse">Uploading securely...</div>
            ) : uploadSuccess ? (
              <div className="text-emerald-600 font-bold text-xs">✓ Uploaded Successfully: {fileName}</div>
            ) : (
              <>
                <span className="text-3xl mb-2">📁</span>
                <span className="text-xs font-bold text-slate-700">Drag & drop files here</span>
                <span className="text-[10px] text-slate-400 mt-1">Max size: {config?.maxFileSizeMb || 25}MB</span>
              </>
            )}
            <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        </div>
      );

    case 'product-configurator':
      return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <h3 className="text-2xl font-black">Configure Product</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Size</label>
              <div className="flex gap-3">
                {['Standard', 'Large'].map(sz => (
                  <button key={sz} onClick={() => setSelectedSize(sz)} className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition ${selectedSize === sz ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>{sz}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Finish Colour</label>
              <div className="flex gap-3">
                {['Matte Black', 'Brushed Steel', 'Pure White'].map(col => (
                  <button key={col} onClick={() => setSelectedColor(col)} className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition ${selectedColor === col ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>{col}</button>
                ))}
              </div>
            </div>
            <div className="p-6 bg-slate-900 text-white rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Total Price</span>
                <span className="text-2xl font-black text-emerald-400">${computedPrice}</span>
              </div>
              <button className={`px-6 py-3 font-bold rounded-xl text-xs ${themePalette.primary}`}>Add to Cart / Order</button>
            </div>
          </div>
        </div>
      );

    case 'before-after':
      return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <h3 className="text-2xl font-black text-center">Transformation Result</h3>
          <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize">
            <div className="absolute inset-0 bg-slate-800 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-slate-600 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80')] bg-cover bg-center" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}></div>
            <input type="range" min="0" max="100" value={sliderPos} onChange={e => setSliderPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20" />
            <div className="absolute top-0 bottom-0 w-1 bg-white shadow z-10 pointer-events-none" style={{ left: `${sliderPos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-900 font-black text-xs">&lt;&gt;</div>
            </div>
          </div>
        </div>
      );

    case 'gallery':
      return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <h3 className="text-2xl font-black text-center">Project Gallery</h3>
          <div className="grid grid-cols-3 gap-4">
            {['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80', 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80'].map((img, i) => (
              <img key={i} src={img} alt="Gallery item" className="w-full h-36 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-300" />
            ))}
          </div>
        </div>
      );

    case 'reviews':
      return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <h3 className="text-2xl font-black text-center">Verified Client Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ name: 'David Miller', text: 'Absolute professionals. Delivered right on schedule and within budget.' }, { name: 'Sarah Jenkins', text: 'Exceptional quality. The estimation tool and booking process were seamless.' }].map((rev, i) => (
              <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="text-amber-500 text-sm">⭐⭐⭐⭐⭐</div>
                <p className="text-xs text-slate-600 italic">"{rev.text}"</p>
                <span className="text-[10px] font-bold text-slate-900 block">— {rev.name}</span>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <div className="p-6 bg-slate-100 rounded-xl text-center text-xs text-slate-500">Tool module [{toolId}] ready for activation.</div>;
  }
}