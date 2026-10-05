// Copy for the home page sections added in the 2026-10 restructure (quick
// stats, audience, gallery, services bento, build showcase, before/after,
// configurator, process timeline, system layers, stack, final CTA, contact
// form). Same rules as content.ts: first person, concrete, no invented
// metrics, clients or results.

import { bi, type Bi } from "./content";

// ── Navigation ──────────────────────────────────────────────────────────────

/** The thumb dock on phones: the five places a visitor jumps to. */
export const DOCK = [
  { id: "hero", icon: "home", label: bi("Inicio", "Home") },
  { id: "work", icon: "work", label: bi("Proyectos", "Work") },
  { id: "solutions", icon: "solutions", label: bi("Soluciones", "Solutions") },
  { id: "experience", icon: "experience", label: bi("Experiencia", "Experience") },
  { id: "contact", icon: "contact", label: bi("Contacto", "Contact") },
] as const;

export const HERO_CTA = {
  talk: bi("Cuéntame tu proyecto", "Tell me about your project"),
  work: bi("Ver proyectos", "View projects"),
};

// ── Quick stats ─────────────────────────────────────────────────────────────

/** First professional role (CPA Grup, March 2025): experience is counted from here. */
export const CAREER_START = new Date(2025, 2, 1);

export const STATS_TEXT = {
  label: bi("En resumen", "At a glance"),
  years: bi("años de experiencia profesional", "years of professional experience"),
  projects: bi("proyectos reales: demos en línea y sistemas internos", "real projects: live demos and internal systems"),
  stack: bi("Java · Angular · PostgreSQL", "Java · Angular · PostgreSQL"),
  stackSub: bi("stack principal, de la interfaz a los datos", "main stack, from interface to data"),
  place: bi("México / remoto", "Mexico / remote"),
  placeSub: bi("disponible para trabajar en sitio o a distancia", "available on site or remotely"),
};

// ── Audience ────────────────────────────────────────────────────────────────

export const AUDIENCE = {
  title: bi("¿Qué estás buscando?", "What are you looking for?"),
  intro: bi(
    "Dos caminos, el mismo enfoque: entender el problema antes de construir.",
    "Two paths, the same approach: understand the problem before building.",
  ),
  hire: {
    kicker: bi("BUSCO DESARROLLADOR", "I'M HIRING"),
    title: bi("Quiero conocer experiencia, tecnologías y proyectos.", "I want to see experience, technologies and projects."),
    points: [
      bi("Full Stack con Java, Angular y PostgreSQL", "Full Stack with Java, Angular and PostgreSQL"),
      bi("Backend, APIs e integraciones con ERP", "Backend, APIs and ERP integrations"),
      bi("Sistemas empresariales en producción con Odoo", "Business systems in production with Odoo"),
    ],
    cta: bi("Ver perfil profesional", "View professional profile"),
  },
  project: {
    kicker: bi("TENGO UN PROYECTO", "I HAVE A PROJECT"),
    title: bi("Quiero mejorar un proceso o construir una solución.", "I want to improve a process or build a solution."),
    chipsLabel: bi("¿Te suena familiar?", "Sound familiar?"),
    chips: [
      bi("Excel", "Excel"),
      bi("WhatsApp", "WhatsApp"),
      bi("Cotizaciones", "Quotes"),
      bi("Clientes", "Customers"),
      bi("Inventario", "Inventory"),
      bi("ERP", "ERP"),
      bi("Reportes", "Reports"),
      bi("Procesos manuales", "Manual processes"),
    ],
    cta: bi("Explorar soluciones", "Explore solutions"),
  },
};

// ── Featured projects ───────────────────────────────────────────────────────

export const WORK_TEXT = {
  title: bi("Problemas que he convertido en software.", "Problems I've turned into software."),
  intro: bi(
    "Cada proyecto empieza en un proceso real: quién lo usa, qué reglas sigue y qué debe pertenecer al sistema.",
    "Every project starts with a real process: who uses it, which rules it follows and what belongs in the system.",
  ),
  problem: bi("PROBLEMA", "PROBLEM"),
  solution: bi("SOLUCIÓN", "SOLUTION"),
  status: bi("ESTADO", "STATUS"),
  year: bi("AÑO", "YEAR"),
  schematic: bi("Interfaz · esquema", "Interface · schematic"),
  mobile: bi("Versión móvil", "Mobile version"),
};

