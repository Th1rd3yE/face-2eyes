"use client";

import { useState } from "react";
import AnalyzerForm from "./components/AnalyzerForm";
import CredibilityCard from "./components/CredibilityCard";
import SignalsCard from "./components/SignalsCard";
import EvidenceCard from "./components/EvidenceCard";
import UncertaintyCard from "./components/UncertaintyCard";
import ContextCard from "./components/ContextCard";
import SourcesCard from "./components/SourcesCard";
import ActionsCard from "./components/ActionsCard";
import ViralityCard from "./components/ViralityCard";
import { Skeleton } from "./components/ui/skeleton";
import { AnalysisResult } from "./data/mockResult";

type ApiResponse = {
  result: {
    classification: string;
    explanation: string;
    sources: string[];
    recommended_next_actions: string[];
  };
  answer: string;
  iterations: number;
  payload: {
    country: string;
    date: string;
    questions: string;
    key_words: string[];
    native_language: string;
    english_language: string;
  };
  steps: {
    step_type: string;
    tool_name: string | null;
    content: string;
  }[];
};

function mapClassification(
  raw: string
): "Likely Accurate" | "Uncertain" | "Potentially Misleading" {
  const upper = raw.toUpperCase();
  if (upper === "TRUE") return "Likely Accurate";
  if (upper === "FALSE") return "Potentially Misleading";
  return "Uncertain";
}

function mapConfidence(raw: string): number {
  const upper = raw.toUpperCase();
  if (upper === "TRUE") return 82;
  if (upper === "FALSE") return 85;
  return 60;
}

function mapEvidenceStrength(
  classification: string
): "Strong" | "Moderate" | "Weak" {
  const upper = classification.toUpperCase();
  if (upper === "TRUE") return "Strong";
  if (upper === "FALSE") return "Weak";
  return "Moderate";
}

function mapViralityRisk(classification: string): "Low" | "Medium" | "High" {
  const upper = classification.toUpperCase();
  if (upper === "TRUE") return "Low";
  if (upper === "FALSE") return "High";
  return "Medium";
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url.slice(0, 40);
  }
}

