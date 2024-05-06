import React from 'react'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
import glob from 'glob'
import MockDate from 'mockdate'
import moment from 'moment'
import puppeteer from 'puppeteer'
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

const toMatchImageSnapshot = configureToMatchImageSnapshot({
	customSnapshotsDir: `${process.cwd()}/imageSnapshots`,
	customDiffDir: `${process.cwd()}/imageDiffSnapshots`,
	customReceivedDir: '',
	noColors: true,
})

expect.extend({ toMatchImageSnapshot })

jest.setTimeout(50000)
export default function imageTest(componentName: string, file: string) {
	it('component image screenshot should correct', async () => {
		const fileStr = fs.readFileSync(file, 'utf-8')
		let info = marked(fileStr)

		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		await page.setRequestInterception(true)
		const onRequestHandle = (request: any) => {
			if (['image'].indexOf(request.resourceType()) !== -1) {
				request.abort()
			} else {
				request.continue()
			}
		}

		MockDate.set(moment().valueOf())
		page.on('request', onRequestHandle)
		await page.goto(`file://${process.cwd()}/tests/index.html`)
		await page.addStyleTag({ path: `${process.cwd()}/dist/antd.css` })
		await page.evaluate(innerHTML => {
			const dom = document.querySelector('#root') as Element
			dom.innerHTML = innerHTML
		}, info)

		const image = await page.screenshot({ fullPage: true })

		expect(image).toMatchImageSnapshot({
			customSnapshotIdentifier: componentName,
		})

		MockDate.reset()
		page.removeListener('request', onRequestHandle)
	})
}

export function imageDemoTest(component: string) {
	const files = glob.sync(`docs/components/${component}.md`)

	files.forEach(file => {
		describe(`Test ${file} image`, () => {
			imageTest(component, file)
		})
	})
}
