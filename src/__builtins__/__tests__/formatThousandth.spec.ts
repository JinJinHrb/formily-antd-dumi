import { thousandthFormat, thousandthParser, ThousandthFormatTypes } from '../utils'

describe('thousandthFormat', () => {
	it('not currency parse', () => {
		expect(thousandthFormat({ amount: '1111' })).toEqual('1,111')
		expect(thousandthFormat({ amount: '1111.111' })).toEqual('1,111.111')
		expect(thousandthFormat({ amount: 1111 })).toEqual('1,111')
		expect(thousandthFormat({ amount: 111.1 })).toEqual('111.1')
		expect(thousandthFormat({ amount: null })).toEqual('')
		expect(thousandthFormat({ amount: undefined })).toEqual('')
		expect(thousandthFormat({ amount: '123,123.3' })).toEqual('123,123.3')
		expect(thousandthFormat({ amount: '1,2.1' })).toEqual('12.1')
		expect(thousandthFormat({ amount: '1137.000' })).toEqual('1,137')
		expect(thousandthFormat({ amount: '1137.13500' })).toEqual('1,137.135')
		expect(thousandthFormat({ amount: '1137.' })).toEqual('1,137')
	})
	it('currency parse', () => {
		expect(thousandthFormat({ amount: '1231123444', currency: 'JPY' })).toEqual('1,231,123,444')
		expect(thousandthFormat({ amount: '1231123444', currency: 'CNY' })).toEqual('1,231,123,444.00')
		expect(thousandthFormat({ amount: '1231123444.32', currency: 'USD' })).toEqual('1,231,123,444.32')
		expect(thousandthFormat({ amount: 'null', currency: 'JPY' })).toEqual('')
		expect(thousandthFormat({ amount: 'null', currency: 'null' })).toEqual('')
		expect(thousandthFormat({ amount: 1231123444, currency: 'JPY' })).toEqual('1,231,123,444')
		expect(thousandthFormat({ amount: 1231123444.32, currency: 'USD' })).toEqual('1,231,123,444.32')
		expect(thousandthFormat({ amount: '1,231,123,444.32', currency: 'JPY', precision: 2 })).toEqual('1,231,123,444')
		expect(thousandthFormat({ amount: '1,231,123,444.32', currency: 'USD' })).toEqual('1,231,123,444.32')
		expect(thousandthFormat({ amount: '1231123,444.32', currency: 'USD' })).toEqual('1,231,123,444.32')
		expect(thousandthFormat({ amount: '1231123444.32', currency: 'JPY' })).toEqual('1,231,123,444')
		expect(thousandthFormat({ amount: '1231123444', currency: 'CNY', precision: 2 })).toEqual('1,231,123,444.00')
		expect(thousandthFormat({ amount: '1231123444', currency: 'CNY', precision: 4 })).toEqual('1,231,123,444.00')
		expect(thousandthFormat({ amount: '1372.01', precision: 4 })).toEqual('1,372.0100')
	})
	it('weird value', () => {
		expect(thousandthFormat({ amount: '1.1.3.7' })).toEqual('113.7')
		expect(thousandthFormat({ amount: '2.1.1.3.7' })).toEqual('2,113.7')
	})
	it('currency roundUp', () => {
		expect(thousandthFormat({ amount: '1999.999', currency: 'CNY' })).toEqual('1,999.99')
		expect(thousandthFormat({ amount: '1999.99', currency: 'JPY' })).toEqual('1,999')
		expect(thousandthFormat({ amount: '1999.999', roundUp: true })).toEqual('2,000')
		expect(thousandthFormat({ amount: '1999.999', currency: 'CNY', roundUp: true })).toEqual('2,000.00')
		expect(thousandthFormat({ amount: '1999.99', currency: 'JPY', roundUp: true })).toEqual('2,000')
	})

	it('decimal palces', () => {
		expect(thousandthFormat({ amount: '1999.999', decimalPlaces: 2 })).toEqual('1,999.99')
		expect(thousandthFormat({ amount: '1999.999', decimalPlaces: 0 })).toEqual('1,999')
		expect(thousandthFormat({ amount: '1999.999', decimalPlaces: 2, roundUp: true })).toEqual('2,000')
		expect(thousandthFormat({ amount: '1999.999', decimalPlaces: 0, roundUp: true })).toEqual('2,000')
	})
	it('ceilUp', () => {
		expect(thousandthFormat({ amount: '1999.99', ceilUp: true })).toEqual('2,000')
		expect(thousandthFormat({ amount: '1999.111', ceilUp: true })).toEqual('2,000')
		expect(thousandthFormat({ amount: '1999.999', ceilUp: true })).toEqual('2,000')
		expect(thousandthFormat({ amount: '1999.111', ceilUp: true, decimalPlaces: 2 })).toEqual('1,999.12')
	})
	it('ceilUpIfTooSmall', () => {
		expect(thousandthFormat({ amount: '0.0001', ceilUpIfTooSmall: true, currency: 'CNY' })).toEqual('0.01')
		expect(thousandthFormat({ amount: '0.0001', ceilUpIfTooSmall: true, currency: 'JPY' })).toEqual('1')
		expect(thousandthFormat({ amount: '0.0001', ceilUpIfTooSmall: true, currency: 'USD' })).toEqual('0.01')
		expect(thousandthFormat({ amount: '0.0001', ceilUpIfTooSmall: true, currency: 'KWD' })).toEqual('0.001')
	})
	it('limit', () => {
		expect(thousandthFormat({ amount: '1999.999', limit: true, max: 1000 })).toEqual('1,000')
		expect(thousandthFormat({ amount: '1999.99', limit: true, min: 2000 })).toEqual('2,000')
		expect(thousandthFormat({ amount: '1000', limit: true, min: 2000 })).toEqual('2,000')
	})
	it('formatType', () => {
		expect(thousandthFormat({ amount: '1999.9999999', formatType: ThousandthFormatTypes.unitPrice })).toEqual(
			'1,999.999999',
		)
		expect(
			thousandthFormat({ amount: '1999.9999999', formatType: ThousandthFormatTypes.unitPrice, currency: 'JPY' }),
		).toEqual('1,999')
		expect(thousandthFormat({ amount: '1999.9999999', formatType: ThousandthFormatTypes.settlementAmount })).toEqual(
			'1,999.99',
		)
		expect(
			thousandthFormat({ amount: '1999.9999999', formatType: ThousandthFormatTypes.settlementAmount, currency: 'JPY' }),
		).toEqual('1,999')
		expect(
			thousandthFormat({ amount: '1999.9999999', formatType: ThousandthFormatTypes.settlementAmount, currency: 'KWD' }),
		).toEqual('1,999.999')
		expect(thousandthFormat({ amount: '1999.9999999', formatType: ThousandthFormatTypes.quantity })).toEqual('1,999.99')
		expect(thousandthFormat({ amount: '1999.9999999', formatType: ThousandthFormatTypes.weight })).toEqual('1,999.99')
		expect(thousandthFormat({ amount: '1999.9999999', formatType: ThousandthFormatTypes.size })).toEqual('1,999.99')
		expect(thousandthFormat({ amount: '1999.99999999999', formatType: ThousandthFormatTypes.volume })).toEqual(
			'1,999.9999999999',
		)
		expect(thousandthFormat({ amount: '1999.99999999999', formatType: ThousandthFormatTypes.exchangeRate })).toEqual(
			'1,999.99999999',
		)
	})
})

describe('thousandthParser', () => {
	it('should return the same value if input is a number', () => {
		expect(thousandthParser(1234)).toEqual(1234)
		expect(thousandthParser('.123')).toEqual('.123')
	})

	it('should return the same value if input is not a valid number string', () => {
		expect(thousandthParser('abc')).toEqual('abc')
		expect(thousandthParser('1.2.3')).toEqual('12.3')
		expect(thousandthParser('.123')).toEqual('.123')
	})

	it('should remove spaces and commas from the input string', () => {
		expect(thousandthParser('1,234')).toEqual('1234')
		expect(thousandthParser('1 234')).toEqual('1 234')
		// expect(thousandthParser('1 234')).toEqual('1234') // 这个测试案例有问题，因为 1 234 有可能代表两个数，不应该合并成一个数处理
	})

	it('should remove extra decimal points from the input string', () => {
		expect(thousandthParser('1.2.3')).toEqual('12.3')
		expect(thousandthParser('1..23')).toEqual('1.23')
	})

	it('should remove the last decimal point from the input string', () => {
		expect(thousandthParser('123.')).toEqual('123')
	})
})
