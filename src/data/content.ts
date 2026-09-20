// Content for the "Cosmic Engineering" design (single-page portfolio),
// ported from the claude.ai/design source. Every user-facing string is
// bilingual (`en`/`es`) so components can pick `copy[lang]` directly.

export type Lang = "en" | "es";

export interface Bi {
  en: string;
  es: string;
}

export const NAV_LINKS: { id: string; label: Bi }[] = [
  { id: "work", label: { en: "Work", es: "Proyectos" } },
  { id: "process", label: { en: "Process", es: "Proceso" } },
  { id: "experience", label: { en: "Experience", es: "Experiencia" } },
  { id: "about", label: { en: "About", es: "Perfil" } },
  { id: "contact", label: { en: "Contact", es: "Contacto" } },
];

export const BRAND = {
  name: "MARIO YAEL",
  role: { en: "SOFTWARE ENGINEER", es: "INGENIERO DE SOFTWARE" } as Bi,
};

export const HERO = {
  eyebrow: { en: "SOFTWARE ENGINEER", es: "INGENIERO DE SOFTWARE" } as Bi,
  headline: {
    en: { lead: "I design and build software around ", highlight: "real business processes." },
    es: { lead: "Diseño y construyo software alrededor de ", highlight: "procesos de negocio reales." },
  },
  body: {
    en: "Backend, systems integration and business automation — from understanding the operation to shipping the system that runs it.",
    es: "Backend, integración de sistemas y automatización de procesos — desde entender la operación hasta entregar el sistema que la sostiene.",
  } as Bi,
  ctaPrimary: { en: "EXPLORE MY WORK", es: "VER MI TRABAJO" } as Bi,
  ctaSecondary: { en: "DOWNLOAD CV", es: "DESCARGAR CV" } as Bi,
  footnote: {
    en: ["TURNING COMPLEXITY", "INTO OPPORTUNITY"],
    es: ["CONVERTIR LA COMPLEJIDAD", "EN OPORTUNIDAD"],
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
    eyebrow: "01 / BUSINESS",
    accent: "#7042F8",
    bgTint: "rgba(112,66,248,.10)",
    title: { en: "Business", es: "Negocio" },
    body: {
      en: "I understand how the operation actually works — the people, the handoffs and the rules nobody wrote down.",
      es: "Entiendo cómo funciona la operación real — las personas, los traspasos y las reglas que nadie escribió.",
    },
  },
  {
    eyebrow: "02 / ENGINEERING",
    accent: "#38BDF8",
    bgTint: "rgba(37,99,235,.10)",
    title: { en: "Engineering", es: "Ingeniería" },
    body: {
      en: "I design how the problem should be solved: architecture, data models and integration points that survive change.",
      es: "Diseño cómo debe resolverse el problema: arquitectura, modelos de datos e integraciones que resisten el cambio.",
    },
  },
  {
    eyebrow: "03 / SOFTWARE",
    accent: "#C026D3",
    bgTint: "rgba(192,38,211,.09)",
    title: { en: "Software", es: "Software" },
    body: {
      en: "I build and integrate the solution end to end — backend, frontend, ERP and everything in between.",
      es: "Construyo e integro la solución de extremo a extremo — backend, frontend, ERP y todo lo que hay en medio.",
    },
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
  visual: "gbs" | "layout" | "crisol";
}

export const PROJECTS: Project[] = [
  {
    index: "01",
    accent: "#8B5CF6",
    spotColor: "rgba(139,92,246,.18)",
    name: "GBS BUILDER",
    subtitle: { en: "Business quotation platform", es: "Plataforma de cotización comercial" },
    description: {
      en: "Mass capture, cost, margin, sale price and Odoo integration, modelled on the real commercial, purchasing and logistics flow.",
      es: "Captura masiva, costo, margen, precio de venta e integración con Odoo, modelados sobre el flujo comercial, de compras y logística real.",
    },
    stack: "Angular · Java 21 · Quarkus · Odoo",
    visual: "gbs",
  },
  {
    index: "02",
    accent: "#38BDF8",
    spotColor: "rgba(56,189,248,.16)",
    name: "LAYOUTBUILDER",
    subtitle: { en: "Systems integration layer", es: "Capa de integración de sistemas" },
    description: {
      en: "A hexagonal-architecture middle layer connecting a web app with Odoo, PostgreSQL, SAT, Discord and external services.",
      es: "Capa intermedia con arquitectura hexagonal que conecta una aplicación web con Odoo, PostgreSQL, SAT, Discord y servicios externos.",
    },
    stack: "Astro · React · Quarkus · PostgreSQL",
    visual: "layout",
  },
  {
    index: "03",
    accent: "#C026D3",
    spotColor: "rgba(192,38,211,.16)",
    name: "EL CRISOL",
    subtitle: { en: "AI knowledge system", es: "Sistema de conocimiento con IA" },
    description: {
      en: "A personal system that centralises knowledge, projects and documentation as shared context across AI tools and models.",
      es: "Sistema personal que centraliza conocimiento, proyectos y documentación como contexto compartido entre herramientas y modelos de IA.",
    },
    stack: "RAG · MCP · Knowledge Architecture",
    visual: "crisol",
  },
];

export const PROCESS_STEPS: { n: string; icon: string; accent: "violet" | "sky" | "fuchsia"; title: Bi; body: Bi }[] = [
  {
    n: "01",
    icon: "◎",
    accent: "violet",
    title: { en: "Understand", es: "Entender" },
    body: { en: "Business goals, users, restrictions and current processes.", es: "Objetivos, usuarios, restricciones y procesos actuales." },
  },
  {
    n: "02",
    icon: "▥",
    accent: "violet",
    title: { en: "Analyze", es: "Analizar" },
    body: {
      en: "Opportunities, bottlenecks, duplicated work and integration points.",
      es: "Oportunidades, cuellos de botella, trabajo duplicado e integraciones.",
    },
  },
  {
    n: "03",
    icon: "◧",
    accent: "sky",
    title: { en: "Design", es: "Diseñar" },
    body: { en: "Experience, architecture, data models and technical approach.", es: "Experiencia, arquitectura, modelos de datos y enfoque técnico." },
  },
  {
    n: "04",
    icon: "</>",
    accent: "sky",
    title: { en: "Build", es: "Construir" },
    body: { en: "Frontend, backend, integrations and validation with real data.", es: "Frontend, backend, integraciones y validación con datos reales." },
  },
  {
    n: "05",
    icon: "↻",
    accent: "fuchsia",
    title: { en: "Improve", es: "Mejorar" },
    body: { en: "Feedback, results, performance and continuous iteration.", es: "Feedback, resultados, rendimiento e iteración continua." },
  },
];

export const CAPABILITIES: { icon: string; accent: string; glow: string; title: string; items: Bi[] }[] = [
  {
    icon: "⌬",
    accent: "#8B5CF6",
    glow: "radial-gradient(circle at 35% 32%, #93C5FD, #2563EB 52%, #1E1B4B 100%)",
    title: "Engineering",
    items: [
      { en: "Java 21 · Quarkus · Python", es: "Java 21 · Quarkus · Python" },
      { en: "REST APIs", es: "REST APIs" },
      { en: "Hexagonal Architecture", es: "Hexagonal Architecture" },
      { en: "SOLID", es: "SOLID" },
    ],
  },
  {
    icon: "▤",
    accent: "#38BDF8",
    glow: "radial-gradient(circle at 34% 30%, #BFDBFE, #38BDF8 45%, #14224A 100%)",
    title: "Frontend",
    items: [
      { en: "Angular · React · Astro", es: "Angular · React · Astro" },
      { en: "TypeScript · JavaScript", es: "TypeScript · JavaScript" },
      { en: "HTML · CSS", es: "HTML · CSS" },
      { en: "Accessible interfaces", es: "Interfaces accesibles" },
    ],
  },
  {
    icon: "⛁",
    accent: "#A78BFA",
    glow: "radial-gradient(circle at 36% 34%, #E9D5FF, #8B5CF6 48%, #2E1065 100%)",
    title: "Systems",
    items: [
      { en: "Odoo 18 · XML-RPC", es: "Odoo 18 · XML-RPC" },
      { en: "PostgreSQL · JWT", es: "PostgreSQL · JWT" },
      { en: "Docker · Nginx", es: "Docker · Nginx" },
      { en: "Automation & integration", es: "Automatización e integración" },
    ],
  },
  {
    icon: "◬",
    accent: "#E879F9",
    glow: "radial-gradient(circle at 38% 32%, #F5D0FE, #C026D3 50%, #3B0764 100%)",
    title: "Product",
    items: [
      { en: "Business analysis", es: "Análisis de negocio" },
      { en: "Process & solution design", es: "Diseño de procesos y soluciones" },
      { en: "Requirements & documentation", es: "Requerimientos y documentación" },
      { en: "Technical leadership", es: "Liderazgo técnico" },
    ],
  },
];

export const EXPERIENCE: { dotColor: string; title: Bi; date: Bi; company: string; body: Bi; stack: string }[] = [
  {
    dotColor: "#8B5CF6",
    title: { en: "Full Stack Developer & Odoo Technical Lead", es: "Full Stack Developer y Líder Técnico Odoo" },
    date: { en: "JUN 2026 — PRESENT", es: "JUN 2026 — ACTUALIDAD" },
    company: "CPA GRUP",
    body: {
      en: "Leads the technical side of Odoo solutions: architecture and development of integrated platforms, requirement analysis with business areas, and sprint planning with the team.",
      es: "Lidera el lado técnico de las soluciones Odoo: arquitectura y desarrollo de plataformas integradas, análisis de requerimientos con las áreas de negocio y planeación de sprints con el equipo.",
    },
    stack: "JAVA 21 · QUARKUS · ANGULAR · ODOO 18 · POSTGRESQL · DOCKER",
  },
  {
    dotColor: "#38BDF8",
    title: { en: "Odoo Support Assistant", es: "Auxiliar de Soporte Odoo" },
    date: { en: "FEB 2026 — JUN 2026", es: "FEB 2026 — JUN 2026" },
    company: "CPA GRUP",
    body: {
      en: "Resolved functional and technical incidents across operational modules, translating recurring support patterns into permanent fixes and automations.",
      es: "Resolución de incidencias funcionales y técnicas en módulos operativos, convirtiendo patrones recurrentes de soporte en correcciones permanentes y automatizaciones.",
    },
    stack: "ODOO · PYTHON · XML-RPC · POSTGRESQL",
  },
  {
    dotColor: "#94A3B8",
    title: { en: "Odoo ERP Support Intern", es: "Becario de Soporte Odoo ERP" },
    date: { en: "MAR 2025 — FEB 2026", es: "MAR 2025 — FEB 2026" },
    company: "CPA GRUP",
    body: {
      en: "First contact with real ERP operations: sales, purchasing and inventory flows, user training and documentation of business processes.",
      es: "Primer contacto con la operación real de un ERP: flujos de ventas, compras e inventario, capacitación de usuarios y documentación de procesos.",
    },
    stack: "ODOO · BUSINESS PROCESSES · DOCUMENTATION",
  },
  {
    dotColor: "#94A3B8",
    title: { en: "Backend Developer — Social Service", es: "Desarrollador Backend — Servicio Social" },
    date: { en: "JUL 2025 — JAN 2026", es: "JUL 2025 — ENE 2026" },
    company: "CORPORATIVO EMETH",
    body: {
      en: "Built backend services and data models, with a focus on clean APIs and maintainable structure.",
      es: "Desarrollo de servicios backend y modelos de datos, con foco en APIs limpias y estructura mantenible.",
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
    en: "I'm studying Computer Engineering while working on real ERP operations: backend services, Odoo integration, process analysis and the technical decisions that hold a solution together. The interesting part is rarely the framework — it's the rule buried in a spreadsheet that nobody documented.",
    es: "Estudio Ingeniería en Informática mientras trabajo sobre operaciones ERP reales: servicios backend, integración con Odoo, análisis de procesos y las decisiones técnicas que sostienen una solución. Lo interesante casi nunca es el framework — es la regla enterrada en una hoja de cálculo que nadie documentó.",
  } as Bi,
  p2: {
    en: "I'm moving towards Software Engineer and Solutions Architect roles, building technology that is useful, maintainable and scalable.",
    es: "Avanzo hacia roles de Software Engineer y Solutions Architect, construyendo tecnología útil, mantenible y escalable.",
  } as Bi,
  stats: [
    { label: { en: "FOCUS", es: "ENFOQUE" }, value: { en: "Backend · Integration", es: "Backend · Integration" } },
    { label: { en: "STUDYING", es: "ESTUDIA" }, value: { en: "Computer Engineering", es: "Ing. en Informática" } },
    { label: { en: "NEXT", es: "SIGUIENTE" }, value: { en: "Solutions Architect", es: "Solutions Architect" } },
  ] as { label: Bi; value: Bi }[],
};

export const CONTACT = {
  eyebrow: { en: "SAME UNIVERSE. HIGHER POSSIBILITIES.", es: "MISMO UNIVERSO. MÁS POSIBILIDADES." } as Bi,
  headline: { en: "Have a problem worth solving?", es: "¿Tienes un problema que valga la pena resolver?" } as Bi,
  body: {
    en: "Let's build something useful — from the process behind it to the system that runs it.",
    es: "Construyamos algo útil — desde el proceso que hay detrás hasta el sistema que lo sostiene.",
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
    title: { en: "SELECTED WORK", es: "TRABAJO SELECCIONADO" } as Bi,
    tag: { en: "REAL PROBLEMS. INTEGRATED SOLUTIONS.", es: "PROBLEMAS REALES. SOLUCIONES INTEGRADAS." } as Bi,
    accent: "#7042F8",
  },
  process: {
    title: { en: "HOW I WORK", es: "CÓMO TRABAJO" } as Bi,
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
    tag: "BACKEND → ODOO → PROCESSES → INTEGRATION → LEADERSHIP",
    accent: "#38BDF8",
  },
  about: {
    title: { en: "ABOUT", es: "PERFIL" } as Bi,
    accent: "#7042F8",
  },
};
