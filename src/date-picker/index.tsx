import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import AntdDatePicker, { DatePickerProps as AntdDatePickerProps /* , RangePickerProps */ } from 'antd/es/date-picker'
import { PreviewText } from '../preview-text'
import { formatMomentValue4Unix, momentable } from '../__builtins__'

export type DatePickerProps<PickerProps> = Exclude<PickerProps, 'value' | 'onChange'> & {
	value: string
	onChange: (value: string | string[]) => void
}

// type ComposedDatePicker = React.FC<AntdDatePickerProps> & {
// 	RangePicker?: React.FC<RangePickerProps>
// }
export const getDefaultFormat = (props: DatePickerProps<AntdDatePickerProps>) => {
	if (props['picker'] === 'month') {
		return 'YYYY-MM'
	} else if (props['picker'] === 'quarter') {
		return 'YYYY-\\QQ'
	} else if (props['picker'] === 'year') {
		return 'YYYY'
	} else if (props['picker'] === 'week') {
		return 'gggg-wo'
	}
	return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
}

const mapDateFormat = function (isRange: boolean) {
	return (props: any) => {
		const format = props['format'] || getDefaultFormat(props)
		const { value: propsValue, onChange, ...restProps } = props
		const value = isRange ? propsValue : Array.isArray(propsValue) ? propsValue?.[0] : propsValue
		// value 是否为时间戳
		const unix = props['unix'] || false
		// 起止时间从0点 到23点结束
		const isStartUnix = props['isStartUnix'] || false
		return {
			format: format,
			value: momentable(value, format === 'gggg-wo' ? 'gggg-ww' : format),
			getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode,
			onChange: (value: moment.Moment | moment.Moment[]) => {
				if (onChange) {
					const result = formatMomentValue4Unix(value, format, unix)
					if (Array.isArray(result) && isStartUnix && !props.showTime && isRange) {
						result[0] = moment(result[0]).startOf('day').valueOf()
						result[1] = moment(result[1]).endOf('day').valueOf()
					}
					onChange(result)
				}
			},
			...restProps,
		}
	}
}

export const DatePicker: any = connect(
	AntdDatePicker,
	mapProps(mapDateFormat(false)),
	mapReadPretty(PreviewText.DatePicker),
)

DatePicker.RangePicker = connect(
	AntdDatePicker.RangePicker,
	mapProps(mapDateFormat(true)),
	mapReadPretty(PreviewText.DateRangePicker),
)
