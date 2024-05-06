---
toc: content
group: atom
---

# Select/SearchSelect

> 下拉框组件

## Markup Schema 同步数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
	},
})

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Number
					name='select'
					title='选择框'
					x-decorator='FormItem'
					x-component='Select'
					enum={[
						{ label: '选项1', value: 1 },
						{ label: '选项2', value: 2 },
					]}
					x-component-props={{
						style: {
							width: 120,
						},
					}}
				/>
			</SchemaField>
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
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
import { fetch } from 'mfetch'
import XTConfigProvider from 'antd/es/config-provider'

let timeout
let currentValue

function fetchData(value, callback) {
	if (timeout) {
		clearTimeout(timeout)
		timeout = null
	}
	currentValue = value

	function fake() {
		fetch(`https://suggest.taobao.com/sug?q=${value}`, {
			method: 'jsonp',
		})
			.then(response => response.json())
			.then(d => {
				if (currentValue === value) {
					const { result } = d
					const data = []
					result.forEach(r => {
						data.push({
							value: r[0],
							text: r[0],
						})
					})
					callback(data)
				}
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
	service: (param: { keyword: string; field: Field }) => Promise<{ label: string; value: any }[]>,
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
						filterOption: false,
						style: {
							width: 300,
						},
					}}
				/>
			</SchemaField>
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## Markup Schema 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm, onFieldReact, FormPathPattern, Field } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'
import XTConfigProvider from 'antd/es/config-provider'

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
			<SchemaField>
				<SchemaField.Number
					name='linkage'
					title='联动选择框'
					x-decorator='FormItem'
					x-component='Select'
					enum={[
						{ label: '发请求1', value: 1 },
						{ label: '发请求2', value: 2 },
					]}
					x-component-props={{
						style: {
							width: 120,
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
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## JSON Schema 同步数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
	},
})

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		select: {
			type: 'string',
			title: '选择框',
			'x-decorator': 'FormItem',
			'x-component': 'Select',
			enum: [
				{ label: '选项1', value: 1 },
				{ label: '选项2', value: 2 },
			],
			'x-component-props': {
				style: {
					width: 120,
				},
			},
		},
	},
}

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField schema={schema} />
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## JSON Schema 异步联动数据源案例

> 针对 search-select，调用 field.setDataSource([]) 可以强制重新刷新下拉数据

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit, SearchSelect } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'
import XTConfigProvider from 'antd/es/config-provider'
import { useScope } from './mock/useOrderList'
import { listContacts } from './mock/useContactList'
import { useCustomerScope } from './mock/useCustomerList'
import { queryClient } from './mock/rq'
import { QueryClientProvider } from 'react-query'
import { Button } from 'antd'

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
		SearchSelect,
	},
	scope: { ...useScope(), ...useCustomerScope() },
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
const loadContacts = async field => {
	const customerValue = field.query('{customerId: customerProfileId, customerName: customerProfileName}').get('value')
	const customerId = customerValue?.customerId
	if (!customerId) return []
	return listContacts(customerId)
}

const useAsyncDataSource = service => field => {
	field.loading = true
	field.setValue(undefined)
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
		logisticsOrderTermList: {
			type: 'array',
			title: '关联订单',
			'x-decorator': 'FormItem',
			'x-decorator-props': {
				style: {
					width: 240,
				},
			},
			'x-component': 'SearchSelect',
			'x-component-props': {
				id: 'logisticsOrderTermList',
				filterOption: false,
				labelInValue: true,
				showSearch: true,
				mode: 'multiple',
				optionLabelProp: 'realName',
				fieldNames: {
					label: 'orderName',
					value: 'orderId',
				},
				infinite: true,
				queryKey: 'onSearchOrder',
				onFetchOptions: '{{ onSearchOrder }}',
				// onSelect: '{{ generateOnSelectOrder($self) }}',
				addText: '快速创建',
				addHandler: '{{ addHandler }}',
			},
		},
		'{customerId: customerProfileId, customerName: customerProfileName}': {
			type: 'string',
			title: '选择客户',
			'x-decorator': 'FormItem',
			'x-decorator-props': {
				style: {
					width: 240,
				},
			},
			'x-component': 'SearchSelect',
			'x-component-props': {
				filterOption: false,
				labelInValue: true,
				showSearch: true,
				optionLabelProp: 'customerName',
				fieldNames: {
					label: 'customerName',
					value: 'customerId',
				},
				infinite: true,
				queryKey: 'onSearchCustomer',
				onFetchOptions: '{{ onSearchCustomer }}',
				// onSelect: '{{ generateOnSelectOrder($self) }}',
				addText: '创建客户',
				addHandler: '{{ addCustomerHandler }}',
			},
		},
		contactId: {
			type: 'string',
			title: '联系人',
			'x-decorator': 'FormItem',
			'x-component': 'Select',
			'x-component-props': {
				style: {
					width: 120,
				},
			},
			'x-reactions': '{{useAsyncDataSource(loadContacts)}}',
		},
	},
}

const refetchSearchSelectOptions = () => {
	const theField = form.query('{customerId: customerProfileId, customerName: customerProfileName}').take()
	theField.setDataSource([])
}

export default () => (
	<QueryClientProvider client={queryClient}>
		<XTConfigProvider>
			<FormProvider form={form}>
				<SchemaField schema={schema} scope={{ useAsyncDataSource, loadData, loadContacts }} />
				<FormButtonGroup>
					<Submit onSubmit={console.log}>提交</Submit>
					<Button onClick={refetchSearchSelectOptions}>重新触发搜索</Button>
				</FormButtonGroup>
			</FormProvider>
		</XTConfigProvider>
	</QueryClientProvider>
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
			<FormButtonGroup>
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
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## API

参考 https://ant.design/components/select-cn/