// ── Gallery ─────────────────────────────────────────────────────────────────

export const GALLERY_TEXT = {
  eyebrow: bi("SELECTED INTERFACES", "SELECTED INTERFACES"),
  title: bi("Interfaces reales, no maquetas.", "Real interfaces, not mockups."),
  intro: bi("Capturas de los proyectos publicados.", "Screenshots from the published projects."),
  open: bi("Abrir demo", "Open demo"),
};

/** Bento tiles, by project folder and image name (see src/data/project-images.json).
 *  TODO: add `year` once confirmed for Nova Dental and Tinta Negra (their project data has none). */
export const GALLERY: { project: string; image: string; name: string; kind: Bi; /** Only when confirmed in the project data. */ year?: string; href?: string; size: "wide" | "tall" | "std" | "full" }[] = [
  { project: "nova-dental", image: "desktop", name: "Nova Dental", kind: bi("Landing de conversión", "Conversion landing page"), href: "https://novadentist.netlify.app", size: "wide" },
  { project: "tinta-negra", image: "mobile", name: "Tinta Negra POS", kind: bi("POS · móvil", "POS · mobile"), href: "https://pos-tinta-negra-demo.netlify.app", size: "tall" },
  { project: "tinta-negra", image: "desktop", name: "Tinta Negra POS", kind: bi("Dashboard del estudio", "Studio dashboard"), href: "https://pos-tinta-negra-demo.netlify.app", size: "full" },
  { project: "tinta-negra", image: "sale", name: "Punto de venta", kind: bi("Venta y cobro", "Sale & checkout"), href: "https://pos-tinta-negra-demo.netlify.app", size: "std" },
  { project: "tinta-negra", image: "reports", name: "Reportes", kind: bi("Ventas por periodo", "Sales by period"), href: "https://pos-tinta-negra-demo.netlify.app", size: "std" },
  { project: "tinta-negra", image: "inventory", name: "Inventario", kind: bi("Movimientos de stock", "Stock movements"), href: "https://pos-tinta-negra-demo.netlify.app", size: "std" },
  { project: "nova-dental", image: "mobile", name: "Nova Dental", kind: bi("Móvil · agenda por WhatsApp", "Mobile · WhatsApp booking"), href: "https://novadentist.netlify.app", size: "std" },
];

// ── Services bento ──────────────────────────────────────────────────────────

export const SERVICES_TEXT = {
  title: bi("¿Qué quieres mejorar?", "What do you want to improve?"),
  intro: bi(
    "No necesitas llegar sabiendo qué tecnología necesitas. Partimos del proceso actual y decidimos qué tiene sentido construir.",
    "You don't need to arrive knowing which technology you need. We start from the current process and decide what's worth building.",
  ),
};

