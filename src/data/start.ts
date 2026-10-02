// Copy for /start-a-project. Option keys are stable identifiers; they are what
// gets submitted, alongside the label the visitor saw.

import { bi, type Bi } from "./content";

export const START = {
  eyebrow: bi("INICIAR UN PROYECTO", "START A PROJECT"),
  title: bi("Cuéntame qué está pasando.", "Tell me what's going on."),
  intro: bi(
    "No necesitas preparar un documento técnico. Describe el proceso como funciona actualmente.",
    "You don't need to prepare a technical document. Describe the process as it works today.",
  ),
  back: bi("Volver al portfolio", "Back to portfolio"),
  guide: {
    title: bi("No necesitas saber qué tecnología necesitas.", "You don't need to know which technology you need."),
    lead: bi("Solo necesito entender tres cosas:", "I only need to understand three things:"),
    items: [
      bi("Cómo trabajas actualmente.", "How you work today."),
      bi("Qué parte del proceso te genera problemas.", "Which part of the process causes problems."),
      bi("Qué te gustaría mejorar.", "What you'd like to improve."),
    ],
    close: bi("Con eso puedo ayudarte a identificar una solución.", "With that I can help you find a solution."),
  },
};

export interface Option {
  key: string;
  label: Bi;
}

const opts = (...o: [string, string, string][]): Option[] => o.map(([key, es, en]) => ({ key, label: bi(es, en) }));

