import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      // Unified gutters so every `container mx-auto` across the site
      // matches the nav / hero / footer edges exactly.
      padding: {
        DEFAULT: "1.5rem", // px-6 on mobile
        lg: "2rem",        // px-8 from lg+
      },
      // Pin container to a single 1600px cap at every breakpoint so
      // it behaves like max-w-[1600px] instead of stepping through
      // the smaller Tailwind defaults.
      screens: {
        sm: "1600px",
        md: "1600px",
        lg: "1600px",
        xl: "1600px",
        "2xl": "1600px",
      },
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
    },
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        outfit: ["Rubik", "sans-serif"],
        sans: ["Rubik", "sans-serif"],
        display: ["Lora", "Rubik", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        purple: {
          900: "hsl(var(--purple-900))",
          700: "hsl(var(--purple-700))",
          500: "hsl(var(--purple-500))",
          400: "hsl(var(--purple-400))",
          300: "hsl(var(--purple-300))",
          200: "hsl(var(--purple-200))",
          100: "hsl(var(--purple-100))",
        },
        violet: {
          600: "hsl(var(--violet-600))",
          500: "hsl(var(--violet-500))",
          400: "hsl(var(--violet-400))",
          300: "hsl(var(--violet-300))",
        },
        slate: {
          900: "hsl(var(--slate-900))",
          700: "hsl(var(--slate-700))",
          500: "hsl(var(--slate-500))",
          300: "hsl(var(--slate-300))",
          100: "hsl(var(--slate-100))",
        },
        gold: {
          600: "hsl(var(--gold-600))",
          500: "hsl(var(--gold-500))",
          400: "hsl(var(--gold-400))",
          300: "hsl(var(--gold-300))",
        },
        navy: {
          900: "hsl(var(--navy-900))",
          800: "hsl(var(--navy-800))",
          700: "hsl(var(--navy-700))",
          600: "hsl(var(--navy-600))",
          500: "hsl(var(--navy-500))",
          400: "hsl(var(--navy-400))",
          300: "hsl(var(--navy-300))",
          200: "hsl(var(--navy-200))",
          100: "hsl(var(--navy-100))",
        },
        lavender: {
          700: "hsl(var(--lavender-700))",
          600: "hsl(var(--lavender-600))",
          500: "hsl(var(--lavender-500))",
          400: "hsl(var(--lavender-400))",
          300: "hsl(var(--lavender-300))",
          200: "hsl(var(--lavender-200))",
          100: "hsl(var(--lavender-100))",
        },
        coral: {
          600: "hsl(var(--coral-600))",
          500: "hsl(var(--coral-500))",
          400: "hsl(var(--coral-400))",
          300: "hsl(var(--coral-300))",
          200: "hsl(var(--coral-200))",
          100: "hsl(var(--coral-100))",
        },
        blush: {
          500: "hsl(var(--blush-500))",
          400: "hsl(var(--blush-400))",
          300: "hsl(var(--blush-300))",
        },
        teal: {
          600: "hsl(var(--teal-600))",
          500: "hsl(var(--teal-500))",
          400: "hsl(var(--teal-400))",
          300: "hsl(var(--teal-300))",
          100: "hsl(var(--teal-100))",
        },
        cyan: {
          600: "hsl(var(--cyan-600))",
          500: "hsl(var(--cyan-500))",
          400: "hsl(var(--cyan-400))",
        },
        blue: {
          50: "hsl(var(--blue-50))",
          100: "hsl(var(--blue-100))",
          200: "hsl(var(--blue-200))",
          300: "hsl(var(--blue-300))",
          400: "hsl(var(--blue-400))",
          500: "hsl(var(--blue-500))",
          600: "hsl(var(--blue-600))",
          700: "hsl(var(--blue-700))",
          800: "hsl(var(--blue-800))",
          900: "hsl(var(--blue-900))",
          950: "hsl(var(--blue-950))",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
      },
      zIndex: {
        navigation: "100",
        fab: "90",
        toast: "85",
        "modal-overlay": "80",
        "modal-content": "81",
        drawer: "75",
        dropdown: "70",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.98)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
        "accordion-up": "accordion-up 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
        "fade-in": "fade-in 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
        "slide-up": "slide-up 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
        "scale-in": "scale-in 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
        marquee: "marquee 30s linear infinite",
      },
      boxShadow: {
        xs: "none",
        sm: "none",
        md: "none",
        lg: "none",
        xl: "none",
        none: "none",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
