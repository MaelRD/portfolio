// Content for the "Cosmic Engineering" portfolio. Every user-facing string is
// bilingual (`en`/`es`, English primary) so components can pick `copy[lang]`
// directly.
//
// Content source of truth: Guia_de_contenido_Portafolio_Mario_Yael.md
// (fact-checked against the CV and project documentation, dated 2026-09-21).
// Job titles/dates match the CV exactly. In-progress work is framed as such —
// no completed status, solo authorship or metrics beyond what's documented.

export type Lang = "en" | "es";

export interface Bi {
  en: string;
  es: string;
}

export const NAV_LINKS: { id: string; label: Bi }[] = [
  { id: "work", label: { en: "Work", es: "Proyectos" } },
  { id: "experience", label: { en: "Experience", es: "Experiencia" } },
  { id: "process", label: { en: "How I Build", es: "Cómo Construyo" } },
  { id: "capabilities", label: { en: "Skills", es: "Skills" } },
  { id: "about", label: { en: "About", es: "Perfil" } },
  { id: "contact", label: { en: "Contact", es: "Contacto" } },
];

export const BRAND = {
  name: "MARIO YAEL",
  role: { en: "FULL STACK DEVELOPER", es: "DESARROLLADOR FULL STACK" } as Bi,
};

export const HERO = {
  eyebrow: { en: "FULL STACK DEVELOPER", es: "DESARROLLADOR FULL STACK" } as Bi,
  headline: {
    en: { lead: "I design and build software to solve ", highlight: "real problems." },
    es: { lead: "Diseño y desarrollo software para resolver ", highlight: "problemas reales." },
  },
  body: {
    en: "I translate requirements and business rules into web applications. My work brings together frontend, backend, data and system integration to build useful, maintainable software.",
    es: "Transformo necesidades y reglas de negocio en aplicaciones web. Mi trabajo conecta frontend, backend, datos e integración de sistemas para construir software útil y mantenible.",
  } as Bi,
  ctaPrimary: { en: "VIEW PROJECTS", es: "VER PROYECTOS" } as Bi,
  ctaSecondary: { en: "DOWNLOAD CV", es: "DESCARGAR CV" } as Bi,
  footnote: {
    en: ["WHERE BUSINESS LOGIC", "MEETS SOFTWARE"],
    es: ["DONDE LA LÓGICA DE NEGOCIO", "SE ENCUENTRA CON EL SOFTWARE"],
  },
  orbitCenter: {
    en: ["BUSINESS", "PROCESSES"],
    es: ["PROCESOS", "DE NEGOCIO"],
  },
  orbitNodes: [
    { en: "PEOPLE", es: "PERSONAS" },
    { en: "DATA", es: "DATOS" },
    { en: "SYSTEMS", es: "SISTEMAS" },
    { en: "AUTOMATION", es: "AUTOMATIZACIÓN" },
    { en: "GROWTH", es: "CRECIMIENTO" },
  ] as Bi[],
};

export const PROCESS_STEPS: { n: string; icon: string; accent: "violet" | "sky" | "fuchsia"; title: Bi; body: Bi }[] = [
  {
    n: "01",
    icon: "◎",
    accent: "violet",
    title: { en: "Understand", es: "Entender" },
    body: {
      en: "I analyze and map the process as it works today, to identify the real needs and define what the system needs to solve.",
      es: "Analizo y diagramo el proceso tal como funciona hoy para identificar las necesidades reales y definir qué debe resolver el sistema.",
    },
  },
  {
    n: "02",
    icon: "◧",
    accent: "violet",
    title: { en: "Design", es: "Diseñar" },
    body: {
      en: "I structure the business rules, data and system model to define its components, their responsibilities and how they connect.",
      es: "Estructuro las reglas de negocio, los datos y el modelo del sistema para definir sus componentes, sus responsabilidades y cómo se conectan.",
    },
  },
  {
    n: "03",
    icon: "</>",
    accent: "sky",
    title: { en: "Build & Integrate", es: "Construir e Integrar" },
    body: {
      en: "I take the design into code: building interfaces, services and integrations so every piece works together.",
      es: "Llevo el diseño al código: desarrollo interfaces, servicios e integraciones para que todas las piezas trabajen juntas.",
    },
  },
  {
    n: "04",
    icon: "✓",
    accent: "fuchsia",
    title: { en: "Validate", es: "Validar" },
    body: {
      en: "I put the solution through real cases and edge situations to confirm it responds to the process's needs.",
      es: "Pongo la solución a prueba con casos reales y situaciones límite para comprobar que responde a las necesidades del proceso.",
    },
  },
  {
    n: "05",
    icon: "↻",
    accent: "fuchsia",
    title: { en: "Improve", es: "Mejorar" },
    body: {
      en: "I listen to the people using it, identify what makes their work harder, and prioritize the changes that make it more useful.",
      es: "Escucho a quienes la usan, identifico lo que les complica el trabajo y priorizo los cambios que pueden hacerla más útil.",
    },
  },
];

