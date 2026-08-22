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

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // --- NEW PAGE ISOLATION ARCHITECTURE ---
  // Controls which "Page" the user is on
  const [activePage, setActivePage] = useState<'dashboard' | 'builder'>('dashboard');
  
  // Controls which view is showing INSIDE the dashboard
  const [dashboardView, setDashboardView] = useState<'leads' | 'routing' | 'domains' | 'billing' | 'analytics' | 'portal' | 'emails' | 'support' | 'webhooks'>('leads');
  
  const [checkoutNotification, setCheckoutNotification] = useState<string | null>(null);
  
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

    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('success') === 'true') {
      setCheckoutNotification('🎉 Payment successful! Your subscription is now active.');
      setActivePage('dashboard');
      setDashboardView('billing');
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (queryParams.get('canceled') === 'true') {
      setCheckoutNotification('⚠️ Checkout was canceled. You can try again anytime.');
      setActivePage('dashboard');
      setDashboardView('billing');
      window.history.replaceState({}, document.title, window.location.pathname);
    }

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

  if (checkingAuth) {
    return <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-400">Loading SiteForge Session...</div>;
  }

  if (!session) {
    return <AuthView onLoginSuccess={() => setActivePage('dashboard')} />;
  }

  // --- HELPER COMPONENT FOR DASHBOARD NAVIGATION ---
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
      
      {checkoutNotification && (
        <div className="absolute top-4 right-4 z-50 bg-slate-900 border border-slate-700 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
          <p className="text-sm font-bold text-white">{checkoutNotification}</p>
          <button 
            onClick={() => setCheckoutNotification(null)}
            className="text-slate-400 hover:text-white font-bold text-xs bg-slate-800 px-2.5 py-1 rounded-lg"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* =========================================
          PAGE 1: THE SAAS DASHBOARD (Lovable Style)
          ========================================= */}
      {activePage === 'dashboard' && (
        <div className="flex h-full w-full">
          {/* WIDE LEFT SIDEBAR */}
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
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
              <button 
                onClick={() => supabase.auth.signOut()}
                className="w-full py-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:bg-red-500/10 hover:text-red-400 font-bold text-sm transition"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* MAIN DASHBOARD CONTENT AREA */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 relative">
            <header className="h-16 border-b border-slate-800 bg-slate-900/40 flex items-center px-8 backdrop-blur-md sticky top-0 z-10">
              <h1 className="text-xl font-bold text-white tracking-tight capitalize">
                {dashboardView.replace('-', ' ')}
              </h1>
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
          PAGE 2: THE SITEFORGE BUILDER ENGINE
          ========================================= */}
      {activePage === 'builder' && (
        <div className="flex h-full w-full overflow-hidden">
          
          {/* LEFT BUILDER CONTROLS */}
          <div className="w-[380px] border-r border-slate-800 p-6 flex flex-col gap-6 bg-slate-950 overflow-y-auto relative z-10 shadow-2xl shadow-black">
            
            <button 
              onClick={() => setActivePage('dashboard')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition text-xs font-bold mb-2 w-fit px-3 py-2 rounded-lg bg-slate-900 border border-slate-800"
            >
              &larr; Back to Dashboard
            </button>

            <div>
              <h1 className="text-xl font-black tracking-tight text-white">SITEFORGE <span className="text-blue-500">ENGINE</span></h1>
              <p className="text-xs text-slate-400 mt-1">Multi-tenant AI website generator</p>
            </div>

            <ProfileSwitcher 
              profiles={profiles}
              activeProfileId={activeProfileId}
              onSelectProfile={handleSelectProfile}
              onAddNew={handleAddNewProfile}
            />

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Industry Theme</label>
                <select 
                  value={selectedTheme} 
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
                >
                  <option value="plumbing">Plumbing & Emergency</option>
                  <option value="roofing">Roofing & Restorations</option>
                  <option value="electrician">Electrical Contracting</option>
                  <option value="hvac">HVAC & Climate Control</option>
                  <option value="bpo">BPO & Call Center Services</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Design Concept</label>
                <select 
                  value={designConcept} 
                  onChange={(e) => setDesignConcept(e.target.value)}
                  className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
                >
                  <option value="conversion">Concept 01: High-Conversion Local</option>
                  <option value="modern">Concept 02: Modern Tech</option>
                  <option value="editorial">Concept 03: Luxury / Editorial</option>
                  <option value="minimal">Concept 04: Clean Minimal</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Business Name</label>
                <input 
                  type="text" 
                  value={businessName} 
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="text" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Target Suburb / City</label>
                <input 
                  type="text" 
                  value={suburb} 
                  onChange={(e) => setSuburb(e.target.value)}
                  className="mt-1.5 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
                />
              </div>

              <button 
                onClick={handleAiCopy}
                disabled={isGenerating}
                className="w-full bg-purple-600/25 hover:bg-purple-600/40 border border-purple-500/30 text-purple-300 transition py-2.5 rounded-xl font-bold text-xs shadow-lg mt-2"
              >
                {isGenerating ? 'Generating AI Copy...' : '✨ Generate AI Business Title'}
              </button>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button 
                onClick={() => exportToHtml(businessName, phone, suburb, selectedTheme, designConcept)}
                className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 text-white"
              >
                Export Live Preview Link
              </button>
            </div>
          </div>

          {/* RIGHT LIVE PREVIEW PANE */}
          <div className="flex-1 h-full overflow-y-auto bg-slate-900">
            {selectedTheme === 'plumbing' && <PlumbingTemplate businessName={businessName} phone={phone} suburb={suburb} />}
            {selectedTheme === 'roofing' && <RoofingTemplate businessName={businessName} phone={phone} suburb={suburb} />}
            {selectedTheme === 'electrician' && <ElectricianTemplate businessName={businessName} phone={phone} suburb={suburb} />}
            {selectedTheme === 'hvac' && <HvacTemplate businessName={businessName} phone={phone} suburb={suburb} />}
            {selectedTheme === 'bpo' && <BpoTemplate businessName={businessName} phone={phone} suburb={suburb} />}
          </div>
        </div>
      )}

    </div>
  );
}