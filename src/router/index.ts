import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	// Customer routes
	{
		path: '/',
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
		path: '/editToppings/:id',
		name: 'EditToppings',
		component: () => import(/* webpackChunkName: "editToppings" */ '../presentations/pizza/customer/views/EditToppings.vue'),
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

	// Admin routes
	{
		path: '/admin/login',
		name: 'Login',
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

	{
		path: '/admin/menu',
		name: 'Menu',
		component: () => import(/* webpackChunkName: "menu" */ '../presentations/pizza/admin/views/Menu.vue'),
	},

	{
		path: '/admin/edit/:id',
		name: 'Edit',
		component: () => import(/* webpackChunkName: "edit" */ '../presentations/pizza/admin/views/Edit.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
