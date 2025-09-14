export default function Contact() {
  const email = 'me@atreyusutton.com';
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Prefer email? Reach me at <a href={`mailto:${email}`} className="underline">{email}</a>.
      </p>
      <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        <a className="underline mr-4" href="https://suttonwebsolutions.com" target="_blank" rel="noreferrer">Sutton Web Solutions</a>
        <a className="underline mr-4" href="https://github.com/atreyusutton" target="_blank" rel="noreferrer">GitHub</a>
        <a className="underline" href="https://www.linkedin.com/in/atreyusutton" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <form className="mt-6 grid gap-4" onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const subject = encodeURIComponent('Portfolio Inquiry');
        const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }}>
        <label className="grid gap-1">
          <span className="text-sm">Name</span>
          <input name="name" required className="rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <input type="email" name="email" required className="rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Message</span>
          <textarea name="message" rows={6} required className="rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900" />
        </label>
        <div className="flex gap-3">
          <button type="submit" className="rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3">Send via Email</button>
          <a href={`mailto:${email}`} className="rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-3">Open Mail</a>
        </div>
      </form>

      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Atreyu Sutton — Creative Technologist',
          url: 'https://atreyusutton.com',
          sameAs: [
            'https://suttonwebsolutions.com',
            'https://github.com/atreyusutton',
            'https://www.linkedin.com/in/atreyusutton',
          ],
        })}
      </script>
    </div>
  );
}


