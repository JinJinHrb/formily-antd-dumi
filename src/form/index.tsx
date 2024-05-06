import React, { useEffect, useMemo, useState } from 'react'
import { Form as FormType, IFormFeedback } from '@formily/core'
import { useForm, FormProvider, JSXComponent } from '@formily/react'
import { FormLayout, IFormLayoutProps } from '../form-layout'
import { PreviewText } from '../preview-text'
import { useCreateForm, usePrefixCls, useFixedWidth } from '../__builtins__/hooks'
import { FormActionProps, useFormAction } from '../__builtins__/hooks/useFormAction'
import classNames from 'classnames'
import { FormGrid } from '../form-grid'
import { IFormItemProps } from '../form-item'
import { formInfoContext } from './context'
import { initForm } from './initForm'
import { useValidateAutoScroll } from '../util'

export interface FormProps<T extends object = any> extends IFormLayoutProps {
	/** Form 实例 */
	form?: FormType<T>
	/** 获取表单所使用的 form */
	formRef?: React.MutableRefObject<FormType<T> | undefined> | ((formRef?: FormType<T>) => void)
	component?: JSXComponent
	className?: string
	style?: React.CSSProperties
	/** 提交事件回调 */
	onSubmit?: (values: T) => any
	/** 提交校验失败事件回调 */
	onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
	/** 预览态占位符 */
	previewTextPlaceholder?: React.ReactNode
	/** 操作按钮相关配置 */
	action?:
		| boolean
		| (FormActionProps & {
				/** 是否放在 FormLayout 里
				 * - 设为 none 为独立一行
				 * @default false
				 */
				inline?: boolean
		  })
	/**
	 * 表单行内布局，目前是实验性阶段，适配不是很好
	 *
	 * @default false
	 */
	inline?: boolean
	/**
	 * 固定容器宽度
	 *
	 * 默认在只有一列时，容器宽度为 560；两列时，容器宽度为 1080
	 *
	 * 设为true会读取ConfigProvider的layout.fixedWidth的配置
	 *
	 * 设为对象会根据 `columns` 找到对应宽度
	 *
	 * @default true
	 */
	fixedWidth?: boolean | number | Record<number, number>
	/**
	 * 拉伸内容高度，使得 footer 能固定到底部
	 *
	 * @default true
	 */
	stretch?: boolean
	/**
	 * 区域留白，适用于 Drawer,Modal 这些显示范围较小的地方
	 */
	margin?: boolean
	/** 头部内容 */
	header?: React.ReactNode
	/** 头部参数 */
	headerProps?: React.HTMLAttributes<HTMLDivElement> & React.ClassAttributes<HTMLDivElement>
	/** 底部内容 */
	footer?: React.ReactNode
	/** 底部参数 */
	footerProps?: React.HTMLAttributes<HTMLDivElement> & React.ClassAttributes<HTMLDivElement>
	/** 禁用在校验失败时的自动滚动（默认开启） */
	disableValidateAutoScroll?: boolean
}

