// Content for the "Portfolio Espacial" home page. Same rules as content.ts:
// first person, no invented metrics, official job titles kept as given.
// Mission-control labels (eyebrows, codes) are translated like any other copy.

import type { Bi, Lang } from "./content";

export type { Bi, Lang };

const bi = (es: string, en: string): Bi => ({ es, en });

export const NAV = [
  { id: "work", label: bi("Proyectos", "Projects") },
  { id: "process", label: bi("Proceso", "Process") },
  { id: "system", label: bi("Sistema", "System") },
  { id: "about", label: bi("Sobre mí", "About") },
  { id: "stack", label: bi("Stack", "Stack") },
  { id: "experience", label: bi("Experiencia", "Experience") },
  { id: "contact", label: bi("Contacto", "Contact") },
];

export const UI_TEXT = {
  skip: bi("Saltar al contenido", "Skip to content"),
  nav: bi("Navegación principal", "Main navigation"),
  lang: bi("Idioma", "Language"),
  home: bi("Mario Yael, volver al inicio", "Mario Yael, back to top"),
  cv: bi("CV", "CV"),
  cvLabel: bi("Descargar CV (PDF)", "Download CV (PDF)"),
  newTab: bi("(se abre en una pestaña nueva)", "(opens in a new tab)"),
  cta: bi("Hablemos", "Let’s talk"),
  copyEmail: bi("Copiar correo", "Copy email"),
  copied: bi("¡Copiado!", "Copied!"),
  menuOpen: bi("Abrir menú", "Open menu"),
  menuClose: bi("Cerrar menú", "Close menu"),
};

export const HERO = {
  first: "Mario",
  last: "Yael",
  role: bi("Desarrollador de Software", "Software Developer"),
  headline: bi(
    "Convierto procesos y problemas de negocio en software claro, mantenible y escalable.",
    "I turn business processes and problems into clear, maintainable, scalable software.",
  ),
  ctaWork: bi("Ver proyectos", "View projects"),
  ctaCv: bi("Descargar CV", "Download CV"),
  orbitLabel: bi(
    "Diagrama: el sistema como un planeta. En órbita, de dentro hacia fuera: usuario, interfaz (Angular, React), API REST, lógica (Quarkus) y datos (PostgreSQL).",
    "Diagram: the system as a planet. In orbit, from inside out: user, interface (Angular, React), REST API, logic (Quarkus) and data (PostgreSQL).",
  ),
  orbits: [
    { label: bi("USUARIO", "USER"), color: "#EEEBFF", size: 9, rx: 23, ry: 8.8, speed: 0.00034, phase: 0.4 },
    { label: bi("UI", "UI"), color: "#7DE3FF", size: 10, rx: 30, ry: 11.5, speed: 0.00026, phase: 2.1 },
    { label: bi("API", "API"), color: "#A78BFA", size: 11, rx: 37, ry: 14.2, speed: 0.0002, phase: 3.9 },
    { label: bi("LÓGICA", "LOGIC"), color: "#FFC07A", size: 12, rx: 43.5, ry: 16.7, speed: 0.00015, phase: 5.4 },
    { label: bi("DATOS", "DATA"), color: "#f472b6", size: 13, rx: 49, ry: 18.8, speed: 0.00011, phase: 1.2 },
  ],
  status: bi("DISPONIBLE PARA OPORTUNIDADES", "AVAILABLE FOR OPPORTUNITIES"),
};

export interface SectionHead {
  n: string;
  eyebrow: Bi;
  title: Bi;
  intro?: Bi;
}

