// Content for the MAEL portfolio. Every user-facing string is bilingual
// (`en`/`es`) so components can pick `copy[lang]` directly.
//
// Rules this file follows (see the content brief, 2026-09-25):
// - First person, concrete, no invented metrics, clients or results.
// - Project status is only shown when it has been confirmed.
// - Job titles and periods match the brief exactly; only descriptions are
//   translated.
// - Odoo is one tool among others, not the headline.

export type Lang = "en" | "es";

export interface Bi {
  en: string;
  es: string;
}

export const META = {
  title: "Mario Yael | Full Stack Developer",
  description: {
    es: "Portafolio de Mario Yael, desarrollador Full Stack enfocado en aplicaciones web, backend, bases de datos e integración de sistemas.",
    en: "Portfolio of Mario Yael, a Full Stack Developer focused on web applications, backend development, databases and system integration.",
  } as Bi,
};

export const UI = {
  skip: { en: "Skip to content", es: "Saltar al contenido" } as Bi,
  menuOpen: { en: "Open menu", es: "Abrir menú" } as Bi,
  menuClose: { en: "Close menu", es: "Cerrar menú" } as Bi,
  navLabel: { en: "Main navigation", es: "Navegación principal" } as Bi,
  langLabel: { en: "Language", es: "Idioma" } as Bi,
  home: { en: "Mario Yael, back to top", es: "Mario Yael, volver al inicio" } as Bi,
};

// `id` must match a section id rendered in CosmicApp.
export const NAV_LINKS: { id: string; label: Bi }[] = [
  { id: "hero", label: { en: "Home", es: "Inicio" } },
  { id: "projects", label: { en: "Projects", es: "Proyectos" } },
  { id: "process", label: { en: "Process", es: "Proceso" } },
  { id: "experience", label: { en: "Experience", es: "Experiencia" } },
  { id: "skills", label: { en: "Skills", es: "Habilidades" } },
  { id: "about", label: { en: "About", es: "Sobre mí" } },
  { id: "contact", label: { en: "Contact", es: "Contacto" } },
];

export const BRAND = {
  name: "MARIO YAEL",
  role: { en: "FULL STACK DEVELOPER", es: "DESARROLLADOR FULL STACK" } as Bi,
};

export const CV_PATH = "/cv.pdf";

export const HERO = {
  eyebrow: { en: "FULL STACK DEVELOPER", es: "DESARROLLADOR FULL STACK" } as Bi,
  headline: {
    en: { lead: "I like understanding how things work.", highlight: "And making them work better." },
    es: { lead: "Me gusta entender cómo funcionan las cosas.", highlight: "Y hacerlas funcionar mejor." },
  },
  body: {
    en: "I’m Mario. I analyze processes, organize their logic, and build the interfaces, services and integrations each solution needs.",
    es: "Soy Mario. Analizo procesos, organizo su lógica y construyo las interfaces, servicios e integraciones que necesita cada solución.",
  } as Bi,
  ctaPrimary: { en: "View my projects", es: "Ver mis proyectos" } as Bi,
  ctaSecondary: { en: "Download CV", es: "Descargar CV" } as Bi,
  areas: { en: "Frontend · Backend · Data · Integration", es: "Frontend · Backend · Datos · Integración" } as Bi,
  orbitLabel: {
    en: "Diagram: a solution at the center, connected to people, processes, data, services and integrations.",
    es: "Diagrama: una solución al centro, conectada con personas, procesos, datos, servicios e integraciones.",
  } as Bi,
  orbitCenter: { en: "SOLUTION", es: "SOLUCIÓN" } as Bi,
  orbitNodes: [
    { en: "PEOPLE", es: "PERSONAS" },
    { en: "PROCESSES", es: "PROCESOS" },
    { en: "DATA", es: "DATOS" },
    { en: "SERVICES", es: "SERVICIOS" },
    { en: "INTEGRATIONS", es: "INTEGRACIONES" },
  ] as Bi[],
};

export interface SectionHeader {
  index: string;
  eyebrow: Bi;
  title: Bi;
  intro?: Bi;
}