// The featured case study — GBS Builder. Framed as in-development, shared
// with the team, per the fact-checked content guide. Nothing here claims a
// finished rollout, a solo build, or a measured result that isn't confirmed.
export const FEATURED_PROJECT = {
  status: { en: "IN DEVELOPMENT", es: "EN DESARROLLO" } as Bi,
  eyebrow: { en: "FEATURED PROJECT", es: "PROYECTO DESTACADO" } as Bi,
  name: "GBS BUILDER",
  subtitle: { en: "Costing and quotation software", es: "Software de costeo y cotización" } as Bi,
  accent: "#8B5CF6",
  spotColor: "rgba(139,92,246,.18)",
  problemLabel: { en: "THE PROBLEM", es: "EL PROBLEMA" } as Bi,
  problem: {
    en: "Calculating cost, margin and sale price for a promotional-product quotation means pulling together data from Sales, Purchasing and Logistics. The previous process ran on a spreadsheet — GBS Nacional — which made large-scale data capture slow and error-prone.",
    es: "Calcular costo, margen y precio de venta de una cotización de producto promocional implica reunir información de Comercial, Compras y Logística. El proceso anterior corría en una hoja de cálculo — GBS Nacional — que hacía lenta y propensa a errores la captura masiva de datos.",
  } as Bi,
  solutionLabel: { en: "WHAT I'M BUILDING", es: "QUÉ ESTOY CONSTRUYENDO" } as Bi,
  solution: {
    en: "A web application with a spreadsheet-style Angular interface and a Java/Quarkus backend that reads and consolidates data from Odoo, applying the same costing and pricing rules the business already used.",
    es: "Una aplicación web con una interfaz tipo hoja de cálculo en Angular y un backend en Java/Quarkus que lee y consolida datos desde Odoo, aplicando las mismas reglas de costeo y precio que el negocio ya usaba.",
  } as Bi,
  decisionLabel: { en: "A KEY DECISION", es: "UNA DECISIÓN CLAVE" } as Bi,
  decision: {
    en: "One core decision was how to identify and consolidate line items consistently across systems — that's what lets the same quotation logic work whether the data comes from old spreadsheet habits or directly from Odoo.",
    es: "Una decisión central fue cómo identificar y consolidar partidas de forma consistente entre sistemas — eso permite que la misma lógica de cotización funcione ya sea que los datos vengan de la costumbre en hoja de cálculo o directo de Odoo.",
  } as Bi,
  architectureLabel: { en: "ARCHITECTURE", es: "ARQUITECTURA" } as Bi,
  architecture: [
    { en: "Angular", es: "Angular" },
    { en: "Java 21 / Quarkus", es: "Java 21 / Quarkus" },
    { en: "Odoo (XML-RPC)", es: "Odoo (XML-RPC)" },
    { en: "Operational data", es: "Datos operativos" },
  ] as Bi[],
  logicLabel: { en: "COSTING LOGIC IT APPLIES", es: "LÓGICA DE COSTEO QUE APLICA" } as Bi,
  logic: [
    { en: "Costs", es: "Costos" },
    { en: "Net cost", es: "Costo neto" },
    { en: "Target margin", es: "Margen objetivo" },
    { en: "Sale price", es: "Precio de venta" },
    { en: "Project total", es: "Total del proyecto" },
  ] as Bi[],
  fieldsLabel: { en: "DATA IT WORKS WITH", es: "DATOS CON LOS QUE TRABAJA" } as Bi,
  fields: [
    { en: "Product description", es: "Descripción del producto" },
    { en: "Pieces", es: "Piezas" },
    { en: "Waste (merma)", es: "Merma" },
    { en: "Unit cost", es: "Costo unitario" },
    { en: "Customization", es: "Personalización" },
    { en: "Logistics cost", es: "Costo logístico" },
  ] as Bi[],
  roleLabel: { en: "MY CONTRIBUTION", es: "MI CONTRIBUCIÓN" } as Bi,
  role: {
    en: "I designed the architecture and I'm responsible for functional closure and validation. Persistence and traceability are being built together with the team.",
    es: "Diseñé la arquitectura y soy responsable del cierre funcional y la validación. La persistencia y la trazabilidad se están construyendo junto con el equipo.",
  } as Bi,
  evolutionLabel: { en: "WHAT'S NEXT", es: "SIGUIENTE PASO" } as Bi,
  evolution: {
    en: "Once the core is validated, the plan is to evolve it into a tracking tool — budgeted vs. quoted, projected vs. actual — connected to live Odoo data.",
    es: "Una vez validado el núcleo, el plan es evolucionarlo hacia una herramienta de seguimiento — presupuestado vs. cotizado, proyectado vs. real — conectada a datos vivos de Odoo.",
  } as Bi,
  stack: "Angular · Java 21 · Quarkus · Odoo (XML-RPC)",
};

