import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius-lg)',
				md: 'var(--radius-md)',
				sm: 'var(--radius-sm)',
			},
			colors: {
				background: {
					light: 'hsl(var(--color-background-light))',
					dark: 'hsl(var(--color-background-dark))',
				},
				foreground: {
					light: 'hsl(var(--color-foreground-light))',
					dark: 'hsl(var(--color-foreground-dark))',
				},
				card: {
					light: 'hsl(var(--color-card-light))',
					dark: 'hsl(var(--color-card-dark))',
				},
				'card-foreground': {
					light: 'hsl(var(--color-card-foreground-light))',
					dark: 'hsl(var(--color-card-foreground-dark))',
				},
				popover: {
					light: 'hsl(var(--color-popover-light))',
					dark: 'hsl(var(--color-popover-dark))',
				},
				'popover-foreground': {
					light: 'hsl(var(--color-popover-foreground-light))',
					dark: 'hsl(var(--color-popover-foreground-dark))',
				},
				primary: {
					light: 'hsl(var(--color-primary-light))',
					dark: 'hsl(var(--color-primary-dark))',
				},
				'primary-foreground': {
					light: 'hsl(var(--color-primary-foreground-light))',
					dark: 'hsl(var(--color-primary-foreground-dark))',
				},
				secondary: {
					light: 'hsl(var(--color-secondary-light))',
					dark: 'hsl(var(--color-secondary-dark))',
				},
				'secondary-foreground': {
					light: 'hsl(var(--color-secondary-foreground-light))',
					dark: 'hsl(var(--color-secondary-foreground-dark))',
				},
				muted: {
					light: 'hsl(var(--color-muted-light))',
					dark: 'hsl(var(--color-muted-dark))',
				},
				'muted-foreground': {
					light: 'hsl(var(--color-muted-foreground-light))',
					dark: 'hsl(var(--color-muted-foreground-dark))',
				},
				accent: {
					light: 'hsl(var(--color-accent-light))',
					dark: 'hsl(var(--color-accent-dark))',
				},
				'accent-foreground': {
					light: 'hsl(var(--color-accent-foreground-light))',
					dark: 'hsl(var(--color-accent-foreground-dark))',
				},
				destructive: {
					light: 'hsl(var(--color-destructive-light))',
					dark: 'hsl(var(--color-destructive-dark))',
				},
				'destructive-foreground': {
					light: 'hsl(var(--color-destructive-foreground-light))',
					dark: 'hsl(var(--color-destructive-foreground-dark))',
				},
				border: {
					light: 'hsl(var(--color-border-light))',
					dark: 'hsl(var(--color-border-dark))',
				},
				input: {
					DEFAULT: 'hsl(var(--color-input))',
					dark: 'hsl(var(--color-input-dark))',
				},
				ring: {
					light: 'hsl(var(--color-ring-light))',
					dark: 'hsl(var(--color-ring-dark))',
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