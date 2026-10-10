// Copy for the home page sections added in the 2026-10 restructure (quick
// stats, audience, services, expertise, experience, final CTA, contact form). Same rules as content.ts: first person, concrete, no invented
// metrics, clients or results.

import { bi, type Bi } from "./content";

// ── Navigation ──────────────────────────────────────────────────────────────

/** The thumb dock on phones: the five places a visitor jumps to. */
export const DOCK = [
  { id: "hero", icon: "home", label: bi("Inicio", "Home") },
  { id: "work", icon: "work", label: bi("Proyectos", "Work") },
  { id: "experience", icon: "experience", label: bi("Experiencia", "Experience") },
  { id: "solutions", icon: "solutions", label: bi("Soluciones", "Solutions") },
  { id: "contact", icon: "contact", label: bi("Contacto", "Contact") },
] as const;

export const HERO_CTA = {
  work: bi("Ver proyectos", "View projects"),
  talk: bi("Hablemos de tu proyecto", "Let's talk about your project"),
  /** The quiet third path, for recruiters. */
  recruiter: bi("¿Buscas perfil técnico?", "Hiring?"),
  experience: bi("Ver experiencia", "View experience"),
  cv: bi("Descargar CV", "Download resume"),
};

// ── Quick stats ─────────────────────────────────────────────────────────────

/** First professional role (CPA Grup, March 2025): experience is counted from here. */
export const CAREER_START = new Date(2025, 2, 1);

export const STATS_TEXT = {
  label: bi("En resumen", "At a glance"),
  years: bi("años de experiencia profesional", "years of professional experience"),
  projects: bi("proyectos publicados como demo en línea", "projects published as live demos"),
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
  role: bi("MI ROL", "MY ROLE"),
  kinds: {
    demo: bi("PROYECTO DEMO", "DEMO PROJECT"),
    personal: bi("PROYECTO PERSONAL", "PERSONAL PROJECT"),
    professional: bi("EXPERIENCIA PROFESIONAL", "PROFESSIONAL WORK"),
  },
  year: bi("AÑO", "YEAR"),
  schematic: bi("Interfaz · esquema", "Interface · schematic"),
  mobile: bi("Versión móvil", "Mobile version"),
};

// ── Specialty band ──────────────────────────────────────────────────────────

/** The scroll-linked type band (SpecialtyBand.tsx): specialties only, the stack lives in Expertise. Same words in both languages. */
export const BAND = {
  label: bi("Especialidades", "Specialties"),
  specialties: ["SOFTWARE ENGINEERING", "FULL STACK", "APIs", "AUTOMATION", "SYSTEM DESIGN"],
};

// ── Services bento ──────────────────────────────────────────────────────────

export const SERVICES_TEXT = {
  eyebrow: bi("CAPACIDADES", "CAPABILITIES"),
  title: bi("Qué puedo construir.", "What I can build."),
  intro: bi(
    "No necesitas saber qué tecnología usar: partimos de tu proceso actual y decidimos qué vale la pena construir.",
    "You don't need to know which technology to use: we start from your current process and decide what's worth building.",
  ),
  examples: bi("Ejemplos", "Examples"),
  tech: bi("Con qué lo construyo", "What I build it with"),
  demo: bi("Verlo en una demo", "See it in a demo"),
  cta: bi("Hablemos de esto", "Let's talk about this"),
};

export type ServiceKey = "web" | "backend" | "erp" | "tools" | "ai";

/**
 * Capabilities, not logos: what each one solves for the business, a few
 * examples, then the technologies. `demo` only where a published demo shows
 * it; `need` is the contact form option it pre-selects (CONTACT_FORM.needs).
 */
