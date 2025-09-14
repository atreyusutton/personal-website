import { useParams, Link } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { projectModulesBySlug } from '../site/lib/projects';

const mdxComponents = {};

export default function ProjectDetail() {
  const { slug } = useParams();
  const mod = slug ? projectModulesBySlug[slug] : undefined;

  if (!mod) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <p>Project not found.</p>
        <Link to="/projects" className="underline">Back to projects</Link>
      </div>
    );
  }

  const MdxContent = (mod as any).default;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <MDXProvider components={mdxComponents}>
        <MdxContent />
      </MDXProvider>
    </div>
  );
}


