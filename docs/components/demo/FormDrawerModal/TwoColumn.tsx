import React from 'react'
import { Input, FormItem, FormDrawer, FormLayout, FormGrid } from '@formily/antd-dumi'
import { Field, observer } from '@formily/react'
import { Button } from 'antd'

export default observer(() => {
	return (
		<FormDrawer size='middle' trigger={<Button>打开抽屉</Button>}>
			{/* FormDrawer 的 size 为 middle 时，已经自动给 FormLayout 设置为双列布局 */}
			<FormLayout title='基本信息'>
				<Field name='id' title='编号' decorator={[FormItem]} component={[Input]} />
				<Field name='name' title='姓名' decorator={[FormItem]} component={[Input]} />
				<Field name='company' title='公司' decorator={[FormItem]} component={[Input]} />
				<Field name='position' title='职位' decorator={[FormItem]} component={[Input]} />
				<Field name='gender' title='性别' decorator={[FormItem]} component={[Input]} />
				<Field name='phone' title='电话' decorator={[FormItem]} component={[Input]} />
			</FormLayout>
			<FormLayout title='其他' columns={1}>
				<Field name='attachment' title='附件' decorator={[FormItem]} component={[Input]} />
			</FormLayout>
			<FormLayout title='其他2'>
				<Field name='test1' title='test1' decorator={[FormItem]} component={[Input]} />
				<Field name='test2' title='test2' decorator={[FormItem]} component={[Input]} />
				{/* 双列布局 基于 FormGrid 组件，占满一行 */}
				<FormGrid.GridColumn gridSpan={-1}>
					<Field name='test3' title='test3' decorator={[FormItem]} component={[Input]} />
				</FormGrid.GridColumn>
			</FormLayout>
		</FormDrawer>
	)
})
