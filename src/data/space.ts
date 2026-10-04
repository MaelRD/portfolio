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
    n: "02",
    eyebrow: bi("PROYECTOS", "WORK"),
    title: bi("Problemas que he convertido en software.", "Problems I've turned into software."),
    intro: bi(
      "No construyo proyectos únicamente para utilizar una tecnología. Me interesa entender las reglas que existen detrás del problema y decidir qué debe pertenecer al sistema.",
      "I don't build projects just to use a technology. I'm interested in understanding the rules behind the problem and deciding what belongs in the system.",
    ),
  },
  solutions: {
    n: "03",
    eyebrow: bi("SOLUCIONES", "SOLUTIONS"),
    title: bi("Software construido alrededor de tu operación.", "Software built around your operation."),
    intro: bi(
      "No necesitas llegar sabiendo qué tecnología necesitas. Podemos partir del proceso actual, detectar dónde se pierde tiempo o información y decidir qué tipo de solución tiene sentido construir.",
      "You don't need to arrive knowing which technology you need. We can start from the current process, find where time or information gets lost and decide what kind of solution makes sense to build.",
    ),
  },
  process: {
    n: "04",
    eyebrow: bi("PROCESO", "PROCESS"),
    title: bi("Construir viene después de entender.", "Building comes after understanding."),
    intro: bi(
      "Una buena solución no empieza con código. Empieza entendiendo por qué existe el proceso y qué necesita realmente el usuario.",
      "A good solution doesn't start with code. It starts by understanding why the process exists and what the user actually needs.",
    ),
  },
  caseStudy: {
    n: "05",
    eyebrow: bi("CASO DE ESTUDIO", "CASE STUDY"),
    title: bi("De lógica en Excel a una aplicación conectada.", "From spreadsheet logic to a connected application."),
  },
  system: {
    n: "06",
    eyebrow: bi("PENSAMIENTO SISTÉMICO", "SYSTEM THINKING"),
    title: bi("No veo una pantalla. Veo un sistema.", "I don't see a screen. I see a system."),
    intro: bi(
      "Una interfaz es solamente una de las capas. Cuando diseño software intento entender cómo cada pieza afecta al resto del sistema.",
      "An interface is only one of the layers. When I design software I try to understand how each piece affects the rest of the system.",
    ),
  },
  capabilities: {
    n: "07",
    eyebrow: bi("CAPACIDADES", "CAPABILITIES"),
    title: bi("Las herramientas cambian. Los fundamentos permanecen.", "Tools change. Fundamentals remain."),
  },
  experience: {
    n: "08",
    eyebrow: bi("EXPERIENCIA", "EXPERIENCE"),
    title: bi("Experiencia profesional", "Professional experience"),
  },
  about: {
    n: "09",
    eyebrow: bi("SOBRE MÍ", "ABOUT"),
    title: bi("Me gusta entender cómo funcionan las cosas.", "I like understanding how things work."),
  },
  contact: {
    n: "10",
    eyebrow: bi("CONTACTO", "CONTACT"),
    title: bi("¿Qué quieres construir?", "What do you want to build?"),
    intro: bi(
      "Estoy disponible tanto para oportunidades profesionales como para colaborar con empresas que necesiten desarrollar o mejorar sus sistemas.",
      "I'm available both for professional opportunities and for working with companies that need to build or improve their systems.",
    ),
  },
} satisfies Record<string, SectionHead>;

// ── Intent selector ─────────────────────────────────────────────────────────

export const INTENTS = [
  {
    key: "career",
    href: "#experience",
    label: bi("CARRERA", "CAREER"),
    title: bi("Quiero conocer tu experiencia como desarrollador", "I want to know your experience as a developer"),
    text: bi(
      "Experiencia construyendo aplicaciones Full Stack, APIs, integraciones y soluciones empresariales con Java, Angular, React y PostgreSQL.",
      "Experience building Full Stack applications, APIs, integrations and business solutions with Java, Angular, React and PostgreSQL.",
    ),
    cta: bi("Ver experiencia", "View experience"),
  },
  {
    key: "project",
    href: "#problems",
    label: bi("PROYECTO", "PROJECT"),
    title: bi("Tengo un problema que quiero convertir en software", "I have a problem I want to turn into software"),
    text: bi(
      "Si tu negocio depende de procesos manuales, Excel, WhatsApp, sistemas desconectados o información dispersa, puedo ayudarte a diseñar una solución.",
      "If your business depends on manual processes, Excel, WhatsApp, disconnected systems or scattered information, I can help you design a solution.",
    ),
    cta: bi("Explorar soluciones", "Explore solutions"),
  },
];

