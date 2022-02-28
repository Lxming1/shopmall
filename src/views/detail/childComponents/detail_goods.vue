<template>
<div class="recommend">
  <div class="start111"/>
  <div class="recommendTitle">热门推荐</div>
  <div class="start222"/>
  <detail-goods-list :goods="goodsRecommends"/>
</div>
</template>

<script>
import DetailGoodsList from 'components/content/goodsList/goodsList'
export default {
  name: "detail_goods",
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
.recommend{
  position: relative;
  background-color: #f1eeef;
}
.recommendTitle{
  font-size: 16px;
  color: #fd5778;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  border-top: 2px solid #fd5778;
  border-bottom: 2px solid #fd5778;
  margin-bottom: 10px;
  margin-top: 5px;
  background-color: white;
}
.start111{
  width: 20px;
  height: 1px;
  background-color: #fd5778;
  position: absolute;
  left: 105px;
  top: 12px;
}
.start222{
  width: 20px;
  height: 1px;
  background-color: #fd5778;
  position: absolute;
  top: 12px;
  right: 105px;
}
</style>