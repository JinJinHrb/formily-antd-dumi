import React, { useContext } from 'react'
import { ConfigContext, ConfigContextValue } from './context'

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigContextValue>> = props => {
	const context = React.useContext<ConfigContextValue>(ConfigContext)

	return <ConfigContext.Provider value={{ ...context, ...props }}>{props.children}</ConfigContext.Provider>
}

const useConfigContext = () => {
	return useContext(ConfigContext)
}

export { ConfigProvider, ConfigContext, useConfigContext }
