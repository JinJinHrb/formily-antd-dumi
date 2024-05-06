import React from 'react'

function Close(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='currentColor' {...props}>
			<path
				d='M12.25 1.75L1.75 12.25'
				stroke='currentColor'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M1.75 1.75L12.25 12.25'
				stroke='currentColor'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

const CloseIcon = React.memo(Close)
export default CloseIcon
