/*
https://pre.xtransfer.cn/api/v1/trade/tag/list

request:
{
    "tagEntityType": "AssetBusiness",
    "pageNo": 1,
    "pageSize": 100
}
*/
const MOCK_DATA = {
	list: [
		{ name: '欧洲', code: '4447_', color: '#fa541c', version: 0, tagOwnerType: 'Personal' },
		{ name: '高意向客户', code: '4446_', color: '#fa541c', version: 0, tagOwnerType: 'Personal' },
		{ name: '牛牛', code: '3637_', color: '#fa541c', version: 0, tagOwnerType: 'Personal' },
	],
	total: 3,
	pageNum: 1,
	pageSize: 100,
	pages: 1,
	hasPreviousPage: false,
	hasNextPage: false,
	firstPage: true,
	lastPage: true,
}
