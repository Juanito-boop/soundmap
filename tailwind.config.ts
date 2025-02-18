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
					light: 'oklch(var(--color-background-light))',
					dark: 'oklch(var(--color-background-dark))',
					discord: 'oklch(var(--color-background-discord))',
				},
				foreground: {
					light: 'oklch(var(--color-foreground-light))',
					dark: 'oklch(var(--color-foreground-dark))',
				},
				card: {
					light: 'oklch(var(--color-card-light))',
					dark: 'oklch(var(--color-card-dark))',
					discord: 'oklch(var(--color-card-discord))',
				},
				'card-foreground': {
					light: 'oklch(var(--color-card-foreground-light))',
					dark: 'oklch(var(--color-card-foreground-dark))',
				},
				popover: {
					light: 'oklch(var(--color-popover-light))',
					dark: 'oklch(var(--color-popover-dark))',
				},
				'popover-foreground': {
					light: 'oklch(var(--color-popover-foreground-light))',
					dark: 'oklch(var(--color-popover-foreground-dark))',
				},
				primary: {
					light: 'oklch(var(--color-primary-light))',
					dark: 'oklch(var(--color-primary-dark))',
				},
				'primary-foreground': {
					light: 'oklch(var(--color-primary-foreground-light))',
					dark: 'oklch(var(--color-primary-foreground-dark))',
				},
				secondary: {
					light: 'oklch(var(--color-secondary-light))',
					dark: 'oklch(var(--color-secondary-dark))',
				},
				'secondary-foreground': {
					light: 'oklch(var(--color-secondary-foreground-light))',
					dark: 'oklch(var(--color-secondary-foreground-dark))',
				},
				muted: {
					light: 'oklch(var(--color-muted-light))',
					dark: 'oklch(var(--color-muted-dark))',
				},
				'muted-foreground': {
					light: 'oklch(var(--color-muted-foreground-light))',
					dark: 'oklch(var(--color-muted-foreground-dark))',
				},
				accent: {
					light: 'oklch(var(--color-accent-light))',
					dark: 'oklch(var(--color-accent-dark))',
				},
				'accent-foreground': {
					light: 'oklch(var(--color-accent-foreground-light))',
					dark: 'oklch(var(--color-accent-foreground-dark))',
				},
				destructive: {
					light: 'oklch(var(--color-destructive-light))',
					dark: 'oklch(var(--color-destructive-dark))',
				},
				'destructive-foreground': {
					light: 'oklch(var(--color-destructive-foreground-light))',
					dark: 'oklch(var(--color-destructive-foreground-dark))',
				},
				border: {
					light: 'oklch(var(--color-border-light))',
					dark: 'oklch(var(--color-border-dark))',
				},
				input: {
					light: 'oklch(var(--color-input-light))',
					dark: 'oklch(var(--color-input-dark))',
					discord: 'oklch(var(--color-input-discord))'
				},
				ring: {
					light: 'oklch(var(--color-ring-light))',
					dark: 'oklch(var(--color-ring-dark))',
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