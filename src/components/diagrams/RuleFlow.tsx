import type { Bi, Lang, Text } from "@/data/content";
import DataFlow from "./DataFlow";

// Business rules as a chain: the inputs a record carries, then each value the
// system derives from them, in order, with what it is derived from.

export interface Rules {
  label: Bi;
  inputsLabel: Bi;
  inputs: Text[];
  steps: { label: Text; from: Text }[];
}

export default function RuleFlow({ rules, lang }: { rules: Rules; lang: Lang }) {
  const flow = {
    direction: "vertical" as const,
    label: rules.label,
    stages: [
      rules.inputs.map((label) => ({ label })),
      ...rules.steps.map((s, i) => [{ label: s.label, sub: s.from, accent: i === rules.steps.length - 1 }]),
    ],
  };
  return <DataFlow flow={flow} lang={lang} stageLabels={[rules.inputsLabel]} className="df--rules" />;
}
