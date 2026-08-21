export function exportToHtml(businessName: string, phone: string, suburb: string, theme: string) {
  let htmlContent = '';
  
  if (theme === 'plumbing') {
    htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} - Emergency Plumber in ${suburb}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white font-sans">
  <header class="p-6 flex justify-between items-center border-b border-slate-800 bg-slate-900/50">
    <h1 class="text-xl font-black text-blue-500">${businessName}</h1>
    <a href="tel:${phone}" class="bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl font-bold text-sm">
      Call 24/7: ${phone}
    </a>
  </header>
  <main class="py-20 px-6 max-w-4xl mx-auto text-center">
    <span class="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/20">
      Emergency Response in ${suburb}
    </span>
    <h2 class="text-4xl md:text-6xl font-black tracking-tight mt-6 mb-4">
      Reliable Emergency Plumbers in ${suburb}
    </h2>
    <p class="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
      Fast response times, upfront transparent pricing, and expert local service for all your plumbing needs.
    </p>
    <div class="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md mx-auto text-left shadow-xl">
      <h3 class="text-lg font-bold text-white mb-4">Request a Free Callback</h3>
      <form onsubmit="event.preventDefault(); alert('Lead submitted successfully!');" class="flex flex-col gap-4">
        <div>
          <label class="text-xs font-bold text-slate-400 uppercase">Your Name</label>
          <input type="text" required placeholder="John Smith" class="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="text-xs font-bold text-slate-400 uppercase">Phone Number</label>
          <input type="tel" required placeholder="0400 000 000" class="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-blue-500">
        </div>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold text-sm text-white shadow-lg shadow-blue-600/20">
          Submit Lead
        </button>
      </form>
    </div>
  </main>
</body>
</html>`;
  } else {
    htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} - Roofing in ${suburb}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white font-sans">
  <header class="p-6 flex justify-between items-center border-b border-slate-800 bg-slate-950/50">
    <h1 class="text-xl font-black text-orange-500">${businessName}</h1>
    <a href="tel:${phone}" class="bg-orange-600 hover:bg-orange-500 px-5 py-2.5 rounded-xl font-bold text-sm">
      Emergency Call: ${phone}
    </a>
  </header>
  <main class="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div>
      <span class="bg-orange-500/10 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-orange-500/20">
        Licensed & Insured Roof Restorations in ${suburb}
      </span>
      <h2 class="text-4xl md:text-5xl font-black tracking-tight mt-6 mb-4">
        Protect Your Home With Expert Roofing in ${suburb}
      </h2>
      <p class="text-slate-400 text-lg mb-8">
        Tile and metal roof repairs, leak detection, restorations, and complete re-roofing by certified local professionals.
      </p>
    </div>
    <div class="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-left shadow-xl">
      <h3 class="text-lg font-bold text-white mb-4">Request a Free Callback</h3>
      <form onsubmit="event.preventDefault(); alert('Lead submitted successfully!');" class="flex flex-col gap-4">
        <div>
          <label class="text-xs font-bold text-slate-400 uppercase">Your Name</label>
          <input type="text" required placeholder="John Smith" class="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500">
        </div>
        <div>
          <label class="text-xs font-bold text-slate-400 uppercase">Phone Number</label>
          <input type="tel" required placeholder="0400 000 000" class="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-orange-500">
        </div>
        <button type="submit" class="w-full bg-orange-600 hover:bg-orange-500 py-3 rounded-xl font-bold text-sm text-white shadow-lg shadow-orange-600/20">
          Submit Lead
        </button>
      </form>
    </div>
  </main>
</body>
</html>`;
  }

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${businessName.toLowerCase().replace(/\s+/g, '-')}-site.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}