**How this dashboard was built**

**Overview**

- **Goal:**: Build a lightweight, maintainable dashboard that visualizes infrastructure cost and state data.
- **Approach:**: Iterative component-first development using Next.js (App Router) + TypeScript, with small focused hooks for data fetching and a transform layer to normalize incoming data.

**Tech Stack**

- **Framework:**: Next.js (App Router) with React and TypeScript
- **Package manager:**: pnpm
- **Styling:**: global CSS with a tokens file for design tokens ([tokens/tokens.ts](tokens/tokens.ts))
- **State & data fetching:**: local React state hooks and custom hooks in [hooks](hooks) (`useDashboardState`, `useInfrastructureData`)
- **Components:**: modular React components under [components](components) (e.g. [BarChart.tsx](components/BarChart.tsx), [States.tsx](components/States.tsx))
- **Utilities:**: transform functions in [lib/transform.ts](lib/transform.ts) and types in [types/dashboard.ts](types/dashboard.ts)

**Step-by-step build log**

1. **Project scaffold:**

- **Create project:**: Started from `create-next-app` (App Router) and converted to TypeScript.
- **Organize folders:**: Keep UI in `components/`, hooks in `hooks/`, utilities in `lib/`, and types in `types/`.

2. **Design tokens & global styles:**

- **Why:**: Centralize spacing, colors, and typography to keep components consistent.
- **Where:**: [tokens/tokens.ts](tokens/tokens.ts) and `app/globals.css`.

3. **Data model & transforms:**

- **Define types:**: Add domain types in [types/dashboard.ts](types/dashboard.ts) to keep components strongly typed.
- **Transform raw data:**: Create `lib/transform.ts` to normalize third-party or API data into our UI model before rendering.

4. **Data fetching & state:**

- **Custom hooks:**: Implement `hooks/useInfrastructureData.ts` to fetch and memoize data, and `hooks/useDashboardState.ts` to manage UI filters and selection.
- **Reasoning:**: Keeps components pure and makes side-effects testable and reusable.

5. **Component development:**

- **Small, focused components:**: Build `components/SummaryCards.tsx`, `components/BarChart.tsx`, `components/CostTable.tsx`, `components/States.tsx`, etc., each with a single responsibility.
- **Composition:**: Compose the dashboard in `app/page.tsx` (page entry) and `components/DashboardHeader.tsx` for controls and selectors.

6. **Visualization decisions:**

- **Custom chart vs. library:**: Prefer simple, accessible SVG-based components for basic charts (see `BarChart.tsx`) to avoid heavy dependencies.
- **Accessibility & responsiveness:**: Ensure charts and tables have sensible ARIA attributes and scale for narrow viewports.

7. **Testing & iteration:**

- **Manual verification:**: Run the app locally and iterate UI states, verify transforms, and adjust hooks for performance.
- **Developer tools:**: Use lightweight debugging and query devtools (project includes React Query devtools if used) to inspect data flow.

8. **Run locally**

- **Install dependencies:**: `pnpm install`
- **Start dev server:**: `pnpm dev`
- **Open:**: http://localhost:3000

**Key files & what they do**

- **`app/page.tsx`**: Entrypoint that assembles the dashboard and wires hooks to components. See [app/page.tsx](app/page.tsx).
- **`components/`**: Reusable UI building blocks (charts, tables, header, selectors). See [components](components).
- **`hooks/useInfrastructureData.ts`**: Fetching, caching, and shaping of backend data. See [hooks/useInfrastructureData.ts](hooks/useInfrastructureData.ts).
- **`hooks/useDashboardState.ts`**: Local UI state and filter management. See [hooks/useDashboardState.ts](hooks/useDashboardState.ts).
- **`lib/transform.ts`**: Data normalization and aggregation logic used by components. See [lib/transform.ts](lib/transform.ts).
- **`types/dashboard.ts`**: Domain types and interfaces used across the app. See [types/dashboard.ts](types/dashboard.ts).

**Decisions & trade-offs**

- **Simplicity over feature-completeness:**: Focus on clear data flow, predictable rendering, and small components to keep maintenance easy.
- **Minimal dependencies:**: Avoid large charting libraries unless complex visualizations are required.
- **Client-side rendering:**: App Router + React components render client-side parts that need interactivity; server components can be introduced later for heavy initial loads.

**Next steps / improvements**

- **Add unit tests**: Component and transform tests to lock behavior.
- **Performance**: Lazy-load large components, memoize transforms, and add virtualization for long tables.
- **Accessibility audit**: Run an a11y pass and fix issues in charts/tables.

**Acknowledgements**

- Built with Next.js, React and TypeScript; structured to be easy to extend and maintain.