export const HEADS: Record<"work" | "process" | "system" | "about" | "stack" | "experience" | "contact", SectionHead> = {
  work: {
    n: "01",
    eyebrow: bi("TRABAJO SELECCIONADO", "SELECTED WORK"),
    title: bi("Trabajo seleccionado", "Selected work"),
    intro: bi(
      "Tres proyectos: el problema detrás de cada uno, cómo está construido y dónde se encuentra hoy.",
      "Three projects: the problem behind each one, how it’s built and where it stands today.",
    ),
  },
  process: {
    n: "02",
    eyebrow: bi("PROCESO", "PROCESS"),
    title: bi("Cómo construyo software", "How I build software"),
    intro: bi("El código es consecuencia del problema, no el punto de partida.", "Code is a consequence of the problem, not the starting point."),
  },
  system: {
    n: "03",
    eyebrow: bi("PENSAMIENTO SISTÉMICO", "SYSTEM THINKING"),
    title: bi("Anatomía de un sistema", "Anatomy of a system"),
    intro: bi(
      "Me gusta entender lo que ocurre detrás de la interfaz. Como un planeta: capas externas que tocan al usuario, un núcleo donde viven las reglas.",
      "I like understanding what happens behind the interface. Like a planet: outer layers that touch the user, a core where the rules live.",
    ),
  },
  about: {
    n: "04",
    eyebrow: bi("SOBRE MÍ", "ABOUT"),
    title: bi("No empiezo escribiendo código.", "I don’t start by writing code."),
  },
  stack: {
    n: "05",
    eyebrow: bi("STACK TÉCNICO", "TECH STACK"),
    title: bi("Stack técnico", "Tech stack"),
    intro: bi(
      "Agrupado por lo que cada área me permite resolver, incluida la parte que no es código.",
      "Grouped by what each area lets me solve, including the part that isn’t code.",
    ),
  },
  experience: {
    n: "06",
    eyebrow: bi("EXPERIENCIA", "EXPERIENCE"),
    title: bi("Experiencia", "Experience"),
    intro: bi("Puestos oficiales y lo que el trabajo realmente implicó.", "Official job titles, and what the work actually involved."),
  },
  contact: {
    n: "07",
    eyebrow: bi("CONTACTO · ABRIR CANAL", "CONTACT · OPEN CHANNEL"),
    title: bi("¿Tienes un problema que el software pueda resolver?", "Have a problem that software could solve?"),
    intro: bi(
      "Estoy abierto a oportunidades de desarrollo de software, proyectos y colaboraciones.",
      "I’m open to software development opportunities, projects and collaborations.",
    ),
  },
};

// ── Projects ────────────────────────────────────────────────────────────────

export interface ArchNode {
  id: string;
  l: Bi;
  s?: Bi;
}

export interface ArchGraph {
  cols: ArchNode[][];
  edges: [string, string][];
}

const node = (id: string, l: Bi, s?: Bi): ArchNode => ({ id, l, s });
const same = (x: string) => bi(x, x);

export interface SpaceProject {
  n: string;
  name: string;
  kind: Bi;
  status: Bi;
  tagline: Bi;
  problem: Bi;
  solution: Bi;
  stack: string[];
  /** Architecture as a left-to-right graph: columns of nodes, then the connections. */
  arch: ArchGraph;
  /** Case-study route; omitted when there is none yet. */
  href?: string;
  planet: string;
  glow: string;
}

export const PROJECT_TEXT = {
  status: bi("ESTADO", "STATUS"),
  problem: bi("PROBLEMA", "PROBLEM"),
  solution: bi("SOLUCIÓN", "SOLUTION"),
  arch: bi("ARQUITECTURA · FLUJO DE DATOS", "ARCHITECTURE · DATA FLOW"),
  caseStudy: bi("Ver caso de estudio", "View case study"),
  noCase: bi("SIN CASO DE ESTUDIO AÚN", "NO CASE STUDY YET"),
  select: bi("Elige un proyecto", "Choose a project"),
};

