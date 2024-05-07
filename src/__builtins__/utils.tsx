import React, { CSSProperties } from 'react'
import {
	isNumber,
	min,
	max,
	isArray,
	omit,
	merge,
	isObject,
	isEmpty,
	clone,
	isFunction,
	isObjectLike,
	isNil,
	trim,
	repeat,
	cloneDeep,
	isString,
} from 'lodash-es'
import BigNumber from 'bignumber.js'

/** 不带小数位的货币代码 */
export const ZERO_DECIMAL_CURRENCY: (string | undefined)[] = ['JPY', 'KRW', 'VND', 'CLP']

/** 保留三位小数的货币代码 */
export const THREE_DECIMAL_CURRENCY: (string | undefined)[] = ['KWD']

interface IRect {
	top: number
	left: number
	width: number
	height: number
}

export const getTransparentLayer = (rects: IRect[] | IRect, props?: any) => {
	const rect = {
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	}
	if (isArray(rects)) {
		const rectsArray = (rects as IRect[]).filter(a => a && (a as any).width !== 0)
		rect.top = min(rectsArray.map(el => el.top)) ?? 0
		rect.left = min(rectsArray.map(el => el.left)) ?? 0
		rect.width = max(rectsArray.map(el => el.width)) ?? 0
		rect.height = max(rectsArray.map(el => el.height)) ?? 0
	} else {
		merge(rect, rects)
	}
	const newStyle = {
		position: 'fixed',
		zIndex: 1,
	} as CSSProperties
	const { style: propsStyle, ...otherProps } = props || {}
	if (isObject(propsStyle) && !isEmpty(propsStyle)) {
		merge(newStyle, propsStyle)
	}
	return [
		// 第一象限
		{
			left: rect.left + rect.width,
			top: rect.top,
			width: document.documentElement.clientWidth - rect.left - rect.width,
			height: rect.height,
			// border: '1px solid red',
		},
		// 第二象限
		{
			left: 0,
			top: 0,
			width: document.documentElement.clientWidth,
			height: rect.top,
			// border: '1px solid blue',
		},
		// 第三象限
		{
			left: 0,
			top: rect.top,
			width: rect.left,
			height: rect.height,
			// border: '1px solid green',
		},
		// 第四象限
		{
			left: 0,
			top: rect.top + rect.height,
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight - rect.top,
			// border: '1px solid yellow',
		},
	].map((el, idx) => {
		const newStyleCopy = clone(newStyle)
		merge(newStyleCopy, el)
		return <div key={idx} style={newStyleCopy} {...otherProps}></div>
	})
}

