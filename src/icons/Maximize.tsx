import React from 'react'

function Maximize(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='currentColor' {...props}>
			<path d='M0.777779 5.44445C1.20733 5.44445 1.55556 5.09622 1.55556 4.66667V4.51111C1.55556 3.84488 1.55616 3.39199 1.58476 3.04192C1.61262 2.70093 1.66312 2.52655 1.7251 2.4049C1.87424 2.11221 2.11221 1.87424 2.4049 1.7251C2.52655 1.66312 2.70093 1.61262 3.04192 1.58476C3.39199 1.55616 3.84488 1.55556 4.51111 1.55556H4.66667C5.09622 1.55556 5.44445 1.20733 5.44445 0.777778C5.44445 0.348224 5.09622 3.215e-07 4.66667 3.215e-07H4.47899C3.85292 -9.32148e-06 3.33617 -1.72804e-05 2.91525 0.0343736C2.47806 0.0700932 2.07618 0.146754 1.6987 0.339092C1.1133 0.637364 0.637365 1.1133 0.339092 1.6987C0.146755 2.07618 0.0700934 2.47806 0.0343738 2.91525C-1.7234e-05 3.33617 -9.29613e-06 3.8529 3.20171e-07 4.47898V4.66667C3.20171e-07 5.09622 0.348224 5.44445 0.777779 5.44445Z' />
			<path d='M1.55556 9.33333C1.55556 8.90378 1.20733 8.55556 0.777779 8.55556C0.348224 8.55556 3.20171e-07 8.90378 3.20171e-07 9.33333V9.52101C-9.29613e-06 10.1471 -1.7234e-05 10.6638 0.0343738 11.0848C0.0700934 11.5219 0.146755 11.9238 0.339092 12.3013C0.637365 12.8867 1.1133 13.3626 1.6987 13.6609C2.07618 13.8532 2.47806 13.9299 2.91525 13.9656C3.33618 14 3.8529 14 4.47899 14H4.66667C5.09622 14 5.44445 13.6518 5.44445 13.2222C5.44445 12.7927 5.09622 12.4444 4.66667 12.4444H4.51111C3.84488 12.4444 3.39199 12.4438 3.04192 12.4152C2.70093 12.3874 2.52655 12.3369 2.4049 12.2749C2.11221 12.1258 1.87424 11.8878 1.7251 11.5951C1.66312 11.4735 1.61262 11.2991 1.58476 10.9581C1.55616 10.608 1.55556 10.1551 1.55556 9.48889V9.33333Z' />
			<path d='M12.4444 9.33333C12.4444 8.90378 12.7927 8.55556 13.2222 8.55556C13.6518 8.55556 14 8.90378 14 9.33333V9.52101C14 10.1471 14 10.6638 13.9656 11.0848C13.9299 11.5219 13.8532 11.9238 13.6609 12.3013C13.3626 12.8867 12.8867 13.3626 12.3013 13.6609C11.9238 13.8532 11.5219 13.9299 11.0848 13.9656C10.6638 14 10.1471 14 9.52101 14H9.33333C8.90378 14 8.55556 13.6518 8.55556 13.2222C8.55556 12.7927 8.90378 12.4444 9.33333 12.4444H9.48889C10.1551 12.4444 10.608 12.4438 10.9581 12.4152C11.2991 12.3874 11.4735 12.3369 11.5951 12.2749C11.8878 12.1258 12.1258 11.8878 12.2749 11.5951C12.3369 11.4735 12.3874 11.2991 12.4152 10.9581C12.4438 10.608 12.4444 10.1551 12.4444 9.48889V9.33333Z' />
			<path d='M12.4444 4.66667C12.4444 5.09622 12.7927 5.44445 13.2222 5.44445C13.6518 5.44445 14 5.09622 14 4.66667V4.47899C14 3.85294 14 3.33616 13.9656 2.91525C13.9299 2.47806 13.8532 2.07618 13.6609 1.6987C13.3626 1.1133 12.8867 0.637364 12.3013 0.339092C11.9238 0.146754 11.5219 0.0700932 11.0848 0.0343736C10.6638 -1.72804e-05 10.1471 -9.32148e-06 9.52104 3.215e-07H9.33333C8.90378 3.215e-07 8.55556 0.348224 8.55556 0.777778C8.55556 1.20733 8.90378 1.55556 9.33333 1.55556H9.48889C10.1551 1.55556 10.608 1.55616 10.9581 1.58476C11.2991 1.61262 11.4735 1.66312 11.5951 1.7251C11.8878 1.87424 12.1258 2.11221 12.2749 2.4049C12.3369 2.52655 12.3874 2.70093 12.4152 3.04192C12.4438 3.39199 12.4444 3.84488 12.4444 4.51111V4.66667Z' />
		</svg>
	)
}

const MaximizeIcon = React.memo(Maximize)
export default MaximizeIcon