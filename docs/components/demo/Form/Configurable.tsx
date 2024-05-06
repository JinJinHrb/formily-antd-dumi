import { createForm, Field as FieldType, onFieldReact } from '@formily/core'
import { Field, FormProvider, observer } from '@formily/react'
import { Checkbox, DatePicker, Form, FormItem, FormLayout, FormProps, Input, Radio } from '@formily/antd-dumi'
import { cloneDeep } from 'lodash-es'
import React from 'react'
import { InputNumber, Message } from 'antd'
import XTConfigProvider from 'antd/es/config-provider'

const form = createForm({
	initialValues: {
		id: '1',
		name: 'test',
		compact: 'xt',
		gender: '无',
		phone: '135',
		product: 'crm',
	},
})
const configForm = createForm<FormProps>({
	initialValues: {
		layout: 'vertical',
		columns: 2,
		fixedWidth: true,
		stretch: true,
	},
	effects() {
		onFieldReact('readPretty', field => (form.readPretty = field.value))
	},
})

export default observer(() => {
	return (
		<XTConfigProvider>
			<FormProvider form={configForm}>
				<FormLayout title='选项' layout='horizontal'>
					<Field
						name='layout'
						title='布局'
						dataSource={[
							{
								value: 'vertical',
								label: 'vertical',
							},
							{
								value: 'horizontal',
								label: 'horizontal',
							},
						]}
						decorator={[FormItem]}
						component={[Radio.Group]}
					/>
					<Field
						name='labelWidth'
						title='label宽度'
						reactions={(field: FieldType) => {
							const layoutField = configForm.query('layout').take() as FieldType
							field.value = layoutField.value === 'vertical' ? undefined : 100
							field.visible = layoutField.value === 'horizontal'
						}}
						decorator={[FormItem]}
						component={[InputNumber]}
					/>
					<Field
						name='labelAlign'
						title='label对齐'
						reactions={(field: FieldType) => {
							const layoutField = configForm.query('layout').take() as FieldType
							field.value = layoutField.value === 'vertical' ? undefined : 'right'
							field.visible = layoutField.value === 'horizontal'
						}}
						dataSource={[
							{
								value: 'left',
								label: 'left',
							},
							{
								value: 'right',
								label: 'right',
							},
						]}
						decorator={[FormItem]}
						component={[Radio.Group]}
					/>
					<Field
						name='fixedWidth'
						title='固定容器宽度'
						decorator={[
							FormItem,
							{
								tooltip: (
									<div style={{ whiteSpace: 'pre-wrap' }}>
										{`默认在只有一列时，容器宽度为 560；两列时，容器宽度为 1080；超过两列无效。
									设为true会读取ConfigProvider的layout.fixedWidth的配置
									设为对象会根据 \`columns\` 找到对应宽度`}
									</div>
								),
							},
						]}
						component={[Checkbox]}
					/>
					<Field
						name='columns'
						title='列数'
						decorator={[FormItem, { tooltip: '固定列数，等价于 minColumns={n} maxColumns={n}。' }]}
						component={[InputNumber]}
					/>
					<Field
						name='columnGap'
						title='列间距'
						decorator={[FormItem, { tooltip: '默认值为24' }]}
						component={[InputNumber]}
					/>
					<Field
						name='rowGap'
						title='行间距'
						decorator={[
							FormItem,
							{
								tooltip:
									'默认值为0，FormItem由于校验已经有 marginBottom 了，所以 rowGap 是额外的行间距，一般不需要配置',
							},
						]}
						component={[InputNumber]}
					/>
					<Field name='action.sticky' title='按钮吸底' decorator={[FormItem]} component={[Checkbox]} />
					<Field name='action.inline' title='按钮行内布局' decorator={[FormItem]} component={[Checkbox]} />
					<Field
						name='action.align'
						title='按钮位置'
						decorator={[FormItem]}
						dataSource={[
							{ value: 'left', label: 'left' },
							{ value: 'right', label: 'right' },
						]}
						component={[Radio.Group]}
					/>
					<Field
						name='stretch'
						title='拉伸内容高度'
						decorator={[
							FormItem,
							{
								tooltip: '拉伸内容高度，使得 footer 能固定到底部（容器要有足够的高度）',
							},
						]}
						component={[Checkbox]}
					/>
				</FormLayout>
			</FormProvider>
			<Form
				form={form}
				title='表单示例'
				style={{ height: 700 }}
				{...cloneDeep(configForm.values)}
				onSubmit={values => {
					Message.success('提交表单内容： ' + JSON.stringify(values) + '\n两秒后完成提交')
					console.log('提交表单', values)
					return new Promise(resolve => {
						setTimeout(() => {
							resolve(undefined)
						}, 2000)
					})
				}}>
				<Field name='id' title='编号' decorator={[FormItem]} component={[Input]} />
				<Field name='name' title='姓名' decorator={[FormItem]} component={[Input]} />
				<Field name='company' title='公司' decorator={[FormItem]} component={[Input]} />
				<Field name='position' title='职位' decorator={[FormItem]} component={[Input]} />
				<Field name='gender' title='性别' decorator={[FormItem]} component={[Input]} />
				<Field name='phone' title='电话' decorator={[FormItem]} component={[Input]} />
				<Field name='product' title='产品' decorator={[FormItem]} component={[Input]} />
				<Field name='price' title='价格' decorator={[FormItem]} component={[Input]} />
				<Field name='num' title='数量' decorator={[FormItem]} component={[Input]} />
				<Field name='way' title='物流方式' decorator={[FormItem]} component={[Input]} />
				<Field name='time' title='预计送达时间' decorator={[FormItem]} component={[DatePicker]} />
			</Form>
		</XTConfigProvider>
	)
})
