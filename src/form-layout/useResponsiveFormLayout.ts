import { useRef, useState, useEffect } from 'react'
import { isArr, isValid } from '@formily/shared'

export interface IUseResponsiveFormLayoutProps {
	/** 容器尺寸断点，一般会搭配 layout, labelAlign, wrapperAlign 使用 */
	breakpoints?: number[]
	/**
	 * FormItem的label布局模式，数组选项只在有 breakpoints 时才用得上
	 * @default 'vertical'
	 */
	layout?: 'vertical' | 'horizontal' | 'inline' | ('vertical' | 'horizontal' | 'inline')[]
	labelCol?: number | number[]
	wrapperCol?: number | number[]
	labelAlign?: 'right' | 'left' | ('right' | 'left')[]
	wrapperAlign?: 'right' | 'left' | ('right' | 'left')[]
	[props: string]: any
}

interface ICalcBreakpointIndex {
	(originalBreakpoints: number[], width: number): number
}

interface ICalculateProps {
	(target: HTMLElement, props: IUseResponsiveFormLayoutProps): IUseResponsiveFormLayoutProps
}

interface IUseResponsiveFormLayout {
	(props: IUseResponsiveFormLayoutProps): {
		ref: React.MutableRefObject<HTMLDivElement>
		props: any
	}
}

const calcBreakpointIndex: ICalcBreakpointIndex = (breakpoints, width) => {
	for (let i = 0; i < breakpoints.length; i++) {
		if (width <= breakpoints[i]) {
			return i
		}
	}
	return -1
}

const calcFactor = <T>(value: T | T[], breakpointIndex: number): T => {
	if (Array.isArray(value)) {
		if (breakpointIndex === -1) return value[0]
		return value[breakpointIndex] ?? value[value.length - 1]
	} else {
		return value
	}
}

const factor = <T>(value: T | T[], breakpointIndex: number): T =>
	isValid(value) ? calcFactor(value as any, breakpointIndex) : value

const calculateProps: ICalculateProps = (target, props) => {
	const { clientWidth } = target
	const { breakpoints, layout, labelAlign, wrapperAlign, labelCol, wrapperCol, ...otherProps } = props
	const breakpointIndex = calcBreakpointIndex(breakpoints, clientWidth)

	return {
		layout: factor(layout, breakpointIndex),
		labelAlign: factor(labelAlign, breakpointIndex),
		wrapperAlign: factor(wrapperAlign, breakpointIndex),
		labelCol: factor(labelCol, breakpointIndex),
		wrapperCol: factor(wrapperCol, breakpointIndex),
		...otherProps,
	}
}

export const useResponsiveFormLayout: IUseResponsiveFormLayout = props => {
	const ref = useRef<HTMLDivElement>(null)
	const { breakpoints } = props
	if (!isArr(breakpoints)) {
		return { ref, props: { ...props, layout: props.layout ?? 'vertical' } }
	}

	const [layoutProps, setLayout] = useState<any>(props)

	const updateUI = () => {
		if (ref.current) {
			setLayout(calculateProps(ref.current, props))
		}
	}

	useEffect(() => {
		const observer = () => {
			updateUI()
		}
		const resizeObserver = new ResizeObserver(observer)
		if (ref.current) {
			resizeObserver.observe(ref.current)
		}
		updateUI()
		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	return {
		ref,
		props: { ...layoutProps, layout: layoutProps.layout ?? 'vertical' },
	}
}
