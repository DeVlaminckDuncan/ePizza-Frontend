<template>
	<NavigationBar text="Edit restaurant" :backIcon="true" previousPage="/admin/restaurants" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl mb-3">Edit restaurant {{ restaurant.name.toLowerCase() }}</h1>

			<InputField v-model="restaurant.name" label="Restaurant name" :value="restaurant.name" class="my-12" />

			<div class="flex">
				<InputField v-model="restaurant.streetName" label="Street" :value="restaurant.streetName" class="w-3/4 mr-3" />
				<InputField v-model="restaurant.houseNumber" label="No" :value="restaurant.houseNumber.toString()" class="w-1/4" />
			</div>

			<div class="flex">
				<InputField v-model="restaurant.city" label="City" :value="restaurant.city" class="w-3/4 mr-3" />
				<InputField v-model="restaurant.zipCode" label="Zip code" :value="restaurant.zipCode.toString()" class="w-1/4" />
			</div>

			<InputField v-model="restaurant.phoneNumber" label="Phone number" type="tel" :value="restaurant.phoneNumber" class="my-12" />

			<ButtonWide @click="saveChanges" text="Save changes" color="red" />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import route from '@/router';

import { get, put } from '@/utils/api';
import cookie from '@/utils/cookie';
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
		const restaurant = ref({
			id: ref(route.currentRoute.value.params.id).value as string,
			name: '',
			streetName: '',
			houseNumber: 0,
			phoneNumber: '',
			zipCode: 0,
			city: '',
		});

		const getRestaurant = async () => {
			const data = await get(`restaurants/${restaurant.value.id}`);

			restaurant.value = data;
		};

		getRestaurant();

		const saveChanges = async () => {
			const token = cookie.get('token');

			await put('restaurants', restaurant.value.id, restaurant.value, token);

			route.push('/admin/restaurants');
		};

		return {
			restaurant,
			saveChanges,
		};
	},
});
</script>