// ── Problems ────────────────────────────────────────────────────────────────

export const PROBLEMS: { title: Bi; text: Bi }[] = [
  {
    title: bi("Excel sostiene una parte crítica de la operación", "Excel holds up a critical part of the operation"),
    text: bi(
      "Cotizaciones, controles, cálculos o reportes dependen de hojas que requieren captura y revisión manual.",
      "Quotes, controls, calculations or reports depend on spreadsheets that need manual entry and review.",
    ),
  },
  {
    title: bi("WhatsApp se convirtió en una herramienta operativa", "WhatsApp became an operational tool"),
    text: bi(
      "Clientes, solicitudes, citas, pedidos o seguimientos terminan mezclados entre conversaciones.",
      "Customers, requests, appointments, orders and follow-ups end up mixed across conversations.",
    ),
  },
  {
    title: bi("La misma información se captura varias veces", "The same information is entered several times"),
    text: bi(
      "Los datos pasan manualmente entre personas, archivos y sistemas diferentes.",
      "Data moves by hand between people, files and different systems.",
    ),
  },
  {
    title: bi("Obtener información toma demasiado tiempo", "Getting information takes too long"),
    text: bi(
      "Construir un reporte o conocer el estado real de una operación requiere reunir información de distintas fuentes.",
      "Building a report or knowing the real state of an operation means gathering information from different sources.",
    ),
  },
  {
    title: bi("Tus herramientas no se comunican", "Your tools don't talk to each other"),
    text: bi(
      "Tienes ERP, hojas de cálculo, aplicaciones o servicios externos, pero el equipo sigue moviendo información manualmente entre ellos.",
      "You have an ERP, spreadsheets, applications or external services, but the team still moves information between them by hand.",
    ),
  },
  {
    title: bi("Existe un proceso que sabes que podría funcionar mejor", "There's a process you know could work better"),
    text: bi(
      "Sabes cuál es el problema, pero todavía no sabes si necesitas automatización, integración o un sistema completo.",
      "You know what the problem is, but you don't yet know whether you need automation, an integration or a complete system.",
    ),
  },
];

export const PROBLEMS_TEXT = {
  closing: bi(
    "Si reconoces alguno de estos escenarios, probablemente existe una oportunidad para simplificar el proceso antes de agregar más herramientas.",
    "If you recognize any of these scenarios, there's probably a chance to simplify the process before adding more tools.",
  ),
  cta: bi("Cuéntame cómo trabajan", "Tell me how you work"),
};

// ── Selected work ───────────────────────────────────────────────────────────

export const PROJECT_TEXT = {
  status: bi("ESTADO", "STATUS"),
  problem: bi("PROBLEMA", "PROBLEM"),
  solution: bi("SOLUCIÓN", "SOLUTION"),
  arch: bi("ARQUITECTURA · FLUJO DE DATOS", "ARCHITECTURE · DATA FLOW"),
  preview: bi("VISTA PREVIA", "PREVIEW"),
  select: bi("Elige un proyecto", "Choose a project"),
};

