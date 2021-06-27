export const cNavBackTop = {
	data(){
		return {
			navFlag: 0
		}
	},
	methods:{
		//用户在300ms内点击两次navbar，即可回到顶部
		navBarClick(){
			setTimeout(() =>{
				if(this.navFlag > 1){
					this.backClick()
				}
				this.navFlag = 0
			},300)
			this.navFlag++
		},
		backClick(){
			this.$refs.scroll.scrollTo(0, 0, 200)
		},
	}
}
import backtop from 'components/content/backtop/backtop'
export const backTop = {
	components:{
		backtop
	},
	methods:{
		backClick() {
			this.$refs.scroll.scrollTo(0,0,200)
		}
	}
}

export const notMes = {
	methods:{
		notMes(){
			this.$toast.show('无数据', 1000)
		}
	}
}

export const tabCon ={
	data(){
		return{
			currentType: 'pop'
		}
	},
	methods:{
		//点击tabContral时监听点了哪个并赋值对应的type
		tabClick(index){
			switch (index){
				case 0:
					this.currentType = 'pop'
					break
				case 1:
					this.currentType = 'new'
					break
				case 2:
					this.currentType = 'sell'
					break
			}
			this.$refs.tabcon1.isIndex = index
			this.$refs.tabcon2.isIndex = index
			if(-this.$refs.scroll.bscroll.y >= this.tabOffsetTop){
				this.$refs.scroll.scrollTo(0,-this.tabOffsetTop,150)
			}
		},
	}
}