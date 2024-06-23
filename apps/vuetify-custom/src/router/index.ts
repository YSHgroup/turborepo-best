import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	// { path: '/', redirect: { name: 'home' } },
	{
		path: '/',
		redirect: (to) => {
			console.log('route: ', to)
			return { path: '/welcome', query: { message: 'Welcome to here' } }
		},
	},
	{
		name: 'welcome',
		path: '/welcome',
		// props: (route) => ({ message: route.query.message }),
		components: {
			default: () => import('@/components/Welcome.vue'),
			LeftSidebar: () => import('@/layouts/SideBar.vue'),
		},
		// component: Welcome,
		meta: { title: 'Welcome' },
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
