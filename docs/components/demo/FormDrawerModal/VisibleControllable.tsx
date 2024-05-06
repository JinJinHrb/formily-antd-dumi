import React, { useState } from 'react'
import { FormDrawer, FormItem, FormLayout, Input, Submit, Reset, FormButtonGroup } from '@formily/antd-dumi'
import { Field } from '@formily/react'
import { Button } from 'antd'

export default () => {
	const [visible, setVisible] = useState(false)
	return (
		<>
			<Button onClick={() => setVisible(true)}>外部按钮</Button>
			<FormDrawer size='small' visible={visible} onVisibleChange={setVisible}>
				<Field name='aaa' required title='输入框1' decorator={[FormItem]} component={[Input]} />
				<Field name='bbb' required title='输入框2' decorator={[FormItem]} component={[Input]} />
				<Field name='ccc' required title='输入框3' decorator={[FormItem]} component={[Input]} />
				<Field name='ddd' required title='输入框4' decorator={[FormItem]} component={[Input]} />
			</FormDrawer>
		</>
	)
}
