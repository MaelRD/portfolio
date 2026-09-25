// Content for the MAEL portfolio. Every user-facing string is bilingual
// (`en`/`es`) so components can pick `copy[lang]` directly. Section titles
// are English "system labels" in both languages; descriptive text is
// translated.
//
// Rules this file follows (content briefs of 2026-09-25):
// - First person, concrete, no invented metrics, clients, results or titles.
// - Project status is only shown when it has been confirmed.
// - Job titles and periods are kept exactly as given.
// - Odoo is one integrated system among others, not the headline.
// - Case-study sections without verified information are omitted, never filled in.

export type Lang = "en" | "es";

export interface Bi {
  en: string;
  es: string;
}

/**
 * A small architecture topology for ArchitectureDiagram: node positions are
 * percentages of the diagram box; edges are drawn in order, and each node
 * appears when the first edge reaching it finishes drawing.
 */
export interface Topology {
  nodes: { id: string; label: string; sub?: string; x: number; y: number }[];
  edges: [string, string][];
  /** width / height of the diagram box */
  aspect: number;
}

export const META = {
  title: "Mario Yael | Software Developer",
  description: {
    es: "Portafolio de Mario Yael, Software Developer. Transformo procesos y problemas de negocio en software claro y mantenible: backend, frontend, datos e integración de sistemas.",
    en: "Portfolio of Mario Yael, Software Developer. I turn business processes and problems into clear, maintainable software: backend, frontend, data and system integration.",
  } as Bi,
};

export const UI = {
  skip: { en: "Skip to content", es: "Saltar al contenido" } as Bi,
  menuOpen: { en: "Open menu", es: "Abrir menú" } as Bi,
  menuClose: { en: "Close menu", es: "Cerrar menú" } as Bi,
  navLabel: { en: "Main navigation", es: "Navegación principal" } as Bi,
  langLabel: { en: "Language", es: "Idioma" } as Bi,
  home: { en: "Mario Yael, back to top", es: "Mario Yael, volver al inicio" } as Bi,
  cv: { en: "CV", es: "CV" } as Bi,
  cvLabel: { en: "Download CV (PDF)", es: "Descargar CV (PDF)" } as Bi,
  newTab: { en: "(opens in a new tab)", es: "(se abre en una pestaña nueva)" } as Bi,
  backHome: { en: "Back to portfolio", es: "Volver al portafolio" } as Bi,
};

// `id` must match a section id rendered in CosmicApp. Order follows the page.
export const NAV_LINKS: { id: string; label: Bi }[] = [
  { id: "work", label: { en: "Projects", es: "Proyectos" } },
  { id: "process", label: { en: "Process", es: "Proceso" } },
  { id: "about", label: { en: "About", es: "Sobre mí" } },
  { id: "stack", label: { en: "Stack", es: "Stack" } },
  { id: "experience", label: { en: "Experience", es: "Experiencia" } },
  { id: "contact", label: { en: "Contact", es: "Contacto" } },
];

export const CV_PATH = "/cv.pdf";
export const CV_FILENAME = "Mario-Yael-Gordillo-CV.pdf";

// ── Hero ────────────────────────────────────────────────────────────────────

export const HERO = {
  name: "Mario Yael",
  role: "Software Developer",
  headline: {
    en: "I turn business processes and problems into clear, maintainable, scalable software.",
    es: "Transformo procesos y problemas de negocio en software claro, mantenible y escalable.",
  } as Bi,
  body: {
    en: "I analyze the problem, model its rules and build end-to-end solutions with modern backend and frontend technologies.",
    es: "Analizo el problema, modelo sus reglas y construyo soluciones de extremo a extremo utilizando tecnologías modernas de backend y frontend.",
  } as Bi,
  ctaWork: { en: "View projects", es: "Ver proyectos" } as Bi,
  ctaProcess: { en: "How I work", es: "Cómo trabajo" } as Bi,
  ctaCv: { en: "Download CV", es: "Descargar CV" } as Bi,
  stack: ["Java", "Python", "TypeScript", "Quarkus", "Angular", "React", "PostgreSQL"],
  stackLabel: { en: "Main stack", es: "Stack principal" } as Bi,
  intro: "MYG / SYSTEM INITIALIZING",
  status: {
    label: "SYSTEM STATUS",
    booting: "INITIALIZING…",
    value: { en: "AVAILABLE FOR OPPORTUNITIES", es: "DISPONIBLE PARA OPORTUNIDADES" } as Bi,
  },
  topologyLabel: {
    en: "Diagram: a request travels from the user through the interface, the API and the business logic down to the data.",
    es: "Diagrama: una petición viaja del usuario a la interfaz, la API y la lógica de negocio hasta los datos.",
  } as Bi,
  topology: {
    aspect: 0.8,
    nodes: [
      { id: "user", label: "USER", x: 50, y: 8 },
      { id: "ui", label: "UI", sub: "Angular · React", x: 50, y: 29 },
      { id: "api", label: "API", sub: "REST", x: 50, y: 50 },
      { id: "logic", label: "LOGIC", sub: "Quarkus · business rules", x: 50, y: 71 },
      { id: "data", label: "DATA", sub: "PostgreSQL", x: 50, y: 92 },
    ],
    edges: [["user", "ui"], ["ui", "api"], ["api", "logic"], ["logic", "data"]],
  } as Topology,
  // Workstation readout — facts only.
  profile: {
    id: "PROFILE / MYG-01",
    rows: [
      { k: "STATUS", v: { en: "Open to opportunities", es: "Abierto a oportunidades" } },
      { k: "LOCATION", v: { en: "Mexico City", es: "Ciudad de México" } },
      { k: "FOCUS", v: { en: "Software Engineering", es: "Software Engineering" } },
      { k: "EDUCATION", v: { en: "Ingeniería en Informática · IPN", es: "Ingeniería en Informática · IPN" } },
    ] as { k: string; v: Bi }[],
    layersLabel: { en: "How I work, top to bottom", es: "Cómo trabajo, de arriba abajo" } as Bi,
    layers: [
      { k: "BUSINESS", v: { en: "Understand the problem the software must solve", es: "Entender el problema que el software debe resolver" } },
      { k: "ENGINEERING", v: { en: "Structure and design the solution", es: "Estructurar y diseñar la solución" } },
      { k: "CODE", v: { en: "Build it, end to end", es: "Construirla de extremo a extremo" } },
    ] as { k: string; v: Bi }[],
  },
};