export const SERVICES: { key: "web" | "business" | "automation" | "integrations"; kicker: Bi; title: Bi; text: Bi; items: Bi[] }[] = [
  {
    key: "business",
    kicker: bi("SISTEMAS PARA NEGOCIOS", "BUSINESS SYSTEMS"),
    title: bi("Tu operación en un solo sistema.", "Your operation in one system."),
    text: bi(
      "Clientes, ventas, inventario y cotizaciones con las reglas de tu negocio dentro del software, no en una hoja de cálculo.",
      "Customers, sales, inventory and quotes with your business rules inside the software, not in a spreadsheet.",
    ),
    items: [bi("CRM", "CRM"), bi("POS", "POS"), bi("Inventarios", "Inventory"), bi("Cotizadores", "Quoting tools"), bi("Dashboards", "Dashboards"), bi("ERP personalizados", "Custom ERP")],
  },
  {
    key: "web",
    kicker: bi("WEB & PLATAFORMAS", "WEB & PLATFORMS"),
    title: bi("Presencia que convierte.", "A presence that converts."),
    text: bi("Sitios y aplicaciones rápidas, pensadas primero para móvil.", "Fast sites and applications, designed mobile first."),
    items: [bi("Landing Pages", "Landing pages"), bi("Sitios corporativos", "Corporate sites"), bi("Portales", "Portals"), bi("Aplicaciones Web", "Web applications")],
  },
  {
    key: "automation",
    kicker: bi("AUTOMATIZACIÓN", "AUTOMATION"),
    title: bi("Lo repetitivo, que lo haga el sistema.", "Let the system do the repetitive work."),
    text: bi("Avisos, seguimientos y documentos que se generan solos.", "Alerts, follow-ups and documents that generate themselves."),
    items: [bi("WhatsApp", "WhatsApp"), bi("Seguimiento", "Follow-up"), bi("Reportes", "Reports"), bi("Documentos", "Documents"), bi("Procesos administrativos", "Admin processes")],
  },
  {
    key: "integrations",
    kicker: bi("INTEGRACIONES", "INTEGRATIONS"),
    title: bi("Herramientas que se hablan.", "Tools that talk to each other."),
    text: bi("Conecto lo que ya usas para que la información no se capture dos veces.", "I connect what you already use so information isn't entered twice."),
    items: [bi("APIs", "APIs"), bi("ERP", "ERP"), bi("Bases de datos", "Databases"), bi("Servicios externos", "External services"), bi("IA", "AI")],
  },
];

// ── What we can build ───────────────────────────────────────────────────────

export const BUILD_TEXT = {
  title: bi("¿Qué podemos construir?", "What can we build?"),
  intro: bi("Algunos sistemas que resuelven problemas comunes de operación.", "Some systems that solve common operational problems."),
  pause: bi("Pausar movimiento", "Pause motion"),
  play: bi("Reanudar movimiento", "Resume motion"),
};

export const BUILDS: { icon: string; name: Bi; text: Bi }[] = [
  { icon: "users", name: bi("CRM", "CRM"), text: bi("Clientes y seguimiento en un lugar", "Customers and follow-up in one place") },
  { icon: "calendar", name: bi("Agenda", "Scheduling"), text: bi("Citas, horarios y recordatorios", "Appointments, slots and reminders") },
  { icon: "pos", name: bi("POS", "POS"), text: bi("Ventas, caja y tickets", "Sales, register and receipts") },
  { icon: "calculator", name: bi("Cotizador", "Quoting tool"), text: bi("Precios con tus reglas", "Pricing with your rules") },
  { icon: "chart", name: bi("Dashboard", "Dashboard"), text: bi("Indicadores sin armar reportes", "Metrics without building reports") },
  { icon: "box", name: bi("Inventario", "Inventory"), text: bi("Entradas, salidas y stock", "Stock in, out and on hand") },
  { icon: "portal", name: bi("Portal para clientes", "Customer portal"), text: bi("Pedidos y estado en línea", "Orders and status online") },
  { icon: "chat", name: bi("Automatización WhatsApp", "WhatsApp automation"), text: bi("Avisos y respuestas automáticas", "Automatic alerts and replies") },
  { icon: "kanban", name: bi("Gestión de proyectos", "Project management"), text: bi("Tareas, responsables y avance", "Tasks, owners and progress") },
  { icon: "erp", name: bi("ERP interno", "Internal ERP"), text: bi("Procesos de la empresa conectados", "Company processes, connected") },
  { icon: "bot", name: bi("Agente de IA", "AI agent"), text: bi("Clasifica, resume y responde", "Classifies, summarizes, replies") },
  { icon: "social", name: bi("Automatización de redes", "Social media automation"), text: bi("Borrador, aprobación y programación", "Draft, approval and scheduling") },
  { icon: "plug", name: bi("Integraciones", "Integrations"), text: bi("APIs, ERP y servicios externos", "APIs, ERP and external services") },
];

