---
toc: content
group: atom-composite
---

# ArrayCards

> 卡片列表，对于每行字段数量较多，联动较多的场景比较适合使用 ArrayCards
>
> 注意：该组件只适用于 Schema 场景

## Markup Schema 案例

```tsx
import React from 'react'
import { FormItem, Input, ArrayCards, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		Input,
		ArrayCards,
	},
})

const form = createForm()

export default () => {
	return (
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Array
					name='string_array'
					maxItems={3}
					x-decorator='FormItem'
					x-component='ArrayCards'
					x-component-props={{
						title: '字符串数组',
					}}>
					<SchemaField.Void>
						<SchemaField.Void x-component='ArrayCards.Index' />
						<SchemaField.String name='input' x-decorator='FormItem' title='Input' required x-component='Input' />
						<SchemaField.Void x-component='ArrayCards.Remove' />
						<SchemaField.Void x-component='ArrayCards.MoveUp' />
						<SchemaField.Void x-component='ArrayCards.MoveDown' />
					</SchemaField.Void>
					<SchemaField.Void x-component='ArrayCards.Addition' title='添加条目' />
				</SchemaField.Array>
				<SchemaField.Array
					name='array'
					maxItems={3}
					x-decorator='FormItem'
					x-component='ArrayCards'
					x-component-props={{
						title: '对象数组',
					}}>
					<SchemaField.Object>
						<SchemaField.Void x-component='ArrayCards.Index' />
						<SchemaField.String name='input' x-decorator='FormItem' title='Input' required x-component='Input' />
						<SchemaField.Void x-component='ArrayCards.Remove' />
						<SchemaField.Void x-component='ArrayCards.MoveUp' />
						<SchemaField.Void x-component='ArrayCards.MoveDown' />
					</SchemaField.Object>
					<SchemaField.Void x-component='ArrayCards.Addition' title='添加条目' />
				</SchemaField.Array>
			</SchemaField>
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	)
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import { FormItem, Input, ArrayCards, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		Input,
		ArrayCards,
	},
})

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		string_array: {
			type: 'array',
			'x-component': 'ArrayCards',
			maxItems: 3,
			'x-decorator': 'FormItem',
			'x-component-props': {
				title: '字符串数组',
			},
			items: {
				type: 'void',
				properties: {
					index: {
						type: 'void',
						'x-component': 'ArrayCards.Index',
					},
					input: {
						type: 'string',
						'x-decorator': 'FormItem',
						title: 'Input',
						required: true,
						'x-component': 'Input',
					},
					remove: {
						type: 'void',
						'x-component': 'ArrayCards.Remove',
					},
					moveUp: {
						type: 'void',
						'x-component': 'ArrayCards.MoveUp',
					},
					moveDown: {
						type: 'void',
						'x-component': 'ArrayCards.MoveDown',
					},
				},
			},
			properties: {
				addition: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayCards.Addition',
				},
			},
		},
		array: {
			type: 'array',
			'x-component': 'ArrayCards',
			maxItems: 3,
			'x-decorator': 'FormItem',
			'x-component-props': {
				title: '对象数组',
			},
			items: {
				type: 'object',
				properties: {
					index: {
						type: 'void',
						'x-component': 'ArrayCards.Index',
					},
					input: {
						type: 'string',
						'x-decorator': 'FormItem',
						title: 'Input',
						required: true,
						'x-component': 'Input',
					},
					remove: {
						type: 'void',
						'x-component': 'ArrayCards.Remove',
					},
					moveUp: {
						type: 'void',
						'x-component': 'ArrayCards.MoveUp',
					},
					moveDown: {
						type: 'void',
						'x-component': 'ArrayCards.MoveDown',
					},
				},
			},
			properties: {
				addition: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayCards.Addition',
				},
			},
		},
	},
}

export default () => {
	return (
		<FormProvider form={form}>
			<SchemaField schema={schema} />
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	)
}
```

## JSON Schema 案例 II（初始化）

