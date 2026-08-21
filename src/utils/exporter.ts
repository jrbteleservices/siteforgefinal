export function exportToHtml(businessName: string, phone: string, suburb: string, theme: string) {
  const primaryColor = theme === 'roofing' ? 'red' : theme === 'electrician' ? 'amber' : theme === 'hvac' ? 'cyan' : 'blue';

  const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} - Professional Services in ${suburb}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans selection:bg-${primaryColor}-600 selection:text-white">

  <!-- STICKY NAVIGATION BAR -->
  <header class="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-8 py-4 flex justify-between items-center">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-${primaryColor}-600 flex items-center justify-center font-black text-lg text-white shadow-lg">
        ${businessName.charAt(0)}
      </div>
      <span class="font-extrabold text-lg tracking-tight text-white">${businessName}</span>
    </div>
    
    <nav class="hidden md:flex items-center gap-8 text-xs font-bold text-slate-300 uppercase tracking-wider">
      <a href="#services" class="hover:text-${primaryColor}-400 transition">What We Do</a>
      <a href="#why-us" class="hover:text-${primaryColor}-400 transition">Why Us</a>
      <a href="#projects" class="hover:text-${primaryColor}-400 transition">Recent Projects</a>
      <a href="#areas" class="hover:text-${primaryColor}-400 transition">Areas We Serve</a>
      <a href="#faq" class="hover:text-${primaryColor}-400 transition">FAQ</a>
      <a href="#contact" class="hover:text-${primaryColor}-400 transition">Get in Touch</a>
    </nav>

    <div class="flex items-center gap-3">
      <a href="tel:${phone}" class="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs text-white">
        ${phone}
      </a>
      <a href="#contact" class="bg-${primaryColor}-600 hover:bg-${primaryColor}-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-lg">
        Get a Quote
      </a>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="relative px-8 py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div class="flex flex-col gap-6">
      <div class="inline-flex items-center gap-2 bg-${primaryColor}-600/10 border border-${primaryColor}-500/20 px-3.5 py-1.5 rounded-full text-${primaryColor}-400 text-xs font-bold w-max">
        LICENSED & VERIFIED LOCAL SPECIALISTS
      </div>
      <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
        PROFESSIONAL SERVICES ACROSS <span class="text-${primaryColor}-500">${suburb.toUpperCase()}</span>
      </h1>
      <p class="text-slate-300 text-base max-w-lg">
        Fast response times, upfront transparent pricing, and 24/7 expert maintenance handled by your trusted local team in ${suburb}.
      </p>
      
      <div class="flex flex-wrap gap-4 pt-2">
        <a href="#contact" class="bg-${primaryColor}-600 hover:bg-${primaryColor}-500 text-white font-bold py-4 px-8 rounded-2xl text-sm transition shadow-xl">
          Get a Free Quote
        </a>
        <a href="tel:${phone}" class="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold py-4 px-8 rounded-2xl text-sm transition">
          Call ${phone}
        </a>
      </div>
    </div>

    <div class="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col gap-6 shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <span class="font-bold text-sm text-white">Live Service Status in ${suburb}</span>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
      </div>
      <div class="space-y-3">
        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
          ⚡ Average dispatch time: <span class="text-emerald-400 font-bold">28 minutes</span>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES SECTION -->
  <section id="services" class="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-xs font-bold text-${primaryColor}-500 uppercase tracking-widest mb-3">OUR CAPABILITIES</h2>
      <h3 class="text-3xl font-black text-white tracking-tight">What We Do</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl flex flex-col gap-4">
        <h4 class="text-lg font-bold text-white">Emergency Repairs & Diagnosis</h4>
        <p class="text-slate-400 text-xs leading-relaxed">Rapid diagnosis and resolution of urgent residential issues.</p>
      </div>
      <div class="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl flex flex-col gap-4">
        <h4 class="text-lg font-bold text-white">Scheduled Maintenance</h4>
        <p class="text-slate-400 text-xs leading-relaxed">Preventative care and routine servicing for long-term reliability.</p>
      </div>
      <div class="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl flex flex-col gap-4">
        <h4 class="text-lg font-bold text-white">System Upgrades</h4>
        <p class="text-slate-400 text-xs leading-relaxed">Modern installation and compliance checks by certified professionals.</p>
      </div>
    </div>
  </section>

  <!-- CONTACT FOOTER -->
  <footer id="contact" class="py-20 px-8 max-w-7xl mx-auto border-t border-slate-900 grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div class="flex flex-col gap-6">
      <div>
        <h2 class="text-xs font-bold text-${primaryColor}-500 uppercase tracking-widest mb-3">GET IN TOUCH</h2>
        <h3 class="text-3xl font-black text-white tracking-tight">Ready to Get Started?</h3>
        <p class="text-slate-400 text-sm mt-2">Send us a message and we’ll get straight back to you.</p>
      </div>
    </div>
    <div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
      <form onsubmit="event.preventDefault(); alert('Message sent successfully!');" class="flex flex-col gap-4">
        <input type="text" required placeholder="Your Name" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" />
        <input type="tel" required placeholder="Phone Number" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" />
        <textarea rows="3" required placeholder="How can we help?" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"></textarea>
        <button type="submit" class="w-full bg-${primaryColor}-600 hover:bg-${primaryColor}-500 text-white font-bold py-3.5 rounded-xl text-xs">Send Message</button>
      </form>
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