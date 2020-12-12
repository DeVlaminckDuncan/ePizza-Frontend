<template>
	<NavigationBar text="Restaurants" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<div class="flex justify-between mb-8">
				<h1 class="font-semibold text-2xl">Restaurants</h1>

				<router-link to="/admin/restaurants/add" class="w-6 h-6 flex items-center justify-center rounded-full shadow-md bg-alpha-yellow text-white text-xl">+</router-link>
			</div>

			<div v-if="state.restaurants.length">
				<div v-for="(restaurant, index) of state.restaurants" :key="restaurant.id" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mb-6">
					<div class="w-full flex justify-between items-center">
						<span>{{ restaurant.name }}</span>

						<div class="flex">
							<router-link :to="`/admin/restaurants/edit/${restaurant.id}`">
								<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
									<path d="M0 0h24v24H0z" fill="none" />
									<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
								</svg>
							</router-link>
							<button @click="removeRestaurant(restaurant.id ? restaurant.id : '', index)">
								<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
									<path d="M0 0h24v24H0z" fill="none" />
									<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
								</svg>
							</button>
						</div>
					</div>

					<div class="font-semibold mt-1">{{ restaurant.city }}</div>
				</div>
			</div>

			<div v-else>
				<LoadingIcon />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { get, deleteById } from '@/utils/api';
import cookie from '@/utils/cookie';
import Restaurant from '@/models/Restaurant';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import LoadingIcon from '@/presentations/pizza/shared/components/LoadingIcon.vue';

type State = {
	restaurants: Array<Restaurant>;
};

export default defineComponent({
	components: {
		NavigationBar,
		LoadingIcon,
	},

	setup() {
		const state: State = reactive({
			restaurants: [],
		});

		const getRestaurants = async () => {
			const data = await get('restaurants');

			state.restaurants = data;
		};

		getRestaurants();

		const removeRestaurant = async (id: string, index: number) => {
			if (id != '') {
				state.restaurants.splice(index, 1);

				const token = cookie.get('token');

				await deleteById('restaurants', id, token);
			}
		};

		return {
			state,
			removeRestaurant,
		};
	},
});
</script>
