# MaelDev · Motion design

> «No más animaciones, mejores animaciones.» El movimiento explica orden, profundidad y estado. Nunca es decoración en bucle.

## Auditoría (2026-10-09)

**Lo que ya había (verificado en el código):**
- Entrada del Hero por CSS: el nombre sube con máscara y brillo, y los hijos de `.hero__copy` suben escalonados.
- Laptop de Proyectos con apertura ligada al scroll (`motion`).
- Inclinación (tilt) de tarjetas y spotlight que sigue al puntero.
- Tracing beam en Antes/Después, marquee de ejemplos con botón de pausa, línea en movimiento en el borde de los CTA, `useEntrance` para diagramas.
- Lenis para el scroll suave, con soporte de anchors y foco.
- Todo respeta `prefers-reduced-motion`.

**Librerías:** `motion` (en uso), `gsap` (instalado, **sin uso**), `lenis` (en uso). No hace falta ScrollTrigger: los efectos ligados al scroll son de progreso simple y se resuelven con un solo bucle `rAF`. No se instala nada.

**Stackbyte:** solo se toman ideas generales: tipografía con máscara, entradas coreografiadas y narrativa con scroll. No se copia nada concreto.

**Decisiones frente al brief:**
- La paleta sigue siendo la espacial (violeta/cyan), no roja. La «frase destacada» del Hero se resalta con un subrayado cyan que se dibuja.
- GBS Builder no vuelve como proyecto: el usuario lo retiró en `3f093a5`.
- Proceso conserva su trayectoria de 6 fases (diseño protegido). No hay sticky storytelling: solo se añade el trazado de la trayectoria al entrar y la secuencia de waypoints. Las 4 etapas ya aparecen en el panel.

## Matriz por sección

| Sección | Conservar | Refinar | Incorporar |
|---|---|---|---|
| Hero | Entrada del nombre, orrery, tilt | Orden de la entrada | Titular por palabras con máscara, subrayado que se dibuja en «problemas reales», CTA escalonados, indicador de scroll (3 ciclos), cesión al hacer scroll (scrub) |
| Encabezados de sección | — | — | Revelado por palabras con máscara (`SectionHeader`) y lede con fade |
| Banda de especialidades | — | — | Banda tipográfica nueva, ligada al scroll (sin autoplay, así que no necesita botón de pausa) |
| Proyectos | Laptop con scroll, tilt | — | Revelado de la captura con `clip-path`, copy escalonado, zoom de 3 % al hover |
| Experiencia | Panel `developer.ts` | Cursor que parpadea 8 veces y se queda fijo | Riel de progreso ligado al scroll |
| Capacidades | — | Hover del icono | Entrada escalonada de las 5 capacidades |
| Proceso | Trayectoria y panel | — | La trayectoria se traza al entrar y los waypoints aparecen en secuencia |
| Arquitectura | Capas y apertura | El pulso del riel solo corre si la sección está en pantalla | Las capas por encima de la abierta se iluminan en cascada (la petición «viaja» desde el usuario) |
| Microinteracciones | Línea en movimiento en los CTA, hoja del menú móvil (ya animada) | Flechas que se desplazan 3 px; subrayado que crece | CTA magnéticos (máx. 6 px, solo mouse) |

## Tokens (en `.space`, `src/styles/motion.css`)

| Token | Valor | Uso |
|---|---|---|
| `--m-fast` | 180ms | hover, flechas, subrayados |
| `--m-base` | 520ms | fades y desplazamientos de bloques |
| `--m-slow` | 820ms | máscaras de texto, `clip-path` de imágenes |
| `--m-ease` | `cubic-bezier(0.23, 1, 0.32, 1)` | entradas (ease-out fuerte) |
| `--m-ease-io` | `cubic-bezier(0.77, 0, 0.175, 1)` | wipes, trazados |
| `--m-dist` | 24px | desplazamiento de bloques |
| `--m-dist-s` | 10px | desplazamiento de ítems en stagger |
| `--m-stagger` | 70ms | ítems de lista y copy |
| `--m-stagger-w` | 38ms | palabras de titulares |

## Reglas

