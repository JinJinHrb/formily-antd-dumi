import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { LoadingOutlined } from '@ant-design/icons'
import { PreviewText } from '../preview-text'
import MyComponent from './MyComponent'

type ComposedInput = React.FC<React.PropsWithChildren<any>> & {
	TextArea?: React.FC<React.PropsWithChildren<any>>
}

export const InputEditor: ComposedInput = connect(
	MyComponent,
	mapProps((props, field) => {
		return {
			...props,
			selfErrors: (field as unknown as { selfErrors: string[] }).selfErrors,
			suffix: <span>{field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffix}</span>,
		}
	}),
	mapReadPretty(PreviewText.Input),
)

export default InputEditor
