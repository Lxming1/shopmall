<template>
  <div class="feature" @click="notMes">
    <img src="~assets/img/home/recommend_bg.jpg" alt="">
  </div>
</template>

<script>
import {notMes} from 'common/mixin'

export default {
  name: "home_feature",
  mixins: [notMes]
}
</script>

<style scoped>
img{
  width: 100%;
}
</style>