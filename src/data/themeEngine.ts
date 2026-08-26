// src/data/themeEngine.ts

export interface DesignTheme {
  id: string;
  name: string;
  family: string;
  typography: {
    heading: string;
    body: string;
    weight: string;
  };
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  style: {
    borderRadius: string;
    cardStyle: string;
    buttonStyle: string;
    shadow: string;
    heroStyle: string;
  };
}

export const DESIGN_FAMILIES: Record<string, DesignTheme> = {
  'modern-clinical': {
    id: 'modern-clinical',
    name: 'Modern Clinical (Dentist/Medical)',
    family: 'Healthcare',
    typography: { heading: 'font-sans font-black tracking-tight', body: 'font-sans text-slate-600', weight: 'font-bold' },
    palette: { primary: 'bg-cyan-600 hover:bg-cyan-500 text-white', secondary: 'bg-cyan-50 text-cyan-900', accent: 'text-cyan-600', background: 'bg-slate-50', surface: 'bg-white', text: 'text-slate-900', muted: 'text-slate-500' },
    style: { borderRadius: 'rounded-2xl', cardStyle: 'bg-white border border-slate-100 shadow-xl shadow-slate-200/50', buttonStyle: 'rounded-full shadow-lg shadow-cyan-600/20', shadow: 'shadow-2xl', heroStyle: 'text-center max-w-4xl mx-auto space-y-6' }
  },
  'heavy-industrial': {
    id: 'heavy-industrial',
    name: 'Heavy Industrial (Crane/CNC/Trades)',
    family: 'Industrial',
    typography: { heading: 'font-mono font-black uppercase tracking-wider', body: 'font-sans text-slate-300', weight: 'font-black' },
    palette: { primary: 'bg-amber-500 hover:bg-amber-400 text-slate-950', secondary: 'bg-slate-900 text-amber-400', accent: 'text-amber-500', background: 'bg-slate-950', surface: 'bg-slate-900', text: 'text-white', muted: 'text-slate-400' },
    style: { borderRadius: 'rounded-lg', cardStyle: 'bg-slate-900 border border-slate-800 shadow-2xl', buttonStyle: 'rounded-lg shadow-xl shadow-amber-500/10 font-bold uppercase tracking-widest', shadow: 'shadow-2xl', heroStyle: 'text-left max-w-5xl space-y-6' }
  },
  'luxury-editorial': {
    id: 'luxury-editorial',
    name: 'Luxury Editorial (Real Estate/Photography)',
    family: 'Creative & Property',
    typography: { heading: 'font-serif font-normal tracking-wide', body: 'font-sans text-slate-600 font-light', weight: 'font-medium' },
    palette: { primary: 'bg-slate-900 hover:bg-slate-800 text-white', secondary: 'bg-slate-100 text-slate-900', accent: 'text-amber-700', background: 'bg-white', surface: 'bg-slate-50', text: 'text-slate-900', muted: 'text-slate-500' },
    style: { borderRadius: 'rounded-none', cardStyle: 'bg-white border border-slate-200 shadow-sm', buttonStyle: 'rounded-none tracking-widest uppercase text-xs font-bold px-8', shadow: 'shadow-lg', heroStyle: 'text-center max-w-3xl mx-auto space-y-8' }
  },
  'warm-hospitality': {
    id: 'warm-hospitality',
    name: 'Warm Hospitality (Restaurant/Cafe)',
    family: 'Hospitality',
    typography: { heading: 'font-serif italic font-bold', body: 'font-sans text-slate-600', weight: 'font-bold' },
    palette: { primary: 'bg-rose-900 hover:bg-rose-800 text-white', secondary: 'bg-rose-50 text-rose-950', accent: 'text-rose-900', background: 'bg-stone-50', surface: 'bg-white', text: 'text-stone-900', muted: 'text-stone-500' },
    style: { borderRadius: 'rounded-3xl', cardStyle: 'bg-white border border-stone-200 shadow-xl shadow-stone-200/40', buttonStyle: 'rounded-full shadow-lg shadow-rose-900/20', shadow: 'shadow-xl', heroStyle: 'text-center max-w-4xl mx-auto space-y-6' }
  },
  'modern-contractor': {
    id: 'modern-contractor',
    name: 'Modern Contractor (Flooring/Plumbing)',
    family: 'Trades',
    typography: { heading: 'font-sans font-black tracking-tight', body: 'font-sans text-slate-600', weight: 'font-bold' },
    palette: { primary: 'bg-blue-600 hover:bg-blue-500 text-white', secondary: 'bg-blue-50 text-blue-900', accent: 'text-blue-600', background: 'bg-slate-50', surface: 'bg-white', text: 'text-slate-900', muted: 'text-slate-500' },
    style: { borderRadius: 'rounded-xl', cardStyle: 'bg-white border border-slate-200 shadow-xl shadow-slate-200/50', buttonStyle: 'rounded-xl shadow-lg shadow-blue-600/20 font-bold', shadow: 'shadow-xl', heroStyle: 'text-center max-w-4xl mx-auto space-y-6' }
  }
};