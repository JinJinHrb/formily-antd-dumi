import React, { useCallback, useEffect, useReducer, useState, useRef } from 'react'
import { useField } from '@formily/react'
import InputNumber from 'antd/es/input-number'
import Select, { LabeledValue } from 'antd/es/Select'
import { Field } from '@formily/core'
import { isNumber, isArray, isEmpty, isFunction, isNil, trim, isString } from 'lodash-es'
import {
	getParamByThousandthFormatType,
	IThousandthArgs,
	IThousandthFormatter,
	thousandthFormatter,
	ThousandthFormatTypes,
	thousandthParser,
	thousandthFormat,
} from '../__builtins__'
export interface ICurrencyRates {
	fromCcy: string
	toCcy: string
	rate: number
	customized: boolean
	refreshTime: unknown
}
export interface IProps extends IThousandthFormatter {
	value: Array<string | number | undefined>
	disabled?: boolean
	onChange: (value: Array<string | number | undefined>) => void
	useCurrencyOptions: () => {
		data: LabeledValue[]
	}
	getCcyRateList?: () => Promise<ICurrencyRates[] | undefined>
	thousandth?: ',' | boolean // 千分位符号
	selectId?: string
	inputId?: string
}
interface SubProps {
	id?: string
}

/**
 * formatter 或 amount 或 currency 变化后，amount-currency 组件不会触发 price[0] 更新
 */
