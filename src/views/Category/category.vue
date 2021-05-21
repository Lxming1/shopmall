<template>
  <div id="category">
    <nav-bar id="category_navbar"><div slot="center">分类</div></nav-bar>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/navbar'
export default {
  name: "category",
  components:{
    navBar
  }
}
</script>

<style scoped>
#category_navbar{
  background-color: #ff8198;
  text-align: center;
  color: white;
}
</style>