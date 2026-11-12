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
  Carga además `direccion-b7.css`. La serif de acento es **Italiana** (Google Fonts, licencia libre SIL OFL),
  en redonda; reemplaza a Ogg/Canela, que siguen solo en B3–B6.

- `index-b8.html` — **Propuesta B, iteración 8** (alternativa a B7): refinamiento tipográfico. "Lera" al 78 %
  del tamaño de "Priscila"; "personas" e "interfaces" en Italiana inclinada (oblicua simulada por el navegador:
  Italiana no tiene itálica). Títulos de sección sin cambios. Carga además `direccion-b8.css`.

- `index-b9.html` — **Propuesta B, iteración 9** (alternativa a B7, descarta B8): Italiana solo en tamaños grandes;
  "personas" e "interfaces" en Manrope SemiBold malva. Selectores en la barra: Nombre (Peso / Tamaño / Mixto)
  y Acento (Oblicua / Recta); también `?nombre=tamano&acento=recta`. Carga `direccion-b9.css` y `js/direccion-b9.js`.

- `index-b10.html` — **Propuesta B, iteración 10**: **Bodoni Moda** (Google Fonts, SIL OFL, con itálica real) reemplaza a Italiana.
  "Lera", los acentos de los títulos y "personas" / "interfaces" en itálica (estas dos en malva). Selector de nombre:
  Todo serif / Con sans; de serif: Bodoni / Playfair Display; y de sans: Manrope / Instrument Sans / DM Sans /
  Hanken Grotesk (también `?nombre=mixto&serif=playfair&sans=dm`).

- `index-b11.html` — **Propuesta B, iteración 11**: combinación elegida, **Instrument Sans + Playfair Display**
  (Italic en las palabras destacadas). Prueba de pesos más livianos para Instrument Sans: selector Peso
  Actual / 450 / 400 (también `?peso=450`) y Nombre (Todo serif / Con sans). Carga `direccion-b10.css` + `direccion-b11.css`
  y `js/direccion-b11.js`. Tamaños, espacios, colores y animaciones sin cambios.
  Selector Color del nombre: Sin color / Lera malva / Lera malva oscuro / Priscila malva (también `?color=lera`).
  Cinta de programas propia (`.ribbon--b11`): sin botón de pausa (se detiene con cursor, foco o toque), espacios parejos,
  orden Diseño → Desarrollo, logos en gris y un poco más rápida (`data-ribbon-speed="30"`; B6–B10 siguen en 26).
  Motion del hero (interruptores en la barra; también `?motion=tinta,cursor,paleta`): 1 «Lera» se tiñe de malva,
  2 el cursor estira el marco de la foto y lo suelta, 3 la tarjeta de color recorre la paleta al pasar el cursor.
  Lienzo (`?lienzo=actual|puntos|cursor`): grilla de puntos en todo el hero; «Puntos + cursor» suma una linterna que oscurece
  los puntos cerca del mouse. Eco (`?eco=con|sin`): puntos quietos en malva tenue en el contacto «Hablemos.».
  Predeterminado: motion = cursor, lienzo = puntos + cursor, eco = con.
  Carga `direccion-b10.css` (no usa B8 ni B9) y `js/direccion-b10.js`.

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
