// Content for the "Cosmic Engineering" portfolio. Every user-facing string is
// bilingual (`en`/`es`, English primary) so components can pick `copy[lang]`
// directly. Narrative rewritten around one idea: understand the business
// first, then design and build the system for it.

export type Lang = "en" | "es";

export interface Bi {
  en: string;
  es: string;
}

export const NAV_LINKS: { id: string; label: Bi }[] = [
  { id: "about", label: { en: "About", es: "Perfil" } },
  { id: "process", label: { en: "How I Build", es: "Cómo Construyo" } },
  { id: "work", label: { en: "Work", es: "Proyectos" } },
  { id: "experience", label: { en: "Experience", es: "Experiencia" } },
  { id: "contact", label: { en: "Contact", es: "Contacto" } },
];

export const BRAND = {
  name: "MARIO YAEL",
  role: { en: "FULL STACK DEVELOPER", es: "DESARROLLADOR FULL STACK" } as Bi,
};

export const HERO = {
  eyebrow: { en: "FULL STACK DEVELOPER", es: "DESARROLLADOR FULL STACK" } as Bi,
  headline: {
    en: { lead: "I build software around ", highlight: "real business problems." },
    es: { lead: "Construyo software alrededor de ", highlight: "problemas de negocio reales." },
  },
  body: {
    en: "I study how a business actually runs, then design and build the system around it — backend, frontend, architecture and the integrations that connect it all.",
    es: "Estudio cómo funciona realmente un negocio y después diseño y construyo el sistema a su alrededor — backend, frontend, arquitectura y las integraciones que conectan todo.",
  } as Bi,
  ctaPrimary: { en: "EXPLORE MY WORK", es: "VER MI TRABAJO" } as Bi,
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

export const VALUE_PROPS: { eyebrow: string; accent: string; bgTint: string; title: Bi; body: Bi }[] = [
  {
    eyebrow: "01 / BUSINESS LOGIC",
    accent: "#7042F8",
    bgTint: "rgba(112,66,248,.10)",
    title: { en: "Understand", es: "Entender" },
    body: {
      en: "I start by understanding how the business actually works — the process, the exceptions and the rules nobody wrote down.",
      es: "Empiezo por entender cómo funciona realmente el negocio — el proceso, las excepciones y las reglas que nadie escribió.",
    },
  },
  {
    eyebrow: "02 / ENGINEERING",
    accent: "#38BDF8",
    bgTint: "rgba(37,99,235,.10)",
    title: { en: "Architect", es: "Diseñar" },
    body: {
      en: "I turn that understanding into architecture: data models, service boundaries and decisions that keep the system maintainable.",
      es: "Convierto ese entendimiento en arquitectura: modelos de datos, límites de servicios y decisiones que mantienen el sistema sostenible.",
    },
  },
  {
    eyebrow: "03 / INTEGRATION",
    accent: "#C026D3",
    bgTint: "rgba(192,38,211,.09)",
    title: { en: "Connect & Ship", es: "Conectar y Entregar" },
    body: {
      en: "I connect it to what's already running — ERP, APIs, the systems the business depends on — and build it end to end.",
      es: "Lo conecto con lo que ya está en operación — ERP, APIs, los sistemas de los que depende el negocio — y lo construyo de extremo a extremo.",
    },
  },
];

export const PROCESS_STEPS: { n: string; icon: string; accent: "violet" | "sky" | "fuchsia"; title: Bi; body: Bi }[] = [
  {
    n: "01",
    icon: "◎",
    accent: "violet",
    title: { en: "Understand", es: "Entender" },
    body: { en: "Business goals, users, restrictions and how the process actually runs today.", es: "Objetivos de negocio, usuarios, restricciones y cómo funciona realmente el proceso hoy." },
  },
  {
    n: "02",
    icon: "▥",
    accent: "violet",
    title: { en: "Model", es: "Modelar" },
    body: {
      en: "Turn the process into rules, entities, flows and data the system can actually work with.",
      es: "Convertir el proceso en reglas, entidades, flujos y datos con los que el sistema pueda trabajar.",
    },
  },
  {
    n: "03",
    icon: "◧",
    accent: "sky",
    title: { en: "Design", es: "Diseñar" },
    body: { en: "Architecture, data models and the integrations the solution will depend on.", es: "Arquitectura, modelos de datos y las integraciones de las que dependerá la solución." },
  },
  {
    n: "04",
    icon: "</>",
    accent: "sky",
    title: { en: "Build", es: "Construir" },
    body: { en: "Frontend, backend and the services that connect them to the real system of record.", es: "Frontend, backend y los servicios que los conectan con el sistema de registro real." },
  },
  {
    n: "05",
    icon: "✓",
    accent: "fuchsia",
    title: { en: "Validate", es: "Validar" },
    body: { en: "Check it against the real operation — real data, real edge cases, real users.", es: "Contrastarlo con la operación real — datos reales, casos límite reales, usuarios reales." },
  },
  {
    n: "06",
    icon: "↻",
    accent: "fuchsia",
    title: { en: "Improve", es: "Mejorar" },
    body: { en: "Feedback, results and iteration, since the first version is rarely the last.", es: "Retroalimentación, resultados e iteración, porque la primera versión rara vez es la última." },
  },
];

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
    subtitle: { en: "Systems integration layer", es: "Capa de integración de sistemas" },
    description: {
      en: "A hexagonal-architecture backend-for-frontend connecting a web app with Odoo, PostgreSQL, SAT, Discord and other external services.",
      es: "Un backend-for-frontend con arquitectura hexagonal que conecta una aplicación web con Odoo, PostgreSQL, SAT, Discord y otros servicios externos.",
    },
    stack: "Astro · React · Quarkus · PostgreSQL",
    visual: "layout",
  },
  {
    index: "03",
    accent: "#C026D3",
    spotColor: "rgba(192,38,211,.16)",
    name: "EL CRISOL",
    subtitle: { en: "Personal AI knowledge system", es: "Sistema personal de conocimiento con IA" },
    description: {
      en: "An ongoing experiment in centralising knowledge, projects and context across AI tools — RAG, structured memory, Model Context Protocol.",
      es: "Un experimento en curso para centralizar conocimiento, proyectos y contexto entre herramientas de IA — RAG, memoria estructurada, Model Context Protocol.",
    },
    stack: "RAG · MCP · Knowledge Architecture",
    visual: "crisol",
  },
];