export const SECTIONS: Record<"projects" | "process" | "experience" | "skills" | "softSkills" | "about" | "contact", SectionHeader> = {
  projects: {
    index: "01",
    eyebrow: { en: "PROJECTS", es: "PROYECTOS" },
    title: { en: "Selected projects", es: "Proyectos seleccionados" },
    intro: {
      en: "What each project solves, what I did in it, and where it stands today.",
      es: "Qué resuelve cada proyecto, qué hice en él y en qué punto está hoy.",
    },
  },
  process: {
    index: "02",
    eyebrow: { en: "PROCESS", es: "PROCESO" },
    title: { en: "How I turn a problem into a solution", es: "Cómo convierto un problema en una solución" },
    intro: {
      en: "The code comes after understanding what needs to work and why.",
      es: "El código llega después de entender qué necesita funcionar y por qué.",
    },
  },
  experience: {
    index: "03",
    eyebrow: { en: "EXPERIENCE", es: "EXPERIENCIA" },
    title: { en: "Professional experience", es: "Experiencia profesional" },
  },
  skills: {
    index: "04",
    eyebrow: { en: "SKILLS", es: "HABILIDADES" },
    title: { en: "Technical skills", es: "Habilidades técnicas" },
    intro: {
      en: "Grouped by what they let me build, not by how many there are.",
      es: "Agrupadas por lo que me permiten construir, no por cuántas son.",
    },
  },
  softSkills: {
    index: "05",
    eyebrow: { en: "HOW I COLLABORATE", es: "CÓMO COLABORO" },
    title: { en: "Soft skills", es: "Habilidades blandas" },
  },
  about: {
    index: "06",
    eyebrow: { en: "ABOUT", es: "SOBRE MÍ" },
    title: { en: "About me and education", es: "Sobre mí y formación" },
  },
  contact: {
    index: "07",
    eyebrow: { en: "CONTACT", es: "CONTACTO" },
    title: { en: "Let’s build something that actually works.", es: "Construyamos algo que realmente funcione." },
    intro: {
      en: "If you have an opportunity, a project or an interesting problem to solve, I’d like to hear about it.",
      es: "Si tienes una oportunidad, un proyecto o un problema interesante por resolver, me gustaría conocerlo.",
    },
  },
};

// ── Projects ────────────────────────────────────────────────────────────────

export type ProjectStatus = "development" | "definition" | "completed";

export const STATUS_LABELS: Record<ProjectStatus, Bi> = {
  development: { en: "In development", es: "En desarrollo" },
  definition: { en: "In definition · early development", es: "En definición · desarrollo inicial" },
  completed: { en: "Completed", es: "Completado" },
};

export const PROJECT_LABELS = {
  purpose: { en: "Purpose", es: "Propósito" } as Bi,
  contribution: { en: "My contribution", es: "Mi aportación" } as Bi,
  stack: { en: "Main technologies", es: "Tecnologías principales" } as Bi,
  flow: { en: "How it’s connected", es: "Cómo se conecta" } as Bi,
  logic: { en: "Calculation chain", es: "Cadena de cálculo" } as Bi,
  next: { en: "Future evolution · not built yet", es: "Evolución futura · aún no implementada" } as Bi,
  featured: { en: "Main project", es: "Proyecto principal" } as Bi,
  carousel: { en: "carousel", es: "carrusel" } as Bi,
  slide: { en: "Project", es: "Proyecto" } as Bi,
  of: { en: "of", es: "de" } as Bi,
  prevProject: { en: "Previous project", es: "Proyecto anterior" } as Bi,
  nextProject: { en: "Next project", es: "Siguiente proyecto" } as Bi,
  trackHint: { en: "Projects, use the arrow keys to move between them", es: "Proyectos, usa las flechas para moverte entre ellos" } as Bi,
};

