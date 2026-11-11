/* ==========================================================================
   PROPUESTA B · ITERACIÓN 2 — comportamiento adicional
   1. Carrusel de disciplinas (flechas, teclado, táctil nativo, sin autoplay)
   2. Variante "Nombre en serif" (solo para revisión)
   ========================================================================== */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---- 1. Carrusel ---------------------------------------------------- */

  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector("[data-carousel-track]");
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    const count = root.querySelector("[data-carousel-count]");
    const bar = root.querySelector("[data-carousel-bar]");
    if (!track) return;

    const cards = Array.from(track.children);
    const pad = (n) => String(n).padStart(2, "0");

    const step = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return (cards[0]?.getBoundingClientRect().width || 240) + gap;
    };

    const go = (dir) => {
      track.scrollBy({
        left: dir * step(),
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      const x = track.scrollLeft;
      if (prev) prev.disabled = x <= 2;
      if (next) next.disabled = x >= max - 2;

      const first = Math.min(cards.length, Math.round(x / step()) + 1);
      if (count) count.textContent = `${pad(first)} — ${pad(cards.length)}`;

      if (bar) {
        const size = track.clientWidth / track.scrollWidth;
        const pos = max > 0 ? (x / max) * (1 / size - 1) : 0;
        bar.style.setProperty("--size", size.toFixed(3));
        bar.style.setProperty("--pos", pos.toFixed(3));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    prev?.addEventListener("click", () => go(-1));
    next?.addEventListener("click", () => go(1));

    // Teclado: con el foco en el carrusel, las flechas avanzan de a una tarjeta
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "Home") { e.preventDefault(); track.scrollTo({ left: 0 }); }
      else if (e.key === "End") { e.preventDefault(); track.scrollTo({ left: track.scrollWidth }); }
    });

    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
  });

  /* ---- 2. Variante del nombre (solo revisión) ------------------------- */

  const toggle = document.querySelector("[data-name-variant]");
  if (toggle) {
    const KEY = "pl-name-serif";
    const apply = (on) => {
      document.documentElement.classList.toggle("name-serif", on);
      toggle.setAttribute("aria-pressed", String(on));
    };
    let on = false;
    try { on = sessionStorage.getItem(KEY) === "1"; } catch { /* sin almacenamiento */ }
    // También se puede abrir directo con index-b2.html?nombre=serif
    if (new URLSearchParams(location.search).get("nombre") === "serif") on = true;
    apply(on);
    toggle.addEventListener("click", () => {
      on = !on;
      apply(on);
      try { sessionStorage.setItem(KEY, on ? "1" : "0"); } catch { /* ignorar */ }
    });
  }
})();
