<template>
  <div class="goodsitem" @click="itemClick">
    <div :class="[{img: !showType}, {categoryImg: showType}]">
      <img v-lazy="getImage" alt="">
    </div>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">¥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
import goodsList from './goodsList'

export default {
  name: "goodsListItem",
  props:{
    goodsItem:{
      type: Object,
      default(){
        return {
        }
      }
    }
  },
  computed:{
    getImage(){
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    },
    showType(){
      return this.$route.path.indexOf('Category') !== -1;
    }
  },
  methods:{
    itemClick(){
      if(this.$route.path.indexOf('Home') !== -1 || this.$route.path.indexOf('Category') !== -1){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }else{
        this.$toast.show('无数据', 1000)
      }
    }
  }
}
</script>

<style scoped>
.goodsitem{
  font-size: 10px;
  width: 48%;
  position: relative;
  padding-bottom: 40px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 7px;
  overflow: hidden;
}
.img{
  width: 100%;
  height: 228px;
  overflow: hidden;
}
.categoryImg{
  width: 100%;
  height: 165px;
  overflow: hidden;
}
.categoryImg.img{
  width: 100%;
}
.img, img{
  width: 100%;
}
.goods-info{
  text-align: center;
  position: absolute;
  height: 45px;
  bottom: 0;
  left: 0;
  right: 0;
}
.goods-info p{
  width: 100%;
  height: 14px;
  margin-bottom: 2px;
  margin-top: 12px;
  margin-left: 5px;
  white-space: nowrap;   /* 强制性的在一行显示所有的文本，直到文本结束或者遭遇br标签对象才换行*/
  overflow: hidden; /* 溢出的文字隐藏起来*/
  text-overflow: ellipsis;   /*溢出的文字使用圆点显示*/
}
.goods-info .price{
  color: var(--color-high-text);
  position: relative;
  left: -15px;
}
.goods-info .collect{
  position: relative;
  right: -5px;
}
.goods-info .collect::before{
  content: '';
  position: absolute;
  left: -12px;
  top: -1.2px;
  width: 12px;
  height: 12px;
  background: url("~assets/img/common/collect.svg") 0 0/12px 12px;
}
</style>