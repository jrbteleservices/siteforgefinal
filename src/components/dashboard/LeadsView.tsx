import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  created_at: string;
}

export default function LeadsView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error.message);
      } else {
        setLeads(data || []);
      }
      setLoading(false);
    }

    fetchLeads();
  }, []);

  if (loading) {
    return <div className="p-8 text-slate-400">Loading incoming leads...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Lead Management Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time enquiries submitted from your client trade websites</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-700">
          Total Leads: {leads.length}
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400">No leads captured yet. Try filling out the quote form on one of your templates!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-white">{lead.name}</h3>
                  <span className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20 font-semibold">
                    {lead.phone}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mt-2">{lead.message}</p>
                <span className="text-xs text-slate-500 mt-3 block">
                  Received: {new Date(lead.created_at).toLocaleString()}
                </span>
              </div>
              <a 
                href={`tel:${lead.phone}`}
                className="bg-emerald-600 hover:bg-emerald-500 transition px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 text-black"
              >
                Call Lead Now
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}