> 1. 扩展了参数 `isExtraAddition` 在原先自增的按钮位置添加其他功能<br>
> 2. x-validators 中增加 { minItems: 1 } 用法，少于阈值时隐藏删除按钮

```tsx
import React from 'react'
import { CopyOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import {
	ArrayCards,
	ArrayItems,
	FormCollapse,
	FormItem,
	FormLayout,
	Input,
	DatePicker,
	Select,
	FormGrid,
	NumberPicker,
	WfSelectInput,
	WfTable,
	Submit,
} from '@formily/antd-dumi'
import { createForm, onFormInit, onFieldInit, onFormSubmit, onFieldUnmount } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { toJS } from '@formily/reactive'
import XTConfigProvider from 'antd/es/config-provider'
import Button from 'antd/es/button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from 'moment'
import { isEmpty, flatten } from 'lodash-es'

// mock data Start

const dataContacts = [
	{
		birthday: '1990-05-09',
		email: 'zhangsan@qq.com',
		fax: '123-456-789',
		gender: 'male',
		name: '精卫',
		phones: ['123456789', '923456781'],
		position: 'P1',
		remark: 'RT',
		socialAccount: [
			{
				socialAcount: '123456789@qq.com',
				socialMedia: 'Facebook',
			},
		],
	},
	{
		birthday: '1997-01-22',
		email: 'zhangsan@qq.com',
		fax: '382-503-991',
		gender: 'male',
		name: '女娲',
		phones: ['382503991', '991382503'],
		position: 'P2',
		remark: '专业补天',
		socialAccount: [
			{
				socialAcount: '991382503@gmail.com',
				socialMedia: 'QQ',
			},
		],
	},
]

// mock data End

// util Start

const isContactsEmpty = data => {
	if (isEmpty(data)) {
		return true
	}
	const keys = Object.keys(data)
	for (let key of keys) {
		if (!isEmpty(data[key])) {
			return false
		}
	}
	return true
}

// toggleExpand Start

const expandAll = () => {
	const expandAllField = form.query('*.expandAll').take()
	if (!expandAllField) {
		return null
	}
	const isExpandAll = false
	const reverseIsExpandAll = 'Y'
	expandAllField.setComponentProps({
		'data-expand-all': reverseIsExpandAll,
		children: getExpandAll(!isExpandAll),
	})
	const fields = form.query('contacts.*')
	const rawAddresses = flatten(fields.map(field => field.address.entire))
	const addresses = rawAddresses.filter(address => /contacts\.\d+$/.test(address))
	addresses.forEach(address => {
		const field = form.query(address).take()
		const fieldValues = field.value
		if (!isContactsEmpty(fieldValues)) {
			field.setDisplay(isExpandAll ? 'hidden' : 'visible')
		}
	})
}

const toggleExpand = () => {
	const expandAllField = form.query('*.expandAll').take()
	const componentProps = expandAllField?.componentProps
	const isExpandAll = 'Y' === componentProps?.['data-expand-all']
	const reverseIsExpandAll = isExpandAll ? 'N' : 'Y'
	expandAllField.setComponentProps({
		'data-expand-all': reverseIsExpandAll,
		children: getExpandAll(!isExpandAll),
	})
	const fields = form.query('contacts.*')
	const rawAddresses = flatten(fields.map(field => field.address.entire))
	const addresses = rawAddresses.filter(address => /contacts\.\d+$/.test(address) && !/contacts\.0$/.test(address))
	addresses.forEach(address => {
		const field = form.query(address).take()
		const fieldValues = field.value
		if (!isContactsEmpty(fieldValues)) {
			field.setDisplay(isExpandAll ? 'hidden' : 'visible')
		}
	})
}

const getExpandAll = bool => {
	return (
		<span style={{ lineHeight: '15px' }} onClick={toggleExpand}>
			{bool ? (
				<>
					{'收起'}
					{<CaretUpOutlined size='small' />}
				</>
			) : (
				<>
					{'展示全部联系人'}
					{<CaretDownOutlined size='small' />}
				</>
			)}
		</span>
	)
}

// toggleExpand End
// util End

// init Start

const SchemaField = createSchemaField({
	components: {
		ArrayCards,
		ArrayItems,
		FormItem,
		FormCollapse,
		FormGrid,
		FormLayout,
		DatePicker,
		Input,
		Select,
		NumberPicker,
		WfSelectInput,
		WfTable,
		Button,
	},
	scope: {
		setSuffix: (field: any) => {
			const text = field.value
			// console.log('setSuffix #412', 'field.pattern:', field.pattern, 'field.editable:', field.editable)
			field.setComponentProps({
				suffix: field.editable ? null : (
					<CopyToClipboard text={text} onCopy={() => alert(text)}>
						<Button size='small' type='text' icon={<CopyOutlined />} />
					</CopyToClipboard>
				),
			})
		},
	},
})

const form = createForm({
	effects() {
		onFormInit(form => {
			form.setValuesIn('contacts', dataContacts)
		})

		onFieldInit('contacts.*', field => {
			const address = field.address?.toString()
			if (/contacts\.\d+$/.test(address) && !isContactsEmpty(field.value)) {
				field.setPattern('readPretty')
			}
		})

		onFieldUnmount('contacts.*', (field, form) => {
			const contacts = form.getValuesIn('contacts')
			if (contacts.length === 1) {
				expandAll()
			}
		})

		onFormSubmit(form => {
			console.log('onFormSubmit #371', 'values:', toJS(form?.values))

			const fields = form.query('contacts.*')
			const rawAddresses = flatten(fields.map(field => field.address.entire))
			const addresses = rawAddresses.filter(address => /contacts\.\d+$/.test(address))
			addresses.forEach(address => {
				const field = form.query(address).take()
				const fieldValues = field.value
				if (!isContactsEmpty(fieldValues)) {
					field.setPattern('readPretty')
				}
			})

			alert('OK')
		})
	},
})

// init End

const schema = {
	type: 'object',
	properties: {
		contactsWrapper1: {
			type: 'void',
			'x-component': 'FormCollapse',
			'x-component-props': {
				ghost: true,
				style: {
					width: '100%',
				},
			},
			properties: {
				contactsWrapper2: {
					type: 'void',
					'x-component': 'FormCollapse.CollapsePanel',
					'x-component-props': {
						header: '联系人列表',
						style: {
							backgroundColor: 'white',
						},
					},
					properties: {
						contactsWrapper3: {
							type: 'void',
							'x-component': 'FormCollapse.CollapsePanel',
							'x-component-props': {
								header: '客户',
							},
							'x-index': 1,
							properties: {
								contacts: {
									type: 'array',
									'x-decorator': 'FormItem',
									'x-component': 'ArrayCards',
									'x-component-props': {
										title: '客户',
									},
									default: [{}],
									'x-validator': [],
									'x-decorator-props': {},
									items: {
										type: 'object',
										'x-validator': [],
										properties: {
											oz6cn21pbeb: {
												type: 'void',
												'x-component': 'ArrayCards.Index',
												'x-index': 0,
											},
											d62bw3a0i8q: {
												type: 'void',
												'x-component': 'FormGrid',
												'x-validator': [],
												'x-component-props': {},
												properties: {
													v28lzt4onno: {
														type: 'void',
														'x-component': 'FormGrid.GridColumn',
														'x-validator': [],
														'x-component-props': {
															style: {
																margin: '0px 15px 0px 0px',
															},
														},
														properties: {
															nngq513lx8k: {
																type: 'void',
																'x-component': 'FormLayout',
																'x-component-props': {
																	labelWidth: 80,
																},
																properties: {
																	name: {
																		type: 'string',
																		title: '姓名',
																		'x-decorator': 'FormItem',
																		'x-component': 'Input',
																		'x-validator': [
																			{
																				required: true,
																				message: '必填字段',
																			},
																		],
																		'x-component-props': {
																			className: '$xtat_name',
																		},
																		'x-decorator-props': {},
																		'x-index': 0,
																		'x-reactions': '{{setSuffix}}',
																	},

																	position: {
																		title: '职位',
																		'x-decorator': 'FormItem',
																		'x-component': 'Input',
																		'x-validator': [],
																		'x-component-props': {},
																		'x-decorator-props': {},
																		'x-index': 1,
																		'x-reactions': '{{setSuffix}}',
																	},

																	email: {
																		title: '邮箱',
																		'x-decorator': 'FormItem',
																		'x-component': 'Input',
																		'x-validator': [],
																		'x-component-props': {},
																		'x-decorator-props': {},
																		'x-index': 2,
																	},

																	phones: {
																		title: '电话',
																		type: 'array',
																		default: [' '],
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
																		'x-component': 'ArrayItems',
																		'x-component-props': {},
																		'x-decorator': 'FormItem',
																		'x-decorator-props': {},
																		'x-index': 3,
																		items: {
																			type: 'void',
																			'x-decorator': 'ArrayItems.Item',
																			properties: {
																				phone: {
																					type: 'string',
																					'x-decorator': 'FormItem',
																					'x-decorator-props': {
																						style: {
																							border: 0,
																							width: '100%',
																							marginRight: '15px',
																						},
																					},
																					'x-component': 'Input',
																					'x-component-props': {
																						style: {
																							border: 0,
																						},
																					},
																					'x-validator': [],
																					'x-index': 1,
																					'x-reactions': '{{setSuffix}}',
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
																				title: '添加电话',
																				'x-component': 'ArrayItems.Addition',
																				'x-component-props': {
																					buttonType: 'link',
																					style: {
																						textAlign: 'left',
																						padding: 0,
																						position: 'relative',
																						top: -10,
																						height: 20,
																					},
																				},
																			},
																		},
																	},
																	remark: {
																		title: '备注',
																		'x-decorator': 'FormItem',
																		'x-component': 'Input.TextArea',
																		'x-validator': [],
																		'x-component-props': {},
																		'x-decorator-props': {},
																		'x-index': 4,
																	},
																},
																'x-index': 0,
															},
														},
														'x-index': 0,
													},
													'33va9xjoo59': {
														type: 'void',
														'x-component': 'FormGrid.GridColumn',
														'x-validator': [],
														'x-component-props': {
															style: {
																margin: '0px 0px 0px 15px',
															},
														},
														properties: {
															'1584zp0q8uf': {
																type: 'void',
																'x-component': 'FormLayout',
																'x-component-props': {
																	labelWidth: 80,
																},
																properties: {
																	gender: {
																		type: 'string',
																		title: '性别',
																		'x-decorator': 'FormItem',
																		'x-component': 'Select',
																		enum: [
																			{ label: '', value: '' },
																			{ label: '男', value: 'male' },
																			{ label: '女', value: 'female' },
																		],
																		'x-validator': [],
																		'x-component-props': {},
																		'x-decorator-props': {},
																		'x-index': 0,
																	},
																	birthday: {
																		type: 'string',
																		title: '生日',
																		'x-decorator': 'FormItem',
																		'x-component': 'DatePicker',
																		'x-validator': [],
																		'x-component-props': {
																			disabledDate: function (current: moment.Moment) {
																				return current && current > moment().endOf('day')
																			},
																		},
																		'x-decorator-props': {},
																		'x-index': 1,
																	},
																	fax: {
																		type: 'string',
																		title: '传真',
																		'x-decorator': 'FormItem',
																		'x-component': 'Input',
																		'x-validator': [],
																		'x-component-props': {},
																		'x-decorator-props': {},
																		'x-index': 2,
																	},
																	socialAccount: {
																		title: '社交账号',
																		type: 'array',
																		'x-validator': {
																			maxItems: 3,
																			message: '添加数量不得超过3',
																		},
																		'x-component': 'ArrayItems',
																		'x-decorator': 'FormItem',
																		'x-component-props': {},
																		default: [{}],
																		items: {
																			type: 'void',
																			'x-decorator': 'ArrayItems.Item',
																			properties: {
																				socialAccount: {
																					'x-decorator': 'FormItem',
																					'x-decorator-props': {},
																					'x-component': 'WfSelectInput',
																					'x-component-props': {
																						selectStyle: {
																							width: 150,
																						},
																						inputStyle: {
																							width: '100%',
																							marginRight: '15px',
																						},
																						selectKey: 'socialMedia',
																						inputKey: 'socialAcount',
																					},
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
																				title: '添加社交账号',
																				'x-component': 'ArrayItems.Addition',
																				'x-component-props': {
																					buttonType: 'link',
																					style: {
																						textAlign: 'left',
																						padding: 0,
																						position: 'relative',
																						top: -10,
																						height: 20,
																					},
																				},
																			},
																		},
																		'x-index': 3,
																	},
																},
																'x-index': 0,
															},
														},
														'x-index': 1,
													},
												},
												'x-index': 1,
											},
											vy7thjdraos: {
												type: 'void',
												title: 'Remove',
												'x-component': 'ArrayCards.Remove',
												'x-index': 2,
											},
											'76m7zkduq5q': {
												type: 'void',
												title: 'MoveDown',
												'x-component': 'ArrayCards.MoveDown',
												'x-index': 3,
											},
											o550v0yxqat: {
												type: 'void',
												title: 'MoveUp',
												'x-component': 'ArrayCards.MoveUp',
												'x-index': 4,
											},
											o550v0yxqau: {
												type: 'void',
												title: 'Addition',
												'x-component': 'ArrayCards.Addition',
												'x-index': 5,
											},
											edit: {
												type: 'void',
												title: 'Edit',
												'x-component': 'ArrayCards.Edit',
												'x-component-props': {
													clickFactory: ({ index, /* record, */ array }) => async (/* e */) => {
														const targetField = array.field.form.query(`contacts.${index}`).take() as ObjectField
														if (targetField.pattern === 'readPretty') {
															targetField?.setPattern('editable')
														} else {
															try {
																const feedBack = await targetField.validate()
																console.log('ArrayCards #831', 'feedBack:', feedBack)
																targetField?.setPattern('readPretty')
															} catch (e) {
																console.log('ArrayCards #844', 'e:', e)
															}
														}
													},
												},
												'x-index': 6,
											},
										},
									},
									'x-index': 1,
									properties: {
										ip96hv6a06z: {
											type: 'void',
											'x-component': 'FormGrid',
											'x-validator': [],
											'x-component-props': {},
											'x-designable-id': 'ip96hv6a06z',
											isExtraAddition: true,
											properties: {
												ime3zowigaf: {
													type: 'void',
													'x-component': 'FormGrid.GridColumn',
													'x-validator': [],
													'x-component-props': {},
													'x-designable-id': 'ime3zowigaf',
													properties: {
														expandAll: {
															type: 'void',
															'x-component': 'Button',
															'x-validator': [],
															'x-component-props': {
																children: getExpandAll(),
																'data-expand-all': 'N',
																type: 'link',
																style: {
																	height: 20,
																	padding: 0,
																	relative: 'relative',
																	top: -10,
																},
															},
															'x-reactions': {
																dependencies: ['$values'],
																fulfill: {
																	schema: {
																		'x-visible': '{{($values.contacts || []).length > 1}}',
																	},
																},
															},
															'x-index': 0,
														},
														m6670i21fnu: {
															type: 'void',
															'x-component': 'FormGrid',
															'x-validator': [],
															'x-component-props': {},
															'x-designable-id': 'm6670i21fnu',
															properties: {
																'44qxvivthcj': {
																	type: 'void',
																	'x-component': 'FormGrid.GridColumn',
																	'x-validator': [],
																	'x-component-props': {},
																	'x-designable-id': '44qxvivthcj',
																	'x-index': 1,
																	properties: {
																		b1tpd9tzf7r: {
																			type: 'void',
																			title: '添加联系人',
																			'x-component': 'ArrayCards.Addition',
																			'x-validator': [],
																			'x-component-props': {},
																			'x-designable-id': 'b1tpd9tzf7r',
																			'x-index': 0,
																		},
																	},
																},
																sxhvhdpscep: {
																	type: 'void',
																	'x-component': 'FormGrid.GridColumn',
																	'x-validator': [],
																	'x-component-props': {},
																	'x-designable-id': 'sxhvhdpscep',
																	'x-index': 2,
																	properties: {
																		submit: {
																			type: 'void',
																			'x-component': 'Button',
																			'x-validator': [],
																			'x-component-props': {
																				children: '提交',
																				style: {
																					width: '100%',
																				},
																				onClick: async () => {
																					try {
																						await form.validate()
																						form.submit()
																					} catch (e) {
																						console.log('#944', e)
																					}
																				},
																			},
																			'x-designable-id': '27nq0nviwzh',
																			'x-index': 0,
																			'x-reactions': {
																				dependencies: ['$form'],
																				fulfill: {
																					state: {
																						'component[1].loading': '{{$form.submitting}}',
																					},
																				},
																			},
																		},
																	},
																},
															},
															'x-index': 1,
														},
													},
													'x-index': 0,
												},
											},
											'x-index': 0,
										},
									},
								},
							},
						},
					},
					'x-index': 0,
				},
			},
			'x-index': 1,
		},
	},
}

export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<FormLayout labelCol={6} wrapperCol={18}>
					<SchemaField schema={schema} />
					<Submit
						onSubmit={(...args) => {
							alert('OK')
							console.log(...args)
						}}
						style={{ marginTop: '15px' }}>
						提交
					</Submit>
				</FormLayout>
			</FormProvider>
		</XTConfigProvider>
	)
}
```

