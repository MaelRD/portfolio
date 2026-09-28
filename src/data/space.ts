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
];

export const UI_TEXT = {
  skip: bi("Saltar al contenido", "Skip to content"),
  nav: bi("Navegación principal", "Main navigation"),
  lang: bi("Idioma", "Language"),
  home: bi("Mario Yael, volver al inicio", "Mario Yael, back to top"),
  cv: bi("CV", "CV"),
  resume: bi("CV", "Resume"),
  cvLabel: bi("Descargar CV (PDF)", "Download CV (PDF)"),
  newTab: bi("(se abre en una pestaña nueva)", "(opens in a new tab)"),
  cta: bi("Iniciar un proyecto", "Start a project"),
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
  eyebrow: bi("DESARROLLADOR DE SOFTWARE · MÉXICO", "SOFTWARE DEVELOPER · MEXICO"),
  statement: bi("Diseño software alrededor de problemas reales.", "I design software around real problems."),
  description: bi(
    "Analizo procesos, modelo sus reglas y los convierto en aplicaciones web, sistemas backend, integraciones y automatizaciones fáciles de usar, mantener y evolucionar.",
    "I analyze processes, model their rules and turn them into web applications, backend systems, integrations and automation that are easier to use, maintain and evolve.",
  ),
  ctaWork: bi("Ver proyectos", "View my work"),
  ctaStart: bi("Iniciar un proyecto", "Start a project"),
  ctaCv: bi("Descargar CV", "Download resume"),
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
  status: bi("DISPONIBLE PARA OPORTUNIDADES", "AVAILABLE FOR OPPORTUNITIES"),
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
    title: bi("¿Qué estás buscando?", "What brings you here?"),
    intro: bi(
      "El mismo trabajo puede contar dos historias diferentes. Elige lo que quieres explorar.",
      "The same work can tell two different stories. Choose what you want to explore.",
    ),
  },
  work: {
    n: "01",
    eyebrow: bi("TRABAJO SELECCIONADO", "SELECTED WORK"),
    title: bi("Problemas que he convertido en software.", "Problems I've turned into software."),
    intro: bi(
      "Una selección de sistemas donde lo interesante no fue solamente escribir código, sino entender el proceso, modelar sus reglas y diseñar la solución.",
      "A selection of systems where the interesting part wasn't just writing code, but understanding the process, modeling the rules and designing the solution.",
    ),
  },
  solutions: {
    n: "02",
    eyebrow: bi("SOLUCIONES", "SOLUTIONS"),
    title: bi("Software construido alrededor de cómo funciona realmente el problema.", "Software built around the way the problem actually works."),
    intro: bi(
      "No todos los problemas necesitan otra plataforma genérica. Desarrollo soluciones enfocadas en procesos, reglas de negocio, datos e integraciones.",
      "Not every problem needs another generic platform. I build focused solutions around workflows, business rules, data and integrations.",
    ),
  },
  process: {
    n: "03",
    eyebrow: bi("PROCESO", "PROCESS"),
    title: bi("Cómo convierto ambigüedad en software.", "How I turn ambiguity into software."),
    intro: bi(
      "El código viene después de entender qué necesita funcionar, por qué importa y cómo se relacionan las piezas.",
      "Code comes after understanding what needs to work, why it matters and how the pieces relate.",
    ),
  },
  system: {
    n: "04",
    eyebrow: bi("PENSAMIENTO SISTÉMICO", "SYSTEM THINKING"),
    title: bi("No veo una pantalla. Veo un sistema.", "I don't see a screen. I see a system."),
    intro: bi(
      "Cada interfaz es solamente la parte visible de un sistema mayor compuesto por reglas, datos, servicios y responsabilidades.",
      "Every interface is only the visible edge of a larger system made of rules, data, services and responsibilities.",
    ),
  },
  caseStudy: {
    n: "05",
    eyebrow: bi("CASO DE ESTUDIO", "CASE STUDY"),
    title: bi("De lógica en Excel a una aplicación conectada.", "From spreadsheet logic to a connected application."),
    intro: bi(
      "Una mirada más profunda a cómo un proceso manual de costeo se convirtió en un sistema Full Stack integrado con un ERP.",
      "A closer look at how a manual costing process became a Full Stack system integrated with an ERP.",
    ),
  },
  capabilities: {
    n: "06",
    eyebrow: bi("CAPACIDADES", "CAPABILITIES"),
    title: bi("Las herramientas detrás de las soluciones.", "The tools behind the solutions."),
    intro: bi("Tecnologías agrupadas por la responsabilidad que me ayudan a resolver.", "Technologies grouped by the responsibility they help me solve."),
  },
  experience: {
    n: "07",
    eyebrow: bi("EXPERIENCIA", "EXPERIENCE"),
    title: bi("Donde he aplicado esta forma de pensar.", "Where I've applied this thinking."),
    intro: bi(
      "Los puestos dan contexto. Los problemas, sistemas y responsabilidades detrás de ellos cuentan la historia real.",
      "Roles provide context. The problems, systems and responsibilities behind them tell the real story.",
    ),
  },
  about: {
    n: "08",
    eyebrow: bi("SOBRE MÍ", "ABOUT"),
    title: bi("Me gusta entender cómo funcionan las cosas.", "I like understanding how things work."),
  },
  contact: {
    n: "09",
    eyebrow: bi("CANAL ABIERTO", "OPEN CHANNEL"),
    title: bi("¿Tienes un proceso que debería funcionar mejor?", "Have a process that should work better?"),
    intro: bi(
      "Si gestionas una operación mediante hojas de cálculo, mensajes, trabajo manual repetitivo o sistemas desconectados, puedo ayudarte a explorar si el software puede simplificarla.",
      "If you're managing an operation through spreadsheets, messages, repetitive manual work or disconnected systems, I can help you explore whether software can simplify it.",
    ),
  },
} satisfies Record<string, SectionHead>;

