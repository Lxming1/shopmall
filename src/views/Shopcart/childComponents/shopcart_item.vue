<template>
<div class="shopCartItem">
  <div class="shopCartButton">
    <div :class="{shopCartButtonItem: true, active: !shopItem.checked}" @click="buttonClick">
      <img src="@/assets/img/cart/tick.svg" alt="">
    </div>
  </div>
  <div class="itemImg" @click="intoFace(shopItem.id)">
    <img :src="shopItem.image" alt="">
  </div>
  <div class="shopCartContent" >
    <div class="title" @click="intoFace(shopItem.id)">{{shopItem.title}}</div>
    <div class="desc" @click="intoFace(shopItem.id)">商品描述：{{shopItem.desc}}</div>
    <div class="price">￥{{shopItem.price}}</div>
  </div>
  <div class="shopCount" v-if="showType" @click="changeType">
    <span class="sCount">x</span>
    <span class="xCount">{{shopItem.count}}</span>
  </div>
  <div class="selectCount" v-else>
    <span :class="{active: Active, leftClick: true}" @click="subsCount">-</span>
    <span class="centerCount">{{shopItem.count}}</span>
    <span class="rightClick" @click="addCount">+</span>
  </div>
</div>
</template>

<script>
export default {
  name: "shopcart_item",
  props:{
    shopItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return {
      Active: true,
      showType: true
    }
  },
  activated() {
    this.showType = true
  },
  methods:{
    buttonClick(){
      this.isShow = !this.isShow
      this.shopItem.checked = !this.shopItem.checked
    },
    intoFace(id){
      this.$router.push('detail/' + id)
    },
    addCount(){
      this.shopItem.count++
      if(this.shopItem.count > 1){
        this.Active = false
      }
    },
    subsCount(){
      if(this.shopItem.count !== 1){
        this.shopItem.count--
        if(this.shopItem.count === 1){
          this.Active = true
        }
      }else {
        this.$toast.show('该宝贝不能减少了哟~')
      }
    },
    changeType(){
      this.showType = false
      this.Active = this.shopItem.count <= 1;
    }
  }
}
</script>

<style scoped>
.shopCartItem{
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 120px;
  padding: 5px;
  display: flex;
  margin-bottom: 5px;
  position: relative;
}
.shopCartButton{
  height: 100%;
  display: flex;
  align-items: center;
}
.shopCartButtonItem{
  background-color: #ff8198;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  border: 1px solid #d5d4d4;
  display: flex;
}
.active{
  background-color: white;
  color: #c2c2c2;
}
.itemImg{
  /*margin-left: 2px;*/
  margin: 5px 5px 5px 7px;
  height: 100px;
  width: 77px;
  overflow: hidden;
  border-radius: 5px;
}
.itemImg img{
  width: 100%;
}
.shopCartContent{
  height: 110px;
  width: 235px;
  padding: 5px;
  position: relative;
}
.title{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: black;
}
.desc{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 14px;
  margin-top: 15px;
  color: #6a6969;
}
.price{
  position: absolute;
  bottom: 5px;
  color: red;
  font-size: 16px;
}
.shopCount{
  position: absolute;
  font-size: 13px;
  right: 15px;
  bottom: 10px;
  padding: 4px 4px 4px 6px;
  border: 1px solid #8b8585;
  border-radius: 6px;
}
.sCount{
  font-size: 12px;
  position: relative;
  top: -0.3px;
  left: -1px;
}
.xCount{
  position: relative;
  top: 1.3px;
}
.selectCount{
  border: 1px solid #8b8585;
  border-radius: 5px;
  position: absolute;
  right: 15px;
  bottom: 10px;
  overflow: hidden;
}
.selectCount .leftClick{
  padding: 8px;
  position: relative;
  top: 1.5px;
}
.selectCount .centerCount{
  display: inline-block;
  padding: 4px 8px;
  font-size: 13px;
  border-right: 1px solid #8b8585;
  border-left: 1px solid #8b8585;
}
.selectCount .rightClick{
  padding: 6px;
  position: relative;
  top: 1px;
}
</style>