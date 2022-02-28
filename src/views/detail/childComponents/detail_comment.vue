<template>
<div class="comment">
  <div class="tittle-top">
    <div>
      <span class="userComment">用户评价({{this.commentCount}})</span>
    </div>
    <div class="tittle-right">
      <span class="more" @click="notMes">更多</span>
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
         v-for="item in this.commentInfo.images"
         @click="imgClick(item)">
  </comment>
</div>
</template>

<script>
import {formatDate} from 'common/utils'
import {notMes} from 'common/mixin'
import comment from 'components/common/common/common'

export default {
  name: "detail_common",
  mixins: [notMes],
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
  },
  methods:{
    imgClick(item){
      this.$emit('bigImg', item)
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
.userComment{
  font-size: 15px;
}
.more{
  font-size: 13px;
}
.tittle-right{
  display: flex;
  align-items: center;
  height: 15px;
}
.tittle-right span{
  margin-right: 2px;
}
.tittle-right img{
  width: 15px;
  height: 15px;
  transform: rotate(180deg);
  margin-right: 5px;
  padding-top: 3px;
}
</style>