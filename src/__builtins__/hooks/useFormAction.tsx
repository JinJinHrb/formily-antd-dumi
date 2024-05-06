import React from 'react'
import { Submit, ISubmitProps } from '../../submit'
import { FormButtonGroup, IFormButtonGroupProps, IStickyProps } from '../../form-button-group'
import { FixedFooter, FixedFooterProps } from '../../fixed-footer'
import { IFormItemProps } from '@formily/form-item'

export interface FormActionProps {
	/** 提交按钮的 props */
	submitButtonProps?: ISubmitProps
	/** 外层按钮容器的 props */
	formButtonGroupProps?: IFormButtonGroupProps | IFormItemProps
	/** 自定义按钮 */
	render?: (dom: React.ReactNode) => React.ReactNode
	/** 左侧内容 */
	leftAddon?: React.ReactNode
	/** 右侧内容 */
	rightAddon?: React.ReactNode
	/** 开启吸底功能 */
	sticky?: boolean | IStickyProps
	/** 使用 FormItem 组件包裹，使得 操作项 与 普通输入框 能够对齐 */
	formItem?: boolean
	/** 固定页脚 */
	fixedFooter?: boolean | FixedFooterProps
	align?: IFormButtonGroupProps['align']
}

export const useFormAction = (action: boolean | FormActionProps = true): React.ReactNode => {
	if (action === false) return null
	if (action === true) {
		return (
			<FormButtonGroup align='right'>
				<Submit>提交</Submit>
			</FormButtonGroup>
		)
	}
	let actionNode: React.ReactNode = (
		<>
			{action.leftAddon}
			<Submit {...action.submitButtonProps}>提交</Submit>
			{action.rightAddon}
		</>
	)

	if (action.render) {
		actionNode = action.render(actionNode)
	}

	const Component = action.formItem ? FormButtonGroup.FormItem : FormButtonGroup

	let wrapperNode = (
		<Component align={action.align || 'right'} {...action.formButtonGroupProps}>
			{actionNode}
		</Component>
	)

	if (action.sticky) {
		wrapperNode = (
			<FormButtonGroup.Sticky {...(typeof action.sticky === 'boolean' ? {} : action.sticky)}>
				{wrapperNode}
			</FormButtonGroup.Sticky>
		)
	}

	if (action.fixedFooter) {
		wrapperNode = (
			<FixedFooter {...(typeof action.fixedFooter === 'boolean' ? {} : action.fixedFooter)}>{wrapperNode}</FixedFooter>
		)
	}

	return wrapperNode
}
