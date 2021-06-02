<template>
<div class="comment">
  <div class="tittle-top">
    <div>
      <span style="font-size: 15px">用户评价({{this.commentCount}})</span>
    </div>
    <div class="tittle-right">
      <span style="font-size: 13px">更多</span>
      <img src="~assets/img/common/back.svg" alt="">
    </div>
  </div>
  <comment v-if="Object.keys(commentInfo).length !== 0">
    <img slot="headImg" :src="this.commentInfo.user.avatar" alt="">
    <span slot="name">{{this.commentInfo.user.uname}}</span>
    <p slot="content">{{this.commentInfo.content}}</p>
    <span slot="time">{{this.commentInfo.created | showDate}}</span>
    <span slot="style">{{this.commentInfo.style}}</span>
    <img slot="commentImage"
         :src="item"
         alt=""
         v-for="item in this.commentInfo.images">
  </comment>
</div>
</template>

<script>
import {formatDate} from 'common/utils'
import comment from 'components/common/comment/comment'

export default {
  name: "detail_common",
  components:{
    comment
  },
  props:{
    commentInfo:{
      type: Object,
      default(){
        return {}
      }
    },
    commentCount:{
      type: Number,
      default: 0
    }
  },
  updated() {
    if(this.commentInfo.images !== undefined){
      this.$bus.$emit('haveImage')
    }
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value*1000);
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.comment{
  padding: 5px 12px 15px 12px;
  border-top: 5px solid #f2f5f8;
}
.tittle-top{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,.1);
  padding: 15px 0;
}
.tittle-right{
  position: relative;
}
.tittle-right span{
  margin-right: 25px;
}
.tittle-right img{
  width: 14.4px;
  height: 14.4px;
  transform: rotate(180deg);
  position: absolute;
  top: 3px;
  left: 30px;
}
</style>