/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#3A1078", // Deep cosmic purple
          50: "#F5F1FF",
          100: "#E4D9FF",
          200: "#C7B3FF",
          300: "#A98DFF",
          400: "#8C67FF",
          500: "#6E41FF",
          600: "#5A2DE6",
          700: "#4620C0",
          800: "#3A1078", // Our main primary
          900: "#2C0E5D",
        },
        secondary: {
          DEFAULT: "#4D96FF", // Vibrant cosmic blue
          50: "#EFF8FF",
          100: "#DEF1FF",
          200: "#B6E5FF",
          300: "#8CD5FF",
          400: "#62C3FF",
          500: "#4D96FF", // Our main secondary
          600: "#3A7AD9",
          700: "#2A5FB3",
          800: "#1D468C",
          900: "#133066",
        },
        accent: {
          DEFAULT: "#F900BF", // Nebula pink accent
          50: "#FFF0FB",
          100: "#FFE0F7",
          200: "#FFC2EF",
          300: "#FF9FE4",
          400: "#FF7BD9",
          500: "#F900BF", // Our main accent
          600: "#D600A3",
          700: "#B30087",
          800: "#90006C",
          900: "#6D0051",
        },
        nebula: {
          purple: "#3A1078",
          blue: "#4D96FF",
          pink: "#F900BF",
          teal: "#2DCDDF",
          dark: "#2C0E5D",
          light: "#8C67FF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "nebula-pattern": "url('/patterns/nebula-pattern.svg')",
        "curve-bottom":
          'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%233A1078" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,133.3C1248,139,1344,149,1392,154.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>\')',
      },
      boxShadow: {
        nebula: "0 4px 20px -2px rgba(58, 16, 120, 0.25)",
        "nebula-lg": "0 10px 30px -3px rgba(58, 16, 120, 0.3)",
        "nebula-glow": "0 0 15px rgba(77, 150, 255, 0.5), 0 0 30px rgba(58, 16, 120, 0.3)",
        "accent-glow": "0 0 15px rgba(249, 0, 191, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