// ── Section headers ─────────────────────────────────────────────────────────

export interface SectionHeader {
  index: string;
  eyebrow: string;
  title: Bi;
  intro?: Bi;
}

export const SECTIONS: Record<
  "work" | "process" | "caseStudy" | "system" | "about" | "stack" | "experience" | "education" | "direction" | "contact",
  SectionHeader
> = {
  work: {
    index: "01",
    eyebrow: "SELECTED WORK",
    title: { en: "Selected work", es: "Selected work" },
    intro: {
      en: "Three projects: the problem behind each one, how it’s built and where it stands today.",
      es: "Tres proyectos: el problema detrás de cada uno, cómo está construido y en qué punto está hoy.",
    },
  },
  process: {
    index: "02",
    eyebrow: "PROCESS",
    title: { en: "How I build software", es: "How I build software" },
    intro: {
      en: "Code is a consequence of the problem, not the starting point.",
      es: "El código es una consecuencia del problema, no el punto de partida.",
    },
  },
  caseStudy: {
    index: "03",
    eyebrow: "FEATURED CASE STUDY",
    title: { en: "GBS Builder", es: "GBS Builder" },
    intro: {
      en: "From a manual spreadsheet toward an application integrated with the ERP.",
      es: "De una hoja de cálculo manual a una aplicación integrada con el ERP.",
    },
  },
  system: {
    index: "04",
    eyebrow: "SYSTEM THINKING",
    title: { en: "System thinking", es: "System thinking" },
    intro: {
      en: "I like understanding what happens behind the interface.",
      es: "Me gusta entender qué pasa detrás de la interfaz.",
    },
  },
  about: {
    index: "05",
    eyebrow: "ABOUT",
    title: { en: "I don’t start by writing code.", es: "No empiezo escribiendo código." },
  },
  stack: {
    index: "06",
    eyebrow: "TECH STACK",
    title: { en: "Tech stack", es: "Tech stack" },
    intro: {
      en: "Grouped by what each area lets me solve — including the part that isn’t code.",
      es: "Agrupado por lo que cada área me permite resolver, incluida la parte que no es código.",
    },
  },
  experience: {
    index: "07",
    eyebrow: "EXPERIENCE",
    title: { en: "Experience", es: "Experience" },
    intro: {
      en: "Official job titles, and what the work actually involved.",
      es: "El nombre real de cada puesto y lo que el trabajo implicó en la práctica.",
    },
  },
  education: {
    index: "08",
    eyebrow: "EDUCATION",
    title: { en: "Education", es: "Education" },
  },
  direction: {
    index: "09",
    eyebrow: "PROFESSIONAL DIRECTION",
    title: { en: "Where I’m heading", es: "Hacia dónde voy" },
  },
  contact: {
    index: "10",
    eyebrow: "CONTACT",
    title: { en: "Have a problem that software could solve?", es: "Have a problem that software could solve?" },
    intro: {
      en: "I’m open to software development opportunities, projects and collaborations.",
      es: "Estoy abierto a oportunidades de desarrollo de software, proyectos y colaboraciones.",
    },
  },
};

// ── Projects ────────────────────────────────────────────────────────────────

export type ProjectStatus = "development" | "definition" | "completed";

export const STATUS_LABELS: Record<ProjectStatus, Bi> = {
  development: { en: "In development", es: "En desarrollo" },
  definition: { en: "In definition", es: "En definición" },
  completed: { en: "Completed", es: "Completado" },
};

export const PROJECT_LABELS = {
  problem: { en: "Problem", es: "Problema" } as Bi,
  solution: { en: "Solution", es: "Solución" } as Bi,
  process: { en: "Process", es: "Proceso" } as Bi,
  architecture: { en: "Architecture", es: "Arquitectura" } as Bi,
  role: { en: "My role", es: "Mi rol" } as Bi,
  tech: { en: "Tech", es: "Tech" } as Bi,
  caseStudy: { en: "View case study", es: "Ver caso de estudio" } as Bi,
  status: { en: "Status", es: "Estado" } as Bi,
  stack: { en: "Stack", es: "Stack" } as Bi,
  select: { en: "Select a project", es: "Selecciona un proyecto" } as Bi,
  noCase: { en: "No case study yet", es: "Aún sin caso de estudio" } as Bi,
  carousel: { en: "carousel", es: "carrusel" } as Bi,
  slide: { en: "Project", es: "Proyecto" } as Bi,
  of: { en: "of", es: "de" } as Bi,
  prevProject: { en: "Previous project", es: "Proyecto anterior" } as Bi,
  nextProject: { en: "Next project", es: "Siguiente proyecto" } as Bi,
  trackHint: { en: "Projects, use the arrow keys to move between them", es: "Proyectos, usa las flechas para moverte entre ellos" } as Bi,
};

