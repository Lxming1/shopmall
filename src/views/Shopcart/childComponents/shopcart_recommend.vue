<template>
  <div class="shoprec">
    <div class="start1"/>
    <div class="recommendTitle">你可能还喜欢</div>
    <div class="start2"/>
    <detail-goods-list :goods="goodsRecommends"/>
  </div>
</template>

<script>
import DetailGoodsList from 'components/content/goodsList/goodsList'
export default {
  name: "shopcart_recommend",
  props:{
    goodsRecommends:{
      type: Array,
      default(){
        return []
      }
    }
  },
  components:{
    DetailGoodsList
  }
}
</script>

<style scoped>
.shoprec{
  position: relative;
}
.recommendTitle{
  font-size: 16px;
  color: #fd5778;
  font-weight: bold;
  text-align: center;
  padding: 15px 5px 10px 5px;
  background-color: #f1eeef;
}
.start1{
  width: 20px;
  height: 1.1px;
  background-color: #fd5778;
  display: flex;
  align-items: center;
  position: absolute;
  left: 105px;
  top: 23px;
}
.start2{
  width: 20px;
  height: 1.1px;
  background-color: #fd5778;
  position: absolute;
  top: 23px;
  right: 105px;
}
</style>