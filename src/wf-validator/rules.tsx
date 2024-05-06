import { IRegistryRules } from '@formily/validator'
import { formats } from './formats'
import { validEmail } from '../util'
const onlyNumberAndCode = (str = '') => /^[A-Za-z0-9]+$/.test(str)
export const rules: IRegistryRules = {
	disallowEmoticon(value: string) {
		if (formats.emoji.test(value)) {
			return '不能输入表情符'
		}
		return ''
	},
	allowNumberAndCode(value: string) {
		if (value && !onlyNumberAndCode(value)) {
			return '仅可输入英文字母和数字'
		}
		return ''
	},
	allowEmail(value: string) {
		if (value && !validEmail(value)) {
			return '邮箱格式不正确'
		}
		return ''
	},
}