export interface Project {
  index: string;
  accent: string;
  spotColor: string;
  name: string;
  subtitle: Bi;
  description: Bi;
  stack: string;
  visual: "layout" | "crisol";
}

export const PROJECTS: Project[] = [
  {
    index: "02",
    accent: "#38BDF8",
    spotColor: "rgba(56,189,248,.16)",
    name: "LAYOUTBUILDER",
    subtitle: { en: "Data-entry and system-integration application", es: "Aplicación de captura de datos e integración de sistemas" },
    description: {
      en: "A spreadsheet-style Astro/React application with a Java/Quarkus backend that connects data and services. Its hexagonal architecture organizes integrations with Odoo, SAT validation, Discord notifications and PostgreSQL persistence.",
      es: "Una aplicación con interfaz tipo hoja de cálculo en Astro/React y un backend Java/Quarkus que conecta datos y servicios. Su arquitectura hexagonal organiza las integraciones con Odoo, validación SAT, notificaciones en Discord y persistencia en PostgreSQL.",
    },
    stack: "Astro · React · Quarkus · PostgreSQL",
    visual: "layout",
  },
  {
    index: "03",
    accent: "#C026D3",
    spotColor: "rgba(192,38,211,.16)",
    name: "EL CRISOL",
    subtitle: { en: "Personal project — definition in progress", es: "Proyecto personal — en definición" },
    description: {
      en: "An evolving personal exploration of centralising knowledge and context across AI tools. Its scope and architecture are still being defined.",
      es: "Una exploración personal en evolución para centralizar conocimiento y contexto entre herramientas de IA. Su alcance y arquitectura todavía están en definición.",
    },
    stack: "PERSONAL PROJECT · IN DEFINITION",
    visual: "crisol",
  },
];

export interface SkillGroup {
  accent: string;
  title: Bi;
  items: Bi[];
}

