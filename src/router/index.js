import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import BuyCar from '@/pages/car/Buycar'
import Person from '@/pages/person/Person'

import Order from '@/pages/order/order'
import Controller from '@/pages/controller/Controller'
import Light from '@/pages/light/Light'
import LightInfo from '@/pages/light/LightInfo'
import BuyPage from '@/pages/buypage/BuyPage'
import Collection from '@/pages/collection/collection'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
	{
		path: '/controller',
		name: '管理页面',
		component: Controller,
	},
    {
      path: '/home',
      name: 'Home',
      component: Home,
			children:[
			{
				path: 'buycar',
				name: '购物车界面',
				component: BuyCar
			},
			{
				path: 'person',
				name: '个人中心界面',
				component: Person
			},
			{
				path: 'light',
				name: '灯饰页面',
				component: Light
			},
			{
				path: 'info/:code',
				name: '灯饰详情页面',
				component:LightInfo
			},
			{
				path: 'buypage',
				name: '支付页面',
				component:BuyPage
			},
			{
				path: 'order',
				name: '我的订单',
				component:Order
			},
			{
				path:'collection',
				name: '我的收藏',
				component:Collection
			}
				
		]
    },
  ]
})
