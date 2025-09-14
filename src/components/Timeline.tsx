type TimelineItem = {
  date: string;
  title: string;
  org?: string;
  location?: string;
  description?: string;
  bullets?: string[];
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-slate-200 dark:border-slate-800">
      {items.map((item, idx) => (
        <li key={idx} className="grid grid-cols-[auto,1fr] gap-x-4 pb-6 last:pb-0">
          <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" aria-hidden />
          <div>
            <div className="text-sm text-slate-500">{item.date}</div>
            <div className="font-semibold mt-0.5">{item.title}{item.org ? ` — ${item.org}` : ''}</div>
            {item.location && <div className="text-sm text-slate-500">{item.location}</div>}
            {item.description && <p className="text-slate-600 dark:text-slate-300 mt-2">{item.description}</p>}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="mt-2 list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}