// Full skill inventory, as provided directly by Mario (from his CV). Kept as
// a plain tag list per group rather than the old 3-item planet cards — the
// point here is completeness, not curation.
export const CAPABILITIES: SkillGroup[] = [
  {
    accent: "#38BDF8",
    title: { en: "Backend", es: "Backend" },
    items: [
      { en: "Java", es: "Java" },
      { en: "Python", es: "Python" },
      { en: "Quarkus", es: "Quarkus" },
      { en: "FastAPI", es: "FastAPI" },
      { en: "REST APIs", es: "REST APIs" },
      { en: "XML-RPC", es: "XML-RPC" },
      { en: "JSON", es: "JSON" },
      { en: "Webhooks", es: "Webhooks" },
    ],
  },
  {
    accent: "#8B5CF6",
    title: { en: "Frontend", es: "Frontend" },
    items: [
      { en: "Angular", es: "Angular" },
      { en: "React", es: "React" },
      { en: "Astro", es: "Astro" },
      { en: "JavaScript", es: "JavaScript" },
      { en: "HTML5", es: "HTML5" },
      { en: "CSS3", es: "CSS3" },
      { en: "Tailwind CSS", es: "Tailwind CSS" },
    ],
  },
  {
    accent: "#A78BFA",
    title: { en: "Databases", es: "Bases de Datos" },
    items: [
      { en: "PostgreSQL", es: "PostgreSQL" },
      { en: "MySQL", es: "MySQL" },
      { en: "MariaDB", es: "MariaDB" },
      { en: "SQL", es: "SQL" },
      { en: "Relational database modeling", es: "Modelado de bases de datos relacionales" },
    ],
  },
  {
    accent: "#60A5FA",
    title: { en: "Software Architecture", es: "Arquitectura de Software" },
    items: [
      { en: "Hexagonal Architecture", es: "Hexagonal Architecture" },
      { en: "MVC", es: "MVC" },
      { en: "Layered Architecture", es: "Layered Architecture" },
      { en: "BFF", es: "BFF" },
      { en: "Separation of Concerns", es: "Separación de Responsabilidades" },
      { en: "Clean Architecture Concepts", es: "Conceptos de Clean Architecture" },
    ],
  },
  {
    accent: "#E879F9",
    title: { en: "Design Patterns", es: "Patrones de Diseño" },
    items: [
      { en: "Singleton", es: "Singleton" },
      { en: "Dependency Injection", es: "Inyección de Dependencias" },
      { en: "Repository Pattern", es: "Patrón Repository" },
      { en: "Service Layer", es: "Capa de Servicios" },
    ],
  },
  {
    accent: "#C026D3",
    title: { en: "Odoo / ERP", es: "Odoo / ERP" },
    items: [
      { en: "Odoo 18", es: "Odoo 18" },
      { en: "Odoo Studio", es: "Odoo Studio" },
      { en: "XML", es: "XML" },
      { en: "QWeb", es: "QWeb" },
      { en: "Automated Actions", es: "Acciones Automatizadas" },
      { en: "Odoo Spreadsheets", es: "Odoo Spreadsheets" },
      { en: "Domains", es: "Domains" },
      { en: "Access Rules", es: "Reglas de Acceso" },
      { en: "Custom Fields", es: "Campos Personalizados" },
      { en: "Odoo Integrations", es: "Integraciones Odoo" },
    ],
  },
  {
    accent: "#38BDF8",
    title: { en: "Security & Integration", es: "Seguridad e Integración" },
    items: [
      { en: "JWT", es: "JWT" },
      { en: "API Keys", es: "API Keys" },
      { en: "Authentication", es: "Autenticación" },
      { en: "Authorization", es: "Autorización" },
      { en: "REST Integration", es: "Integración REST" },
      { en: "External Services Integration", es: "Integración de Servicios Externos" },
    ],
  },
  {
    accent: "#8B5CF6",
    title: { en: "Software Engineering", es: "Ingeniería de Software" },
    items: [
      { en: "Requirements Analysis", es: "Análisis de Requerimientos" },
      { en: "Business Logic Modeling", es: "Modelado de Lógica de Negocio" },
      { en: "Process Modeling", es: "Modelado de Procesos" },
      { en: "Solution Design", es: "Diseño de Soluciones" },
      { en: "System Integration", es: "Integración de Sistemas" },
      { en: "Technical Documentation", es: "Documentación Técnica" },
      { en: "Debugging", es: "Depuración" },
      { en: "Problem Solving", es: "Resolución de Problemas" },
    ],
  },
  {
    accent: "#A78BFA",
    title: { en: "Project Management", es: "Gestión de Proyectos" },
    items: [
      { en: "Sprint Planning", es: "Planificación de Sprints" },
      { en: "Task Management", es: "Gestión de Tareas" },
      { en: "Requirements Definition", es: "Definición de Requerimientos" },
      { en: "Technical Coordination", es: "Coordinación Técnica" },
      { en: "Progress Tracking", es: "Seguimiento de Avance" },
      { en: "Prioritization", es: "Priorización" },
    ],
  },
  {
    accent: "#E879F9",
    title: { en: "Soft Skills", es: "Habilidades Blandas" },
    items: [
      { en: "Problem Solving", es: "Resolución de Problemas" },
      { en: "Analytical Thinking", es: "Pensamiento Analítico" },
      { en: "Effective Communication", es: "Comunicación Efectiva" },
      { en: "Teamwork", es: "Trabajo en Equipo" },
      { en: "Leadership", es: "Liderazgo" },
      { en: "Adaptability", es: "Adaptabilidad" },
      { en: "Self-Learning", es: "Autoaprendizaje" },
      { en: "Organization", es: "Organización" },
      { en: "Planning", es: "Planificación" },
      { en: "Critical Thinking", es: "Pensamiento Crítico" },
    ],
  },
];

