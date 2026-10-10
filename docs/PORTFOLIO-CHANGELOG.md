# Changelog: evolución de MaelDev (2026-10-09)

Base: `3f093a5`. Se mantienen la identidad «Portfolio Espacial», los diseños protegidos (Name, Hero, Proyectos, Proceso), todos los anchors y todas las secciones. No hay dependencias nuevas.

## Cambios

| Área | Archivos | Qué cambió |
|---|---|---|
| Redirecciones | `public/_redirects` | `/projects/gbs-builder` y `/work/gbs-builder` → `/#experience`; `/projects/layout-builder` y `/work/layout-builder` → `/#work`. Antes daban 404 |
| Stats | `src/data/v2.ts` | «proyectos publicados como demo en línea». La etiqueta anterior hablaba de sistemas internos que no se contaban |
| Hero | `Hero.tsx`, `space.ts`, `v2.ts`, `space.css` | Subtexto del brief. CTA primario «Ver proyectos», secundario «Hablemos de tu proyecto». Nueva línea discreta «¿Buscas perfil técnico? Ver experiencia · Descargar CV». Layout, orrery y nombre intactos |
| Proyectos | `config.ts`, `projects/*.json`, `FeaturedProjects.tsx`, `v2.css` | Campo `kind` (`demo`/`personal`/`professional`, por defecto `demo`), visible junto a la categoría. Nueva fila «Mi rol» en los datos del proyecto. Las 4 tarjetas son `demo` |
| Experiencia | `Experience.tsx`, **`DeveloperFile.tsx` (nuevo)**, `v2.ts`, `v2.css` | Panel `developer.ts` con datos reales, generados desde `ORGS`, `CAREER_START` y los estudios. Enlaces a GitHub y CV. Las contribuciones de cada rol ya existían en los datos y ahora se ven en «Qué hice» (abierto en el rol actual). Nota de confidencialidad sobre sistemas internos |
| Sobre mí | `About.tsx`, `v2.ts`, `v2.css` | Botones de GitHub y CV |
| Orden | `SpaceApp.tsx`, `space.ts` (`NAV`), `v2.ts` (`DOCK`) | Experiencia y Sobre mí suben justo después de Proyectos. La navegación sigue el nuevo orden |
| Qué puedo construir | `ServicesBento.tsx`, `v2.ts`, `v2.css` | De 4 servicios a 5 capacidades: web/plataformas internas, backend/APIs, ERP/Odoo, dashboards/herramientas operativas, IA aplicada. Cada una muestra resultado → ejemplos → tecnologías → demo real (Agenda, POS Tinta Negra, Sofía) → contacto con la necesidad preseleccionada. El marquee pasa a «Ejemplos concretos» para no repetir título |
| Proceso | `space.ts` (`MACRO`, `STEPS`), `Process.tsx`, `space.css` | El panel de fase muestra la etapa (Descubrir / Diseñar / Construir / Lanzar y evolucionar) y 3 entregables. «Mejorar» incluye la puesta en producción «según lo acordado». Trayectoria y 6 fases sin cambios |
| Sistema | `SystemArchitecture.tsx`, `v2.ts`, `v2.css` | Segundo nivel «En código» por capa (roles, Angular/React, REST/JWT/XML-RPC, Quarkus/Spring, hexagonal, PostgreSQL) |
| SEO | `Layout.astro` | `og:image` y `twitter:image` con la foto de Sobre mí |
| Docs | `README.md`, `.impeccable.md`, `docs/*` | README del proyecto. Estructura de la home actualizada. Auditoría, plan y changelog |

## Decisiones visuales

- No se añadieron colores nuevos: el código usa tokens existentes (violeta = palabra clave, cyan = clave, ámbar = cadena, dim = comentario).
- El panel de código reutiliza la barra de `BrowserMockup` y escribe las líneas una a una solo con movimiento permitido. El texto está siempre en el HTML y en móvil se ajusta con sangría colgante, sin scroll horizontal.
- Los entregables usan ✓ en verde, el mismo color que ya significa «actual / disponible».
- La quinta capacidad ocupa toda la fila para no dejar un hueco en la cuadrícula de 2 columnas.

