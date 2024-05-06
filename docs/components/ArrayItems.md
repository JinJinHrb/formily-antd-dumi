---
toc: content
group: atom-composite
---

# ArrayItems

> 自增列表，对于简单的自增编辑场景比较适合，或者对于空间要求高的场景比较适合
>
> 注意：该组件只适用于 Schema 场景

## Markup Schema 案例

```tsx
import React from 'react'
import { FormItem, Input, Editable, Select, DatePicker, ArrayItems, FormButtonGroup, Submit, Space } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		DatePicker,
		Editable,
		Space,
		Input,
		Select,
		ArrayItems,
	},
})

const form = createForm()

export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<SchemaField>
					<SchemaField.Array name='string_array' title='字符串数组' x-decorator='FormItem' x-component='ArrayItems'>
						<SchemaField.Void x-component='Space'>
							<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.SortHandle' />
							<SchemaField.String x-decorator='FormItem' required name='input' x-component='Input' />
							<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.Remove' />
						</SchemaField.Void>
						<SchemaField.Void x-component='ArrayItems.Addition' title='添加条目' />
					</SchemaField.Array>
					<SchemaField.Array name='array' title='对象数组' x-decorator='FormItem' x-component='ArrayItems'>
						<SchemaField.Object>
							<SchemaField.Void x-component='Space'>
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.SortHandle' />
								<SchemaField.String
									x-decorator='FormItem'
									required
									title='日期'
									name='date'
									x-component='DatePicker.RangePicker'
									x-component-props={{
										style: {
											width: 160,
										},
									}}
								/>
								<SchemaField.String x-decorator='FormItem' required title='输入框' name='input' x-component='Input' />
								<SchemaField.String
									x-decorator='FormItem'
									required
									title='选择框'
									name='select'
									enum={[
										{ label: '选项1', value: 1 },
										{ label: '选项2', value: 2 },
									]}
									x-component='Select'
									x-component-props={{
										style: {
											width: 160,
										},
									}}
								/>
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.Remove' />
							</SchemaField.Void>
						</SchemaField.Object>
						<SchemaField.Void x-component='ArrayItems.Addition' title='添加条目' />
					</SchemaField.Array>
					<SchemaField.Array
						name='array2'
						title='对象数组'
						x-decorator='FormItem'
						x-component='ArrayItems'
						x-component-props={{ style: { width: 300 } }}>
						<SchemaField.Object x-decorator='ArrayItems.Item'>
							<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.SortHandle' />
							<SchemaField.String
								x-decorator='Editable'
								title='输入框'
								name='input'
								x-component='Input'
								x-component-props={{ bordered: false }}
							/>
							<SchemaField.Object
								name='config'
								x-component='Editable.Popover'
								required
								title='配置复杂数据'
								x-reactions={field => {
									field.title = field.value?.input || field.title
								}}>
								<SchemaField.String
									x-decorator='FormItem'
									required
									title='日期'
									name='date'
									x-component='DatePicker.RangePicker'
									x-component-props={{ style: { width: '100%' } }}
								/>
								<SchemaField.String x-decorator='FormItem' required title='输入框' name='input' x-component='Input' />
							</SchemaField.Object>
							<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.Remove' />
						</SchemaField.Object>
						<SchemaField.Void x-component='ArrayItems.Addition' title='添加条目' />
					</SchemaField.Array>
				</SchemaField>
				<FormButtonGroup>
					<Submit onSubmit={console.log}>提交</Submit>
				</FormButtonGroup>
			</FormProvider>
		</XTConfigProvider>
	)
}
```

## JSON Schema 案例

> ArrayItems - WfSelectInput 特殊规则：
>
> - 通过配置 `disableSingleItemKey` 和 `disableSingleItemValue` 找到含 item[`disableSingleItemKey`] === `disableSingleItemValue` 的记录，<br />并将这条记录置为不可编辑
> - 配置 `'x-validator': {minItems: 1, message: ...}`
> - - 保证初始时最少有一行空记录
> - - 当 `field['x-validator'].minItems` 存在且大于等于 1，仅剩一行时删除按钮为空

