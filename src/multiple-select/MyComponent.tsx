import React from 'react'
import Select from 'antd/es/Select'
import Tag from 'antd/es/tag'
const { Option } = Select
interface IProps {
	options?: any[]
	showColor?: boolean
}
const MyComponent: React.FC<IProps> = props => {
	const { options, showColor = false, ...resetProps } = props
	const prefixCls = 'xt-multipleSelect'
	const tagRender = (tagProps: any) => {
		const { label, value, closable, onClose } = tagProps
		const option = options?.filter(item => item.value === value)?.[0]
		const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
			event.preventDefault()
			event.stopPropagation()
		}
		return (
			<Tag
				color={showColor ? option?.color || '#BD1E2E' : ''}
				onMouseDown={onPreventMouseDown}
				closable={closable}
				onClose={onClose}
				style={{ marginRight: 3 }}>
				{label?.props?.['data-label'] || label}
			</Tag>
		)
	}

	return (
		<Select dropdownMatchSelectWidth={140} tagRender={tagRender} {...resetProps}>
			{options?.map(item => {
				const { value: labelValue, label, color } = item
				return (
					<Option value={labelValue} label={label} key={item.value}>
						<div className={`${prefixCls}-optionItem`} data-label={label}>
							<span className={`${prefixCls}-optionLabelItem`}>
								{showColor && (
									<div
										style={{
											backgroundColor: color,
											width: '14px',
											height: '14px',
											marginRight: '8px',
										}}
									/>
								)}
								<span>{label}</span>
							</span>
						</div>
					</Option>
				)
			})}
		</Select>
	)
}
export default MyComponent
