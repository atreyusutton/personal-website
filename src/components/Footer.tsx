export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 dark:border-slate-800 py-8 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Atreyu Sutton</p>
        <p>Built with React, Vite, Tailwind</p>
      </div>
    </footer>
  );
}


