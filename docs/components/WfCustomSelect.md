---
toc: content
group: atom-busi
---

# WfCustomSelect

> 下拉框组件

新增属性：

| Property         | Type    | Default | Description               |
| ---------------- | ------- | ------- | ------------------------- |
| `noDeleteOption` | Boolean | false   | 禁止删除选项              |
| `noConfirm`      | Boolean | false   | 隐藏确认按钮              |
| `noAddition`     | Boolean | false   | 禁止添加选项              |
| `noPrettyEdit`   | Boolean | false   | readPretty 模式下禁止编辑 |

## Markup Schema 同步数据源案例

```tsx
import React, { createRef } from 'react'
import { Select, FormItem, FormButtonGroup, Submit, WfCustomSelect } from '@formily/antd-dumi'
import { createForm, onFormInit, onFormSubmit, onFieldInit } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { toJS } from '@formily/reactive'
import Button from 'antd/es/button'
import XTConfigProvider from 'antd/es/config-provider'
import _ from 'lodash-es'
const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
		WfCustomSelect,
		Button,
	},
})

const form = createForm({
	effects() {
		onFormInit(form => {
			const query = form.query('tags')
			console.log('onFormInit #34', 'query:', query)
		})

		onFieldInit('tags', field => {
			console.log('onFieldInit #44', 'field:', field)
			field?.setDataSource(
				[
					{ name: '张三', color: '#fa541c', code: '01' },
					{ name: '李四', color: '#fa541c', code: '02' },
					{ name: '王五', color: '#fa8c16', code: '03' },
					{ name: '赵六', color: '#2f54eb', code: '04' },
				].map(el => ({
					value: el,
					label: el,
				})),
			)
		})

		onFormSubmit(form => {
			const formValues = toJS(form?.values)
			console.log('onFormSubmit #33', 'formValues:', formValues)
			alert('OK')
		})
	},
})

const submitHandler = async val => {
	console.log('submitHandler #74 自定义选择框：', val)
	await new Promise(r => {
		setTimeout(r, 500)
	})
	return val
}

const resetHandler = () => {
	form.setValuesIn('customSelect', [])
	alert('OK')
}

const dataSourceRef = createRef([
	{ name: '张三', color: '#fa541c', code: '01' },
	{ name: '李四', color: '#fa541c', code: '02' },
	{ name: '王五', color: '#fa8c16', code: '03' },
	{ name: '赵六', color: '#2f54eb', code: '04' },
])

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Object
					name='customSelect'
					title='自定义选择框'
					x-decorator='FormItem'
					x-component='WfCustomSelect'
					default={[
						{ name: '李四', color: '#fa541c', code: '02' },
						{ name: '王五', color: '#fa8c16', code: '03' },
					]}
					enum={[
						{ name: '张三', color: '#fa541c', code: '01' },
						{ name: '李四', color: '#fa541c', code: '02' },
						{ name: '王五', color: '#fa8c16', code: '03' },
						{ name: '赵六', color: '#2f54eb', code: '04' },
					]}
					x-component-props={{
						open: true,
						style: {
							width: 400,
						},
					}}
					x-reactions={field => {
						const dataSource = (field.dataSource || []).map(a => a.value || a.label)
						if (!_.isEqual(dataSourceRef.current, dataSource)) {
							/* console.log(
                'WfCustomSelect #113',
                'field.dataSource:',
                dataSource,
                'dataSourceRef.current:',
                dataSourceRef.current
              ) */
							dataSourceRef.current = dataSource
						}
					}}
					x-validator={[{ disallowEmoticon: true }, { required: true }]}
				/>
				<SchemaField.Object
					name='tags'
					title='颜色标签'
					x-decorator='FormItem'
					x-component='WfCustomSelect'
					x-component-props={{
						style: {
							width: 400,
						},
					}}
					x-reactions={field => {
						const dataSource = (field.dataSource || []).map(a => a.value || a.label)
						if (!_.isEqual(dataSourceRef.current, dataSource)) {
							dataSourceRef.current = dataSource
						}
					}}
					x-validator={[{ disallowEmoticon: true }, { required: true }]}
				/>
				<SchemaField.Object
					name='crmTags'
					title='颜色标签（CRM)'
					x-decorator='FormItem'
					x-component='WfCustomSelect'
					x-component-props={{
						style: {
							width: 400,
						},
						mode: 'CRM',
						referenceId: '19990100323000022041900013061',
					}}
					x-reactions={field => {
						const dataSource = (field.dataSource || []).map(a => a.value || a.label)
						if (!_.isEqual(dataSourceRef.current, dataSource)) {
							console.log(
								'WfCustomSelect #166',
								'field.dataSource:',
								dataSource,
								'dataSourceRef.current:',
								dataSourceRef.current,
							)
							dataSourceRef.current = dataSource
						}
					}}
				/>
				<SchemaField.Object
					name='customSelectPretty'
					title='自定义选择框（美化）'
					x-decorator='FormItem'
					x-component='WfCustomSelect'
					x-pattern={'readPretty'}
					default={[
						{ name: '张三', color: '#fa541c', code: '01' },
						{ name: '赵六', color: '#2f54eb', code: '04' },
					]}
					enum={[
						{ name: '张三', color: '#fa541c' },
						{ name: '李四', color: '#fa541c' },
						{ name: '王五', color: '#fa8c16' },
						{ name: '赵六', color: '#2f54eb' },
					]}
					x-component-props={{
						style: {
							width: 400,
						},
					}}
				/>
				<SchemaField.Object
					name='customSelectReadonly'
					title='自定义选择框（只读）'
					x-decorator='FormItem'
					x-component='WfCustomSelect'
					x-pattern={'readOnly'}
					default={[
						{ name: '李四', color: '#fa541c', code: '02' },
						{ name: '王五', color: '#fa8c16', code: '03' },
					]}
					enum={[
						{ name: '张三', color: '#fa541c', code: '01' },
						{ name: '李四', color: '#fa541c', code: '02' },
						{ name: '王五', color: '#fa8c16', code: '03' },
						{ name: '赵六', color: '#2f54eb', code: '04' },
					]}
					x-component-props={{
						style: {
							width: 400,
						},
					}}
				/>
			</SchemaField>
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit onSubmit={submitHandler}>提交</Submit>
				<Button onClick={resetHandler}>重置</Button>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## Markup Schema 同步数据源案例 II

示例：

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit, WfCustomSelect } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
		WfCustomSelect,
	},
})

const form = createForm()

const submitHandler = val => {
	console.log('自定义选择框：', val)
}

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Object
					name='customSelect'
					title='自定义选择框'
					x-decorator='FormItem'
					x-component='WfCustomSelect'
					default={[
						{ name: '李四', color: '#fa541c', code: '02' },
						{ name: '王五', color: '#fa8c16', code: '03' },
					]}
					enum={[
						{ name: '张三', color: '#fa541c', code: '01' },
						{ name: '李四', color: '#fa541c', code: '02' },
						{ name: '王五', color: '#fa8c16', code: '03' },
						{ name: '赵六', color: '#2f54eb', code: '04' },
					]}
					x-component-props={{
						style: {
							width: 400,
						},
						noDeleteOption: true,
						noConfirm: true,
						noAddition: true,
					}}
				/>
			</SchemaField>
			<SchemaField>
				<SchemaField.Object
					name='prettySelect'
					title='自定义选择框（美化）'
					x-decorator='FormItem'
					x-component='WfCustomSelect'
					x-pattern='readPretty'
					default={[
						{ name: '李四', color: '#fa541c', code: '02' },
						{ name: '王五', color: '#fa8c16', code: '03' },
					]}
					enum={
						[
							{ name: '张三', color: '#fa541c', code: '01' },
							{ name: '李四', color: '#fa541c', code: '02' },
							{ name: '王五', color: '#fa8c16', code: '03' },
							{ name: '赵六', color: '#2f54eb', code: '04' },
						] /* .map((value) => ({
            value,
            label: value,
          })) */
					}
					x-component-props={{
						style: {
							width: 400,
						},
						noPrettyEdit: true,
					}}
				/>
			</SchemaField>
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit onSubmit={submitHandler}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## Markup Schema 异步搜索案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm, onFieldReact, onFieldInit, FormPathPattern, Field } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action, observable } from '@formily/reactive'
import XTConfigProvider from 'antd/es/config-provider'

let timeout

function fetchData(value, callback) {
	if (timeout) {
		clearTimeout(timeout)
		timeout = null
	}
	function fake() {
		new Promise(r => {
			setTimeout(
				r.bind(this, {
					result: [['小青菜'], ['胡萝卜'], ['白萝卜'], ['鲫鱼'], ['青鱼'], ['肥牛卷'], ['羊肉卷']],
				}),
				500,
			)
		}).then(d => {
			const { result } = d
			const data = []
			result.forEach(r => {
				data.push({
					value: r[0],
					text: r[0],
				})
			})
			callback(data)
		})
	}

	timeout = setTimeout(fake, 300)
}

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
	},
})

const useAsyncDataSource = (
	pattern: FormPathPattern,
	service: (field: Field) => Promise<{ label: string; value: any }[]>,
) => {
	const keyword = observable.ref('')

	onFieldInit(pattern, field => {
		field.setComponentProps({
			onSearch: value => {
				keyword.value = value
			},
		})
	})

	onFieldReact(pattern, field => {
		field.loading = true
		service({ field, keyword: keyword.value }).then(
			action.bound(data => {
				field.dataSource = data
				field.loading = false
			}),
		)
	})
}

const form = createForm({
	effects: () => {
		useAsyncDataSource('select', async ({ keyword }) => {
			if (!keyword) {
				return []
			}
			return new Promise(resolve => {
				fetchData(keyword, resolve)
			})
		})
	},
})

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.String
					name='select'
					title='异步搜索选择框'
					x-decorator='FormItem'
					x-component='Select'
					x-component-props={{
						showSearch: true,
						style: {
							width: 400,
						},
					}}
				/>
			</SchemaField>
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## Markup Schema 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit, WfCustomSelect } from '@formily/antd-dumi'
import { createForm, onFieldReact, FormPathPattern, Field } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
		WfCustomSelect,
	},
})

const useAsyncDataSource = (
	pattern: FormPathPattern,
	service: (field: Field) => Promise<{ label: string; value: any }[]>,
) => {
	onFieldReact(pattern, field => {
		field.loading = true
		service(field).then(
			action.bound(data => {
				field.dataSource = data
				field.loading = false
			}),
		)
	})
}

const form = createForm({
	effects: () => {
		useAsyncDataSource('select', async field => {
			const linkage = field.query('.linkage').get('value')
			const names = Array.prototype.slice
				.call(linkage)
				.map(el => {
					let elParsed = undefined
					try {
						elParsed = JSON.parse(el)
					} catch (e) {}
					return elParsed?.name
				})
				.filter(a => a)
			// console.log('异步联动数据源案例 #517 names:', names)
			if (!names?.[0]) return []
			const name = _.trim(names.join(', '))
			return new Promise(resolve => {
				setTimeout(() => {
					if (name.includes('张三')) {
						resolve([
							{
								label: 'AAA',
								value: 'aaa',
							},
							{
								label: 'BBB',
								value: 'ccc',
							},
						])
					} else if (name.includes('李四')) {
						resolve([
							{
								label: 'CCC',
								value: 'ccc',
							},
							{
								label: 'DDD',
								value: 'ddd',
							},
						])
					} else {
						resolve([])
					}
				}, 500)
			})
		})
	},
})

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Object
					name='linkage'
					title='自定义选择框'
					x-decorator='FormItem'
					x-component='WfCustomSelect'
					enum={[
						{ name: '张三', color: '#fa541c', code: '01' },
						{ name: '李四', color: '#fa541c', code: '02' },
						{ name: '王五', color: '#fa8c16', code: '03' },
						{ name: '赵六', color: '#2f54eb', code: '04' },
					].map(value => ({
						value,
						label: value,
					}))}
					x-component-props={{
						style: {
							width: 400,
						},
					}}
				/>
				<SchemaField.String
					name='select'
					title='异步选择框'
					x-decorator='FormItem'
					x-component='Select'
					x-component-props={{
						style: {
							width: 120,
						},
					}}
				/>
			</SchemaField>
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## JSON Schema 同步数据源案例

```tsx
import React from 'react'
import { FormItem, FormButtonGroup, Submit, WfCustomSelect } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		WfCustomSelect,
	},
})

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		customSelect: {
			type: 'object',
			title: '自定义选择框',
			'x-decorator': 'FormItem',
			'x-component': 'WfCustomSelect',
			default: [
				{ name: '李四', color: '#fa541c', code: '02' },
				{ name: '王五', color: '#fa8c16', code: '03' },
			],
			enum: [
				{ name: '张三', color: '#fa541c', code: '01' },
				{ name: '李四', color: '#fa541c', code: '02' },
				{ name: '王五', color: '#fa8c16', code: '03' },
				{ name: '赵六', color: '#2f54eb', code: '04' },
			].map(value => ({
				value,
				label: value,
			})),
			'x-component-props': {
				style: {
					width: 400,
				},
			},
		},
	},
}

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField schema={schema} />
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## JSON Schema 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
	},
})