// ── Intent selector ─────────────────────────────────────────────────────────

export const INTENTS = [
  {
    key: "career",
    href: "#experience",
    label: bi("CARRERA", "CAREER"),
    title: bi("Estoy evaluando tu perfil técnico.", "I’m evaluating your technical profile."),
    text: bi(
      "Explora mi experiencia, decisiones de ingeniería, arquitectura, tecnologías y los sistemas que he construido.",
      "Explore my experience, engineering decisions, architecture, technologies and the systems I’ve built.",
    ),
    support: bi(
      "Ideal para recruiters, Tech Leads o equipos técnicos que quieran conocer mi experiencia.",
      "Best if you're a recruiter, Tech Lead or engineering team evaluating my background.",
    ),
    cta: bi("Explorar perfil", "Explore my profile"),
  },
  {
    key: "project",
    href: "#solutions",
    label: bi("PROYECTO", "PROJECT"),
    title: bi("Tengo un problema que quiero resolver.", "I have a problem I want to solve."),
    text: bi(
      "Conoce qué tipo de software desarrollo, cómo abordo problemas y cómo podríamos trabajar juntos.",
      "See the types of software I build, how I approach problems and how we could work together.",
    ),
    support: bi(
      "Ideal si necesitas una aplicación, integración, automatización o sistema interno.",
      "Best if you need a web application, integration, automation or internal system.",
    ),
    cta: bi("Explorar soluciones", "Explore solutions"),
  },
];

// ── Selected work ───────────────────────────────────────────────────────────

export const PROJECT_TEXT = {
  status: bi("ESTADO", "STATUS"),
  problem: bi("PROBLEMA", "PROBLEM"),
  solution: bi("SOLUCIÓN", "SOLUTION"),
  arch: bi("ARQUITECTURA · FLUJO DE DATOS", "ARCHITECTURE · DATA FLOW"),
  select: bi("Elige un proyecto", "Choose a project"),
};

/** Each project's planet in the original selector, by slug. */
export const PLANETS: Record<string, { planet: string; glow: string }> = {
  "gbs-builder": { planet: "radial-gradient(circle at 32% 30%,#ffe7c7,#ff9f5a 38%,#9a3412 66%,#2a0a04 88%)", glow: "rgba(255,160,90,.45)" },
  "layout-builder": { planet: "radial-gradient(circle at 32% 30%,#d5fbff,#22d3ee 36%,#0e7490 64%,#021a24 88%)", glow: "rgba(34,211,238,.45)" },
  "el-crisol": { planet: "radial-gradient(circle at 32% 30%,#fce7f3,#e879f9 34%,#7e22ce 62%,#1e0536 88%)", glow: "rgba(232,121,249,.45)" },
};

