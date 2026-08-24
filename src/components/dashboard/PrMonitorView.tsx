// src/components/dashboard/PrMonitorView.tsx

import { useState } from 'react';
import { Newspaper, Globe, Award, Sparkles, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

interface PrMention {
  id: string;
  source: string;
  title: string;
  url: string;
  date: string;
  sentiment: 'Positive' | 'Neutral';
  authority: 'High' | 'Medium';
}

interface PrOpportunity {
  id: string;
  publication: string;
  topic: string;
  deadline: string;
  status: 'Open' | 'Pitched' | 'Featured';
}

export default function PrMonitorView() {
  const [mentions, setMentions] = useState<PrMention[]>([
    { id: '1', source: 'YourStory India', title: 'How VasaiWeb is Revolutionizing Local Tech & Web Infrastructure', url: 'https://yourstory.com', date: '2 days ago', sentiment: 'Positive', authority: 'High' },
    { id: '2', source: 'Economic Times Tech', title: 'Top Digital Growth Platforms to Watch in 2026', url: 'https://economictimes.indiatimes.com', date: '1 week ago', sentiment: 'Positive', authority: 'High' },
    { id: '3', source: 'Local Maharashtra Business Weekly', title: 'Transforming MSME Digital Presence across Vasai-Virar', url: 'https://maharashtrabusiness.in', date: '2 weeks ago', sentiment: 'Positive', authority: 'Medium' }
  ]);

  const [opportunities, setOpportunities] = useState<PrOpportunity[]>([
    { id: 'o1', publication: 'TechCrunch India', topic: 'AI Automation in Local Business Operations', deadline: 'In 2 days', status: 'Open' },
    { id: 'o2', publication: 'NDTV Profit', topic: 'The Rise of Boutique Digital Growth Agencies', deadline: 'Tomorrow', status: 'Open' },
    { id: 'o3', publication: 'Forbes India Expert Panel', topic: 'Scaling Regional Brands to Global Authority', deadline: 'In 5 days', status: 'Open' }
  ]);

  const [pitchedId, setPitchedId] = useState<string | null>(null);

  const handlePitch = (id: string) => {
    setPitchedId(id);
    setOpportunities(opportunities.map(o => o.id === id ? { ...o, status: 'Pitched' } : o));
    setTimeout(() => setPitchedId(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Authority & Media</span>
          <h2 className="text-2xl font-black text-slate-900">PR Command Center & Mention Monitor</h2>
          <p className="text-slate-500 text-sm mt-1">Track high-authority web mentions, news features, and secure tier-1 media placements.</p>
        </div>
        <div className="flex items-center gap-4 bg-indigo-50 border border-indigo-100 px-6 py-4 rounded-2xl">
          <div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block">PR Authority Score</span>
            <span className="text-3xl font-black text-indigo-700">84 <span className="text-sm font-normal text-slate-500">/ 100</span></span>
          </div>
        </div>
      </div>

      {pitchedId && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>AI Pitch successfully generated and dispatched to journalist desk! Tracking response status.</span>
        </div>
      )}

      {/* Active Journalist Opportunities (HARO Style) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Active Journalist Requests & Expert Commentary</span>
            </h3>
            <p className="text-xs text-slate-500">Respond instantly with AI-assisted executive pitches to earn high-authority backlinks.</p>
          </div>
          <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">3 Live Opportunities</span>
        </div>

        <div className="divide-y divide-slate-100">
          {opportunities.map((opp) => (
            <div key={opp.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/50 transition">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded">{opp.publication}</span>
                  <span className="text-[10px] text-red-600 font-bold">Deadline: {opp.deadline}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mt-2">{opp.topic}</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${opp.status === 'Pitched' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {opp.status}
                </span>
                <button onClick={() => handlePitch(opp.id)} disabled={opp.status === 'Pitched'} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                  <span>{opp.status === 'Pitched' ? 'Pitch Dispatched' : 'Generate AI Pitch'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Web Mentions */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Verified Brand & Media Mentions</h3>
            <p className="text-xs text-slate-500">Recent press coverage and digital references across major publications.</p>
          </div>
          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">3 Live Mentions</span>
        </div>

        <div className="divide-y divide-slate-100">
          {mentions.map((mention) => (
            <div key={mention.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{mention.source}</span>
                    <span className="text-[10px] text-slate-400">• {mention.date}</span>
                  </div>
                  <h4 className="font-medium text-sm text-slate-700 mt-1">{mention.title}</h4>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">{mention.sentiment}</span>
                <a href={mention.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  <span>Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}