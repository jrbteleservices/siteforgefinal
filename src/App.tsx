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
import { exportToHtml } from './utils/exporter';
import { generateAiContent } from './utils/ai';
import { supabase } from './supabase';

interface ClientProfile { id: string; businessName: string; phone: string; suburb: string; theme: string; }
interface Product { id: string; name: string; price: string; }
interface ServiceItem { id: string; title: string; desc: string; image?: string; }
interface ProjectItem { id: string; subtitle: string; title: string; desc: string; image?: string; }
interface ReviewItem { id: string; name: string; rating: number; text: string; }

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // --- NAVIGATION STATE ---
  const [activePage, setActivePage] = useState<'dashboard' | 'builder'>('dashboard');
  const [dashboardView, setDashboardView] = useState<'leads' | 'routing' | 'domains' | 'billing' | 'analytics' | 'portal' | 'emails' | 'support' | 'webhooks'>('leads');
  
  // --- BUILDER / EDITOR STATE ---
  const [editorTab, setEditorTab] = useState<'content' | 'sections' | 'media' | 'layout' | 'commerce'>('content');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // New Content State
  const [colorPalette, setColorPalette] = useState('blue');
  const [streetAddress, setStreetAddress] = useState('123 Trade Avenue');
  const [city, setCity] = useState('Melbourne');
  const [email, setEmail] = useState('contact@apex.com.au');
  const [socials, setSocials] = useState({ facebook: '', instagram: '', tiktok: '' });

  // Media
  const [isUploading, setIsUploading] = useState(false);
  const [siteLogo, setSiteLogo] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [heroOpacity, setHeroOpacity] = useState(85);

  // Layout & Commerce
  const [activeSections, setActiveSections] = useState({
    hero: true,
    liveRequest: true,
    services: true,
    whyUs: true,
    projects: true,
    reviews: true,
    products: true,
    faq: true,
    contact: true
  });
  const [products, setProducts] = useState<Product[]>([{ id: '1', name: 'Standard Service Call', price: '99' }]);

  // Headers State
  const [headers, setHeaders] = useState({
    services: { sub: 'OUR CAPABILITIES', main: 'What We Do', desc: 'Comprehensive property and maintenance services.' },
    whyUs: { sub: 'REPUTATION & TRUST', main: 'Why Choose Us' },
    projects: { sub: 'PORTFOLIO', main: 'Recent Projects' },
    reviews: { sub: 'TESTIMONIALS', main: 'Client Reviews' }
  });

  // Dynamic Arrays
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([
    { id: '1', name: 'Sarah Jenkins', rating: 5, text: 'Absolutely fantastic service. Arrived on time and fixed the issue perfectly. Highly recommended!' },
    { id: '2', name: 'Michael T.', rating: 5, text: 'Very professional. Transparent pricing and left the place spotless.' }
  ]);

  // --- PROFILES & CONTENT STATE ---
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setIsUploading(true); const url = await uploadImageToSupabase(file); if (url) setter(url); setIsUploading(false);
  };

  const handlePublish = () => { setIsPublishing(true); setTimeout(() => { setIsPublishing(false); alert('Successfully published to edge network!'); }, 1200); };

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

      {/* BUILDER VIEW */}
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
              <div className="w-[420px] bg-slate-950 border-r border-slate-800 flex flex-col z-10 shadow-2xl relative">
                
                {isUploading && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
                      <span className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></span>
                      <span className="text-sm font-bold text-white">Uploading to Cloud...</span>
                    </div>
                  </div>
                )}

                <div className="flex p-2 gap-1 border-b border-slate-800 bg-slate-900/50 flex-wrap">
                  {(['content', 'sections', 'media', 'layout', 'commerce'] as const).map(tab => (
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
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Location Data</h4>
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
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">Services Section</h3></div>
                        <input type="text" value={headers.services.sub} onChange={(e) => setHeaders({...headers, services: {...headers.services, sub: e.target.value}})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                        <input type="text" value={headers.services.main} onChange={(e) => setHeaders({...headers, services: {...headers.services, main: e.target.value}})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" />
                        <div className="space-y-3 mt-4">
                          {servicesList.map((service, index) => (
                            <div key={service.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                              <button onClick={() => setServicesList(servicesList.filter(s => s.id !== service.id))} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                              <input type="text" value={service.title} onChange={(e) => { const n = [...servicesList]; n[index].title = e.target.value; setServicesList(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" />
                              <textarea value={service.desc} onChange={(e) => { const n = [...servicesList]; n[index].desc = e.target.value; setServicesList(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={2} />
                            </div>
                          ))}
                          <button onClick={() => setServicesList([...servicesList, { id: Date.now().toString(), title: 'New Service', desc: 'Description here...' }])} className="w-full py-2 border border-dashed border-slate-700 text-slate-400 font-bold text-xs rounded-xl hover:bg-slate-900">+ Add Service Customization</button>
                          <p className="text-[10px] text-slate-500 text-center">Note: Master Templates will auto-fill industry defaults if left blank.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {editorTab === 'media' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Site Logo</label>
                        <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 transition relative overflow-hidden group">
                          {siteLogo ? <img src={siteLogo} className="h-12 object-contain" /> : <span className="text-2xl">🖼️</span>}
                          <span className="text-xs font-medium text-slate-400">Click to upload logo</span>
                          <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleImageUpload(e, setSiteLogo)} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Hero Background Image</label>
                        <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 transition relative overflow-hidden h-32">
                          {heroImage ? <img src={heroImage} className="absolute inset-0 w-full h-full object-cover opacity-50" /> : <span className="text-2xl">📸</span>}
                          <span className="text-xs font-medium text-slate-400 relative z-10 bg-slate-900/80 px-2 py-1 rounded">Upload hero image</span>
                          <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleImageUpload(e, setHeroImage)} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
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
                      <p className="text-xs text-slate-400 mb-4">Toggle visibility of website modules.</p>
                      
                      <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-blue-500/30">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">Live Service Request</span>
                          <span className="text-[10px] text-slate-400">WhatsApp / Dispatch Box in Hero</span>
                        </div>
                        <button onClick={() => setActiveSections({ ...activeSections, liveRequest: !activeSections.liveRequest })} className={`w-10 h-6 rounded-full p-1 transition-colors ${activeSections.liveRequest ? 'bg-blue-500' : 'bg-slate-700'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${activeSections.liveRequest ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {['hero', 'services', 'whyUs', 'projects', 'reviews', 'products', 'faq'].map((key) => (
                        <div key={key} className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                          <span className="text-sm font-medium text-white capitalize">{key.replace(/([A-Z])/g, ' $1')} Section</span>
                          <button onClick={() => setActiveSections({ ...activeSections, [key as keyof typeof activeSections]: !activeSections[key as keyof typeof activeSections] })} className={`w-10 h-6 rounded-full p-1 transition-colors ${activeSections[key as keyof typeof activeSections] ? 'bg-blue-500' : 'bg-slate-700'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${activeSections[key as keyof typeof activeSections] ? 'translate-x-4' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {editorTab === 'commerce' && (
                    <div className="space-y-4 animate-in fade-in">
                      <button onClick={() => setProducts([...products, { id: Date.now().toString(), name: 'New Product', price: '0' }])} className="w-full py-2.5 rounded-xl border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs hover:bg-blue-500/10 transition">
                        + Add Fixed Price Service
                      </button>
                      <div className="space-y-3 mt-4">
                        {products.map((product, index) => (
                          <div key={product.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative group">
                            <button onClick={() => setProducts(products.filter(p => p.id !== product.id))} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                            <input type="text" value={product.name} onChange={(e) => { const n = [...products]; n[index].name = e.target.value; setProducts(n); }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white font-medium" />
                            <div className="flex gap-2 items-center">
                              <span className="text-slate-400 text-sm">$</span>
                              <input type="number" value={product.price} onChange={(e) => { const n = [...products]; n[index].price = e.target.value; setProducts(n); }} className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" />
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
                  {themeMode === 'light' ? '🌙 Test Dark' : '☀️ Test Light'}
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
                  {/* MASTER ENGINE ROUTER */}
                  {(() => {
                    const templateProps = {
                      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
                      logo: siteLogo, heroImage, heroOpacity, 
                      headers, servicesList, projectsList, reviewsList,
                      showProducts: activeSections.products, 
                      products, activeSections, themeMode
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