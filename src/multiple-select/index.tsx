import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import MyComponent from './MyComponent'
import { PreviewText } from '../preview-text'
export const MultipleSelect: React.FC = connect(
	MyComponent,
	mapProps(
		{
			dataSource: 'options',
			loading: true,
		},
		props => props,
	),
	mapReadPretty(PreviewText.Input),
)
