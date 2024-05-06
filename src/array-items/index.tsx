import React from 'react'
import { ArrayField } from '@formily/core'
import { useField, observer, useFieldSchema, RecursionField } from '@formily/react'
import cls from 'classnames'
import { SortableContainer, SortableElement, ContainerGetter, HelperContainerGetter } from 'react-sortable-hoc'
import { ISchema } from '@formily/json-schema'
import { BaseArrayContext, doesObjectHaveNestedPair, usePrefixCls } from '../__builtins__'
import { ArrayBase, ArrayBaseMixins } from '../array-base'
import { trim } from 'lodash-es'

type ComposedArrayItems = React.FC<
	React.HTMLAttributes<HTMLDivElement> & { twoColumn: boolean; oneColumn?: boolean; itemStyle?: React.CSSProperties }
> &
	ArrayBaseMixins & {
		Item?: React.FC<
			React.HTMLAttributes<HTMLDivElement> & {
				type?: 'card' | 'divide'
			}
		>
	}

const SortableItem = SortableElement((props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
	const prefixCls = usePrefixCls('formily-array-items')
	return (
		<div {...props} className={cls(`${prefixCls}-item`, props.className)}>
			{props.children}
		</div>
	)
}) as React.PropsWithChildren<any>

const SortableList = SortableContainer((props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
	const prefixCls = usePrefixCls('formily-array-items')
	return (
		<div {...props} className={cls(`${prefixCls}-list`, props.className)}>
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

export type TArrayItemsProps = React.PropsWithChildren<
	React.HTMLAttributes<HTMLDivElement> & {
		twoColumn: boolean
		oneColumn?: boolean
		itemStyle?: React.CSSProperties
	} & { empty?: React.ReactNode }
> & {
	disableSingleItemKey?: string
	disableSingleItemValue?: string
	getContainer?: ContainerGetter
	helperContainer?: HTMLElement | HelperContainerGetter
}

export const ArrayItems: ComposedArrayItems = observer((props: TArrayItemsProps) => {
	const { disableSingleItemKey, disableSingleItemValue, getContainer, helperContainer, ...otherProps } = props
	const field = useField<ArrayField>()
	let isEditable: boolean
	if (['editable', ''].includes(trim(field.pattern))) {
		isEditable = true
	} else {
		isEditable = false
	}
	const prefixCls = usePrefixCls('formily-array-items')
	const schema = useFieldSchema()
	const addition = useAddition()
	let dataSource = Array.isArray(field.value) ? field.value : []
	if (dataSource.length === 0 && Array.isArray(schema['default'])) {
		dataSource = schema['default']
	}

	if (!schema) throw new Error('can not found schema object')
	const twoColumnCls = props?.twoColumn ? 'atom-formily-array-items-two-column' : ''
	const oneColumnCls = props?.oneColumn ? 'atom-formily-array-items-one-column' : ''

	const classNames = cls(prefixCls, twoColumnCls, oneColumnCls, props.className)
	return (
		<ArrayBase>
			<div id={'4f4a7e72'} {...otherProps} onChange={() => {}} className={classNames}>
				<SortableList
					useDragHandle
					lockAxis='y'
					helperClass={`${prefixCls}-sort-helper`}
					onSortEnd={({ oldIndex, newIndex }) => {
						field.move(oldIndex, newIndex)
					}}
					getContainer={getContainer || (triggerNode => triggerNode)}
					helperContainer={helperContainer || (triggerNode => triggerNode.parentNode)}>
					{dataSource?.length
						? dataSource?.map((item, index) => {
								const isSingleItemDisabled =
									disableSingleItemKey && disableSingleItemValue
										? doesObjectHaveNestedPair(item, disableSingleItemKey, disableSingleItemValue)
										: false
								const items = Array.isArray(schema.items) ? schema.items[index] || schema.items[0] : schema.items
								return (
									<BaseArrayContext.Provider key={index} value={{ index, isSingleItemDisabled }}>
										<ArrayBase.Item index={index} record={item}>
											{item?.fixed ? (
												<div
													key={`item-${index}`}
													className={cls(
														`${prefixCls}-item-inner`,
														!isEditable ? `${prefixCls}-item-inner-not-editable` : '',
													)}
													style={props.itemStyle || {}}>
													<RecursionField schema={items} name={index} />
												</div>
											) : (
												<SortableItem key={`item-${index}`} index={index}>
													<div
														className={cls(
															`${prefixCls}-item-inner`,
															!isEditable ? `${prefixCls}-item-inner-not-editable` : '',
														)}
														style={props.itemStyle || {}}>
														<RecursionField schema={items} name={index} />
													</div>
												</SortableItem>
											)}
										</ArrayBase.Item>
									</BaseArrayContext.Provider>
								)
						  })
						: props?.empty || null}
				</SortableList>
				{addition}
			</div>
		</ArrayBase>
	)
})

ArrayItems.displayName = 'ArrayItems'

const Item: typeof ArrayItems.Item = props => {
	const prefixCls = usePrefixCls('formily-array-items')
	return (
		<div
			id={'85960425'}
			{...props}
			onChange={() => {}}
			className={cls(`${prefixCls}-${props.type || 'card'}`, props.className)}>
			{props.children}
		</div>
	)
}
ArrayItems.Item = Item

ArrayBase.mixin(ArrayItems)

export default ArrayItems
