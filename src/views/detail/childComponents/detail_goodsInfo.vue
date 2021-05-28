<template>
<div class="detail-main">
  <div class="top">
    <div class="start1"></div>
    <div class="recommend">{{detailInfo.desc}}</div>
    <div class="start2"></div>
    <div class='detail-title'>
      {{detailInfo.detailImage[0].key}}
    </div>
  </div>
  <div class="mainDetail">
    <img :src="item"
         alt=""
         v-for="item in detailInfo.detailImage[0].list"
         style="width: 100%;"
         @load="imgLoad" v-if="detailInfo.detailImage[0]">
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
  methods:{
    imgLoad(){
      this.$emit('imgLoad')
    }
  }
}
</script>

<style scoped>
.detail-main{
  margin-top: 20px;
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
  background-color: #a3a3a5;
  position: relative;
}
.start2{
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
  right: -240px;
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
  margin: 10px 0;
}
</style>