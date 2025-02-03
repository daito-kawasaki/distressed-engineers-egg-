import type { Config } from "tailwindcss";
import fluid from "fluid-tailwind";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        7.5: "1.875rem", //30px
        12.5: "3.25rem",
        14.5: "3.75rem", //60px
        50: "3.125rem", //50px
        140: "8.75rem", //140px
        75: "18.75rem", //300px
        24.5: "6.25rem", //392px
        500: "31.25rem", //500px
      },
      fontSize: {
        "3.5xl": "2.0625rem",
        "2.5xl": "1.59375rem",
        44: "2.75rem",
      },
      width: {
        32.5: "8.5rem",
        40.5: "10.625rem",
        53: "13.75rem",
        190: "11.875rem",
        235: "14.6875rem",
        250: "15.625rem",
        280: "17.5rem",
        340: "21.25rem",
        520: "32.5rem",
        390: "24.375rem",

        secLine_sp: "18.5rem", //296px
        secLine_sm: "28rem", //448px
        secLine_md: "33rem", //528px
        secLine_lg: "33rem", //528px
        secLine_xl: "33.375rem", //534px
      },
    },
    screens: {
      sp: "22.5rem",
      sm: "30rem",
      md: "48rem",
      lg: "64rem",
      xl: "85.375rem",
    },
  },
  plugins: [require("tailwindcss-animate"), fluid],
} satisfies Config;
