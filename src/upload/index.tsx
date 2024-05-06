import React, { createContext, useContext } from 'react'
import { Field } from '@formily/core'
import { connect, mapProps, useField } from '@formily/react'
import { Upload as AntdUpload } from 'antd/es/Upload'
import Button from 'antd/es/button'
import type { ButtonProps } from 'antd/es/button'
import {
	UploadChangeParam,
	UploadProps as AntdUploadProps,
	DraggerProps as AntdDraggerProps,
	UploadFile,
	RcFile,
} from 'antd/es/Upload/types'
import { InboxOutlined, FileAddOutlined } from '@ant-design/icons'
import { isArr } from '@formily/shared'
import { UPLOAD_PLACEHOLDER } from './placeholder'
import { usePrefixCls } from '../__builtins__'
import { getBaseHeader as defaultGetBaseHeader } from '../request'
import Message from 'antd/es/Message'
import { downloadFile, rejectForbiddenTypes } from '../util'
import { merge } from 'lodash-es'
import { UploadOutlined } from '@ant-design/icons'

export type UploadPropContextValue = UploadBaseProps
export const UploadPropContext = createContext<UploadPropContextValue>({})
type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed'
type IExtendsUploadProps = {
	fileList?: UploadFileExtend[]
	getBaseHeader?: Function
	forbiddenTypes?: Array<string>
	maxSize?: number
	minSize?: number
	getFileStatus?: (response: any) => UploadFileStatus | undefined
	getErrorMessage?: (response: any) => string | undefined
	beforeUpload?: AntdUploadProps['beforeUpload']
	onChange?: (...args: any) => void
	onSuccessCallback?: () => void
}
export interface CloudDiskUploadProps {
	callback?: (
		selectedFiles: (UploadFile & {
			fileID: string
		})[],
	) => void // 选中文件后的回调
	attachmentType?: string
	customUpload?: boolean
	fileList?: UploadFile[]
	customStyle?: any
	handleChange?: (selectedFiles: any[], file?: any) => void
	search?: string
	limit?: number
}
interface UploadBaseProps extends IExtendsUploadProps {
	textContent?: React.ReactNode
	CloudDiskUpload?: React.FC<CloudDiskUploadProps>
	data?: {
		attachmentType?: string
		usage?: string
		type?: string
	}
	showCloudDiskUpload?: boolean
	extra?: React.ReactNode
	icon?: React.ReactNode
}
export type IUploadProps = Omit<AntdUploadProps, 'onChange'> & {
	buttonProps?: ButtonProps
	wrapProps?: React.CSSProperties
	placeholder?: React.ReactNode
	hideUpload?: boolean
} & UploadBaseProps
export interface UploadFileExtend extends UploadFile {
	customizedAttachmentName?: string
	attachmentName?: string
	attachmentType?: string
	fileType?: string
	fileSource?: string
}
export type IDraggerUploadProps = Omit<AntdDraggerProps, 'onChange'> & {
	CloudDiskUpload?: React.FC<CloudDiskUploadProps>
	textStyle?: React.CSSProperties
} & UploadBaseProps
type ComposedUpload = React.FC<IUploadProps> & {
	Dragger?: React.FC<IDraggerUploadProps>
}
const testOpts = (
	ext: RegExp,
	options: {
		exclude?: string[]
		include?: string[]
	},
) => {
	if (options && isArr(options.include)) {
		return options.include.some(url => ext.test(url))
	}
	if (options && isArr(options.exclude)) {
		return !options.exclude.some(url => ext.test(url))
	}
	return true
}
const getImageByUrl = (url: string, options: any) => {
	for (let i = 0; i < UPLOAD_PLACEHOLDER.length; i++) {
		if (UPLOAD_PLACEHOLDER[i].ext.test(url) && testOpts(UPLOAD_PLACEHOLDER[i].ext, options)) {
			return UPLOAD_PLACEHOLDER[i].icon || url
		}
	}
	return url
}

