export interface IndustryConfig {
  primaryColor: string;
  accentBg: string;
  badgeText: string;
  heroImage: string;
  serviceImages: string[];
  projectImages: string[];
  defaultServices: { title: string; desc: string }[];
}

export function getIndustryConfig(industry: string, suburb: string): IndustryConfig {
  const lower = industry.toLowerCase();

  if (lower.includes('dental') || lower.includes('dentist')) {
    return {
      primaryColor: 'emerald',
      accentBg: 'bg-emerald-600',
      badgeText: 'CERTIFIED DENTAL CARE & IMPLANT SPECIALISTS',
      heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      serviceImages: [
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
      ],
      projectImages: [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
      ],
      defaultServices: [
        { title: 'Dental Checkups & Cleans', desc: `Routine examinations, professional cleans, and preventative care in ${suburb}.` },
        { title: 'Dental Implants & Restorations', desc: 'Permanent tooth replacement solutions designed for natural function and aesthetics.' },
        { title: 'Root Canal Treatments', desc: 'Painless modern endodontic therapy to save damaged teeth and relieve discomfort.' }
      ]
    };
  }

  if (lower.includes('roof') || lower.includes('roofing')) {
    return {
      primaryColor: 'red',
      accentBg: 'bg-red-600',
      badgeText: 'LICENSED ROOF RESTORATIONS & REPAIRS',
      heroImage: 'https://images.unsplash.com/photo-1632759145351-1d59593b2e42?auto=format&fit=crop&w=1200&q=80',
      serviceImages: [
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
      ],
      projectImages: [
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80'
      ],
      defaultServices: [
        { title: 'Full Roof Restorations', desc: `Complete high-pressure cleaning, re-bedding, pointing, and protective coatings in ${suburb}.` },
        { title: 'Leak Detection & Repairs', desc: 'Rapid emergency response for storm damage, broken tiles, and flashing leaks.' },
        { title: 'Guttering & Downpipes', desc: 'Seamless gutter replacement, leaf guard installation, and drainage repairs.' }
      ]
    };
  }

  // Default Trade / BPO Config
  return {
    primaryColor: 'blue',
    accentBg: 'bg-blue-600',
    badgeText: 'PROFESSIONAL LOCAL SERVICES & SOLUTIONS',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    serviceImages: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb18fdb7b?auto=format&fit=crop&w=600&q=80'
    ],
    projectImages: [
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
    ],
    defaultServices: [
      { title: 'Emergency Repairs & Diagnosis', desc: `Rapid professional diagnosis and resolution in ${suburb}.` },
      { title: 'Scheduled Maintenance', desc: 'Preventative care and routine servicing for long-term reliability.' },
      { title: 'Advanced System Upgrades', desc: 'Modern installation and compliance checks by certified professionals.' }
    ]
  };
}