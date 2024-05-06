import { connect, mapProps, mapReadPretty } from '@formily/react'
import AntdRadio, { RadioProps, RadioGroupProps } from 'antd/es/radio'
import { PreviewText } from '../preview-text'

const RadioGroup = AntdRadio.Group
type ComposedRadio = React.FC<RadioProps> & {
	Group?: React.FC<RadioGroupProps>
	__ANT_RADIO?: boolean
}

export const Radio: ComposedRadio = connect(
	AntdRadio,
	mapProps({
		value: 'checked',
		onInput: 'onChange',
	}),
)

Radio.__ANT_RADIO = true

Radio.Group = connect(
	RadioGroup,
	mapProps({
		dataSource: 'options',
	}),
	mapReadPretty(PreviewText.Select),
)
