// Eagerly import all project MDX modules
export const projectModules = import.meta.glob('/src/content/projects/**/*.mdx', { eager: true });

type ProjectModule = {
  default: any;
  frontmatter?: {
    category: 'work' | 'personal';
    slug: string;
    title: string;
    role?: string[];
    stack?: string[];
    summary?: string;
    links?: { live?: string; repo?: string };
    cover?: string;
    images?: string[];
  };
};

export const projectModulesBySlug: Record<string, ProjectModule> = Object.values(projectModules).reduce(
  (acc: Record<string, ProjectModule>, mod: any) => {
    const m = mod as ProjectModule;
    const slug = m.frontmatter?.slug;
    if (slug) acc[slug] = m;
    return acc;
  },
  {}
);


