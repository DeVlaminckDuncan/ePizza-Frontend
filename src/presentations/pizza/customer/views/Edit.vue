<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Edit your toppings</h1>

			<div class="flex flex-wrap items-center pt-8 mb-12">
				<div class="w-1/2">
					<img class="pizza-image rounded-lg" :src="state.pizza.imgUrl" :alt="`Pizza ${state.pizza.name}`" />
				</div>

				<div class="flex flex-col items-end w-1/2">
					<p class="text-xl text-right font-semibold">{{ state.pizza.name }}</p>

					<span class="price text-right font-semibold my-6">€ {{ state.pizza.price.toFixed(2) }}</span>

					<ButtonMedium @click="addToCart" class="bg-alpha-red" :text="'Add to cart'" :color="'red'" />
				</div>
			</div>

			<div :ref="state.toppings" v-for="topping of state.pizza.toppings" :key="topping" class="flex flex-wrap justify-between items-center w-full text-lg mb-2">
				<div class="flex">
					<ButtonExtraSmall @click="decreaseTopping(topping, $event.currentTarget)" :text="'-'" :color="'red'" />
				</div>

				{{ topping }}

				<div class="flex">
					<ButtonExtraSmall @click="increaseTopping(topping, $event.currentTarget)" class="bg-alpha-green" :text="'+'" :color="'green'" />
					<ButtonExtraSmall @click="increaseTopping(topping, $event.currentTarget)" class="opacity-50 mx-1" :text="'+'" :color="'green'" />
					<ButtonExtraSmall @click="increaseTopping(topping, $event.currentTarget)" class="opacity-50" :text="'+'" :color="'green'" />
				</div>
			</div>

			

			<p class="text-2xl text-left font-semibold mt-12">Add more toppings</p>

			<div class="flex flex-wrap justify-between items-center w-full text-lg mt-4">
				<span class="font-semibold">€ 1.50</span>

				Bacon

				<button @click="addTopping" class="text-white font-semibold  bg-alpha-yellow px-4 py-1 rounded-lg shadow-md">Add</button>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import route from '@/router';

import { get } from '@/utils/api';
import Pizza from '@/models/Pizza';
import ButtonMedium from '@/presentations/pizza/shared/components/ButtonMedium.vue';
import ButtonExtraSmall from '../components/ButtonExtraSmall.vue';

type Topping = {
	name: string;
	amount: number;
};

type PizzaState = {
	pizza: Pizza;
	toppings: Array<Topping>;
};

export default defineComponent({
	components: {
		ButtonMedium: ButtonMedium,
		ButtonExtraSmall: ButtonExtraSmall,
	},

	setup() {
		const state: PizzaState = reactive({
			pizza: {
				id: ref(route.currentRoute.value.params.id).value as string,
				name: '',
				price: 0,
				imgUrl: '',
				toppings: [],
				reviews: [],

				pizzaUrl: '',
			},

			toppings: [],
		});

		const getPizza = async () => {
			const data = await get(`pizzas/${state.pizza.id}`);

			state.pizza.name = data.name;
			state.pizza.price = data.price;
			state.pizza.imgUrl = data.imgUrl;
			state.pizza.toppings = data.topppings;
			state.pizza.reviews = data.orderReviews;
			// pizza.pizzaUrl = pizza.name.toLowerCase().replaceAll(' ', '-');
			state.pizza.pizzaUrl = state.pizza.id;
		};

		getPizza();

		const addToCart = () => {
			console.log('adding pizza to cart');
		};

		const increaseTopping = (topping: string, button: any) => {
			const toppingIndex = state.toppings.findIndex((t) => t.name == topping);
			let amount = 2;

			if (toppingIndex == -1) {
				state.toppings.push({
					name: topping,
					amount: amount,
				});
			} else if (state.toppings[toppingIndex].amount < 3) {
				state.toppings[toppingIndex].amount++;
				amount = state.toppings[toppingIndex].amount;
			}

			const buttons = button.parentElement.children;
			if (amount > 0) {
				buttons[amount - 1].classList.remove('opacity-50');
			}

			console.log(state.toppings);
		};

		const decreaseTopping = (topping: string, button: any) => {
			const toppingIndex = state.toppings.findIndex((t) => t.name == topping);
			let amount = 0;

			if (toppingIndex != -1 && state.toppings[toppingIndex].amount > 0) {
				state.toppings[toppingIndex].amount--;
				amount = state.toppings[toppingIndex].amount;
			}

			const buttons = button.parentElement.parentElement.children[1].children;
			buttons[amount].classList.add('opacity-50');
			if (amount > 0) {
				buttons[amount - 1].classList.remove('opacity-50');
			} else {
				button.parentElement.parentElement.remove();
				if (toppingIndex != -1) {
					delete state.toppings[toppingIndex];
				}
			}

			console.log(state.toppings);
		};

		const addTopping = () => {};

		return {
			state,
			addToCart,
			increaseTopping,
			decreaseTopping,
			addTopping,
		};
	},
});
</script>
