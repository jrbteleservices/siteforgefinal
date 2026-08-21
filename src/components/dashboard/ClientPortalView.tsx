import { useState } from 'react';

interface ClientReview {
  id: string;
  clientName: string;
  businessName: string;
  status: 'Pending Review' | 'Revision Requested' | 'Approved & Live';
  previewUrl: string;
  lastUpdated: string;
}

export default function ClientPortalView() {
  const [reviews, setReviews] = useState<ClientReview[]>([
    {
      id: '1',
      clientName: 'Michael Anderson',
      businessName: 'Apex Melbourne Trades',
      status: 'Approved & Live',
      previewUrl: 'https://siteforge.local/preview/apex-melbourne',
      lastUpdated: '2026-08-21'
    },
    {
      id: '2',
      clientName: 'Sarah Jenkins',
      businessName: 'Metro Roof Restorations',
      status: 'Revision Requested',
      previewUrl: 'https://siteforge.local/preview/metro-roof',
      lastUpdated: '2026-08-22'
    }
  ]);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Client preview link copied to clipboard!');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Client Review & Handoff Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Manage client sign-offs, review status, and secure feedback links</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-700">
          Active Portals: {reviews.length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-white">{rev.businessName}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold uppercase ${
                  rev.status === 'Approved & Live' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {rev.status}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">Client Contact: <span className="text-white font-medium">{rev.clientName}</span></p>
              <span className="text-xs text-slate-500 mt-2 block">
                Last Updated: {rev.lastUpdated}
              </span>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => handleCopyLink(rev.previewUrl)}
                className="flex-1 md:flex-initial bg-slate-800 hover:bg-slate-700 transition px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 border border-slate-700"
              >
                Copy Review Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}