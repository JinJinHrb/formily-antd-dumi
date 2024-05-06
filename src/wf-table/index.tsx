import React, { useRef, useState } from 'react'
import { connect, mapProps, observer, useForm } from '@formily/react'
import { toJS } from '@formily/reactive'
import { ObjectField } from '@formily/core'
import Table from 'antd/es/table'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Select from 'antd/es/Select'
import { IProps, SelectOption } from './types'
import { isNumber, isFunction, isArrayLike, isString, get, isObject, trim, isEqual, uniqBy } from 'lodash-es'
import { useClickAway } from '../__builtins__'
import uploadRenderer from './uploadRenderer'
import { rules } from '../wf-validator/rules'
import { EditOutlined } from '@ant-design/icons'

const { Option } = Select
export const WfTable: React.FC<any> = connect(
	Table,
	mapProps(
		{
			// dataSource: true,
			loading: true,
			// value: true,
			pattern: true,
			setDataSource: true,
			setPattern: true,
		},
		(props: any, field: any) => {
			const dataSource = Array.isArray(field?.value) ? field?.value : []
			return {
				dataSource,
				...props,
			}
		},
	),
)

// Input.TextArea = connect(AntdInput.TextArea /* , mapReadPretty(PreviewText.Input) */);

export default WfTable
const getFieldErrorMessage = ({
	value,
	maxLength,
	isRequired,
	xValidator,
	title,
}: {
	value: string
	maxLength?: number
	isRequired: boolean
	xValidator: any
	title: string
}) => {
	if (isRequired && !value) {
		return `${title}必填`
	}
	let isDisallowEmoticon, isAllowNumberAndCode
	const xVldKeys = Object.keys(xValidator || {})
	for (const xVldKey of xVldKeys) {
		// XTConsole.log('formily-xtd/wf-table #70', `xValidator[${xVldKey}]:`, xValidator[xVldKey])
		if (xValidator[xVldKey]?.disallowEmoticon) {
			isDisallowEmoticon = true
		}
		if (xValidator[xVldKey]?.allowNumberAndCode) {
			isAllowNumberAndCode = true
		}
	}
	if (isNumber(maxLength) && value.length > maxLength) {
		return `${title}取值超过最大长度${maxLength}`
	}
	if (isDisallowEmoticon && isFunction(rules.disallowEmoticon)) {
		const errMsg = (rules.disallowEmoticon as any)(value)
		if (!!errMsg) {
			return errMsg
		}
	}
	if (isAllowNumberAndCode && isFunction(rules.allowNumberAndCode)) {
		const errMsg = (rules.allowNumberAndCode as any)(value)
		if (!!errMsg) {
			return errMsg
		}
	}
	return ''
}
enum TagItemType {
	notMultipleSelect = 0,
	hasColor = 1,
	noColor = 2,
}
interface TagItemProps {
	name: string
	color: string
}
const TagItem: React.FC<TagItemProps> = props => {
	const { name, color } = props
	const formatColor = (color: string) => {
		const reg = /^\d{0,3}\,\d{0,3}\,\d{0,3}$/
		const regxp = new RegExp(reg)
		if (regxp.test(color)) {
			return `rgb(${color})`
		}
		return color
	}
	return (
		<div
			style={{
				position: 'relative',
				display: 'inline-block',
				marginRight: '8px',
			}}>
			<div
				style={{
					position: 'relative',
					maxWidth: '148px',
					lineHeight: '16px',
					borderRadius: '2px',
					padding: '4px',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					fontWeight: '400',
					background: formatColor(color || '#1DCCB3'),
				}}></div>
			<div
				style={{
					color: '#FFF',
					position: 'absolute',
					width: '100%',
					height: '100%',
					borderRadius: '2px',
				}}>
				{name}
			</div>
		</div>
	)
}

