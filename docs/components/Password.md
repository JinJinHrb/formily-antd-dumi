---
toc: content
group: atom-busi
---

# Password

> 密码输入框

## Markup Schema 案例

```tsx
import React from 'react'
import { Password, FormItem, FormLayout, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Password,
		FormItem,
	},
})

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<FormLayout labelCol={6} wrapperCol={10}>
				<SchemaField>
					<SchemaField.String
						name='input'
						title='输入框'
						x-decorator='FormItem'
						x-component='Password'
						required
						x-component-props={{
							checkStrength: true,
						}}
					/>
				</SchemaField>
				<FormButtonGroup.FormItem>
					<Submit onSubmit={console.log}>提交</Submit>
				</FormButtonGroup.FormItem>
			</FormLayout>
		</FormProvider>
	</XTConfigProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import { Password, FormItem, FormLayout, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Password,
		FormItem,
	},
})

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		input: {
			type: 'string',
			title: '输入框',
			'x-decorator': 'FormItem',
			'x-component': 'Password',
			'x-component-props': {
				checkStrength: true,
			},
		},
	},
}

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<FormLayout labelCol={6} wrapperCol={10}>
				<SchemaField schema={schema} />
				<FormButtonGroup.FormItem>
					<Submit onSubmit={console.log}>提交</Submit>
				</FormButtonGroup.FormItem>
			</FormLayout>
		</FormProvider>
	</XTConfigProvider>
)
```

## 纯 JSX 案例

```tsx
import React from 'react'
import { Password, FormItem, FormLayout, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<FormLayout labelCol={6} wrapperCol={10}>
				<Field
					name='input'
					title='输入框'
					required
					decorator={[FormItem]}
					component={[
						Password,
						{
							checkStrength: true,
						},
					]}
				/>
				<FormButtonGroup.FormItem>
					<Submit onSubmit={console.log}>提交</Submit>
				</FormButtonGroup.FormItem>
			</FormLayout>
		</FormProvider>
	</XTConfigProvider>
)
```

## API

参考 https://ant.design/components/input-cn/
