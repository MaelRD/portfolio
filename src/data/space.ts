// Copy for the home page and the pages that share its shell. Text comes from
// the portfolio brief; projects and case studies live in src/content/projects.

import { bi, type Bi, type Lang, type Text } from "./content";

export type { Bi, Lang, Text };

// ── Navigation ──────────────────────────────────────────────────────────────

export const NAV = [
  { id: "work", label: bi("Proyectos", "Work") },
  { id: "solutions", label: bi("Soluciones", "Solutions") },
  { id: "process", label: bi("Proceso", "Process") },
  { id: "experience", label: bi("Experiencia", "Experience") },
  { id: "about", label: bi("Sobre mí", "About") },
  { id: "contact", label: bi("Contacto", "Contact") },
]

export const UI_TEXT = {
  skip: bi("Saltar al contenido", "Skip to content"),
  nav: bi("Navegación principal", "Main navigation"),
  lang: bi("Idioma", "Language"),
  home: bi("Mario Yael, volver al inicio", "Mario Yael, back to top"),
  cv: bi("CV", "CV"),
  resume: bi("CV", "Resume"),
  cvLabel: bi("Descargar CV (PDF)", "Download CV (PDF)"),
  newTab: bi("(se abre en una pestaña nueva)", "(opens in a new tab)"),
  cta: bi("Hablemos", "Let's talk"),
  copyEmail: bi("Copiar correo", "Copy email"),
  copied: bi("¡Copiado!", "Copied!"),
  menuOpen: bi("Abrir menú", "Open menu"),
  menuClose: bi("Cerrar menú", "Close menu"),
};

// ── Hero ────────────────────────────────────────────────────────────────────

export const HERO = {
  // Rendered by the protected Name component: do not change.
  first: "Mario",
  last: "Yael",
  eyebrow: bi("DESARROLLADOR DE SOFTWARE EN MÉXICO", "SOFTWARE DEVELOPER IN MEXICO"),
  statement: bi("Diseño software alrededor de problemas reales.", "I design software around real problems."),
  description: bi(
    "Analizo procesos, modelo sus reglas y los convierto en aplicaciones, integraciones y automatizaciones que reducen trabajo manual, centralizan información y mejoran la operación.",
    "I analyze processes, model their rules and turn them into applications, integrations and automation that reduce manual work, centralize information and improve operations.",
  ),
  ctaWork: bi("Ver mi trabajo", "View my work"),
  ctaTalk: bi("Hablemos", "Let's talk"),
  stack: ["Java 21", "Spring Boot", "Quarkus", "Angular", "React", "Python", "PostgreSQL"],
  stackLabel: bi("Stack principal", "Main stack"),
  // The original orrery: one orbit per layer of the system, inside out.
  orbitLabel: bi(
    "Diagrama: el sistema como un planeta. En órbita, de dentro hacia fuera: usuario (quien inicia una acción), interfaz (donde ocurre la interacción), API (el contrato entre sistemas), dominio (donde viven las reglas y decisiones) y datos (donde se persiste el estado). Los servicios externos se comunican con la API.",
    "Diagram: the system as a planet. In orbit, from inside out: user (who starts an action), interface (where interaction happens), API (the contract between systems), domain (where rules and decisions live) and data (where state is persisted). External services communicate with the API.",
  ),
  orbits: [
    { label: bi("USUARIO", "USER"), color: "#EEEBFF", size: 9, rx: 23, ry: 8.8, speed: 0.00034, phase: 0.4 },
    { label: bi("INTERFAZ", "INTERFACE"), color: "#7DE3FF", size: 10, rx: 30, ry: 11.5, speed: 0.00026, phase: 2.1 },
    { label: bi("API", "API"), color: "#A78BFA", size: 11, rx: 37, ry: 14.2, speed: 0.0002, phase: 3.9 },
    { label: bi("DOMINIO", "DOMAIN"), color: "#FFC07A", size: 12, rx: 43.5, ry: 16.7, speed: 0.00015, phase: 5.4 },
    { label: bi("DATOS", "DATA"), color: "#f472b6", size: 13, rx: 49, ry: 18.8, speed: 0.00011, phase: 1.2 },
  ],
  status: bi("Disponible para oportunidades profesionales y nuevos proyectos.", "Available for professional opportunities and new projects."),
};

