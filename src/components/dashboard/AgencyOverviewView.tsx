// src/components/dashboard/AgencyOverviewView.tsx

import React, { useState } from 'react';
import { INITIAL_PROJECTS, INITIAL_CLIENTS, AgencySiteProject, ClientRecord } from '../../data/agencyStore';

export default function AgencyOverviewView({ onSelectProject }: { onSelectProject: (proj: AgencySiteProject) => void }) {
  const [projects, setProjects] = useState<AgencySiteProject[]>(() => {
    const saved = localStorage.getItem('siteforge_agency_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });
  const [clients] = useState<ClientRecord[]>(INITIAL_CLIENTS);

  const liveCount = projects.filter(p => p.status === 'Live').length;
  const draftCount = projects.filter(p => p.status === 'Draft' || p.status === 'Demo').length;
  const leadsCount = JSON.parse(localStorage.getItem('siteforge_leads') || '[]').length;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Total Websites</span>
          <span className="text-3xl font-black text-white">{projects.length}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-1">Live Websites</span>
          <span className="text-3xl font-black text-emerald-400">{liveCount}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-1">Drafts & Demos</span>
          <span className="text-3xl font-black text-amber-400">{draftCount}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">Captured Leads</span>
          <span className="text-3xl font-black text-blue-400">{leadsCount}</span>
        </div>
      </div>

      {/* MULTI-SITE MANAGEMENT TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-black text-white">Managed Client Projects</h3>
          <button onClick={() => alert("Create New Site modal triggered.")} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition">
            + New Website Project
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px]">
                <th className="pb-3">Project Name</th>
                <th className="pb-3">Industry</th>
                <th className="pb-3">Assigned Client</th>
                <th className="pb-3">Domain</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Last Edited</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map(proj => (
                <tr key={proj.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-4 font-bold text-white">{proj.name}</td>
                  <td className="py-4 text-slate-400 uppercase font-mono">{proj.industry}</td>
                  <td className="py-4 text-slate-300">{proj.clientName}</td>
                  <td className="py-4 font-mono text-blue-400">{proj.domain}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider ${
                      proj.status === 'Live' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                      proj.status === 'Demo' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                      'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-400">{proj.lastEdited}</td>
                  <td className="py-4 text-right">
                    <button onClick={() => onSelectProject(proj)} className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white font-bold rounded-lg transition">
                      Open in Builder →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}