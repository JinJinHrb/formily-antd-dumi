import { OutputOptions, rollup, RollupOptions } from 'rollup'

export const build = async (rollupConfig: Omit<RollupOptions, 'output'> & { output: OutputOptions }) => {
	const { output, ...input } = rollupConfig
	const bundle = await rollup(input)

	return bundle.write(output as OutputOptions)
}