// The featured case study — GBS Builder gets its own, much larger section
// instead of sharing a card grid with the other projects.
export const FEATURED_PROJECT = {
  eyebrow: { en: "FEATURED PROJECT", es: "PROYECTO DESTACADO" } as Bi,
  name: "GBS BUILDER",
  subtitle: { en: "Business quotation platform, connected to Odoo", es: "Plataforma de cotización comercial, conectada a Odoo" } as Bi,
  accent: "#8B5CF6",
  spotColor: "rgba(139,92,246,.18)",
  problemLabel: { en: "THE PROBLEM", es: "EL PROBLEMA" } as Bi,
  problem: {
    en: "Promotional-product quotations were built in a spreadsheet — GBS Nacional — used to calculate cost, margin and sale price project by project. It worked, but every quotation meant capturing and adjusting large amounts of data by hand, field by field, and nobody wanted to do that directly inside Odoo.",
    es: "Las cotizaciones de producto promocional se armaban en una hoja de cálculo — GBS Nacional — usada para calcular costo, margen y precio de venta proyecto por proyecto. Funcionaba, pero cada cotización implicaba capturar y ajustar mucha información a mano, campo por campo, y nadie quería hacerlo directamente dentro de Odoo.",
  } as Bi,
  challengeLabel: { en: "THE CHALLENGE", es: "EL RETO" } as Bi,
  challenge: {
    en: "The operational data — products, costs, clients — already lived in Odoo, but the actual pricing logic lived in a spreadsheet nobody could safely change. Any replacement had to keep that logic intact while making capture fast, adjustments easy, and everything connected to real operational data instead of a static file.",
    es: "Los datos operativos — productos, costos, clientes — ya vivían en Odoo, pero la lógica de precios vivía en una hoja de cálculo que nadie podía modificar con seguridad. Cualquier reemplazo tenía que conservar esa lógica, hacer la captura rápida, los ajustes sencillos y todo conectado a datos operativos reales en lugar de un archivo estático.",
  } as Bi,
  solutionLabel: { en: "THE SOLUTION", es: "LA SOLUCIÓN" } as Bi,
  solution: {
    en: "I designed and built a web application that replaces the spreadsheet: it captures project data — pieces, waste, unit cost, customization, logistics — and calculates net cost, margin and sale price using the same rules the business already trusted, reading and writing directly to Odoo.",
    es: "Diseñé y construí una aplicación web que reemplaza la hoja de cálculo: captura los datos del proyecto — piezas, merma, costo unitario, personalización, logística — y calcula costo neto, margen y precio de venta con las mismas reglas que el negocio ya usaba, leyendo y escribiendo directamente en Odoo.",
  } as Bi,
  architectureLabel: { en: "ARCHITECTURE", es: "ARQUITECTURA" } as Bi,
  architecture: [
    { en: "Angular", es: "Angular" },
    { en: "Java 21 / Quarkus", es: "Java 21 / Quarkus" },
    { en: "Odoo (XML-RPC)", es: "Odoo (XML-RPC)" },
    { en: "Operational data", es: "Datos operativos" },
  ] as Bi[],
  logicLabel: { en: "PRICING LOGIC", es: "LÓGICA DE PRECIOS" } as Bi,
  logic: [
    { en: "Costs", es: "Costos" },
    { en: "Net cost", es: "Costo neto" },
    { en: "Target margin", es: "Margen objetivo" },
    { en: "Sale price", es: "Precio de venta" },
    { en: "Project total", es: "Total del proyecto" },
  ] as Bi[],
  fieldsLabel: { en: "WHAT IT CAPTURES", es: "QUÉ CAPTURA" } as Bi,
  fields: [
    { en: "Product description", es: "Descripción del producto" },
    { en: "Pieces", es: "Piezas" },
    { en: "Waste (merma)", es: "Merma" },
    { en: "Unit cost", es: "Costo unitario" },
    { en: "Customization", es: "Personalización" },
    { en: "Hologram", es: "Holograma" },
    { en: "Strap (fleje)", es: "Fleje" },
    { en: "Handling", es: "Maniobras" },
    { en: "Display box", es: "Caja display" },
    { en: "Logistics cost", es: "Costo logístico" },
  ] as Bi[],
  roleLabel: { en: "MY ROLE", es: "MI ROL" } as Bi,
  role: {
    en: "I designed the architecture, built the Angular frontend and the Quarkus/Java backend, and implemented the Odoo integration — from reverse-engineering the original spreadsheet logic to shipping the system that replaced it.",
    es: "Diseñé la arquitectura, construí el frontend en Angular y el backend en Quarkus/Java, e implementé la integración con Odoo — desde entender a fondo la lógica de la hoja de cálculo original hasta entregar el sistema que la reemplazó.",
  } as Bi,
  evolutionLabel: { en: "WHAT'S NEXT", es: "SIGUIENTE PASO" } as Bi,
  evolution: {
    en: "The next step is evolving GBS Builder from a calculator into a tracking tool: budgeted vs. quoted, projected vs. actual, margin deviations and dashboards built on live Odoo data.",
    es: "El siguiente paso es evolucionar GBS Builder de una calculadora a una herramienta de seguimiento: presupuestado vs. cotizado, proyectado vs. real, desviaciones de margen y dashboards construidos sobre datos vivos de Odoo.",
  } as Bi,
  stack: "Angular · Java 21 · Quarkus · Odoo (XML-RPC)",
};

