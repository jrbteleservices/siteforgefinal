import { useState } from 'react';
import { Phone, MessageCircle, CheckCircle, ShieldCheck, Wind, ThermometerSun, ChevronDown, ChevronUp, MapPin, Mail, ShoppingCart, Facebook, Instagram, Star, Video } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ServiceItem { id: string; title: string; desc: string; image?: string; }
interface ProjectItem { id: string; subtitle: string; title: string; desc: string; image?: string; }
interface ReviewItem { id: string; name: string; rating: number; text: string; }
interface Product { id: string; name: string; price: string; }

interface TemplateProps {
  businessName: string; phone: string; suburb: string; city: string; streetAddress: string; email: string;
  socials: { facebook: string; instagram: string; tiktok: string; };
  colorPalette: string; logo?: string | null; heroImage?: string | null; heroOpacity: number;
  headers: any; servicesList: ServiceItem[]; projectsList: ProjectItem[]; reviewsList: ReviewItem[];
  showProducts: boolean; products: Product[]; activeSections: any; themeMode: 'light' | 'dark';
}

export default function HvacTemplate({ 
  businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
  logo, heroImage, heroOpacity, headers, servicesList, projectsList, reviewsList,
  showProducts, products, activeSections, themeMode 
}: TemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const displayHero = heroImage || "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80";
  const overlayOpacity = heroOpacity / 100; 

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('leads').insert([{
        owner_id: user?.id || '00000000-0000-0000-0000-000000000000',
        name: leadName, email: leadEmail || 'no-email@provided.com', phone: leadPhone,
        message: `[HVAC Inquiry - ${suburb}] ${leadMessage}`
    }]);
    setLoading(false);
    if (error) alert('Error submitting inquiry: ' + error.message); else setSubmitted(true);
  };

  const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

  // --- DYNAMIC LIGHT/DARK CLASSES ---
  const isDark = themeMode === 'dark';
  const bgMain = isDark ? 'bg-slate-950' : 'bg-slate-50';
  const textMain = isDark ? 'text-slate-100' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const bgCard = isDark ? 'bg-slate-900' : 'bg-white';
  const borderMuted = isDark ? 'border-slate-800' : 'border-slate-200';
  const bgHeader = isDark ? 'bg-slate-950/90' : 'bg-white/90';
  const inputBg = isDark ? 'bg-slate-950' : 'bg-slate-50';

  // --- COLOR PALETTE MAPPING ---
  const themeColors: Record<string, any> = {
    blue: { bg: 'bg-blue-500', hover: 'hover:bg-blue-400', text: 'text-blue-500', border: 'border-blue-500', lightBg: 'bg-blue-500/10' },
    emerald: { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-400', text: 'text-emerald-500', border: 'border-emerald-500', lightBg: 'bg-emerald-500/10' },
    rose: { bg: 'bg-rose-500', hover: 'hover:bg-rose-400', text: 'text-rose-500', border: 'border-rose-500', lightBg: 'bg-rose-500/10' },
    amber: { bg: 'bg-amber-500', hover: 'hover:bg-amber-400', text: 'text-amber-500', border: 'border-amber-500', lightBg: 'bg-amber-500/10' },
    violet: { bg: 'bg-violet-500', hover: 'hover:bg-violet-400', text: 'text-violet-500', border: 'border-violet-500', lightBg: 'bg-violet-500/10' },
    cyan: { bg: 'bg-cyan-500', hover: 'hover:bg-cyan-400', text: 'text-cyan-500', border: 'border-cyan-500', lightBg: 'bg-cyan-500/10' }
  };
  const c = themeColors[colorPalette] || themeColors.cyan; // Defaulting to Cyan for HVAC

  return (
    <div className={`${bgMain} ${textMain} min-h-screen font-sans transition-colors duration-300`}>
      
      {/* 1. HEADER */}
      <header className={`sticky top-0 z-40 ${bgHeader} backdrop-blur-md border-b ${borderMuted} px-8 py-4 flex justify-between items-center transition-colors duration-300`}>
        <div className="flex items-center gap-3">
          {logo ? (
            <img src={logo} alt={businessName} className="h-9 object-contain" />
          ) : (
            <div className={`w-10 h-10 ${c.lightBg} flex items-center justify-center font-black text-xl ${c.text} rounded-full shadow-inner`}>
              <Wind className="w-5 h-5" />
            </div>
          )}
          <span className={`font-extrabold text-xl tracking-tight ${textMain}`}>{businessName}</span>
        </div>
        
        <nav className={`hidden md:flex items-center gap-8 text-xs font-bold ${textMuted} uppercase tracking-wider`}>
          {activeSections.services && <a href="#services" className={`hover:${c.text} transition`}>Services</a>}
          {activeSections.projects && <a href="#projects" className={`hover:${c.text} transition`}>Installations</a>}
          {activeSections.reviews && <a href="#reviews" className={`hover:${c.text} transition`}>Reviews</a>}
          {showProducts && <a href="#products" className={`hover:${c.text} transition`}>Pricing</a>}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 mr-2 border-r border-slate-300 dark:border-slate-700 pr-4">
            {socials.facebook && <a href={socials.facebook} target="_blank" rel="noreferrer" className={`${textMuted} hover:${c.text} transition`}><Facebook className="w-4 h-4" /></a>}
            {socials.instagram && <a href={socials.instagram} target="_blank" rel="noreferrer" className={`${textMuted} hover:${c.text} transition`}><Instagram className="w-4 h-4" /></a>}
            {socials.tiktok && <a href={socials.tiktok} target="_blank" rel="noreferrer" className={`${textMuted} hover:${c.text} transition`}><Video className="w-4 h-4" /></a>}
          </div>
          <a href={`tel:${phone}`} className={`hidden sm:flex items-center gap-2 font-bold text-sm ${textMain} hover:${c.text} transition`}>
            {phone}
          </a>
          <a href="#contact" className={`${c.bg} ${c.hover} text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wide transition shadow-lg`}>
            Book Service
          </a>
        </div>
      </header>

      {/* 2. HERO */}
      {activeSections.hero && (
        <section className="relative px-8 py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-0" style={{ backgroundImage: `url(${displayHero})` }}>
            <div className="absolute inset-0 bg-slate-900 mix-blend-multiply transition-opacity duration-300" style={{ opacity: overlayOpacity }}></div>
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            <div className={`inline-flex items-center gap-2 ${c.lightBg} border ${c.border} border-opacity-30 px-4 py-1.5 rounded-full ${c.text} text-xs font-bold w-max uppercase tracking-widest backdrop-blur-sm`}>
              <ThermometerSun className="w-4 h-4" /> CLIMATE CONTROL EXPERTS
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
              PERFECT TEMP ALL YEAR IN <span className={c.text}>{suburb.toUpperCase()}</span>
            </h1>
            <p className="text-slate-200 text-lg max-w-lg drop-shadow-md">
              Keep your home comfortable with {businessName}. We specialize in rapid AC repairs, heating installations, and routine maintenance in {city}.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className={`${c.bg} ${c.hover} text-white font-black uppercase tracking-wide py-4 px-8 rounded-full text-sm transition shadow-xl`}>
                Schedule an Appointment
              </a>
            </div>
          </div>

          {activeSections.liveRequest && (
            <div className="relative z-10 hidden lg:block">
              <div className={`absolute -inset-1 ${c.bg} rounded-3xl blur-xl opacity-20 animate-pulse`}></div>
              <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl flex flex-col gap-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="font-bold text-sm text-white">Climate Control Dispatch</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                    ❄️ Same-day diagnostics for cooling system breakdowns in <span className="text-white font-bold">{suburb}</span>.
                  </div>
                </div>
                <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 py-3.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Instant Chat on WhatsApp
                </a>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 3. SERVICES */}
      {activeSections.services && (
        <section id="services" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{headers.services.sub}</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>{headers.services.main}</h3>
            <p className={`${textMuted} text-base mt-4`}>{headers.services.desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesList.map((service) => (
              <div key={service.id} className={`${bgCard} border ${borderMuted} hover:${c.border} shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition flex flex-col group`}>
                {service.image ? (
                  <div className="h-48 w-full"><img src={service.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /></div>
                ) : (
                  <div className={`h-32 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center border-b ${borderMuted}`}>
                    <ThermometerSun className={`w-10 h-10 ${c.text} group-hover:scale-110 transition`} />
                  </div>
                )}
                <div className="p-8 flex flex-col gap-3 flex-1">
                  <h4 className={`text-xl font-bold ${textMain}`}>{service.title}</h4>
                  <p className={`${textMuted} text-sm leading-relaxed`}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. REVIEWS SECTION */}
      {activeSections.reviews && reviewsList.length > 0 && (
        <section id="reviews" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted} ${isDark ? 'bg-slate-900/30' : 'bg-slate-100/50'} rounded-3xl my-8`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{headers.reviews.sub}</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>{headers.reviews.main}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsList.map((review) => (
              <div key={review.id} className={`${bgCard} border ${borderMuted} p-8 rounded-2xl flex flex-col gap-4 shadow-sm`}>
                <div className="flex gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
                  ))}
                </div>
                <p className={`${textMuted} text-sm italic flex-1`}>"{review.text}"</p>
                <div className="flex items-center gap-3 mt-2 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
                  <div className={`w-8 h-8 rounded-full ${c.lightBg} ${c.text} flex items-center justify-center font-bold text-xs`}>{review.name.charAt(0)}</div>
                  <span className={`font-bold ${textMain} text-sm`}>{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PROJECTS */}
      {activeSections.projects && (
        <section id="projects" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{headers.projects.sub}</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>{headers.projects.main}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsList.map((proj) => (
              <div key={proj.id} className={`${bgCard} border ${borderMuted} rounded-3xl overflow-hidden flex flex-col group relative`}>
                {proj.image ? (
                  <div className="h-80 w-full relative">
                    <div className="absolute inset-0 bg-slate-900/60 z-10 group-hover:bg-slate-900/40 transition duration-500"></div>
                    <img src={proj.image} className="w-full h-full object-cover relative z-0" />
                  </div>
                ) : (
                  <div className={`h-80 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center ${textMuted} font-bold text-sm`}>Image Pending</div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20 pt-20">
                  <span className={`text-[10px] font-black ${c.text} uppercase tracking-widest`}>{proj.subtitle}</span>
                  <h4 className="font-bold text-white text-2xl mt-2">{proj.title}</h4>
                  <p className="text-sm text-slate-300 mt-2">{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. PRODUCTS */}
      {showProducts && products.length > 0 && (
        <section id="products" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted} ${isDark ? 'bg-slate-900/50' : 'bg-slate-100/80'} my-12 rounded-3xl`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>SERVICES & PRICING</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>Book Maintenance</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className={`${bgCard} border ${borderMuted} p-8 flex flex-col items-center text-center gap-5 hover:${c.border} shadow-sm hover:shadow-xl rounded-2xl transition relative overflow-hidden group`}>
                <h4 className={`font-bold ${textMain} text-lg relative z-10`}>{product.name}</h4>
                <div className={`text-5xl font-black ${c.text} relative z-10`}>${product.price}</div>
                <button className={`w-full ${c.bg} ${c.hover} text-white font-bold py-3 text-sm transition mt-2 rounded-full`}>
                  Book Online
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FAQ */}
      {activeSections.faq && (
        <section id="faq" className={`py-24 px-8 max-w-4xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>SUPPORT</h2>
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>Frequently Asked Questions</h3>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { q: 'How often should I service my air conditioner?', a: 'We recommend servicing residential units every 6 to 12 months for peak efficiency.' },
              { q: 'Do you offer warranty on installations?', a: 'Yes, all new system installations come with a comprehensive 5-year manufacturer and workmanship warranty.' },
              { q: 'What causes my air conditioner to blow warm air?', a: 'Common causes include low refrigerant levels, dirty filters, or a faulty compressor capacitor.' }
            ].map((faq, i) => (
              <div key={i} className={`${bgCard} border ${borderMuted} rounded-2xl overflow-hidden shadow-sm`}>
                <button 
                  onClick={() => toggleFaq(i)}
                  className={`w-full p-6 text-left font-bold text-sm ${textMain} flex justify-between items-center ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'} transition`}
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className={`w-4 h-4 ${c.text}`} /> : <ChevronDown className={`w-4 h-4 ${textMuted}`} />}
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

      {/* 8. CONTACT FOOTER */}
      {activeSections.contact && (
        <footer id="contact" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted} grid grid-cols-1 lg:grid-cols-2 gap-12`}>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>GET IN TOUCH</h2>
              <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>Need rapid response?</h3>
              <p className={`${textMuted} text-base mt-4`}>Submit your details and our dispatch team will assign the nearest available technician.</p>
            </div>

            <div className={`flex flex-col gap-5 text-sm ${textMuted} mt-4`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${c.lightBg} flex items-center justify-center ${c.text}`}><Phone className="w-4 h-4" /></div>
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${c.lightBg} flex items-center justify-center ${c.text}`}><Mail className="w-4 h-4" /></div>
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${c.lightBg} flex items-center justify-center ${c.text}`}><MapPin className="w-4 h-4" /></div>
                <span>{streetAddress}, {suburb}, {city}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              {socials.facebook && <a href={socials.facebook} className={`w-10 h-10 rounded-full border ${borderMuted} flex items-center justify-center ${textMuted} hover:${c.bg} hover:text-white transition`}><Facebook className="w-4 h-4" /></a>}
              {socials.instagram && <a href={socials.instagram} className={`w-10 h-10 rounded-full border ${borderMuted} flex items-center justify-center ${textMuted} hover:${c.bg} hover:text-white transition`}><Instagram className="w-4 h-4" /></a>}
              {socials.tiktok && <a href={socials.tiktok} className={`w-10 h-10 rounded-full border ${borderMuted} flex items-center justify-center ${textMuted} hover:${c.bg} hover:text-white transition`}><Video className="w-4 h-4" /></a>}
            </div>
          </div>
          
          <div className={`${bgCard} border ${borderMuted} p-8 relative z-10 rounded-3xl shadow-xl`}>
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 text-center flex flex-col items-center gap-3 h-full justify-center rounded-2xl">
                <CheckCircle className="w-12 h-12 text-emerald-500" />
                <h4 className="text-lg font-bold text-emerald-500">Inquiry Sent Successfully!</h4>
                <p className={`${textMuted} text-sm`}>Thank you. {businessName} is reviewing your request.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                <div>
                  <label className={`text-xs font-bold ${textMuted} uppercase`}>Your Name</label>
                  <input type="text" required value={leadName} onChange={(e) => setLeadName(e.target.value)} className={`mt-1 w-full ${inputBg} border ${borderMuted} p-3 text-sm ${textMain} rounded-xl focus:outline-none focus:${c.border}`} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs font-bold ${textMuted} uppercase`}>Email</label>
                    <input type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} className={`mt-1 w-full ${inputBg} border ${borderMuted} p-3 text-sm ${textMain} rounded-xl focus:outline-none focus:${c.border}`} />
                  </div>
                  <div>
                    <label className={`text-xs font-bold ${textMuted} uppercase`}>Phone</label>
                    <input type="tel" required value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} className={`mt-1 w-full ${inputBg} border ${borderMuted} p-3 text-sm ${textMain} rounded-xl focus:outline-none focus:${c.border}`} />
                  </div>
                </div>
                <div>
                  <label className={`text-xs font-bold ${textMuted} uppercase`}>Unit Issue / Request</label>
                  <textarea rows={3} required value={leadMessage} onChange={(e) => setLeadMessage(e.target.value)} className={`mt-1 w-full ${inputBg} border ${borderMuted} p-3 text-sm ${textMain} rounded-xl focus:outline-none focus:${c.border}`} />
                </div>
                <button type="submit" disabled={loading} className={`w-full ${c.bg} ${c.hover} text-white font-bold uppercase tracking-wide py-4 text-sm transition mt-2 rounded-xl`}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}