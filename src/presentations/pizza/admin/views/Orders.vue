<template>
	<NavigationBar text="Orders" :menuIcon="true" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Today's orders</h1>

			<DatePicker @click="changePeriod" class="mt-4 mb-8" />

			<div v-if="state.orders.length">
				<div v-for="order of state.orders" :key="order.id" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3">
					<div class="w-full flex justify-between">
						<div class="font-semibold">Order #{{ order.id }}</div>
						<div>
							{{ order.date }}
						</div>
					</div>

					<div class="w-full text-left">Customer #{{ order.customer.id }}</div>

					<div class="w-full flex justify-between">
						<div class="font-semibold">
							{{ order.orderType }}
						</div>
						<div class="text-right">
							{{ order.location }}
						</div>
					</div>

					<div v-for="pizza of order.pizzas" :key="pizza.id" class="w-full flex justify-between text-lg mt-1">
						<div class="flex flex-col items-start">
							<span>{{ pizza.amount }} x {{ pizza.name }}</span>
							<span class="text-base opacity-80">{{ pizza.size }}</span>
						</div>
						<div>{{ makePricePrettier(pizza.price) }}</div>
					</div>

					<div class="w-full flex justify-between items-center mt-6">
						<div class="text-xl">
							Total
						</div>
						<div class="price font-semibold">{{ makePricePrettier(order.total) }}</div>
					</div>
				</div>
			</div>
			<div v-else-if="!dataLoaded" class="text-lg">
				There are no orders yet.
			</div>
			<div v-else class="text-lg">
				Loading...
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import { get } from '@/utils/api';
import { makePricePrettier } from '@/utils/dataFormattings';
import Order from '@/models/Order';
import DatePicker from '../components/DatePicker.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

type State = {
	orders: Array<Order>;
};

export default defineComponent({
	components: {
		DatePicker,
		NavigationBar,
	},

	setup() {
		const state: State = reactive({
			orders: [],
		});

		const dataLoaded = ref(false);

		const getOrders = async () => {
			const data = await get('orders');

			state.orders = data;
			dataLoaded.value = true;
		};

		// getOrders();

		const changePeriod = () => {};

		return {
			state,
			dataLoaded,
			changePeriod,
			makePricePrettier,
		};
	},
});
</script>