export const STEPS_FORM = {
  type: {
    title: bi("¿Qué quieres mejorar?", "What do you want to improve?"),
    help: bi("Selecciona la opción que más se acerque. No pasa nada si no estás seguro.", "Choose the closest option. It's fine if you're not sure."),
    options: opts(
      ["automation", "Automatizar un proceso", "Automate a process"],
      ["internal-system", "Crear un sistema interno", "Build an internal system"],
      ["web-app", "Crear una aplicación web", "Build a web application"],
      ["integration", "Integrar sistemas", "Integrate systems"],
      ["mvp", "Desarrollar un MVP", "Develop an MVP"],
      ["website", "Crear o mejorar un sitio web", "Create or improve a website"],
      ["not-sure", "No estoy seguro todavía", "I'm not sure yet"],
    ),
    notSure: bi(
      "Está bien. En los siguientes pasos puedes contarme cómo trabajan actualmente y te ayudaré a identificar qué podría mejorarse.",
      "That's fine. In the next steps you can tell me how you work today and I'll help you figure out what could be improved.",
    ),
  },
  current: {
    title: bi("¿Cómo realizan actualmente este proceso?", "How do you run this process today?"),
    help: bi(
      "Cuéntamelo como se lo explicarías a otra persona. No necesitas utilizar términos técnicos.",
      "Tell me the way you'd explain it to someone else. No technical terms needed.",
    ),
    placeholder: bi(
      "Ejemplo: Los clientes preguntan por WhatsApp. Anotamos sus datos en Excel, después hacemos una cotización y la enviamos manualmente. Si aceptan, volvemos a capturar la información en nuestro sistema.",
      "Example: Customers ask on WhatsApp. We note their details in Excel, then prepare a quote and send it by hand. If they accept, we enter the information again in our system.",
    ),
    hintsLabel: bi("Puedes incluir:", "You can include:"),
    hints: [
      bi("Quién inicia el proceso", "Who starts the process"),
      bi("Qué hacen después", "What happens next"),
      bi("Qué herramientas utilizan", "Which tools you use"),
      bi("Quién participa", "Who takes part"),
      bi("Cómo termina el proceso", "How the process ends"),
    ],
  },
  pain: {
    title: bi("¿Qué parte genera más problemas?", "Which part causes the most problems?"),
    help: bi(
      "Piensa en lo que más tiempo consume, genera errores o depende demasiado de una persona.",
      "Think about what takes the most time, causes errors or depends too much on one person.",
    ),
    placeholder: bi(
      "Ejemplo: Perdemos tiempo copiando información entre WhatsApp y Excel y algunas solicitudes se nos olvidan.",
      "Example: We lose time copying information between WhatsApp and Excel, and some requests get forgotten.",
    ),
  },
  tools: {
    title: bi("¿Qué herramientas utilizan actualmente?", "Which tools do you use today?"),
    help: bi("Selecciona todas las que utilicen durante el proceso.", "Select every one you use during the process."),
    options: opts(
      ["spreadsheets", "Excel / Google Sheets", "Excel / Google Sheets"],
      ["whatsapp", "WhatsApp", "WhatsApp"],
      ["email", "Correo", "Email"],
      ["erp", "ERP", "ERP"],
      ["crm", "CRM", "CRM"],
      ["own-software", "Software propio", "In-house software"],
      ["paper", "Documentos físicos", "Paper documents"],
      ["other", "Otro", "Other"],
    ),
    /** Choosing any of these asks which one. */
    named: ["erp", "crm", "own-software", "other"],
    which: bi("¿Cuál utilizan?", "Which one do you use?"),
    whichPlaceholder: bi("Ejemplo: Odoo, HubSpot, un sistema hecho a la medida…", "Example: Odoo, HubSpot, a custom-built system…"),
  },
  team: {
    title: bi("¿Quién utiliza este proceso?", "Who uses this process?"),
    help: bi("Esto me ayuda a entender el tamaño de la operación.", "This helps me understand the size of the operation."),
    options: opts(
      ["1", "Solo yo", "Just me"],
      ["2-5", "2–5 personas", "2–5 people"],
      ["6-15", "6–15 personas", "6–15 people"],
      ["16-50", "16–50 personas", "16–50 people"],
      ["50-plus", "Más de 50 personas", "More than 50 people"],
    ),
  },
  urgency: {
    title: bi("¿Qué tan pronto necesitas resolverlo?", "How soon do you need to solve it?"),
    help: bi("No es un compromiso. Solo me ayuda a entender la prioridad del proyecto.", "It's not a commitment. It just helps me understand the project's priority."),
    options: opts(
      ["asap", "Lo antes posible", "As soon as possible"],
      ["this-month", "Durante este mes", "This month"],
      ["3-months", "En los próximos 3 meses", "In the next 3 months"],
      ["exploring", "Estoy explorando opciones", "I'm exploring options"],
    ),
  },
  budget: {
    title: bi("Presupuesto aproximado", "Approximate budget"),
    help: bi(
      "No necesitas tener una cifra exacta. Esto ayuda a plantear una solución acorde al alcance disponible.",
      "You don't need an exact figure. This helps shape a solution that fits the available scope.",
    ),
    options: opts(
      ["lt-5k", "Menos de $5,000 MXN", "Under $5,000 MXN"],
      ["5k-15k", "$5,000 – $15,000 MXN", "$5,000 – $15,000 MXN"],
      ["15k-30k", "$15,000 – $30,000 MXN", "$15,000 – $30,000 MXN"],
      ["30k-60k", "$30,000 – $60,000 MXN", "$30,000 – $60,000 MXN"],
      ["60k-plus", "Más de $60,000 MXN", "Over $60,000 MXN"],
      ["guidance", "Necesito orientación", "I need guidance"],
    ),
    guidance: bi(
      "No hay problema. Podemos definir primero el alcance y después estimar qué inversión tendría sentido.",
      "No problem. We can define the scope first and then estimate what investment would make sense.",
    ),
  },
  contact: {
    title: bi("Ya casi terminamos.", "We're almost done."),
    help: bi("Déjame una forma de contactarte para revisar lo que me compartiste.", "Leave me a way to reach you so we can go over what you shared."),
    name: bi("Nombre", "Name"),
    namePlaceholder: bi("Tu nombre", "Your name"),
    company: bi("Empresa", "Company"),
    companyPlaceholder: bi("Nombre del negocio o proyecto", "Business or project name"),
    email: bi("Correo", "Email"),
    emailPlaceholder: bi("nombre@empresa.com", "name@company.com"),
    phone: bi("Teléfono / WhatsApp", "Phone / WhatsApp"),
    phonePlaceholder: bi("+52 55 0000 0000", "+52 55 0000 0000"),
    optional: bi("opcional", "optional"),
    privacy: bi("Utilizaré estos datos únicamente para contactarte respecto a tu proyecto.", "I'll only use these details to contact you about your project."),
  },
  review: {
    title: bi("Esto es lo que entendí", "Here's what I understood"),
    help: bi("Confirma que describe bien tu situación antes de enviarlo.", "Check that it describes your situation before sending it."),
    fields: {
      type: bi("Lo que quieres mejorar", "What you want to improve"),
      pain: bi("Problema principal", "Main problem"),
      current: bi("Proceso actual", "Current process"),
      tools: bi("Herramientas utilizadas", "Tools used"),
      team: bi("Tamaño del equipo", "Team size"),
      urgency: bi("Prioridad", "Priority"),
      budget: bi("Presupuesto", "Budget"),
      contact: bi("Contacto", "Contact"),
    },
    empty: bi("—", "—"),
    send: bi("Enviar proyecto", "Send project"),
    sending: bi("Enviando…", "Sending…"),
    edit: bi("Editar respuestas", "Edit answers"),
  },
  success: {
    title: bi("Gracias. Ya tengo contexto.", "Thank you. I have context now."),
    text: bi(
      "Revisaré la información para entender primero el problema antes de plantear una solución.",
      "I'll review the information to understand the problem first, before proposing a solution.",
    ),
    support: bi(
      "Si veo que puedo ayudarte, el siguiente paso será una conversación breve para conocer algunos detalles del proceso.",
      "If I see I can help, the next step will be a short conversation to learn a few details about the process.",
    ),
    back: bi("Volver al inicio", "Back to home"),
    projects: bi("Ver proyectos", "View projects"),
  },
  nav: {
    next: bi("Continuar", "Continue"),
    review: bi("Revisar respuestas", "Review answers"),
    back: bi("Atrás", "Back"),
    step: bi("Paso", "Step"),
    of: bi("de", "of"),
    reviewStep: bi("Revisión final", "Final review"),
  },
  errors: {
    type: bi("Elige la opción que más se acerque, aunque no estés seguro.", "Choose the closest option, even if you're not sure."),
    current: bi("Cuéntame brevemente cómo realizan actualmente el proceso.", "Briefly tell me how you run the process today."),
    pain: bi("Cuéntame qué parte del proceso genera más problemas.", "Tell me which part of the process causes the most problems."),
    tools: bi("Selecciona al menos una herramienta que utilicen.", "Select at least one tool you use."),
    team: bi("Elige cuántas personas utilizan este proceso.", "Choose how many people use this process."),
    urgency: bi("Elige qué tan pronto necesitas resolverlo.", "Choose how soon you need to solve it."),
    budget: bi("Elige un rango, o «Necesito orientación».", "Choose a range, or “I need guidance”."),
    name: bi("Escribe tu nombre.", "Enter your name."),
    email: bi("Escribe un correo válido.", "Enter a valid email."),
    phone: bi("Escribe un teléfono válido, con al menos 10 dígitos.", "Enter a valid phone number, with at least 10 digits."),
    send: bi(
      "No se pudo enviar el proyecto. Tus respuestas siguen aquí: inténtalo de nuevo o escríbeme directamente a",
      "The project couldn't be sent. Your answers are still here: try again, or write to me directly at",
    ),
  },
};
