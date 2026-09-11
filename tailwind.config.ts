import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // PALETTE — tension warm/cold "Minuit × Midnight"
        // Warm (jour, chaleur, Marrakech chaud) : coral / terracotta / ochre
        // Cold (nuit, urbain, minuit) : midnight × 3 nuances
        ink: '#2A1912',           // chocolat chaud (fond dark warm)
        inkDeep: '#1B0F0A',       // chocolat profond
        cream: '#FFF5EB',         // ivoire chaud
        coral: '#EE9976',         // coral principal — accent chaleur
        coralLight: '#F5B598',    // coral clair
        terracotta: '#7C2D1F',    // terracotta profond
        blood: '#EE9976',         // alias legacy → coral
        smoke: '#3B2519',
        dust: '#9C8578',
        sand: '#EE9976',
        // Accent NUIT — donne la tension chromatique au nom "Minuit"
        midnight: '#0C1B33',      // bleu nuit profond (accent principal nuit)
        midnightDeep: '#050C1C',  // presque noir bleuté (footer, fin de page)
        midnightSoft: '#1A2A4A',  // bleu nuit désaturé (hover, backgrounds)
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal': 'reveal 1.1s cubic-bezier(0.77, 0, 0.175, 1) both',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '20%': { transform: 'translate(-15%,5%)' },
          '30%': { transform: 'translate(7%,-25%)' },
          '40%': { transform: 'translate(-5%,25%)' },
          '50%': { transform: 'translate(-15%,10%)' },
          '60%': { transform: 'translate(15%,0%)' },
          '70%': { transform: 'translate(0%,15%)' },
          '80%': { transform: 'translate(3%,-25%)' },
          '90%': { transform: 'translate(-10%,10%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