export const CAPABILITIES: { icon: string; accent: string; glow: string; title: Bi; items: Bi[] }[] = [
  {
    icon: "▤",
    accent: "#38BDF8",
    glow: "radial-gradient(circle at 34% 30%, #BFDBFE, #38BDF8 45%, #14224A 100%)",
    title: { en: "Build Interfaces", es: "Construir Interfaces" },
    items: [
      { en: "Angular · React · Astro", es: "Angular · React · Astro" },
      { en: "TypeScript", es: "TypeScript" },
      { en: "Tailwind CSS", es: "Tailwind CSS" },
    ],
  },
  {
    icon: "⌬",
    accent: "#8B5CF6",
    glow: "radial-gradient(circle at 35% 32%, #93C5FD, #2563EB 52%, #1E1B4B 100%)",
    title: { en: "Build Systems", es: "Construir Sistemas" },
    items: [
      { en: "Java 21 · Quarkus", es: "Java 21 · Quarkus" },
      { en: "REST APIs", es: "REST APIs" },
    ],
  },
  {
    icon: "⛁",
    accent: "#A78BFA",
    glow: "radial-gradient(circle at 36% 34%, #E9D5FF, #8B5CF6 48%, #2E1065 100%)",
    title: { en: "Work with Data", es: "Trabajar con Datos" },
    items: [
      { en: "PostgreSQL", es: "PostgreSQL" },
      { en: "Odoo 18", es: "Odoo 18" },
    ],
  },
  {
    icon: "◈",
    accent: "#60A5FA",
    glow: "radial-gradient(circle at 33% 30%, #DBEAFE, #3B82F6 48%, #1E3A8A 100%)",
    title: { en: "Connect Systems", es: "Conectar Sistemas" },
    items: [
      { en: "XML-RPC · JWT", es: "XML-RPC · JWT" },
      { en: "Odoo Studio · QWeb", es: "Odoo Studio · QWeb" },
    ],
  },
  {
    icon: "◬",
    accent: "#E879F9",
    glow: "radial-gradient(circle at 38% 32%, #F5D0FE, #C026D3 50%, #3B0764 100%)",
    title: { en: "Design Solutions", es: "Diseñar Soluciones" },
    items: [
      { en: "Business Logic", es: "Lógica de Negocio" },
      { en: "Hexagonal Architecture", es: "Arquitectura Hexagonal" },
      { en: "System Integration", es: "Integración de Sistemas" },
    ],
  },
];

