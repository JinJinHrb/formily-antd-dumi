---
toc: content
group: atom-busi
---

# WfSelectInput

> 下拉框组件

## Markup Schema 同步数据源案例

> WfSelectInput 特殊规则：
>
> - 通过配置 `areaCodeOptions` 注入国际电话区号
> - 通过配置 `selectedValues4AreaCode` 确定哪些渠道的（e.g.社交媒体）选项会触发区号
> - `selectedValues4AreaCode` 为空，则只要有 "areaCodeOptions"，即展示区号
> - `selectedValues4AreaCode` 提供数组，只有 `value[selectKey]` 在数组中出现，才展示区号
> - 通过配置 `recommendedGeoCode` | `recommendedZhName` | `recommendedAreaCode`，展示推荐选项
> - 配置 `maxLength` 限制输入框的最大长度

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit, WfSelectInput } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'
import Button from 'antd/es/button'
import geoCodeOptions from './mock/geoCodeOptions.js'

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
		WfSelectInput,
		Button,
	},
})

const form = createForm()

const submitHandler = val => {
	console.log('自定义选择框：', val)
	alert('OK')
}

const resetHandler = () => {
	form.setValuesIn('selectInput', {})
	form.setValuesIn('selectInputWithZoneCode', {})
	alert('OK')
}

const XT_SELECT_INPUT_WIDTH = 400

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Object
					name='selectInput'
					title='自定义选择框'
					x-decorator='FormItem'
					x-component='WfSelectInput'
					maxLength={20}
					default={{
						socialMedia: 'QQ',
						socialAcount: 'xt@xt.cn',
					}}
					enum={[
						{
							label: '脸书（Facebook）',
							value: 'Facebook',
						},
						{
							label: '推特（Twitter）',
							value: 'Twitter',
						},
						{
							label: '腾讯（QQ）',
							value: 'QQ',
						},
						{
							label: '微信（Wechat）',
							value: 'Wechat',
						},
						{
							label: '领英（Linkedin）',
							value: 'Linkedin',
						},
						{
							label: 'Line',
							value: 'Line',
						},
						{
							label: 'WhatsApp',
							value: 'WhatsApp',
						},
					]}
					x-component-props={{
						style: {
							width: XT_SELECT_INPUT_WIDTH,
						},
						selectKey: 'socialMedia',
						inputKey: 'socialAcount',
					}}
				/>
				<SchemaField.Object
					name='selectInputWithZoneCode'
					title='社交账号带区号'
					x-decorator='FormItem'
					x-component='WfSelectInput'
					default={{
						socialMedia: 'WhatsApp',
						socialAcount: '+33-1133880000',
					}}
					enum={[
						{
							label: '脸书（Facebook）',
							value: 'Facebook',
						},
						{
							label: '推特（Twitter）',
							value: 'Twitter',
						},
						{
							label: '腾讯（QQ）',
							value: 'QQ',
						},
						{
							label: '微信（Wechat）',
							value: 'Wechat',
						},
						{
							label: '领英（Linkedin）',
							value: 'Linkedin',
						},
						{
							label: 'Line',
							value: 'Line',
						},
						{
							label: 'WhatsApp',
							value: 'WhatsApp',
						},
					]}
					x-component-props={{
						style: {
							width: XT_SELECT_INPUT_WIDTH,
						},
						selectKey: 'socialMedia',
						inputKey: 'socialAcount',
						areaCodeOptions: geoCodeOptions,
						recommendedGeoCode: 'USA',
						selectedValues4AreaCode: 'WhatsApp',
						forbiddenRegex: '[^\\d\\*#\\-+\\/\\s]',
					}}
				/>
				<SchemaField.Object
					name='ZoneCodeRequired'
					title='社交账号带区号（必填）'
					x-decorator='FormItem'
					x-component='WfSelectInput'
					default={{
						socialMedia: 'WhatsApp',
						socialAcount: '+33-1133880000',
					}}
					enum={[
						{
							label: '脸书（Facebook）',
							value: 'Facebook',
						},
						{
							label: '推特（Twitter）',
							value: 'Twitter',
						},
						{
							label: '腾讯（QQ）',
							value: 'QQ',
						},
						{
							label: '微信（Wechat）',
							value: 'Wechat',
						},
						{
							label: '领英（Linkedin）',
							value: 'Linkedin',
						},
						{
							label: 'Line',
							value: 'Line',
						},
						{
							label: 'WhatsApp',
							value: 'WhatsApp',
						},
					]}
					x-component-props={{
						style: {
							width: XT_SELECT_INPUT_WIDTH,
						},
						selectKey: 'socialMedia',
						inputKey: 'socialAcount',
						areaCodeOptions: geoCodeOptions,
						recommendedGeoCode: 'USA',
						selectedValues4AreaCode: 'WhatsApp',
						forbiddenRegex: '[^\\d\\*#\\-+\\/\\s]',
					}}
					x-validator={[{ required: true, message: '必填' }]}
				/>
				<SchemaField.Object
					name='selectInputWithoutZoneCode'
					title='社交账号不带区号选项'
					x-decorator='FormItem'
					x-component='WfSelectInput'
					default={{
						socialMedia: 'WhatsApp',
						socialAcount: '+86-1133880000',
					}}
					enum={[
						{
							label: '脸书（Facebook）',
							value: 'Facebook',
						},
						{
							label: '推特（Twitter）',
							value: 'Twitter',
						},
						{
							label: '腾讯（QQ）',
							value: 'QQ',
						},
						{
							label: '微信（Wechat）',
							value: 'Wechat',
						},
						{
							label: '领英（Linkedin）',
							value: 'Linkedin',
						},
						{
							label: 'Line',
							value: 'Line',
						},
						{
							label: 'WhatsApp',
							value: 'WhatsApp',
						},
					]}
					x-component-props={{
						style: {
							width: XT_SELECT_INPUT_WIDTH,
						},
						selectKey: 'socialMedia',
						inputKey: 'socialAcount',
						/* areaCodeOptions: geoCodeOptions,
						recommendedAreaCode: '34',
            recommendedZhName: '中国',
						selectedValues4AreaCode: 'WhatsApp', */
					}}
				/>
				<SchemaField.Object
					name='selectInputPretty'
					title='自定义选择框（美化）'
					x-decorator='FormItem'
					x-component='WfSelectInput'
					x-pattern={'readPretty'}
					default={{
						input: 'xt@xt.cn',
						select: 'QQ',
					}}
					enum={[
						{
							label: '脸书（Facebook）',
							value: 'Facebook',
						},
						{
							label: '推特（Twitter）',
							value: 'Twitter',
						},
						{
							label: '腾讯（QQ）',
							value: 'QQ',
						},
						{
							label: '微信（Wechat）',
							value: 'Wechat',
						},
						{
							label: '领英（Linkedin）',
							value: 'Linkedin',
						},
						{
							label: 'Line',
							value: 'Line',
						},
						{
							label: 'WhatsApp',
							value: 'WhatsApp',
						},
					]}
					x-component-props={{
						style: {
							width: XT_SELECT_INPUT_WIDTH,
						},
					}}
				/>
				<SchemaField.Object
					name='selectInputReadOnly'
					title='自定义选择框（只读）'
					x-decorator='FormItem'
					x-component='WfSelectInput'
					x-pattern={'readOnly'}
					default={{
						input: 'xt@xt.cn',
						select: 'QQ',
					}}
					enum={[
						{
							label: '脸书（Facebook）',
							value: 'Facebook',
						},
						{
							label: '推特（Twitter）',
							value: 'Twitter',
						},
						{
							label: '腾讯（QQ）',
							value: 'QQ',
						},
						{
							label: '微信（Wechat）',
							value: 'Wechat',
						},
						{
							label: '领英（Linkedin）',
							value: 'Linkedin',
						},
						{
							label: 'Line',
							value: 'Line',
						},
						{
							label: 'WhatsApp',
							value: 'WhatsApp',
						},
					]}
					x-component-props={{
						style: {
							width: XT_SELECT_INPUT_WIDTH,
						},
					}}
				/>
			</SchemaField>
			<FormButtonGroup>
				<Submit onSubmit={submitHandler}>提交</Submit>
				<Button onClick={resetHandler}>重置</Button>
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