export interface Project {
  id: string;
  /** Case-study route, only for projects that have one. */
  slug?: string;
  name: string;
  tagline: Bi;
  /** Omitted when the status hasn't been confirmed — never guessed. */
  status?: ProjectStatus;
  accent: string;
  problem: Bi;
  solution: Bi;
  /** Architecture, top to bottom. */
  flow: string[];
  stack: string[];
  /** Short system type, shown as a label. */
  kind: string;
  /** This project's own architecture topology. */
  topology: Topology;
}

export const PROJECTS: Project[] = [
  {
    id: "gbs",
    slug: "gbs-builder",
    name: "GBS Builder",
    tagline: {
      en: "From a manual spreadsheet toward an application integrated with the ERP.",
      es: "De una hoja de cálculo manual a una aplicación integrada con el ERP.",
    },
    status: "development",
    accent: "#8B5CF6",
    problem: {
      en: "Quoting depended on a spreadsheet to calculate costs, margins and prices, bringing together data from Sales, Purchasing and Logistics by hand.",
      es: "La cotización dependía de una hoja de cálculo para calcular costos, márgenes y precios, reuniendo a mano información de Comercial, Compras y Logística.",
    },
    solution: {
      en: "A Full Stack application: a spreadsheet-style Angular interface for quote lines and a Java/Quarkus backend that applies the costing rules and integrates with Odoo.",
      es: "Una aplicación Full Stack: interfaz tipo hoja de cálculo en Angular para las líneas de cotización y un backend Java/Quarkus que aplica las reglas de costeo y se integra con Odoo.",
    },
    flow: ["Angular", "REST API", "Quarkus · Business logic", "Odoo · PostgreSQL"],
    stack: ["Angular", "Java", "Quarkus", "REST API", "PostgreSQL", "Odoo"],
    kind: "COSTING SYSTEM",
    topology: {
      aspect: 0.95,
      nodes: [
        { id: "ui", label: "Angular", sub: "quote lines", x: 50, y: 9 },
        { id: "api", label: "REST API", x: 50, y: 33 },
        { id: "core", label: "Quarkus", sub: "costing rules", x: 50, y: 58 },
        { id: "odoo", label: "Odoo", sub: "XML-RPC", x: 26, y: 88 },
        { id: "db", label: "PostgreSQL", x: 74, y: 88 },
      ],
      edges: [["ui", "api"], ["api", "core"], ["core", "odoo"], ["core", "db"]],
    },
  },
  {
    id: "layoutbuilder",
    slug: "layout-builder",
    name: "LayoutBuilder",
    tagline: {
      en: "Centralizing and validating business information, integrated with Odoo.",
      es: "Centralización y validación de información empresarial integrada con Odoo.",
    },
    accent: "#38BDF8",
    problem: {
      en: "Creating and managing certain records required manual steps and direct dependence on the ERP.",
      es: "La creación y administración de determinados registros requería procesos manuales y dependencia directa del ERP.",
    },
    solution: {
      en: "A decoupled application: the frontend consumes a backend that validates information, runs business rules and talks to different services.",
      es: "Una aplicación desacoplada: el frontend consume un backend que valida la información, ejecuta reglas de negocio y se comunica con diferentes servicios.",
    },
    flow: ["Astro · React", "REST API", "Quarkus · Java", "Business services", "PostgreSQL · Odoo · External services"],
    stack: ["Java", "Quarkus", "React", "Astro", "PostgreSQL", "Odoo"],
    kind: "INTEGRATION PLATFORM",
    topology: {
      aspect: 0.95,
      nodes: [
        { id: "ui", label: "Astro · React", x: 50, y: 9 },
        { id: "core", label: "Java · Quarkus", sub: "validation · rules", x: 50, y: 40 },
        // Two staggered rows so the four integrations never collide.
        { id: "db", label: "PostgreSQL", x: 18, y: 72 },
        { id: "odoo", label: "Odoo", x: 40, y: 93 },
        { id: "sat", label: "SAT", x: 62, y: 72 },
        { id: "discord", label: "Discord", x: 84, y: 93 },
      ],
      edges: [["ui", "core"], ["core", "db"], ["core", "odoo"], ["core", "sat"], ["core", "discord"]],
    },
  },
  {
    id: "crisol",
    name: "El Crisol",
    tagline: { en: "Personal knowledge system.", es: "Sistema personal de conocimiento." },
    status: "definition",
    accent: "#C026D3",
    problem: {
      en: "Context ends up scattered across the different AI tools I work with.",
      es: "El contexto termina disperso entre las distintas herramientas de IA con las que trabajo.",
    },
    solution: {
      en: "A personal system to organize knowledge, retrieve relevant context and share it across AI tools using RAG, structured memory and MCP. Solo project; I’m defining its scope and architecture.",
      es: "Un sistema personal para organizar conocimiento, recuperar contexto relevante y compartirlo entre herramientas de IA mediante RAG, memoria estructurada y MCP. Proyecto individual; estoy definiendo su alcance y arquitectura.",
    },
    flow: ["Sources", "RAG · Memory", "MCP", "AI tools"],
    stack: ["Python", "RAG", "MCP", "PostgreSQL"],
    kind: "KNOWLEDGE SYSTEM · CONCEPT",
    topology: {
      aspect: 0.95,
      nodes: [
        { id: "src", label: "Sources", x: 50, y: 9 },
        { id: "rag", label: "RAG", sub: "retrieval", x: 24, y: 40 },
        { id: "mem", label: "Memory", sub: "structured", x: 76, y: 40 },
        { id: "mcp", label: "MCP", x: 50, y: 66 },
        { id: "ai", label: "AI tools", x: 50, y: 91 },
      ],
      edges: [["src", "rag"], ["src", "mem"], ["rag", "mcp"], ["mem", "mcp"], ["mcp", "ai"]],
    },
  },
];

