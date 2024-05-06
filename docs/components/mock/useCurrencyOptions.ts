export default () => {
	return {
		data: [
			{ ccy: 'USD', zhName: '美元' },
			{ ccy: 'CNY', zhName: '人民币' },
			{ ccy: 'EUR', zhName: '欧元' },
			{ ccy: 'AUD', zhName: '澳元' },
			{ ccy: 'CAD', zhName: '加币' },
			{ ccy: 'DKK', zhName: '丹麦克朗' },
			{ ccy: 'HKD', zhName: '港币' },
			{ ccy: 'JPY', zhName: '日元' },
			{ ccy: 'NOK', zhName: '挪威克朗' },
			{ ccy: 'CHF', zhName: '瑞士法郎' },
			{ ccy: 'GBP', zhName: '英镑' },
			{ ccy: 'NZD', zhName: '新西兰元' },
			{ ccy: 'SGD', zhName: '新加坡元' },
			{ ccy: 'SEK', zhName: '瑞典克朗' },
			{ ccy: 'KRW', zhName: '韩元' },
			{ ccy: 'MYR', zhName: '马来西亚令吉' },
			{ ccy: 'THB', zhName: '泰铢' },
			{ ccy: 'VND', zhName: '越南盾' },
			{ ccy: 'CLP', zhName: '智利比索' },
		].map(({ ccy, zhName }) => {
			return {
				value: ccy,
				label: `${zhName} ${ccy}`,
			}
		}),
	}
}
