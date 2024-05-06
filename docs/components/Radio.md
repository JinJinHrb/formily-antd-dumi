---
toc: content
group: atom
---

# Radio

> 单选框

## Markup Schema 案例

```tsx
import React from 'react'
import { Radio, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Radio,
		FormItem,
	},
})

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Number
					name='radio'
					title='单选'
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
					x-component='Radio.Group'
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
import { Radio, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Radio,
		FormItem,
	},
})

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		radio: {
			type: 'number',
			title: '单选',
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
			'x-component': 'Radio.Group',
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
import { Radio, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<Field
				name='radio'
				title='单选'
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
				decorator={FormItem}
				component={Radio.Group}
			/>
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## API

参考 https://ant.design/components/radio-cn/
