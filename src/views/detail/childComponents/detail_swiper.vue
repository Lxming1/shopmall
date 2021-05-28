<template>
<div>
  <Swiper class="detailSwiper">
    <SwiperItem v-for="item in detailSwiper" class="detailSwiperItem">
      <img :src="item" alt="">
    </SwiperItem>
  </Swiper>
</div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'
export default {
  name: "detail_swiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    detailSwiper:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.detailSwiperItem{
  height: 310px;
}
</style>