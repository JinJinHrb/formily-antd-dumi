/** @format */
import { createContext } from 'react'

type TBaseArrayContextValue = {
	index?: number
	isSingleItemDisabled?: boolean
}

const BaseArrayContext = createContext<TBaseArrayContextValue>({})

export { BaseArrayContext, TBaseArrayContextValue }