1. **Solo `transform`, `opacity` y `clip-path`.** Nada que cambie el layout.
2. **El contenido nunca depende del JS.** El HTML del servidor llega visible. Un elemento solo se oculta (`data-rv="armed"`) cuando hay un script listo para revelarlo, y solo si está fuera de pantalla.
3. **Reduced motion:** el sistema no arma nada ni escribe `--p`, así que todo queda en su estado final. Las animaciones CSS van dentro de `@media (prefers-reduced-motion: no-preference)`.
4. **Un efecto por sección.** Las entradas se repiten solo en los encabezados, donde dan ritmo.
5. **Sin bucles infinitos nuevos.** El cursor y el indicador de scroll tienen un número fijo de ciclos. El pulso de Arquitectura se pausa fuera de pantalla.
6. **Táctil:** los efectos magnéticos y de hover solo aplican con `(hover: hover) and (pointer: fine)`.
7. **Limpieza:** un único `IntersectionObserver`, un `rAF` para los scrubs y listeners delegados. Todo se libera al desmontar.

## API (`src/lib/motionSystem.ts`, montado una vez en `SpaceApp`)

| Atributo | Efecto |
|---|---|
| `data-reveal="up"` | fade + 24 px |
| `data-reveal="words"` | palabras con máscara (con `<SplitWords>`) |
| `data-reveal="stagger"` | cada hijo directo entra escalonado (`--i` lo asigna el sistema) |
| `data-reveal="project"` | captura con `clip-path` + copy escalonado |
| `data-reveal="draw"` | wipe de izquierda a derecha (trayectoria) |
| `data-scrub` | escribe `--p` (0 → 1) mientras el elemento cruza la pantalla; `data-scrub="exit"` mide la salida por arriba (Hero) |
| `data-magnetic` | atracción sutil al puntero |

## Dónde ajustar

- Velocidad general: los tokens en `src/styles/motion.css`.
- Cuánto cede el Hero: `.launch[data-scrub] .hero__grid` en `motion.css`.
- Velocidad de la banda: `--band-shift` en `.band`.
- Fuerza magnética: `MAGNET` en `motionSystem.ts`.

---

## Iteración 2: componentes interactivos (brief `MAELDEV-COMPONENTES-MOTION.md`)

