---
toc: content
group: atom
---

# Input/InputEditor

> 文本输入框

## Markup Schema 案例

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit, InputEditor } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { EditOutlined } from '@ant-design/icons'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Input,
		FormItem,
		InputEditor,
	},
})

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.String
					name='input'
					title='输入框'
					x-decorator='FormItem'
					x-component='Input'
					required
					x-component-props={{
						style: {
							width: 240,
						},
					}}
				/>
				<SchemaField.String
					name='inputWithSuffix'
					title='不可编辑输入框'
					x-decorator='FormItem'
					x-component='Input'
					x-pattern='readOnly'
					placeholder='保存后，系统自动生成'
					x-component-props={{
						style: {
							width: 240,
						},
						suffix: <EditOutlined size='small' />,
					}}
				/>
				<SchemaField.String
					name='sysNo'
					title='系统编号（InputEditor）'
					x-decorator='FormItem'
					required
					x-component='InputEditor'
					x-component-props={{
						style: {
							width: 240,
						},
					}}
					x-validator={[{ maxLength: 3 }]}
					default={'a13'}
					placeholder='保存后，系统自动生成'
				/>
				<SchemaField.String
					name='textarea'
					title='文本框'
					x-decorator='FormItem'
					required
					x-component='Input.TextArea'
					x-component-props={{
						style: {
							width: 400,
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

## 国际区号 案例

> Input 特殊规则：
>
> - 通过配置 `areaCodeOptions` 注入国际电话区号，非空则显示区号
> - 通过配置 `recommendedGeoCode` | `recommendedZhName` | `recommendedAreaCode`，展示推荐选项

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { EditOutlined } from '@ant-design/icons'
import XTConfigProvider from 'antd/es/config-provider'
import geoCodeOptions from './mock/geoCodeOptions.js'

const SchemaField = createSchemaField({
	components: {
		Input,
		FormItem,
	},
})

const form = createForm()

// useEffect(() => {
// 	setTimeout(() => {
// 		console.log('国际区号 #102')
// 		form.setValuesIn('inputWithAreaCode', '+86-123876543')
// 	}, 1000)
// }, [])

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.String
					name='inputWithAreaCode'
					title='输入框'
					x-decorator='FormItem'
					x-component='Input'
					required
					x-component-props={{
						style: {
							width: 240,
						},
						areaCodeOptions: geoCodeOptions,
						recommendedGeoCode: 'USA',
						forbiddenRegex: '[^\\d\\*#\\-+\\/\\s]',
					}}
				/>
				<SchemaField.String
					name='inputWithDefaultAreaCode'
					title='输入框'
					x-decorator='FormItem'
					x-component='Input'
					required
					x-component-props={{
						style: {
							width: 240,
						},
						areaCodeOptions: geoCodeOptions,
						recommendedGeoCode: 'USA',
						forbiddenRegex: '[^\\d\\*#\\-+\\/\\s]',
					}}
					default={'+1-248-33899'}
				/>
				<SchemaField.String
					name='inputWithSuffix'
					title='不可编辑输入框'
					x-decorator='FormItem'
					x-component='Input'
					x-pattern='readOnly'
					x-component-props={{
						style: {
							width: 240,
						},
						suffix: <EditOutlined size='small' />,
						areaCodeOptions: geoCodeOptions,
					}}
				/>
				<SchemaField.String
					name='textarea'
					title='文本框'
					x-decorator='FormItem'
					required
					x-component='Input.TextArea'
					x-component-props={{
						style: {
							width: 400,
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

## JSON Schema 案例

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Input,
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
			'x-component': 'Input',
			'x-component-props': {
				style: {
					width: 240,
				},
			},
		},
		textarea: {
			type: 'string',
			title: '输入框',
			'x-decorator': 'FormItem',
			'x-component': 'Input.TextArea',
			'x-component-props': {
				style: {
					width: 240,
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

## 纯 JSX 案例

```tsx
import React from 'react'
import { Input, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const form = createForm()

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<Field
				name='input'
				title='输入框'
				required
				decorator={[FormItem]}
				component={[
					Input,
					{
						style: {
							width: 240,
						},
					},
				]}
			/>
			<Field
				name='textarea'
				title='文本框'
				required
				decorator={[FormItem]}
				component={[
					Input.TextArea,
					{
						style: {
							width: 400,
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

参考 https://ant.design/components/input-cn/