// ── Solutions ───────────────────────────────────────────────────────────────

const words = (...w: [string, string][]) => w.map(([es, en]) => bi(es, en));

export const SOLUTIONS: { n: string; title: Bi; desc: Bi; problems: Bi[]; flow: Bi[]; twoWay?: boolean }[] = [
  {
    n: "01",
    title: bi("Software empresarial a medida", "Custom Business Software"),
    desc: bi(
      "Aplicaciones diseñadas alrededor de procesos operativos que no encajan correctamente en herramientas genéricas.",
      "Applications designed around operational processes that don't fit comfortably inside generic tools.",
    ),
    problems: words(["Cotizaciones", "Quoting"], ["Operaciones", "Operations"], ["Flujos internos", "Internal workflows"], ["Seguimiento", "Tracking"]),
    flow: words(["PROCESO", "PROCESS"], ["REGLAS", "RULES"], ["SOFTWARE", "SOFTWARE"]),
  },
  {
    n: "02",
    title: bi("Aplicaciones web", "Web Applications"),
    desc: bi(
      "Plataformas, portales y herramientas interactivas para empleados, clientes o procesos específicos.",
      "Interactive platforms, portals and tools for employees, customers or specific business processes.",
    ),
    problems: words(
      ["Portales para clientes", "Customer portals"],
      ["Plataformas internas", "Internal platforms"],
      ["Herramientas operativas", "Operational tools"],
      ["Sistemas interactivos", "Interactive systems"],
    ),
    flow: words(["USUARIO", "USER"], ["WEB APP", "WEB APP"], ["API", "API"]),
  },
  {
    n: "03",
    title: bi("Backend y APIs", "Backend & APIs"),
    desc: bi(
      "Servicios backend donde reglas de negocio, seguridad, integraciones y datos necesitan una estructura clara.",
      "Backend services where business rules, security, integrations and data need a clear structure.",
    ),
    problems: words(["Lógica de negocio", "Business logic"], ["Autenticación", "Authentication"], ["APIs", "APIs"], ["Procesamiento de datos", "Data processing"]),
    flow: words(["PETICIÓN", "REQUEST"], ["LÓGICA", "LOGIC"], ["DATOS", "DATA"]),
  },
  {
    n: "04",
    title: bi("Automatización", "Automation"),
    desc: bi(
      "Reemplazar tareas manuales repetitivas mediante flujos, validaciones, notificaciones y acciones automatizadas.",
      "Replace repetitive manual steps with workflows, validations, notifications and automated actions.",
    ),
    problems: words(
      ["Captura repetida de datos", "Repeated data entry"],
      ["Generación de documentos", "Document generation"],
      ["Notificaciones", "Notifications"],
      ["Aprobaciones", "Approvals"],
    ),
    flow: words(["DISPARADOR", "TRIGGER"], ["PROCESO", "PROCESS"], ["ACCIÓN", "ACTION"]),
  },
  {
    n: "05",
    title: bi("Integración de sistemas", "System Integrations"),
    desc: bi(
      "Conectar aplicaciones, APIs, ERP y servicios externos para que la información fluya sin trabajo manual duplicado.",
      "Connect applications, APIs, ERP systems and external services so information can move without duplicated manual work.",
    ),
    problems: words(["ERP", "ERP"], ["APIs", "APIs"], ["Webhooks", "Webhooks"], ["Servicios externos", "External services"]),
    flow: words(["SISTEMA A", "SYSTEM A"], ["API", "API"], ["SISTEMA B", "SYSTEM B"]),
    twoWay: true,
  },
  {
    n: "06",
    title: bi("Desarrollo de MVP", "MVP Development"),
    desc: bi(
      "Convertir una idea de producto en una primera versión funcional con suficiente arquitectura para validarla y evolucionarla.",
      "Turn a product idea into a functional first version with enough architecture to validate and evolve it.",
    ),
    problems: words(["Ideas de producto", "Product ideas"], ["Prototipos", "Prototypes"], ["Primeras versiones", "First versions"], ["Validación", "Validation"]),
    flow: words(["IDEA", "IDEA"], ["PROTOTIPO", "PROTOTYPE"], ["MVP", "MVP"]),
  },
];

