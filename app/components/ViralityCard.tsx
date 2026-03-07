type ViralityCardProps = {
  viralityRisk: string;
  viralityReasons: string[];
};

function getViralityStyles(viralityRisk: string) {
  switch (viralityRisk) {
    case "Low":
      return {
        box: "border-green-200 bg-green-50",
        text: "text-green-700",
      };
    case "Medium":
      return {
        box: "border-amber-200 bg-amber-50",
        text: "text-amber-700",
      };
    case "High":
    default:
      return {
        box: "border-red-200 bg-red-50",
        text: "text-red-700",
      };
  }
}

export default function ViralityCard({
  viralityRisk,
  viralityReasons,
}: ViralityCardProps) {
  const styles = getViralityStyles(viralityRisk);

  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <h4 className="text-2xl font-semibold">Virality Risk</h4>

      <div className={`mt-4 rounded-xl border p-4 ${styles.box}`}>
        <p className={`text-lg font-semibold ${styles.text}`}>{viralityRisk}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          {viralityReasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}