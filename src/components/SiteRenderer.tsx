import { DESIGN_CONCEPTS } from '../lib/design-systems';
import { getIndustryImages } from '../lib/image-plan';

interface SiteRendererProps {
  businessName: string;
  phone: string;
  suburb: string;
  theme: string;
  concept?: string;
}

export function SiteRenderer({ businessName, phone, suburb, theme, concept = 'conversion' }: SiteRendererProps) {
  const design = DESIGN_CONCEPTS[concept] || DESIGN_CONCEPTS.conversion;
  const images = getIndustryImages(theme, suburb);

  return (
    <div className={`min-h-full bg-slate-950 text-slate-100 ${design.fontFamily} pb-24`}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg text-white shadow-lg">
            {businessName.charAt(0)}
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">{businessName}</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <a href="#services" className="hover:text-blue-400 transition">What We Do</a>
          <a href="#why-us" className="hover:text-blue-400 transition">Why Us</a>
          <a href="#projects" className="hover:text-blue-400 transition">Portfolio</a>
          <a href="#contact" className="hover:text-blue-400 transition">Get in Touch</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${phone}`} className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs text-white">
            {phone}
          </a>
          <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-lg">
            Get a Quote
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className={`inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs w-max ${design.badgeStyle}`}>
            VERIFIED LOCAL SPECIALISTS IN {suburb.toUpperCase()}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
            PROFESSIONAL <span className="text-blue-500">{theme.toUpperCase()}</span> IN {suburb.toUpperCase()}
          </h1>
          <p className="text-slate-300 text-base max-w-lg">
            Fast response times, upfront transparent pricing, and expert care handled by your trusted local team in {suburb}.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl text-sm transition shadow-xl">
              Get a Free Quote
            </a>
            <a href={`tel:${phone}`} className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-4 px-8 rounded-2xl text-sm transition">
              Call {phone}
            </a>
          </div>
        </div>

        <div className={design.cardStyle}>
          <img src={images.hero} alt={businessName} className="w-full h-[360px] object-cover rounded-2xl shadow-2xl" />
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">OUR CAPABILITIES</h2>
          <h3 className="text-3xl font-black text-white tracking-tight">What We Do</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.services.map((img, idx) => (
            <div key={idx} className={design.cardStyle + " flex flex-col gap-4 overflow-hidden group"}>
              <img src={img} alt="Service" className="h-48 w-full object-cover rounded-xl group-hover:scale-105 transition duration-500" />
              <h4 className="text-lg font-bold text-white">Specialized Service #{idx + 1}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Tailored execution and professional maintenance delivered across {suburb}.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">GET IN TOUCH</h2>
            <h3 className="text-3xl font-black text-white tracking-tight">Ready to Get Started?</h3>
            <p className="text-slate-400 text-sm mt-2">Send us a message and we’ll get straight back to you.</p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-slate-300">
            <div>📞 <strong>Phone:</strong> {phone}</div>
            <div>🏢 <strong>Address:</strong> Suite 4, 128 Main Street, {suburb}</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent successfully!'); }} className="flex flex-col gap-4">
            <input type="text" required placeholder="Your Name" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" />
            <input type="tel" required placeholder="Phone Number" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" />
            <textarea rows={3} required placeholder="Describe your inquiry..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"></textarea>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs transition">Send Message</button>
          </form>
        </div>
      </footer>
    </div>
  );
}