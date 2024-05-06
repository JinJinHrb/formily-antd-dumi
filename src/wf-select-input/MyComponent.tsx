/* eslint-disable react/destructuring-assignment */
import React, { ReactNode, SyntheticEvent } from 'react'
import { isNumber, isArray, isEmpty, isNil, trim, find, isString, isEqual, uniqBy } from 'lodash-es'
import XtdSelect from 'antd/es/Select'
import XtdInput from 'antd/es/input'
import ConfigProvider from 'antd/es/config-provider'
import { TAreaCodeOption, TBaseArrayContextValue, getAreaCodeSection, isDomVisible } from '../__builtins__'
import classNames from 'classnames'
import { toJS } from '@formily/reactive'

const { ConfigContext } = ConfigProvider
const MISSING_TEXT = {
	selectMissing: '下拉选项缺失',
	inputMissing: '文本输入缺失',
}
const prefixCls = 'xt-selectInput'
interface IProps {
	value: {
		/* select: string
      input: string */
		[key: string]: string
	}
	suffixIcon?: ReactNode
	onChange: (data: any) => void
	options: any /* LabeledValue | LabeledValue[] */
	loading?: boolean
	title?: string
	inputType?: string
	required?: boolean
	pattern?: string
	selectStyle?: any
	inputStyle?: any
	selectProps?: any
	areacodeProps?: any
	inputProps?: any
	selectKey?: string
	inputKey?: string
	defaultSelect?: string
	setSelfErrors: (data: string[]) => void
	selfErrors: string[]
	baseArrayContext: TBaseArrayContextValue
	areaCodeOptions: TAreaCodeOption[]
	recommendedGeoCode?: string
	recommendedAreaCode?: string
	recommendedZhName?: string
	recommendedEnName?: string
	selectedValues4AreaCode?: string | string[]
	forbiddenRegex?: string
	fieldAddress?: string
	validator:
		| {
				[key: string]: boolean
		  }[]
		| {
				[key: string]: boolean
		  }
}
interface IState {
	selectKey: string
	inputKey: string
	value: {
		/* select: string
      input: string */
		[key: string]: string
	}
	options: any // LabeledValue[]
	prevPropsValue?: any
	displayAreaCode: boolean

