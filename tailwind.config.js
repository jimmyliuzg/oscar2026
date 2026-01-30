/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                text: {
                    DEFAULT: '#1A1D29',
                    light: 'rgba(26, 29, 41, 0.7)',
                    muted: 'rgba(26, 29, 41, 0.5)',
                },
                background: {
                    DEFAULT: '#F5F1E8',
                    elevated: '#FFFFFF',
                    overlay: 'rgba(245, 241, 232, 0.95)',
                },
                primary: {
                    DEFAULT: '#D4AF37',
                    light: 'rgba(212, 175, 55, 0.15)',
                    dark: '#B8941F',
                },
                secondary: {
                    DEFAULT: '#8B2635',
                    light: 'rgba(139, 38, 53, 0.15)',
                    dark: '#6A1D28',
                },
                accent: {
                    DEFAULT: '#2C2F3E',
                    light: 'rgba(44, 47, 62, 0.15)',
                    dark: '#1A1D29',
                },
            },
            fontFamily: {
                heading: ['Playfair Display', 'serif'],
                body: ['Lato', 'sans-serif'],
                accent: ['Cormorant Garamond', 'serif'],
            },
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
            },
            spacing: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '1rem',
                lg: '1.5rem',
                xl: '2rem',
                '2xl': '3rem',
                '3xl': '4rem',
            },
            borderRadius: {
                sm: '8px',
                md: '12px',
                lg: '16px',
                xl: '24px',
            },
            boxShadow: {
                sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
                md: '0 4px 6px rgba(0, 0, 0, 0.1)',
                lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
                xl: '0 12px 24px rgba(0, 0, 0, 0.2)',
                golden: '0 4px 12px rgba(212, 175, 55, 0.3)',
                'golden-lg': '0 6px 16px rgba(212, 175, 55, 0.4)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-in': 'slideIn 0.3s ease-out',
                'golden-glow': 'goldenGlow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                goldenGlow: {
                    '0%, 100%': { boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)' },
                    '50%': { boxShadow: '0 4px 20px rgba(212, 175, 55, 0.6)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
        },
    },
    plugins: [],
}
