import { useState, useEffect } from 'react';
import PlumbingTemplate from './components/themes/Plumbing';
import RoofingTemplate from './components/themes/Roofing';
import ElectricianTemplate from './components/themes/Electrician';
import HvacTemplate from './components/themes/Hvac';
import BpoTemplate from './components/themes/Bpo';
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

interface ClientProfile {
  id: string;
  businessName: string;
  phone: string;
  suburb: string;
  theme: string;
  designConcept?: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image?: string;
}

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // --- NAVIGATION STATE ---
  const [activePage, setActivePage] = useState<'dashboard' | 'builder'>('dashboard');
  const [dashboardView, setDashboardView] = useState<'leads' | 'routing' | 'domains' | 'billing' | 'analytics' | 'portal' | 'emails' | 'support' | 'webhooks'>('leads');
  const [checkoutNotification, setCheckoutNotification] = useState<string | null>(null);
  
  // --- BUILDER / EDITOR STATE ---
  const [editorTab, setEditorTab] = useState<'content' | 'media' | 'layout' | 'commerce'>('content');
  const [siteLogo, setSiteLogo] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [activeSections, setActiveSections] = useState({
    hero: true,
    services: true,
    about: true,
    products: false,
    testimonials: true,
    contact: true
  });
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Standard Service Call', price: '99' }
  ]);

  // --- PROFILES & CONTENT STATE ---
  const [profiles, setProfiles] = useState<ClientProfile[]>([
    { id: '1', businessName: 'Apex Melbourne Trades', phone: '+61 3 9111 2222', suburb: 'St. Kilda VIC', theme: 'plumbing', designConcept: 'conversion' },
    { id: '2', businessName: 'Metro Roof Restorations', phone: '+61 3 8888 4444', suburb: 'Richmond VIC', theme: 'roofing', designConcept: 'editorial' },
    { id: '3', businessName: 'Apex Electrical Group', phone: '+61 3 9999 5555', suburb: 'South Yarra VIC', theme: 'electrician', designConcept: 'modern' },
    { id: '4', businessName: 'JRB Tele Services BPO', phone: '+91 9766 724740', suburb: 'Mumbai', theme: 'bpo', designConcept: 'minimal' }
  ]);
  const [activeProfileId, setActiveProfileId] = useState('1');

  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];
  const [businessName, setBusinessName] = useState(activeProfile.businessName);
  const [phone, setPhone] = useState(activeProfile.phone);
  const [suburb, setSuburb] = useState(activeProfile.suburb);
  const [selectedTheme, setSelectedTheme] = useState(activeProfile.theme);
  const [designConcept, setDesignConcept] = useState<string>(activeProfile.designConcept || 'conversion');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSelectProfile = (profile: ClientProfile) => {
    setActiveProfileId(profile.id);
    setBusinessName(profile.businessName);
    setPhone(profile.phone);
    setSuburb(profile.suburb);
    setSelectedTheme(profile.theme);
    setDesignConcept(profile.designConcept || 'conversion');
  };

  const handleAddNewProfile = () => {
    const newId = String(profiles.length + 1);
    const newProfile: ClientProfile = {
      id: newId,
      businessName: `New Client ${newId}`,
      phone: '+61 400 000 000',
      suburb: 'Mumbai',
      theme: 'bpo',
      designConcept: 'conversion'
    };
    setProfiles([...profiles, newProfile]);
    handleSelectProfile(newProfile);
  };

  const handleAiCopy = async () => {
    setIsGenerating(true);
    const newHeadline = await generateAiContent(selectedTheme, suburb, 'headline');
    setBusinessName(newHeadline);
    setIsGenerating(false);
  };

  // Local Image Preview Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setter(imageUrl);
    }
  };

  const addProduct = () => {
    setProducts([...products, { id: Date.now().toString(), name: 'New Product', price: '0' }]);
  };

  if (checkingAuth) {
    return <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-400">Loading SiteForge Session...</div>;
  }

  if (!session) {
    return <AuthView onLoginSuccess={() => setActivePage('dashboard')} />;
  }

  const DashboardNavItem = ({ id, label }: { id: string, label: string }) => (
    <button
      onClick={() => setDashboardView(id as any)}
      className={`w-full flex items-center px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
        dashboardView === id
          ? 'bg-blue-600/15 text-blue-500 shadow-sm'
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans relative">
      
      {/* =========================================
          PAGE 1: THE SAAS DASHBOARD
          ========================================= */}
      {activePage === 'dashboard' && (
        <div className="flex h-full w-full">
          <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl shadow-black/50">
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-600/30">SF</div>
                <span className="font-bold text-lg tracking-tight text-white">SiteForge</span>
              </div>
              <button 
                onClick={() => setActivePage('builder')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                Launch Builder
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-4 mt-2">Platform Management</div>
              <DashboardNavItem id="leads" label="Lead Pipeline" />
              <DashboardNavItem id="routing" label="Lead Routing Rules" />
              <DashboardNavItem id="domains" label="Domain Manager" />
              <DashboardNavItem id="portal" label="Client Portal" />
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-4 mt-8">System & Config</div>
              <DashboardNavItem id="analytics" label="Platform Analytics" />
              <DashboardNavItem id="billing" label="Subscriptions & Billing" />
              <DashboardNavItem id="emails" label="Email Templates" />
              <DashboardNavItem id="webhooks" label="Webhooks & APIs" />
              <DashboardNavItem id="support" label="Support Tickets" />
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
              <button onClick={() => supabase.auth.signOut()} className="w-full py-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-red-500/10 hover:text-red-400 font-bold text-sm transition">
                Sign Out
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 relative">
            <header className="h-16 border-b border-slate-800 bg-slate-900/40 flex items-center px-8 backdrop-blur-md sticky top-0 z-10">
              <h1 className="text-xl font-bold text-white tracking-tight capitalize">{dashboardView.replace('-', ' ')}</h1>
            </header>
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

      {/* =========================================
          PAGE 2: THE SITEFORGE ADVANCED EDITOR
          ========================================= */}
      {activePage === 'builder' && (
        <div className="flex flex-col h-full w-full overflow-hidden">
          
          {/* EDITOR TOP NAVBAR */}
          <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActivePage('dashboard')}
                className="text-slate-400 hover:text-white transition text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800"
              >
                &larr; Dashboard
              </button>
              <div className="h-4 w-px bg-slate-700"></div>
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Editing: {businessName}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition">Preview</button>
              <button className="px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-600/20 transition">
                Publish Changes
              </button>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* EDITOR LEFT SIDEBAR */}
            <div className="w-[380px] bg-slate-950 border-r border-slate-800 flex flex-col z-10 shadow-2xl">
              
              {/* Editor Tabs */}
              <div className="flex p-2 gap-1 border-b border-slate-800 bg-slate-900/50">
                {(['content', 'media', 'layout', 'commerce'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setEditorTab(tab)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition ${
                      editorTab === tab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Editor Tools Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {editorTab === 'content' && (
                  <div className="space-y-4 animate-in fade-in">
                    <ProfileSwitcher profiles={profiles} activeProfileId={activeProfileId} onSelectProfile={handleSelectProfile} onAddNew={handleAddNewProfile} />
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Theme</label>
                      <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)} className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white">
                        <option value="plumbing">Plumbing</option>
                        <option value="roofing">Roofing</option>
                        <option value="electrician">Electrician</option>
                        <option value="hvac">HVAC</option>
                        <option value="bpo">BPO Services</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Business Name</label>
                      <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Phone</label>
                      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white" />
                    </div>
                    <button onClick={handleAiCopy} disabled={isGenerating} className="w-full bg-purple-600/20 text-purple-400 py-2.5 rounded-xl font-bold text-xs mt-2 border border-purple-500/30">
                      {isGenerating ? 'Generating...' : '✨ Auto-Write Copy'}
                    </button>
                  </div>
                )}

                {editorTab === 'media' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Site Logo</label>
                      <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 transition relative overflow-hidden group">
                        {siteLogo ? (
                          <img src={siteLogo} alt="Logo preview" className="h-12 object-contain" />
                        ) : (
                          <span className="text-2xl">🖼️</span>
                        )}
                        <span className="text-xs font-medium text-slate-400">Click to upload logo</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setSiteLogo)} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Hero Background Image</label>
                      <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800/50 transition relative overflow-hidden h-32">
                        {heroImage ? (
                          <img src={heroImage} alt="Hero preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                        ) : (
                          <span className="text-2xl">📸</span>
                        )}
                        <span className="text-xs font-medium text-slate-400 relative z-10 bg-slate-900/80 px-2 py-1 rounded">Upload hero image</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setHeroImage)} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                      </div>
                    </div>
                  </div>
                )}

                {editorTab === 'layout' && (
                  <div className="space-y-4 animate-in fade-in">
                    <p className="text-xs text-slate-400 mb-4">Toggle sections on or off for this website.</p>
                    {Object.entries(activeSections).map(([key, isVisible]) => (
                      <div key={key} className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <span className="text-sm font-medium text-white capitalize">{key} Section</span>
                        <button 
                          onClick={() => setActiveSections({ ...activeSections, [key]: !isVisible })}
                          className={`w-10 h-6 rounded-full p-1 transition-colors ${isVisible ? 'bg-blue-500' : 'bg-slate-700'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isVisible ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {editorTab === 'commerce' && (
                  <div className="space-y-4 animate-in fade-in">
                    <p className="text-xs text-slate-400 mb-2">Manage products, services, or booking options.</p>
                    <button onClick={addProduct} className="w-full py-2.5 rounded-xl border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs hover:bg-blue-500/10 transition">
                      + Add New Product
                    </button>
                    
                    <div className="space-y-3 mt-4">
                      {products.map((product, index) => (
                        <div key={product.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative group">
                          <button 
                            onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                            className="absolute top-2 right-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                          >
                            ✕
                          </button>
                          <input 
                            type="text" 
                            value={product.name}
                            onChange={(e) => {
                              const newProds = [...products];
                              newProds[index].name = e.target.value;
                              setProducts(newProds);
                            }}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white font-medium" 
                            placeholder="Product Name"
                          />
                          <div className="flex gap-2 items-center">
                            <span className="text-slate-400 text-sm">$</span>
                            <input 
                              type="number" 
                              value={product.price}
                              onChange={(e) => {
                                const newProds = [...products];
                                newProds[index].price = e.target.value;
                                setProducts(newProds);
                              }}
                              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" 
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT LIVE PREVIEW CANVAS */}
            <div className="flex-1 bg-slate-800 p-8 overflow-y-auto flex justify-center items-start">
              <div className="w-full max-w-[1200px] min-h-[800px] bg-white rounded-xl shadow-2xl shadow-black/50 overflow-hidden ring-1 ring-slate-900/5 transition-all">
                
                {/* Mock Browser Bar */}
                <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="mx-auto bg-white border border-slate-200 text-slate-400 text-xs px-4 py-1 rounded-md w-64 text-center truncate">
                    {businessName.toLowerCase().replace(/\s+/g, '-')}.siteforge.com
                  </div>
                </div>

                {/* TEMPLATE RENDER AREA */}
                <div className="relative">
                  {/* Overlay a visual warning if Hero section is disabled */}
                  {!activeSections.hero && <div className="absolute top-0 w-full p-2 bg-red-500 text-white text-center text-xs font-bold z-50">Hero Section Disabled</div>}
                  
                  {selectedTheme === 'plumbing' && (
                    <PlumbingTemplate 
                      businessName={businessName} 
                      phone={phone} 
                      suburb={suburb}
                      logo={siteLogo}
                      heroImage={heroImage} 
                    />
                  )}
                  {selectedTheme === 'roofing' && <RoofingTemplate businessName={businessName} phone={phone} suburb={suburb} />}
                  {selectedTheme === 'electrician' && <ElectricianTemplate businessName={businessName} phone={phone} suburb={suburb} />}
                  {selectedTheme === 'hvac' && <HvacTemplate businessName={businessName} phone={phone} suburb={suburb} />}
                  {selectedTheme === 'bpo' && <BpoTemplate businessName={businessName} phone={phone} suburb={suburb} />}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}