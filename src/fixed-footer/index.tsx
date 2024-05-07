import ConfigProvider from 'antd/es/config-provider'
import classNames from 'classnames'
import type { ReactNode, ReactPortal } from 'react'
import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useConfigContext, WfConfigProvider } from '../config-provider'
import { usePrefixCls } from '../__builtins__/hooks'

export type FixedFooterProps = {
	style?: React.CSSProperties
	className?: string
	renderContent?: (props: FixedFooterProps & { leftWidth?: string }, dom: React.ReactNode) => ReactNode
	prefixCls?: string
	getContainer?: () => HTMLElement
	children?: React.ReactNode
}

const fixedFooterContext = createContext<{
	fixedContainer?: boolean
	setDom?: (dom: DocumentFragment | undefined) => void
}>({})

const FixedFooter: (props: FixedFooterProps) => ReactPortal = (props): ReactPortal => {
	const { children, className, style, renderContent, getContainer, prefixCls: propPrefixCls, ...restProps } = props
	const { getPopupContainer } = useContext<{ getPopupContainer?: () => HTMLElement }>(ConfigProvider.ConfigContext)

	const footerPrefixCls = usePrefixCls('formily-fixed-footer', { prefixCls: propPrefixCls })

	const value = useConfigContext()
	const fixedFooterContextValue = useContext(fixedFooterContext)
	const width = useMemo(() => {
		const { hasSide, sideWidth } = value
		if (fixedFooterContextValue.fixedContainer) return undefined
		if (!hasSide) {
			return undefined
		}
		// 0 or undefined
		if (!sideWidth) {
			return '100%'
		}
		return `calc(100% - ${sideWidth}px)`
	}, [value.hasSide, value.sideWidth, fixedFooterContextValue.fixedContainer])

	const containerDom = useMemo(() => {
		if (fixedFooterContextValue.fixedContainer) {
			return document.createDocumentFragment()
		}
		// 只读取一次就行了，不然总是的渲染
		return getContainer?.() || getPopupContainer?.() || document.body
	}, [])

	useEffect(() => {
		if (fixedFooterContextValue.fixedContainer) {
			if (!fixedFooterContextValue || !fixedFooterContextValue?.setDom) {
				return () => {}
			}
			fixedFooterContextValue?.setDom?.(containerDom as DocumentFragment)
			return () => {
				fixedFooterContextValue?.setDom?.(undefined)
			}
		}
	}, [])

	/** 告诉 props 是否存在 footerBar */
	useEffect(() => {
		if (!value || !value?.setHasFixedFooter) {
			return () => {}
		}
		value?.setHasFixedFooter?.(true)
		return () => {
			value?.setHasFixedFooter?.(false)
		}
	}, [])

	const renderDom = (
		<div
			className={classNames(
				className,
				footerPrefixCls,
				fixedFooterContextValue.fixedContainer && `${footerPrefixCls}-is-container`,
			)}
			style={{ width, ...style }}
			{...restProps}>
			{renderContent
				? renderContent(
						{
							...props,
							...value,
							leftWidth: width,
						},
						children,
				  )
				: children}
		</div>
	)

	return createPortal(renderDom, containerDom, footerPrefixCls) as ReactPortal
}

/**
 * 固定页脚时，底下由于 position: fixed 被占了一定的高度，需要内容区将这部分内容去留白
 */
const FixedFooterWrapper: React.FC<React.PropsWithChildren<{ fixedContainer?: boolean }>> = ({
	children,
	fixedContainer,
}) => {
	const [hasFixedFooter, setHasFixedFooter] = useState(false)
	const footerPrefixCls = usePrefixCls('formily-fixed-footer')
	const [dom, setDom] = useState<DocumentFragment>()
	const footerRef = useRef<HTMLDivElement>(null)

	let node = (
		<WfConfigProvider setHasFixedFooter={setHasFixedFooter} hasFixedFooter={hasFixedFooter}>
			{children}
			{fixedContainer && <div ref={footerRef} className={`${footerPrefixCls}-wrapper`}></div>}
			{!fixedContainer && hasFixedFooter && <div className={`${footerPrefixCls}-dummy`}></div>}
		</WfConfigProvider>
	)

	useLayoutEffect(() => {
		dom && footerRef.current?.appendChild(dom)

		return () => {
			dom && footerRef.current?.removeChild(dom)
		}
	}, [dom])

	if (fixedContainer) {
		node = <fixedFooterContext.Provider value={{ fixedContainer, setDom }}>{node}</fixedFooterContext.Provider>
	}

	return node
}

export { FixedFooter, FixedFooterWrapper }
