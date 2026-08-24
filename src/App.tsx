// src/App.tsx

import { useState, useEffect } from 'react';
import MasterPremiumTemplate from './components/themes/MasterPremiumTemplate';
import { AUSTRALIAN_THEMES } from './constants/industryConfigs';
import LeadsView from './components/dashboard/LeadsView';
import DomainsView from './components/dashboard/DomainsView';
import SubscriptionsView from './components/dashboard/SubscriptionsView';
import AnalyticsView from './components/dashboard/AnalyticsView';
import SupportView from './components/dashboard/SupportView';
import WebhooksView from './components/dashboard/WebhooksView';
import ClientPortalView from './components/dashboard/ClientPortalView';
import EmailTemplatesView from './components/dashboard/EmailTemplatesView';
import RoutingView from './components/common/RoutingView';
import AuthView from './components/auth/AuthView';
import ProfileSwitcher from './components/profiles/ProfileSwitcher';
import { supabase } from './supabase';

interface ClientProfile { id: string; businessName: string; phone: string; suburb: string; theme: string; }
interface Product { id: string; name: string; desc: string; price: string; image?: string; checkoutUrl?: string; }
interface ServiceItem { id: string; title: string; desc: string; image?: string; }
interface ProjectItem { id: string; subtitle: string; title: string; desc: string; image?: string; }
interface ReviewItem { id: string; name: string; rating: number; text: string; image?: string; }
interface TeamMemberItem { id: string; name: string; role: string; image?: string; }
interface FaqItem { id: string; question: string; answer: string; }
interface LocationItem { id: string; name: string; address: string; phone: string; email: string; }
interface OperatingHourItem { id: string; days: string; hours: string; }

