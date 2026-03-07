type Source = {
  title: string;
  description: string;
  url: string;
  type: "Official" | "Verified" | "News" | "Community";
};

type SourcesCardProps = {
  sources: Source[];
};

function getSourceTypeStyles(type: Source["type"]) {
  switch (type) {
    case "Official":
      return "bg-emerald-100 text-emerald-700";
    case "Verified":
      return "bg-blue-100 text-blue-700";
    case "News":
      return "bg-amber-100 text-amber-700";
    case "Community":
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function SourcesCard({ sources }: SourcesCardProps) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/65 p-5 shadow-sm">
      <h4 className="text-xl font-semibold tracking-tight text-[#24324a]">
        Relevant Sources
      </h4>

      <div className="mt-4 space-y-3">
        {sources.map((source, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/60 bg-white/75 p-4 transition hover:bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-[#24324a]">{source.title}</p>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getSourceTypeStyles(
                  source.type
                )}`}
              >
                {source.type}
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-[#5f6b7a]">
              {source.description}
            </p>

            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium text-[#64748b] hover:underline"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}