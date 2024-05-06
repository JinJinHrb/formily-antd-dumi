---
toc: content
group: atom-composite
---

# InfiniteArrayItems

> 具有大数据无限滚动特性的自增列表，对于简单的自增编辑场景比较适合，或者对于空间要求高的场景比较适合
>
> 注意：该组件只适用于 Schema 场景



## JSON Schema 案例

> ArrayItems - WfSelectInput 特殊规则：
>
> - 通过配置 `disableSingleItemKey` 和 `disableSingleItemValue` 找到含 item[`disableSingleItemKey`] === `disableSingleItemValue` 的记录，<br />并将这条记录置为不可编辑
> - 配置 `'x-validator': {minItems: 1, message: ...}`
> - - 保证初始时最少有一行空记录
> - - 当 `field['x-validator'].minItems` 存在且大于等于 1，仅剩一行时删除按钮为空

```tsx
import React from 'react'
import {
	FormItem,
	Editable,
	Input,
	Select,
	Radio,
	DatePicker,
	ArrayItems,
  InfiniteArrayItems,
	FormButtonGroup,
	Submit,
	Space,
	WfSelectInput,
} from '@formily/antd-dumi'
import { createForm, onFormInit } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import XTConfigProvider from 'antd/es/config-provider'
import geoCodeOptions from './mock/geoCodeOptions.js'

const SchemaField = createSchemaField({
	components: {
		FormItem,
		Editable,
		DatePicker,
		Space,
		Radio,
		Input,
		Select,
		ArrayItems,
    InfiniteArrayItems,
		WfSelectInput,
	},
})

const originalList = Array.from({ length: 10000 }, () => ({}))
      
const form = createForm({
	effects(form) {
		onFormInit(() => {
			// 设置数据
      form.setValuesIn("infinite_array", originalList)
			form.setInitialValues({
				socialMedia: [
					{
						'215l6a559dj': {
							select: 'QQ',
							input: 'xxsss@qq.com',
							/* isSingleItemDisabled: true, */ bindStatus: 'BIND',
						},
					},
					{
						'215l6a559dj': {
							select: 'WhatsApp',
							input: '123355889921',
							areaCode: '30',
							bindStatus: 'BIND',
						},
					},
				],
			})
		})
	},
})

const schema = {
  type: "object",
  properties: {
    infinite_array: {
      type: "array",
      name: "infinite_array",
      "x-component": "InfiniteArrayItems",
      "x-component-props": {
        id: "infinite_array",
      },
      "x-validator": [],
      "x-index": 0,
      default: [{}],
      maxLength: 1000000,
      items: {
        type: "object",
        "x-validator": [],
        "x-decorator": "InfiniteArrayItems.Item",
        "x-decorator-props": {
          style: {
            display: "flex",
            justifyContent: "space-between"
          },
        },
        properties: {
          sort: {
            type: "void",
            "x-decorator": "FormItem",
            "x-component": "InfiniteArrayItems.SortHandle",
            "x-index": 0,
          },
          content: {
            type: "object",
            "x-decorator": "FormItem",
            "x-decorator-props": {
              style: {
                display: "flex",
                flexDirection: "column",
              },
            },
            "x-index": 1,
            properties: {
              
              
              array2: {
                type: "array",
                "x-component": "ArrayItems",
                "x-decorator": "FormItem",
                "x-index": 3,
                "x-component-props": { style: { width: 300 } },
                title: "对象数组样式联动",
                items: {
                  type: "object",
                  "x-decorator": "ArrayItems.Item",
                  properties: {
                    sort: {
                      type: "void",
                      "x-decorator": "FormItem",
                      "x-component": "ArrayItems.SortHandle",
                    },

                    input: {
                      type: "string",
                      title: "输入框",
                      "x-decorator": "Editable",
                      "x-component": "Input",
                      "x-component-props": {
                        bordered: false,
                      },
                    },
                    config: {
                      type: "object",
                      title: "配置复杂数据",
                      "x-component": "Editable.Popover",
                      "x-reactions":
                        "{{(field)=>field.title = field.value && field.value.input || field.title}}",
                      properties: {
                        date: {
                          type: "string",
                          title: "日期",
                          "x-decorator": "FormItem",
                          "x-component": "DatePicker.RangePicker",
                          "x-component-props": {
                            style: {
                              width: 160,
                            },
                          },
                        },
                        input: {
                          type: "string",
                          title: "输入框",
                          "x-decorator": "FormItem",
                          "x-component": "Input",
                        },
                        select: {
                          type: "string",
                          title: "下拉框",
                          enum: [
                            { label: "选项1", value: 1 },
                            { label: "选项2", value: 2 },
                          ],
                          "x-decorator": "FormItem",
                          "x-component": "Select",
                          "x-component-props": {
                            style: {
                              width: 160,
                            },
                          },
                        },
                      },
                    },
                    remove: {
                      type: "void",
                      "x-decorator": "FormItem",
                      "x-component": "ArrayItems.Remove",
                    },
                  },
                },
                properties: {
                  add: {
                    type: "void",
                    title: "添加条目",
                    "x-component": "ArrayItems.Addition",
                    "x-component-props": {
                      buttonType: "link",
                      style: { textAlign: "center" },
                    },
                    "x-reactions": [
                      {
                        when: '{{($form.getValuesIn("array2") || []).length > 0}}',
                        fulfill: {
                          state: {
                            "component[1].style.position": "relative",
                            "component[1].style.top": "-10px",
                            "component[1].style.textAlign": "left",
                          },
                        },
                        otherwise: {
                          state: {
                            "component[1].style.position": "inherit",
                            "component[1].style.top": undefined,
                            "component[1].style.textAlign": "center",
                          },
                        },
                      },
                    ],
                  },
                },
              },
              // socialMedia Start
              socialMedia: {
                type: "array",
                "x-component": "ArrayItems",
                "x-decorator": "FormItem",
                "x-index": 4,
                "x-component-props": {
                  style: { width: 500 },
                  disableSingleItemKey: "bindStatus",
                  disableSingleItemValue: "BIND",
                },
                title: "社交账号",
                items: {
                  type: "object",
                  "x-decorator": "ArrayItems.Item",
                  properties: {
                    "215l6a559dj": {
                      // title: 'A2',
                      "x-decorator": "FormItem",
                      "x-component": "WfSelectInput",
                      enum: [
                        {
                          label: "脸书（Facebook）",
                          value: "Facebook",
                        },
                        {
                          label: "推特（Twitter）",
                          value: "Twitter",
                        },
                        {
                          label: "腾讯（QQ）",
                          value: "QQ",
                        },
                        {
                          label: "微信（Wechat）",
                          value: "Wechat",
                        },
                        {
                          label: "领英（Linkedin）",
                          value: "Linkedin",
                        },
                        {
                          label: "Line",
                          value: "Line",
                        },
                        {
                          label: "WhatsApp",
                          value: "WhatsApp",
                        },
                      ],
                      "x-validator": [],
                      "x-component-props": {
                        selectStyle: {
                          width: 150,
                        },
                        inputStyle: {
                          width: 300,
                        },
                        defaultSelect: "Twitter",
                        areaCodeOptions: geoCodeOptions,
                        selectedValues4AreaCode: "WhatsApp",
                      },
                      "x-decorator-props": {},
                      "x-designable-id": "215l6a559dj",
                      "x-index": 1,
                    },
                    remove: {
                      type: "void",
                      "x-decorator": "FormItem",
                      "x-component": "ArrayItems.Remove",
                    },
                  },
                },
                properties: {
                  add: {
                    type: "void",
                    title: "添加条目",
                    "x-component": "ArrayItems.Addition",
                    "x-component-props": {
                      buttonType: "link",
                    },
                    "x-reactions": [
                      {
                        when: '{{($form.getValuesIn("socialMedia") || []).length > 0}}',
                        fulfill: {
                          state: {
                            "component[1].style.position": "relative",
                            "component[1].style.top": "-10px",
                            "component[1].style.textAlign": "left",
                          },
                        },
                        otherwise: {
                          state: {
                            "component[1].style.position": "inherit",
                            "component[1].style.top": undefined,
                            "component[1].style.textAlign": "center",
                          },
                        },
                      },
                    ],
                  },
                },
              },
              // socialMedia End

              // socialMedia 2 Start
              socialMedia2: {
                type: "array",
                "x-component": "ArrayItems",
                "x-decorator": "FormItem",
                "x-index": 5,
                "x-component-props": {
                  style: { width: 500 },
                  disableSingleItemKey: "bindStatus",
                  disableSingleItemValue: "BIND",
                },
                title: "社交账号2",
                items: {
                  type: "object",
                  "x-decorator": "ArrayItems.Item",
                  properties: {
                    "215l6a559dj": {
                      // title: 'A2',
                      "x-decorator": "FormItem",
                      "x-component": "WfSelectInput",
                      enum: [
                        {
                          label: "脸书（Facebook）",
                          value: "Facebook",
                        },
                        {
                          label: "推特（Twitter）",
                          value: "Twitter",
                        },
                        {
                          label: "腾讯（QQ）",
                          value: "QQ",
                        },
                        {
                          label: "微信（Wechat）",
                          value: "Wechat",
                        },
                        {
                          label: "领英（Linkedin）",
                          value: "Linkedin",
                        },
                        {
                          label: "Line",
                          value: "Line",
                        },
                        {
                          label: "WhatsApp",
                          value: "WhatsApp",
                        },
                      ],
                      "x-validator": [],
                      "x-component-props": {
                        selectStyle: {
                          width: 150,
                        },
                        inputStyle: {
                          width: 300,
                        },
                        defaultSelect: "Twitter",
                        areaCodeOptions: geoCodeOptions,
                        selectedValues4AreaCode: "WhatsApp",
                      },
                      "x-decorator-props": {},
                      "x-designable-id": "215l6a559dj",
                      "x-index": 1,
                    },
                    remove: {
                      type: "void",
                      "x-decorator": "FormItem",
                      "x-component": "ArrayItems.Remove",
                    },
                  },
                },
                properties: {
                  add: {
                    type: "void",
                    title: "添加条目",
                    "x-component": "ArrayItems.Addition",
                    "x-component-props": {
                      buttonType: "link",
                    },
                    "x-reactions": [
                      {
                        when: '{{($form.getValuesIn("socialMedia") || []).length > 0}}',
                        fulfill: {
                          state: {
                            "component[1].style.position": "relative",
                            "component[1].style.top": "-10px",
                            "component[1].style.textAlign": "left",
                          },
                        },
                        otherwise: {
                          state: {
                            "component[1].style.position": "inherit",
                            "component[1].style.top": undefined,
                            "component[1].style.textAlign": "center",
                          },
                        },
                      },
                    ],
                  },
                },
              },
              // socialMedia 2 End

              // phone Start
              phoneNumbers: {
                type: "array",
                "x-component": "ArrayItems",
                "x-decorator": "FormItem",
                "x-index": 6,
                "x-component-props": {
                  style: { width: 500 },
                },
                "x-validator": [
                  {
                    maxItems: 3,
                    message: "添加数量不得超过3",
                  },
                  {
                    minItems: 1,
                    message: "添加数量不得少于1",
                  },
                ],
                title: "固定电话",
                items: {
                  type: "object",
                  "x-decorator": "ArrayItems.Item",
                  properties: {
                    phoneNumber: {
                      // title: 'A2',
                      "x-decorator": "FormItem",
                      "x-component": "Input",
                      "x-validator": [],
                      "x-component-props": {
                        style: {
                          width: 240,
                        },
                        areaCodeOptions: geoCodeOptions,
                        recommendedGeoCode: "ESP",
                        forbiddenRegex: "[^\\d\\*#\\-+\\/\\s]",
                      },
                      "x-decorator-props": {},
                      "x-index": 2,
                    },
                    remove: {
                      type: "void",
                      "x-decorator": "FormItem",
                      "x-component": "ArrayItems.Remove",
                    },
                  },
                },
                properties: {
                  add: {
                    type: "void",
                    title: "添加条目",
                    "x-component": "ArrayItems.Addition",
                    "x-component-props": {
                      buttonType: "link",
                    },
                  },
                },
              },
              // phone End
            },
          },
          remove: {
            type: "void",
            "x-decorator": "FormItem",
            "x-component": "InfiniteArrayItems.Remove",
            "x-index": 2,
          },
        },
      },
      properties: {
        add: {
          type: "void",
          title: "添加条目",
          "x-component": "InfiniteArrayItems.Addition",
        },
      },
    },
  },
};

export default () => {
	return (
		<XTConfigProvider>
			<FormProvider form={form}>
				<SchemaField schema={schema} />
				<FormButtonGroup>
					<Submit onSubmit={console.log}>提交</Submit>
				</FormButtonGroup>
			</FormProvider>
		</XTConfigProvider>
	)
}
```



