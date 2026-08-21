import { useState } from 'react';

interface RoutingRule {
  id: string;
  suburb: string;
  assigneeName: string;
  assigneePhone: string;
  isActive: boolean;
}

export default function RoutingView() {
  const [rules, setRules] = useState<RoutingRule[]>([
    { id: '1', suburb: 'St. Kilda VIC', assigneeName: 'John (Emergency Lead)', assigneePhone: '+61 400 111 222', isActive: true },
    { id: '2', suburb: 'Richmond VIC', assigneeName: 'Dave (Roofing Specialist)', assigneePhone: '+61 400 333 444', isActive: true }
  ]);
  const [suburb, setSuburb] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suburb || !name || !phone) return;

    const newRule: RoutingRule = {
      id: String(rules.length + 1),
      suburb: suburb.trim(),
      assigneeName: name.trim(),
      assigneePhone: phone.trim(),
      isActive: true
    };

    setRules([...rules, newRule]);
    setSuburb('');
    setName('');
    setPhone('');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Lead Routing & Assignment Rules</h1>
          <p className="text-slate-400 text-sm mt-1">Automatically dispatch incoming website enquiries to specific local team members based on suburb</p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-700">
          Active Rules: {rules.length}
        </div>
      </div>

      <form onSubmit={handleAddRule} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end shadow-xl">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Suburb</label>
          <input 
            type="text" 
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            placeholder="e.g. Brunswick VIC"
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
            required
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assignee Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mark Plumber"
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
            required
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assignee Phone</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +61 400 000 000"
            className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 text-white w-full"
        >
          Add Rule
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-white">Region: {rule.suburb}</h3>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-semibold uppercase">
                  Active Routing
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-2">
                Assigned To: <span className="text-white font-bold">{rule.assigneeName}</span> ({rule.assigneePhone})
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs text-blue-400 font-mono">
              Trigger: lead.created
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}