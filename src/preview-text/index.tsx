import React, { createContext, useContext } from 'react'
import { isArr, toArr, isValid } from '@formily/shared'
import { Field } from '@formily/core'
import { observer, useField } from '@formily/react'
import {
	CascaderProps,
	InputProps,
	SelectProps,
	TreeSelectProps,
	DatePickerProps as AntdDatePickerProps,
	TimePickerProps,
	TimeRangePickerProps,
} from 'antd/es'
import Tag from 'antd/es/tag'
import { Tag as CustomSelectTag } from './component/Tag'
import Space from 'antd/es/Space'
import cls from 'classnames'
import { formatMomentValue, usePrefixCls } from '../__builtins__'
import { EditOutlined } from '@ant-design/icons'
import Button from 'antd/es/button'
import { isObject } from 'lodash-es'
import TagItem, { DEFAULT_TAG_COLOR } from './component/TagItem'
import { TagRecord, XtTagsSelectProps } from './types'
import { DatePickerProps, getDefaultFormat } from '..'
const PlaceholderContext = createContext<React.ReactNode>('- -')
const Placeholder = PlaceholderContext.Provider
const usePlaceholder = (value?: any) => {
	const placeholder = useContext(PlaceholderContext) || '- -'
	return isValid(value) && value !== '' ? value : placeholder
}
interface IGetValueByValue {
	(
		array: any[],
		inputValue: any,
		keyMap?: {
			inputKey?: string
			outputKey?: string
			childrenKey?: string
		},
		path?: any[],
	): any
}
const getValueByValue: IGetValueByValue = (array, inputValue, keyMap, path = []) => {
	const { inputKey = 'value', outputKey = 'label', childrenKey = 'children' } = keyMap || {}
	let outputValue: any
	if (isArr(array)) {
		if (isArr(inputValue)) {
			outputValue = inputValue.map(v => getValueByValue(array, v, keyMap, path))
		} else {
			array.forEach(obj => {
				if (outputValue === undefined) {
					const currentPath = [...path, obj?.[outputKey]]
					if (obj?.[inputKey] === inputValue) {
						outputValue = {
							leaf: obj?.[outputKey],
							whole: currentPath,
						}
					} else if (obj?.[childrenKey]?.length) {
						outputValue = getValueByValue(obj?.[childrenKey], inputValue, keyMap, currentPath)
					}
				}
			})
		}
		return outputValue
	}
	return undefined
}
const Input: React.FC<React.PropsWithChildren<InputProps>> = props => {
	const prefixCls = usePrefixCls('form-text', props)
	return (
		<Space className={cls(prefixCls, props.className)} style={props.style}>
			{props.addonBefore}
			{props.prefix}
			{usePlaceholder(props.value)}
			{props.suffix}
			{props.addonAfter}
		</Space>
	)
}
const Select: React.FC<
	React.PropsWithChildren<
		SelectProps<any> & {
			showColor?: boolean
		}
	>