export const SERVICES: { key: ServiceKey; kicker: Bi; title: Bi; text: Bi; items: Bi[]; tech: string[]; demo?: { name: string; href: string }; need: number }[] = [
  {
    key: "web",
    kicker: bi("APLICACIONES WEB Y PLATAFORMAS INTERNAS", "WEB APPS & INTERNAL PLATFORMS"),
    title: bi("Tu operación en un solo sistema.", "Your operation in one system."),
    text: bi(
      "Clientes, ventas, citas o pedidos con las reglas de tu negocio dentro del software, no en una hoja de cálculo. Pensado primero para móvil.",
      "Customers, sales, appointments or orders with your business rules inside the software, not in a spreadsheet. Designed mobile first.",
    ),
    items: [bi("CRM", "CRM"), bi("Agenda y reservas", "Scheduling & booking"), bi("Portales", "Portals"), bi("Sitios que convierten", "Sites that convert")],
    tech: ["Angular", "React", "Astro", "TypeScript"],
    demo: { name: "Agenda", href: "https://agendawh.netlify.app" },
    need: 1,
  },
  {
    key: "backend",
    kicker: bi("BACKEND, APIS E INTEGRACIONES", "BACKEND, APIS & INTEGRATIONS"),
    title: bi("Herramientas que se hablan.", "Tools that talk to each other."),
    text: bi(
      "Servicios y APIs que validan, guardan y mueven la información entre sistemas, para que nada se capture dos veces.",
      "Services and APIs that validate, store and move information between systems, so nothing is entered twice.",
    ),
    items: [bi("APIs REST", "REST APIs"), bi("Autenticación", "Authentication"), bi("Sincronización de datos", "Data sync"), bi("Servicios externos", "External services")],
    tech: ["Java 21", "Quarkus", "Spring Boot", "PostgreSQL"],
    need: 3,
  },
  {
    key: "erp",
    kicker: bi("ERP / ODOO Y AUTOMATIZACIÓN DE PROCESOS", "ERP / ODOO & PROCESS AUTOMATION"),
    title: bi("Tu ERP, ajustado a cómo trabajas.", "Your ERP, fitted to how you work."),
    text: bi(
      "Vistas, reportes, automatizaciones e integraciones alrededor de Odoo: lo que hago a diario en producción.",
      "Views, reports, automations and integrations around Odoo: what I do every day in production.",
    ),
    items: [bi("Módulos y vistas", "Modules & views"), bi("Reportes", "Reports"), bi("Migraciones de datos", "Data migrations"), bi("Flujos automáticos", "Automated workflows")],
    tech: ["Odoo", "XML-RPC", "Python", "QWeb"],
    need: 3,
  },
  {
    key: "tools",
    kicker: bi("DASHBOARDS, COTIZADORES Y HERRAMIENTAS OPERATIVAS", "DASHBOARDS, QUOTING & OPERATIONAL TOOLS"),
    title: bi("Ver y decidir sin armar reportes.", "See and decide without building reports."),
    text: bi(
      "Punto de venta, inventario, cotizaciones con tus reglas de precio e indicadores que se actualizan solos.",
      "Point of sale, inventory, quotes with your pricing rules and metrics that update themselves.",
    ),
    items: [bi("POS", "POS"), bi("Inventarios", "Inventory"), bi("Cotizadores", "Quoting tools"), bi("Dashboards", "Dashboards")],
    tech: ["Angular", "Angular Material", "TypeScript", "PostgreSQL"],
    demo: { name: "POS Tinta Negra", href: "https://pos-tinta-negra-demo.netlify.app" },
    need: 1,
  },
  {
    key: "ai",
    kicker: bi("IA APLICADA Y AUTOMATIZACIONES", "APPLIED AI & AUTOMATION"),
    title: bi("Lo repetitivo, que lo haga el sistema.", "Let the system do the repetitive work."),
    text: bi(
      "Asistentes que responden con la información de tu negocio, registran lo que hace falta y pasan la conversación a una persona cuando conviene.",
      "Assistants that answer with your business's information, record what's needed and hand the conversation to a person when it makes sense.",
    ),
    items: [bi("Recepcionista por WhatsApp", "WhatsApp receptionist"), bi("Seguimiento", "Follow-up"), bi("Avisos", "Alerts"), bi("Documentos", "Documents")],
    tech: ["React", "Python", "REST APIs"],
    demo: { name: "Sofía", href: "https://sofiaasis.netlify.app" },
    need: 0,
  },
];

// ── Stack ───────────────────────────────────────────────────────────────────

export const STACK_V2 = {
  eyebrow: bi("SKILLS", "SKILLS"),
  title: bi("Especialidades.", "Expertise."),
  intro: bi(
    "Cinco áreas en las que trabajo, de la interfaz a la automatización.",
    "Five areas I work in, from the interface to automation.",
  ),
  /**
   * The five areas of the Expertise showcase (TechStack.tsx), every technology
   * from the earlier per-layer Skills kept. `key` names the area in the
   * developer file's skills.ts tab.
   */
  groups: [
    {
      key: "frontend",
      code: "FRONTEND",
      name: bi("Frontend", "Frontend"),
      does: bi("Pantallas, formularios y flujos que la gente usa todos los días, pensados primero para móvil.", "Screens, forms and workflows people use every day, designed mobile first."),
      items: ["Angular", "React", "Astro", "TypeScript"],
    },
    {
      key: "backend",
      code: "BACKEND",
      name: bi("Backend y datos", "Backend & data"),
      does: bi("Servicios, reglas de negocio y APIs; guardar, relacionar y recuperar la información.", "Services, business rules and APIs; storing, relating and retrieving information."),
      items: ["Java 21", "Spring Boot", "Quarkus", "Python", "FastAPI", "REST APIs", "PostgreSQL", "MySQL", "MariaDB", "Redis"],
    },
    {
      key: "architecture",
      code: "ARCHITECTURE",
      name: bi("Arquitectura", "Architecture"),
      does: bi("Que cada responsabilidad viva en su lugar, y que el sistema se pueda desplegar y mantener.", "Keeping each responsibility where it belongs, and the system deployable and maintainable."),
      items: ["Arquitectura Hexagonal", "SOLID", "Diseño orientado a dominio", "Docker", "AWS", "Git", "Jira"],
    },
    {
      key: "integration",
      code: "INTEGRATION · ERP",
      name: bi("Integraciones y ERP", "Integrations & ERP"),
      does: bi("Conectar el software con los procesos y sistemas de la empresa, empezando por Odoo.", "Connecting software with the company's processes and systems, starting with Odoo."),
      items: ["Odoo", "XML-RPC", "Integraciones ERP"],
    },
    {
      key: "automation",
      code: "AUTOMATION · AI",
      name: bi("Automatización e IA", "Automation & AI"),
      does: bi("Que lo repetitivo ocurra solo: flujos automáticos y asistentes como la demo de Sofía.", "Letting the repetitive happen on its own: automated workflows and assistants like the Sofía demo."),
      items: ["Automatización de procesos", "Asistentes con IA", "WhatsApp"],
    },
  ],
};