const XT_SELECT_INPUT_WIDTH = 350

export default () => (
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
						width: XT_SELECT_INPUT_WIDTH,
					},
				}}
			/>
		</SchemaField>
		<FormButtonGroup>
			<Submit onSubmit={console.log}>提交</Submit>
		</FormButtonGroup>
	</FormProvider>
)
```

## Markup Schema 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm, onFieldReact, FormPathPattern, Field } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'

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
)
```

## JSON Schema 同步数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

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
	<FormProvider form={form}>
		<SchemaField schema={schema} />
		<FormButtonGroup>
			<Submit onSubmit={console.log}>提交</Submit>
		</FormButtonGroup>
	</FormProvider>
)
```

## JSON Schema 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { action } from '@formily/reactive'

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
	<FormProvider form={form}>
		<SchemaField schema={schema} scope={{ useAsyncDataSource, loadData }} />
		<FormButtonGroup>
			<Submit onSubmit={console.log}>提交</Submit>
		</FormButtonGroup>
	</FormProvider>
)
```

## 纯 JSX 同步数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'

const form = createForm()

export default () => (
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
)
```

## 纯 JSX 异步联动数据源案例

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm, onFieldReact, FormPathPattern, Field as FieldType } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { action } from '@formily/reactive'

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
)
```

## API

参考 https://ant.design/components/select-cn/