export const PROJECTS: SpaceProject[] = [
  {
    n: "01",
    name: "GBS Builder",
    kind: bi("SISTEMA DE COSTEO", "COSTING SYSTEM"),
    status: bi("En desarrollo", "In development"),
    tagline: bi("De una hoja de cálculo manual hacia una aplicación integrada con el ERP.", "From a manual spreadsheet toward an application integrated with the ERP."),
    problem: bi(
      "La cotización dependía de una hoja de cálculo para calcular costos, márgenes y precios, reuniendo a mano datos de Ventas, Compras y Logística.",
      "Quoting depended on a spreadsheet to calculate costs, margins and prices, bringing together data from Sales, Purchasing and Logistics by hand.",
    ),
    solution: bi(
      "Una aplicación Full Stack: interfaz Angular tipo hoja de cálculo para las líneas de cotización y un backend Java/Quarkus que aplica las reglas de costeo y se integra con Odoo.",
      "A Full Stack application: a spreadsheet-style Angular interface for quote lines and a Java/Quarkus backend that applies the costing rules and integrates with Odoo.",
    ),
    stack: ["Angular", "Java", "Quarkus", "REST API", "PostgreSQL", "Odoo"],
    arch: {
      cols: [
        [node("ui", same("Angular"), bi("líneas de cotización", "quote lines"))],
        [node("api", same("REST API"), bi("contratos", "contracts"))],
        [node("core", same("Quarkus"), bi("reglas de costeo", "costing rules"))],
        [node("odoo", same("Odoo"), same("XML-RPC")), node("db", same("PostgreSQL"), bi("persistencia", "persistence"))],
      ],
      edges: [["ui", "api"], ["api", "core"], ["core", "odoo"], ["core", "db"]],
    },
    href: "/projects/gbs-builder",
    planet: "radial-gradient(circle at 32% 30%,#ffe7c7,#ff9f5a 38%,#9a3412 66%,#2a0a04 88%)",
    glow: "rgba(255,160,90,.45)",
  },
  {
    n: "02",
    name: "LayoutBuilder",
    kind: bi("PLATAFORMA DE INTEGRACIÓN", "INTEGRATION PLATFORM"),
    status: bi("Integrada con Odoo", "Integrated with Odoo"),
    tagline: bi("Centralizar y validar información de negocio, integrada con Odoo.", "Centralizing and validating business information, integrated with Odoo."),
    problem: bi(
      "Crear y administrar ciertos registros requería pasos manuales y dependencia directa del ERP.",
      "Creating and managing certain records required manual steps and direct dependence on the ERP.",
    ),
    solution: bi(
      "Una aplicación desacoplada: el frontend consume un backend que valida la información, ejecuta reglas de negocio y se comunica con distintos servicios.",
      "A decoupled application: the frontend consumes a backend that validates information, runs business rules and talks to different services.",
    ),
    stack: ["Java", "Quarkus", "React", "Astro", "PostgreSQL", "Odoo"],
    arch: {
      cols: [
        [node("ui", same("Astro · React"), bi("interfaz", "interface"))],
        [node("core", same("Java · Quarkus"), bi("validación · reglas", "validation · rules"))],
        [
          node("db", same("PostgreSQL"), bi("persistencia", "persistence")),
          node("odoo", same("Odoo"), same("XML-RPC")),
          node("sat", same("SAT"), bi("validación", "validation")),
          node("discord", same("Discord"), bi("notificaciones", "notifications")),
        ],
      ],
      edges: [["ui", "core"], ["core", "db"], ["core", "odoo"], ["core", "sat"], ["core", "discord"]],
    },
    href: "/projects/layout-builder",
    planet: "radial-gradient(circle at 32% 30%,#d5fbff,#22d3ee 36%,#0e7490 64%,#021a24 88%)",
    glow: "rgba(34,211,238,.45)",
  },
  {
    n: "03",
    name: "El Crisol",
    kind: bi("CONCEPTO", "CONCEPT"),
    status: bi("En definición", "In definition"),
    tagline: bi("Sistema personal de conocimiento.", "Personal knowledge system."),
    problem: bi(
      "El contexto termina disperso entre las distintas herramientas de IA con las que trabajo.",
      "Context ends up scattered across the different AI tools I work with.",
    ),
    solution: bi(
      "Un sistema personal para organizar conocimiento, recuperar contexto relevante y compartirlo entre herramientas de IA usando RAG, memoria estructurada y MCP. Proyecto individual; estoy definiendo su alcance y arquitectura.",
      "A personal system to organize knowledge, retrieve relevant context and share it across AI tools using RAG, structured memory and MCP. Solo project; I’m defining its scope and architecture.",
    ),
    stack: ["Python", "RAG", "MCP", "PostgreSQL"],
    arch: {
      cols: [
        [node("src", bi("Fuentes", "Sources"), bi("documentos · notas", "documents · notes"))],
        [node("rag", same("RAG"), bi("recuperación", "retrieval")), node("mem", bi("Memoria", "Memory"), bi("estructurada", "structured"))],
        [node("mcp", same("MCP"), bi("protocolo", "protocol"))],
        [node("ai", bi("Herramientas de IA", "AI tools"), bi("consumo de contexto", "context consumers"))],
      ],
      edges: [["src", "rag"], ["src", "mem"], ["rag", "mcp"], ["mem", "mcp"], ["mcp", "ai"]],
    },
    planet: "radial-gradient(circle at 32% 30%,#fce7f3,#e879f9 34%,#7e22ce 62%,#1e0536 88%)",
    glow: "rgba(232,121,249,.45)",
  },
];

