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
- **Contacto** — email, LinkedIn, ubicación y un formulario de contacto real.

## Stack

HTML5 + CSS3 (custom properties, grid, scroll-snap) + JavaScript vanilla.
Tipografía IBM Plex (Mono/Sans) vía Google Fonts. Sin frameworks ni bundler para la página.

El formulario de contacto usa una **función serverless de Vercel** (`api/contact.js`)
como proxy hacia [Web3Forms](https://web3forms.com): el cliente le pega a `/api/contact`,
la función agrega la access key del lado del servidor y recién ahí llama a Web3Forms.
La key nunca viaja al navegador ni queda en el repo.

## Variables de entorno

| Variable | Dónde se usa | Dónde configurarla |
|---|---|---|
| `WEB3FORMS_ACCESS_KEY` | `api/contact.js` | Vercel → Project Settings → Environment Variables (Production **y** Preview) |

Ver `.env.example`. Sin esta variable configurada en Vercel, el endpoint `/api/contact`
responde 500 y el formulario no envía nada.

## Desarrollo local

La página (`index.html`) es estática y se puede servir con cualquier servidor:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

Pero así **el formulario de contacto no va a funcionar** — `python3 -m http.server` no
ejecuta `api/contact.js`. Para probar el flujo completo (incluida la función serverless)
hace falta la Vercel CLI:

```bash
npm i -g vercel
vercel link          # una sola vez, asocia esta carpeta al proyecto en Vercel
vercel env pull      # trae las env vars configuradas en Vercel a .env.local
vercel dev           # sirve la página + las funciones de api/ en local
```

## Deploy

El repo está conectado a Vercel — cada push a `main` dispara un deploy. `vercel.json`
trae la config mínima (`cleanUrls`). Para deployar manualmente desde la CLI:

```bash
vercel --prod
```

## Estructura

```
index.html      # página completa (markup + estilos + script inline)
api/contact.js  # función serverless: recibe el form y reenvía a Web3Forms con la key server-side
logo.svg        # isotipo, usado como favicon y en el nav
vercel.json     # config de deploy
.env.example    # variables de entorno esperadas (sin valores reales)
```

Todo el contenido (experiencia, cursos, proyectos) vive inline en `index.html`.
