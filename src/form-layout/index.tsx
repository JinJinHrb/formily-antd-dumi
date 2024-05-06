import React, { createContext, useContext } from 'react'
import { IUseResponsiveFormLayoutProps, useResponsiveFormLayout } from './useResponsiveFormLayout'
import { usePrefixCls } from '../__builtins__'
import cls from 'classnames'
import { useField } from '@formily/react'
import { VoidField } from '@formily/core'
import { FormGrid, IFormGridProps } from '../form-grid'

export interface IFormLayoutProps extends IUseResponsiveFormLayoutProps {
	prefixCls?: string
	className?: string
	style?: React.CSSProperties
	colon?: boolean
	labelWrap?: boolean
	labelWidth?: number
	wrapperWidth?: number
	wrapperWrap?: boolean
	fullness?: boolean
	/**
	 * 表单项大小
	 * @default 'large'
	 * */
	size?: 'small' | 'default' | 'large'
	direction?: 'rtl' | 'ltr'
	inset?: boolean
	/**
	 * 上下文浅层传递
	 * @default false
	 */
	shallow?: boolean
	tooltipLayout?: 'icon' | 'text'
	tooltipIcon?: React.ReactNode
	feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none'
	bordered?: boolean
	/** 只读模式下样式优化 */
	readPretty?: boolean
	/** table形式的border */
	tableBordered?: boolean

	title?: React.ReactNode
	/**
	 * 更多 grid 配置，配置了 columns 默认会使用使用 网格布局
	 */
	grid?: boolean | IFormGridProps

	breakpoints?: number[]
	spaceGap?: number
	/** 网格布局列数，FormLayout 内置了 FormGrid 组件 */
	columns?: number
	/** 嵌套 FormLayout 场景使用，给内部的 FormLayout 配置的 columns */
	childColumns?: number
	columnGap?: number
	rowGap?: number
}

export interface IFormLayoutContext
	extends Omit<IFormLayoutProps, 'labelAlign' | 'wrapperAlign' | 'layout' | 'labelCol' | 'wrapperCol'> {
	labelAlign?: 'right' | 'left'
	wrapperAlign?: 'right' | 'left'
	layout?: 'vertical' | 'horizontal' | 'inline' | 'two-columns'
	labelCol?: number
	wrapperCol?: number
	readPretty?: boolean
}

export const FormLayoutDeepContext = createContext<IFormLayoutContext>({})

export const FormLayoutShallowContext = createContext<IFormLayoutContext>({})

export const useFormDeepLayout = () => useContext(FormLayoutDeepContext)

export const useFormShallowLayout = () => useContext(FormLayoutShallowContext)

export const useFormLayout = () => ({
	...useFormDeepLayout(),
	...useFormShallowLayout(),
})

const useParentPattern = () => {
	const field = useField<VoidField>()
	return field?.parent?.pattern || field?.form?.pattern
}

export const FormLayout: React.FC<React.PropsWithChildren<IFormLayoutProps>> & {
	useFormLayout: () => IFormLayoutContext
	useFormDeepLayout: () => IFormLayoutContext
	useFormShallowLayout: () => IFormLayoutContext
} = ({ shallow, children, prefixCls, className, style, title, size = 'large', grid, ...otherProps }) => {
	const { ref, props } = useResponsiveFormLayout({ ...otherProps, size })
	const deepLayout = useFormDeepLayout()
	const pattern = useParentPattern()
	const formPrefixCls = usePrefixCls('form', { prefixCls })
	const layoutPrefixCls = usePrefixCls('formily-layout', { prefixCls })
	const layoutClassName = cls(
		layoutPrefixCls,
		{
			[`${formPrefixCls}-table-bordered`]: props.tableBordered,
			[`${formPrefixCls}-read-pretty`]: pattern === 'readPretty' || props.readPretty,
			[`${formPrefixCls}-${props.layout}`]: true,
			[`${formPrefixCls}-rtl`]: props.direction === 'rtl',
			[`${formPrefixCls}-${props.size}`]: props.size,
		},
		className,
	)
	const renderChildren = () => {
		const newDeepLayout = {
			...deepLayout,
		}
		if (!shallow) {
			Object.assign(newDeepLayout, {
				...props,
				columns: props.columns ?? newDeepLayout.columns ?? props.childColumns ?? newDeepLayout.childColumns,
			})
		} else {
			if (props.size) {
				newDeepLayout.size = props.size
			}
			if (props.colon) {
				newDeepLayout.colon = props.colon
			}
			if (props.readPretty) {
				newDeepLayout.readPretty = props.readPretty
			}
		}

		let finalGrid = grid
		if (finalGrid === undefined && (props.columns || deepLayout.columns)) {
			finalGrid = true
		}
		if (props.labelCol || props.wrapperCol) {
			// 用了栅格布局，默认关闭 grid 布局
			finalGrid = finalGrid ?? false
		}

		let newChildren = children
		if (finalGrid === true) {
			let gridProps = typeof finalGrid === 'boolean' ? {} : finalGrid
			newChildren = <FormGrid {...gridProps}>{children}</FormGrid>
		}

		return (
			<FormLayoutDeepContext.Provider value={newDeepLayout}>
				<FormLayoutShallowContext.Provider value={shallow ? props : undefined}>
					{title ? <div className={`${layoutPrefixCls}-title`}>{title}</div> : undefined}
					{newChildren}
				</FormLayoutShallowContext.Provider>
			</FormLayoutDeepContext.Provider>
		)
	}

	return (
		<div ref={ref} className={layoutClassName} style={style}>
			{renderChildren()}
		</div>
	)
}

FormLayout.defaultProps = {
	shallow: false,
}

FormLayout.useFormDeepLayout = useFormDeepLayout
FormLayout.useFormShallowLayout = useFormShallowLayout
FormLayout.useFormLayout = useFormLayout
