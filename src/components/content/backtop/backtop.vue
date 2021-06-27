<template>
<div class="backtop" @mousedown="mousedown" @mousemove="mousemove">
  <img src="~assets/img/common/top.png">
</div>
</template>

<script>
export default {
  name: "backtop",
  data(){
    return{
      boxX: 0,
      boxY: 0,
      mouseX: 0,
      mouseY: 0,
      box: null
    }
  },
  mounted() {
    this.box = document.getElementsByClassName('backtop')[0]
  },
  methods:{
    mousedown(e){
      // this.mouseX = e.screenX
      // this.mouseY = e.screenY
      // this.boxX = this.box.offsetLeft
      // this.boxY = this.box.offsetTop
    },
    mousemove(e){
      // let newX = e.screenX - this.mouseX
      // let newY = e.screenY - this.mouseY
      // this.box.style.left = this.boxX + newX + 'px'
      // this.box.style.top = this.boxY + newY + 'px'
    }
  }
}
</script>
<style scoped>

.backtop{
  width: 55px;
  position: fixed;
  right: 5px;
  bottom: 48px;
}
.backtop img{
  width: 100%;
}
</style>