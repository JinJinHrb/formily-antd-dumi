import './style'
import {
	registerValidateFormats,
	registerValidateLocale,
	registerValidateRules,
	setValidateLanguage,
} from '@formily/core'
import { formats, rules, locale } from './wf-validator'
import 'antd/dist/antd.css'

setValidateLanguage('zh-CN')
registerValidateFormats(formats)
registerValidateRules(rules)
registerValidateLocale(locale)

export * from './__builtins__'

export * from './wf-validator'

export * from './array-base'
export * from './array-table'
export * from './array-tabs'
export * from './array-cards'
export * from './array-collapse'
export * from './array-items'
export * from './infinite-array-items'
export * from './amount-currency'
export * from './form-modal'
export * from './form-drawer'
export * from './form'
export * from './form-item'
export * from './form-layout'
export * from './form-step'
export * from './form-grid'
export * from './form-tab'
export * from './form-collapse'
export * from './form-button-group'
export * from './input'
export * from './input-editor'
export * from './password'
export * from './cascader'
export * from './space'
export * from './preview-text'
export * from './radio'
export * from './checkbox'
export * from './select'
export * from './search-select'
export * from './tree-select'
export * from './transfer'
export * from './date-picker'
export * from './time-picker'
export * from './number-picker'
export * from './switch'
export * from './upload'
export * from './submit'
export * from './reset'
export * from './editable'
export * from './select-table'
export * from './wf-table'
export * from './wf-custom-select'
export * from './wf-select-input'
export * from './multiple-select'
export * from './number-range'

export * from './config-provider'
export * from './fixed-footer'

// export * from './global'
export * from './icons'
