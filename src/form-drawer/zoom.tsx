import React, { useState, useEffect } from 'react'
import { MinimizeIcon, MaximizeIcon } from '../icons'

export const useZoom = (zoomable: boolean, visible: boolean) => {
	const [zoomState, setZoomState] = useState<'max' | 'min'>('min')

	const zoomIcon =
		zoomState === 'min' ? (
			<MaximizeIcon style={{ cursor: 'pointer' }} onClick={() => setZoomState('max')} />
		) : (
			<MinimizeIcon style={{ cursor: 'pointer' }} onClick={() => setZoomState('min')} />
		)

	useEffect(() => {
		setZoomState('min')
	}, [visible])

	return {
		zoomIcon: zoomable ? zoomIcon : undefined,
		zoomState,
	}
}