## Pruebas

- `npm run build`: ✅ antes y después (2 páginas, sin warnings).
- `tsc --noEmit`: ✅ 0 errores.
- Navegador (dev server): se revisó a 375 px, 768 px y ancho grande. Sin scroll horizontal y sin errores de consola. Se comprobaron el orden de las secciones, la navegación activa, el panel de código, las capacidades y los entregables del proceso.
- No hay lint ni tests en el proyecto.

## Pendientes (requieren decisión del usuario)

1. Fusionar o retirar `SolutionMarquee` y `BeforeAfter` para acortar la parte comercial.
2. `ProjectGallery` (#interfaces): reincorporar o eliminar.
3. SocialFlow: falta información real.
4. Un `og:image` dedicado (1200×630) sería mejor que el retrato.
5. Verificar las redirecciones en Netlify tras el deploy.

---

# Motion experience (2026-10-09)

Plan y tokens en `docs/MOTION-DESIGN.md`. Sin dependencias nuevas (`gsap` sigue instalado y sin uso).

## Archivos

| Archivo | Cambio |
|---|---|
| `src/lib/motionSystem.ts` (nuevo) | Sistema único: reveals (`data-reveal`), scrubs (`data-scrub`, escribe `--p`), CTA magnéticos (`data-magnetic`). Un `IntersectionObserver`, un `rAF`, un `MutationObserver`; todo se limpia al desmontar; no hace nada con reduced motion |
| `src/styles/motion.css` (nuevo) | Tokens `--m-*` y todas las coreografías |
| `src/components/kit/index.tsx` | `SplitWords` (máscara por palabra, texto único para SEO y lectores); `SectionHeader` revela por palabras; `CTAButton` con `magnetic` y flecha animable |
| `Hero.tsx`, `space.ts` | Titular por palabras, «problemas reales» con su propio ritmo y subrayado que se dibuja, CTA escalonados, indicador «Desliza» (3 ciclos), el Hero cede al hacer scroll |
| `SpecialtyBand.tsx` (nuevo), `v2.ts` (`BAND`) | Banda tipográfica entre Proyectos y Experiencia, ligada al scroll (no autoplay) |
| `FeaturedProjects.tsx` | Captura con wipe `clip-path`, copy escalonado, zoom 3 % al hover |
| `Experience.tsx`, `DeveloperFile.tsx` | Riel de progreso de lectura; cursor que parpadea 8 veces |
| `ServicesBento.tsx` | Capacidades escalonadas, hover del icono |
| `Process.tsx` | La trayectoria se traza y los waypoints aparecen en secuencia (diseño intacto) |
| `SystemArchitecture.tsx` | Capas por encima de la abierta se iluminan en cascada; el pulso se pausa fuera de pantalla |
| `ContactCTA.tsx` | CTA principal magnético |

## Verificación

- `npm run build` ✅ · `tsc --noEmit` ✅ 0 errores.
- HTML del servidor sin `data-rv`: todo visible sin JS. Titulares con una sola copia del texto.
- Navegador: recorrido con scroll real en escritorio; entrada del Hero, banda (`--p` cambia con el scroll), proyectos, experiencia (riel llega a 1), capacidades, proceso y capas revisados. Corregido un salto de los waypoints durante la entrada. 375 px sin scroll horizontal.
- Reduced motion: verificado por código (el sistema sale antes de armar nada; las animaciones CSS están bajo `no-preference`); no emulado en el navegador.

## Fuera de alcance (decisiones)

- Paleta roja del brief: se mantiene la espacial.
- GBS Builder destacado: retirado por el usuario en `3f093a5`.
- Proceso con columna sticky en 4 fases: diseño protegido; las 4 etapas viven en el panel.
- Terminal simulada: no se añadió para no convertir la sección en un editor gigante; el panel `developer.ts` cumple esa función.

---

# Depuración (2026-10-09)

A pedido del usuario: secciones repetidas, stack repetido, textos redundantes y código sin uso.

**Contenido (lo que se ve):**
- Fuera «Ejemplos concretos» (marquee) y «Antes/después»: repetían Qué puedo construir, las puertas de audiencia y el configurador. `#build` y `#before-after` siguen funcionando como alias dentro de Soluciones.
- Stack: fuera de las cifras (quedan 3: años, demos, ubicación) y de la banda (queda la fila de especialidades).
- Proyectos: «Demo» aparecía 3 veces; queda una (el estado «DEMO EN LÍNEA»). El tipo se nombra en la etiqueta solo si no es demo.
- Intros más cortas en Soluciones, Experiencia, Proceso y Especialidades; fuera la nota de confidencialidad.

**Código y archivos (sin cambio visible):**
- Eliminados: `SolutionMarquee`, `BeforeAfter`, `ProjectGallery`, `InfiniteMovingCards`, `TracingBeam`, la ruta `/work/[slug]` con `CaseStudyApp`, `case-study/*`, `diagrams/*`, `work/ProjectStatus`, `data/caseStudy.ts`, y las imágenes `public/projects/*.jpg` que nada usaba.
- Esquema de proyectos sin `caseStudy`, `diagram`, `cover`, `capabilities` ni `statusPrefix` (y esos campos fuera de los JSON). El CTA abre la demo y se oculta si no hay enlace.
- Datos sin uso fuera de `v2.ts` y `space.ts` (galería, ejemplos, antes/después, encabezados de secciones antiguas, `PROJECT_TEXT`).
- CSS: ~145 reglas de secciones que ya no existen (casos de estudio, diagramas, bitácora, soluciones antiguas…), un `@keyframes` duplicado, `df-pulse` y 40 comentarios huérfanos. `space.css` pasó de 1.142 a 886 líneas. `is-shining` (Name) y `text-loop` se conservan porque se añaden por JS.
- Sitemap: solo `/` y `/start-a-project`.

**Verificación:** `astro build` y `tsc` sin errores. Revisadas la home completa (orden de secciones, aliases, cifras en una fila) y `/start-a-project`, sin errores de consola.

**Se conserva a propósito:** `ProjectMock.tsx` (respaldo para un proyecto sin capturas, p. ej. SocialFlow), `summary` en los proyectos, `gsap` (lo usa la cinta del Hero).

---

# Footer y formulario (2026-10-09)

**Tipografía:** Audiowide (logotipo del pie, título «Hablemos de tu idea», pregunta del pie) y Oxanium (etiquetas, chips, botones, enlaces del pie), cargadas en `Layout.astro`. Lo que se escribe en los campos y los textos largos siguen en Geist.

**Footer (`Footer.tsx`, `space.css`):**
- Franja de contacto: «¿Construimos algo juntos?», copiar correo (con confirmación y método alternativo si el portapapeles está bloqueado), WhatsApp y volver arriba.
- Marca con hora local de Ciudad de México (se calcula en el navegador y se actualiza cada 30 s), disponibilidad y las 4 columnas de enlaces; los externos llevan ↗.
- Móvil: botones a ancho completo, columnas en acordeón (`<details>`, siempre abiertas desde tablet), enlaces de 44 px en dos columnas y línea inferior apilada.

**Formulario (`ContactForm.tsx`, `v2.css`):**
- «¿Qué necesitas?» pasa a chips (radios nativos, funcionan con flechas). Mismo campo `need` para Netlify.
- Barra de progreso de los 4 campos obligatorios y un check dentro de cada campo válido.
- Ideas para empezar el mensaje; el mínimo de 20 caracteres cuenta solo lo que escribe la persona, no la idea. Contador en vivo.
- Borrador de necesidad y mensaje en este navegador (no nombre ni contacto); se borra al enviar.
- Ctrl/⌘ + Enter para enviar; un envío inválido enfoca y sacude el primer campo con error; spinner al enviar; al terminar se dibuja un sello y muestra a qué correo se responderá.
- Inputs a 16 px para que el móvil no haga zoom.

**Verificación:** build y `tsc` sin errores. Probado en 1280/1440 px y 360 px: chips, ideas, progreso, borrador, acordeones, copiar correo con clic real y sin scroll horizontal. El envío real a Netlify solo se puede probar desplegado (en desarrollo muestra el error a propósito).

---

# Configurador «Cuéntame cómo trabajas» más limpio (2026-10-09)

- Fuera los números 01/02 con check, las etiquetas «HOY / PROBLEMA», el contador «1 elegida» y «Puedes elegir varias» (ahora la intro dice «Elige todo lo que aplique»).
- Opciones sin círculo vacío: el check aparece solo en lo seleccionado, junto al borde y el icono en cyan.
- Panel de la derecha sin las etiquetas «HOY / PROBLEMA / PROPUESTA» (quedan solo para lectores de pantalla), sin la cuadrícula de fondo y sin la animación continua de los conectores. Textos de espera más cortos, «Podríamos empezar por» en lugar de «Parece que podríamos explorar:», nombres de área en tipo normal (no MAYÚSCULAS) y sin la etiqueta «Podríamos construir».
- Proceso: la tira de etapas ya no repite números (los llevan los planetas); la etapa actual se marca con un punto. En móvil, más espacio bajo la ruta para el nombre del planeta activo.

---

# Tipografía espacial (2026-10-09)

Elegida por el usuario: **Exo 2 + Orbitron + Space Mono**, incluido el nombre del Hero.

- `--display` y `--sans` → Exo 2 (400–800): títulos, «Mario Yael» y texto. Tracking relajado de -0.04em a -0.02em (Exo 2 es más ancha que Geist).
- `--label` (nuevo) → Orbitron: eyebrows, etapas del proceso, «PROBLEMA/SOLUCIÓN», estado de proyectos, códigos de capa y de área, números de planeta, kickers, banda de especialidades, logotipo y títulos del pie, título de contacto.
- `--mono` → Space Mono: editor de código, chips de tecnología, fechas, URL de los mockups y datos.
- Audiowide, Oxanium, Geist y Geist Mono ya no se cargan; `Layout.astro` pide solo Exo 2, Orbitron y Space Mono. `tailwind.config.mjs` refleja los tokens.
- La cinta de la esquina se re-midió para Exo 2: trazado de 1966 unidades, ajuste de espaciado ~2 % en ambos idiomas.
- Verificado: fuentes cargadas, anillo del nombre alineado, 360 px sin desbordes de texto (home y /start-a-project), build y `tsc` sin errores.

---

# Fuera «Cuéntame cómo trabajas» y «No veo una pantalla. Veo un sistema.» (2026-10-09)

- Eliminados `ProjectConfigurator.tsx` y `SystemArchitecture.tsx` (con la vista conceptual UI → API → DB), sus datos en `v2.ts` (`CONFIG_TEXT`, `TOOLS`, `PAINS`, `AREAS`, `SYSTEM_V2`, `CONTACT_FORM.prefill`) y ~96 reglas CSS, más `@keyframes` `layers-run` y `readout-swap`.
- `PREFILL_EVENT` pasa a `src/lib/prefill.ts`: «Hablemos de esto» en Soluciones sigue preseleccionando la necesidad en el formulario (verificado).
- `#configurator` (en Contacto) y `#system` (en Especialidades) quedan como alias para enlaces antiguos.
- Orden: Hero → Cifras → Audiencia → Proyectos → Banda → Experiencia → Sobre mí → Soluciones → Proceso → Especialidades → CTA → Contacto. Build y `tsc` sin errores; consola limpia.
