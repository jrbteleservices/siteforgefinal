import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface WebhookRecord {
  id: string;
  url: string;
  events: string[];
  is_active: boolean;
  created_at: string;
}

export default function WebhooksView() {
  const [webhooks, setWebhooks] = useState<WebhookRecord[]>([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWebhooks();
  }, []);

  async function fetchWebhooks() {
    const { data, error } = await supabase
      .from('webhooks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching webhooks:', error.message);
    } else {
      setWebhooks(data || []);
    }
    setLoading(false);
  }

  async function handleAddWebhook(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;

    const { error } = await supabase
      .from('webhooks')
      .insert([
        {
          url: url.trim(),
          events: ['lead.created'],
          is_active: true,
          user_id: '00000000-0000-0000-0000-000000000000'
        }
      ]);

    if (error) {
      alert('Error creating webhook: ' + error.message);
    } else {
      setUrl('');
      fetchWebhooks();
    }
  }

  if (loading) {
    return <div className="p-8 text-slate-400">Loading webhook configurations...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Webhook Notifications</h1>
          <p className="text-slate-400 text-sm mt-1">Configure real-time endpoint triggers for incoming client leads and system events</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-700">
          Active Endpoints: {webhooks.filter(w => w.is_active).length}
        </div>
      </div>

      <form onSubmit={handleAddWebhook} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-end shadow-xl">
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Webhook Endpoint URL</label>
          <input 
            type="url" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 text-white w-full md:w-auto"
        >
          Add Webhook
        </button>
      </form>

      {webhooks.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400">No webhooks registered yet. Add an endpoint above to receive automated lead alerts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {webhooks.map((wh) => (
            <div key={wh.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-sm text-blue-400 font-mono">{wh.url}</h3>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold uppercase">
                    lead.created
                  </span>
                </div>
                <span className="text-xs text-slate-500 mt-2 block">
                  Created: {new Date(wh.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-bold">
                Active
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}