// ── Before / after ──────────────────────────────────────────────────────────

export const BEFORE_AFTER = {
  title: bi("De procesos manuales a software.", "From manual processes to software."),
  before: bi("ANTES", "BEFORE"),
  after: bi("DESPUÉS", "AFTER"),
  pairs: [
    [bi("Excel", "Excel"), bi("Aplicación web", "Web application")],
    [bi("WhatsApp", "WhatsApp"), bi("Automatización", "Automation")],
    [bi("Captura manual", "Manual data entry"), bi("Flujos controlados", "Controlled workflows")],
    [bi("Información dispersa", "Scattered information"), bi("Base de datos centralizada", "Centralized database")],
    [bi("Seguimiento manual", "Manual follow-up"), bi("Integraciones", "Integrations")],
    [bi("Reportes manuales", "Manual reports"), bi("Dashboards", "Dashboards")],
  ] as [Bi, Bi][],
};

// ── Configurator ────────────────────────────────────────────────────────────

export type ToolKey = "excel" | "whatsapp" | "sheets" | "erp" | "software" | "manual";
export type PainKey = "time" | "duplicate" | "errors" | "followup" | "metrics" | "automate" | "new";
export type Area = "automation" | "internal" | "integration" | "dashboard" | "web";

export const CONFIG_TEXT = {
  title: bi("Cuéntame cómo trabajas.", "Tell me how you work."),
  intro: bi("Dos preguntas rápidas. Nada se envía: solo te sugiere por dónde empezar.", "Two quick questions. Nothing is sent: it just suggests where to start."),
  q1: bi("¿Qué utilizas actualmente?", "What do you use today?"),
  q2: bi("¿Qué problema quieres solucionar?", "What problem do you want to solve?"),
  step1: bi("HOY", "TODAY"),
  step2: bi("PROBLEMA", "PROBLEM"),
  step3: bi("PROPUESTA", "PROPOSAL"),
  multi: bi("Puedes elegir varias", "You can pick several"),
  picked: (n: number) => bi(n === 1 ? "1 elegida" : `${n} elegidas`, n === 1 ? "1 picked" : `${n} picked`),
  missing1: bi("Elige qué usas hoy", "Pick what you use today"),
  missing2: bi("Elige qué quieres solucionar", "Pick what you want to solve"),
  waiting: bi("Tu sugerencia aparece aquí en cuanto respondas las dos preguntas.", "Your suggestion appears here as soon as you answer both questions."),
  diagram: bi("Tu proceso, de hoy a la propuesta", "Your process, from today to the proposal"),
  result: bi("Parece que podríamos explorar:", "Looks like we could explore:"),
  build: bi("Podríamos construir", "We could build"),
  cta: bi("Cuéntame tu proceso", "Tell me about your process"),
  reset: bi("Empezar de nuevo", "Start over"),
  jump: bi("Ver tu sugerencia", "See your suggestion"),
};

export const TOOLS: { key: ToolKey; label: Bi }[] = [
  { key: "excel", label: bi("Excel", "Excel") },
  { key: "whatsapp", label: bi("WhatsApp", "WhatsApp") },
  { key: "sheets", label: bi("Google Sheets", "Google Sheets") },
  { key: "erp", label: bi("ERP", "ERP") },
  { key: "software", label: bi("Software existente", "Existing software") },
  { key: "manual", label: bi("Todo manual", "Everything by hand") },
];

export const PAINS: { key: PainKey; label: Bi }[] = [
  { key: "time", label: bi("Pierdo demasiado tiempo", "I lose too much time") },
  { key: "duplicate", label: bi("Información duplicada", "Duplicated information") },
  { key: "errors", label: bi("Errores manuales", "Manual errors") },
  { key: "followup", label: bi("Clientes sin seguimiento", "Customers without follow-up") },
  { key: "metrics", label: bi("No tengo indicadores", "I have no metrics") },
  { key: "automate", label: bi("Necesito automatizar", "I need to automate") },
  { key: "new", label: bi("Quiero crear un sistema nuevo", "I want to build a new system") },
];