// Titles and dates match the CV exactly — do not edit without updating the CV too.
export const EXPERIENCE: { dotColor: string; title: Bi; date: Bi; company: string; body: Bi; stack: string }[] = [
  {
    dotColor: "#8B5CF6",
    title: { en: "Full Stack Developer & Odoo Technical Lead", es: "Full Stack Developer y Líder Técnico Odoo" },
    date: { en: "JUN 2026 — PRESENT", es: "JUN 2026 — ACTUALIDAD" },
    company: "CPA GRUP",
    body: {
      en: "Develops applications and integrations built around Odoo and coordinates technical work: architecture, requirement analysis with business areas, and custom views, reports and automated actions over sales, purchasing and inventory processes.",
      es: "Desarrolla aplicaciones e integraciones alrededor de Odoo y coordina trabajo técnico: arquitectura, análisis de requerimientos con las áreas de negocio, y vistas, reportes y acciones automatizadas personalizadas sobre procesos de ventas, compras e inventarios.",
    },
    stack: "ODOO 18 · ODOO STUDIO · XML-RPC · JAVA 21 · QUARKUS · ANGULAR",
  },
  {
    dotColor: "#38BDF8",
    title: { en: "Odoo Support Assistant", es: "Auxiliar de Soporte Odoo" },
    date: { en: "FEB 2026 — JUN 2026", es: "FEB 2026 — JUN 2026" },
    company: "CPA GRUP",
    body: {
      en: "Resolved functional and technical incidents across operational modules, and built the customizations — views, XML, QWeb reports — that kept the system matching how the business actually worked.",
      es: "Resolvió incidencias funcionales y técnicas en módulos operativos, y construyó las personalizaciones — vistas, XML, reportes QWeb — que mantenían el sistema alineado con cómo funcionaba realmente el negocio.",
    },
    stack: "ODOO · XML · QWEB · XML-RPC · POSTGRESQL",
  },
  {
    dotColor: "#94A3B8",
    title: { en: "Odoo ERP Support Intern", es: "Becario de Soporte Odoo ERP" },
    date: { en: "MAR 2025 — FEB 2026", es: "MAR 2025 — FEB 2026" },
    company: "CPA GRUP",
    body: {
      en: "First contact with real ERP operations: sales, purchasing and inventory flows, user access, and documentation of business processes.",
      es: "Primer contacto con la operación real de un ERP: flujos de ventas, compras e inventarios, accesos de usuario y documentación de procesos de negocio.",
    },
    stack: "ODOO · BUSINESS PROCESSES · DOCUMENTATION",
  },
  {
    dotColor: "#64748B",
    title: { en: "Backend Developer — Social Service", es: "Desarrollador Backend — Servicio Social" },
    date: { en: "JUL 2025 — JAN 2026", es: "JUL 2025 — ENE 2026" },
    company: "CORPORATIVO EMETH",
    body: {
      en: "Concurrent with the ERP support role — built backend services and data models in Java, with hexagonal architecture and a focus on clean REST APIs.",
      es: "En paralelo al rol de soporte ERP — desarrolló servicios backend y modelos de datos en Java, con arquitectura hexagonal y foco en APIs REST limpias.",
    },
    stack: "JAVA · REST APIs · POSTGRESQL · DOCKER · GIT",
  },
];

