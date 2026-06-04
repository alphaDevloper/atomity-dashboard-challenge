export const tokens = {
  colors: {
    bg: "#f8f7f4",
    surface: "#ffffff",
    surface2: "#f2f1ee",
    border: "#e4e2dd",
    borderStrong: "#d0cec8",
    text: "#1a1916",
    text2: "#6b6861",
    text3: "#9d9b96",
    accent: "#22c55e",
    accentSoft: "#dcfce7",
    accentDark: "#15803d",
    amber: "#f59e0b",
    amberSoft: "#fef3c7",
    blue: "#3b82f6",
    blueSoft: "#dbeafe",
    red: "#ef4444",
    redSoft: "#fee2e2",
    purple: "#8b5cf6",
    purpleSoft: "#ede9fe",
    // Per-item palette (pods / namespaces)
    series: ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6"] as const,
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "48px",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    xl: "20px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,.06)",
    md: "0 4px 12px rgba(0,0,0,.08)",
    lg: "0 8px 24px rgba(0,0,0,.1)",
  },
  easing: {
    spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
} as const;

/** CSS custom properties injected once at root */
export const cssVars = `
  :root {
    --c-bg: ${tokens.colors.bg};
    --c-surface: ${tokens.colors.surface};
    --c-surface-2: ${tokens.colors.surface2};
    --c-border: ${tokens.colors.border};
    --c-border-strong: ${tokens.colors.borderStrong};
    --c-text: ${tokens.colors.text};
    --c-text-2: ${tokens.colors.text2};
    --c-text-3: ${tokens.colors.text3};
    --c-accent: ${tokens.colors.accent};
    --c-accent-soft: ${tokens.colors.accentSoft};
    --c-accent-dark: ${tokens.colors.accentDark};
    --c-amber: ${tokens.colors.amber};
    --c-blue: ${tokens.colors.blue};
    --c-red: ${tokens.colors.red};
    --c-purple: ${tokens.colors.purple};
    --r-sm: ${tokens.radius.sm};
    --r-md: ${tokens.radius.md};
    --r-lg: ${tokens.radius.lg};
    --r-xl: ${tokens.radius.xl};
    --shadow-sm: ${tokens.shadows.sm};
    --shadow-md: ${tokens.shadows.md};
  }
`;
