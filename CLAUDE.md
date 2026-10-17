# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Commands

```bash
npm run dev        # start Vite dev server
npm run build      # tsc -b && vite build  (what Vercel runs)
npm run typecheck  # type-check without emitting
npm run lint       # ESLint
npm run preview    # preview production build locally
```

There are no tests. `npm run build` is the gate — it runs `tsc -b` first and fails fast on any type error.

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS v3 + Framer Motion + React Router v6.

**Path alias:** `@/` maps to `src/`. Used everywhere instead of relative paths.

### Routing & shell

All routes are wrapped in `PageShell` (`src/components/layout/PageShell.tsx`), which renders `<Navbar>`, `<ScrollManager>`, `<main><Outlet /></main>`, and `<Footer>`. Every page is lazy-loaded via `React.lazy`.

`ScrollManager` handles two things: scroll-to-top on route change and smooth hash-anchor scrolling (retries up to 30 rAF frames for lazily rendered anchors).

### Nav tone system

Sections declare `data-nav-tone="dark"` or `data-nav-tone="light"` on their root element. `useNavTone` (`src/hooks/useNavTone.ts`) samples `document.elementFromPoint` at the navbar's Y position on every scroll/resize/DOM mutation and returns the closest ancestor's tone. The Navbar uses this to switch text/icon colours without any prop threading.

### Project data flow

Two separate data files power the `/work/:projectId` page:

- `src/data/projects.ts` — `workProjects: Project[]` — card-level data (id, name, brandColor, thumbnail image, category). The `id` field is the URL slug.
- `src/data/projectDetails.ts` — `projectDetails: Record<string, ProjectDetail>` — detail-page data (gallery images, collaboration text, problemDefinition, industry, services, website).

`ProjectDetail.tsx` joins them by `projectId` param. If either lookup fails, it redirects to `/work`.

**Image loading in `projectDetails.ts`:** Gallery images for each project live in `src/assets/images/<project-id>/` as SVG or webp files named `01`, `02`, … They are loaded via a single `import.meta.glob('../assets/images/*/*', { eager: true, query: '?url' })` and keyed as `"<folder>/<filename-without-extension>"`. Add new gallery images by dropping files into the subfolder — the glob picks them up automatically.

**Horizontal scroll strip:** A `string[]` nested inside the `images` array triggers `HorizontalScrollGroup` in `ProjectGallery.tsx`. It uses Framer Motion `useScroll` + `useTransform` on a tall outer wrapper with a sticky inner container, converting vertical scroll to horizontal card translation. Cards are `75vw` wide (matching Figma's 1080/1440 proportion), gap `1.5vw`. Outer height = `90vh + (N-1) × 80vh` for N sub-images. Only scapia uses this currently; its carousel sub-images are named `04-01` through `04-06`.

### Tailwind conventions

Custom tokens are in `tailwind.config.ts`:
- **Colours:** `paper` (#fff), `ink` (#111), `accent` (#39d353), `muted`, `surface`, `line`
- **Font:** `font-display` → Funnel Display (loaded via `@fontsource`)
- **Font sizes:** custom named scale (`display-1` … `display-5`, `eyebrow`, `body-lg`, `body`, `label`, `nav`, `caption`)
- **Max-widths:** `max-w-site` (1440px), `max-w-content` (1300px)
- **Spacing:** `px-gutter` (80px), `px-gutter-sm` (70px)

Pixel-perfect Figma values use Tailwind arbitrary values: `text-[32px]`, `pt-[37px]`, `text-[#e63636]`, etc.

### Figma integration

Designs live at `https://www.figma.com/design/0ZUWKPCbR2zSHoiaAwVj80/PixelPandas-website`. Use the Figma MCP tools (`use_figma`, `get_screenshot`) to inspect node properties when implementing pixel-perfect sections. Always load the `figma:figma-use` skill before calling `use_figma`.
