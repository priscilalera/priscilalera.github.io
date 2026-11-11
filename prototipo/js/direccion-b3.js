/* ==========================================================================
   PROPUESTA B · ITERACIÓN 3 — comportamiento adicional
   1. Selector de serif (Ogg / Canela) y aviso si la fuente no está disponible
   2. Rotación de los logos al tocar en pantallas táctiles (sin animación permanente)
   El carrusel y el copiado de email vienen de direccion-b2.js y main.js.
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;

  /* ---- 1. Serif de prueba -------------------------------------------- */

  const FAMILIES = {
    ogg:    { css: "Ogg Prueba",    name: "Ogg" },
    canela: { css: "Canela Prueba", name: "Canela" },
  };
  const buttons = document.querySelectorAll("[data-type]");
  const note = document.querySelector("[data-type-note]");
  const KEY = "pl-serif";

  // Intenta cargar cada cara (redonda e itálica) y devuelve si alguna funcionó
  const isAvailable = async (family) => {
    const faces = [...document.fonts].filter((f) => f.family.replace(/["']/g, "") === family);
    if (!faces.length) return false;
    const results = await Promise.allSettled(faces.map((f) => f.load()));
    return results.some((r) => r.status === "fulfilled");
  };

  const apply = async (key) => {
    Object.keys(FAMILIES).forEach((k) => root.classList.toggle(`type-${k}`, k === key));
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.type === key)));
    if (!note) return;
    const ok = await isAvailable(FAMILIES[key].css);
    note.hidden = ok;
    note.textContent = ok ? "" :
      `${FAMILIES[key].name} no está disponible en esta computadora: se ve la serif genérica del navegador. ` +
      "Ver prototipo/LEEME.md → Tipografías de prueba.";
  };

  let current = "ogg";
  try { current = sessionStorage.getItem(KEY) || current; } catch { /* sin almacenamiento */ }
  const param = new URLSearchParams(location.search).get("serif");
  if (param && FAMILIES[param]) current = param;
  if (!FAMILIES[current]) current = "ogg";
  apply(current);

  buttons.forEach((b) => b.addEventListener("click", () => {
    current = b.dataset.type;
    apply(current);
    try { sessionStorage.setItem(KEY, current); } catch { /* ignorar */ }
  }));

  /* ---- 2. Logos: equivalente táctil del hover ------------------------ */

  document.querySelectorAll(".tool").forEach((tool) => {
    let timer;
    tool.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      tool.classList.add("is-tapped");
      clearTimeout(timer);
      timer = setTimeout(() => tool.classList.remove("is-tapped"), 450);
    });
  });
})();

/* ---- 3. Cinta de programas: botón de pausa y toque en móvil --------- */

(() => {
  "use strict";

  document.querySelectorAll("[data-marquee]").forEach((marquee) => {
    const btn = marquee.querySelector("[data-marquee-toggle]");
    const label = marquee.querySelector("[data-marquee-label]");
    btn?.addEventListener("click", () => {
      const paused = marquee.classList.toggle("is-paused");
      btn.setAttribute("aria-pressed", String(paused));
      if (label) label.textContent = paused ? "Reanudar" : "Pausar";
    });

    marquee.querySelectorAll(".prog").forEach((prog) => {
      let timer;
      prog.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "mouse") return;
        prog.classList.add("is-tapped");
        clearTimeout(timer);
        timer = setTimeout(() => prog.classList.remove("is-tapped"), 450);
      });
    });
  });
})();
