"use client";

import { useState } from "react";

type Step = {
  step_type: string;
  tool_name: string | null;
  content: string;
};

type SignalsCardProps = {
  steps: Step[];
};

type ParsedObs = Record<string, unknown>;

function tryParseJSON(s: string): ParsedObs | null {
  try {
    return JSON.parse(s) as ParsedObs;
  } catch {
    return null;
  }
}

function getActionDisplay(toolName: string): { prefix: string; label: string } {
  switch (toolName) {
    case "get_from_data_sources":
      return { prefix: "Fetching data from", label: "Local Data Sources" };
    case "get_from_vertex_search":
      return { prefix: "Fetching data from", label: "Google Vertex AI Search" };
    case "reanalyse":
      return { prefix: "", label: "Re-analyzing findings" };
    case "get_recommended_next_actions":
      return { prefix: "", label: "Generating recommended actions" };
    default:
      return { prefix: "", label: toolName };
  }
}

type StepGroup = {
  action: Step;
  observation: ParsedObs | null;
  isError: boolean;
};

function buildGroups(steps: Step[]): { groups: StepGroup[]; thought: string | null } {
  const groups: StepGroup[] = [];
  let thought: string | null = null;

  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    if (s.step_type === "Action") {
      const next = steps[i + 1];
      const raw = next?.step_type === "Observation" ? tryParseJSON(next.content) : null;
      const isError =
        !!raw?.explanation_en &&
        typeof raw.explanation_en === "string" &&
        raw.explanation_en.toLowerCase().includes("error");
      groups.push({ action: s, observation: raw, isError });
    } else if (s.step_type === "Thought") {
      thought = s.content;
    }
  }

  return { groups, thought };
}

function classificationChip(cls: string) {
  if (cls === "TRUE") return { label: "Confirmed", style: "bg-emerald-100 text-emerald-700" };
  if (cls === "FALSE") return { label: "Refuted", style: "bg-rose-100 text-rose-700" };
  return { label: "Uncertain", style: "bg-amber-100 text-amber-700" };
}

export default function SignalsCard({ steps }: SignalsCardProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!steps || steps.length === 0) return null;

  const { groups, thought } = buildGroups(steps);

  return (
    <div className="mt-4 rounded-2xl border border-white/60 bg-white/65 p-5 shadow-sm">
      <h4 className="text-xl font-semibold tracking-tight text-[#24324a]">
        Analysis Process
      </h4>

      <div className="relative mt-4 space-y-3">
        {groups.map((group, idx) => {
          const toolName = group.action.tool_name ?? "";
          const { prefix, label } = getActionDisplay(toolName);
          const obs = group.observation;
          const isExpanded = expanded === idx;

          const cls =
            typeof obs?.classification === "string" ? obs.classification : null;
          const chip = cls ? classificationChip(cls) : null;

          const explanation =
            typeof obs?.explanation === "string"
              ? obs.explanation
              : typeof obs?.explanation_en === "string"
              ? obs.explanation_en
              : null;

          const reason =
            typeof obs?.reason === "string" ? obs.reason : null;

          const changed =
            obs?.changed === true
              ? `Classification revised to ${obs.classification}`
              : obs?.changed === false
              ? "Classification unchanged"
              : null;

          const actionCount = Array.isArray(obs?.recommended_next_actions)
            ? (obs.recommended_next_actions as unknown[]).length
            : null;

          const confidence =
            typeof obs?.confidence === "number"
              ? Math.round((obs.confidence as number) * 100)
              : null;

          return (
            <div
              key={idx}
              className="rounded-xl border border-white/60 bg-white/75 p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    group.isError
                      ? "bg-rose-100 text-rose-600"
                      : "bg-[#edf1f6] text-[#42526b]"
                  }`}
                >
                  {idx + 1}
                </div>

                <div className="min-w-0 flex-1">
                  {prefix ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                      {prefix}
                    </p>
                  ) : null}
                  <p className="font-semibold text-[#24324a]">{label}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {group.isError && (
                      <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-600">
                        Source unavailable
                      </span>
                    )}
                    {!group.isError && chip && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${chip.style}`}
                      >
                        {chip.label}
                      </span>
                    )}
                    {!group.isError && confidence !== null && (
                      <span className="rounded-full bg-[#edf1f6] px-2.5 py-0.5 text-xs font-medium text-[#42526b]">
                        {confidence}% confidence
                      </span>
                    )}
                    {changed && !group.isError && (
                      <span className="rounded-full bg-[#edf1f6] px-2.5 py-0.5 text-xs font-medium text-[#42526b]">
                        {changed}
                      </span>
                    )}
                    {actionCount !== null && (
                      <span className="rounded-full bg-[#edf1f6] px-2.5 py-0.5 text-xs font-medium text-[#42526b]">
                        {actionCount} actions generated
                      </span>
                    )}
                  </div>

                  {explanation && !group.isError && (
                    <div className="mt-2">
                      <p
                        className={`text-sm leading-6 text-[#5f6b7a] ${
                          !isExpanded ? "line-clamp-2" : ""
                        }`}
                      >
                        {explanation}
                      </p>
                      {explanation.length > 120 && (
                        <button
                          onClick={() =>
                            setExpanded(isExpanded ? null : idx)
                          }
                          className="mt-1 text-xs font-medium text-[#64748b] hover:underline"
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  )}

                  {reason && !group.isError && !explanation && (
                    <p className="mt-2 text-sm leading-6 text-[#5f6b7a]">
                      {reason}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {thought && (
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Conclusion
            </p>
            <p className="mt-2 text-sm leading-7 text-[#42526b]">{thought}</p>
          </div>
        )}
      </div>
    </div>
  );
}
