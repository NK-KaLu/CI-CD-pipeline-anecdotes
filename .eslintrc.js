module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'jest/globals': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'jest',
		'react-hooks',
		'import'  // Added the import plugin here
	],
	'rules': {
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'import/no-anonymous-default-export': 'error',  // Explicitly set the rule
	},
	'settings': {
		'react': {
			'version': 'detect',
		},
	},
}
