import { SelectProps } from 'antd/es/Select'

export enum TagOwnerType {
	/** 个人标签 */
	Personal = 'Personal',
	/** 企业标签 */
	Enterprise = 'Enterprise',
}

export interface TagRecord {
	name: string
	code: string
	color: string
	version: number
	tagOwnerType: TagOwnerType
	c: string[]
}

export interface TagProps extends React.AllHTMLAttributes<HTMLDivElement> {
	color: string
	onClose?(): void
	closable?: boolean
	children: string
	tagOwnerType: string | false
	isCommonTags?: boolean
}

export type XtTagsSelectProps = SelectProps & { noPrettyEdit?: boolean; CustomTag: React.FC<TagProps> }