function mapApiResponse(api: ApiResponse): AnalysisResult {
  const { result } = api;
  const classification = mapClassification(result.classification);

  const sources = result.sources.map((url) => ({
    title: extractDomain(url),
    description: "Source referenced during verification.",
    url,
    type: "Verified" as const,
  }));

  const detectedLanguages: string[] = [];
  if (api.payload.native_language) detectedLanguages.push(api.payload.native_language);
  if (
    api.payload.english_language &&
    api.payload.english_language !== api.payload.native_language
  ) {
    detectedLanguages.push(api.payload.english_language);
  }
  if (detectedLanguages.length === 0) detectedLanguages.push("English");

  const localContextParts: string[] = [];
  if (api.payload.country) localContextParts.push(`Country context: ${api.payload.country}.`);
  if (api.payload.date) localContextParts.push(`Date referenced: ${api.payload.date}.`);
  const localContext =
    localContextParts.length > 0 ? localContextParts.join(" ") : result.explanation;

  return {
    classification,
    confidence: mapConfidence(result.classification),
    explanation: result.explanation,
    signals: api.payload.key_words ?? [],
    sources,
    evidenceStrength: mapEvidenceStrength(result.classification),
    evidenceSummary: api.answer,
    uncertainties: [],
    missingContext: [],
    detectedLanguages,
    simplifiedSummary: api.answer,
    localContext,
    recommendedActions: result.recommended_next_actions,
    viralityRisk: mapViralityRisk(result.classification),
    viralityReasons: [],
    steps: api.steps ?? [],
  };
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHowToUse, setShowHowToUse] = useState(false);

  const handleAnalyze = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // https://thirdeye-gwhw.onrender.com/verify
      const response = await fetch("http://localhost:8000/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message.trim() }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setResult(mapApiResponse(data));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setLoading(false);
    setError(null);
    setShowHowToUse(false);
  };

  const showResultsView = loading || result || error;

  return (
    <>
      <main className="min-h-screen text-slate-900">
        <header className="sticky top-0 z-30">
          <div className="mx-auto max-w-5xl px-4 pt-4 pb-3 sm:px-5">
            <div className="flex items-start justify-between gap-4 rounded-3xl border border-white/35 bg-white/10 px-4 py-3 shadow-[0_8px_24px_rgba(80,70,90,0.08)] backdrop-blur-md">
              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight text-[#24324a] sm:text-2xl">
                  ThirdEye
                </h1>
                <p className="text-xs text-[#5f6b7a] sm:text-sm">
                  See beyond misinformation
                </p>
              </div>

              {showResultsView ? (
                <button
                  onClick={handleBack}
                  className="shrink-0 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-[#42526b] shadow-sm transition hover:bg-white"
                >
                  ← Back
                </button>
              ) : (
                <button
                  onClick={() => setShowHowToUse(true)}
                  className="shrink-0 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-[#42526b] shadow-sm transition hover:bg-white"
                >
                  How it works
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="pt-4 sm:pt-6">
          {showResultsView ? (
            <section className="mx-auto max-w-5xl px-4 pb-6 sm:px-5 sm:pb-8">
              <div className="rounded-3xl border border-white/35 bg-white/10 p-4 shadow-[0_8px_24px_rgba(80,70,90,0.08)] backdrop-blur-xl sm:p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                    Results
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#24324a] sm:text-3xl">
                    Credibility Assessment
                  </h2>
                </div>

                {error ? (
                  <div className="mt-6 rounded-2xl border border-rose-200/80 bg-rose-50/85 p-5">
                    <p className="font-semibold text-rose-700">Analysis failed</p>
                    <p className="mt-1 text-sm text-rose-600">{error}</p>
                    <button
                      onClick={handleBack}
                      className="mt-4 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 shadow-sm transition hover:bg-rose-50"
                    >
                      Try again
                    </button>
                  </div>
                ) : loading ? (
                  <div className="mt-6 space-y-4">
                    <p className="text-sm text-[#5f6b7a]">
                      Analyzing message credibility...
                    </p>

                    <Skeleton className="h-24 w-full rounded-2xl" />

                    <div className="grid gap-4 md:grid-cols-2">
                      <Skeleton className="h-56 w-full rounded-2xl" />
                      <Skeleton className="h-56 w-full rounded-2xl" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Skeleton className="h-56 w-full rounded-2xl" />
                      <Skeleton className="h-56 w-full rounded-2xl" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Skeleton className="h-56 w-full rounded-2xl" />
                      <Skeleton className="h-56 w-full rounded-2xl" />
                    </div>
                  </div>
                ) : result ? (
                  <>
                    <div className="mt-5">
                      <CredibilityCard
                        classification={result.classification}
                        confidence={result.confidence}
                      />
                    </div>

                    <div className="mt-4">
                      <ContextCard
                        detectedLanguages={result.detectedLanguages}
                        simplifiedSummary={result.simplifiedSummary}
                        localContext={result.localContext}
                      />
                    </div>

                    <div className="mt-4">
                      <ActionsCard
                        recommendedActions={result.recommendedActions}
                      />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <ViralityCard
                        viralityRisk={result.viralityRisk}
                        viralityReasons={result.viralityReasons}
                      />
                      <EvidenceCard
                        evidenceStrength={result.evidenceStrength}
                        evidenceSummary={result.evidenceSummary}
                      />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <UncertaintyCard
                        uncertainties={result.uncertainties}
                        missingContext={result.missingContext}
                      />
                      <SourcesCard sources={result.sources} />
                    </div>

                    <SignalsCard steps={result.steps} />
                  </>
                ) : null}
              </div>
            </section>
          ) : (
            <AnalyzerForm
              value={message}
              onChange={setMessage}
              onAnalyze={handleAnalyze}
              loading={loading}
            />
          )}
        </div>
      </main>

      {showHowToUse && !showResultsView && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 p-3 sm:items-center">
          <div className="w-full max-w-md rounded-3xl border border-white/60 bg-[rgba(255,255,255,0.88)] p-5 shadow-[0_18px_50px_rgba(50,50,70,0.18)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#24324a]">
                  How to use ThirdEye
                </h3>
                <p className="mt-1 text-sm text-[#5f6b7a]">
                  Quick steps to check a forwarded message
                </p>
              </div>

              <button
                onClick={() => setShowHowToUse(false)}
                className="rounded-full bg-white px-3 py-1 text-sm text-[#42526b] shadow-sm"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm text-[#42526b]">
              <div className="rounded-2xl bg-white/75 p-4">
                <p className="font-semibold text-[#24324a]">1. Paste the message</p>
                <p className="mt-1">
                  Copy a WhatsApp, Telegram, or forum message into the text box.
                </p>
              </div>

              <div className="rounded-2xl bg-white/75 p-4">
                <p className="font-semibold text-[#24324a]">2. Tap Analyze</p>
                <p className="mt-1">
                  ThirdEye checks for source quality, evidence strength,
                  uncertainty, missing context, and virality cues.
                </p>
              </div>

              <div className="rounded-2xl bg-white/75 p-4">
                <p className="font-semibold text-[#24324a]">
                  3. Review the result
                </p>
                <p className="mt-1">
                  You’ll see classification, explanation, sources, uncertainty,
                  local context, and recommended actions before resharing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}