> = observer(props => {
	const field = useField<Field>()
	const prefixCls = usePrefixCls('form-text', props)
	const dataSource: any[] = field?.dataSource?.length ? field.dataSource : props?.options?.length ? props.options : []
	const placeholder = usePlaceholder()
	const getSelected = () => {
		const value = props.value
		if (props.mode === 'multiple' || props.mode === 'tags') {
			if (props.labelInValue) {
				return isArr(value) ? value : []
			} else {
				return isArr(value)
					? value.map(val => ({
							label: val,
							value: val,
					  }))
					: []
			}
		} else {
			if (props.labelInValue) {
				return isValid(value) ? [value] : []
			} else {
				return isValid(value)
					? [
							{
								label: value,
								value,
							},
					  ]
					: []
			}
		}
	}
	const getLabel = (target: any) => {
		return dataSource?.find(item => item.value === target?.value)?.label || target.label || placeholder
	}
	const getLabels = ({
		showColor,
		dataSource,
	}: {
		showColor?: boolean
		dataSource: {
			color: string
			isCustom: boolean
			label: string
			value: string
		}[]
	}) => {
		const selected = getSelected()
		if (!selected.length) return placeholder
		if (showColor) {
			const tags = selected.map((tagValueAndLabel: { value: string; label: string }) => {
				const tag = tagValueAndLabel.value
				const tagItem = (dataSource || []).filter(item => item?.value === tag)
				const color = tagItem[0]?.color || DEFAULT_TAG_COLOR
				return {
					color,
					tag,
				}
			})
			return (
				<section
					style={{
						display: 'flex',
					}}>
					{tags?.length
						? tags.map(({ tag, color }: { tag: string; color: string }) => {
								return <TagItem name={tag} color={color} key={tag} />
						  })
						: '- -'}
				</section>
			)
		}
		if (selected.length === 1) return getLabel(selected[0])
		return selected.map((item, key) => {
			return <Tag key={key}>{getLabel(item)}</Tag>
		})
	}
	return (
		<div className={cls(prefixCls, props.className)} style={props.style}>
			{getLabels({
				showColor: props.showColor,
				dataSource,
			})}
		</div>
	)
})
const TreeSelect: React.FC<React.PropsWithChildren<TreeSelectProps<any>>> = observer(props => {
	const field = useField<Field>()
	const placeholder = usePlaceholder()
	const prefixCls = usePrefixCls('form-text', props)
	const dataSource = field?.dataSource?.length ? field.dataSource : props?.treeData?.length ? props.treeData : []
	const getSelected = () => {
		const value = props.value
		if (props.multiple) {
			if (props.labelInValue) {
				return isArr(value) ? value : []
			} else {
				return isArr(value)
					? value.map(val => ({
							label: val,
							value: val,
					  }))
					: []
			}
		} else {
			if (props.labelInValue) {
				return value ? [value] : []
			} else {
				return value
					? [
							{
								label: value,
								value,
							},
					  ]
					: []
			}
		}
	}
	const findLabel = (value: any, dataSource: any[], treeNodeLabelProp?: string) => {
		for (let i = 0; i < dataSource?.length; i++) {
			const item = dataSource[i]
			if (item?.value === value) {
				return item?.label ?? item[treeNodeLabelProp]
			} else {
				const childLabel = findLabel(value, item?.children, treeNodeLabelProp)
				if (childLabel) return childLabel
			}
		}
	}
	const getLabels = () => {
		const selected = getSelected()
		if (!selected?.length) return <Tag>{placeholder}</Tag>
		return selected.map(({ value, label }, key) => {
			return <Tag key={key}>{findLabel(value, dataSource, props.treeNodeLabelProp) || label || placeholder}</Tag>
		})
	}
	return (
		<div className={cls(prefixCls, props.className)} style={props.style}>
			{getLabels()}
		</div>
	)
})
const Cascader: React.FC<React.PropsWithChildren<CascaderProps<any>>> = observer(props => {
	const field = useField<Field>()
	const placeholder = usePlaceholder()
	const prefixCls = usePrefixCls('form-text', props)
	const dataSource: any[] = field?.dataSource?.length ? field.dataSource : props?.options?.length ? props.options : []
	const getSelected = () => {
		const val = toArr(props.value)
		return props.multiple ? val.map(item => item[item.length - 1]) : val.slice(val.length - 1)
	}
	const getLabels = () => {
		const selected = getSelected()
		const labels = getValueByValue(dataSource, selected)
			?.filter(item => isValid(item))
			?.map(item => item?.whole?.join('/'))
			.join(', ')
		return labels || placeholder
	}
	return (
		<div className={cls(prefixCls, props.className)} style={props.style}>
			{getLabels()}
		</div>
	)
})
const DatePicker: React.FC<React.PropsWithChildren<DatePickerProps<AntdDatePickerProps>>> = props => {
	const placeholder = usePlaceholder()
	const prefixCls = usePrefixCls('form-text', props)
	const getLabels = () => {
		const labels = formatMomentValue(props.value, props.format || getDefaultFormat(props), placeholder)
		return isArr(labels) ? labels.join('~') : labels
	}
	return <div className={cls(prefixCls, props.className)}>{getLabels()}</div>
}
const DateRangePicker: React.FC<React.PropsWithChildren<any>> = props => {
	const placeholder = usePlaceholder()
	const prefixCls = usePrefixCls('form-text', props)
	const getLabels = () => {
		const labels = formatMomentValue(props.value, props.format, placeholder)
		return isArr(labels) ? labels.join('~') : labels
	}
	return (
		<div className={cls(prefixCls, props.className)} style={props.style}>
			{getLabels()}
		</div>
	)
}
const TimePicker: React.FC<React.PropsWithChildren<TimePickerProps>> = props => {
	const placeholder = usePlaceholder()
	const prefixCls = usePrefixCls('form-text', props)
	const getLabels = () => {
		const labels = formatMomentValue(props.value, props.format, placeholder)
		return isArr(labels) ? labels.join('~') : labels
	}
	return (
		<div className={cls(prefixCls, props.className)} style={props.style}>
			{getLabels()}
		</div>
	)
}
const TimeRangePicker: React.FC<React.PropsWithChildren<TimeRangePickerProps>> = props => {
	const placeholder = usePlaceholder()
	const prefixCls = usePrefixCls('form-text', props)
	const getLabels = () => {
		const labels = formatMomentValue(props.value, props.format, placeholder)
		return isArr(labels) ? labels.join('~') : labels
	}
	return (
		<div className={cls(prefixCls, props.className)} style={props.style}>
			{getLabels()}
		</div>
	)
}
const Text = (props: React.PropsWithChildren<any>) => {
	const prefixCls = usePrefixCls('form-text', props)
	return (
		<div className={cls(prefixCls, props.className)} style={props.style}>
			{usePlaceholder(props.value)}
		</div>
	)
}
const WfCustomSelect: React.FC<any> = observer(props => {
	const { noPrettyEdit } = props || {}
	const field = useField<Field>()
	const prefixCls = usePrefixCls('form-text', props)
	const placeholder = usePlaceholder()
	const getSelected = () => {
		const value = props.value
		if (props.labelInValue) {
			return isArr(value) ? value : []
		} else {
			return isArr(value)
				? value.map(val => ({
						label: val,
						value: val,
				  }))
				: []
		}
	}
	const getLabels = () => {
		const selected = getSelected()
		if (!selected.length) return placeholder
		return selected.map((item, key) => {
			const value = item?.value
			let parsedLabel = {
				color: '',
				name: '',
			}
			try {
				parsedLabel = Object.assign(parsedLabel, isObject(value) ? value : JSON.parse(value))
			} catch (e) {
				parsedLabel = {
					color: 'black',
					name: value,
				}
			}
			const { color, name } = parsedLabel
			return (
				<CustomSelectTag key={key} color={color}>
					{name}
				</CustomSelectTag>
			)
		})
	}
	return (
		<div className={cls(prefixCls, props.className)} style={props.style}>
			{getLabels()}
			{!noPrettyEdit && (
				<Button
					id={'f0176368'}
					type='text'
					icon={<EditOutlined />}
					size='small'
					className={'xt-customSelect-edit-pretty'}
					onClick={() => {
						field.setPattern('editable')
					}}>
					{'编辑'}
				</Button>
			)}
		</div>
	)
})
const WfSelectInput: React.FC<any> = observer(props => {
	const field = useField<Field>()
	const { selectKey = 'select', inputKey = 'input' } = props || {}
	const { addonBeforeFun, addonAfterFun } = field?.data || {}
	const prefixCls = usePrefixCls('form-text', props)
	const dataSource: any[] = field?.dataSource?.length ? field.dataSource : props?.options?.length ? props.options : []
	const placeholder = usePlaceholder()
	const getSelected = () => {
		const value = props.value?.[selectKey]
		if (props.mode === 'multiple' || props.mode === 'tags') {
			if (props.labelInValue) {
				return isArr(value) ? value : []
			} else {
				return isArr(value)
					? value.map(val => ({
							label: val,
							value: val,
					  }))
					: []
			}
		} else {
			if (props.labelInValue) {
				return isValid(value) ? [value] : []
			} else {
				return isValid(value)
					? [
							{
								label: value,
								value,
							},
					  ]
					: []
			}
		}
	}
	const getLabel = (target: any) => {
		return dataSource?.find(item => item.value == target?.value)?.label || target.label || placeholder
	}
	const getLabels = () => {
		const selected = getSelected()
		if (!selected.length) return placeholder
		if (selected.length === 1) return getLabel(selected[0])
		return selected.map((item, key) => {
			return <Tag key={key}>{getLabel(item)}</Tag>
		})
	}
	return (
		<div className={cls(prefixCls, props.className)} style={props.style}>
			{addonBeforeFun?.(props.value)}
			<span
				style={{
					flexShrink: 0,
				}}>
				{getLabels()}
			</span>
			<span
				style={{
					paddingRight: '15px',
				}}>
				:
			</span>
			{usePlaceholder(props.value?.[inputKey])}
			{addonAfterFun?.(props.value)}
		</div>
	)
})
const XtTagsSelect: React.FC<XtTagsSelectProps> = observer(props => {
	const field = useField<Field>()
	const { noPrettyEdit, CustomTag } = props || {}
	const placeholder = usePlaceholder()
	const formattedValue = (props.value ?? []).map((item: string | TagRecord) =>
		typeof item === 'string' ? JSON.parse(item) : item,
	)
	const prefixCls = usePrefixCls('tag-select', props)
	return (
		<div className={cls(prefixCls, props.className)}>
			<div className={`${prefixCls}-items`}>
				{formattedValue.length === 0 ? (
					placeholder
				) : (
					<>
						{formattedValue.map(({ name, color, tagOwnerType }: TagRecord) => (
							<CustomTag key={name} tagOwnerType={tagOwnerType} color={color}>
								{name}
							</CustomTag>
						))}
					</>
				)}
			</div>
			{!noPrettyEdit && (
				<Button
					id={'f0176338'}
					type='text'
					icon={<EditOutlined />}
					size='small'
					className={'xt-customSelect-edit-pretty'}
					onClick={() => {
						field.setPattern('editable')
					}}
				/>
			)}
		</div>
	)
})
const Color: React.FC<{
	value?: string
}> = props => {
	return (
		<div
			style={{
				backgroundColor: props.value,
				width: '14px',
				height: '14px',
			}}></div>
	)
}
Text.Input = Input
Text.Select = Select
Text.WfCustomSelect = WfCustomSelect
Text.XtLeadsSelect = WfCustomSelect
Text.XtTagsSelect = XtTagsSelect
Text.WfSelectInput = WfSelectInput
Text.Color = Color
Text.TreeSelect = TreeSelect
Text.Cascader = Cascader
Text.DatePicker = DatePicker
Text.DateRangePicker = DateRangePicker
Text.TimePicker = TimePicker
Text.TimeRangePicker = TimeRangePicker
Text.Placeholder = Placeholder
Text.usePlaceholder = usePlaceholder
export const PreviewText = Text

export type { XtTagsSelectProps }
export default PreviewText
