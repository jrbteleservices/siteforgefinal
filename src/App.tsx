// src/App.tsx

import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import industryData from './data/industries.json';
import { INDUSTRY_REGISTRY } from './data/industryRegistry';
import AuthView from './components/auth/AuthView';
import ProfileSwitcher from './components/profiles/ProfileSwitcher';
import { supabase } from './supabase';

import IndustryMasterTemplate from './pages/IndustryMasterTemplate';

// --- PERFORMANCE FIX: LAZY LOAD ALL HEAVY DASHBOARD MODULES ---
const LeadsView = lazy(() => import('./components/dashboard/LeadsView'));
const DomainsView = lazy(() => import('./components/dashboard/DomainsView'));
const SubscriptionsView = lazy(() => import('./components/dashboard/SubscriptionsView'));
const AnalyticsView = lazy(() => import('./components/dashboard/AnalyticsView'));
const SupportView = lazy(() => import('./components/dashboard/SupportView'));
const WebhooksView = lazy(() => import('./components/dashboard/WebhooksView'));
const ClientPortalView = lazy(() => import('./components/dashboard/ClientPortalView'));
const EmailTemplatesView = lazy(() => import('./components/dashboard/EmailTemplatesView'));
const RoutingView = lazy(() => import('./components/common/RoutingView'));
const GrowthPlanView = lazy(() => import('./components/dashboard/GrowthPlanView'));
const CompetitorView = lazy(() => import('./components/dashboard/CompetitorView'));
const LocalGrowthView = lazy(() => import('./components/dashboard/LocalGrowthView'));
const PrMonitorView = lazy(() => import('./components/dashboard/PrMonitorView'));
const ReportingView = lazy(() => import('./components/dashboard/ReportingView'));

interface ClientProfile { id: string; businessName: string; phone: string; suburb: string; theme: string; }
interface Product { id: string; name: string; desc: string; price: string; image?: string; checkoutUrl?: string; }
interface ServiceItem { id: string; title: string; desc: string; image?: string; }
interface ProjectItem { id: string; subtitle: string; title: string; desc: string; image?: string; }
interface ReviewItem { id: string; name: string; rating: number; text: string; image?: string; }
interface TeamMemberItem { id: string; name: string; role: string; image?: string; }
interface FaqItem { id: string; question: string; answer: string; }
interface LocationItem { id: string; name: string; address: string; phone: string; email: string; }
interface OperatingHourItem { id: string; days: string; hours: string; }
interface SeoArticle { id: string; slug: string; title: string; subtitle: string; body: string; metaDescription: string; headerImage?: string; }

