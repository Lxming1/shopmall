<template>
<div v-if="Object.keys(Goods).length !== 0" class="detailGoods">
  <div class="title">{{Goods.title}}</div>
  <div class="price">
    <span class="n-p">{{Goods.newPrice}}</span>
    <span class="o-p">{{Goods.oldPrice}}</span>
    <span class="discount"
          :style="{background: Goods.discountBgColor}"
          v-if="Goods.discountDesc">{{Goods.discountDesc}}</span>
  </div>
  <div class="capacityOne">
    <span>{{Goods.columns[0]}}</span>
    <span>{{Goods.columns[1]}}</span>
    <span>{{Goods.services[Goods.services.length-1].name}}</span>
  </div>
  <div class="capacityTwo" v-if="Goods.services" >
    <div v-for="index in Goods.services.length-1" :key="index">
      <img class="gougou" :src="getImg(Goods.services[index-1].icon)" alt="">
      <span class="capacityTwoItem">{{Goods.services[index-1].name}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "detail_shopInfo",
  props:{
    Goods:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    getImg(item){
      return item
    }
  }
}
</script>

<style scoped>
.detailGoods{
  padding: 8px 8px 0;
}
.title{
  font-size: 16px;
  margin-top: 5px;
  color: black;
}
.price{
  margin-top: 10px;
}
.n-p{
  font-size: 24px;
  color: var(--color-high-text);
}
.o-p{
  color: #999999;
  font-size: 13px;
  text-decoration: line-through;
  margin-left: 5px;
}
.discount{
  display: inline-block;
  font-size: 13px;
  color: white;
  padding: 3px;
  border-radius: 8px;
  position: relative;
  top: -5px;
  left: 5px;
}
.capacityOne{
  margin-top: 25px;
  font-size: 13px;
  display: flex;
  padding-bottom: 8px;
  color: #a1a1a1;
  border-bottom: 1px solid #e8e8e8;
  background: white;
  justify-content: space-between;
}
.capacityTwo{
  color: black;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  line-height: 58px;
  height: 58px;
}
.gougou{
  position: relative;
  width: 13px;
  height: 13px;
  top: 2.5px;
}
</style>