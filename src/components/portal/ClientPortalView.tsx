// src/components/dashboard/ClientPortalView.tsx

import React, { useState } from 'react';
import { UserRole } from '../../data/agencyStore';

export default function ClientPortalView() {
  const [currentRole, setCurrentRole] = useState<UserRole>('Agency Owner');
  const leads = JSON.parse(localStorage.getItem('siteforge_leads') || '[]');

  return (
    <div className="space-y-8 animate-in text-white fade-in">
      <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl font-black">Client Portal & RBAC Security</h2>
          <p className="text-xs text-slate-400 mt-1">Simulate role-based views to test tenant isolation and permissions.</p>
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Active User Role</label>
          <select value={currentRole} onChange={e => setCurrentRole(e.target.value as UserRole)} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-amber-400">
            <option value="Agency Owner">Agency Owner (Full Access)</option>
            <option value="Agency Admin">Agency Admin</option>
            <option value="Designer">Designer</option>
            <option value="Client">Client (Restricted View)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-blue-400 uppercase tracking-wider">Project Leads & Submissions</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {leads.map((lead: any, i: number) => (
              <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span>{lead.name}</span>
                  <span className="text-slate-500 font-mono">{new Date(lead.date).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-400">{lead.email} | {lead.phone}</p>
                <p className="text-slate-300 italic">"{lead.message}"</p>
              </div>
            ))}
            {!leads.length && <p className="text-xs text-slate-500 italic">No leads captured yet.</p>}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-amber-400 uppercase tracking-wider">Tenant Access Permissions</h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span>View Analytics & Leads</span>
              <span className="text-emerald-400 font-bold">Allowed</span>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span>Edit Global Brand Settings</span>
              <span className={currentRole === 'Client' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                {currentRole === 'Client' ? 'Restricted' : 'Allowed'}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span>Manage Billing & Domains</span>
              <span className={currentRole === 'Client' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                {currentRole === 'Client' ? 'Restricted' : 'Allowed'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}