const loadData = async field => {
	const linkage = field.query('linkage').get('value')
	if (!linkage) return []
	return new Promise(resolve => {
		setTimeout(() => {
			if (linkage === 1) {
				resolve([
					{
						label: 'AAA',
						value: 'aaa',
					},
					{
						label: 'BBB',
						value: 'ccc',
					},
				])
			} else if (linkage === 2) {
				resolve([
					{
						label: 'CCC',
						value: 'ccc',
					},
					{
						label: 'DDD',
						value: 'ddd',
					},
				])
			}
		}, 1500)
	})
}

const useAsyncDataSource = service => field => {
	field.loading = true
	service(field).then(
		action.bound(data => {
			field.dataSource = data
			field.loading = false
		}),
	)
}

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		linkage: {
			type: 'string',
			title: '联动选择框',
			enum: [
				{ label: '发请求1', value: 1 },
				{ label: '发请求2', value: 2 },
			],
			'x-decorator': 'FormItem',
			'x-component': 'Select',
			'x-component-props': {
				style: {
					width: 120,
				},
			},
		},
		select: {
			type: 'string',
			title: '异步选择框',
			'x-decorator': 'FormItem',
			'x-component': 'Select',
			'x-component-props': {
				style: {
					width: 120,
				},
			},
			'x-reactions': ['{{useAsyncDataSource(loadData)}}'],
		},
	},
}

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField schema={schema} scope={{ useAsyncDataSource, loadData }} />
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## 纯 JSX 同步数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<Field
				name='select'
				title='选择框'
				dataSource={[
					{ label: '选项1', value: 1 },
					{ label: '选项2', value: 2 },
				]}
				decorator={[FormItem]}
				component={[
					Select,
					{
						style: {
							width: 120,
						},
					},
				]}
			/>
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## 纯 JSX 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm, onFieldReact, FormPathPattern, Field as FieldType } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { action } from '@formily/reactive'
import XTConfigProvider from 'antd/es/config-provider'