// Start
const ObservableRenderer = observer((props: IProps) => {
	const { fieldKey, labelKey, valueKey, rowKey, dataKey, cellValue, editList = [] } = props
	const form = useForm()
	const field = form.query(fieldKey).take() as ObjectField
	const WfTable = field?.component?.[1]
	const { rowKey: editableRowKey, labelKey: editableTitleKey } = WfTable?.editableCell || {
		rowKey: undefined,
		labelKey: undefined,
	}
	const fieldValue = field?.value
	const lrFlag = labelKey.replace('Label', '')
	let renderByTagItem: TagItemType = TagItemType.notMultipleSelect
	const isRequired = fieldValue?.[rowKey]?.[`${lrFlag}Required`]
	const maxLength = fieldValue?.[rowKey]?.[`${lrFlag}MaxLength`]
	const xValidator = fieldValue?.[rowKey]?.[`${lrFlag}XValidator`]
	const lrComponent = fieldValue?.[rowKey]?.[`${lrFlag}Component`]
	const lrDataSource = fieldValue?.[rowKey]?.[`${lrFlag}DataSource`] as {
		isCustom: boolean
		color: string
		value: string
	}[]
	const displayColor = fieldValue?.[rowKey]?.[`${lrFlag}Color`]
	const title = fieldValue?.[rowKey]?.[labelKey]
	const oldValue = fieldValue?.[rowKey]?.[valueKey] ?? null
	if (
		lrComponent === 'MultipleSelect' &&
		isArrayLike(oldValue) &&
		lrDataSource?.[0]?.isCustom &&
		lrDataSource?.[0]?.color
	) {
		if (displayColor) {
			renderByTagItem = TagItemType.hasColor
		} else {
			renderByTagItem = TagItemType.noColor
		}
	}
	const fieldState = form.getFieldState(fieldKey)
	const editTitleList = editList.map(el => {
		if (isString(el)) {
			return el
		} else {
			return String(get(el, 'title'))
		}
	})
	const idx = editTitleList.indexOf(title)
	const selectedEditor = editList[idx]
	const selectedEditorType = isObject(selectedEditor) ? get(selectedEditor, 'type') : 'string'
	const selectedEditorStyle = isObject(selectedEditor) ? get(selectedEditor, 'style') : undefined
	if (idx < 0) {
		if (lrComponent === 'Upload') {
			return uploadRenderer({
				value: oldValue,
			})
		} else if (renderByTagItem > TagItemType.notMultipleSelect) {
			// 对于 renderByTagItem === TagItemType.noColor 情况，使用 select 组件
			if (renderByTagItem === TagItemType.noColor) {
				return (
					<div
						className='atom-form-text'
						style={{
							fontSize: '14px',
							fontFamily: 'PingFangSC-Regular, PingFang SC',
							fontWeight: 400,
							color: 'rgba(0, 0, 0, 0.85)',
						}}>
						{oldValue?.length
							? oldValue.map((tag: string) => (
									<span key={tag} className='atom-tag'>
										{tag}
									</span>
							  ))
							: '--'}
					</div>
				)
			} else {
				return (
					<section
						style={{
							display: 'flex',
						}}>
						{oldValue?.length
							? oldValue.map((tag: string, index: number) => {
									const tagItem = lrDataSource.filter(item => item.value === tag)
									const color = tagItem[0]?.color || '#BD1E2E'
									return <TagItem name={tag} color={color} key={index} />
							  })
							: '- -'}
					</section>
				)
			}
		}
		return oldValue
	}
	if (!dataKey) {
		return ''
	}

	// 透明层 Start
	const innerRef = useRef<any>()
	const useClickAwayCount = useRef<number>(0)

	// 旧值
	const oldValueRef = useRef<any>(form.initialValues)
	const [showWarning, setShowWarning] = useState('')

	// const [transparentLayer, setTransparentLayer] = useState<any>()
	const [pattern, setPattern] = useState<string>(trim(fieldState.pattern))
	const setFieldPretty = async (pattern: string) => {
		field?.setPattern(pattern)
		setPattern(pattern)
		if (pattern !== 'editable') {
			// setTransparentLayer(undefined)
			useClickAwayCount.current = 0
			const values = toJS(form.values)
			if (!isEqual(values, oldValueRef.current)) {
				oldValueRef.current = values
				await form.validate()
				try {
					await form.submit()
				} catch {
					// 提交失败，还原输入框
					oldValueRef.current = cellValue
					const fieldValue = field?.value
					fieldValue[rowKey][valueKey] = cellValue
					field?.setValue(fieldValue)
					oldValueRef.current = toJS(fieldValue)
					const WfTable = field?.component?.[1]
					if (WfTable) {
						WfTable.dataSource = fieldValue
					}
				}
			}
		}
	}

	// 透明层 End

	useClickAway(evt => {
		evt.stopPropagation()
		if (pattern === 'editable') {
			useClickAwayCount.current = ++useClickAwayCount.current
			if (useClickAwayCount.current > 1) {
				setFieldPretty('readPretty')
				useClickAwayCount.current = 0
			}
		} else {
			useClickAwayCount.current = 0
		}
	}, innerRef)
	if (pattern === 'readPretty' || editableRowKey !== rowKey || editableTitleKey !== labelKey) {
		return (
			<span
				style={{
					display: 'flex',
					alignItems: 'center',
				}}>
				<span
					style={{
						marginRight: '15px',
					}}>
					{cellValue}
				</span>
				<Button
					id={'224f5e60'}
					size='small'
					type='text'
					style={{
						width: 22,
						height: 22,
					}}
					icon={<EditOutlined />}
					onClick={() => {
						const field = form.query(fieldKey).take()
						const WfTable = field?.component?.[1]
						if (WfTable) {
							WfTable.editableCell = {
								rowKey,
								labelKey,
							}
						}
						setFieldPretty('editable')
					}}
				/>
			</span>
		)
	}
	if (selectedEditorType === 'Select') {
		const options = uniqBy(get(selectedEditor, 'enum') || [], 'value')
		const selectOptions = options.map(({ label, value }: SelectOption) => (
			<Option key={value} value={value}>
				{label}
			</Option>
		))
		const defaultValue = options.filter(el => el.label === oldValue)[0]?.value
		return (
			<>
				<div ref={innerRef}>
					<Select
						style={selectedEditorStyle}
						defaultValue={defaultValue}
						getPopupContainer={triggerNode => triggerNode.parentNode}
						onSelect={(value: string) => {
							const label = options.filter(el => el.value === value)[0]?.label
							const field = form.query(fieldKey).take() as ObjectField
							const fieldValue = field?.value
							const oldValue = fieldValue?.[rowKey]?.[valueKey] ?? null
							if (fieldValue?.[rowKey] && value !== oldValue) {
								fieldValue[rowKey][valueKey] = label
								field?.setValue(fieldValue)
								const WfTable = field?.component?.[1]
								if (WfTable) {
									WfTable.dataSource = fieldValue
								}
							}
							setFieldPretty('readPretty')
						}}>
						{selectOptions}
					</Select>
				</div>
			</>
		)
	}

	const handleSave = (value: string) => {
		setShowWarning('')
		const errorMessage = getFieldErrorMessage({
			value,
			maxLength,
			isRequired,
			title,
			xValidator,
		})
		if (errorMessage) {
			return
		}
		const field = form.query(fieldKey).take() as ObjectField
		const fieldValue = field?.value
		const oldValue = fieldValue?.[rowKey]?.[valueKey] ?? null
		if (fieldValue?.[rowKey] && value !== oldValue) {
			fieldValue[rowKey][valueKey] = value
			field?.setValue(fieldValue)
			const WfTable = field?.component?.[1]
			if (WfTable) {
				WfTable.dataSource = fieldValue
			}
		}
		setFieldPretty('readPretty')
	}
	return (
		<>
			<div ref={innerRef}>
				<Input
					id={'4b4879d8'}
					style={{
						...(selectedEditorStyle ?? {}),
						border: `1px solid ${!!showWarning ? '#FF0000' : '#FF934A'}`,
					}}
					defaultValue={cellValue}
					onChange={evt => {
						const value = evt.target?.value
						const errorMessage = getFieldErrorMessage({
							value,
							maxLength,
							isRequired,
							title,
							xValidator,
						})
						if (errorMessage) {
							setShowWarning(errorMessage)
						}
					}}
					onBlur={e => handleSave(e.target.value)}
					onPressEnter={e => handleSave(e.currentTarget.value)}
				/>
				{!!showWarning && (
					<div
						style={{
							color: '#FF0000',
						}}>
						{showWarning}
					</div>
				)}
			</div>
			{/* {transparentLayer} */}
		</>
	)
})
export const WfTableRenderer = (args: { fieldKey: any; labelKey: any; valueKey: any; editList: any }) => {
	const { fieldKey, labelKey, valueKey, editList } = args
	return (
		cellValue: string,
		record: {
			[x: string]: any
		},
		rowKey: string,
	) => {
		const dataKey = record?.[labelKey]
		return (
			<ObservableRenderer
				fieldKey={fieldKey}
				labelKey={labelKey}
				valueKey={valueKey}
				rowKey={rowKey}
				dataKey={dataKey}
				cellValue={cellValue}
				editList={editList}
			/>
		)
	}
}

// End
