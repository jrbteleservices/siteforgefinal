import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { createCheckoutSession } from '../../utils/stripe';

const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface SubscriptionRecord {
  id: string;
  plan_code: string;
  amount_cents: number;
  currency: string;
  status: string;
  current_period_end?: string;
  created_at: string;
}

export default function SubscriptionsView() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  async function fetchSubscriptions() {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching subscriptions:', error.message);
    } else {
      setSubscriptions(data || []);
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="p-8 text-slate-400">Loading subscription records...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Subscription & Billing Management</h1>
          <p className="text-slate-400 text-sm mt-1">Monitor active client subscription tiers, billing cycles, and payment statuses</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-700">
          Active Subscriptions: {subscriptions.length}
        </div>
      </div>

      {/* PRICING PLANS UPGRADE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-bold uppercase tracking-wider">
              Standard Trade Plan
            </span>
            <h3 className="text-3xl font-black mt-4">$49 AUD <span className="text-xs text-slate-400 font-normal">/ month</span></h3>
            <p className="text-slate-400 text-sm mt-2">Perfect for single local trade businesses seeking automated lead capture and custom domains.</p>
          </div>
          <button 
            onClick={() => createCheckoutSession('standard', 4900)}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 text-white"
          >
            Upgrade to Standard
          </button>
        </div>

        <div className="bg-slate-900 border border-blue-500/40 p-8 rounded-3xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
            Popular
          </div>
          <div>
            <span className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20 font-bold uppercase tracking-wider">
              Agency Pro Plan
            </span>
            <h3 className="text-3xl font-black mt-4">$149 AUD <span className="text-xs text-slate-400 font-normal">/ month</span></h3>
            <p className="text-slate-400 text-sm mt-2">Unlimited trade websites, priority AI copywriting, advanced webhooks, and multi-tenant management.</p>
          </div>
          <button 
            onClick={() => createCheckoutSession('agency_pro', 14900)}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 text-white"
          >
            Upgrade to Agency Pro
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Active Billing History</h2>
      {subscriptions.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400">No active subscription records found. Choose a plan above to subscribe!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-white uppercase tracking-wider">Plan: {sub.plan_code}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold uppercase ${
                    sub.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {sub.status}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  Amount: <span className="text-white font-bold">{(sub.amount_cents / 100).toFixed(2)} {sub.currency}</span> / month
                </p>
                <span className="text-xs text-slate-500 mt-2 block">
                  Created: {new Date(sub.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300">
                Renewal: {sub.current_period_end ? new Date(sub.current_period_end).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}