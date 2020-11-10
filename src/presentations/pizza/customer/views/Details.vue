<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">{{ state.pizza.name }}</h1>

			<div class="flex flex-wrap items-center pt-8">
				<div class="w-1/2">
					<img class="pizza-image rounded-lg" :src="state.pizza.imgUrl" :alt="`Pizza ${state.pizza.name}`" />
				</div>

				<div class="flex items-end flex-col w-1/2">
					<DropdownList
						class="select-md"
						:options="[
							{
								text: 'Small',
							},
							{
								text: 'Medium',
								selected: true,
							},
							{
								text: 'Large',
							},
						]"
					/>
					<router-link :to="`/edit/${state.pizza.pizzaUrl}`" class="button-md flex justify-center items-center bg-alpha-yellow text-white font-semibold text-lg h-8 my-6 rounded-lg shadow-md">Edit toppings</router-link>
					<ButtonMedium @click="addToCart(state.pizza.pizzaId)" :text="'Add to cart'" :color="'red'" />
				</div>

				<div class="w-full flex justify-between pt-5">
					<div class="text-left">
						<p class="text-lg">{{ state.pizza.name }}</p>
						<p>{{ state.pizza.pizzaToppings }}.</p>
					</div>

					<div class="price font-semibold">€ {{ state.pizza.price.toFixed(2) }}</div>
				</div>
			</div>

			<div class="flex justify-between items-center mt-8">
				<p class="text-2xl font-semibold">Ratings</p>
				<router-link :to="`/rate/${state.pizza.pizzaUrl}`" class="button-md flex justify-center items-center bg-alpha-orange text-white font-semibold text-lg h-8 my-6 rounded-lg shadow-md">Rate this pizza</router-link>
			</div>

			<div v-if="state.pizza.orderReviews != null">
				<div v-for="review of state.pizza.orderReviews" :key="review.reviewId" class="flex flex-wrap border border-dark border-opacity-5 rounded-lg shadow-md p-3 mt-8">
					<div class="flex flex-wrap w-full justify-between">
						<div class="w-1/2 text-lg text-left">
							{{ review.title }}
						</div>

						<div class="flex">
							<svg fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
								<path d="M0 0h24v24H0z" fill="none" />
								<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
							</svg>
							<svg fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
								<path d="M0 0h24v24H0z" fill="none" />
								<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
							</svg>
							<svg fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
								<path d="M0 0h24v24H0z" fill="none" />
								<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
							</svg>
							<svg fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
								<path d="M0 0h24v24H0z" fill="none" />
								<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
							</svg>
							<svg class="opacity-50" fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
								<path d="M0 0h24v24H0z" fill="none" />
								<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
							</svg>
						</div>
					</div>

					<div class="text-left">
						{{ review.description }}
					</div>
				</div>
			</div>
			<div v-else>
				There are no ratings yet for this pizza.
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import route from '@/router';

import { get } from '@/utils/api';
import Pizza from '@/models/Pizza';
import DropdownList from '@/presentations/pizza/shared/components/DropdownList.vue';
import ButtonMedium from '@/presentations/pizza/shared/components/ButtonMedium.vue';

type PizzaState = {
	pizza: Pizza;
};

export default defineComponent({
	components: {
		DropdownList: DropdownList,
		ButtonMedium: ButtonMedium,
	},

	setup() {
		const state: PizzaState = reactive({
			pizza: {
				pizzaId: ref(route.currentRoute.value.params.id).value as string,
				name: '',
				price: 0,
				imgUrl: '',
				pizzaToppings: [],
				orderReviews: [],

				pizzaUrl: '',
			},
		});

		const getPizza = async () => {
			const data = await get(`pizzas/${state.pizza.pizzaId}`);
			state.pizza = data;
			// pizza.pizzaUrl = pizza.name.toLowerCase().replaceAll(' ', '-');
			state.pizza.pizzaUrl = state.pizza.pizzaId;
		};

		getPizza();

		const addToCart = (pizzaId: string) => {
			console.log('adding pizza to cart:', pizzaId);
		};

		return {
			state: state,
			addToCart: addToCart,
		};
	},
});
</script>
