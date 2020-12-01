<template>
	<NavigationBar text="Add restaurant" :backIcon="true" previousPage="/admin/restaurants" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl mb-3">Add a new restaurant</h1>

			<InputField v-model="restaurant.name" label="Restaurant name" class="my-12" />

			<div class="flex">
				<InputField v-model="restaurant.streetName" label="Street" class="w-3/4 mr-3" />
				<InputField v-model="restaurant.houseNumber" label="No" class="w-1/4" />
			</div>

			<div class="flex">
				<InputField v-model="restaurant.city" label="City" class="w-3/4 mr-3" />
				<InputField v-model="restaurant.zipCode" label="Zip code" class="w-1/4" />
			</div>

			<InputField v-model="restaurant.phoneNumber" label="Phone number" type="tel" class="my-12" />

			<ButtonWide @click="addRestaurant" text="Add restaurant" color="red" />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import route from '@/router';

import { post } from '@/utils/api';
import Restaurant from '@/models/Restaurant';
import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

export default defineComponent({
	components: {
		InputField,
		ButtonWide,
		NavigationBar,
	},

	setup() {
		const restaurant: Restaurant = {
			name: '',
			streetName: '',
			houseNumber: 0,
			phoneNumber: '',
			zipCode: 0,
			city: '',
		};

		const addRestaurant = async () => {
			await post('restaurants', restaurant);

			route.push('/admin/restaurants');
		};

		return {
			restaurant,
			addRestaurant,
		};
	},
});
</script>
