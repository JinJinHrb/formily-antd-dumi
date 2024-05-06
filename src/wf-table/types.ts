export interface IProps {
	fieldKey: string
	labelKey: string
	valueKey: string
	rowKey: string
	dataKey: string
	cellValue: string
	editList?: EditList[]
}

export type SelectOption = {
	label: string
	value: string
}

export type SelectEditor = {
	title: string
	type: 'Select'
	enum: SelectOption[]
}

export type EditList = string & SelectEditor

// MySelect Start

export interface MySelectProps {
	defaultValue: string
	options: SelectOption[]
	selectOptions: React.FC[]
}

// MySelect End
