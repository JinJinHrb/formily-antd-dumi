/* eslint-disable react/destructuring-assignment */
import React, { useCallback, useEffect, useState } from 'react'
import { isEmpty } from 'lodash-es'
import XtdInput, { InputProps } from 'antd/es/input'
import Tooltip from 'antd/es/tooltip'
import { Field } from '@formily/core'
import { EditOutlined } from '@ant-design/icons'

interface IProps extends InputProps {
	selfErrors: string[]
	editId?: string // 编辑按钮对应 id
	field?: Field
	asyncValidator?: (
		value: string,
		formValues: any,
		initialValue?: string,
	) => Promise<{
		isValid: boolean
		errorMessage: string
	}>
	nonEditableJudgement?: (formValues: any) => boolean
	onChange: (data: any) => void
}
const MyComponent: React.FC<IProps> = props => {
	const { onBlur, selfErrors, editId, asyncValidator, nonEditableJudgement, field, onChange, value, ...restProps } =
		props
	const iconProps = {} as {
		id?: string
	}
	if (editId) {
		iconProps.id = editId
	}
	const disabledToggler = useCallback(
		(
			state: {
				disabled: boolean
				ts: Date
			},
			selfErrors: string[],
		) => {
			const now = new Date()
			if (nonEditableJudgement?.(field?.form.values)) {
				// 判断是否不可编辑，如果不可编辑，返回 disabled: true
				return {
					disabled: true,
					ts: now,
				}
			}
			if (!isEmpty(selfErrors)) {
				return {
					disabled: false,
					ts: now,
				}
			}
			if (now.getTime() - state.ts.getTime() < 500) {
				return state
			}
			return {
				disabled: !state.disabled,
				ts: now,
			}
		},
		[field, nonEditableJudgement],
	)
	const [disabledState, setDisabled] = React.useReducer(disabledToggler, {
		disabled: true,
		ts: new Date(),
	})
	const [initialValue, setInitialValue] = useState<string>()
	useEffect(() => {
		if (isEmpty(initialValue) && disabledState?.disabled && !isEmpty(value)) {
			setInitialValue(String(value))
		}
	}, [value, disabledState])
	return (
		<XtdInput
			{...restProps}
			value={value}
			size='large'
			disabled={disabledState.disabled}
			placeholder={'保存后，系统自动生成'}
			suffix={
				<Tooltip title={'点击编辑'}>
					<EditOutlined onClick={() => setDisabled(selfErrors)} {...iconProps} />
				</Tooltip>
			}
			onBlur={async e => {
				const { isValid, errorMessage } = (await asyncValidator?.(
					e?.target?.value,
					field?.form.values,
					initialValue,
				)) || {
					isValid: true,
					errorMessage: '',
				}
				if (isValid === false) {
					field?.setSelfErrors([errorMessage])
					return
				} else {
					field?.setSelfErrors(undefined)
				}
				onBlur?.(e)
				setDisabled(selfErrors)
			}}
			onChange={e => {
				onChange(e.target.value)
				field?.setSelfErrors(undefined)
			}}
		/>
	)
}
export default MyComponent
