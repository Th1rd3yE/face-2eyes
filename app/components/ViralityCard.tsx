type ViralityCardProps = {
  viralityRisk: string;
  viralityReasons: string[];
};

function getViralityStyles(viralityRisk: string) {
  switch (viralityRisk) {
    case "Low":
      return {
        box: "border-emerald-200/80 bg-emerald-50/85",
        text: "text-emerald-700",
      };
    case "Medium":
      return {
        box: "border-amber-200/80 bg-amber-50/85",
        text: "text-amber-700",
      };
    case "High":
    default:
      return {
        box: "border-rose-200/80 bg-rose-50/85",
        text: "text-rose-700",
      };
  }
}

export default function ViralityCard({
  viralityRisk,
  viralityReasons,
}: ViralityCardProps) {
  const styles = getViralityStyles(viralityRisk);

  return (
    <div className="rounded-2xl border border-white/60 bg-white/65 p-5 shadow-sm">
      <h4 className="text-xl font-semibold tracking-tight text-[#24324a]">
        Virality Risk
      </h4>

      <div className={`mt-4 rounded-2xl border p-4 ${styles.box}`}>
        <p className={`text-lg font-semibold ${styles.text}`}>{viralityRisk}</p>

        <ul className="mt-3 space-y-2 text-sm text-slate-700 sm:text-base">
          {viralityReasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-3">
              <span>•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}