export const EXPERIENCE: { dotColor: string; title: Bi; date: Bi; company: string; body: Bi; stack: string }[] = [
  {
    dotColor: "#8B5CF6",
    title: { en: "Full Stack Developer — Odoo Systems", es: "Full Stack Developer — Sistemas Odoo" },
    date: { en: "2026 — PRESENT", es: "2026 — ACTUALIDAD" },
    company: "CPA GRUP",
    body: {
      en: "Designs and builds platforms around Odoo: custom views, reports, automated actions and Odoo Spreadsheets over sales, purchasing and inventory processes, plus integrations with external applications. What started as ERP support grew into building the standalone tools the operation actually needed.",
      es: "Diseña y construye plataformas alrededor de Odoo: vistas personalizadas, reportes, acciones automatizadas y Odoo Spreadsheets sobre procesos de ventas, compras e inventarios, además de integraciones con aplicaciones externas. Lo que empezó como soporte ERP evolucionó hacia construir las herramientas propias que la operación realmente necesitaba.",
    },
    stack: "ODOO 18 · ODOO STUDIO · XML-RPC · JAVA 21 · QUARKUS · ANGULAR",
  },
  {
    dotColor: "#94A3B8",
    title: { en: "Odoo Support & Implementation", es: "Soporte e Implementación Odoo" },
    date: { en: "2025", es: "2025" },
    company: "CPA GRUP",
    body: {
      en: "First contact with real ERP operations: sales, purchasing, inventory and quotation flows, user access, and the customizations — views, XML, QWeb reports — that kept the system matching how the business actually worked.",
      es: "Primer contacto con la operación real de un ERP: flujos de ventas, compras, inventarios y cotizaciones, accesos de usuario, y las personalizaciones — vistas, XML, reportes QWeb — que mantenían el sistema alineado con cómo funcionaba realmente el negocio.",
    },
    stack: "ODOO · XML · QWEB · BUSINESS PROCESSES",
  },
  {
    dotColor: "#38BDF8",
    title: { en: "Backend Developer — Social Service", es: "Desarrollador Backend — Servicio Social" },
    date: { en: "2025", es: "2025" },
    company: "CORPORATIVO EMETH",
    body: {
      en: "Built backend services and data models in Java, with a focus on clean REST APIs and a structure that stayed maintainable as the project grew.",
      es: "Desarrollo de servicios backend y modelos de datos en Java, con foco en APIs REST limpias y una estructura que se mantuviera sostenible conforme el proyecto crecía.",
    },
    stack: "JAVA · REST APIs · POSTGRESQL",
  },
];

