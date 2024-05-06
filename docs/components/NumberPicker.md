---
toc: content
group: atom
---

# NumberPicker

> 数字输入框

新增属性：

| Property        | Type                                    | Default   | Description                                                                                                                                                                                                                                                       |
| --------------- | --------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `thousandth`    | boolean \| string \| undefined          | undefined | "," 或 true 显示千分位                                                                                                                                                                                                                                            |
| `currency`      | string \| undefined                     | undefined | 货币单位的英文缩写，如果有了货币精度以货币对应精度为准，precision 不起作用；小数位不足会自动补零                                                                                                                                                                  |
| `precision`     | number \| undefined                     | undefined | 固定小数位；小数位不足会自动补零位                                                                                                                                                                                                                                |
| `decimalPlaces` | number \| undefined                     | undefined | 最大小数位，超出简单截断，小数位不足不补零，仅当 currency 及 precision 不存在时有效                                                                                                                                                                               |
| `roundUp`       | boolean \| undefined                    | undefined | 设置 true 则四舍五入，否则截断多余小数位                                                                                                                                                                                                                          |
| `ceilUp`        | boolean \| undefined                    | undefined | 设置 true 向上，优先级低于 `roundUp`取                                                                                                                                                                                                                            |
| `formatType`    | 枚举 ThousandthFormatTypes \| undefined | undefined | 设置有效枚举值则覆盖 precision, decimalPlaces, min & max <br />具体规则参考 [数字精度统一&文本字符上限统一](https://alidocs.dingtalk.com/i/nodes/QOG9lyrgJP3A4pyRCZE0yXpKVzN67Mw4?utm_scene=team_space&utm_source=dingdoc_doc&utm_medium=dingdoc_doc_plugin_card) |
| `stringMode`    | boolean \| undefined                    | undefined | 设置 true 控件返回字符串格式的数字                                                                                                                                                                                                                                |

## Markup Schema 案例

```tsx
import React from 'react'
import { NumberPicker, FormItem, FormButtonGroup, Submit, Select } from '@formily/antd-dumi'
import { ThousandthFormatTypes } from '@formily/antd-dumi/__builtins__'
import { createForm } from '@formily/core'
import XTConfigProvider from 'antd/es/config-provider'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
	components: {
		NumberPicker,
		FormItem,
		Select,
	},
})

const form = createForm()

const applyCurrency = (field: Field) => {
	const currency = field.value
	const settlementField = field.form.query('settlement').take()
	if (settlementField && currency) {
		settlementField.title = `结算金额（${currency}）`
		settlementField.component[1].currency = currency
	}
}

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField scope={{ applyCurrency }}>
				<SchemaField.String
					name='input'
					title='输入框'
					x-decorator='FormItem'
					x-component='NumberPicker'
					x-component-props={{
						style: {
							width: 240,
						},
						max: 1e7,
						min: 0,
					}}
				/>
				<SchemaField.String
					name='decimalAmount'
					title='千分位输入框'
					x-decorator='FormItem'
					x-component='NumberPicker'
					x-component-props={{
						thousandth: true,
						decimalPlaces: 6,
						max: 1e7,
						min: 0,
						style: {
							width: 240,
						},
					}}
				/>
				<SchemaField.String
					name='bigInput'
					title='大数输入框'
					x-decorator='FormItem'
					x-component='NumberPicker'
					x-component-props={{
						thousandth: true,
						decimalPlaces: 6,
						max: '9999999999999999.999999',
						min: 0,
						style: {
							width: 240,
						},
					}}
				/>
				<SchemaField.String
					name='usAmount'
					title='千分位输入框（小数位自动补零）'
					x-decorator='FormItem'
					x-component='NumberPicker'
					x-component-props={{
						thousandth: true,
						precision: 6,
						style: {
							width: 240,
						},
					}}
				/>
				<SchemaField.String
					name='unitPriceCny'
					title='单价（CNY）'
					x-decorator='FormItem'
					x-component='NumberPicker'
					x-component-props={{
						thousandth: true,
						formatType: ThousandthFormatTypes.unitPrice,
						currency: 'CNY',
						style: {
							width: 240,
						},
					}}
				/>
				<SchemaField.String
					name='unitPriceJpy'
					title='单价（JPY）'
					x-decorator='FormItem'
					x-component='NumberPicker'
					x-component-props={{
						thousandth: true,
						formatType: ThousandthFormatTypes.unitPrice,
						currency: 'JPY',
						style: {
							width: 240,
						},
					}}
				/>
				<SchemaField.String
					name='settlementCurrency'
					title='结算金额币种'
					x-decorator='FormItem'
					x-component='Select'
					enum={[
						{ label: '人民币（CNY）', value: 'CNY' },
						{ label: '日元（JPY）', value: 'JPY' },
					]}
					default={'CNY'}
					x-component-props={{
						style: {
							width: 240,
						},
					}}
					x-reactions='{{applyCurrency}}'
				/>
				<SchemaField.String
					name='settlement'
					title='结算金额（CNY）'
					x-decorator='FormItem'
					x-component='NumberPicker'
					x-component-props={{
						thousandth: true,
						formatType: ThousandthFormatTypes.settlementAmount,
						currency: 'CNY',
						style: {
							width: 240,
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
import { NumberPicker, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		NumberPicker,
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
			'x-component': 'NumberPicker',
			'x-component-props': {
				style: {
					width: 240,
				},
			},
		},
		usAmount: {
			type: 'string',
			title: '千分位输入框',
			'x-decorator': 'FormItem',
			'x-component': 'NumberPicker',
			'x-component-props': {
				thousandth: ',',
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
import { NumberPicker, FormItem, FormButtonGroup, Submit } from '@formily/antd-dumi'
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
					NumberPicker,
					{
						style: {
							width: 240,
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

参考 https://ant.design/components/input-number-cn/
