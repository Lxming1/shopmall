<template>
<div id="tab-bar-item" @click="colorChange" :style="activeStyle">
  <div v-if="!isActive"><slot name="picture"></slot></div>
  <div v-else><slot name="picture_active"></slot></div>
  <div><slot name="text"></slot></div>
</div>
</template>

<script>
export default {
  name: "tabbaritem",
  props:{
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1   //判断this.$route.path中是否包含this.path，包含返回0，不包含返回-1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {};
    }
  },
  methods: {
    colorChange() {
      if(this.$route.path.indexOf(this.path) === -1){
        this.$router.replace(this.path)
      }
    }
  }
}
</script>

<style scoped>
#tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
img{
  height: 24px;
  vertical-align: middle;
  margin-top: 6px;
}
</style>
