import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
			default: () => import('@/views/Welcome.vue'),
			LeftSidebar: () => import('@/layouts/SideBar.vue'),
		},
		// component: Welcome,
		meta: { title: 'Welcome' },
	},
	{
		name: 'Vuetify',
		path: '/vuetify',
		components: {
			default: () => import('@/views/VuetifyComponents.vue'),
			LeftSidebar: () => import('@/layouts/SideBar.vue'),
		}
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
