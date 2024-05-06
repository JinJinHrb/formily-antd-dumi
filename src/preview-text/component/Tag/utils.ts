export const getHexOpacityColor = (color: string, opacity: number) => {
	opacity = Math.max(opacity, 0)
	opacity = Math.min(opacity, 1)
	color = color?.replace(/#/g, '').toUpperCase()
	if (color?.length === 3) {
		const arr = color?.split('')
		color = ''
		for (let i = 0; i < arr.length; i++) {
			color += arr[i] + arr[i]
		}
	}
	let num = Math.round(255 * opacity)
	let str = ''
	const arrHex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'] //十六进制数组
	while (num > 0) {
		const mod = num % 16
		num = (num - mod) / 16
		str = arrHex[mod] + str
	}
	if (str.length == 1) str = '0' + str
	if (str.length == 0) str = '00'
	return `#${color + str}`
}