```tsx
import React from 'react'
import {
	FormItem,
	Editable,
	Input,
	Select,
	Radio,
	DatePicker,
	ArrayItems,
	FormButtonGroup,
	Submit,
	Space,
	WfSelectInput,
} from '@formily/antd-dumi'
import { createForm, onFormInit } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'
import geoCodeOptions from './mock/geoCodeOptions.js'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		Editable,
		DatePicker,
		Space,
		Radio,
		Input,
		Select,
		ArrayItems,
		WfSelectInput,
	},
})

const form = createForm({
	effects(form) {
		onFormInit(() => {
			// 设置数据
			form.setInitialValues({
				socialMedia: [
					{
						'215l6a559dj': {
							select: 'QQ',
							input: 'xxsss@qq.com',
							/* isSingleItemDisabled: true, */ bindStatus: 'BIND',
						},
					},
					{
						'215l6a559dj': {
							select: 'WhatsApp',
							input: '123355889921',
							areaCode: '30',
							bindStatus: 'BIND',
						},
					},
				],
			})
		})
	},
})

const schema = {
	type: 'object',
	properties: {
		string_array: {
			type: 'array',
			'x-component': 'ArrayItems',
			'x-decorator': 'FormItem',
			title: '字符串数组',
			items: {
				type: 'void',
				'x-component': 'Space',
				properties: {
					sort: {
						type: 'void',
						'x-decorator': 'FormItem',
						'x-component': 'ArrayItems.SortHandle',
					},
					input: {
						type: 'string',
						'x-decorator': 'FormItem',
						'x-component': 'Input',
					},
					remove: {
						type: 'void',
						'x-decorator': 'FormItem',
						'x-component': 'ArrayItems.Remove',
					},
				},
			},
			properties: {
				add: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayItems.Addition',
				},
			},
		},
		array: {
			type: 'array',
			'x-component': 'ArrayItems',
			'x-decorator': 'FormItem',
			title: '对象数组',
			items: {
				type: 'object',
				properties: {
					space: {
						type: 'void',
						'x-component': 'Space',
						properties: {
							sort: {
								type: 'void',
								'x-decorator': 'FormItem',
								'x-component': 'ArrayItems.SortHandle',
							},
							date: {
								type: 'string',
								title: '日期',
								'x-decorator': 'FormItem',
								'x-component': 'DatePicker.RangePicker',
								'x-component-props': {
									style: {
										width: 160,
									},
								},
							},
							input: {
								type: 'string',
								title: '输入框',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
							},
							select: {
								type: 'string',
								title: '下拉框',
								enum: [
									{ label: '选项1', value: 1 },
									{ label: '选项2', value: 2 },
								],
								'x-decorator': 'FormItem',
								'x-component': 'Select',
								'x-component-props': {
									style: {
										width: 160,
									},
								},
							},
							remove: {
								type: 'void',
								'x-decorator': 'FormItem',
								'x-component': 'ArrayItems.Remove',
							},
						},
					},
				},
			},
			properties: {
				add: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayItems.Addition',
				},
			},
		},
		array2: {
			type: 'array',
			'x-component': 'ArrayItems',
			'x-decorator': 'FormItem',
			'x-component-props': { style: { width: 300 } },
			title: '对象数组样式联动',
			items: {
				type: 'object',
				'x-decorator': 'ArrayItems.Item',
				properties: {
					sort: {
						type: 'void',
						'x-decorator': 'FormItem',
						'x-component': 'ArrayItems.SortHandle',
					},

					input: {
						type: 'string',
						title: '输入框',
						'x-decorator': 'Editable',
						'x-component': 'Input',
						'x-component-props': {
							bordered: false,
						},
					},
					config: {
						type: 'object',
						title: '配置复杂数据',
						'x-component': 'Editable.Popover',
						'x-reactions': '{{(field)=>field.title = field.value && field.value.input || field.title}}',
						properties: {
							date: {
								type: 'string',
								title: '日期',
								'x-decorator': 'FormItem',
								'x-component': 'DatePicker.RangePicker',
								'x-component-props': {
									style: {
										width: 160,
									},
								},
							},
							input: {
								type: 'string',
								title: '输入框',
								'x-decorator': 'FormItem',
								'x-component': 'Input',
							},
							select: {
								type: 'string',
								title: '下拉框',
								enum: [
									{ label: '选项1', value: 1 },
									{ label: '选项2', value: 2 },
								],
								'x-decorator': 'FormItem',
								'x-component': 'Select',
								'x-component-props': {
									style: {
										width: 160,
									},
								},
							},
						},
					},
					remove: {
						type: 'void',
						'x-decorator': 'FormItem',
						'x-component': 'ArrayItems.Remove',
					},
				},
			},
			properties: {
				add: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayItems.Addition',
					'x-component-props': {
						buttonType: 'link',
						style: { textAlign: 'center' },
					},
					'x-reactions': [
						{
							when: '{{($form.getValuesIn("array2") || []).length > 0}}',
							fulfill: {
								state: {
									'component[1].style.position': 'relative',
									'component[1].style.top': '-10px',
									'component[1].style.textAlign': 'left',
								},
							},
							otherwise: {
								state: {
									'component[1].style.position': 'inherit',
									'component[1].style.top': undefined,
									'component[1].style.textAlign': 'center',
								},
							},
						},
					],
				},
			},
		},
		// socialMedia Start
		socialMedia: {
			type: 'array',
			'x-component': 'ArrayItems',
			'x-decorator': 'FormItem',
			'x-component-props': {
				style: { width: 500 },
				disableSingleItemKey: 'bindStatus',
				disableSingleItemValue: 'BIND',
			},
			title: '社交账号',
			items: {
				type: 'object',
				'x-decorator': 'ArrayItems.Item',
				properties: {
					'215l6a559dj': {
						// title: 'A2',
						'x-decorator': 'FormItem',
						'x-component': 'WfSelectInput',
						enum: [
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
						],
						'x-validator': [],
						'x-component-props': {
							selectStyle: {
								width: 150,
							},
							inputStyle: {
								width: 300,
							},
							defaultSelect: 'Twitter',
							areaCodeOptions: geoCodeOptions,
							selectedValues4AreaCode: 'WhatsApp',
						},
						'x-decorator-props': {},
						'x-designable-id': '215l6a559dj',
						'x-index': 1,
					},
					remove: {
						type: 'void',
						'x-decorator': 'FormItem',
						'x-component': 'ArrayItems.Remove',
					},
				},
			},
			properties: {
				add: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayItems.Addition',
					'x-component-props': {
						buttonType: 'link',
					},
					'x-reactions': [
						{
							when: '{{($form.getValuesIn("socialMedia") || []).length > 0}}',
							fulfill: {
								state: {
									'component[1].style.position': 'relative',
									'component[1].style.top': '-10px',
									'component[1].style.textAlign': 'left',
								},
							},
							otherwise: {
								state: {
									'component[1].style.position': 'inherit',
									'component[1].style.top': undefined,
									'component[1].style.textAlign': 'center',
								},
							},
						},
					],
				},
			},
		},
		// socialMedia End

		// socialMedia 2 Start
		socialMedia2: {
			type: 'array',
			'x-component': 'ArrayItems',
			'x-decorator': 'FormItem',
			'x-component-props': {
				style: { width: 500 },
				disableSingleItemKey: 'bindStatus',
				disableSingleItemValue: 'BIND',
			},
			title: '社交账号2',
			items: {
				type: 'object',
				'x-decorator': 'ArrayItems.Item',
				properties: {
					'215l6a559dj': {
						// title: 'A2',
						'x-decorator': 'FormItem',
						'x-component': 'WfSelectInput',
						enum: [
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
						],
						'x-validator': [],
						'x-component-props': {
							selectStyle: {
								width: 150,
							},
							inputStyle: {
								width: 300,
							},
							defaultSelect: 'Twitter',
							areaCodeOptions: geoCodeOptions,
							selectedValues4AreaCode: 'WhatsApp',
						},
						'x-decorator-props': {},
						'x-designable-id': '215l6a559dj',
						'x-index': 1,
					},
					remove: {
						type: 'void',
						'x-decorator': 'FormItem',
						'x-component': 'ArrayItems.Remove',
					},
				},
			},
			properties: {
				add: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayItems.Addition',
					'x-component-props': {
						buttonType: 'link',
					},
					'x-reactions': [
						{
							when: '{{($form.getValuesIn("socialMedia") || []).length > 0}}',
							fulfill: {
								state: {
									'component[1].style.position': 'relative',
									'component[1].style.top': '-10px',
									'component[1].style.textAlign': 'left',
								},
							},
							otherwise: {
								state: {
									'component[1].style.position': 'inherit',
									'component[1].style.top': undefined,
									'component[1].style.textAlign': 'center',
								},
							},
						},
					],
				},
			},
		},
		// socialMedia 2 End

		// phone Start
		phoneNumbers: {
			type: 'array',
			'x-component': 'ArrayItems',
			'x-decorator': 'FormItem',
			'x-component-props': {
				style: { width: 500 },
			},
			'x-validator': [
				{
					maxItems: 3,
					message: '添加数量不得超过3',
				},
				{
					minItems: 1,
					message: '添加数量不得少于1',
				},
			],
			title: '固定电话',
			items: {
				type: 'object',
				'x-decorator': 'ArrayItems.Item',
				properties: {
					phoneNumber: {
						// title: 'A2',
						'x-decorator': 'FormItem',
						'x-component': 'Input',
						'x-validator': [],
						'x-component-props': {
							style: {
								width: 240,
							},
							areaCodeOptions: geoCodeOptions,
							recommendedGeoCode: 'ESP',
							forbiddenRegex: '[^\\d\\*#\\-+\\/\\s]',
						},
						'x-decorator-props': {},
						'x-index': 2,
					},
					remove: {
						type: 'void',
						'x-decorator': 'FormItem',
						'x-component': 'ArrayItems.Remove',
					},
				},
			},
			properties: {
				add: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayItems.Addition',
					'x-component-props': {
						buttonType: 'link',
					},
				},
			},
		},
		// phone End
	},
}

export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<SchemaField schema={schema} />
				<FormButtonGroup>
					<Submit onSubmit={console.log}>提交</Submit>
				</FormButtonGroup>
			</FormProvider>
		</XTConfigProvider>
	)
}
```

