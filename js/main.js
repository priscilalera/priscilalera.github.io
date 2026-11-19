/* ==========================================================================
   main.js — interacciones del sitio (sin dependencias)
   Cada bloque es independiente: si un elemento no existe en la página,
   el bloque simplemente no hace nada.
   ========================================================================== */

(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");

  /* ---- 1. Header: fondo al hacer scroll, ocultar al bajar, modo oscuro ---- */

  if (header) {
    const darkSurfaces = [...document.querySelectorAll('main [data-surface="stage"], body > footer[data-surface="stage"]')];
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 8);

      const goingDown = y > lastY;
      const pastHero = y > window.innerHeight * 0.6;
      header.classList.toggle("is-hidden", goingDown && pastHero);
      lastY = y;

      const probe = header.offsetHeight / 2;
      const onDark = darkSurfaces.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      header.classList.toggle("is-on-dark", onDark);
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ---- 2. Menú mobile ------------------------------------------------ */

  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    const label = toggle.querySelector(".nav-toggle__label");
    const outside = [document.querySelector("main"), document.querySelector("body > footer")].filter(Boolean);

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      header?.classList.toggle("nav-is-open", open);
      if (label) label.textContent = open ? "Cerrar" : "Menú";
      root.style.overflow = open ? "hidden" : "";
      outside.forEach((el) => (el.inert = open));
    };

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));

    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia("(min-width: 54.0625rem)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /* ---- 3. Navegación activa según la sección visible ----------------- */

  const spy = (links) => {
    const map = new Map();
    links.forEach((link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      const section = id && document.getElementById(id);
      if (section) map.set(section, link);
    });
    if (!map.size || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target);
        if (!entry.isIntersecting) return;
        links.forEach((l) => { l.classList.remove("is-active"); l.removeAttribute("aria-current"); });
        link.classList.add("is-active");
        link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    map.forEach((_, section) => io.observe(section));
  };

  spy([...document.querySelectorAll('.site-nav a[href^="#"]')]);
  spy([...document.querySelectorAll("[data-toc] a")]);

  /* ---- 4. Aparición al hacer scroll ---------------------------------- */

  document.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
    [...group.children].forEach((child, i) => child.style.setProperty("--i", i));
  });

  const revealables = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-in"));
  }

  /* ---- 5. Copiar email ----------------------------------------------- */

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    const labelEl = btn.querySelector("[data-copy-label]");
    const status = btn.parentElement.querySelector("[data-copy-status]");
    const original = labelEl?.textContent;
    let timer;

    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        const tmp = document.createElement("textarea");
        tmp.value = text;
        tmp.setAttribute("readonly", "");
        tmp.style.position = "absolute";
        tmp.style.left = "-9999px";
        document.body.append(tmp);
        tmp.select();
        try { ok = document.execCommand("copy"); } catch { ok = false; }
        tmp.remove();
      }

      const message = ok ? "Email copiado" : "No se pudo copiar";
      if (labelEl) labelEl.textContent = ok ? "¡Copiado!" : message;
      if (status) status.textContent = message;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (labelEl) labelEl.textContent = original;
        if (status) status.textContent = "";
      }, 2200);
    });
  });

  /* ---- 7. Lienzo: linterna de puntos que sigue al mouse ----------------- *
   * En cualquier bloque con data-lienzo (hero de la home, portada de los
   * casos). Solo con mouse; la grilla y la linterna se dibujan en CSS.    */

  document.querySelectorAll("[data-lienzo]").forEach((area) => {
    let frame;
    area.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = area.getBoundingClientRect();
        area.style.setProperty("--mx", `${e.clientX - r.left}px`);
        area.style.setProperty("--my", `${e.clientY - r.top}px`);
        area.classList.add("is-pointing");
      });
    });
    area.addEventListener("pointerleave", () => area.classList.remove("is-pointing"));
  });
})();