/** Each project's planet in the original selector, by slug. */
export const PLANETS: Record<string, { planet: string; glow: string }> = {
  "gbs-builder": { planet: "radial-gradient(circle at 32% 30%,#ffe7c7,#ff9f5a 38%,#9a3412 66%,#2a0a04 88%)", glow: "rgba(255,160,90,.45)" },
  "layout-builder": { planet: "radial-gradient(circle at 32% 30%,#d5fbff,#22d3ee 36%,#0e7490 64%,#021a24 88%)", glow: "rgba(34,211,238,.45)" },
  "pos-tinta-negra": { planet: "radial-gradient(circle at 32% 30%,#f1f5f9,#94a3b8 36%,#334155 64%,#05080d 88%)", glow: "rgba(148,163,184,.45)" },
  "nova-dental": { planet: "radial-gradient(circle at 32% 30%,#e6fffa,#5eead4 36%,#0f766e 64%,#02201d 88%)", glow: "rgba(94,234,212,.45)" },
};

// ── Solutions ───────────────────────────────────────────────────────────────

const words = (...w: [string, string][]) => w.map(([es, en]) => bi(es, en));

export const SOLUTIONS: { n: string; title: Bi; desc: Bi[]; listLabel?: Bi; problems?: Bi[]; flow: Bi[]; twoWay?: boolean }[] = [
  {
    n: "01",
    title: bi("Automatización de procesos", "Process automation"),
    desc: [bi("Convierte tareas repetitivas y flujos manuales en procesos más controlados.", "Turn repetitive tasks and manual workflows into more controlled processes.")],
    listLabel: bi("IDEAL PARA", "IDEAL FOR"),
    problems: words(
      ["Captura repetitiva de información", "Repetitive data entry"],
      ["Generación de documentos", "Document generation"],
      ["Seguimientos", "Follow-ups"],
      ["Reportes", "Reports"],
      ["Validaciones", "Validations"],
      ["Procesos administrativos", "Administrative processes"],
    ),
    flow: words(["DISPARADOR", "TRIGGER"], ["PROCESO", "PROCESS"], ["ACCIÓN", "ACTION"]),
  },
  {
    n: "02",
    title: bi("Sistemas internos", "Internal systems"),
    desc: [bi("Aplicaciones diseñadas alrededor de la operación específica de una empresa.", "Applications designed around a company's specific operation.")],
    listLabel: bi("PUEDEN CENTRALIZAR", "THEY CAN CENTRALIZE"),
    problems: words(
      ["Clientes", "Customers"],
      ["Cotizaciones", "Quotes"],
      ["Pedidos", "Orders"],
      ["Operaciones", "Operations"],
      ["Inventarios", "Inventory"],
      ["Solicitudes", "Requests"],
      ["Seguimientos", "Follow-ups"],
      ["Información administrativa", "Administrative information"],
    ),
    flow: words(["PROCESO", "PROCESS"], ["REGLAS", "RULES"], ["SOFTWARE", "SOFTWARE"]),
  },
  {
    n: "03",
    title: bi("Aplicaciones web", "Web applications"),
    desc: [
      bi(
        "Desarrollo de herramientas accesibles desde navegador para empleados, clientes o usuarios externos.",
        "Browser-based tools for employees, customers or external users.",
      ),
      bi("Desde portales y dashboards hasta plataformas empresariales completas.", "From portals and dashboards to complete business platforms."),
    ],
    flow: words(["USUARIO", "USER"], ["WEB APP", "WEB APP"], ["API", "API"]),
  },
  {
    n: "04",
    title: bi("Backend y APIs", "Backend & APIs"),
    desc: [bi("Diseño de servicios, reglas de negocio y APIs para aplicaciones y productos digitales.", "Services, business rules and APIs for applications and digital products.")],
    listLabel: bi("CON ESPECIAL ENFOQUE EN", "WITH A FOCUS ON"),
    problems: words(["Java", "Java"], ["Spring Boot", "Spring Boot"], ["Quarkus", "Quarkus"], ["Python", "Python"], ["Integraciones REST", "REST integrations"]),
    flow: words(["PETICIÓN", "REQUEST"], ["LÓGICA", "LOGIC"], ["DATOS", "DATA"]),
  },
  {
    n: "05",
    title: bi("Integración de sistemas", "System integration"),
    desc: [
      bi("Conecto herramientas que actualmente funcionan de forma aislada.", "I connect tools that currently work in isolation."),
      bi(
        "ERP, aplicaciones web, APIs externas, bases de datos y servicios pueden compartir información sin depender de movimientos manuales.",
        "ERPs, web applications, external APIs, databases and services can share information without relying on manual transfers.",
      ),
    ],
    flow: words(["SISTEMA A", "SYSTEM A"], ["API", "API"], ["SISTEMA B", "SYSTEM B"]),
    twoWay: true,
  },
  {
    n: "06",
    title: bi("MVP y productos digitales", "MVPs & digital products"),
    desc: [
      bi(
        "Transformo una idea en una primera versión funcional que permita validar el producto antes de invertir en una plataforma más grande.",
        "I turn an idea into a working first version that lets you validate the product before investing in a bigger platform.",
      ),
    ],
    flow: words(["IDEA", "IDEA"], ["PROTOTIPO", "PROTOTYPE"], ["MVP", "MVP"]),
  },
];

