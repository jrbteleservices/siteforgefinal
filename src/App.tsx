// src/App.tsx

import { useState } from 'react';
import MasterPremiumTemplate from './components/themes/MasterPremiumTemplate';
import { AUSTRALIAN_THEMES } from './constants/industryConfigs';
import { supabase } from './supabase';

interface Product { id: string; name: string; desc: string; price: string; image?: string; checkoutUrl?: string; }
interface ServiceItem { id: string; title: string; desc: string; image?: string; }
interface ProjectItem { id: string; subtitle: string; title: string; desc: string; image?: string; }
interface ReviewItem { id: string; name: string; rating: number; text: string; image?: string; }
interface TeamMemberItem { id: string; name: string; role: string; image?: string; }
interface FaqItem { id: string; question: string; answer: string; }
interface LocationItem { id: string; name: string; address: string; phone: string; email: string; }
interface OperatingHourItem { id: string; days: string; hours: string; }

export default function App() {
  const [activePage, setActivePage] = useState<'dashboard' | 'builder'>('builder');
  const [editorTab, setEditorTab] = useState<'content' | 'sections' | 'media' | 'layout' | 'commerce' | 'team'>('content');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Core Business Info & Additional Legal Info (ABN / GST Footer Field)
  const [businessName, setBusinessName] = useState('Apex Elite Trades');
  const [phone, setPhone] = useState('+61 3 9111 2222');
  const [email, setEmail] = useState('contact@apex.com.au');
  const [suburb, setSuburb] = useState('St. Kilda VIC');
  const [city, setCity] = useState('Melbourne');
  const [streetAddress, setStreetAddress] = useState('123 Trade Avenue');
  const [additionalLegalInfo, setAdditionalLegalInfo] = useState('ABN: 51 824 753 556');
  const [colorPalette, setColorPalette] = useState('blue');
  const [selectedTheme, setSelectedTheme] = useState('luxury_builder');
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
    setIsPublishing(true); 
    setTimeout(() => { 
      setIsPublishing(false); 
      const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const liveUrl = `https://${slug}.siteforge.au`;
      if (window.confirm(`Successfully published to edge network!\n\nLive URL: ${liveUrl}\n\nClick OK to open your live website in a new window.`)) {
        window.open(liveUrl, '_blank');
      }
    }, 1200); 
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans relative">
      
      {/* BUILDER EDITORIAL VIEW */}
      <div className="flex flex-col h-full w-full overflow-hidden">
        
        {!isPreviewMode && (
          <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-20">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Editing: {businessName}
              </span>
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
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
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
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suburb</label>
                          <input type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City</label>
                          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {editorTab === 'sections' && (
                  <div className="space-y-8 animate-in fade-in">
                    <div className="space-y-4">
                      <div className="border-b border-slate-800 pb-2"><h3 className="font-bold text-white text-sm">Services Section</h3></div>
                      <input type="text" value={headers.services.main} onChange={(e) => setHeaders({...headers, services: {...headers.services, main: e.target.value}})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm font-bold text-white" />
                    </div>
                  </div>
                )}

                {editorTab === 'media' && (
                  <div className="space-y-6 animate-in fade-in">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Site Logo Upload</label>
                      <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-900/50">
                        {siteLogo ? <img src={siteLogo} style={{ height: `${logoSize}px` }} className="object-contain mb-2" /> : <span className="text-2xl">🖼️</span>}
                        <input type="file" accept="image/*" disabled={isUploading} onChange={(e) => handleGeneralImageUpload(e, setSiteLogo)} className="text-xs text-slate-400 cursor-pointer" />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                        Logo Size (Height) <span className="text-blue-400">{logoSize}px</span>
                      </label>
                      <input type="range" min="20" max="150" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>
                  </div>
                )}

                {editorTab === 'layout' && (
                  <div className="space-y-4 animate-in fade-in">
                    <p className="text-xs text-slate-400 mb-4">Toggle visibility of website modules.</p>
                    {Object.entries({
                      hero: 'Hero Section',
                      about: 'About Section',
                      services: 'Services',
                      whyUs: 'Why Choose Us',
                      projects: 'Projects',
                      reviews: 'Reviews',
                      products: 'Products',
                      team: 'Team',
                      faq: 'FAQ',
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
                    <p className="text-xs text-slate-400">Configure online store packages and pricing.</p>
                  </div>
                )}

                {editorTab === 'team' && (
                  <div className="space-y-4 animate-in fade-in">
                    <p className="text-xs text-slate-400">Configure executive team members.</p>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* FULLSCREEN PREVIEW OVERLAYS */}
          {isPreviewMode && (
            <div className="absolute top-6 left-6 z-50 flex gap-3">
              <button onClick={() => setIsPreviewMode(false)} className="bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white shadow-2xl px-6 py-3 rounded-full font-black text-sm hover:bg-slate-800 transition flex items-center gap-2">
                &larr; Exit Fullscreen Preview
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
    </div>
  );
}