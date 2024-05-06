---
toc: content
group: form
---

---
title: FormDrawer/FormModal
---

# FormDrawer/FormModal

> 抽屉/弹窗 表单，需要在当前场景下进行操作时；

注意事项

`FormDrawer`和`FormModal` 是 `Form` 的一个变体，本质上还是一个表单，所以无法使用 `footer` 来自定义页脚。需要通过 `action` 来自定义操作按钮

## 抽屉基本使用

<code src="./demo/FormDrawerModal/DrawerBasic.tsx"></code>

## 弹窗基本使用

<code src="./demo/FormDrawerModal/ModalBasic.tsx"></code>

## 双列布局

<code src="./demo/FormDrawerModal/TwoColumn.tsx"></code>

## 自定义按钮

<code src="./demo/FormDrawerModal/CustomButton.tsx"></code>

## visible onVisibleChange 状态驱动显隐

<code src="./demo/FormDrawerModal/VisibleControllable.tsx"></code>

## 可配置选项

<code src="./demo/FormDrawerModal/Configurable.tsx"></code>

## 纯 JSX 案例

## API

| 属性名                 | 类型                                    | 描述                                                                                                                                   | 默认值   |
| ---------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| form                   | `Form`                                  | form 实例                                                                                                                              | -        |
| trigger                | React.ReactElement                      | 用于触发 `Drawer` 打开的 dom，一般是 `button`                                                                                          | -        |
| size                   | 'large' \| 'middle' \| 'small'          | 抽屉大小，会影响 `FormLayout` 的默认列数                                                                                               | 'middle' |
| visible                | `boolean`                               | 是否显示                                                                                                                               | -        |
| onVisibleChange        | (e: any) => void                        | 弹窗关闭回调                                                                                                                           | -        |
| onClose                | (visible: boolean) => void              | 弹窗显隐回调                                                                                                                           | -        |
| okButtonProps          | [ISubmitProps](/components/form/submit) | 提交按钮参数                                                                                                                           | -        |
| cancelButtonProps      | `ButtonProps`                           | 取消按钮参数                                                                                                                           | -        |
| cancelButtonPopconfirm | boolean \| `PopconfirmProps`            | 取消按钮/关闭 icon 二次确认，设为 false 禁用二次确认                                                                                   | -        |
| onSubmit               | FormProps\<T\>['onSubmitFailed']        | 表单提交回调，成功后默认会关闭抽屉，返回 `false` 不关闭抽屉                                                                            | -        |
| onSubmitFailed         | FormProps\<T\>['onSubmitFailed']        | 抽屉大小，会影响 `FormLayout` 的默认列数                                                                                               | -        |
| action                 | FormProps\<T\>['action']                | `FormDrawer`和`FormModal` 是 `Form` 的一个变体，本质上还是一个表单，所以无法使用 `footer` 来自定义页脚。通过 `action` 来自定义操作按钮 | -        |
| formProps              | FormProps\<T\>                          | 内部 [Form](/components/form/form) 组件的参数                                                                                          | -        |

`FormProps`类型定义参考 [FormProps API](/components/form/form/#api)

更多属性请参考 [Drawer](https://github.com/JinJinHrb/formily-antd-dumi.git/components/drawer), [Modal](https://github.com/JinJinHrb/formily-antd-dumi.git/components/modal)