export default function App() {
  // --- LIVE PUBLISHED VIEW CHECK ---
  const [isPublishedView] = useState(() => typeof window !== 'undefined' && window.location.search.includes('published=true'));
  const [publishedData] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.location.search.includes('published=true')) {
        return JSON.parse(localStorage.getItem('siteforge_published_state') || 'null');
      }
    } catch (e) { console.error(e); }
    return null;
  });

  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // --- NAVIGATION STATE ---
  const [activePage, setActivePage] = useState<'dashboard' | 'builder'>('builder');
  const [dashboardView, setDashboardView] = useState<'leads' | 'routing' | 'domains' | 'billing' | 'analytics' | 'portal' | 'emails' | 'support' | 'webhooks'>('leads');
  
  // --- BUILDER TABS & MULTI-PAGE TARGETING ---
  const [editorTab, setEditorTab] = useState<'content' | 'pages' | 'sections' | 'media' | 'layout' | 'commerce' | 'team'>('content');
  const [selectedSubPage, setSelectedSubPage] = useState<'home' | 'service-webdev' | 'service-seo' | 'location-vasaiwest' | 'location-vasaieast'>('home');
  
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Core Business Info & Additional Legal Info
  const [colorPalette, setColorPalette] = useState('blue');
  const [streetAddress, setStreetAddress] = useState('Station Road, Vasai West');
  const [city, setCity] = useState('Vasai-Virar');
  const [email, setEmail] = useState('contact@vasaiweb.in');
  const [additionalLegalInfo, setAdditionalLegalInfo] = useState('VasaiWeb Digital Agency | Serving Vasai & Global Brands');
  const [socials, setSocials] = useState({ facebook: '', instagram: '', tiktok: '' });
  const [showSiteForgeBranding, setShowSiteForgeBranding] = useState<boolean>(true);

  // Dynamic Hero and About Text Overrides (Including Buttons)
  const [heroTagline, setHeroTagline] = useState('VASAI’S PREMIER DIGITAL AGENCY');
  const [heroHeadline, setHeroHeadline] = useState('Websites That Dominate. SEO That Ranks #1.');
  const [heroSubheadline, setHeroSubheadline] = useState('Stop losing local customers to outdated competition. We build lightning-fast web architecture and elite SEO engines for businesses across Vasai.');
  const [heroButtonText, setHeroButtonText] = useState('Get Free Audit');
  
  const [aboutTitle, setAboutTitle] = useState('Engineered for Absolute Market Dominance');
  const [aboutBody, setAboutBody] = useState('VasaiWeb helps local businesses and global brands outnumber their competition. We combine sub-second edge web performance with aggressive organic search strategies to make sure your brand is the default choice.');
  const [aboutButtonText, setAboutButtonText] = useState('Explore Services');

  // Additional Locations & Operating Hours State
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [operatingHours, setOperatingHours] = useState<OperatingHourItem[]>([
    { id: '1', days: 'Monday – Saturday', hours: '9:00 AM – 7:00 PM' }
  ]);

  // Media & Logo Sizing Slider State
  const [isUploading, setIsUploading] = useState(false);
  const [siteLogo, setSiteLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState<number>(40); 
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [heroOpacity, setHeroOpacity] = useState(85);

  // Layout Section Toggles
  const [activeSections, setActiveSections] = useState({
    hero: true,
    about: true,
    services: true,
    whyUs: true,
    projects: true,
    reviews: true,
    products: true,
    team: false,
    faq: true,
    contact: true,
    showCallButton: true,
    showWhatsappButton: true,
    showChatbotButton: true
  });

  // Headers State
  const [headers, setHeaders] = useState({
    services: { sub: 'OUR CORE SOLUTIONS', main: 'High-Impact Digital Services', desc: 'Everything your business needs to capture market share online.' },
    whyUs: { sub: 'THE VASAIWEB ADVANTAGE', main: 'Why Local Businesses Choose Us' },
    projects: { sub: 'TRACK RECORD', main: 'Recent Client Victories' },
    reviews: { sub: 'TESTIMONIALS', main: 'What Founders & Owners Say' }
  });

  // Fully Editable Arrays
  const [servicesList, setServicesList] = useState<ServiceItem[]>([
    { id: 's1', title: 'High-Performance Web Development', desc: 'Lightning-fast, mobile-first websites built to convert casual visitors into high-paying clients.' },
    { id: 's2', title: 'Vasai Local SEO & Map Domination', desc: 'Secure the #1 position in Google Maps and organic listings so customers find you first.' },
    { id: 's3', title: 'AI Automation & Lead Funnels', desc: 'Deploy 24/7 AI chatbots and instant WhatsApp lead capture systems directly on your domain.' }
  ]);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([
    { id: 'p1', subtitle: 'Vasai West', title: 'Luxury Real Estate Portal', desc: 'Engineered a high-speed property showcase resulting in a 240% increase in qualified buyer leads.' },
    { id: 'p2', subtitle: 'Vasai Industrial Estate', title: 'B2B Manufacturing Export Hub', desc: 'Upgraded legacy architecture to sub-second load speeds, capturing international buyer inquiries.' },
    { id: 'p3', subtitle: 'Manikpur', title: 'Premier Coaching Institute', desc: 'Built an automated student enrollment funnel integrated with SMS and WhatsApp routing.' }
  ]);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([
    { id: '1', name: 'Rajesh Patil', rating: 5, text: 'VasaiWeb completely transformed our online presence. We went from zero local visibility to ranking #1 on Google Maps in less than 60 days!' },
    { id: '2', name: 'Anita D’Souza', rating: 5, text: 'The website speed is unbelievable. Our customer inquiries tripled within the first week of launch.' }
  ]);
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Vasai Business Starter Site', desc: 'Complete 5-page lightning-fast website, mobile optimized, contact forms, and basic SEO.', price: '14999', checkoutUrl: '' },
    { id: '2', name: 'Local SEO Map Domination Pack', desc: 'Google Business Profile optimization, keyword targeting, review velocity engine, and local citations.', price: '7999', checkoutUrl: '' }
  ]);
  const [teamList, setTeamList] = useState<TeamMemberItem[]>([]);
  const [faqList, setFaqList] = useState<FaqItem[]>([
    { id: 'f1', question: 'How long does it take to build and launch our website?', answer: 'Unlike traditional agencies that take months, our SiteForge architecture allows us to deploy fully finalized websites in just 3 to 5 days.' },
    { id: 'f2', question: 'How do you guarantee #1 rankings on Google Maps?', answer: 'We optimize your Google Business Profile, target exact-match local keywords, and implement automated review velocity systems that Google algorithmically favors.' }
  ]);

  // Profiles State
  const [profiles, setProfiles] = useState<ClientProfile[]>([
    { id: '1', businessName: 'VasaiWeb', phone: '+91 98230 00000', suburb: 'Vasai West', theme: 'luxury_builder' }
  ]);
  const [activeProfileId, setActiveProfileId] = useState('1');
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];
  const [businessName, setBusinessName] = useState(activeProfile.businessName);
  const [phone, setPhone] = useState(activeProfile.phone);
  const [suburb, setSuburb] = useState(activeProfile.suburb);
  const [selectedTheme, setSelectedTheme] = useState(activeProfile.theme);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setCheckingAuth(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;
    const { error } = await supabase.storage.from('site-assets').upload(filePath, file, { cacheControl: '3600', upsert: false });
    if (error) { alert('Upload failed: ' + error.message); return null; }
    return supabase.storage.from('site-assets').getPublicUrl(filePath).data.publicUrl;
  };

  const handleGeneralImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0]; if (!file) return;
    setIsUploading(true); const url = await uploadImageToSupabase(file); if (url) setter(url); setIsUploading(false);
  };

  const handlePublish = () => { 
    const templateProps = {
      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
      logo: siteLogo, logoSize, heroImage, heroOpacity, 
      heroTagline, heroHeadline, heroSubheadline, heroButtonText, 
      aboutTitle, aboutBody, aboutButtonText,
      headers, servicesList, projectsList, reviewsList,
      showProducts: activeSections.products, 
      products, activeSections, themeMode, teamList, faqList,
      locations, operatingHours, showSiteForgeBranding,
      additionalLegalInfo, selectedSubPage
    };
    
    localStorage.setItem('siteforge_published_state', JSON.stringify({ templateProps, selectedTheme }));

    const actualWorkingUrl = `${window.location.origin}?published=true`;
    const newTab = window.open(actualWorkingUrl, '_blank');
    
    if (!newTab) {
      window.location.href = actualWorkingUrl;
    }

    setIsPublishing(true); 
    setTimeout(() => { 
      setIsPublishing(false); 
    }, 800); 
  };

  if (isPublishedView) {
    const dataToRender = publishedData ? publishedData.templateProps : {
      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
      logo: siteLogo, logoSize, heroImage, heroOpacity, 
      heroTagline, heroHeadline, heroSubheadline, heroButtonText,
      aboutTitle, aboutBody, aboutButtonText,
      headers, servicesList, projectsList, reviewsList,
      showProducts: activeSections.products, 
      products, activeSections, themeMode, teamList, faqList,
      locations, operatingHours, showSiteForgeBranding,
      additionalLegalInfo, selectedSubPage
    };

    const themeToRender = publishedData ? publishedData.selectedTheme : selectedTheme;
    const currentConfig = AUSTRALIAN_THEMES[themeToRender] || AUSTRALIAN_THEMES['luxury_builder'];

    return (
      <div className="w-full min-h-screen overflow-y-auto bg-slate-50">
        <MasterPremiumTemplate config={currentConfig} {...dataToRender as any} />
      </div>
    );
  }

  if (checkingAuth) return <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-400">Loading Session...</div>;
  if (!session) return <AuthView onLoginSuccess={() => setActivePage('dashboard')} />;

  const DashboardNavItem = ({ id, label }: { id: string, label: string }) => (
    <button onClick={() => setDashboardView(id as any)} className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${dashboardView === id ? 'bg-blue-600/15 text-blue-500' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
      {label}
    </button>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans relative">
      
      {/* DASHBOARD VIEW */}
      {activePage === 'dashboard' && (
        <div className="flex h-full w-full">
           <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/30">VW</div>
                <span className="font-bold text-lg tracking-tight text-white">VasaiWeb Engine</span>
              </div>
              <button onClick={() => setActivePage('builder')} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20">Launch Builder</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              <DashboardNavItem id="leads" label="Local Inquiries" />
              <DashboardNavItem id="routing" label="Lead Routing Rules" />
              <DashboardNavItem id="domains" label="Domain Manager (vasaiweb.in)" />
              <DashboardNavItem id="portal" label="Client Portal" />
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-4 mt-6">System & Config</div>
              <DashboardNavItem id="analytics" label="SEO Analytics" />
              <DashboardNavItem id="billing" label="Billing & Packages" />
            </div>
            <div className="p-4 border-t border-slate-800">
              <button onClick={() => supabase.auth.signOut()} className="text-red-400 text-sm font-bold w-full text-left px-4 hover:text-red-300">Sign Out</button>
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-slate-950">
            <header className="h-16 border-b border-slate-800 bg-slate-900/40 flex items-center px-8 capitalize font-bold text-white tracking-tight text-xl">{dashboardView.replace('-', ' ')}</header>
            <main className="flex-1 overflow-y-auto p-8">
              <div className="max-w-7xl mx-auto h-full">
                {dashboardView === 'leads' && <LeadsView />}
                {dashboardView === 'routing' && <RoutingView />}
                {dashboardView === 'domains' && <DomainsView />}
                {dashboardView === 'billing' && <SubscriptionsView />}
                {dashboardView === 'analytics' && <AnalyticsView />}
                {dashboardView === 'portal' && <ClientPortalView />}
                {dashboardView === 'emails' && <EmailTemplatesView />}
                {dashboardView === 'support' && <SupportView />}
                {dashboardView === 'webhooks' && <WebhooksView />}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* BUILDER EDITORIAL VIEW */}
      {activePage === 'builder' && (
        <div className="flex flex-col h-full w-full overflow-hidden">
          
          {!isPreviewMode && (
            <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-20">
              <div className="flex items-center gap-4">
                <button onClick={() => setActivePage('dashboard')} className="text-slate-400 hover:text-white transition text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-800">&larr; Dashboard</button>
                <span className="text-sm font-bold text-white flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Editing: {businessName} ({selectedSubPage})</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition border border-slate-700 flex items-center gap-2">
                  {themeMode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
                <button onClick={() => setIsPreviewMode(true)} className="px-4 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition">Preview Site</button>
                <button onClick={handlePublish} className="px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-600/20 transition">
                  {isPublishing ? 'Publishing...' : 'Publish Changes'}
                </button>
              </div>
            </header>
          )}

          <div className="flex flex-1 overflow-hidden relative">
            
            {!isPreviewMode && (
              <div className="w-[460px] bg-slate-950 border-r border-slate-800 flex flex-col z-10 shadow-2xl relative">
                
                {isUploading && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
                      <span className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></span>
                      <span className="text-sm font-bold text-white">Uploading to Cloud...</span>
                    </div>
                  </div>
                )}

                {/* TAB NAVIGATION INCLUDING MULTI-PAGE SELECTOR */}
                <div className="flex p-2 gap-1 border-b border-slate-800 bg-slate-900/50 flex-wrap">
                  {(['content', 'pages', 'sections', 'media', 'layout', 'commerce', 'team'] as const).map(tab => (
                    <button key={tab} onClick={() => setEditorTab(tab)} className={`px-3 py-2 text-xs font-bold rounded-lg capitalize transition ${editorTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
                      {tab === 'pages' ? '📁 Sub-Pages (SEO)' : tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* MULTI-PAGE ROUTING SELECTOR TAB */}
                  {editorTab === 'pages' && (
                    <div className="space-y-4 animate-in fade-in">
                      <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl">
                        <h4 className="font-bold text-blue-400 text-xs uppercase tracking-wider mb-1">Multi-Page SEO Architecture</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">Select which page you want to edit. Each page has its own dedicated URL (`/services/...` or `/locations/...`) optimized for Google rankings.</p>
                      </div>

                      <div className="space-y-2">
                        {[
                          { id: 'home', label: 'Home Page (/)' },
                          { id: 'service-webdev', label: 'Web Development Service Page (/services/web-development)' },
                          { id: 'service-seo', label: 'Local SEO Service Page (/services/local-seo)' },
                          { id: 'location-vasaiwest', label: 'Vasai West Location Landing Page (/locations/vasai-west)' },
                          { id: 'location-vasaieast', label: 'Vasai East Location Landing Page (/locations/vasai-east)' },
                        ].map(p => (
                          <button key={p.id} onClick={() => setSelectedSubPage(p.id as any)} className={`w-full text-left p-3.5 rounded-xl text-xs font-bold border transition ${selectedSubPage === p.id ? 'bg-blue-600 text-white border-blue-500 shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'}`}>
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {editorTab === 'content' && (
                    <div className="space-y-5 animate-in fade-in">
                      <ProfileSwitcher profiles={profiles} activeProfileId={activeProfileId} onSelectProfile={setActiveProfileId} onAddNew={() => {}} />
                      
                      <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-5">
                        <div>
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Industry Theme</label>
                          <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)} className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white">
                            <optgroup label="Agency Themes">
                              {Object.values(AUSTRALIAN_THEMES).map(theme => (
                                <option key={theme.id} value={theme.id}>{theme.name}</option>
                              ))}
                            </optgroup>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Color Palette</label>
                          <select value={colorPalette} onChange={(e) => setColorPalette(e.target.value)} className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white">
                            <option value="blue">Blue (Default)</option>
                            <option value="emerald">Emerald Green</option>
                            <option value="rose">Ruby Rose</option>
                            <option value="amber">Amber Orange</option>
                            <option value="violet">Deep Violet</option>
                            <option value="cyan">Sky Cyan</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Agency Info</h4>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Agency Name</label>
                          <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Local Target Hub</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Suburb</label>
                            <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City Region</label>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {editorTab === 'sections' && (
                    <div className="space-y-8 animate-in fade-in">
                      <div className="space-y-4">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">Hero Section</h3></div>
                        <input type="text" value={heroTagline} onChange={(e) => setHeroTagline(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" placeholder="Tagline" />
                        <input type="text" value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" placeholder="Headline" />
                        <textarea value={heroSubheadline} onChange={(e) => setHeroSubheadline(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={3} placeholder="Sub-headline" />
                        <input type="text" value={heroButtonText} onChange={(e) => setHeroButtonText(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold text-blue-400" placeholder="Button Text" />
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-800">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">About Us Section</h3></div>
                        <input type="text" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" placeholder="About Title" />
                        <textarea value={aboutBody} onChange={(e) => setAboutBody(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={4} placeholder="About Body" />
                        <input type="text" value={aboutButtonText} onChange={(e) => setAboutButtonText(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold text-blue-400" placeholder="Button Text" />
                      </div>
                    </div>
                  )}

                  {editorTab === 'media' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Agency Logo</label>
                        <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-900/50">
                          {siteLogo ? <img src={siteLogo} style={{ height: `${logoSize}px` }} className="object-contain mb-2" /> : <span className="text-2xl">🖼️</span>}
                          <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleGeneralImageUpload(e, setSiteLogo)} className="text-xs text-slate-400" />
                          {siteLogo && <button onClick={() => setSiteLogo(null)} className="text-red-400 text-xs mt-1">Delete</button>}
                        </div>
                      </div>
                    </div>
                  )}

                  {editorTab === 'layout' && (
                    <div className="space-y-4 animate-in fade-in">
                      {Object.entries({
                        hero: 'Hero Section', about: 'About Section', services: 'Services', whyUs: 'Why Choose Us',
                        projects: 'Recent Projects', reviews: 'Client Reviews', products: 'Agency Pricing / Packages',
                        faq: 'FAQ Section', contact: 'Contact Footer'
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                          <span className="text-sm font-medium text-white">{label}</span>
                          <button onClick={() => setActiveSections({ ...activeSections, [key]: !activeSections[key as keyof typeof activeSections] })} className={`w-10 h-6 rounded-full p-1 transition-colors ${activeSections[key as keyof typeof activeSections] ? 'bg-blue-500' : 'bg-slate-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${activeSections[key as keyof typeof activeSections] ? 'translate-x-4' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {editorTab === 'commerce' && (
                    <div className="space-y-4 animate-in fade-in">
                      <button onClick={() => setProducts([...products, { id: Date.now().toString(), name: 'New Service Package', desc: 'Package description...', price: '9999', checkoutUrl: '' }])} className="w-full py-2.5 rounded-xl border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs">
                        + Add Service Package
                      </button>
                      <div className="space-y-4 mt-4">
                        {products.map((product, index) => (
                          <div key={product.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                            <button onClick={() => setProducts(products.filter(p => p.id !== product.id))} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                            <input type="text" value={product.name} onChange={(e) => { const n = [...products]; n[index].name = e.target.value; setProducts(n); }} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white font-bold" placeholder="Package Title" />
                            <textarea value={product.desc} onChange={(e) => { const n = [...products]; n[index].desc = e.target.value; setProducts(n); }} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white" rows={2} placeholder="Description" />
                            <input type="text" value={product.price} onChange={(e) => { const n = [...products]; n[index].price = e.target.value; setProducts(n); }} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white" placeholder="Price (INR)" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {editorTab === 'team' && <div className="text-slate-400 text-xs">Team tab not required for agency layout.</div>}

                </div>
              </div>
            )}

            {/* FULLSCREEN OVERLAYS */}
            {isPreviewMode && (
              <div className="absolute top-6 left-6 z-50 flex gap-3">
                <button onClick={() => setIsPreviewMode(false)} className="bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white shadow-2xl px-6 py-3 rounded-full font-black text-sm hover:bg-slate-800 transition flex items-center gap-2">
                  &larr; Exit Fullscreen Preview
                </button>
                <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} className="bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white shadow-2xl px-4 py-3 rounded-full font-black text-sm hover:bg-slate-800 transition">
                  {themeMode === 'light' ? '🌙 Test Dark' : '☀️ Light Mode'}
                </button>
              </div>
            )}

            {/* LIVE PREVIEW CANVAS */}
            <div className={`flex-1 bg-slate-800 transition-all ${isPreviewMode ? 'p-0' : 'p-8'} overflow-y-auto flex justify-center items-start`}>
              <div className={`w-full bg-white shadow-2xl shadow-black/50 overflow-hidden ring-1 ring-slate-900/5 transition-all ${isPreviewMode ? 'max-w-none min-h-screen rounded-none' : 'max-w-[1200px] min-h-[800px] rounded-xl'}`}>
                
                {!isPreviewMode && (
                  <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="mx-auto bg-white border border-slate-200 text-slate-400 text-xs px-4 py-1 rounded-md w-64 text-center truncate">
                      vasaiweb.in/{selectedSubPage === 'home' ? '' : selectedSubPage}
                    </div>
                  </div>
                )}

                <div className="relative">
                  {/* MASTER ENGINE ROUTER WITH MULTI-PAGE SEO SUPPORT */}
                  {(() => {
                    const templateProps = {
                      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
                      logo: siteLogo, logoSize, heroImage, heroOpacity, 
                      heroTagline, heroHeadline, heroSubheadline, heroButtonText,
                      aboutTitle, aboutBody, aboutButtonText,
                      headers, servicesList, projectsList, reviewsList,
                      showProducts: activeSections.products, 
                      products, activeSections, themeMode, teamList, faqList,
                      locations, operatingHours, showSiteForgeBranding,
                      additionalLegalInfo, selectedSubPage
                    };

                    const currentConfig = AUSTRALIAN_THEMES[selectedTheme] || AUSTRALIAN_THEMES['luxury_builder'];

                    return (
                      <MasterPremiumTemplate config={currentConfig} {...templateProps as any} />
                    );
                  })()}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}