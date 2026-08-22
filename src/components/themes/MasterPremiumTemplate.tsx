// src/components/themes/MasterPremiumTemplate.tsx

import { useState } from 'react';
import { Phone, MessageCircle, CheckCircle, MapPin, Mail, Globe, Share2, Star, Video, ArrowRight, Activity, ShieldCheck, Award, Users, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { IndustryConfig, ServiceItem, ProjectItem, ProductItem, TeamMemberItem } from '../../constants/industryConfigs';

interface ReviewItem { id: string; name: string; rating: number; text: string; }
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

  // Preloaded industry default hero image if no custom upload exists
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
    <div className={`${bgMain} ${textMain} min-h-screen font-sans transition-colors duration-300`}>
      
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

            {activeSections.liveRequest && (
              <div className="relative z-10 hidden lg:block">
                <div className={`absolute -inset-1 ${c.bg} rounded-3xl blur-xl opacity-20 animate-pulse`}></div>
                <div className="relative bg-slate-900/95 backdrop-blur-md border border-slate-700 p-8 rounded-3xl flex flex-col gap-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="font-bold text-sm text-white">Priority Client Request</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      Connect instantly with our managing partners for priority service and quoting in <span className="text-white font-bold">{suburb}</span>.
                    </div>
                  </div>
                  <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 py-4 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat
                  </a>
                </div>
              </div>
            )}
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

      {/* PRODUCTS / FIXED-PRICE PACKAGES WITH IMAGE UPLOADS & CHECKOUT URL */}
      {showProducts && activeSections.products && activeProducts.length > 0 && (
        <section id="products" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>FIXED RATE SERVICES</h2>
            <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>Service Packages & Checkout</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeProducts.map((prod) => (
              <div key={prod.id} className={`${bgCard} border ${borderMuted} rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group`}>
                {prod.image ? (
                  <div className="h-48 w-full overflow-hidden">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                ) : (
                  <div className={`h-36 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center ${textMuted} text-xs font-bold`}>Package Image</div>
                )}
                <div className="p-8 flex flex-col justify-between flex-1 gap-6">
                  <div>
                    <h4 className={`text-xl font-bold ${textMain}`}>{prod.name}</h4>
                    <div className={`text-3xl font-black ${c.text} mt-2`}>${prod.price}</div>
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

      {/* TEAM SECTION */}
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

      {/* FOOTER & SOCIAL MEDIA ICONS PLACED UNDER STREET ADDRESS */}
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

            {/* Social media links positioned strictly under the street address info */}
            <div className="flex items-center gap-3 pt-2">
              {socials.facebook && <a href={socials.facebook} target="_blank" rel="noreferrer" className={`w-11 h-11 rounded-xl border ${borderMuted} flex items-center justify-center ${textMuted} hover:${c.bg} hover:text-white transition`}><Globe className="w-5 h-5" /></a>}
              {socials.instagram && <a href={socials.instagram} target="_blank" rel="noreferrer" className={`w-11 h-11 rounded-xl border ${borderMuted} flex items-center justify-center ${textMuted} hover:${c.bg} hover:text-white transition`}><Share2 className="w-5 h-5" /></a>}
              {socials.tiktok && <a href={socials.tiktok} target="_blank" rel="noreferrer" className={`w-11 h-11 rounded-xl border ${borderMuted} flex items-center justify-center ${textMuted} hover:${c.bg} hover:text-white transition`}><Video className="w-5 h-5" /></a>}
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