## Effects 联动案例

```tsx
import React from 'react'
import { FormItem, Input, ArrayCards, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm, onFieldChange, onFieldReact } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		Input,
		ArrayCards,
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
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Array
					name='array'
					maxItems={3}
					x-component='ArrayCards'
					x-decorator='FormItem'
					x-component-props={{
						title: '对象数组',
					}}>
					<SchemaField.Object>
						<SchemaField.Void x-component='ArrayCards.Index' />
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
						<SchemaField.Void x-component='ArrayCards.Remove' />
						<SchemaField.Void x-component='ArrayCards.MoveUp' />
						<SchemaField.Void x-component='ArrayCards.MoveDown' />
					</SchemaField.Object>
					<SchemaField.Void x-component='ArrayCards.Addition' title='添加条目' />
				</SchemaField.Array>
			</SchemaField>
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	)
}
```

## JSON Schema 联动案例

```tsx
import React from 'react'
import { FormItem, Input, ArrayCards, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		Input,
		ArrayCards,
	},
})

const form = createForm()

const schema = {
	type: 'object',
	properties: {
		array: {
			type: 'array',
			'x-component': 'ArrayCards',
			maxItems: 3,
			title: '对象数组',
			items: {
				type: 'object',
				properties: {
					index: {
						type: 'void',
						'x-component': 'ArrayCards.Index',
					},
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
					remove: {
						type: 'void',
						'x-component': 'ArrayCards.Remove',
					},
					moveUp: {
						type: 'void',
						'x-component': 'ArrayCards.MoveUp',
					},
					moveDown: {
						type: 'void',
						'x-component': 'ArrayCards.MoveDown',
					},
				},
			},
			properties: {
				addition: {
					type: 'void',
					title: '添加条目',
					'x-component': 'ArrayCards.Addition',
				},
			},
		},
	},
}

export default () => {
	return (
		<FormProvider form={form}>
			<SchemaField schema={schema} />
			<FormButtonGroup>
				<Submit onSubmit={console.log}>提交</Submit>
			</FormButtonGroup>
		</FormProvider>
	)
}
```

## API

### ArrayCards

参考 https://ant.design/components/card-cn/

### ArrayCards.Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | ReactText             | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | `any`                 | 默认值   |          |

其余参考 https://ant.design/components/button-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCards.Remove

> 删除按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCards.MoveDown

> 下移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCards.MoveUp

> 上移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayCards.Index

> 索引渲染器

无属性

### ArrayCards.useIndex

> 读取当前渲染行索引的 React Hook

### ArrayCards.useRecord

> 读取当前渲染记录的 React Hook
