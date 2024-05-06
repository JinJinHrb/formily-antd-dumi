import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react'
import XtSelect, { SelectProps, BaseOptionType, DefaultOptionType, LabeledValue } from 'antd/es/Select'
import { isNil, omit, isEmpty, isFunction, isString } from 'lodash-es'
import { useInfiniteQuery } from 'react-query'
import { useDebounceFn, useMount, useUpdateEffect } from 'ahooks'
import { DebounceOptions } from 'ahooks/lib/useDebounce/debounceOptions'
import { UseInfiniteQueryOptions } from 'react-query'

export interface SearchSelectProps<
	ValueType = any,
	OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<SelectProps<ValueType, OptionType>, 'mode'> {
	queryKey?: string
	mode?: 'multiple' | 'tags' | 'tuple'
	/** 搜索下拉框内容 */
	onFetchOptions?: (value: string) => Promise<OptionType[]>
	/** 下拉框选项变化 */
	onOptionsChange?: (options?: OptionType[]) => void
	/**
	 * 何时搜索下拉框
	 * onSearch 只在用户输入文本触发 onSearch 事件搜索
	 * onInit 只在组件首次渲染时搜索
	 * all 以上情况都搜索
	 */
	fetchOptionWhen?: 'onSearch' | 'onInit' | 'all'
	/** 搜索选项的配置 */
	fetchOptions?: UseInfiniteQueryOptions
	/** 触发搜索所需最少的文本，默认是 0 */
	fetchMinLength?: number
	/** 是否滚动到底部加载 */
	infinite: false
}

export interface InfiniteSelectProps<
	ValueType = any,
	OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends Omit<SearchSelectProps<ValueType, OptionType>, 'onFetchOptions' | 'infinite'> {
	/** 是否滚动到底部加载 */
	infinite: true
	onFetchOptions?: (value: string, page: number) => Promise<{ data: OptionType[]; next: number }>
}

type TAdd = {
	addText: string // 只有和 addHandler 一起添加的时候，才出现额外的新建项
	addHandler: () => void
	setDataSource: (options?: any) => void
	setValue: (values?: any) => void
}

const prefixCls = 'xt-search-select'

const useDebounceState = <S,>(initialState: S | (() => S), options?: DebounceOptions) => {
	const [state, setState] = useState(initialState)

	const debouncedSetState = useDebounceFn(setState, options)

	return [state, debouncedSetState] as const
}

const appendDropdownRender = (addText: string, addHandler: () => void) => {
	return (menu: unknown) => (
		<>
			{menu}
			<div
				className={`${prefixCls} add`}
				onClick={addHandler}
				style={{
					height: 54,
					display: 'flex',
					alignItems: 'center',
					paddingLeft: 16,
					boxShadow: '0 0 6px 0 rgba(199, 199, 199, 0.5)',
					fontSize: 14,
					color: '#ff934a',
					cursor: 'pointer',
				}}>
				{addText}
			</div>
		</>
	)
}

export const useAsync = (
	props: Pick<
		SearchSelectProps | InfiniteSelectProps,
		| 'queryKey'
		| 'infinite'
		| 'onFetchOptions'
		| 'fetchOptionWhen'
		| 'fetchMinLength'
		| 'fetchOptions'
		| 'onOptionsChange'
		| 'filterOption'
		| 'options'
		| 'onSearch'
	> &
		TAdd,
	/** 下拉框关闭时，是否保持下拉框选项 */
	type: 'select' | 'input' = 'select',
) => {
	const [searchText, setSearchText] = useDebounceState<string | null>('', { wait: 200 })
	const {
		queryKey,
		infinite,
		onFetchOptions,
		fetchMinLength = 0,
		fetchOptionWhen,
		fetchOptions,
		onOptionsChange,
		setDataSource,
		options: outterOptions,
		setValue,
	} = props

	const {
		data: fetchData,
		fetchNextPage,
		hasNextPage,
		refetch,
		isFetching,
	} = useInfiniteQuery<any>(
		[queryKey, searchText],
		async ({ pageParam = 1 }) => {
			const res = await onFetchOptions?.(searchText!, pageParam)
			return infinite ? res : { data: res }
		},
		{
			enabled: false,
			getNextPageParam(lastPage) {
				return lastPage?.next
			},
			...fetchOptions,
		},
	)

	useMount(() => {
		if (fetchOptionWhen !== 'onSearch') {
			refetch()
		}
	})

	useUpdateEffect(() => {
		if (searchText !== null && searchText.length >= fetchMinLength) {
			// queryKey 变化后，重新搜索
			refetch()
		}
	}, [queryKey, searchText])

	const [prevOutterOptions, setPrevOutterOptions] = useState<undefined | unknown[]>([])
	useUpdateEffect(() => {
		setPrevOutterOptions(outterOptions)
		if (isEmpty(outterOptions) && !isEmpty(prevOutterOptions)) {
			setValue(undefined)
			setInnerOptions([])
			refetch()
		}
	}, [outterOptions])

	const [innerOptions, setInnerOptions] = useState<DefaultOptionType[]>([])
	const innerFetchedOptions = useMemo(
		() => fetchData?.pages.reduce((result, current) => !isNil(current?.data) && result.concat(current?.data), []),
		[fetchData, isFetching],
	)

	useEffect(() => {
		setInnerOptions(innerFetchedOptions)
	}, [innerFetchedOptions])

	useEffect(() => {
		onOptionsChange?.(innerOptions)
		setDataSource(innerOptions)
	}, [innerOptions])

	let filterOption = props.filterOption
	// 如果设置了 onFetchOptions，filterOption 默认为 false
	if (isNil(props.filterOption) && onFetchOptions) {
		filterOption = false
	}

	const options = onFetchOptions && !props.options ? innerOptions : props.options

	const onSearch = (value = '') => {
		props.onSearch?.(value)
		if (fetchOptionWhen !== 'onInit') {
			if (value.length >= fetchMinLength) {
				setSearchText.run(value)
			} else {
				setSearchText.run(null)
				setSearchText.flush()
				// 清空下拉框
				setInnerOptions([])
			}
		}
	}

	const onPopupScroll = (e: SyntheticEvent) => {
		const el = e.target as HTMLElement | undefined
		if (!el || isFetching || !hasNextPage) return

		const scrollTop = el.scrollTop
		const scrollHeight = el.scrollHeight
		const clientHeight = el.clientHeight

		if (scrollHeight - scrollTop <= clientHeight + 300) {
			fetchNextPage()
		}
	}

	const onDropdownVisibleChange = (visible: boolean) => {
		// 下拉框关闭时，如果是select类型，并且searchText存在，重置searchText重新搜索下拉框
		if (!visible && type === 'select' && searchText) {
			setSearchText.run('')
			setSearchText.flush()
		}
	}

	return { isFetching, options, filterOption, onSearch, onDropdownVisibleChange, onPopupScroll }
}

