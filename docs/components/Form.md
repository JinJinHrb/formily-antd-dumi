---
toc: content
group: form
---

# Form

> FormProvider + FormLayout + form 标签的组合组件，可以帮助我们快速实现带回车提交的且能批量布局的表单

## 使用案例

```tsx
import React from 'react'
import { Input, Select, Form, FormItem } from '@formily/antd-dumi'
import { createForm } from '@formily/core'
import { Field } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'
import { Button } from 'antd'

const form = createForm()

export default () => (
	<XTConfigProvider>
		<Form
			form={form}
			onSubmit={console.log}
			onSubmitFailed={console.log}
			action={{
				render: dom => {
					return (
						<>
							<Button>其他按钮</Button>
							{dom}
						</>
					)
				},
			}}>
			<Field
				name='aa'
				title='选择框'
				decorator={[FormItem]}
				component={[Select]}
				dataSource={[
					{
						label: '选项1',
						value: 1,
					},
					{
						label: '选项2',
						value: 2,
					},
				]}
			/>
			<Field name='bb' title='输入框' required decorator={[FormItem]} component={[Input]} />
			<Field name='cc' title='输入框' decorator={[FormItem]} component={[Input]} />
			<Field name='dd' title='输入框' decorator={[FormItem]} component={[Input]} />
			<Field name='ee' title='输入框' decorator={[FormItem]} component={[Input]} />
		</Form>
	</XTConfigProvider>
)
```

<div class="_dumi_md_warning" style="margin-top:20px">
注意：想要实现回车提交，我们在使用Submit组件的时候不能给其传onSubmit事件，否则回车提交会失效，这样做的目的是为了防止用户同时在多处写onSubmit事件监听器，处理逻辑不一致的话，提交时很难定位问题。
</div>

## 按钮行内布局

<code src="./demo/Form/InlineAction.tsx"></code>

## 固定页面页脚

<code src="./demo/Form/FixedFooter.tsx" iframe="400px"></code>

## 固定容器页脚

<code src="./demo/Form/FixedContainerFooter.tsx" iframe="400px" description="优点：不需要考虑sidebar宽度"></code>

## 可配置选项

<code src="./demo/Form/Configurable.tsx"></code>

## API

布局相关的 API 属性，我们参考 [FormLayout](./form-layout)即可，剩下是 Form 组件独有的 API 属性

| 属性名                 | 类型                                                                                             | 描述                                                                                                                                                                     | 默认值 |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| form                   | [Form](https://core.formilyjs.org/api/models/form)                                               | Form 实例                                                                                                                                                                | -      |
| formRef                | MutableRefObject\<Form \| undefined \> \| (form: Form \| undefined) => void                      | 获取表单所使用的 form                                                                                                                                                    | -      |
| component              | string                                                                                           | 渲染组件，可以指定为自定义组件渲染                                                                                                                                       | `form` |
| action                 | boolean \| [FormActionProps](./#formactionprops)                                                 | 操作按钮相关配置                                                                                                                                                         | true   |
| previewTextPlaceholder | ReactNode                                                                                        | 预览态占位符                                                                                                                                                             | `N/A`  |
| fixedWidth             | boolean \| number \| Record<number, number>                                                      | 固定容器宽度;默认在只有一列时，容器宽度为 560；两列时，容器宽度为 1080;设为 true 会读取 ConfigProvider 的 layout.fixedWidth 的配置;设为对象会根据 `columns` 找到对应宽度 | -      |
| stretch                | boolean                                                                                          | 拉伸内容高度，使得 footer 能固定到底部                                                                                                                                   | -      |
| inline                 | boolean                                                                                          | 行内表单，目前是实验性阶段，适配不是很好                                                                                                                                 | -      |
| header                 | React.ReactNode                                                                                  | 头部内容                                                                                                                                                                 | -      |
| headerProps            | React.HTMLAttributes\<HTMLDivElement> & React.ClassAttributes\<HTMLDivElement\>                  | 头部参数                                                                                                                                                                 | -      |
| footer                 | React.ReactNode                                                                                  | 底部内容                                                                                                                                                                 | -      |
| footerProps            | React.HTMLAttributes\<HTMLDivElement> & React.ClassAttributes\<HTMLDivElement\>                  | 底部参数                                                                                                                                                                 | -      |
| onSubmit               | `(values:any)=>any`                                                                              | 提交事件回调                                                                                                                                                             | -      |
| onSubmitFailed         | (feedbacks: [IFormFeedback](https://core.formilyjs.org/api/models/form#iformfeedback)[]) => void | 提交校验失败事件回调                                                                                                                                                     | -      |

### FormActionProps

| 属性名               | 类型                                                                       | 描述                                                       | 默认值  |
| -------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- | ------- |
| submitButtonProps    | [ISubmitProps](/components/form/submit)                                    | 提交按钮的 props                                           | -       |
| formButtonGroupProps | [IFormButtonGroupProps](/components/form/form-button-group)                | 渲染组件，可以指定为自定义组件渲染                         | `form`  |
| formItem             | boolean                                                                    | 使用 FormItem 组件包裹，使得 操作项 与 普通输入框 能够对齐 | false   |
| align                | 'left' \| 'right'                                                          | 位置                                                       | 'right' |
| render               | (dom: React.ReactNode) => React.ReactNode                                  | 自定义按钮                                                 | `N/A`   |
| sticky               | boolean \| [IStickyProps](/components/form/form-button-group#吸底居中案例) | 开启吸底功能                                               | false   |
| inline               | boolean                                                                    | Form 组件的独有配置，是否嵌入到 FormLayout 里              | false   |