const useAsyncDataSource = (
	pattern: FormPathPattern,
	service: (field: FieldType) => Promise<{ label: string; value: any }[]>,
) => {
	onFieldReact(pattern, field => {
		field.loading = true
		service(field).then(
			action.bound(data => {
				field.dataSource = data
				field.loading = false
			}),
		)
	})
}

const form = createForm({
	effects: () => {
		useAsyncDataSource('select', async field => {
			const linkage = field.query('linkage').get('value')
			if (!linkage) return []
			return new Promise(resolve => {
				setTimeout(() => {
					if (linkage === 1) {
						resolve([
							{
								label: 'AAA',
								value: 'aaa',
							},
							{
								label: 'BBB',
								value: 'ccc',
							},
						])
					} else if (linkage === 2) {
						resolve([
							{
								label: 'CCC',
								value: 'ccc',
							},
							{
								label: 'DDD',
								value: 'ddd',
							},
						])
					}
				}, 1500)
			})
		})
	},
})

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<Field
				name='linkage'
				title='联动选择框'
				dataSource={[
					{ label: '发请求1', value: 1 },
					{ label: '发请求2', value: 2 },
				]}
				decorator={[FormItem]}
				component={[
					Select,
					{
						style: {
							width: 120,
						},
					},
				]}
			/>
			<Field
				name='select'
				title='异步选择框'
				decorator={[FormItem]}
				component={[
					Select,
					{
						style: {
							width: 120,
						},
					},
				]}
			/>
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## API

参考 https://ant.design/components/select-cn/
