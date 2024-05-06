import { useContext } from 'react'
import ConfigProvider from 'antd/es/config-provider'

export const usePrefixCls = (
	tag?: string,
	props?: {
		prefixCls?: string
	},
) => {
	if ('ConfigContext' in ConfigProvider) {
		const { getPrefixCls } = useContext(ConfigProvider.ConfigContext) as {
			getPrefixCls: (tag?: string, prefixCls?: string) => string
		}
		return getPrefixCls(tag, props?.prefixCls)
	} else {
		const prefix = props?.prefixCls ?? 'atom-'
		return `${prefix}${tag ?? ''}`
	}
}
