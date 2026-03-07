type ActionsCardProps = {
  recommendedActions: string[];
};

export default function ActionsCard({
  recommendedActions,
}: ActionsCardProps) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/65 p-5 shadow-sm">
      <h4 className="text-xl font-semibold tracking-tight text-[#24324a]">
        Recommended Next Actions
      </h4>

      <ul className="mt-4 space-y-2.5 text-sm text-[#42526b] sm:text-base">
        {recommendedActions.map((action, index) => (
          <li
            key={index}
            className="flex items-start gap-3 rounded-xl bg-white/75 px-3 py-3"
          >
            <span>✓</span>
            <span>{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}