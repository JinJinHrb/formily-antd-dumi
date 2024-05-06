import React from 'react'
import { Input, FormItem, Form } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { Field, observer } from '@formily/react'
import { Message } from 'antd'
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

export default observer(() => {
	return (
		<XTConfigProvider>
			<Form
				form={form}
				title='表单示例'
				columns={3}
				action={{ inline: true, align: 'right' }}
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
			</Form>
		</XTConfigProvider>
	)
})
