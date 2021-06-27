import {request} from './request'

export function getDetailMes(iid){
	return request({
		url: '/detail',
		params:{
			iid
		}
	})
}

export function getRecommendMes(){
	return request({
		url: '/recommend'
	})
}

export class Goods {
	constructor(Info) {
		this.swiperImg = Info.itemInfo.topImages
		this.title = Info.itemInfo.title
		this.newPrice = Info.itemInfo.price
		this.oldPrice = Info.itemInfo.oldPrice
		this.realPrice = Info.itemInfo.lowNowPrice
		this.discountBgColor = Info.itemInfo.discountBgColor
		this.discountDesc = Info.itemInfo.discountDesc
		this.columns = Info.columns
		this.services = Info.shopInfo.services
		this.desc = Info.itemInfo.desc
	}
}
export class Shop{
	constructor(Info) {
		this.name = Info.shopInfo.name
		this.goodsCount = Info.shopInfo.cGoods
		this.logo = Info.shopInfo.shopLogo
		this.url = Info.shopInfo.shopUrl
		this.fans = Info.shopInfo.cFans;
		this.sells = Info.shopInfo.cSells;
		this.score = Info.shopInfo.score;
	}
}