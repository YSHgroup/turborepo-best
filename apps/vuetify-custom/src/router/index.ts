import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'

const routes: RouteRecordRaw[] = [
	// { path: '/', redirect: { name: 'home' } },
	{
		path: '/',
		redirect: (to) => {
			return { path: '/welcome/hello' }
		},
	},
	// {
	// 	name: 'home',
	// 	path: '/home',
	// 	component: HelloWorld,
	// 	meta: { title: 'Home' },
	// },
	{
		name: 'welcome msg',
		path: '/welcome/:msg',
		props: true,
		component: HelloWorld,
		meta: { title: 'Welcome' },
	},
]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})
