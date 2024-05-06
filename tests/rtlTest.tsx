import React from 'react'
import Moment from 'moment'
import MockDate from 'mockdate'
import { mount, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import ConfigProvider from 'antd/es/config-provider'

configure({ adapter: new Adapter() })

export default function rtlTest(Component: React.ComponentType, mockDate?: boolean) {
	describe(`rtl render`, () => {
		it(`component should be rendered correctly in RTL direction`, () => {
			if (mockDate) {
				MockDate.set(Moment('2000-09-28').valueOf())
			}
			const wrapper = mount(
				<ConfigProvider direction='rtl'>
					<Component />
				</ConfigProvider>,
			)
			expect(wrapper.render()).toMatchSnapshot()
			if (mockDate) {
				MockDate.reset()
			}
		})
	})
}
