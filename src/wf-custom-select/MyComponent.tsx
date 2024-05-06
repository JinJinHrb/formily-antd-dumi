import React, { ChangeEvent, ReactElement, SyntheticEvent } from 'react'
import {
	merge,
	debounce,
	isEmpty,
	isArray,
	isString,
	uniqWith,
	isObject,
	trim,
	isFunction,
	isObjectLike,
	isNil,
	isEqual,
} from 'lodash-es'
import { FieldDataSource, FieldPatternTypes } from '@formily/core/esm/types'
import XtdInput from 'antd/es/input'
import XtdSelect from 'antd/es/Select'
// import XtdDivider from 'antd/es/divider'
import XtdButton from 'antd/es/button'
import XtdPopover from 'antd/es/Popover'
import XtdTag from 'antd/es/tag'
import ConfigProvider from 'antd/es/config-provider'
import { Field } from '@formily/core'
import { uniTagValue } from '../util'
import { getTransparentLayer } from '../__builtins__'
import Message from 'antd/es/Message'
import { toJS } from '@formily/reactive'
import { rules as validatorRules } from '../wf-validator/rules'
import { PlusOutlined } from '@ant-design/icons'
import { CheckOutlined } from '@ant-design/icons'

const { ConfigContext } = ConfigProvider
const { Option: XtdOption } = XtdSelect
const prefixCls = 'xt-customSelect'
const PREDEFINED_COLORS = ['#BD1E2E', '#DA681C', '#CCA61F', '#4B9C19', '#1077CC', '#CB149D']
const DEFAULT_LANGUAGE = 'zh-cn' // 'en'; // 'zh-cn';
const DEFAULT_TEXT = {
	'zh-cn': {
		deleteText: '删除',
		addText: '添加',
		colorText: '颜色',
	},
	en: {
		deleteText: 'delete',
		addText: 'add',
		colorText: 'color',
	},
}
enum SizeType {
	small = 'small',
	middle = 'middle',
	large = 'large',
}
interface IOptionsProps {
	label?: string
	value: string
}
export interface IWfCustomSelectProps {
	value: string[]
	suffixIcon?: string
	options?: any[]
	loading?: boolean
	title?: string
	inputType?: string
	required?: boolean
	placeholder?: string
	locales: {
		deleteText?: string
		addText?: string
		colorText?: string
	}
	pattern?: string
	noDeleteOption?: boolean
	noConfirm?: boolean
	noAddition?: boolean
	mode?: 'CRM' | 'CUSTOM' // 业务模式
	referenceId?: string // CRM - referenceId
	noPrettyEdit?: boolean
	onChange: (data: any) => void
	setDataSource: (dataSource?: FieldDataSource) => void
	setPattern: (type?: FieldPatternTypes) => void
	submit: () => Promise<Field['value']>
	validator:
		| {
				[key: string]: boolean
		  }[]
		| {
				[key: string]: boolean
		  }
	validate: (triggerType?: 'onInput' | 'onFocus' | 'onBlur') => Promise<{
		error?: string[]
		warning?: string[]
		success?: string[]
	}>
	getPopupContainer?: (node: HTMLElement) => HTMLElement
	size?: SizeType
	entityType?: string
	optionFilterProp: string
	allowClear: boolean
	tagRender?: (props: { label: string; closable: () => void; onClose: () => void }) => ReactElement
	getRemoteOptions?: (entityType: string) => Promise<IOptionsProps[]>
	getRemoteAllLeadsOptions?: () => Promise<IOptionsProps[]>
	createRemoteTag?: (options: IOptionsProps, entityType: string) => Promise<IOptionsProps[]>
	removeRemoteOption?: (rawOption: string, entityType: string) => void
	changeRemoteOptions?: (tags: object[], referenceId: string, entityType: string) => void
}
interface IParsedValue {
	name: string
	color: string
}
interface IState {
	value: string[]
	options: any[]
	name: string // 当前输入的文字
	open?: boolean // true - 保持下拉框打开
	color: string // 当前选中的文字
	popoverVisible: boolean // 气泡框是否打开
	initDone: boolean // 补丁：防止主动删除所有选项后又加载出老的选项
	locales: {
		deleteText?: string
		addText?: string
		colorText?: string
	}
	prevPropsValue?: any
	errors?: string | string[]
}
type TPartialState = Partial<IState>
class MyComponent extends React.PureComponent<IWfCustomSelectProps, IState> {
	inputRef: React.RefObject<any>
	dropdownWrapperRef: React.RefObject<any>
	colorPalleteRef: React.RefObject<any>
	validator:
		| {
				[key: string]: boolean
		  }[]
		| {
				[key: string]: boolean
		  }
	constructor(props: IWfCustomSelectProps) {
		super(props)
		let { locales } = this.props
		locales = merge(locales, DEFAULT_TEXT[DEFAULT_LANGUAGE])
		this.state = {
			value: [],
			options: [],
			name: '',
			color: PREDEFINED_COLORS[0],
			popoverVisible: false,
			initDone: false,
			locales,
			prevPropsValue: [],
		}
		this.inputRef = React.createRef()
		this.dropdownWrapperRef = React.createRef()
		this.colorPalleteRef = React.createRef()
		this.validateName = debounce(this.validateName, 150)
	}
	componentDidMount(): void {
		const { mode, getRemoteOptions, getRemoteAllLeadsOptions } = this.props || {}
		if (getRemoteOptions && mode === 'CRM' && isEmpty(this.props.options)) {
			getRemoteOptions(this.props.entityType).then(options => {
				this.setState({
					options,
				})
			})
		}
		if (getRemoteAllLeadsOptions && mode === 'CUSTOM' && isEmpty(this.props.options)) {
			getRemoteAllLeadsOptions().then(options => {
				this.setState({
					options,
				})
			})
		}
		const validator = toJS(this.props.validator)
		if (!isEmpty(validator)) {
			if (isArray(validator)) {
				this.validator = (
					validator as {
						[key: string]: boolean
					}[]
				).filter(a => {
					const keys = Object.keys(a)
					return a[keys[0]] && keys[0].toLowerCase().includes('allow')
				})
			}
		}
	}
	addRemoteOption = (option: { label?: string; value: string }) => {
		const { mode, createRemoteTag, getRemoteOptions } = this.props || {}
		if (mode !== 'CRM' || isEmpty(option)) {
			return
		}
		if (createRemoteTag && getRemoteOptions) {
			createRemoteTag(option, this.props.entityType)
				.then(() => {
					return getRemoteOptions(this.props.entityType)
				})
				.then(options => {
					this.setState({
						options,
					})
				})
		}
	}
	changeValue = (newData: TPartialState) => {
		const { mode, changeRemoteOptions, referenceId, entityType } = this.props || {}
		const value = newData?.value
		const alteredValue = isArray(value)
			? value.map(el => {
					if (isString(el) && el.startsWith('{') && el.endsWith('}')) {
						try {
							return JSON.parse(el)
						} catch (e) {}
					}
					return el
			  })
			: value
		if (mode === 'CRM' && changeRemoteOptions && referenceId && isArray(alteredValue)) {
			changeRemoteOptions(alteredValue, referenceId, entityType)
		}
		this.props?.onChange(alteredValue)
	}
	onXtdSelectChange = (value: string[]) => {
		const newState = {} as any
		newState.value = uniqWith(isArray(value) ? value : [], (a, b) => {
			const [objA, objB] = [a, b]
				.map(el => {
					try {
						if (isString(el)) {
							return JSON.parse(el)
						}
						if (isObject(el)) {
							return el
						}
						return undefined
					} catch (e) {}
				})
				.filter(el => el)
			return objA.name === objB.name
		})
		this.setState(newState, () => this.changeValue(newState))
	}
	getNameValidationErrors = (value: string) => {
		const name = trim(value)
		const errors = []
		if (isArray(this.validator) && !isEmpty(this.validator)) {
			for (const validatorElement of this.validator as {
				[key: string]: boolean
			}[]) {
				const validatorKeys = Object.keys(validatorElement)
				validatorKeys.forEach(k => {
					const vlFn = validatorRules[k] as unknown as Record<string, Function>
					if (isFunction(vlFn)) {
						const errorMessage = vlFn(name)
						if (errorMessage) {
							errors.push(errorMessage)
						}
					}
				})
			}
		} else if (isObjectLike(this.validator)) {
			const validatorKeys = Object.keys(this.validator)
			validatorKeys.forEach(k => {
				const vlFn = validatorRules[k] as unknown as Record<string, Function>
				if (isFunction(vlFn)) {
					const errorMessage = vlFn(name)
					if (errorMessage) {
						errors.push(errorMessage)
					}
				}
			})
		}
		const rtn = errors.join(' ')
		return rtn
	}
	validateName = (name: string) => {
		const errors = this.getNameValidationErrors(name)
		this.setState({
			errors,
		})
	}
	onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.stopPropagation()
		event.nativeEvent.stopImmediatePropagation()
		const name = event.target?.value
		if (isNil(name)) {
			return
		}
		this.setState(
			{
				name,
			},
			() => {
				this.validateName(name)
			},
		)
	}
	onInputPress = (event: SyntheticEvent) => {
		event.stopPropagation()
	}
	static getDerivedStateFromProps(nextProps: IWfCustomSelectProps, prevState: IState) {
		const options = nextProps.options || []
		const polyfillOptions = isArray(options) ? options : [options]
		const nextState = {} as any
		if (isEmpty(prevState.options)) {
			nextState.options = polyfillOptions
		}
		const propsValue = isArray(nextProps.value)
			? (nextProps.value || []).map((el: any) => {
					// 兼容字符串形式
					if (isObject(el) && (el as any).name && (el as any).color) {
						return JSON.stringify(el)
					}
					return el
			  })
			: nextProps.value
		const stateValue = prevState.value || []
		if (!prevState.initDone && isEmpty(stateValue) && !isEmpty(propsValue)) {
			const arr = [] as string[]
			Object.entries(propsValue).forEach(([, value]) => {
				arr.push(value)
			})
			nextState.value = arr
			nextState.options = uniqWith(
				(nextState.options || prevState.options).concat(
					arr.map(value => ({
						value,
						label: value,
					})),
				),
				(a: any, b: any) => {
					let aObj = {} as IParsedValue
					let bObj = {} as IParsedValue
					try {
						aObj = JSON.parse(a.value as string)
						bObj = JSON.parse(b.value as string)
					} catch (e) {
						return false
					}
					return aObj.name === bObj.name
				},
			)
			if (!prevState.initDone) {
				nextState.initDone = true
			}
		} else if (!isEqual(propsValue, prevState.prevPropsValue)) {
			// case2: nextProps.value 与 prevState.prevPropsValue 值不同
			if (isEmpty(propsValue)) {
				nextState.value = undefined
			} else {
				nextState.value = propsValue
			}
		}
		if (!isEqual(propsValue, prevState.prevPropsValue)) {
			nextState.prevPropsValue = nextProps.value
		}
		const newLocales = merge(nextProps.locales, prevState.locales)
		if (!isEqual(newLocales, prevState.locales)) {
			nextState.locales = newLocales
		}
		if (isEmpty(nextState)) {
			return null
		}
		return nextState
	}
	addItem = () => {
		const { color, options, name } = this.state
		const trimmedName = name ?? ''
		// 有 label 或 value 重复的记录
		const duplicates = options.filter(el => {
			let parsedValue
			try {
				parsedValue = JSON.parse(el.value as string)
			} catch (e) {
				parsedValue = {
					name: el.value,
				}
			}
			return parsedValue.name === trimmedName
		})
		if (!isEmpty(duplicates)) {
			Message.warning('不应出现重复项')
			return
		}
		const errors = this.getNameValidationErrors(trimmedName)
		if (errors) {
			this.setState({
				errors,
			})
			return
		}
		const newState = {
			name: '',
		} as any
		if (trimmedName) {
			const newOptions = [...options]
			const labelValue = JSON.stringify({
				name: trimmedName,
				color,
			})
			newOptions.push({
				label: labelValue,
				value: labelValue,
			})
			newState.options = newOptions
			this.props.setDataSource(newOptions)
			this.addRemoteOption({
				label: labelValue,
				value: labelValue,
			})
		}
		this.setState(newState)
	}
	deleteHandler = (value: any) => {
		if (!value) {
			return
		}
		let valueObj = {
			name: '',
			color: '',
		}
		try {
			valueObj = isString(value) ? JSON.parse(value) : isObject(value) ? value : {}
		} catch (e) {
			console.error('#344', 'parse param:', value, 'error:', e)
		}
		const options = (this.state?.options || []).filter(a => {
			let obj = {
				name: '',
				color: '',
			}
			try {
				obj = isString(a?.value) ? JSON.parse(a.value) : isObject(a.value) ? a.value : {}
			} catch (e) {
				console.error('#351', 'parse param:', a, 'error:', e)
			}
			const bool = obj.name !== valueObj.name
			return bool
		})
		const stateValue = Object.values(this.state?.value || []).filter(a => {
			let obj = {
				name: '',
				color: '',
			}
			try {
				obj = isString(a) ? JSON.parse(a) : isObject(a) ? a : {}
			} catch (e) {
				console.error('#351', 'parse param:', a, 'error:', e)
			}
			const bool = obj.name !== valueObj.name
			return bool
		})
		if (this.props.mode === 'CRM' && this.props.removeRemoteOption) {
			if (!value) {
				return
			}
			this.props.removeRemoteOption(value, this.props.entityType)
		}
		this.props.setDataSource(options)
		this.setState(
			{
				options,
				value: stateValue,
			},
			() =>
				this.changeValue({
					value: stateValue,
				}),
		)
	}

	/**
	 * @param visible
	 * true 保持上一级模态框打开状态
	 */
	handleClickChange = (visible: boolean) => {
		if (visible) {
			this.setState({
				open: true,
				popoverVisible: true,
			})
		} else {
			this.setState({
				/* open: undefined, */ popoverVisible: false,
			})
		}
	}

	/**
	 * 选择颜色
	 */
	pickColorHandler = (e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()
		e.preventDefault()
		const target = e.target as any
		const color = target?.getAttribute('color')
		if (!color) {
			return
		}
		this.setState({
			color,
			popoverVisible: false /* open: undefined */,
		})
	}

	content = () => {
		return (
			<div ref={this.colorPalleteRef} className={`${prefixCls}-colorPalette`} onClick={this.pickColorHandler}>
				{PREDEFINED_COLORS.map(color => (
					<div
						key={color}
						color={`${color}`}
						style={{
							background: `${color}`,
						}}
					/>
				))}
			</div>
		)
	}

	// 透明浮层 Start
	transparentLayerClickHandler = () =>
		/* e: SyntheticEvent<HTMLDivElement> */
		{
			if (this.state.open) {
				this.setState({
					open: undefined,
				})
			}
		}

	// 透明浮层 End

	tagRender = (props: any) => {
		const { label, /* value, */ closable, onClose } = props
		let parsedLabel = {}
		if (label) {
			try {
				parsedLabel = JSON.parse(label as string)
			} catch (e) {
				parsedLabel = {
					color: 'black',
					name: label,
				}
			}
		}
		const { name, color } = parsedLabel as any
		return (
			<XtdTag className={`${prefixCls}-xtd-tag`} color={color} closable={closable} onClose={onClose}>
				{name}
			</XtdTag>
		)
	}
	dropdownRenderFactory =
		(noAddition: boolean) => (menu: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => {
			let errorMessage = ''
			if (isArray(this.state.errors)) {
				errorMessage = (this.state.errors as string[]).join(' ')
			} else if (isString(this.state.errors)) {
				errorMessage = this.state.errors as string
			}
			const { locales, name, popoverVisible, color } = this.state
			return (
				<div ref={this.dropdownWrapperRef} className={`${prefixCls}-dropdownWrapper`}>
					{menu}
					{!noAddition && (
						<>
							{/* <XtdDivider className={`${prefixCls}-dropdownDivider`} /> */}
							{errorMessage && (
								<div className={`${prefixCls}-dropdownExtension ${prefixCls}-error`}>{errorMessage}</div>
							)}
							<div className={`${prefixCls}-dropdownExtension`}>
								<XtdInput
									className={`${prefixCls}-inputItem`}
									value={name ?? ''}
									onChange={this.onNameChange}
									onKeyDown={this.onInputPress}
									maxLength={108}
									ref={this.inputRef}
								/>
								<XtdPopover
									placement='topRight'
									title={locales.colorText}
									content={this.content()}
									trigger='click'
									zIndex={1051}
									visible={popoverVisible}
									onVisibleChange={this.handleClickChange}>
									<div className={`${prefixCls}-colorPaletteButton`}>
										<div
											style={{
												backgroundColor: color,
												width: '15px',
												height: '15px',
											}}>
											&nbsp;
										</div>
									</div>
								</XtdPopover>
								<a className={`${prefixCls}-addItemButton`} onClick={this.addItem}>
									<PlusOutlined /> {locales.addText}
								</a>
							</div>
						</>
					)}
				</div>
			)
		}
	optionRender = (label: string) => {
		let parsedLabel = {}
		try {
			parsedLabel = JSON.parse(label)
		} catch (e) {
			parsedLabel = {
				name: label,
				color: 'white',
			}
		}
		const { name, color } = parsedLabel as {
			name: string
			color: string
		}
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<span
					style={{
						backgroundColor: color,
						width: '15px',
						height: '15px',
						marginRight: '10px',
					}}
				/>
				<span>{name}</span>
			</div>
		)
	}
	handleMapValue = (value: string[] = []) => {
		return uniTagValue(
			value.map((item: string) => {
				try {
					return JSON.parse(item)
				} catch (err) {
					return ''
				}
			}),
		)
	}
	render() {
		const {
			placeholder,
			pattern,
			noDeleteOption = false,
			noConfirm = false,
			noAddition = false,
			setPattern,
			submit,
			validate,
			getPopupContainer,
			size = 'middle',
			optionFilterProp,
			allowClear,
			tagRender,

			...props
		} = this.props
		const { options, value, open, locales } = this.state
		let tooltipDivRects
		if (this.dropdownWrapperRef?.current && this.colorPalleteRef?.current) {
			const tooltipDivs = Array.prototype.slice.call((document as any).getElementsByClassName('atom-popover-inner'))
			tooltipDivRects = tooltipDivs?.map((el: { getBoundingClientRect: () => any }) => el.getBoundingClientRect())
		}
		const transparentLayer =
			this.dropdownWrapperRef?.current && this.colorPalleteRef?.current
				? getTransparentLayer(
						[
							this.dropdownWrapperRef.current?.getBoundingClientRect(),
							this.colorPalleteRef.current?.getBoundingClientRect(),
							...tooltipDivRects,
						],
						{
							onMouseOver: this.transparentLayerClickHandler,
						},
				  )
				: undefined
		const mapValue = this.handleMapValue(value)
		return (
			<div {...props}>
				{this.state.open && transparentLayer}
				<div className={`${prefixCls}-wrapper`}>
					<XtdSelect
						allowClear={allowClear}
						optionFilterProp={optionFilterProp}
						// options={options}
						placeholder={placeholder}
						onChange={this.onXtdSelectChange}
						tagRender={tagRender || this.tagRender}
						dropdownRender={this.dropdownRenderFactory(noAddition)}
						mode='multiple'
						optionLabelProp='label'
						open={open}
						value={mapValue}
						size={size}
						getPopupContainer={getPopupContainer ? getPopupContainer : triggerNode => triggerNode.parentNode}
						disabled={pattern === 'readOnly'}
						filterOption={(inputValue: string, option) => {
							const value = JSON.parse(!!option ? (option.value as string) : '{}')
							return value?.name?.indexOf(inputValue) > -1 || false
						}}
						defaultActiveFirstOption={false}>
						{options.map(item => {
							const { value: itemValue, label } = item
							return (
								<XtdOption key={itemValue} value={itemValue}>
									<div className={`${prefixCls}-optionItem`}>
										<span className={`${prefixCls}-optionLabelItem`}>{this.optionRender(label as string)}</span>
										{!noDeleteOption && (
											<span
												className={`${prefixCls}-optionDeleteItem`}
												onClick={e => {
													const selectedValues =
														Object.values(this.state?.value || []).filter(a => a === itemValue) || []
													if (selectedValues.length < 1) {
														e.stopPropagation()
													}
													this.deleteHandler(itemValue)
												}}>
												{locales.deleteText}
											</span>
										)}
									</div>
								</XtdOption>
							)
						})}
					</XtdSelect>
					{!['readOnly', 'disabled'].includes(trim(pattern)) && !noConfirm && (
						<XtdButton
							type='text'
							icon={<CheckOutlined />}
							size='small'
							className={`${prefixCls}-finish-edit`}
							onClick={async () => {
								try {
									await validate()
									submit()
									setPattern('readPretty')
								} catch (e) {}
							}}>
							{'确定'}
						</XtdButton>
					)}
				</div>
			</div>
		)
	}
}
MyComponent.contextType = ConfigContext
export default MyComponent
