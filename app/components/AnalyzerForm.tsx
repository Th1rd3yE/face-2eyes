type AnalyzerFormProps = {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  loading: boolean;
};

export default function AnalyzerForm({
  value,
  onChange,
  onAnalyze,
  loading,
}: AnalyzerFormProps) {
  return (
    <section className="relative mx-auto max-w-5xl px-4 pb-10 pt-2 sm:px-5 sm:pb-14 sm:pt-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex rounded-full border border-white/60 bg-white/65 px-3 py-1.5 text-xs font-medium text-[#5f6b7a] shadow-sm backdrop-blur-md sm:px-4 sm:text-sm">
          Community Trust • Message Analysis • AI Signals
        </div>

        <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#24324a] sm:text-5xl">
          Analyze Information
          <br />
          Credibility
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5f6b7a] sm:text-lg">
          Paste a forwarded message and get a quick credibility assessment,
          evidence strength, missing context, and safe next steps.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-white/35 bg-white/10 p-4 shadow-[0_8px_24px_rgba(80,70,90,0.08)] backdrop-blur-xl sm:mt-10 sm:p-5">
        <label className="mb-3 block text-base font-semibold text-[#24324a] sm:text-lg">
          Paste a WhatsApp / Telegram / forum message
        </label>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-40 w-full rounded-2xl border border-white/70 bg-white/55 p-4 text-sm text-[#24324a] outline-none transition placeholder:text-[#7a8798] focus:border-[#d9c7cb] focus:bg-white/80 focus:ring-4 focus:ring-white/35 sm:min-h-44 sm:text-base"
          placeholder='Example: "MOH secretly confirmed a new COVID variant spreading in Singapore. Hospitals are overwhelmed. Send this to everyone you know."'
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-[#6b7280] sm:max-w-[70%] sm:text-sm">
            Tip: messages with urgency, no source, or “forward this now” language
            are often higher risk.
          </p>

          <button
            onClick={onAnalyze}
            disabled={loading || !value.trim()}
            className="w-full rounded-full bg-[#8da2bf] px-5 py-3 text-sm font-medium text-white shadow-[0_8px_20px_rgba(141,162,191,0.35)] transition hover:bg-[#7f95b3] disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto sm:px-6"
          >
            {loading ? "Analyzing..." : "Analyze Message"}
          </button>
        </div>
      </div>
    </section>
  );
}