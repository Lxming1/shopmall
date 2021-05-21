<template>
<div class="recommend">
  <div class="recommenditem" v-for="item in recommend">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "home_recommend",
  props:{
    recommend:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  margin: 15px 0 25px;
  border-bottom: 10px solid #eee;
  font-size: 14px;
}
.recommenditem{
  flex: 1;
  padding-bottom: 30px;
}
img{
  width: 80px;
  margin-bottom: 10px;
}
</style>