export const ABOUT = {
  lead: {
    en: "I work where the operation meets the software — reading how a company actually runs, then building the system that makes it run better.",
    es: "Trabajo donde la operación se encuentra con el software — leo cómo funciona realmente una empresa y construyo el sistema que la hace funcionar mejor.",
  } as Bi,
  p1: {
    en: "I'm studying Computer Engineering at UPIICSA while working on real ERP operations: Odoo customization, backend services, process analysis and the technical decisions that hold a solution together. The interesting part is rarely the framework — it's the rule buried in a spreadsheet that nobody documented.",
    es: "Estudio Ingeniería en Informática en la UPIICSA mientras trabajo sobre operaciones ERP reales: personalización de Odoo, servicios backend, análisis de procesos y las decisiones técnicas que sostienen una solución. Lo interesante casi nunca es el framework — es la regla enterrada en una hoja de cálculo que nadie documentó.",
  } as Bi,
  p2: {
    en: "That started as ERP support, grew into full-stack development, and is now pulling me toward architecture — I'm currently a Full Stack Developer, moving toward Software Engineer and, eventually, Solutions Architect.",
    es: "Eso empezó como soporte ERP, creció hacia desarrollo full-stack, y ahora me está llevando hacia la arquitectura — actualmente soy Full Stack Developer, avanzando hacia Software Engineer y, eventualmente, Solutions Architect.",
  } as Bi,
  stats: [
    { label: { en: "FOCUS", es: "ENFOQUE" }, value: { en: "Backend · Integration", es: "Backend · Integración" } },
    { label: { en: "STUDYING", es: "ESTUDIA" }, value: { en: "Computer Engineering, UPIICSA", es: "Ing. en Informática, UPIICSA" } },
    { label: { en: "NEXT", es: "SIGUIENTE" }, value: { en: "Software Engineer", es: "Software Engineer" } },
  ] as { label: Bi; value: Bi }[],
};

// Career trajectory: where I am, where I'm headed. Node 0 is current —
// never render node 1/2 as already reached.
export const CAREER_PATH: { title: string; state: "current" | "next" | "future"; body: Bi }[] = [
  {
    title: "Full Stack Developer",
    state: "current",
    body: {
      en: "Building complete features end to end — frontend, backend and the integrations between them.",
      es: "Construyendo funcionalidades completas de extremo a extremo — frontend, backend y las integraciones entre ambos.",
    },
  },
  {
    title: "Software Engineer",
    state: "next",
    body: {
      en: "Owning architecture and technical decisions, not just implementation.",
      es: "Responsable de la arquitectura y las decisiones técnicas, no solo de la implementación.",
    },
  },
  {
    title: "Solutions Architect",
    state: "future",
    body: {
      en: "Designing how business and systems fit together at a larger scale.",
      es: "Diseñando cómo encajan el negocio y los sistemas a mayor escala.",
    },
  },
];

export const CONTACT = {
  eyebrow: { en: "SAME UNIVERSE. HIGHER POSSIBILITIES.", es: "MISMO UNIVERSO. MÁS POSIBILIDADES." } as Bi,
  headline: { en: "Have a problem that software could solve?", es: "¿Tienes un problema que el software podría resolver?" } as Bi,
  body: {
    en: "Tell me how the process works. We'll figure out the technology after that.",
    es: "Cuéntame cómo funciona el proceso. La tecnología la resolvemos después.",
  } as Bi,
  ctaPrimary: { en: "LET'S CONNECT", es: "HABLEMOS" } as Bi,
  ctaSecondary: { en: "DOWNLOAD CV", es: "DESCARGAR CV" } as Bi,
  email: "marioyaelgg@gmail.com",
  github: "https://github.com/MaelRD",
  githubLabel: "github.com/MaelRD",
  site: "https://maeldev.netlify.app/",
  siteLabel: "maeldev.netlify.app",
  phone: "+525610919906",
  phoneDisplay: "+52 56 1091 9906",
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
    title: { en: "CAPABILITIES", es: "CAPACIDADES" } as Bi,
    tag: { en: "TECHNICAL SKILL. BUSINESS PERSPECTIVE.", es: "HABILIDAD TÉCNICA. VISIÓN DE NEGOCIO." } as Bi,
    accent: "#8B5CF6",
  },
  experience: {
    title: { en: "EXPERIENCE", es: "EXPERIENCIA" } as Bi,
    tag: "ERP SUPPORT → DEVELOPMENT → ARCHITECTURE",
    accent: "#38BDF8",
  },
  about: {
    title: { en: "ABOUT", es: "PERFIL" } as Bi,
    accent: "#7042F8",
  },
  career: {
    title: { en: "WHERE I'M HEADED", es: "HACIA DÓNDE VOY" } as Bi,
    tag: { en: "CURRENT TRAJECTORY.", es: "TRAYECTORIA ACTUAL." } as Bi,
    accent: "#C026D3",
  },
};
