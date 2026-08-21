import LeadForm from '../common/LeadForm';

interface ThemeProps {
  businessName: string;
  phone: string;
  suburb: string;
}

export default function RoofingTemplate({ businessName, phone, suburb }: ThemeProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-orange-500 selection:text-black">
      <header className="p-6 flex justify-between items-center border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <h1 className="text-xl font-black tracking-tight text-orange-500">{businessName || "Apex Roofing"}</h1>
        <a href={`tel:${phone}`} className="bg-orange-600 hover:bg-orange-500 transition px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-orange-600/20">
          Emergency Call: {phone || "0400 000 000"}
        </a>
      </header>
      <main className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="bg-orange-500/10 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-orange-500/20">
            Licensed & Insured Roof Restorations in {suburb || "Melbourne"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-6 mb-4">
            Protect Your Home With Expert Roofing in {suburb || "Your Area"}
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Tile and metal roof repairs, leak detection, restorations, and complete re-roofing by certified local professionals.
          </p>
        </div>
        <div>
          <LeadForm businessName={businessName || "Roofing Co"} />
        </div>
      </main>
    </div>
  );
}