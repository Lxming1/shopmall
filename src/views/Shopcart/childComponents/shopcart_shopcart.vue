<template>
<div class="shopCartContent">
  <div v-for="item in this.$store.state.cartList">
    <shopcart_item :shopItem="item" @click.native="cartClick" ref="shopcart"/>
  </div>
</div>
</template>

<script>
import shopcart_item from './shopcart_item'
export default {
  name: "shopcart_shopcart",
  components:{
    shopcart_item
  },
  methods:{
    cartClick(){
      let flag = 0
      const state = this.$store.state.cartList
      state.filter(n =>{
        if(n.checked){
          flag++
          if(flag === state.length){
            this.$bus.$emit('allSelect')
          }
        }else {
          this.$bus.$emit('notAllSelect')
        }
      })
      // for(let item of this.$store.state.cartList){
      //   if(item.checked){
      //     flag++
      //     if(flag === this.$store.state.cartList.length){
      //       this.$bus.$emit('allSelect')
      //     }
      //   }else {
      //     this.$bus.$emit('notAllSelect')
      //   }
      // }
    }
  }
}
</script>

<style scoped>
.shopCartContent{
  background-color: #f1eeef;
  padding: 5px;
}
</style>