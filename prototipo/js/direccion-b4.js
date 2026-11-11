/* ==========================================================================
   PROPUESTA B · ITERACIÓN 4 — comportamiento adicional
   1. Variante "Logos a color" (solo revisión; también con ?logos=color)
   2. Nombre del programa al tocar un logo en pantallas táctiles
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;

  /* ---- 1. Logos a color ---------------------------------------------- */

  const toggle = document.querySelector("[data-logo-color]");
  if (toggle) {
    const KEY = "pl-logos-color";
    const apply = (on) => {
      root.classList.toggle("logos-color", on);
      toggle.setAttribute("aria-pressed", String(on));
    };
    let on = false;
    try { on = sessionStorage.getItem(KEY) === "1"; } catch { /* sin almacenamiento */ }
    if (new URLSearchParams(location.search).get("logos") === "color") on = true;
    apply(on);
    toggle.addEventListener("click", () => {
      on = !on;
      apply(on);
      try { sessionStorage.setItem(KEY, on ? "1" : "0"); } catch { /* ignorar */ }
    });
  }

  /* ---- 2. Toque en móvil: muestra el nombre un momento --------------- */

  document.querySelectorAll(".dtool").forEach((tool) => {
    let timer;
    tool.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return;
      document.querySelectorAll(".dtool.is-tapped").forEach((t) => t !== tool && t.classList.remove("is-tapped"));
      tool.classList.add("is-tapped");
      clearTimeout(timer);
      timer = setTimeout(() => tool.classList.remove("is-tapped"), 1400);
    });
  });
})();
