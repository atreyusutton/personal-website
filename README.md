# Atreyu Sutton — Creative Technologist Portfolio

Static React site built with Vite + TypeScript, Tailwind CSS, Framer Motion, React Router, and MDX. Deployable to GitHub Pages (custom domain `atreyusutton.com`).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build to `dist/`
- `npm run preview` — preview production build

## Content

- Project MDX: `src/content/projects/` (see stubs)
- Resume PDF: place your file at `public/Atreyu_Sutton_Resume.pdf`

## GitHub Pages Deploy

1. Push to `main`. GitHub Pages serves from `/root` or `/docs` depending on repo settings. For custom domains, ensure `public/CNAME` contains `atreyusutton.com`.
2. Build locally and push `dist/` to `gh-pages` branch if using action; or enable Pages from `main` + build via workflow.
3. SPA fallback is handled by `404.html`.

## Cloudflare Pages / Netlify

- Cloudflare Pages: Build command `npm run build`, output directory `dist`
- Netlify: Build `npm run build`, publish `dist`. For forms, wire Formspree or Netlify Forms if migrating hosting.

## Accessibility & Performance

- Respects `prefers-reduced-motion`
- Lazy-load images (`loading="lazy"`)
- Target Lighthouse: Perf/Best/SEO ≥ 95, A11y ≥ 90

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](githttps://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
