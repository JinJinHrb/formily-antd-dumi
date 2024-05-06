import React, { FC } from 'react'
import { ListChildComponentProps } from 'react-window'
import { BaseArrayContext, doesObjectHaveNestedPair, usePrefixCls } from '../__builtins__'
import { ArrayBase } from '../array-base'
import { RecursionField } from '@formily/react'
import cls from 'classnames'
import { SortableElement } from 'react-sortable-hoc'

type DataType = {
	dataSource: any[]
	otherProps: {
		isEditable: boolean
		disableSingleItemKey?: string
		disableSingleItemValue?: string
		itemStyle?: React.CSSProperties
		schema: any
		prefixCls: string
	}
}

const SortableItem = SortableElement((props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
	const prefixCls = usePrefixCls('formily-infinite-array-items')
	return (
		<div {...props} className={cls(`${prefixCls}-item`, props.className)}>
			{props.children}
		</div>
	)
}) as React.PropsWithChildren<any>

export const Row: FC<ListChildComponentProps<DataType>> = props => {
	const { index, data, style } = props

	const { dataSource, otherProps } = data
	const { isEditable, disableSingleItemKey, disableSingleItemValue, itemStyle = {}, schema, prefixCls } = otherProps
	const item = dataSource[index]

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
						id={`${prefixCls}-item-inner-${index}`}
						data-index={index}
						className={cls(`${prefixCls}-item-inner`, !isEditable ? `${prefixCls}-item-inner-not-editable` : '')}
						style={{ ...itemStyle, ...style }}>
						<RecursionField schema={items} name={index} />
					</div>
				) : (
					<SortableItem key={`item-${index}`} index={index}>
						<div
							id={`${prefixCls}-item-inner-${index}`}
							data-index={index}
							className={cls(`${prefixCls}-item-inner`, !isEditable ? `${prefixCls}-item-inner-not-editable` : '')}
							style={{ ...itemStyle, ...style }}>
							<RecursionField schema={items} name={index} />
						</div>
					</SortableItem>
				)}
			</ArrayBase.Item>
		</BaseArrayContext.Provider>
	)
}
