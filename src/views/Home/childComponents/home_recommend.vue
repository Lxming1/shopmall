<template>
<div id="recommend">
  <div class="recommenditem" v-for="item in recommend" @click="notMes">
    <img :src="item.image" alt="">
    <div>{{item.title}}</div>
  </div>
</div>
</template>

<script>
import {notMes} from 'common/mixin'

export default {
  name: "home_recommend",
  mixins: [notMes],
  props:{
    recommend:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    reClick(){
      this.$toast.show('无数据', 1000)
    }
  }
}
</script>

<style scoped>
#recommend{
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0 0;
  border-bottom: 10px solid #eee;
  font-size: 14px;
  background-color: white;
}
.recommenditem{
  flex: 1;
  padding-bottom: 20px;
}
img{
  width: 80px;
  margin-bottom: 8px;
}
</style>