export const STACK_TEXT = {
  constellation: bi("CONSTELACIÓN", "CONSTELLATION"),
};

export const SOLUTION_TEXT = {
  problems: bi("PROBLEMAS RELACIONADOS", "RELATED PROBLEMS"),
};

// ── Process ─────────────────────────────────────────────────────────────────

export const STEPS: { name: Bi; code: Bi; desc: Bi; tags: Bi[] }[] = [
  {
    name: bi("Entender", "Understand"),
    code: bi("RECONOCIMIENTO", "RECONNAISSANCE"),
    desc: bi(
      "Analizo el proceso actual, las personas involucradas y el problema detrás de la solicitud.",
      "I analyze the current process, the people involved and the problem behind the request.",
    ),
    tags: words(["Usuarios", "Users"], ["Problemas", "Pain points"], ["Restricciones", "Constraints"], ["Objetivos", "Goals"]),
  },
  {
    name: bi("Modelar", "Model"),
    code: bi("CARTOGRAFÍA", "CARTOGRAPHY"),
    desc: bi(
      "Convierto el proceso en reglas, datos, relaciones, estados y escenarios que el software pueda entender.",
      "I turn the process into rules, data, relationships, states and scenarios the software can understand.",
    ),
    tags: words(["Reglas de negocio", "Business rules"], ["Datos", "Data"], ["Relaciones", "Relationships"], ["Estados", "States"]),
  },
  {
    name: bi("Diseñar", "Design"),
    code: bi("PLAN DE VUELO", "FLIGHT PLAN"),
    desc: bi(
      "Defino cómo experimentará el usuario la solución y cómo debe estructurarse el sistema detrás de ella.",
      "I define how the user experiences the solution and how the system should be structured behind it.",
    ),
    tags: words(["Flujos", "User flows"], ["Interfaces", "Interfaces"], ["Arquitectura", "Architecture"], ["Contratos", "Contracts"]),
  },
  {
    name: bi("Construir", "Build"),
    code: bi("LANZAMIENTO", "LAUNCH"),
    desc: bi(
      "Implemento frontend, backend, modelo de datos e integraciones manteniendo responsabilidades claramente separadas.",
      "I implement the frontend, backend, data model and integrations while keeping responsibilities clearly separated.",
    ),
    tags: words(["Frontend", "Frontend"], ["Backend", "Backend"], ["APIs", "APIs"], ["Integraciones", "Integrations"]),
  },
  {
    name: bi("Validar", "Validate"),
    code: bi("PRUEBAS DE VUELO", "FLIGHT TESTS"),
    desc: bi(
      "Valido la solución contra escenarios reales en lugar de asumir que una función técnicamente correcta resuelve el problema.",
      "I test the solution against real scenarios instead of assuming that a technically correct feature solves the actual problem.",
    ),
    tags: words(["Escenarios", "Scenarios"], ["Casos límite", "Edge cases"], ["Feedback", "Feedback"], ["Pruebas", "Testing"]),
  },
  {
    name: bi("Mejorar", "Improve"),
    code: bi("CORRECCIÓN DE RUMBO", "COURSE CORRECTION"),
    desc: bi(
      "Utilizo lo aprendido durante la implementación y el uso para simplificar, automatizar y evolucionar el sistema.",
      "I use what was learned during implementation and usage to simplify, automate and evolve the system.",
    ),
    tags: words(["Refactorización", "Refactoring"], ["Automatización", "Automation"], ["Métricas", "Metrics"], ["Evolución", "Evolution"]),
  },
];

export const STEP_TEXT = {
  phase: bi("FASE", "PHASE"),
  pathLabel: bi("Trayectoria del proceso en seis fases. Elige una fase para ver su detalle.", "The process as a six-phase trajectory. Choose a phase to see its details."),
};

// ── System thinking ─────────────────────────────────────────────────────────

