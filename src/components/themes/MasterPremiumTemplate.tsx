// src/components/themes/MasterPremiumTemplate.tsx

import { useState } from 'react';
import { Phone, MessageCircle, CheckCircle, MapPin, Mail, Star, ArrowRight, Activity, ShieldCheck, Award, Users, ExternalLink, Clock, Send, X, Bot, ChevronDown, Home, User, Briefcase, Mail as MailIcon, Menu, FileText, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { IndustryConfig, ServiceItem, ProjectItem, ProductItem, TeamMemberItem } from '../../constants/industryConfigs';

interface ReviewItem { id: string; name: string; rating: number; text: string; image?: string; }
interface FaqItem { id: string; question: string; answer: string; }
interface LocationItem { id: string; name: string; address: string; phone: string; email: string; }
interface OperatingHourItem { id: string; days: string; hours: string; }
interface SeoArticle { id: string; slug: string; title: string; subtitle: string; body: string; metaDescription: string; headerImage?: string; }

interface MasterTemplateProps {
  config: IndustryConfig;
  businessName: string; phone: string; suburb: string; city: string; streetAddress: string; email: string;
  socials: { facebook: string; instagram: string; tiktok: string; };
  colorPalette: string; logo?: string | null; logoSize?: number; heroImage?: string | null; heroOpacity: number;
  
  heroTagline?: string; heroHeadline?: string; heroSubheadline?: string; heroButtonText?: string;
  aboutTitle?: string; aboutBody?: string; aboutButtonText?: string;

  headers: any; servicesList: ServiceItem[]; projectsList: ProjectItem[]; reviewsList: ReviewItem[];
  showProducts: boolean; products: ProductItem[]; activeSections: any; themeMode: 'light' | 'dark';
  teamList?: TeamMemberItem[]; faqList?: FaqItem[]; locations?: LocationItem[]; operatingHours?: OperatingHourItem[];
  showSiteForgeBranding?: boolean;
  additionalLegalInfo?: string;
  seoArticles?: SeoArticle[];
  showFooterMenu?: boolean;
  whyUsHeader?: { sub: string; main: string; desc?: string };
  whyUsItems?: Array<{ title: string; desc: string }>;
}

export default function MasterPremiumTemplate({ 
  config, businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
  logo, logoSize = 40, heroImage, heroOpacity = 50, 
  heroTagline, heroHeadline, heroSubheadline, heroButtonText,
  aboutTitle, aboutBody, aboutButtonText,
  headers, servicesList, projectsList, reviewsList,
  showProducts, products, activeSections, themeMode, teamList = [], faqList = [], locations = [], operatingHours = [],
  showSiteForgeBranding = true, additionalLegalInfo = '', seoArticles = [], showFooterMenu = true,
  whyUsHeader = { sub: 'REPUTATION & TRUST', main: 'Why Choose Us' }, whyUsItems = []
}: MasterTemplateProps) {
  
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- ROUTING & SEO SUB-PAGE STATE ---
  const [currentRoute, setCurrentRoute] = useState<'home' | 'sitemap' | string>('home');
  const [activeArticle, setActiveArticle] = useState<SeoArticle | null>(null);

  // --- CHATBOT & DROPDOWN STATE ---
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    { sender: 'bot', text: `Hi there! Welcome to ${businessName}. How can I assist you today? Feel free to ask about our pricing, services, or operating hours!` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [blogsDropdownOpen, setBlogsDropdownOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);

  const displayHero = heroImage || config.defaultHeroImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80";
  
  // Real-time calculated transparency overlay value
  const overlayOpacityValue = heroOpacity / 100; 

  const activeServices = servicesList.length > 0 ? servicesList : config.servicesDefault;
  const activeProjects = projectsList.length > 0 ? projectsList : config.projectsDefault;
  const activeProducts = products.length > 0 ? products : config.productsDefault;
  const activeTeam = teamList.length > 0 ? teamList : config.teamDefault;
  const activeReviews = reviewsList;

  const defaultFaqs: FaqItem[] = [
    { id: 'f1', question: `What areas do you service across ${city}?`, answer: `We provide direct coverage across metropolitan ${city}, ${suburb}, and surrounding regional hubs.` },
    { id: 'f2', question: 'How quickly can we initiate a project consultation?', answer: 'Our managing partners typically respond to priority inquiries within 2 hours.' }
  ];
  const activeFaqs = faqList.length > 0 ? faqList : defaultFaqs;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput.trim();
    const updatedMessages = [...chatMessages, { sender: 'user' as const, text: userText }];
    setChatMessages(updatedMessages);
    setChatInput('');
    setChatLoading(true);

    try {
      let botReply = '';
      const lower = userText.toLowerCase();

      const matchedProduct = activeProducts.find(p => lower.includes(p.name.toLowerCase()) || lower.includes('price') || lower.includes('cost') || lower.includes('package'));
      if (matchedProduct) {
        botReply = `The price for "${matchedProduct.name}" is ₹${matchedProduct.price}. ${matchedProduct.desc || ''} Would you like me to arrange a callback?`;
      } else if (lower.includes('service') || lower.includes('offer')) {
        const serviceTitles = activeServices.map(s => s.title).join(', ');
        botReply = `We specialize in: ${serviceTitles}.`;
      } else if (lower.includes('hour') || lower.includes('open') || lower.includes('time')) {
        botReply = operatingHours.length > 0 ? operatingHours.map(oh => `${oh.days}: ${oh.hours}`).join(' | ') : 'We operate Monday through Saturday.';
      } else if (lower.includes('location') || lower.includes('address')) {
        botReply = `Our primary office is located at ${streetAddress}, ${suburb}, ${city}.`;
      } else {
        botReply = `Please call us directly at ${phone} or leave your details in our contact form below so we can assist you right away!`;
      }

      setChatMessages([...updatedMessages, { sender: 'bot', text: botReply }]);
    } catch (err) {
      setChatMessages([...updatedMessages, { sender: 'bot', text: `Please give us a call directly at ${phone}.` }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const { error } = await supabase.from('leads').insert([{
        owner_id: '00000000-0000-0000-0000-000000000000',
        name: leadName, email: leadEmail || 'no-email@provided.com', phone: leadPhone,
        message: `[${config.name} Inquiry - Route: ${currentRoute}] ${leadMessage}`
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
  const bgHeader = isDark ? 'bg-slate-950/95' : 'bg-white/95';
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
    <div id="hero" className={`${bgMain} ${textMain} min-h-screen font-sans transition-colors duration-300 relative pb-20 md:pb-0`}>
      
      {/* INJECTED JSON-LD ENTITY SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": businessName,
        "telephone": phone,
        "email": email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": streetAddress,
          "addressLocality": suburb,
          "addressRegion": city,
          "addressCountry": "IN"
        },
        "priceRange": "₹₹"
      })}} />

      {/* FLOATING ACTION WIDGETS STACK */}
      {(activeSections.showCallButton || activeSections.showWhatsappButton || activeSections.showChatbotButton) && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
          {chatOpen && activeSections.showChatbotButton && (
            <div className="w-[340px] h-[420px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-3.5 bg-blue-600 text-white flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">{businessName} Assistant</h4>
                    <span className="text-[9px] text-emerald-200 flex items-center gap-1">● Online & Ready</span>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-white hover:bg-white/20 p-1 rounded-lg transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-slate-950 text-xs">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-2.5 rounded-xl leading-relaxed ${msg.sender === 'user' ? `${c.bg} text-white rounded-br-none` : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && <div className="text-slate-500 text-[10px] italic">Assistant is thinking...</div>}
              </div>

              <form onSubmit={handleSendMessage} className="p-2.5 bg-slate-900 border-t border-slate-800 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)} 
                  placeholder="Ask a question..." 
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" 
                />
                <button type="submit" className={`${c.bg} ${c.hover} text-white px-3 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center`}>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {showSiteForgeBranding && (
                <div className="bg-slate-950 py-1 px-3 text-center border-t border-slate-900 text-[8px] text-slate-500">
                  Powered by <span className="font-bold text-slate-400">SiteForge</span>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2.5 items-end">
            {activeSections.showCallButton && (
              <a href={`tel:${phone}`} className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110" title="Call Us Direct">
                <Phone className="w-5 h-5" />
              </a>
            )}
            {activeSections.showWhatsappButton && (
              <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110" title="WhatsApp">
                <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
              </a>
            )}
            {activeSections.showChatbotButton && (
              <button onClick={() => setChatOpen(!chatOpen)} className="w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110" title="Virtual Assistant">
                <Bot className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STICKY HEADER - Uppercase HOME */}
      <header className={`sticky top-0 z-50 ${bgHeader} backdrop-blur-md border-b ${borderMuted} px-8 py-4 flex justify-between items-center shadow-md`}>
        <button onClick={() => { setCurrentRoute('home'); setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 cursor-pointer group focus:outline-none">
          {logo ? (
            <img src={logo} alt={businessName} style={{ height: `${logoSize}px` }} className="object-contain transition-all" />
          ) : (
            <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center font-black text-xl text-white shadow-md group-hover:scale-105 transition`}>
              {businessName.charAt(0)}
            </div>
          )}
          <span className={`font-black text-xl tracking-tight ${textMain} group-hover:opacity-80 transition`}>{businessName}</span>
        </button>
        
        <nav className={`hidden md:flex items-center gap-8 text-xs font-bold ${textMuted} uppercase tracking-wider relative`}>
          <button onClick={() => { setCurrentRoute('home'); setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`hover:${c.text} transition ${currentRoute === 'home' && !activeArticle ? c.text : ''}`}>HOME</button>
          <a href="#about" onClick={() => { setCurrentRoute('home'); setActiveArticle(null); }} className={`hover:${c.text} transition`}>About</a>
          {activeSections.services && <a href="#services" onClick={() => { setCurrentRoute('home'); setActiveArticle(null); }} className={`hover:${c.text} transition`}>Services</a>}
          <a href="#contact" onClick={() => { setCurrentRoute('home'); setActiveArticle(null); }} className={`hover:${c.text} transition`}>Contact</a>

          {seoArticles.length > 0 && (
            <div className="relative">
              <button onClick={() => setBlogsDropdownOpen(!blogsDropdownOpen)} className={`flex items-center gap-1 hover:${c.text} transition focus:outline-none uppercase font-bold`}>
                <span>Blogs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${blogsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {blogsDropdownOpen && (
                <div className={`absolute top-full right-0 mt-2 w-64 ${bgCard} border ${borderMuted} rounded-xl shadow-2xl py-2 flex flex-col z-50`}>
                  {seoArticles.map((art) => (
                    <button key={art.id} onClick={() => { setActiveArticle(art); setCurrentRoute(art.slug); setBlogsDropdownOpen(false); }} className={`px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider hover:${c.text} hover:bg-slate-800/10 truncate`}>
                      {art.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <a href={`tel:${phone}`} className={`hidden sm:flex items-center gap-2 font-bold text-sm ${textMain} hover:${c.text} transition`}>{phone}</a>
          <a href="#contact" className={`${c.bg} ${c.hover} text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wide transition shadow-lg`}>Consultation</a>
        </div>
      </header>

      {/* MOBILE-ONLY STICKY BOTTOM NAVIGATION BAR */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 ${bgHeader} backdrop-blur-md border-t ${borderMuted} px-3 py-2 flex justify-around items-center shadow-2xl`}>
        <button onClick={() => { setCurrentRoute('home'); setActiveArticle(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider ${textMuted} hover:${c.text} transition`}>
          <Home className="w-4 h-4" /><span>HOME</span>
        </button>
        <a href="#about" onClick={() => { setCurrentRoute('home'); setActiveArticle(null); }} className={`flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider ${textMuted} hover:${c.text} transition`}>
          <User className="w-4 h-4" /><span>About</span>
        </a>
        {activeSections.services && (
          <a href="#services" onClick={() => { setCurrentRoute('home'); setActiveArticle(null); }} className={`flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider ${textMuted} hover:${c.text} transition`}>
            <Briefcase className="w-4 h-4" /><span>Services</span>
          </a>
        )}
        {activeSections.contact && (
          <a href="#contact" onClick={() => { setCurrentRoute('home'); setActiveArticle(null); }} className={`flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider ${textMuted} hover:${c.text} transition`}>
            <MailIcon className="w-4 h-4" /><span>Contact</span>
          </a>
        )}
        {seoArticles.length > 0 && (
          <button onClick={() => setMobileBlogsOpen(!mobileBlogsOpen)} className={`flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-wider ${textMuted} hover:${c.text} transition focus:outline-none`}>
            <Menu className="w-4 h-4" /><span>Blogs</span>
          </button>
        )}

        {mobileBlogsOpen && (
          <div className={`absolute bottom-full left-0 right-0 mb-2 mx-4 ${bgCard} border ${borderMuted} rounded-2xl shadow-2xl py-3 px-2 flex flex-col gap-1 z-50`}>
            {seoArticles.map((art) => (
              <button key={art.id} onClick={() => { setActiveArticle(art); setCurrentRoute(art.slug); setMobileBlogsOpen(false); }} className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider hover:${c.text} rounded-xl truncate`}>
                {art.title}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* RENDER DYNAMIC SUB-PAGES, SITEMAP OR HOMEPAGE */}
      {currentRoute === 'sitemap' ? (
        <div className="py-24 px-8 max-w-4xl mx-auto space-y-6 font-mono text-xs animate-in fade-in">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h1 className="text-xl font-bold font-sans">XML Sitemap Index</h1>
              <p className="text-slate-400 font-sans text-xs">Submit this URL to search engines for instant crawling and entity indexing.</p>
            </div>
            <button onClick={() => setCurrentRoute('home')} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-sans text-xs font-bold">Back to Site</button>
          </div>
          <pre className="bg-slate-900 text-emerald-400 p-6 rounded-2xl overflow-x-auto border border-slate-800">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${window.location.origin}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${seoArticles.map(art => `
  <url>
    <loc>${window.location.origin}/${art.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`}
          </pre>
        </div>
      ) : activeArticle ? (
        <div className="py-24 px-8 max-w-3xl mx-auto space-y-8 animate-in fade-in">
          <button onClick={() => { setActiveArticle(null); setCurrentRoute('home'); }} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </button>
          
          <span className={`text-xs font-bold ${c.text} uppercase tracking-widest font-mono`}>/{activeArticle.slug}</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">{activeArticle.title}</h1>
          <p className="text-xl text-slate-500 font-medium">{activeArticle.subtitle}</p>

          {activeArticle.headerImage && (
            <div className="w-full h-80 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img src={activeArticle.headerImage} alt={activeArticle.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className={`${bgCard} border ${borderMuted} p-10 rounded-3xl space-y-6 text-base leading-relaxed`}>
            <p className="whitespace-pre-line">{activeArticle.body}</p>
          </div>

          <div className="pt-8 border-t border-slate-200 flex justify-between items-center">
            <button onClick={() => { setActiveArticle(null); setCurrentRoute('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider">
              &larr; Back to Home
            </button>
            {seoArticles.length > 1 && (
              <button onClick={() => {
                const currentIndex = seoArticles.findIndex(a => a.id === activeArticle.id);
                const nextArticle = seoArticles[(currentIndex + 1) % seoArticles.length];
                setActiveArticle(nextArticle);
                setCurrentRoute(nextArticle.slug);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} className={`${c.bg} text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider`}>
                Read Next Article &rarr;
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* HERO SECTION WITH DYNAMIC TRANSPARENCY OVERLAY */}
          {activeSections.hero && (
            <section className="relative overflow-hidden min-h-[650px] flex items-center">
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-0" style={{ backgroundImage: `url(${displayHero})` }}>
                <div className="absolute inset-0 bg-slate-950 transition-opacity duration-300" style={{ opacity: overlayOpacityValue }}></div>
              </div>
              <div className="relative z-10 px-8 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                <div className="flex flex-col gap-6">
                  <div className={`inline-flex items-center gap-2 ${c.lightBg} border ${c.border} border-opacity-30 px-4 py-1.5 rounded-full ${c.text} text-xs font-bold w-max uppercase tracking-widest`}>
                    <Activity className="w-4 h-4" /> {heroTagline || config.designTag}
                  </div>
                  <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-tight">
                    {heroHeadline ? heroHeadline : <>{businessName.toUpperCase()}: <span className={c.text}>{suburb.toUpperCase()}</span>.</>}
                  </h1>
                  <p className="text-slate-200 text-lg max-w-xl leading-relaxed">
                    {heroSubheadline || `${config.heroDefaultSubtitle} Operating across ${city} with uncompromising quality and precision standards.`}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <a href="#contact" className={`${c.bg} ${c.hover} text-white font-bold uppercase tracking-wide py-4 px-10 rounded-xl text-sm transition shadow-xl`}>
                      {heroButtonText || 'Engage Our Team'}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ABOUT SECTION */}
          {activeSections.about && (
            <section id="about" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted} grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
              <div className="flex flex-col gap-6">
                <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest`}>ABOUT US</h2>
                <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>
                  {aboutTitle || `Committed to Excellence in ${suburb}`}
                </h3>
                <p className={`${textMuted} text-base leading-relaxed whitespace-pre-line`}>
                  {aboutBody || `${businessName} delivers industry-leading standards across ${city} and surrounding regions. With a focus on precision, reliability, and client satisfaction, our experienced team ensures exceptional results on every engagement.`}
                </p>
                <div className="flex gap-4 pt-2">
                  <a href="#contact" className={`${c.bg} ${c.hover} text-white font-bold uppercase tracking-wide py-3 px-8 rounded-xl text-xs transition shadow-md`}>
                    {aboutButtonText || 'Get in Touch'}
                  </a>
                </div>
              </div>
              <div className={`h-80 rounded-3xl ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-200'} flex items-center justify-center font-bold text-slate-500 overflow-hidden shadow-lg`}>
                <img src={displayHero} alt="About Us" className="w-full h-full object-cover opacity-80" />
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
                  <div key={service.id} className={`${bgCard} border ${borderMuted} hover:${c.border} shadow-sm rounded-2xl overflow-hidden transition-all flex flex-col group`}>
                    {service.image ? (
                      <div className="h-56 w-full flex-shrink-0"><img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" /></div>
                    ) : (
                      <div className={`h-40 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center border-b ${borderMuted}`}>
                        <ArrowRight className={`w-10 h-10 ${textMuted} group-hover:${c.text} transition`} />
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

          {/* FULLY EDITABLE WHY CHOSEN SECTION */}
          {activeSections.whyUs && (
            <section id="whyUs" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>{whyUsHeader.sub}</h2>
                <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>{whyUsHeader.main}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {whyUsItems.map((item, idx) => (
                  <div key={idx} className={`${bgCard} border ${borderMuted} p-8 rounded-2xl shadow-sm flex flex-col gap-4`}>
                    <div className={`w-12 h-12 rounded-xl ${c.lightBg} flex items-center justify-center ${c.text}`}><ShieldCheck className="w-6 h-6" /></div>
                    <h4 className={`text-xl font-bold ${textMain}`}>{item.title}</h4>
                    <p className={`${textMuted} text-sm leading-relaxed`}>{item.desc}</p>
                  </div>
                ))}
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
                  <div key={proj.id} className={`${bgCard} border ${borderMuted} rounded-3xl overflow-hidden shadow-md flex flex-col h-full group`}>
                    {proj.image ? (
                      <div className="h-64 w-full relative flex-shrink-0 overflow-hidden">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                    ) : (
                      <div className={`h-64 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center ${textMuted} font-bold text-sm flex-shrink-0`}>Media Showcase</div>
                    )}
                    <div className="p-8 flex flex-col flex-1 justify-between bg-slate-900 text-white">
                      <div>
                        <span className={`text-[10px] font-bold ${c.text} uppercase tracking-widest`}>{proj.subtitle}</span>
                        <h4 className="font-bold text-white text-2xl mt-1">{proj.title}</h4>
                        <p className="text-sm text-slate-300 mt-3 leading-relaxed">{proj.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FULLY EDITABLE REVIEWS SECTION */}
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
                      <div className="h-48 w-full overflow-hidden flex-shrink-0">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                    ) : (
                      <div className={`h-36 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center ${textMuted} text-xs font-bold flex-shrink-0`}>Product Image</div>
                    )}
                    <div className="p-8 flex flex-col justify-between flex-1 gap-4">
                      <div>
                        <h4 className={`text-xl font-bold ${textMain}`}>{prod.name}</h4>
                        {prod.desc && <p className={`${textMuted} text-xs mt-2 leading-relaxed`}>{prod.desc}</p>}
                        <div className={`text-3xl font-black ${c.text} mt-4`}>₹{prod.price}</div>
                      </div>
                      <a href={prod.checkoutUrl || '#contact'} target={prod.checkoutUrl ? "_blank" : "_self"} rel="noreferrer" className={`w-full text-center ${c.bg} ${c.hover} text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md`}>
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
          {activeSections.team && (
            <section id="team" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted}`}>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className={`text-xs font-bold ${c.text} uppercase tracking-widest mb-3`}>LEADERSHIP</h2>
                <h3 className={`text-4xl font-black ${textMain} tracking-tight`}>Our Executive Team</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeTeam.map((member) => (
                  <div key={member.id} className={`${bgCard} border ${borderMuted} rounded-3xl overflow-hidden shadow-sm flex flex-col`}>
                    {member.image ? (
                      <div className="h-72 w-full flex-shrink-0"><img src={member.image} alt={member.name} className="w-full h-full object-cover" /></div>
                    ) : (
                      <div className={`h-72 ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex items-center justify-center ${textMuted} flex-shrink-0`}>No Photo</div>
                    )}
                    <div className="p-6 text-center">
                      <h4 className={`text-xl font-bold ${textMain}`}>{member.name}</h4>
                      <p className={`${c.text} text-xs font-bold uppercase tracking-wider mt-1`}>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ SECTION */}
          {activeSections.faq && (
            <section id="faq" className={`py-24 px-8 max-w-4xl mx-auto border-t ${borderMuted}`}>
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
        </>
      )}

      {/* CONTACT & FOOTER SECTION */}
      {activeSections.contact && (
        <footer id="contact" className={`py-24 px-8 max-w-7xl mx-auto border-t ${borderMuted} space-y-16`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
            </div>

            <div className={`${bgCard} border ${borderMuted} p-10 rounded-3xl shadow-xl flex flex-col justify-between`}>
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

              {additionalLegalInfo && (
                <div className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500 font-medium">
                  {additionalLegalInfo}
                </div>
              )}
            </div>
          </div>

          {/* OPTIONAL FOOTER MENU */}
          {showFooterMenu && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-800 text-xs">
              <div className="space-y-3">
                <h4 className="font-bold uppercase tracking-wider">Quick Links</h4>
                <div className="flex flex-col gap-2 text-slate-400">
                  <button onClick={() => { setCurrentRoute('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-left hover:text-blue-400">HOME</button>
                  <a href="#about" className="hover:text-blue-400">About Us</a>
                  <a href="#services" className="hover:text-blue-400">Services</a>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold uppercase tracking-wider">Blogs & SEO</h4>
                <div className="flex flex-col gap-2 text-slate-400">
                  {seoArticles.map(art => (
                    <button key={art.id} onClick={() => { setActiveArticle(art); setCurrentRoute(art.slug); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-left hover:text-blue-400 truncate">{art.title}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Bottom Bar with Adaptive Theme Branding (White in Dark Mode, Slate-900 in Light Mode) */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div>© {new Date().getFullYear()} {businessName}. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span className="font-medium text-slate-500">
                Built by <strong className={isDark ? 'text-white font-black' : 'text-slate-900 font-black'}>SiteForge</strong>
              </span>
              <button onClick={() => { setCurrentRoute('sitemap'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition font-bold flex items-center gap-1.5 focus:outline-none">
                <FileText className="w-3.5 h-3.5" /> XML Sitemap Index
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}