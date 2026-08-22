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

export interface ProductItem {
  id: string;
  name: string;
  price: string;
  image?: string;
  checkoutUrl?: string; // Stripe or PayPal payment link
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  image?: string;
}

export interface IndustryConfig {
  id: string;
  name: string;
  designTag: string;
  heroDefaultSubtitle: string;
  servicesDefault: ServiceItem[];
  projectsDefault: ProjectItem[];
  productsDefault: ProductItem[];
  teamDefault: TeamMemberItem[];
}

export const AUSTRALIAN_THEMES: Record<string, IndustryConfig> = {
  luxury_builder: {
    id: 'luxury_builder',
    name: 'Custom Home Builders',
    designTag: 'MASTER ARCHITECTURAL BUILDERS',
    heroDefaultSubtitle: 'Award-winning custom homes and premium heritage restorations across Melbourne and Sydney.',
    servicesDefault: [
      { id: 'lb1', title: 'Bespoke Custom Homes', desc: 'End-to-end architectural builds tailored to your exacting lifestyle and land profile.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: 'lb2', title: 'Heritage Restorations', desc: 'Meticulous period-accurate renovations honoring original craftsmanship.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
      { id: 'lb3', title: 'Premium Extensions', desc: 'Seamless, high-end additions that transform your existing floorplan.', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'lb-p1', subtitle: 'Toorak Residential', title: 'Modernist Masterpiece', desc: 'A multi-level concrete and glass luxury residence featuring a subterranean gallery.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
      { id: 'lb-p2', subtitle: 'Double Bay', title: 'Heritage Revival', desc: 'Complete structural restoration and interior modernization of a 1920s estate.', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'pr1', name: 'Initial Architectural Feasibility Study', price: '450', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' },
      { id: 'pr2', name: 'Site Soil & Contour Survey Package', price: '1,200', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 't1', name: 'Alexander Sterling', role: 'Managing Director & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
      { id: 't2', name: 'Victoria Vance', role: 'Lead Architectural Designer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  urgent_trade: {
    id: 'urgent_trade',
    name: 'Commercial Trades (24/7)',
    designTag: 'RAPID RESPONSE COMMERCIAL TRADES',
    heroDefaultSubtitle: 'Minimizing downtime for Victorian and NSW enterprises with guaranteed 60-minute dispatch.',
    servicesDefault: [
      { id: 'ut1', title: 'Commercial Fit-outs', desc: 'Complete electrical and HVAC infrastructure for retail and office spaces.', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80' },
      { id: 'ut2', title: 'Industrial Maintenance', desc: 'Scheduled preventative servicing for high-load manufacturing environments.', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'ut-p1', subtitle: 'Melbourne CBD', title: 'Corporate Tower Fit-out', desc: 'Multi-floor data and power cable integration for a Tier-1 tech firm.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'ut-pr1', name: 'Emergency Diagnostic Callout', price: '250', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 'ut-t1', name: 'Liam O’Connor', role: 'Operations Director', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  cosmetic_medical: {
    id: 'cosmetic_medical',
    name: 'Cosmetic & Aesthetic Clinics',
    designTag: 'PREMIUM AESTHETIC CLINIC',
    heroDefaultSubtitle: 'Enhancing your natural beauty with advanced, non-surgical medical treatments.',
    servicesDefault: [
      { id: 'cm1', title: 'Anti-Wrinkle Injections', desc: 'Subtle, physician-administered treatments to smooth and refresh your appearance.', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'cm-p1', subtitle: 'Client Transformation', title: 'Full Facial Balancing', desc: 'Strategic combination of anti-wrinkle and filler treatments.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'cm-pr1', name: 'Clinical Consultation & Skin Analysis', price: '150', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 'cm-t1', name: 'Dr. Sophia Bennett', role: 'Medical Director', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  allied_health: {
    id: 'allied_health',
    name: 'Physiotherapy & Allied Health',
    designTag: 'EVIDENCE-BASED REHABILITATION',
    heroDefaultSubtitle: 'Dedicated to restoring your mobility and keeping you pain-free so you can perform at your best.',
    servicesDefault: [
      { id: 'ah1', title: 'Sports Physiotherapy', desc: 'Targeted injury recovery and performance optimization for active individuals.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'ah-p1', subtitle: 'Athletic Recovery', title: 'ACL Rehabilitation', desc: 'A comprehensive 9-month program returning a local athlete to professional play.', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'ah-pr1', name: 'Initial Physiotherapy Assessment', price: '140', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 'ah-t1', name: 'Dr. Lucas Miller', role: 'Principal Physiotherapist', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  professional_services: {
    id: 'professional_services',
    name: 'Legal & Wealth Management',
    designTag: 'TRUSTED ADVISORY FIRM',
    heroDefaultSubtitle: 'Strategic, discrete, and highly specialized counsel for families and enterprises across Australia.',
    servicesDefault: [
      { id: 'ps1', title: 'Corporate Law', desc: 'Navigating complex mergers, acquisitions, and commercial litigation.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'ps-p1', subtitle: 'Commercial Acquisition', title: 'Tech Firm Merger', desc: 'Successfully negotiated a complex $50M cross-border acquisition.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'ps-pr1', name: 'Initial Legal Strategy Session', price: '350', image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 'ps-t1', name: 'Jonathan Thorne', role: 'Senior Partner', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  creative_architecture: {
    id: 'creative_architecture',
    name: 'Architects & Designers',
    designTag: 'VISIONARY SPATIAL DESIGN',
    heroDefaultSubtitle: 'Shaping the Australian landscape with sustainable, innovative, and deeply considered architecture.',
    servicesDefault: [
      { id: 'ca1', title: 'Residential Architecture', desc: 'Concept-to-completion design for striking, modern Australian homes.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'ca-p1', subtitle: 'Mornington Peninsula', title: 'Coastal Retreat', desc: 'A sustainable off-grid timber and glass pavilion blending into the dunes.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'ca-pr1', name: 'Initial Concept Sketch Package', price: '800', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 'ca-t1', name: 'Clara Dupond', role: 'Design Principal', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  industrial_logistics: {
    id: 'industrial_logistics',
    name: 'Freight & Industrial Cleaning',
    designTag: 'NATIONAL LOGISTICS & OPERATIONS',
    heroDefaultSubtitle: 'Robust, compliant, and highly efficient industrial solutions powering the Australian supply chain.',
    servicesDefault: [
      { id: 'il1', title: 'National Freight', desc: 'Secure, time-critical transport solutions across the eastern seaboard.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'il-p1', subtitle: 'Supply Chain', title: 'Cold-Storage Logistics', desc: 'Implemented a zero-fail transport grid for a major pharmaceutical distributor.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'il-pr1', name: 'Freight Audit & Quote Analysis', price: '200', image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 'il-t1', name: 'David Miller', role: 'Logistics Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  property_advisory: {
    id: 'property_advisory',
    name: 'Buyers Agents & Valuers',
    designTag: 'STRATEGIC PROPERTY ACQUISITION',
    heroDefaultSubtitle: 'Securing premium real estate assets with data-driven insights and exclusive off-market access.',
    servicesDefault: [
      { id: 'pa1', title: 'Off-Market Sourcing', desc: 'Gaining first access to tightly-held prestige properties before public listing.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'pa-p1', subtitle: 'Brighton Real Estate', title: 'Prestige Acquisition', desc: 'Secured a waterfront estate 10% under market value prior to auction.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'pa-pr1', name: 'Property Market Intelligence Brief', price: '300', image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 'pa-t1', name: 'Sarah Kensington', role: 'Senior Buyers Agent', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  saas_tech: {
    id: 'saas_tech',
    name: 'Tech Startups & MSPs',
    designTag: 'ENTERPRISE CLOUD ARCHITECTURE',
    heroDefaultSubtitle: 'Accelerating digital transformation with bulletproof security, managed IT, and scalable cloud solutions.',
    servicesDefault: [
      { id: 'st1', title: 'Managed IT Support', desc: 'Proactive 24/7 monitoring and helpdesk support for your workforce.', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'st-p1', subtitle: 'Financial Sector', title: 'Zero-Trust Security Rollout', desc: 'Deployed a complete data protection framework for an accounting firm.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'st-pr1', name: 'Cloud Infrastructure Assessment', price: '500', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 'st-t1', name: 'Ethan Hunt', role: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' }
    ]
  }
};