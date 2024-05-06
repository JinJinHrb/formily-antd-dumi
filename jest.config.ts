/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	clearMocks: true,
	collectCoverage: true,
	verbose: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	roots: ['src'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy', //className查找都会原样返回
		'^@/(.*)$': './src/$1',
	},
	testEnvironment: 'jest-environment-jsdom',
	preset: 'ts-jest',
	testMatch: ['**/*.{spec,test}.[jt]s?(x)'],
	testPathIgnorePatterns: ['/esm/', '/lib/'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.(ts|tsx|js|jsx)?$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }],
		'\\.(less|css)$': 'jest-less-loader', // 支持less
	},
	setupFiles: ['./tests/before.js'],
	setupFilesAfterEnv: [require.resolve('@testing-library/jest-dom/extend-expect'), './global.config.ts'],
	transformIgnorePatterns: [
		'/dist/',
		// Ignore modules without es dir.
		// Update: @babel/runtime should also be transformed
		'node_modules/(?!.*@(babel|ant-design))(?!array-move)[^/]+?/(?!(es|node_modules)/)',
	],
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/__tests__/',
		'/esm/',
		'/lib/',
		'package.json',
		'/demo/',
		'scripts/',
		'/packages/builder/src/__tests__/',
		'/packages/builder/src/components/',
		'/packages/builder/src/configs/',
		'package-lock.json',
	],
}
