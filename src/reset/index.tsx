import React from 'react'
import Button from 'antd/es/button'
import { ButtonProps } from 'antd/es/button'
import { IFieldResetOptions, IFormFeedback } from '@formily/core'
import { useParentForm } from '@formily/react'

export interface IResetProps extends IFieldResetOptions, ButtonProps {
	/**
	 * 隐藏 children，不传 children 默认会显示 提交 文本
	 *
	 * @default false
	 */
	hideChildren?: boolean
	onClick?: (e: React.MouseEvent<Element, MouseEvent>) => any
	onResetValidateSuccess?: (payload: any) => void
	onResetValidateFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Reset: React.FC<IResetProps> = ({
	hideChildren = false,
	forceClear,
	validate,
	onResetValidateSuccess,
	onResetValidateFailed,
	...props
}) => {
	const form = useParentForm()
	return (
		<Button
			{...props}
			onClick={e => {
				if (props.onClick) {
					if (props.onClick(e) === false) return
				}
				form
					.reset('*', {
						forceClear,
						validate,
					})
					.then(onResetValidateSuccess)
					.catch(onResetValidateFailed)
			}}>
			{!hideChildren ? props.children ?? '重置' : undefined}
		</Button>
	)
}