const SearchSelect: React.FC<(SearchSelectProps | InfiniteSelectProps) & TAdd> = props => {
	const { value: propValue, mode: propMode, showSearch: propShowSearch, onFetchOptions, options: outterOptions } = props

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { addText, addHandler, setDataSource, ...otherProps } = omit(props, [
		'infinite',
		'queryKey',
		'onFetchOptions',
		'fetchOptionWhen',
		'fetchMinLength',
		'fetchOptions',
		'onOptionsChange',
	])
	const selectProps = {
		...otherProps,
	}
	if (isString(addText) && isFunction(addHandler)) {
		selectProps.dropdownRender = appendDropdownRender(addText, addHandler)
	}

	const value = useMemo(() => {
		/** 如果是 labelInValue 并且配了 fieldNames。将 { label, value } 转为 { [labelKey], [valueKey] } */
		let newValue = props.value
		if (props.labelInValue && props.fieldNames) {
			const { label: labelKey = 'label', value: ValueKey = 'value' } = props.fieldNames
			if (propMode === 'multiple') {
				newValue = (props.value || []).map((item: any) => ({
					label: item[labelKey],
					value: item[ValueKey],
				}))
			} else {
				if (props.value) {
					newValue = {
						label: props.value[labelKey],
						value: props.value[ValueKey],
					}
				}
			}
		}

		/** 如果是 tuple模式，那么value的结构实际上是[id, name]，将其转为labelInValue解决回显问题 */
		if (propMode === 'tuple') {
			if (props.value?.[0]) {
				newValue = {
					label: props.value?.[1],
					value: props.value?.[0],
				}
			} else {
				newValue = undefined
			}
		}

		return newValue
	}, [propValue, props.labelInValue, propMode, props.fieldNames])

	let showSearch = propShowSearch
	// 如果设置了 onFetchOptions，showSearch 默认为 true
	if (isNil(propShowSearch) && onFetchOptions) {
		showSearch = true
	}

	const onChange: SelectProps['onChange'] = (value, option) => {
		let newValue = value
		if (props.labelInValue && props.fieldNames) {
			const { label: labelKey = 'label', value: ValueKey = 'value' } = props.fieldNames
			if (propMode === 'multiple' && Array.isArray(value)) {
				newValue = value.map(item => {
					return typeof item === 'object'
						? {
								[labelKey]: item.label,
								[ValueKey]: item.value,
						  }
						: item
				})
			} else {
				newValue = {
					[labelKey]: value.label,
					[ValueKey]: value.value,
				}
			}
		}
		if (propMode === 'tuple') {
			newValue = [value.value, value.label]
		}
		props.onChange?.(newValue, option)
	}

	type TOnSelect = LabeledValue | [LabeledValue['value'], LabeledValue['label']]

	const onSelect: SelectProps['onSelect'] = (value: LabeledValue, option: DefaultOptionType) => {
		let newValue: TOnSelect = value
		if (propMode === 'tuple') {
			newValue = [value.value, value.label]
		}
		props.onSelect?.(newValue as unknown as string | number, option)
	}
	const onDeselect: SelectProps['onDeselect'] = (value: LabeledValue, option: DefaultOptionType) => {
		let newValue: TOnSelect = value
		if (propMode === 'tuple') {
			newValue = [value.value, value.label]
		}
		props.onDeselect?.(newValue as unknown as string | number, option)
	}
	const { isFetching, options, filterOption, onSearch, onDropdownVisibleChange, onPopupScroll } = useAsync(props)
	return (
		<XtSelect
			{...selectProps}
			mode={propMode === 'tuple' ? undefined : propMode}
			labelInValue={propMode === 'tuple' ? true : props.labelInValue}
			options={options}
			showSearch={showSearch}
			value={value}
			filterOption={filterOption}
			showArrow={true}
			loading={isFetching}
			onSearch={onSearch}
			onChange={onChange}
			onSelect={onSelect}
			onDeselect={onDeselect}
			onDropdownVisibleChange={onDropdownVisibleChange}
			onPopupScroll={onPopupScroll}
			getPopupContainer={triggerNode => triggerNode.parentNode}
		/>
	)
}

export default SearchSelect
