<template>
	<NavigationBar :text="'Cart'" :previousPage="'/menu'" :backIcon="true" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Your cart</h1>

			<div v-if="state.pizzas && state.pizzas.length">
				<div v-for="(pizza, index) of state.pizzas" :key="pizza.id" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mt-8 mb-4">
					<div class="flex flex-col w-1/2 text-left pr-3">
						<span class="text-xl">{{ pizza.name }}</span>
						<span class="opacity-80">{{ pizza.size }}</span>
					</div>

					<div class="flex justify-end items-center w-1/2 pl-3">
						<ButtonExtraSmall @click="decreaseAmount(pizza, index, $event.currentTarget)" :text="'-'" :color="'red'" />
						<span class="font-semibold px-2">{{ pizza.amount }}</span>
						<ButtonExtraSmall @click="increaseAmount(pizza)" :text="'+'" :color="'red'" />
					</div>

					<div class="flex items-center w-full pt-3">
						<div class="flex w-3/4">
							<router-link :to="`/edit/${index}`" class="flex justify-center items-center bg-alpha-yellow text-white font-semibold text-lg w-24 h-8 rounded-lg shadow-md">Edit</router-link>
							<ButtonSmall @click="removePizza(index, $event.currentTarget)" class="ml-3" :text="'Remove'" :color="'orange'" />
						</div>

						<div class="w-1/4 font-semibold text-xl flex justify-end">€ {{ (pizza.price * (pizza.amount ? pizza.amount : 1)).toFixed(2) }}</div>
					</div>
				</div>
			</div>

			<div v-else class="text-lg mt-4">
				Your cart is empty.
			</div>

			<div class="flex justify-between font-semibold py-8">
				<span class="text-xl">Total</span>
				<span class="price">€ {{ state.total.toFixed(2) }}</span>
			</div>

			<ButtonBig :text="'Checkout'" :color="'red'" />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import store, { MutationTypes } from '@/store';

import Pizza from '@/models/Pizza';
import ButtonBig from '../components/ButtonBig.vue';
import ButtonSmall from '../components/ButtonSmall.vue';
import ButtonExtraSmall from '../components/ButtonExtraSmall.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

type State = {
	pizzas: Array<Pizza>;
	total: number;
};

export default defineComponent({
	components: {
		ButtonBig,
		ButtonSmall,
		ButtonExtraSmall,
		NavigationBar,
	},

	setup() {
		const state: State = reactive({
			pizzas: store.getters.getPizzas(),
			total: 0,
		});

		state.pizzas.forEach((pizza: Pizza) => {
			if (!pizza.amount) {
				pizza.amount = 1;
			}
		});

		const calculateTotal = () => {
			state.total = 0;
			state.pizzas.forEach((pizza: Pizza) => {
				state.total += pizza.price * (pizza.amount ? pizza.amount : 1);
			});
		};

		calculateTotal();

		const increaseAmount = (pizza: Pizza) => {
			pizza.amount!++;
			calculateTotal();
			// TODO: save to localStorage
		};

		const decreaseAmount = (pizza: Pizza, pizzaIndex: number, button: any) => {
			pizza.amount!--;

			if (pizza.amount == 0) {
				removePizza(pizzaIndex, button);
			} else {
				calculateTotal();
				// TODO: save to localStorage
			}
		};

		const editPizza = (pizza: Pizza) => {};

		const removePizza = (pizzaIndex: number, button: any) => {
			button.parentElement.parentElement.remove();
			if (pizzaIndex >= 0) {
				state.pizzas.splice(pizzaIndex, 1);
				calculateTotal();
			}
			// TODO: remove from localStorage
		};

		const checkout = () => {};

		return {
			state,
			decreaseAmount,
			increaseAmount,
			editPizza,
			removePizza,
			checkout,
		};
	},
});
</script>
