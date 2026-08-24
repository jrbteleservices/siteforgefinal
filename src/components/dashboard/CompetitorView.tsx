// src/components/dashboard/CompetitorView.tsx

import { useState } from 'react';
import { ShieldAlert, TrendingUp, Zap, Target, Award, Search, ExternalLink, Plus } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  domain: string;
  speedScore: number;
  seoAuthority: number;
  reviewCount: number;
  mapRank: string;
  weakness: string;
}

export default function CompetitorView() {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: '1', name: 'Vasai Local Studio', domain: 'vasailocalads.com', speedScore: 42, seoAuthority: 14, reviewCount: 12, mapRank: '#4', weakness: 'Slow mobile load speed & missing local service pages' },
    { id: '2', name: 'Mumbai Digital Hub', domain: 'mumbaidigitalagency.in', speedScore: 68, seoAuthority: 31, reviewCount: 45, mapRank: '#2', weakness: 'No physical presence in Vasai; weak hyper-local relevance' },
    { id: '3', name: 'Alpha Web Freelancers', domain: 'alphawebvasai.com', speedScore: 35, seoAuthority: 8, reviewCount: 5, mapRank: '#7', weakness: 'Outdated WordPress theme & zero mobile optimization' }
  ]);

  const [newCompetitorName, setNewCompetitorName] = useState('');
  const [newCompetitorDomain, setNewCompetitorDomain] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompetitorName || !newCompetitorDomain) return;

    const newComp: Competitor = {
      id: Date.now().toString(),
      name: newCompetitorName,
      domain: newCompetitorDomain.replace(/https?:\/\//, ''),
      speedScore: Math.floor(Math.random() * 40) + 40,
      seoAuthority: Math.floor(Math.random() * 20) + 10,
      reviewCount: Math.floor(Math.random() * 20) + 5,
      mapRank: `#${Math.floor(Math.random() * 5) + 3}`,
      weakness: 'Lacks sub-second edge architecture and schema optimization'
    };

    setCompetitors([...competitors, newComp]);
    setNewCompetitorName('');
    setNewCompetitorDomain('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Market Intelligence</span>
          <h2 className="text-2xl font-black text-slate-900">Competitor War Room</h2>
          <p className="text-slate-500 text-sm mt-1">Benchmark your digital footprint against competing local agencies and dominate search rankings.</p>
        </div>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition shadow-md shadow-blue-600/20 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Track New Competitor</span>
        </button>
      </div>

      {/* Add Competitor Modal / Drawer */}
      {isAdding && (
        <form onSubmit={handleAddCompetitor} className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md space-y-4 animate-in fade-in">
          <h3 className="font-bold text-slate-900 text-sm">Add Competitor to Benchmark</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Competitor Business Name</label>
              <input type="text" required value={newCompetitorName} onChange={(e) => setNewCompetitorName(e.target.value)} placeholder="e.g. Rival Web Studio" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Domain URL</label>
              <input type="text" required value={newCompetitorDomain} onChange={(e) => setNewCompetitorDomain(e.target.value)} placeholder="e.g. rivalstudio.com" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm">Save & Audit</button>
          </div>
        </form>
      )}

      {/* Competitor Cards Matrix */}
      <div className="grid grid-cols-1 gap-6">
        {competitors.map((comp) => (
          <div key={comp.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-black text-slate-900">{comp.name}</h3>
                <a href={`https://${comp.domain}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-mono">
                  <span>{comp.domain}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span>Google Maps Position: <strong className="text-slate-900">{comp.mapRank}</strong></span>
                <span>•</span>
                <span>Verified Reviews: <strong className="text-slate-900">{comp.reviewCount}</strong></span>
              </div>
              <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-xl mt-2 flex items-center gap-2 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span><strong>Identified Weakness:</strong> {comp.weakness}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
              <div className="text-center px-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Speed Score</span>
                <span className={`text-2xl font-black ${comp.speedScore > 60 ? 'text-amber-500' : 'text-red-500'}`}>{comp.speedScore}</span>
              </div>
              <div className="text-center px-4 border-l border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">SEO Authority</span>
                <span className="text-2xl font-black text-blue-600">{comp.seoAuthority}</span>
              </div>
              <div className="pl-4 border-l border-slate-200">
                <button onClick={() => alert(`Strategy generated: Outrank ${comp.name} by deploying sub-second edge architecture and targeted micro-location schema.`)} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition shadow-md">
                  Outnumber Strategy
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}