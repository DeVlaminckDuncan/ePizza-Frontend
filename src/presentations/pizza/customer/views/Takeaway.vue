<template>
	<NavigationBar text="Takeaway" :backIcon="true" previousPage="/" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Choose a restaurant</h1>

			<form class="w-full mt-8">
				<div v-if="state.restaurants.length">
					<div v-for="restaurant of state.restaurants" :key="restaurant.id" class="mb-4">
						<input @click="state.selectedRestaurant = restaurant" :id="restaurant.id" :value="restaurant.name" type="radio" name="restaurant" class="mr-2" />
						<label :for="restaurant.id" class="text-lg">{{ restaurant.name }}</label>
						<p>{{ `${restaurant.streetName} ${restaurant.houseNumber}, ${restaurant.city}` }}</p>
						<a :href="`tel:${restaurant.phoneNumber.toString().replaceAll(' ', '')}`">{{ restaurant.phoneNumber }}</a>
					</div>
				</div>
				<div v-else>
					Loading restaurants...
				</div>

				<ButtonWide @click="continueToMenu" text="Continue" color="red" class="mt-4" />
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import route from '@/router';
import store, { MutationTypes } from '@/store';

import { get } from '@/utils/api';
import Restaurant from '@/models/Restaurant';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

type State = {
	restaurants: Array<Restaurant>;
	selectedRestaurant: Restaurant;
};

export default defineComponent({
	components: {
		ButtonWide,
		NavigationBar,
	},

	setup() {
		const state: State = reactive({
			restaurants: [],
			selectedRestaurant: {
				id: '',
				name: '',
				streetName: '',
				houseNumber: 0,
				phoneNumber: '',
				zipCode: 0,
				city: '',
			},
		});

		const getRestaurants = async () => {
			const data = await get('restaurants');
			state.restaurants = data;
		};

		getRestaurants();

		const continueToMenu = (event: Event) => {
			event.preventDefault();

			store.commit(MutationTypes.SET_ORDER_TYPE, {
				orderType: 'takeaway',
				orderTypeData: state.selectedRestaurant,
			});

			route.push({ name: 'Menu' });
		};

		return {
			state,
			continueToMenu,
		};
	},
});
</script>
