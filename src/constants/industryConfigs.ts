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
  checkoutUrl?: string;
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
  defaultHeroImage: string;
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
    defaultHeroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    servicesDefault: [
      { id: 'lb1', title: 'Bespoke Custom Homes', desc: 'End-to-end architectural builds tailored to your exacting lifestyle and land profile.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
      { id: 'lb2', title: 'Heritage Restorations', desc: 'Meticulous period-accurate renovations honoring original craftsmanship.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
      { id: 'lb3', title: 'Premium Extensions', desc: 'Seamless, high-end additions that transform your existing floorplan.', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'lb-p1', subtitle: 'Toorak Residential', title: 'Modernist Masterpiece', desc: 'A multi-level concrete and glass luxury residence featuring a subterranean gallery.', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80' },
      { id: 'lb-p2', subtitle: 'Double Bay', title: 'Heritage Revival', desc: 'Complete structural restoration and interior modernization of a 1920s estate.', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80' },
      { id: 'lb-p3', subtitle: 'Brighton Beachfront', title: 'Coastal Pavilion', desc: 'An open-plan sanctuary designed to withstand coastal elements while maximizing views.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'pr1', name: 'Initial Architectural Feasibility Study', price: '450', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' },
      { id: 'pr2', name: 'Site Soil & Contour Survey Package', price: '1,200', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 't1', name: 'Alexander Sterling', role: 'Managing Director & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
      { id: 't2', name: 'Victoria Vance', role: 'Lead Architectural Designer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
      { id: 't3', name: 'Marcus Thorne', role: 'Construction Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  urgent_trade: {
    id: 'urgent_trade',
    name: 'Commercial Trades (24/7)',
    designTag: 'RAPID RESPONSE COMMERCIAL TRADES',
    heroDefaultSubtitle: 'Minimizing downtime for Victorian and NSW enterprises with guaranteed 60-minute dispatch.',
    defaultHeroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
    servicesDefault: [
      { id: 'ut1', title: 'Commercial Fit-outs', desc: 'Complete electrical and HVAC infrastructure for retail and office spaces.', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
      { id: 'ut2', title: 'Industrial Maintenance', desc: 'Scheduled preventative servicing for high-load manufacturing environments.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
      { id: 'ut3', title: '24/7 Emergency Faults', desc: 'Immediate dispatch for critical power failures and system breakdowns.', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'ut-p1', subtitle: 'Melbourne CBD', title: 'Corporate Tower Fit-out', desc: 'Multi-floor data and power cable integration for a Tier-1 tech firm.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
      { id: 'ut-p2', subtitle: 'Sydney Metro', title: 'Warehouse Climate Control', desc: 'High-capacity HVAC system design and implementation for a logistics hub.', image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80' },
      { id: 'ut-p3', subtitle: 'Docklands Hub', title: 'Industrial Switchboard Upgrade', desc: 'Complete high-voltage switchgear replacement with zero downtime.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' }
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
    defaultHeroImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1600&q=80',
    servicesDefault: [
      { id: 'cm1', title: 'Anti-Wrinkle Injections', desc: 'Subtle, physician-administered treatments to smooth and refresh your appearance.', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80' },
      { id: 'cm2', title: 'Dermal Fillers', desc: 'Premium volume restoration tailored for lips, cheeks, and jawlines.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80' },
      { id: 'cm3', title: 'Laser Rejuvenation', desc: 'Clinical-grade skin resurfacing targeting pigmentation and texture.', image: 'https://images.unsplash.com/photo-1512290900722-9a70f8a85d95?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'cm-p1', subtitle: 'Client Transformation', title: 'Full Facial Balancing', desc: 'Strategic combination of anti-wrinkle and filler treatments.', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80' },
      { id: 'cm-p2', subtitle: 'Skin Health', title: 'Pigmentation Correction', desc: 'A course of medical-grade laser resulting in a flawless, even complexion.', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80' },
      { id: 'cm-p3', subtitle: 'Contouring', title: 'Jawline Definition', desc: 'Advanced dermal volumization for crisp facial architecture.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80' }
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
    defaultHeroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    servicesDefault: [
      { id: 'ah1', title: 'Sports Physiotherapy', desc: 'Targeted injury recovery and performance optimization for active individuals.', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80' },
      { id: 'ah2', title: 'Spinal Adjustments', desc: 'Specialized chiropractic care addressing back, neck, and posture-related pain.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80' },
      { id: 'ah3', title: 'Clinical Pilates', desc: 'Core strengthening programs tailored to your specific biomechanical needs.', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'ah-p1', subtitle: 'Athletic Recovery', title: 'ACL Rehabilitation', desc: 'A comprehensive 9-month program returning a local athlete to professional play.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
      { id: 'ah-p2', subtitle: 'Chronic Pain', title: 'Postural Correction', desc: 'Long-term resolution of severe lumbar pain for an office-based professional.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80' },
      { id: 'ah-p3', subtitle: 'Mobility', title: 'Post-Op Knee Restoration', desc: 'Restoring full range of motion following complex orthopedic surgery.', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80' }
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
    defaultHeroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
    servicesDefault: [
      { id: 'ps1', title: 'Corporate Law', desc: 'Navigating complex mergers, acquisitions, and commercial litigation.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
      { id: 'ps2', title: 'Wealth Management', desc: 'Tailored investment strategies and multi-generational asset protection.', image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80' },
      { id: 'ps3', title: 'Family Law & Estates', desc: 'Compassionate guidance through settlements, wills, and succession planning.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'ps-p1', subtitle: 'Commercial Acquisition', title: 'Tech Firm Merger', desc: 'Successfully negotiated a complex $50M cross-border acquisition.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
      { id: 'ps-p2', subtitle: 'Private Wealth', title: 'Family Office Structuring', desc: 'Established a tax-efficient trust structure for a high-net-worth estate.', image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80' },
      { id: 'ps-p3', subtitle: 'Commercial Litigation', title: 'IP Dispute Resolution', desc: 'Protected proprietary software patents in federal court proceedings.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' }
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
    defaultHeroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    servicesDefault: [
      { id: 'ca1', title: 'Residential Architecture', desc: 'Concept-to-completion design for striking, modern Australian homes.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
      { id: 'ca2', title: 'Interior Curation', desc: 'Material selection, spatial flow, and lighting design for elite spaces.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
      { id: 'ca3', title: 'Commercial Design', desc: 'Innovative retail and hospitality environments engineered for user experience.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'ca-p1', subtitle: 'Mornington Peninsula', title: 'Coastal Retreat', desc: 'A sustainable off-grid timber and glass pavilion blending into the dunes.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
      { id: 'ca-p2', subtitle: 'Surry Hills', title: 'Flagship Retail Space', desc: 'A minimalist, highly tactile boutique design for a luxury fashion brand.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
      { id: 'ca-p3', subtitle: 'South Yarra', title: 'Penthouse Apartment', desc: 'A dramatic urban interior featuring custom blackened steel and travertine stone.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }
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
    defaultHeroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    servicesDefault: [
      { id: 'il1', title: 'National Freight', desc: 'Secure, time-critical transport solutions across the eastern seaboard.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' },
      { id: 'il2', title: 'Industrial Cleaning', desc: 'Heavy-duty sanitization and compliance cleaning for manufacturing facilities.', image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80' },
      { id: 'il3', title: 'Warehouse Management', desc: 'Optimized 3PL storage and inventory distribution services.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'il-p1', subtitle: 'Supply Chain', title: 'Cold-Storage Logistics', desc: 'Implemented a zero-fail transport grid for a major pharmaceutical distributor.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' },
      { id: 'il-p2', subtitle: 'Industrial Hygiene', title: 'Food-Grade Sanitization', desc: 'Ongoing compliance maintenance for a 5000sqm food processing plant.', image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80' },
      { id: 'il-p3', subtitle: 'Port Botany', title: 'Container Freight Distribution', desc: 'Seamless clearance and rapid transport for international imports.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' }
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
    defaultHeroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
    servicesDefault: [
      { id: 'pa1', title: 'Off-Market Sourcing', desc: 'Gaining first access to tightly-held prestige properties before public listing.', image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80' },
      { id: 'pa2', title: 'Investment Strategy', desc: 'Data-backed portfolio building focused on high-yield growth corridors.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: 'pa3', title: 'Auction Bidding', desc: 'Aggressive, emotionally-detached representation to secure your asset.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'pa-p1', subtitle: 'Brighton Real Estate', title: 'Prestige Acquisition', desc: 'Secured a waterfront estate 10% under market value prior to auction.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { id: 'pa-p2', subtitle: 'Portfolio Growth', title: 'Multi-Asset Strategy', desc: 'Built a high-yield residential portfolio across three emerging Victorian suburbs.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80' },
      { id: 'pa-p3', subtitle: 'Toorak Advisory', title: 'Tightly Held Estate', desc: 'Successfully negotiated private off-market transaction for a family office.', image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80' }
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
    defaultHeroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    servicesDefault: [
      { id: 'st1', title: 'Managed IT Support', desc: 'Proactive 24/7 monitoring and helpdesk support for your workforce.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80' },
      { id: 'st2', title: 'Cybersecurity', desc: 'Advanced threat protection, compliance audits, and data recovery.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
      { id: 'st3', title: 'Cloud Migrations', desc: 'Seamless transition to Azure and AWS environments with zero downtime.', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80' }
    ],
    projectsDefault: [
      { id: 'st-p1', subtitle: 'Financial Sector', title: 'Zero-Trust Security Rollout', desc: 'Deployed a complete data protection framework for an accounting firm.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80' },
      { id: 'st-p2', subtitle: 'Retail Enterprise', title: 'Legacy Server Migration', desc: 'Successfully migrated 200+ users to a secure, scalable cloud infrastructure.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
      { id: 'st-p3', subtitle: 'Health Tech', title: 'HIPAA Compliant Cloud Grid', desc: 'Built a resilient multi-region AWS cluster for patient data processing.', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80' }
    ],
    productsDefault: [
      { id: 'st-pr1', name: 'Cloud Infrastructure Assessment', price: '500', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', checkoutUrl: 'https://buy.stripe.com/sample-checkout-link' }
    ],
    teamDefault: [
      { id: 'st-t1', name: 'Ethan Hunt', role: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' }
    ]
  }
};