// ── Process ─────────────────────────────────────────────────────────────────

export const STEPS: { name: Bi; code: Bi; desc: Bi; tags: Bi[] }[] = [
  {
    name: bi("Entender", "Understand"),
    code: bi("RECONOCIMIENTO", "RECONNAISSANCE"),
    desc: bi("Analizo y mapeo el proceso actual para identificar las necesidades reales del sistema.", "I analyze and map the current process to identify the system’s real needs."),
    tags: [bi("Usuarios", "Users"), bi("Problemas", "Problems"), bi("Restricciones", "Constraints"), bi("Objetivos", "Goals")],
  },
  {
    name: bi("Modelar", "Model"),
    code: bi("CARTOGRAFÍA", "CARTOGRAPHY"),
    desc: bi("Estructuro las reglas de negocio, datos, entidades y relaciones que contendrá la solución.", "I structure the business rules, data, entities and relationships the solution will contain."),
    tags: [bi("Reglas", "Rules"), bi("Datos", "Data"), bi("Entidades", "Entities"), bi("Dependencias", "Dependencies")],
  },
  {
    name: bi("Diseñar", "Design"),
    code: bi("PLAN DE VUELO", "FLIGHT PLAN"),
    desc: bi("Defino responsabilidades, arquitectura y cómo se comunican los componentes del sistema.", "I define responsibilities, architecture and how the system’s components communicate."),
    tags: [bi("Arquitectura", "Architecture"), bi("APIs", "APIs"), bi("Servicios", "Services"), bi("Contratos", "Contracts")],
  },
  {
    name: bi("Construir", "Build"),
    code: bi("LANZAMIENTO", "LAUNCH"),
    desc: bi("Implemento la solución con la tecnología adecuada para cada responsabilidad.", "I implement the solution with the right technology for each responsibility."),
    tags: [bi("Frontend", "Frontend"), bi("Backend", "Backend"), bi("Base de datos", "Database"), bi("Integraciones", "Integrations")],
  },
  {
    name: bi("Validar", "Validate"),
    code: bi("PRUEBAS DE VUELO", "FLIGHT TESTS"),
    desc: bi("Pruebo la solución con escenarios tomados de cómo funciona realmente el proceso.", "I test the solution with scenarios taken from how the process really works."),
    tags: [bi("Pruebas", "Testing"), bi("Errores", "Errors"), bi("Casos límite", "Edge cases"), bi("Validación", "Validation")],
  },
  {
    name: bi("Mejorar", "Improve"),
    code: bi("CORRECCIÓN DE RUMBO", "COURSE CORRECTION"),
    desc: bi("Observo cómo se comporta la solución y mejoro su mantenibilidad, rendimiento y experiencia.", "I watch how the solution behaves and improve its maintainability, performance and experience."),
    tags: [bi("Rendimiento", "Performance"), bi("Mantenibilidad", "Maintainability"), bi("Automatización", "Automation"), bi("Iteración", "Iteration")],
  },
];

export const STEP_TEXT = {
  phase: bi("FASE", "PHASE"),
  pathLabel: bi("Trayectoria del proceso en seis fases. Elige una fase para ver su detalle.", "The process as a six-phase trajectory. Choose a phase to see its details."),
};

// ── System thinking ─────────────────────────────────────────────────────────

export const LAYERS: { name: Bi; geo: Bi; tech: Bi; desc: Bi }[] = [
  { name: bi("Usuario", "User"), geo: bi("ATMÓSFERA", "ATMOSPHERE"), tech: bi("Persona", "Person"), desc: bi("Alguien intentando completar una tarea: la razón por la que existe el sistema.", "Someone trying to get a task done: the reason the system exists.") },
  { name: bi("Frontend", "Frontend"), geo: bi("CORTEZA", "CRUST"), tech: bi("Angular · React", "Angular · React"), desc: bi("La interfaz que simplifica cómo el usuario interactúa con el proceso.", "The interface that simplifies how the user interacts with the process.") },
  { name: bi("REST API", "REST API"), geo: bi("MANTO", "MANTLE"), tech: bi("Contratos", "Contracts"), desc: bi("Los contratos que conectan los distintos componentes.", "The contracts that connect the different components.") },
  { name: bi("Backend", "Backend"), geo: bi("MANTO INTERNO", "INNER MANTLE"), tech: bi("Quarkus · Spring · FastAPI", "Quarkus · Spring · FastAPI"), desc: bi("Servicios que reciben solicitudes, las validan y coordinan el trabajo.", "Services that receive requests, validate them and coordinate the work.") },
  { name: bi("Dominio", "Domain"), geo: bi("NÚCLEO", "CORE"), tech: bi("Lógica de negocio", "Business logic"), desc: bi("Donde viven las reglas de negocio.", "Where the business rules live.") },
  { name: bi("Base de datos", "Database"), geo: bi("LUNA", "MOON"), tech: bi("PostgreSQL · MySQL", "PostgreSQL · MySQL"), desc: bi("Persistencia y estructura de la información.", "Persistence and the structure of the information.") },
  { name: bi("Servicios externos", "External services"), geo: bi("SATÉLITE", "SATELLITE"), tech: bi("Odoo · APIs", "Odoo · APIs"), desc: bi("Comunicación con otros sistemas.", "Communication with other systems.") },
];

