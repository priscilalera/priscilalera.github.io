# Prototipo navegable — v0.1

Primera versión visual y funcional del portfolio. Sin dependencias ni instalación.

## Cómo verlo

Abrí `index.html` con doble clic (Chrome o Edge recomendados).
Para probar las transiciones entre páginas, abrilo desde un servidor local
(por ejemplo, la extensión **Live Server** de VS Code): con `file://` el navegador las desactiva.

## Propuestas en evaluación

- `index.html` — **Propuesta A**: Instrument Serif + Geist (dirección editorial).
- `index-b.html` — **Propuesta B**: Manrope + DM Sans, hero animado con "lienzo".
  Usa los mismos archivos que A más `css/direccion-b.css`, que se carga encima.
  El botón de abajo a la derecha alterna entre ambas.
- `index-b2.html` — **Propuesta B, iteración 2** (versión de trabajo): Manrope + Cormorant Garamond,
  carrusel de disciplinas, contacto y footer con íconos. Carga `direccion-b.css` + `direccion-b2.css`
  y `js/direccion-b2.js`. La barra de abajo a la derecha alterna A / B1 / B2 y prueba
  "Nombre en serif" (también con `index-b2.html?nombre=serif`).
- `index-b3.html` — **Propuesta B, iteración 3** (versión de trabajo): Manrope + Ogg o Canela
  (selector en la barra de abajo; también `?serif=canela`), foto en el hero, logos de herramientas,
  carrusel con flechas laterales, contacto y cierre simplificados.
  Carga `direccion-b.css` + `direccion-b2.css` + `direccion-b3.css`.

- `index-b4.html` — **Propuesta B, iteración 4** (versión de trabajo): paleta ampliada
  (malva #AD7D8B, azul lavanda #8995C5, lavanda #E7E9F4) y herramientas dentro de cada disciplina.
  Carga además `direccion-b4.css` y `js/direccion-b4.js`. La barra permite ver "Logos a color"
  (también con `?logos=color`).

- `index-b5.html` — **Propuesta B, iteración 5** (versión de trabajo): carrusel de disciplinas
  + cinta de programas que avanza con el scroll (no se mueve sola). Pruebas de paleta en la barra:
  Violeta / Amarillo / Mixta (también `?paleta=amarillo`). Carga además `direccion-b5.css` y `js/direccion-b5.js`.

- `index-b6.html` — **Propuesta B, iteración 6** (alternativa a B5): cinta de logotipos sin tarjetas,
  en loop continuo con pausa (cursor, foco, toque o botón), y las 4 categorías debajo.
  Paletas: Amarillo / Rosa + amarillo / Rosa (también `?paleta=rosa`). Carga `direccion-b6.css` y `js/direccion-b6.js`.

- `index-b7.html` — **Propuesta B, iteración 7** (alternativa a B6): igual que B6 salvo el contacto y el cierre
  (dos columnas con más aire, email como medio principal, perfiles en filas, CV como enlace propio, solo malva
  como acento) y la foto con más contraste (`assets/img/retrato-16-contraste.jpg`; `?foto=16` muestra la anterior).
  Carga además `direccion-b7.css`.

## Tipografías de prueba (Ogg / Canela)

Son fuentes comerciales: la versión de prueba solo sirve para evaluar en privado.
Ver `assets/fonts/LEEME.md` para instalarlas y ver la comparación real.
Si no están instaladas, B3 muestra la serif genérica del navegador y un aviso.
- Los casos de estudio no cambian en ninguna de las dos.

## Qué es provisional

- **Texto con subrayado punteado rosa** (`.tbd`): borrador para revisar.
- **Etiquetas `PENDIENTE` / `VERIFICAR` / `CONFIRMAR`** (`.tbd-tag`): dato faltante o dudoso.
- **Rectángulos rayados** (`.ph`): lugar reservado para una imagen, con su formato ideal.
- El botón **"Contenido pendiente"** (abajo a la izquierda) muestra u oculta esas marcas.

## Estructura

```
prototipo/
├── index.html                 Home: hero, proyectos, sobre mí, herramientas, trayectoria, contacto
├── proyectos/
│   ├── fullescabio.html       Caso de estudio (plantilla UX/UI)
│   └── zombie-walk.html       Caso de estudio (plantilla branding, con tema propio)
├── css/
│   ├── tokens.css             ← colores, tipografía, espacios y tiempos: la identidad vive acá
│   ├── base.css               Reset, tipografía base, utilidades, accesibilidad
│   ├── components.css         Header, menú, botones, links, placeholders, teléfono, footer
│   ├── home.css               Secciones de la home
│   ├── case.css               Plantilla de casos de estudio
│   └── motion.css             Todas las animaciones (respetan prefers-reduced-motion)
├── js/main.js                 Menú, header, aparición al scroll, índice activo, copiar email
└── assets/
    ├── favicon.svg
    └── img/fullescabio-logo.png   (copiado de la versión anterior)
```

## Cómo reemplazar un placeholder por una imagen

```html
<!-- antes -->
<div class="ph" style="--ratio: 4 / 5"><span class="ph__label">Foto retrato</span></div>

<!-- después -->
<img src="assets/img/retrato.webp" alt="Descripción de la imagen" width="1600" height="2000" loading="lazy" />
```

## Limitaciones conocidas de esta versión

- Header y footer están repetidos en cada página (se resuelve con componentes al migrar a Astro).
- Los textos están dentro del HTML. En la versión final pasan a archivos de contenido por idioma.
- Las tipografías se cargan desde Google Fonts. En la versión final se alojan en el propio sitio.
- Todavía no tiene versión en inglés.
