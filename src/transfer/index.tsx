import { connect, mapProps } from '@formily/react'
// import { Transfer as AntdTransfer } from 'antd'
import { XtdTransfer } from './XtdTransfer'
import { isVoidField } from '@formily/core'

export const Transfer = connect(
	XtdTransfer,
	mapProps(
		{
			value: 'targetKeys',
		},
		(props, field) => {
			if (isVoidField(field)) return props
			return {
				...props,
				dataSource:
					field.dataSource?.map(item => {
						return {
							...item,
							title: item.title || item.label,
							key: item.key || item.value,
						}
					}) || [],
			}
		},
	),
)

Transfer.defaultProps = {
	render: item => item.title,
}

export default Transfer
