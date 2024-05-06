import React from 'react'
import { Input, FormItem, FormModal } from '@formily/antd-dumi'
import { Field, observer } from '@formily/react'
import { Button, Message } from 'antd'

export default observer(() => {
	return (
		<FormModal
			trigger={<Button>打开弹窗</Button>}
			size='small'
			onSubmit={values => {
				Message.success('提交表单内容： ' + JSON.stringify(values) + '\n两秒后完成提交')
				// eslint-disable-next-line no-console
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
		</FormModal>
	)
})