export const SYSTEM_TEXT = {
  responsibility: bi("RESPONSABILIDAD", "RESPONSIBILITY"),
};

// ── About ───────────────────────────────────────────────────────────────────

export const ABOUT = {
  lead: bi("Primero intento entender qué problema estamos tratando de resolver.", "First I try to understand what problem we’re trying to solve."),
  paragraphs: [
    bi(
      "Analizo el proceso e identifico sus reglas, datos, actores y restricciones. Después modelo la solución y defino cómo deben comunicarse sus componentes. Finalmente construyo el sistema, buscando que sea claro, mantenible y listo para evolucionar.",
      "I analyze the process and identify its rules, data, actors and constraints. Then I model the solution and define how its components should communicate. Finally I build the system, aiming for it to be clear, maintainable and ready to evolve.",
    ),
    bi(
      "Mi experiencia se ha centrado en aplicaciones empresariales, APIs, integraciones y automatización de procesos con Java, Python, TypeScript y tecnologías Full Stack. Actualmente profundizo en arquitectura de software, diseño de sistemas y diseño de soluciones.",
      "My experience has centered on business applications, APIs, integrations and process automation with Java, Python, TypeScript and Full Stack technologies. I’m currently going deeper into software architecture, system design and solution design.",
    ),
  ],
  dossier: bi("EXPEDIENTE / MYG-01", "DOSSIER / MYG-01"),
  coords: bi("19.43°N 99.13°O", "19.43°N 99.13°W"),
  facts: [
    { k: bi("BASE", "BASED IN"), v: bi("México", "Mexico") },
    { k: bi("ACTUAL", "CURRENT"), v: bi("Desarrollo Full Stack", "Full Stack Development") },
    { k: bi("ESTUDIOS", "STUDIES"), v: bi("Ing. Informática · IPN UPIICSA", "Computer Engineering · IPN UPIICSA"), note: bi("Egreso esperado: dic 2026", "Expected graduation: Dec 2026") },
    { k: bi("RUMBO", "HEADING"), v: bi("Ingeniería de Software", "Software Engineering") },
    { k: bi("IDIOMAS", "LANGUAGES"), v: bi("Español (nativo) · Inglés (técnico)", "Spanish (native) · English (technical)"), wide: true },
  ] as { k: Bi; v: Bi; note?: Bi; wide?: boolean }[],
  levels: [
    { k: bi("CÓDIGO", "CODE"), v: bi("Sé construir software.", "I know how to build software."), color: "#7DE3FF" },
    { k: bi("INGENIERÍA", "ENGINEERING"), v: bi("Sé estructurar y diseñar soluciones.", "I know how to structure and design solutions."), color: "#A78BFA" },
    { k: bi("NEGOCIO", "BUSINESS"), v: bi("Entiendo el problema que la tecnología debe resolver.", "I understand the problem the technology has to solve."), color: "#FFC07A" },
  ],
};

// ── Stack ───────────────────────────────────────────────────────────────────