// ── Section headers ─────────────────────────────────────────────────────────

export interface SectionHead {
  n?: string;
  eyebrow: Bi;
  title: Bi;
  intro?: Bi;
}

export const HEADS = {
  intent: {
    eyebrow: bi("DOS FORMAS DE EXPLORAR", "TWO WAYS TO EXPLORE"),
    title: bi("¿Qué estás buscando?", "What are you looking for?"),
    intro: bi(
      "Dos caminos. El mismo enfoque: entender el problema antes de construir.",
      "Two paths. The same approach: understand the problem before building.",
    ),
  },
  problems: {
    n: "01",
    eyebrow: bi("PROBLEMAS", "PROBLEMS"),
    title: bi("¿Te suena familiar?", "Sound familiar?"),
    intro: bi(
      "No todo problema necesita una aplicación nueva. Primero hay que identificar qué parte del proceso realmente vale la pena mejorar.",
      "Not every problem needs a new application. First we need to find which part of the process is actually worth improving.",
    ),
  },
  work: {
    n: "03",
    eyebrow: bi("PROYECTOS", "WORK"),
    title: bi("Problemas que he convertido en software.", "Problems I've turned into software."),
    intro: bi(
      "No construyo proyectos únicamente para utilizar una tecnología. Me interesa entender las reglas que existen detrás del problema y decidir qué debe pertenecer al sistema.",
      "I don't build projects just to use a technology. I'm interested in understanding the rules behind the problem and deciding what belongs in the system.",
    ),
  },
  solutions: {
    n: "02",
    eyebrow: bi("SOLUCIONES", "SOLUTIONS"),
    title: bi("¿Qué quieres mejorar?", "What do you want to improve?"),
    intro: bi(
      "No necesitas llegar sabiendo qué tecnología necesitas. Podemos partir del proceso actual, detectar dónde se pierde tiempo o información y decidir qué tipo de solución tiene sentido construir.",
      "You don't need to arrive knowing which technology you need. We can start from the current process, find where time or information gets lost and decide what kind of solution makes sense to build.",
    ),
  },
  automation: {
    n: "04",
    eyebrow: bi("AUTOMATIZACIÓN", "AUTOMATION"),
    title: bi("Automatiza el trabajo que no deberías hacer manualmente.", "Automate the work you shouldn't be doing by hand."),
    intro: bi(
      "Un formulario, una cita o un pedido pueden disparar el resto del proceso: registrar, avisar, sincronizar y dar seguimiento sin que alguien lo tenga que recordar.",
      "A form, an appointment or an order can trigger the rest of the process: record, notify, sync and follow up without anyone having to remember.",
    ),
  },
  integrations: {
    n: "05",
    eyebrow: bi("INTEGRACIONES", "INTEGRATIONS"),
    title: bi("Tus herramientas, conectadas a un solo sistema.", "Your tools, connected to one system."),
    intro: bi(
      "No hace falta reemplazar lo que ya funciona. El sistema se vuelve el centro y cada herramienta recibe o entrega la información que le corresponde.",
      "There's no need to replace what already works. The system becomes the hub and each tool sends or receives the information it owns.",
    ),
  },
  process: {
    n: "06",
    eyebrow: bi("PROCESO", "PROCESS"),
    title: bi("Construir viene después de entender.", "Building comes after understanding."),
    intro: bi(
      "Una buena solución no empieza con código. Empieza entendiendo por qué existe el proceso y qué necesita realmente el usuario.",
      "A good solution doesn't start with code. It starts by understanding why the process exists and what the user actually needs.",
    ),
  },
  caseStudy: {
    n: "07",
    eyebrow: bi("CASO DE ESTUDIO", "CASE STUDY"),
    title: bi("De lógica en Excel a una aplicación conectada.", "From spreadsheet logic to a connected application."),
  },
  system: {
    n: "08",
    eyebrow: bi("PENSAMIENTO SISTÉMICO", "SYSTEM THINKING"),
    title: bi("No veo una pantalla. Veo un sistema.", "I don't see a screen. I see a system."),
    intro: bi(
      "Una interfaz es solamente una de las capas. Cuando diseño software intento entender cómo cada pieza afecta al resto del sistema.",
      "An interface is only one of the layers. When I design software I try to understand how each piece affects the rest of the system.",
    ),
  },
  capabilities: {
    n: "09",
    eyebrow: bi("CAPACIDADES", "CAPABILITIES"),
    title: bi("Skills", "Skills"),
  },
  experience: {
    n: "10",
    eyebrow: bi("EXPERIENCIA", "EXPERIENCE"),
    title: bi("Experiencia profesional", "Professional experience"),
  },
  about: {
    n: "11",
    eyebrow: bi("SOBRE MÍ", "ABOUT"),
    title: bi("Me gusta entender cómo funcionan las cosas.", "I like understanding how things work."),
  },
  contact: {
    n: "12",
    eyebrow: bi("CONTACTO", "CONTACT"),
    title: bi("¿Qué quieres construir?", "What do you want to build?"),
    intro: bi(
      "Estoy disponible tanto para oportunidades profesionales como para colaborar con empresas que necesiten desarrollar o mejorar sus sistemas.",
      "I'm available both for professional opportunities and for working with companies that need to build or improve their systems.",
    ),
  },
} satisfies Record<string, SectionHead>;

