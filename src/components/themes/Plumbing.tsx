import LeadForm from '../common/LeadForm';

interface ThemeProps {
  businessName: string;
  phone: string;
  suburb: string;
}

export default function PlumbingTemplate({ businessName, phone, suburb }: ThemeProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black">
      <header className="p-6 flex justify-between items-center border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <h1 className="text-xl font-extrabold tracking-tight">{businessName || "Your Plumbing Co"}</h1>
        <a href={`tel:${phone}`} className="bg-blue-600 hover:bg-blue-500 transition px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20">
          Call 24/7: {phone || "0400 000 000"}
        </a>
      </header>
      <main className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/20">
            Emergency Response in {suburb || "Melbourne"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-6 mb-4">
            Reliable Emergency Plumbers in {suburb || "Your Area"}
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Fast response times, upfront transparent pricing, and expert local service for all your plumbing needs.
          </p>
        </div>
        <div>
          <LeadForm businessName={businessName || "Plumbing Co"} />
        </div>
      </main>
    </div>
  );
}