// Home-page featured case study (GBS Builder).
export const FEATURED = {
  projectId: "gbs",
  problem: {
    en: "The quoting process depended on a spreadsheet used to calculate costs, margins and prices. Every quote meant gathering Sales, Purchasing and Logistics data by hand.",
    es: "El proceso de cotización dependía de una hoja de cálculo utilizada para calcular costos, márgenes y precios. Cada cotización implicaba reunir a mano información de Comercial, Compras y Logística.",
  } as Bi,
  process: ["Quote", "Commercial data", "Costs", "Margin", "Sale price", "Approval"],
  solution: ["Angular", "REST API", "Quarkus", "Business logic", "Odoo / PostgreSQL"],
  role: [
    { en: "Process analysis", es: "Análisis del proceso" },
    { en: "Business-rule modeling", es: "Modelado de reglas" },
    { en: "Backend design", es: "Diseño backend" },
    { en: "API development", es: "Desarrollo de APIs" },
    { en: "Odoo integration", es: "Integración con Odoo" },
    { en: "Frontend implementation", es: "Implementación frontend" },
    { en: "Error handling", es: "Manejo de errores" },
    { en: "Data modeling", es: "Modelado de datos" },
  ] as Bi[],
  team: {
    en: "Built together with the team; persistence and traceability are shared work.",
    es: "Construido junto con el equipo; la persistencia y la trazabilidad son trabajo compartido.",
  } as Bi,
};

// ── Case studies (/projects/<slug>) ─────────────────────────────────────────
// Sections follow the 01 Context → 10 What I learned structure, but only the
// ones backed by real information are included.

export interface CaseSection {
  title: string;
  body?: Bi;
  list?: Bi[];
  flow?: string[];
}

export interface CaseStudy {
  slug: string;
  projectId: string;
  sections: CaseSection[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "gbs-builder",
    projectId: "gbs",
    sections: [
      {
        title: "Context",
        body: {
          en: "Quoting a promotional-product order means calculating cost, margin and sale price with data owned by three areas: Sales, Purchasing and Logistics.",
          es: "Cotizar un pedido de producto promocional implica calcular costo, margen y precio de venta con información que pertenece a tres áreas: Comercial, Compras y Logística.",
        },
      },
      {
        title: "Problem",
        body: {
          en: "The process ran on a spreadsheet (GBS Nacional). Bulk data entry was slow and error-prone, and the data had to be gathered by hand from different sources.",
          es: "El proceso vivía en una hoja de cálculo (GBS Nacional). La captura masiva era lenta y propensa a errores, y la información se reunía a mano desde distintas fuentes.",
        },
      },
      {
        title: "Process",
        flow: ["Quote", "Commercial data", "Costs", "Margin", "Sale price", "Approval"],
        body: {
          en: "Each line works with product description, pieces, waste, unit cost, customization and logistics cost; from there come net cost, target margin, sale price and the project total.",
          es: "Cada línea trabaja con descripción del producto, piezas, merma, costo unitario, personalización y costo logístico; de ahí salen el costo neto, el margen objetivo, el precio de venta y el total del proyecto.",
        },
      },
      {
        title: "Requirements",
        list: [
          { en: "Bulk, spreadsheet-style data entry for quote lines.", es: "Captura masiva de líneas de cotización con una interfaz tipo hoja de cálculo." },
          { en: "Apply the same costing and pricing rules the business already used.", es: "Aplicar las mismas reglas de costeo y precio que el negocio ya utilizaba." },
          { en: "Read and consolidate data from Odoo.", es: "Leer y consolidar información desde Odoo." },
          { en: "Identify line items consistently across systems.", es: "Identificar las partidas de forma consistente entre sistemas." },
        ],
      },
      {
        title: "Architecture",
        flow: ["Angular", "REST API", "Quarkus", "Business logic", "Odoo / PostgreSQL"],
        body: {
          en: "The interface only captures and displays; the calculation rules live in the backend, which is also the only piece that talks to Odoo (XML-RPC).",
          es: "La interfaz solo captura y muestra; las reglas de cálculo viven en el backend, que también es la única pieza que se comunica con Odoo (XML-RPC).",
        },
      },
      {
        title: "Solution",
        body: {
          en: "A web application with a spreadsheet-style Angular interface and a Java 21 / Quarkus backend that reads and consolidates Odoo data and applies the costing and pricing rules.",
          es: "Una aplicación web con interfaz tipo hoja de cálculo en Angular y un backend en Java 21 / Quarkus que lee y consolida datos de Odoo y aplica las reglas de costeo y precio.",
        },
      },
      {
        title: "Technical Decisions",
        list: [
          {
            en: "Consolidate line items with one consistent identification across systems, so the same quoting logic works whether data comes from spreadsheet habits or straight from Odoo.",
            es: "Consolidar las partidas con una identificación consistente entre sistemas, para que la misma lógica de cotización funcione tanto con datos que vienen de la costumbre en hoja de cálculo como directo de Odoo.",
          },
          {
            en: "Keep business rules in the backend, not in the interface, so they can be validated and reused.",
            es: "Mantener las reglas de negocio en el backend y no en la interfaz, para poder validarlas y reutilizarlas.",
          },
        ],
      },
      {
        title: "Challenges",
        body: {
          en: "Translating rules that lived inside spreadsheet formulas into explicit, testable logic without changing how the business calculates a quote.",
          es: "Llevar reglas que vivían dentro de fórmulas de hoja de cálculo a lógica explícita y comprobable, sin cambiar la forma en que el negocio calcula una cotización.",
        },
      },
      {
        title: "Result",
        body: {
          en: "In development. The capture interface and the calculation rules are centralized in one application integrated with the ERP; persistence and traceability are being built with the team. Next: validate the core, then track budgeted vs. quoted and projected vs. actual figures.",
          es: "En desarrollo. La captura y las reglas de cálculo quedan centralizadas en una aplicación integrada con el ERP; la persistencia y la trazabilidad se construyen con el equipo. Siguiente paso: validar el núcleo y después dar seguimiento a lo presupuestado contra lo cotizado y lo proyectado contra lo real.",
        },
      },
    ],
  },
  {
    slug: "layout-builder",
    projectId: "layoutbuilder",
    sections: [
      {
        title: "Problem",
        body: {
          en: "Creating and managing certain records required manual steps and direct dependence on the ERP.",
          es: "La creación y administración de determinados registros requería procesos manuales y dependencia directa del ERP.",
        },
      },
      {
        title: "Process",
        flow: ["Capture", "Validation", "Business rules", "Distribution to services"],
        body: {
          en: "Information is captured in a spreadsheet-style interface, validated, transformed and then distributed to the services that need it.",
          es: "La información se captura en una interfaz tipo hoja de cálculo, se valida, se transforma y después se distribuye a los servicios que la necesitan.",
        },
      },
      {
        title: "Requirements",
        list: [
          { en: "Validate information before it reaches the ERP, including SAT validation.", es: "Validar la información antes de que llegue al ERP, incluida la validación con el SAT." },
          { en: "Persist records in PostgreSQL and synchronize them with Odoo.", es: "Persistir registros en PostgreSQL y sincronizarlos con Odoo." },
          { en: "Notify through Discord.", es: "Notificar mediante Discord." },
          { en: "Authenticated access (JWT).", es: "Acceso autenticado (JWT)." },
        ],
      },
      {
        title: "Architecture",
        flow: ["Astro / React", "REST API", "Quarkus / Java", "Business services", "PostgreSQL · Odoo · External services"],
      },
      {
        title: "Solution",
        body: {
          en: "A decoupled application where the frontend consumes a backend in charge of validating information, running business rules and communicating with different services.",
          es: "Una aplicación desacoplada donde el frontend consume un backend encargado de validar la información, ejecutar reglas de negocio y comunicarse con diferentes servicios.",
        },
      },
      {
        title: "Technical Decisions",
        list: [
          {
            en: "Hexagonal architecture: Odoo, SAT validation, Discord notifications and PostgreSQL are adapters around the domain, so each integration can change without touching the rules.",
            es: "Arquitectura hexagonal: Odoo, la validación SAT, las notificaciones en Discord y PostgreSQL son adaptadores alrededor del dominio, así cada integración puede cambiar sin tocar las reglas.",
          },
          { en: "XML-RPC to communicate with Odoo.", es: "XML-RPC para comunicarse con Odoo." },
          { en: "JWT for authentication.", es: "JWT para autenticación." },
          { en: "Centralized validation and error handling in the backend.", es: "Validación y manejo de errores centralizados en el backend." },
        ],
      },
    ],
  },
];

