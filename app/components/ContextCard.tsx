type ContextCardProps = {
  detectedLanguages: string[];
  simplifiedSummary: string;
  localContext: string;
};

export default function ContextCard({
  detectedLanguages,
  simplifiedSummary,
  localContext,
}: ContextCardProps) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/65 p-5 shadow-sm">
      <h4 className="text-xl font-semibold tracking-tight text-[#24324a]">
        Language & Local Context
      </h4>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Detected Language
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {detectedLanguages.map((language, index) => (
            <span
              key={index}
              className="rounded-full bg-[#edf1f6] px-3 py-1 text-sm font-medium text-[#42526b]"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Simplified Summary
        </p>
        <p className="mt-2 text-sm leading-7 text-[#42526b] sm:text-base">
          {simplifiedSummary}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Local Context
        </p>
        <p className="mt-2 text-sm leading-7 text-[#42526b] sm:text-base">
          {localContext}
        </p>
      </div>
    </div>
  );
}