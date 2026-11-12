/* ==========================================================================
   PROPUESTA B · ITERACIÓN 6
   1. Selector de paleta (solo revisión; también ?paleta=...)
   2. Cinta de logotipos: loop continuo sin saltos, con pausa accesible
   ========================================================================== */

(() => {
  "use strict";

  /* ---- 1. Paletas ---------------------------------------------------- */

  const PALETTES = {
    "amarillo": {
      chip: { name: "butter", hex: "#F2DF9B" },
      swatches: [
        { name: "butter", hex: "#F2DF9B", use: "Resaltado · 12.8:1" },
        { name: "cream",  hex: "#F5EFDD", use: "Superficie" },
      ],
    },
    "rosa-amarillo": {
      chip: { name: "butter", hex: "#F2DF9B" },
      swatches: [
        { name: "butter", hex: "#F2DF9B", use: "Resaltado · 12.8:1" },
        { name: "blush",  hex: "#F6E6EA", use: "Superficie" },
      ],
    },
    "rosa": {
      chip: { name: "pink", hex: "#F3CFD8" },
      swatches: [
        { name: "pink",  hex: "#F3CFD8", use: "Resaltado · 12.0:1" },
        { name: "blush", hex: "#F6E6EA", use: "Superficie" },
      ],
    },
  };

  const root = document.documentElement;
  const palButtons = document.querySelectorAll("[data-palette]");
  const chipName = document.querySelector(".canvas__chip-name");
  const chipHex = document.querySelector(".canvas__chip-hex");
  const list = document.querySelector(".system-card .swatches");
  const fixed = list ? [...list.children].slice(0, 4) : [];
  const PKEY = "pl-palette-b6";

  const swatch = ({ name, hex, use }) => {
    const li = document.createElement("li");
    li.className = "swatch";
    li.style.setProperty("--sw", hex);
    li.innerHTML =
      `<span class="swatch__chip"></span><span class="swatch__name mono">${name}</span>` +
      `<span class="swatch__hex mono">${hex}</span><span class="swatch__use">${use}</span>`;
    return li;
  };

  const applyPalette = (key) => {
    const p = PALETTES[key];
    Object.keys(PALETTES).forEach((k) => root.classList.toggle(`pal-${k}`, k === key));
    palButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.palette === key)));
    if (chipName) chipName.textContent = p.chip.name;
    if (chipHex) chipHex.textContent = p.chip.hex;
    if (list) list.replaceChildren(...fixed, ...p.swatches.map(swatch));
  };

  let pal = "rosa-amarillo";
  try { pal = sessionStorage.getItem(PKEY) || pal; } catch { /* sin almacenamiento */ }
  const param = new URLSearchParams(location.search).get("paleta");
  if (param && PALETTES[param]) pal = param;
  if (!PALETTES[pal]) pal = "rosa-amarillo";
  applyPalette(pal);
  palButtons.forEach((b) => b.addEventListener("click", () => {
    pal = b.dataset.palette;
    applyPalette(pal);
    try { sessionStorage.setItem(PKEY, pal); } catch { /* ignorar */ }
  }));

  /* ---- 2. Cinta de logotipos ----------------------------------------- */

  const SPEED = 26; // px por segundo: lento y uniforme en cualquier ancho
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("[data-ribbon]").forEach((ribbon) => {
    const viewport = ribbon.querySelector(".ribbon__viewport");
    const rail = ribbon.querySelector("[data-ribbon-rail]");
    const group = ribbon.querySelector("[data-ribbon-group]");
    const toggle = ribbon.querySelector("[data-ribbon-toggle]");
    const label = ribbon.querySelector("[data-ribbon-label]");
    if (!viewport || !rail || !group) return;

    const clear = () => rail.querySelectorAll("[data-ribbon-clone]").forEach((c) => c.remove());

    // Copias suficientes para que nunca quede espacio vacío, sea cual sea el ancho
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
      ribbon.style.setProperty("--ribbon-loop", `${loop}px`);
      const speed = Number(ribbon.dataset.ribbonSpeed) || SPEED; // B11 la ajusta desde el HTML
      ribbon.style.setProperty("--ribbon-dur", `${(loop / speed).toFixed(1)}s`);
    };

    const start = () => {
      build();
      ribbon.classList.add("is-running");
      if (toggle) toggle.hidden = false;
    };
    const stop = () => {
      ribbon.classList.remove("is-running", "is-paused", "is-holding");
      clear();
      if (toggle) toggle.hidden = true;
    };

    toggle?.addEventListener("click", () => {
      const paused = ribbon.classList.toggle("is-paused");
      toggle.setAttribute("aria-pressed", String(paused));
      if (label) label.textContent = paused ? "Reanudar" : "Pausar";
    });

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

    reduce.addEventListener?.("change", () => (reduce.matches ? stop() : start()));

    // Medir con las tipografías ya cargadas (cambian el ancho de los nombres)
    (document.fonts?.ready || Promise.resolve()).then(() => {
      if (!reduce.matches) start();
    });
  });
})();

/* ---- 3. Foto del hero: alternativas para comparar (solo revisión) ------ *
 * index-b6.html?foto=13 | 16 | 21 | 22                                    */
(() => {
  "use strict";
  const n = new URLSearchParams(location.search).get("foto");
  const img = document.querySelector(".canvas__photo");
  if (!img || !n || !/^(13|16|21|22)$/.test(n)) return;
  img.src = n === "21" ? "assets/img/retrato.jpg" : `assets/img/retrato-${n}.jpg`;
})();
