---
toc: content
group: atom-busi
---

# AmountCurrency

> 金额输入框

新增属性：

| Property        | Type                                    | Default       | Description                                                                                                                                                                                                                                                       |
| --------------- | --------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `thousandth`    | boolean \| string \| undefined          | undefined     | "," 或 true 显示千分位                                                                                                                                                                                                                                            |
| ~~`currency`~~  | ~~string \| undefined~~                 | ~~undefined~~ | ~~货币单位的英文缩写，如果有了货币精度以货币对应精度为准，precision 不起作用；小数位不足会自动补零~~                                                                                                                                                              |
| `precision`     | number \| undefined                     | undefined     | 千分位 或 formatType 不生效时才有用；固定小数位；小数位不足会自动补零位                                                                                                                                                                                           |
| `decimalPlaces` | number \| undefined                     | undefined     | 千分位 或 formatType 不生效时才有用；最大小数位，超出简单截断，小数位不足不补零，仅当 currency 及 precision 不存在时有效                                                                                                                                          |
| `roundUp`       | boolean \| undefined                    | undefined     | 设置 true 则四舍五入，否则截断多余小数位                                                                                                                                                                                                                          |
| `ceilUp`        | boolean \| undefined                    | undefined     | 设置 true 向上，优先级低于 `roundUp`取                                                                                                                                                                                                                            |
| `formatType`    | 枚举 ThousandthFormatTypes \| undefined | undefined     | 设置有效枚举值则覆盖 precision, decimalPlaces, min & max <br />具体规则参考 [数字精度统一&文本字符上限统一](https://alidocs.dingtalk.com/i/nodes/QOG9lyrgJP3A4pyRCZE0yXpKVzN67Mw4?utm_scene=team_space&utm_source=dingdoc_doc&utm_medium=dingdoc_doc_plugin_card) |
| `stringMode`    | boolean \| undefined                    | undefined     | 设置 true 控件返回字符串格式的数字                                                                                                                                                                                                                                |

## Markup Schema 案例

```tsx
import React from 'react'
import { AmountCurrency, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { ThousandthFormatTypes } from '@formily/antd-dumi/__builtins__'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import useCurrencyOptions from './mock/useCurrencyOptions'
import { getCcyRateList } from './mock/useCurrencyRate'
import ConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		useCurrencyOptions,
		AmountCurrency,
		FormItem,
	},
})

const form = createForm({
	initialValues: {
		input: [0.00789, 'CLP'],
		cnAmount: [0.000301, 'VND'],
	},
})

export default () => (
	<ConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.String
					name='input'
					title='输入框'
					x-decorator='FormItem'
					x-component='AmountCurrency'
					required
					x-component-props={{
						style: {
							width: 240,
						},
						useCurrencyOptions,
						getCcyRateList,
					}}
				/>
				<SchemaField.String
					name='cnAmount'
					title='千分位输入框'
					x-decorator='FormItem'
					x-component='AmountCurrency'
					required
					x-component-props={{
						decimalPlaces: 6,
						thousandth: true,
						formatType: ThousandthFormatTypes.exchangeRate,
						style: {
							width: 240,
						},
						useCurrencyOptions,
						getCcyRateList,
					}}
				/>
				<SchemaField.String
					name='[myAmount,myCurrency]'
					title='千分位输入框（小数位自动补零）'
					x-decorator='FormItem'
					x-component='AmountCurrency'
					x-component-props={{
						precision: 6,
						thousandth: true,
						formatType: ThousandthFormatTypes.exchangeRate,
						style: {
							width: 240,
						},
						useCurrencyOptions,
						getCcyRateList,
					}}
				/>
				<SchemaField.String
					name='profit'
					title='千分位输入框（小数位自动补零）'
					x-decorator='FormItem'
					x-component='AmountCurrency'
					x-component-props={{
						precision: 6,
						thousandth: true,
						formatType: ThousandthFormatTypes.exchangeRate,
						style: {
							width: 240,
						},
						useCurrencyOptions,
						getCcyRateList,
						stringMode: true,
					}}
				/>
				<SchemaField.String
					name='salesPrice'
					title='销售参考价格'
					x-decorator='FormItem'
					x-component='AmountCurrency'
					x-component-props={{
						thousandth: true,
						formatType: ThousandthFormatTypes.unitPrice,
						style: {
							width: 240,
						},
						useCurrencyOptions,
						thousandth: true,
						stringMode: true,
					}}
				/>
			</SchemaField>
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</ConfigProvider>
)
```

## JSON Schema 案例

```tsx
import React from 'react'
import { AmountCurrency, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import useCurrencyOptions from './mock/useCurrencyOptions'
import ConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		AmountCurrency,
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
			'x-component': 'AmountCurrency',
			'x-component-props': {
				style: {
					width: 240,
				},
				useCurrencyOptions,
			},
		},
		usAmount: {
			type: 'string',
			title: '千分位输入框',
			'x-decorator': 'FormItem',
			'x-component': 'AmountCurrency',
			'x-component-props': {
				thousandth: true,
				style: {
					width: 240,
				},
				useCurrencyOptions,
			},
		},
	},
}

export default () => (
	<ConfigProvider>
		<FormProvider form={form}>
			<SchemaField schema={schema} />
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</ConfigProvider>
)
```

## 纯 JSX 案例

```tsx
import React from 'react'
import { AmountCurrency, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import useCurrencyOptions from './mock/useCurrencyOptions'
import ConfigProvider from 'antd/es/config-provider'

const form = createForm()

export default () => (
	<ConfigProvider>
		<FormProvider form={form}>
			<Field
				name='input'
				title='输入框'
				required
				decorator={[FormItem]}
				component={[
					AmountCurrency,
					{
						style: {
							width: 240,
						},
						useCurrencyOptions,
					},
				]}
			/>
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	</ConfigProvider>
)
```

## API

参考 https://ant.design/components/input-number-cn/