## API

### InfiniteArrayItems

> 无限滚动列表

继承 HTMLDivElement Props

扩展属性

| 属性名           | 类型                  | 描述                    | 默认值   |
| --------------  | -------------------- | ---------------------   | ------  |
| id              | `string`             | 无限滚动列表id            |         |
| avaibleHeight   | `number`             | 无限滚动列表可视区域高度    |  600    |

### InfiniteArrayItems.Item

> 列表区块

继承 HTMLDivElement Props

扩展属性

| 属性名 | 类型                 | 描述           | 默认值 |
| ------ | -------------------- | -------------- | ------ |
| type   | `card \| divide`     | 卡片或者分割线   |        |

### InfiniteArrayItems.SortHandle

> 拖拽手柄

参考 https://ant.design/components/icon-cn/

### InfiniteArrayItems.Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | ReactText             | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | `any`                 | 默认值   |          |

其余参考 https://ant.design/components/button-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### InfiniteArrayItems.Remove

> 删除按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### InfiniteArrayItems.MoveDown

> 下移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### InfiniteArrayItems.MoveUp

> 上移按钮

| 属性名 | 类型      | 描述 | 默认值 |
| ------ | --------- | ---- | ------ |
| title  | ReactText | 文案 |        |

其余参考 https://ant.design/components/icon-cn/

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### InfiniteArrayItems.Index

> 索引渲染器

无属性

### InfiniteArrayItems.useIndex

> 读取当前渲染行索引的 React Hook

### InfiniteArrayItems.useRecord

> 读取当前渲染记录的 React Hook