export const STACK_TEXT = {
  constellation: bi("CONSTELACIÓN", "CONSTELLATION"),
};

// ── Process ─────────────────────────────────────────────────────────────────

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

// ── System thinking ─────────────────────────────────────────────────────────

export const LAYERS: { name: Bi; geo: Bi; resp: Bi; example: Bi }[] = [
  {
    name: bi("Usuario", "User"),
    geo: bi("ATMÓSFERA", "ATMOSPHERE"),
    resp: bi("Quién utiliza el sistema y qué necesita conseguir.", "Who uses the system and what they need to achieve."),
    example: bi("Cliente, empleado, administrador u otra aplicación.", "Customer, employee, administrator or another application."),
  },
  {
    name: bi("Interfaz", "Interface"),
    geo: bi("CORTEZA", "CRUST"),
    resp: bi("Cómo interactúa el usuario con el producto.", "How the user interacts with the product."),
    example: bi("Formularios, dashboards, tablas, flujos y navegación.", "Forms, dashboards, tables, workflows and navigation."),
  },
  {
    name: bi("API", "API"),
    geo: bi("MANTO", "MANTLE"),
    resp: bi("Cómo viaja la información entre componentes.", "How information travels between components."),
    example: bi("Endpoints REST, validación, autenticación y contratos.", "REST endpoints, validation, authentication and contracts."),
  },
  {
    name: bi("Aplicación", "Application"),
    geo: bi("MANTO INTERNO", "INNER MANTLE"),
    resp: bi("Cómo se coordinan los diferentes casos de uso.", "How the different use cases are coordinated."),
    example: bi("Crear una cotización, registrar un pago o asignar una tarea.", "Create a quote, register a payment or assign a task."),
  },
  {
    name: bi("Dominio", "Domain"),
    geo: bi("NÚCLEO", "CORE"),
    resp: bi("Dónde viven las reglas que definen cómo funciona el negocio.", "Where the rules that define how the business works live."),
    example: bi(
      "Reglas de precios, validación de cotizaciones, permisos y transiciones de estado.",
      "Pricing rules, quote validation, permissions and state transitions.",
    ),
  },
  {
    name: bi("Datos", "Data"),
    geo: bi("LUNA", "MOON"),
    resp: bi("Cómo almacenamos, relacionamos y recuperamos la información.", "How we store, relate and retrieve information."),
    example: bi("Usuarios, cotizaciones, transacciones, productos y configuración.", "Users, quotes, transactions, products and configuration."),
  },
  {
    name: bi("Servicios externos", "External services"),
    geo: bi("SATÉLITE", "SATELLITE"),
    resp: bi("Qué sistemas, APIs o plataformas necesitan comunicarse con nuestra solución.", "Which systems, APIs or platforms need to talk to our solution."),
    example: bi("ERP, pasarelas de pago, SAT, servicios de correo o webhooks.", "ERP, payment gateways, SAT, email services or webhooks."),
  },
];

export const SYSTEM_TEXT = {
  responsibility: bi("RESPONSABILIDAD", "RESPONSIBILITY"),
  example: bi("EJEMPLO", "EXAMPLE"),
  closing: [
    bi("El objetivo no es agregar complejidad.", "The goal isn't to add complexity."),
    bi("Es colocar cada responsabilidad en el lugar correcto.", "It's putting each responsibility in the right place."),
  ],
};

