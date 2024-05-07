---
title: formily/antd-dumi
order: 10
hero:
  title: formily-antd-dumi
  desc: 基于 ant-design 封装的优雅且易用的Formily2.x组件体系
  actions:
    - text: 主站文档
      link: https://wangfan.ai/formily-antd-dumi/
    - text: 组件文档
      link: /components
---

## 安装

```bash
# formily相关
yarn add  @formily/antd-dumi @formily/core @formily/grid @formily/json-schema 
# 依赖相关
yarn add antd bignumber.js ahooks react-query
# react相关
yarn add @formily/react @formily/reactive @formily/reactive-react
```

## 快速开始

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { Input, Select, Form, FormItem } from '@formily/antd-dumi'
import { Field } from '@formily/react'
import { Button } from 'antd'

export default () => (
	<Form
		onSubmit={console.log}
		onSubmitFailed={console.log}
		margin
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
)
```