// ── Selected work ───────────────────────────────────────────────────────────

export const PROJECT_TEXT = {
  status: bi("ESTADO", "STATUS"),
  problem: bi("PROBLEMA", "PROBLEM"),
  solution: bi("SOLUCIÓN", "SOLUTION"),
  arch: bi("ARQUITECTURA · FLUJO DE DATOS", "ARCHITECTURE · DATA FLOW"),
  preview: bi("VISTA PREVIA", "PREVIEW"),
  schematic: bi("INTERFAZ · ESQUEMA", "INTERFACE · SCHEMATIC"),
  select: bi("Elige un proyecto", "Choose a project"),
};

// ── Process ─────────────────────────────────────────────────────────────────

const words = (...w: [string, string][]) => w.map(([es, en]) => bi(es, en));

export const STEPS: { name: Bi; code: Bi; desc: Bi; tags: Bi[] }[] = [
  {
    name: bi("Entender", "Understand"),
    code: bi("RECONOCIMIENTO", "RECONNAISSANCE"),
    desc: bi(
      "Analizo cómo funciona actualmente el proceso, quién participa, qué herramientas utiliza y dónde aparecen los principales problemas.",
      "I analyze how the process works today, who takes part, which tools it uses and where the main problems appear.",
    ),
    tags: words(["Usuarios", "Users"], ["Problemas", "Pain points"], ["Restricciones", "Constraints"], ["Objetivos", "Goals"]),
  },
  {
    name: bi("Modelar", "Model"),
    code: bi("CARTOGRAFÍA", "CARTOGRAPHY"),
    desc: bi(
      "Transformo el proceso en reglas, datos, actores, estados y relaciones que podamos entender antes de desarrollar.",
      "I turn the process into rules, data, actors, states and relationships we can understand before building.",
    ),
    tags: words(["Reglas de negocio", "Business rules"], ["Datos", "Data"], ["Relaciones", "Relationships"], ["Estados", "States"]),
  },
  {
    name: bi("Diseñar", "Design"),
    code: bi("PLAN DE VUELO", "FLIGHT PLAN"),
    desc: bi(
      "Defino cómo debería funcionar la solución y cómo interactuarán sus diferentes partes.",
      "I define how the solution should work and how its different parts will interact.",
    ),
    tags: words(["Flujos", "User flows"], ["Interfaces", "Interfaces"], ["Arquitectura", "Architecture"], ["Contratos", "Contracts"]),
  },
  {
    name: bi("Construir", "Build"),
    code: bi("LANZAMIENTO", "LAUNCH"),
    desc: bi(
      "Convierto el modelo en software utilizando las tecnologías que mejor se adapten al problema.",
      "I turn the model into software using the technologies that best fit the problem.",
    ),
    tags: words(["Frontend", "Frontend"], ["Backend", "Backend"], ["APIs", "APIs"], ["Integraciones", "Integrations"]),
  },
  {
    name: bi("Validar", "Validate"),
    code: bi("PRUEBAS DE VUELO", "FLIGHT TESTS"),
    desc: bi(
      "Probamos el sistema con escenarios reales para verificar que resuelva correctamente el proceso.",
      "We test the system against real scenarios to verify it handles the process correctly.",
    ),
    tags: words(["Escenarios", "Scenarios"], ["Casos límite", "Edge cases"], ["Feedback", "Feedback"], ["Pruebas", "Testing"]),
  },
  {
    name: bi("Mejorar", "Improve"),
    code: bi("CORRECCIÓN DE RUMBO", "COURSE CORRECTION"),
    desc: bi(
      "Analizamos nuevos cuellos de botella, oportunidades de automatización y mejoras conforme evoluciona la operación.",
      "We look at new bottlenecks, automation opportunities and improvements as the operation evolves.",
    ),
    tags: words(["Refactorización", "Refactoring"], ["Automatización", "Automation"], ["Métricas", "Metrics"], ["Evolución", "Evolution"]),
  },
];

