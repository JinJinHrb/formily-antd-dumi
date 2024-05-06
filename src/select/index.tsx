import React from 'react'
import { connect, mapReadPretty, mapProps } from '@formily/react'
import AntdSelect from 'antd/es/Select'
import { PreviewText } from '../preview-text'

// 针对于隐藏的系统字段，value转换为对应label
const trasferValue = (value?: string | string[], fieldHideEnum?: { label: string; value: string }[]) => {
	if (!Array.isArray(fieldHideEnum) || !value) {
		return value
	}

	if (Array.isArray(value)) {
		return value.map(item => {
			const itemLabel = fieldHideEnum.find(enumItem => enumItem?.value === item)
			return itemLabel?.label || item
		})
	}

	return fieldHideEnum.find(enumItem => enumItem?.value === value)?.label || value
}

export const Select: React.FC = connect(
	AntdSelect,
	mapProps(
		{
			dataSource: 'options',
			loading: true,
		},
		(props, field) => {
			return {
				value: trasferValue(props.value as string, field?.data?.hideEnum),
				getPopupContainer: triggerNode => triggerNode.parentNode,
				...props,
			}
		},
	),
	mapReadPretty(PreviewText.Select),
)
