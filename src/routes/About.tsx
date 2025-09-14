import Timeline from '../components/Timeline';
import Badge from '../components/Badge';

export default function About() {
  const education = [
    {
      date: 'Aug 2025 – May 2027',
      title: 'M.S. Engineering — Creative Technology & Design',
      org: 'University of Colorado Boulder (ATLAS Institute)',
      location: 'Boulder, CO',
    },
    {
      date: 'Aug 2020 – May 2023',
      title: 'B.A. Computer Science — 4.0 GPA',
      org: 'Rollins College',
      location: 'Winter Park, FL',
    },
    {
      date: 'Aug 2022 – Dec 2022',
      title: 'Object Oriented Programming',
      org: 'University of Central Florida',
      location: 'Orlando, FL',
    },
    {
      date: 'May 2022 – Aug 2022',
      title: 'Software Development',
      org: 'University of Colorado Boulder',
      location: 'Boulder, CO',
    },
    {
      date: 'May 2021 – Jun 2021',
      title: 'Driving School',
      org: 'Radford Racing',
    },
    {
      date: 'Jun 2019 – Aug 2019',
      title: 'Industrial Design Sketching & Rendering',
      org: 'Rhode Island School of Design',
      location: 'Providence, RI',
    },
    {
      date: 'Aug 2019 – Dec 2019',
      title: 'Sustainable Engineering & Architecture',
      org: 'University of Massachusetts Amherst',
      location: 'Amherst, MA',
    },
    {
      date: 'May 2018 – Aug 2018',
      title: 'Economics',
      org: 'Brown University',
      location: 'Providence, RI',
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        I’m a creative technologist who ships. I pair an engineer’s systems mindset with a designer’s sensitivity to
        interaction, accessibility, and craft. My background spans product strategy, full‑stack web, and hands‑on
        prototyping — from image pipelines and dashboards to physical builds and design research.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {['JavaScript','TypeScript','React','Node.js','Python','SQL','Git','AWS','UI/UX','Figma','Adobe CC','Photography','CAD','3D Modeling','Sustainable Design','Project Management'].map(s => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="mt-4">
          <Timeline
            items={[
              {
                date: 'Jan 2023 – Present',
                title: 'Founder & Lead Developer',
                org: 'Sutton Web Solutions',
                location: 'Boulder, CO',
                bullets: [
                  'Developed custom web applications for FuelFed automotive marketplace',
                  'Built vacation rental management system for Ute Pass Vacation Rentals',
                  'Created real estate collaboration platform for The Real Estate Collaborative',
                  'Designed and implemented Nest Messages communication platform',
                ],
              },
              {
                date: 'Jun 2022 – Dec 2022',
                title: 'Video/Photography Technician',
                org: 'Film Gear South Africa',
                location: 'Cape Town, South Africa',
                bullets: [
                  'Managed technical equipment for film and photography productions',
                  'Collaborated with international production teams on commercial projects',
                ],
              },
              {
                date: 'May 2021 – Aug 2021',
                title: 'Sustainable Engineer',
                org: 'Yestermorrow',
                location: 'Waitsfield, VT',
                bullets: [
                  'Designed and implemented sustainable building solutions',
                  'Taught sustainable engineering principles to students',
                ],
              },
            ] as any}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Education</h2>
        <div className="mt-4">
          <Timeline items={education as any} />
        </div>
      </section>
    </div>
  );
}


