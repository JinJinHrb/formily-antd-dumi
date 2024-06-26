import _ from 'lodash-es'
const options = [
	{
		countryZhName: '阿富汗',
		countryCode: 'Afghanistan',
		geoCode: 'AFG',
		areaCode: '93',
	},
	{
		countryZhName: '阿尔巴尼亚',
		countryCode: 'Albania',
		geoCode: 'ALB',
		areaCode: '355',
	},
	{
		countryZhName: '阿尔及利亚',
		countryCode: 'Algeria',
		geoCode: 'DZA',
		areaCode: '213',
	},
	{
		countryZhName: '美属萨摩亚',
		countryCode: 'American Samoa',
		geoCode: 'ASM',
		areaCode: '1684',
	},
	{
		countryZhName: '安道尔',
		countryCode: 'Andorra',
		geoCode: 'AND',
		areaCode: '376',
	},
	{
		countryZhName: '安哥拉',
		countryCode: 'Angola',
		geoCode: 'AGO',
		areaCode: '244',
	},
	{
		countryZhName: '安圭拉',
		countryCode: 'Anguilla',
		geoCode: 'AI',
		areaCode: '1264',
	},
	{
		countryZhName: '南极洲',
		countryCode: 'Antarctica',
		geoCode: 'AQ',
		areaCode: '672',
	},
	{
		countryZhName: '安提瓜和巴布达',
		countryCode: 'Antigua and Barbuda',
		geoCode: 'ATG',
		areaCode: '1268',
	},
	{
		countryZhName: '阿根廷',
		countryCode: 'Argentina',
		geoCode: 'ARG',
		areaCode: '54',
	},
	{
		countryZhName: '亚美尼亚',
		countryCode: 'Armenia',
		geoCode: 'ARM',
		areaCode: '374',
	},
	{
		countryZhName: '阿鲁巴',
		countryCode: 'Aruba',
		geoCode: 'AW',
		areaCode: '297',
	},
	{
		countryZhName: '澳大利亚',
		countryCode: 'Australia',
		geoCode: 'AUS',
		areaCode: '61',
	},
	{
		countryZhName: '奥地利',
		countryCode: 'Austria',
		geoCode: 'AUT',
		areaCode: '43',
	},
	{
		countryZhName: '阿塞拜疆',
		countryCode: 'Azerbaijan',
		geoCode: 'AZE',
		areaCode: '994',
	},
	{
		countryZhName: '巴哈马',
		countryCode: 'Bahamas',
		geoCode: 'BHS',
		areaCode: '1242',
	},
	{
		countryZhName: '巴林',
		countryCode: 'Bahrain',
		geoCode: 'BHR',
		areaCode: '973',
	},
	{
		countryZhName: '孟加拉国',
		countryCode: 'Bangladesh',
		geoCode: 'BGD',
		areaCode: '880',
	},
	{
		countryZhName: '巴巴多斯',
		countryCode: 'Barbados',
		geoCode: 'BRB',
		areaCode: '1246',
	},
	{
		countryZhName: '白俄罗斯',
		countryCode: 'Belarus',
		geoCode: 'BLR',
		areaCode: '375',
	},
	{
		countryZhName: '比利时',
		countryCode: 'Belgium',
		geoCode: 'BEL',
		areaCode: '32',
	},
	{
		countryZhName: '伯利兹',
		countryCode: 'Belize',
		geoCode: 'BLZ',
		areaCode: '501',
	},
	{
		countryZhName: '贝宁',
		countryCode: 'Benin',
		geoCode: 'BEN',
		areaCode: '229',
	},
	{
		countryZhName: '百慕大',
		countryCode: 'Bermuda',
		geoCode: 'BMU',
		areaCode: '1441',
	},
	{
		countryZhName: '不丹',
		countryCode: 'Bhutan',
		geoCode: 'BTN',
		areaCode: '975',
	},
	{
		countryZhName: '玻利维亚',
		countryCode: 'Bolivia',
		geoCode: 'BOL',
		areaCode: '591',
	},
	{
		countryZhName: '波黑',
		countryCode: 'Bosnia and Herzegovina',
		geoCode: 'BIH',
		areaCode: '387',
	},
	{
		countryZhName: '博茨瓦纳',
		countryCode: 'Botswana',
		geoCode: 'BWA',
		areaCode: '267',
	},
	{
		countryZhName: '布韦岛',
		countryCode: 'Bouvet Island',
		geoCode: 'BV',
		areaCode: '47',
	},
	{
		countryZhName: '巴西',
		countryCode: 'Brazil',
		geoCode: 'BRA',
		areaCode: '55',
	},
	{
		countryZhName: '英属印度洋领地',
		countryCode: 'British Indian Ocean Territory',
		geoCode: 'IO',
		areaCode: '44',
	},
	{
		countryZhName: '英属维尔京群岛',
		countryCode: 'British Virgin Islands',
		geoCode: 'VGB',
		areaCode: '1284',
	},
	{
		countryZhName: '文莱',
		countryCode: 'Brunei Darussalam',
		geoCode: 'BRN',
		areaCode: '673',
	},
	{
		countryZhName: '保加利亚',
		countryCode: 'Bulgaria',
		geoCode: 'BGR',
		areaCode: '359',
	},
	{
		countryZhName: '布基纳法索',
		countryCode: 'Burkina Faso',
		geoCode: 'BFA',
		areaCode: '226',
	},
	{
		countryZhName: '布隆迪',
		countryCode: 'Burundi',
		geoCode: 'BDI',
		areaCode: '257',
	},
	{
		countryZhName: '佛得角',
		countryCode: 'Cabo Verde',
		geoCode: 'CPV',
		areaCode: '238',
	},
	{
		countryZhName: '柬埔寨',
		countryCode: 'Cambodia',
		geoCode: 'KHM',
		areaCode: '855',
	},
	{
		countryZhName: '喀麦隆',
		countryCode: 'Cameroon',
		geoCode: 'CMR',
		areaCode: '237',
	},
	{
		countryZhName: '加拿大',
		countryCode: 'Canada',
		geoCode: 'CAN',
		areaCode: '1',
	},
	{
		countryZhName: '开曼群岛',
		countryCode: 'Cayman Islands',
		geoCode: 'CYM',
		areaCode: '1345',
	},
	{
		countryZhName: '中非',
		countryCode: 'Central African Republic',
		geoCode: 'CAF',
		areaCode: '236',
	},
	{
		countryZhName: '乍得',
		countryCode: 'Chad',
		geoCode: 'TCD',
		areaCode: '235',
	},
	{
		countryZhName: '智利',
		countryCode: 'Chile',
		geoCode: 'CHL',
		areaCode: '56',
	},
	{
		countryZhName: '中国大陆',
		countryCode: 'China',
		geoCode: 'CN',
		areaCode: '86',
	},
	{
		countryZhName: '圣诞岛',
		countryCode: 'Christmas Island',
		geoCode: 'CX',
		areaCode: '61',
	},
	{
		countryZhName: '科科斯（基林）群岛',
		countryCode: 'Cocos (Keeling) Islands',
		geoCode: 'CC',
		areaCode: '61',
	},
	{
		countryZhName: '哥伦比亚',
		countryCode: 'Colombia',
		geoCode: 'COL',
		areaCode: '57',
	},
	{
		countryZhName: '科摩罗',
		countryCode: 'Comoros',
		geoCode: 'COM',
		areaCode: '269',
	},
	{
		countryZhName: '刚果共和国',
		countryCode: 'Congo',
		geoCode: 'COG',
		areaCode: '242',
	},
	{
		countryZhName: '库克群岛',
		countryCode: 'Cook Islands',
		geoCode: 'CK',
		areaCode: '682',
	},
	{
		countryZhName: '哥斯达黎加',
		countryCode: 'Costa Rica',
		geoCode: 'CRI',
		areaCode: '506',
	},
	{
		countryZhName: '克罗地亚',
		countryCode: 'Croatia',
		geoCode: 'HRV',
		areaCode: '385',
	},
	{
		countryZhName: '古巴',
		countryCode: 'Cuba',
		geoCode: 'CUB',
		areaCode: '53',
	},
	{
		countryZhName: '库拉索',
		countryCode: 'Curaçao',
		geoCode: 'CW',
		areaCode: '599',
	},
	{
		countryZhName: '塞浦路斯',
		countryCode: 'Cyprus',
		geoCode: 'CYP',
		areaCode: '357',
	},
	{
		countryZhName: '捷克',
		countryCode: 'Czechia',
		geoCode: 'CZE',
		areaCode: '420',
	},
	{
		countryZhName: '科特迪瓦',
		countryCode: "Côte d'Ivoire",
		geoCode: 'CIV',
		areaCode: '225',
	},
	{
		countryZhName: '丹麦',
		countryCode: 'Denmark',
		geoCode: 'DNK',
		areaCode: '45',
	},
	{
		countryZhName: '吉布提',
		countryCode: 'Djibouti',
		geoCode: 'DJI',
		areaCode: '253',
	},
	{
		countryZhName: '多米尼克',
		countryCode: 'Dominica',
		geoCode: 'DMA',
		areaCode: '1767',
	},
	{
		countryZhName: '多米尼加',
		countryCode: 'Dominican Republic',
		geoCode: 'DOM',
		areaCode: '1809',
	},
	{
		countryZhName: '东帝汶',
		countryCode: 'East Timor',
		geoCode: 'TLS',
		areaCode: '670',
	},
	{
		countryZhName: '厄瓜多尔',
		countryCode: 'Ecuador',
		geoCode: 'ECU',
		areaCode: '593',
	},
	{
		countryZhName: '埃及',
		countryCode: 'Egypt',
		geoCode: 'EGY',
		areaCode: '20',
	},
	{
		countryZhName: '萨尔瓦多',
		countryCode: 'El Salvador',
		geoCode: 'SLV',
		areaCode: '503',
	},
	{
		countryZhName: '赤道几内亚',
		countryCode: 'Equatorial Guinea',
		geoCode: 'GNQ',
		areaCode: '240',
	},
	{
		countryZhName: '厄立特里亚',
		countryCode: 'Eritrea',
		geoCode: 'ERI',
		areaCode: '291',
	},
	{
		countryZhName: '爱沙尼亚',
		countryCode: 'Estonia',
		geoCode: 'EST',
		areaCode: '372',
	},
	{
		countryZhName: '斯威士兰',
		countryCode: 'Eswatini',
		geoCode: 'SWZ',
		areaCode: '268',
	},
	{
		countryZhName: '埃塞俄比亚',
		countryCode: 'Ethiopia',
		geoCode: 'ETH',
		areaCode: '251',
	},
	{
		countryZhName: '福克兰群岛',
		countryCode: 'Falkland Islands',
		geoCode: 'FK',
		areaCode: '500',
	},
	{
		countryZhName: '法罗群岛',
		countryCode: 'Faroe Islands',
		geoCode: 'FRO',
		areaCode: '298',
	},
	{
		countryZhName: '斐济',
		countryCode: 'Fiji',
		geoCode: 'FJI',
		areaCode: '679',
	},
	{
		countryZhName: '芬兰',
		countryCode: 'Finland',
		geoCode: 'FIN',
		areaCode: '358',
	},
	{
		countryZhName: '法国',
		countryCode: 'France',
		geoCode: 'FRA',
		areaCode: '33',
	},
	{
		countryZhName: '法属圭亚那',
		countryCode: 'French Guiana',
		geoCode: 'GUF',
		areaCode: '594',
	},
	{
		countryZhName: '法属波利尼西亚',
		countryCode: 'French Polynesia',
		geoCode: 'PYF',
		areaCode: '689',
	},
	{
		countryZhName: '加蓬',
		countryCode: 'Gabon',
		geoCode: 'GAB',
		areaCode: '241',
	},
	{
		countryZhName: '冈比亚',
		countryCode: 'Gambia',
		geoCode: 'GMB',
		areaCode: '220',
	},
	{
		countryZhName: '格鲁吉亚',
		countryCode: 'Georgia',
		geoCode: 'GEO',
		areaCode: '995',
	},
	{
		countryZhName: '德国',
		countryCode: 'Germany',
		geoCode: 'DEU',
		areaCode: '49',
	},
	{
		countryZhName: '加纳',
		countryCode: 'Ghana',
		geoCode: 'GHA',
		areaCode: '233',
	},
	{
		countryZhName: '直布罗陀',
		countryCode: 'Gibraltar',
		geoCode: 'GI',
		areaCode: '350',
	},
	{
		countryZhName: '希腊',
		countryCode: 'Greece',
		geoCode: 'GRC',
		areaCode: '30',
	},
	{
		countryZhName: '格陵兰',
		countryCode: 'Greenland',
		geoCode: 'GRL',
		areaCode: '299',
	},
	{
		countryZhName: '格林纳达',
		countryCode: 'Grenada',
		geoCode: 'GRD',
		areaCode: '1473',
	},
	{
		countryZhName: '瓜德罗普',
		countryCode: 'Guadeloupe',
		geoCode: 'GLP',
		areaCode: '590',
	},
	{
		countryZhName: '关岛',
		countryCode: 'Guam',
		geoCode: 'GUM',
		areaCode: '1671',
	},
	{
		countryZhName: '危地马拉',
		countryCode: 'Guatemala',
		geoCode: 'GTM',
		areaCode: '502',
	},
	{
		countryZhName: '根西',
		countryCode: 'Guernsey',
		geoCode: 'GGY',
		areaCode: '1481',
	},
	{
		countryZhName: '几内亚比绍',
		countryCode: 'Guinea',
		geoCode: 'GNB',
		areaCode: 'Bissau',
	},
	{
		countryZhName: '几内亚',
		countryCode: 'Guinea',
		geoCode: 'GIN',
		areaCode: '224',
	},
	{
		countryZhName: '圭亚那',
		countryCode: 'Guyana',
		geoCode: 'GUY',
		areaCode: '592',
	},
	{
		countryZhName: '海地',
		countryCode: 'Haiti',
		geoCode: 'HTI',
		areaCode: '509',
	},
	{
		countryZhName: '洪都拉斯',
		countryCode: 'Honduras',
		geoCode: 'HND',
		areaCode: '504',
	},
	{
		countryZhName: '香港（中国）',
		countryCode: 'Hong Kong (China)',
		geoCode: 'HK',
		areaCode: '852',
	},
	{
		countryZhName: '匈牙利',
		countryCode: 'Hungary',
		geoCode: 'HUN',
		areaCode: '36',
	},
	{
		countryZhName: '冰岛',
		countryCode: 'Iceland',
		geoCode: 'ISL',
		areaCode: '354',
	},
	{
		countryZhName: '印度',
		countryCode: 'India',
		geoCode: 'IND',
		areaCode: '91',
	},
	{
		countryZhName: '印尼',
		countryCode: 'Indonesia',
		geoCode: 'IDN',
		areaCode: '62',
	},
	{
		countryZhName: '伊朗',
		countryCode: 'Iran',
		geoCode: 'IRN',
		areaCode: '98',
	},
	{
		countryZhName: '伊拉克',
		countryCode: 'Iraq',
		geoCode: 'IRQ',
		areaCode: '964',
	},
	{
		countryZhName: '爱尔兰',
		countryCode: 'Ireland',
		geoCode: 'IRL',
		areaCode: '353',
	},
	{
		countryZhName: '马恩岛',
		countryCode: 'Isle of Man',
		geoCode: 'IMN',
		areaCode: '44',
	},
	{
		countryZhName: '以色列',
		countryCode: 'Israel',
		geoCode: 'ISR',
		areaCode: '972',
	},
	{
		countryZhName: '意大利',
		countryCode: 'Italy',
		geoCode: 'ITA',
		areaCode: '39',
	},
	{
		countryZhName: '牙买加',
		countryCode: 'Jamaica',
		geoCode: 'JAM',
		areaCode: '1876',
	},
	{
		countryZhName: '日本',
		countryCode: 'Japan',
		geoCode: 'JPN',
		areaCode: '81',
	},
	{
		countryZhName: '泽西',
		countryCode: 'Jersey',
		geoCode: 'JEY',
		areaCode: '44',
	},
	{
		countryZhName: '约旦',
		countryCode: 'Jordan',
		geoCode: 'JOR',
		areaCode: '962',
	},
	{
		countryZhName: '哈萨克斯坦',
		countryCode: 'Kazakhstan',
		geoCode: 'KAZ',
		areaCode: '73',
	},
	{
		countryZhName: '肯尼亚',
		countryCode: 'Kenya',
		geoCode: 'KEN',
		areaCode: '254',
	},
	{
		countryZhName: '基里巴斯',
		countryCode: 'Kiribati',
		geoCode: 'KI',
		areaCode: '686',
	},
	{
		countryZhName: '科威特',
		countryCode: 'Kuwait',
		geoCode: 'KWT',
		areaCode: '965',
	},
	{
		countryZhName: '吉尔吉斯斯坦',
		countryCode: 'Kyrgyzstan',
		geoCode: 'KGZ',
		areaCode: '996',
	},
	{
		countryZhName: '老挝',
		countryCode: 'Laos',
		geoCode: 'LAO',
		areaCode: '856',
	},
	{
		countryZhName: '拉脱维亚',
		countryCode: 'Latvia',
		geoCode: 'LVA',
		areaCode: '371',
	},
	{
		countryZhName: '黎巴嫩',
		countryCode: 'Lebanon',
		geoCode: 'LBN',
		areaCode: '961',
	},
	{
		countryZhName: '莱索托',
		countryCode: 'Lesotho',
		geoCode: 'LSO',
		areaCode: '266',
	},
	{
		countryZhName: '利比里亚',
		countryCode: 'Liberia',
		geoCode: 'LBR',
		areaCode: '231',
	},
	{
		countryZhName: '利比亚',
		countryCode: 'Libya',
		geoCode: 'LBY',
		areaCode: '218',
	},
	{
		countryZhName: '列支敦士登',
		countryCode: 'Liechtenstein',
		geoCode: 'LIE',
		areaCode: '423',
	},
	{
		countryZhName: '立陶宛',
		countryCode: 'Lithuania',
		geoCode: 'LTU',
		areaCode: '370',
	},
	{
		countryZhName: '卢森堡',
		countryCode: 'Luxembourg',
		geoCode: 'LUX',
		areaCode: '352',
	},
	{
		countryZhName: '澳门（中国）',
		countryCode: 'Macao (China)',
		geoCode: 'MA',
		areaCode: '853',
	},
	{
		countryZhName: '马达加斯加',
		countryCode: 'Madagascar',
		geoCode: 'MDG',
		areaCode: '261',
	},
	{
		countryZhName: '马拉维',
		countryCode: 'Malawi',
		geoCode: 'MWI',
		areaCode: '265',
	},
	{
		countryZhName: '马来西亚',
		countryCode: 'Malaysia',
		geoCode: 'MYS',
		areaCode: '60',
	},
	{
		countryZhName: '马尔代夫',
		countryCode: 'Maldives',
		geoCode: 'MV',
		areaCode: '960',
	},
	{
		countryZhName: '马里',
		countryCode: 'Mali',
		geoCode: 'MLI',
		areaCode: '223',
	},
	{
		countryZhName: '马耳他',
		countryCode: 'Malta',
		geoCode: 'MLT',
		areaCode: '356',
	},
	{
		countryZhName: '马绍尔群岛',
		countryCode: 'Marshall Islands',
		geoCode: 'MH',
		areaCode: '692',
	},
	{
		countryZhName: '马提尼克',
		countryCode: 'Martinique',
		geoCode: 'MTQ',
		areaCode: '596',
	},
	{
		countryZhName: '毛里塔尼亚',
		countryCode: 'Mauritania',
		geoCode: 'MRT',
		areaCode: '222',
	},
	{
		countryZhName: '毛里求斯',
		countryCode: 'Mauritius',
		geoCode: 'MUS',
		areaCode: '230',
	},
	{
		countryZhName: '马约特',
		countryCode: 'Mayotte',
		geoCode: 'MYT',
		areaCode: '269',
	},
	{
		countryZhName: '墨西哥',
		countryCode: 'Mexico',
		geoCode: 'MEX',
		areaCode: '52',
	},
	{
		countryZhName: '摩纳哥',
		countryCode: 'Monaco',
		geoCode: 'MC',
		areaCode: '377',
	},
	{
		countryZhName: '蒙古',
		countryCode: 'Mongolia',
		geoCode: 'MNG',
		areaCode: '976',
	},
	{
		countryZhName: '黑山',
		countryCode: 'Montenegro',
		geoCode: 'MNE',
		areaCode: '382',
	},
	{
		countryZhName: '蒙特塞拉特',
		countryCode: 'Montserrat',
		geoCode: 'MSR',
		areaCode: '1664',
	},
	{
		countryZhName: '摩洛哥',
		countryCode: 'Morocco',
		geoCode: 'MAR',
		areaCode: '212',
	},
	{
		countryZhName: '莫桑比克',
		countryCode: 'Mozambique',
		geoCode: 'MOZ',
		areaCode: '258',
	},
	{
		countryZhName: '缅甸',
		countryCode: 'Myanmar',
		geoCode: 'MMR',
		areaCode: '95',
	},
	{
		countryZhName: '纳米比亚',
		countryCode: 'Namibia',
		geoCode: 'NAM',
		areaCode: '264',
	},
	{
		countryZhName: '瑙鲁',
		countryCode: 'Nauru',
		geoCode: 'NRU',
		areaCode: '674',
	},
	{
		countryZhName: '尼泊尔',
		countryCode: 'Nepal',
		geoCode: 'NPL',
		areaCode: '977',
	},
	{
		countryZhName: '荷兰',
		countryCode: 'Netherlands',
		geoCode: 'NLD',
		areaCode: '31',
	},
	{
		countryZhName: '新喀里多尼亚',
		countryCode: 'New Caledonia',
		geoCode: 'NCL',
		areaCode: '687',
	},
	{
		countryZhName: '新西兰',
		countryCode: 'New Zealand',
		geoCode: 'NZL',
		areaCode: '64',
	},
	{
		countryZhName: '尼加拉瓜',
		countryCode: 'Nicaragua',
		geoCode: 'NIC',
		areaCode: '505',
	},
	{
		countryZhName: '尼日尔',
		countryCode: 'Niger',
		geoCode: 'NER',
		areaCode: '227',
	},
	{
		countryZhName: '尼日利亚',
		countryCode: 'Nigeria',
		geoCode: 'NGA',
		areaCode: '234',
	},
	{
		countryZhName: '纽埃',
		countryCode: 'Niue',
		geoCode: 'NU',
		areaCode: '683',
	},
	{
		countryZhName: '诺福克岛',
		countryCode: 'Norfolk Island',
		geoCode: 'NF',
		areaCode: '6723',
	},
	{
		countryZhName: '朝鲜',
		countryCode: 'North Korea',
		geoCode: 'PRK',
		areaCode: '850',
	},
	{
		countryZhName: '北马其顿',
		countryCode: 'North Macedonia',
		geoCode: 'MKD',
		areaCode: '389',
	},
	{
		countryZhName: '北马里亚纳群岛',
		countryCode: 'Northern Mariana Islands',
		geoCode: 'MNP',
		areaCode: '1670',
	},
	{
		countryZhName: '挪威',
		countryCode: 'Norway',
		geoCode: 'NOR',
		areaCode: '47',
	},
	{
		countryZhName: '阿曼',
		countryCode: 'Oman',
		geoCode: 'OMN',
		areaCode: '968',
	},
	{
		countryZhName: '巴基斯坦',
		countryCode: 'Pakistan',
		geoCode: 'PAK',
		areaCode: '92',
	},
	{
		countryZhName: '帕劳',
		countryCode: 'Palau',
		geoCode: 'PLW',
		areaCode: '680',
	},
	{
		countryZhName: '巴拿马',
		countryCode: 'Panama',
		geoCode: 'PAN',
		areaCode: '507',
	},
	{
		countryZhName: '巴布亚新几内亚',
		countryCode: 'Papua New Guinea',
		geoCode: 'PNG',
		areaCode: '675',
	},
	{
		countryZhName: '巴拉圭',
		countryCode: 'Paraguay',
		geoCode: 'PRY',
		areaCode: '595',
	},
	{
		countryZhName: '秘鲁',
		countryCode: 'Peru',
		geoCode: 'PER',
		areaCode: '51',
	},
	{
		countryZhName: '菲律宾',
		countryCode: 'Philippines',
		geoCode: 'PHL',
		areaCode: '63',
	},
	{
		countryZhName: '波兰',
		countryCode: 'Poland',
		geoCode: 'POL',
		areaCode: '48',
	},
	{
		countryZhName: '葡萄牙',
		countryCode: 'Portugal',
		geoCode: 'PRT',
		areaCode: '351',
	},
	{
		countryZhName: '波多黎各',
		countryCode: 'Puerto Rico',
		geoCode: 'PRI',
		areaCode: '1787',
	},
	{
		countryZhName: '卡塔尔',
		countryCode: 'Qatar',
		geoCode: 'QAT',
		areaCode: '974',
	},
	{
		countryZhName: '摩尔多瓦',
		countryCode: 'Republic of Moldova',
		geoCode: 'MDA',
		areaCode: '373',
	},
	{
		countryZhName: '罗马尼亚',
		countryCode: 'Romania',
		geoCode: 'ROU',
		areaCode: '40',
	},
	{
		countryZhName: '俄罗斯',
		countryCode: 'Russia',
		geoCode: 'RUS',
		areaCode: '7',
	},
	{
		countryZhName: '卢旺达',
		countryCode: 'Rwanda',
		geoCode: 'RWA',
		areaCode: '250',
	},
	{
		countryZhName: '留尼汪',
		countryCode: 'Réunion',
		geoCode: 'REU',
		areaCode: '262',
	},
	{
		countryZhName: '圣基茨和尼维斯',
		countryCode: 'Saint Kitts and Nevis',
		geoCode: 'KNA',
		areaCode: '1869',
	},
	{
		countryZhName: '圣卢西亚',
		countryCode: 'Saint Lucia',
		geoCode: 'LCA',
		areaCode: '1758',
	},
	{
		countryZhName: '圣皮埃尔和密克隆',
		countryCode: 'Saint Pierre and Miquelon',
		geoCode: 'SPM',
		areaCode: '508',
	},
	{
		countryZhName: '圣文森特和格林纳丁斯',
		countryCode: 'Saint Vincent and the Grenadines',
		geoCode: 'VCT',
		areaCode: '1784',
	},
	{
		countryZhName: '萨摩亚',
		countryCode: 'Samoa',
		geoCode: 'WSM',
		areaCode: '685',
	},
	{
		countryZhName: '圣马力诺',
		countryCode: 'San Marino',
		geoCode: 'SMR',
		areaCode: '378',
	},
	{
		countryZhName: '沙特阿拉伯',
		countryCode: 'Saudi Arabia',
		geoCode: 'SAU',
		areaCode: '966',
	},
	{
		countryZhName: '塞内加尔',
		countryCode: 'Senegal',
		geoCode: 'SEN',
		areaCode: '221',
	},
	{
		countryZhName: '塞尔维亚',
		countryCode: 'Serbia',
		geoCode: 'SRB',
		areaCode: '381',
	},
	{
		countryZhName: '塞舌尔',
		countryCode: 'Seychelles',
		geoCode: 'SYC',
		areaCode: '248',
	},
	{
		countryZhName: '塞拉利昂',
		countryCode: 'Sierra Leone',
		geoCode: 'SLE',
		areaCode: '232',
	},
	{
		countryZhName: '新加坡',
		countryCode: 'Singapore',
		geoCode: 'SGP',
		areaCode: '65',
	},
	{
		countryZhName: '斯洛伐克',
		countryCode: 'Slovakia',
		geoCode: 'SVK',
		areaCode: '421',
	},
	{
		countryZhName: '斯洛文尼亚',
		countryCode: 'Slovenia',
		geoCode: 'SVN',
		areaCode: '386',
	},
	{
		countryZhName: '所罗门群岛',
		countryCode: 'Solomon Islands',
		geoCode: 'SLB',
		areaCode: '677',
	},
	{
		countryZhName: '索马里',
		countryCode: 'Somalia',
		geoCode: 'SOM',
		areaCode: '252',
	},
	{
		countryZhName: '南非',
		countryCode: 'South Africa',
		geoCode: 'ZAF',
		areaCode: '27',
	},
	{
		countryZhName: '韩国',
		countryCode: 'South Korea',
		geoCode: 'KOR',
		areaCode: '82',
	},
	{
		countryZhName: '南苏丹',
		countryCode: 'South Sudan',
		geoCode: 'SSD',
		areaCode: '211',
	},
	{
		countryZhName: '西班牙',
		countryCode: 'Spain',
		geoCode: 'ESP',
		areaCode: '34',
	},
	{
		countryZhName: '斯里兰卡',
		countryCode: 'Sri Lanka',
		geoCode: 'LKA',
		areaCode: '94',
	},
	{
		countryZhName: '巴勒斯坦',
		countryCode: 'State of Palestine',
		geoCode: 'PSE',
		areaCode: '970',
	},
	{
		countryZhName: '苏丹',
		countryCode: 'Sudan',
		geoCode: 'SDN',
		areaCode: '249',
	},
	{
		countryZhName: '苏里南',
		countryCode: 'Suriname',
		geoCode: 'SUR',
		areaCode: '597',
	},
	{
		countryZhName: '斯瓦尔巴和扬马延',
		countryCode: 'Svalbard and Jan Mayen',
		geoCode: 'SJM',
		areaCode: '47',
	},
	{
		countryZhName: '瑞典',
		countryCode: 'Sweden',
		geoCode: 'SWE',
		areaCode: '46',
	},
	{
		countryZhName: '瑞士',
		countryCode: 'Switzerland',
		geoCode: 'CHE',
		areaCode: '41',
	},
	{
		countryZhName: '叙利亚',
		countryCode: 'Syria',
		geoCode: 'SYR',
		areaCode: '963',
	},
	{
		countryZhName: '圣多美和普林西比',
		countryCode: 'São Tomé and Príncipe',
		geoCode: 'STP',
		areaCode: '239',
	},
	{
		countryZhName: '台湾（中国）',
		countryCode: 'Taiwan (China)',
		geoCode: 'TW',
		areaCode: '886',
	},
	{
		countryZhName: '塔吉克斯坦',
		countryCode: 'Tajikistan',
		geoCode: 'TJK',
		areaCode: '992',
	},
	{
		countryZhName: '坦桑尼亚',
		countryCode: 'Tanzania',
		geoCode: 'TZA',
		areaCode: '255',
	},
	{
		countryZhName: '泰国',
		countryCode: 'Thailand',
		geoCode: 'THA',
		areaCode: '66',
	},
	{
		countryZhName: '刚果民主共和国',
		countryCode: 'The Democratic Republic of the Congo',
		geoCode: 'COD',
		areaCode: '243',
	},
	{
		countryZhName: '密克罗尼西亚联邦',
		countryCode: 'The Federated States of Micronesia',
		geoCode: 'FSM',
		areaCode: '691',
	},
	{
		countryZhName: '多哥',
		countryCode: 'Togo',
		geoCode: 'TGO',
		areaCode: '228',
	},
	{
		countryZhName: '托克劳',
		countryCode: 'Tokelau',
		geoCode: 'TKL',
		areaCode: '690',
	},
	{
		countryZhName: '汤加',
		countryCode: 'Tonga',
		geoCode: 'TON',
		areaCode: '676',
	},
	{
		countryZhName: '特立尼达和多巴哥',
		countryCode: 'Trinidad and Tobago',
		geoCode: 'TTO',
		areaCode: '1868',
	},
	{
		countryZhName: '突尼斯',
		countryCode: 'Tunisia',
		geoCode: 'TUN',
		areaCode: '216',
	},
	{
		countryZhName: '土耳其',
		countryCode: 'Turkey',
		geoCode: 'TUR',
		areaCode: '90',
	},
	{
		countryZhName: '土库曼斯坦',
		countryCode: 'Turkmenistan',
		geoCode: 'TKM',
		areaCode: '993',
	},
	{
		countryZhName: '特克斯和凯科斯群岛',
		countryCode: 'Turks and Caicos Islands',
		geoCode: 'TCA',
		areaCode: '1649',
	},
	{
		countryZhName: '图瓦卢',
		countryCode: 'Tuvalu',
		geoCode: 'TUV',
		areaCode: '688',
	},
	{
		countryZhName: '乌干达',
		countryCode: 'Uganda',
		geoCode: 'UGA',
		areaCode: '256',
	},
	{
		countryZhName: '乌克兰',
		countryCode: 'Ukraine',
		geoCode: 'UKR',
		areaCode: '380',
	},
	{
		countryZhName: '阿联酋',
		countryCode: 'United Arab Emirates',
		geoCode: 'ARE',
		areaCode: '971',
	},
	{
		countryZhName: '英国',
		countryCode: 'United Kingdom',
		geoCode: 'GBR',
		areaCode: '44',
	},
	{
		countryZhName: '美国本土外小岛屿',
		countryCode: 'United States Minor Outlying Islands',
		geoCode: 'UMI',
		areaCode: '1',
	},
	{
		countryZhName: '美国',
		countryCode: 'United States of America',
		geoCode: 'USA',
		areaCode: '1',
	},
	{
		countryZhName: '美属维尔京群岛',
		countryCode: 'United States Virgin Islands',
		geoCode: 'VIR',
		areaCode: '1340',
	},
	{
		countryZhName: '乌拉圭',
		countryCode: 'Uruguay',
		geoCode: 'URY',
		areaCode: '598',
	},
	{
		countryZhName: '乌兹别克斯坦',
		countryCode: 'Uzbekistan',
		geoCode: 'UZB',
		areaCode: '998',
	},
	{
		countryZhName: '瓦努阿图',
		countryCode: 'Vanuatu',
		geoCode: 'VUT',
		areaCode: '678',
	},
	{
		countryZhName: '梵蒂冈',
		countryCode: 'Vatican City State',
		geoCode: 'VA',
		areaCode: '379',
	},
	{
		countryZhName: '委内瑞拉',
		countryCode: 'Venezuela',
		geoCode: 'VEN',
		areaCode: '58',
	},
	{
		countryZhName: '越南',
		countryCode: 'Viet Nam',
		geoCode: 'VNM',
		areaCode: '84',
	},
	{
		countryZhName: '瓦利斯和富图纳',
		countryCode: 'Wallis and Futuna',
		geoCode: 'WLF',
		areaCode: '681',
	},
	{
		countryZhName: '也门',
		countryCode: 'Yemen',
		geoCode: 'YEM',
		areaCode: '967',
	},
	{
		countryZhName: '赞比亚',
		countryCode: 'Zambia',
		geoCode: 'ZMB',
		areaCode: '260',
	},
	{
		countryZhName: '津巴布韦',
		countryCode: 'Zimbabwe',
		geoCode: 'ZWE',
		areaCode: '263',
	},
	{
		countryZhName: '圣赫勒拿、阿森松和特里斯坦',
		countryCode: '达库尼亚',
		geoCode: 'SHN',
		areaCode: 'Saint Helena, Ascension and Tristan da Cunha',
	},
]

export default _.uniqBy(options, function (e) {
	return e.geoCode
}).filter(a => /^\d+$/.test(a.areaCode))
