type Source = {
  title: string;
  description: string;
  url: string;
};

type SourcesCardProps = {
  sources: Source[];
};

export default function SourcesCard({ sources }: SourcesCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <h4 className="text-2xl font-semibold">Relevant Sources</h4>

      <div className="mt-4 space-y-4">
        {sources.map((source, index) => (
          <div key={index} className="rounded-xl border border-slate-200 p-4">
            <p className="font-semibold">{source.title}</p>
            <p className="mt-1 text-sm text-slate-600">
              {source.description}
            </p>
            <a
              href={source.url}
              className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}