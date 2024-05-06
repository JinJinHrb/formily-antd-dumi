import React from 'react'
import { DatePicker, FormButtonGroup, FormGrid, FormItem, FormLayout, Input, Submit } from '@formily/antd-dumi'
import { FormProvider, Field, observer } from '@formily/react'
import { InputNumber } from 'antd'
import { createForm } from '@formily/core'

const form = createForm()
const configForm = createForm()
export default observer(() => {
	return (
		<>
			<p>选项</p>
			<FormProvider form={configForm}>
				<FormLayout layout='horizontal'>
					<Field
						name='columns'
						title='列数'
						dataSource={[
							{
								value: 'vertical',
								label: 'vertical',
							},
							{
								value: 'horizontal',
								label: 'horizontal',
							},
							{
								value: undefined,
								label: '未设置',
							},
						]}
						decorator={[FormItem, { tooltip: '固定列数，等价于 minColumns={n} maxColumsn={n}。' }]}
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
						decorator={[FormItem, { tooltip: '默认值为0' }]}
						component={[InputNumber]}
					/>
				</FormLayout>
			</FormProvider>
			<p>表单示例</p>
			<FormProvider form={form}>
				<FormGrid {...configForm.values}>
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
				</FormGrid>
			</FormProvider>
		</>
	)
})
