import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      colors: {
				background: {
					light: 'rgb(255, 255, 255)',
					dark: 'rgb(12, 14, 18)',
				},
				foreground: {
					light: 'rgb(12, 14, 18)',
					dark: 'rgb(247, 249, 252)',
				},
				card: {
					light: 'rgb(255, 255, 255)',
					dark: 'rgb(12, 14, 18)',
				},
				'card-foreground': {
					light: 'rgb(12, 14, 18)',
					dark: 'rgb(247, 249, 252)',
				},
				popover: {
					light: 'rgb(255, 255, 255)',
					dark: 'rgb(12, 14, 18)',
				},
				'popover-foreground': {
					light: 'rgb(12, 14, 18)',
					dark: 'rgb(247, 249, 252)',
				},
				primary: {
					light: 'rgb(19, 22, 28)',
					dark: 'rgb(247, 249, 252)',
				},
				'primary-foreground': {
					light: 'rgb(247, 249, 252)',
					dark: 'rgb(19, 22, 28)',
				},
				secondary: {
					light: 'rgb(240, 244, 247)',
					dark: 'rgb(22, 26, 33)',
				},
				'secondary-foreground': {
					light: 'rgb(19, 22, 28)',
					dark: 'rgb(247, 249, 252)',
				},
				muted: {
					light: 'rgb(240, 244, 247)',
					dark: 'rgb(22, 26, 33)',
				},
				'muted-foreground': {
					light: 'rgb(108, 116, 128)',
					dark: 'rgb(155, 164, 178)',
				},
				accent: {
					light: 'rgb(240, 244, 247)',
					dark: 'rgb(22, 26, 33)',
				},
				'accent-foreground': {
					light: 'rgb(19, 22, 28)',
					dark: 'rgb(247, 249, 252)',
				},
				destructive: {
					light: 'rgb(235, 64, 52)',
					dark: 'rgb(117, 32, 26)',
				},
				'destructive-foreground': {
					light: 'rgb(247, 249, 252)',
					dark: 'rgb(247, 249, 252)',
				},
				border: {
					light: 'rgb(229, 234, 239)',
					dark: 'rgb(22, 26, 33)',
				},
				input: {
					DEFAULT: 'rgb(229, 234, 239)',
					dark: 'rgb(22, 26, 33)',
				},
				ring: {
					light: 'rgb(12, 14, 18)',
					dark: 'rgb(228, 233, 238)',
				}
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
			
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
