import { getIndustryConfig } from './industryData';

export function exportToHtml(
  businessName: string, 
  phone: string, 
  suburb: string, 
  theme: string, 
  designConcept: string = 'conversion'
) {
  const config = getIndustryConfig(theme, suburb);

  let heroLayout = '';

  if (designConcept === 'editorial') {
    heroLayout = `
      <div class="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 py-16">
        <span class="text-xs font-serif uppercase tracking-[0.3em] text-${config.primaryColor}-400">ESTABLISHED EXCELLENCE IN ${suburb.toUpperCase()}</span>
        <h1 class="text-5xl sm:text-7xl font-serif tracking-tight text-white leading-[1.1]">${businessName}</h1>
        <p class="text-slate-400 text-lg max-w-2xl font-light">Uncompromising craftsmanship and tailored professional services delivered with absolute discretion in ${suburb}.</p>
        <div class="flex gap-4 pt-4">
          <a href="#contact" class="bg-white text-slate-950 font-medium py-4 px-10 rounded-full text-xs tracking-widest uppercase transition hover:bg-slate-200">Arrange Consultation</a>
          <a href="tel:${phone}" class="border border-slate-700 text-white font-medium py-4 px-10 rounded-full text-xs tracking-widest uppercase transition hover:border-slate-500">Call ${phone}</a>
        </div>
      </div>
    `;
  } else if (designConcept === 'modern') {
    heroLayout = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
        <div class="lg:col-span-7 flex flex-col gap-6">
          <div class="inline-flex items-center gap-2 bg-gradient-to-r from-${config.primaryColor}-500/20 to-purple-500/20 border border-${config.primaryColor}-500/30 px-4 py-2 rounded-xl text-${config.primaryColor}-400 text-xs font-bold w-max shadow-lg">
            ⚡ NEXT-GEN AI DISPATCH & SERVICE INFRASTRUCTURE
          </div>
          <h1 class="text-5xl sm:text-7xl font-black tracking-tight text-white leading-[1.05]">
            SMART <span class="text-transparent bg-clip-text bg-gradient-to-r from-${config.primaryColor}-400 to-purple-400">${theme.toUpperCase()}</span> SOLUTIONS IN ${suburb.toUpperCase()}
          </h1>
          <p class="text-slate-300 text-base max-w-xl">
            Automated booking, real-time tracking, and certified expert technicians deployed instantly across ${suburb}.
          </p>
          <div class="flex flex-wrap gap-4 pt-2">
            <a href="#contact" class="bg-gradient-to-r from-${config.primaryColor}-600 to-purple-600 hover:opacity-90 text-white font-bold py-4 px-8 rounded-2xl text-sm transition shadow-2xl shadow-${config.primaryColor}-500/30">
              Book Instant Service
            </a>
            <a href="tel:${phone}" class="bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold py-4 px-8 rounded-2xl text-sm transition">
              ${phone}
            </a>
          </div>
        </div>
        <div class="lg:col-span-5">
          <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative">
            <div class="absolute -top-3 -right-3 bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow">Live Dispatch Active</div>
            <h3 class="font-bold text-white text-base mb-4">Request Priority Callout</h3>
            <form onsubmit="event.preventDefault(); alert('Priority dispatch confirmed!');" class="space-y-3">
              <input type="text" placeholder="Your Name" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-${config.primaryColor}-500" required />
              <input type="tel" placeholder="Phone Number" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-${config.primaryColor}-500" required />
              <button type="submit" class="w-full bg-${config.primaryColor}-600 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-lg">Dispatch Technician</button>
            </form>
          </div>
        </div>
      </div>
    `;
  } else if (designConcept === 'minimal') {
    heroLayout = `
      <div class="max-w-4xl mx-auto py-24 flex flex-col gap-8">
        <span class="text-xs font-mono uppercase tracking-widest text-slate-500">// ${suburb.toUpperCase()} DIVISION</span>
        <h1 class="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
          Reliable <span class="font-bold">${theme}</span> services tailored for ${suburb}.
        </h1>
        <p class="text-slate-400 text-base max-w-lg leading-relaxed">
          Clean execution, transparent fixed pricing, and professional accountability on every job.
        </p>
        <div class="flex items-center gap-6 pt-2">
          <a href="#contact" class="bg-white text-slate-950 px-8 py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase hover:bg-slate-200 transition">Get Started</a>
          <a href="tel:${phone}" class="text-white text-xs font-bold tracking-wider uppercase hover:text-${config.primaryColor}-400 transition">Call ${phone} &rarr;</a>
        </div>
      </div>
    `;
  } else {
    heroLayout = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <div class="flex flex-col gap-6">
          <div class="inline-flex items-center gap-2 bg-${config.primaryColor}-600/10 border border-${config.primaryColor}-500/20 px-3.5 py-1.5 rounded-full text-${config.primaryColor}-400 text-xs font-bold w-max">
            ${config.badgeText}
          </div>
          <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
            PROFESSIONAL SERVICES ACROSS <span class="text-${config.primaryColor}-500">${suburb.toUpperCase()}</span>
          </h1>
          <p class="text-slate-300 text-base max-w-lg">
            Fast response times, upfront transparent pricing, and 24/7 expert maintenance handled by your trusted local team in ${suburb}.
          </p>
          <div class="flex flex-wrap gap-4 pt-2">
            <a href="#contact" class="bg-${config.primaryColor}-600 hover:bg-${config.primaryColor}-500 text-white font-bold py-4 px-8 rounded-2xl text-sm transition shadow-xl">
              Get a Free Quote
            </a>
            <a href="tel:${phone}" class="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-4 px-8 rounded-2xl text-sm transition">
              Call ${phone}
            </a>
          </div>
        </div>
        <div class="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col gap-6 shadow-2xl">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <span class="font-bold text-sm text-white">Live Service Dispatch in ${suburb}</span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div class="space-y-3">
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
              ⚡ Average dispatch time: <span class="text-emerald-400 font-bold">28 minutes</span>
            </div>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
              🛠️ Fully equipped service units carrying common replacement parts.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} - Professional Services in ${suburb}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans selection:bg-${config.primaryColor}-600 selection:text-white pb-20">

  <!-- FLOATING WIDGETS -->
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" class="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition hover:scale-110" title="Chat on WhatsApp">
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
    </a>
    <a href="tel:${phone}" class="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl transition hover:scale-110" title="Call Us">
      <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    </a>
  </div>

  <!-- STICKY NAVIGATION BAR -->
  <header class="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex justify-between items-center shadow-md">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-${config.primaryColor}-600 flex items-center justify-center font-black text-lg text-white shadow-lg">
        ${businessName.charAt(0)}
      </div>
      <a href="#" class="font-extrabold text-base tracking-tight text-white hover:text-${config.primaryColor}-400 transition">${businessName}</a>
    </div>
    
    <nav class="hidden md:flex items-center gap-8 text-xs font-bold text-slate-300 uppercase tracking-wider">
      <a href="#services" class="hover:text-${config.primaryColor}-400 transition">What We Do</a>
      <a href="#why-us" class="hover:text-${config.primaryColor}-400 transition">Why Us</a>
      <a href="#projects" class="hover:text-${config.primaryColor}-400 transition">Recent Projects</a>
      <a href="#reviews" class="hover:text-${config.primaryColor}-400 transition">Reviews</a>
      <a href="#team" class="hover:text-${config.primaryColor}-400 transition">Our Team</a>
      <a href="#areas" class="hover:text-${config.primaryColor}-400 transition">Areas We Serve</a>
      <a href="#faq" class="hover:text-${config.primaryColor}-400 transition">FAQ</a>
      <a href="#contact" class="hover:text-${config.primaryColor}-400 transition">Get in Touch</a>
    </nav>

    <div class="flex items-center gap-3">
      <a href="tel:${phone}" class="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs text-white">
        ${phone}
      </a>
      <a href="#contact" class="bg-${config.primaryColor}-600 hover:bg-${config.primaryColor}-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-lg">
        Get a Quote
      </a>
    </div>
  </header>

  <!-- HERO SECTION (DYNAMIC CONCEPT) -->
  <section class="px-8 max-w-7xl mx-auto">
    ${heroLayout}
  </section>

  <!-- SERVICES SECTION -->
  <section id="services" class="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-xs font-bold text-${config.primaryColor}-500 uppercase tracking-widest mb-3">OUR CAPABILITIES</h2>
      <h3 class="text-3xl font-black text-white tracking-tight">What We Do</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${config.defaultServices.map((s, idx) => `
        <div class="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden flex flex-col group">
          <img src="${config.serviceImages[idx] || config.serviceImages[0]}" alt="Service" class="h-48 w-full object-cover group-hover:scale-105 transition duration-500" />
          <div class="p-6 flex flex-col gap-3">
            <h4 class="text-lg font-bold text-white">${s.title}</h4>
            <p class="text-slate-400 text-xs leading-relaxed">${s.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- WHY US -->
  <section id="why-us" class="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-xs font-bold text-${config.primaryColor}-500 uppercase tracking-widest mb-3">REPUTATION & TRUST</h2>
      <h3 class="text-3xl font-black text-white tracking-tight">Why Choose ${businessName}</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
        <h4 class="font-bold text-white text-sm mb-2">Local Team</h4>
        <p class="text-slate-400 text-xs">Based nearby and on the road every day in ${suburb}.</p>
      </div>
      <div class="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
        <h4 class="font-bold text-white text-sm mb-2">Clear Pricing</h4>
        <p class="text-slate-400 text-xs">Written fixed quotes provided before any work starts.</p>
      </div>
      <div class="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
        <h4 class="font-bold text-white text-sm mb-2">Fast Response</h4>
        <p class="text-slate-400 text-xs">Same-day priority replies to every emergency enquiry.</p>
      </div>
      <div class="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
        <h4 class="font-bold text-white text-sm mb-2">Tidy Work</h4>
        <p class="text-slate-400 text-xs">We always clean up our workspace completely when finished.</p>
      </div>
    </div>
  </section>

  <!-- RECENT PROJECTS -->
  <section id="projects" class="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-xs font-bold text-${config.primaryColor}-500 uppercase tracking-widest mb-3">PORTFOLIO</h2>
      <h3 class="text-3xl font-black text-white tracking-tight">Recent Projects</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${config.projectImages.map((img, idx) => `
        <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col group">
          <img src="${img}" alt="Project" class="h-48 w-full object-cover group-hover:scale-105 transition duration-500" />
          <div class="p-6 flex flex-col gap-2">
            <span class="text-[10px] font-bold text-${config.primaryColor}-400 uppercase tracking-wider">${suburb} Showcase</span>
            <h4 class="font-bold text-white text-base">Project Case Study #${idx + 1}</h4>
            <p class="text-xs text-slate-400">Completed with precision and high-grade materials in ${suburb}.</p>
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- CUSTOMER REVIEWS -->
  <section id="reviews" class="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-xs font-bold text-${config.primaryColor}-500 uppercase tracking-widest mb-3">TESTIMONIALS</h2>
      <h3 class="text-3xl font-black text-white tracking-tight">Customer Reviews</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col gap-4">
        <div class="text-amber-400 font-bold">★★★★★</div>
        <p class="text-xs text-slate-300 leading-relaxed">"Absolute professionals. Arrived promptly in ${suburb} and delivered exceptional service."</p>
        <span class="text-xs font-bold text-white">— Sarah Jenkins</span>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col gap-4">
        <div class="text-amber-400 font-bold">★★★★★</div>
        <p class="text-xs text-slate-300 leading-relaxed">"Transparent quote with zero hidden fees. Highly recommend!"</p>
        <span class="text-xs font-bold text-white">— David Miller</span>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col gap-4">
        <div class="text-amber-400 font-bold">★★★★★</div>
        <p class="text-xs text-slate-300 leading-relaxed">"Prompt, courteous, and exceptionally skilled. Our go-to local service provider."</p>
        <span class="text-xs font-bold text-white">— Michael Chang</span>
      </div>
    </div>
  </section>

  <!-- OUR EXPERT TEAM -->
  <section id="team" class="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-xs font-bold text-${config.primaryColor}-500 uppercase tracking-widest mb-3">EXPERTS</h2>
      <h3 class="text-3xl font-black text-white tracking-tight">Our Expert Team</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden text-center p-6 flex flex-col items-center gap-4">
        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" alt="Team" class="w-24 h-24 rounded-full object-cover border-2 border-${config.primaryColor}-500" />
        <h4 class="font-bold text-white text-base">Robert Vance</h4>
        <span class="text-[10px] font-bold text-${config.primaryColor}-400 uppercase tracking-wider">Master Technician & Lead</span>
        <p class="text-xs text-slate-400">15+ years experience delivering certified local solutions across ${suburb}.</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden text-center p-6 flex flex-col items-center gap-4">
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" alt="Team" class="w-24 h-24 rounded-full object-cover border-2 border-${config.primaryColor}-500" />
        <h4 class="font-bold text-white text-base">Jessica Taylor</h4>
        <span class="text-[10px] font-bold text-${config.primaryColor}-400 uppercase tracking-wider">Operations Manager</span>
        <p class="text-xs text-slate-400">Coordinating rapid dispatch and customer support 24/7.</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden text-center p-6 flex flex-col items-center gap-4">
        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" alt="Team" class="w-24 h-24 rounded-full object-cover border-2 border-${config.primaryColor}-500" />
        <h4 class="font-bold text-white text-base">Liam O'Connor</h4>
        <span class="text-[10px] font-bold text-${config.primaryColor}-400 uppercase tracking-wider">Senior Field Specialist</span>
        <p class="text-xs text-slate-400">Expert in complex installations and preventative maintenance.</p>
      </div>
    </div>
  </section>

  <!-- AREAS WE SERVE -->
  <section id="areas" class="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
    <div class="text-center max-w-2xl mx-auto mb-12">
      <h2 class="text-xs font-bold text-${config.primaryColor}-500 uppercase tracking-widest mb-3">COVERAGE</h2>
      <h3 class="text-3xl font-black text-white tracking-tight">Areas We Serve</h3>
    </div>
    <div class="flex flex-wrap justify-center gap-3">
      ${[suburb, 'City Centre', 'Northside', 'Eastern Suburbs', 'Southside', 'Metro Region'].map(area => `
        <div class="bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300">
          📍 ${area}
        </div>
      `).join('')}
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="py-20 px-8 max-w-4xl mx-auto border-t border-slate-900">
    <div class="text-center mb-16">
      <h2 class="text-xs font-bold text-${config.primaryColor}-500 uppercase tracking-widest mb-3">SUPPORT</h2>
      <h3 class="text-3xl font-black text-white tracking-tight">Frequently Asked Questions</h3>
    </div>
    <div class="space-y-4">
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h4 class="font-bold text-sm text-white mb-2">Do you provide free quotes?</h4>
        <p class="text-xs text-slate-300">Yes, we provide transparent, written quotes with zero hidden fees before starting any work.</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h4 class="font-bold text-sm text-white mb-2">How quickly can you arrive for an appointment?</h4>
        <p class="text-xs text-slate-300">Our local team is ready to assist with prompt response times across ${suburb}.</p>
      </div>
    </div>
  </section>

  <!-- CONTACT FOOTER WITH GOOGLE MAPS -->
  <footer id="contact" class="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div class="flex flex-col gap-6">
        <div>
          <h2 class="text-xs font-bold text-${config.primaryColor}-500 uppercase tracking-widest mb-3">GET IN TOUCH</h2>
          <h3 class="text-3xl font-black text-white tracking-tight">Ready to Get Started?</h3>
          <p class="text-slate-400 text-sm mt-2">Send us a message and we’ll get straight back to you.</p>
        </div>
        <div class="flex flex-col gap-3 text-sm text-slate-300">
          <div>📞 <strong>Phone:</strong> ${phone}</div>
          <div>✉️ <strong>Email:</strong> support@${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.au</div>
          <div>🏢 <strong>Address:</strong> Suite 4, 128 Main Street, ${suburb}</div>
          <div>🕒 <strong>Hours:</strong> Mon - Fri: 7:00am – 5:00pm</div>
        </div>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
        <form onsubmit="event.preventDefault(); alert('Inquiry sent successfully!');" class="flex flex-col gap-4">
          <h4 class="text-base font-bold text-white mb-2">Send a Message</h4>
          <input type="text" required placeholder="Your Name" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" />
          <div class="grid grid-cols-2 gap-4">
            <input type="email" placeholder="Email Address" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" />
            <input type="tel" required placeholder="Phone Number" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" />
          </div>
          <textarea rows="3" required placeholder="Describe your inquiry..." class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"></textarea>
          <button type="submit" class="w-full bg-${config.primaryColor}-600 hover:bg-${config.primaryColor}-500 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-lg">Send Message</button>
        </form>
      </div>
    </div>

    <div class="w-full h-80 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      <iframe 
        width="100%" 
        height="100%" 
        style="border:0;" 
        loading="lazy" 
        allowfullscreen 
        src="https://maps.google.com/maps?q=${encodeURIComponent(suburb + ' service area')} &t=&z=13&ie=UTF8&iwloc=&output=embed">
      </iframe>
    </div>
  </footer>

</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-site.html`;
  a.click();
  URL.revokeObjectURL(url);
}