/**
 * iframe: true
 */
import React from 'react'
import { ConfigProvider, Input, FormItem, Form, FixedFooterWrapper } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { Field, observer } from '@formily/react'
import { Layout, Message } from 'antd'

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

const headerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	paddingInline: 50,
	lineHeight: '64px',
	backgroundColor: '#7dbcea',
	position: 'fixed',
	left: 0,
	right: 0,
	zIndex: 100,
}

const contentStyle: React.CSSProperties = {
	minHeight: `calc(100% - 61px)`,
	color: '#fff',
	padding: 24,
}

const siderStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#3ba0e9',
	position: 'fixed',
	height: '100%',
	top: 64,
}

const { Header, Sider, Content } = Layout

export default observer(() => {
	return (
		<ConfigProvider>
			<Layout>
				{/* dummy */}
				<Sider style={{ width: 200 }}></Sider>
				<Sider style={siderStyle}>Sider</Sider>
				<Layout style={{ background: '##f7f7f7' }}>
					<Header style={headerStyle}>Header</Header>
					{/* dummy */}
					<Header style={{ height: 64 }}></Header>
					<Content
						style={{
							height: `calc(100vh - 64px)`,
							overflow: 'auto',
							background: '#fff',
						}}>
						<FixedFooterWrapper fixedContainer>
							<Content style={contentStyle}>
								<Form
									form={form}
									title='表单示例'
									action={{ align: 'right', fixedFooter: true }}
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
							</Content>
						</FixedFooterWrapper>
					</Content>
				</Layout>
			</Layout>
		</ConfigProvider>
	)
})
