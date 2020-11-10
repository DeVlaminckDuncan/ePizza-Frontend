<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<div class="flex justify-between items-center px-3 mb-8">
				<h1 class="font-semibold text-2xl">Menu list</h1>
				<DropdownList
					:label="'Filter'"
					:options="[
						{
							text: 'Filter1',
						},
						{
							text: 'Filter2',
						},
						{
							text: 'Filter3',
						},
					]"
				/>
			</div>

			<div v-for="pizza of state.pizzas" :key="pizza.pizzaId" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mb-6">
				<div class="w-1/2">
					<router-link :to="`/details/${pizza.pizzaUrl}`">
						<img class="pizza-image rounded-lg" :src="pizza.imgUrl" :alt="`Pizza ${pizza.name.toLowerCase()}`" />
					</router-link>
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
					<router-link :to="`/edit/${pizza.pizzaUrl}`" class="button-md flex justify-center items-center bg-alpha-yellow text-white font-semibold text-lg h-8 my-6 rounded-lg shadow-md">Edit toppings</router-link>
					<ButtonMedium @click="addToCart(pizza.pizzaId)" :text="'Add to cart'" :color="'red'" />
				</div>

				<div class="w-full flex justify-between pt-5">
					<router-link :to="`/details/${pizza.pizzaUrl}`">
						<span class="text-xl">{{ pizza.name }}</span>
					</router-link>

					<span class="price font-semibold">€ {{ pizza.price.toFixed(2) }}</span>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { get } from '@/utils/api';
import Pizza from '@/models/Pizza';
import DropdownList from '@/presentations/pizza/shared/components/DropdownList.vue';
import ButtonMedium from '@/presentations/pizza/shared/components/ButtonMedium.vue';

type PizzasState = {
	pizzas: Array<Pizza>;
};

export default defineComponent({
	components: {
		DropdownList: DropdownList,
		ButtonMedium: ButtonMedium,
	},

	setup() {
		const state: PizzasState = reactive({
			pizzas: [],
		});

		const getPizzas = async () => {
			const data = await get('pizzas');
			state.pizzas = data;
			state.pizzas.forEach((pizza) => {
				// pizza.pizzaUrl = pizza.name.toLowerCase().replaceAll(' ', '-');
				pizza.pizzaUrl = pizza.pizzaId;
			});
		};

		getPizzas();

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
