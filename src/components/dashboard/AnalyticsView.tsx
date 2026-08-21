import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface AnalyticsEvent {
  id: string;
  type: string;
  path?: string;
  created_at: string;
}

export default function AnalyticsView() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching analytics events:', error.message);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="p-8 text-slate-400">Loading platform analytics...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Platform Analytics & Event Tracking</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time visitor interactions and page view metrics across client trade sites</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-700">
          Total Events: {events.length}
        </div>
      </div>

      {events.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400">No tracking events recorded yet. Events will appear here as visitors interact with your deployed sites.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {events.map((ev) => (
            <div key={ev.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex justify-between items-center shadow-xl">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-white uppercase tracking-wider">Event: {ev.type}</h3>
                  <span className="text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20 font-semibold">
                    {ev.path || '/'}
                  </span>
                </div>
                <span className="text-xs text-slate-500 mt-2 block">
                  Timestamp: {new Date(ev.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}