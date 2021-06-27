<template>
<div ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "bscroll",
  data(){
    return {
      bscroll: null
    }
  },
  props:{
    probe:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  mounted() {
    let options = {
      observeDOM: true,
      //监听positions，0/1时不监听，2监听手在触摸屏幕时的位置，3监听所有位置
      probeType: this.probe,
      //是否允许上拉加载更多
      pullUpLoad: this.pullUpLoad,
      //是否允许div被点击
      click: true,
      //启用手指触摸
      observeImage: true,
      //开启鼠标滚轮
      mouseWheel: true,
      //启用鼠标拖动
      disableMouse: false,
      //启用手指触摸
      disableTouch: false
    }
    this.bscroll = new BScroll(this.$refs.wrapper, options)

    //发出上拉加载事件
    if(this.pullUpLoad){
      this.bscroll.on('pullingUp', () =>{
        this.$emit('loadmore')
      })
    }

    //发出实时的位置
    if(this.probe === 2 || this.probe === 3){
      this.bscroll.on('scroll', position =>{
        this.$emit('isShow', position)
      })
    }
  },
  methods:{
    scrollTo(x, y, time){
      this.bscroll && this.bscroll.scrollTo(x, y, time)
    },
    refresh(){
      this.bscroll && this.bscroll.refresh()
      // console.log('---')
    },
    finishPullUp(){
      this.bscroll && this.bscroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>