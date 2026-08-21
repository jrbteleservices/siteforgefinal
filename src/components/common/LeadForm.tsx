import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface LeadFormProps {
  businessName?: string;
}

export default function LeadForm({ businessName = 'Local Trade Business' }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          // Use the real authenticated user ID as the owner
          owner_id: user?.id || '00000000-0000-0000-0000-000000000000',
          name: name,
          phone: phone,
          email: email || 'no-email@provided.com',
          message: `[Business: ${businessName}] ${message}`
        }
      ]);

    setLoading(false);

    if (error) {
      alert('Error submitting form: ' + error.message);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-emerald-400 mb-2">Thank You!</h3>
        <p className="text-slate-300 text-sm">Your message has been sent to {businessName}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4 text-left shadow-xl">
      <h3 className="text-lg font-bold text-white">Request a Free Callback</h3>
      {/* ... (rest of the form fields remain the same) ... */}
      <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white" />
      <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0400 000 000" className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white" />
      <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your emergency..." className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-white" />
      <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 text-white mt-2">
        {loading ? 'Sending...' : 'Submit Lead'}
      </button>
    </form>
  );
}