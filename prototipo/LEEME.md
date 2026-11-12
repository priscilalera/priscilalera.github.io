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
│   ├── fullescabio.html       Caso de estudio UX/UI (fondo claro)
│   └── zombie-walk.html       Caso de estudio de branding (fondo negro, .theme-zombie)
├── css/
│   ├── tokens.css             Identidad: colores, tipografías, pesos, espacios, tiempos
│   ├── base.css               Reset, tipografía base, utilidades, accesibilidad
│   ├── components.css         Header, menú, botones, enlaces, títulos, etiquetas, placeholders,
│   │                          teléfono, contenido pendiente, footer, piezas de proyecto (showcase)
│   ├── motion.css             Animaciones comunes y keyframes (respetan prefers-reduced-motion)
│   ├── contacto.css           "Hablemos.", email, perfiles, CV y cierre de la home
│   ├── case.css               Casos de estudio: plantilla, pie con contacto, tema oscuro de Zombie Walk
│   └── home/                  Secciones de la home, en el orden de la página
│       ├── hero.css
│       ├── proyectos.css
│       ├── sobre-mi.css
│       ├── herramientas.css
│       └── trayectoria.css
├── js/
│   ├── main.js                Común: header, menú, navegación activa, aparición al scroll,
│   │                          copiar email, contenido pendiente, lienzo de puntos ([data-lienzo])
│   └── home.js                Home: carrusel, cinta de programas, cursor del hero
└── assets/
    ├── favicon.svg
    └── img/
        ├── retrato-16-contraste.jpg
        └── fullescabio-logo.png   (copiado de la versión anterior)
```

Orden de carga: `tokens` → `base` → `components` → `motion` → home: `home/*.css` + `contacto.css` · casos: `case.css`.

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
