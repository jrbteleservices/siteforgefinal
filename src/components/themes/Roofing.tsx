import { useState } from 'react';
import { Phone, MessageCircle, CheckCircle, ShieldCheck, Home, ChevronDown, ChevronUp, MapPin, Mail, ShoppingCart } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// 1. ADDED THE NEW INTERFACES
interface ServiceItem { id: string; title: string; desc: string; image?: string; }
interface ProjectItem { id: string; subtitle: string; title: string; desc: string; image?: string; }
interface Product { id: string; name: string; price: string; }

interface TemplateProps {
  businessName: string; phone: string; suburb: string;
  logo?: string | null; heroImage?: string | null; heroOpacity: number;
  headers: {
    services: { sub: string; main: string; desc: string; };
    whyUs: { sub: string; main: string; };
    projects: { sub: string; main: string; };
  };
  servicesList: ServiceItem[]; projectsList: ProjectItem[];
  showProducts: boolean; products: Product[]; activeSections: any;
  themeMode: 'light' | 'dark'; // INJECTED GLOBAL THEME PROP
}

export default function RoofingTemplate({ 
  businessName, phone, suburb, logo, heroImage, heroOpacity, 
  headers, servicesList, projectsList, showProducts, products, activeSections, themeMode 
}: TemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const displayHero = heroImage || "https://images.unsplash.com/photo-1632758999887-cb8ed0984856?auto=format&fit=crop&w=1200&q=80";
  const overlayOpacity = heroOpacity / 100; 

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('leads').insert([{
        owner_id: user?.id || '00000000-0000-0000-0000-000000000000',
        name: leadName, email: leadEmail || 'no-email@provided.com', phone: leadPhone,
        message: `[Roofing Inquiry - ${suburb}] ${leadMessage}`
    }]);
    setLoading(false);
    if (error) alert('Error submitting inquiry: ' + error.message);
    else setSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // --- DYNAMIC COLOR MAPPING LOGIC ---
  const isDark = themeMode === 'dark';
  const bgMain = isDark ? 'bg-stone-950' : 'bg-stone-50';
  const textMain = isDark ? 'text-stone-100' : 'text-stone-900';
  const textMuted = isDark ? 'text-stone-400' : 'text-stone-500';
  const bgCard = isDark ? 'bg-stone-900' : 'bg-white';
  const borderMuted = isDark ? 'border-stone-800' : 'border-stone-200';
  const bgHeader = isDark ? 'bg-stone-950/80' : 'bg-white/80';
  const inputBg = isDark ? 'bg-stone-950' : 'bg-stone-50';
  const iconBoxBg = isDark ? 'bg-stone-800' : 'bg-stone-100';

  return (
    <div className={`${bgMain} ${textMain} min-h-screen font-sans selection:bg-amber-500 selection:text-stone-950 transition-colors duration-300`}>
      
      {/* 1. STICKY NAVIGATION BAR */}
      <header className={`sticky top-0 z-40 ${bgHeader} backdrop-blur-md border-b ${borderMuted} px-8 py-4 flex justify-between items-center transition-colors duration-300`}>
        <div className="flex items-center gap-3">
          {logo ? (
            <img src={logo} alt={businessName} className="h-9 object-contain" />
          ) : (
            <div className={`w-9 h-9 ${isDark ? 'bg-amber-600' : 'bg-amber-500'} flex items-center justify-center font-black text-lg shadow-lg text-stone-950 clip-path-polygon-[50%_0%,_100%_100%,_0%_100%]`}>
              {businessName.charAt(0)}
            </div>
          )}
          <span className={`font-extrabold text-lg tracking-tight ${textMain}`}>{businessName}</span>
        </div>
        
        <nav className={`hidden md:flex items-center gap-8 text-xs font-bold ${textMuted} uppercase tracking-wider`}>
          {activeSections.services && <a href="#services" className="hover:text-amber-500 transition">Services</a>}
          {activeSections.whyUs && <a href="#why-us" className="hover:text-amber-500 transition">Why Us</a>}
          {activeSections.projects && <a href="#projects" className="hover:text-amber-500 transition">Projects</a>}
          {activeSections.faq && <a href="#faq" className="hover:text-amber-500 transition">FAQ</a>}
          {showProducts && <a href="#products" className="hover:text-amber-500 transition">Pricing</a>}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${phone}`} className={`hidden sm:flex items-center gap-2 ${bgCard} border ${borderMuted} px-4 py-2.5 rounded-xl font-bold text-xs transition ${textMain} hover:border-amber-500`}>
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            {phone}
          </a>
          <a href="#contact" className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-lg shadow-amber-500/20">
            Get a Quote
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION (ALWAYS DARK TEXT FOR IMAGE VISIBILITY) */}
      {activeSections.hero && (
        <section className="relative px-8 py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Dynamic Background Image placed absolutely behind everything */}
          <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-0" style={{ backgroundImage: `url(${displayHero})` }}>
            <div className="absolute inset-0 bg-stone-950 mix-blend-multiply transition-opacity duration-300" style={{ opacity: overlayOpacity }}></div>
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-bold w-max backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" /> LICENSED ROOFING & RESTORATIONS
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
              SECURE, WEATHERPROOF ROOFING IN <span className="text-amber-500">{suburb.toUpperCase()}</span>
            </h1>
            <p className="text-stone-200 text-base max-w-lg drop-shadow-md">
              From emergency leak repairs to full roof restorations, {businessName} delivers unmatched durability and craftsmanship.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#contact" className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-4 px-8 rounded-2xl text-sm transition shadow-xl shadow-amber-500/30 flex items-center gap-3">
                Get a Free Quote
              </a>
              <a href={`tel:${phone}`} className="bg-stone-900/80 backdrop-blur-md hover:bg-stone-800 border border-stone-700 text-white font-bold py-4 px-8 rounded-2xl text-sm transition flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400" /> Call {phone}
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-800/50 text-xs font-bold text-stone-300">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Local Team</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Clear Pricing</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Fast Response</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Tidy Work</div>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-stone-900/90 backdrop-blur-sm border border-stone-700 p-8 rounded-3xl flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <span className="font-bold text-sm text-white">Live Service Request</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <div className="space-y-3">
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 text-xs text-stone-300">
                  ⚡ Average dispatch time in <span className="text-white font-bold">{suburb}</span>: <span className="text-emerald-400 font-bold">28 minutes</span>
                </div>
              </div>
              <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 py-3.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> Instant Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 3. DYNAMIC SERVICES SECTION */}
      {activeSections.services && (
        <section id="services" className={`py-20 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">{headers.services.sub}</h2>
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>{headers.services.main}</h3>
            <p className={`${textMuted} text-sm mt-2`}>{headers.services.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesList.map((service) => (
              <div key={service.id} className={`${bgCard} border ${borderMuted} hover:border-amber-500/50 rounded-3xl overflow-hidden transition flex flex-col group`}>
                {service.image ? (
                  <div className="h-48 w-full">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                ) : (
                  <div className={`h-32 ${iconBoxBg} flex items-center justify-center border-b ${borderMuted}`}>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-stone-950 transition">
                      <Home className="w-5 h-5" />
                    </div>
                  </div>
                )}
                <div className="p-8 flex flex-col gap-3 flex-1">
                  <h4 className={`text-lg font-bold ${textMain}`}>{service.title}</h4>
                  <p className={`${textMuted} text-xs leading-relaxed`}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. WHY CHOOSE US */}
      {activeSections.whyUs && (
        <section id="why-us" className={`py-20 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">{headers.whyUs.sub}</h2>
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>{headers.whyUs.main}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Local Team', desc: `Based nearby and on the road every day in ${suburb}.` },
              { title: 'Clear Pricing', desc: 'Written fixed quotes provided before any work starts.' },
              { title: 'Fast Response', desc: 'Same-day priority replies to every emergency enquiry.' },
              { title: 'Tidy Work', desc: 'We always clean up our workspace completely when finished.' }
            ].map((item, i) => (
              <div key={i} className={`${isDark ? 'bg-stone-900/40' : 'bg-white'} border ${borderMuted} p-6 rounded-2xl flex flex-col gap-2 shadow-sm`}>
                <h4 className={`font-bold ${textMain} text-sm`}>{item.title}</h4>
                <p className={`${textMuted} text-xs`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. DYNAMIC PROJECTS GALLERY */}
      {activeSections.projects && (
        <section id="projects" className={`py-20 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">{headers.projects.sub}</h2>
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>{headers.projects.main}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsList.map((proj) => (
              <div key={proj.id} className={`${bgCard} border ${borderMuted} rounded-3xl overflow-hidden flex flex-col group relative shadow-md`}>
                {proj.image ? (
                  <div className="h-64 w-full relative">
                    <div className="absolute inset-0 bg-stone-900/40 z-10"></div>
                    <img src={proj.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 relative z-0" />
                  </div>
                ) : (
                  <div className={`h-64 ${iconBoxBg} flex items-center justify-center ${textMuted} font-bold text-sm`}>Image Pending</div>
                )}
                
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent z-20 pt-20">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{proj.subtitle}</span>
                  <h4 className="font-bold text-white text-xl mt-1">{proj.title}</h4>
                  <p className="text-sm text-stone-300 mt-2">{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. COMMERCE / PRODUCTS SECTION */}
      {showProducts && products.length > 0 && (
        <section id="products" className={`py-20 px-8 max-w-7xl mx-auto border-t ${borderMuted} ${isDark ? 'bg-stone-900/30' : 'bg-stone-100'} rounded-3xl my-12 border-dashed`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">FIXED PRICING</h2>
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>Book an Inspection</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className={`${bgCard} border ${borderMuted} p-8 rounded-2xl flex flex-col items-center text-center gap-5 hover:border-amber-500/50 transition relative overflow-hidden group shadow-sm`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                <h4 className={`font-bold ${textMain} text-lg relative z-10`}>{product.name}</h4>
                <div className="text-4xl font-black text-amber-500 relative z-10">${product.price}</div>
                <button className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2 relative z-10">
                  <ShoppingCart className="w-4 h-4" /> Book Now
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      {activeSections.faq && (
        <section id="faq" className={`py-20 px-8 max-w-4xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">SUPPORT</h2>
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>Frequently Asked Questions</h3>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { q: 'Do you provide free quotes?', a: 'Yes, we provide transparent, written quotes with zero hidden fees before starting any work.' },
              { q: 'How quickly can you arrive for an emergency leak?', a: 'Our local technicians are dispatched immediately and typically arrive within 30 to 45 minutes.' },
              { q: 'Are your roofers fully licensed and insured?', a: 'All team members carry full trade licenses, safety training, and comprehensive public liability insurance.' }
            ].map((faq, i) => (
              <div key={i} className={`${bgCard} border ${borderMuted} rounded-2xl overflow-hidden shadow-sm`}>
                <button 
                  onClick={() => toggleFaq(i)}
                  className={`w-full p-6 text-left font-bold text-sm ${textMain} flex justify-between items-center ${isDark ? 'hover:bg-stone-800' : 'hover:bg-stone-50'} transition`}
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className={`w-4 h-4 ${textMuted}`} />}
                </button>
                {openFaq === i && (
                  <div className={`px-6 pb-6 text-xs ${textMuted} leading-relaxed border-t ${borderMuted} pt-4`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. GET IN TOUCH FOOTER */}
      {activeSections.contact && (
        <footer id="contact" className={`py-20 px-8 max-w-7xl mx-auto border-t ${borderMuted} grid grid-cols-1 lg:grid-cols-2 gap-12`}>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3">GET IN TOUCH</h2>
              <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>Ready to Get Started?</h3>
              <p className={`${textMuted} text-sm mt-2`}>Send us a message and we’ll get straight back to you.</p>
            </div>

            <div className={`flex flex-col gap-4 text-sm ${textMuted}`}>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>support@{businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.au</span>
              </div>
            </div>
          </div>

          <div className={`${bgCard} border ${borderMuted} p-8 rounded-3xl shadow-xl`}>
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl text-center flex flex-col items-center gap-3">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
                <h4 className="text-lg font-bold text-emerald-500">Inquiry Sent Successfully!</h4>
                <p className={`${textMuted} text-xs`}>Thank you. {businessName} has received your message and will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                <h4 className={`text-base font-bold ${textMain} mb-2`}>Send a Message</h4>
                <div>
                  <label className={`text-xs font-bold ${textMuted} uppercase`}>Your Name</label>
                  <input type="text" required value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="John Smith" className={`mt-1 w-full ${inputBg} border ${borderMuted} rounded-xl p-3 text-xs ${textMain} focus:outline-none focus:border-amber-500`} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs font-bold ${textMuted} uppercase`}>Email</label>
                    <input type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="john@example.com" className={`mt-1 w-full ${inputBg} border ${borderMuted} rounded-xl p-3 text-xs ${textMain} focus:outline-none focus:border-amber-500`} />
                  </div>
                  <div>
                    <label className={`text-xs font-bold ${textMuted} uppercase`}>Phone</label>
                    <input type="tel" required value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} placeholder="0400 000 000" className={`mt-1 w-full ${inputBg} border ${borderMuted} rounded-xl p-3 text-xs ${textMain} focus:outline-none focus:border-amber-500`} />
                  </div>
                </div>
                <div>
                  <label className={`text-xs font-bold ${textMuted} uppercase`}>How can we help?</label>
                  <textarea rows={3} required value={leadMessage} onChange={(e) => setLeadMessage(e.target.value)} placeholder="Describe your project or emergency..." className={`mt-1 w-full ${inputBg} border ${borderMuted} rounded-xl p-3 text-xs ${textMain} focus:outline-none focus:border-amber-500`} />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 rounded-xl text-xs transition shadow-lg shadow-amber-500/20 mt-2">
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}