export const LAYERS: { name: Bi; geo: Bi; resp: Bi; example: Bi }[] = [
  {
    name: bi("Usuario", "User"),
    geo: bi("ATMÓSFERA", "ATMOSPHERE"),
    resp: bi("Representa a la persona o actor externo que interactúa con el sistema.", "Represents the person or external actor interacting with the system."),
    example: bi("Cliente, empleado, administrador u otra aplicación.", "Customer, employee, administrator or another application."),
  },
  {
    name: bi("Interfaz", "Interface"),
    geo: bi("CORTEZA", "CRUST"),
    resp: bi(
      "Traduce las intenciones del usuario en interacciones que el sistema puede entender.",
      "Translates user intentions into interactions the system can understand.",
    ),
    example: bi("Formularios, dashboards, tablas, flujos y navegación.", "Forms, dashboards, tables, workflows and navigation."),
  },
  {
    name: bi("API", "API"),
    geo: bi("MANTO", "MANTLE"),
    resp: bi("Define cómo se comunican las aplicaciones y los servicios.", "Defines how applications and services communicate."),
    example: bi("Endpoints REST, validación, autenticación y contratos.", "REST endpoints, validation, authentication and contracts."),
  },
  {
    name: bi("Aplicación", "Application"),
    geo: bi("MANTO INTERNO", "INNER MANTLE"),
    resp: bi("Coordina los casos de uso y las acciones que el sistema debe realizar.", "Coordinates use cases and the actions the system needs to perform."),
    example: bi("Crear una cotización, registrar un pago o asignar una tarea.", "Create a quote, register a payment or assign a task."),
  },
  {
    name: bi("Dominio", "Domain"),
    geo: bi("NÚCLEO", "CORE"),
    resp: bi(
      "Donde viven las reglas de negocio y las decisiones, independientes de la interfaz.",
      "Where business rules and decisions live independently from the interface.",
    ),
    example: bi(
      "Reglas de precios, validación de cotizaciones, permisos y transiciones de estado.",
      "Pricing rules, quote validation, permissions and state transitions.",
    ),
  },
  {
    name: bi("Datos", "Data"),
    geo: bi("LUNA", "MOON"),
    resp: bi("Almacena el estado y el historial que la aplicación necesita.", "Stores the state and history the application needs."),
    example: bi("Usuarios, cotizaciones, transacciones, productos y configuración.", "Users, quotes, transactions, products and configuration."),
  },
  {
    name: bi("Servicios externos", "External services"),
    geo: bi("SATÉLITE", "SATELLITE"),
    resp: bi(
      "Representa los sistemas fuera de la aplicación que intercambian información con ella.",
      "Represents systems outside the application that exchange information with it.",
    ),
    example: bi("ERP, pasarelas de pago, SAT, servicios de correo o webhooks.", "ERP, payment gateways, SAT, email services or webhooks."),
  },
];

export const SYSTEM_TEXT = {
  responsibility: bi("RESPONSABILIDAD", "RESPONSIBILITY"),
  example: bi("EJEMPLO", "EXAMPLE"),
};

// ── Featured case study ─────────────────────────────────────────────────────

export const FEATURED = {
  slug: "gbs-builder",
  before: {
    label: bi("ANTES", "BEFORE"),
    items: words(
      ["Información distribuida entre áreas", "Information distributed across areas"],
      ["Cálculos en hojas de cálculo", "Spreadsheet calculations"],
      ["Transferencia manual de información", "Manual data transfer"],
      ["Trazabilidad limitada", "Limited traceability"],
      ["Flujos dependientes de personas", "Dependent workflows"],
    ),
  },
  after: {
    label: bi("DESPUÉS", "AFTER"),
    title: "GBS Builder",
    items: words(
      ["Datos centralizados", "Centralized quote data"],
      ["Reglas de negocio explícitas", "Explicit business rules"],
      ["Integración con ERP", "ERP integration"],
      ["Un solo flujo operativo", "Single operational workflow"],
    ),
  },
  quote: bi(
    "Lo interesante no fue recrear la hoja de cálculo. Fue entender qué reglas debían pertenecer al sistema.",
    "The interesting part wasn't recreating the spreadsheet. It was understanding which rules belonged to the system.",
  ),
  cta: bi("Leer caso de estudio", "Read the case study"),
};

