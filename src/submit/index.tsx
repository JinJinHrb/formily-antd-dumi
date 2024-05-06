import React from 'react'
import Button from 'antd/es/button'
import { ButtonProps } from 'antd/es/button'
import { IFormFeedback } from '@formily/core'
import { useParentForm, observer } from '@formily/react'
import { useFormInfo } from '../form/context'

export interface ISubmitProps extends ButtonProps {
	/**
	 * 隐藏 children，不传 children 默认会显示 提交 文本
	 *
	 * @default false
	 */
	hideChildren?: boolean
	onClick?: (e: React.MouseEvent<Element, MouseEvent>) => any
	onSubmit?: (values: any) => any
	onSubmitSuccess?: (payload: any) => void
	onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Submit: React.FC<React.PropsWithChildren<ISubmitProps>> = observer(
	({ hideChildren = false, onSubmit, onSubmitFailed, onSubmitSuccess, ...props }: ISubmitProps) => {
		const form = useParentForm()
		const formInfo = useFormInfo()
		return (
			<Button
				htmlType={onSubmit || formInfo?.onSubmit ? 'button' : 'submit'}
				type='primary'
				{...props}
				loading={props.loading !== undefined ? props.loading : form.submitting}
				onClick={e => {
					if (props.onClick) {
						if (props.onClick(e) === false) return
					}
					if (onSubmit) {
						form.submit(onSubmit).then(onSubmitSuccess).catch(onSubmitFailed)
					}
					if (formInfo?.onSubmit) {
						form.submit(formInfo.onSubmit).catch(formInfo?.onSubmitFailed)
					}
				}}>
				{!hideChildren ? props.children ?? '提交' : undefined}
			</Button>
		)
	},
	{
		forwardRef: true,
	},
)

export default Submit
