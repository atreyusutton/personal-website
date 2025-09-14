import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-[#0b1220]/70 border-b border-slate-200/70 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">
            <span className="text-slate-900 dark:text-slate-100">Atreyu Sutton</span>
          </Link>
          <nav className="flex items-center gap-6">
            <NavLink to="/projects" className={({ isActive }: { isActive: boolean }) => isActive ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'}>Projects</NavLink>
            <NavLink to="/about" className={({ isActive }: { isActive: boolean }) => isActive ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }: { isActive: boolean }) => isActive ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'}>Contact</NavLink>
            <NavLink to="/resume" className={({ isActive }: { isActive: boolean }) => isActive ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'}>Resume</NavLink>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}


