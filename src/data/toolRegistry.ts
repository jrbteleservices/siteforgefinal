// src/data/toolRegistry.ts

export interface ToolDefinition {
  id: string;
  name: string;
  category: 'conversion' | 'calculator' | 'media' | 'commerce' | 'booking';
  description: string;
  defaultEnabled: boolean;
  configSchema: Record<string, { type: 'string' | 'boolean' | 'number' | 'select', label: string, default: any, options?: string[] }>;
}

export const CENTRAL_TOOL_REGISTRY: Record<string, ToolDefinition> = {
  'lead-form': {
    id: 'lead-form',
    name: 'Advanced Lead Capture Form',
    category: 'conversion',
    description: 'Fully validated lead intake form with dropdowns, radios, and secure data storage.',
    defaultEnabled: true,
    configSchema: {
      submitButtonText: { type: 'string', label: 'Button Text', default: 'Send Secure Message' },
      successMessage: { type: 'string', label: 'Success Message', default: 'Thank you! Your submission has been received.' },
      requireCompany: { type: 'boolean', label: 'Require Company Name', default: false }
    }
  },
  'external-booking': {
    id: 'external-booking',
    name: 'External Booking Tool',
    category: 'booking',
    description: 'Embeds or links to Calendly, Acuity, HubSpot, or Google Calendar scheduling URLs.',
    defaultEnabled: false,
    configSchema: {
      provider: { type: 'select', label: 'Calendar Provider', default: 'Calendly', options: ['Calendly', 'Google Calendar', 'Acuity', 'HubSpot Meetings', 'Custom URL'] },
      bookingUrl: { type: 'string', label: 'Calendar / Scheduling URL', default: 'https://calendly.com/' },
      displayMode: { type: 'select', label: 'Display Mode', default: 'embedded', options: ['embedded', 'popup', 'button'] },
      buttonText: { type: 'string', label: 'Button Text', default: 'Book Appointment Now' }
    }
  },
  'quote-request': {
    id: 'quote-request',
    name: 'Quote Request & RFQ Engine',
    category: 'conversion',
    description: 'Structured request form with budget ranges, file uploads, and service selection.',
    defaultEnabled: false,
    configSchema: {
      allowBudgetSelection: { type: 'boolean', label: 'Include Budget Selector', default: true },
      allowFileUpload: { type: 'boolean', label: 'Allow Document Uploads', default: true }
    }
  },
  'calculator-engine': {
    id: 'calculator-engine',
    name: 'Dynamic Formula Calculator',
    category: 'calculator',
    description: 'Configurable numeric inputs, multipliers, and sliders for instant estimates.',
    defaultEnabled: false,
    configSchema: {
      baseMultiplier: { type: 'number', label: 'Base Rate / Multiplier ($)', default: 100 },
      unitLabel: { type: 'string', label: 'Calculation Unit', default: 'Units' }
    }
  },
  'measurement-engine': {
    id: 'measurement-engine',
    name: 'Measurement & Area Engine',
    category: 'calculator',
    description: 'Length x Width / Volume calculations with automatic unit conversion (m, ft, m², ft²).',
    defaultEnabled: false,
    configSchema: {
      defaultUnit: { type: 'select', label: 'Default Measurement Unit', default: 'm²', options: ['m²', 'ft²', 'm', 'ft'] }
    }
  },
  'file-upload': {
    id: 'file-upload',
    name: 'Secure Document Vault',
    category: 'media',
    description: 'Drag-and-drop file uploader with size validation and secure cloud storage.',
    defaultEnabled: false,
    configSchema: {
      maxFileSizeMb: { type: 'number', label: 'Max File Size (MB)', default: 25 },
      allowedExtensions: { type: 'string', label: 'Allowed Extensions', default: '.pdf,.png,.jpg,.dwg,.step' }
    }
  },
  'availability-tool': {
    id: 'availability-tool',
    name: 'Fleet & Resource Availability',
    category: 'booking',
    description: 'Live date-picker and resource status checker for rentals and machinery.',
    defaultEnabled: false,
    configSchema: {
      resourceName: { type: 'string', label: 'Resource / Fleet Name', default: 'Equipment Unit' }
    }
  },
  'product-configurator': {
    id: 'product-configurator',
    name: 'Multi-Variant Product Configurator',
    category: 'commerce',
    description: 'Real-time variant selection (size, colour, material) with dynamic pricing.',
    defaultEnabled: false,
    configSchema: {
      currencySymbol: { type: 'string', label: 'Currency Symbol', default: '$' }
    }
  },
  'service-selector': {
    id: 'service-selector',
    name: 'Interactive Service Selector',
    category: 'conversion',
    description: 'Multi-tier service package picker with customizable add-ons.',
    defaultEnabled: true,
    configSchema: {
      layoutMode: { type: 'select', label: 'Layout Grid', default: '3-Column', options: ['2-Column', '3-Column', 'List View'] }
    }
  },
  'before-after': {
    id: 'before-after',
    name: 'Before/After Comparison Slider',
    category: 'media',
    description: 'Interactive responsive drag slider for visual transformations.',
    defaultEnabled: true,
    configSchema: {
      sliderOrientation: { type: 'select', label: 'Orientation', default: 'Horizontal', options: ['Horizontal', 'Vertical'] }
    }
  },
  'gallery': {
    id: 'gallery',
    name: 'Project Gallery & Lightbox',
    category: 'media',
    description: 'Categorized image portfolio with lightbox zoom and responsive grid.',
    defaultEnabled: true,
    configSchema: {
      columns: { type: 'select', label: 'Grid Columns', default: '3', options: ['2', '3', '4'] }
    }
  },
  'reviews': {
    id: 'reviews',
    name: 'Verified Reviews & Testimonials',
    category: 'conversion',
    description: 'Star-rated client feedback matrix with approval controls.',
    defaultEnabled: true,
    configSchema: {
      minRatingFilter: { type: 'number', label: 'Minimum Display Rating', default: 5 }
    }
  }
};