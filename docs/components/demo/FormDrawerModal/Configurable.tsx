import React from 'react'
import { FormDrawer, FormItem, FormLayout, Input, Radio } from '@formily/antd-dumi'
import { useCreateForm } from '@formily/antd-dumi/__builtins__'
import { Field, observer } from '@formily/react'
import { Button, Message } from 'antd'

export default observer(() => {
	const form = useCreateForm()
	return (
		<FormDrawer
			form={form}
			{...form.values}
			onSubmit={async values => {
				Message.success('提交表单成功，2s后完成提交。可以打开控制台查看表单结果')
				console.log('表单结果:', values)
				return await new Promise(resolve => {
					setTimeout(() => {
						resolve(undefined)
					}, 2000)
				})
			}}
			trigger={<Button>打开抽屉</Button>}>
			<FormLayout title='配置'>
				<Field
					name='size'
					required
					title='size'
					decorator={[FormItem]}
					component={[Radio.Group]}
					dataSource={[
						{
							label: 'large',
							value: 'large',
						},
						{
							label: 'middle',
							value: 'middle',
						},
						{
							label: 'small',
							value: 'small',
						},
					]}
				/>
				<Field name='bbb' required title='输入框2' decorator={[FormItem]} component={[Input]} />
				<Field name='ccc' required title='输入框3' decorator={[FormItem]} component={[Input]} />
				<Field name='ddd' required title='输入框4' decorator={[FormItem]} component={[Input]} />
			</FormLayout>
			<FormLayout title='其他'>
				<Field name='bbb' required title='输入框2' decorator={[FormItem]} component={[Input]} />
				<Field name='ccc' required title='输入框3' decorator={[FormItem]} component={[Input]} />
				<Field name='ddd' required title='输入框4' decorator={[FormItem]} component={[Input]} />
			</FormLayout>
		</FormDrawer>
	)
})
