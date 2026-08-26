// src/components/dashboard/IntegrationsManagerView.tsx

import React, { useState } from 'react';
import { INITIAL_INTEGRATIONS, IntegrationConfig } from '../../data/integrationsRegistry';

export default function IntegrationsManagerView() {
  const [integrations, setIntegrations] = useState<Record<string, IntegrationConfig>>(() => {
    const saved = localStorage.getItem('siteforge_integrations');
    return saved ? JSON.parse(saved) : INITIAL_INTEGRATIONS;
  });
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<Record<string, string>>({});

  const handleOpenConfig = (item: IntegrationConfig) => {
    setActiveModalId(item.id);
    setTempValues(item.values);
  };

  const handleSaveConfig = (id: string) => {
    const item = integrations[id];
    const hasRequiredValues = item.fields.every(f => !!tempValues[f.key]?.trim());
    
    const updated = {
      ...integrations,
      [id]: {
        ...item,
        values: tempValues,
        status: hasRequiredValues ? ('connected' as const) : ('config_required' as const)
      }
    };
    setIntegrations(updated);
    localStorage.setItem('siteforge_integrations', JSON.stringify(updated));
    setActiveModalId(null);
    alert(`Integration [${item.name}] configuration saved successfully!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-white">Business Integrations & APIs</h2>
          <p className="text-xs text-slate-400 mt-1">Connect client websites to calendars, payment gateways, CRMs, and webhooks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(integrations).map(item => {
          const isConnected = item.status === 'connected';
          const isConfigRequired = item.status === 'config_required';
          
          return (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-base text-white">{item.name}</h3>
                  <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider ${
                    isConnected ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                    isConfigRequired ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                    'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {isConnected ? '● Connected' : isConfigRequired ? '⚠ Configuration Required' : '○ Disconnected'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Category: {item.category}</span>
                <button 
                  onClick={() => handleOpenConfig(item)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
                >
                  Configure Integration
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONFIGURATION MODAL */}
      {activeModalId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-white relative">
            <button onClick={() => setActiveModalId(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white font-bold text-sm">✕</button>
            <h3 className="text-xl font-black">Configure {integrations[activeModalId].name}</h3>
            
            <div className="space-y-4">
              {integrations[activeModalId].fields.map(field => (
                <div key={field.key}>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{field.label}</label>
                  <input 
                    type={field.type === 'password' ? 'password' : 'text'} 
                    value={tempValues[field.key] || ''} 
                    onChange={e => setTempValues({ ...tempValues, [field.key]: e.target.value })} 
                    placeholder={field.placeholder} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" 
                  />
                </div>
              ))}
              {!integrations[activeModalId].fields.length && (
                <p className="text-xs text-slate-400 italic">No additional parameters required. Click connect to activate.</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={() => setActiveModalId(null)} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition">Cancel</button>
              <button onClick={() => handleSaveConfig(activeModalId)} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-lg transition">Save & Connect</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}