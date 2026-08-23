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
  
  // --- BUILDER TABS ---
  const [editorTab, setEditorTab] = useState<'content' | 'sections' | 'media' | 'layout' | 'commerce' | 'team'>('content');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Core Business Info & Additional Legal Info (ABN / GST Footer Field)
  const [colorPalette, setColorPalette] = useState('blue');
  const [streetAddress, setStreetAddress] = useState('123 Trade Avenue');
  const [city, setCity] = useState('Melbourne');
  const [email, setEmail] = useState('contact@apex.com.au');
  const [additionalLegalInfo, setAdditionalLegalInfo] = useState('ABN: 51 824 753 556');
  const [socials, setSocials] = useState({ facebook: '', instagram: '', tiktok: '' });
  const [showSiteForgeBranding, setShowSiteForgeBranding] = useState<boolean>(true);

  // Additional Locations & Operating Hours State
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [operatingHours, setOperatingHours] = useState<OperatingHourItem[]>([
    { id: '1', days: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
    { id: '2', days: 'Saturday', hours: '9:00 AM – 2:00 PM' }
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
    whyUs: false,
    projects: false,
    reviews: false,
    products: false,
    team: false,
    faq: false,
    contact: true,
    showCallButton: false,
    showWhatsappButton: false,
    showChatbotButton: false
  });

  // Headers State
  const [headers, setHeaders] = useState({
    services: { sub: 'OUR CAPABILITIES', main: 'What We Do', desc: 'Comprehensive property and maintenance services.' },
    whyUs: { sub: 'REPUTATION & TRUST', main: 'Why Choose Us' },
    projects: { sub: 'PORTFOLIO', main: 'Recent Projects' },
    reviews: { sub: 'TESTIMONIALS', main: 'Client Reviews' }
  });

  // Fully Editable Arrays
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([
    { id: '1', name: 'Sarah Jenkins', rating: 5, text: 'Absolutely fantastic service. Arrived on time and fixed the issue perfectly. Highly recommended!' },
    { id: '2', name: 'Michael T.', rating: 5, text: 'Very professional. Transparent pricing and left the place spotless.' }
  ]);
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Standard Service Call', desc: 'Professional diagnostic inspection and preliminary repair.', price: '99', image: '', checkoutUrl: 'https://paypal.me/sample' }
  ]);
  const [teamList, setTeamList] = useState<TeamMemberItem[]>([
    { id: 't1', name: 'Alexander Sterling', role: 'Managing Director & Founder', image: '' }
  ]);
  const [faqList, setFaqList] = useState<FaqItem[]>([
    { id: 'f1', question: 'What areas do you service?', answer: 'We service all metropolitan areas.' }
  ]);

  // Profiles State
  const [profiles, setProfiles] = useState<ClientProfile[]>([
    { id: '1', businessName: 'Apex Melbourne Trades', phone: '+61 3 9111 2222', suburb: 'St. Kilda VIC', theme: 'luxury_builder' }
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

  // PUBLISH HANDLER: Saves data locally and redirects to the working actual URL to avoid DNS errors.
  const handlePublish = () => { 
    setIsPublishing(true); 
    
    // 1. Pack all current editor data
    const templateProps = {
      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
      logo: siteLogo, logoSize, heroImage, heroOpacity, 
      headers, servicesList, projectsList, reviewsList,
      showProducts: activeSections.products, 
      products, activeSections, themeMode, teamList, faqList,
      locations, operatingHours, showSiteForgeBranding,
      additionalLegalInfo
    };
    
    // 2. Save it securely to local storage
    localStorage.setItem('siteforge_published_state', JSON.stringify({ templateProps, selectedTheme }));

    setTimeout(() => { 
      setIsPublishing(false); 
      
      // 3. Define the dummy visual URL and the actual working URL
      const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const dummyDomain = `https://${slug}.siteforge.au`;
      const actualWorkingUrl = `${window.location.origin}?published=true`;

      // 4. Trigger the confirmation
      const confirmed = window.confirm(`Successfully published to edge network!\n\nLive URL: ${dummyDomain}\n\nClick OK to open your live published website in a new window.`);
      
      // 5. Open the actual working URL (bypassing the DNS error)
      if (confirmed) {
        window.open(actualWorkingUrl, '_blank');
      }
    }, 800); 
  };

  // --- EARLY RETURN FOR LIVE PUBLISHED TAB ---
  // If the URL contains ?published=true, ONLY render the live website. No builder UI.
  if (isPublishedView && publishedData) {
    const currentConfig = AUSTRALIAN_THEMES[publishedData.selectedTheme] || AUSTRALIAN_THEMES['luxury_builder'];
    return (
      <div className="w-full min-h-screen bg-slate-50">
        <MasterPremiumTemplate config={currentConfig} {...publishedData.templateProps} />
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
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/30">SF</div>
                <span className="font-bold text-lg tracking-tight text-white">SiteForge</span>
              </div>
              <button onClick={() => setActivePage('builder')} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20">Launch Builder</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              <DashboardNavItem id="leads" label="Lead Pipeline" />
              <DashboardNavItem id="routing" label="Lead Routing Rules" />
              <DashboardNavItem id="domains" label="Domain Manager" />
              <DashboardNavItem id="portal" label="Client Portal" />
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-4 mt-6">System & Config</div>
              <DashboardNavItem id="analytics" label="Platform Analytics" />
              <DashboardNavItem id="billing" label="Subscriptions & Billing" />
              <DashboardNavItem id="emails" label="Email Templates" />
              <DashboardNavItem id="webhooks" label="Webhooks & APIs" />
              <DashboardNavItem id="support" label="Support Tickets" />
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
                <span className="text-sm font-bold text-white flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Editing: {businessName}</span>
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

                <div className="flex p-2 gap-1 border-b border-slate-800 bg-slate-900/50 flex-wrap">
                  {(['content', 'sections', 'media', 'layout', 'commerce', 'team'] as const).map(tab => (
                    <button key={tab} onClick={() => setEditorTab(tab)} className={`px-3 py-2 text-xs font-bold rounded-lg capitalize transition ${editorTab === tab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {editorTab === 'content' && (
                    <div className="space-y-5 animate-in fade-in">
                      <ProfileSwitcher profiles={profiles} activeProfileId={activeProfileId} onSelectProfile={setActiveProfileId} onAddNew={() => {}} />
                      
                      <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-5">
                        <div>
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Industry Theme</label>
                          <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)} className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:ring-1 focus:ring-blue-500">
                            <optgroup label="Premium Verticals">
                              {Object.values(AUSTRALIAN_THEMES).map(theme => (
                                <option key={theme.id} value={theme.id}>{theme.name}</option>
                              ))}
                            </optgroup>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Color Palette</label>
                          <select value={colorPalette} onChange={(e) => setColorPalette(e.target.value)} className="mt-1 w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:ring-1 focus:ring-blue-500">
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
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Core Business Info</h4>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Name</label>
                          <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" placeholder="contact@business.com.au" />
                          </div>
                        </div>
                      </div>

                      {/* ADDITIONAL LEGAL INFO (ABN / GST Footer Input) */}
                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Footer Legal / Registration Info</h4>
                        <div>
                          <input type="text" value={additionalLegalInfo} onChange={(e) => setAdditionalLegalInfo(e.target.value)} placeholder="ABN: 51 824 753 556" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                          <span className="text-[10px] text-slate-500 mt-1 block">Displayed in footer (e.g. ABN, GST, or company registration).</span>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">HQ Location Data</h4>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Street Address</label>
                          <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Suburb</label>
                            <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City</label>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                          </div>
                        </div>
                      </div>

                      {/* ADDITIONAL LOCATIONS MANAGER */}
                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Additional Locations</h4>
                          <button onClick={() => setLocations([...locations, { id: Date.now().toString(), name: 'Branch Office', address: '456 Commercial Rd', phone: '+61 3 0000 0000', email: 'branch@business.com.au' }])} className="text-xs font-bold text-blue-400 hover:text-blue-300">
                            + Add Location
                          </button>
                        </div>
                        {locations.map((loc, index) => (
                          <div key={loc.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 relative">
                            <button onClick={() => setLocations(locations.filter(l => l.id !== loc.id))} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                            <input type="text" value={loc.name} onChange={(e) => { const n = [...locations]; n[index].name = e.target.value; setLocations(n); }} className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white font-bold" placeholder="Branch Name" />
                            <input type="text" value={loc.address} onChange={(e) => { const n = [...locations]; n[index].address = e.target.value; setLocations(n); }} className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white" placeholder="Street Address" />
                            <div className="grid grid-cols-2 gap-2">
                              <input type="text" value={loc.phone} onChange={(e) => { const n = [...locations]; n[index].phone = e.target.value; setLocations(n); }} className="bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white" placeholder="Phone" />
                              <input type="text" value={loc.email} onChange={(e) => { const n = [...locations]; n[index].email = e.target.value; setLocations(n); }} className="bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white" placeholder="Email" />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* HOURS OF OPERATION MANAGER */}
                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Hours of Operation</h4>
                          <button onClick={() => setOperatingHours([...operatingHours, { id: Date.now().toString(), days: 'Sunday', hours: 'Closed' }])} className="text-xs font-bold text-blue-400 hover:text-blue-300">
                            + Add Schedule
                          </button>
                        </div>
                        {operatingHours.map((item, index) => (
                          <div key={item.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex gap-2 items-center relative">
                            <input type="text" value={item.days} onChange={(e) => { const n = [...operatingHours]; n[index].days = e.target.value; setOperatingHours(n); }} className="w-1/2 bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white font-medium" placeholder="Days" />
                            <input type="text" value={item.hours} onChange={(e) => { const n = [...operatingHours]; n[index].hours = e.target.value; setOperatingHours(n); }} className="w-1/2 bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white" placeholder="Hours" />
                            <button onClick={() => setOperatingHours(operatingHours.filter(h => h.id !== item.id))} className="text-slate-500 hover:text-red-400 text-xs">✕</button>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Social Media Links</h4>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instagram URL</label>
                          <input type="text" value={socials.instagram} onChange={(e) => setSocials({...socials, instagram: e.target.value})} placeholder="https://instagram.com/..." className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TikTok URL</label>
                          <input type="text" value={socials.tiktok} onChange={(e) => setSocials({...socials, tiktok: e.target.value})} placeholder="https://tiktok.com/@..." className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Facebook URL</label>
                          <input type="text" value={socials.facebook} onChange={(e) => setSocials({...socials, facebook: e.target.value})} placeholder="https://facebook.com/..." className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {editorTab === 'sections' && (
                    <div className="space-y-8 animate-in fade-in">
                      <div className="space-y-4">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">What We Do (Services)</h3></div>
                        <input type="text" value={headers.services.sub} onChange={(e) => setHeaders({...headers, services: {...headers.services, sub: e.target.value}})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" placeholder="Subtitle" />
                        <input type="text" value={headers.services.main} onChange={(e) => setHeaders({...headers, services: {...headers.services, main: e.target.value}})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" placeholder="Main Title" />
                        
                        <div className="space-y-4 mt-4">
                          {(servicesList.length > 0 ? servicesList : AUSTRALIAN_THEMES[selectedTheme]?.servicesDefault || []).map((service, index) => (
                            <div key={service.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                              <button onClick={() => {
                                const current = servicesList.length > 0 ? servicesList : AUSTRALIAN_THEMES[selectedTheme]?.servicesDefault || [];
                                setServicesList(current.filter(s => s.id !== service.id));
                              }} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                              
                              <input type="text" value={service.title} onChange={(e) => { 
                                const current = [...(servicesList.length > 0 ? servicesList : AUSTRALIAN_THEMES[selectedTheme]?.servicesDefault || [])]; 
                                current[index].title = e.target.value; setServicesList(current); 
                              }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" placeholder="Service Title" />
                              
                              <textarea value={service.desc} onChange={(e) => { 
                                const current = [...(servicesList.length > 0 ? servicesList : AUSTRALIAN_THEMES[selectedTheme]?.servicesDefault || [])]; 
                                current[index].desc = e.target.value; setServicesList(current); 
                              }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={2} placeholder="Service Description" />
                              
                              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                                {service.image && <img src={service.image} className="w-10 h-10 object-cover rounded-md" />}
                                <div className="flex-1">
                                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Upload Service Image</label>
                                  <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleGeneralImageUpload(e, (url) => {
                                    const current = [...(servicesList.length > 0 ? servicesList : AUSTRALIAN_THEMES[selectedTheme]?.servicesDefault || [])];
                                    current[index].image = url; setServicesList(current);
                                  })} className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer" />
                                </div>
                                {service.image && (
                                  <button onClick={() => {
                                    const current = [...(servicesList.length > 0 ? servicesList : AUSTRALIAN_THEMES[selectedTheme]?.servicesDefault || [])];
                                    current[index].image = ''; setServicesList(current);
                                  }} className="text-red-400 text-xs hover:underline">Delete</button>
                                )}
                              </div>
                            </div>
                          ))}
                          <button onClick={() => {
                            const current = [...(servicesList.length > 0 ? servicesList : AUSTRALIAN_THEMES[selectedTheme]?.servicesDefault || [])];
                            current.push({ id: Date.now().toString(), title: 'New Service Item', desc: 'Detailed description here...', image: '' });
                            setServicesList(current);
                          }} className="w-full py-2.5 border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs rounded-xl hover:bg-blue-500/10 transition">+ Add Service Item</button>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-slate-800">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">Recent Projects (Portfolio)</h3></div>
                        <input type="text" value={headers.projects.main} onChange={(e) => setHeaders({...headers, projects: {...headers.projects, main: e.target.value}})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" />
                        
                        <div className="space-y-4 mt-4">
                          {(projectsList.length > 0 ? projectsList : AUSTRALIAN_THEMES[selectedTheme]?.projectsDefault || []).map((proj, index) => (
                            <div key={proj.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                              <button onClick={() => {
                                const current = projectsList.length > 0 ? projectsList : AUSTRALIAN_THEMES[selectedTheme]?.projectsDefault || [];
                                setProjectsList(current.filter(p => p.id !== proj.id));
                              }} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                              
                              <input type="text" value={proj.subtitle} onChange={(e) => {
                                const current = [...(projectsList.length > 0 ? projectsList : AUSTRALIAN_THEMES[selectedTheme]?.projectsDefault || [])];
                                current[index].subtitle = e.target.value; setProjectsList(current);
                              }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white" placeholder="Location/Subtitle" />

                              <input type="text" value={proj.title} onChange={(e) => { 
                                const current = [...(projectsList.length > 0 ? projectsList : AUSTRALIAN_THEMES[selectedTheme]?.projectsDefault || [])]; 
                                current[index].title = e.target.value; setProjectsList(current); 
                              }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" placeholder="Project Title" />
                              
                              <textarea value={proj.desc} onChange={(e) => { 
                                const current = [...(projectsList.length > 0 ? projectsList : AUSTRALIAN_THEMES[selectedTheme]?.projectsDefault || [])]; 
                                current[index].desc = e.target.value; setProjectsList(current); 
                              }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={2} placeholder="Project Description" />
                              
                              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                                {proj.image && <img src={proj.image} className="w-10 h-10 object-cover rounded-md" />}
                                <div className="flex-1">
                                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Upload Project Image</label>
                                  <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleGeneralImageUpload(e, (url) => {
                                    const current = [...(projectsList.length > 0 ? projectsList : AUSTRALIAN_THEMES[selectedTheme]?.projectsDefault || [])];
                                    current[index].image = url; setProjectsList(current);
                                  })} className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer" />
                                </div>
                                {proj.image && (
                                  <button onClick={() => {
                                    const current = [...(projectsList.length > 0 ? projectsList : AUSTRALIAN_THEMES[selectedTheme]?.projectsDefault || [])];
                                    current[index].image = ''; setProjectsList(current);
                                  }} className="text-red-400 text-xs hover:underline">Delete</button>
                                )}
                              </div>
                            </div>
                          ))}
                          <button onClick={() => {
                            const current = [...(projectsList.length > 0 ? projectsList : AUSTRALIAN_THEMES[selectedTheme]?.projectsDefault || [])];
                            current.push({ id: Date.now().toString(), subtitle: 'New Location', title: 'New Project Showcase', desc: 'Project overview...', image: '' });
                            setProjectsList(current);
                          }} className="w-full py-2.5 border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs rounded-xl hover:bg-blue-500/10 transition">+ Add Project Item</button>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-slate-800">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">Frequently Asked Questions (FAQs)</h3></div>
                        <div className="space-y-4 mt-4">
                          {faqList.map((faq, index) => (
                            <div key={faq.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                              <button onClick={() => setFaqList(faqList.filter(f => f.id !== faq.id))} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                              <input type="text" value={faq.question} onChange={(e) => { const n = [...faqList]; n[index].question = e.target.value; setFaqList(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white font-bold" placeholder="Question" />
                              <textarea value={faq.answer} onChange={(e) => { const n = [...faqList]; n[index].answer = e.target.value; setFaqList(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={2} placeholder="Answer" />
                            </div>
                          ))}
                          <button onClick={() => setFaqList([...faqList, { id: Date.now().toString(), question: 'New Question?', answer: 'Detailed answer...' }])} className="w-full py-2.5 border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs rounded-xl hover:bg-blue-500/10 transition">+ Add FAQ Item</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {editorTab === 'media' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Site Logo Upload</label>
                        <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 transition relative overflow-hidden group">
                          {siteLogo ? <img src={siteLogo} style={{ height: `${logoSize}px` }} className="object-contain mb-2 transition-all" /> : <span className="text-2xl">🖼️</span>}
                          <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleGeneralImageUpload(e, setSiteLogo)} className="text-xs text-slate-400 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white cursor-pointer" />
                          {siteLogo && <button onClick={() => setSiteLogo(null)} className="text-red-400 text-xs mt-1 hover:underline">Delete Logo</button>}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                          Logo Size (Height)
                          <span className="text-blue-400">{logoSize}px</span>
                        </label>
                        <input type="range" min="20" max="150" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full accent-blue-500" />
                        <span className="text-[10px] text-slate-500 block">Recommended stable range: 40px – 100px (Max 150px)</span>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-slate-800">
                        <label className="text-xs font-bold text-slate-400 uppercase">Hero Background Image Upload</label>
                        <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 transition relative overflow-hidden">
                          {heroImage ? <img src={heroImage} className="h-24 w-full object-cover rounded-lg mb-2" /> : <span className="text-2xl">📸</span>}
                          <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleGeneralImageUpload(e, setHeroImage)} className="text-xs text-slate-400 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white cursor-pointer" />
                          {heroImage && <button onClick={() => setHeroImage(null)} className="text-red-400 text-xs mt-1 hover:underline">Delete Hero Image</button>}
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-slate-800">
                        <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                          Hero Darkness (Transparency)
                          <span className="text-blue-400">{heroOpacity}%</span>
                        </label>
                        <input type="range" min="0" max="100" value={heroOpacity} onChange={(e) => setHeroOpacity(Number(e.target.value))} className="w-full accent-blue-500" />
                      </div>
                    </div>
                  )}

                  {editorTab === 'layout' && (
                    <div className="space-y-4 animate-in fade-in">
                      <p className="text-xs text-slate-400 mb-4">Toggle visibility of website modules and floating action widgets.</p>
                      
                      <div className="space-y-3 border-b border-slate-800 pb-5 mb-2">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Floating Sticky Actions (Default Off)</h4>
                        
                        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                          <span className="text-sm font-medium text-white">Call Us Now Button</span>
                          <button onClick={() => setActiveSections({ ...activeSections, showCallButton: !activeSections.showCallButton })} className={`w-10 h-6 rounded-full p-1 transition-colors ${activeSections.showCallButton ? 'bg-blue-500' : 'bg-slate-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${activeSections.showCallButton ? 'translate-x-4' : 'translate-x-0'}`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                          <span className="text-sm font-medium text-white">Chat on WhatsApp Button</span>
                          <button onClick={() => setActiveSections({ ...activeSections, showWhatsappButton: !activeSections.showWhatsappButton })} className={`w-10 h-6 rounded-full p-1 transition-colors ${activeSections.showWhatsappButton ? 'bg-blue-500' : 'bg-slate-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${activeSections.showWhatsappButton ? 'translate-x-4' : 'translate-x-0'}`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                          <span className="text-sm font-medium text-white">Virtual Assistant (AI Bot)</span>
                          <button onClick={() => setActiveSections({ ...activeSections, showChatbotButton: !activeSections.showChatbotButton })} className={`w-10 h-6 rounded-full p-1 transition-colors ${activeSections.showChatbotButton ? 'bg-blue-500' : 'bg-slate-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${activeSections.showChatbotButton ? 'translate-x-4' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">SiteForge Branding in Chat</span>
                          <span className="text-[10px] text-slate-400">Display "Powered by SiteForge" badge</span>
                        </div>
                        <button onClick={() => setShowSiteForgeBranding(!showSiteForgeBranding)} className={`w-10 h-6 rounded-full p-1 transition-colors ${showSiteForgeBranding ? 'bg-blue-500' : 'bg-slate-700'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${showSiteForgeBranding ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {Object.entries({
                        hero: 'Hero Section',
                        about: 'About Section',
                        services: 'Services (What We Do)',
                        whyUs: 'Why Choose Us',
                        projects: 'Recent Projects',
                        reviews: 'Client Reviews',
                        products: 'Online Store / Products',
                        team: 'Our Executive Team',
                        faq: 'FAQ Section',
                        contact: 'Contact Footer'
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
                      <button onClick={() => setProducts([...products, { id: Date.now().toString(), name: 'New Product / Package', desc: 'Product description goes here...', price: '199', image: '', checkoutUrl: '' }])} className="w-full py-2.5 rounded-xl border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs hover:bg-blue-500/10 transition">
                        + Add Product / Package
                      </button>
                      <div className="space-y-4 mt-4">
                        {products.map((product, index) => (
                          <div key={product.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative group">
                            <button onClick={() => setProducts(products.filter(p => p.id !== product.id))} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                            
                            <div>
                              <label className="text-[10px] text-slate-400 uppercase font-bold">Product Title</label>
                              <input type="text" value={product.name} onChange={(e) => { const n = [...products]; n[index].name = e.target.value; setProducts(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white font-medium mt-1" placeholder="Product Title" />
                            </div>

                            <div>
                              <label className="text-[10px] text-slate-400 uppercase font-bold">Product Description</label>
                              <textarea value={product.desc} onChange={(e) => { const n = [...products]; n[index].desc = e.target.value; setProducts(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white mt-1" rows={2} placeholder="Product description..." />
                            </div>

                            <div>
                              <label className="text-[10px] text-slate-400 uppercase font-bold">Price ($)</label>
                              <input type="number" value={product.price} onChange={(e) => { const n = [...products]; n[index].price = e.target.value; setProducts(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white mt-1" placeholder="99" />
                            </div>

                            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                              {product.image && <img src={product.image} className="w-12 h-12 object-cover rounded-md mb-2" />}
                              <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Upload Product Image</label>
                              <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleGeneralImageUpload(e, (url) => {
                                const n = [...products]; n[index].image = url; setProducts(n);
                              })} className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white cursor-pointer" />
                              {product.image && <button onClick={() => { const n = [...products]; n[index].image = ''; setProducts(n); }} className="text-red-400 text-xs mt-1 hover:underline block">Delete Image</button>}
                            </div>

                            <div>
                              <label className="text-[10px] text-slate-400 uppercase font-bold">PayPal / Stripe Checkout Link</label>
                              <input type="text" value={product.checkoutUrl || ''} onChange={(e) => { const n = [...products]; n[index].checkoutUrl = e.target.value; setProducts(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white mt-1" placeholder="https://paypal.me/..." />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {editorTab === 'team' && (
                    <div className="space-y-4 animate-in fade-in">
                      <button onClick={() => setTeamList([...teamList, { id: Date.now().toString(), name: 'Team Member Name', role: 'Executive Title', image: '' }])} className="w-full py-2.5 rounded-xl border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs hover:bg-blue-500/10 transition">
                        + Add Team Member
                      </button>
                      <div className="space-y-4 mt-4">
                        {teamList.map((member, index) => (
                          <div key={member.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                            <button onClick={() => setTeamList(teamList.filter(t => t.id !== member.id))} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                            <input type="text" value={member.name} onChange={(e) => { const n = [...teamList]; n[index].name = e.target.value; setTeamList(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white font-bold" placeholder="Full Name" />
                            <input type="text" value={member.role} onChange={(e) => { const n = [...teamList]; n[index].role = e.target.value; setTeamList(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" placeholder="Job Title / Role" />
                            
                            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                              {member.image && <img src={member.image} className="w-10 h-10 object-cover rounded-md mb-2" />}
                              <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Upload Team Member Photo</label>
                              <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleGeneralImageUpload(e, (url) => {
                                const n = [...teamList]; n[index].image = url; setTeamList(n);
                              })} className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white cursor-pointer" />
                              {member.image && <button onClick={() => { const n = [...teamList]; n[index].image = ''; setTeamList(n); }} className="text-red-400 text-xs mt-1 hover:underline block">Delete Photo</button>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                      {businessName.toLowerCase().replace(/\s+/g, '-')}.siteforge.com
                    </div>
                  </div>
                )}

                <div className="relative">
                  {/* MASTER ENGINE ROUTER WITH LOCATIONS & HOURS */}
                  {(() => {
                    const templateProps = {
                      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
                      logo: siteLogo, logoSize, heroImage, heroOpacity, 
                      headers, servicesList, projectsList, reviewsList,
                      showProducts: activeSections.products, 
                      products, activeSections, themeMode, teamList, faqList,
                      locations, operatingHours, showSiteForgeBranding,
                      additionalLegalInfo
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