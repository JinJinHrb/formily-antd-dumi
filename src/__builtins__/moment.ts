import { isArr, isFn, isEmpty } from '@formily/shared'
import moment from 'moment'

export const momentable = (value: any, format?: string) => {
	const _format = getFormat(value, format)
	return Array.isArray(value)
		? value.map(val => moment(/^\d+$/.test(val) ? Number(val) : val, getFormat(val, format)))
		: value
		? moment(/^\d+$/.test(value) ? Number(value) : value, _format)
		: value
}
const getFormat = (value: any, format?: string) => {
	// 自定义组件存在es 是字符串的 时间戳
	if (typeof value === 'number' || /^\d+$/.test(value)) {
		// 时间戳类型，添加format会变成Invalid Date
		typeof value === 'string' && (value = Number(value))
		format = ''
	}
	return format
}

export const formatMomentValue = (value: any, format: any, placeholder?: string): string | string[] => {
	const formatDate = (date: any, format: any, i = 0) => {
		if (!date) return placeholder

		if (/^\d+$/.test(date)) {
			date = parseInt(date)
		}

		if (isArr(format)) {
			const _format = format[i]
			if (isFn(_format)) {
				return _format(date)
			}
			if (isEmpty(_format)) {
				return date
			}
			return moment(date).format(_format)
		} else {
			if (isFn(format)) {
				return format(date)
			}
			if (isEmpty(format)) {
				return date
			}
			return moment(date).format(format)
		}
	}
	if (isArr(value)) {
		return value.map((val, index) => {
			return formatDate(val, format, index)
		})
	} else {
		return value ? formatDate(value, format, 0) : value || placeholder
	}
}

export const formatMomentValue4Unix = (
	value: any,
	format: any,
	unix: boolean,
	placeholder?: string,
): string | string[] | number | number[] => {
	const formatDate = (date: any, format: any, i = 0, unix: boolean) => {
		if (!date) return placeholder

		if (/^\d+$/.test(date)) {
			date = parseInt(date)
		}

		if (isArr(format)) {
			const _format = format[i]

			if (isFn(_format)) {
				return _format(date)
			}
			if (isEmpty(_format)) {
				return date
			}
			if (unix) {
				return date.valueOf()
			}
			return moment(date).format(_format)
		} else {
			if (isFn(format)) {
				return format(date)
			}
			if (isEmpty(format)) {
				return date
			}
			if (unix) {
				return date.valueOf()
			}
			return moment(date).format(format)
		}
	}
	if (isArr(value)) {
		return value.map((val, index) => {
			return formatDate(val, format, index, unix)
		})
	} else {
		return value ? formatDate(value, format, 0, unix) : value || placeholder
	}
}
