// src/components/builder/InstantDemoModal.tsx

import React, { useState } from 'react';
import { INDUSTRY_REGISTRY } from '../../data/industryRegistry';
import { DESIGN_FAMILIES } from '../../data/themeEngine';

interface InstantDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateDemo: (demoConfig: { businessName: string; industryId: string; location: string; themeId: string; services: string[] }) => void;
}

export default function InstantDemoModal({ isOpen, onClose, onGenerateDemo }: InstantDemoModalProps) {
  const [businessName, setBusinessName] = useState('');
  const [industryId, setIndustryId] = useState('crane-hire');
  const [location, setLocation] = useState('Melbourne');
  const [themeId, setThemeId] = useState('heavy-industrial');

  if (!isOpen) return null;

  const selectedProfile = INDUSTRY_REGISTRY[industryId] || INDUSTRY_REGISTRY['crane-hire'];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBusinessName = businessName.trim() || `Apex ${selectedProfile.name} Demo`;
    const services = selectedProfile.seoKeywords || ['Professional Service', 'Consultation', 'Maintenance'];
    
    onGenerateDemo({
      businessName: finalBusinessName,
      industryId,
      location,
      themeId,
      services
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6 text-white relative animate-in fade-in zoom-in-95">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white text-sm font-bold">✕</button>
        
        <div className="space-y-2">
          <span className="text-[10px] bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full font-black uppercase tracking-widest">SiteForge Phase 6 Engine</span>
          <h2 className="text-2xl font-black tracking-tight">Instant Industry Demo Generator</h2>
          <p className="text-xs text-slate-400">Instantly spin up a fully functional, tool-active website demo tailored for any prospect.</p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Target Industry Vertical</label>
            <select 
              value={industryId} 
              onChange={(e) => {
                const ind = e.target.value;
                setIndustryId(ind);
                // Auto-suggest matching visual theme family
                if (ind === 'dentist') setThemeId('modern-clinical');
                else if (ind === 'crane-hire' || ind === 'cnc-machining') setThemeId('heavy-industrial');
                else if (ind === 'real-estate') setThemeId('luxury-editorial');
                else if (ind === 'restaurant') setThemeId('warm-hospitality');
                else setThemeId('modern-contractor');
              }} 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white"
            >
              <optgroup label="Select Industry">
                {Object.entries(INDUSTRY_REGISTRY).map(([id, prof]) => (
                  <option key={id} value={id}>{prof.category} › {prof.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Business Name (Optional)</label>
              <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} placeholder={`e.g. Apex ${selectedProfile.name}`} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Target Location</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Sydney, Melbourne" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs" required />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Design System Family</label>
            <select value={themeId} onChange={e => setThemeId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white">
              {Object.entries(DESIGN_FAMILIES).map(([id, fam]) => (
                <option key={id} value={id}>{fam.name}</option>
              ))}
            </select>
          </div>

          {/* AUTO-RECOMMENDED CAPABILITIES PREVIEW */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Auto-Hydrated Intelligence Stack:</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedProfile.recommendedPages.map(p => <span key={p} className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-bold">📄 {p}</span>)}
              {selectedProfile.recommendedTools.map(t => <span key={t} className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">⚡ {t}</span>)}
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-blue-600/30 transition">
            Generate Instant Demo
          </button>
        </form>
      </div>
    </div>
  );
}