import { createForm } from '@formily/core'
import { Field, FormProvider, observer } from '@formily/react'
import { FormButtonGroup, FormGrid, FormItem, FormLayout, Input, Submit } from '@formily/antd-dumi'
import React from 'react'
import ConfigProvider from 'antd/es/config-provider'

const form = createForm()

export default observer(() => {
	return (
		<FormProvider form={form}>
			<ConfigProvider>
				<FormLayout columns={2}>
					<Field name='id' title='编号' decorator={[FormItem]} component={[Input]} />
					<Field name='name' title='姓名' decorator={[FormItem]} component={[Input]} />
					<Field name='company' title='公司' decorator={[FormItem]} component={[Input]} />
					<Field name='position' title='职位' decorator={[FormItem]} component={[Input]} />
					<Field name='gender' title='性别' decorator={[FormItem]} component={[Input]} />
					<Field name='phone' title='电话' decorator={[FormItem]} component={[Input]} />
					<FormGrid.GridColumn gridSpan={2}>
						<FormButtonGroup align='right'>
							{/* eslint-disable-next-line no-console */}
							<Submit onSubmit={console.log}>提交</Submit>
						</FormButtonGroup>
					</FormGrid.GridColumn>
				</FormLayout>
			</ConfigProvider>
		</FormProvider>
	)
})
