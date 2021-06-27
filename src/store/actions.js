export const actions =  {
	addCart(context, payload){
		return new Promise((resolve, reject)=>{
			let oldProd = context.state.cartList.find(n => n.id === payload.id)
			if (oldProd){
				// oldProd.count ++
				context.commit('addCounter', oldProd)
				resolve('当前商品数量+1')
			}else {
				payload.count = 1
				// context.state.cartList.push(payload)
				context.commit('addToCart', payload)
				resolve('添加购物车成功')
			}
		})
	}
}