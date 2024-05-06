import React, { PropsWithChildren, useState } from 'react'
import { Button, ButtonProps, Modal, ModalProps, Popconfirm, PopconfirmProps } from 'antd/es'
import { Form, FormProps } from '../form'
import { initForm } from '../form/initForm'
import { ISubmitProps } from '../submit'
import { Form as FormType } from '@formily/core'
import { observer } from '@formily/react'
import { useControllableValue } from 'ahooks'
import { usePrefixCls } from '../__builtins__/hooks'

const bindTrigger = (trigger: React.ReactElement | undefined, onOpen: () => void) => {
	if (!trigger) return
	return React.cloneElement(trigger, {
		key: 'trigger',
		...trigger.props,
		onClick: async (...args: any[]) => {
			const result = await trigger.props?.onClick?.(...args)
			if (result !== false) {
				// onClick事件返回 false，不打开弹窗
				onOpen()
			}
		},
	})
}

const useCancelButtonPopconfirm = (
	cancelButtonPopconfirm: boolean | Partial<PopconfirmProps> | undefined,
	internalPopconfirmProps: Partial<PopconfirmProps>,
): PopconfirmProps & { description?: string } => {
	const title = '确定要取消吗？'
	const mergedCancelPopconfirm =
		cancelButtonPopconfirm === true || cancelButtonPopconfirm === undefined ? {} : cancelButtonPopconfirm
	if (mergedCancelPopconfirm === false) {
		return { title, disabled: true }
	} else {
		return {
			title,
			placement: 'topLeft',
			description: '取消后您填写的表单数据将会丢失。',
			...internalPopconfirmProps,
			...mergedCancelPopconfirm,
			disabled: internalPopconfirmProps.disabled || mergedCancelPopconfirm.disabled,
			onConfirm(e) {
				internalPopconfirmProps.onConfirm?.(e)
				mergedCancelPopconfirm.onConfirm?.(e)
			},
		}
	}
}

const sizeMap = {
	large: {
		width: 952,
		columns: 2,
	},
	middle: {
		width: 752,
		columns: 2,
	},
	small: {
		width: 552,
		columns: 1,
	},
}

export interface FormModalProps<T extends object = any>
	extends Omit<ModalProps, 'onCancel' | 'footer' | 'footerStyle' | 'okButtonProps' | 'cancelButtonProps'> {
	/** form 实例 */
	form?: FormType<T>
	/** 用于触发 Modal 打开的 dom，一般是 button，内部会拦截 onClick 事件，点击时打开弹窗，如果点击时不想打开，可以在onClick事件中返回 false */
	trigger?: React.ReactElement
	/** 是否显示 */
	visible?: boolean
	/** 弹窗显隐回调 */
	onVisibleChange?: (visible: boolean) => void
	/**
	 * 表单提交回调，成功后默认会关闭抽屉，返回 false 不关闭抽屉
	 */
	onSubmit?: FormProps<T>['onSubmit']
	onSubmitFailed?: FormProps<T>['onSubmitFailed']
	onClose?: (
		e?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLElement | HTMLBaseElement>,
	) => void
	/**
	 * 控制抽屉宽度和表单列数
	 *
	 * large -> 952 2列
	 *
	 * middle -> 752 2列
	 *
	 * small -> 552 1列
	 *
	 * @default 'middle'
	 */
	size?: 'large' | 'middle' | 'small'
	/** 提交按钮参数 */
	okButtonProps?: ISubmitProps
	/** 取消按钮参数 */
	cancelButtonProps?: ButtonProps
	/** 取消按钮/关闭icon二次确认，设为 false 禁用二次确认 */
	cancelButtonPopconfirm?: boolean | Partial<PopconfirmProps>
	/** FormLayout 配置 */
	formProps?: FormProps<T>
	/** FormModal 是 Form 的一个变体，本质上还是一个表单，所以无法使用 footer 来自定义页脚。通过 action 来自定义操作按钮 */
	action?: FormProps<T>['action']
}

export const FormModal = observer(
	<T extends object = any>(props: PropsWithChildren<FormModalProps<T>>): React.ReactElement => {
		const {
			size = 'middle',
			form: form,
			onSubmit: propOnSubmit,
			onSubmitFailed,
			children,
			cancelButtonProps,
			cancelButtonPopconfirm,
			okButtonProps,
			formProps,
			action: propAction,
			onClose: propOnClose,
			trigger: propTrigger,
			...modalProps
		} = props

		const [internalForm, setInternalForm] = useState<FormType<T>>()

		const formModalPrefixCls = usePrefixCls('formily-form-modal', { prefixCls: props.prefixCls })
		const sizeInfo = sizeMap[size]

		const [visible, setVisible] = useControllableValue<boolean>(props, {
			valuePropName: 'visible',
			trigger: 'onVisibleChange',
		})

		const onSubmit = async (values: T) => {
			const submitResult = await (formProps?.onSubmit || propOnSubmit)?.(values)
			if (submitResult !== false) {
				// 提交成功，自动关闭弹窗
				propOnClose?.()
				setVisible(false)
			}
		}

		const onClose = (
			e?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLElement | HTMLBaseElement>,
		) => {
			setVisible(false)
			propOnClose?.(e)
		}

		const trigger = bindTrigger(propTrigger, () => {
			setVisible(true)
		})

		const mergedPopconfirm = useCancelButtonPopconfirm(cancelButtonPopconfirm, { disabled: !internalForm?.modified })

		const mergedAction = propAction ?? formProps?.action
		const action = mergedAction === true ? {} : mergedAction
		return (
			<>
				<Modal
					visible={visible}
					title='新建'
					width={sizeInfo.width}
					maskClosable={false}
					destroyOnClose={true}
					className={formModalPrefixCls}
					onCancel={e => {
						onClose(e)
					}}
					footer={false}
					{...modalProps}>
					<Form
						form={form}
						margin
						stretch
						fixedWidth={false}
						{...formProps}
						formRef={form => {
							setInternalForm(form)
							initForm(formProps?.formRef, form)
						}}
						onSubmit={formProps?.onSubmit || onSubmit}
						onSubmitFailed={formProps?.onSubmitFailed || onSubmitFailed}
						style={{ height: '100%', ...formProps?.style }}
						action={
							action === false
								? false
								: {
										...action,
										submitButtonProps: okButtonProps || action?.submitButtonProps,
										render(dom) {
											const domWithClose = (
												<>
													<Popconfirm
														{...mergedPopconfirm}
														onConfirm={e => {
															mergedPopconfirm.onConfirm?.()
															onClose(e)
														}}>
														<Button
															{...cancelButtonProps}
															onClick={e => {
																if (!mergedPopconfirm.disabled) return
																cancelButtonProps?.onClick?.(e)
																onClose(e)
															}}>
															取消
														</Button>
													</Popconfirm>
													{dom}
												</>
											)
											return action?.render ? action?.render(domWithClose) : domWithClose
										},
								  }
						}
						childColumns={formProps?.childColumns ?? sizeInfo.columns}>
						{children}
					</Form>
				</Modal>
				{trigger}
			</>
		)
	},
) as <T extends object = any>(props: PropsWithChildren<FormModalProps<T>>) => React.ReactElement
