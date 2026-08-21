import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface DomainRecord {
  id: string;
  domain: string;
  status: string;
  registrar?: string;
  created_at: string;
}

export default function DomainsView() {
  const [domains, setDomains] = useState<DomainRecord[]>([]);
  const [newDomain, setNewDomain] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDomains();
  }, []);

  async function fetchDomains() {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching domains:', error.message);
    } else {
      setDomains(data || []);
    }
    setLoading(false);
  }

  async function handleAddDomain(e: React.FormEvent) {
    e.preventDefault();
    if (!newDomain) return;

    const { error } = await supabase
      .from('domains')
      .insert([
        {
          domain: newDomain.trim(),
          status: 'pending_dns',
          user_id: '00000000-0000-0000-0000-000000000000',
          kind: 'connect'
        }
      ]);

    if (error) {
      alert('Error adding domain: ' + error.message);
    } else {
      setNewDomain('');
      fetchDomains();
    }
  }

  if (loading) {
    return <div className="p-8 text-slate-400">Loading domain configurations...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Custom Domain Management</h1>
          <p className="text-slate-400 text-sm mt-1">Map and verify custom domains for your client trade websites</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-700">
          Active Domains: {domains.length}
        </div>
      </div>

      <form onSubmit={handleAddDomain} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-end shadow-xl">
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Connect Custom Domain</label>
          <input 
            type="text" 
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="e.g. stkilduplumbing.com.au"
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 text-white w-full md:w-auto"
        >
          Add Domain
        </button>
      </form>

      {domains.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400">No custom domains mapped yet. Add one above to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {domains.map((d) => (
            <div key={d.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-white">{d.domain}</h3>
                  <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/20 font-semibold uppercase">
                    {d.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  Configure DNS CNAME record pointing to <code className="text-blue-400">proxy.siteforge.local</code>
                </p>
              </div>
              <div className="text-xs text-slate-500">
                Added: {new Date(d.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}