type CredibilityCardProps = {
  classification: string;
  confidence: number;
};

function getStatusStyles(classification: string) {
  switch (classification) {
    case "Likely Accurate":
      return {
        wrapper: "border-emerald-200/80 bg-emerald-50/85",
        badge: "bg-emerald-100 text-emerald-700",
        barBg: "bg-emerald-100",
        barFill: "bg-emerald-500",
      };
    case "Uncertain":
      return {
        wrapper: "border-amber-200/80 bg-amber-50/85",
        badge: "bg-amber-100 text-amber-700",
        barBg: "bg-amber-100",
        barFill: "bg-amber-500",
      };
    case "Potentially Misleading":
    default:
      return {
        wrapper: "border-rose-200/80 bg-rose-50/85",
        badge: "bg-rose-100 text-rose-700",
        barBg: "bg-rose-100",
        barFill: "bg-rose-500",
      };
  }
}

export default function CredibilityCard({
  classification,
  confidence,
}: CredibilityCardProps) {
  const styles = getStatusStyles(classification);

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${styles.wrapper}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Overall Classification
          </p>
          <span
            className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${styles.badge}`}
          >
            {classification}
          </span>
        </div>

        <div className="w-full sm:w-[220px]">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">Confidence</span>
            <span className="font-semibold text-slate-800">{confidence}%</span>
          </div>

          <div className={`h-2.5 w-full rounded-full ${styles.barBg}`}>
            <div
              className={`h-2.5 rounded-full ${styles.barFill}`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}