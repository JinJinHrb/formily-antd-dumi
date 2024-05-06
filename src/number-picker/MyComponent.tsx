import React, { useEffect, useReducer, useState } from 'react'
import InputNumber, { InputNumberProps } from 'antd/es/input-number'
import {
	getParamByThousandthFormatType,
	IThousandthArgs,
	IThousandthFormatter,
	thousandthFormatter,
	ThousandthFormatTypes,
	thousandthParser,
	thousandthFormat,
} from '../__builtins__'
import { isNumber, isNil, isEmpty, isString } from 'lodash-es'

export interface IProps extends InputNumberProps, IThousandthFormatter {
	thousandth?: ',' | boolean // 千分位符号
}

/**
 * formatter变化后，inputNumber组件不会触发value更新
 * 这会导致在一些场景下数据异常，例如：
 * value为1.111，币种切换为日元后value仍然为1.111，这显然不符合要求
 */
const useUpdatedValue = (
	value: string | number | undefined | null,
	{ formatter, parser }: IThousandthArgs,
	onChange?: IProps['onChange'],
) => {
	const [mergedValue, setMergedValue] = useState(value)

	useEffect(() => {
		setMergedValue(value)
	}, [value])

	useEffect(() => {
		if (!isNil(value) && formatter) {
			const newValue = parser?.(formatter?.(`${value}`, { input: value ? value.toString() : '', userTyping: false }))
			if (newValue !== value) {
				setMergedValue(newValue)
				onChange?.(newValue || '')
			}
		}
	}, [formatter, value])

	return mergedValue
}

const MyComponent = ({
	value,
	thousandth,
	currency,
	precision,
	decimalPlaces,
	roundUp,
	ceilUp,
	formatType,
	stringMode: pStringMode,
	min: pMin,
	max: pMax,
	...props
}: IProps) => {
	const [thousandthArgs, setThousandthArgs] = useReducer(
		(
			_state: IThousandthArgs,
			{ thousandth, ...params }: { thousandth: IProps['thousandth'] } & IThousandthFormatter,
		) => {
			const state: IThousandthArgs = {}
			if (thousandth === true || thousandth === ',') {
				state.formatter = thousandthFormatter(params)
				state.parser = value => String(thousandthParser(thousandthFormat({ amount: value, ...params })))
			}
			return state
		},
		{},
	)

	const updatedValue = useUpdatedValue(value, thousandthArgs, props.onChange)
	const [min, setMin] = useState<number>()
	const [max, setMax] = useState<number>()

	useEffect(() => {
		const overrideParam =
			formatType && formatType in ThousandthFormatTypes
				? getParamByThousandthFormatType({ formatType, currency })
				: undefined
		if (isNumber(overrideParam?.min)) {
			setMin(overrideParam?.min)
		} else if (isNumber(pMin)) {
			setMin(pMin as number)
		}
		if (isNumber(overrideParam?.max)) {
			setMax(overrideParam?.max)
		} else if (isNumber(pMax)) {
			setMax(pMax as number)
		}
		setStringMode({ stringMode: pStringMode, min: overrideParam?.min ?? pMin, max: overrideParam?.max ?? pMax })
	}, [formatType, currency, pStringMode, pMin, pMax])

	const [stringMode, setStringMode] = useReducer(
		(
			_state: boolean,
			{ stringMode, min, max }: { stringMode?: boolean; min?: number | string; max?: number | string },
		) => stringMode || isString(min) || isString(max),
		false,
	)

	useEffect(() => {
		setThousandthArgs({
			thousandth,
			currency,
			precision,
			decimalPlaces,
			roundUp,
			ceilUp,
			formatType,
			stringMode,
			min: min ?? pMin,
			max: max ?? pMax,
		})
	}, [thousandth, currency, precision, decimalPlaces, roundUp, ceilUp, formatType, min, max, pMin, pMax, stringMode])

	return (
		<InputNumber
			min={min}
			max={max}
			stringMode={stringMode}
			value={updatedValue}
			{...props}
			{...thousandthArgs}
			precision={isEmpty(thousandthArgs) ? precision : undefined}
		/>
	)
}

export default MyComponent