// ── Capabilities ────────────────────────────────────────────────────────────

export const CAPABILITIES: { name: Bi; code: Bi; desc: Bi; items: string[] }[] = [
  {
    name: bi("Backend", "Backend"),
    code: bi("ORIÓN", "ORION"),
    desc: bi("Servicios, APIs y lógica de negocio.", "Services, APIs and business logic."),
    items: ["Java 21", "Spring Boot", "Quarkus", "Python", "FastAPI", "REST APIs"],
  },
  {
    name: bi("Frontend", "Frontend"),
    code: bi("LIRA", "LYRA"),
    desc: bi("Interfaces y aplicaciones interactivas.", "Interfaces and interactive applications."),
    items: ["Angular", "React", "Astro", "TypeScript"],
  },
  {
    name: bi("Datos", "Data"),
    code: bi("CASIOPEA", "CASSIOPEIA"),
    desc: bi("Datos relacionales, persistencia y caché.", "Relational data, persistence and caching."),
    items: ["PostgreSQL", "MySQL", "MariaDB", "Redis"],
  },
  {
    name: bi("Arquitectura", "Architecture"),
    code: bi("CYGNUS", "CYGNUS"),
    desc: bi(
      "Estructurar sistemas para que las responsabilidades se mantengan claras.",
      "Structuring systems so responsibilities stay clear.",
    ),
    items: ["Hexagonal Architecture", "MVC", "SOLID", "Design Patterns", "Event-driven concepts", "API Design"],
  },
  {
    name: bi("Empresarial e integración", "Enterprise & Integration"),
    code: bi("ÁGUILA", "AQUILA"),
    desc: bi("Conectar el software con los procesos operativos.", "Connecting software with operational processes."),
    items: ["Odoo", "XML-RPC", "ERP workflows", "Webhooks"],
  },
  {
    name: bi("Infraestructura y herramientas", "Infrastructure & Tools"),
    code: bi("PEGASO", "PEGASUS"),
    desc: bi("Desarrollo, despliegue y colaboración.", "Development, deployment and collaboration."),
    items: ["Docker", "Linux", "Git", "GitHub", "AWS", "Jira"],
  },
];

// ── Experience ──────────────────────────────────────────────────────────────

export interface Role {
  /** Tag on the timeline (start year, or "now"). */
  year: Bi;
  /** Official title. */
  title: Bi;
  period: Bi;
  current?: boolean;
  context: Bi;
  contributions: Bi[];
  stack: string[];
}

export const EXPERIENCE_TEXT = {
  current: bi("EN ÓRBITA · ACTUAL", "IN ORBIT · CURRENT"),
};

