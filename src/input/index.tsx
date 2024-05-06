import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import AntdInput from 'antd/es/input'
import { PreviewText } from '../preview-text'
import { LoadingOutlined } from '@ant-design/icons'
import MyComponent from './MyComponent'

type ComposedInput = React.FC<React.PropsWithChildren<any>> & {
  TextArea?: React.FC<React.PropsWithChildren<any>>
}

export const Input: ComposedInput = connect(
  MyComponent,
  mapProps((props, field) => {
    return {
      ...props,
      suffix: <span>{field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffix}</span>,
    }
  }),
  mapReadPretty(PreviewText.Input),
)

Input.TextArea = connect(AntdInput.TextArea, mapReadPretty(PreviewText.Input))

export default Input
