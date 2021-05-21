import VueRouter from 'vue-router'
import Vue from 'vue'

const home = () => import('views/Home/home')
const category = () => import('views/Category/category')
const shopcart = () => import('views/Shopcart/shopcart')
const profile = () => import('views/Profile/profile')
Vue.use(VueRouter)

const routes = [
	{
		path: '',
		redirect: '/Home'
	},
	{
		path: '/Home',
		component: home
	},
	{
		path: '/Category',
		component: category
	},
	{
		path: '/Cart',
		component: shopcart
	},
	{
		path: '/Profile',
		component: profile
	}
]
const router = new VueRouter({
	routes,
	mode: 'history'
})
export default router