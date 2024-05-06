import React from 'react'
import { connect, mapReadPretty, mapProps } from '@formily/react'
import AntdTreeSelect from 'antd/es/tree-select'
import { PreviewText } from '../preview-text'
import { LoadingOutlined } from '@ant-design/icons';

export const TreeSelect = connect(
	AntdTreeSelect,
	mapProps(
		{
			dataSource: 'treeData',
		},
		(props, field) => {
			return {
				...props,
				suffixIcon: field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffixIcon,
			}
		},
	),
	mapReadPretty(PreviewText.TreeSelect),
)

export default TreeSelect
