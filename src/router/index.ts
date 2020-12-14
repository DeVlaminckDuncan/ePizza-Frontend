import { nextTick } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { capitalize } from '@/utils/dataFormattings';

const routes: Array<RouteRecordRaw> = [
	// Customer routes

	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '../presentations/pizza/customer/views/Login.vue'),
	},

	{
		path: '/',
		alias: '/ordertype',
		name: 'OrderType',
		component: () => import(/* webpackChunkName: "orderType" */ '../presentations/pizza/customer/views/OrderType.vue'),
	},

	{
		path: '/cart',
		name: 'Cart',
		component: () => import(/* webpackChunkName: "cart" */ '../presentations/pizza/customer/views/Cart.vue'),
	},

	{
		path: '/delivery',
		name: 'Delivery',
		component: () => import(/* webpackChunkName: "delivery" */ '../presentations/pizza/customer/views/Delivery.vue'),
	},

	{
		path: '/details/:id',
		name: 'Details',
		component: () => import(/* webpackChunkName: "details" */ '../presentations/pizza/customer/views/Details.vue'),
	},

	{
		path: '/edit/:id',
		name: 'Edit',
		component: () => import(/* webpackChunkName: "edit" */ '../presentations/pizza/customer/views/Edit.vue'),
	},

	{
		path: '/menu',
		name: 'Menu',
		component: () => import(/* webpackChunkName: "menu" */ '../presentations/pizza/customer/views/Menu.vue'),
	},

	{
		path: '/rate/:id',
		name: 'Rate',
		component: () => import(/* webpackChunkName: "rate" */ '../presentations/pizza/customer/views/Rate.vue'),
	},

	{
		path: '/takeaway',
		name: 'Takeaway',
		component: () => import(/* webpackChunkName: "takeaway" */ '../presentations/pizza/customer/views/Takeaway.vue'),
	},

	{
		path: '/orderPlaced',
		name: 'OrderPlaced',
		component: () => import(/* webpackChunkName: "orderPlaced" */ '../presentations/pizza/customer/views/OrderPlaced.vue'),
	},

	// Admin routes
	{
		path: '/admin',
		name: 'AdminCheckToken',
		component: () => import(/* webpackChunkName: "checkToken" */ '../presentations/pizza/admin/views/CheckToken.vue'),
		children: [
			{
				path: '/admin/login',
				name: 'AdminLogin',
				component: () => import(/* webpackChunkName: "login" */ '../presentations/pizza/admin/views/Login.vue'),
			},

			{
				path: '/admin/orders',
				name: 'Orders',
				component: () => import(/* webpackChunkName: "orders" */ '../presentations/pizza/admin/views/Orders.vue'),
			},

			{
				path: '/admin/ratings',
				name: 'Ratings',
				component: () => import(/* webpackChunkName: "ratings" */ '../presentations/pizza/admin/views/Ratings.vue'),
			},

			// TODO: make "/menu" the parent with children "/menu/add" and "/menu/edit"
			{
				path: '/admin/menu',
				name: 'AdminMenu',
				component: () => import(/* webpackChunkName: "menu" */ '../presentations/pizza/admin/views/Menu.vue'),
			},

			{
				path: '/admin/add',
				name: 'AdminAddPizza',
				component: () => import(/* webpackChunkName: "addPizza" */ '../presentations/pizza/admin/views/AddPizza.vue'),
			},

			{
				path: '/admin/edit/:id',
				name: 'AdminEditPizza',
				component: () => import(/* webpackChunkName: "editPizza" */ '../presentations/pizza/admin/views/EditPizza.vue'),
			},

			{
				path: '/admin/toppings',
				name: 'AdminToppings',
				component: () => import(/* webpackChunkName: "toppings" */ '../presentations/pizza/admin/views/Toppings.vue'),
				children: [
					{
						path: '/admin/toppings',
						name: 'AdminToppingsOverview',
						component: () => import(/* webpackChunkName: "adminToppingsOverview" */ '../presentations/pizza/admin/views/ToppingsOverview.vue'),
					},

					{
						path: '/admin/toppings/add',
						name: 'AdminAddTopping',
						component: () => import(/* webpackChunkName: "adminAddTopping" */ '../presentations/pizza/admin/views/AddTopping.vue'),
					},

					{
						path: '/admin/toppings/edit/:id',
						name: 'AdminEditTopping',
						component: () => import(/* webpackChunkName: "adminEditTopping" */ '../presentations/pizza/admin/views/EditTopping.vue'),
					},
				],
			},

			{
				path: '/admin/restaurants',
				name: 'AdminRestaurants',
				component: () => import(/* webpackChunkName: "restaurants" */ '../presentations/pizza/admin/views/Restaurants.vue'),
				children: [
					{
						path: '/admin/restaurants',
						name: 'AdminRestaurantsOverview',
						component: () => import(/* webpackChunkName: "adminRestaurantsOverview" */ '../presentations/pizza/admin/views/RestaurantsOverview.vue'),
					},

					{
						path: '/admin/restaurants/add',
						name: 'AdminAddRestaurant',
						component: () => import(/* webpackChunkName: "adminAddRestaurant" */ '../presentations/pizza/admin/views/AddRestaurant.vue'),
					},

					{
						path: '/admin/restaurants/edit/:id',
						name: 'AdminEditRestaurant',
						component: () => import(/* webpackChunkName: "adminEditRestaurant" */ '../presentations/pizza/admin/views/EditRestaurant.vue'),
					},
				],
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.afterEach((to) => {
	nextTick(() => {
		if (to.name) {
			// TODO: use translations of the page titles

			// Set page title by using the component name eg 'OrderType' -> 'Order Type - ePizza'
			document.title = `${capitalize(
				to.name
					.toString()
					.replace('Admin', '')
					.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)
					.trim(),
			)} - ePizza`;
		}
	});
});

export default router;
