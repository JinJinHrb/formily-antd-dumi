import React from 'react'

function Minimize(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none' {...props}>
			<path
				d='M5 1V4C5 4.55228 4.55228 5 4 5H1M9 1V4C9 4.55228 9.44772 5 10 5H13M1 9H4C4.55228 9 5 9.44772 5 10V13M9 13V10C9 9.44772 9.44772 9 10 9H13'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

const MinimizeIcon = React.memo(Minimize)
export default MinimizeIcon
