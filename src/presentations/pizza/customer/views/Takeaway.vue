<template>
	<NavigationBar :text="$t('ORDERTYPE-TAKEAWAY')" :backIcon="true" previousPage="/ordertype" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">{{ $t('PAGE-INFO-TAKEAWAY') }}</h1>

			<form class="w-full mt-8">
				<div v-if="state.restaurants.length">
					<div v-for="restaurant of state.restaurants" :key="restaurant.id" class="mb-4">
						<input @click="state.selectedRestaurant = restaurant" :id="restaurant.id" :value="restaurant.name" type="radio" name="restaurant" class="mr-2" />
						<label :for="restaurant.id" class="text-lg">{{ restaurant.name }}</label>
						<p>{{ `${restaurant.street} ${restaurant.houseNumber}, ${restaurant['main_city_name']}` }}</p>
						<a :href="`tel:${restaurant.phone.toString().replaceAll(' ', '')}`">{{ restaurant.phoneNumber }}</a>
					</div>
				</div>
				<div v-else-if="state.error" class="mb-4">
					<p class="text-lg text-alpha-red">{{ $t('ERROR-LOADING-RESTAURANTS') }}</p>
				</div>
				<div v-else>
					<LoadingIcon />
				</div>

				<Button v-if="!state.error" @click="continueToMenu" :text="$t('BUTTON-CONTINUE')" color="red" class="mt-4" :classes="['w-full', 'px-12', 'py-2', 'text-lg', 'rounded-lg']" />
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
import Button from '@/presentations/pizza/shared/components/Button.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import LoadingIcon from '@/presentations/pizza/shared/components/LoadingIcon.vue';

type State = {
	restaurants: Array<Restaurant>;
	selectedRestaurant: Restaurant;
	error: Boolean;
};

export default defineComponent({
	components: {
		Button,
		NavigationBar,
		LoadingIcon,
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
				postalCode: 0,
				city: '',
			},
			error: false,
		});

		const getRestaurants = async () => {
			const data = await get('restaurants');
			if (data == null) {
				state.error = true;
			} else {
				state.restaurants = data;
			}
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