/** Each area, why it fits, and a few systems from BUILDS it would lead to. */
export const AREAS: Record<Area, { name: Bi; why: Bi; builds: Bi[] }> = {
  automation: {
    name: bi("AUTOMATIZACIÓN", "AUTOMATION"),
    why: bi("Que las tareas repetitivas ocurran solas.", "Let repetitive tasks happen on their own."),
    builds: [bi("Automatización WhatsApp", "WhatsApp automation"), bi("Seguimiento de clientes", "Customer follow-up"), bi("Reportes automáticos", "Automatic reports")],
  },
  internal: {
    name: bi("SISTEMA INTERNO", "INTERNAL SYSTEM"),
    why: bi("Un lugar único para la información y las reglas.", "One place for information and rules."),
    builds: [bi("CRM", "CRM"), bi("Cotizador", "Quoting tool"), bi("Inventario", "Inventory")],
  },
  integration: {
    name: bi("INTEGRACIÓN", "INTEGRATION"),
    why: bi("Conectar lo que ya usas en vez de reemplazarlo.", "Connect what you already use instead of replacing it."),
    builds: [bi("Integración con tu ERP", "ERP integration"), bi("APIs entre sistemas", "APIs between systems"), bi("Sincronización de datos", "Data sync")],
  },
  dashboard: {
    name: bi("DASHBOARD", "DASHBOARD"),
    why: bi("Ver el estado real de la operación sin armar reportes.", "See the real state of operations without building reports."),
    builds: [bi("Dashboard de indicadores", "Metrics dashboard"), bi("Reportes por periodo", "Reports by period")],
  },
  web: {
    name: bi("PLATAFORMA WEB", "WEB PLATFORM"),
    why: bi("Una aplicación a la medida de tu proceso.", "An application built around your process."),
    builds: [bi("Aplicación web a la medida", "Custom web application"), bi("Portal para clientes", "Customer portal")],
  },
};

// ── System layers ───────────────────────────────────────────────────────────

export const SYSTEM_V2 = {
  title: bi("No veo una pantalla. Veo un sistema.", "I don't see a screen. I see a system."),
  intro: bi(
    "Una interfaz es solo una de las capas. Pasa el cursor o toca cada capa para ver qué vive ahí.",
    "An interface is only one of the layers. Hover or tap each layer to see what lives there.",
  ),
  layers: [
    { code: "USER", name: bi("Usuario", "User"), text: bi("Quién usa el sistema y qué necesita conseguir.", "Who uses the system and what they need to achieve.") },
    { code: "INTERFACE", name: bi("Interfaz", "Interface"), text: bi("Cómo interactúa la persona: formularios, tablas, flujos.", "How people interact: forms, tables, workflows.") },
    { code: "API", name: bi("API", "API"), text: bi("Cómo viaja la información: contratos, validación y autenticación.", "How information travels: contracts, validation and authentication.") },
    { code: "APPLICATION", name: bi("Aplicación", "Application"), text: bi("Los casos de uso: crear una cotización, registrar un pago.", "The use cases: create a quote, record a payment.") },
    { code: "DOMAIN", name: bi("Dominio", "Domain"), text: bi("Las reglas reales del negocio viven aquí.", "The real business rules live here.") },
    { code: "DATA", name: bi("Datos", "Data"), text: bi("Cómo se guarda, relaciona y recupera la información.", "How information is stored, related and retrieved.") },
  ],
  closing: [bi("No construyo pantallas aisladas.", "I don't build isolated screens."), bi("Construyo sistemas que resuelven problemas.", "I build systems that solve problems.")],
};

// ── Stack ───────────────────────────────────────────────────────────────────