// ── Process ─────────────────────────────────────────────────────────────────

const chain = (labels: string[]): Topology => ({
  aspect: 3.2,
  nodes: labels.map((label, i) => ({ id: `n${i}`, label, x: 14 + (i * 72) / Math.max(1, labels.length - 1), y: 50 })),
  edges: labels.slice(1).map((_, i) => [`n${i}`, `n${i + 1}`] as [string, string]),
});

export const PROCESS_STEPS: { n: string; icon: string; accent: string; title: string; body: Bi; tags: string[]; micro: Topology }[] = [
  {
    n: "01",
    icon: "◎",
    accent: "#A78BFA",
    title: "Understand",
    body: {
      en: "I analyze and map the current process to identify the system’s real needs.",
      es: "Analizo y diagramo el proceso actual para identificar las necesidades reales del sistema.",
    },
    tags: ["Users", "Problems", "Constraints", "Goals"],
    micro: chain(["USER", "PROCESS", "PROBLEM"]),
  },
  {
    n: "02",
    icon: "◇",
    accent: "#A78BFA",
    title: "Model",
    body: {
      en: "I structure the business rules, data, entities and relationships the solution will contain.",
      es: "Estructuro las reglas de negocio, datos, entidades y relaciones que formarán parte de la solución.",
    },
    tags: ["Rules", "Data", "Entities", "Dependencies"],
    micro: chain(["RULES", "ENTITIES", "MODEL"]),
  },
  {
    n: "03",
    icon: "◧",
    accent: "#60A5FA",
    title: "Design",
    body: {
      en: "I define responsibilities, architecture and how the system’s components communicate.",
      es: "Defino responsabilidades, arquitectura y comunicación entre los diferentes componentes del sistema.",
    },
    tags: ["Architecture", "APIs", "Services", "Contracts"],
    micro: chain(["MODEL", "CONTRACTS", "ARCHITECTURE"]),
  },
  {
    n: "04",
    icon: "</>",
    accent: "#38BDF8",
    title: "Build",
    body: {
      en: "I implement the solution with the right technology for each responsibility.",
      es: "Implemento la solución utilizando tecnologías adecuadas para cada responsabilidad.",
    },
    tags: ["Frontend", "Backend", "Database", "Integrations"],
    micro: chain(["UI", "API", "DATA"]),
  },
  {
    n: "05",
    icon: "✓",
    accent: "#E879F9",
    title: "Validate",
    body: {
      en: "I test the solution with scenarios taken from how the process really works.",
      es: "Pruebo la solución utilizando escenarios relacionados con el funcionamiento real del proceso.",
    },
    tags: ["Testing", "Errors", "Edge cases", "Validation"],
    micro: chain(["INPUT", "TEST", "✓"]),
  },
  {
    n: "06",
    icon: "↻",
    accent: "#E879F9",
    title: "Improve",
    body: {
      en: "I look at how the solution behaves and improve its maintainability, performance and experience.",
      es: "Analizo el comportamiento de la solución y realizo mejoras orientadas a mantenibilidad, rendimiento y experiencia.",
    },
    tags: ["Performance", "Maintainability", "Automation", "Iteration"],
    micro: chain(["FEEDBACK", "ITERATION", "v2"]),
  },
];

