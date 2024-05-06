import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import AntdTimePicker, {
	TimeRangePickerProps,
	TimePickerProps as AntdTimePickerProps,
} from 'antd/es/time-picker'
import { PreviewText } from '../preview-text'
import { formatMomentValue, momentable } from '../__builtins__'
type ComposedTimePicker = React.FC<React.PropsWithChildren<AntdTimePickerProps>> & {
	RangePicker?: React.FC<React.PropsWithChildren<TimeRangePickerProps>>
}

const mapTimeFormat = function() {
	return (props: any) => {
		const format = props['format'] || 'HH:mm:ss'
		const { value: propsValue, onChange, ...restProps } = props
		return {
			format,
			value: momentable(propsValue, format),
			getPopupContainer: (triggerNode: HTMLElement) => triggerNode.parentNode,
			onChange: (value: moment.Moment | moment.Moment[]) => {
				if (onChange) {
					onChange(formatMomentValue(value, format))
				}
			},
			...restProps,
		}
	}
}

export const TimePicker: ComposedTimePicker = connect(
	AntdTimePicker,
	mapProps(mapTimeFormat()),
	mapReadPretty(PreviewText.TimePicker),
)

TimePicker.RangePicker = connect(
	// @ts-ignore
	AntdTimePicker.RangePicker as React.FC<React.PropsWithChildren<TimeRangePickerProps>>,
	mapProps(mapTimeFormat()),
	mapReadPretty(PreviewText.TimeRangePicker),
) as React.FC<React.PropsWithChildren<TimeRangePickerProps>>

export default TimePicker
