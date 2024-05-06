import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { PreviewText } from '../preview-text'
import MyComponent from './MyComponent'
import { BaseArrayContext } from '../__builtins__'
import { Field } from '@formily/core'
import { LoadingOutlined } from '@ant-design/icons'

const withBaseArrayContext = (Component: React.ComponentType<any>) => (props: any) =>
	(
		<BaseArrayContext.Consumer>
			{context => <Component baseArrayContext={context} {...props} />}
		</BaseArrayContext.Consumer>
	)

export const WfSelectInput: React.FC<any> = connect(
	withBaseArrayContext(MyComponent),
	mapProps(
		{
			dataSource: 'options',
			value: true,
			title: true,
			pattern: true,
			required: true,
			validator: true,
		},
		(props: any, field: Field) => {
			return {
				...props,
				fieldAddress: field.address?.toString(),
				suffixIcon: field?.loading || field?.validating ? <LoadingOutlined /> : props.suffixIcon,
				setSelfErrors: field.setSelfErrors,
				selfErrors: field.selfErrors,
			}
		},
	),
	mapReadPretty(PreviewText.WfSelectInput),
)

export default WfSelectInput
