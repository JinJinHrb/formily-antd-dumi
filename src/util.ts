import React from 'react'
import { RcFile } from 'antd/es/Upload'
import { onFormValidateFailed, Form as FormType } from '@formily/core'
import { usePrefixCls } from './__builtins__'

export const downloadFile = (fileName: string, blobFileUrl: string) => {
	const link = document.createElement('a')
	link.href = blobFileUrl
	link.download = fileName
	link.click()
	window.URL.revokeObjectURL(link.href)
}

export const rejectForbiddenTypes = (file: RcFile, forbiddenTypes: string[]) => {
	let isValid = true
	for (const forbiddenType of forbiddenTypes) {
		if (typeof forbiddenType !== 'string') {
			continue
		}

		if (file.name?.trim()?.toUpperCase().endsWith(forbiddenType.toUpperCase())) {
			isValid = false
			break
		}
	}
	if (isValid && forbiddenTypes.includes('exe')) {
		// 对 exe 文件纪要检查
		const reader = new FileReader()
		reader.readAsArrayBuffer(file)
		return new Promise<boolean>((resolve, reject) => {
			reader.onload = event => {
				try {
					const buffer = [...Buffer.from((event.target?.result || '') as ArrayBuffer)]
					// 仅要文件的前四位就够了
					const fileCodeList = buffer.slice(0, 4).map(i => i.toString(16).padStart(2, '0'))
					// exe 文件头
					resolve('4D5A9000' !== fileCodeList.join('').toUpperCase())
				} catch (e: unknown) {
					reject(e)
				}
			}
		})
	}
	return Promise.resolve(isValid)
}

export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
export const validEmail = x => /^\w[-_\.\w]*@([a-zA-Z0-9][-a-zA-Z0-9]*\.)+[A-Za-z]{2,14}$/.test(x)

export const queryParse = query => {
	let queryText = ''

	for (let key in query) {
		queryText += `${key}=${query[key]}&`
	}

	return queryText.slice(0, -1)
}

interface OptionsItemProps {
	name: string
	code: string
	color: string
	version?: string
	[key: string]: any
}
// 统一处理 value和options
export const uniTagValue = (list: OptionsItemProps[] = []) => {
	return list
		.filter((option: OptionsItemProps) => option?.name)
		.map((option: OptionsItemProps) => {
			const { color = '#1DCCB3', ...items } = option // #4B9C19
			const str = JSON.stringify({ color, ...items })
			return str
		})
}

export const useValidateAutoScroll = (params: { form: FormType; enable: boolean }) => {
	const { form, enable } = params

	const wrapperDom = React.useRef<HTMLElement | null>(null)
	const setWrapperDom = (dom: HTMLElement) => (wrapperDom.current = dom)

	const errorElementCls = usePrefixCls('formily-item-error-help')
	const effectId = 'onFormValidateFailed-scrollIntoView'

	React.useEffect(() => {
		if (enable === true && wrapperDom.current && form) {
			form.addEffects(effectId, () => {
				onFormValidateFailed(() => {
					wrapperDom.current.getElementsByClassName(errorElementCls)[0]?.scrollIntoView?.({
						behavior: 'smooth',
						block: 'center',
						inline: 'end',
					})
				})
			})
			return () => {
				form.removeEffects(effectId)
			}
		}
	}, [form, enable])

	return { setWrapperDom }
}
