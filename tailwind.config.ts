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
					light: 'hsl(0, 0%, 100%)',
					dark: 'hsl(222, 23%, 5%)',
				},
				foreground: {
					light: 'hsl(222, 24%, 5%)',
					dark: 'hsl(210, 28%, 98%)',
				},
				card: {
					light: 'hsl(0, 0%, 100%)',
					dark: 'hsl(222, 23%, 5%)',
				},
				'card-foreground': {
					light: 'hsl(222, 24%, 5%)',
					dark: 'hsl(210, 28%, 98%)',
				},
				popover: {
					light: 'hsl(0, 0%, 100%)',
					dark: 'hsl(222, 23%, 5%)',
				},
				'popover-foreground': {
					light: 'hsl(222, 24%, 5%)',
					dark: 'hsl(210, 28%, 98%)',
				},
				primary: {
					light: 'hsl(222, 25%, 13%)',
					dark: 'hsl(210, 28%, 98%)',
				},
				'primary-foreground': {
					light: 'hsl(210, 28%, 98%)',
					dark: 'hsl(222, 25%, 13%)',
				},
				secondary: {
					light: 'hsl(210, 36%, 95%)',
					dark: 'hsl(222, 25%, 16%)',
				},
				'secondary-foreground': {
					light: 'hsl(222, 25%, 13%)',
					dark: 'hsl(210, 28%, 98%)',
				},
				muted: {
					light: 'hsl(210, 36%, 95%)',
					dark: 'hsl(222, 25%, 16%)',
				},
				'muted-foreground': {
					light: 'hsl(216, 16%, 47%)',
					dark: 'hsl(216, 18%, 65%)',
				},
				accent: {
					light: 'hsl(210, 36%, 95%)',
					dark: 'hsl(222, 25%, 16%)',
				},
				'accent-foreground': {
					light: 'hsl(222, 25%, 13%)',
					dark: 'hsl(210, 28%, 98%)',
				},
				destructive: {
					light: 'hsl(0, 84%, 60%)',
					dark: 'hsl(0, 64%, 30%)',
				},
				'destructive-foreground': {
					light: 'hsl(210, 28%, 98%)',
					dark: 'hsl(210, 28%, 98%)',
				},
				border: {
					light: 'hsl(214, 32%, 91%)',
					dark: 'hsl(222, 25%, 16%)',
				},
				input: {
					DEFAULT: 'hsl(214, 32%, 91%)',
					dark: 'hsl(222, 25%, 16%)',
				},
				ring: {
					light: 'hsl(222, 24%, 5%)',
					dark: 'hsl(214, 28%, 90%)',
				},
        // background: 'hsl(var(--background))',
        // foreground: 'hsl(var(--foreground))',
        // card: {
        //   DEFAULT: 'hsl(var(--card))',
        //   foreground: 'hsl(var(--card-foreground))',
        // },
        // popover: {
        //   DEFAULT: 'hsl(var(--popover))',
        //   foreground: 'hsl(var(--popover-foreground))',
        // },
        // primary: {
        //   DEFAULT: 'hsl(var(--primary))',
        //   foreground: 'hsl(var(--primary-foreground))',
        // },
        // secondary: {
        //   DEFAULT: 'hsl(var(--secondary))',
        //   foreground: 'hsl(var(--secondary-foreground))',
        // },
        // muted: {
        //   DEFAULT: 'hsl(var(--muted))',
        //   foreground: 'hsl(var(--muted-foreground))',
        // },
        // accent: {
        //   DEFAULT: 'hsl(var(--accent))',
        //   foreground: 'hsl(var(--accent-foreground))',
        // },
        // destructive: {
        //   DEFAULT: 'hsl(var(--destructive))',
        //   foreground: 'hsl(var(--destructive-foreground))',
        // },
        // border: 'hsl(var(--border))',
        // input: 'hsl(var(--input))',
        // ring: 'hsl(var(--ring))',
        // chart: {
        //   '1': 'hsl(var(--chart-1))',
        //   '2': 'hsl(var(--chart-2))',
        //   '3': 'hsl(var(--chart-3))',
        //   '4': 'hsl(var(--chart-4))',
        //   '5': 'hsl(var(--chart-5))',
        // },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
				
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
