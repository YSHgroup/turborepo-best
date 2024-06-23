import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import Welcome from '@/components/Welcome.vue'

const routes: RouteRecordRaw[] = [
	// { path: '/', redirect: { name: 'home' } },
	{
		path: '/',
		redirect: (to) => {
			console.log('route: ', to)
			return { path: '/welcome', query: { message: 'Welcome to here' } }
		},
	},
	// {
	// 	name: 'home',
	// 	path: '/home',
	// 	component: HelloWorld,
	// 	meta: { title: 'Home' },
	// },
	{
		name: 'welcome',
		path: '/welcome',
		props: (route) => ({ message: route.query.message }),
		component: Welcome,
		meta: { title: 'Welcome' },
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