## Effects 联动案例

```tsx
import React from 'react'
import { FormItem, Input, ArrayItems, Editable, FormButtonGroup, Submit, Space } from '@formily/antd-dumi'
import { createForm, onFieldChange, onFieldReact } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Space,
		Editable,
		FormItem,
		Input,
		ArrayItems,
	},
})

const form = createForm({
	effects: () => {
		//主动联动模式
		onFieldChange('array.*.aa', ['value'], (field, form) => {
			form.setFieldState(field.query('.bb'), state => {
				state.visible = field.value != '123'
			})
		})
		//被动联动模式
		onFieldReact('array.*.dd', field => {
			field.visible = field.query('.cc').get('value') != '123'
		})
	},
})

export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<SchemaField>
					<SchemaField.Array
						name='array'
						title='对象数组'
						maxItems={3}
						x-decorator='FormItem'
						x-component='ArrayItems'
						x-component-props={{
							style: {
								width: 300,
							},
						}}>
						<SchemaField.Object x-decorator='ArrayItems.Item'>
							<SchemaField.Void x-component='Space'>
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.SortHandle' />
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.Index' />
							</SchemaField.Void>
							<SchemaField.Void x-component='Editable.Popover' title='配置数据'>
								<SchemaField.String
									name='aa'
									x-decorator='FormItem'
									title='AA'
									required
									description='AA输入123时隐藏BB'
									x-component='Input'
								/>
								<SchemaField.String name='bb' x-decorator='FormItem' title='BB' required x-component='Input' />
								<SchemaField.String
									name='cc'
									x-decorator='FormItem'
									title='CC'
									required
									description='CC输入123时隐藏DD'
									x-component='Input'
								/>
								<SchemaField.String name='dd' x-decorator='FormItem' title='DD' required x-component='Input' />
							</SchemaField.Void>
							<SchemaField.Void x-component='Space'>
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.Remove' />
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.MoveUp' />
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.MoveDown' />
							</SchemaField.Void>
						</SchemaField.Object>
						<SchemaField.Void x-component='ArrayItems.Addition' title='添加条目' />
					</SchemaField.Array>
				</SchemaField>
				<FormButtonGroup>
					<Submit onSubmit={console.log}>提交</Submit>
				</FormButtonGroup>
			</FormProvider>
		</XTConfigProvider>
	)
}
```