export const AREAS: { name: Bi; code: Bi; desc: Bi; items: Bi[] }[] = [
  {
    name: bi("Backend", "Backend"),
    code: bi("ORIÓN", "ORION"),
    desc: bi("Servicios, APIs y reglas de negocio del lado del servidor.", "Services, APIs and server-side business rules."),
    items: ["Java 21", "Quarkus", "Spring", "FastAPI", "Python", "REST APIs"].map((s) => bi(s, s)),
  },
  {
    name: bi("Frontend", "Frontend"),
    code: bi("LIRA", "LYRA"),
    desc: bi("Interfaces que simplifican cómo el usuario interactúa con el proceso.", "Interfaces that simplify how the user interacts with the process."),
    items: ["Angular", "React", "Astro", "TypeScript"].map((s) => bi(s, s)),
  },
  {
    name: bi("Datos", "Data"),
    code: bi("CASIOPEA", "CASSIOPEIA"),
    desc: bi("Persistencia, modelado y consultas para volúmenes altos de información.", "Persistence, modeling and queries for high volumes of information."),
    items: [bi("PostgreSQL", "PostgreSQL"), bi("MySQL", "MySQL"), bi("SQL", "SQL"), bi("Modelado de datos", "Data modeling")],
  },
  {
    name: bi("Arquitectura", "Architecture"),
    code: bi("CYGNUS", "CYGNUS"),
    desc: bi("Cómo se reparten responsabilidades y se comunican los componentes.", "How responsibilities are split and components communicate."),
    items: [bi("Arquitectura hexagonal", "Hexagonal architecture"), bi("SOLID", "SOLID"), bi("Diseño de APIs", "API design"), bi("JWT", "JWT")],
  },
  {
    name: bi("Sistemas empresariales", "Enterprise systems"),
    code: bi("ÁGUILA", "AQUILA"),
    desc: bi("ERP, integraciones y automatización de procesos operativos.", "ERP, integrations and automation of operational processes."),
    items: ["Odoo 18", "XML-RPC", "QWeb", "XML"].map((s) => bi(s, s)),
  },
  {
    name: bi("Ingeniería", "Engineering"),
    code: bi("ANDRÓMEDA", "ANDROMEDA"),
    desc: bi("La parte que no es código: entender el problema, modelarlo y dejarlo documentado.", "The part that isn’t code: understanding the problem, modeling it and leaving it documented."),
    items: [
      bi("Análisis de negocio", "Business analysis"),
      bi("Análisis de requerimientos", "Requirements analysis"),
      bi("Modelado de procesos", "Process modeling"),
      bi("Diseño de sistemas", "System design"),
      bi("Resolución de problemas", "Problem solving"),
      bi("Documentación técnica", "Technical documentation"),
    ],
  },
  {
    name: bi("Herramientas", "Tools"),
    code: bi("PEGASO", "PEGASUS"),
    desc: bi("Entornos reproducibles, control de versiones y coordinación.", "Reproducible environments, version control and coordination."),
    items: ["Git", "Docker", "Jira", "Discord"].map((s) => bi(s, s)),
  },
];

export const STACK_TEXT = {
  constellation: bi("CONSTELACIÓN", "CONSTELLATION"),
};

// ── Experience ──────────────────────────────────────────────────────────────

export interface SpaceRole {
  year: Bi;
  dates: Bi;
  current?: boolean;
  /** Official title, kept as given. */
  title: string;
  sub: Bi;
  summary: Bi;
  bullets: Bi[];
  tech: string[];
}

export const EXPERIENCE_TEXT = {
  current: bi("EN ÓRBITA · ACTUAL", "IN ORBIT · CURRENT"),
};

