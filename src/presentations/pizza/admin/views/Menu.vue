<template>
	<NavigationBar text="Menu" :menuIcon="true" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<div class="flex justify-between mb-8">
				<h1 class="font-semibold text-2xl">Menu list</h1>

				<router-link to="/admin/add" class="w-6 h-6 flex items-center justify-center rounded-full shadow-md bg-alpha-yellow text-white text-xl">+</router-link>
			</div>

			<div v-if="state.pizzas.length">
				<div v-for="(pizza, index) of state.pizzas" :key="pizza.id" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mb-6">
					<div class="w-full flex justify-between items-center">
						<span>{{ pizza.name }}</span>

						<div class="flex">
							<router-link :to="`/admin/edit/${pizza.id}`">
								<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
									<path d="M0 0h24v24H0z" fill="none" />
									<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
								</svg>
							</router-link>
							<button @click="removePizza(pizza.id, index)">
								<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
									<path d="M0 0h24v24H0z" fill="none" />
									<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
								</svg>
							</button>
						</div>
					</div>

					<div class="font-semibold mt-1">€ {{ pizza.price.toFixed(2) }}</div>
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

import { get, deleteById } from '@/utils/api';
import Pizza from '@/models/Pizza';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

type State = {
	pizzas: Array<Pizza>;
};

export default defineComponent({
	components: {
		NavigationBar,
	},

	setup() {
		const state: State = reactive({
			pizzas: [],
		});

		const getPizzas = async () => {
			const data = await get('pizzas');
			state.pizzas = data;
		};

		getPizzas();

		const removePizza = async (id: string, index: number) => {
			state.pizzas.splice(index, 1);

			await deleteById('pizzas', id);
		};

		return {
			state,
			removePizza,
		};
	},
});
</script>
