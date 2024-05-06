---
toc: content
group: layout
---

# WfTable

> 表格组件

## 紧凑型

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit, WfCustomSelect, WfTable } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
		WfCustomSelect,
		WfTable,
	},
})

const form = createForm()

const tableColumns = [
	{
		title: '客户编号',
		dataIndex: 'cusNo',
	},
	{
		title: '跟进人',
		dataIndex: 'seller',
	},
	{
		title: '固定电话',
		dataIndex: 'phone',
	},
	{
		title: '创建时间',
		dataIndex: 'createdAt',
	},
]

const tableData = [
	{
		key: '1',
		cusNo: 'C00000001',
		seller: '小张',
		phone: '800-820-8820',
		createdAt: '2022-03-29 02:44:39',
	},
]

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Object
					name='customSelect'
					default={tableData}
					x-decorator='FormItem'
					x-component='WfTable'
					x-component-props={{
						columns: tableColumns,
						size: 'small',
						pagination: false,
						style: {
							width: 600,
						},
					}}
				/>
			</SchemaField>
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit
					onSubmit={val => {
						console.log(val)
						alert('OK')
					}}>
					提交
				</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## 紧凑型 II

```tsx
import React from 'react'
import { Select, FormItem, FormButtonGroup, Submit, WfCustomSelect, WfTable } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'
import './styles/formCollapse.less'

// util Start

const getTwoColumnTable = data => {
	const arr = []
	for (let i = 0; i < data.length; i += 2) {
		const leftData = data[i] || {
			name: '',
			label: '',
			value: '',
		}
		const rightData = data[i + 1] || {
			name: '',
			label: '',
			value: '',
		}

		const leftValue = (leftData.dataSource || []).find(el => leftData.value === el?.value)?.label || leftData.value
		const rightValue = (rightData.dataSource || []).find(el => rightData.value === el?.value)?.label || rightData.value
		arr.push({
			key: i / 2 + 1,
			leftLabel: leftData.title,
			leftValue,
			rightLabel: rightData.title,
			rightValue,
		})
	}
	return arr
}

// util End

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
		WfCustomSelect,
		WfTable,
	},
})

const form = createForm()

const sharedOnCell = (__: any, index: number) => {
	if (index === 1) {
		return { colSpan: 3 }
	}
}

const sharedOnCell2 = (__: any, index: number) => {
	if (index === 1) {
		return { colSpan: 0 }
	}
}

const tableColumns = [
	{
		title: '',
		dataIndex: 'leftLabel',
		className: 'header-column',
	},
	{
		title: '',
		dataIndex: 'leftValue',
		onCell: sharedOnCell,
	},
	{
		title: '',
		dataIndex: 'rightLabel',
		className: 'header-column',
		onCell: sharedOnCell2,
	},
	{
		title: '',
		dataIndex: 'rightValue',
		onCell: sharedOnCell2,
	},
]

const featInfo = [
	{
		name: 'source',
		title: '客户来源',
		value: '电商平台',
	},
	{
		name: 'status',
		title: '客户状态',
		value: '成交客户',
	},
	{
		name: 'type',
		title: '客户类型',
		value: '采购商',
	},
]

const tableData = getTwoColumnTable(featInfo)

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Object
					name='customSelect'
					x-decorator='FormItem'
					x-component='WfTable'
					default={tableData}
					x-component-props={{
						showHeader: false,
						bordered: true,
						columns: tableColumns,
						size: 'small',
						pagination: false,
						style: {
							width: 600,
						},
					}}
				/>
			</SchemaField>
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit
					onSubmit={val => {
						console.log(val)
						alert('OK')
					}}>
					提交
				</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## 联动

```tsx
import React from 'react'
import {
	Select,
	FormItem,
	FormButtonGroup,
	Submit,
	WfCustomSelect,
	WfTable,
	WfTableRenderer,
} from '@formily/antd-dumi'
import { createForm, onFormSubmit } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { toJS } from '@formily/reactive'
import XTConfigProvider from 'antd/es/config-provider'
import './styles/formCollapse.less'

// util Start

const getTwoColumnTable = data => {
	const arr = []
	for (let i = 0; i < data.length; i += 2) {
		const leftData = data[i] || {
			name: '',
			label: '',
			value: '',
		}
		const rightData = data[i + 1] || {
			name: '',
			label: '',
			value: '',
		}

		const leftValue = (leftData.dataSource || []).find(el => leftData.value === el?.value)?.label || leftData.value
		const rightValue = (rightData.dataSource || []).find(el => rightData.value === el?.value)?.label || rightData.value
		arr.push({
			key: i / 2 + 1,
			leftLabel: leftData.title,
			leftValue,
			rightLabel: rightData.title,
			rightValue,
		})
	}
	return arr
}