export const ORGS: { name: string; meta: Bi; roles: SpaceRole[] }[] = [
  {
    name: "CPA Grup",
    meta: bi("3 ROLES · MARZO 2025 – PRESENTE", "3 ROLES · MARCH 2025 – PRESENT"),
    roles: [
      {
        year: bi("2025", "2025"),
        dates: bi("MAR 2025 – FEB 2026", "MAR 2025 – FEB 2026"),
        title: "Becario de Soporte Odoo ERP",
        sub: bi("Configuración de ERP y migración de datos", "ERP configuration and data migration"),
        summary: bi("Mi primer contacto con la operación de un ERP real: flujos de ventas, compras e inventario.", "My first contact with a real ERP operation: sales, purchasing and inventory flows."),
        bullets: [
          bi("Configuré módulos, vistas y reportes alineados a los procesos de negocio.", "Configured modules, views and reports aligned with business processes."),
          bi("Gestioné incidencias en Jira y documenté procesos internos.", "Managed incidents in Jira and documented internal processes."),
          bi("Participé en migraciones y cargas masivas de datos.", "Took part in migrations and bulk data loads."),
        ],
        tech: ["Odoo", "XML", "QWeb", "Jira"],
      },
      {
        year: bi("2026", "2026"),
        dates: bi("FEB 2026 – JUN 2026", "FEB 2026 – JUN 2026"),
        title: "Auxiliar de Soporte Odoo",
        sub: bi("Desarrollo de software e integraciones ERP", "Software development and ERP integrations"),
        summary: bi("Soporte y desarrollo interno alrededor del ERP de la empresa y sus procesos operativos.", "Support and internal development around the company’s ERP and its operational processes."),
        bullets: [
          bi("Diseñé y construí soluciones en Odoo 18 para gestión de tickets y cargas automatizadas.", "Designed and built Odoo 18 solutions for ticket management and automated data loads."),
          bi("Construí verificación automatizada en Discord para revisar la integridad de datos.", "Built automated verification in Discord to check data integrity."),
          bi("Desarrollé funcionalidades con seguridad basada en JWT.", "Developed features with JWT-based security."),
          bi("Diagnostiqué incidencias y apoyé a usuarios en procesos operativos, seguridad y trazabilidad.", "Diagnosed incidents and supported users on operational processes, security and traceability."),
          bi("Coordiné el trabajo del equipo en Jira y documenté flujos.", "Coordinated the team’s work in Jira and documented flows."),
        ],
        tech: ["Odoo 18", "Java", "Quarkus", "JWT", "PostgreSQL", "Jira"],
      },
      {
        year: bi("AHORA", "NOW"),
        dates: bi("JUN 2026 – PRESENTE", "JUN 2026 – PRESENT"),
        current: true,
        title: "Full Stack Developer y Líder Técnico Odoo",
        sub: bi("Desarrollo de software y coordinación técnica", "Software development and technical coordination"),
        summary: bi("Aplicaciones internas e integraciones que soportan los procesos de ventas, compras e inventario.", "Internal applications and integrations that support sales, purchasing and inventory processes."),
        bullets: [
          bi("Desarrollo aplicaciones, servicios backend e integraciones, como la herramienta de cotización GBS Builder.", "I develop applications, backend services and integrations, such as the GBS Builder quoting tool."),
          bi("Analizo requerimientos con las áreas de negocio y los documento.", "I analyze requirements with business areas and document them."),
          bi("Coordino sprints y doy seguimiento al trabajo técnico.", "I coordinate sprints and follow up on technical work."),
        ],
        tech: ["Java 21", "Quarkus", "Angular", "Odoo 18", "XML-RPC", "PostgreSQL"],
      },
    ],
  },
  {
    name: "Corporativo Emeth",
    meta: bi("SERVICIO SOCIAL", "SOCIAL SERVICE"),
    roles: [
      {
        year: bi("2025", "2025"),
        dates: bi("JUL 2025 – ENE 2026", "JUL 2025 – JAN 2026"),
        title: "Desarrollador Backend de Servicio Social",
        sub: bi("Desarrollo backend", "Backend development"),
        summary: bi("Servicios backend para una aplicación con mucho volumen de datos, en paralelo a mi rol en ERP.", "Backend services for a data-heavy application, in parallel with my ERP role."),
        bullets: [
          bi("Desarrollé servicios backend en Java con arquitectura hexagonal y principios SOLID.", "Developed backend services in Java with hexagonal architecture and SOLID principles."),
          bi("Construí APIs REST y optimicé consultas SQL para altos volúmenes de datos.", "Built REST APIs and optimized SQL queries for high data volumes."),
          bi("Usé Docker y Git para entornos reproducibles y control de versiones.", "Used Docker and Git for reproducible environments and version control."),
        ],
        tech: ["Java", "REST APIs", "SQL", "Docker", "Git"],
      },
    ],
  },
];

// ── Contact ─────────────────────────────────────────────────────────────────

export const CONTACT_TEXT = {
  cta: bi("Transmitir señal", "Send a signal"),
  email: bi("EMAIL", "EMAIL"),
  github: bi("GITHUB", "GITHUB"),
  cv: bi("CV (PDF)", "CV (PDF)"),
  footer: bi("© 2026 MARIO YAEL GORDILLO GARCÍA · CIUDAD DE MÉXICO", "© 2026 MARIO YAEL GORDILLO GARCÍA · MEXICO CITY"),
  available: bi("DISPONIBLE PARA OPORTUNIDADES", "AVAILABLE FOR OPPORTUNITIES"),
};

export const t = (b: Bi, lang: Lang) => b[lang];
