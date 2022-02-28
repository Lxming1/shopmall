<template>
  <div id="category">
    <nav-bar id="category_navbar"><div slot="center" @click="navBarClick">分类</div></nav-bar>
    <div class="content1">
      <tab-control :titles="['新品','综合','推荐']"
                   @clickitem="tabClick"
                   class="tabcon"
                   ref="tabcon1"
                   v-show="showTab"/>
      <cate-gory-left-bar :leftBar="categories" @indexClick="indexClick"/>
      <scroll class="content"
              ref="scroll"
              @isShow="isShowT"
              :probe="3">
        <cate-gory-right-category :lists="rightCategories" @gifImg="gifImg"/>
        <tab-control :titles="['新品','综合','推荐']" @clickitem="tabClick" ref="tabcon2"/>
        <goods-list :goods="goodsListItem"/>
      </scroll>
    </div>
  </div>
</template>

<script>
import navBar from 'components/common/navbar/navbar'
import cateGoryLeftBar from './childComponents/category_leftBar'
import cateGoryRightCategory from './childComponents/category_rightCategory'
import tabControl from 'components/common/tabControl/tabControl'
import goodsList from 'components/content/goodsList/goodsList'
import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import {tabCon, cNavBackTop} from 'common/mixin'
import scroll from 'components/common/bscroll/bscroll'
export default {
  name: "category",
  components:{
    navBar,
    scroll,
    cateGoryLeftBar,
    cateGoryRightCategory,
    tabControl,
    goodsList
  },
  mixins:[tabCon, cNavBackTop],
  data(){
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      tabOffsetTop: null,
      showTab: 0,
      saveY: 0
    }
  },
  activated() {
    //回来时要先refresh
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY)
  },
  deactivated() {
    //this.$refs.scroll.bscroll.y监听滚动的位置
    this.saveY = this.$refs.scroll.bscroll.y
    this.$bus.$emit('categoryZero')
  },
  updated() {
    //单击底部回到顶部
    this.$bus.$on('categoryBackTop',()=>{
      this.$refs.scroll.scrollTo(0, 0)
    })
  },
  created() {
    //请求数据
    this._getCategory()
    //阻止移动底部导航栏滚动页面
    this.preventScroll()
  },
  computed:{
    rightCategories(){
      if(this.currentIndex === -1) return {}
      else {
        return this.categoryData[this.currentIndex].subcategories
      }
    },
    goodsListItem(){
      if(this.currentIndex === -1) return []
      else {
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    }
  },
  methods:{
    _getCategory(){
      getCategory().then(res =>{
        this.categories = res.data.category.list
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index){
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    indexClick(index){
      this._getSubcategories(index)
      this.$refs.scroll.scrollTo(0, 0)
    },
    gifImg(){
      this.tabOffsetTop = this.$refs.tabcon2.$el.offsetTop
    },
    isShowT(pos){
      this.showTab = this.tabOffsetTop < -pos.y
    },
    preventScroll(){
      document.body.addEventListener('touchmove', function(e){
        e.preventDefault();
      }, {passive: false});
    }
  }
}
</script>

<style scoped>
#category{
  height: calc(100vh - 49px);
  overflow: hidden;
}
.content1{
  background-color: #f1eeef;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 50px;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 50px;
  right: 0;
  left: 100px;
}
#category_navbar{
  position: fixed;
  top: 0;
  background-color: #ff8198;
  text-align: center;
  color: white;
  font-size: 16px;
}
.tabcon{
  position: absolute;
  top: 44px;
  right: 0;
  left: 100px;
  z-index: 1;
}
</style>