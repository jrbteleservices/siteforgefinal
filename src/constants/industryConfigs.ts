// src/constants/industryConfigs.ts

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image?: string;
}

export interface ProjectItem {
  id: string;
  subtitle: string;
  title: string;
  desc: string;
  image?: string;
}

export interface IndustryConfig {
  id: string;
  name: string;
  designTag: string;
  heroDefaultSubtitle: string;
  servicesDefault: ServiceItem[];
  projectsDefault: ProjectItem[];
}

export const AUSTRALIAN_THEMES: Record<string, IndustryConfig> = {
  luxury_builder: {
    id: 'luxury_builder',
    name: 'Custom Home Builders',
    designTag: 'MASTER ARCHITECTURAL BUILDERS',
    heroDefaultSubtitle: 'Award-winning custom homes and premium heritage restorations across Melbourne and Sydney.',
    servicesDefault: [
      { id: 'lb1', title: 'Bespoke Custom Homes', desc: 'End-to-end architectural builds tailored to your exacting lifestyle and land profile.' },
      { id: 'lb2', title: 'Heritage Restorations', desc: 'Meticulous period-accurate renovations honoring original craftsmanship.' },
      { id: 'lb3', title: 'Premium Extensions', desc: 'Seamless, high-end additions that transform your existing floorplan.' }
    ],
    projectsDefault: [
      { id: 'lb-p1', subtitle: 'Toorak Residential', title: 'Modernist Masterpiece', desc: 'A multi-level concrete and glass luxury residence featuring a subterranean gallery.' },
      { id: 'lb-p2', subtitle: 'Double Bay', title: 'Heritage Revival', desc: 'Complete structural restoration and interior modernization of a 1920s estate.' }
    ]
  },
  urgent_trade: {
    id: 'urgent_trade',
    name: 'Commercial Trades (24/7)',
    designTag: 'RAPID RESPONSE COMMERCIAL TRADES',
    heroDefaultSubtitle: 'Minimizing downtime for Victorian and NSW enterprises with guaranteed 60-minute dispatch.',
    servicesDefault: [
      { id: 'ut1', title: 'Commercial Fit-outs', desc: 'Complete electrical and HVAC infrastructure for retail and office spaces.' },
      { id: 'ut2', title: 'Industrial Maintenance', desc: 'Scheduled preventative servicing for high-load manufacturing environments.' },
      { id: 'ut3', title: '24/7 Emergency Faults', desc: 'Immediate dispatch for critical power failures and system breakdowns.' }
    ],
    projectsDefault: [
      { id: 'ut-p1', subtitle: 'Melbourne CBD', title: 'Corporate Tower Fit-out', desc: 'Multi-floor data and power cable integration for a Tier-1 tech firm.' },
      { id: 'ut-p2', subtitle: 'Sydney Metro', title: 'Warehouse Climate Control', desc: 'High-capacity HVAC system design and implementation for a logistics hub.' }
    ]
  },
  cosmetic_medical: {
    id: 'cosmetic_medical',
    name: 'Cosmetic & Aesthetic Clinics',
    designTag: 'PREMIUM AESTHETIC CLINIC',
    heroDefaultSubtitle: 'Enhancing your natural beauty with advanced, non-surgical medical treatments.',
    servicesDefault: [
      { id: 'cm1', title: 'Anti-Wrinkle Injections', desc: 'Subtle, physician-administered treatments to smooth and refresh your appearance.' },
      { id: 'cm2', title: 'Dermal Fillers', desc: 'Premium volume restoration tailored for lips, cheeks, and jawlines.' },
      { id: 'cm3', title: 'Laser Rejuvenation', desc: 'Clinical-grade skin resurfacing targeting pigmentation and texture.' }
    ],
    projectsDefault: [
      { id: 'cm-p1', subtitle: 'Client Transformation', title: 'Full Facial Balancing', desc: 'Strategic combination of anti-wrinkle and filler treatments.' },
      { id: 'cm-p2', subtitle: 'Skin Health', title: 'Pigmentation Correction', desc: 'A course of medical-grade laser resulting in a flawless, even complexion.' }
    ]
  },
  allied_health: {
    id: 'allied_health',
    name: 'Physiotherapy & Allied Health',
    designTag: 'EVIDENCE-BASED REHABILITATION',
    heroDefaultSubtitle: 'Dedicated to restoring your mobility and keeping you pain-free so you can perform at your best.',
    servicesDefault: [
      { id: 'ah1', title: 'Sports Physiotherapy', desc: 'Targeted injury recovery and performance optimization for active individuals.' },
      { id: 'ah2', title: 'Spinal Adjustments', desc: 'Specialized chiropractic care addressing back, neck, and posture-related pain.' },
      { id: 'ah3', title: 'Clinical Pilates', desc: 'Core strengthening programs tailored to your specific biomechanical needs.' }
    ],
    projectsDefault: [
      { id: 'ah-p1', subtitle: 'Athletic Recovery', title: 'ACL Rehabilitation', desc: 'A comprehensive 9-month program returning a local athlete to professional play.' },
      { id: 'ah-p2', subtitle: 'Chronic Pain', title: 'Postural Correction', desc: 'Long-term resolution of severe lumbar pain for an office-based professional.' }
    ]
  },
  professional_services: {
    id: 'professional_services',
    name: 'Legal & Wealth Management',
    designTag: 'TRUSTED ADVISORY FIRM',
    heroDefaultSubtitle: 'Strategic, discrete, and highly specialized counsel for families and enterprises across Australia.',
    servicesDefault: [
      { id: 'ps1', title: 'Corporate Law', desc: 'Navigating complex mergers, acquisitions, and commercial litigation.' },
      { id: 'ps2', title: 'Wealth Management', desc: 'Tailored investment strategies and multi-generational asset protection.' },
      { id: 'ps3', title: 'Family Law & Estates', desc: 'Compassionate guidance through settlements, wills, and succession planning.' }
    ],
    projectsDefault: [
      { id: 'ps-p1', subtitle: 'Commercial Acquisition', title: 'Tech Firm Merger', desc: 'Successfully negotiated a complex $50M cross-border acquisition.' },
      { id: 'ps-p2', subtitle: 'Private Wealth', title: 'Family Office Structuring', desc: 'Established a tax-efficient trust structure for a high-net-worth estate.' }
    ]
  },
  creative_architecture: {
    id: 'creative_architecture',
    name: 'Architects & Designers',
    designTag: 'VISIONARY SPATIAL DESIGN',
    heroDefaultSubtitle: 'Shaping the Australian landscape with sustainable, innovative, and deeply considered architecture.',
    servicesDefault: [
      { id: 'ca1', title: 'Residential Architecture', desc: 'Concept-to-completion design for striking, modern Australian homes.' },
      { id: 'ca2', title: 'Interior Curation', desc: 'Material selection, spatial flow, and lighting design for elite spaces.' },
      { id: 'ca3', title: 'Commercial Design', desc: 'Innovative retail and hospitality environments engineered for user experience.' }
    ],
    projectsDefault: [
      { id: 'ca-p1', subtitle: 'Mornington Peninsula', title: 'Coastal Retreat', desc: 'A sustainable off-grid timber and glass pavilion blending into the dunes.' },
      { id: 'ca-p2', subtitle: 'Surry Hills', title: 'Flagship Retail Space', desc: 'A minimalist, highly tactile boutique design for a luxury fashion brand.' }
    ]
  },
  industrial_logistics: {
    id: 'industrial_logistics',
    name: 'Freight & Industrial Cleaning',
    designTag: 'NATIONAL LOGISTICS & OPERATIONS',
    heroDefaultSubtitle: 'Robust, compliant, and highly efficient industrial solutions powering the Australian supply chain.',
    servicesDefault: [
      { id: 'il1', title: 'National Freight', desc: 'Secure, time-critical transport solutions across the eastern seaboard.' },
      { id: 'il2', title: 'Industrial Cleaning', desc: 'Heavy-duty sanitization and compliance cleaning for manufacturing facilities.' },
      { id: 'il3', title: 'Warehouse Management', desc: 'Optimized 3PL storage and inventory distribution services.' }
    ],
    projectsDefault: [
      { id: 'il-p1', subtitle: 'Supply Chain', title: 'Cold-Storage Logistics', desc: 'Implemented a zero-fail transport grid for a major pharmaceutical distributor.' },
      { id: 'il-p2', subtitle: 'Industrial Hygiene', title: 'Food-Grade Sanitization', desc: 'Ongoing compliance maintenance for a 5000sqm food processing plant.' }
    ]
  },
  property_advisory: {
    id: 'property_advisory',
    name: 'Buyers Agents & Valuers',
    designTag: 'STRATEGIC PROPERTY ACQUISITION',
    heroDefaultSubtitle: 'Securing premium real estate assets with data-driven insights and exclusive off-market access.',
    servicesDefault: [
      { id: 'pa1', title: 'Off-Market Sourcing', desc: 'Gaining first access to tightly-held prestige properties before public listing.' },
      { id: 'pa2', title: 'Investment Strategy', desc: 'Data-backed portfolio building focused on high-yield growth corridors.' },
      { id: 'pa3', title: 'Auction Bidding', desc: 'Aggressive, emotionally-detached representation to secure your asset.' }
    ],
    projectsDefault: [
      { id: 'pa-p1', subtitle: 'Brighton Real Estate', title: 'Prestige Acquisition', desc: 'Secured a waterfront estate 10% under market value prior to auction.' },
      { id: 'pa-p2', subtitle: 'Portfolio Growth', title: 'Multi-Asset Strategy', desc: 'Built a high-yield residential portfolio across three emerging Victorian suburbs.' }
    ]
  },
  saas_tech: {
    id: 'saas_tech',
    name: 'Tech Startups & MSPs',
    designTag: 'ENTERPRISE CLOUD ARCHITECTURE',
    heroDefaultSubtitle: 'Accelerating digital transformation with bulletproof security, managed IT, and scalable cloud solutions.',
    servicesDefault: [
      { id: 'st1', title: 'Managed IT Support', desc: 'Proactive 24/7 monitoring and helpdesk support for your workforce.' },
      { id: 'st2', title: 'Cybersecurity', desc: 'Advanced threat protection, compliance audits, and data recovery.' },
      { id: 'st3', title: 'Cloud Migrations', desc: 'Seamless transition to Azure and AWS environments with zero downtime.' }
    ],
    projectsDefault: [
      { id: 'st-p1', subtitle: 'Financial Sector', title: 'Zero-Trust Security Rollout', desc: 'Deployed a complete data protection framework for an accounting firm.' },
      { id: 'st-p2', subtitle: 'Retail Enterprise', title: 'Legacy Server Migration', desc: 'Successfully migrated 200+ users to a secure, scalable cloud infrastructure.' }
    ]
  }
};