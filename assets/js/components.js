// assets/js/components.js
const appHeader = `
<header class="fixed top-0 w-full z-50 flex justify-between items-center px-10 py-6 bg-surface/80 backdrop-blur-2xl border-b border-white/5">
  <div class="text-2xl font-extrabold text-[#00F0FF] tracking-tighter flex items-center gap-3 group cursor-pointer">
    <img alt="Forlith Logo" class="w-10 h-10 object-contain group-hover:rotate-180 transition-transform duration-700" src="assets/images/image_2.webp" />
    <span class="font-h1 text-xl uppercase tracking-[0.2em]">Forlith</span>
  </div>

  <nav class="hidden lg:flex items-center gap-10 font-['Space_Grotesk'] editorial-spacing text-[10px] font-bold">
    <a class="text-[#00F0FF] relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-[#00F0FF]" href="index.html">Systems</a>
    <a class="text-zinc-500 hover:text-white transition-colors" href="#">Innovation</a>
    <a class="text-zinc-500 hover:text-white transition-colors" href="#">Architecture</a>
    <a class="text-zinc-500 hover:text-white transition-colors" href="sobre.html">Sobre</a>
    <a class="text-zinc-500 hover:text-white transition-colors" href="contact.html">Contact</a>
  </nav>

  <div class="flex items-center gap-8">
    <div class="hidden sm:flex gap-6 text-zinc-500">
      <span class="material-symbols-outlined text-sm cursor-pointer hover:text-primary-container transition-colors">language</span>
      <span class="material-symbols-outlined text-sm cursor-pointer hover:text-primary-container transition-colors">terminal</span>
    </div>
    <a href="contact.html">
      <button class="bg-white text-black font-['Space_Grotesk'] font-bold text-[9px] tracking-[0.2em] uppercase px-8 py-3 action-button hover:bg-primary-container transition-all">
        Entre em Contato
      </button>
    </a>
  </div>
</header>
`;

const appFooter = `
<footer class="w-full py-20 px-10 bg-[#050505] border-t border-white/5">
  <div class="container mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
      <div class="flex flex-col gap-4">
        <div class="text-2xl font-black text-white flex items-center gap-3">
          <img alt="Forlith Logo" class="w-8 h-8 object-contain" src="assets/images/image_2.webp" />
          <span class="font-h1 text-xl uppercase tracking-[0.2em]">Forlith</span>
        </div>
        <p class="font-['Space_Grotesk'] text-[9px] tracking-[0.3em] uppercase text-zinc-600">
          © 2024 Forlith Systems. Engineered for Infinite Depth.
        </p>
      </div>

      <div class="flex flex-wrap gap-x-12 gap-y-6 font-['Space_Grotesk'] editorial-spacing text-[9px] font-bold">
        <a class="text-zinc-500 hover:text-white transition-colors" href="#">Security Protocols</a>
        <a class="text-zinc-500 hover:text-white transition-colors" href="#">Node Topology</a>
        <a class="text-zinc-500 hover:text-white transition-colors" href="#">Neural Privacy</a>
        <a class="text-zinc-500 hover:text-white transition-colors" href="#">Manifesto</a>
      </div>

      <div class="flex gap-6 text-zinc-600">
        <span class="material-symbols-outlined cursor-pointer hover:text-primary-container hover:scale-110 transition-all">hub</span>
        <span class="material-symbols-outlined cursor-pointer hover:text-primary-container hover:scale-110 transition-all">database</span>
        <span class="material-symbols-outlined cursor-pointer hover:text-primary-container hover:scale-110 transition-all">code</span>
      </div>
    </div>

    <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-mono-data text-zinc-700 tracking-[0.2em] uppercase">
      <span>Uptime Status: Operational</span>
      <span>Version: 2.0.4-delta</span>
      <span>Region: Global / Distributed</span>
    </div>
  </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById('app-header');
  if (headerContainer) headerContainer.outerHTML = appHeader;

  const footerContainer = document.getElementById('app-footer');
  if (footerContainer) footerContainer.outerHTML = appFooter;
});

// Cursor Element
const appCursor = `
<div id="cyber-cursor-dot" class="fixed top-0 left-0 w-2 h-2 bg-primary-container rounded-full pointer-events-none z-[10000] mix-blend-screen opacity-0 transition-opacity duration-300 shadow-[0_0_10px_#00f0ff]"></div>
<div id="cyber-cursor-ring" class="fixed top-0 left-0 w-8 h-8 border border-primary-container/50 rounded-full pointer-events-none z-[9999] transition-all duration-150 ease-out opacity-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]"></div>
`;

/*
document.addEventListener("DOMContentLoaded", () => {
  // Inject Cursor
  document.body.insertAdjacentHTML('beforeend', appCursor);
});
*/
