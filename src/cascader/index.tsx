import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Cascader as AntdCascader } from 'antd'
import { PreviewText } from '../preview-text'

export const Cascader = connect(
	AntdCascader as any,
	mapProps({
		dataSource: 'options',
	}),
	mapReadPretty(PreviewText.Cascader),
) as any

export default Cascader
