import React from 'react'
import cn from 'classnames'
import { getQiankunContainer } from '../../../request'
import { usePrefixCls } from '../../../__builtins__'
import EllipsisText from '../EllipsisText'
import { getHexOpacityColor } from './utils'
import './style'

export interface TagProps extends React.AllHTMLAttributes<HTMLDivElement> {
	color: string
	onClose?(): void
	closable?: boolean
	children: string
	isCommonTags?: boolean
}

const Tag: React.FC<TagProps> = ({ color, children, style, ...restProps }) => {
	return (
		<div
			className={cn([usePrefixCls('tag'), 'xt-tag-middle'])}
			style={{
				color,
				backgroundColor: getHexOpacityColor(color, 0.1),
				border: `1px solid ${getHexOpacityColor(color, 0.3)}`,
				...style,
			}}
			{...restProps}>
			<EllipsisText width={58} getPopupContainer={() => getQiankunContainer('CRM') as HTMLElement}>
				{children}
			</EllipsisText>
		</div>
	)
}

export { Tag }