// ── Experience ──────────────────────────────────────────────────────────────

export const EXPERIENCE_V2 = {
  eyebrow: bi("EXPERIENCIA PROFESIONAL", "PROFESSIONAL EXPERIENCE"),
  title: bi("Experiencia", "Experience"),
  intro: bi(
    "Empecé dando soporte a un ERP y hoy diseño y construyo las aplicaciones e integraciones que lo rodean.",
    "I started supporting an ERP and today I design and build the applications and integrations around it.",
  ),
  now: bi("Actual", "Current"),
  did: bi("Qué hice", "What I did"),
};

/** The developer file next to the experience list (DeveloperFile.tsx). Real data only. */
export const DEV_FILE = {
  label: bi("Ficha del desarrollador escrita como código", "Developer profile written as code"),
  comment: bi("perfil real, sin adornos", "the real profile, no embellishment"),
  since: bi("primer rol profesional", "first professional role"),
  focus: [bi("procesos de negocio", "business processes"), bi("backend", "backend"), bi("integraciones ERP", "ERP integrations")],
  architecture: ["hexagonal", "SOLID", "DDD"],
  studies: bi("Ing. en Informática · IPN UPIICSA · egreso dic. 2026", "Computer Engineering · IPN UPIICSA · Dec 2026"),
  openTo: [bi("empleo", "jobs"), bi("proyectos", "projects")],
  skillsComment: bi("tecnologías que uso, por área", "technologies I use, by area"),
  termTab: bi("terminal · demo", "terminal · demo"),
  termNote: bi("flujo ilustrativo: build → pruebas → ejecución local", "illustrative flow: build → tests → local run"),
  termNotice: bi(
    "Demostración visual: no se ejecuta ningún comando real.",
    "Visual demonstration: no real command is run.",
  ),
  /** The illustrative terminal: command, then what that step is for (no timings or results). */
  term: [
    ["./mvnw test", bi("pruebas de dominio y casos de uso", "domain and use-case tests")],
    ["./mvnw package", bi("servicio Quarkus empaquetado", "Quarkus service packaged")],
    ["npm run build", bi("interfaz Angular compilada", "Angular interface built")],
    ["docker compose up -d", bi("API, interfaz y PostgreSQL en contenedores", "API, interface and PostgreSQL in containers")],
  ] as [string, Bi][],
  cv: bi("CV", "Resume"),
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
  cv: bi("Descargar CV", "Download resume"),
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
  /** Interactive extras (ContactForm.tsx). */
  progress: (n: number, total: number) => bi(`${n} de ${total} campos listos`, `${n} of ${total} fields ready`),
  ready: bi("Todo listo para enviar", "All set to send"),
  starters: {
    label: bi("¿No sabes cómo empezar? Toca una idea:", "Not sure how to start? Tap an idea:"),
    items: [
      bi("Hoy lo hacemos en Excel y queremos ", "Today we do it in Excel and we want "),
      bi("Perdemos tiempo cuando ", "We lose time when "),
      bi("Necesitamos conectar nuestro sistema con ", "We need to connect our system with "),
    ],
    short: [bi("Hoy usamos Excel…", "We use Excel…"), bi("Perdemos tiempo…", "We lose time…"), bi("Conectar sistemas…", "Connect systems…")],
  },
  count: (n: number) => bi(n < 20 ? `${n}/20 · un poco más de contexto` : `${n} caracteres`, n < 20 ? `${n}/20 · a bit more context` : `${n} characters`),
  draft: bi("Borrador guardado en este navegador", "Draft saved in this browser"),
  shortcut: bi("o pulsa", "or press"),
  successTo: bi("Te responderé a", "I'll reply to"),
};