export const STEP_TEXT = {
  phase: bi("FASE", "PHASE"),
  pathLabel: bi("Trayectoria del proceso en seis fases. Elige una fase para ver su detalle.", "The process as a six-phase trajectory. Choose a phase to see its details."),
};

// ── Experience ──────────────────────────────────────────────────────────────

export interface Role {
  /** Tag on the timeline (start year, or "now"). */
  year: Bi;
  /** Official title. */
  title: Bi;
  period: Bi;
  current?: boolean;
  context: Bi[];
  contributions: Bi[];
  stack: string[];
}

export const ORGS: { name: string; meta: Bi; roles: Role[] }[] = [
  {
    name: "CPA Grup",
    meta: bi("3 ROLES · MARZO 2025 — PRESENTE", "3 ROLES · MARCH 2025 — PRESENT"),
    roles: [
      {
        year: bi("AHORA", "NOW"),
        title: bi("Full Stack Developer · Líder Técnico Odoo", "Full Stack Developer · Odoo Technical Lead"),
        period: bi("Junio 2026 — Presente", "June 2026 — Present"),
        current: true,
        context: [
          bi(
            "Diseño y desarrollo de soluciones alrededor de procesos empresariales utilizando Odoo, Java y tecnologías web.",
            "Designing and building solutions around business processes with Odoo, Java and web technologies.",
          ),
          bi(
            "Participación en levantamiento de requerimientos, modelado de procesos, desarrollo de integraciones y coordinación técnica.",
            "Involved in requirements gathering, process modeling, integration development and technical coordination.",
          ),
        ],
        contributions: [
          bi("Desarrollo e integro aplicaciones internas como GBS Builder.", "Develop and integrate internal applications such as GBS Builder."),
          bi("Traduzco requerimientos operativos en requerimientos de software.", "Translate operational requirements into software requirements."),
          bi("Construyo servicios backend e integraciones con el ERP.", "Build backend services and ERP integrations."),
          bi("Coordino el trabajo técnico y la ejecución de sprints.", "Coordinate technical work and sprint execution."),
        ],
        stack: ["Java 21", "Quarkus", "Angular", "Odoo 18", "PostgreSQL", "XML-RPC"],
      },
      {
        year: bi("2026", "2026"),
        title: bi("Auxiliar de Soporte Odoo", "Odoo Support Assistant"),
        period: bi("Febrero 2026 — Junio 2026", "February 2026 — June 2026"),
        context: [
          bi(
            "Configuración y soporte de procesos empresariales dentro de Odoo, desarrollo de vistas, automatizaciones, reportes e integraciones.",
            "Configuring and supporting business processes in Odoo, building views, automations, reports and integrations.",
          ),
        ],
        contributions: [
          bi("Construí soluciones en Odoo alrededor de flujos operativos.", "Built Odoo solutions around operational workflows."),
          bi("Implementé integraciones backend.", "Implemented backend integrations."),
          bi("Trabajé en autenticación y validación de datos.", "Worked on authentication and data validation."),
          bi(
            "Atendí incidencias de seguridad, datos y procesos operativos.",
            "Supported incidents involving security, data and operational processes.",
          ),
        ],
        stack: ["Odoo 18", "Java", "Quarkus", "JWT", "PostgreSQL", "Jira"],
      },
      {
        year: bi("2025", "2025"),
        title: bi("Becario de Soporte Odoo ERP", "Odoo Support Intern"),
        period: bi("Marzo 2025 — Febrero 2026", "March 2025 — February 2026"),
        context: [
          bi(
            "Primer acercamiento profesional a sistemas empresariales, soporte funcional, configuración y personalización de Odoo.",
            "My first professional contact with business systems: functional support, configuration and customization of Odoo.",
          ),
        ],
        contributions: [
          bi("Configuré módulos, vistas y reportes.", "Configured modules, views and reports."),
          bi("Trabajé en migraciones y cargas masivas de datos.", "Worked with data migrations and bulk data loads."),
          bi("Documenté procesos de negocio e incidencias.", "Documented business processes and incidents."),
        ],
        stack: ["Odoo", "XML", "QWeb", "Jira"],
      },
    ],
  },
  {
    name: "Corporativo Emeth",
    meta: bi("SERVICIO SOCIAL", "SOCIAL SERVICE"),
    roles: [
      {
        year: bi("2025", "2025"),
        title: bi("Desarrollador Backend · Servicio Social", "Backend Developer · Social Service"),
        period: bi("Julio 2025 — Enero 2026", "July 2025 — January 2026"),
        context: [
          bi(
            "Desarrollo de servicios backend utilizando Java, APIs REST y arquitectura hexagonal.",
            "Building backend services with Java, REST APIs and hexagonal architecture.",
          ),
        ],
        contributions: [
          bi("Construí servicios backend en Java.", "Built backend services using Java."),
          bi("Apliqué arquitectura hexagonal y principios SOLID.", "Applied hexagonal architecture and SOLID principles."),
          bi("Construí APIs REST.", "Built REST APIs."),
          bi("Trabajé en la optimización de consultas SQL.", "Worked on SQL query optimization."),
          bi("Usé Docker y Git para los entornos de desarrollo.", "Used Docker and Git for development environments."),
        ],
        stack: ["Java", "REST APIs", "SQL", "Docker", "Git"],
      },
    ],
  },
];

// ── Footer ──────────────────────────────────────────────────────────────────

export const FOOTER = {
  name: "Mario Yael Gordillo García",
  role: bi("Desarrollador de Software · México", "Software Developer · Mexico"),
  status: bi(
    "Disponible para oportunidades profesionales y proyectos de software.",
    "Available for professional opportunities and software projects.",
  ),
  email: bi("Email", "Email"),
  cv: bi("CV", "Resume"),
  copyright: "© 2026 Mario Yael Gordillo García",
};

// ── Text loop ───────────────────────────────────────────────────────────────

export const LOOP_TEXT = bi("Desarrollo de software", "Software development");
