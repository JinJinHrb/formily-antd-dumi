module.exports = {
	presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript', '@babel/preset-react'],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-transform-runtime',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-jsx',
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-proposal-nullish-coalescing-operator',
	],
	ignore: ['node_modules/**'],
	env: {
		test: {
			presets: [
				['@babel/preset-env', { targets: { node: 'current' } }],
				'@babel/preset-typescript',
				'@babel/preset-react',
			],
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				'@babel/plugin-transform-modules-commonjs',
				'@babel/plugin-transform-runtime',
				'@babel/plugin-proposal-class-properties',
				'@babel/plugin-syntax-jsx',
				'@babel/plugin-proposal-optional-chaining',
				'@babel/plugin-proposal-nullish-coalescing-operator',
			],
		},
	},
}
