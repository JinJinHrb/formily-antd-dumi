import cookie from 'js-cookie'

export const DEFAULT_ID = '11111c607b1a11e89c9c2d42b21b1a3e'
export const COOKIE_FINGERPRINT = 'xt_fingerprint'
export const COOKIE_SERVER_GRANT_ID = 'xt_server_grant_id'
export const COOKIE_NEW_SERVER_GRANT_ID = 'xt_new_server_grant_id'
export const XSRF_COOKIE = 'XSRF-TOKEN'
export const GATEWAY_API_URL = ''
export const SERVER_SIDE_GATEWAY_API_URL = 'http://172.19.255.84:40002'
export const API_DELAY = 600000

export const UNAUTHORIZED_ERROR = ['Unauthorized', 'UNAUTHORIZED']

export function inBrowser() {
	const isNode = typeof process !== 'undefined' && process?.versions?.node
	return !isNode
}

const isWeiXin = () => {
	if (typeof window === 'object') {
		const ua = window.navigator.userAgent.toLowerCase()
		return !!ua.match(/MicroMessenger/i)
	}
	return true
}
type UserAgent = {
	dingtalk: boolean
	wxWork: boolean
	weixin: boolean
} | null
type BrowserType = {
	userAgent: () => UserAgent
}
const browser: BrowserType = {
	userAgent: function () {
		if (inBrowser()) {
			const ua = window?.navigator?.userAgent.toLocaleLowerCase()
			return {
				dingtalk: /DingTalk/gi.test(ua), // 钉钉客户端
				wxWork: /MicroMessenger/gi.test(ua) && /wxWork/gi.test(ua), //企业微信客户端
				weixin: /MicroMessenger/gi.test(ua), // 微信
				mobile: /Mobile/gi.test(ua), // 移动端
			}
		}
		return null
	},
}

export const getBaseHeader = () => {
	const trackId = cookie.get('xt_uuid') || DEFAULT_ID
	const xsrfToken = cookie.get(XSRF_COOKIE)
	const fingerprint = typeof localStorage === 'object' && localStorage.getItem(COOKIE_FINGERPRINT)
	const serverGrantId = typeof localStorage === 'object' && localStorage.getItem(COOKIE_SERVER_GRANT_ID)
	const newServerGrantId = typeof localStorage === 'object' && localStorage.getItem(COOKIE_NEW_SERVER_GRANT_ID)
	const dingtalk = browser?.userAgent()?.dingtalk
	return {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'X-B3-TraceId': trackId,
		FP: fingerprint,
		'X-B3-SpanId': trackId.substring(0, 16),
		'X-User-Agent-Context': `${
			isWeiXin() ? 'Mobile_Wechat' : dingtalk ? 'Applet;appletChannel:DingDing' : 'PC_Browser'
		};${newServerGrantId ? `serverGrantId:${newServerGrantId};` : ''}${
			serverGrantId ? `oldServerGrantId:${serverGrantId};` : ''
		}${fingerprint ? `oriDeviceId:${fingerprint}` : ''}`,
		'X-XSRF-TOKEN': xsrfToken,
	}
}

export function getQiankunContainer(subAppName: string, defaultContainer?: Node) {
	if (!inBrowser()) {
		return null
	}
	const targets = document.querySelectorAll(`[data-qiankun^='${subAppName}']`)
	if (!defaultContainer) {
		defaultContainer = document.body
	}
	return targets?.[0] || defaultContainer
}
