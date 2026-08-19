import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        handwriting: ['Caveat', 'cursive'],
        retro: ['VT323', 'monospace'],
      },
      boxShadow: {
        'neo-sm': '2px 2px 0px 0px rgba(0, 0, 0, 0.9)',
        'neo': '4px 4px 0px 0px rgba(0, 0, 0, 0.9)',
        'neo-lg': '6px 6px 0px 0px rgba(0, 0, 0, 0.9)',
        'neo-xl': '8px 8px 0px 0px rgba(0, 0, 0, 0.9)',
        'neo-glow': '4px 4px 0px 0px rgba(255, 107, 107, 0.8)',
      },
      animation: {
        'flash': 'flash 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'countdown': 'pop 0.9s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        flash: {
          '0%': { opacity: '0' },
          '40%': { opacity: '0.95' },
          '100%': { opacity: '0' },
        },
        pop: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '80%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
      }
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        photomoment: {
          "primary": "#FF5E7E",
          "primary-content": "#FFFFFF",
          "secondary": "#FFE066",
          "secondary-content": "#1E1E24",
          "accent": "#4D96FF",
          "accent-content": "#FFFFFF",
          "neutral": "#2B2D42",
          "neutral-content": "#F8F9FA",
          "base-100": "#FFFDF9",
          "base-200": "#F4EFE6",
          "base-300": "#E6DED1",
          "base-content": "#1A1918",
          "info": "#6BCB77",
          "success": "#2EC4B6",
          "warning": "#FF9F45",
          "error": "#FF4848",
          "--rounded-box": "1.5rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "2rem",
          "--animation-btn": "0.2s",
          "--btn-focus-scale": "0.98",
        },
        photomomentDark: {
          "primary": "#FF6B8B",
          "primary-content": "#FFFFFF",
          "secondary": "#FFD166",
          "secondary-content": "#121214",
          "accent": "#64B5F6",
          "accent-content": "#121214",
          "neutral": "#1E1F24",
          "neutral-content": "#EDEDF0",
          "base-100": "#141416",
          "base-200": "#1C1D21",
          "base-300": "#272930",
          "base-content": "#F5F5F7",
          "info": "#81C784",
          "success": "#4DD0E1",
          "warning": "#FFB74D",
          "error": "#E57373",
          "--rounded-box": "1.5rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "2rem",
          "--animation-btn": "0.2s",
          "--btn-focus-scale": "0.98",
        }
      },
      "retro",
      "cyberpunk",
      "cupcake",
      "valentine",
      "synthwave",
      "pastel",
      "nord",
      "dim"
    ],
    darkTheme: "photomomentDark",
    base: true,
    styled: true,
    utils: true,
  },
}
