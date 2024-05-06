import React, { useLayoutEffect, useRef, useMemo, useContext } from 'react'
import { markRaw } from '@formily/reactive'
import { observer } from '@formily/react'
import { Grid } from '@formily/grid'
import { usePrefixCls, pickDataProps } from '../__builtins__'
import { useFormLayout } from '../form-layout'
import cls from 'classnames'
import { IGridOptions, createGrid } from './grid'

const FormGridContext = React.createContext<Grid<HTMLElement>>(null)

export interface IFormGridProps extends IGridOptions {
	grid?: Grid<HTMLElement>
	prefixCls?: string
	className?: string
	style?: React.CSSProperties
	/**
	 * 对齐方式，默认情况 children 都会自动占满空白区块，只有配合 maxWidth 使用才有效果
	 * @default 'center'
	 */
	align?: React.CSSProperties['justifyContent']
	/**
	 * 固定列数，等价于 minColumns={n} maxColumns={n}
	 * @default 1
	 */
	columns?: number | number[]
}

export interface IGridColumnProps {
	gridSpan?: number
	style?: React.CSSProperties
	className?: string
}

type ComposedFormGrid = React.FC<React.PropsWithChildren<IFormGridProps>> & {
	GridColumn: React.FC<React.PropsWithChildren<IGridColumnProps>>
	useFormGrid: () => Grid<HTMLElement>
	createFormGrid: (props: IFormGridProps) => Grid<HTMLElement>
	/**
	 * @deprecated
	 */
	useGridSpan: (gridSpan: number) => number
	/**
	 * @deprecated
	 */
	useGridColumn: (gridSpan: number) => number
}

export const createFormGrid = (props: IFormGridProps) => {
	return markRaw(createGrid(props))
}

export const useFormGrid = () => useContext(FormGridContext)

/**
 * @deprecated
 */
export const useGridSpan = (gridSpan = 1) => {
	return gridSpan
}

/**
 * @deprecated
 */
export const useGridColumn = (gridSpan = 1) => {
	return gridSpan
}

const useMergedProps = (props: IFormGridProps): IFormGridProps => {
	const defaultProps: IFormGridProps = {
		strictAutoFit: true,
		align: 'center',
		columns: 1,
		columnGap: 24,
		rowGap: 0,
	}
	const layout = useFormLayout()

	const layoutConfig: IFormGridProps = {}

	if (layout.columnGap !== undefined) {
		layoutConfig.columnGap = layout.columnGap
	}
	if (layout.rowGap !== undefined) {
		layoutConfig.rowGap = layout.rowGap
	}
	if (layout.columns !== undefined) {
		layoutConfig.columns = layout.columns
	}

	const mergedProps = {
		...defaultProps,
		...(typeof layout.grid === 'boolean' ? {} : layout.grid),
		...layoutConfig,
		...props,
	}

	return {
		...mergedProps,
		minColumns: mergedProps.minColumns ?? mergedProps.columns,
		maxColumns: mergedProps.maxColumns ?? mergedProps.columns,
	}
}

export const FormGrid: ComposedFormGrid = observer(
	({ children, className, style, ...props }: React.PropsWithChildren<IFormGridProps>) => {
		const options = useMergedProps(props)

		const grid = useMemo(() => markRaw(options?.grid ? options.grid : createGrid(options)), [Grid.id(options)])
		const ref = useRef<HTMLDivElement>()
		const prefixCls = usePrefixCls('formily-grid', props)
		const dataProps = pickDataProps(props)
		useLayoutEffect(() => {
			return grid.connect(ref.current)
		}, [grid])
		return (
			<FormGridContext.Provider value={grid}>
				<div
					{...dataProps}
					className={cls(`${prefixCls}-layout`, className)}
					style={{
						...style,
						justifyContent: options.align || style?.justifyContent,
						gridTemplateColumns: grid.templateColumns,
						gap: grid.gap,
					}}
					ref={ref}>
					{children}
				</div>
			</FormGridContext.Provider>
		)
	},
	{
		forwardRef: true,
	},
) as any

export const GridColumn: React.FC<React.PropsWithChildren<IGridColumnProps>> = observer(
	({ gridSpan, children, ...props }) => {
		return (
			<div {...props} style={props.style} data-grid-span={gridSpan}>
				{children}
			</div>
		)
	},
)

GridColumn.defaultProps = {
	gridSpan: 1,
}

FormGrid.createFormGrid = createFormGrid
FormGrid.useGridSpan = useGridSpan
FormGrid.useGridColumn = useGridColumn
FormGrid.useFormGrid = useFormGrid
FormGrid.GridColumn = GridColumn

export default FormGrid