export const ABOUT = {
  lead: {
    en: "I am a Full Stack Developer studying Ingeniería en Informática at UPIICSA-IPN. I'm interested in understanding a problem, modeling its logic and building the interfaces, services and integrations the solution needs.",
    es: "Soy desarrollador Full Stack y estudiante de Ingeniería en Informática en UPIICSA-IPN. Me interesa entender un problema, modelar su lógica y construir las interfaces, servicios e integraciones que necesita la solución.",
  } as Bi,
  p1: {
    en: "At CPA Grup, I develop applications and integrations and coordinate technical work. My experience with users and operational processes helps me connect software decisions with practical needs — the interesting part is rarely the framework, it's the rule nobody documented.",
    es: "En CPA Grup desarrollo aplicaciones e integraciones y coordino trabajo técnico. Mi experiencia con usuarios y procesos operativos me ayuda a conectar decisiones de software con necesidades concretas — lo interesante casi nunca es el framework, es la regla que nadie documentó.",
  } as Bi,
  p2: {
    en: "I expect to graduate in December 2026, and I want to keep growing in system design and solution architecture.",
    es: "Tengo prevista mi graduación para diciembre de 2026, y quiero seguir creciendo en diseño de sistemas y arquitectura de soluciones.",
  } as Bi,
  stats: [
    { label: { en: "FOCUS", es: "ENFOQUE" }, value: { en: "Full Stack · Integration", es: "Full Stack · Integración" } },
    { label: { en: "STUDYING", es: "ESTUDIA" }, value: { en: "Comp. Eng., UPIICSA-IPN", es: "Ing. Informática, UPIICSA-IPN" } },
    { label: { en: "GROWING TOWARD", es: "CRECIENDO HACIA" }, value: { en: "System & Solution Design", es: "Diseño de Sistemas y Soluciones" } },
  ] as { label: Bi; value: Bi }[],
};

export const CONTACT = {
  eyebrow: { en: "SAME UNIVERSE. HIGHER POSSIBILITIES.", es: "MISMO UNIVERSO. MÁS POSIBILIDADES." } as Bi,
  headline: { en: "Let's talk about the systems you're building.", es: "Hablemos de los sistemas que estás construyendo." } as Bi,
  body: {
    en: "I'm interested in contributing to business applications, backend development and system integration.",
    es: "Me interesa colaborar en aplicaciones de negocio, backend e integración de sistemas.",
  } as Bi,
  ctaPrimary: { en: "LET'S CONNECT", es: "HABLEMOS" } as Bi,
  ctaSecondary: { en: "DOWNLOAD CV", es: "DESCARGAR CV" } as Bi,
  email: "marioyaelgg@gmail.com",
  github: "https://github.com/MaelRD",
  githubLabel: "github.com/MaelRD",
  site: "https://maeldev.netlify.app/",
  siteLabel: "maeldev.netlify.app",
};

export const FOOTER = {
  name: "MARIO YAEL GORDILLO GARCÍA",
  based: { en: "BASED IN MEXICO", es: "DESDE MÉXICO" } as Bi,
  available: { en: "AVAILABLE GLOBALLY", es: "DISPONIBLE GLOBALMENTE" } as Bi,
};

export const SECTION_HEADERS = {
  work: {
    title: { en: "OTHER SYSTEMS", es: "OTROS SISTEMAS" } as Bi,
    tag: { en: "REAL PROBLEMS. INTEGRATED SOLUTIONS.", es: "PROBLEMAS REALES. SOLUCIONES INTEGRADAS." } as Bi,
    accent: "#38BDF8",
  },
  process: {
    title: { en: "HOW I BUILD", es: "CÓMO CONSTRUYO" } as Bi,
    tag: { en: "A STRUCTURED PATH FROM PROBLEM TO IMPACT.", es: "UN CAMINO ESTRUCTURADO DEL PROBLEMA AL IMPACTO." } as Bi,
    accent: "#38BDF8",
  },
  capabilities: {
    title: { en: "SKILLS", es: "SKILLS" } as Bi,
    tag: { en: "TECHNICAL SKILL. BUSINESS PERSPECTIVE.", es: "HABILIDAD TÉCNICA. VISIÓN DE NEGOCIO." } as Bi,
    accent: "#8B5CF6",
  },
  experience: {
    title: { en: "EXPERIENCE", es: "EXPERIENCIA" } as Bi,
    tag: "CPA GRUP · CORPORATIVO EMETH",
    accent: "#38BDF8",
  },
  about: {
    title: { en: "ABOUT", es: "PERFIL" } as Bi,
    accent: "#7042F8",
  },
};
