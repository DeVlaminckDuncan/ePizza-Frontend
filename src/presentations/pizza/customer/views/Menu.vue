<template>
	<NavigationBar :text="'Menu'" :previousPage="'/'" :backIcon="true" :cartIcon="true" />
	<!-- TODO: Previous page will be either delivery or takeaway - based on what the customer chose -->

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

			<div v-if="state.pizzas.length">
				<div v-for="pizza of state.pizzas" :key="pizza.id" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mb-6">
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
						<ButtonMedium @click="addToCart(pizza.id)" :text="'Add to cart'" :color="'red'" />
					</div>

					<div class="w-full flex justify-between pt-5">
						<router-link :to="`/details/${pizza.pizzaUrl}`">
							<span class="text-xl">{{ pizza.name }}</span>
						</router-link>

						<span class="price font-semibold">€ {{ pizza.price.toFixed(2) }}</span>
					</div>
				</div>
			</div>
			<div v-else>
				Loading...
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import route from '@/router';
import store, { MutationTypes } from '@/store';

import { get } from '@/utils/api';
import Pizza from '@/models/Pizza';
import DropdownList from '@/presentations/pizza/shared/components/DropdownList.vue';
import ButtonMedium from '@/presentations/pizza/shared/components/ButtonMedium.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

type PizzasState = {
	pizzas: Array<Pizza>;
};

export default defineComponent({
	components: {
		DropdownList,
		ButtonMedium,
		NavigationBar,
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
				pizza.pizzaUrl = pizza.id;
			});
		};

		getPizzas();

		const addToCart = (id: string) => {
			const pizza = state.pizzas.find((p) => p.id == id);
			store.commit(MutationTypes.ADD_PIZZA, pizza);
			route.push({ name: 'Cart' });
		};

		return {
			state,
			addToCart,
		};
	},
});
</script>
