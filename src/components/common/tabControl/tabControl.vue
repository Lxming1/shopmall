<template>
<div class="tabControl">
  <div v-for="(item,index) in titles" @click="touch(index)">
    <span :class="{active: isIndex === index}" :key="index">{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "tabControl",
  data(){
    return {
      isIndex:0
    }
  },
  props:{
    titles:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    touch(index){
      this.isIndex = index;
      this.$emit('clickitem', this.isIndex)
    }
  }
}
</script>

<style scoped>
.tabControl{
  display: flex;
  font-size: 15px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: var(--color-background);
}
.tabControl div{
  flex: 1;
}
.tabControl div span{
  padding: 0 3px 3px;
}
.active{
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
}
</style>