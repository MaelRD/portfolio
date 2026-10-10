# Plan de evolución de MaelDev

Principio: evolucionar sin redibujar. Las piezas protegidas (Name, Hero, Proyectos, Proceso) solo reciben copy y datos. No se borra ninguna sección ni se añade ninguna dependencia.

## Arquitectura de información

| # | Antes | Después | Motivo |
|---|---|---|---|
| 1 | Hero | Hero | — |
| 2 | Stats | Stats | — |
| 3 | Audiencia | Audiencia | Reparte a reclutadores y clientes |
| 4 | Proyectos | Proyectos (con rol y tipo) | Evidencia primero |
| 5 | Soluciones | **Experiencia + archivo del desarrollador** | La experiencia profesional sube 8 posiciones |
| 6 | Qué podemos construir | **Sobre mí** | La historia se lee seguida |
| 7 | Antes/después | **Qué puedo construir** (Soluciones, 5 capacidades) | Bloque comercial unificado |
| 8 | Configurador | Ejemplos (marquee) | — |
| 9 | Proceso | Antes/después | — |
| 10 | Sistema | Configurador | — |
| 11 | Skills | Proceso | — |
| 12 | Experiencia | Sistema | — |
| 13 | Sobre mí | Skills | Cierra la parte técnica |
| 14 | CTA final | CTA final | — |
| 15 | Contacto | Contacto | — |

La navegación (`NAV`) sigue el nuevo orden: Proyectos, Experiencia, Sobre mí, Soluciones, Proceso.

## Inventario de componentes

| Sugerido en el brief | Se resuelve con | Nuevo |
|---|---|---|
| `SelectedWork` | `FeaturedProjects` | — |
| `DeveloperStory` / `ExperienceTimeline` | `Experience` + `About` | — |
| `CodeShowcase` | `DeveloperFile` (dentro de `Experience`) | ✅ único componente nuevo |
| `CapabilityGrid` | `ServicesBento` | — |
| `ProcessStepper` | `Process` | — |
| `ArchitectureExplorer` | `SystemArchitecture` | — |
| `ContactCTA` | `ContactCTA` + `ContactForm` | — |

## Cambios por prioridad

**P0: correcciones**
1. Arreglar `_redirects`: GBS Builder → `/#experience`, Layout Builder → `/#work`.
2. Stats: etiqueta de proyectos exacta (solo demos publicadas).

**P1: alto impacto**
3. Hero: nuevo subtexto, CTA primario «Ver proyectos», secundario «Hablemos de tu proyecto» y enlace discreto a experiencia/CV.
4. Proyectos: fila «Rol» y tipo explícito (`kind: demo | personal | professional` en el esquema, por defecto `demo`).
5. Experiencia: contribuciones visibles y `DeveloperFile`, un panel tipo `mario-yael.ts` con datos reales: rol actual, empresa, desde cuándo, stack, estudios, enfoque y enlaces. Las líneas aparecen una a una solo con movimiento permitido, y el contenido ya está en el HTML.
6. Reordenar las secciones (tabla de arriba) y la navegación.

**P2: claridad**
7. Soluciones → «Qué puedo construir»: 5 capacidades con resultado, ejemplos, tecnologías y, si hay, la demo que lo demuestra (Sofía para IA, Tinta Negra para herramientas operativas, Agenda/Nova para web).
8. Proceso: cada fase indica su macrofase (Descubrir, Diseñar, Construir, Lanzar y evolucionar) y sus entregables. «Mejorar» incluye la puesta en producción y aclara «según lo acordado».
9. Sistema: segundo nivel técnico por capa.
10. Sobre mí: enlaces a GitHub y CV.

**P3: SEO y documentación**
11. `og:image` y `twitter:card` con la foto.
12. README del proyecto; actualizar la estructura en `.impeccable.md`.

## Pendiente de decisión del usuario (no se ejecuta)

- Fusionar o retirar `SolutionMarquee` y `BeforeAfter`: acortarían la parte comercial ~1100 px, pero son diseños existentes.
- Reincorporar o eliminar `ProjectGallery` (#interfaces).
- SocialFlow: falta información real.
- GBS Builder como caso anonimizado: se retiró en `3f093a5`, así que solo aparece en Experiencia.