export interface Project {
  id: string;
  name: string;
  subtitle: Bi;
  /** Omitted when the status hasn't been confirmed — never guessed. */
  status?: ProjectStatus;
  accent: string;
  purpose: Bi;
  detail?: Bi;
  /** Omitted when there is no confirmed description of my part. */
  contribution?: Bi;
  stack: string[];
  /** Left-to-right architecture flow; each node can list several parts. */
  flow: Bi[];
  logic?: Bi[];
  next?: Bi;
  /** Only set when a real case-study page exists. */
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "gbs",
    name: "GBS Builder",
    subtitle: { en: "Costing and quotation system", es: "Sistema de costeo y cotización" },
    status: "development",
    accent: "#8B5CF6",
    purpose: {
      en: "A Full Stack application that brings together Sales, Purchasing and Logistics data to support cost, margin and selling-price calculations. It combines a spreadsheet-style Angular interface with a Java and Quarkus backend connected to Odoo.",
      es: "Aplicación Full Stack que reúne información de Comercial, Compras y Logística para apoyar el cálculo de costos, margen y precio de venta. Combina una interfaz de captura masiva en Angular con un backend Java y Quarkus conectado con Odoo.",
    },
    contribution: {
      en: "I have worked on process analysis, calculation rules, component integration and functional validation. The application also includes coordinated work with the team.",
      es: "He trabajado en el análisis del proceso, las reglas de cálculo, la integración entre componentes y la validación funcional del sistema. El desarrollo también incluye trabajo coordinado con el equipo.",
    },
    stack: ["Angular", "Java 21", "Quarkus", "XML-RPC", "Odoo"],
    flow: [
      { en: "Angular · bulk data entry", es: "Angular · captura masiva" },
      { en: "Java 21 · Quarkus · calculation rules", es: "Java 21 · Quarkus · reglas de cálculo" },
      { en: "Odoo · XML-RPC", es: "Odoo · XML-RPC" },
    ],
    logic: [
      { en: "Costs", es: "Costos" },
      { en: "Net cost", es: "Costo neto" },
      { en: "Target margin", es: "Margen objetivo" },
      { en: "Selling price", es: "Precio de venta" },
    ],
    next: {
      en: "Tracking budgeted figures against quoted or actual ones.",
      es: "Seguimiento de lo presupuestado contra lo cotizado o real.",
    },
  },
  {
    id: "layoutbuilder",
    name: "LayoutBuilder",
    subtitle: { en: "Data capture and system integration", es: "Captura de datos e integración de sistemas" },
    accent: "#38BDF8",
    purpose: {
      en: "A Full Stack application with a spreadsheet-style interface and a modular backend that validates, transforms and distributes information across different services.",
      es: "Aplicación Full Stack con una interfaz tipo spreadsheet y un backend modular que valida, transforma y distribuye información entre diferentes servicios.",
    },
    detail: {
      en: "It uses Astro and React on the frontend, Java and Quarkus on the backend, PostgreSQL for persistence, and integrations with Odoo, SAT and Discord.",
      es: "Utiliza Astro y React en frontend, Java y Quarkus en backend, PostgreSQL para persistencia e integraciones con Odoo, SAT y Discord.",
    },
    stack: ["Astro", "React", "Java 21", "Quarkus", "PostgreSQL"],
    flow: [
      { en: "Astro · React", es: "Astro · React" },
      { en: "Java 21 · Quarkus", es: "Java 21 · Quarkus" },
      { en: "PostgreSQL · Odoo · SAT · Discord", es: "PostgreSQL · Odoo · SAT · Discord" },
    ],
  },
  {
    id: "crisol",
    name: "El Crisol",
    subtitle: { en: "Personal knowledge system", es: "Sistema personal de conocimiento" },
    status: "definition",
    accent: "#C026D3",
    purpose: {
      en: "A personal knowledge system designed to organize information, retrieve relevant context and share it across different AI tools using RAG, structured memory and MCP.",
      es: "Proyecto personal para organizar conocimiento, recuperar información relevante y compartir contexto entre diferentes herramientas de inteligencia artificial mediante RAG, memoria estructurada y MCP.",
    },
    contribution: {
      en: "Solo project. I’m defining its scope and architecture.",
      es: "Proyecto individual. Estoy definiendo su alcance y arquitectura.",
    },
    stack: ["Python", "RAG", "MCP", "PostgreSQL"],
    flow: [
      { en: "Sources", es: "Fuentes" },
      { en: "RAG · memory", es: "RAG · memoria" },
      { en: "MCP · AI tools", es: "MCP · herramientas de IA" },
    ],
  },
];

