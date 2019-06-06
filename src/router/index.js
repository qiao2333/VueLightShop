import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import BuyCar from '@/pages/car/Buycar'
import Person from '@/pages/person/Person'

import Order from '@/pages/order/order'

import Light from '@/pages/light/Light'
import LightInfo from '@/pages/light/LightInfo'
import BuyPage from '@/pages/buypage/BuyPage'
import Collection from '@/pages/collection/collection'
import Regist from '@/pages/login/Regist'

import Controller from '@/pages/controller/Controller'
import AddUser from '@/pages/controller/components/Add-User'
import AddLight from '@/pages/controller/components/ControllerLight/Add-light'
import ControllerLight from '@/pages/controller/components/ControllerLight'
import ControllerUser from '@/pages/controller/components/ControllerUser'
import ControllerOrder from '@/pages/controller/components/ControllerOrder'
import Test from '@/pages/controller/components/test'

import UpdateLight from '@/pages/controller/components/ControllerLight/UpdateLight'
import EmployeeOrder from '@/pages/controller/components/employeeOrder'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: '登录页面',
			component: Login
		},
		{
			path: '/regist',
			name: '注册页面',
			component:Regist
		},
		{
			path: '/controller',
			name: '管理页面',
			component: Controller,
		
			children: [{
					path: 'addUser',
					name: '添加用户',
					component: AddUser,
					
				},
				{
					path: 'addLight',
					name: '添加灯饰',
					component: AddLight,
					
				},
				{
					path: 'controllerLight',
					name: '灯饰管理页面',
					component: ControllerLight,
					
				},
				{
					path: 'controllerUser',
					name: '用户管理页面',
					component: ControllerUser,
					
				},
				{
					path: 'controllerOrder',
					name: '订单管理页面',
					component: ControllerOrder,
					
				},
				{
					path: 'test',
					name: '测试页面',
					component: Test,
					
				},
				{
					path: 'updateLight',
					name: '修改灯饰页面',
					component: UpdateLight,
				},
				{
					path: 'person',
					name: '个人中心界面',
					component: Person
				},
				{
					path: 'employeeOrder',
					name: '雇员订单发货页面',
					component: EmployeeOrder
				}
			]
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			children: [{
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
					component: LightInfo
				},
				{
					path: 'buypage',
					name: '支付页面',
					component: BuyPage
				},
				{
					path: 'order',
					name: '我的订单',
					component: Order
				},
				{
					path: 'collection',
					name: '我的收藏',
					component: Collection
				}

			]
		},
	]
})
