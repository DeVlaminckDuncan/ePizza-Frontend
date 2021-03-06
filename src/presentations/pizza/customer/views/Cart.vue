<template>
	<NavigationBar text="Cart" :backIcon="true" previousPage="/menu" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Your cart</h1>

			<div v-if="state.pizzas && state.pizzas.length">
				<div v-for="pizza of state.pizzas" :key="pizza.id" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mt-8 mb-4">
					<div class="flex flex-col w-1/2 text-left pr-3">
						<router-link :to="`/details/${pizza.idbId}`" class="text-xl">{{ pizza.name }}</router-link>
						<span class="opacity-80">{{ pizza.size }}</span>
					</div>

					<div class="flex justify-end items-center w-1/2 pl-3">
						<Button @click="decreaseAmount(pizza)" text="-" color="red" :classes="['w-4', 'h-4', 'flex', 'justify-center', 'items-center', 'text-sm', 'rounded']" />
						<span class="font-semibold px-2">{{ pizza.amount }}</span>
						<Button @click="increaseAmount(pizza)" text="+" color="red" :classes="['w-4', 'h-4', 'flex', 'justify-center', 'items-center', 'text-sm', 'rounded']" />
					</div>

					<div class="flex items-center w-full pt-3">
						<div class="flex w-3/4">
							<router-link :to="`/edit/${pizza.idbId}`" class="flex justify-center items-center bg-alpha-yellow text-white font-semibold text-lg w-24 h-8 rounded-lg shadow-md">Edit</router-link>
							<Button @click="removePizza(pizza)" class="ml-3" text="Remove" color="orange" :classes="['w-24', 'h-8', 'text-lg', 'rounded-lg']" />
						</div>

						<div class="w-1/4 font-semibold text-xl flex justify-end">{{ makePricePrettier(sizeMultiplier(pizza.totalPrice ? pizza.totalPrice : pizza.price, pizza.size) * (pizza.amount ? pizza.amount : 1)) }}</div>
					</div>
				</div>
			</div>

			<div v-else class="text-lg mt-4">
				Your cart is empty.
			</div>

			<div class="flex justify-between font-semibold py-8">
				<span class="text-xl">Total</span>
				<span class="price">{{ makePricePrettier(state.total) }}</span>
			</div>

			<Button v-if="state.pizzas && state.pizzas.length" @click="checkout" text="Checkout" color="red" :classes="['w-full', 'h-16', 'text-2xl', 'rounded-lg']" />
			<router-link to="/menu" v-else class="button-lg flex justify-center items-center text-white font-semibold text-lg bg-alpha-red px-12 py-2 rounded-lg shadow-md">Menu</router-link>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import route from '@/router';

import cookie from '@/utils/cookie';
import { getItems, editItem, deleteItem } from '@/utils/idb';
import { makePricePrettier, sizeMultiplier } from '@/utils/dataFormattings';
import Pizza from '@/models/Pizza';
import Topping from '@/models/Topping';
import Button from '@/presentations/pizza/shared/components/Button.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import { post } from '@/utils/api';

type State = {
	pizzas: Array<Pizza>;
	total: number;
};

export default defineComponent({
	components: {
		Button,
		NavigationBar,
	},

	setup() {
		const state: State = reactive({
			pizzas: [],
			total: 0,
		});

		const getPizzas = async () => {
			const data = await getItems('pizzas');

			state.pizzas = data;

			state.pizzas.forEach((pizza: Pizza) => {
				if (!pizza.amount) {
					pizza.amount = 1;
				}

				if (pizza.toppings && pizza.toppings.length) {
					pizza.totalPrice = pizza.price + pizza.toppings.reduce((a, b) => a + (b.price ? b.price : 0) * (b.amount ? b.amount : 1), 0);
				}
			});

			calculateTotal();
		};

		getPizzas();

		const calculateTotal = () => {
			state.total = state.pizzas.reduce((a, b) => a + sizeMultiplier(b.totalPrice ? b.totalPrice : b.price, b.size) * (b.amount ? b.amount : 1), 0);
		};

		const removeReactivityFromPizza = (pizza: Pizza) => {
			const data = {
				idbId: pizza.idbId,
				id: pizza.id,
				name: pizza.name,
				price: pizza.price,
				imgUrl: pizza.imgUrl,
				amount: pizza.amount,
				size: pizza.size,
				toppings: [],
			};

			if (pizza.toppings) {
				pizza.toppings.forEach((t) => {
					const topping: Topping = {
						id: t.id,
						name: t.name,
						price: t.price,
						amount: t.amount,
					};
					// @ts-ignore
					data.toppings.push(topping);
				});
			}

			return data;
		};

		const increaseAmount = async (pizza: Pizza) => {
			pizza.amount!++;

			calculateTotal();

			const data = removeReactivityFromPizza(pizza);

			await editItem('pizzas', data);
		};

		const decreaseAmount = async (pizza: Pizza) => {
			pizza.amount!--;

			if (pizza.amount == 0) {
				removePizza(pizza);
			} else {
				calculateTotal();

				const data = removeReactivityFromPizza(pizza);

				await editItem('pizzas', data);
			}
		};

		const removePizza = async (pizza: Pizza) => {
			const index = state.pizzas.findIndex((p) => p.id == pizza.id);
			state.pizzas.splice(index, 1);

			calculateTotal();

			const data = removeReactivityFromPizza(pizza);

			await deleteItem('pizzas', data);
		};

		const checkout = async () => {
			const pizzasData = JSON.parse(JSON.stringify(state.pizzas));

			const token = cookie.get('token');

			if (token != '') {
				await post('orders', pizzasData, token);

				state.pizzas.forEach(async (p) => {
					const data = removeReactivityFromPizza(p);
					await deleteItem('pizzas', data);
				});

				route.push('/orderplaced');
			} else {
				route.push('/login?redirect=/cart');
			}
		};

		return {
			state,
			decreaseAmount,
			increaseAmount,
			removePizza,
			checkout,
			makePricePrettier,
			sizeMultiplier,
		};
	},
});
</script>