const getThumbURL = (target: any) => {
	return target?.['thumbUrl'] || target?.['url'] || target?.['downloadURL'] || target?.['imgURL']
}
const errorMessageMap = {
	NOT_SUPPORT: '文件类型不支持',
	Maximum: '文件大小超出范围',
}
const messageParse = (message: string) => {
	if (message?.includes('Maximum')) {
		return '文件大小超出范围'
	}
}
const getDefaultErrorMessage = (target: any) => {
	return (
		errorMessageMap[target?.error] ||
		messageParse(target?.message) ||
		'上传失败'
	)
}
const getState = (target: any) => {
	if (target?.success === false) return 'error'
	if (target?.failed === true) return 'error'
	if (target?.error) return 'error'
	return target?.state || target?.status
}
const normalizeFileList = (
	fileList: UploadFileExtend[],
	getFileStatus?: (response: any) => UploadFileStatus | undefined,
	getErrorMessage?: (response: any) => string | undefined,
) => {
	if (Array.isArray(fileList) && fileList.length) {
		return fileList.map((file, index) => {
			const status = getFileStatus?.(file.response) || getState(file.response) || getState(file)
			return {
				...file,
				name: file?.customizedAttachmentName || file?.attachmentName || file?.name,
				uid: file.uid || `${index}`,
				status,
				error:
					status === 'error'
						? {
								message: getErrorMessage?.(file.response) ?? getDefaultErrorMessage(file.response),
						  }
						: null,
				thumbUrl: getImageByUrl(getThumbURL(file) || getThumbURL(file?.response), {
					exclude: ['.png', '.jpg', '.jpeg', '.gif'],
				}),
			}
		})
	}
	return []
}
const useUploadValidator = () => {
	const field = useField<Field>()
	const value = field.value || []
	const fileError = value.filter((item: UploadFileExtend) => {
		return !!item.error
	})
	field.setSelfErrors(fileError?.length ? [''] : undefined)
}

const fileDownloadV2 = (params: { attachmentType: string; attachmentName: string; filename?: string }) => {
	const { filename, attachmentType, attachmentName } = params
	const baseHeader = defaultGetBaseHeader()
	return fetch(`/api/v1/trade/file/url/retrieve?attachmentType=${attachmentType}&attachmentName=${attachmentName}`, {
		method: 'get',
		credentials: 'include',
		headers: baseHeader,
	})
		.then(res => res.json())
		.then(res => {
			if (typeof res?.url === 'string') {
				return downloadFile(filename || attachmentName, res.url)
			}
		})
		.catch(error => {
			// /trade 接口错误提示收敛, 直接拿后端返回的错误信息
			Message.error(error?.additional || '请求失败')
		})
}

