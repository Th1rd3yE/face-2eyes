type EvidenceCardProps = {
  evidenceStrength: "Strong" | "Moderate" | "Weak";
  evidenceSummary: string;
};

function getEvidenceStyles(evidenceStrength: string) {
  switch (evidenceStrength) {
    case "Strong":
      return {
        wrapper: "border-emerald-200/80 bg-emerald-50/80",
        badge: "bg-emerald-100 text-emerald-700",
      };
    case "Moderate":
      return {
        wrapper: "border-amber-200/80 bg-amber-50/80",
        badge: "bg-amber-100 text-amber-700",
      };
    case "Weak":
    default:
      return {
        wrapper: "border-rose-200/80 bg-rose-50/80",
        badge: "bg-rose-100 text-rose-700",
      };
  }
}

export default function EvidenceCard({
  evidenceStrength,
  evidenceSummary,
}: EvidenceCardProps) {
  const styles = getEvidenceStyles(evidenceStrength);

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${styles.wrapper}`}>
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-xl font-semibold tracking-tight text-[#24324a]">
          Evidence Strength
        </h4>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}
        >
          {evidenceStrength}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[#42526b] sm:text-base">
        {evidenceSummary}
      </p>
    </div>
  );
}