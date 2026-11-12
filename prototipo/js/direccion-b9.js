/* ==========================================================================
   PROPUESTA B · ITERACIÓN 9 — selectores de revisión
   Nombre: peso / tamano / mixto     Acento: oblicua / recta
   También por URL: index-b9.html?nombre=tamano&acento=recta
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;
  const params = new URLSearchParams(location.search);

  const group = (attr, prefix, values, fallback) => {
    const buttons = document.querySelectorAll(`[data-b9-${attr}]`);
    const key = `pl-b9-${attr}`;

    const apply = (value) => {
      values.forEach((v) => root.classList.toggle(`${prefix}-${v}`, v === value));
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset[`b9${attr[0].toUpperCase()}${attr.slice(1)}`] === value)));
    };

    let value = fallback;
    try { value = sessionStorage.getItem(key) || value; } catch { /* sin almacenamiento */ }
    if (values.includes(params.get(attr))) value = params.get(attr);
    if (!values.includes(value)) value = fallback;
    apply(value);

    buttons.forEach((b) => b.addEventListener("click", () => {
      value = b.dataset[`b9${attr[0].toUpperCase()}${attr.slice(1)}`];
      apply(value);
      try { sessionStorage.setItem(key, value); } catch { /* ignorar */ }
    }));
  };

  group("nombre", "nombre", ["peso", "tamano", "mixto"], "peso");
  group("acento", "acento", ["oblicua", "recta"], "oblicua");
})();