function AdminWorkspace() {
  const [isPublishedView] = useState(() => typeof window !== 'undefined' && window.location.search.includes('published=true'));
  const [publishedData, setPublishedData] = useState<any>(null);
  const [isLoadingSite, setIsLoadingSite] = useState(isPublishedView);

  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [activePage, setActivePage] = useState<'dashboard' | 'builder'>('builder');
  const [dashboardView, setDashboardView] = useState<'overview' | 'growth-plan' | 'competitors' | 'local-growth' | 'pr-monitor' | 'reporting' | 'leads' | 'routing' | 'domains' | 'billing' | 'analytics' | 'portal' | 'emails' | 'support' | 'webhooks'>('overview');
  
  const [editorTab, setEditorTab] = useState<'content' | 'seo' | 'sections' | 'media' | 'layout' | 'commerce' | 'team'>('content');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [draftSavedToast, setDraftSavedToast] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const savedDraft = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('siteforge_builder_draft') || 'null') : null;

  const [colorPalette, setColorPalette] = useState(savedDraft?.colorPalette || 'blue');
  const [streetAddress, setStreetAddress] = useState(savedDraft?.streetAddress || '');
  const [city, setCity] = useState(savedDraft?.city || '');
  const [email, setEmail] = useState(savedDraft?.email || '');
  const [additionalLegalInfo, setAdditionalLegalInfo] = useState(savedDraft?.additionalLegalInfo || '');
  const [socials, setSocials] = useState(savedDraft?.socials || { facebook: '', instagram: '', tiktok: '' });
  const [showSiteForgeBranding, setShowSiteForgeBranding] = useState<boolean>(savedDraft?.showSiteForgeBranding ?? true);
  const [showFooterMenu, setShowFooterMenu] = useState<boolean>(savedDraft?.showFooterMenu ?? true);

  const [globalMetaTitle, setGlobalMetaTitle] = useState(savedDraft?.globalMetaTitle || '');
  const [globalMetaDesc, setGlobalMetaDescription] = useState(savedDraft?.globalMetaDesc || '');
  const [faviconUrl, setFaviconUrl] = useState(savedDraft?.faviconUrl || '');
  const [ga4Id, setGa4Id] = useState(savedDraft?.ga4Id || '');
  const [pixelId, setPixelId] = useState(savedDraft?.pixelId || '');
  const [whatsappNumber, setWhatsappNumber] = useState(savedDraft?.whatsappNumber || '');
  const [googleMapsUrl, setGoogleMapsUrl] = useState(savedDraft?.googleMapsUrl || '');

  const [heroTagline, setHeroTagline] = useState(savedDraft?.heroTagline || '');
  const [heroHeadline, setHeroHeadline] = useState(savedDraft?.heroHeadline || '');
  const [heroSubheadline, setHeroSubheadline] = useState(savedDraft?.heroSubheadline || '');
  const [heroButtonText, setHeroButtonText] = useState(savedDraft?.heroButtonText || 'Get Started');
  
  const [aboutTitle, setAboutTitle] = useState(savedDraft?.aboutTitle || 'About Us');
  const [aboutBody, setAboutBody] = useState(savedDraft?.aboutBody || '');
  const [aboutButtonText, setAboutButtonText] = useState(savedDraft?.aboutButtonText || 'Learn More');

  const [seoArticles, setSeoArticles] = useState<SeoArticle[]>(savedDraft?.seoArticles || []);
  const [selectedArticleId, setSelectedArticleId] = useState<string>('1');

  const [locations, setLocations] = useState<LocationItem[]>(savedDraft?.locations || []);
  const [operatingHours, setOperatingHours] = useState<OperatingHourItem[]>(savedDraft?.operatingHours || []);

  const [isUploading, setIsUploading] = useState(false);
  const [siteLogo, setSiteLogo] = useState<string | null>(savedDraft?.siteLogo || null);
  const [logoSize, setLogoSize] = useState<number>(savedDraft?.logoSize || 40); 
  const [heroImage, setHeroImage] = useState<string | null>(savedDraft?.heroImage || null);
  const [heroOpacity, setHeroOpacity] = useState(savedDraft?.heroOpacity ?? 85);

  const [activeSections, setActiveSections] = useState(savedDraft?.activeSections || {
    hero: true, about: true, services: true, whyUs: true, projects: false, reviews: true, products: false, team: false, faq: false, contact: true, showCallButton: false, showWhatsappButton: false, showChatbotButton: false
  });

  const [headers, setHeaders] = useState(savedDraft?.headers || {
    services: { sub: 'OUR EXPERTISE', main: 'Our Services', desc: 'Comprehensive solutions.' },
    whyUs: { sub: 'REPUTATION & TRUST', main: 'Why Choose Us' },
    projects: { sub: 'PORTFOLIO', main: 'Projects' },
    reviews: { sub: 'TESTIMONIALS', main: 'Client Reviews' }
  });

  const [whyUsHeader, setWhyUsHeader] = useState(savedDraft?.whyUsHeader || { sub: 'REPUTATION & TRUST', main: 'Why Choose Us' });
  const [whyUsItems, setWhyUsItems] = useState(savedDraft?.whyUsItems || []);

  const [servicesList, setServicesList] = useState<ServiceItem[]>(savedDraft?.servicesList || []);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(savedDraft?.projectsList || []);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(savedDraft?.reviewsList || []);
  const [products, setProducts] = useState<Product[]>(savedDraft?.products || []);
  const [teamList, setTeamList] = useState<TeamMemberItem[]>(savedDraft?.teamList || []);
  const [faqList, setFaqList] = useState<FaqItem[]>(savedDraft?.faqList || []);

  const [profiles, setProfiles] = useState<ClientProfile[]>([
    { id: '1', businessName: '', phone: '', suburb: '', theme: 'plumbing' }
  ]);
  const [activeProfileId, setActiveProfileId] = useState('1');
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];
  const [businessName, setBusinessName] = useState(savedDraft?.businessName || activeProfile.businessName);
  const [phone, setPhone] = useState(savedDraft?.phone || activeProfile.phone);
  const [suburb, setSuburb] = useState(savedDraft?.suburb || activeProfile.suburb);
  const [selectedTheme, setSelectedTheme] = useState(savedDraft?.selectedTheme || 'plumbing');

  useEffect(() => {
    if (isPublishedView) {
      const params = new URLSearchParams(window.location.search);
      const configCloudUrl = params.get('config');

      if (configCloudUrl) {
        fetch(configCloudUrl)
          .then(res => res.json())
          .then(data => { setPublishedData(data); setIsLoadingSite(false); })
          .catch(err => {
            console.error("Cloud fetch failed, reverting to local cache.", err);
            setPublishedData(JSON.parse(localStorage.getItem('siteforge_published_state') || 'null'));
            setIsLoadingSite(false);
          });
      } else {
        setPublishedData(JSON.parse(localStorage.getItem('siteforge_published_state') || 'null'));
        setIsLoadingSite(false);
      }
    }
  }, [isPublishedView]);

  useEffect(() => {
    if (isPublishedView) return; 
    const currentState = {
      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
      siteLogo, logoSize, heroImage, heroOpacity, heroTagline, heroHeadline, heroSubheadline, heroButtonText,
      aboutTitle, aboutBody, aboutButtonText, headers, servicesList, projectsList, reviewsList,
      products, activeSections, themeMode, teamList, faqList, locations, operatingHours,
      showSiteForgeBranding, additionalLegalInfo, seoArticles, selectedTheme, showFooterMenu, whyUsHeader, whyUsItems,
      globalMetaTitle, globalMetaDesc, faviconUrl, ga4Id, pixelId, whatsappNumber, googleMapsUrl
    };
    localStorage.setItem('siteforge_builder_draft', JSON.stringify(currentState));
  }, [
    businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
    siteLogo, logoSize, heroImage, heroOpacity, heroTagline, heroHeadline, heroSubheadline, heroButtonText,
    aboutTitle, aboutBody, aboutButtonText, headers, servicesList, projectsList, reviewsList,
    products, activeSections, themeMode, teamList, faqList, locations, operatingHours,
    showSiteForgeBranding, additionalLegalInfo, seoArticles, selectedTheme, showFooterMenu, whyUsHeader, whyUsItems, isPublishedView,
    globalMetaTitle, globalMetaDesc, faviconUrl, ga4Id, pixelId, whatsappNumber, googleMapsUrl
  ]);

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

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    const currentState = {
      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
      siteLogo, logoSize, heroImage, heroOpacity, heroTagline, heroHeadline, heroSubheadline, heroButtonText,
      aboutTitle, aboutBody, aboutButtonText, headers, servicesList, projectsList, reviewsList,
      products, activeSections, themeMode, teamList, faqList, locations, operatingHours,
      showSiteForgeBranding, additionalLegalInfo, seoArticles, selectedTheme, showFooterMenu, whyUsHeader, whyUsItems,
      globalMetaTitle, globalMetaDesc, faviconUrl, ga4Id, pixelId, whatsappNumber, googleMapsUrl
    };
    localStorage.setItem('siteforge_builder_draft', JSON.stringify(currentState));
    setTimeout(() => { setIsSavingDraft(false); setDraftSavedToast(true); setTimeout(() => setDraftSavedToast(false), 3000); }, 500);
  };

  const handlePublish = async () => { 
    setIsPublishing(true);
    const templateProps = {
      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
      logo: siteLogo, logoSize, heroImage, heroOpacity, 
      heroTagline, heroHeadline, heroSubheadline, heroButtonText, 
      aboutTitle, aboutBody, aboutButtonText,
      headers, servicesList, projectsList, reviewsList,
      showProducts: activeSections.products, 
      products, activeSections, themeMode, teamList, faqList,
      locations, operatingHours, showSiteForgeBranding,
      additionalLegalInfo, seoArticles, showFooterMenu, whyUsHeader, whyUsItems,
      globalMetaTitle, globalMetaDesc, faviconUrl, ga4Id, pixelId, whatsappNumber, googleMapsUrl
    };
    
    localStorage.setItem('siteforge_published_state', JSON.stringify({ templateProps, selectedTheme }));

    try {
      const sitePayload = JSON.stringify({ templateProps, selectedTheme });
      const blob = new Blob([sitePayload], { type: 'application/json' });
      const file = new File([blob], `config_${Date.now()}.json`, { type: 'application/json' });
      
      const configCloudUrl = await uploadImageToSupabase(file); 

      let actualWorkingUrl = `${window.location.origin}?published=true`;
      if (configCloudUrl) {
        actualWorkingUrl += `&config=${encodeURIComponent(configCloudUrl)}`;
      }

      const link = document.createElement('a');
      link.href = actualWorkingUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Publishing failed:", e);
      const actualWorkingUrl = `${window.location.origin}?published=true`;
      const link = document.createElement('a');
      link.href = actualWorkingUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setIsPublishing(false); 
  };

  if (isPublishedView) {
    if (isLoadingSite) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-white font-bold uppercase tracking-widest text-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            Loading Site Experience...
          </div>
        </div>
      );
    }

    const dataToRender = publishedData ? publishedData.templateProps : {
      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
      logo: siteLogo, logoSize, heroImage, heroOpacity, heroTagline, heroHeadline, heroSubheadline, heroButtonText,
      aboutTitle, aboutBody, aboutButtonText, headers, servicesList, projectsList, reviewsList,
      showProducts: activeSections.products, products, activeSections, themeMode, teamList, faqList,
      locations, operatingHours, showSiteForgeBranding, additionalLegalInfo, seoArticles, showFooterMenu, whyUsHeader, whyUsItems,
      globalMetaTitle, globalMetaDesc, faviconUrl, ga4Id, pixelId, whatsappNumber, googleMapsUrl
    };

    const themeToRender = publishedData ? publishedData.selectedTheme : selectedTheme;

    return (
      <div className="w-full min-h-screen overflow-y-auto bg-slate-50">
        <IndustryMasterTemplate previewSlug={themeToRender} previewState={dataToRender} />
      </div>
    );
  }

  if (checkingAuth) return <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-400">Loading Session...</div>;
  if (!session) return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-slate-950 text-slate-400">Loading Auth...</div>}>
      <AuthView onLoginSuccess={() => setActivePage('dashboard')} />
    </Suspense>
  );

  const DashboardNavItem = ({ id, label }: { id: string, label: string }) => (
    <button onClick={() => { setActivePage('dashboard'); setDashboardView(id as any); }} className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${dashboardView === id && activePage === 'dashboard' ? 'bg-blue-600/15 text-blue-500' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}>
      {label}
    </button>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans relative">
      {draftSavedToast && (
        <div className="absolute top-20 right-8 z-50 bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in">
          <span>✓ Draft Saved Successfully!</span>
        </div>
      )}

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
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-4">Growth Intelligence</div>
              <DashboardNavItem id="overview" label="Brand Authority Score™" />
              <DashboardNavItem id="growth-plan" label="90-Day Growth Plan" />
              <DashboardNavItem id="competitors" label="Competitor War Room" />
              <DashboardNavItem id="local-growth" label="Local Growth & GBP" />
              <DashboardNavItem id="pr-monitor" label="PR & Media Monitor" />
              <DashboardNavItem id="reporting" label="Executive Reports" />

              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-4 mt-6">Operations</div>
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
                {dashboardView === 'overview' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-black text-white">Brand Authority Score™ Overview</h2>
                    <p className="text-slate-400 text-sm">Your multi-signal ecosystem health score is <strong>78/100</strong> (+6 this month). Select any module in the sidebar to review detailed tasks.</p>
                  </div>
                )}
                <Suspense fallback={<div className="flex justify-center items-center h-40 text-slate-500 animate-pulse">Loading module...</div>}>
                  {dashboardView === 'growth-plan' && <GrowthPlanView />}
                  {dashboardView === 'competitors' && <CompetitorView />}
                  {dashboardView === 'local-growth' && <LocalGrowthView />}
                  {dashboardView === 'pr-monitor' && <PrMonitorView />}
                  {dashboardView === 'reporting' && <ReportingView />}
                  {dashboardView === 'leads' && <LeadsView />}
                  {dashboardView === 'routing' && <RoutingView />}
                  {dashboardView === 'domains' && <DomainsView />}
                  {dashboardView === 'billing' && <SubscriptionsView />}
                  {dashboardView === 'analytics' && <AnalyticsView />}
                  {dashboardView === 'portal' && <ClientPortalView />}
                  {dashboardView === 'emails' && <EmailTemplatesView />}
                  {dashboardView === 'support' && <SupportView />}
                  {dashboardView === 'webhooks' && <WebhooksView />}
                </Suspense>
              </div>
            </main>
          </div>
        </div>
      )}

      {activePage === 'builder' && (
        <div className="flex flex-col h-full w-full overflow-hidden">
          {!isPreviewMode && (
            <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-20">
              <div className="flex items-center gap-4">
                <button onClick={() => { setActivePage('dashboard'); setDashboardView('overview'); }} className="text-slate-400 hover:text-white transition text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-800">&larr; Dashboard</button>
                <span className="text-sm font-bold text-white flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Editing: {businessName || "New Site"}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition border border-slate-700 flex items-center gap-2">
                  {themeMode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
                <button onClick={handleSaveDraft} disabled={isSavingDraft} className="px-4 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 rounded-lg shadow-sm transition flex items-center gap-1.5">
                  <span>{isSavingDraft ? 'Saving...' : '💾 Save Draft'}</span>
                </button>
                <button onClick={() => setIsPreviewMode(true)} className="px-4 py-1.5 text-xs font-bold text-slate-300 hover:text-white transition">Preview Site</button>
                <button onClick={handlePublish} disabled={isPublishing} className="px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-600/20 transition">
                  {isPublishing ? 'Publishing Link...' : 'Publish Changes'}
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
                  {(['content', 'seo', 'sections', 'media', 'layout', 'commerce', 'team'] as const).map(tab => (
                    <button key={tab} onClick={() => setEditorTab(tab)} className={`px-3 py-2 text-xs font-bold rounded-lg capitalize transition ${editorTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
                      {tab === 'seo' ? '🚀 Blogs' : tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {editorTab === 'seo' && (
                    <div className="space-y-6 animate-in fade-in">
                      <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl">
                        <h4 className="font-bold text-blue-400 text-xs uppercase tracking-wider mb-1">Blogs & Articles Manager</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">Create and manage published blog posts.</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Blog Articles</span>
                        <button onClick={() => {
                          const newArt: SeoArticle = {
                            id: Date.now().toString(),
                            slug: `blogs/article-${Date.now()}`,
                            title: 'New Blog Post Title',
                            subtitle: 'Sub-heading for search engine ranking',
                            body: 'Write your full blog post content here...',
                            metaDescription: 'Meta description for Google search results.',
                            headerImage: ''
                          };
                          setSeoArticles([...seoArticles, newArt]);
                          setSelectedArticleId(newArt.id);
                        }} className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition">
                          + Add Blog Post
                        </button>
                      </div>

                      <div className="flex flex-col gap-2">
                        {seoArticles.map((art) => (
                          <div key={art.id} className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition ${selectedArticleId === art.id ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'}`} onClick={() => setSelectedArticleId(art.id)}>
                            <div className="truncate pr-2">
                              <span className="text-xs font-bold block truncate">{art.title}</span>
                              <span className="text-[10px] text-slate-400 block font-mono">/{art.slug}</span>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setSeoArticles(seoArticles.filter(a => a.id !== art.id)); }} className="text-red-400 text-xs hover:text-red-300 px-2 py-1">✕</button>
                          </div>
                        ))}
                      </div>

                      {(() => {
                        const currentArt = seoArticles.find(a => a.id === selectedArticleId) || seoArticles[0];
                        if (!currentArt) return null;
                        const idx = seoArticles.findIndex(a => a.id === selectedArticleId);

                        const updateCurrentArt = (field: keyof SeoArticle, val: string) => {
                          const updated = [...seoArticles];
                          updated[idx] = { ...updated[idx], [field]: val };
                          setSeoArticles(updated);
                        };

                        return (
                          <div className="space-y-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                            <h5 className="font-bold text-xs text-blue-400 uppercase tracking-widest">Editing Blog Article</h5>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">URL Slug</label>
                              <input type="text" value={currentArt.slug} onChange={(e) => updateCurrentArt('slug', e.target.value)} className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-mono" />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Article Title (H1)</label>
                              <input type="text" value={currentArt.title} onChange={(e) => updateCurrentArt('title', e.target.value)} className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold" />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Subtitle (H2)</label>
                              <input type="text" value={currentArt.subtitle} onChange={(e) => updateCurrentArt('subtitle', e.target.value)} className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Blog Header Image</label>
                              <input type="text" value={currentArt.headerImage || ''} onChange={(e) => updateCurrentArt('headerImage', e.target.value)} placeholder="https://..." className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white mb-2" />
                              <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleGeneralImageUpload(e, (url) => updateCurrentArt('headerImage', url))} className="text-xs text-slate-400 file:py-1 file:px-2 file:bg-blue-600 file:text-white cursor-pointer" />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Meta Description</label>
                              <textarea value={currentArt.metaDescription} onChange={(e) => updateCurrentArt('metaDescription', e.target.value)} className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={2} />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Full Article Body</label>
                              <textarea value={currentArt.body} onChange={(e) => updateCurrentArt('body', e.target.value)} className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white leading-relaxed" rows={6} />
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {editorTab === 'content' && (
                    <div className="space-y-5 animate-in fade-in">
                      <Suspense fallback={<div className="text-slate-500 animate-pulse text-xs">Loading themes...</div>}>
                        <ProfileSwitcher profiles={profiles} activeProfileId={activeProfileId} onSelectProfile={setActiveProfileId} onAddNew={() => {}} />
                      </Suspense>
                      {/* --- THEME FAMILY SELECTOR --- */}
<div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 mt-4">
  <div className="flex justify-between items-center">
    <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Design System Family</h4>
    <span className="text-[10px] bg-amber-600/20 text-amber-400 px-2 py-0.5 rounded font-bold">Phase 3 Engine</span>
  </div>
  <div>
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Select Visual Theme</label>
    <select 
      value={selectedDesignTheme || 'modern-contractor'} 
      onChange={(e) => setSelectedDesignTheme(e.target.value)} 
      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:ring-1 focus:ring-amber-500 font-bold"
    >
      <option value="modern-clinical">Modern Clinical (Healthcare)</option>
      <option value="heavy-industrial">Heavy Industrial (Cranes/CNC)</option>
      <option value="luxury-editorial">Luxury Editorial (Real Estate/Photo)</option>
      <option value="warm-hospitality">Warm Hospitality (Dining/Cafes)</option>
      <option value="modern-contractor">Modern Contractor (Trades/Flooring)</option>
    </select>
  </div>
</div>

                      {/* --- INDUSTRY INTELLIGENCE REGISTRY SELECTOR --- */}
                      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Industry Intelligence Registry</h4>
                          <span className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded font-bold">Auto-Config Engine</span>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Select Industry Vertical</label>
                          <select 
                            value={selectedTheme} 
                            onChange={(e) => {
                              const newInd = e.target.value;
                              setSelectedTheme(newInd);
                              const profile = INDUSTRY_REGISTRY[newInd];
                              if (profile) {
                                setHeroHeadline(profile.name + " Specialists");
                                setHeroTagline(profile.category.toUpperCase() + " • " + profile.subcategory.toUpperCase());
                                setHeroSubheadline(profile.description);
                                setHeroButtonText(profile.recommendedCTAs[0] || "Get Started");
                              }
                            }} 
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:ring-1 focus:ring-blue-500 font-bold"
                          >
                            <optgroup label="Available Industry Profiles">
                              {Object.entries(INDUSTRY_REGISTRY).map(([id, prof]) => (
                                <option key={id} value={id}>{prof.category} › {prof.name}</option>
                              ))}
                            </optgroup>
                          </select>
                        </div>

                        {/* RECOMMENDED FOR THIS INDUSTRY BADGES */}
                        {INDUSTRY_REGISTRY[selectedTheme] && (
                          <div className="space-y-3 pt-2 border-t border-slate-800 animate-in fade-in">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Recommended Tools & Features</span>
                              <div className="flex flex-wrap gap-1.5">
                                {INDUSTRY_REGISTRY[selectedTheme].recommendedTools.map(tool => (
                                  <span key={tool} className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                                    ✓ {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Recommended Pages</span>
                              <div className="flex flex-wrap gap-1.5">
                                {INDUSTRY_REGISTRY[selectedTheme].recommendedPages.map(page => (
                                  <span key={page} className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">
                                    📄 {page}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-5">
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
                          <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" placeholder="Enter business name..." />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" placeholder="e.g. 1300 000 000" />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" placeholder="contact@business.com.au" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Footer Legal Info</h4>
                        <div>
                          <input type="text" value={additionalLegalInfo} onChange={(e) => setAdditionalLegalInfo(e.target.value)} placeholder="ABN: 51 824 753 556" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">HQ Location Data</h4>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Street Address</label>
                          <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" placeholder="e.g. 123 Commercial Rd" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Suburb</label>
                            <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" placeholder="e.g. Sydney" />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City</label>
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" placeholder="e.g. Sydney" />
                          </div>
                        </div>
                      </div>

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
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Facebook URL</label>
                          <input type="text" value={socials.facebook} onChange={(e) => setSocials({...socials, facebook: e.target.value})} placeholder="https://facebook.com/..." className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-slate-800 pt-5">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Global SEO & Browser</h4>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Site Meta Title</label>
                          <input type="text" value={globalMetaTitle} onChange={(e) => setGlobalMetaTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" placeholder="e.g. Business Name | Professional Services" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Site Meta Description</label>
                          <textarea value={globalMetaDesc} onChange={(e) => setGlobalMetaDescription(e.target.value)} rows={2} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" placeholder="Describe your business for search engines..." />
                        </div>
                      </div>
                    </div>
                  )}

                  {editorTab === 'sections' && (
                    <div className="space-y-8 animate-in fade-in">
                      <div className="space-y-4">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">Hero Section</h3></div>
                        <input type="text" value={heroTagline} onChange={(e) => setHeroTagline(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" placeholder="Tagline (e.g. INDUSTRY LEADER)" />
                        <input type="text" value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" placeholder="Headline (e.g. Professional Solutions...)" />
                        <textarea value={heroSubheadline} onChange={(e) => setHeroSubheadline(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={3} placeholder="Sub-headline content..." />
                        <input type="text" value={heroButtonText} onChange={(e) => setHeroButtonText(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold text-blue-400" placeholder="Button Text (e.g. Get Started)" />
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-800">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">About Us Section</h3></div>
                        <input type="text" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" placeholder="About Us Title" />
                        <textarea value={aboutBody} onChange={(e) => setAboutBody(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={4} placeholder="About Us description body..." />
                        <input type="text" value={aboutButtonText} onChange={(e) => setAboutButtonText(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white font-bold text-blue-400" placeholder="Button Text" />
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-800">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">Client Reviews Manager</h3></div>
                        <div className="space-y-4">
                          {reviewsList.map((rev, idx) => (
                            <div key={rev.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                              <button onClick={() => setReviewsList(reviewsList.filter(r => r.id !== rev.id))} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                              <input type="text" value={rev.name} onChange={(e) => { const n = [...reviewsList]; n[idx].name = e.target.value; setReviewsList(n); }} className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white font-bold" placeholder="Reviewer Name" />
                              <textarea value={rev.text} onChange={(e) => { const n = [...reviewsList]; n[idx].text = e.target.value; setReviewsList(n); }} className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-white" rows={2} placeholder="Review text..." />
                            </div>
                          ))}
                          <button onClick={() => setReviewsList([...reviewsList, { id: Date.now().toString(), name: 'Client Name', rating: 5, text: 'Fantastic service!' }])} className="w-full py-2 border border-dashed border-blue-500 text-blue-400 font-bold text-xs rounded-xl">+ Add Review</button>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-slate-800">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">What We Do (Services)</h3></div>
                        <input type="text" value={headers.services.main} onChange={(e) => setHeaders({...headers, services: {...headers.services, main: e.target.value}})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" placeholder="Main Title" />
                        <div className="space-y-4 mt-4">
                          {servicesList.map((service, index) => (
                            <div key={service.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                              <button onClick={() => {
                                const current = [...servicesList];
                                setServicesList(current.filter(s => s.id !== service.id));
                              }} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                              <input type="text" value={service.title} onChange={(e) => { 
                                const current = [...servicesList]; 
                                current[index].title = e.target.value; setServicesList(current); 
                              }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" placeholder="Service Title" />
                              <textarea value={service.desc} onChange={(e) => { 
                                const current = [...servicesList]; 
                                current[index].desc = e.target.value; setServicesList(current); 
                              }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={2} placeholder="Service Description" />
                            </div>
                          ))}
                          <button onClick={() => {
                            const current = [...servicesList];
                            current.push({ id: Date.now().toString(), title: 'New Service Item', desc: 'Detailed description here...', image: '' });
                            setServicesList(current);
                          }} className="w-full py-2.5 border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs rounded-xl hover:bg-blue-500/10 transition">+ Add Service Item</button>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-slate-800">
                        <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">Recent Projects (Portfolio)</h3></div>
                        <input type="text" value={headers.projects.main} onChange={(e) => setHeaders({...headers, projects: {...headers.projects, main: e.target.value}})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" />
                        <div className="space-y-4 mt-4">
                          {projectsList.map((proj, index) => (
                            <div key={proj.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 relative">
                              <button onClick={() => {
                                const current = [...projectsList];
                                setProjectsList(current.filter(p => p.id !== proj.id));
                              }} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 text-xs">✕</button>
                              <input type="text" value={proj.title} onChange={(e) => { 
                                const current = [...projectsList]; 
                                current[index].title = e.target.value; setProjectsList(current); 
                              }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" placeholder="Project Title" />
                              <textarea value={proj.desc} onChange={(e) => { 
                                const current = [...projectsList]; 
                                current[index].desc = e.target.value; setProjectsList(current); 
                              }} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" rows={2} placeholder="Project Description" />
                            </div>
                          ))}
                          <button onClick={() => {
                            const current = [...projectsList];
                            current.push({ id: Date.now().toString(), subtitle: 'Location', title: 'Project Showcase', desc: 'Project overview...', image: '' });
                            setProjectsList(current);
                          }} className="w-full py-2.5 border border-dashed border-blue-500/50 text-blue-400 font-bold text-xs rounded-xl hover:bg-blue-500/10 transition">+ Add Project Item</button>
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
                          Logo Size (Height) <span className="text-blue-400">{logoSize}px</span>
                        </label>
                        <input type="range" min="20" max="150" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full accent-blue-500" />
                        <span className="text-[10px] text-slate-500 block">Recommended stable range: 40px – 100px</span>
                      </div>
                    </div>
                  )}

                  {editorTab === 'layout' && (
                    <div className="space-y-4 animate-in fade-in">
                      <p className="text-xs text-slate-400 mb-4">Toggle visibility of website modules.</p>
                      {Object.entries({
                        about: 'About Section', services: 'Services Section', projects: 'Projects Section'
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

                </div>
              </div>
            )}

            {isPreviewMode && (
              <div className="absolute top-6 left-6 z-50 flex gap-3">
                <button onClick={() => setIsPreviewMode(false)} className="bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white shadow-2xl px-6 py-3 rounded-full font-black text-sm hover:bg-slate-800 transition flex items-center gap-2">
                  &larr; Exit Fullscreen Preview
                </button>
              </div>
            )}

            <div className={`flex-1 bg-slate-800 transition-all ${isPreviewMode ? 'p-0' : 'p-8'} overflow-y-auto flex justify-center items-start`}>
              <div className={`w-full bg-white shadow-2xl shadow-black/50 overflow-hidden ring-1 ring-slate-900/5 transition-all ${isPreviewMode ? 'max-w-none min-h-screen rounded-none' : 'max-w-[1200px] min-h-[800px] rounded-xl'}`}>
                
                {!isPreviewMode && (
                  <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="mx-auto bg-white border border-slate-200 text-slate-400 text-xs px-4 py-1 rounded-md w-64 text-center truncate">
                      {businessName ? businessName.toLowerCase().replace(/\s+/g, '-') + '.siteforge.com' : 'new-site.siteforge.com'}
                    </div>
                  </div>
                )}

                <div className="relative">
                  {/* INJECTING THE INDUSTRY INTELLIGENCE TEMPLATE ENGINE INTO THE PREVIEW */}
                  {(() => {
                    const templateProps = {
                      businessName, phone, suburb, city, streetAddress, email, socials, colorPalette,
                      logo: siteLogo, logoSize, heroImage, heroOpacity, heroTagline, heroHeadline, heroSubheadline, heroButtonText,
                      aboutTitle, aboutBody, aboutButtonText, headers, servicesList, projectsList, reviewsList,
                      showProducts: activeSections.products, products, activeSections, themeMode, teamList, faqList,
                      locations, operatingHours, showSiteForgeBranding, additionalLegalInfo, seoArticles, showFooterMenu, whyUsHeader, whyUsItems,
                      globalMetaTitle, globalMetaDesc, faviconUrl, ga4Id, pixelId, whatsappNumber, googleMapsUrl
                    };
                    return <IndustryMasterTemplate previewSlug={selectedTheme} previewState={templateProps} />;
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminWorkspace />} />
        <Route path="/:industrySlug" element={<IndustryMasterTemplate />} />
      </Routes>
    </Router>
  );
}