<template>
<div class="detail-main" v-if="Object.keys(detailInfo).length !== 0">
  <div class="top">
    <div class="start1"></div>
    <div class="recommend">{{detailInfo.desc}}</div>
    <div class="start2"></div>
  </div>
  <div class="mainDetail"
       v-for="item1 in detailInfo.detailImage"
       v-if="detailInfo.detailImage && detailInfo.detailImage.length !== 0">
    <div v-if="item1.key" class='detail-title'>
      <div class="start11"/>
      <span>{{item1.key}}</span>
      <div class="start22"/>
    </div>
    <div v-if="item1.desc" class='detail-title-item'>
      {{item1.desc}}
    </div>
    <div v-if="item1.list">
      <img :src="item"
           alt=""
           v-for="item in getImg(item1,15)"
           style="width: 100%;"
           @load="detailLoad">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "detail_goodsInfo",
  props:{
    detailInfo:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    getIndex(arr, n) {
      for (let i in arr) {
        if (arr[i] === n) {
          return i
        }
      }
    },
    //显示固定数量的详情图
    getImg(item, count) {
      const arr = item.list.filter(n => this.getIndex(item.list, n) < count)
      //如果arr的数量小于item.list的数量，则将item.list最后一张图片加上去
      if(arr.length < item.list.length){
        arr.push(item.list[item.list.length-1])
      }
      return arr
    },
    detailLoad(){
      this.$emit('detailLoad')
    }
  }
}
</script>

<style scoped>
.detail-main{
  padding-top: 20px;
  margin-bottom: 20px;
  border-top: 5px solid #f2f5f8;
}
.top{
  padding: 0 15px;
  position: relative;
}
.recommend{
  font-size: 14px;
  padding: 14px 0;
}
.start1{
  width: 90px;
  height: 1px;
  background-color: #9c9c9c;
  position: relative;
}
.start2{
  width: 90px;
  height: 1px;
  background-color: #9c9c9c;
  position: relative;
  right: -240px;
  margin-bottom: 20px;
}
.start1::before{
  content: '';
  width: 5px;
  height: 5px;
  background-color: black;
  position: absolute;
  top: -2.5px;
}
.start2::before{
  content: '';
  width: 5px;
  height: 5px;
  background-color: black;
  position: absolute;
  left: 85px;
  top: -2.5px;
}
.detail-title{
  font-size: 16px;
  color: #fd5778;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  /*border-radius: 25px;*/
  border-bottom: 2px solid #fd5778;
  border-top: 2px solid #fd5778;
  position: relative;
  margin-bottom: 10px;
}
.start11{
  width: 20px;
  height: 1px;
  background-color: #fd5778;
  position: absolute;
  left: 105px;
  top: 12px;
}
.start22{
  width: 20px;
  height: 1px;
  background-color: #fd5778;
  position: absolute;
  top: 12px;
  right: 105px;
}
.detail-title-item{
  padding: 0 15px;
  font-size: 10px;
  margin: 10px 0;
  color: #868686;
}

</style>