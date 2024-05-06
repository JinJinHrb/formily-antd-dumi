import { createForm, IFormProps } from '@formily/core'
import { useMemo } from 'react'

export const useCreateForm = <T extends object = any>(options?: IFormProps<T>, deps: React.DependencyList = []) => {
	const form = useMemo(() => createForm(options), deps)

	return form
}
