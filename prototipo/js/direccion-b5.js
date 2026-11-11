/* ==========================================================================
   PROPUESTA B · ITERACIÓN 5 — selector de paleta (solo revisión)
   Cambia la clase de <html> y actualiza los textos que nombran colores
   (tarjeta del hero y muestras de la tarjeta de tokens).
   También con ?paleta=violeta | amarillo | mixta
   ========================================================================== */

(() => {
  "use strict";

  const PALETTES = {
    violeta: {
      chip: { name: "periwinkle", hex: "#8995C5" },
      swatches: [
        { name: "periwinkle", hex: "#8995C5", use: "Interacción · 5.8:1" },
        { name: "lavender",   hex: "#E7E9F4", use: "Superficie" },
      ],
    },
    amarillo: {
      chip: { name: "butter", hex: "#F2DF9B" },
      swatches: [
        { name: "butter", hex: "#F2DF9B", use: "Resaltado · 12.8:1" },
        { name: "cream",  hex: "#F5EFDD", use: "Superficie" },
      ],
    },
    mixta: {
      chip: { name: "butter", hex: "#F2DF9B" },
      swatches: [
        { name: "periwinkle", hex: "#8995C5", use: "Selección · 5.8:1" },
        { name: "butter",     hex: "#F2DF9B", use: "Resaltado · 12.8:1" },
        { name: "lavender",   hex: "#E7E9F4", use: "Superficie" },
      ],
    },
  };

  const root = document.documentElement;
  const buttons = document.querySelectorAll("[data-palette]");
  const chipName = document.querySelector(".canvas__chip-name");
  const chipHex = document.querySelector(".canvas__chip-hex");
  const list = document.querySelector(".system-card .swatches");
  const fixed = list ? [...list.children].slice(0, 4) : []; // paper, ink, mauve, mauve-deep
  const KEY = "pl-palette";

  const swatch = ({ name, hex, use }) => {
    const li = document.createElement("li");
    li.className = "swatch";
    li.style.setProperty("--sw", hex);
    li.innerHTML =
      `<span class="swatch__chip"></span><span class="swatch__name mono">${name}</span>` +
      `<span class="swatch__hex mono">${hex}</span><span class="swatch__use">${use}</span>`;
    return li;
  };

  const apply = (key) => {
    const p = PALETTES[key];
    Object.keys(PALETTES).forEach((k) => root.classList.toggle(`pal-${k}`, k === key));
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.palette === key)));
    if (chipName) chipName.textContent = p.chip.name;
    if (chipHex) chipHex.textContent = p.chip.hex;
    if (list) list.replaceChildren(...fixed, ...p.swatches.map(swatch));
  };

  let current = "violeta";
  try { current = sessionStorage.getItem(KEY) || current; } catch { /* sin almacenamiento */ }
  const param = new URLSearchParams(location.search).get("paleta");
  if (param && PALETTES[param]) current = param;
  if (!PALETTES[current]) current = "violeta";
  apply(current);

  buttons.forEach((b) => b.addEventListener("click", () => {
    current = b.dataset.palette;
    apply(current);
    try { sessionStorage.setItem(KEY, current); } catch { /* ignorar */ }
  }));
})();
