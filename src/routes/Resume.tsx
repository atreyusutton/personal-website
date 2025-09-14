export default function Resume() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">Resume</h1>
      <p className="mt-4">Download a PDF copy below.</p>
      <div className="mt-6">
        <a
          href="/Atreyu_Sutton_Resume.pdf"
          download
          className="rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}


