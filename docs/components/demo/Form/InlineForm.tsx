import React from 'react'
import { Form, NumberPicker, FormItem, Space } from '@formily/antd-dumi'
import { FormConsumer, Field } from '@formily/react'
import { Message } from 'antd'

export default () => (
	<Form
		layout='horizontal'
		inline
		onSubmit={values => {
			Message.success('提交表单内容： ' + JSON.stringify(values) + '\n两秒后完成提交')
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(undefined)
				}, 2000)
			})
		}}>
		<Space>
			<Field
				name='price'
				title='价格'
				initialValue={5.2}
				decorator={[FormItem]}
				component={[
					NumberPicker,
					{
						placeholder: '请输入',
						style: {
							width: 100,
						},
					},
				]}
			/>
			<FormItem>×</FormItem>
			<Field
				name='count'
				title='数量'
				initialValue={100}
				decorator={[FormItem]}
				component={[
					NumberPicker,
					{
						placeholder: '请输入',
						style: {
							width: 100,
						},
					},
				]}
			/>
			<FormConsumer>{form => <FormItem>={` ${form.values.price * form.values.count} 元`}</FormItem>}</FormConsumer>
		</Space>
	</Form>
)