// ── System thinking ─────────────────────────────────────────────────────────

export interface SystemNode {
  id: string;
  label: string;
  tech?: string;
  area: string;
  body: Bi;
}

export const SYSTEM_NODES: SystemNode[] = [
  { id: "user", label: "User", area: "People", body: { en: "Someone trying to get a task done — the reason the system exists.", es: "Alguien que intenta completar una tarea: la razón por la que existe el sistema." } },
  { id: "frontend", label: "Frontend", tech: "Angular · React", area: "Frontend", body: { en: "The interface that simplifies how the user interacts with the process.", es: "La interfaz que simplifica la interacción del usuario con el proceso." } },
  { id: "api", label: "REST API", tech: "Contracts", area: "API", body: { en: "The contracts that connect the different components.", es: "Los contratos responsables de conectar los diferentes componentes." } },
  { id: "backend", label: "Backend", tech: "Quarkus · Spring · FastAPI", area: "Services", body: { en: "Services that receive requests, validate them and coordinate the work.", es: "Servicios que reciben las peticiones, las validan y coordinan el trabajo." } },
  { id: "domain", label: "Domain", tech: "Business logic", area: "Domain", body: { en: "Where the business rules live.", es: "El lugar donde viven las reglas del negocio." } },
  { id: "data", label: "Database", tech: "PostgreSQL · MySQL", area: "Data", body: { en: "Persistence and the structure of the information.", es: "Persistencia y estructura de la información." } },
  { id: "external", label: "External services", tech: "Odoo · APIs", area: "Integrations", body: { en: "Communication with other systems.", es: "Comunicación con otros sistemas." } },
];

export const SYSTEM_HINT: Bi = {
  en: "Hover or focus a component to see its responsibility.",
  es: "Pasa el cursor o enfoca un componente para ver su responsabilidad.",
};

// ── About ───────────────────────────────────────────────────────────────────

export const ABOUT = {
  lead: {
    en: "First I try to understand what problem we’re trying to solve.",
    es: "Primero intento entender qué problema estamos intentando resolver.",
  } as Bi,
  paragraphs: [
    {
      en: "I analyze the process and identify its rules, data, actors and constraints. Then I model the solution and define how its components should communicate. Finally I build the system, aiming for it to be clear, maintainable and ready to evolve.",
      es: "Analizo el proceso, identifico sus reglas, datos, actores y restricciones. Después modelo la solución y defino cómo deben comunicarse sus componentes. Finalmente construyo el sistema procurando que sea claro, mantenible y preparado para evolucionar.",
    },
    {
      en: "My experience has centered on business applications, APIs, integrations and process automation with Java, Python, TypeScript and Full Stack technologies. I’m currently deepening my knowledge of software architecture, system design and solution design.",
      es: "Mi experiencia se ha centrado principalmente en aplicaciones empresariales, APIs, integraciones y automatización de procesos utilizando Java, Python, TypeScript y tecnologías de desarrollo Full Stack. Actualmente continúo desarrollando mis conocimientos en arquitectura de software, system design y diseño de soluciones.",
    },
  ] as Bi[],
  levels: [
    { k: "CODE", v: { en: "I know how to build software.", es: "Sé construir software." } },
    { k: "ENGINEERING", v: { en: "I know how to structure and design solutions.", es: "Sé estructurar y diseñar soluciones." } },
    { k: "BUSINESS", v: { en: "I understand the problem the technology is meant to solve.", es: "Entiendo el problema que la tecnología intenta resolver." } },
  ] as { k: string; v: Bi }[],
  annotations: [
    { k: "BASED IN", v: { en: "Mexico", es: "México" } },
    { k: "CURRENT", v: { en: "Full Stack Development", es: "Full Stack Development" } },
    { k: "STUDYING", v: { en: "Informática · IPN", es: "Informática · IPN" } },
    { k: "DIRECTION", v: { en: "Software Engineering", es: "Software Engineering" } },
  ] as { k: string; v: Bi }[],
  softLabel: { en: "How I work with people", es: "Cómo trabajo con personas" } as Bi,
  softEditorial: [
    { word: "ANALYZE", body: { en: "Understand rules, data and dependencies.", es: "Entender reglas, datos y dependencias." } },
    { word: "TRANSLATE", body: { en: "Turn operational needs into technical decisions.", es: "Convertir necesidades operativas en decisiones técnicas." } },
    { word: "COLLABORATE", body: { en: "Connect users, business and development.", es: "Conectar usuarios, negocio y desarrollo." } },
    { word: "ORGANIZE", body: { en: "Turn goals into executable work.", es: "Convertir objetivos en trabajo ejecutable." } },
  ] as { word: string; body: Bi }[],
  soft: [
    { en: "Analytical thinking", es: "Pensamiento analítico" },
    { en: "Problem solving", es: "Resolución de problemas" },
    { en: "Technical communication", es: "Comunicación técnica" },
    { en: "Team collaboration", es: "Colaboración en equipo" },
    { en: "Requirements gathering", es: "Levantamiento de requerimientos" },
    { en: "Adaptability", es: "Adaptabilidad" },
    { en: "Continuous learning", es: "Aprendizaje continuo" },
    { en: "Organization", es: "Organización" },
    { en: "Documentation", es: "Documentación" },
  ] as Bi[],
};

// ── Stack ───────────────────────────────────────────────────────────────────

