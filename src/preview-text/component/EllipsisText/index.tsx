import React, { useEffect, useRef, useState } from 'react'
import { useDebounceFn } from 'ahooks'
import Tooltip, { TooltipProps } from 'antd/es/tooltip'
import { getQiankunContainer } from '../../../request'

export interface EllipsisTextProps extends Omit<TooltipProps, 'title' | 'overlay'> {
	width?: number
	children: React.ReactNode
}

/**
 * 超出指定宽度后显示省略号，hover显示Tooltip
 */
const EllipsisText: React.FC<EllipsisTextProps> = ({ width, children, getPopupContainer, ...restProps }) => {
	const [isEllipsis, setIsEllipsis] = useState<boolean>(false)
	const colRef = useRef<HTMLDivElement>(null)

	const handleEllipsis = () => {
		const isEllipsis = colRef.current && colRef.current.clientWidth < colRef.current.scrollWidth
		setIsEllipsis(!!isEllipsis)
	}

	const windowChange = useDebounceFn(handleEllipsis, {
		wait: 500,
	})

	useEffect(() => {
		window.addEventListener('resize', windowChange.run)
		return () => {
			window.removeEventListener('resize', windowChange.run)
		}
	}, [])

	useEffect(
		() => {
			handleEllipsis()
		},
		[children],
	)

	return (
		<Tooltip
			title={isEllipsis ? children : ''}
			placement='top'
			{...restProps}
			getPopupContainer={
				getPopupContainer ? getPopupContainer : e => (e.parentNode || getQiankunContainer('CRM')) as HTMLElement
			}>
			<div ref={colRef} style={{ maxWidth: width, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
				{children}
			</div>
		</Tooltip>
	)
}

export default EllipsisText
