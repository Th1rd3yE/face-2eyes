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
import { AnalysisResult, mockResults } from "./data/mockResult";

function getMockResultFromText(text: string): AnalysisResult {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes("secretly confirmed") ||
    lowerText.includes("send this to everyone") ||
    lowerText.includes("hospitals are overwhelmed")
  ) {
    return mockResults.misleading;
  }

  if (
    lowerText.includes("might") ||
    lowerText.includes("maybe") ||
    lowerText.includes("unconfirmed")
  ) {
    return mockResults.uncertain;
  }

  return mockResults.accurate;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showHowToUse, setShowHowToUse] = useState(false);

  const handleAnalyze = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const mockResult = getMockResultFromText(message);
    setResult(mockResult);
    setLoading(false);
  };

  const handleBack = () => {
    setResult(null);
    setLoading(false);
    setShowHowToUse(false);
  };

  const showResultsView = loading || result;

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

                {loading ? (
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

                    <SignalsCard
                      signals={result.signals}
                      explanation={result.explanation}
                    />

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <EvidenceCard
                        evidenceStrength={result.evidenceStrength}
                        evidenceSummary={result.evidenceSummary}
                      />
                      <UncertaintyCard
                        uncertainties={result.uncertainties}
                        missingContext={result.missingContext}
                      />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <ContextCard
                        detectedLanguages={result.detectedLanguages}
                        simplifiedSummary={result.simplifiedSummary}
                        localContext={result.localContext}
                      />
                      <ActionsCard
                        recommendedActions={result.recommendedActions}
                      />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <SourcesCard sources={result.sources} />
                      <ViralityCard
                        viralityRisk={result.viralityRisk}
                        viralityReasons={result.viralityReasons}
                      />
                    </div>
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