export const STACK_V2 = {
  title: bi("Skills", "Skills"),
  intro: bi(
    "Agrupadas por la parte del sistema en la que operan, de la interfaz a la infraestructura.",
    "Grouped by the part of the system they operate in, from interface to infrastructure.",
  ),
  /** One group per operation, in the order a request travels (see SYSTEM_V2.layers). */
  groups: [
    {
      code: "INTERFACE",
      name: bi("Interfaz", "Interface"),
      does: bi("Lo que la persona ve y usa: pantallas, formularios y flujos.", "What people see and use: screens, forms and workflows."),
      items: ["Angular", "React", "Astro", "TypeScript"],
    },
    {
      code: "API · LOGIC",
      name: bi("Lógica y APIs", "Logic & APIs"),
      does: bi("Servicios, reglas de negocio y contratos entre sistemas.", "Services, business rules and contracts between systems."),
      items: ["Java 21", "Spring Boot", "Quarkus", "Python", "FastAPI", "REST APIs"],
    },
    {
      code: "DATA",
      name: bi("Datos", "Data"),
      does: bi("Guardar, relacionar y recuperar la información; caché.", "Storing, relating and retrieving information; caching."),
      items: ["PostgreSQL", "MySQL", "MariaDB", "Redis"],
    },
    {
      code: "INTEGRATION",
      name: bi("Integración y ERP", "Integration & ERP"),
      does: bi("Conectar el software con los procesos y sistemas de la empresa.", "Connecting software with the company's processes and systems."),
      items: ["Odoo", "XML-RPC", "Integraciones ERP", "Automatización de procesos"],
    },
    {
      code: "INFRA",
      name: bi("Infraestructura y trabajo", "Infrastructure & workflow"),
      does: bi("Ejecutar, desplegar y coordinar el desarrollo.", "Running, deploying and coordinating development."),
      items: ["Docker", "AWS", "Git", "Jira"],
    },
    {
      code: "ARCHITECTURE",
      name: bi("Arquitectura", "Architecture"),
      does: bi("Que cada responsabilidad viva en su lugar.", "Keeping each responsibility where it belongs."),
      items: ["Arquitectura Hexagonal", "SOLID", "Diseño orientado a dominio"],
    },
  ],
};

// ── Experience ──────────────────────────────────────────────────────────────

export const EXPERIENCE_V2 = {
  title: bi("Experiencia", "Experience"),
  intro: bi("Sistemas empresariales, backend e integraciones en producción.", "Business systems, backend and integrations in production."),
  now: bi("Actual", "Current"),
};

// ── About ───────────────────────────────────────────────────────────────────

export const ABOUT_V2 = {
  title: bi("Sobre mí", "About"),
  lead: bi("Soy desarrollador de software.", "I'm a software developer."),
  paragraphs: [
    bi(
      "Antes de programar me interesa entender cómo funciona un negocio: quién hace qué, con qué información y bajo qué reglas.",
      "Before writing code I want to understand how a business works: who does what, with which information and under which rules.",
    ),
    bi(
      "Me interesan la arquitectura, los procesos y el producto, porque ahí se decide si un sistema realmente ayuda.",
      "I care about architecture, processes and product, because that's where it's decided whether a system actually helps.",
    ),
    bi(
      "Quiero construir soluciones completas, no únicamente pantallas.",
      "I want to build complete solutions, not just screens.",
    ),
  ],
  facts: [
    { k: bi("Estudios", "Studies"), v: bi("Ing. en Informática · IPN UPIICSA · egreso dic. 2026", "Computer Engineering · IPN UPIICSA · graduating Dec 2026") },
    { k: bi("Idiomas", "Languages"), v: bi("Español nativo · inglés técnico", "Native Spanish · technical English") },
    { k: bi("Dirección", "Direction"), v: bi("Full Stack → arquitectura de soluciones", "Full Stack → solutions architecture") },
  ],
  photoAlt: bi("Foto de Mario Yael", "Photo of Mario Yael"),
};

// ── Final CTA ───────────────────────────────────────────────────────────────

