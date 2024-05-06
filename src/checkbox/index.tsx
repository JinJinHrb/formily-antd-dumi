import { connect, mapProps, mapReadPretty } from '@formily/react'
import AntdCheckbox, { CheckboxProps, CheckboxGroupProps } from 'antd/es/checkbox'
import { PreviewText } from '../preview-text'

const CheckboxGroup = AntdCheckbox.Group

type ComposedCheckbox = React.FC<CheckboxProps> & {
	Group?: React.FC<CheckboxGroupProps>
	__ANT_CHECKBOX?: boolean
}

export const Checkbox: ComposedCheckbox = connect(
	AntdCheckbox,
	mapProps({
		value: 'checked',
		onInput: 'onChange',
	}),
)

Checkbox.__ANT_CHECKBOX = true

Checkbox.Group = connect(
	CheckboxGroup,
	mapProps({
		dataSource: 'options',
	}),
	mapReadPretty(PreviewText.Select, {
		mode: 'tags',
	}),
)
