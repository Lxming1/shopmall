module.exports = {
	plugins: {
		autoprefixer: {},
		"postcss-px-to-viewport": {
			viewportWidth: 375,	//ui设计稿宽度
			viewportHeight: 667,	//ui设计稿高度
			unitPrecision: 5,		//转化后的vw保留的小数位
			unitToConvert: 'px',	//要转化的单位
			viewportUnit: 'vw',		//要转化成哪个单位
			selectorBlackList: ['ignore'],	//指定不转换为视窗单位的类名
			minPixelValue: 1,		//默认值1，小于或等于1px则不进行转换
			mediaQuery: false,	//是否在媒体查询的css代码中也进行转换，默认false
			exclude:[] 	//设置忽略文件，用正则做目录名匹配
		}
	}
}
