import React from 'react'
import { usePrefixCls } from '../../../__builtins__'

interface Props {
	name: string
	color: string
	maxWidth?: string
}

export const DEFAULT_TAG_COLOR = '#BD1E2E'

const TagItem: React.FC<Props> = props => {
	const prefixCls = usePrefixCls('formily-tag-item')

	const { name, color, maxWidth } = props
	const formatColor = (color: string) => {
		const reg = /^\d{0,3}\,\d{0,3}\,\d{0,3}$/
		const regxp = new RegExp(reg)
		if (regxp.test(color)) {
			return `rgb(${color})`
		}
		return color
	}

	return (
		<div className={prefixCls}>
			<div className={`${prefixCls}-back`} style={{ background: formatColor(color || '#1DCCB3') }}></div>
			<div className={`${prefixCls}-content`} style={{ color: '#FFF', maxWidth }}>
				{name}
			</div>
		</div>
	)
}

export default TagItem
