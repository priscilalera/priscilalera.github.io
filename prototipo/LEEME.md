# Prototipo navegable — versión oficial

Versión visual y funcional del portfolio. Sin dependencias ni instalación.

## Cómo verlo

Abrí `index.html` con doble clic (Chrome o Edge recomendados).
Para probar las transiciones entre páginas, abrilo desde un servidor local
(por ejemplo, la extensión **Live Server** de VS Code): con `file://` el navegador las desactiva.

## Identidad

- **Tipografía:** Instrument Sans (voz principal; texto corrido 400, títulos 550–600) +
  Playfair Display Italic (palabras destacadas y "Lera") + Geist Mono (etiquetas).
  Las tres de Google Fonts, licencia libre SIL OFL.
- **Paleta:** paper #F3F3F3 · ink #1C1C1C · malva #AD7D8B · malva oscuro #87596A ·
  butter #F2DF9B · blush #F6E6EA (+ líneas doradas #C4A644 en la selección del retrato).
- **Hero:** el nombre entra letra por letra; el cursor "Priscila" selecciona el marco de la foto y lo estira
  una vez; grilla de puntos en todo el hero con una linterna que sigue al mouse.
- **Cierre:** eco de la grilla de puntos en "Hablemos.".
- Con "reducir movimiento" no hay animaciones: se ve el estado final.

Las versiones anteriores (Propuesta A y B1–B11) quedaron guardadas en el commit
`ea7a662` ("Respaldo antes de consolidar").

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
│   ├── tokens.css             Colores, tipografía, espacios y tiempos (base común)
│   ├── base.css               Reset, tipografía base, utilidades, accesibilidad
│   ├── components.css         Header, menú, botones, links, placeholders, teléfono, footer
│   ├── home.css               Secciones de la home (base común)
│   ├── case.css               Plantilla de casos de estudio
│   ├── motion.css             Animaciones comunes (respetan prefers-reduced-motion)
│   │
│   │   Capas de la home (solo index.html), en este orden:
│   ├── direccion-b.css        Hero con lienzo, secuencia de entrada, secciones
│   ├── direccion-b2.css       Carrusel de disciplinas, selección de texto, contacto
│   ├── direccion-b3.css       Foto del hero, cinta de programas, cierre
│   ├── direccion-b4.css       Paleta ampliada (malvas)
│   ├── direccion-b5.css       Colores de selección del retrato
│   ├── direccion-b6.css       Paleta rosa + amarillo, cinta de programas en loop
│   ├── direccion-b7.css       Contacto en dos columnas y cierre
│   ├── direccion-b10.css      Tipografía: Instrument Sans + Playfair Display
│   └── direccion-b11.css      Pesos, "Lera" en malva, cinta, cursor del hero, lienzo de puntos
├── js/
│   ├── main.js                Común: header, menú, navegación activa, aparición al scroll, copiar email
│   └── home.js                Home: carrusel, cinta de programas, cursor del hero, linterna de puntos
└── assets/
    ├── favicon.svg
    └── img/
        ├── retrato-16-contraste.jpg
        └── fullescabio-logo.png   (copiado de la versión anterior)
```

Las capas `direccion-*.css` se pisan en orden. Pendiente para una etapa aparte:
unirlas en una hoja organizada por secciones.

Los casos de estudio todavía usan el estilo de la Propuesta A (Instrument Serif + Geist):
cargan solo `tokens`, `base`, `components`, `home`, `motion` y `case.css`.

## Cómo reemplazar un placeholder por una imagen

```html
<!-- antes -->
<div class="ph" style="--ratio: 4 / 5"><span class="ph__label">Foto retrato</span></div>

<!-- después -->
<img src="assets/img/retrato.webp" alt="Descripción de la imagen" width="1600" height="2000" loading="lazy" />
```

## Limitaciones conocidas de esta versión

- Header y footer están repetidos en cada página.
- Los textos están dentro del HTML. En la versión final pasan a archivos de contenido por idioma.
- Las tipografías se cargan desde Google Fonts. En la versión final se alojan en el propio sitio.
- Todavía no tiene versión en inglés.