// ── Featured case study ─────────────────────────────────────────────────────

export const FEATURED = {
  slug: "gbs-builder",
  problem: {
    label: bi("EL PROBLEMA", "THE PROBLEM"),
    paragraphs: [
      bi(
        "Un proceso de costeo y cotización dependía de una hoja de cálculo que contenía fórmulas, reglas y cálculos fundamentales para la operación.",
        "A costing and quoting process depended on a spreadsheet holding formulas, rules and calculations that were essential to the operation.",
      ),
      bi("La información tenía que moverse entre Excel y el ERP.", "Information had to be moved between Excel and the ERP."),
    ],
  },
  before: {
    label: bi("ANTES", "BEFORE"),
    items: words(
      ["Excel", "Excel"],
      ["Captura manual", "Manual data entry"],
      ["Fórmulas y reglas distribuidas", "Scattered formulas and rules"],
      ["Información trasladada al ERP", "Information carried over to the ERP"],
      ["Mayor dependencia del conocimiento del usuario", "Heavy reliance on the user's knowledge"],
    ),
  },
  approach: {
    label: bi("EL ENFOQUE", "THE APPROACH"),
    intro: bi("Antes de desarrollar fue necesario entender:", "Before building, I needed to understand:"),
    items: words(
      ["Qué información entraba al proceso", "What information entered the process"],
      ["Cómo se realizaban los cálculos", "How the calculations were done"],
      ["Qué reglas pertenecían al negocio", "Which rules belonged to the business"],
      ["Qué datos ya existían en el ERP", "What data already existed in the ERP"],
      ["Qué información debía regresar al ERP", "What information had to go back to the ERP"],
      ["Qué actores participaban", "Who took part"],
    ),
  },
  after: {
    label: bi("DESPUÉS", "AFTER"),
    title: "GBS Builder",
    items: words(
      ["Aplicación web", "Web application"],
      ["Reglas centralizadas", "Centralized rules"],
      ["Cálculos controlados", "Controlled calculations"],
      ["Integración con ERP", "ERP integration"],
      ["Información disponible para seguimiento", "Information available for tracking"],
    ),
  },
  quote: bi(
    "Lo interesante no fue recrear la hoja de cálculo. Fue entender qué reglas debían pertenecer al sistema.",
    "The interesting part wasn't recreating the spreadsheet. It was understanding which rules belonged to the system.",
  ),
  principle: {
    label: bi("EL PRINCIPIO DETRÁS DEL PROYECTO", "THE PRINCIPLE BEHIND THE PROJECT"),
    text: bi(
      "Este mismo enfoque puede utilizarse para transformar procesos basados en Excel, WhatsApp, documentos, correos o herramientas desconectadas.",
      "The same approach can transform processes built on Excel, WhatsApp, documents, email or disconnected tools.",
    ),
  },
  cta: bi("Tengo un proceso parecido", "I have a similar process"),
  ctaCase: bi("Leer caso de estudio", "Read the case study"),
};

// ── Mid-page call to action ─────────────────────────────────────────────────

export const MID_CTA = {
  title: bi("¿Hay algo en tu operación que todavía haces manualmente?", "Is there something in your operation you still do by hand?"),
  paragraphs: [
    bi("No necesitas definir una solución antes de hablar conmigo.", "You don't need to define a solution before talking to me."),
    bi(
      "Cuéntame cómo realizan actualmente el proceso, qué herramientas utilizan y dónde aparecen los problemas.",
      "Tell me how you run the process today, which tools you use and where the problems show up.",
    ),
    bi(
      "A partir de ahí podemos identificar qué tendría sentido automatizar, integrar o desarrollar.",
      "From there we can figure out what makes sense to automate, integrate or build.",
    ),
  ],
  primary: bi("Analizar mi proceso", "Analyze my process"),
  secondary: bi("Ver cómo trabajo", "See how I work"),
};

// ── Capabilities ────────────────────────────────────────────────────────────