export const Form = <T extends object = any>({
	form,
	formRef,
	action: propAction,
	component = 'form',
	className,
	style,
	onSubmit,
	onSubmitFailed,
	previewTextPlaceholder,
	fixedWidth,
	inline,
	stretch,
	margin,
	header,
	headerProps,
	footer,
	footerProps,
	disableValidateAutoScroll,
	...props
}: FormProps<T>): React.ReactElement | null => {
	const top = useForm()
	const internalForm = useCreateForm()

	initForm(formRef, form || top || internalForm)
	useEffect(() => {
		return () => initForm(formRef, undefined)
	}, [])

	const formPrefixCls = usePrefixCls('formily-form', { prefixCls: props.prefixCls })

	const [fixContainerWidth, setFixContainerWidth] = useState(true)

	const action = useMemo<boolean | (FormActionProps & { inline?: boolean })>(() => {
		let action = propAction
		if (action === false) return false
		if (action === true || action === undefined) {
			action = {}
		}
		action = {
			...action,
			formButtonGroupProps: {
				...action.formButtonGroupProps,
				className: classNames(action.formButtonGroupProps?.className, `${formPrefixCls}-action`),
			},
			// 行内表单，按钮也设为行内布局
			inline: action.inline ?? inline,
		}
		if (action.inline === true) {
			action = {
				...action,
				formItem: action.formItem ?? true,
				formButtonGroupProps: {
					...action.formButtonGroupProps,
					// 将 wrapperWidth 的值由 100% 改为 auto，否则 align: right 不起作用
					wrapperWidth: (action.formButtonGroupProps as IFormItemProps)?.wrapperWidth || 'auto',
				},
			}
		}

		return action
	}, [propAction, inline, formPrefixCls])

	const actionNode = useFormAction(action)
	const finalFixedWidth = useFixedWidth(fixedWidth, { ...props, inline })

	const finalFooterProps = {
		...footerProps,
		style: {
			// 独立一行；固定 FormLayout 宽度；有固定高度。才定宽
			...(!(typeof action === 'object' && action.inline === true) && finalFixedWidth
				? { margin: '0 auto', width: finalFixedWidth }
				: {}),
			...footerProps?.style,
		},
		className: classNames(`${formPrefixCls}-footer`, footerProps?.className),
	}

	const mergedActionNode =
		(footer || actionNode) &&
		// 由于 action 被 footer 元素包裹，Sticky组件不生效，所以需要把 footerProps 直接传给 Sticky 组件
		(typeof action === 'object' && action.sticky && React.isValidElement(actionNode) ? (
			React.cloneElement(actionNode, {
				...actionNode.props,
				...finalFooterProps,
			})
		) : (
			<div {...finalFooterProps}>{footer || actionNode}</div>
		))

	let [inlineActionNode, blockActionNode]: [React.ReactNode, React.ReactNode] = [undefined, undefined]
	if (typeof action === 'object' && action.inline === true) {
		inlineActionNode = <FormGrid.GridColumn gridSpan={-1}>{mergedActionNode}</FormGrid.GridColumn>
	} else {
		blockActionNode = mergedActionNode
	}

	const { setWrapperDom } = useValidateAutoScroll({ form: form || top || internalForm, enable: !disableValidateAutoScroll })

	const renderContent = (form: FormType) => (
		<formInfoContext.Provider
			value={{ fixedWidth: finalFixedWidth, fixContainerWidth, setFixContainerWidth, onSubmit, onSubmitFailed }}>
			<PreviewText.Placeholder value={previewTextPlaceholder}>
				{React.createElement(
					component,
					{
						className: classNames(
							formPrefixCls,
							margin && `${formPrefixCls}-margin`,
							inline && `${formPrefixCls}-inline`,
							stretch && `${formPrefixCls}-stretch`,
							className,
						),
						style,
						onSubmit(e: React.FormEvent) {
							e?.stopPropagation?.()
							e?.preventDefault?.()
							form.submit(onSubmit).catch(onSubmitFailed)
						},
						ref: el => setWrapperDom(el),
					},
					<>
						{header && (
							<div {...headerProps} className={classNames(`${formPrefixCls}-header`, headerProps?.className)}>
								{header}
							</div>
						)}
						<FormLayout
							{...props}
							style={{
								...(fixContainerWidth && finalFixedWidth ? { margin: '0 auto', width: finalFixedWidth } : {}),
							}}
							className={`${formPrefixCls}-body`}>
							{props.children}
							{inlineActionNode}
						</FormLayout>
						{blockActionNode}
					</>,
				)}
			</PreviewText.Placeholder>
		</formInfoContext.Provider>
	)
	if (form) return <FormProvider form={form}>{renderContent(form)}</FormProvider>
	if (top) return renderContent(top)
	return <FormProvider form={internalForm}>{renderContent(internalForm)}</FormProvider>
}
