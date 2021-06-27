<template>
<div>
  <Swiper class="detailSwiper">
    <SwiperItem v-for="item in detailSwiper" class="detailSwiperItem">
      <img :src="item" alt="" @load="imgLoad" @click="showImg(item)">
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
  data(){
    return {
      isLoad: false,
      showimg: false,
      img:''
    }
  },
  props:{
    detailSwiper:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imgLoad(){
      if(!this.isLoad){
        this.$bus.$emit('swiperLoad')
        this.isLoad = true
      }
    },
    showImg(item){
      this.$emit('bigImg', item)
    }
  }
}
</script>

<style scoped>
/*.bigImg{*/
/*  position: absolute;*/
/*  left: 0;*/
/*  top: 0;*/
/*  right: 0;*/
/*  bottom: 0;*/
/*  background-color: black;*/
/*  display: flex;*/
/*  align-items: center;*/
/*  z-index: 10;*/
/*}*/
/*.bigImg img{*/
/*  height: 100%;*/
/*}*/
.detailSwiperItem{
  height: 310px;
}
</style>