export const CAPABILITIES: { name: Bi; code: Bi; desc: Bi; items: string[] }[] = [
  {
    name: bi("Backend", "Backend"),
    code: bi("ORIÓN", "ORION"),
    desc: bi("Servicios, APIs y lógica de negocio.", "Services, APIs and business logic."),
    items: ["Java 21", "Spring Boot", "Quarkus", "Python", "FastAPI"],
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
    items: ["Arquitectura Hexagonal", "SOLID", "REST APIs", "Diseño orientado a dominio"],
  },
  {
    name: bi("Sistemas empresariales", "Business systems"),
    code: bi("ÁGUILA", "AQUILA"),
    desc: bi("Conectar el software con los procesos operativos.", "Connecting software with operational processes."),
    items: ["Odoo", "XML-RPC", "Integraciones ERP", "Automatización de procesos"],
  },
  {
    name: bi("Infraestructura y trabajo", "Infrastructure & workflow"),
    code: bi("PEGASO", "PEGASUS"),
    desc: bi("Desarrollo, despliegue y colaboración.", "Development, deployment and collaboration."),
    items: ["Docker", "AWS", "Git", "Jira"],
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
  context: Bi[];
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

// ── About ───────────────────────────────────────────────────────────────────

export const ABOUT = {
  paragraphs: [
    bi(
      "Soy estudiante de Ingeniería en Informática en el Instituto Politécnico Nacional, UPIICSA, con egreso previsto para diciembre de 2026.",
      "I'm a Computer Engineering student at the Instituto Politécnico Nacional, UPIICSA, expected to graduate in December 2026.",
    ),
    bi(
      "Mi interés por el desarrollo de software comenzó con el código, pero poco a poco se ha movido hacia una pregunta más amplia:",
      "My interest in software development started with code, but it has gradually moved toward a broader question:",
    ),
  ],
  question: bi(
    "¿Cómo diseñamos sistemas que realmente representen el problema que intentamos resolver?",
    "How do we design systems that truly represent the problem we're trying to solve?",
  ),
  closing: [
    bi(
      "Por eso me interesan tanto el desarrollo Full Stack como los procesos, arquitectura, modelado e integración de sistemas.",
      "That's why I care as much about Full Stack development as about processes, architecture, modeling and systems integration.",
    ),
    bi(
      "Actualmente profundizo mi perfil como desarrollador Full Stack y Software Engineer, con el objetivo de crecer posteriormente hacia arquitectura de soluciones.",
      "I'm currently deepening my profile as a Full Stack developer and Software Engineer, with the goal of growing toward solutions architecture later on.",
    ),
  ],
  languagesLabel: bi("IDIOMAS", "LANGUAGES"),
  languages: [
    { k: bi("Español", "Spanish"), v: bi("Nativo", "Native") },
    { k: bi("Inglés", "English"), v: bi("Técnico / actualmente fortaleciendo comunicación profesional", "Technical / currently strengthening professional communication") },
  ],
  card: {
    title: bi("Desarrollador de software", "Software developer"),
    status: bi("Disponible", "Available"),
    contact: bi("Contactar", "Contact"),
    photoAlt: bi("Foto de Mario Yael", "Photo of Mario Yael"),
  },
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
  talent: {
    title: bi("Busco talento", "I'm hiring"),
    text: bi(
      "Si quieres conocer más sobre mi experiencia profesional, puedes revisar mi CV, GitHub y proyectos.",
      "If you want to know more about my professional experience, you can review my resume, GitHub and projects.",
    ),
    cv: bi("Descargar CV", "Download resume"),
    github: bi("GitHub", "GitHub"),
    email: bi("Contactarme", "Contact me"),
  },
  project: {
    title: bi("Tengo un proyecto", "I have a project"),
    text: [
      bi("Si existe un proceso que debería funcionar mejor, cuéntame cómo lo realizan actualmente.", "If there's a process that should work better, tell me how you run it today."),
      bi("No importa si todavía no sabes exactamente qué necesitas construir.", "It doesn't matter if you don't know exactly what you need to build yet."),
    ],
    cta: bi("Iniciar un proyecto", "Start a project"),
  },
};

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
