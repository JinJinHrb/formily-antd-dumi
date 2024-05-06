import React from 'react'
import Card from 'antd/es/card'
import Empty from 'antd/es/empty'
import { CardProps } from 'antd/es/card'
import { ArrayField } from '@formily/core'
import { useForm, useField, observer, useFieldSchema, RecursionField } from '@formily/react'
import cls from 'classnames'
import { ISchema } from '@formily/json-schema'
import { usePrefixCls } from '../__builtins__'
import { ArrayBase, ArrayBaseMixins } from '../array-base'

type ComposedArrayCards = React.FC<CardProps> & ArrayBaseMixins

const isAdditionComponent = (schema: ISchema) => {
	return schema['x-component']?.indexOf('Addition') > -1 || schema['isExtraAddition']
}

const isIndexComponent = (schema: ISchema) => {
	return schema['x-component']?.indexOf('Index') > -1
}

const isRemoveComponent = (schema: ISchema) => {
	return schema['x-component']?.indexOf('Remove') > -1
}

const isMoveUpComponent = (schema: ISchema) => {
	return schema['x-component']?.indexOf('MoveUp') > -1
}

const isMoveDownComponent = (schema: ISchema) => {
	return schema['x-component']?.indexOf('MoveDown') > -1
}

const isEditComponent = (schema: ISchema) => {
	return schema['x-component']?.indexOf('Edit') > -1
}

const isOperationComponent = (schema: ISchema) => {
	return (
		isAdditionComponent(schema) ||
		isRemoveComponent(schema) ||
		isMoveDownComponent(schema) ||
		isMoveUpComponent(schema) ||
		isEditComponent(schema)
	)
}

export const ArrayCards: ComposedArrayCards = observer(rawProps => {
	const { ...props } = (rawProps || {}) as any
	const form = useForm()
	const field = useField<ArrayField>()
	const schema = useFieldSchema()
	const dataSource = Array.isArray(field.value) ? field.value : []
	const prefixCls = usePrefixCls('formily-array-cards', props)

	if (!schema) throw new Error('can not found schema object')

	const renderItems = () => {
		return dataSource?.map((item, index) => {
			const items = Array.isArray(schema.items) ? schema.items[index] || schema.items[0] : schema.items
			const title = (
				<span>
					<RecursionField
						schema={items}
						name={index}
						filterProperties={schema => {
							if (!isIndexComponent(schema)) return false
							return true
						}}
						onlyRenderProperties
					/>
					{props.title || field.title}
				</span>
			)
			const extra = (
				<span>
					<RecursionField
						schema={items}
						name={index}
						filterProperties={schema => {
							if (!isOperationComponent(schema)) return false
							return true
						}}
						onlyRenderProperties
					/>
					{props.extra}
				</span>
			)
			const content = (
				<RecursionField
					schema={items}
					name={index}
					filterProperties={schema => {
						if (isIndexComponent(schema)) return false
						if (isOperationComponent(schema)) return false
						return true
					}}
				/>
			)
			const subField = form.query(`${field.address}.${index}`).take()
			const subFieldDisplay = subField?.display
			return (
				<ArrayBase.Item key={index} index={index} record={item}>
					{subFieldDisplay !== 'hidden' && (
						<Card
							{...props}
							onChange={() => {}}
							className={cls(`${prefixCls}-item`, `${prefixCls}-index-${index}`, props.className)}
							data-index={`${index}`}
							title={title}
							extra={extra}>
							{content}
						</Card>
					)}
				</ArrayBase.Item>
			)
		})
	}

	const renderAddition = () => {
		return schema.reduceProperties((addition, schema, key) => {
			if (isAdditionComponent(schema)) {
				return <RecursionField schema={schema} name={key} />
			}
			return addition
		}, null)
	}

	const renderEmpty = () => {
		if (dataSource?.length) return
		return (
			<Card
				{...props}
				onChange={() => {}}
				className={cls(`${prefixCls}-item`, props.className)}
				title={props.title || field.title}>
				<Empty />
			</Card>
		)
	}

	return (
		<ArrayBase>
			{renderEmpty()}
			{renderItems()}
			{renderAddition()}
		</ArrayBase>
	)
})

ArrayCards.displayName = 'ArrayCards'

ArrayBase.mixin(ArrayCards)
