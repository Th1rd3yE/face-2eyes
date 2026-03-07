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
    <section className="mx-auto max-w-4xl px-6 py-14 text-center">
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Analyze Information Credibility
      </h2>
      <p className="mt-4 text-lg text-slate-600">
        AI-powered credibility analysis for community messages
      </p>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
        <label className="mb-3 block text-lg font-semibold">
          Paste a WhatsApp / Telegram / forum message
        </label>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-40 w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder='Example: "MOH secretly confirmed a new COVID variant spreading in Singapore. Hospitals are overwhelmed. Send this to everyone you know."'
        />

        <div className="mt-5 flex justify-center">
          <button
            onClick={onAnalyze}
            disabled={loading || !value.trim()}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Analyzing..." : "Analyze Message"}
          </button>
        </div>
      </div>
    </section>
  );
}