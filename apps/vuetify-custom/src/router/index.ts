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
		redirect: '/vuetify/multi-search',
		components: {
			default: () => import('@/views/VuetifyComponents/index.vue'),
			LeftSidebar: () => import('@/layouts/SideBar.vue'),
		},
		children: [
			{
				path: 'multi-search',
				component: () =>
					import('@/views/VuetifyComponents/MultiSearchField.vue'),
			},
		],
	},
	{
		name: 'Business components',
		path: '/business',
		redirect: '/business/html2pdf',
		components: {
			default: () => import('@/views/business/index.vue'),
			LeftSidebar: () => import('@/layouts/SideBar.vue'),
		},
		children: [
			{
				path: 'html2pdf',
				component: () =>
					import('@/views/business/PdfGeneration.vue'),
			},
		]
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
