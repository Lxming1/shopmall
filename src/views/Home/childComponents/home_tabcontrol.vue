<template>
<div id="tabcon">
  <tab-control :titles="titles" @clickitem="click" ref="tabcon"/>
</div>
</template>

<script>
import tabControl from '@/components/common/tabControl/tabControl'
export default {
  name: "home_tabcontrol",
  components:{
    tabControl
  },
  data(){
    return{
      titles:['流行', '新款', '精选'],
      currentIndex: 0
    }
  },
  methods:{
    click(index){
      this.currentIndex = index
      this.$emit('homeclick', this.currentIndex)
    }
  }
}
</script>

<style scoped>

</style>