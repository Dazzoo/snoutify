import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Border colors
        border: "hsl(var(--border-default))",
        "border-light": "hsl(var(--border-light))",
        "border-medium": "hsl(var(--border-medium))",
        "border-dark": "hsl(var(--border-dark))",
        
        // Interactive elements
        input: "hsl(var(--input-bg))",
        "input-focus": "hsl(var(--input-focus))",
        "input-focus-ring": "hsl(var(--input-focus-ring))",
        "input-placeholder": "hsl(var(--input-placeholder))",
        "select-bg": "hsl(var(--select-bg))",
        "select-border-open": "hsl(var(--select-border-open))",
        "dark-blue": "hsl(var(--dark-blue))",
        "normal-blue": "hsl(var(--normal-blue))",
        "dimmed-blue": "hsl(var(--dimmed-blue))",
        ring: "hsl(var(--ring))",
        
        // Semantic colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        // UI components
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "default": ["14px", "100%"],
        "h1": ["25px", "100%"],
      },
      fontWeight: {
        "default": "400",
        "h1": "600",
      },
      letterSpacing: {
        "default": "0%",
        "h1": "-3%",
      },
    },
  },
  plugins: [],
} satisfies Config;
