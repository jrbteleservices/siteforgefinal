// src/components/dashboard/GrowthPlanView.tsx

import { useState } from 'react';
import { Activity, CheckCircle2, Clock, Target, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

interface GrowthTask {
  id: string;
  title: string;
  category: 'SEO' | 'Content' | 'Local' | 'Trust' | 'Conversion';
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Fast' | 'Moderate' | 'Intensive';
  status: 'Pending' | 'In Progress' | 'Completed';
  timeframe: '30 Days' | '60 Days' | '90 Days';
}

export default function GrowthPlanView() {
  const [targetGoal, setTargetGoal] = useState('Become the #1 trusted web development and SEO agency');
  const [industry, setIndustry] = useState('Digital Agency & Web Development');
  const [location, setLocation] = useState('Vasai West, India');
  const [isGenerating, setIsGenerating] = useState(false);

  const [tasks, setTasks] = useState<GrowthTask[]>([
    { id: '1', title: 'Optimize Google Business Profile with exact-match keyword categories', category: 'Local', impact: 'High', effort: 'Fast', status: 'Completed', timeframe: '30 Days' },
    { id: '2', title: 'Publish hyper-local service landing page', category: 'SEO', impact: 'High', effort: 'Moderate', status: 'In Progress', timeframe: '30 Days' },
    { id: '3', title: 'Inject LocalBusiness and Organization JSON-LD Schema markup', category: 'SEO', impact: 'High', effort: 'Fast', status: 'Completed', timeframe: '30 Days' },
    { id: '4', title: 'Launch automated review velocity follow-up sequence for recent clients', category: 'Trust', impact: 'High', effort: 'Moderate', status: 'Pending', timeframe: '60 Days' },
    { id: '5', title: 'Build authoritative topic cluster on high-performance web architecture', category: 'Content', impact: 'Medium', effort: 'Intensive', status: 'Pending', timeframe: '90 Days' }
  ]);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 900);
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Completed' ? 'Pending' : t.status === 'Pending' ? 'In Progress' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-6xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">AI Growth Strategist</span>
          <h2 className="text-2xl font-black text-white">Automated 90-Day Market Monopoly Roadmap</h2>
          <p className="text-slate-400 text-sm mt-1">Define your market objective and let SiteForge architect your complete search, entity, and reputation strategy.</p>
        </div>

        <form onSubmit={handleGeneratePlan} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Objective</label>
            <input type="text" value={targetGoal} onChange={(e) => setTargetGoal(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-medium" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Industry Niche</label>
            <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-medium" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Market / Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-medium" />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button type="submit" disabled={isGenerating} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl text-xs uppercase tracking-widest transition shadow-md flex items-center gap-2">
              {isGenerating ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span> : <Zap className="w-4 h-4" />}
              <span>{isGenerating ? 'Synthesizing Roadmap...' : 'Regenerate AI Strategy'}</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white text-base">Prioritized Execution Queue</h3>
            <p className="text-xs text-slate-400">Sorted by business impact and search authority return.</p>
          </div>
          <span className="text-xs font-bold bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">5 Total Actions</span>
        </div>

        <div className="divide-y divide-slate-800">
          {tasks.map((task) => (
            <div key={task.id} className="p-6 flex items-center justify-between hover:bg-slate-800/50 transition">
              <div className="flex items-center gap-4">
                <button onClick={() => toggleTaskStatus(task.id)} className={`w-6 h-6 rounded-lg border flex items-center justify-center transition ${task.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : task.status === 'In Progress' ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-700 bg-slate-950'}`}>
                  {task.status === 'Completed' && <CheckCircle2 className="w-4 h-4" />}
                </button>
                <div>
                  <h4 className={`font-bold text-sm ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-white'}`}>{task.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded uppercase">{task.category}</span>
                    <span className="text-[10px] font-bold text-blue-400">Impact: {task.impact}</span>
                    <span className="text-[10px] font-bold text-slate-500">Timeline: {task.timeframe}</span>
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}