const CCY_RATE_LIST = [
	{
		fromCcy: 'USD',
		toCcy: 'CNY',
		rate: 6.630247,
		customized: false,
		refreshTime: null,
	},
	{
		fromCcy: 'CLP',
		toCcy: 'CNY',
		rate: 0.007736,
		customized: false,
		refreshTime: null,
	},
	{
		fromCcy: 'MYR',
		toCcy: 'CNY',
		rate: 1.52776,
		customized: false,
		refreshTime: null,
	},
	{
		fromCcy: 'THB',
		toCcy: 'CNY',
		rate: 0.2,
		customized: true,
		refreshTime: 1675655943000,
	},
	{
		fromCcy: 'VND',
		toCcy: 'CNY',
		rate: 0.00029,
		customized: false,
		refreshTime: null,
	},
]

export const getCcyRateList = () =>
	new Promise(rsv => {
		setTimeout(() => {
			rsv(CCY_RATE_LIST)
		}, 500)
	})
