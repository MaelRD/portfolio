# MaelDev · Portafolio de Mario Yael

Sitio personal de Mario Yael Gordillo García, desarrollador de software Full Stack: https://maeldev.netlify.app

## Stack

- Astro 4 (estático) + una isla React 18 (`src/components/react/space/SpaceApp.tsx`)
- CSS propio con tokens en `.space` (`src/styles/space.css`, `src/styles/v2.css`); Tailwind 3 instalado
- `motion`, `lenis` y CSS para movimiento; todo respeta `prefers-reduced-motion`
- Netlify (hosting, `public/_redirects`, Netlify Forms `contact`)

## Comandos

| Comando | Acción |
| :-- | :-- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm run images` | Genera AVIF/WebP de `assets/projects/<proyecto>/` en `public/projects/` |

## Dónde está cada cosa

- Textos (ES/EN): `src/data/space.ts`, `src/data/v2.ts`, `src/data/content.ts`
- Proyectos: `src/content/projects/*.json` (esquema en `src/content/config.ts`)
- Secciones: `src/components/sections/`; piezas compartidas en `src/components/kit/`
- Contrato de diseño: `.impeccable.md`
- Auditoría, plan y cambios del rediseño: `docs/`
