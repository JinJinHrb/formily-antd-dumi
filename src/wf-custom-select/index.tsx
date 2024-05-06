import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { PreviewText } from '../preview-text'
import MyComponent from './MyComponent'
import { isPlainObject, isString } from 'lodash-es'
import { LoadingOutlined } from '@ant-design/icons'

export type { IWfCustomSelectProps } from './MyComponent'

export const WfCustomSelect: React.FC<any> = connect(
	MyComponent,
	mapProps(
		{
			dataSource: 'options',
			loading: true,
			value: true,
			title: true,
			pattern: true,
			setDataSource: true,
			setPattern: true,
		},
		(props: any, field: any) => {
			const submit = field.form.submit
			const validator = field.validator
			const validate = field.validate
			const { options: oldOptions, ...otherProps } = props
			const options = (oldOptions || [])
				.map((el: { name: any; color: any; value: any; label: any }) => {
					if (isPlainObject(el) && el.name && el.color) {
						const str = JSON.stringify(el)
						return { value: str, label: str }
					} else if (isPlainObject(el) && (el.value || el.label)) {
						const str = el.value || el.label
						if (isString(str)) {
							try {
								const obj = JSON.parse(str)
								if (obj.name && obj.color) {
									return { value: str, label: str }
								} else {
									throw new Error('WfCustomSelect #41 invalid el:' + str)
								}
							} catch (e) {
								console.error('WfCustomSelect #41', 'e:', e)
							}
						}
						return
					}
				})
				.filter((a: any) => a)
			return {
				submit,
				validate,
				validator,
				options,
				...otherProps,
				suffixIcon: field?.loading || field?.validating ? <LoadingOutlined /> : props.suffixIcon,
			}
		},
	),
	mapReadPretty(PreviewText.WfCustomSelect),
)

export default WfCustomSelect