/* 深度比较，但忽略函数区别 */
export const isDeepEqual = (object1: object, object2: object) => {
	const objKeys1 = Object.keys(object1)
	const objKeys2 = Object.keys(object2)

	if (objKeys1.length !== objKeys2.length) return false

	for (const key of objKeys1) {
		const value1 = object1[key]
		const value2 = object2[key]

		const isFunc = isFunction(value1) && isFunction(value2)
		if (isFunc) {
			continue
		}

		const isObjects = isObjectLike(value1) && isObjectLike(value2)
		if ((isObjects && !isDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
			return false
		}
	}
	return true
}

/* Define function to recursively search for existence of key in obj */
export const doesObjectHaveNestedKey = (obj: unknown, key: unknown) => {
	if (obj === null || obj === undefined) {
		return false
	}
	if (!isObject(obj)) {
		return false
	}

	for (const k of Object.keys(obj)) {
		if (k === key) {
			/* Search keys of obj for match and return true if match found */
			return true
		} else {
			const val = obj[k]

			/* If k not a match, try to search it's value. We can search through
      object value types, seeing they are capable of containing
      objects with keys that might be a match */
			if (typeof val === 'object') {
				/* Recursivly search for nested key match in nested val */
				if (doesObjectHaveNestedKey(val, key) === true) {
					return true
				}
			}
		}
	}
	return false
}

/* Define function to recursively search for existence of key in obj */
export const doesObjectHaveNestedPair = (obj: unknown, key: unknown, val: unknown) => {
	if (obj === null || obj === undefined) {
		return false
	}
	if (isNil(val)) {
		return doesObjectHaveNestedKey(obj, key)
	}
	if (!isObject(obj)) {
		return false
	}
	for (const k of Object.keys(obj)) {
		if (k === key && obj[k]) {
			if (obj[k] === val) {
				return true
			} else {
				continue
			}
		} else {
			const elem = obj[k]
			if (typeof elem === 'object') {
				if (doesObjectHaveNestedPair(elem, key, val) === true) {
					return true
				}
			}
		}
	}
	return false
}

/**
 * 获取电话中的区号段
 */
export const getAreaCodeSection = (value?: string) => {
	const str = trim(value)
	const firstPlusIndex = str.indexOf('+')
	if (firstPlusIndex !== 0) {
		return []
	}
	const firstHyphenIndex = str.indexOf('-')
	const firstSpaceIndex = str.indexOf(' ')
	const lastSeparatorIndex = [firstHyphenIndex, firstSpaceIndex].find(a => a > -1) ?? -1
	if (firstPlusIndex > -1 && lastSeparatorIndex > -1) {
		return [firstPlusIndex, lastSeparatorIndex]
	}
	return []
}

export const getAreaCodeFromAccount = (value: string) => {
	const section = getAreaCodeSection(value)
	if (isEmpty(section)) {
		return ''
	}
	const [firstPlusIndex, lastHyphenIndex] = section
	return value.slice(firstPlusIndex + 1, lastHyphenIndex)
}

export const isDomVisible = (elem: HTMLElement) => {
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0
}

export const isValidBigNumber = (minVal: BigNumber) => {
	return !minVal.isNaN() && minVal.isFinite()
}

// InputNumber 千分位 formatter & parser Start
export interface IThousandthArgs {
	formatter?: (v: string, options?: { input: string; userTyping: boolean }) => string
	parser?: (v: string) => string
}

export interface IThousandthFormatter {
	currency?: string
	precision?: number
	decimalPlaces?: number
	formatType?: ThousandthFormatTypes
	roundUp?: boolean
	ceilUp?: boolean
	/** value溢出则取最大值 max */
	limit?: boolean
	/** 值太小时，向上取整，否则截断多余小数位 */
	ceilUpIfTooSmall?: boolean
	stringMode?: boolean
	min?: number | string
	max?: number | string
}

export const thousandthFormatter =
	(params: IThousandthFormatter) =>
	(
		value: string,
		options: {
			input: string
			userTyping: boolean
		},
	) => {
		const stringMode = params.stringMode
		let alteredValue = undefined
		let overrideParam =
			params?.formatType && params?.formatType in ThousandthFormatTypes
				? getParamByThousandthFormatType({ formatType: params?.formatType, currency: params?.currency })
				: params
		const precision = (overrideParam as { precision?: number })?.precision
		if (options.userTyping && isNumber(precision)) {
			overrideParam = omit(overrideParam, 'precision') as TThousandthFormatParams
			;(
				overrideParam as {
					decimalPlaces?: number
				}
			).decimalPlaces = precision
		}
		if (stringMode === true) {
			const min = overrideParam?.min ?? params.min
			const max = overrideParam?.max ?? params.max
			const bigValue = new BigNumber(value)
			if (!isNil(max)) {
				const maxVal = new BigNumber(max)
				if (isValidBigNumber(maxVal) && maxVal.comparedTo(bigValue) < 0) {
					alteredValue = maxVal.toFixed()
				}
			}
			if (!isNil(min)) {
				const minVal = new BigNumber(min)
				if (isValidBigNumber(minVal) && minVal.comparedTo(bigValue) > 0) {
					alteredValue = minVal.toFixed()
				}
			}
		}
		return thousandthFormat({ amount: alteredValue ?? value, ...overrideParam })
	}

export interface IThousandthFormat extends IThousandthFormatter {
	amount?: string | number
}

/*
 * 单价: unitPrice
 * 总价: settlementAmount
 * 数量: quantity
 * 重量: weight
 * 尺寸: size
 * 体积: volume
 * 汇率: exchangeRate
 */
export enum ThousandthFormatTypes {
	unitPrice = 'unitPrice',
	settlementAmount = 'settlementAmount',
	quantity = 'quantity',
	weight = 'weight',
	size = 'size',
	volume = 'volume',
	exchangeRate = 'exchangeRate',
}

const Nine10_Nine6 = repeat('9', 10) + '.' + repeat('9', 6)

const Nine10 = repeat('9', 10)

const Nine14 = repeat('9', 14)

const Nine13_Nine3 = repeat('9', 13) + '.' + repeat('9', 3)

const Nine14_Nine2 = repeat('9', 14) + '.' + repeat('9', 2)

const Nine12_Nine10 = repeat('9', 12) + '.' + repeat('9', 10)

const Nine8_Nine8 = repeat('9', 8) + '.' + repeat('9', 8)

export type TThousandthFormatParams =
	| {
			decimalPlaces: number
			max?: number
			min?: number
	  }
	| {
			precision: number
			max?: number
			min?: number
	  }

export const getParamByThousandthFormatType = ({
	formatType,
	currency,
}: {
	formatType: ThousandthFormatTypes
	currency?: string
}) => {
	const params = {
		[ThousandthFormatTypes.unitPrice]: {
			decimalPlaces: ZERO_DECIMAL_CURRENCY.includes(currency) ? 0 : 6,
			max: ZERO_DECIMAL_CURRENCY.includes(currency) ? Nine10 : Nine10_Nine6,
			min: 0,
		},
		[ThousandthFormatTypes.settlementAmount]: {
			precision: ZERO_DECIMAL_CURRENCY.includes(currency) ? 0 : THREE_DECIMAL_CURRENCY.includes(currency) ? 3 : 2,
			max: ZERO_DECIMAL_CURRENCY.includes(currency)
				? Nine14
				: THREE_DECIMAL_CURRENCY.includes(currency)
				? Nine13_Nine3
				: Nine14_Nine2,
			min: 0,
		},
		[ThousandthFormatTypes.quantity]: {
			decimalPlaces: 2,
			max: Nine14_Nine2,
			min: 0,
		},
		[ThousandthFormatTypes.weight]: {
			decimalPlaces: 2,
			max: Nine14_Nine2,
			min: 0,
		},
		[ThousandthFormatTypes.size]: {
			decimalPlaces: 2,
			max: Nine14_Nine2,
			min: 0,
		},
		[ThousandthFormatTypes.volume]: {
			decimalPlaces: 10,
			max: Nine12_Nine10,
			min: 0,
		},
		[ThousandthFormatTypes.exchangeRate]: {
			decimalPlaces: 8,
			max: Nine8_Nine8,
			min: 0,
		},
	}
	return params[formatType] as unknown as TThousandthFormatParams
}

/**
 * 按小数位向上取整
 * @param num 原始数字
 * @param decimalPlaces 小数位
 */
function ceilUpNum(num: number | string | undefined, decimalPlaces: number) {
	return BigNumber(num ?? 0)
		.multipliedBy(Math.pow(10, decimalPlaces))
		.integerValue(BigNumber.ROUND_CEIL)
		.dividedBy(Math.pow(10, decimalPlaces))
		.toFixed()
}

/**
 *
 * @param amount 金额/数值
 * @param currency 货币单位的英文缩写，如果有了货币精度以货币对应精度为准，precision 不起作用；小数位不足会自动补零
 * @param precision 固定小数位；小数位不足会自动补零
 * @param decimalPlaces 最大小数位，超出简单截断，小数位不足不补零，仅当 currency 及 precision 不存在时有效
 * @param roundUp true 四舍五入，否则截断多余小数位
 * @param ceilUp true 向上取整，否则截断多余小数位
 * @param ceilUpIfTooSmall true 值太小时，向上取整，否则截断多余小数位
 * @param limit value溢出则取最大值 max
 * @param formatType 如果提供枚举类型之内的参数，会覆盖 precision, decimalPlaces；在 formily-antd-dumi 数字相关栏位还会覆盖 max 或 min
 * @returns
 */
// eslint-disable-next-line complexity
export const thousandthFormat = (props: IThousandthFormat): string => {
	const { amount: inputAmount, limit, ceilUpIfTooSmall, formatType, roundUp } = props
	let { ceilUp } = props
	let { min, max } = props
	let { currency, precision, decimalPlaces } = props
	if (isNil(inputAmount)) return ''

	let amount = String(inputAmount)
	if (amount.includes(',')) {
		amount = amount.replace(/,/g, '')
	}
	amount = amount.replace(/\.$/, '')
	while (amount.indexOf('.') !== amount.lastIndexOf('.')) {
		amount = amount.replace('.', '')
	}

	const oddParams: Array<string> = ['', 'undefined', 'null']
	if (oddParams.includes(amount)) {
		return ''
	}
	const overrideParam =
		formatType && formatType in ThousandthFormatTypes
			? getParamByThousandthFormatType({ formatType, currency })
			: undefined
	if (!isEmpty(overrideParam)) {
		precision = (
			overrideParam as {
				precision: number
				max: any
				min: number
			}
		).precision
		decimalPlaces = (
			overrideParam as {
				decimalPlaces: number
				max: any
				min: number
			}
		).decimalPlaces
		currency = undefined

		if (!max && overrideParam.max) {
			max = overrideParam.max
			min = BigNumber(overrideParam.max).multipliedBy(-1).toFixed()
		}
	}

	if (limit) {
		if (max && BigNumber(amount).gt(max)) {
			amount = String(max)
		} else if (min && BigNumber(amount).lt(min)) {
			amount = String(min)
		}
	}

	let generalDecimalPlaces: number | undefined

	if (ZERO_DECIMAL_CURRENCY.includes(currency as string)) {
		generalDecimalPlaces = 0
	} else if (THREE_DECIMAL_CURRENCY.includes(currency as string)) {
		generalDecimalPlaces = 3
	} else if (currency?.length === 3) {
		generalDecimalPlaces = 2
	} else if (isNumber(precision)) {
		generalDecimalPlaces = precision
	} else if (isNumber(decimalPlaces)) {
		generalDecimalPlaces = decimalPlaces
	}

	if (isNumber(generalDecimalPlaces) && ceilUpIfTooSmall && BigNumber(amount).lt(Math.pow(10, -generalDecimalPlaces))) {
		ceilUp = true
	}

	// 只传入currency的情况
	if (roundUp) {
		// 如果选择四舍五入，在截取前预先计算新的 amount
		amount = Number(amount).toFixed(generalDecimalPlaces ?? 0)
	} else if (ceilUp) {
		amount = ceilUpNum(amount, generalDecimalPlaces ?? 0).toString()
	}
	const splitAmount = amount.split('.')
	let fraction = splitAmount[1]
	if (!isEmpty(fraction)) {
		fraction = fraction.replace(/0+$/g, '')
		if (isNumber(generalDecimalPlaces)) {
			fraction = fraction.slice(0, generalDecimalPlaces)
		}
		if (
			(currency?.length === 3 || isNumber(precision)) &&
			isNumber(generalDecimalPlaces) &&
			fraction.length < generalDecimalPlaces
		) {
			fraction += repeat('0', generalDecimalPlaces - fraction.length)
		}
		return splitDecimal(splitAmount[0]) + (isEmpty(fraction) ? '' : '.' + fraction)
	} else if (currency?.length === 3 || isNumber(precision)) {
		if (generalDecimalPlaces === 0) {
			return splitDecimal(splitAmount[0])
		}
		return splitDecimal(splitAmount[0]) + '.' + repeat('0', generalDecimalPlaces)
	} else if (generalDecimalPlaces === 0) {
		return splitDecimal(splitAmount[0])
	}
	return splitDecimal(amount)
}

/**
 * 为整数分割千分位
 * */
const splitDecimal = (currency: string): string => {
	if (currency.includes('.')) {
		const parsedArr = currency.split('.')
		parsedArr[0] = parsedArr[0].replace(/\B(?=(\d{3})+\b)/g, ',')
		parsedArr[1] = parsedArr[1].replace(/0+$/g, '')
		return parsedArr.join('.').replace(/\.$/, '')
	} else {
		return currency.replace(/\B(?=(\d{3})+\b)/g, ',')
	}
}

export const thousandthParser = (value: string | number) => {
	if (isNumber(value)) {
		return value
	}
	if (!/^-?\d[,0-9.]+(\d|.)$/.test(trim(value))) {
		return value
	}
	if ((value as string).indexOf('.') === 0) {
		return value
	}
	// return value.replace(/(\s|,)/g, '').replace(/(?<=\.[^.]*)\./g, '') // Safari 回顾零宽断言不兼容
	let newValue: string = (value as string).replace(/(\s|,)/g, '')
	while (newValue.indexOf('.') !== newValue.lastIndexOf('.')) {
		newValue = newValue.replace('.', '')
	}
	if (/\.$/.test(newValue)) {
		newValue = newValue.slice(0, newValue.length - 1)
	}
	return newValue
}

// InputNumber 千分位 formatter & parser End

// 去除提交数据中文本前后空格
export const trimString: <T>(value: T | string) => T | string = value => {
	let newValue = cloneDeep(value)
	if (isString(newValue)) {
		newValue = trim(newValue)
	}
	if (isObject(newValue)) {
		Object.keys(newValue).forEach(item => {
			newValue[item] = trimString(newValue[item])
		})
	}
	return newValue
}