## Effects 联动案例 II（选择颜色）

```tsx
import React from 'react'
import { FormItem, Input, ArrayItems, Editable, FormButtonGroup, Submit, Space, Select, FormLayout } from '@formily/antd-dumi'
import {
	createForm,
	// onFieldChange,
	// onFieldReact,
	onFormValuesChange,
} from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

// const PREDEFINED_COLORS = [
//   '#fa541c',
//   '#fa8c16',
//   '#fadb14',
//   '#52c41a',
//   '#2f54eb',
//   '#eb2f96',
// ]

const form = createForm({
	effects: () => {
		//主动联动模式
		// onFieldChange('arrayII.*.aa', ['value'], (field, form) => {
		//   form.setFieldState(field.query('.bb'), (state) => {
		//     state.visible = field.value != '123'
		//   })
		// })

		onFormValuesChange(form => {
			const dataSource = (form.values?.arrayII || []).filter(a => a)
			form.getFieldState('arrayII.baseAddition', state => {
				if (dataSource.length > 0) {
					state.component = []
				} else {
					state.component = [ArrayItems.Addition]
				}
			})
		})

		//被动联动模式
		// onFieldReact('arrayII.*.dd', (field) => {
		//   field.visible = field.query('.cc').get('value') != '123'
		// })
	},
})

const SchemaField = createSchemaField({
	components: {
		ArrayItems,
		Editable,
		FormLayout,
		FormItem,
		Input,
		Select,
		Space,
	},
	scope: {
		setFormLayout: (field: any) => {
			const colorProxy = field.query('.popover.color').value()
			if (colorProxy?.value) {
				field.title = getColorLabel(colorProxy?.value)
			}
		},
	},
})

const getColorLabel = value => (
	<div style={{ width: '100%' }}>
		<span
			style={{
				backgroundColor: value,
				paddingLeft: '16.5px',
			}}>
			{' '}
		</span>
	</div>
)

const convertLabelOption = el => {
	const value = el.value
	el.label = (
		<div style={{ width: '100%' }}>
			<span
				style={{
					backgroundColor: value,
					paddingLeft: '16.5px',
				}}>
				{' '}
			</span>
			<span style={{ paddingLeft: '15px' }}>{value}</span>
		</div>
	)
	return el
}

const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }].map(convertLabelOption)

export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<SchemaField>
					<SchemaField.Array
						name='arrayII'
						title='对象数组'
						maxItems={3}
						x-decorator='FormItem'
						x-component='ArrayItems'
						x-component-props={{
							style: {
								width: 400,
							},
						}}
						default={[{ input: '初始值' }]}>
						<SchemaField.Object x-decorator='ArrayItems.Item'>
							<SchemaField.Void x-component='Space'>
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.SortHandle' />
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.Index' />
							</SchemaField.Void>
							<SchemaField.Void
								name='popover'
								x-decorator='Editable.Popover'
								x-decorator-props={{ hideTitle: true }}
								x-component='FormLayout'
								title={getColorLabel(options[1]?.['value'])}
								x-component-props={{ title: null }}
								x-reactions='{{setFormLayout}}'>
								<SchemaField.String
									name='color'
									x-decorator='FormItem'
									x-component='Select'
									x-component-props={{
										// mode: 'tags',
										// tagRender: tagRender,
										labelInValue: true,
										showArrow: true,
										defaultValue: [options[1]],
										style: { width: '100%' },
									}}
									enum={options}
								/>
							</SchemaField.Void>
							<SchemaField.String name='input' x-decorator='FormItem' x-component='Input' />
							<SchemaField.Void x-component='Space'>
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.Remove' />
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.MoveUp' />
								<SchemaField.Void x-decorator='FormItem' x-component='ArrayItems.MoveDown' />
								<SchemaField.Void
									x-decorator='FormItem'
									x-component='ArrayItems.Addition'
									x-component-props={{ style: { width: '20px', height: '20px' } }}
								/>
							</SchemaField.Void>
						</SchemaField.Object>
						<SchemaField.Void name='baseAddition' x-component='ArrayItems.Addition' title='添加条目' />
					</SchemaField.Array>
				</SchemaField>
				<FormButtonGroup>
					<Submit
						onSubmit={data => {
							alert('OK')
							console.log(data)
						}}>
						提交
					</Submit>
				</FormButtonGroup>
			</FormProvider>
		</XTConfigProvider>
	)
}
```