// ── Process ─────────────────────────────────────────────────────────────────

export const PROCESS_STEPS: { n: string; icon: string; accent: string; title: Bi; body: Bi }[] = [
  {
    n: "01",
    icon: "◎",
    accent: "#A78BFA",
    title: { en: "Understand", es: "Entender" },
    body: {
      en: "I analyze and map the current process to identify real needs and define what the system must solve.",
      es: "Analizo y diagramo el proceso tal como funciona hoy para identificar las necesidades reales y definir qué debe resolver el sistema.",
    },
  },
  {
    n: "02",
    icon: "◧",
    accent: "#A78BFA",
    title: { en: "Design", es: "Diseñar" },
    body: {
      en: "I structure business rules, data and the system model to define its components, responsibilities and connections.",
      es: "Estructuro las reglas de negocio, los datos y el modelo del sistema para definir sus componentes, responsabilidades y conexiones.",
    },
  },
  {
    n: "03",
    icon: "</>",
    accent: "#38BDF8",
    title: { en: "Build and integrate", es: "Construir e integrar" },
    body: {
      en: "I turn the design into code by developing interfaces, services and integrations that work together.",
      es: "Llevo el diseño al código: desarrollo interfaces, servicios e integraciones para que todas las piezas trabajen juntas.",
    },
  },
  {
    n: "04",
    icon: "✓",
    accent: "#E879F9",
    title: { en: "Validate", es: "Validar" },
    body: {
      en: "I test the solution with real cases and edge conditions to verify that it supports the process.",
      es: "Pruebo la solución con casos reales y situaciones límite para comprobar que responde a las necesidades del proceso.",
    },
  },
  {
    n: "05",
    icon: "↻",
    accent: "#E879F9",
    title: { en: "Improve", es: "Mejorar" },
    body: {
      en: "I listen to the people using the solution, identify friction and prioritize the changes that can make it more useful.",
      es: "Escucho a quienes utilizan la solución, identifico fricciones y priorizo los cambios que pueden hacerla más útil.",
    },
  },
];

// ── Experience ──────────────────────────────────────────────────────────────

export interface Role {
  /** Job titles are kept exactly as given, in both languages. */
  title: string;
  period: Bi;
  current?: boolean;
  body: Bi;
}

export const EXPERIENCE: { company: string; accent: string; span: Bi; roles: Role[] }[] = [
  {
    company: "CPA Grup",
    accent: "#8B5CF6",
    span: { en: "3 roles · March 2025 – present", es: "3 etapas · marzo de 2025 – actualidad" },
    roles: [
      {
        title: "Full Stack Developer y Líder Técnico Odoo",
        period: { en: "June 2026 – present", es: "Junio de 2026 – actualidad" },
        current: true,
        body: {
          en: "I develop applications, backend services and integrations that support internal processes. I also take part in defining requirements, documentation, sprint coordination and tracking technical work.",
          es: "Desarrollo aplicaciones, servicios backend e integraciones para apoyar procesos internos. También participo en la definición de requerimientos, documentación, coordinación de sprints y seguimiento del trabajo técnico.",
        },
      },
      {
        title: "Auxiliar de Soporte Odoo",
        period: { en: "February 2026 – June 2026", es: "Febrero de 2026 – junio de 2026" },
        body: {
          en: "I handled incidents, automated data loads and checks, and supported users in operational processes, security and traceability.",
          es: "Atendí incidencias, automaticé cargas y verificaciones de datos y apoyé a usuarios en procesos operativos, seguridad y trazabilidad.",
        },
      },
      {
        title: "Becario de Soporte Odoo ERP",
        period: { en: "March 2025 – February 2026", es: "Marzo de 2025 – febrero de 2026" },
        body: {
          en: "I configured modules, views and reports, managed incidents, and took part in migrations and bulk data loads.",
          es: "Configuré módulos, vistas y reportes, gestioné incidencias y participé en migraciones y cargas masivas de información.",
        },
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
        period: { en: "July 2025 – January 2026", es: "Julio de 2025 – enero de 2026" },
        body: {
          en: "I developed backend services with Java, REST APIs and hexagonal architecture. I worked with SQL queries, Docker and Git to build reproducible environments and keep the code organized.",
          es: "Desarrollé servicios backend con Java, APIs REST y arquitectura hexagonal. Trabajé con consultas SQL, Docker y Git para construir entornos reproducibles y mantener el código organizado.",
        },
      },
    ],
  },
];

