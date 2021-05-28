<template>
<div class="goods">
  <goods-list-item v-for="item in goods" :goodsItem="item"/>
</div>
</template>

<script>
import goodsListItem from './goodsListItem'
export default {
  name: "goodList",
  components:{
    goodsListItem
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
  display: flex;
  flex-wrap: wrap;  /* 平分子类 */
  justify-content: space-around;   /* 平分后均等分 */
  padding: 5px;
  margin-bottom: 44px;
}
</style>