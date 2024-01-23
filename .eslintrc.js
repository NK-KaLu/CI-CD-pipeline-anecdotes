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
		'jest'
	],
	'rules': {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	},
	'settings': {
		'react': {
			'version': 'detect',
		},
	},
}


