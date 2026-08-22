import { useState } from 'react';
import { Phone, CheckCircle, Globe, Headset, MapPin, Mail, MessageCircle, Star, Facebook, Instagram, Video } from 'lucide-react';
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

export default function BpoTemplate({ 
  businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
  logo, heroImage, heroOpacity, headers, servicesList, projectsList, reviewsList,
  showProducts, products, activeSections, themeMode 
}: TemplateProps) {
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const displayHero = heroImage || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  const overlayOpacity = heroOpacity / 100; 

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('leads').insert([{
        owner_id: user?.id || '00000000-0000-0000-0000-000000000000',
        name: leadName, email: leadEmail, phone: 'N/A',
        message: `[BPO Inquiry - ${leadCompany} - ${suburb}] ${leadMessage}`
    }]);
    setLoading(false);
    if (error) alert('Error submitting inquiry: ' + error.message); else setSubmitted(true);
  };

  // --- DYNAMIC LIGHT/DARK CLASSES ---
  const isDark = themeMode === 'dark';
  const bgMain = isDark ? 'bg-slate-900' : 'bg-slate-50';
  const textMain = isDark ? 'text-slate-100' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-500';
  const bgCard = isDark ? 'bg-slate-800' : 'bg-white';
  const borderMuted = isDark ? 'border-slate-700' : 'border-slate-200';
  const bgHeader = isDark ? 'bg-slate-900/90' : 'bg-white/90';
  const inputBg = isDark ? 'bg-slate-900' : 'bg-slate-50';

  // --- COLOR PALETTE MAPPING ---
  const themeColors: Record<string, any> = {
    blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', lightBg: 'bg-blue-500/10' },
    emerald: { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500', lightBg: 'bg-emerald-500/10' },
    rose: { bg: 'bg-rose-600', hover: 'hover:bg-rose-500', text: 'text-rose-500', border: 'border-rose-500', lightBg: 'bg-rose-500/10' },
    amber: { bg: 'bg-amber-500', hover: 'hover:bg-amber-400', text: 'text-amber-500', border: 'border-amber-500', lightBg: 'bg-amber-500/10' },
    violet: { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-500', text: 'text-indigo-500', border: 'border-indigo-500', lightBg: 'bg-indigo-500/10' }, // Mapping violet to a sharp indigo for BPO
    cyan: { bg: 'bg-cyan-600', hover: 'hover:bg-cyan-500', text: 'text-cyan-500', border: 'border-cyan-500', lightBg: 'bg-cyan-500/10' }
  };
  const c = themeColors[colorPalette] || themeColors.blue; // Defaulting to Blue/Indigo for BPO

  return (
    <div className={`${bgMain} ${textMain} min-h-screen font-sans transition-colors duration-300`}>
      
      {/* 1. HEADER */}
      <header className={`sticky top-0 z-50 ${bgHeader} backdrop-blur-md border-b ${borderMuted} px-8 py-5 flex justify-between items-center shadow-sm transition-colors duration-300`}>
        <div className="flex items-center gap-4">
          {logo ? (
            <img src={logo} alt={businessName} className="h-10 object-contain" />
          ) : (
            <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center font-black text-xl text-white shadow-md`}>
              {businessName.charAt(0)}
            </div>
          )}
          <span className={`font-black text-xl tracking-tight ${textMain}`}>{businessName}</span>
        </div>
        
        <nav className={`hidden md:flex items-center gap-8 text-xs font-bold ${textMuted} uppercase tracking-wider`}>
          {activeSections.services && <a href="#services" className={`hover:${c.text} transition`}>Solutions</a>}
          {activeSections.projects && <a href="#projects" className={`hover:${c.text} transition`}>Case Studies</a>}
          {activeSections.reviews && <a href="#reviews" className={`hover:${c.text} transition`}>Reviews</a>}
          {showProducts && <a href="#products" className={`hover:${c.text} transition`}>Packages</a>}
        </nav>

        <a href="#contact" className={`${c.bg} ${c.hover} text-white px-6 py-2.5 rounded-lg font-bold text-sm transition shadow-lg`}>
          Book Consultation
        </a>
      </header>

      {/* 2. HERO */}
      {activeSections.hero && (
        <section className="relative overflow-hidden min-h-[600px] flex items-center">
          <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-0" style={{ backgroundImage: `url(${displayHero})` }}>
            <div className="absolute inset-0 bg-slate-950 mix-blend-multiply transition-opacity duration-300" style={{ opacity: overlayOpacity }}></div>
          </div>

          <div className="relative z-10 px-8 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="flex flex-col gap-6">
              <div className={`inline-flex items-center gap-2 ${c.lightBg} border ${c.border} border-opacity-30 px-4 py-2 rounded-full ${c.text} text-xs font-bold w-max backdrop-blur-md`}>
                <Globe className="w-4 h-4" /> GLOBAL OUTSOURCING SOLUTIONS
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Scale Your Operations with <span className={c.text}>Precision.</span>
              </h1>
              <p className="text-slate-200 text-lg max-w-lg leading-relaxed drop-shadow-md">
                Based in {suburb}, {city}, {businessName} provides premium international call center services, back-office support, and intelligent automation for growing enterprises.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#contact" className={`${c.bg} ${c.hover} text-white font-bold py-4 px-8 rounded-lg text-sm transition shadow-xl`}>
                  Discuss Your Requirements
                </a>
              </div>
            </div>

            {activeSections.liveRequest && (
              <div className="relative z-10 hidden lg:block">
                <div className={`absolute -inset-1 ${c.bg} rounded-3xl blur-xl opacity-20 animate-pulse`}></div>
                <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl flex flex-col gap-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="font-bold text-sm text-white">Live Enterprise Chat</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      💬 Connect instantly with a senior solutions architect from our <span className="text-white font-bold">{suburb}</span> office.
                    </div>
                  </div>
                  <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 py-3.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. SERVICES */}
      {activeSections.services && (
        <section id="services" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{headers.services.sub}</h2>
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>{headers.services.main}</h3>
            <p className={`${textMuted} text-base mt-4`}>{headers.services.desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesList.map((service) => (
              <div key={service.id} className={`${bgCard} border ${borderMuted} p-8 rounded-2xl shadow-sm hover:shadow-xl hover:${c.border} transition-all group flex flex-col`}>
                {service.image ? (
                  <div className="h-32 w-full mb-6 rounded-xl overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                ) : (
                  <div className={`w-14 h-14 rounded-xl ${c.lightBg} flex items-center justify-center ${c.text} mb-6 group-hover:scale-110 transition-transform`}>
                    <Headset className="w-6 h-6" />
                  </div>
                )}
                <h4 className={`text-xl font-bold ${textMain} mb-3`}>{service.title}</h4>
                <p className={`${textMuted} text-sm leading-relaxed flex-1`}>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. REVIEWS */}
      {activeSections.reviews && reviewsList.length > 0 && (
        <section id="reviews" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted} ${isDark ? 'bg-slate-900/30' : 'bg-slate-100/50'} rounded-3xl my-8`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{headers.reviews.sub}</h2>
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>{headers.reviews.main}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsList.map((review) => (
              <div key={review.id} className={`${bgCard} border ${borderMuted} p-8 rounded-2xl flex flex-col gap-4 shadow-sm`}>
                <div className="flex gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
                  ))}
                </div>
                <p className={`${textMuted} text-sm italic flex-1 leading-relaxed`}>"{review.text}"</p>
                <div className={`flex items-center gap-3 mt-4 pt-4 border-t ${borderMuted}`}>
                  <div className={`w-8 h-8 rounded-lg ${c.lightBg} ${c.text} flex items-center justify-center font-bold text-xs`}>{review.name.charAt(0)}</div>
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
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>{headers.projects.main}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsList.map((proj) => (
              <div key={proj.id} className={`${bgCard} border ${borderMuted} rounded-2xl overflow-hidden flex flex-col group relative`}>
                {proj.image ? (
                  <div className="h-72 w-full relative">
                    <div className="absolute inset-0 bg-slate-900/50 z-10 group-hover:bg-slate-900/30 transition duration-500"></div>
                    <img src={proj.image} className="w-full h-full object-cover relative z-0" />
                  </div>
                ) : (
                  <div className={`h-72 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center ${textMuted} font-bold text-sm`}>Case Study Pending</div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20 pt-20">
                  <span className={`text-[10px] font-bold ${c.text} uppercase tracking-widest`}>{proj.subtitle}</span>
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
        <section id="products" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>SEAT PRICING & PACKAGES</h2>
            <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>Scalable Architecture</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className={`${bgCard} border ${borderMuted} p-8 rounded-2xl flex flex-col items-center text-center gap-5 hover:${c.border} shadow-sm hover:shadow-xl transition relative overflow-hidden group`}>
                <h4 className={`font-bold ${textMain} text-lg relative z-10`}>{product.name}</h4>
                <div className={`text-5xl font-black ${c.text} relative z-10`}>${product.price}</div>
                <button className={`w-full ${c.bg} ${c.hover} text-white font-bold py-3 text-sm transition mt-2 rounded-lg`}>
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. CONTACT / FOOTER */}
      {activeSections.contact && (
        <footer id="contact" className={`py-24 px-8 border-t ${borderMuted} ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>REQUEST A PROPOSAL</h2>
                <h3 className={`text-3xl font-black ${textMain} tracking-tight`}>Transform Your Workflow Today.</h3>
                <p className={`${textMuted} text-base mt-4 leading-relaxed max-w-md`}>
                  Whether you need a dedicated team of 5 or 500, {businessName} provides scalable infrastructure to meet your operational demands.
                </p>
              </div>

              <div className={`flex flex-col gap-5 text-sm ${textMuted} mt-4`}>
                <div className={`flex items-center gap-4 ${bgCard} p-4 rounded-xl border ${borderMuted}`}>
                  <Phone className={`w-5 h-5 ${c.text}`} />
                  <div><p className={`font-bold ${textMain}`}>Direct Line</p><p>{phone}</p></div>
                </div>
                <div className={`flex items-center gap-4 ${bgCard} p-4 rounded-xl border ${borderMuted}`}>
                  <Mail className={`w-5 h-5 ${c.text}`} />
                  <div><p className={`font-bold ${textMain}`}>Enterprise Sales</p><p>{email}</p></div>
                </div>
                <div className={`flex items-center gap-4 ${bgCard} p-4 rounded-xl border ${borderMuted}`}>
                  <MapPin className={`w-5 h-5 ${c.text}`} />
                  <div><p className={`font-bold ${textMain}`}>Headquarters</p><p>{streetAddress}, {suburb}, {city}</p></div>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                {socials.facebook && <a href={socials.facebook} className={`w-10 h-10 rounded-lg border ${borderMuted} flex items-center justify-center ${textMuted} hover:${c.bg} hover:text-white transition`}><Facebook className="w-4 h-4" /></a>}
                {socials.instagram && <a href={socials.instagram} className={`w-10 h-10 rounded-lg border ${borderMuted} flex items-center justify-center ${textMuted} hover:${c.bg} hover:text-white transition`}><Instagram className="w-4 h-4" /></a>}
                {socials.tiktok && <a href={socials.tiktok} className={`w-10 h-10 rounded-lg border ${borderMuted} flex items-center justify-center ${textMuted} hover:${c.bg} hover:text-white transition`}><Video className="w-4 h-4" /></a>}
              </div>
            </div>

            <div className={`${bgCard} rounded-2xl p-8 shadow-2xl border ${borderMuted}`}>
              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-xl text-center flex flex-col items-center gap-4 h-full justify-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                  <h4 className={`text-xl font-black ${textMain}`}>Request Received</h4>
                  <p className={`${textMuted} text-sm`}>A senior solutions architect from {businessName} will review your requirements and contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-5">
                  <h4 className={`text-lg font-bold ${textMain} mb-2`}>Schedule a Consultation</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`text-xs font-bold ${textMuted} uppercase`}>Full Name</label>
                      <input type="text" required value={leadName} onChange={(e) => setLeadName(e.target.value)} className={`mt-1.5 w-full ${inputBg} border ${borderMuted} rounded-lg p-3 text-sm ${textMain} focus:outline-none focus:${c.border}`} />
                    </div>
                    <div>
                      <label className={`text-xs font-bold ${textMuted} uppercase`}>Work Email</label>
                      <input type="email" required value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} className={`mt-1.5 w-full ${inputBg} border ${borderMuted} rounded-lg p-3 text-sm ${textMain} focus:outline-none focus:${c.border}`} />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`text-xs font-bold ${textMuted} uppercase`}>Company Name</label>
                    <input type="text" required value={leadCompany} onChange={(e) => setLeadCompany(e.target.value)} className={`mt-1.5 w-full ${inputBg} border ${borderMuted} rounded-lg p-3 text-sm ${textMain} focus:outline-none focus:${c.border}`} />
                  </div>

                  <div>
                    <label className={`text-xs font-bold ${textMuted} uppercase`}>Project Requirements</label>
                    <textarea rows={4} required value={leadMessage} onChange={(e) => setLeadMessage(e.target.value)} placeholder="Volume, seat requirements, and services needed..." className={`mt-1.5 w-full ${inputBg} border ${borderMuted} rounded-lg p-3 text-sm ${textMain} focus:outline-none focus:${c.border}`} />
                  </div>

                  <button type="submit" disabled={loading} className={`w-full ${c.bg} ${c.hover} text-white font-bold py-4 rounded-lg text-sm transition mt-2`}>
                    {loading ? 'Submitting...' : 'Request Proposal'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}