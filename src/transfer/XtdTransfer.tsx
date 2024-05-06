import { Transfer, TransferProps } from 'antd'
import * as React from 'react'
import { useState } from 'react'
type TransferDirection = 'left' | 'right'
/** xtd3中，Transfer被封装了一层受控, 这里需要自己调用change更新数据 */
const XtdTransfer: React.FC<TransferProps<any>> = function (props) {
	const { selectedKeys = [], targetKeys = [], onChange, onSelectChange, ...rest } = props
	const [_targetKeys, setTargetKeys] = useState(targetKeys)
	const [_selectedKeys, setSelectedKeys] = useState<string[]>(selectedKeys)
	const _onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
		setTargetKeys(nextTargetKeys)
		onChange?.(nextTargetKeys, direction, moveKeys)
	}
	const _onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
		setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
		onSelectChange?.(sourceSelectedKeys, targetSelectedKeys)
	}
	return (
		<Transfer
			targetKeys={_targetKeys}
			selectedKeys={_selectedKeys}
			onChange={_onChange}
			onSelectChange={_onSelectChange}
			{...rest}
		/>
	)
}
export { XtdTransfer }