export interface StackGroup {
  id: string;
  title: string;
  accent: string;
  description: Bi;
  /** Rows of related items (language → frameworks → protocols, …). */
  rows: string[][];
  emphasis?: boolean;
}

export const STACK: StackGroup[] = [
  {
    id: "backend",
    title: "Backend",
    accent: "#38BDF8",
    description: { en: "Services, APIs, validation and business logic.", es: "Servicios, APIs, validaciones y lógica de negocio." },
    rows: [["Java", "Python"], ["Quarkus", "Spring Boot", "FastAPI"], ["REST APIs", "JWT", "XML-RPC"]],
  },
  {
    id: "frontend",
    title: "Frontend",
    accent: "#8B5CF6",
    description: { en: "Interfaces and flows connected to backend services.", es: "Interfaces y flujos conectados con servicios backend." },
    rows: [["TypeScript", "JavaScript"], ["Angular", "React", "Astro"], ["Tailwind CSS", "HTML", "CSS"]],
  },
  {
    id: "data",
    title: "Data",
    accent: "#A78BFA",
    description: { en: "Modeling, querying and persisting the information applications rely on.", es: "Modelar, consultar y persistir la información que usan las aplicaciones." },
    rows: [["PostgreSQL", "MySQL", "MariaDB"], ["SQL", "Relational Modeling", "Database Design"]],
  },
  {
    id: "architecture",
    title: "Architecture",
    accent: "#60A5FA",
    description: { en: "Organizing rules, components and responsibilities so solutions stay maintainable.", es: "Organizar reglas, componentes y responsabilidades para que las soluciones sean mantenibles." },
    rows: [["Hexagonal Architecture", "Clean Architecture", "MVC"], ["Design Patterns", "API Design", "Domain Modeling"]],
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    accent: "#C026D3",
    description: { en: "Customizing and integrating ERPs, and automating business processes.", es: "Personalizar e integrar ERPs y automatizar procesos de negocio." },
    rows: [["Odoo"], ["ERP Integrations", "QWeb", "XML"], ["Business Process Automation"]],
  },
  {
    id: "engineering",
    title: "Engineering",
    accent: "#22D3EE",
    description: {
      en: "The part that isn’t code: understanding the problem, modeling it and leaving it documented.",
      es: "La parte que no es código: entender el problema, modelarlo y dejarlo documentado.",
    },
    rows: [["Business Analysis", "Requirements Analysis", "Process Modeling"], ["System Design", "Problem Solving", "Technical Documentation"]],
    emphasis: true,
  },
  {
    id: "tools",
    title: "Tools",
    accent: "#94A3B8",
    description: { en: "From the idea to a validated delivery.", es: "De la idea a una entrega validada." },
    rows: [["Git", "GitHub", "Docker"], ["Linux", "Maven", "Postman", "Jira"]],
  },
];

export const STACK_EMPHASIS_LABEL: Bi = { en: "Beyond code", es: "Más allá del código" };

export const STACK_CENTER = "SOFTWARE DEVELOPMENT";
export const STACK_HINT: Bi = {
  en: "Hover or select an area to see what it includes.",
  es: "Pasa el cursor o selecciona un área para ver qué incluye.",
};

/** How the tools combine in real projects — relationships, not a logo wall. */
export const STACK_CHAINS: { project: string; steps: string[] }[] = [
  { project: "GBS Builder", steps: ["Angular", "REST API", "Quarkus", "Odoo · XML-RPC"] },
  { project: "LayoutBuilder", steps: ["Astro · React", "REST API", "Quarkus", "PostgreSQL · Odoo · SAT"] },
  { project: "El Crisol · concept", steps: ["Python", "RAG", "MCP", "AI tools"] },
];
export const STACK_CHAINS_LABEL: Bi = { en: "How they work together", es: "Cómo trabajan juntas" };

// ── Experience ──────────────────────────────────────────────────────────────

export interface Role {
  /** Official job title, kept exactly as given in both languages. */
  title: string;
  /** What the work covered — a description, not a different title. */
  focus: string;
  /** Visual shorthand of the official title, for the growth trajectory only. */
  short: string;
  period: Bi;
  current?: boolean;
  context: Bi;
  work: Bi[];
  tech: string[];
}

export const EXPERIENCE_LABELS = {
  current: { en: "Current", es: "Actual" } as Bi,
  growth: { en: "Trajectory", es: "Trayectoria" } as Bi,
  now: { en: "NOW", es: "HOY" } as Bi,
  tech: { en: "Tech", es: "Tech" } as Bi,
};

