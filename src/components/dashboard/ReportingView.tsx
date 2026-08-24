// src/components/dashboard/ReportingView.tsx

import { useState } from 'react';
import { FileText, Download, CheckCircle2, TrendingUp, Award, ShieldCheck, Printer } from 'lucide-react';

export default function ReportingView() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  const handleExportPdf = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportedSuccess(true);
      setTimeout(() => setExportedSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Executive Analytics</span>
          <h2 className="text-2xl font-black text-slate-900">Monthly Brand Authority & Growth Report</h2>
          <p className="text-slate-500 text-sm mt-1">Client-ready performance wrap-up detailing traffic, authority gains, and conversion velocity.</p>
        </div>
        <button onClick={handleExportPdf} disabled={isExporting} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-widest transition shadow-md shadow-blue-600/20 flex items-center gap-2">
          {isExporting ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span> : <Download className="w-4 h-4" />}
          <span>{isExporting ? 'Generating PDF...' : 'Export Client Report (PDF)'}</span>
        </button>
      </div>

      {exportedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>Executive Report successfully compiled and downloaded as PDF! Ready for client delivery.</span>
        </div>
      )}

      {/* Report Preview Canvas */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 space-y-10">
        
        {/* Report Header */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">SiteForge Growth Intelligence</span>
            <h3 className="text-3xl font-black text-slate-900 mt-1">Performance Summary</h3>
            <p className="text-xs text-slate-400 mt-1">Reporting Period: August 2026 • Target Hub: Vasai West</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-slate-900 block">78 / 100</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mt-1">+6 pts this month</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Organic Search Traffic</span>
            <span className="text-2xl font-black text-slate-900 mt-2 block">+240%</span>
            <span className="text-xs text-emerald-600 font-bold mt-1 block">↑ 1,840 visits</span>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Qualified Inquiries</span>
            <span className="text-2xl font-black text-slate-900 mt-2 block">+142%</span>
            <span className="text-xs text-emerald-600 font-bold mt-1 block">↑ 38 leads</span>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Google Maps Rank</span>
            <span className="text-2xl font-black text-blue-600 mt-2 block">#1 Position</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Vasai West Pack</span>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Verified Reviews</span>
            <span className="text-2xl font-black text-slate-900 mt-2 block">4.9 ★</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">38 Total Ratings</span>
          </div>
        </div>

        {/* Strategic Highlights */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Key Strategic Achievements</h4>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>Successfully deployed sub-second edge architecture, improving Core Web Vitals score to 98/100.</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>Injected JSON-LD LocalBusiness Schema resulting in complete entity verification across Google and Bing.</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span>Secured high-authority regional press feature on YourStory India, driving tier-1 backlink equity.</span>
            </li>
          </ul>
        </div>

        {/* Next Month Priorities */}
        <div className="bg-blue-50/60 border border-blue-100 p-6 rounded-2xl space-y-3">
          <h4 className="font-bold text-sm text-blue-900 uppercase tracking-wider">Next Month Priorities (30-Day Outlook)</h4>
          <p className="text-xs text-blue-800 leading-relaxed">Expand topical authority by publishing 3 targeted service landing pages for Vasai East and the Industrial Estate, and scale automated review velocity follow-ups.</p>
        </div>

      </div>

    </div>
  );
}