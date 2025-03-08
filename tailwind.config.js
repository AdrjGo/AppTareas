/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#103347",
        "light-green": "#3ac867",
        "gray-common": "#1c1c1e",
        border: "hsl(var(--border, 0 0% 90%))",
        input: "hsl(var(--input, 0 0% 95%))",
        ring: "hsl(var(--ring, 210 100% 40%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 0 0% 0%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 220 90% 55%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 260 70% 50%))",
          foreground: "hsl(var(--secondary-foreground, 0 0% 100%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 80% 50%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 240 10% 90%))",
          foreground: "hsl(var(--muted-foreground, 240 5% 30%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 180 70% 50%))",
          foreground: "hsl(var(--accent-foreground, 0 0% 100%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 100%))",
          foreground: "hsl(var(--popover-foreground, 0 0% 0%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 98%))",
          foreground: "hsl(var(--card-foreground, 0 0% 10%))",
        },
      },
      borderRadius: {
        lg: "var(--radius, 12px)",
        md: "calc(var(--radius, 12px) - 2px)",
        sm: "calc(var(--radius, 12px) - 4px)",
      },
    },
  },
  plugins: [],
};