export const CURRENT_LABEL: Bi = { en: "Current", es: "Actual" };

// ── Skills ──────────────────────────────────────────────────────────────────

export interface SkillGroup {
  accent: string;
  title: Bi;
  description: Bi;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    accent: "#8B5CF6",
    title: { en: "Frontend", es: "Frontend" },
    description: {
      en: "I build interfaces and interaction flows connected to backend services.",
      es: "Construyo interfaces y flujos de interacción conectados con servicios backend.",
    },
    items: ["Angular", "React", "Astro", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    accent: "#38BDF8",
    title: { en: "Backend", es: "Backend" },
    description: {
      en: "I develop services, APIs, validations and business logic.",
      es: "Desarrollo servicios, APIs, validaciones y lógica de negocio.",
    },
    items: ["Java", "Python", "Quarkus", "REST APIs"],
  },
  {
    accent: "#A78BFA",
    title: { en: "Databases", es: "Bases de datos" },
    description: {
      en: "I model, query and persist the information applications rely on.",
      es: "Modelo, consulto y persisto la información que utilizan las aplicaciones.",
    },
    items: ["PostgreSQL", "MySQL", "MariaDB", "SQL"],
  },
  {
    accent: "#22D3EE",
    title: { en: "System integration", es: "Integración de sistemas" },
    description: {
      en: "I connect applications and services, transforming and validating the information they exchange.",
      es: "Conecto aplicaciones y servicios, transformando y validando la información que intercambian.",
    },
    items: ["REST", "XML-RPC", "Webhooks", "BFF", "JWT", "API Keys"],
  },
  {
    accent: "#60A5FA",
    title: { en: "Architecture", es: "Arquitectura" },
    description: {
      en: "I organize rules, components and responsibilities to build maintainable solutions.",
      es: "Organizo reglas, componentes y responsabilidades para construir soluciones mantenibles.",
    },
    items: ["Hexagonal architecture|Arquitectura hexagonal", "SOLID", "MVC", "Singleton", "Modular design|Diseño modular"],
  },
  {
    accent: "#E879F9",
    title: { en: "Tools and platforms", es: "Herramientas y plataformas" },
    description: {
      en: "I use development, coordination and automation tools to take a solution from idea to validation.",
      es: "Utilizo herramientas de desarrollo, coordinación y automatización para llevar una solución desde la idea hasta su validación.",
    },
    items: ["Git", "GitHub", "Docker", "Jira", "Nginx", "Odoo", "Studio", "QWeb", "XML"],
  },
];

/** Items are plain names; "English|Español" marks the few that translate. */
export function skillLabel(item: string, lang: Lang): string {
  const [en, es] = item.split("|");
  return lang === "es" && es ? es : en;
}

