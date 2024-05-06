import { useConfigContext } from '../../config-provider'

export const useFixedWidth = (
	fixedWidth?: number | boolean | Record<number, number>,
	options: {
		labelCol?: number | number[]
		wrapperCol?: number | number[]
		inline?: boolean
		columns?: number
		childColumns?: number
	} = {},
) => {
	const config = useConfigContext()

	if ((options.labelCol || options.wrapperCol || options.inline) && fixedWidth === undefined) {
		// 用了栅格布局，或者使用行内布局，默认关闭最大宽度
		fixedWidth = false
	}

	if (fixedWidth === true || fixedWidth === undefined) {
		fixedWidth = config.form?.fixedWidth
	}

	if (typeof fixedWidth === 'object') {
		fixedWidth = fixedWidth[options.columns ?? options.childColumns ?? 1]
	}

	return fixedWidth || undefined
}
