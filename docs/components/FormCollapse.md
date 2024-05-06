---
toc: content
group: layout
---

# FormCollapse

> 折叠面板，通常用在布局空间要求较高的表单场景
>
> 注意：只能用在 Schema 场景

## Markup Schema 案例

```tsx
import React from 'react'
import { FormCollapse, FormLayout, FormItem, Input, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import Button from 'antd/es/button'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		FormCollapse,
		Input,
	},
})

const form = createForm()
const formCollapse = FormCollapse.createFormCollapse()
export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<FormLayout labelCol={6} wrapperCol={10}>
					<SchemaField>
						<SchemaField.Void
							title='折叠面板'
							x-decorator='FormItem'
							x-component='FormCollapse'
							x-component-props={{
								formCollapse,
							}}>
							<SchemaField.Void
								name='panel1'
								x-component='FormCollapse.CollapsePanel'
								x-component-props={{ header: 'A1' }}>
								<SchemaField.String name='aaa' title='AAA' x-decorator='FormItem' required x-component='Input' />
							</SchemaField.Void>
							<SchemaField.Void
								name='panel2'
								x-component='FormCollapse.CollapsePanel'
								x-component-props={{ header: 'A2' }}>
								<SchemaField.String name='bbb' title='BBB' x-decorator='FormItem' required x-component='Input' />
							</SchemaField.Void>
							<SchemaField.Void
								name='panel3'
								x-component='FormCollapse.CollapsePanel'
								x-component-props={{ header: 'A3' }}>
								<SchemaField.String name='ccc' title='CCC' x-decorator='FormItem' required x-component='Input' />
							</SchemaField.Void>
						</SchemaField.Void>
					</SchemaField>
					<FormButtonGroup.FormItem>
						<Button
							onClick={() => {
								form.query('panel3').take(field => {
									field.visible = !field.visible
								})
							}}>
							显示/隐藏最后一个Tab
						</Button>
						<Button
							onClick={() => {
								formCollapse.toggleActiveKey('panel2')
							}}>
							切换第二个Tab
						</Button>
						<Submit onSubmit={console.log}>提交</Submit>
					</FormButtonGroup.FormItem>
				</FormLayout>
			</FormProvider>
		</XTConfigProvider>
	)
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import { FormCollapse, FormItem, FormLayout, Input, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import Button from 'antd/es/button'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		FormCollapse,
		Input,
	},
})

const form = createForm()
const formCollapse = FormCollapse.createFormCollapse()
const schema = {
	type: 'object',
	properties: {
		collapse: {
			type: 'void',
			title: '折叠面板',
			'x-decorator': 'FormItem',
			'x-component': 'FormCollapse',
			'x-component-props': {
				formCollapse: '{{formCollapse}}',
			},
			properties: {
				panel1: {
					type: 'void',
					'x-component': 'FormCollapse.CollapsePanel',
					'x-component-props': {
						header: 'A1',
					},
					properties: {
						aaa: {
							type: 'string',
							title: 'AAA',
							'x-decorator': 'FormItem',
							required: true,
							'x-component': 'Input',
						},
					},
				},
				panel2: {
					type: 'void',
					'x-component': 'FormCollapse.CollapsePanel',
					'x-component-props': {
						header: 'A2',
					},
					properties: {
						bbb: {
							type: 'string',
							title: 'BBB',
							'x-decorator': 'FormItem',
							required: true,
							'x-component': 'Input',
						},
					},
				},
				panel3: {
					type: 'void',
					'x-component': 'FormCollapse.CollapsePanel',
					'x-component-props': {
						header: 'A3',
					},
					properties: {
						ccc: {
							type: 'string',
							title: 'CCC',
							'x-decorator': 'FormItem',
							required: true,
							'x-component': 'Input',
						},
					},
				},
			},
		},
	},
}

export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<FormLayout labelCol={6} wrapperCol={10}>
					<SchemaField schema={schema} scope={{ formCollapse }} />
					<FormButtonGroup.FormItem>
						<Button
							onClick={() => {
								form.query('panel3').take(field => {
									field.visible = !field.visible
								})
							}}>
							显示/隐藏最后一个Tab
						</Button>
						<Button
							onClick={() => {
								formCollapse.toggleActiveKey('panel2')
							}}>
							切换第二个Tab
						</Button>
						<Submit onSubmit={console.log}>提交</Submit>
					</FormButtonGroup.FormItem>
				</FormLayout>
			</FormProvider>
		</XTConfigProvider>
	)
}
```

