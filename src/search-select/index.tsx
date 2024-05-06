import { connect, mapReadPretty, mapProps } from '@formily/react'
import { PreviewText } from '../preview-text'
import MyComponent from './MyComponent'
import { Field } from '@formily/core'

export const SearchSelect = connect(
	MyComponent,
	mapProps(
		{
			dataSource: 'options',
			loading: true,
		},
		(props, field: Field) => {
			return {
				...props,
				setValue: field.setValue,
				setDataSource: field.setDataSource,
			}
		},
	),
	mapReadPretty(PreviewText.Select),
)

export default SearchSelect
