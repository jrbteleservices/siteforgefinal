// src/data/agencyStore.ts

export type UserRole = 'Agency Owner' | 'Agency Admin' | 'Designer' | 'Developer' | 'Client' | 'Client Editor';

export interface ClientRecord {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  status: 'Active Prospect' | 'Live Client' | 'Archived';
  notes: string;
}

export interface AgencySiteProject {
  id: string;
  name: string;
  industry: string;
  clientId: string;
  clientName: string;
  domain: string;
  status: 'Live' | 'Draft' | 'Demo';
  lastEdited: string;
  configState: any;
}

export interface WhiteLabelConfig {
  agencyName: string;
  agencyLogoUrl: string;
  primaryColor: string;
  customDomain: string;
  supportEmail: string;
}

export const INITIAL_WHITE_LABEL: WhiteLabelConfig = {
  agencyName: 'JRB Web Solutions',
  agencyLogoUrl: '',
  primaryColor: '#2563eb',
  customDomain: 'portal.jrbwebsolutions.in',
  supportEmail: 'support@jrbwebsolutions.in'
};

export const INITIAL_CLIENTS: ClientRecord[] = [
  { id: 'cli_1', businessName: 'Dr Nathan Dental', contactName: 'Dr Nathan', email: 'nathan@dental.com', phone: '1300 000 000', status: 'Live Client', notes: 'Monthly retainer client.' },
  { id: 'cli_2', businessName: 'Apex Cranes Melbourne', contactName: 'Robert Vance', email: 'robert@apexcranes.com.au', phone: '0400 123 456', status: 'Active Prospect', notes: 'Demo sent via Phase 6 URL.' }
];

export const INITIAL_PROJECTS: AgencySiteProject[] = [
  { id: 'site_1', name: 'Dr Nathan Dental', industry: 'dentist', clientId: 'cli_1', clientName: 'Dr Nathan Dental', domain: 'drnathandental.com.au', status: 'Live', lastEdited: '2026-08-26', configState: {} },
  { id: 'site_2', name: 'Apex Cranes', industry: 'crane-hire', clientId: 'cli_2', clientName: 'Apex Cranes Melbourne', domain: 'apexcranes.siteforge.com', status: 'Draft', lastEdited: '2026-08-26', configState: {} }
];