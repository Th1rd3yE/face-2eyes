type SignalsCardProps = {
  signals: string[];
  explanation: string;
};

export default function SignalsCard({
  signals,
  explanation,
}: SignalsCardProps) {
  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-white/60 bg-white/65 p-5 shadow-sm">
        <h4 className="text-xl font-semibold tracking-tight text-[#24324a]">
          Key Signals Detected
        </h4>

        <ul className="mt-4 space-y-2.5 text-sm text-[#42526b] sm:text-base">
          {signals.map((signal, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-xl bg-white/75 px-3 py-3"
            >
              <span className="mt-0.5">⚠️</span>
              <span>{signal}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-white/60 bg-white/65 p-5 shadow-sm">
        <h4 className="text-xl font-semibold tracking-tight text-[#24324a]">
          Explanation
        </h4>
        <p className="mt-4 text-sm leading-7 text-[#42526b] sm:text-base">
          {explanation}
        </p>
      </div>
    </div>
  );
}