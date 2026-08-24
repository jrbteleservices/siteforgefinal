// src/components/dashboard/LocalGrowthView.tsx

import { useState } from 'react';
import { MapPin, Star, CheckCircle2, AlertTriangle, RefreshCw, Share2, Award } from 'lucide-react';

export default function LocalGrowthView() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const [gbpData, setGbpData] = useState({
    businessName: 'VasaiWeb - Web Development & Digital Agency',
    address: 'Station Road, Vasai West, Vasai-Virar, MH 401202',
    phone: '+91 98230 00000',
    category: 'Web Development Service & Internet Marketing',
    rating: 4.9,
    reviewCount: 38,
    status: 'Verified & Optimized'
  });

  const [citations, setCitations] = useState([
    { id: '1', directory: 'Google Business Profile', status: 'Synced & Verified', authority: 'High' },
    { id: '2', directory: 'Justdial India', status: 'Consistent NAP', authority: 'High' },
    { id: '3', directory: 'IndiaMART', status: 'Consistent NAP', authority: 'Medium' },
    { id: '4', directory: 'Sulekha Mumbai', status: 'Needs Update', authority: 'Medium' },
    { id: '5', directory: 'Crunchbase', status: 'Synced', authority: 'High' }
  ]);

  const handleSyncGbp = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncComplete(true);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Local Domination</span>
          <h2 className="text-2xl font-black text-slate-900">Google Maps & Local Growth Center</h2>
          <p className="text-slate-500 text-sm mt-1">Manage your Google Business Profile, review velocity, and regional NAP citation footprint.</p>
        </div>
        <button onClick={handleSyncGbp} disabled={isSyncing} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition shadow-md shadow-blue-600/20 flex items-center gap-2">
          {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
          <span>{isSyncing ? 'Syncing GBP...' : 'Sync Google Business Profile'}</span>
        </button>
      </div>

      {syncComplete && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Google Business Profile successfully synced! NAP consistency verified at 98%.</span>
        </div>
      )}

      {/* GBP Executive Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">{gbpData.status}</span>
              <h3 className="text-xl font-black text-slate-900 mt-2">{gbpData.businessName}</h3>
              <p className="text-xs text-slate-500 font-mono mt-1">{gbpData.address}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900 block">{gbpData.rating} ★</span>
              <span className="text-xs text-slate-400 font-medium">{gbpData.reviewCount} Verified Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Primary Category</span>
              <span className="text-xs font-bold text-slate-900 mt-1 block truncate">{gbpData.category}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Contact Phone</span>
              <span className="text-xs font-bold text-slate-900 mt-1 block">{gbpData.phone}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Local Pack Position</span>
              <span className="text-xs font-black text-blue-600 mt-1 block">#1 Rank (Vasai West)</span>
            </div>
          </div>
        </div>

        {/* Local Authority Score Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block mb-1">Regional Dominance</span>
            <h3 className="text-xl font-black">Local Authority Score</h3>
            <p className="text-xs text-blue-100 mt-2">Based on proximity signals, review velocity, and directory citations.</p>
          </div>
          <div className="my-6">
            <span className="text-5xl font-black block">92<span className="text-xl font-normal text-blue-200">/100</span></span>
          </div>
          <div className="text-[11px] font-bold bg-white/10 py-2 px-4 rounded-xl text-center">
            🔥 Undisputed market leader in Vasai
          </div>
        </div>
      </div>

      {/* NAP Citation Consistency Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 text-base">NAP Citation Directory Watch</h3>
            <p className="text-xs text-slate-500">Ensuring name, address, and phone consistency across top business directories.</p>
          </div>
          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">5 Tracked Directories</span>
        </div>

        <div className="divide-y divide-slate-100">
          {citations.map((cite) => (
            <div key={cite.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                  {cite.directory.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{cite.directory}</h4>
                  <span className="text-[10px] font-bold text-slate-400">Authority Weight: {cite.authority}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${cite.status.includes('Verified') || cite.status.includes('Consistent') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {cite.status}
                </span>
                <button onClick={() => alert(`Syncing citation for ${cite.directory}...`)} className="text-xs font-bold text-blue-600 hover:underline">
                  Audit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}