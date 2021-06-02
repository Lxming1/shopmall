<template>
<div v-if="Object.keys(itemParams).length !== 0" class="itemParams">
  <table v-for="item1 in itemParams.rule.tables[0]" class="params-top tab1">
    <tr>
      <td v-for="item2 in item1" >{{item2}}</td>
    </tr>
  </table>
  <table class="params-top tab2">
    <tr v-for="item1 in itemParams.info.set">
      <td style="width: 95px;">{{item1.key}}</td>
      <td style="color: #eb4868">{{item1.value}}</td>
    </tr>
  </table>
  <div v-if="itemParams.info.image !== undefined">
    <img :src="itemParams.info.image[0]" alt="">
  </div>
</div>
</template>

<script>

export default {
  name: "detail_itemParams",
  props:{
    itemParams:{
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.itemParams{
  border-top: 4px solid #f1f1f1;
  padding: 15px 15px;
}
.params-top{
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
}
.params-top tr{
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
}
.params-top tr td{
  padding: 13px 0;
}
.tab1 tr td{
  width: calc(100%/5);
}
.tab2{
  border-top: 2px solid #efefef;
}
</style>