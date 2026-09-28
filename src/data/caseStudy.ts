import { bi } from "./content";

/** Case-study sections in their fixed order. Sections without verified content are simply absent. */
export const CASE_SECTIONS = [
  { key: "context", label: bi("CONTEXTO", "CONTEXT") },
  { key: "problem", label: bi("PROBLEMA", "PROBLEM") },
  { key: "previousWorkflow", label: bi("FLUJO ANTERIOR", "PREVIOUS WORKFLOW") },
  { key: "requirements", label: bi("REQUISITOS", "REQUIREMENTS") },
  { key: "solution", label: bi("SOLUCIÓN", "SOLUTION") },
  { key: "businessLogic", label: bi("LÓGICA DE NEGOCIO", "BUSINESS LOGIC") },
  { key: "ux", label: bi("UX/UI", "UX/UI") },
  { key: "architecture", label: bi("ARQUITECTURA", "ARCHITECTURE") },
  { key: "engineeringDecisions", label: bi("DECISIONES DE INGENIERÍA", "ENGINEERING DECISIONS") },
  { key: "stack", label: bi("STACK", "STACK") },
  { key: "challenges", label: bi("RETOS", "CHALLENGES") },
  { key: "outcome", label: bi("RESULTADO", "OUTCOME") },
  { key: "nextEvolution", label: bi("SIGUIENTE EVOLUCIÓN", "NEXT EVOLUTION") },
] as const;

export type CaseSectionKey = (typeof CASE_SECTIONS)[number]["key"];

export const CASE_TEXT = {
  eyebrow: bi("CASO DE ESTUDIO", "CASE STUDY"),
  back: bi("Volver a proyectos", "Back to work"),
  toc: bi("En este caso", "In this case study"),
  category: bi("CATEGORÍA", "CATEGORY"),
  role: bi("ROL", "ROLE"),
  year: bi("AÑO", "YEAR"),
  stack: bi("STACK", "STACK"),
  next: bi("Siguiente caso", "Next case study"),
  startTitle: bi("¿Tienes un proceso que debería funcionar mejor?", "Have a process that should work better?"),
  start: bi("Iniciar un proyecto", "Start a project"),
};