export const ORGS: { name: string; meta: Bi; roles: Role[] }[] = [
  {
    name: "CPA Grup",
    meta: bi("3 ROLES · MARZO 2025 — PRESENTE", "3 ROLES · MARCH 2025 — PRESENT"),
    roles: [
      {
        year: bi("AHORA", "NOW"),
        title: bi("Full Stack Developer y Líder Técnico Odoo", "Full Stack Developer & Odoo Technical Lead"),
        period: bi("Junio 2026 — Presente", "June 2026 — Present"),
        current: true,
        context: bi(
          "Aplicaciones internas e integraciones que soportan ventas, compras, logística y la operación del ERP.",
          "Internal applications and integrations supporting sales, purchasing, logistics and ERP operations.",
        ),
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
        context: bi(
          "Desarrollo interno y soporte técnico alrededor de los procesos del ERP.",
          "Internal development and technical support around ERP processes.",
        ),
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
        context: bi(
          "Mi primera experiencia directa con la operación real de un ERP en ventas, compras e inventario.",
          "My first direct experience working with real ERP operations across sales, purchasing and inventory.",
        ),
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
        title: bi("Desarrollador Backend de Servicio Social", "Backend Developer — Social Service"),
        period: bi("Julio 2025 — Enero 2026", "July 2025 — January 2026"),
        context: bi(
          "Desarrollo backend para una aplicación que maneja grandes volúmenes de datos.",
          "Backend development for an application handling high volumes of data.",
        ),
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

// ── About ───────────────────────────────────────────────────────────────────

export const ABOUT = {
  lead: bi(
    "Soy Mario Yael, desarrollador de software y estudiante de Ingeniería en Informática en México.",
    "I'm Mario Yael, a software developer and Computer Engineering student from Mexico.",
  ),
  paragraphs: [
    bi(
      "Lo que más me interesa del software no es solamente escribir código. Es entender el sistema detrás de la interfaz: el proceso, las reglas, los datos, las personas que lo utilizan y las decisiones que le dan forma.",
      "What interests me most about software isn't only writing code. It's understanding the system behind the interface: the process, the rules, the data, the people using it and the decisions that shape it.",
    ),
    bi(
      "Mi experiencia se ha enfocado en aplicaciones empresariales, servicios backend, APIs, integraciones ERP y desarrollo Full Stack.",
      "My experience has focused on business applications, backend services, APIs, ERP integrations and Full Stack development.",
    ),
    bi(
      "Actualmente profundizo en ingeniería de software, diseño de sistemas y arquitectura mientras desarrollo productos que me obligan a resolver problemas cada vez más complejos.",
      "I'm currently deepening my knowledge of software engineering, system design and architecture while building products that force me to solve increasingly complex problems.",
    ),
  ],
  dossier: bi("EXPEDIENTE / MYG-01", "DOSSIER / MYG-01"),
  coords: bi("19.43°N 99.13°O", "19.43°N 99.13°W"),
  facts: [
    { k: bi("BASE", "BASED IN"), v: bi("México", "Mexico") },
    { k: bi("ESTUDIOS", "STUDIES"), v: bi("Ingeniería en Informática · IPN UPIICSA", "Computer Engineering · IPN UPIICSA"), note: bi("Egreso: diciembre 2026", "Graduation: December 2026") },
    { k: bi("IDIOMAS", "LANGUAGES"), v: bi("Español · Nativo", "Spanish · Native"), note: bi("Inglés · Técnico", "English · Technical") },
    { k: bi("ENFOQUE", "FOCUS"), v: bi("Ingeniería de Software", "Software Engineering"), note: bi("Aplicaciones empresariales · Diseño de sistemas", "Business Applications · System Design") },
  ] as { k: Bi; v: Bi; note?: Bi; wide?: boolean }[],
  // Career direction, on the original three level cards.
  levels: [
    { k: bi("ACTUAL", "CURRENT"), v: bi("Desarrollo Full Stack", "Full Stack Development"), color: "#7DE3FF" },
    { k: bi("PROFUNDIZANDO", "DEEPENING"), v: bi("Ingeniería de Software", "Software Engineering"), color: "#A78BFA" },
    { k: bi("DIRECCIÓN", "DIRECTION"), v: bi("Arquitectura de Soluciones", "Solutions Architecture"), color: "#FFC07A" },
  ],
  levelsNote: bi(
    "Una dirección profesional hacia la que estoy trabajando, no un puesto que esté afirmando tener actualmente.",
    "A direction I'm actively building toward, not a title I'm claiming today.",
  ),
};

// ── Open channel ────────────────────────────────────────────────────────────

export const CONTACT_TEXT = {
  email: bi("EMAIL", "EMAIL"),
  github: bi("GITHUB", "GITHUB"),
  cv: bi("CV (PDF)", "CV (PDF)"),
  support: bi(
    "No necesitas llegar con la solución técnica. Empecemos por el problema.",
    "You don't need to arrive with the technical solution. Start with the problem.",
  ),
  ctaStart: bi("Iniciar un proyecto", "Start a project"),
  ctaEmail: bi("Enviar correo", "Send an email"),
};

// ── Footer ──────────────────────────────────────────────────────────────────

export const FOOTER = {
  status: bi(
    "Disponible para oportunidades y proyectos freelance seleccionados",
    "Available for opportunities & selected freelance projects",
  ),
  copyright: bi("© 2026 Mario Yael Gordillo García · México", "© 2026 Mario Yael Gordillo García · Mexico"),
};

// ── Text loop ───────────────────────────────────────────────────────────────

export const LOOP_TEXT = bi("Desarrollo de software", "Software development");