## JSON Schema 联动案例

```tsx
import React from 'react'
import { FormItem, Input, ArrayItems, Editable, FormButtonGroup, Submit, Space } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Space,
		Editable,
		FormItem,
		Input,
		ArrayItems,
	},
})

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		array: {
			type: 'array',
			'x-component': 'ArrayItems',
			'x-decorator': 'FormItem',
			maxItems: 3,
			title: '对象数组',
			'x-component-props': { style: { width: 300 } },
			items: {
				type: 'object',
				'x-decorator': 'ArrayItems.Item',
				properties: {
					left: {
						type: 'void',
						'x-component': 'Space',
						properties: {
							sort: {
								type: 'void',
								'x-decorator': 'FormItem',
								'x-component': 'ArrayItems.SortHandle',
							},
							index: {
								type: 'void',
								'x-decorator': 'FormItem',
								'x-component': 'ArrayItems.Index',
							},
						},
					},
					edit: {
						type: 'void',
						'x-component': 'Editable.Popover',
						title: '配置数据',
						properties: {
							aa: {
								type: 'string',
								'x-decorator': 'FormItem',
								title: 'AA',
								required: true,
								'x-component': 'Input',
								description: '输入123',
							},
							bb: {
								type: 'string',
								title: 'BB',
								required: true,
								'x-decorator': 'FormItem',
								'x-component': 'Input',
								'x-reactions': [
									{
										dependencies: ['.aa'],
										when: "{{$deps[0] != '123'}}",
										fulfill: {
											schema: {
												title: 'BB',
												'x-disabled': true,
											},
										},
										otherwise: {
											schema: {
												title: 'Changed',
												'x-disabled': false,
											},
										},
									},
								],
							},
						},
					},
					right: {
						type: 'void',
						'x-component': 'Space',
						properties: {
							remove: {
								type: 'void',
								'x-component': 'ArrayItems.Remove',
							},
							moveUp: {
								type: 'void',
								'x-component': 'ArrayItems.MoveUp',
							},
							moveDown: {
								type: 'void',
								'x-component': 'ArrayItems.MoveDown',
							},
						},
					},
				},
			},
			properties: {
				addition: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayItems.Addition',
				},
			},
		},
	},
}

export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<SchemaField schema={schema} />
				<FormButtonGroup>
					<Submit onSubmit={console.log}>提交</Submit>
				</FormButtonGroup>
			</FormProvider>
		</XTConfigProvider>
	)
}
```

## API

### ArrayItems

继承 HTMLDivElement Props

### ArrayItems.Item

> 列表区块

继承 HTMLDivElement Props

扩展属性

| 属性名 | 类型                 | 描述           | 默认值 |
| ------ | -------------------- | -------------- | ------ |
| type   | `'card' \| 'divide'` | 卡片或者分割线 |        |

### ArrayItems.SortHandle

> 拖拽手柄

参考 https://ant.design/components/icon-cn/

### ArrayItems.Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | ReactText             | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | `any`                 | 默认值   |          |

其余参考 https://ant.design/components/button-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.Remove

> 删除按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.MoveDown

> 下移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.MoveUp

> 上移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayItems.Index

> 索引渲染器

无属性

### ArrayItems.useIndex

> 读取当前渲染行索引的 React Hook

### ArrayItems.useRecord

> 读取当前渲染记录的 React Hook