/**
 * 获取 label-value 表
 */
const getTwoColumnMap = data => {
	const map = {}
	data.forEach(el => {
		const { name, label } = el
		map[label] = name
	})
	return map
}

/**
 * 表单提交后转换为 name-label-value 形式的数组
 */
const resumeTwoColumnTable = (map, data, dataKey) => {
	const rtn = []
	const array = data[dataKey]
	for (let elem of array) {
		const { leftLabel, leftValue, rightLabel, rightValue } = elem
		const leftKey = map[leftLabel]
		if (leftKey) {
			rtn.push({
				name: leftKey,
				label: leftLabel,
				value: leftValue,
			})
		}
		const rightKey = map[rightLabel]
		if (rightKey) {
			rtn.push({
				name: rightKey,
				label: rightLabel,
				value: rightValue,
			})
		}
	}
	return rtn
}

// util End

// mock data Start

const featInfo = [
	{
		name: 'source',
		title: '客户来源',
		value: '电商平台',
	},
	{
		name: 'status',
		title: '客户状态',
		value: '成交客户',
	},
	{
		name: 'type',
		title: '客户类型',
		value: 'Buyers',
		dataSource: [
			{ label: '采购商', value: 'Buyers' },
			{ label: '贸易公司', value: 'Trd' },
			{ label: '家居办公', value: 'SOHO' },
		],
	},
]

const editList = [
	'客户状态',
	{
		title: '客户类型',
		type: 'Select',
		enum: [
			{ label: '采购商', value: 'Buyers' },
			{ label: '贸易公司', value: 'Trd' },
			{ label: '家居办公', value: 'SOHO' },
		],
		style: { width: 150 },
	},
]

const sharedOnCell = (__: any, index: number) => {
	if (index === 1) {
		return { colSpan: 3 }
	}
}

const sharedOnCell2 = (__: any, index: number) => {
	if (index === 1) {
		return { colSpan: 0 }
	}
}

const tableColumns = [
	{
		title: '',
		dataIndex: 'leftLabel',
		className: 'header-column',
	},
	{
		title: '',
		dataIndex: 'leftValue',
		render: WfTableRenderer({
			fieldKey: 'tableData',
			labelKey: 'leftLabel',
			valueKey: 'leftValue',
			editList,
		}),
		onCell: sharedOnCell,
	},
	{
		title: '',
		dataIndex: 'rightLabel',
		className: 'header-column',
		onCell: sharedOnCell2,
	},
	{
		title: '',
		dataIndex: 'rightValue',
		render: WfTableRenderer({
			fieldKey: 'tableData',
			labelKey: 'rightLabel',
			valueKey: 'rightValue',
			editList,
		}),
		onCell: sharedOnCell2,
	},
]

const tableData = getTwoColumnTable(featInfo)

const featMap = getTwoColumnMap(featInfo)

// mock data End

// init Start

const SchemaField = createSchemaField({
	components: {
		Select,
		FormItem,
		WfCustomSelect,
		WfTable,
	},
})

const form = createForm({
	effects() {
		onFormSubmit(form => {
			const formValues = toJS(form?.values)
			const featInfo = resumeTwoColumnTable(featMap, formValues, 'tableData')
			console.log('onFormSubmit #405', 'featInfo:', featInfo)
			alert('OK')
		})
	},
})

console.log('WfTable #411 tableData:', tableData)

// init End

export default () => (
	<XTConfigProvider>
		<FormProvider form={form}>
			<SchemaField>
				<SchemaField.Object
					name='tableData'
					default={tableData}
					x-decorator='FormItem'
					x-component='WfTable'
					x-component-props={{
						showHeader: false,
						bordered: true,
						columns: tableColumns,
						size: 'small',
						pagination: false,
						style: {
							width: 600,
						},
					}}
					x-pattern='readPretty'
				/>
			</SchemaField>
			<FormButtonGroup style={{ marginTop: '15px' }}>
				<Submit
					onSubmit={val => {
						console.log(val)
						alert('OK')
					}}>
					提交
				</Submit>
			</FormButtonGroup>
		</FormProvider>
	</XTConfigProvider>
)
```

## API

参考 https://ant-design.gitee.io/components/table-cn/
