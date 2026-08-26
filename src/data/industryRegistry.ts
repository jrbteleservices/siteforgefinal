// src/data/industryRegistry.ts

export interface IndustryProfile {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  recommendedPages: string[];
  recommendedTools: string[];
  defaultTools: string[]; // <-- Added: Automatically enables these tools in the tool engine
  recommendedSections: string[];
  recommendedCTAs: string[];
  recommendedFormFields: string[];
  recommendedIntegrations: string[];
  seoKeywords: string[];
  visualCharacteristics: {
    palette: string;
    vibe: string;
    fontStyle: string;
  };
  contentTone: string;
  defaultBaseRate?: number;
  calcUnit?: string;
}

export const INDUSTRY_REGISTRY: Record<string, IndustryProfile> = {
  // --- TRADES ---
  'plumbing': {
    id: 'plumbing',
    name: 'Plumbing & Emergency Services',
    category: 'Trades',
    subcategory: 'Home Services',
    description: '24/7 rapid response plumbing and drainage specialists.',
    recommendedPages: ['Home', 'About', 'Services', 'Gallery', 'Contact', 'Booking'],
    recommendedTools: ['Booking', 'Lead Form', 'File Upload', 'Reviews'],
    defaultTools: ['external-booking', 'lead-form', 'file-upload', 'reviews'],
    recommendedSections: ['hero', 'about', 'services', 'emergencyBanner', 'reviews', 'contact'],
    recommendedCTAs: ['Dispatch Plumber Now', 'Book Emergency Callout', 'Get Free Quote'],
    recommendedFormFields: ['Full Name', 'Phone Number', 'Service Required', 'Issue Description', 'Photo Upload'],
    recommendedIntegrations: ['Google Calendar', 'WhatsApp', 'Stripe'],
    seoKeywords: ['emergency plumber', 'blocked drain', 'hot water system repair', 'leak detection'],
    visualCharacteristics: { palette: 'blue', vibe: 'Trustworthy, Urgent, Professional', fontStyle: 'Sans-Serif Bold' },
    contentTone: 'Direct, reassuring, authoritative, and fast-acting.',
    defaultBaseRate: 150
  },
  'dentist': {
    id: 'dentist',
    name: 'Dental Clinic & Orthodontics',
    category: 'Professional',
    subcategory: 'Healthcare',
    description: 'Comprehensive family and cosmetic dental care.',
    recommendedPages: ['Home', 'About', 'Services', 'Treatments', 'Reviews', 'FAQ', 'Contact', 'Booking'],
    recommendedTools: ['Booking', 'Service Selector', 'Reviews', 'FAQ'],
    defaultTools: ['external-booking', 'service-selector', 'reviews', 'lead-form'],
    recommendedSections: ['hero', 'about', 'services', 'treatmentsGrid', 'reviews', 'faq', 'contact'],
    recommendedCTAs: ['Book Consultation', 'Schedule Check-up', 'Emergency Pain Relief'],
    recommendedFormFields: ['Patient Name', 'Phone Number', 'Email', 'Preferred Treatment', 'Preferred Date & Time'],
    recommendedIntegrations: ['Calendly', 'Google Calendar', 'HubSpot'],
    seoKeywords: ['dentist near me', 'teeth whitening', 'invisalign', 'dental implants', 'emergency dentist'],
    visualCharacteristics: { palette: 'cyan', vibe: 'Clean, Calm, Clinical, Modern', fontStyle: 'Modern Sans' },
    contentTone: 'Gentle, clinical, welcoming, and high-trust.',
  },
  'epoxy-flooring': {
    id: 'epoxy-flooring',
    name: 'Epoxy & Timber Flooring',
    category: 'Trades',
    subcategory: 'Surface Specialists',
    description: 'Commercial and residential high-durability flooring solutions.',
    recommendedPages: ['Home', 'About', 'Services', 'Quote Calculator', 'Gallery', 'Before/After', 'Contact'],
    recommendedTools: ['Quote Calculator', 'Measurement Calculator', 'Before/After', 'Gallery', 'File Upload'],
    defaultTools: ['calculator-engine', 'measurement-engine', 'before-after', 'gallery', 'file-upload'],
    recommendedSections: ['hero', 'about', 'services', 'calculatorTool', 'beforeAfterSlider', 'gallery', 'contact'],
    recommendedCTAs: ['Get Instant Estimate', 'Calculate Flooring Cost', 'Book Site Inspection'],
    recommendedFormFields: ['Name', 'Phone', 'Email', 'Estimated Square Meters', 'Surface Type', 'Floor Photos'],
    recommendedIntegrations: ['Stripe', 'WhatsApp'],
    seoKeywords: ['epoxy flooring contractors', 'timber floor sanding', 'garage floor coating', 'industrial resin flooring'],
    visualCharacteristics: { palette: 'slate', vibe: 'Sleek, Industrial, Premium', fontStyle: 'Heavy Grotesk' },
    contentTone: 'Technical, durable, precise, and results-driven.',
    defaultBaseRate: 65,
    calcUnit: 'Square Meters (m²)'
  },
  'crane-hire': {
    id: 'crane-hire',
    name: 'Heavy Crane & Rigging Hire',
    category: 'Industrial',
    subcategory: 'Heavy Machinery',
    description: 'Certified crane rental, rigging, and heavy haulage solutions.',
    recommendedPages: ['Home', 'About', 'Equipment', 'Availability', 'Projects', 'RFQ', 'Contact'],
    recommendedTools: ['Equipment Catalogue', 'Availability Checker', 'RFQ', 'Quote Calculator'],
    defaultTools: ['availability-tool', 'quote-request', 'file-upload', 'gallery', 'external-booking'],
    recommendedSections: ['hero', 'about', 'equipmentGrid', 'availabilityChecker', 'complianceBadges', 'contact'],
    recommendedCTAs: ['Check Fleet Availability', 'Request Crane Quote', 'Download Load Charts'],
    recommendedFormFields: ['Company Name', 'Contact Person', 'Phone', 'Crane Tonnage Required', 'Site Location & Dates'],
    recommendedIntegrations: ['HubSpot', 'Webhooks'],
    seoKeywords: ['crane hire', 'all terrain crane rental', 'franna crane hire', 'heavy rigging services'],
    visualCharacteristics: { palette: 'amber', vibe: 'Heavy Duty, Safe, Compliant', fontStyle: 'Industrial Bold' },
    contentTone: 'Rigorous, safety-first, engineering-focused, and dependable.',
  },
  'cnc-machining': {
    id: 'cnc-machining',
    name: 'CNC Machining & Metal Fabrication',
    category: 'Industrial',
    subcategory: 'Advanced Manufacturing',
    description: 'Precision 5-axis milling, turning, and rapid prototyping.',
    recommendedPages: ['Home', 'About', 'Capabilities', 'Equipment', 'CAD Upload', 'RFQ', 'Contact'],
    recommendedTools: ['RFQ', 'File Upload', 'Material Selector', 'Equipment Catalogue'],
    defaultTools: ['file-upload', 'product-configurator', 'quote-request', 'lead-form'],
    recommendedSections: ['hero', 'about', 'capabilitiesGrid', 'cadUploadPortal', 'equipmentList', 'contact'],
    recommendedCTAs: ['Submit CAD for RFQ', 'Get Instant Machining Quote', 'Upload Drawings'],
    recommendedFormFields: ['Company Name', 'Engineering Contact', 'Email', 'Material Grade', 'CAD File Upload (STEP/PDF)'],
    recommendedIntegrations: ['HubSpot', 'Stripe'],
    seoKeywords: ['cnc machining services', 'precision metal fabrication', '5 axis milling', 'rapid prototyping'],
    visualCharacteristics: { palette: 'violet', vibe: 'High-Tech, Precise, Futuristic', fontStyle: 'Monospace & Clean Sans' },
    contentTone: 'Extremely technical, exact, certified, and quality-assured.',
  },
  'restaurant': {
    id: 'restaurant',
    name: 'Restaurant & Dining',
    category: 'Hospitality',
    subcategory: 'Food & Beverage',
    description: 'Fine dining, casual eateries, and culinary experiences.',
    recommendedPages: ['Home', 'About', 'Menu', 'Reservation', 'Events', 'Reviews', 'Contact'],
    recommendedTools: ['Reservation', 'Menu', 'Reviews', 'Event Booking'],
    defaultTools: ['external-booking', 'product-configurator', 'gallery', 'reviews'],
    recommendedSections: ['hero', 'about', 'menuGrid', 'reservationWidget', 'reviews', 'contact'],
    recommendedCTAs: ['Book a Table', 'View Menu', 'Order Online'],
    recommendedFormFields: ['Guest Name', 'Phone', 'Email', 'Party Size', 'Reservation Date & Time', 'Dietary Notes'],
    recommendedIntegrations: ['Stripe', 'Google Calendar', 'WhatsApp'],
    seoKeywords: ['best restaurant', 'fine dining', 'book table online', 'local bistro'],
    visualCharacteristics: { palette: 'rose', vibe: 'Warm, Inviting, Luxurious', fontStyle: 'Serif & Elegant' },
    contentTone: 'Appetizing, welcoming, atmospheric, and refined.',
  },
  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate Agency',
    category: 'Professional',
    subcategory: 'Property',
    description: 'Residential and commercial property sales, leasing, and management.',
    recommendedPages: ['Home', 'About', 'Property Search', 'Agents', 'Testimonials', 'Contact', 'Booking'],
    recommendedTools: ['Property Search', 'Booking', 'Reviews', 'Lead Form'],
    defaultTools: ['calculator-engine', 'external-booking', 'reviews', 'lead-form'],
    recommendedSections: ['hero', 'about', 'propertyGrid', 'agentProfiles', 'reviews', 'contact'],
    recommendedCTAs: ['Book Property Appraisal', 'Browse Listings', 'Speak to an Agent'],
    recommendedFormFields: ['Full Name', 'Phone', 'Email', 'Property Address', 'Selling or Leasing Interest'],
    recommendedIntegrations: ['HubSpot', 'Google Maps', 'Calendly'],
    seoKeywords: ['real estate agents', 'property valuation', 'homes for sale', 'commercial leasing'],
    visualCharacteristics: { palette: 'emerald', vibe: 'Prestigious, Clean, High-Value', fontStyle: 'Modern Serif' },
    contentTone: 'Professional, results-oriented, elite, and client-centric.',
  },
  'mechanic': {
    id: 'mechanic',
    name: 'Auto Mechanic & Smash Repairs',
    category: 'Automotive',
    subcategory: 'Repair & Maintenance',
    description: 'Mechanical servicing, engine diagnostics, and collision repairs.',
    recommendedPages: ['Home', 'About', 'Services', 'Booking', 'Gallery', 'Reviews', 'Contact'],
    recommendedTools: ['Booking', 'File Upload', 'Reviews', 'Service Selector'],
    defaultTools: ['external-booking', 'quote-request', 'service-selector', 'reviews'],
    recommendedSections: ['hero', 'about', 'services', 'bookingWidget', 'reviews', 'contact'],
    recommendedCTAs: ['Book Service Slot', 'Request Repair Estimate', 'Emergency Towing'],
    recommendedFormFields: ['Vehicle Make/Model', 'Year', 'Service Required', 'Preferred Date', 'Contact Info'],
    recommendedIntegrations: ['Google Calendar', 'Stripe', 'WhatsApp'],
    seoKeywords: ['car mechanic near me', 'logbook servicing', 'brakes and suspension', 'engine diagnostics'],
    visualCharacteristics: { palette: 'amber', vibe: 'Rugged, Reliable, Mechanical', fontStyle: 'Bold Condensed' },
    contentTone: 'Honest, efficient, skilled, and transparent.',
  }
};