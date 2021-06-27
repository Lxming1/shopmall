<template>
<div>
  <swiper ref="swiper">
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageload">
      </a>
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
  name: "home_swiper",
  props:{
    banners:{
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods:{
    imageload(){
      this.$emit('imageload')
    }
  }
}
</script>

<style scoped>
img{
  display: block;
}
</style>