import React from 'react'

export interface ConfigContextValue {
	/** Form 配置 */
	form?: {
		/**
		 * 容器最大宽度，可以按照列数来配置不同的宽度，如
		 * ```
		 * fixedWidth: {
		 *   // 只有一列时的表单宽度
		 *   1: 560,
		 *   2: 720,
		 * }
		 *
		 * 设为 false 会自动填满容器
		 * ```
		 */
		fixedWidth?: false | number | Record<number, number>
	}
	/** 页面级吸底的按钮，需要减去菜单的宽度 */
	hasSide?: boolean
	/** 菜单宽度 */
	sideWidth?: number
	/** 是否有 pageFooter */
	hasFixedFooter?: boolean
	setHasFixedFooter?: (hasPageFooter: boolean) => void
}

export const defaultConfigContextValue: ConfigContextValue = {
	form: {
		fixedWidth: {
			1: 560,
			2: 720,
		},
	},
	hasSide: true,
	sideWidth: 60,
	hasFixedFooter: false,
}

export const ConfigContext = React.createContext<ConfigContextValue>(defaultConfigContextValue)
