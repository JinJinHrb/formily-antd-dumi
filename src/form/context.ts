import { IFormFeedback } from '@formily/core'
import { createContext, useContext } from 'react'

export interface FormInfoContextValue {
	fixedWidth?: number
	/** 默认会固定Form容器的宽度，改为 false 由 children 自己控制内容的宽度 */
	fixContainerWidth?: boolean
	setFixContainerWidth?: (fixContainerWidth: boolean) => void
	/** 提交事件回调 */
	onSubmit?: (values: any) => any
	/** 提交校验失败事件回调 */
	onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const formInfoContext = createContext<FormInfoContextValue | undefined>(undefined)

export const useFormInfo = () => useContext(formInfoContext)
