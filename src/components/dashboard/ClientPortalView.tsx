import { useState } from 'react';

interface ClientReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ClientPortalView() {
  // `setReviews` removed to satisfy strict tsconfig noUnusedLocals rule
  const [reviews] = useState<ClientReview[]>([
    { id: '1', author: 'Sarah Jenkins', rating: 5, comment: 'Fixed our burst pipe within an hour. Absolute lifesaver!', date: '2026-06-12' },
    { id: '2', author: 'Mark Henderson', rating: 5, comment: 'Professional website preview and fast booking response. Highly recommend.', date: '2026-06-10' }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'settings'>('overview');

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8 text-slate-100">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white">Client <span className="text-blue-500">Portal</span></h1>
        <p className="text-sm text-slate-400 mt-1">Manage your customer-facing portal view, reviews, and client settings.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${activeTab === 'reviews' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          Customer Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          Portal Settings
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Portal Status</h3>
            <p className="text-2xl font-black text-emerald-400 mt-2">Active & Live</p>
            <p className="text-xs text-slate-500 mt-1">Clients can access via your custom domain subpath.</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Average Rating</h3>
            <p className="text-2xl font-black text-blue-400 mt-2">5.0 / 5.0</p>
            <p className="text-xs text-slate-500 mt-1">Based on verified customer feedback.</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Inquiries</h3>
            <p className="text-2xl font-black text-purple-400 mt-2">24 Leads</p>
            <p className="text-xs text-slate-500 mt-1">Captured through portal forms this month.</p>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white">Verified Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{review.author}</span>
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>
                <div className="flex text-amber-400 text-xs">{'★'.repeat(review.rating)}</div>
                <p className="text-slate-300 text-sm">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl max-w-xl flex flex-col gap-4">
          <h2 className="text-lg font-bold text-white">Portal Configuration</h2>
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Public Support Email</label>
            <input 
              type="email" 
              defaultValue="support@apextrades.com.au" 
              className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Welcome Banner Message</label>
            <textarea 
              rows={3} 
              defaultValue="Welcome to our client support portal. Submit inquiries or track job status below." 
              className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500" 
            />
          </div>
          <button 
            onClick={() => alert('Settings saved successfully!')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-sm transition shadow-lg shadow-blue-600/20 w-max"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}