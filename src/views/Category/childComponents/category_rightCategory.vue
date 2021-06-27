<template>
<div class="categoryList">
  <div v-for="item in lists.list" class="gifImg">
    <a :href="item.link">
      <img :src="item.image" alt="" @load="gifImg">
      <span class="item-text">{{item.title}}</span>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "category_rightCategory",
  props: {
    lists: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods:{
    gifImg(){
      this.$emit('gifImg')
    }
  }
}
</script>

<style scoped>
.categoryList{
  background-color: white;
  padding: 10px 0 10px 12px;
  /*text-align: center;*/
  font-size: 14px;
}
.gifImg{
  display: inline-block;
  width: 65px;
  height: 65px;
  margin: 10px;
  text-align: center;
}
.gifImg img{
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
}
</style>