export interface DesignConcept {
  id: string;
  name: string;
  description: string;
  fontFamily: string;
  badgeStyle: string;
  cardStyle: string;
}

export const DESIGN_CONCEPTS: Record<string, DesignConcept> = {
  conversion: {
    id: 'conversion',
    name: 'High-Conversion Local',
    description: 'Built to make the phone ring. Trust signals, reviews, and CTAs everywhere.',
    fontFamily: 'font-sans',
    badgeStyle: 'rounded-full px-3.5 py-1.5 font-bold',
    cardStyle: 'rounded-3xl border border-slate-800 bg-slate-900/60 p-8'
  },
  modern: {
    id: 'modern',
    name: 'Modern Tech',
    description: 'Dark, sharp, and contemporary with gradient accents and smooth motion.',
    fontFamily: 'font-sans tracking-tight',
    badgeStyle: 'rounded-xl px-4 py-2 font-black shadow-lg',
    cardStyle: 'rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-2xl'
  },
  editorial: {
    id: 'editorial',
    name: 'Luxury / Editorial',
    description: 'Magazine-style typography, oversized headings, and dramatic whitespace.',
    fontFamily: 'font-serif',
    badgeStyle: 'rounded-none px-2 py-1 tracking-widest uppercase text-xs',
    cardStyle: 'rounded-none border-b border-slate-800 bg-slate-950 p-8'
  },
  minimal: {
    id: 'minimal',
    name: 'Clean Minimal',
    description: 'Fast, calm, and uncluttered. Content first, nothing wasted.',
    fontFamily: 'font-mono text-sm',
    badgeStyle: 'rounded-lg px-3 py-1 font-medium',
    cardStyle: 'rounded-lg border border-slate-800/60 bg-slate-900/30 p-6'
  }
};