import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectModules } from '../site/lib/projects';

type Category = 'all' | 'work' | 'personal';

export default function Projects() {
  const [category, setCategory] = useState<Category>('all');
  const projects = useMemo(() => Object.values(projectModules) as any[], []);
  const filtered = projects.filter((m: any) => category === 'all' ? true : m.frontmatter?.category === category);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3">
        <FilterButton label="All" active={category === 'all'} onClick={() => setCategory('all')} />
        <FilterButton label="Work" active={category === 'work'} onClick={() => setCategory('work')} />
        <FilterButton label="Personal" active={category === 'personal'} onClick={() => setCategory('personal')} />
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m: any) => (
          <Link key={m.frontmatter.slug} to={`/projects/${m.frontmatter.slug}`} className="block rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-soft transition">
            {m.frontmatter.cover ? (
              <img 
                src={m.frontmatter.cover} 
                alt={m.frontmatter.title}
                className="aspect-video object-cover w-full"
              />
            ) : (
              <div className="aspect-video bg-slate-100 dark:bg-slate-800" />
            )}
            <div className="p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">{m.frontmatter.category}</div>
              <h3 className="mt-1 font-semibold">{m.frontmatter.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{m.frontmatter.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm border ${active ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'border-slate-300 dark:border-slate-700'}`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}