export const EXPERIENCE: { company: string; accent: string; span: Bi; roles: Role[] }[] = [
  {
    company: "CPA Grup",
    accent: "#8B5CF6",
    span: { en: "3 roles · March 2025 – present", es: "3 etapas · marzo de 2025 – actualidad" },
    roles: [
      {
        title: "Full Stack Developer y Líder Técnico Odoo",
        short: "Full Stack · Líder Técnico",
        focus: "Software Development & Technical Coordination",
        period: { en: "June 2026 – present", es: "Junio de 2026 – actualidad" },
        current: true,
        context: {
          en: "Internal applications and integrations that support sales, purchasing and inventory processes.",
          es: "Aplicaciones e integraciones internas que apoyan procesos de ventas, compras e inventarios.",
        },
        work: [
          { en: "I develop applications, backend services and integrations, such as the GBS Builder quoting tool.", es: "Desarrollo aplicaciones, servicios backend e integraciones, como la herramienta de cotización GBS Builder." },
          { en: "I analyze requirements with business areas and document them.", es: "Analizo requerimientos con las áreas de negocio y los documento." },
          { en: "I coordinate sprints and follow up on technical work.", es: "Coordino sprints y doy seguimiento al trabajo técnico." },
        ],
        tech: ["Java 21", "Quarkus", "Angular", "Odoo 18", "XML-RPC", "PostgreSQL"],
      },
      {
        title: "Auxiliar de Soporte Odoo",
        short: "Auxiliar de Soporte",
        focus: "Software Development & ERP Integrations",
        period: { en: "February 2026 – June 2026", es: "Febrero de 2026 – junio de 2026" },
        context: {
          en: "Support and internal development around the company’s ERP and its operational processes.",
          es: "Soporte y desarrollo interno alrededor del ERP de la empresa y sus procesos operativos.",
        },
        work: [
          { en: "Designed and built Odoo 18 solutions for ticket management and automated data loads.", es: "Diseñé e implementé soluciones en Odoo 18 para gestión de tickets y automatización de carga de datos." },
          { en: "Built automated verification in Discord to check data integrity.", es: "Implementé verificaciones automatizadas en Discord para asegurar la integridad de la información." },
          { en: "Developed features with JWT-based security.", es: "Desarrollé funcionalidades con seguridad basada en JWT." },
          { en: "Diagnosed incidents and supported users on operational processes, security and traceability.", es: "Diagnostiqué incidencias y apoyé a usuarios en procesos operativos, seguridad y trazabilidad." },
          { en: "Coordinated the team’s work in Jira and documented flows.", es: "Coordiné el trabajo del equipo en Jira y documenté flujos." },
        ],
        tech: ["Odoo 18", "Java", "Quarkus", "JWT", "PostgreSQL", "Jira"],
      },
      {
        title: "Becario de Soporte Odoo ERP",
        short: "Becario",
        focus: "ERP Configuration & Data Migration",
        period: { en: "March 2025 – February 2026", es: "Marzo de 2025 – febrero de 2026" },
        context: {
          en: "My first contact with a real ERP operation: sales, purchasing and inventory flows.",
          es: "Mi primer contacto con la operación real de un ERP: flujos de ventas, compras e inventarios.",
        },
        work: [
          { en: "Configured modules, views and reports aligned with business processes.", es: "Configuré módulos, vistas y reportes alineados a procesos de negocio." },
          { en: "Managed incidents in Jira and documented internal processes.", es: "Gestioné incidencias en Jira y documenté procesos internos." },
          { en: "Took part in migrations and bulk data loads.", es: "Participé en migraciones y cargas masivas de información." },
        ],
        tech: ["Odoo", "XML", "QWeb", "Jira"],
      },
    ],
  },
  {
    company: "Corporativo Emeth",
    accent: "#38BDF8",
    span: { en: "Social service", es: "Servicio social" },
    roles: [
      {
        title: "Desarrollador Backend de Servicio Social",
        short: "Backend · Servicio Social",
        focus: "Backend Development",
        period: { en: "July 2025 – January 2026", es: "Julio de 2025 – enero de 2026" },
        context: {
          en: "Backend services for a data-heavy application, in parallel with my ERP role.",
          es: "Servicios backend para una aplicación con alto volumen de datos, en paralelo a mi rol en ERP.",
        },
        work: [
          { en: "Developed backend services in Java with hexagonal architecture and SOLID principles.", es: "Desarrollé servicios backend en Java con arquitectura hexagonal y principios SOLID." },
          { en: "Built REST APIs and optimized SQL queries for high data volumes.", es: "Implementé APIs REST y optimicé consultas SQL para alto volumen de datos." },
          { en: "Used Docker and Git for reproducible environments and version control.", es: "Utilicé Docker y Git para entornos reproducibles y control de versiones." },
        ],
        tech: ["Java", "REST APIs", "SQL", "Docker", "Git"],
      },
    ],
  },
];

// ── Education & direction ───────────────────────────────────────────────────

export const EDUCATION = {
  degree: "Ingeniería en Informática",
  school: "Instituto Politécnico Nacional · UPIICSA",
  graduation: { en: "Expected graduation: December 2026", es: "Graduación prevista: diciembre de 2026" } as Bi,
  languages: { en: "Spanish (native) · English (technical)", es: "Español (nativo) · Inglés (técnico)" } as Bi,
};

export const DIRECTION: { when: Bi; title: string; detail: string; state: "past" | "now" | "next" }[] = [
  { when: { en: "2025", es: "2025" }, title: "Backend Development", detail: "Java · APIs · SQL", state: "past" },
  { when: { en: "2026", es: "2026" }, title: "Full Stack & Enterprise Systems", detail: "Angular · Quarkus · Integrations", state: "past" },
  { when: { en: "NOW", es: "HOY" }, title: "Software Engineering", detail: "Architecture · System Design · Business Logic", state: "now" },
  { when: { en: "DIRECTION", es: "DIRECCIÓN" }, title: "Solutions Architecture", detail: "", state: "next" },
];

export const DIRECTION_NOTE: Bi = {
  en: "Solutions Architecture is where I’m growing toward, not my current role.",
  es: "Solutions Architecture es hacia donde estoy creciendo, no mi rol actual.",
};

// ── Contact ─────────────────────────────────────────────────────────────────

export const CONTACT = {
  email: "marioyaelgg@gmail.com",
  github: "https://github.com/MaelRD",
  site: "https://maeldev.netlify.app/",
  ctaPrimary: { en: "Write to me", es: "Escríbeme" } as Bi,
  links: {
    email: { en: "Email", es: "Correo" } as Bi,
    github: { en: "GitHub", es: "GitHub" } as Bi,
    cv: { en: "CV (PDF)", es: "CV (PDF)" } as Bi,
  },
};

export const FOOTER = {
  name: "Mario Yael Gordillo García",
  based: { en: "Mexico City", es: "Ciudad de México" } as Bi,
};
