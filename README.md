# Portfolio — Esteban Tripodi

Sitio estático (HTML/CSS/JS sin build) del portfolio personal.

## Deploy en Vercel

**Opción A — CLI (más rápida, sin GitHub):**

```bash
npm i -g vercel   # si no la tenés instalada
cd /home/damz/dev/Frontend/portfolio
vercel            # deploy de preview
vercel --prod     # deploy a producción
```

**Opción B — vía GitHub:**

```bash
cd /home/damz/dev/Frontend/portfolio
git init
git add .
git commit -m "Portfolio inicial"
gh repo create portfolio-esteban --private --source=. --push
```

Después, en [vercel.com/new](https://vercel.com/new) importás el repo. Vercel detecta el `index.html` en la raíz automáticamente — no hace falta configurar build command ni output directory.

## Desarrollo local

Es un único archivo estático, no requiere `npm install`. Para verlo local:

```bash
cd /home/damz/dev/Frontend/portfolio
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Actualizar contenido

Todo el contenido (experiencia, cursos, proyectos) vive inline en `index.html`. La sección "Proyectos" tiene dos tarjetas `PRÓXIMAMENTE` — reemplazalas a medida que subas proyectos reales.
