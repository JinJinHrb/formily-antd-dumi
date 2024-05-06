import React, { useRef, useCallback, useEffect, useState } from 'react'
import { ArrayField } from '@formily/core'
import { useField, observer, useFieldSchema, RecursionField } from '@formily/react'
import AutoSizer from 'react-virtualized-auto-sizer'
import cls from 'classnames'
import { useMutationObserver } from 'ahooks'
import { VariableSizeList } from 'react-window'
import { Row } from './row'
import { SortableContainer, ContainerGetter, HelperContainerGetter } from 'react-sortable-hoc'
import { ISchema } from '@formily/json-schema'
import { usePrefixCls } from '../__builtins__'
import { ArrayBase, ArrayBaseMixins } from '../array-base'
import { trim } from 'lodash-es'

type ComposedInfiniteArrayItems = React.FC<
	React.HTMLAttributes<HTMLDivElement> & { twoColumn: boolean; oneColumn?: boolean; itemStyle?: React.CSSProperties }
> &
	ArrayBaseMixins & {
		Item?: React.FC<
			React.HTMLAttributes<HTMLDivElement> & {
				type?: 'card' | 'divide'
			}
		>
	}

const SortableList = SortableContainer((props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
	const { id, ...rest } = props
	const prefixCls = usePrefixCls('formily-infinite-array-items')
	return (
		<div {...rest} id={`${prefixCls}-${id}-list`} className={cls(`${prefixCls}-list`, props.className)}>
			{props.children}
		</div>
	)
}) as React.PropsWithChildren<any>

const isAdditionComponent = (schema: ISchema) => {
	return schema['x-component']?.indexOf('Addition') > -1
}

const useAddition = () => {
	const schema = useFieldSchema()
	return schema.reduceProperties((addition, schema, key) => {
		if (isAdditionComponent(schema)) {
			return <RecursionField schema={schema} name={key} />
		}
		return addition
	}, null)
}

export type TInfiniteArrayItemsProps = React.PropsWithChildren<
	React.HTMLAttributes<HTMLDivElement> & {
		twoColumn: boolean
		oneColumn?: boolean
		itemStyle?: React.CSSProperties
	} & { empty?: React.ReactNode }
> & {
	id: string
	avaibleHeight: number
	/** 自动高度，使用第一个元素高度 * n为容器高度，适用于每个item高度固定，但是item高度未知的场景 */
	useFirstItemHeightCount: number
	disableSingleItemKey?: string
	disableSingleItemValue?: string
	getContainer?: ContainerGetter
	helperContainer?: HTMLElement | HelperContainerGetter
}

export const InfiniteArrayItems: ComposedInfiniteArrayItems = observer((props: TInfiniteArrayItemsProps) => {
	const {
		id = '',
		avaibleHeight = 600,
		useFirstItemHeightCount = 2,
		disableSingleItemKey,
		disableSingleItemValue,
		getContainer,
		helperContainer,
		...otherProps
	} = props
	const listRef = useRef<VariableSizeList>(null)
	const [firstItemHeight, setFirstItemHeight] = useState<number>()
	const field = useField<ArrayField>()
	const [listDom, setListDom] = useState<HTMLElement>()
	let isEditable: boolean
	if (['editable', ''].includes(trim(field.pattern))) {
		isEditable = true
	} else {
		isEditable = false
	}
	const prefixCls = usePrefixCls('formily-infinite-array-items')
	const schema = useFieldSchema()
	const addition = useAddition()
	let dataSource = Array.isArray(field.value) ? field.value : []
	if (dataSource.length === 0 && Array.isArray(schema['default'])) {
		dataSource = schema['default']
	}

	useEffect(() => {
		const SortableListDom = document.getElementById(`${prefixCls}-${id}-list`)
		if (SortableListDom) {
			setListDom(SortableListDom)
		}
	}, [id])

	const sizeMap = useRef<{ [index: number]: number }>({})
	const setSize = useCallback(
		(index, size) => {
			sizeMap.current = { ...sizeMap.current, [index]: size }
			if (useFirstItemHeightCount && !firstItemHeight && sizeMap.current[0]) {
				setFirstItemHeight(sizeMap.current[0])
			}
			listRef.current?.resetAfterIndex(index)
		},
		[useFirstItemHeightCount, firstItemHeight],
	)

	useMutationObserver(
		() => {
			const wrapper = listDom?.querySelectorAll(`.${prefixCls}-card, .${prefixCls}-divide`)
			wrapper?.forEach(dom => {
				const parentNode = dom.parentNode as HTMLElement
				const index = parentNode?.getAttribute('data-index')
				setSize(index, dom?.getBoundingClientRect()?.height)
			})
		},
		listDom,
		{ childList: true, subtree: true },
	)

	useEffect(() => {
		const wrapper = listDom?.querySelectorAll(`.${prefixCls}-card, .${prefixCls}-divide`)
		wrapper?.forEach(dom => {
			const parentNode = dom.parentNode as HTMLElement
			const index = parentNode?.getAttribute('data-index')
			setSize(index, dom?.getBoundingClientRect()?.height)
		})
	}, [listDom])

	if (!schema) throw new Error('can not found schema object')
	const twoColumnCls = props?.twoColumn ? 'atom-formily-infinite-array-items-two-column' : ''
	const oneColumnCls = props?.oneColumn ? 'atom-formily-infinite-array-items-one-column' : ''

	const classNames = cls(prefixCls, twoColumnCls, oneColumnCls, props.className)

	const getSize = index => sizeMap.current?.[index] || 250

	return (
		<ArrayBase>
			<div {...otherProps} onChange={() => {}} className={classNames}>
				<SortableList
					id={id}
					useDragHandle
					lockAxis='y'
					helperClass={`${prefixCls}-sort-helper`}
					onSortEnd={({ oldIndex, newIndex }) => {
						field.move(oldIndex, newIndex)
					}}
					getContainer={getContainer || (triggerNode => triggerNode)}
					helperContainer={helperContainer || (triggerNode => triggerNode.parentNode)}>
					<AutoSizer disableHeight>
						{({ width }) => (
							<VariableSizeList
								width={width}
								height={
									useFirstItemHeightCount && firstItemHeight
										? Math.min(dataSource.length, useFirstItemHeightCount) * firstItemHeight
										: avaibleHeight
								}
								itemCount={dataSource.length}
								itemSize={getSize}
								itemKey={index => `item-key-${index}`}
								ref={listRef}
								overscanCount={3}
								itemData={{
									dataSource: dataSource,
									otherProps: {
										schema,
										isEditable,
										disableSingleItemKey,
										disableSingleItemValue,
										prefixCls,
										itemStyle: props.itemStyle,
									},
								}}>
								{Row}
							</VariableSizeList>
						)}
					</AutoSizer>
				</SortableList>
				{addition}
			</div>
		</ArrayBase>
	)
})

InfiniteArrayItems.displayName = 'InfiniteArrayItems'

const Item: typeof InfiniteArrayItems.Item = props => {
	const prefixCls = usePrefixCls('formily-infinite-array-items')
	return (
		<div {...props} onChange={() => {}} className={cls(`${prefixCls}-${props.type || 'card'}`, props.className)}>
			{props.children}
		</div>
	)
}

InfiniteArrayItems.Item = Item

ArrayBase.mixin(InfiniteArrayItems)

export default InfiniteArrayItems
