<template>
<div>
  <bscroll class="leftBarContent" ref="leftBarSB">
    <div class="leftBar" v-for="(item,index) in leftBar">
      <div :class="{leftBarItem: true, active: index === currentIndex}"
           @click="itemClick(item, index)">{{item.title}}</div>
    </div>
  </bscroll>
</div>
</template>

<script>
import bscroll from 'components/common/bscroll/bscroll'
export default {
  name: "category_leftBar",
  props:{
    leftBar:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex: 0
    }
  },
  mounted() {
    this.$refs.leftBarSB.refresh()
  },
  components:{
    bscroll
  },
  methods:{
    itemClick(item, index){
      this.currentIndex = index
      this.$emit('indexClick', index)
    }
  }
}
</script>

<style scoped>
.leftBarContent{
  background-color: #f6f6f6;
  position: absolute;
  left: 0;
  top: 44px;
  bottom: 50px;
}
.leftBarItem{
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 100px;
}
.active{
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>