import { Grid, IGridOptions as RawIGridOptions } from '@formily/grid'

export interface IGridOptions extends RawIGridOptions {
	fitLastRow?: boolean
}

const resolveChildren = (grid: Grid<HTMLElement>) => {
	let walked = 0,
		shadowWalked = 0,
		rowIndex = 0,
		shadowRowIndex = 0
	if (!grid.ready) return
	grid.children = grid.children.map((node, index) => {
		const columnIndex = walked % grid.columns
		const shadowColumnIndex = shadowWalked % grid.columns
		const remainColumns = grid.columns - columnIndex
		const originSpan = node.originSpan
		const targetSpan = originSpan > grid.columns ? grid.columns : originSpan
		let span = grid.options.strictAutoFit ? targetSpan : targetSpan > remainColumns ? remainColumns : targetSpan

		// 最后一项填满一行
		if ((grid.options as IGridOptions).fitLastRow && index === grid.children.length - 1) {
			span = remainColumns
		}

		const gridColumn = originSpan === -1 ? `span ${remainColumns} / -1` : `span ${span} / auto`
		if (node.element.style.gridColumn !== gridColumn) {
			node.element.style.gridColumn = gridColumn
		}
		if (node.visible) {
			walked += span
		}
		shadowWalked += span
		if (columnIndex === 0) {
			rowIndex++
		}
		if (shadowColumnIndex == 0) {
			shadowRowIndex++
		}
		node.shadowRow = shadowRowIndex
		node.shadowColumn = shadowColumnIndex + 1
		if (node.visible) {
			node.row = rowIndex
			node.column = columnIndex + 1
		}
		if (grid.options?.shouldVisible) {
			if (!grid.options.shouldVisible(node, grid)) {
				if (node.visible) {
					node.element.style.display = 'none'
				}
				node.visible = false
			} else {
				if (!node.visible) {
					node.element.style.display = ''
				}
				node.visible = true
			}
		}
		return node
	})
}

export const createGrid = (props: IGridOptions) => {
	return new Grid({
		...props,

		onDigest(grid) {
			resolveChildren(grid)
			props.onDigest?.(grid)
		},
	})
}
