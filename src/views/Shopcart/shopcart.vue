<template>
  <div id="shopcart">
    <nav-bar id="shopcart_navbar"><div slot="center">购物车({{counter}})</div></nav-bar>
  </div>
</template>

<script>
import navBar from '@/components/common/navbar/navbar'
export default {
  name: "shopcart",
  components:{
    navBar
  },
  data(){
    return {
      counter: 0
    }
  },
  methods:{

  }
}
</script>

<style scoped>
#shopcart_navbar{
  background-color: #ff8198;
  text-align: center;
  color: white;
}
</style>