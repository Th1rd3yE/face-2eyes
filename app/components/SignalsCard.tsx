type SignalsCardProps = {
  signals: string[];
  explanation: string;
};

export default function SignalsCard({
  signals,
  explanation,
}: SignalsCardProps) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border border-slate-200 p-5">
        <h4 className="text-2xl font-semibold">Key Signals Detected</h4>
        <ul className="mt-4 space-y-3 text-slate-700">
          {signals.map((signal, index) => (
            <li key={index}>⚠ {signal}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-200 p-5">
        <h4 className="text-2xl font-semibold">Explanation</h4>
        <p className="mt-4 leading-7 text-slate-700">{explanation}</p>
      </div>
    </div>
  );
}