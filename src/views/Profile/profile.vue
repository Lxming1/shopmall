<template>
  <div id="profile">
    <nav-bar id="profile_navbar"><div slot="center">我的</div></nav-bar>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/navbar'
export default {
  name: "profile",
  components:{
    navBar
  }
}
</script>

<style scoped>
#profile_navbar{
  background-color: #ff8198;
  text-align: center;
  color: white;
}
</style>