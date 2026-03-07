"use client";

import { useState } from "react";
import AnalyzerForm from "./components/AnalyzerForm";
import CredibilityCard from "./components/CredibilityCard";
import SignalsCard from "./components/SignalsCard";
import SourcesCard from "./components/SourcesCard";
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
  };

  const showResultsView = loading || result;

  if (showResultsView) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">ThirdEye</h1>
              <p className="text-sm text-slate-500">
                See beyond misinformation
              </p>
            </div>

            <button
              onClick={handleBack}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              ← Back
            </button>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Results
            </p>
            <h3 className="mt-2 text-3xl font-bold">Credibility Assessment</h3>

            {loading ? (
              <div className="mt-6 space-y-6">
                <p className="text-slate-500">
                  Analyzing message credibility...
                </p>

                <Skeleton className="h-20 w-full rounded-xl" />

                <div className="grid gap-6 md:grid-cols-2">
                  <Skeleton className="h-40 w-full rounded-xl" />
                  <Skeleton className="h-40 w-full rounded-xl" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-48 w-full rounded-xl" />
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

                <div className="mt-6 grid gap-6 md:grid-cols-2">
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
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">ThirdEye</h1>
            <p className="text-sm text-slate-500">
              See beyond misinformation
            </p>
          </div>

          <nav className="flex gap-6 text-sm text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900">
              How it works
            </a>
          </nav>
        </div>
      </header>

      <AnalyzerForm
        value={message}
        onChange={setMessage}
        onAnalyze={handleAnalyze}
        loading={loading}
      />
    </main>
  );
}