## JSON Schema 案例 II

```tsx
import React from 'react'
import {
	ArrayCards,
	FormCollapse,
	FormItem,
	FormLayout,
	Input,
	Submit,
	FormGrid,
	WfTable,
	ArrayItems,
	WfCustomSelect,
	NumberPicker,
	WfSelectInput,
} from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'
import './styles/formCollapse.less'

const getTwoColumnTable = (data = []) => {
	const arr = []
	for (let i = 0; i < data.length; i += 2) {
		const leftData = data[i] || {
			name: '',
			title: '',
			value: '',
		}
		const rightData = data[i + 1] || {
			name: '',
			title: '',
			value: '',
		}
		arr.push({
			key: i / 2 + 1,
			leftLabel: leftData.label,
			leftValue: leftData.value,
			rightLabel: rightData.label,
			rightValue: rightData.value,
		})
	}
	return arr
}

const SchemaField = createSchemaField({
	components: {
		ArrayCards,
		FormItem,
		FormCollapse,
		Input,
		FormGrid,
		WfTable,
		FormLayout,
		ArrayItems,
		WfCustomSelect,
		NumberPicker,
		WfSelectInput,
	},
})

const form = createForm()

// 基本信息 Start

const basicTableColumns = [
	{
		title: '',
		dataIndex: 'leftLabel',
		className: 'header-column',
	},
	{
		title: '',
		dataIndex: 'leftValue',
	},
	{
		title: '',
		dataIndex: 'rightLabel',
		className: 'header-column',
	},
	{
		title: '',
		dataIndex: 'rightValue',
	},
]

const basicFeatInfo = [
	{
		name: 'cusNo',
		title: '客户编号 ',
		value: '- -',
	},
	{
		name: 'cusName',
		title: '客户名称',
		value: 'xtbossbi',
	},
	{
		name: 'cusNickname',
		title: '客户简称',
		value: '- -',
	},
	{
		name: 'cusLink',
		title: '客户网址',
		value: '- -',
	},
	{
		name: 'tradeCountry',
		title: '贸易国家/地区',
		value: '澳大利亚',
	},
	{
		name: 'address',
		title: '联系地址',
		value: '- -',
	},
	{
		name: 'phone',
		title: '固定电话',
		value: '- -',
	},
	{
		name: 'tax',
		title: '传真',
		value: '- -',
	},
	{
		name: 'remark',
		title: '备注',
		value: '- -',
	},
]

const basicTableData = getTwoColumnTable(basicFeatInfo)

// 基本信息 End

// 特征信息 Start

const tableColumns = [
	{
		title: '',
		dataIndex: 'leftLabel',
		className: 'header-column',
	},
	{
		title: '',
		dataIndex: 'leftValue',
	},
	{
		title: '',
		dataIndex: 'rightLabel',
		className: 'header-column',
	},
	{
		title: '',
		dataIndex: 'rightValue',
	},
]

/* const tableData = [
  {
    key: '1',
    leftLabel: '客户来源',
    leftValue: '电商平台',
    rightLabel: '客户状态',
    rightValue: '成交客户',
  },
  {
    key: '2',
    leftLabel: '客户类型',
    leftValue: '采购商',
    rightLabel: '',
    rightValue: '',
  },
] */

const featInfo = [
	{
		name: 'source',
		label: '客户来源 ',
		value: '电商平台',
	},
	{
		name: 'status',
		label: '客户状态',
		value: '成交客户',
	},
	{
		name: 'type',
		label: '客户类型',
		value: '采购商',
	},
]

const tableData = getTwoColumnTable(featInfo)

/* const mgrInfo = {
	source: {
		title: '负责人 ',
		value: '大白'
	},
	status: {
		title: '创建人',
		value: '大白'
	},
	type: {
		title: '创建时间',
		value: '2022-03-29 04:29:19'
	},
} */

// 特征信息 End

const schema = {
	type: 'object',
	properties: {
		formCollapse1: {
			type: 'void',
			'x-component': 'FormCollapse',
			'x-component-props': {
				ghost: true,
				style: {
					width: '100%',
				},
			},
			properties: {
				collapsePanel1: {
					type: 'void',
					'x-component': 'FormCollapse.CollapsePanel',
					'x-component-props': {
						header: '基本信息',
					},
					properties: {
						basicInfo: {
							type: 'object',
							'x-decorator': 'FormItem',
							'x-component': 'WfTable',
							default: basicTableData,
							'x-component-props': {
								showHeader: false,
								bordered: false,
								columns: basicTableColumns,
								size: 'small',
								pagination: false,
								style: {
									border: '1px solid #d9d9d9',
								},
							},
						},
					},
					'x-index': 0,
				},
			},
			'x-index': 0,
		},

		'2idx2ce7iej': {
			type: 'void',
			'x-component': 'FormCollapse',
			'x-component-props': {
				ghost: true,
				bordered: false,
				accordion: false,
				style: {
					width: '100%',
				},
			},
			'x-designable-id': '2idx2ce7iej',
			'x-index': 1,
			title: '',
			properties: {
				j3lzxthz0s3: {
					type: 'void',
					'x-component': 'FormCollapse.CollapsePanel',
					'x-component-props': {
						header: '联系人列表',
					},
					'x-designable-id': 'j3lzxthz0s3',
					'x-index': 0,
					properties: {
						// array item addition Start
						ldthtoi6oah: {
							type: 'array',
							'x-decorator': 'FormItem',
							'x-component': 'ArrayCards',
							'x-component-props': {
								title: '客户',
							},
							'x-validator': [],
							'x-decorator-props': {},
							'x-designable-id': 'ldthtoi6oah',
							items: {
								type: 'object',
								'x-validator': [],
								'x-designable-id': 've7r9rbiij4',
								properties: {
									oz6cn21pbeb: {
										type: 'void',
										'x-component': 'ArrayCards.Index',
										'x-designable-id': 'oz6cn21pbeb',
										'x-index': 0,
									},
									d62bw3a0i8q: {
										type: 'void',
										'x-component': 'FormGrid',
										'x-validator': [],
										'x-component-props': {},
										'x-designable-id': 'd62bw3a0i8q',
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
												'x-designable-id': 'v28lzt4onno',
												properties: {
													nngq513lx8k: {
														type: 'void',
														'x-component': 'FormLayout',
														'x-component-props': {
															labelAlign: 'left',
															wrapperAlign: null,
															layout: 'vertical',
														},
														'x-designable-id': 'nngq513lx8k',
														properties: {
															'0rxei0clu15': {
																type: 'string',
																title: 'A1',
																'x-decorator': 'FormItem',
																'x-component': 'Input',
																'x-validator': [],
																'x-component-props': {},
																'x-decorator-props': {},
																required: true,
																'x-designable-id': '0rxei0clu15',
																'x-index': 0,
															},

															// Start
															A2: {
																title: 'A2',
																'x-decorator': 'FormItem',
																'x-component': 'Input',
																'x-validator': [],
																'x-component-props': {},
																'x-decorator-props': {},
																'x-designable-id': 'A2',
																'x-index': 1,
															},
															// End

															// array3 Start
															A3: {
																type: 'array',
																'x-validator': {
																	maxItems: 3,
																	message: '添加数量不得超过3',
																},
																'x-component': 'ArrayItems',
																'x-decorator': 'FormItem',
																'x-component-props': {},
																title: '电话',
																default: [{}],
																items: {
																	type: 'object',
																	'x-decorator': 'ArrayItems.Item',
																	properties: {
																		A31: {
																			// title: 'A2',
																			'x-decorator': 'FormItem',
																			'x-decorator-props': {
																				style: {
																					width: '100%',
																					marginRight: '15px',
																				},
																			},
																			'x-component': 'Input',
																			'x-component-props': {},
																			'x-validator': [],
																			'x-designable-id': 'A3',
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
																		title: '添加电话',
																		'x-component': 'ArrayItems.Addition',
																		'x-component-props': {
																			buttonType: 'link',
																		},
																	},
																},
															},
															// array3 End
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
												'x-designable-id': '33va9xjoo59',
												properties: {
													'1584zp0q8uf': {
														type: 'void',
														'x-component': 'FormLayout',
														'x-component-props': {
															layout: 'vertical',
														},
														'x-designable-id': '1584zp0q8uf',
														properties: {
															seuorotq4cv: {
																title: 'B1',
																'x-decorator': 'FormItem',
																'x-component': 'WfCustomSelect',
																'x-validator': [],
																'x-component-props': {},
																'x-decorator-props': {},
																'x-designable-id': 'seuorotq4cv',
																'x-index': 0,
															},
															ytsa3l3umgo: {
																type: 'number',
																title: 'B2',
																'x-decorator': 'FormItem',
																'x-component': 'NumberPicker',
																'x-validator': [],
																'x-component-props': {},
																'x-decorator-props': {},
																'x-designable-id': 'ytsa3l3umgo',
																'x-index': 1,
															},
															// array4 Start
															B4: {
																type: 'array',
																'x-validator': {
																	maxItems: 3,
																	message: '添加数量不得超过3',
																},
																'x-component': 'ArrayItems',
																'x-decorator': 'FormItem',
																'x-component-props': {},
																title: '社交账号',
																default: [{}],
																items: {
																	type: 'object',
																	'x-decorator': 'ArrayItems.Item',
																	properties: {
																		B41: {
																			// title: 'A2',
																			'x-decorator': 'FormItem',
																			'x-component': 'WfSelectInput',
																			default: [
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
																					width: '100%',
																					marginRight: '15px',
																				},
																			},
																			'x-decorator-props': {},
																			'x-designable-id': 'B4',
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
																		},
																	},
																},
															},
															// array4 End
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
										title: 'Addition',
										'x-component': 'ArrayCards.Remove',
										'x-designable-id': 'vy7thjdraos',
										'x-index': 2,
									},
									'76m7zkduq5q': {
										type: 'void',
										title: 'Addition',
										'x-component': 'ArrayCards.MoveDown',
										'x-designable-id': '76m7zkduq5q',
										'x-index': 3,
									},
									o550v0yxqat: {
										type: 'void',
										title: 'Addition',
										'x-component': 'ArrayCards.MoveUp',
										'x-designable-id': 'o550v0yxqat',
										'x-index': 4,
									},
								},
							},
							'x-index': 1,
							properties: {
								b1czxpt32v5: {
									type: 'void',
									title: 'Addition',
									'x-component': 'ArrayCards.Addition',
									'x-designable-id': 'b1czxpt32v5',
									'x-index': 0,
								},
							},
						},
						// array item addition End
					},
				},
			},
		},

		formCollapse3: {
			type: 'void',
			'x-component': 'FormCollapse',
			'x-component-props': {
				ghost: true,
				style: {
					width: '100%',
				},
			},
			properties: {
				trwkuoobufp: {
					type: 'void',
					'x-component': 'FormCollapse.CollapsePanel',
					'x-component-props': {
						header: '特征信息',
					},
					properties: {
						customSelect: {
							type: 'object',
							'x-decorator': 'FormItem',
							'x-component': 'WfTable',
							default: tableData,
							'x-component-props': {
								showHeader: false,
								bordered: false,
								columns: tableColumns,
								size: 'small',
								pagination: false,
								style: {
									border: '1px solid #d9d9d9',
								},
							},
						},
					},
					'x-index': 0,
				},
			},
			'x-index': 2,
		},
	},
	'x-designable-id': 'fyrscmp003o',
}

export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<FormLayout
					labelCol={6}
					wrapperCol={14}
					style={{
						display: 'flex',
						flexWrap: 'nowrap',
						flexDirection: 'column',
						alignContent: 'space-between',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}>
					<SchemaField schema={schema} />
					<Submit onSubmit={console.log} style={{ marginTop: '15px' }}>
						提交
					</Submit>
				</FormLayout>
			</FormProvider>
		</XTConfigProvider>
	)
}
```

## API

### FormCollapse

| 属性名       | 类型          | 描述                                                       | 默认值 |
| ------------ | ------------- | ---------------------------------------------------------- | ------ |
| formCollapse | IFormCollapse | 传入通过 createFormCollapse/useFormCollapse 创建出来的模型 |        |

其余参考 https://ant.design/components/collapse-cn/

### FormCollapse.CollapsePanel

参考 https://ant.design/components/collapse-cn/

### FormCollapse.createFormCollapse

```ts pure
type ActiveKey = string | number
type ActiveKeys = string | number | Array<string | number>

interface createFormCollapse {
	(defaultActiveKeys?: ActiveKeys): IFormCollpase
}

interface IFormCollapse {
	//激活主键列表
	activeKeys: ActiveKeys
	//是否存在该激活主键
	hasActiveKey(key: ActiveKey): boolean
	//设置激活主键列表
	setActiveKeys(keys: ActiveKeys): void
	//添加激活主键
	addActiveKey(key: ActiveKey): void
	//删除激活主键
	removeActiveKey(key: ActiveKey): void
	//开关切换激活主键
	toggleActiveKey(key: ActiveKey): void
}
```
