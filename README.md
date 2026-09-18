# Portfolio — Esteban Tripodi

Portfolio personal de **Esteban Damián Tripodi**: Frontend Developer en camino hacia
Ciberseguridad, Pentesting y DevSecOps.

Sitio estático de una sola página (HTML/CSS/JS, sin build ni dependencias), pensado
como landing page: cada sección ocupa un viewport completo y se navega con scroll-snap.

**Contenido:**

- **Inicio** — presentación y terminal animada.
- **Sobre mí** — experiencia laboral, formación completada, formación en curso,
  a qué aspiro (Red Team / Blue Team / DevSecOps) y stack técnico.
- **Proyectos** — auditoría de seguridad ofensiva (caso real, anonimizado) y
  proyectos de desarrollo propios.
- **Contacto** — email, LinkedIn y ubicación.

## Stack

HTML5 + CSS3 (custom properties, grid, scroll-snap) + JavaScript vanilla.
Tipografía IBM Plex (Mono/Sans) vía Google Fonts. Sin frameworks ni bundler.

## Desarrollo local

Es un único archivo estático, no requiere `npm install`:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Deploy

El repo está conectado a Vercel — cada push a `main` dispara un deploy. `vercel.json`
trae la config mínima (`cleanUrls`). Para deployar manualmente desde la CLI:

```bash
npm i -g vercel
vercel --prod
```

## Estructura

```
index.html    # página completa (markup + estilos + script inline)
logo.svg      # isotipo, usado como favicon y en el nav
vercel.json   # config de deploy
```

Todo el contenido (experiencia, cursos, proyectos) vive inline en `index.html`.
