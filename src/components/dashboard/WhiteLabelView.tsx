// src/components/dashboard/WhiteLabelView.tsx

import React, { useState } from 'react';
import { INITIAL_WHITE_LABEL, WhiteLabelConfig } from '../../data/agencyStore';

export default function WhiteLabelView() {
  const [config, setConfig] = useState<WhiteLabelConfig>(() => {
    const saved = localStorage.getItem('siteforge_whitelabel');
    return saved ? JSON.parse(saved) : INITIAL_WHITE_LABEL;
  });
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('siteforge_whitelabel', JSON.stringify(config));
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl animate-in text-white fade-in">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-black">White-Label Agency Branding</h2>
        <p className="text-xs text-slate-400 mt-1">Rebrand the SiteForge client portal and preview URLs with your agency identity.</p>
      </div>

      {savedToast && <div className="p-3 bg-emerald-600 text-white text-xs font-bold rounded-xl">✓ White-label settings saved successfully!</div>}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Agency Brand Name</label>
          <input type="text" value={config.agencyName} onChange={e => setConfig({...config, agencyName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold" required />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Custom Portal Domain</label>
          <input type="text" value={config.customDomain} onChange={e => setConfig({...config, customDomain: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-blue-400" required />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Agency Support Email</label>
          <input type="email" value={config.supportEmail} onChange={e => setConfig({...config, supportEmail: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs" required />
        </div>
        <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition">
          Save White-Label Branding
        </button>
      </form>
    </div>
  );
}