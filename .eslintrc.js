module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: false,
		},
	},
	env: {
		browser: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		// add "prettier" last.
		// this will turn off eslint rules conflicting with prettier.
		// this is not what will format our code.
		'prettier',
	],
	rules: {
		'for-direction': 'off',
		'no-cond-assign': ['error', 'always'],
		'no-empty-function': 'off',
		'no-empty': 'warn',
		'no-unreachable': 'error',
		'quotes': ['error', 'single'],
		'comma-dangle': ['error', {
			'arrays': 'only-multiline',
			'objects': 'only-multiline',
			'imports': 'never',
			'exports': 'never',
			'functions': 'only-multiline',
		}],
	},
	overrides: [
		{
			// for every file
			files: [
				'*.{js,ts}',
			],
			rules: {
				'comma-dangle': ['warn', {
					'arrays': 'always-multiline',
					'objects': 'always-multiline',
					'imports': 'never',
					'exports': 'never',
					'functions': 'always-multiline',
				}],
				'no-empty-function': 'off',
				'no-empty-interface': 'off',
				'no-extra-semi': 'error',
				'no-unused-vars': 'off',
				'no-use-before-define': ['error', {
					'functions': false,
					'classes': false,
					'variables': true,
					'allowNamedExports': false,
				}],
				'semi': 'error',
			},
		},
	],
	ignorePatterns: ['node_modules', 'dist', 'build', 'bin', '*.md', 'LICENSE'],
	globals: {
		AgoraRTC: true,
		AgoraRTM: true,
		gsap: true,
		Hls: true,
		QRious: true,
		Quad: true,
		Power2: true,
		Power3: true,
		Power4: true,
		Swiper: true,
		THREE: true,
	},
};
