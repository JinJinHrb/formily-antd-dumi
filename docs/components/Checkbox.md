---
toc: content
group: atom
---

# Checkbox

> 复选框

## Markup Schema 案例

```tsx
import React from 'react'
import { Checkbox, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Checkbox,
		FormItem,
	},
})

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Boolean name='single' title='是否确认' x-decorator='FormItem' x-component='Checkbox' />
				<SchemaField.String
					name='multiple'
					title='复选'
					enum={[
						{
							label: '选项1',
							value: 1,
						},
						{
							label: '选项2',
							value: 2,
						},
					]}
					x-decorator='FormItem'
					x-component='Checkbox.Group'
				/>
			</SchemaField>
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import { Checkbox, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Checkbox,
		FormItem,
	},
})

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		single: {
			type: 'boolean',
			title: '是否确认',
			'x-decorator': 'FormItem',
			'x-component': 'Checkbox',
		},
		multiple: {
			type: 'array',
			title: '复选',
			enum: [
				{
					label: '选项1',
					value: 1,
				},
				{
					label: '选项2',
					value: 2,
				},
			],
			'x-decorator': 'FormItem',
			'x-component': 'Checkbox.Group',
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

## 纯 JSX 案例

```tsx
import React from 'react'
import { Checkbox, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<Field name='single' title='是否确认' decorator={[FormItem]} component={[Checkbox]} />
			<Field
				name='multiple'
				title='复选'
				dataSource={[
					{
						label: '选项1',
						value: 1,
					},
					{
						label: '选项2',
						value: 2,
					},
				]}
				decorator={[FormItem]}
				component={[Checkbox.Group]}
			/>
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## API

参考 https://ant.design/components/checkbox-cn/
