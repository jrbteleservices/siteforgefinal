import { useState } from 'react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  triggerEvent: string;
  isActive: boolean;
}

export default function EmailTemplatesView() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'New Lead Instant Alert',
      subject: '🚨 New Trade Lead Received: {client_name}',
      triggerEvent: 'lead.created',
      isActive: true
    },
    {
      id: '2',
      name: 'Subscription Renewal Notice',
      subject: 'Your SiteForge Monthly Billing Receipt - {plan_code}',
      triggerEvent: 'subscription.renewed',
      isActive: true
    }
  ]);

  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !name) return;

    const newTemplate: EmailTemplate = {
      id: String(templates.length + 1),
      name: name.trim(),
      subject: subject.trim(),
      triggerEvent: 'custom.event',
      isActive: true
    };

    setTemplates([...templates, newTemplate]);
    setSubject('');
    setName('');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Email Notification Templates</h1>
          <p className="text-slate-400 text-sm mt-1">Configure outbound transactional email alerts for client leads and billing events</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-700">
          Active Templates: {templates.length}
        </div>
      </div>

      <form onSubmit={handleAddTemplate} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-end shadow-xl">
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Template Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. VIP Lead Alert"
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
            required
          />
        </div>
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Subject Line</label>
          <input 
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Urgent Inquiry from {suburb}"
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 text-white w-full md:w-auto"
        >
          Add Template
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {templates.map((tpl) => (
          <div key={tpl.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-white">{tpl.name}</h3>
                <span className="text-xs bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-full border border-purple-500/20 font-semibold uppercase">
                  {tpl.triggerEvent}
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-2 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                Subject: {tpl.subject}
              </p>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-bold uppercase">
              Active
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}