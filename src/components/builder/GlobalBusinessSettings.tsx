// src/components/builder/GlobalBusinessSettings.tsx

import React from 'react';

export default function GlobalBusinessSettings({ state, setState }: { state: any; setState: (updater: any) => void }) {
  const updateField = (field: string, val: any) => {
    setState((prev: any) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="space-y-6 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white animate-in fade-in">
      <div className="border-b border-slate-800 pb-3">
        <h4 className="font-black text-xs uppercase tracking-widest text-blue-400">Central Business Information</h4>
        <p className="text-[10px] text-slate-400 mt-0.5">Changes here instantly update headers, footers, schema markup, and contact widgets across all pages.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Business Name</label>
            <input type="text" value={state.businessName || ''} onChange={e => updateField('businessName', e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-bold" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
            <input type="text" value={state.phone || ''} onChange={e => updateField('phone', e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-bold" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Business Email</label>
            <input type="email" value={state.email || ''} onChange={e => updateField('email', e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-bold" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp Number</label>
            <input type="text" value={state.whatsappNumber || ''} onChange={e => updateField('whatsappNumber', e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-bold" placeholder="+61..." />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Street Address & Suburb</label>
          <input type="text" value={state.streetAddress || ''} onChange={e => updateField('streetAddress', e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-bold" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">External Booking URL</label>
            <input type="text" value={state.externalCalendarUrl || ''} onChange={e => updateField('externalCalendarUrl', e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-emerald-400" placeholder="https://calendly.com/..." />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Favicon URL</label>
            <input type="text" value={state.faviconUrl || ''} onChange={e => updateField('faviconUrl', e.target.value)} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono" />
          </div>
        </div>
      </div>
    </div>
  );
}