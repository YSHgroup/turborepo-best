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
		// props: (route) => ({ message: route.query.message }), // allow search query to be passing as a props when using component property
		components: {
			default: () => import('@/views/Welcome.vue'),
			LeftSidebar: () => import('@/layouts/SideBar.vue'),
		},
		meta: { title: 'Welcome' },
	},
	{
		name: 'Vuetify',
		path: '/vuetify',
		components: {
			default: () => import('@/views/VuetifyComponents/index.vue'),
			LeftSidebar: () => import('@/layouts/SideBar.vue'),
		},
		children: [
			{
				path: '/multi-search',
				component: import('@/views/VuetifyComponents/MultiSearchField.vue')
			}
		]
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