export const fileDownload = (file: {
	name: string
	attachmentType?: string
	attachmentName: string
	customizedAttachmentName: string
	response?: {
		attachmentType: string
		attachmentName: string
	}
}) => {
	const { attachmentType, attachmentName } = file.response || file
	fileDownloadV2({
		attachmentType,
		attachmentName,
		filename: file?.name || '',
	}).catch(() => {
		Message.error('下载失败')
	})
	return false
}
function useUploadProps<T extends IExtendsUploadProps = IUploadProps>({ ...props }: T) {
	const getBaseHeader = props.getBaseHeader || defaultGetBaseHeader
	const baseHeader = getBaseHeader()
	const headers = {
		...baseHeader,
		'X-Requested-With': null,
		'Content-Type': null,
	}
	const beforeUpload = async (file: RcFile, fileList: RcFile[]) => {
		const { maxSize, minSize, beforeUpload } = props || {}
		const { forbiddenTypes } = props
		const res = await rejectForbiddenTypes(file, forbiddenTypes || [])
		const fileTypeError = res
		let fileSizeError = true
		let canUpload: ReturnType<typeof beforeUpload> = true
		let errorType = ''
		const fileSize = Math.floor(file?.size / 1024)
		if (maxSize && maxSize < fileSize) {
			fileSizeError = false
		}
		if (minSize && minSize > fileSize) {
			fileSizeError = false
		}
		// 暂不不影响之前的功能
		if (beforeUpload) {
			canUpload = beforeUpload(file, fileList)
		} else {
			!fileSizeError && (errorType = 'Maximum')
			!fileTypeError && (errorType = 'NOT_SUPPORT')
			fileList.map((item: UploadFileExtend) => {
				if ((!fileSizeError || !fileTypeError) && file.uid === item.uid) {
					item.response =
						errorMessageMap?.[errorType] || '上传失败'
					item.error = 'error'
				}
			})
			props.onChange?.([
				...(props.fileList || []),
				...normalizeFileList(fileList, props.getFileStatus, props.getErrorMessage),
			])
		}
		return (canUpload && fileSizeError && fileTypeError) || AntdUpload.LIST_IGNORE
	}
	useUploadValidator()
	const onChange = (param: UploadChangeParam<UploadFile>) => {
		props.onChange?.(normalizeFileList([...param.fileList], props.getFileStatus, props.getErrorMessage))
		const uploadSuccess = param?.fileList?.every((item: any) => {
			return item.attachmentId || item.status === 'done'
		})
		if (uploadSuccess) {
			props.onSuccessCallback?.()
		}
	}
	return {
		headers,
		withCredentials: true,
		action: `/api/v1/trade/file/upload`,
		onPreview: fileDownload,
		...props,
		fileList: normalizeFileList(props.fileList ? props.fileList : [], props.getFileStatus, props.getErrorMessage),
		onChange,
		beforeUpload,
	}
}
const getPlaceholder = (props: IUploadProps) => {
	const {
		icon = null,
		wrapProps = {},
		buttonProps,
		placeholder,
		showCloudDiskUpload = true,
		CloudDiskUpload,
		hideUpload = false,
	} = props
	if (hideUpload) return null
	if (props.listType !== 'picture-card') {
		return (
			<>
				<div
					style={{
						display: 'flex',
						...wrapProps,
					}}>
					<Button type='dashed' {...buttonProps}>
						{icon ? icon : <UploadOutlined />}
						{props.textContent}
					</Button>
					{showCloudDiskUpload && (
						<>
							<span
								style={{
									display: 'block',
									padding: '0 10px',
									lineHeight: '32px',
									color: 'rgba(0, 0, 0, 0.65)',
								}}
								onClick={e => e.stopPropagation()}>
								{'或'}
							</span>
							{showCloudDiskUpload && CloudDiskUpload && (
								<CloudDiskUpload
									{...{
										fileList: props.fileList,
										attachmentType: props?.data?.attachmentType,
										handleChange: props?.onChange,
										customStyle: {
											flex: '1',
										},
									}}
								/>
							)}
						</>
					)}
					{props.extra}
				</div>
				{placeholder && (
					<div
						style={{
							color: '#a1a1a1',
							fontSize: '12px',
							paddingTop: '6px',
						}}>
						{placeholder}
					</div>
				)}
			</>
		)
	}
	return <FileAddOutlined style={{ fontSize: 20 }} />
}
export const Upload: ComposedUpload = connect(
	(props: React.PropsWithChildren<IUploadProps>) => {
		const { buttonProps, placeholder, ...restProps } = props
		const uploadPropContextValue = useContext(UploadPropContext)
		const newProps = merge({}, uploadPropContextValue, restProps)
		return (
			<AntdUpload {...useUploadProps(newProps)}>
				{props.children ||
					getPlaceholder({
						...newProps,
						buttonProps,
						placeholder,
					})}
			</AntdUpload>
		)
	},
	mapProps({
		value: 'fileList',
	}),
)
const Dragger = connect(
	(oldProps: React.PropsWithChildren<IDraggerUploadProps>) => {
		const uploadPropContextValue = useContext(UploadPropContext)
		const props = merge({}, uploadPropContextValue, oldProps)
		const { showCloudDiskUpload = true, CloudDiskUpload, textStyle, icon = null, textContent, extra = null } = props
		return (
			<div className={usePrefixCls('upload-dragger')}>
				<AntdUpload.Dragger {...useUploadProps(props)}>
					{props.children || (
						<React.Fragment>
							{icon ? (
								icon
							) : (
								<p className='ant-upload-drag-icon'>
									<InboxOutlined />
								</p>
							)}
							<p
								style={{
									display: 'flex',
									justifyContent: 'center',
									flexWrap: 'nowrap',
									...textStyle,
								}}>
								{textContent}
								{showCloudDiskUpload && CloudDiskUpload && (
									<CloudDiskUpload
										{...{
											fileList: props.fileList,
											attachmentType: props?.data?.attachmentType,
											handleChange: props?.onChange,
										}}
									/>
								)}
							</p>
							{extra}
						</React.Fragment>
					)}
				</AntdUpload.Dragger>
			</div>
		)
	},
	mapProps({
		value: 'fileList',
	}),
)
Upload.Dragger = Dragger
