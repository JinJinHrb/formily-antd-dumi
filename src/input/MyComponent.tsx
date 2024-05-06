/* eslint-disable react/destructuring-assignment */
import React, { ReactNode, SyntheticEvent } from 'react'
import { trim, isEmpty, isArray, isEqual, find } from 'lodash-es'
import XtdSelect from 'antd/es/Select'
import XtdInput, { InputProps } from 'antd/es/input'
import ConfigProvider from 'antd/es/config-provider'
import classNames from 'classnames'
import { TAreaCodeOption, getAreaCodeSection, isDomVisible, getAreaCodeFromAccount } from '../__builtins__'

const { ConfigContext } = ConfigProvider
const prefixCls = 'xt-input'
interface IProps extends InputProps {
	onChange: (data: any) => void
	areaCodeOptions: TAreaCodeOption[] // 注入国际电话区号
	recommendedGeoCode?: string
	recommendedAreaCode?: string
	recommendedZhName?: string
	recommendedEnName?: string
	forbiddenRegex?: string
}
interface IState {
	selectKey: string
	inputKey: string
	value: string
	options: any // LabeledValue[]
	prevPropsValue?: string | number | readonly string[]
	displayAreaCode: boolean
	displayInputValue: string // input 框显示的值不带 +86- 前缀
	selectedAreaCode?: string
	areaCodeSelectOpen: boolean
	displayRecommendedAreaCode: string
	forbiddenRegex?: RegExp
	inputLock: boolean
	prevRecommendedGeoCode?: string
}
class MyComponent extends React.PureComponent<IProps, IState> {
	areaCodeInput: string
	popupContainerRef: React.RefObject<HTMLDivElement>
	constructor(props: IProps) {
		super(props)
		this.state = {
			selectKey: '',
			inputKey: '',
			value: '',
			options: [],
			prevPropsValue: undefined,
			displayAreaCode: false,
			selectedAreaCode: undefined,
			// 用 undefined / "" 区分未初始化和人工选择空
			areaCodeSelectOpen: false,
			displayRecommendedAreaCode: '',
			displayInputValue: '',
			forbiddenRegex: undefined,
			inputLock: false, // 通过锁，区分外部传入数据和人工输入数据
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
		const selectedAreaCode = trim(newData?.selectedAreaCode)
		const displayInputValue = trim(newData?.displayInputValue)
		const areaCodePrefix = MyComponent.getAreaCodePrefix(selectedAreaCode)
		const outputValue =
			areaCodePrefix +
			(/^\+\w+\s+\w+$/.test(displayInputValue) ? displayInputValue.replace(/\s+/, '-') : displayInputValue)
		this.props?.onChange(outputValue)
	}
	onXtdInputChange = (event: SyntheticEvent) => {
		const rawValue = (event.target as any)?.value
		const selectedAreaCode = trim(this.state.selectedAreaCode)
		if (!rawValue) {
			// 处理直接清空 input 框情形
			const newData = {
				value: MyComponent.getAreaCodePrefix(selectedAreaCode),
				displayInputValue: '',
			}
			this.setState(newData, () => this.onChange(newData as IState))
			return
		}
		const value =
			rawValue && this.state.forbiddenRegex instanceof RegExp
				? rawValue.replace(this.state.forbiddenRegex, '')
				: rawValue
		const newState = {
			...this.state,
		}
		newState.value = newState.displayInputValue = value
		const allowAreaCode = MyComponent.isAreaCodeAllowed(this.props) // 是否允许展示区号
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
	onXtdInputFocus() {
		this.setState({
			inputLock: true,
		})
	}
	pickAreaCode(selectedAreaCode: string) {
		const allowAreaCode = MyComponent.isAreaCodeAllowed(this.props) // 是否允许展示区号
		if (!allowAreaCode) {
			return
		}
		const newState = {
			...this.state,
		}
		const value = trim(newState.value)
		const valueAreaCode = getAreaCodeFromAccount(value)
		if (valueAreaCode === this.state.selectedAreaCode && valueAreaCode === selectedAreaCode) {
			return
		}
		newState.selectedAreaCode = selectedAreaCode
		const valueSection = getAreaCodeSection(value)
		if (valueSection.length > 0) {
			newState.displayInputValue = value.slice(valueSection[1] + 1)
		} else {
			newState.displayInputValue = value
		}
		if (selectedAreaCode) {
			const areaCodePrefix = MyComponent.getAreaCodePrefix(selectedAreaCode)
			newState.value = `${areaCodePrefix}${newState.displayInputValue}`
		} else {
			newState.value = newState.displayInputValue
		}
		newState.areaCodeSelectOpen = false
		this.setState(newState, () => this.onChange(newState))
	}
	componentDidMount() {
		const initInputValue = isArray(this.props.value)
			? trim((this.props.value as string[]).join())
			: trim(this.props.value as string)
		const areaCodeOptions = this.props.areaCodeOptions
		const allowAreaCode = !isEmpty(areaCodeOptions) // 是否允许展示区号

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
	}
	componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
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
	static isAreaCodeAllowed(nextProps: IProps) {
		return !isEmpty(nextProps.areaCodeOptions)
	}
	static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
		const allowAreaCode = MyComponent.isAreaCodeAllowed(nextProps) // 是否允许展示区号
		const nextState: Partial<IState> = {
			prevRecommendedGeoCode: nextProps.recommendedGeoCode,
		}
		if (allowAreaCode) {
			nextState.displayAreaCode = true
		} else {
			nextState.displayAreaCode = false
		}

		if (nextProps.recommendedGeoCode !== prevState.prevRecommendedGeoCode) {
			if (prevState.selectedAreaCode === '') {
				nextState.selectedAreaCode = undefined
			}
		}

		let inputLock = false // false: 禁止更新 nextState.value
		// 同步区号及文本数据 Start
		if (!isEmpty(nextProps.value) && isEmpty(prevState.value)) {
			// case1: 初始化，nextProps.value 有值 而 prevState.value 值为空
			nextState.value = trim(nextProps.value as string)
		} else if (!isEqual(nextProps.value, prevState.prevPropsValue)) {
			// case2: nextProps.value 与 prevState.prevPropsValue 值不同
			nextState.value = prevState.value
		} else {
			// case3: nextProps.value 与 prevState.prevPropsValue 值相同
			inputLock = true
			const propSection = getAreaCodeSection(trim(nextProps.value as string))
			if (!prevState.selectedAreaCode && propSection.length > 0) {
				nextState.value = trim(nextProps.value as string).slice(propSection[1] + 1) // 处理删除区号情形
			} else {
				nextState.value = prevState.value
			}
		}
		if (!isEqual(nextProps.value, prevState.prevPropsValue)) {
			nextState.prevPropsValue = nextProps.value // 记录上一个外部值
		}

		const section = getAreaCodeSection(nextState.value)
		if (nextState.value && (!prevState.displayInputValue || (!isEmpty(section) && !prevState.selectedAreaCode))) {
			nextState.displayInputValue = nextState.value
			if (allowAreaCode && !isEmpty(section)) {
				const [, lastHyphenIndex] = section
				if (!prevState.selectedAreaCode) {
					const areaCodeInInput = nextState.displayInputValue.slice(1, lastHyphenIndex)
					nextState.selectedAreaCode = areaCodeInInput
					nextState.displayInputValue = nextState.displayInputValue.slice(lastHyphenIndex + 1)
				} else {
					const areaCodePrefix = MyComponent.getAreaCodePrefix(prevState.selectedAreaCode)
					if (nextState.displayInputValue && nextState.displayInputValue.indexOf(areaCodePrefix) === 0) {
						nextState.displayInputValue = nextState.displayInputValue.slice(lastHyphenIndex + 1)
					}
				}
			}
		}
		if (inputLock && !nextState.value && prevState.displayInputValue) {
			nextState.displayInputValue = '' // 处理直接清空 input 框情形
		}

		// 同步区号及文本数据 End

		if (isEmpty(nextState)) {
			return null
		}
		return nextState
	}
	areaCodeDropdownRenderer(areaCodeOptions: TAreaCodeOption[], reactNode: ReactNode) {
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
										<span className={'option-tag-text'}>{'推荐'}</span>
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
			areaCodeOptions = [],
			recommendedGeoCode,
			recommendedAreaCode,
			recommendedZhName,
			recommendedEnName,
			disabled,
			readOnly,
			style,
			forbiddenRegex,
			...props
		} = this.props
		const { value, selectedAreaCode, displayInputValue, areaCodeSelectOpen, displayAreaCode } = this.state
		const areaCodeLabelValuePairs = areaCodeOptions.map(({ countryZhName, areaCode }) => {
			return {
				label: areaCode,
				value: areaCode,
			}
		})
		return (
			<>
				{displayAreaCode && (
					<>
						<div className={`${prefixCls}-wrapper`} style={style}>
							{readOnly && (
								<div className={`${prefixCls}-areacode`}>
									<XtdInput
										value={selectedAreaCode}
										placeholder={'区号'}
										readOnly={true}
										onBlur={this.props.onBlur}
									/>
								</div>
							)}
							{!readOnly && (
								<div className={`${prefixCls}-areacode`} ref={r => (this.popupContainerRef = r as any)}>
									<XtdSelect
										className={`${prefixCls}-areacode`}
										disabled={disabled}
										value={selectedAreaCode}
										options={areaCodeLabelValuePairs}
										placeholder={'请选择区号'}
										onFocus={this.onXtdInputFocus.bind(this)}
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
										getPopupContainer={() => {
											return this.popupContainerRef as any
										}}
										onBlur={this.props.onBlur}
										id={`${props.id || 'area'}-select`}
									/>
								</div>
							)}
							<div className={`${prefixCls}-input`}>
								<XtdInput
									{...props}
									disabled={disabled}
									readOnly={readOnly}
									onFocus={this.onXtdInputFocus.bind(this)}
									onChange={this.onXtdInputChange}
									value={displayInputValue}
									onBlur={this.props.onBlur}
								/>
							</div>
						</div>
					</>
				)}
				{!displayAreaCode && (
					<XtdInput value={displayInputValue} style={style} disabled={disabled} readOnly={readOnly} {...props} />
				)}
			</>
		)
	}
}
MyComponent.contextType = ConfigContext
export default MyComponent
