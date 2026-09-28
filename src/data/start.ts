// Copy for /start-a-project. Option keys are stable identifiers; they are what
// gets submitted, alongside the label the visitor saw.

import { bi, type Bi } from "./content";

export const START = {
  eyebrow: bi("INICIAR UN PROYECTO", "START A PROJECT"),
  title: bi("Cuéntame qué no está funcionando.", "Tell me what isn't working."),
  intro: bi(
    "No necesitas conocer la tecnología ni tener la solución definida. Empecemos por el problema y por cómo lo manejas actualmente.",
    "You don't need to know the technology or have the solution defined. Start with the problem and how you handle it today.",
  ),
  support: bi("Usaré esta información como contexto para nuestra primera conversación.", "I'll use this information as context for the first conversation."),
  back: bi("Volver al portfolio", "Back to portfolio"),
};

export interface Option {
  key: string;
  label: Bi;
}

const opts = (...o: [string, string, string][]): Option[] => o.map(([key, es, en]) => ({ key, label: bi(es, en) }));

export const STEPS_FORM = {
  type: {
    title: bi("¿Qué quieres construir?", "What do you want to build?"),
    help: bi("Elige la opción más cercana. No pasa nada si todavía no estás seguro.", "Choose the closest option. It's okay if you're not sure yet."),
    options: opts(
      ["web-app", "Aplicación web", "Web application"],
      ["internal-system", "Sistema empresarial interno", "Internal business system"],
      ["automation", "Automatización", "Automation"],
      ["integration", "Integración", "Integration"],
      ["dashboard", "Dashboard", "Dashboard"],
      ["mvp", "MVP", "MVP"],
      ["not-sure", "Todavía no estoy seguro", "I'm not sure yet"],
    ),
  },
  current: {
    title: bi("¿Cómo manejas esto actualmente?", "How do you handle this today?"),
    help: bi(
      "Esto me ayuda a entender el proceso actual antes de pensar en tecnología.",
      "This helps me understand the current process before thinking about technology.",
    ),
    options: opts(
      ["spreadsheets", "Excel / hojas de cálculo", "Excel / spreadsheets"],
      ["whatsapp", "WhatsApp", "WhatsApp"],
      ["email", "Correo electrónico", "Email"],
      ["paper", "Papel", "Paper"],
      ["other-software", "Otro software", "Another software"],
      ["disconnected-tools", "Varias herramientas desconectadas", "Several disconnected tools"],
      ["no-process", "Todavía no existe un proceso", "There is no process yet"],
    ),
  },
  problem: {
    title: bi("¿Cuál es el principal problema?", "What's the main problem?"),
    help: bi(
      "Cuéntame dónde se pierde tiempo, aparecen errores o el proceso se vuelve difícil.",
      "Tell me where time is lost, errors happen or the process becomes difficult.",
    ),
    placeholder: bi(
      "Cuéntame qué toma demasiado tiempo, genera errores, es difícil de seguir o simplemente no funciona como debería.",
      "Tell me what takes too much time, creates errors, is difficult to track or simply doesn't work as well as it should.",
    ),
    label: bi("Principal problema", "Main problem"),
  },
  about: {
    title: bi("Un poco de contexto sobre ti.", "A little context about you."),
    name: bi("Nombre", "Name"),
    company: bi("Empresa", "Company"),
    email: bi("Correo", "Email"),
    budget: bi("Presupuesto", "Budget"),
    optional: bi("opcional", "optional"),
    budgetHelp: bi(
      "El presupuesto ayuda a definir el alcance, no determina si vale la pena conversar sobre tu proyecto.",
      "Budget helps define scope, not whether your project is worth discussing.",
    ),
    budgets: opts(
      ["unknown", "Todavía no lo sé", "I don't know yet"],
      ["lt-10k", "Menos de $10,000 MXN", "Under $10,000 MXN"],
      ["10k-25k", "$10,000 – $25,000 MXN", "$10,000 – $25,000 MXN"],
      ["25k-50k", "$25,000 – $50,000 MXN", "$25,000 – $50,000 MXN"],
      ["50k-plus", "$50,000+ MXN", "$50,000+ MXN"],
    ),
  },
  review: {
    title: bi("¿Todo se ve correcto?", "Does this look right?"),
    help: bi("Revisa la información antes de enviarla.", "Review the context before sending it."),
    fields: {
      type: bi("Tipo de proyecto", "Project type"),
      current: bi("Proceso actual", "Current process"),
      problem: bi("Principal problema", "Main problem"),
      name: bi("Nombre", "Name"),
      company: bi("Empresa", "Company"),
      email: bi("Correo", "Email"),
      budget: bi("Presupuesto", "Budget"),
    },
    empty: bi("—", "—"),
    send: bi("Enviar proyecto", "Send project"),
    sending: bi("Enviando…", "Sending…"),
    edit: bi("Editar respuestas", "Edit answers"),
  },
  success: {
    title: bi("Señal recibida.", "Signal received."),
    text: bi(
      "Gracias por compartir el contexto. Revisaré el problema y utilizaré esta información como punto de partida para la conversación.",
      "Thanks for sharing the context. I'll review the problem and use what you provided as the starting point for the conversation.",
    ),
    support: bi(
      "Mientras tanto, puedes explorar cómo he abordado otros problemas de software.",
      "Meanwhile, you can explore how I've approached similar software problems.",
    ),
    back: bi("Volver al portfolio", "Back to portfolio"),
    projects: bi("Ver proyectos", "View projects"),
  },
  nav: {
    next: bi("Continuar", "Continue"),
    back: bi("Atrás", "Back"),
    step: bi("Paso", "Step"),
    of: bi("de", "of"),
  },
  errors: {
    choose: bi("Elige una opción para continuar.", "Choose an option to continue."),
    problem: bi("Cuéntame un poco más sobre el problema (al menos 20 caracteres).", "Tell me a bit more about the problem (at least 20 characters)."),
    name: bi("Escribe tu nombre.", "Enter your name."),
    email: bi("Escribe un correo válido, como nombre@empresa.com.", "Enter a valid email, like name@company.com."),
    send: bi(
      "No se pudo enviar el proyecto. Inténtalo de nuevo o escríbeme directamente a",
      "The project couldn't be sent. Try again, or write to me directly at",
    ),
  },
};