const useUpdatedValue = (
	[amount, currency]: (string | number | undefined)[],
	{ formatter, parser }: IThousandthArgs,
	onChange?: IProps['onChange'],
) => {
	const [mergedValue, setMergedValue] = useState([amount, currency])
	const ref = useRef<(string | number | undefined)[]>([])
	useEffect(() => {
		if (ref.current?.[0] === amount && ref.current?.[1] === currency) {
			return
		}
		setMergedValue([amount, currency])
	}, [amount, currency])
	useEffect(() => {
		if (!formatter || isNil(amount) || isNil(currency)) {
			return
		}
		const newValue = parser?.(
			formatter?.(`${amount}`, {
				input: amount ? amount.toString() : '',
				userTyping: false,
			}),
		)
		ref.current = [amount, currency]
		if (newValue !== amount) {
			setMergedValue([newValue, currency])
			onChange?.([newValue, currency])
		}
	}, [formatter, amount, currency])
	return mergedValue
}
export const MyComponent: React.FC<IProps> = ({
	thousandth,
	precision,
	decimalPlaces,
	roundUp,
	ceilUp,
	formatType,
	useCurrencyOptions,
	getCcyRateList,
	selectId,
	inputId,
	stringMode: pStringMode,
	min: pMin,
	max: pMax,
	...props
}) => {
	const ccyRateListRef = useRef<ICurrencyRates[] | undefined>()
	useEffect(() => {
		if (ccyRateListRef.current === undefined && isFunction(getCcyRateList)) {
			getCcyRateList().then(
				ccyRateList => {
					ccyRateListRef.current = ccyRateList
				},
				() => {
					ccyRateListRef.current = []
				},
			)
		}
	}, [getCcyRateList])
	const prevSelectedCcy = useRef<string | undefined>()
	const { data: curryOption } = useCurrencyOptions()
	const field = useField() as Field
	const { onChange, value, disabled } = props
	const prefixCls = 'xt-amount-currency'
	const [price, setPrice] = useState<(string | number | undefined)[]>([0, undefined])
	useEffect(() => {
		value && Array.isArray(value) && value.length && setPrice(value)
	}, [value])
	const amountChange = () => {
		onChange(price)
		checkRequired(price)
	}
	const checkRequired = (value: Array<string | number | undefined>) => {
		const [inputValue, selectValue] = value
		const { required } = field || {}
		if (
			required &&
			selectValue &&
			(isNil(inputValue) || (!isNumber(inputValue) && !trim(inputValue as unknown as string)))
		) {
			field?.setSelfErrors(['该字段是必填字段'])
		} else if (inputValue && !selectValue) {
			field?.setSelfErrors(['请选择币种'])
		} else {
			field?.setSelfErrors([])
		}
	}
	const filterOption = useCallback(
		(input, option) =>
			trim(option?.label ?? '')
				.toLowerCase()
				.includes(input.toLowerCase()) ||
			trim(option?.value ?? '')
				.toLowerCase()
				.includes(input.toLowerCase()),
		[],
	)
	const [thousandthArgs, setThousandthArgs] = useReducer(
		(
			_state: IThousandthArgs,
			{
				thousandth,
				...params
			}: {
				thousandth: IProps['thousandth']
			} & IThousandthFormatter,
		) => {
			const state: IThousandthArgs = {}
			if (thousandth === true || thousandth === ',') {
				state.formatter = thousandthFormatter(params)
				state.parser = value =>
					String(
						thousandthParser(
							thousandthFormat({
								amount: value,
								...params,
							}),
						),
					)
			}
			return state
		},
		{},
	)
	const updatedValue = useUpdatedValue(price, thousandthArgs, props.onChange)
	const [min, setMin] = useState<number>()
	const [max, setMax] = useState<number>()
	useEffect(() => {
		const currency = String(price?.[1])
		const overrideParam =
			formatType && formatType in ThousandthFormatTypes
				? getParamByThousandthFormatType({
						formatType,
						currency,
				  })
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
		setStringMode({
			stringMode: pStringMode,
			min: overrideParam?.min ?? pMin,
			max: overrideParam?.max ?? pMax,
		})
	}, [formatType, price, pStringMode, pMin, pMax])
	const onChangeSetPrice = useCallback(
		(value: number) => {
			setPrice([value, price[1]])
		},
		[price],
	)
	const [stringMode, setStringMode] = useReducer(
		(
			_state: boolean,
			{
				stringMode,
				min,
				max,
			}: {
				stringMode?: boolean
				min?: number | string
				max?: number | string
			},
		) => stringMode || isString(min) || isString(max),
		false,
	)
	useEffect(() => {
		const currency = String(price?.[1])
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
	}, [thousandth, price, precision, decimalPlaces, roundUp, ceilUp, formatType, min, max, pMin, pMax, stringMode])
	const [selectProps, setSelectProps] = useState<SubProps>()
	const [inputProps, setInputProps] = useState<SubProps>()
	useEffect(() => {
		if (selectId) {
			setSelectProps({
				id: selectId,
			})
		}
	}, [selectId])
	useEffect(() => {
		if (inputId) {
			setInputProps({
				id: inputId,
			})
		}
	}, [inputId])
	const selectChange = (value: string) => {
		const outValue = [price[0], value] // [amount, currency]
		const ccyRateList = ccyRateListRef.current
		if (prevSelectedCcy.current !== value && isArray(ccyRateList) && !isEmpty(ccyRateList)) {
			const rateObj =
				value === 'CNY'
					? ({
							fromCcy: 'CNY',
							toCcy: 'CNY',
							rate: 1,
							customized: false,
							refreshTime: null,
					  } as ICurrencyRates)
					: ccyRateList?.find(item => item.fromCcy === value && item.toCcy === 'CNY')
			outValue[0] = rateObj?.rate || 1
		}
		prevSelectedCcy.current = value
		outValue[0] = String(
			thousandthParser(
				thousandthFormat({
					amount: outValue[0],
					currency: outValue[1] as string,
					precision,
					decimalPlaces,
					roundUp,
					ceilUp,
					formatType,
					stringMode,
					min: min ?? pMin,
					max: max ?? pMax,
				}),
			),
		)
		setPrice(outValue)
		onChange(outValue)
		checkRequired(outValue)
	}
	return (
		<div className={`${prefixCls}-wrap`}>
			<div className={`${prefixCls}-wrap-item`}>
				<Select
					options={curryOption}
					onChange={selectChange}
					value={updatedValue[1] /* price[1] */}
					placeholder={'请选择币种'}
					disabled={disabled}
					getPopupContainer={triggerNode => triggerNode.parentNode}
					showSearch={true}
					filterOption={filterOption}
					{...selectProps}
				/>
			</div>
			<div className={`${prefixCls}-wrap-item`}>
				<InputNumber
					size='large'
					onChange={onChangeSetPrice}
					placeholder={'请输入'}
					min={min ?? 0}
					max={max}
					stringMode={stringMode}
					onBlur={amountChange}
					value={updatedValue[0] /* price[0] */}
					disabled={disabled}
					{...thousandthArgs}
					precision={isEmpty(thousandthArgs) ? precision : undefined}
					{...inputProps}
				/>
			</div>
		</div>
	)
}
