module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: [
		"node_modules",
		"build",
		".svelte-kit",
		".netlify",
		'*.cjs'
	],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		"eqeqeq": "error",
		"no-console": "warn",
		"no-undef": "off",
		"no-fallthrough": "off",
		"no-self-assign": "off", // svelte needs this for reactive stuff
	}
};
