type UncertaintyCardProps = {
  uncertainties: string[];
  missingContext: string[];
};

export default function UncertaintyCard({
  uncertainties,
  missingContext,
}: UncertaintyCardProps) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/65 p-5 shadow-sm">
      <h4 className="text-xl font-semibold tracking-tight text-[#24324a]">
        What Is Still Unclear
      </h4>

      <ul className="mt-4 space-y-2.5 text-sm text-[#42526b] sm:text-base">
        {uncertainties.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-xl bg-white/75 px-3 py-3"
          >
            <span>?</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h5 className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        Missing Context
      </h5>

      <ul className="mt-3 space-y-2.5 text-sm text-[#42526b] sm:text-base">
        {missingContext.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-xl bg-white/75 px-3 py-3"
          >
            <span>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}