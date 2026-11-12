/* ==========================================================================
   PROPUESTA B · ITERACIÓN 10 — selectores de revisión
   Nombre: serif / mixto   Serif: bodoni / playfair   Sans: manrope / instrument / dm / hanken
   También por URL: index-b10.html?nombre=mixto&serif=playfair
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;
  const params = new URLSearchParams(location.search);

  const group = (attr, values) => {
    const buttons = document.querySelectorAll(`[data-b10-${attr}]`);
    const key = `pl-b10-${attr}`;
    const read = (b) => b.getAttribute(`data-b10-${attr}`);

    const apply = (value) => {
      values.forEach((v) => root.classList.toggle(`${attr}-${v}`, v === value));
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(read(b) === value)));
    };

    let value = values[0];
    try { value = sessionStorage.getItem(key) || value; } catch { /* sin almacenamiento */ }
    if (values.includes(params.get(attr))) value = params.get(attr);
    if (!values.includes(value)) value = values[0];
    apply(value);

    buttons.forEach((b) => b.addEventListener("click", () => {
      value = read(b);
      apply(value);
      try { sessionStorage.setItem(key, value); } catch { /* ignorar */ }
    }));
  };

  group("nombre", ["serif", "mixto"]);
  group("serif", ["bodoni", "playfair"]);
  group("sans", ["manrope", "instrument", "dm", "hanken"]);
})();
