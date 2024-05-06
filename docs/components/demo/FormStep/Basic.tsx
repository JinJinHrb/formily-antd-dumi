import React from 'react'
import { Input, FormItem, Form, FormStep, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { Field, FormConsumer, observer } from '@formily/react'
import { Button, Message } from 'antd'

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

const formStep = FormStep.createFormStep()

export default observer(() => {
	return (
		<>
			<Form
				form={form}
				action={{
					render: () => (
						<FormConsumer>
							{() => (
								<FormButtonGroup>
									<Button
										disabled={!formStep.allowBack}
										onClick={() => {
											formStep.back()
										}}>
										上一步
									</Button>
									<Button
										disabled={!formStep.allowNext}
										onClick={() => {
											formStep.next()
										}}>
										下一步
									</Button>
									<Submit disabled={formStep.allowNext}></Submit>
								</FormButtonGroup>
							)}
						</FormConsumer>
					),
				}}
				onSubmit={values => {
					Message.success('提交表单内容： ' + JSON.stringify(values) + '\n两秒后完成提交')
					console.log('提交表单', values)
					return new Promise(resolve => {
						setTimeout(() => {
							resolve(undefined)
						}, 2000)
					})
				}}>
				<FormStep formStep={formStep}>
					<FormStep.StepPane title='第一步'>
						<Field name='id' title='编号' decorator={[FormItem]} component={[Input]} />
						<Field name='name' title='姓名' decorator={[FormItem]} component={[Input]} />
					</FormStep.StepPane>
					<FormStep.StepPane title='第二步'>
						<Field name='company' title='公司' decorator={[FormItem]} component={[Input]} />
						<Field name='position' title='职位' decorator={[FormItem]} component={[Input]} />
					</FormStep.StepPane>
					<FormStep.StepPane title='第二步'>
						<Field name='gender' title='性别' decorator={[FormItem]} component={[Input]} />
						<Field name='phone' title='电话' decorator={[FormItem]} component={[Input]} />
						<Field name='product' title='产品' decorator={[FormItem]} component={[Input]} />
					</FormStep.StepPane>
				</FormStep>
			</Form>
		</>
	)
})