export const SOFT_SKILLS: { title: Bi; body: Bi }[] = [
  {
    title: { en: "Analytical thinking", es: "Pensamiento analítico" },
    body: {
      en: "I break problems down to understand their rules, data and dependencies.",
      es: "Descompongo los problemas para entender sus reglas, datos y dependencias.",
    },
  },
  {
    title: { en: "Problem solving", es: "Resolución de problemas" },
    body: {
      en: "I look for where a situation comes from and build a response that can actually be applied.",
      es: "Investigo el origen de una situación y construyo una respuesta que pueda aplicarse.",
    },
  },
  {
    title: { en: "Technical–functional communication", es: "Comunicación técnico-funcional" },
    body: {
      en: "I translate the needs of users and business areas into clear technical requirements.",
      es: "Traduzco necesidades de usuarios y áreas de negocio en requerimientos técnicos claros.",
    },
  },
  {
    title: { en: "User focus", es: "Orientación al usuario" },
    body: {
      en: "I consider how people work and what makes it hard for them to finish a task.",
      es: "Considero cómo trabajan las personas y qué les dificulta completar una tarea.",
    },
  },
  {
    title: { en: "Collaboration", es: "Colaboración" },
    body: {
      en: "I work with technical profiles and operational areas to build a shared solution.",
      es: "Trabajo con perfiles técnicos y áreas operativas para construir una solución compartida.",
    },
  },
  {
    title: { en: "Organization and coordination", es: "Organización y coordinación" },
    body: {
      en: "I structure goals, tasks, owners, dependencies and deliverables so the team can move forward.",
      es: "Estructuro objetivos, tareas, responsables, dependencias y entregables para que el equipo pueda avanzar.",
    },
  },
];

// ── About ───────────────────────────────────────────────────────────────────

export const ABOUT = {
  paragraphs: [
    {
      en: "I’m Mario Yael, a Full Stack Developer and an Ingeniería en Informática student at UPIICSA-IPN.",
      es: "Soy Mario Yael, desarrollador Full Stack y estudiante de Ingeniería en Informática en UPIICSA-IPN.",
    },
    {
      en: "I enjoy investigating how a process works, finding its logic and turning it into software. My experience began close to users, data and operational issues, which taught me that a technical solution must also work for the people using it.",
      es: "Me gusta investigar cómo funciona un proceso, encontrar su lógica y convertirla en software. Mi experiencia empezó trabajando cerca de usuarios, datos e incidencias operativas; eso me enseñó que una solución técnica también debe funcionar para las personas que la utilizan.",
    },
    {
      en: "I currently develop applications and integrations and contribute to technical coordination. I want to keep growing as a Software Engineer and, with experience, move toward solution architecture.",
      es: "Actualmente desarrollo aplicaciones e integraciones y participo en la coordinación de trabajo técnico. Quiero seguir creciendo como Software Engineer y, con experiencia, avanzar hacia arquitectura de soluciones.",
    },
  ] as Bi[],
  pathLabel: { en: "Career path", es: "Ruta profesional" } as Bi,
  path: [
    { role: "Full Stack Developer", note: { en: "Now", es: "Hoy" } },
    { role: "Software Engineer", note: { en: "Next step", es: "Siguiente paso" } },
    { role: "Solutions Architect", note: { en: "Long-term goal", es: "Meta a largo plazo" } },
  ] as { role: string; note: Bi }[],
  educationLabel: { en: "Education", es: "Formación" } as Bi,
  degree: "Ingeniería en Informática",
  school: "UPIICSA · Instituto Politécnico Nacional",
  graduation: { en: "Expected graduation: December 2026.", es: "Graduación prevista: diciembre de 2026." } as Bi,
  languagesLabel: { en: "Languages", es: "Idiomas" } as Bi,
  languages: { en: "Spanish (native) · English (technical)", es: "Español (nativo) · Inglés (técnico)" } as Bi,
};

// ── Contact ─────────────────────────────────────────────────────────────────

export const CONTACT = {
  email: "marioyaelgg@gmail.com",
  github: "https://github.com/MaelRD",
  site: "https://maeldev.netlify.app/",
  links: {
    email: { en: "Email", es: "Correo" } as Bi,
    github: { en: "GitHub", es: "GitHub" } as Bi,
    site: { en: "Portfolio", es: "Portafolio" } as Bi,
    cv: { en: "CV (PDF)", es: "CV (PDF)" } as Bi,
  },
  ctaPrimary: { en: "Write to me", es: "Escríbeme" } as Bi,
  newTab: { en: "(opens in a new tab)", es: "(se abre en una pestaña nueva)" } as Bi,
};

export const FOOTER = {
  name: "Mario Yael Gordillo García",
  based: { en: "Based in Mexico", es: "Desde México" } as Bi,
};
