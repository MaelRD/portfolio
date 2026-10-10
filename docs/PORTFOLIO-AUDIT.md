# Auditoría del portafolio MaelDev

Fecha: 2026-10-09 · commit base `3f093a5` · build base: ✅ (`astro build`, 2 páginas, sin errores ni warnings)

## 1. Stack y estructura

| Área | Estado |
|---|---|
| Framework | Astro 4.16 (estático) + una isla React 18 (`SpaceApp`, `client:load`) |
| Estilos | Tailwind 3 (casi sin uso en la home) + CSS propio: `space.css` (tokens en `.space`, hero, proceso), `v2.css` (secciones de la reestructura 2026-10) |
| Animación | `motion` (laptop en Proyectos), CSS keyframes, `lenis` (smooth scroll), canvas de estrellas (`engine.ts`). Todo se apaga con `prefers-reduced-motion` |
| Contenido | `src/data/space.ts`, `src/data/v2.ts`, `src/data/content.ts`; proyectos en `src/content/projects/*.json` (Zod) |
| Idiomas | ES/EN con `bi()`, selección en cliente (`useLang`). SSR en inglés; el cliente cambia a español por defecto |
| Formularios | Netlify Forms `contact` (React + formulario oculto en `index.astro`) |
| Rutas | `/`, `/start-a-project`, `/work/[slug]` (0 páginas: ningún proyecto tiene `caseStudy`), `/sitemap.xml` |
| Calidad | No hay lint ni tests; solo `npm run build` |

## 2. Identidad visual

«Portfolio Espacial»: cielo `#030014`, tinta `#EEEBFF`, violeta `#A78BFA` como acento, cyan `#7DE3FF` para foco/activo, verde para "actual". Geist + Geist Mono. Paneles de 14–20 px, pills, líneas finas violetas. **No** es negro/rojo: el brief original (`#000/#830000/#BC0202/#FF0000`) no corresponde al sitio actual, así que se conserva la paleta espacial.

Diseños protegidos (`.impeccable.md` + preferencias del usuario): `Name.tsx`, Hero (orrery + cinta), diseño de Proyectos, Proceso (trayectoria de 6 fases).

## 3. Secciones

Altura medida a 3440 px de ancho. Total de la página: ~15 300 px.

| Sección | Componente | Estado actual | Mantener | Mejorar | Riesgo | Acción propuesta |
|---|---|---|---|---|---|---|
| Hero `#hero` | `Hero.tsx` 🔒 | Nombre, statement, descripción larga, stack, estado, 2 CTA (primario = contacto) | Todo el diseño | Subtexto más corto; CTA primario hacia proyectos; acceso a CV visible para reclutadores | Bajo (solo copy) | Copy + CTA, sin tocar layout |
| Stats | `QuickStats.tsx` | 4 datos; "proyectos reales: demos en línea y sistemas internos" cuenta solo las 4 demos | Formato | La etiqueta mezcla demos e internos: sugiere más de lo que cuenta | Credibilidad | Etiqueta exacta: demos publicadas |
| Audiencia `#audience` | `AudienceSelector.tsx` | Dos puertas: reclutador / proyecto | Todo | — | — | Sin cambios |
| Proyectos `#work` | `FeaturedProjects.tsx` 🔒 | 4 demos con problema, solución, stack, estado | Diseño | Falta **rol**; el tipo solo aparece como prefijo "Demo" | Bajo | Añadir fila «Rol» y tipo explícito dentro del mismo `dl` |
| Soluciones `#solutions` | `ServicesBento.tsx` | 4 categorías con ejemplos | Layout de lista | No hay capa técnica ni enlace a evidencia; no cubre ERP/Odoo ni IA como capacidades propias | Duplicación con `#build` | Convertir en «Qué puedo construir»: 5 capacidades, resultado + tecnologías + demo relacionada |
| Qué podemos construir `#build` | `SolutionMarquee.tsx` | Marquee de 13 sistemas | — | Repite parte de Soluciones | Duplicación | Mantener como tira de ejemplos detrás de Soluciones (propuesta de fusión pendiente de aprobación) |
| Antes/después `#before-after` | `BeforeAfter.tsx` | 6 pares con tracing beam | Todo | — | Duplicación ligera | Sin cambios |
| Configurador `#configurator` | `ProjectConfigurator.tsx` | 2 preguntas → sugerencia → prellenado del formulario | Todo | — | — | Sin cambios |
| Proceso `#process` | `Process.tsx` 🔒 | 6 fases en trayectoria, navegable con flechas | Diseño y 6 fases | Sin entregables; sin macrofases; no menciona puesta en producción | Bajo | Macrofase y entregables dentro del panel de fase (solo datos) |
| Sistema `#system` | `SystemArchitecture.tsx` | 6 capas, una frase cada una | Diseño | Solo un nivel de detalle | Bajo | Segundo nivel técnico por capa («En código») |
| Skills `#stack` | `TechStack.tsx` | 6 grupos por capa | Todo | — | — | Sin cambios |
| Experiencia `#experience` | `Experience.tsx` | Lista editorial; muestra solo `context[0]` | Diseño | Las contribuciones reales ya existen en datos pero no se muestran; está muy abajo para reclutadores | Bajo | Mostrar contribuciones; panel tipo archivo de código con datos reales; subir la sección |
| Sobre mí `#about` | `About.tsx` | Foto + texto + 3 datos | Todo | Sin enlaces a GitHub/CV | Bajo | Añadir enlaces existentes |
| CTA final `#cta` | `ContactCTA.tsx` | Dos puertas + CV | Todo | — | — | Sin cambios |
| Contacto `#contact` | `ContactForm.tsx` | Form con validación, feedback, email y WhatsApp verificables | Todo | — | — | Sin cambios |
| Interfaces `#interfaces` | `ProjectGallery.tsx` | **No se renderiza** (aunque `.impeccable.md` la lista) | Código | — | Documentación desfasada | Documentar; decisión del usuario |

## 4. CTAs, enlaces y rutas

- Anchors públicos: `#hero #audience #work #solutions #build #before-after #configurator #process #system #stack #experience #about #cta #contact`. Todos se conservan.
- **Roto:** `public/_redirects` envía `/projects/gbs-builder` y `/projects/layout-builder` a `/work/...`, que ya no existen (GBS Builder y Layout Builder se retiraron en `3f093a5`) → 404.
- CV (`/cv.pdf`), GitHub, email y WhatsApp están en `content.ts` y son reales.
- Demos externas: novadentist, pos-tinta-negra-demo, sofiaasis, agendawh (netlify.app).

## 5. SEO, accesibilidad y rendimiento

- SEO: título, descripción, canonical, OG y JSON-LD `ProfilePage`. **Falta `og:image`** (la foto `/about/mario.webp` puede servir).
- Accesibilidad: skip link, foco visible cyan, `aria-*` correctos en proceso/capas/nav, reduced motion respetado. Revisar contraste de `--dim` (#A49FC9 sobre #030014 ≈ 7.9:1, OK).
- Rendimiento: JS de la isla 333 kB (116 kB gzip); imágenes AVIF/WebP con `srcset`. Sin cambios de dependencias.
- `README.md` es el de la plantilla de Astro.

## 6. Referencia Stackbyte

No se copió nada. Solo se toman las tres ideas del brief: historia profesional como archivo de código, proceso con macrofases y entregables, y especialidades presentadas como capacidades.
