// src/data/integrationsRegistry.ts

export type ConnectionStatus = 'connected' | 'disconnected' | 'config_required' | 'error';

export interface IntegrationConfig {
  id: string;
  name: string;
  category: 'calendar' | 'payment' | 'crm' | 'communication' | 'maps' | 'webhook';
  description: string;
  status: ConnectionStatus;
  fields: { key: string; label: string; placeholder: string; type: 'text' | 'password' | 'url' | 'select' }[];
  values: Record<string, string>;
}

export const INITIAL_INTEGRATIONS: Record<string, IntegrationConfig> = {
  'calendly': {
    id: 'calendly',
    name: 'Calendly / Google Calendar',
    category: 'calendar',
    description: 'Embed real-time scheduling widgets or popup buttons for client bookings.',
    status: 'config_required',
    fields: [
      { key: 'bookingUrl', label: 'Scheduling URL (Calendly / HubSpot / Google)', placeholder: 'https://calendly.com/your-business', type: 'url' },
      { key: 'displayMode', label: 'Display Mode', placeholder: 'embedded', type: 'select' }
    ],
    values: { bookingUrl: '', displayMode: 'embedded' }
  },
  'stripe': {
    id: 'stripe',
    name: 'Stripe Checkout & Payments',
    category: 'payment',
    description: 'Accept credit card payments, product orders, and subscription fees.',
    status: 'disconnected',
    fields: [
      { key: 'publishableKey', label: 'Stripe Publishable Key', placeholder: 'pk_live_...', type: 'text' },
      { key: 'currency', label: 'Currency Code', placeholder: 'AUD / USD', type: 'text' }
    ],
    values: { publishableKey: '', currency: 'AUD' }
  },
  'hubspot': {
    id: 'hubspot',
    name: 'HubSpot CRM & Leads',
    category: 'crm',
    description: 'Automatically sync form submissions and contact data directly into HubSpot.',
    status: 'disconnected',
    fields: [
      { key: 'portalId', label: 'HubSpot Portal ID / API Key', placeholder: 'pat-na1-...', type: 'password' }
    ],
    values: { portalId: '' }
  },
  'webhook': {
    id: 'webhook',
    name: 'Custom Webhook Dispatcher',
    category: 'webhook',
    description: 'Transmit real-time lead and order payloads to external endpoints or Zapier.',
    status: 'disconnected',
    fields: [
      { key: 'webhookUrl', label: 'Endpoint URL', placeholder: 'https://hooks.zapier.com/...', type: 'url' },
      { key: 'httpMethod', label: 'HTTP Method', placeholder: 'POST', type: 'select' }
    ],
    values: { webhookUrl: '', httpMethod: 'POST' }
  },
  'whatsapp': {
    id: 'whatsapp',
    name: 'WhatsApp Direct Link',
    category: 'communication',
    description: 'Enable instant customer inquiries via live WhatsApp chat buttons.',
    status: 'connected',
    fields: [
      { key: 'phoneNumber', label: 'WhatsApp Phone Number with Country Code', placeholder: '+61400000000', type: 'text' }
    ],
    values: { phoneNumber: '+61400000000' }
  }
};