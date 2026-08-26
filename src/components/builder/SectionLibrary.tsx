// src/components/builder/SectionLibrary.tsx

import React from 'react';

export interface SectionItem {
  id: string;
  type: string;
  name: string;
  enabled: boolean;
}

export default function SectionLibrary({ sections, setSections }: { sections: SectionItem[]; setSections: (updater: any) => void }) {
  const toggleSection = (id: string) => {
    setSections((prev: SectionItem[]) => prev.map(sec => sec.id === id ? { ...sec, enabled: !sec.enabled } : sec));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSections(updated);
  };

  const duplicateSection = (sec: SectionItem) => {
    const newSec = { ...sec, id: `${sec.type}_${Date.now()}`, name: `${sec.name} (Copy)` };
    setSections((prev: SectionItem[]) => [...prev, newSec]);
  };

  return (
    <div className="space-y-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white animate-in fade-in">
      <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest text-emerald-400">Modular Section Library</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">Reorder, duplicate, or toggle active layout sections.</p>
        </div>
      </div>

      <div className="space-y-2">
        {sections.map((sec, idx) => (
          <div key={sec.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500">{idx + 1}</span>
              <span className="text-xs font-bold">{sec.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className="text-slate-400 hover:text-white disabled:opacity-30 text-xs px-1">▲</button>
              <button onClick={() => moveSection(idx, 'down')} disabled={idx === sections.length - 1} className="text-slate-400 hover:text-white disabled:opacity-30 text-xs px-1">▼</button>
              <button onClick={() => duplicateSection(sec)} className="text-blue-400 hover:text-blue-300 text-[10px] font-bold px-2 py-1 bg-blue-600/15 rounded">Copy</button>
              <button onClick={() => toggleSection(sec.id)} className={`px-3 py-1 rounded text-[10px] font-bold transition ${sec.enabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {sec.enabled ? 'Active' : 'Hidden'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}