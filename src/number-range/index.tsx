import React, { FC } from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import InputNumber from 'antd/es/input-number'
import { PreviewText } from '../preview-text'
import { usePrefixCls } from '../__builtins__'
interface INumberRangeProps {
	onChange: (value: number[]) => void
	value: number[]
	precision: number
}
const NumberRangeBase: FC<INumberRangeProps> = props => {
	const { onChange, value: outerValue, precision = 0 } = props
	const prefixCls = usePrefixCls('formily-number-range')
	const [min, max] = Array.isArray(outerValue) ? outerValue : []
	const handleChange = (type: 'min' | 'max') => {
		return (cur: number) => {
			const nextValue = [type === 'min' ? cur : min, type === 'max' ? cur : max]
			onChange(nextValue)
		}
	}
	const handleBlur = (type: 'min' | 'max') => {
		return () => {
			if (min != null && max == null) {
				if (min < 0) {
					onChange([0, max])
				}
			} else if (min == null && max != null) {
				if (max < 0) {
					onChange([min, 0])
				}
			} else if (min != null && max != null) {
				if (type === 'max') {
					if (max < 0) {
						onChange([min, 0])
					} else if (max < min) {
						onChange([max, max])
					}
				} else if (type === 'min') {
					if (min < 0) {
						onChange([0, max])
					} else if (min > max) {
						onChange([min, min])
					}
				}
			}
		}
	}
	return (
		<div className={`${prefixCls}-wrapper`}>
			<InputNumber
				id={'1bf5cb3a'}
				precision={precision}
				placeholder={'最小值'}
				value={min}
				onChange={handleChange('min')}
				onBlur={handleBlur('min')}
			/>
			<div className={`${prefixCls}-divider`} />
			<InputNumber
				id={'cb5cc671'}
				precision={precision}
				placeholder={'最大值'}
				value={max}
				onChange={handleChange('max')}
				onBlur={handleBlur('max')}
			/>
		</div>
	)
}
export const NumberRange = connect(
	NumberRangeBase,
	mapProps({
		loading: true,
	}),
	mapReadPretty(PreviewText.Input),
)
