import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectModulesBySlug } from '../site/lib/projects';

export default function Home() {
  const prefersReduced = useReducedMotion();
  
  // Featured projects: fuelfed, resume-maker, ute-pass-vacation-rentals
  const featuredProjects = [
    projectModulesBySlug['fuelfed-motor-market'],
    projectModulesBySlug['resume-maker'],
    projectModulesBySlug['ute-pass-vacation-rentals']
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <motion.section
        initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
        animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid gap-8 sm:grid-cols-2 items-center"
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Engineering the creative edge</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            M.S. in Engineering – Creative Technology & Design (CU Boulder, ATLAS). I pair systems thinking with
            hands‑on prototyping to ship fast, accessible products.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/projects" className="rounded-2xl bg-blue-700 text-white px-5 py-3 shadow-soft">View Projects</Link>
            <Link to="/contact" className="rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-3">Contact</Link>
            <Link to="/resume" className="rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-3">Download Resume</Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img 
            src="/home.jpeg" 
            alt="Atreyu Sutton" 
            className="rounded-2xl shadow-soft max-w-full h-auto"
          />
        </div>
      </motion.section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <h2 className="text-xl font-semibold">Featured projects</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((m: any) => (
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
      </section>
    </div>
  );
}


