import postcss from 'rollup-plugin-postcss'
import NpmImport from 'less-plugin-npm-import'
import resolve from 'rollup-plugin-node-resolve'
import fs from 'fs'
import lessToJs from 'less-vars-to-js'
import path from 'path'

// 篡改
const cwd = process.cwd()
const pathResolveCwd = relativePath => path.resolve(cwd, relativePath)
const themesPath = pathResolveCwd('./src/variable.less')
const themesLess = fs.readFileSync(themesPath, 'utf8')
const themesLessVars = lessToJs(themesLess, {
	resolveVariables: true,
	stripPrefix: true,
})

export const getRollupBasePlugin = () => [
	resolve(),
	postcss({
		extract: true,
		minimize: true,
		sourceMap: true,
		extensions: ['.css', '.less', '.sass'],
		use: {
			less: {
				plugins: [new NpmImport({ prefix: '~' })],
				javascriptEnabled: true,
				modifyVars: themesLessVars,
			},
			sass: {},
			stylus: {},
		},
	}),
]
