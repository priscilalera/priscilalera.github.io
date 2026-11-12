/* ==========================================================================
   PROPUESTA B · ITERACIÓN 11 — selectores de revisión
   Nombre: serif / mixto   Peso: actual / 450 / 400   Color: ninguno / lera / lera-oscuro / priscila
   También por URL: index-b11.html?nombre=serif&peso=450
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;
  const params = new URLSearchParams(location.search);

  const group = (attr, values, fallback) => {
    const buttons = document.querySelectorAll(`[data-b11-${attr}]`);
    const key = `pl-b11-${attr}-v2`;  /* v2: el color elegido pasa a ser el predeterminado */
    const read = (b) => b.getAttribute(`data-b11-${attr}`);

    const apply = (value) => {
      values.forEach((v) => root.classList.toggle(`${attr}-${v}`, v === value));
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(read(b) === value)));
    };

    let value = fallback;
    try { value = sessionStorage.getItem(key) || value; } catch { /* sin almacenamiento */ }
    if (values.includes(params.get(attr))) value = params.get(attr);
    if (!values.includes(value)) value = fallback;
    apply(value);

    buttons.forEach((b) => b.addEventListener("click", () => {
      value = read(b);
      apply(value);
      try { sessionStorage.setItem(key, value); } catch { /* ignorar */ }
    }));
  };

  group("nombre", ["serif", "mixto"], "mixto");
  group("peso", ["actual", "450", "400"], "actual");
  group("color", ["ninguno", "lera", "lera-oscuro", "priscila"], "lera-oscuro");
  group("lienzo", ["actual", "puntos", "cursor"], "cursor");
  group("eco", ["con", "sin"], "con");
})();

/* ==========================================================================
   Motion del hero (B11): Lera / Cursor / Paleta, cada uno prende o apaga.
   Por URL: ?motion=tinta,paleta   (o ?motion=ninguno)
   ========================================================================== */
(() => {
  "use strict";

  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const KEY = "pl-b11-motion-v2"; // v2: eligió el cursor como único efecto
  const ALL = ["tinta", "cursor", "paleta"];
  const buttons = document.querySelectorAll("[data-b11-motion]");

  let on = ["cursor"]; // elegido
  try { const s = sessionStorage.getItem(KEY); if (s !== null) on = s ? s.split(",") : []; } catch { /* ignorar */ }
  const p = new URLSearchParams(location.search).get("motion");
  if (p !== null) on = p.split(",").filter((v) => ALL.includes(v));
  on = on.filter((v) => ALL.includes(v));

  const save = () => { try { sessionStorage.setItem(KEY, on.join(",")); } catch { /* ignorar */ } };
  const sync = () => {
    ALL.forEach((v) => root.classList.toggle(`mo-${v}`, on.includes(v)));
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(on.includes(b.dataset.b11Motion))));
  };

  /* ---- 1. Lera: se tiñe cuando terminó de subir --------------------- */
  const playTinta = (delay) => {
    root.classList.remove("mo-tinta-play");
    if (reduce) { root.classList.add("mo-tinta-play"); return; }
    setTimeout(() => root.classList.add("mo-tinta-play"), delay);
  };

  /* ---- 2. Cursor: estira la esquina del frame y la suelta ------------ */
  const size = document.querySelector(".canvas__size");
  const W = 368, H = 460, DW = 18, DH = 22, DUR = 2200;
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
  const amount = (t) => (t < 0.4 ? ease(t / 0.4) : t < 0.62 ? 1 : 1 - ease((t - 0.62) / 0.38));
  let cursorTimer;
  const playCursor = (delay) => {
    clearTimeout(cursorTimer);
    root.classList.remove("mo-cursor-play");
    if (reduce || !size) return;
    cursorTimer = setTimeout(() => {
      void root.offsetWidth; // reinicia la animación si se vuelve a prender
      root.classList.add("mo-cursor-play");
      const t0 = performance.now();
      const tick = (now) => {
        const t = Math.min((now - t0) / DUR, 1);
        const k = amount(t);
        size.textContent = `${Math.round(W + DW * k)} × ${Math.round(H + DH * k)}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  };

  /* ---- 3. Paleta: la tarjeta recorre los colores al pasar el cursor --- */
  const chip = document.querySelector(".canvas__chip");
  const swatch = chip?.querySelector(".canvas__chip-swatch");
  const cname = chip?.querySelector(".canvas__chip-name");
  const chex = chip?.querySelector(".canvas__chip-hex");
  const PALETTE = [
    ["butter", "#F2DF9B"], ["blush", "#F6E6EA"], ["mauve", "#AD7D8B"],
    ["mauve-deep", "#87596A"], ["ink", "#1C1C1C"],
  ];
  let idx = 0, cycle;
  const show = (i) => {
    idx = i % PALETTE.length;
    const [n, h] = PALETTE[idx];
    swatch.style.backgroundColor = h;
    cname.textContent = n;
    chex.textContent = h;
  };
  const stopCycle = () => {
    clearInterval(cycle); cycle = null;
    chip.classList.remove("is-cycling");
    swatch.style.backgroundColor = ""; // vuelve al color del CSS (butter)
    show(0); swatch.style.backgroundColor = "";
  };
  if (chip && swatch && cname && chex) {
    chip.addEventListener("pointerenter", (e) => {
      if (!on.includes("paleta") || e.pointerType !== "mouse" || cycle) return;
      chip.classList.add("is-cycling");
      show(idx + 1);
      cycle = setInterval(() => show(idx + 1), 900);
    });
    chip.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && cycle) stopCycle(); });
    // Toque: cada toque pasa al color siguiente
    chip.addEventListener("pointerup", (e) => {
      if (!on.includes("paleta") || e.pointerType === "mouse") return;
      show(idx + 1);
    });
  }

  /* ---- Barra ---------------------------------------------------------- */
  buttons.forEach((b) => b.addEventListener("click", () => {
    const v = b.dataset.b11Motion;
    on = on.includes(v) ? on.filter((x) => x !== v) : [...on, v];
    sync(); save();
    if (v === "tinta" && on.includes("tinta")) playTinta(450);
    if (v === "cursor" && on.includes("cursor")) playCursor(200);
    if (v === "cursor" && !on.includes("cursor")) { clearTimeout(cursorTimer); root.classList.remove("mo-cursor-play"); if (size) size.textContent = `${W} × ${H}`; }
    if (v === "paleta" && !on.includes("paleta") && chip) stopCycle();
  }));

  sync();
  // Al cargar: después de la entrada de las letras (≈1.2 s) y del marco (≈3.6 s)
  if (on.includes("tinta")) playTinta(1250); else root.classList.add("mo-tinta-play");
  if (on.includes("cursor")) playCursor(3700);
})();

/* ---- Lienzo: la linterna de puntos sigue al mouse dentro del hero ------ */
(() => {
  "use strict";
  const hero = document.querySelector(".hero-b");
  if (!hero) return;
  let frame;
  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || !document.documentElement.classList.contains("lienzo-cursor")) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
      hero.classList.add("is-pointing");
    });
  });
  hero.addEventListener("pointerleave", () => hero.classList.remove("is-pointing"));
})();
