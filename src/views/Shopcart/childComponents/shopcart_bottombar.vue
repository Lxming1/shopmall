<template>
  <div class="shopBottomBar">
    <div class="bottomleft">
      <div :class="{bottomleftItem: true, active: isActive}" @click="barBtn">
        <img src="@/assets/img/cart/tick.svg" alt="">
      </div>
      <span @click="barBtn">全选</span>
    </div>
    <div class="bottomcenter">
      <div>合计:<span class="price">￥{{getAllPrice}}</span></div>
    </div>
    <div class="countBtn" v-if="isSet" @click="commit">
      <div class="btn">结算{{getCount}}</div>
    </div>
    <div class="countBtn" v-else @click="selectDelete">
      <div class="btn">删除{{getCount}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopcart_bottombar",
  props:{
    isSet:{
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      isActive: true,
      isClick: true
    }
  },
  activated() {
    this.judge()
  },
  computed:{
    getAllPrice(){
      return this.$store.state.cartList.filter(n =>{
        return n.checked === true
      }).reduce((pre, n) =>{
        return pre + n.count * n.price
      },0).toFixed(2)
    },
    getCount(){
      const state = this.$store.state.cartList.filter(n => n.checked === true).length
      if(state === 0){
        return ''
      }else {
        return '(' + state + ')'
      }
    }
  },
  mounted() {
    this.$bus.$on('allSelect',()=>{
      this.isActive = false
    })
    this.$bus.$on('notAllSelect', ()=>{
      this.isActive = true
    })
  },
  methods:{
    //全选按钮
    barBtn(){
      const state = this.$store.state.cartList
      if(!this.isActive){
        state.map(n => n.checked = false)
      }else {
        state.map(n => n.checked = true)
      }
      this.isActive = !this.isActive
    },
    //删除按钮
    selectDelete(){
      this.showToast()
      const state = this.$store.state.cartList
      if(state.length && state.filter(n => n.checked).length){
        this.$toast.show('删除成功!',1000)
      }
      this.$store.state.cartList = state.filter(n =>{
        return n.checked === false
      })
      this.judge()
    },
    //结算按钮
    commit(){
      this.showToast()
    },
    //展示Toast
    showToast(){
      if(this.$store.state.cartList.filter(n => n.checked === true).length === 0){
        if(this.isClick){
          this.isClick = false
          this.$toast.show('您还没有选择宝贝哦!', 1500)
          setTimeout(()=>{
            this.isClick = true
          },1500)
        }
      }
    },
    //判断有无商品，若无商品则不触发全选按钮
    judge(){
      const state = this.$store.state.cartList
      if(!state.filter(n => n.checked).length){
        this.isActive = true
      }else if(state.filter(n => n.checked).length === state.length){
        this.isActive = false
      }
    },
  }
}
</script>

<style scoped>
.shopBottomBar{
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 50px;
  padding: 0 10px;
  box-shadow: 0 -1px 1px rgba(100,100,100,.1);
  background-color: #f8f8f8;
  height: 50px;
  line-height: 50px;
}
.bottomleft{
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 13px;
}
.bottomleftItem{
  background-color: #ff8198;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  border: 1px solid #d5d4d4;
  display: flex;
  margin-right: 4px;
  margin-left: 5px;
}
.bottomcenter{
  position: absolute;
  right: 100px;
  font-size: 14px;
  line-height: 51px;
}
.countBtn{
  position: absolute;
  margin: 5px 0;
  padding: 0 20px;
  right: 10px;
  font-size: 14px;
  color: white;
  height: 40px;
  width: 85px;
  line-height: 40px;
  background-color: #fc627e;
  text-align: center;
  border-radius: 25px;
}
.price{
  color: red;
  font-size: 13px;
}
.btn{
  position:relative;
  width: 85px;
  right: 20px;
}
.active{
  background-color: white;
}
</style>