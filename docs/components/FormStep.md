---
toc: content
group: layout
---

# FormStep

> 分步表单组件

## JSX 案例

<code src="./demo/FormStep/Basic.tsx"></code>

## Markup Schema 案例

```tsx
import React from 'react'
import { Form, FormStep, FormItem, Input, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormConsumer, createSchemaField } from '@formily/react'
import Button from 'antd/es/button'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		FormStep,
		Input,
	},
})

const formStep = FormStep.createFormStep()

export default () => {
	return (
		<Form
			onSubmit={console.log}
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
			}}>
			<SchemaField>
				<SchemaField.Void x-component='FormStep' x-component-props={{ formStep }}>
					<SchemaField.Void x-component='FormStep.StepPane' x-component-props={{ title: '第一步' }}>
						<SchemaField.String name='name' title='姓名' x-decorator='FormItem' required x-component='Input' />
						<SchemaField.String name='phone' title='电话' x-decorator='FormItem' x-component='Input' />
					</SchemaField.Void>
					<SchemaField.Void x-component='FormStep.StepPane' x-component-props={{ title: '第二步' }}>
						<SchemaField.String name='receive' title='收货地址' x-decorator='FormItem' required x-component='Input' />
					</SchemaField.Void>
					<SchemaField.Void type='void' x-component='FormStep.StepPane' x-component-props={{ title: '第三步' }}>
						<SchemaField.String name='pay' title='支付金额' x-decorator='FormItem' required x-component='Input' />
					</SchemaField.Void>
				</SchemaField.Void>
			</SchemaField>
		</Form>
	)
}
```

## Markup Schema 双列布局案例

```tsx
import React from 'react'
import { Form, FormStep, FormLayout, FormItem, Input, FormButtonGroup, Submit } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormConsumer, createSchemaField } from '@formily/react'
import Button from 'antd/es/button'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		FormStep,
		FormLayout,
		Input,
	},
})

const formStep = FormStep.createFormStep()

export default () => {
	return (
		<Form
			onSubmit={console.log}
			childColumns={2}
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
			}}>
			<SchemaField>
				<SchemaField.Void x-component='FormStep' x-component-props={{ formStep }}>
					<SchemaField.Void x-component='FormStep.StepPane' x-component-props={{ title: '第一步' }}>
						<SchemaField.Void x-component='FormLayout' x-component-props={{ title: '基本信息' }}>
							<SchemaField.String name='name' title='姓名' x-decorator='FormItem' required x-component='Input' />
							<SchemaField.String name='phone' title='电话' x-decorator='FormItem' x-component='Input' />
						</SchemaField.Void>
						<SchemaField.Void x-component='FormLayout' x-component-props={{ title: '产品信息' }}>
							<SchemaField.String name='product' title='产品' x-decorator='FormItem' x-component='Input' />
							<SchemaField.String name='price' title='价格' x-decorator='FormItem' x-component='Input' />
						</SchemaField.Void>
					</SchemaField.Void>
					<SchemaField.Void x-component='FormStep.StepPane' x-component-props={{ title: '第二步' }}>
						<SchemaField.String name='receive' title='收货地址' x-decorator='FormItem' required x-component='Input' />
					</SchemaField.Void>
					<SchemaField.Void type='void' x-component='FormStep.StepPane' x-component-props={{ title: '第三步' }}>
						<SchemaField.String name='pay' title='支付金额' x-decorator='FormItem' required x-component='Input' />
					</SchemaField.Void>
				</SchemaField.Void>
			</SchemaField>
		</Form>
	)
}
```

## JSON Schema 案例

```tsx
import React from 'react'
import { Form, FormStep, FormItem, Input, Submit, FormButtonGroup } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { FormConsumer, createSchemaField } from '@formily/react'
import Button from 'antd/es/button'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		FormStep,
		Input,
	},
})

const form = createForm()
const formStep = FormStep.createFormStep()

const schema = {
	type: 'object',
	properties: {
		step: {
			type: 'void',
			'x-component': 'FormStep',
			'x-component-props': {
				formStep: '{{formStep}}',
			},
			properties: {
				step1: {
					type: 'void',
					'x-component': 'FormStep.StepPane',
					'x-component-props': {
						title: '第一步',
					},
					properties: {
						name: {
							type: 'string',
							title: '姓名',
							required: true,
							'x-decorator': 'FormItem',
							'x-component': 'Input',
						},
						phone: {
							type: 'string',
							title: '电话',
							'x-decorator': 'FormItem',
							'x-component': 'Input',
						},
					},
				},
				step2: {
					type: 'void',
					'x-component': 'FormStep.StepPane',
					'x-component-props': {
						title: '第二步',
					},
					properties: {
						receive: {
							type: 'string',
							title: '收货地址',
							required: true,
							'x-decorator': 'FormItem',
							'x-component': 'Input',
						},
					},
				},
				step3: {
					type: 'void',
					'x-component': 'FormStep.StepPane',
					'x-component-props': {
						title: '第三步',
					},
					properties: {
						pay: {
							type: 'string',
							title: '支付金额',
							required: true,
							'x-decorator': 'FormItem',
							'x-component': 'Input',
						},
					},
				},
			},
		},
	},
}

export default () => {
	return (
		<Form
			onSubmit={console.log}
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
			}}>
			<SchemaField schema={schema} scope={{ formStep }} />
		</Form>
	)
}
```

## API

### FormStep

| 属性名   | 类型      | 描述                                               | 默认值 |
| -------- | --------- | -------------------------------------------------- | ------ |
| formStep | IFormStep | 传入通过 createFormStep/useFormStep 创建出来的模型 |        |

其余参考 https://ant.design/components/steps-cn/

### FormStep.StepPane

参考 https://ant.design/components/steps-cn/ Steps.Step 属性

### FormStep.createFormStep

```ts pure
import { Form } from '@formily/core'

interface createFormStep {
	(current?: number): IFormStep
}

interface IFormTab {
	//当前索引
	current: number
	//是否允许向后
	allowNext: boolean
	//是否允许向前
	allowBack: boolean
	//设置当前索引
	setCurrent(key: number): void
	//提交表单
	submit: Form['submit']
	//向后
	next(): void
	//向前
	back(): void
}
```
