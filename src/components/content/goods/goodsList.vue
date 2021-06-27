<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './goodsListItem'
export default {
  name: "goodList",
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  background-color: #f1eeef;
  display: flex;
  flex-wrap: wrap;  /* 平分子类 */
  justify-content: space-around;   /* 平分后均等分 */
  padding: 5px;
  margin-bottom: 44px;
}
</style>