export const FINAL_CTA = {
  title: bi("¿Construimos algo?", "Shall we build something?"),
  project: {
    kicker: bi("TENGO UN PROYECTO", "I HAVE A PROJECT"),
    text: bi("Cuéntame qué quieres mejorar.", "Tell me what you want to improve."),
    cta: bi("Hablemos", "Let's talk"),
  },
  hiring: {
    kicker: bi("ESTOY CONTRATANDO", "I'M HIRING"),
    text: bi("Conoce mi experiencia y perfil técnico.", "See my experience and technical profile."),
    cta: bi("Ver experiencia", "View experience"),
    cv: bi("Descargar CV", "Download resume"),
  },
};

// ── Contact form ────────────────────────────────────────────────────────────

export const CONTACT_FORM = {
  name: "contact",
  title: bi("Contacto", "Contact"),
  intro: bi(
    "Cuéntame brevemente qué proceso quieres mejorar o qué sistema necesitas. Respondo por correo, normalmente en uno o dos días hábiles.",
    "Briefly tell me which process you want to improve or which system you need. I reply by email, usually within one or two business days.",
  ),
  required: bi("Los campos marcados con * son obligatorios.", "Fields marked with * are required."),
  optional: bi("opcional", "optional"),
  fields: {
    name: { label: bi("Nombre", "Name"), placeholder: bi("Tu nombre", "Your name") },
    company: { label: bi("Empresa", "Company"), placeholder: bi("Nombre de tu empresa o negocio", "Your company or business") },
    email: { label: bi("Correo", "Email"), placeholder: bi("tu@correo.com", "you@email.com") },
    whatsapp: { label: bi("WhatsApp", "WhatsApp"), placeholder: bi("+52 55 1234 5678", "+52 55 1234 5678"), hint: bi("Solo si prefieres que te escriba por ahí.", "Only if you'd rather I message you there.") },
    need: { label: bi("¿Qué necesitas?", "What do you need?"), placeholder: bi("Elige una opción", "Pick an option") },
    message: {
      label: bi("Mensaje", "Message"),
      placeholder: bi(
        "Ej.: Hoy cotizamos en Excel y mandamos el PDF por WhatsApp. Queremos que el vendedor lo haga desde el celular y quede registrado.",
        "E.g.: Today we quote in Excel and send the PDF over WhatsApp. We want salespeople to do it from their phone and keep a record.",
      ),
      hint: bi("Qué hacen hoy, qué falla y qué te gustaría lograr. Con 2–3 líneas basta.", "What you do today, what fails and what you'd like to achieve. 2–3 lines are enough."),
    },
  },
  needs: [
    bi("Mejorar o automatizar un proceso", "Improve or automate a process"),
    bi("Un sistema interno (CRM, POS, inventario…)", "An internal system (CRM, POS, inventory…)"),
    bi("Un sitio o landing page", "A website or landing page"),
    bi("Integrar herramientas o un ERP", "Integrate tools or an ERP"),
    bi("Una oportunidad laboral", "A job opportunity"),
    bi("Otra cosa", "Something else"),
  ],
  errors: {
    name: bi("Escribe tu nombre.", "Enter your name."),
    email: bi("Escribe un correo válido, por ejemplo nombre@empresa.com.", "Enter a valid email, for example name@company.com."),
    whatsapp: bi("Usa solo números, espacios, + o guiones (mínimo 8 dígitos).", "Use only digits, spaces, + or dashes (at least 8 digits)."),
    need: bi("Elige qué necesitas.", "Pick what you need."),
    message: bi("Cuéntame un poco más (al menos 20 caracteres).", "Tell me a bit more (at least 20 characters)."),
    summary: bi("Revisa los campos marcados.", "Please check the highlighted fields."),
    send: bi("No se pudo enviar el mensaje. Intenta de nuevo o escríbeme a", "The message couldn't be sent. Try again or email me at"),
  },
  submit: bi("Enviar mensaje", "Send message"),
  sending: bi("Enviando…", "Sending…"),
  success: {
    title: bi("¡Mensaje enviado!", "Message sent!"),
    text: bi("Gracias. Te respondo por correo en uno o dos días hábiles.", "Thanks. I'll reply by email within one or two business days."),
    again: bi("Enviar otro mensaje", "Send another message"),
  },
  prefill: bi("Desde el configurador:", "From the configurator:"),
};
