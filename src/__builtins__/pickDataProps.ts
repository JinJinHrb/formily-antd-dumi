import { createForm, Form } from '@formily/core'
import { ISchema, Schema, SchemaKey, Stringify } from '@formily/json-schema'
import classnames from 'classnames'
import { trim, clone } from 'lodash-es'

export const pickDataProps = (props: any = {}) => {
	const results = {}

	for (const key in props) {
		if (key.indexOf('data-') > -1) {
			results[key] = props[key]
		}
	}

	return results
}

type TraverseSchema = {
	name?: string
	type?: string
	address: string
	path: string
	visible: boolean
	hidden: boolean
	fieldJson: Stringify<any>
	titles?: string[]
}

export const traverseSchema = (template: any) => {
	const form = createForm()
	const schema = new Schema(template)
	const result: TraverseSchema[] = []
	const traverse = (form: Form, schema: ISchema, basePath?: string, name?: SchemaKey) => {
		const fieldSchema = new Schema(schema)
		const fieldProps = fieldSchema.toFieldProps()
		const fieldJson = fieldSchema.toJSON()

		function recursiveProperties(propBasePath?: string) {
			fieldSchema.mapProperties((propSchema, propName) => {
				traverse(form, propSchema, propBasePath, propName)
			})
		}

		if (name === undefined || name === null) {
			recursiveProperties(basePath)
			return
		}

		if (schema.type === 'object') {
			const field = form.createObjectField({
				// ...fieldProps,
				name,
				basePath,
			})
			result.push({
				name: String(fieldProps.name),
				type: schema.type,
				address: field.address.toString(),
				path: field.path.toString(),
				visible: field.visible,
				hidden: field.hidden,
				fieldJson,
			})
			recursiveProperties(field.address.toString())
		} else if (schema.type === 'array') {
			const field = form.createArrayField({
				// ...fieldProps,
				name,
				basePath,
			})
			result.push({
				name: String(fieldProps.name),
				type: schema.type,
				address: field.address.toString(),
				path: field.path.toString(),
				visible: field.visible,
				hidden: field.hidden,
				fieldJson,
			})
			const fieldAddress = field.address.toString()
			if (schema.items) {
				const itemsSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items
				traverse(form, itemsSchema as ISchema, fieldAddress, 0)
			}
		} else if (schema.type === 'void') {
			const field = form.createVoidField({
				// ...fieldProps,
				name,
				basePath,
			})

			recursiveProperties(field.address.toString())
		} else {
			const field = form.createField({
				// ...fieldProps,
				name,
				basePath,
			})
			result.push({
				name: String(fieldProps.name),
				type: schema.type,
				address: field.address.toString(),
				path: field.path.toString(),
				visible: field.visible,
				hidden: field.hidden,
				fieldJson,
			})
		}
	}
	traverse(form, schema)
	return result
}

/*
 * 为非 FormGrid 或 FormLayout 节点添加 xt$at- 为前缀的唯一类
 */
const setXtAtCls = (template: any, address: string) => {
	const alteredAddress = trim(address).replace(/\./g, '-')
	const cls = classnames(trim(template['x-component']?.className), `xt$at-${alteredAddress}`)
	const xComponent = trim(template['x-component'])
	if (xComponent.indexOf('FormGrid') > -1 || xComponent.indexOf('FormLayout') > -1) {
		return
	}
	if (!template['x-component-props']) {
		template['x-component-props'] = {}
	}
	template['x-component-props'].className = cls
}

/**
 * 方便自动化测试：有选择地为节点添加类
 */
export const recurFieldId = (template: any) => {
	const form = createForm()
	const copyTemplate = clone(template)
	const schema = new Schema(template)
	const traverse = (form: Form, template: any, schema: ISchema, basePath?: string, name?: SchemaKey) => {
		const fieldSchema = new Schema(schema)
		function recursiveProperties(propBasePath?: string) {
			fieldSchema.mapProperties((propSchema, propName) => {
				const subTemplate = template?.properties?.[propName]
				traverse(form, subTemplate, propSchema, propBasePath, propName)
			})
		}

		if (name === undefined || name === null) {
			recursiveProperties(basePath)
			return
		}

		if (schema.type === 'object') {
			const field = form.createObjectField({
				name,
				basePath,
			})

			setXtAtCls(template, field.path.toString())

			recursiveProperties(field.address.toString())
		} else if (schema.type === 'array') {
			const field = form.createArrayField({
				name,
				basePath,
			})

			setXtAtCls(template, field.path.toString())

			const fieldAddress = field.address.toString()
			if (schema.items) {
				const itemsSchema = Array.isArray(schema.items) ? schema.items[0] : schema.items
				const subTemplate = Array.isArray(schema.items) ? template.items[0] : template.items
				traverse(form, subTemplate, itemsSchema as ISchema, fieldAddress, 0)
			}
			recursiveProperties(field.address.toString())
		} else if (schema.type === 'void') {
			const field = form.createVoidField({
				name,
				basePath,
			})

			setXtAtCls(template, field.path.toString())

			recursiveProperties(field.address.toString())
		}
	}
	traverse(form, copyTemplate, schema)
	return copyTemplate
}
