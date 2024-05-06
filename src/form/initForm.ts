import { Form as FormType } from '@formily/core'

export const initForm = <T extends object>(
	formRef: React.MutableRefObject<FormType<T> | undefined> | ((formRef?: FormType<T>) => void) | undefined,
	form?: FormType<T>,
) => {
	if (formRef) {
		const usedForm = form
		if (typeof formRef === 'function') {
			formRef(usedForm)
		} else {
			formRef.current = form
		}
	}
}
