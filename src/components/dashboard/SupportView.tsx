import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface SupportRequest {
  id: string;
  category: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export default function SupportView() {
  const [tickets, setTickets] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    const { data, error } = await supabase
      .from('support_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching support requests:', error.message);
    } else {
      setTickets(data || []);
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="p-8 text-slate-400">Loading support tickets...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Support Ticketing & Help Desk</h1>
          <p className="text-slate-400 text-sm mt-1">Manage client inquiries, technical questions, and platform support requests</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-700">
          Open Tickets: {tickets.filter(t => t.status === 'open').length}
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400">No support tickets found in your database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-white">{ticket.subject}</h3>
                  <span className="text-xs bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-full border border-purple-500/20 font-semibold uppercase">
                    {ticket.category}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold uppercase ${
                    ticket.status === 'open' 
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mt-2">{ticket.message}</p>
                <span className="text-xs text-slate-500 mt-3 block">
                  Submitted: {new Date(ticket.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}