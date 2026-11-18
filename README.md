# Portfolio de Priscila Lera

Portfolio profesional de Priscila Lera, UX/UI Designer. Reúne cuatro casos de estudio:

1. **Fullescabio**: diseño de una app móvil de e-commerce (UI Design).
2. **Calmi**: diseño y prototipo de una app de acompañamiento emocional (prototipado).
3. **Zombie Walk**: identidad visual para un evento (branding).
4. **Burger Company**: diseño y desarrollo de un sitio web responsive (desarrollo web).

## Tecnologías

HTML, CSS y JavaScript, sin dependencias ni instalación.

## Cómo verlo

Abrí `index.html` con doble clic (Chrome o Edge recomendados).
Para ver las transiciones entre páginas, abrilo desde un servidor local
(por ejemplo, la extensión **Live Server** de VS Code): con `file://` el navegador las desactiva.

## Identidad

- **Tipografía:** Instrument Sans (texto y títulos), Playfair Display Italic (palabras destacadas y "Lera")
  y Geist Mono (etiquetas). Las tres de Google Fonts, con licencia libre SIL OFL.
- **Paleta:** paper #F3F3F3 · ink #1C1C1C · malva #AD7D8B · malva oscuro #87596A ·
  butter #F2DF9B · blush #F6E6EA · dorado #C4A644.
- Con "reducir movimiento" activado no hay animaciones: se ve el estado final.

## Qué es provisional

- **Texto con subrayado punteado rosa** (`.tbd`): borrador para revisar.
- **Etiquetas `PENDIENTE` / `CONFIRMAR`** (`.tbd-tag`): dato faltante o dudoso.
- **Rectángulos rayados** (`.ph`): lugar reservado para una imagen.
- El botón **"Contenido pendiente"** (abajo a la izquierda) muestra u oculta esas marcas.

## Estructura

```
├── index.html                 Inicio: hero, proyectos destacados, sobre mí, herramientas, trayectoria, contacto
├── proyectos/
│   ├── index.html             Todos los proyectos (para sumar uno, copiar un <article class="work">)
│   ├── fullescabio.html       Caso de estudio: UI Design
│   ├── calmi.html             Caso de estudio: prototipado
│   ├── zombie-walk.html       Caso de estudio: branding (fondo negro, .theme-zombie)
│   └── burger-company.html    Caso de estudio: desarrollo web
├── css/
│   ├── tokens.css             Colores, tipografías, pesos, espacios y tiempos
│   ├── base.css               Reset, tipografía base, utilidades y accesibilidad
│   ├── components.css         Header, menú, botones, etiquetas, pie, teléfono y portadas de los proyectos
│   ├── motion.css             Animaciones (respetan prefers-reduced-motion)
│   ├── contacto.css           Cierre de la página de inicio
│   ├── case.css               Plantilla de los casos de estudio
│   ├── proyectos.css          Página "Todos los proyectos"
│   └── home/                  Secciones de la página de inicio
├── js/
│   ├── main.js                Común a todas las páginas
│   └── home.js                Página de inicio: carrusel, cinta de programas y cursor del hero
└── assets/
    ├── favicon.svg
    └── img/                   Retrato y una carpeta de imágenes por proyecto
```

Orden de carga de los estilos: `tokens` → `base` → `components` → `motion`, y después el de cada página
(`home/*.css` + `contacto.css`, `case.css` o `proyectos.css`).

## Limitaciones conocidas

- El header y el pie están repetidos en cada página.
- Los textos están dentro del HTML.
- Las tipografías se cargan desde Google Fonts.
- Todavía no tiene versión en inglés.
