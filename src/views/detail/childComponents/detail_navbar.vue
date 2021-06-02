<template>
  <div>
    <navbar class="detail_navbar" >
      <div class="back" slot="left" @click="back">
        <img class="backImg" src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="options">
        <div class="optionsItem"
             v-for="(item,index) in titles"
             @click="optionsClick(index)"
             :class="{active: currentIndex === index}">{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/navbar'
export default {
  name: "detail_navbar",
  components:{
    navbar
  },
  data(){
    return{
      titles:['商品','评论','详情','推荐'],
      currentIndex: 0
    }
  },
  methods:{
    optionsClick(index){
      this.currentIndex = index
      this.$emit('navbarClick', this.currentIndex)
    },
    back(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.detail_navbar{
  background-color: var(--color-background);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.back{
  position: relative;
}
.backImg{
  position: absolute;
  left: 22px;
  top: 11px;
}
.options{
  font-size: 14px;
  display: flex;
  text-align: center;
  margin: 0 15px;
}
.optionsItem{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
</style>