/* ==========================================================================
   HOME — comportamiento propio de la página principal
   (main.js se ocupa de lo común a todas las páginas: header, menú,
   navegación activa, aparición al scroll, copiar email.)

   1. Carrusel de disciplinas (flechas, teclado, táctil nativo, sin autoplay)
   2. Cinta de programas: loop continuo; se detiene con cursor, foco o toque
   3. Hero: el cursor estira el marco de la foto y lo suelta (una sola vez)
   (La linterna de puntos del hero vive en main.js: la comparten los casos.)

   Con "reducir movimiento": sin cinta en movimiento ni animación del cursor.
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---- 1. Carrusel de disciplinas ------------------------------------ */

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const count = carousel.querySelector("[data-carousel-count]");
    const bar = carousel.querySelector("[data-carousel-bar]");
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

  /* ---- 2. Cinta de programas ----------------------------------------- *
   * Se clona el grupo las veces necesarias para que nunca quede espacio
   * vacío; el desplazamiento es exactamente un grupo + un espacio, así el
   * bucle no salta. Velocidad en px/s: atributo data-ribbon-speed.       */

  const DEFAULT_SPEED = 26;

  document.querySelectorAll("[data-ribbon]").forEach((ribbon) => {
    const viewport = ribbon.querySelector(".ribbon__viewport");
    const rail = ribbon.querySelector("[data-ribbon-rail]");
    const group = ribbon.querySelector("[data-ribbon-group]");
    if (!viewport || !rail || !group) return;

    const clear = () => rail.querySelectorAll("[data-ribbon-clone]").forEach((c) => c.remove());

    const build = () => {
      clear();
      const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
      const loop = group.getBoundingClientRect().width + gap;
      const copies = Math.ceil(viewport.clientWidth / loop) + 1;
      for (let i = 0; i < copies; i++) {
        const clone = group.cloneNode(true);
        clone.removeAttribute("data-ribbon-group");
        clone.removeAttribute("role");
        clone.setAttribute("data-ribbon-clone", "");
        clone.setAttribute("aria-hidden", "true");
        rail.append(clone);
      }
      const speed = Number(ribbon.dataset.ribbonSpeed) || DEFAULT_SPEED;
      ribbon.style.setProperty("--ribbon-loop", `${loop}px`);
      ribbon.style.setProperty("--ribbon-dur", `${(loop / speed).toFixed(1)}s`);
    };

    const start = () => { build(); ribbon.classList.add("is-running"); };
    const stop = () => { ribbon.classList.remove("is-running", "is-holding"); clear(); };

    // Toque: se detiene mientras el dedo está apoyado y un momento después
    let holdTimer;
    viewport.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      clearTimeout(holdTimer);
      ribbon.classList.add("is-holding");
    });
    const release = () => {
      clearTimeout(holdTimer);
      holdTimer = setTimeout(() => ribbon.classList.remove("is-holding"), 2500);
    };
    viewport.addEventListener("pointerup", release);
    viewport.addEventListener("pointercancel", release);

    let resizeTimer;
    window.addEventListener("resize", () => {
      if (!ribbon.classList.contains("is-running")) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    });

    reduceMotion.addEventListener?.("change", () => (reduceMotion.matches ? stop() : start()));

    // Medir con las tipografías ya cargadas (cambian el ancho de los nombres)
    (document.fonts?.ready || Promise.resolve()).then(() => {
      if (!reduceMotion.matches) start();
    });
  });

  /* ---- 3. El cursor estira el marco de la foto ----------------------- *
   * Cuando el marco ya quedó seleccionado (≈3.7 s), se agrega .cursor-play
   * (animación en direccion-b11.css) y la medida cuenta 368 × 460 → 386 × 482
   * y vuelve, al mismo ritmo que el marco.                                */

  const size = document.querySelector(".canvas__size");
  if (size && !reduceMotion.matches) {
    const W = 368, H = 460, DW = 18, DH = 22, DUR = 2200;
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    // Igual que los keyframes: crece hasta el 40 %, se sostiene hasta el 62 %, vuelve
    const amount = (t) => (t < 0.4 ? ease(t / 0.4) : t < 0.62 ? 1 : 1 - ease((t - 0.62) / 0.38));

    setTimeout(() => {
      root.classList.add("cursor-play");
      const t0 = performance.now();
      const tick = (now) => {
        // El primer cuadro puede traer una hora algo anterior a t0: se limita a 0–1
        const t = Math.min(Math.max((now - t0) / DUR, 0), 1);
        const k = amount(t);
        size.textContent = `${Math.round(W + DW * k)} × ${Math.round(H + DH * k)}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 3700);
  }

  // La linterna de puntos del hero está en main.js (bloque "Lienzo"),
  // porque también la usan las portadas de los casos de estudio.
})();
