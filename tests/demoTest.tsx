import * as React from 'react'
import glob from 'glob'
import { render as enzymeRender } from 'enzyme'
import MockDate from 'mockdate'
import moment from 'moment'
import { render, act } from '@testing-library/react'
import type { TriggerProps } from 'rc-trigger'
import { jest } from '@jest/globals'
import fs from 'fs'
import { marked } from 'marked'

const rendererMD = new marked.Renderer()
marked.setOptions({
	renderer: rendererMD,
	gfm: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
})

// We export context here is to avoid testing-lib inject `afterEach` in `tests/index.test.js`
// Which breaks the circle deps
export const TriggerMockContext = React.createContext<Partial<TriggerProps> | undefined>(undefined)

const originError = console.error

/** This function will remove `useLayoutEffect` server side warning. Since it's useless. */
export function excludeWarning() {
	const errorSpy = jest.spyOn(console, 'error').mockImplementation((msg, ...rest) => {
		if (String(msg).includes('useLayoutEffect does nothing on the server')) {
			return
		}
		originError(msg, ...rest)
	})

	return () => {
		errorSpy.mockRestore()
	}
}

export function excludeAllWarning() {
	let cleanUp: Function

	beforeAll(() => {
		cleanUp = excludeWarning()
	})

	afterAll(() => {
		cleanUp()
	})
}

type CheerIO = ReturnType<typeof enzymeRender>
type CheerIOElement = CheerIO[0]
// We should avoid use it in 4.0. Reopen if can not handle this.
const USE_REPLACEMENT = false
const testDist = process.env.LIB_DIR === 'dist'

/**
 * Rc component will generate id for aria usage. It's created as `test-uuid` when env === 'test'. Or
 * `f7fa7a3c-a675-47bc-912e-0c45fb6a74d9`(randomly) when not test env. So we need hack of this to
 * modify the `aria-controls`.
 */
function ariaConvert(wrapper: CheerIO) {
	if (!testDist || !USE_REPLACEMENT) return wrapper

	const matches = new Map()

	function process(entry: CheerIOElement) {
		if (entry.type === 'text' || entry.type === 'comment') {
			return
		}
		const { attribs, children } = entry
		if (matches.has(entry)) return
		matches.set(entry, true)

		// Change aria
		if (attribs && attribs['aria-controls']) {
			attribs['aria-controls'] = '' // Remove all the aria to keep render sync in jest & jest node
		}

		// Loop children
		if (!children) {
			return
		}
		const childList = Array.isArray(children) ? children : [children]
		childList.forEach(process)
	}

	wrapper.each((_, entry) => process(entry))

	return wrapper
}

type Options = {
	skip?: boolean | string[]
	testingLib?: boolean
}

function baseText(doInject: boolean, component: string, options: Options = {}) {
	const files = glob.sync(`docs/components/${component}.md`)

	files.forEach(file => {
		let testMethod = options.skip === true ? test.skip : test
		if (Array.isArray(options.skip) && options.skip.some(c => file.includes(c))) {
			testMethod = test.skip
		}

		testMethod(doInject ? `renders ${file} extend context correctly` : `renders ${file} correctly`, () => {
			const errSpy = excludeWarning()
			const mockDate = moment().valueOf()

			MockDate.set(mockDate)
			const fileStr = fs.readFileSync(file, 'utf-8')
			let info = marked(fileStr)
			let Demo = <div dangerouslySetInnerHTML={{ __html: info }} />

			if (doInject) {
				Demo = (
					<TriggerMockContext.Provider value={{ popupVisible: true }}>
						<div dangerouslySetInnerHTML={{ __html: info }} />
					</TriggerMockContext.Provider>
				)
			}

			if (options?.testingLib) {
				jest.useFakeTimers().setSystemTime(mockDate)

				const { container } = render(Demo)
				act(() => {
					jest.runAllTimers()
				})

				const { children } = container
				const child = children.length > 1 ? children : children[0]
				expect(child).toMatchSnapshot()

				jest.useRealTimers()
			} else {
				const wrapper = enzymeRender(Demo)

				// Convert aria related content
				ariaConvert(wrapper)

				expect(wrapper).toMatchSnapshot()
			}

			MockDate.reset()
			errSpy()
		})
	})
}

export function extendTest(component: string, options: Options = {}) {
	baseText(true, component, options)
}

export function demoTest(component: string, options: Options = {}) {
	baseText(false, component, options)
}
