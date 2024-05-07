import { createForm } from '@formily/core'
import { Field, FormProvider, observer } from '@formily/react'
import { DatePicker, FormButtonGroup, FormItem, FormLayout, Input, Submit } from '@formily/antd-dumi'
import React from 'react'
import ConfigProvider from 'antd/es/config-provider'

const form = createForm()

export default observer(() => {
	return (
		<ConfigProvider>
			<FormProvider form={form}>
				<FormLayout childColumns={2}>
					<FormLayout title='基本信息'>
						<Field name='id' title='编号' decorator={[FormItem]} component={[Input]} />
						<Field name='name' title='姓名' decorator={[FormItem]} component={[Input]} />
						<Field name='company' title='公司' decorator={[FormItem]} component={[Input]} />
						<Field name='position' title='职位' decorator={[FormItem]} component={[Input]} />
						<Field name='gender' title='性别' decorator={[FormItem]} component={[Input]} />
						<Field name='phone' title='电话' decorator={[FormItem]} component={[Input]} />
					</FormLayout>
					<FormLayout title='产品'>
						<Field name='product' title='产品' decorator={[FormItem]} component={[Input]} />
						<Field name='price' title='价格' decorator={[FormItem]} component={[Input]} />
						<Field name='num' title='数量' decorator={[FormItem]} component={[Input]} />
						<Field name='way' title='物流方式' decorator={[FormItem]} component={[Input]} />
						<Field name='time' title='预计送达时间' decorator={[FormItem]} component={[DatePicker]} />
					</FormLayout>
					<FormButtonGroup align='right'>
						{/* eslint-disable-next-line no-console */}
						<Submit onSubmit={console.log}>提交</Submit>
					</FormButtonGroup>
				</FormLayout>
			</FormProvider>
		</ConfigProvider>
	)
})