| Componente del brief | Componente actual → cambio | Nuevo |
|---|---|---|
| 1. AnimatedHeroTypography | `Hero.tsx` + `SplitWords`: ya existía (palabras con máscara, frase clave con su propio tiempo, salida con scroll) | — |
| 2. InteractiveCodeEditor | `DeveloperFile.tsx` → editor con pestañas `developer.ts` / `skills.ts` / terminal (patrón ARIA tabs, flechas, Home/End); cada pestaña se escribe una vez al elegirla | — |
| 3. AnimatedCareerTimeline | `Experience.tsx` → riel de lectura (ya existía) + hitos: un marcador por empresa en el riel y un punto por rol, que se encienden en secuencia (`data-reveal="milestone"`) | — |
| 4. ScrollStorytellingProcess | `Process.tsx` → tira de 4 etapas (clicables, con barra de progreso) + **modo narrativo**: en escritorio con espacio suficiente, trayectoria y panel quedan fijos bajo la navegación y el scroll recorre las 6 fases (240vh). Al elegir una fase o etapa se hace scroll a su tramo. En móvil, con reduced motion o sin altura suficiente: sección normal, sin pinning | — |
| 5. ExpertiseShowcase | `TechStack.tsx` (#stack) → 5 áreas editoriales alternas (Frontend, Backend y datos, Arquitectura, Integraciones y ERP, Automatización e IA) con todas las tecnologías anteriores y el gráfico de orbes existente | — |
| 6. ProjectReveal / Parallax | `FeaturedProjects.tsx`: reveal y zoom (ya existían) + profundidad diferencial (visual ±28px) en ≥960px | — |
| 7. AnimatedTerminal | Pestaña «terminal · demo» del editor, con el rótulo «Demostración visual: no se ejecuta ningún comando real», 4 pasos, sin tiempos ni resultados; sin escritura infinita | — |
| 8. SystemStatusMonitor | `SystemArchitecture.tsx` → `Monitor`: UI → API → DB, se ilumina el nodo de la capa abierta y un paquete viaja una vez por cambio. Rotulado «Vista conceptual · no son datos en vivo» | dentro del mismo archivo |
| 9. InfiniteMarquee | Se mantiene `SpecialtyBand` ligada al scroll (no autoplay, sin pausa necesaria). El marquee de ejemplos ya tiene pausa | — |
| 10–11. ScrollReveal / MagneticButton | `motionSystem.ts` (ya existían) | — |
| 12. SectionTransition | El cielo fijo y continuo ya une las secciones; no se añaden overlays | — |
| 13. AnimatedCounter | `QuickStats` ya cuenta cifras reales (años desde `CAREER_START`, número de demos) | — |
| 14. HoverSpotlight | `.spotlight` existente (violeta, no rojo) aplicado también a capacidades, editor y gráficos de especialidades | — |
| 15. SmoothScrollProvider | Lenis existente; ahora se expone como `window.__lenis` y `scrollPageTo()` (en `lib/motion.ts`) para que el proceso haga scroll sin pelear con él | — |

**No se incorporó:**
- Paleta roja / spotlight vino: se mantiene la identidad espacial.
- GBS Builder destacado: retirado por el usuario.
- GSAP / ScrollTrigger: el pinning es CSS `position: sticky` y el progreso sale del mismo `useScrollFrame`. Una librería más no aporta nada aquí.
- `prefers-reduced-data`: no hay vídeo ni recursos pesados que dependan del movimiento.

**Ajustes:**
- Duración del modo narrativo: `240vh` en `.story[data-on]` (`motion.css`).
- Cuándo se activa: la media query en `useStory` (`Process.tsx`) y la condición de altura.
- Desplazamiento del parallax de proyectos: `56px` en `.showcase[data-scrub] .showcase__visual`.

---

## Iteración 3: Proceso como ruta espacial con cohete

Rediseño del Proceso pedido de forma explícita por el usuario (2026-10-09).

| Pieza | Archivo | Qué hace |
|---|---|---|
| `SpaceRoute` | `src/components/react/space/SpaceRoute.tsx` | Ruta SVG (Catmull-Rom por 6 puntos) con 3 trazos: base tenue punteada, tramo recorrido (gradiente violeta → cyan) y estela corta mientras el cohete se mueve |
| `RoutePlanet` (dentro de `SpaceRoute`) | id. + `process.css` | Un botón por fase con un planeta en CSS (gradiente con luz arriba a la izquierda, color por fase). Estados: futuro (apagado), completado (encendido, ✓ y texto «completada» para lectores de pantalla), activo (escala 1.4, anillo, pulso único). Tamaño táctil de 44px |
| `RocketMarker` + `useRocket` | id. | Cohete SVG estilizado. Vuela con `requestAnimationFrame` (easeInOutCubic, 650–1550 ms según distancia) y se orienta con la tangente medida en pantalla. Se estaciona a 40px del planeta; en la fase 1 espera justo después del primero, apuntando a la ruta. La llama crece solo mientras vuela |
| Panel | `Process.tsx` | Mismo contenido real (descripción, entregables, qué revisamos). Un haz en el borde superior se desliza bajo el planeta activo |
| Modo narrativo | `Process.tsx` (`useStory`) | Se conserva: en escritorio el scroll recorre las fases y el cohete vuela entre ellas |

**Detalles técnicos:**
- Los guiones del tramo recorrido y de la estela se calculan en **píxeles de pantalla** con una tabla de longitud acumulada (240 muestras, recalculada al redimensionar). Con `vector-effect: non-scaling-stroke`, Chrome no normaliza `pathLength` cuando el SVG se estira de forma desigual, que es lo que pasa en móvil. La ruta anterior tenía ese mismo fallo.
- Se eliminó la sonda que el engine movía en bucle por la trayectoria; `useSpaceEngine` ya no recibe `pathRef`.
- Reduced motion: la ruta, los estados y el cohete se colocan sin vuelo; no hay estela, pulso ni parpadeo de llama.

**Ajustes:** `PARK_PX` y `TRAIL_PX` en `SpaceRoute.tsx`; colores de planeta (`--pc` por `nth-child`) y tamaños en `process.css`.

> **Nota (2026-10-09):** la sección de Arquitectura (con el `Monitor` conceptual y la cascada de capas) y el configurador se retiraron a pedido del usuario; las filas que los mencionan arriba quedan como historial.
