import { useState } from 'react';
import { Phone, MessageCircle, CheckCircle, ShieldCheck, Clock, Wrench, ChevronDown, ChevronUp, MapPin, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface TemplateProps {
  businessName: string;
  phone: string;
  suburb: string;
}

export default function PlumbingTemplate({ businessName, phone, suburb }: TemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('leads')
      .insert([
        {
          owner_id: user?.id || '00000000-0000-0000-0000-000000000000',
          name: leadName,
          email: leadEmail || 'no-email@provided.com',
          phone: leadPhone,
          message: `[Website Inquiry - ${suburb}] ${leadMessage}`
        }
      ]);

    setLoading(false);

    if (error) {
      alert('Error submitting inquiry: ' + error.message);
    } else {
      setSubmitted(true);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg shadow-lg shadow-blue-600/30">
            {businessName.charAt(0)}
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">{businessName}</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <a href="#services" className="hover:text-blue-400 transition">What We Do</a>
          <a href="#why-us" className="hover:text-blue-400 transition">Why Us</a>
          <a href="#projects" className="hover:text-blue-400 transition">Recent Projects</a>
          <a href="#areas" className="hover:text-blue-400 transition">Areas We Serve</a>
          <a href="#faq" className="hover:text-blue-400 transition">FAQ</a>
          <a href="#contact" className="hover:text-blue-400 transition">Get in Touch</a>
        </nav>

        <div className="flex items-center gap-3">
          <a 
            href={`tel:${phone}`}
            className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs transition text-white"
          >
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            {phone}
          </a>
          <a 
            href="#contact"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-lg shadow-blue-600/20"
          >
            Get a Quote
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative px-8 py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-blue-400 text-xs font-bold w-max">
            <ShieldCheck className="w-4 h-4" /> LICENSED & VERIFIED LOCAL SPECIALISTS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
            EMERGENCY PLUMBING & REPAIRS ACROSS <span className="text-blue-500">{suburb.toUpperCase()}</span>
          </h1>
          <p className="text-slate-300 text-base max-w-lg">
            Fast response times, upfront transparent pricing, and 24/7 expert maintenance handled by your trusted local team in {suburb}.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#contact"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-2xl text-sm transition shadow-xl shadow-blue-600/30 flex items-center gap-3"
            >
              Get a Free Quote
            </a>
            <a 
              href={`tel:${phone}`}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-4 px-8 rounded-2xl text-sm transition flex items-center gap-3"
            >
              <Phone className="w-4 h-4 text-emerald-400" /> Call {phone}
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-900 text-xs font-bold text-slate-400">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Local Team</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Clear Pricing</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Fast Response</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Tidy Work</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
          <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="font-bold text-sm text-white">Live Service Request</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                ⚡ Average dispatch time in <span className="text-white font-bold">{suburb}</span>: <span className="text-emerald-400 font-bold">28 minutes</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                🛠️ Fully equipped vans carrying 95% of common replacement parts on hand.
              </div>
            </div>
            <a 
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 py-3.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Instant Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">OUR CAPABILITIES</h2>
          <h3 className="text-3xl font-black text-white tracking-tight">What We Do</h3>
          <p className="text-slate-400 text-sm mt-2">Comprehensive plumbing and maintenance services delivered right across {suburb}.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Emergency Leak Detection', desc: 'Rapid diagnosis and repair of burst pipes, hidden leaks, and water damage prevention.' },
            { title: 'Hot Water Systems', desc: 'Installation, repair, and servicing of gas, electric, and solar hot water units.' },
            { title: 'Blocked Drains & Hydro Jetting', desc: 'High-pressure water jetting and CCTV camera inspections to clear stubborn blockages.' }
          ].map((service, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 p-8 rounded-3xl transition flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">{service.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section id="why-us" className="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">REPUTATION & TRUST</h2>
          <h3 className="text-3xl font-black text-white tracking-tight">Why Choose {businessName}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Local Team', desc: `Based nearby and on the road every day in ${suburb}.` },
            { title: 'Clear Pricing', desc: 'Written fixed quotes provided before any work starts.' },
            { title: 'Fast Response', desc: 'Same-day priority replies to every emergency enquiry.' },
            { title: 'Tidy Work', desc: 'We always clean up our workspace completely when finished.' }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col gap-2">
              <h4 className="font-bold text-white text-sm">{item.title}</h4>
              <p className="text-slate-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RECENT PROJECTS GALLERY */}
      <section id="projects" className="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">PORTFOLIO</h2>
          <h3 className="text-3xl font-black text-white tracking-tight">Recent Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((p) => (
            <div key={p} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col group">
              <div className="h-48 bg-slate-950 flex items-center justify-center text-slate-700 font-bold text-sm group-hover:scale-105 transition duration-500">
                Project Showcase #{p}
              </div>
              <div className="p-6 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{suburb} Residential</span>
                <h4 className="font-bold text-white text-base">Complete System Overhaul & Compliance</h4>
                <p className="text-xs text-slate-400">Upgraded outdated infrastructure with modern high-efficiency plumbing fixtures.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. AREAS WE SERVE */}
      <section id="areas" className="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">COVERAGE</h2>
          <h3 className="text-3xl font-black text-white tracking-tight">Areas We Serve</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {[suburb, 'City Centre', 'Northside', 'Eastern Suburbs', 'Southside', 'Bayside Region'].map((area, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500" /> {area}
            </div>
          ))}
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 px-8 max-w-4xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">SUPPORT</h2>
          <h3 className="text-3xl font-black text-white tracking-tight">Frequently Asked Questions</h3>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { q: 'Do you provide free quotes?', a: 'Yes, we provide transparent, written quotes with zero hidden fees before starting any work.' },
            { q: 'How quickly can you arrive for an emergency?', a: 'Our local technicians are dispatched immediately and typically arrive within 30 to 45 minutes.' },
            { q: 'Are your plumbers fully licensed and insured?', a: 'All team members carry full trade licenses, police checks, and comprehensive public liability insurance.' }
          ].map((faq, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full p-6 text-left font-bold text-sm text-white flex justify-between items-center hover:bg-slate-850 transition"
              >
                {faq.q}
                {openFaq === i ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-xs text-slate-300 leading-relaxed border-t border-slate-800/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. GET IN TOUCH FOOTER */}
      <footer id="contact" className="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">GET IN TOUCH</h2>
            <h3 className="text-3xl font-black text-white tracking-tight">Ready to Get Started?</h3>
            <p className="text-slate-400 text-sm mt-2">Send us a message and we’ll get straight back to you.</p>
          </div>

          <div className="flex flex-col gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-500" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>support@{businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.au</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Mon - Fri: 7:00am – 5:00pm (24/7 Emergency Dispatch)</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl text-center flex flex-col items-center gap-3">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
              <h4 className="text-lg font-bold text-emerald-400">Inquiry Sent Successfully!</h4>
              <p className="text-slate-300 text-xs">Thank you. {businessName} has received your message and will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
              <h4 className="text-base font-bold text-white mb-2">Send a Message</h4>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Your Name</label>
                <input 
                  type="text" 
                  required 
                  value={leadName} 
                  onChange={(e) => setLeadName(e.target.value)} 
                  placeholder="John Smith" 
                  className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Email</label>
                  <input 
                    type="email" 
                    value={leadEmail} 
                    onChange={(e) => setLeadEmail(e.target.value)} 
                    placeholder="john@example.com" 
                    className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Phone</label>
                  <input 
                    type="tel" 
                    required 
                    value={leadPhone} 
                    onChange={(e) => setLeadPhone(e.target.value)} 
                    placeholder="0400 000 000" 
                    className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500" 
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">How can we help?</label>
                <textarea 
                  rows={3} 
                  required 
                  value={leadMessage} 
                  onChange={(e) => setLeadMessage(e.target.value)} 
                  placeholder="Describe your project or emergency..." 
                  className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500" 
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-lg shadow-blue-600/20 mt-2"
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </footer>
    </div>
  );
}