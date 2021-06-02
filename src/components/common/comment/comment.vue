<template>
  <div class="comment-content">
    <div class="content-top">
      <div class="comment-img">
        <slot name="headImg"></slot>
      </div>
      <div class="comment-name">
        <slot name="name"></slot>
      </div>
    </div>
    <div class="content-center">
      <slot name="content"></slot>
    </div>
    <div class="content-bottom">
      <div class="time">
        <slot name="time"></slot>
      </div>
      <div class="style">
        <slot name="style"></slot>
      </div>
      <div class="commentImage" v-show="show">
        <slot name="commentImage"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  data(){
    return {
      show: false
    }
  },
  created() {
    this.$bus.$on('haveImage',() =>{
      this.show = true
    })
  }
}
</script>

<style scoped>
.content-top{
  height: 42px;
  line-height: 42px;
  position: relative;
  margin-top: 10px;
}
.comment-img{
  width: 42px;
  height: 42px;
  border-radius: 50px;
  overflow: hidden;
}
.comment-img img{
  width: 100%;
  height: 100%;
}
.comment-name{
  font-size: 15px;
  position: absolute;
  left: 52px;
  top: 0;
  color: #333
}
.content-center{
  font-size: 14px;
  padding: 12px 4px 2px 4px;
  color: #777
}
.content-bottom{
  color: #999;
  font-size: 12px;
  padding: 5px 4px 10px 4px;
}
.time{
  display: inline-block;
  margin-right: 10px;
}
.style{
  display: inline-block;
}
.commentImage{
  display: flex;
  margin-top: 11px;
  height: 70px;
}
.commentImage img{
  margin-right: 2px;
  height: 100%;
}
</style>