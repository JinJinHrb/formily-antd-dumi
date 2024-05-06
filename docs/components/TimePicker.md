---
toc: content
group: atom
---

# TimePicker

> 时间选择器

## Markup Schema 案例

```tsx
import React from 'react'
import { TimePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		TimePicker,
		FormItem,
	},
})

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.String name='time' title='时间' required x-decorator='FormItem' x-component='TimePicker' />
				<SchemaField.String
					name='[startTime,endTime]'
					title='时间范围'
					x-decorator='FormItem'
					x-component='TimePicker.RangePicker'
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
import { TimePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		TimePicker,
		FormItem,
	},
})

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		time: {
			title: '时间',
			'x-decorator': 'FormItem',
			'x-component': 'TimePicker',
			type: 'string',
		},
		'[startTime,endTime]': {
			title: '时间范围',
			'x-decorator': 'FormItem',
			'x-component': 'TimePicker.RangePicker',
			type: 'string',
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
import { TimePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<Field name='time' title='时间' decorator={[FormItem]} component={[TimePicker]} />
			<Field name='[startTime,endTime]' title='时间范围' decorator={[FormItem]} component={[TimePicker.RangePicker]} />
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## API

参考 https://ant.design/components/time-picker-cn/
