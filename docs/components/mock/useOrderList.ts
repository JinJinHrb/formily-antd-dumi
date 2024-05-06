const MOCK_DATA = [
	{
		orderId: '18990100330000023010500001705',
		orderNo: 'I000000083',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001703',
		orderNo: 'I000000082',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001701',
		orderNo: 'I000000081',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001699',
		orderNo: 'I000000080',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001697',
		orderNo: 'I000000079',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001695',
		orderNo: 'I000000078',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001693',
		orderNo: 'I000000077',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001691',
		orderNo: 'I000000076',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001687',
		orderNo: 'I000000074',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001689',
		orderNo: 'I000000075',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001685',
		orderNo: 'I000000073',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001683',
		orderNo: 'I000000072',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001681',
		orderNo: 'I000000071',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001679',
		orderNo: 'I000000070',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001677',
		orderNo: 'I000000069',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001675',
		orderNo: 'I000000068',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001673',
		orderNo: 'I000000067',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001671',
		orderNo: 'I000000066',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001669',
		orderNo: 'I000000065',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},
	{
		orderId: '18990100330000023010500001663',
		orderNo: 'I000000063',
		orderName: '测试订单勿动',
		firmMemberId: '00990100001000018030101000073',
	},

	// 新生成内容
	{
		orderId: '18990100330000023010500011663',
		orderNo: 'I00000064',
		orderName: '测试订单勿动84',
		firmMemberId: '00990100001000018031101000073',
	},
	{
		orderId: '18990100330000023010500021663',
		orderNo: 'I00000065',
		orderName: '测试订单勿动85',
		firmMemberId: '00990100001000018032101000073',
	},
	{
		orderId: '18990100330000023010500031663',
		orderNo: 'I00000066',
		orderName: '测试订单勿动86',
		firmMemberId: '00990100001000018033101000073',
	},
	{
		orderId: '18990100330000023010500041663',
		orderNo: 'I00000067',
		orderName: '测试订单勿动87',
		firmMemberId: '00990100001000018034101000073',
	},
	{
		orderId: '18990100330000023010500051663',
		orderNo: 'I00000068',
		orderName: '测试订单勿动88',
		firmMemberId: '00990100001000018035101000073',
	},
	{
		orderId: '18990100330000023010500061663',
		orderNo: 'I00000069',
		orderName: '测试订单勿动89',
		firmMemberId: '00990100001000018036101000073',
	},
	{
		orderId: '18990100330000023010500071663',
		orderNo: 'I00000070',
		orderName: '测试订单勿动90',
		firmMemberId: '00990100001000018037101000073',
	},
	{
		orderId: '18990100330000023010500081663',
		orderNo: 'I00000071',
		orderName: '测试订单勿动91',
		firmMemberId: '00990100001000018038101000073',
	},
	{
		orderId: '18990100330000023010500091663',
		orderNo: 'I00000072',
		orderName: '测试订单勿动92',
		firmMemberId: '00990100001000018039101000073',
	},
	{
		orderId: '18990100330000023010500101663',
		orderNo: 'I00000073',
		orderName: '测试订单勿动93',
		firmMemberId: '00990100001000018040101000073',
	},
	{
		orderId: '18990100330000023010500111663',
		orderNo: 'I00000074',
		orderName: '测试订单勿动94',
		firmMemberId: '00990100001000018041101000073',
	},
	{
		orderId: '18990100330000023010500121663',
		orderNo: 'I00000075',
		orderName: '测试订单勿动95',
		firmMemberId: '00990100001000018042101000073',
	},
	{
		orderId: '18990100330000023010500131663',
		orderNo: 'I00000076',
		orderName: '测试订单勿动96',
		firmMemberId: '00990100001000018043101000073',
	},
	{
		orderId: '18990100330000023010500141663',
		orderNo: 'I00000077',
		orderName: '测试订单勿动97',
		firmMemberId: '00990100001000018044101000073',
	},
	{
		orderId: '18990100330000023010500151663',
		orderNo: 'I00000078',
		orderName: '测试订单勿动98',
		firmMemberId: '00990100001000018045101000073',
	},
	{
		orderId: '18990100330000023010500161663',
		orderNo: 'I00000079',
		orderName: '测试订单勿动99',
		firmMemberId: '00990100001000018046101000073',
	},
	{
		orderId: '18990100330000023010500171663',
		orderNo: 'I00000080',
		orderName: '测试订单勿动100',
		firmMemberId: '00990100001000018047101000073',
	},
	{
		orderId: '18990100330000023010500181663',
		orderNo: 'I00000081',
		orderName: '测试订单勿动101',
		firmMemberId: '00990100001000018048101000073',
	},
	{
		orderId: '18990100330000023010500191663',
		orderNo: 'I00000082',
		orderName: '测试订单勿动102',
		firmMemberId: '00990100001000018049101000073',
	},
	{
		orderId: '18990100330000023010500201663',
		orderNo: 'I00000083',
		orderName: '测试订单勿动103',
		firmMemberId: '00990100001000018050101000073',
	},
	{
		orderId: '18990100330000023010500211663',
		orderNo: 'I00000084',
		orderName: '测试订单勿动104',
		firmMemberId: '00990100001000018051101000073',
	},
	{
		orderId: '18990100330000023010500221663',
		orderNo: 'I00000085',
		orderName: '测试订单勿动105',
		firmMemberId: '00990100001000018052101000073',
	},
	{
		orderId: '18990100330000023010500231663',
		orderNo: 'I00000086',
		orderName: '测试订单勿动106',
		firmMemberId: '00990100001000018053101000073',
	},
	{
		orderId: '18990100330000023010500241663',
		orderNo: 'I00000087',
		orderName: '测试订单勿动107',
		firmMemberId: '00990100001000018054101000073',
	},
	{
		orderId: '18990100330000023010500251663',
		orderNo: 'I00000088',
		orderName: '测试订单勿动108',
		firmMemberId: '00990100001000018055101000073',
	},
	{
		orderId: '18990100330000023010500261663',
		orderNo: 'I00000089',
		orderName: '测试订单勿动109',
		firmMemberId: '00990100001000018056101000073',
	},
	{
		orderId: '18990100330000023010500271663',
		orderNo: 'I00000090',
		orderName: '测试订单勿动110',
		firmMemberId: '00990100001000018057101000073',
	},
	{
		orderId: '18990100330000023010500281663',
		orderNo: 'I00000091',
		orderName: '测试订单勿动111',
		firmMemberId: '00990100001000018058101000073',
	},
	{
		orderId: '18990100330000023010500291663',
		orderNo: 'I00000092',
		orderName: '测试订单勿动112',
		firmMemberId: '00990100001000018059101000073',
	},
	{
		orderId: '18990100330000023010500301663',
		orderNo: 'I00000093',
		orderName: '测试订单勿动113',
		firmMemberId: '00990100001000018060101000073',
	},
	{
		orderId: '18990100330000023010500311663',
		orderNo: 'I00000094',
		orderName: '测试订单勿动114',
		firmMemberId: '00990100001000018061101000073',
	},
	{
		orderId: '18990100330000023010500321663',
		orderNo: 'I00000095',
		orderName: '测试订单勿动115',
		firmMemberId: '00990100001000018062101000073',
	},
	{
		orderId: '18990100330000023010500331663',
		orderNo: 'I00000096',
		orderName: '测试订单勿动116',
		firmMemberId: '00990100001000018063101000073',
	},
	{
		orderId: '18990100330000023010500341663',
		orderNo: 'I00000097',
		orderName: '测试订单勿动117',
		firmMemberId: '00990100001000018064101000073',
	},
	{
		orderId: '18990100330000023010500351663',
		orderNo: 'I00000098',
		orderName: '测试订单勿动118',
		firmMemberId: '00990100001000018065101000073',
	},
	{
		orderId: '18990100330000023010500361663',
		orderNo: 'I00000099',
		orderName: '测试订单勿动119',
		firmMemberId: '00990100001000018066101000073',
	},
	{
		orderId: '18990100330000023010500371663',
		orderNo: 'I0000000100',
		orderName: '测试订单勿动120',
		firmMemberId: '00990100001000018067101000073',
	},
	{
		orderId: '18990100330000023010500381663',
		orderNo: 'I0000000101',
		orderName: '测试订单勿动121',
		firmMemberId: '00990100001000018068101000073',
	},
	{
		orderId: '18990100330000023010500391663',
		orderNo: 'I0000000102',
		orderName: '测试订单勿动122',
		firmMemberId: '00990100001000018069101000073',
	},
	{
		orderId: '18990100330000023010500401663',
		orderNo: 'I0000000103',
		orderName: '测试订单勿动123',
		firmMemberId: '00990100001000018070101000073',
	},
	{
		orderId: '18990100330000023010500411663',
		orderNo: 'I0000000104',
		orderName: '测试订单勿动124',
		firmMemberId: '00990100001000018071101000073',
	},
	{
		orderId: '18990100330000023010500421663',
		orderNo: 'I0000000105',
		orderName: '测试订单勿动125',
		firmMemberId: '00990100001000018072101000073',
	},
	{
		orderId: '18990100330000023010500431663',
		orderNo: 'I0000000106',
		orderName: '测试订单勿动126',
		firmMemberId: '00990100001000018073101000073',
	},
	{
		orderId: '18990100330000023010500441663',
		orderNo: 'I0000000107',
		orderName: '测试订单勿动127',
		firmMemberId: '00990100001000018074101000073',
	},
	{
		orderId: '18990100330000023010500451663',
		orderNo: 'I0000000108',
		orderName: '测试订单勿动128',
		firmMemberId: '00990100001000018075101000073',
	},
	{
		orderId: '18990100330000023010500461663',
		orderNo: 'I0000000109',
		orderName: '测试订单勿动129',
		firmMemberId: '00990100001000018076101000073',
	},
	{
		orderId: '18990100330000023010500471663',
		orderNo: 'I0000000110',
		orderName: '测试订单勿动130',
		firmMemberId: '00990100001000018077101000073',
	},
	{
		orderId: '18990100330000023010500481663',
		orderNo: 'I0000000111',
		orderName: '测试订单勿动131',
		firmMemberId: '00990100001000018078101000073',
	},
	{
		orderId: '18990100330000023010500491663',
		orderNo: 'I0000000112',
		orderName: '测试订单勿动132',
		firmMemberId: '00990100001000018079101000073',
	},
	{
		orderId: '18990100330000023010500501663',
		orderNo: 'I0000000113',
		orderName: '测试订单勿动133',
		firmMemberId: '00990100001000018080101000073',
	},
	{
		orderId: '18990100330000023010500511663',
		orderNo: 'I0000000114',
		orderName: '测试订单勿动134',
		firmMemberId: '00990100001000018081101000073',
	},
	{
		orderId: '18990100330000023010500521663',
		orderNo: 'I0000000115',
		orderName: '测试订单勿动135',
		firmMemberId: '00990100001000018082101000073',
	},
	{
		orderId: '18990100330000023010500531663',
		orderNo: 'I0000000116',
		orderName: '测试订单勿动136',
		firmMemberId: '00990100001000018083101000073',
	},
	{
		orderId: '18990100330000023010500541663',
		orderNo: 'I0000000117',
		orderName: '测试订单勿动137',
		firmMemberId: '00990100001000018084101000073',
	},
	{
		orderId: '18990100330000023010500551663',
		orderNo: 'I0000000118',
		orderName: '测试订单勿动138',
		firmMemberId: '00990100001000018085101000073',
	},
	{
		orderId: '18990100330000023010500561663',
		orderNo: 'I0000000119',
		orderName: '测试订单勿动139',
		firmMemberId: '00990100001000018086101000073',
	},
	{
		orderId: '18990100330000023010500571663',
		orderNo: 'I0000000120',
		orderName: '测试订单勿动140',
		firmMemberId: '00990100001000018087101000073',
	},
	{
		orderId: '18990100330000023010500581663',
		orderNo: 'I0000000121',
		orderName: '测试订单勿动141',
		firmMemberId: '00990100001000018088101000073',
	},
	{
		orderId: '18990100330000023010500591663',
		orderNo: 'I0000000122',
		orderName: '测试订单勿动142',
		firmMemberId: '00990100001000018089101000073',
	},
	{
		orderId: '18990100330000023010500601663',
		orderNo: 'I0000000123',
		orderName: '测试订单勿动143',
		firmMemberId: '00990100001000018090101000073',
	},
	{
		orderId: '18990100330000023010500611663',
		orderNo: 'I0000000124',
		orderName: '测试订单勿动144',
		firmMemberId: '00990100001000018091101000073',
	},
	{
		orderId: '18990100330000023010500621663',
		orderNo: 'I0000000125',
		orderName: '测试订单勿动145',
		firmMemberId: '00990100001000018092101000073',
	},
	{
		orderId: '18990100330000023010500631663',
		orderNo: 'I0000000126',
		orderName: '测试订单勿动146',
		firmMemberId: '00990100001000018093101000073',
	},
	{
		orderId: '18990100330000023010500641663',
		orderNo: 'I0000000127',
		orderName: '测试订单勿动147',
		firmMemberId: '00990100001000018094101000073',
	},
	{
		orderId: '18990100330000023010500651663',
		orderNo: 'I0000000128',
		orderName: '测试订单勿动148',
		firmMemberId: '00990100001000018095101000073',
	},
	{
		orderId: '18990100330000023010500661663',
		orderNo: 'I0000000129',
		orderName: '测试订单勿动149',
		firmMemberId: '00990100001000018096101000073',
	},
	{
		orderId: '18990100330000023010500671663',
		orderNo: 'I0000000130',
		orderName: '测试订单勿动150',
		firmMemberId: '00990100001000018097101000073',
	},
	{
		orderId: '18990100330000023010500681663',
		orderNo: 'I0000000131',
		orderName: '测试订单勿动151',
		firmMemberId: '00990100001000018098101000073',
	},
	{
		orderId: '18990100330000023010500691663',
		orderNo: 'I0000000132',
		orderName: '测试订单勿动152',
		firmMemberId: '00990100001000018099101000073',
	},
	{
		orderId: '18990100330000023010500701663',
		orderNo: 'I0000000133',
		orderName: '测试订单勿动153',
		firmMemberId: '00990100001000018100101000073',
	},
	{
		orderId: '18990100330000023010500711663',
		orderNo: 'I0000000134',
		orderName: '测试订单勿动154',
		firmMemberId: '00990100001000018101101000073',
	},
	{
		orderId: '18990100330000023010500721663',
		orderNo: 'I0000000135',
		orderName: '测试订单勿动155',
		firmMemberId: '00990100001000018102101000073',
	},
	{
		orderId: '18990100330000023010500731663',
		orderNo: 'I0000000136',
		orderName: '测试订单勿动156',
		firmMemberId: '00990100001000018103101000073',
	},
	{
		orderId: '18990100330000023010500741663',
		orderNo: 'I0000000137',
		orderName: '测试订单勿动157',
		firmMemberId: '00990100001000018104101000073',
	},
	{
		orderId: '18990100330000023010500751663',
		orderNo: 'I0000000138',
		orderName: '测试订单勿动158',
		firmMemberId: '00990100001000018105101000073',
	},
	{
		orderId: '18990100330000023010500761663',
		orderNo: 'I0000000139',
		orderName: '测试订单勿动159',
		firmMemberId: '00990100001000018106101000073',
	},
	{
		orderId: '18990100330000023010500771663',
		orderNo: 'I0000000140',
		orderName: '测试订单勿动160',
		firmMemberId: '00990100001000018107101000073',
	},
	{
		orderId: '18990100330000023010500781663',
		orderNo: 'I0000000141',
		orderName: '测试订单勿动161',
		firmMemberId: '00990100001000018108101000073',
	},
	{
		orderId: '18990100330000023010500791663',
		orderNo: 'I0000000142',
		orderName: '测试订单勿动162',
		firmMemberId: '00990100001000018109101000073',
	},
	{
		orderId: '18990100330000023010500801663',
		orderNo: 'I0000000143',
		orderName: '测试订单勿动163',
		firmMemberId: '00990100001000018110101000073',
	},
	{
		orderId: '18990100330000023010500811663',
		orderNo: 'I0000000144',
		orderName: '测试订单勿动164',
		firmMemberId: '00990100001000018111101000073',
	},
	{
		orderId: '18990100330000023010500821663',
		orderNo: 'I0000000145',
		orderName: '测试订单勿动165',
		firmMemberId: '00990100001000018112101000073',
	},
	{
		orderId: '18990100330000023010500831663',
		orderNo: 'I0000000146',
		orderName: '测试订单勿动166',
		firmMemberId: '00990100001000018113101000073',
	},
	{
		orderId: '18990100330000023010500841663',
		orderNo: 'I0000000147',
		orderName: '测试订单勿动167',
		firmMemberId: '00990100001000018114101000073',
	},
	{
		orderId: '18990100330000023010500851663',
		orderNo: 'I0000000148',
		orderName: '测试订单勿动168',
		firmMemberId: '00990100001000018115101000073',
	},
	{
		orderId: '18990100330000023010500861663',
		orderNo: 'I0000000149',
		orderName: '测试订单勿动169',
		firmMemberId: '00990100001000018116101000073',
	},
	{
		orderId: '18990100330000023010500871663',
		orderNo: 'I0000000150',
		orderName: '测试订单勿动170',
		firmMemberId: '00990100001000018117101000073',
	},
	{
		orderId: '18990100330000023010500881663',
		orderNo: 'I0000000151',
		orderName: '测试订单勿动171',
		firmMemberId: '00990100001000018118101000073',
	},
	{
		orderId: '18990100330000023010500891663',
		orderNo: 'I0000000152',
		orderName: '测试订单勿动172',
		firmMemberId: '00990100001000018119101000073',
	},
	{
		orderId: '18990100330000023010500901663',
		orderNo: 'I0000000153',
		orderName: '测试订单勿动173',
		firmMemberId: '00990100001000018120101000073',
	},
	{
		orderId: '18990100330000023010500911663',
		orderNo: 'I0000000154',
		orderName: '测试订单勿动174',
		firmMemberId: '00990100001000018121101000073',
	},
	{
		orderId: '18990100330000023010500921663',
		orderNo: 'I0000000155',
		orderName: '测试订单勿动175',
		firmMemberId: '00990100001000018122101000073',
	},
	{
		orderId: '18990100330000023010500931663',
		orderNo: 'I0000000156',
		orderName: '测试订单勿动176',
		firmMemberId: '00990100001000018123101000073',
	},
	{
		orderId: '18990100330000023010500941663',
		orderNo: 'I0000000157',
		orderName: '测试订单勿动177',
		firmMemberId: '00990100001000018124101000073',
	},
	{
		orderId: '18990100330000023010500951663',
		orderNo: 'I0000000158',
		orderName: '测试订单勿动178',
		firmMemberId: '00990100001000018125101000073',
	},
	{
		orderId: '18990100330000023010500961663',
		orderNo: 'I0000000159',
		orderName: '测试订单勿动179',
		firmMemberId: '00990100001000018126101000073',
	},
	{
		orderId: '18990100330000023010500971663',
		orderNo: 'I0000000160',
		orderName: '测试订单勿动180',
		firmMemberId: '00990100001000018127101000073',
	},
	{
		orderId: '18990100330000023010500981663',
		orderNo: 'I0000000161',
		orderName: '测试订单勿动181',
		firmMemberId: '00990100001000018128101000073',
	},
	{
		orderId: '18990100330000023010500991663',
		orderNo: 'I0000000162',
		orderName: '测试订单勿动182',
		firmMemberId: '00990100001000018129101000073',
	},
	{
		orderId: '18990100330000023010501001663',
		orderNo: 'I0000000163',
		orderName: '测试订单勿动183',
		firmMemberId: '00990100001000018130101000073',
	},
]

export type TOrderListResponse = {
	data: {
		orderId: string
		orderNo: string
		orderName: string
		firmMemberId: string
	}[]
	totalCount: number
}

export const listByOrderNo = (orderNo: string, pageNo: number, pageSize: number): Promise<TOrderListResponse> => {
	const mockData = orderNo ? MOCK_DATA.filter(a => a.orderNo === orderNo) : MOCK_DATA
	const data = mockData.slice((pageNo - 1) * pageSize, pageNo * pageSize)
	return new Promise(rsv => {
		setTimeout(() => {
			rsv({
				data,
				totalCount: mockData.length,
			})
		}, 1000)
	})
}

export const useScope = () => {
	/** 根据订单号搜索订单信息 */
	const onSearchOrder = async (orderNo: string, pageNo: number) => {
		const pageSize = 20
		const res = await listByOrderNo(orderNo, pageNo, pageSize)
		const data = res.data.map(item => ({
			...item,
			orderName: `${item.orderNo} - ${item.orderName}`,
			realName: item.orderName,
		}))
		return { data, next: res.totalCount > pageNo * pageSize ? pageNo + 1 : undefined }
	}

	const addHandler = () => {
		alert('创建客户')
	}

	return { onSearchOrder, addHandler }
}
