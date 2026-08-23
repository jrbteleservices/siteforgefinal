// src/components/themes/MasterPremiumTemplate.tsx

import { useState } from 'react';
import { Phone, MessageCircle, CheckCircle, MapPin, Mail, Star, ArrowRight, Activity, ShieldCheck, Award, Users, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { IndustryConfig, ServiceItem, ProjectItem, ProductItem, TeamMemberItem } from '../../constants/industryConfigs';

interface ReviewItem { id: string; name: string; rating: number; text: string; image?: string; }
interface FaqItem { id: string; question: string; answer: string; }

interface MasterTemplateProps {
  config: IndustryConfig;
  businessName: string; phone: string; suburb: string; city: string; streetAddress: string; email: string;
  socials: { facebook: string; instagram: string; tiktok: string; };
  colorPalette: string; logo?: string | null; heroImage?: string | null; heroOpacity: number;
  headers: any; servicesList: ServiceItem[]; projectsList: ProjectItem[]; reviewsList: ReviewItem[];
  showProducts: boolean; products: ProductItem[]; activeSections: any; themeMode: 'light' | 'dark';
  teamList?: TeamMemberItem[]; faqList?: FaqItem[];
}

export default function MasterPremiumTemplate({ 
  config, businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
  logo, heroImage, heroOpacity, headers, servicesList, projectsList, reviewsList,
  showProducts, products, activeSections, themeMode, teamList = [], faqList = []
}: MasterTemplateProps) {
  
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const displayHero = heroImage || config.defaultHeroImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80";
  const overlayOpacity = heroOpacity / 100; 

  const activeServices = servicesList.length > 0 ? servicesList : config.servicesDefault;
  const activeProjects = projectsList.length > 0 ? projectsList : config.projectsDefault;
  const activeProducts = products.length > 0 ? products : config.productsDefault;
  const activeTeam = teamList.length > 0 ? teamList : config.teamDefault;

  const defaultFaqs: FaqItem[] = [
    { id: 'f1', question: `What areas do you service across ${city}?`, answer: `We provide direct coverage across metropolitan ${city}, ${suburb}, and surrounding regional hubs.` },
    { id: 'f2', question: 'How quickly can we initiate a project consultation?', answer: 'Our managing partners typically respond to priority inquiries within 2 hours.' }
  ];
  const activeFaqs = faqList.length > 0 ? faqList : defaultFaqs;

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('leads').insert([{
        owner_id: user?.id || '00000000-0000-0000-0000-000000000000',
        name: leadName, email: leadEmail || 'no-email@provided.com', phone: leadPhone,
        message: `[${config.name} Inquiry - ${suburb}] ${leadMessage}`
    }]);
    setLoading(false);
    if (error) alert('Error submitting inquiry: ' + error.message); else setSubmitted(true);
  };

  const isDark = themeMode === 'dark';
  const bgMain = isDark ? 'bg-slate-950' : 'bg-slate-50';
  const textMain = isDark ? 'text-slate-100' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';
  const bgCard = isDark ? 'bg-slate-900' : 'bg-white';
  const borderMuted = isDark ? 'border-slate-800' : 'border-slate-200';
  const bgHeader = isDark ? 'bg-slate-950/90' : 'bg-white/90';
  const inputBg = isDark ? 'bg-slate-900' : 'bg-white';

  const themeColors: Record<string, any> = {
    blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-500', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500', lightBg: 'bg-blue-500/10' },
    emerald: { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500', lightBg: 'bg-emerald-500/10' },
    rose: { bg: 'bg-rose-600', hover: 'hover:bg-rose-500', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500', lightBg: 'bg-rose-500/10' },
    amber: { bg: 'bg-amber-500', hover: 'hover:bg-amber-400', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500', lightBg: 'bg-amber-500/10' },
    violet: { bg: 'bg-violet-600', hover: 'hover:bg-violet-500', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500', lightBg: 'bg-violet-500/10' },
    cyan: { bg: 'bg-cyan-600', hover: 'hover:bg-cyan-500', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500', lightBg: 'bg-cyan-500/10' }
  };
  const c = themeColors[colorPalette] || themeColors.blue;

  return (
    <div className={`${bgMain} ${textMain} min-h-screen font-sans transition-colors duration-300 relative`}>
      
      {/* FLOATING WHATSAPP & CALL ACTION WIDGETS */}
      {activeSections.liveRequest && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <a 
            href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(businessName)},%20I%20would%20like%20to%20inquire%20about%20your%20services.`} 
            target="_blank" 
            rel="noreferrer"
            className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 group relative"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
            <span className="absolute right-16 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg font-semibold pointer-events-none">
              Chat on WhatsApp
            </span>
          </a>
          <a 
            href={`tel:${phone}`}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 group relative"
            title="Call Us Direct"
          >
            <Phone className="w-6 h-6" />
            <span className="absolute right-16 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg font-semibold pointer-events-none">
              Call Us Now
            </span>
          </a>
        </div>
      )}

      {/* HEADER */}
      <header className={`sticky top-0 z-40 ${bgHeader} backdrop-blur-md border-b ${borderMuted} px-8 py-4 flex justify-between items-center shadow-sm`}>
        <a href="#" className="flex items-center gap-3 cursor-pointer group">
          {logo ? (
            <img src={logo} alt={businessName} className="h-10 object-contain" />
          ) : (
            <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center font-black text-xl text-white shadow-md group-hover:scale-105 transition`}>
              {businessName.charAt(0)}
            </div>
          )}
          <span className={`font-black text-xl tracking-tight ${textMain} group-hover:opacity-80 transition`}>{businessName}</span>
        </a>
        
        <nav className={`hidden md:flex items-center gap-8 text-xs font-bold ${textMuted} uppercase tracking-wider`}>
          {activeSections.services && <a href="#services" className={`hover:${c.text} transition`}>Expertise</a>}
          {activeSections.whyUs && <a href="#whyUs" className={`hover:${c.text} transition`}>Why Us</a>}
          {activeSections.projects && <a href="#projects" className={`hover:${c.text} transition`}>Portfolio</a>}
          {activeSections.reviews && <a href="#reviews" className={`hover:${c.text} transition`}>Testimonials</a>}
          {showProducts && activeSections.products && <a href="#products" className={`hover:${c.text} transition`}>Services & Packages</a>}
          <a href="#team" className={`hover:${c.text} transition`}>Our Team</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href={`tel:${phone}`} className={`hidden sm:flex items-center gap-2 font-bold text-sm ${textMain} hover:${c.text} transition`}>
            {phone}
          </a>
          <a href="#contact" className={`${c.bg} ${c.hover} text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wide transition shadow-lg`}>
            Consultation
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      {activeSections.hero && (
        <section className="relative overflow-hidden min-h-[650px] flex items-center">
          <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-0" style={{ backgroundImage: `url(${displayHero})` }}>
            <div className="absolute inset-0 bg-slate-950 mix-blend-multiply transition-opacity duration-300" style={{ opacity: overlayOpacity }}></div>
          </div>

          <div className="relative z-10 px-8 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="flex flex-col gap-6">
              <div className={`inline-flex items-center gap-2 ${c.lightBg} border ${c.border} border-opacity-30 px-4 py-1.5 rounded-full ${c.text} text-xs font-bold w-max uppercase tracking-widest backdrop-blur-sm`}>
                <Activity className="w-4 h-4" /> {config.designTag}
              </div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-tight">
                {businessName.toUpperCase()}: <span className={c.text}>{suburb.toUpperCase()}</span>.
              </h1>
              <p className="text-slate-200 text-lg max-w-xl drop-shadow-md leading-relaxed">
                {config.heroDefaultSubtitle} Operating across {city} with uncompromising quality and precision standards.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#contact" className={`${c.bg} ${c.hover} text-white font-bold uppercase tracking-wide py-4 px-10 rounded-xl text-sm transition shadow-xl`}>
                  Engage Our Team
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES SECTION */}
      {activeSections.services && (
        <section id="services" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{headers?.services?.sub || 'OUR CAPABILITIES'}</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>{headers?.services?.main || 'What We Do'}</h3>
            <p className={`${textMuted} text-base mt-4`}>{headers?.services?.desc || 'Comprehensive industry solutions tailored for high-end requirements.'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeServices.map((service) => (
              <div key={service.id} className={`${bgCard} border ${borderMuted} hover:${c.border} shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-all flex flex-col group`}>
                {service.image ? (
                  <div className="h-56 w-full"><img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /></div>
                ) : (
                  <div className={`h-40 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center border-b ${borderMuted}`}>
                    <ArrowRight className={`w-10 h-10 ${textMuted} group-hover:${c.text} transition group-hover:translate-x-2`} />
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

      {/* WHY US SECTION */}
      {activeSections.whyUs && (
        <section id="whyUs" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{headers?.whyUs?.sub || 'REPUTATION & TRUST'}</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>{headers?.whyUs?.main || 'Why Choose Us'}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${bgCard} border ${borderMuted} p-8 rounded-2xl shadow-sm flex flex-col gap-4`}>
              <div className={`w-12 h-12 rounded-xl ${c.lightBg} flex items-center justify-center ${c.text}`}><ShieldCheck className="w-6 h-6" /></div>
              <h4 className={`text-xl font-bold ${textMain}`}>Fully Accredited</h4>
              <p className={`${textMuted} text-sm leading-relaxed`}>Licensed, insured, and operating strictly to Australian regulatory standards across NSW and VIC.</p>
            </div>
            <div className={`${bgCard} border ${borderMuted} p-8 rounded-2xl shadow-sm flex flex-col gap-4`}>
              <div className={`w-12 h-12 rounded-xl ${c.lightBg} flex items-center justify-center ${c.text}`}><Award className="w-6 h-6" /></div>
              <h4 className={`text-xl font-bold ${textMain}`}>Excellence Awarded</h4>
              <p className={`${textMuted} text-sm leading-relaxed`}>Recognized across metropolitan commercial and residential sectors for elite craftsmanship.</p>
            </div>
            <div className={`${bgCard} border ${borderMuted} p-8 rounded-2xl shadow-sm flex flex-col gap-4`}>
              <div className={`w-12 h-12 rounded-xl ${c.lightBg} flex items-center justify-center ${c.text}`}><Users className="w-6 h-6" /></div>
              <h4 className={`text-xl font-bold ${textMain}`}>Dedicated Partners</h4>
              <p className={`${textMuted} text-sm leading-relaxed`}>Direct principal involvement from conception through to final project delivery.</p>
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS SECTION */}
      {activeSections.projects && (
        <section id="projects" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{headers?.projects?.sub || 'PORTFOLIO'}</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>{headers?.projects?.main || 'Recent Projects'}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeProjects.map((proj) => (
              <div key={proj.id} className={`${bgCard} border ${borderMuted} rounded-3xl overflow-hidden flex flex-col group relative shadow-md`}>
                {proj.image ? (
                  <div className="h-72 w-full relative">
                    <div className="absolute inset-0 bg-slate-900/40 z-10 group-hover:bg-slate-900/20 transition duration-500"></div>
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover relative z-0" />
                  </div>
                ) : (
                  <div className={`h-72 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center ${textMuted} font-bold text-sm`}>Media Showcase</div>
                )}
                <div className="p-6 flex flex-col gap-2 bg-slate-900">
                  <span className={`text-[10px] font-bold ${c.text} uppercase tracking-widest`}>{proj.subtitle}</span>
                  <h4 className="font-bold text-white text-xl">{proj.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REVIEWS SECTION */}
      {activeSections.reviews && (
        <section id="reviews" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{headers?.reviews?.sub || 'TESTIMONIALS'}</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>{headers?.reviews?.main || 'Client Reviews'}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewsList.map((rev) => (
              <div key={rev.id} className={`${bgCard} border ${borderMuted} p-8 rounded-3xl shadow-sm flex flex-col gap-4`}>
                <div className="flex gap-1 text-amber-400">
                  {[...Array(rev.rating || 5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400" />))}
                </div>
                <p className={`${textMuted} text-base italic`}>"{rev.text}"</p>
                <div className={`font-bold text-sm ${textMain} mt-2`}>— {rev.name}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRODUCTS & COMMERCE STORE SECTION */}
      {showProducts && activeSections.products && activeProducts.length > 0 && (
        <section id="products" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>FIXED RATE SERVICES & GOODS</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>Online Store & Packages</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeProducts.map((prod) => (
              <div key={prod.id} className={`${bgCard} border ${borderMuted} rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group`}>
                {prod.image ? (
                  <div className="h-48 w-full overflow-hidden">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                ) : (
                  <div className={`h-36 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center ${textMuted} text-xs font-bold`}>Product Image</div>
                )}
                <div className="p-8 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <h4 className={`text-xl font-bold ${textMain}`}>{prod.name}</h4>
                    {prod.desc && <p className={`${textMuted} text-xs mt-2 leading-relaxed`}>{prod.desc}</p>}
                    <div className={`text-3xl font-black ${c.text} mt-4`}>${prod.price}</div>
                  </div>
                  <a 
                    href={prod.checkoutUrl || '#contact'} 
                    target={prod.checkoutUrl ? "_blank" : "_self"} 
                    rel="noreferrer" 
                    className={`w-full text-center ${c.bg} ${c.hover} text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md`}
                  >
                    <span>Secure Checkout</span>
                    {prod.checkoutUrl && <ExternalLink className="w-3.5 h-3.5" />}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EXECUTIVE TEAM SECTION */}
      <section id="team" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>LEADERSHIP</h2>
          <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>Our Executive Team</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeTeam.map((member) => (
            <div key={member.id} className={`${bgCard} border ${borderMuted} rounded-3xl overflow-hidden shadow-sm flex flex-col`}>
              {member.image ? (
                <div className="h-72 w-full"><img src={member.image} alt={member.name} className="w-full h-full object-cover" /></div>
              ) : (
                <div className={`h-72 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center ${textMuted}`}>No Photo</div>
              )}
              <div className="p-6 text-center">
                <h4 className={`text-xl font-bold ${textMain}`}>{member.name}</h4>
                <p className={`${c.text} text-xs font-bold uppercase tracking-wider mt-1`}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      {activeSections.faq && (
        <section className={`py-24 px-8 max-w-4xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>QUESTIONS</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>Frequently Asked Questions</h3>
          </div>
          <div className="space-y-6">
            {activeFaqs.map((faq) => (
              <div key={faq.id} className={`${bgCard} border ${borderMuted} p-6 rounded-2xl`}>
                <h4 className={`font-bold text-lg ${textMain}`}>{faq.question}</h4>
                <p className={`${textMuted} text-sm mt-2 leading-relaxed`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER & AUTHENTIC BRAND SOCIAL SVG ICONS PLACED UNDER STREET ADDRESS */}
      {activeSections.contact && (
        <footer id="contact" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted} grid grid-cols-1 lg:grid-cols-2 gap-16`}>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>PARTNERSHIPS & INQUIRIES</h2>
              <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>Initiate a Discussion</h3>
              <p className={`${textMuted} text-lg mt-4 leading-relaxed`}>Provide your details below to schedule an initial consultation with our executive team.</p>
            </div>

            <div className={`flex flex-col gap-6 text-sm ${textMuted} mt-6 font-medium`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${c.lightBg} flex items-center justify-center ${c.text}`}><Phone className="w-5 h-5" /></div>
                <span className={textMain}>{phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${c.lightBg} flex items-center justify-center ${c.text}`}><Mail className="w-5 h-5" /></div>
                <span className={textMain}>{email}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${c.lightBg} flex items-center justify-center ${c.text}`}><MapPin className="w-5 h-5" /></div>
                <span className={textMain}>{streetAddress}, {suburb}, {city}</span>
              </div>
            </div>

            {/* AUTHENTIC BRANDED SOCIAL SVG ICONS (INSTAGRAM, TIKTOK, FACEBOOK) */}
            <div className="flex items-center gap-3 pt-2">
              {socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noreferrer" title="Instagram" className={`w-11 h-11 rounded-xl border ${borderMuted} flex items-center justify-center ${textMuted} hover:bg-pink-600 hover:text-white transition`}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {socials.tiktok && (
                <a href={socials.tiktok} target="_blank" rel="noreferrer" title="TikTok" className={`w-11 h-11 rounded-xl border ${borderMuted} flex items-center justify-center ${textMuted} hover:bg-slate-900 hover:text-white transition`}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-1.02-.97-.5-1.81-1.22-2.48-2.08v9.92c-.03 2.05-1.12 3.99-2.92 5.04-1.8 1.05-4.08 1.05-5.88-.02-1.8-1.07-2.93-3.02-2.95-5.09-.02-2.07 1.07-4.04 2.85-5.12 1.78-1.08 4.05-1.06 5.83.05.02.39.04.78.04 1.17 0 1.01-.36 1.99-.99 2.74-.63.75-1.51 1.2-2.51 1.25-1 .05-1.97-.29-2.67-1-.7-.71-1.04-1.68-1.01-2.67.03-.99.41-1.92 1.1-2.61.69-.69 1.62-1.07 2.61-1.1 1.3-.04 2.6-.01 3.9-.02z"/></svg>
                </a>
              )}
              {socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noreferrer" title="Facebook" className={`w-11 h-11 rounded-xl border ${borderMuted} flex items-center justify-center ${textMuted} hover:bg-blue-600 hover:text-white transition`}>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.581 9 4.75V8z"/></svg>
                </a>
              )}
            </div>
          </div>

          <div className={`${bgCard} border ${borderMuted} p-10 rounded-3xl shadow-xl`}>
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-10 rounded-2xl text-center flex flex-col items-center gap-4 h-full justify-center">
                <CheckCircle className="w-14 h-14 text-emerald-500" />
                <h4 className="text-xl font-bold text-emerald-500">Inquiry Received</h4>
                <p className={`${textMuted} text-sm`}>Thank you. The team at {businessName} will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-5">
                <div>
                  <label className={`text-xs font-bold ${textMuted} uppercase tracking-wider`}>Full Name</label>
                  <input type="text" required value={leadName} onChange={(e) => setLeadName(e.target.value)} className={`mt-2 w-full ${inputBg} border ${borderMuted} p-4 text-sm ${textMain} rounded-xl focus:outline-none focus:${c.border}`} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={`text-xs font-bold ${textMuted} uppercase tracking-wider`}>Email Address</label>
                    <input type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} className={`mt-2 w-full ${inputBg} border ${borderMuted} p-4 text-sm ${textMain} rounded-xl focus:outline-none focus:${c.border}`} />
                  </div>
                  <div>
                    <label className={`text-xs font-bold ${textMuted} uppercase tracking-wider`}>Phone Number</label>
                    <input type="tel" required value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} className={`mt-2 w-full ${inputBg} border ${borderMuted} p-4 text-sm ${textMain} rounded-xl focus:outline-none focus:${c.border}`} />
                  </div>
                </div>
                <div>
                  <label className={`text-xs font-bold ${textMuted} uppercase tracking-wider`}>Project Requirements</label>
                  <textarea rows={4} required value={leadMessage} onChange={(e) => setLeadMessage(e.target.value)} className={`mt-2 w-full ${inputBg} border ${borderMuted} p-4 text-sm ${textMain} rounded-xl focus:outline-none focus:${c.border}`} />
                </div>
                <button type="submit" disabled={loading} className={`w-full ${c.bg} ${c.hover} text-white font-black uppercase tracking-widest py-5 rounded-xl text-sm transition mt-2`}>
                  {loading ? 'Processing...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}