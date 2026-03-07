type CredibilityCardProps = {
  classification: string;
  confidence: number;
};

function getStatusStyles(classification: string) {
  switch (classification) {
    case "Likely Accurate":
      return {
        wrapper: "border-green-200 bg-green-50",
        badge: "bg-green-100 text-green-700",
        barBg: "bg-green-100",
        barFill: "bg-green-500",
      };
    case "Uncertain":
      return {
        wrapper: "border-amber-200 bg-amber-50",
        badge: "bg-amber-100 text-amber-700",
        barBg: "bg-amber-100",
        barFill: "bg-amber-500",
      };
    case "Potentially Misleading":
    default:
      return {
        wrapper: "border-red-200 bg-red-50",
        badge: "bg-red-100 text-red-700",
        barBg: "bg-red-100",
        barFill: "bg-red-500",
      };
  }
}

export default function CredibilityCard({
  classification,
  confidence,
}: CredibilityCardProps) {
  const styles = getStatusStyles(classification);

  return (
    <div className={`rounded-xl border p-4 ${styles.wrapper}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}
          >
            {classification}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">
            Confidence: {confidence}%
          </span>
          <div className={`h-2 w-32 rounded-full ${styles.barBg}`}>
            <div
              className={`h-2 rounded-full ${styles.barFill}`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}