	/** input 框显示的值不带 +86- 前缀 */
	displayInputValue: string
	selectedAreaCode?: string
	areaCodeSelectOpen: boolean
	displayRecommendedAreaCode: string
	forbiddenRegex?: RegExp
	prevRecommendedGeoCode?: string
}
class MyComponent extends React.PureComponent<IProps, IState> {
	areaCodeInput: string
	popupContainerRef1: React.RefObject<HTMLDivElement>
	popupContainerRef2: React.RefObject<HTMLDivElement>
	popupContainerRef3: React.RefObject<HTMLDivElement>
	validator:
		| {
				[key: string]: boolean
		  }[]
		| {
				[key: string]: boolean
		  }
	constructor(props: IProps) {
		super(props)
		this.state = {
			selectKey: '',
			inputKey: '',
			value: {
				/* select: '',
            input: '', */
			},
			options: [],
			prevPropsValue: {},
			displayAreaCode: false,
			selectedAreaCode: undefined,
			// 用 undefined / "" 区分未初始化和人工选择空
			areaCodeSelectOpen: false,
			displayRecommendedAreaCode: '',
			displayInputValue: '',
			forbiddenRegex: undefined,
			prevRecommendedGeoCode: '', // 保存国家/地区选中的国家代号
		}
	}
	static getAreaCodePrefix(areaCode?: string) {
		if (!areaCode) {
			return ''
		}
		return `+${areaCode}-`
	}
	onChange(newData: IState) {
		const allowAreaCode = MyComponent.isAreaCodeAllowed(this.props, this.state) // 是否允许展示区号
		const { selectKey, inputKey } = this.state
		const selectedAreaCode = trim(newData?.selectedAreaCode)
		const displayInputValue = trim(newData?.displayInputValue)
		if (!newData?.value?.[selectKey]) {
			return
		}
		const outputValue = {}
		outputValue[selectKey] = newData?.value?.[selectKey]
		if (allowAreaCode) {
			const areaCodePrefix = MyComponent.getAreaCodePrefix(selectedAreaCode)
			outputValue[inputKey] =
				displayInputValue.indexOf(areaCodePrefix) === 0 ? displayInputValue : areaCodePrefix + displayInputValue
		} else {
			outputValue[inputKey] = displayInputValue // 不展示区号的情况下丢弃区号选项
		}

		if (isNil(outputValue[inputKey])) {
			return
		}
		this.props?.onChange(outputValue)
	}
	onXtdSelectChange = (value: string) => {
		const newState = {
			...this.state,
		}
		const { selectKey } = newState
		newState.value = {
			...this.state.value,
		}
		newState.value[selectKey] = value
		if (this.props.required) {
			if ((this.props.selfErrors || []).includes(MISSING_TEXT.selectMissing) && value) {
				const selfErrors = this.props.selfErrors.filter(a => a !== MISSING_TEXT.selectMissing)
				this.props.setSelfErrors(selfErrors)
			} else if (!(this.props.selfErrors || []).includes(MISSING_TEXT.selectMissing) && !value) {
				const selfErrors = [...this.props.selfErrors]
				selfErrors.push(MISSING_TEXT.selectMissing)
				this.props.setSelfErrors(selfErrors)
			}
		}
		this.setState(newState, () => this.onChange(newState))
	}
	onXtdInputChange = (event: SyntheticEvent) => {
		const rawValue = (event.target as any)?.value
		const value =
			rawValue && this.props.forbiddenRegex && this.state.forbiddenRegex instanceof RegExp
				? rawValue.replace(this.state.forbiddenRegex, '')
				: rawValue
		if (this.props.required) {
			if ((this.props.selfErrors || []).includes(MISSING_TEXT.inputMissing) && value) {
				const selfErrors = this.props.selfErrors.filter(a => a !== MISSING_TEXT.inputMissing)
				this.props.setSelfErrors(selfErrors)
			}
		}
		const newState = {
			...this.state,
		}
		const { inputKey } = newState
		newState.value = {
			...this.state.value,
		}
		newState.displayInputValue = newState.value[inputKey] = value
		const selectedAreaCode = trim(this.state.selectedAreaCode)
		const allowAreaCode = MyComponent.isAreaCodeAllowed(this.props, this.state) // 是否允许展示区号
		const section = getAreaCodeSection(newState.displayInputValue)
		if (allowAreaCode) {
			if (!isEmpty(section)) {
				const [, lastHyphenIndex] = section
				const areaCodeInInput = newState.displayInputValue.slice(1, lastHyphenIndex)
				if (!selectedAreaCode || (selectedAreaCode && selectedAreaCode === areaCodeInInput)) {
					if (!selectedAreaCode) {
						newState.selectedAreaCode = areaCodeInInput
					}
					newState.displayInputValue = newState.displayInputValue.slice(lastHyphenIndex + 1)
				}
			}
		}
		this.setState(newState, () => this.onChange(newState))
	}
	pickAreaCode(selectedAreaCode: string) {
		const newState = {
			...this.state,
		}
		// const value = newState.value
		newState.selectedAreaCode = selectedAreaCode
		const allowAreaCode = MyComponent.isAreaCodeAllowed(this.props, this.state) // 是否允许展示区号
		const section = getAreaCodeSection(newState.displayInputValue)
		if (allowAreaCode) {
			if (!isEmpty(section)) {
				const [, lastHyphenIndex] = section
				if (selectedAreaCode) {
					newState.displayInputValue = newState.displayInputValue.slice(lastHyphenIndex + 1)
				}
			}
		}
		newState.areaCodeSelectOpen = false
		this.setState(newState, () => this.onChange(newState))
	}
	onXtdInputBlur = (event: SyntheticEvent) => {
		const { selectKey, value } = this.state || {}
		const inputValue = (event.target as any)?.value
		const isInputBlank = isString(inputValue) ? !trim(inputValue) : true
		const isSelectBlank = isString((value || {})[selectKey]) ? !trim((value || {})[selectKey]) : true
		if (this.props.required) {
			const selfErrors = []
			if (isSelectBlank) {
				selfErrors.push(MISSING_TEXT.selectMissing)
			}
			if (isInputBlank) {
				selfErrors.push(MISSING_TEXT.inputMissing)
			}
			this.props.setSelfErrors(selfErrors)
		}
	}
	componentDidMount() {
		const selectKey = this.props.selectKey || 'select'
		const inputKey = this.props.inputKey || 'input'
		const initSelectValue = trim(this.props.value?.[selectKey])
		const initInputValue = trim(this.props.value?.[inputKey])
		const selectedValues4AreaCode = this.props.selectedValues4AreaCode
		const areaCodeOptions = this.props.areaCodeOptions
		let allowAreaCode = false // 是否允许展示区号
		if (isNil(selectedValues4AreaCode)) {
			allowAreaCode = true
		} else if (isString(selectedValues4AreaCode) && initSelectValue && initSelectValue === selectedValues4AreaCode) {
			allowAreaCode = true
		} else if (
			isArray(selectedValues4AreaCode) &&
			initSelectValue &&
			selectedValues4AreaCode.includes(initSelectValue)
		) {
			allowAreaCode = true
		}
		if (isEmpty(areaCodeOptions)) {
			allowAreaCode = false // 如果没有区号列表，强制改为 false
		}

		const nextState4RecommendedAreaCodeOptions = this.getRecommendedAreaCodeOptions()
		const nextState = {
			...nextState4RecommendedAreaCodeOptions,
		} as Partial<IState>
		const section = getAreaCodeSection(initInputValue)
		if (allowAreaCode && !isEmpty(section)) {
			const [, lastHyphenIndex] = section
			nextState.selectedAreaCode = initInputValue.slice(1, lastHyphenIndex)
			nextState.displayInputValue = trim(initInputValue.slice(lastHyphenIndex + 1))
		} else {
			nextState.displayInputValue = initInputValue
		}
		if (this.props.forbiddenRegex) {
			nextState.forbiddenRegex = new RegExp(this.props.forbiddenRegex, 'g')
		}
		if (!isEmpty(nextState)) {
			this.setState(nextState as {})
		}
		if (!isEmpty(nextState)) {
			this.setState(nextState as {})
		}
		this.validator = toJS(this.props.validator)
	}
	componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): void {
		if (!prevState.areaCodeSelectOpen && this.state.areaCodeSelectOpen) {
			const selectedOptions = Array.prototype.slice
				.call(document.querySelectorAll(`.${prefixCls}-areacode-dropdown .selected-option`))
				.filter(isDomVisible)
			const recommendedOptions = Array.prototype.slice
				.call(document.querySelectorAll(`.${prefixCls}-areacode-dropdown .option-recommendation`))
				.filter(isDomVisible)
			const areacodeDropdown = selectedOptions[0] || recommendedOptions[0]
			if (areacodeDropdown) {
				setTimeout(() => {
					areacodeDropdown?.scrollIntoView({
						block: 'nearest',
						inline: 'nearest',
					})
				}, 300)
			}
		}
		const nextState = this.getRecommendedAreaCodeOptions()
		if (!isEmpty(nextState)) {
			this.setState(nextState as {})
		}
	}
	static isAreaCodeAllowed(nextProps: IProps, nextState: IState) {
		const selectKey = nextProps.selectKey || 'select'
		const selectedValues4AreaCode = nextProps.selectedValues4AreaCode
		let allowAreaCode = false // 是否允许展示区号
		if (isNil(selectedValues4AreaCode)) {
			allowAreaCode = true
		} else if (
			isString(selectedValues4AreaCode) &&
			nextState.value?.[selectKey] &&
			trim(nextState.value?.[selectKey]) === trim(selectedValues4AreaCode)
		) {
			allowAreaCode = true
		} else if (
			isArray(selectedValues4AreaCode) &&
			nextState.value?.[selectKey] &&
			selectedValues4AreaCode.includes(nextState.value?.[selectKey])
		) {
			allowAreaCode = true
		}
		if (isEmpty(nextProps.areaCodeOptions)) {
			allowAreaCode = false // 如果没有区号列表，强制改为 false
		}

		return allowAreaCode
	}
	static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		const defaultSelect = trim(nextProps.defaultSelect)
		const selectKey = nextProps.selectKey || 'select'
		const inputKey = nextProps.inputKey || 'input'
		const options = nextProps.options || []
		const polyfillOptions = isArray(options) ? options : [options]
		const nextState = {
			selectKey,
			inputKey,
			value: prevState.value,
			prevRecommendedGeoCode: nextProps.recommendedGeoCode,
		} as any

		if (nextProps.recommendedGeoCode !== prevState.prevRecommendedGeoCode) {
			if (prevState.selectedAreaCode === '') {
				nextState.selectedAreaCode = undefined
			}
		}

		const valueSection = getAreaCodeSection(nextState.value?.[inputKey])
		if (!prevState.selectedAreaCode && valueSection.length > 0) {
			nextState.value[inputKey] = nextState.value[inputKey].slice(valueSection[1] + 1) // 处理清除 select 情形
		}

		if (!isEqual(polyfillOptions, prevState.options)) {
			nextState.options = polyfillOptions
		}
		if (!isEmpty(nextProps.value) && isEmpty(prevState.value)) {
			// case1: 初始化，nextProps.value 有值 而 prevState.value 值为空
			nextState.value = nextProps.value
		} else if (!isEqual(nextProps.value, prevState.prevPropsValue)) {
			// case2: nextProps.value 与 prevState.prevPropsValue 值不同
			nextState.value = nextProps.value
		}
		if (!isEqual(nextProps.value, prevState.prevPropsValue)) {
			nextState.prevPropsValue = nextProps.value // 记录上一个外部值
		}

		if (defaultSelect && !nextState.value?.[selectKey]) {
			if (!nextState.value) {
				nextState.value = {}
			}
			nextState.value[selectKey] = defaultSelect // 存在默认值但没有内部值用默认值覆盖内部值
		}

		// 同步区号及文本数据 Start
		if (nextState?.value?.[inputKey]) {
			nextState.displayInputValue = nextState.value[inputKey]
		}
		const allowAreaCode = MyComponent.isAreaCodeAllowed(nextProps, nextState) // 是否允许展示区号
		if (allowAreaCode) {
			nextState.displayAreaCode = true
		} else {
			nextState.displayAreaCode = false
		}
		const section = getAreaCodeSection(nextState.displayInputValue)
		if (allowAreaCode && !isEmpty(section)) {
			// 有区号选项，同时当前值中存在区号
			const [, lastHyphenIndex] = section
			if (!prevState.selectedAreaCode) {
				// 如果内部值不存在选中的区号，从输入值中取区号，并送入区号下拉框
				const areaCodeInInput = nextState.displayInputValue.slice(1, lastHyphenIndex)
				nextState.selectedAreaCode = areaCodeInInput
				nextState.displayInputValue = nextState.displayInputValue.slice(lastHyphenIndex + 1)
			} else {
				// 如果之前存在选中的区号，并且输入值中解析得到的区号与之相同，过滤输入框中的区号
				const areaCodePrefix = MyComponent.getAreaCodePrefix(prevState.selectedAreaCode)
				if (nextState.displayInputValue && nextState.displayInputValue.indexOf(areaCodePrefix) === 0) {
					nextState.displayInputValue = nextState.displayInputValue.slice(lastHyphenIndex + 1)
				}
			}
		}
		// 同步区号及文本数据 End

		if (nextState.value && !nextState.value[inputKey]) {
			// 针对显示了数据但值为空的情形
			nextState.displayInputValue = ''
		}
		if (isEmpty(nextState)) {
			return null
		}
		return nextState
	}
	areaCodeDropdownRenderer(areaCodeOptions: TAreaCodeOption[]) {
		const displayRecommendedAreaCode = this.state.displayRecommendedAreaCode
		const selectedAreaCode = this.state.selectedAreaCode
		if (!isEmpty(displayRecommendedAreaCode)) {
			for (let i = 0; i < areaCodeOptions.length; i++) {
				const opt = areaCodeOptions[i]
				if (displayRecommendedAreaCode === `${opt.geoCode}_${opt.areaCode}`) {
					const removedOption = areaCodeOptions.splice(i, 1)
					areaCodeOptions.unshift(...removedOption)
					break
				}
			}
		}
		return (
			<ul className={`${prefixCls}-areacode-dropdown`}>
				{areaCodeOptions
					.filter(areaCodeOption => {
						const { countryZhName, countryCode, areaCode } = areaCodeOption || {}
						if (
							this.areaCodeInput &&
							![trim(countryZhName), trim(countryCode)].includes(this.areaCodeInput) &&
							!trim(areaCode).includes(this.areaCodeInput)
						) {
							return false
						} else {
							return true
						}
					})
					.map(areaCodeOption => {
						const { countryZhName, countryCode, areaCode, geoCode } = areaCodeOption || {}
						const country = countryZhName ? `${countryZhName} +${areaCode}` : `${countryCode} +${areaCode}`
						let isSelectedOption = false
						if (selectedAreaCode && selectedAreaCode === areaCode) {
							isSelectedOption = true
						}
						if (displayRecommendedAreaCode === `${geoCode}_${areaCode}`) {
							return (
								<li
									key={geoCode}
									className={classNames(isSelectedOption ? 'selected-option' : '', 'option', 'option-recommendation')}
									onClick={this.pickAreaCode.bind(this, areaCode)}>
									<span className={'option-text'}>{country}</span>
									<span className={'option-tag'}>
										<span className={'option-tag-text'}>
											{'推荐'}
										</span>
									</span>
								</li>
							)
						}
						return (
							<li
								className={classNames(isSelectedOption ? 'selected-option' : '', 'option')}
								key={geoCode}
								onClick={this.pickAreaCode.bind(this, areaCode)}>
								{!areaCode ? '' : country}
							</li>
						)
					})}
			</ul>
		)
	}
	areaCodeInputOnSearch(areaCodeInput: string) {
		this.areaCodeInput = areaCodeInput
	}
	getRecommendedAreaCodeOptions() {
		const areaCodeOptions = this.props.areaCodeOptions || []
		const recommendedGeoCode = trim(this.props.recommendedGeoCode)
		const recommendedAreaCode = trim(this.props.recommendedAreaCode)
		const recommendedZhName = trim(this.props.recommendedZhName)
		const recommendedEnName = trim(this.props.recommendedEnName)
		const tmp = find(areaCodeOptions, (a: TAreaCodeOption) => {
			if (recommendedGeoCode && recommendedGeoCode === a.geoCode) {
				return true
			}
			if (recommendedAreaCode && recommendedAreaCode === a.areaCode) {
				return true
			}
			if (recommendedZhName && recommendedZhName === a.countryZhName) {
				return true
			}
			if (recommendedEnName && recommendedEnName === a.countryCode) {
				return true
			}
			return false
		})
		const nextState = {} as Partial<IState>
		if (!isEmpty(tmp)) {
			nextState.displayRecommendedAreaCode = `${tmp?.geoCode}_${tmp?.areaCode}`
			if (this.state.selectedAreaCode === undefined) {
				nextState.selectedAreaCode = `${tmp?.areaCode}`
			}
		}
		return nextState
	}
	render() {
		const {
			suffixIcon,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			onChange,
			// value: propsValue,
			// options: propsState,
			// loading,
			// title,
			inputType,
			// required,
			pattern,
			selectStyle,
			inputStyle,
			selectProps,
			areacodeProps,
			inputProps,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			selectKey: propsSelectKey,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			inputKey: propsInputKey,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			defaultSelect,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			setSelfErrors,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			selfErrors,
			baseArrayContext,
			// options: propsOptions,
			areaCodeOptions = [],
			// selectedValues4AreaCode,
			// recommendedGeoCode,
			// recommendedAreaCode,
			// recommendedZhName,
			// recommendedEnName,
			// forbiddenRegex,
			// fieldAddress,
			...props
		} = this.props
		const {
			options,
			value,
			selectKey,
			// inputKey,
			selectedAreaCode,
			displayInputValue,
			areaCodeSelectOpen,
			displayAreaCode,
		} = this.state
		const isSingleItemDisabled = baseArrayContext?.isSingleItemDisabled
		const disabled = isSingleItemDisabled || ['readOnly', 'disabled'].includes(trim(pattern))
		const areaCodeLabelValuePairs = areaCodeOptions.map(({ areaCode }) => {
			return {
				label: areaCode,
				value: areaCode,
			}
		})
		return (
			<div {...props}>
				<div className={`${prefixCls}-wrapper`}>
					{/* old Start */}
					{!displayAreaCode && (
						<>
							<div
								className={`${prefixCls}-selectClass`}
								style={selectStyle}
								ref={r => (this.popupContainerRef1 = r as any)}>
								<XtdSelect
									size={'middle'}
									{...selectProps}
									disabled={disabled}
									suffixIcon={suffixIcon}
									onChange={this.onXtdSelectChange}
									options={options}
									value={value?.[selectKey]}
									showSearch={true}
									getPopupContainer={() => this.popupContainerRef1}
								/>
							</div>
							<div className={`${prefixCls}-inputClass`} style={inputStyle}>
								<XtdInput
									size={'middle'}
									{...inputProps}
									disabled={disabled}
									onChange={this.onXtdInputChange}
									onBlur={this.onXtdInputBlur}
									value={displayInputValue}
									type={inputType}
								/>
							</div>
						</>
					)}
					{/* old end */}
					{/* new start */}
					{displayAreaCode && (
						<>
							<div className={`${prefixCls}-selectkey-areacode-wrapper`}>
								<div className={`${prefixCls}-selectkey-wrapper`} ref={r => (this.popupContainerRef2 = r as any)}>
									<XtdSelect
										size={'middle'}
										{...selectProps}
										disabled={disabled}
										suffixIcon={suffixIcon}
										onChange={this.onXtdSelectChange}
										options={options}
										value={value?.[selectKey]}
										showSearch={true}
										getPopupContainer={() => {
											return this.popupContainerRef2
										}}
									/>
								</div>
								<div className={`${prefixCls}-areacode-wrapper`} ref={r => (this.popupContainerRef3 = r as any)}>
									<XtdSelect
										size={'middle'}
										style={{ width: 80 }}
										disabled={disabled}
										value={selectedAreaCode}
										options={areaCodeLabelValuePairs}
										placeholder={'请选择区号'}
										onSearch={this.areaCodeInputOnSearch.bind(this)}
										onClear={this.pickAreaCode.bind(this, '')}
										dropdownRender={this.areaCodeDropdownRenderer.bind(this, areaCodeOptions)}
										filterOption={false}
										dropdownStyle={{
											maxWidth: '250px',
										}}
										open={areaCodeSelectOpen}
										onDropdownVisibleChange={visible =>
											this.setState({
												areaCodeSelectOpen: visible,
											})
										}
										showSearch={true}
										showArrow={false}
										dropdownMatchSelectWidth={false}
										allowClear={true}
										getPopupContainer={() => this.popupContainerRef3 as any}
										{...areacodeProps}
									/>
								</div>
								<div className={`${prefixCls}-input-wrapper`}>
									<XtdInput
										size={'middle'}
										{...inputProps}
										disabled={disabled}
										onChange={this.onXtdInputChange}
										onBlur={this.onXtdInputBlur}
										value={displayInputValue}
										type={inputType}
									/>
								</div>
							</div>
						</>
					)}
					{/* new end */}
				</div>
			</div>
		)
	}
}
MyComponent.contextType = ConfigContext
export default MyComponent
