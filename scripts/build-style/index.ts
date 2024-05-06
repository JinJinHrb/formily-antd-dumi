import { runCopy, CopyBaseOptions } from './copy'
import { buildAllStyles } from './buildAllStyles'

export function build({ allStylesOutputFile, ...opts }: CopyBaseOptions & { allStylesOutputFile: string }) {
	return Promise.all([buildAllStyles(allStylesOutputFile), runCopy(opts)])
}

export { runCopy }
