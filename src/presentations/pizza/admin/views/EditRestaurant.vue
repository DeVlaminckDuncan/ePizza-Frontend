<template>
	<NavigationBar text="Edit restaurant" :backIcon="true" previousPage="/admin/restaurants" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<div v-if="state.restaurant.name != ''">
				<h1 class="font-semibold text-2xl mb-3">Edit restaurant {{ state.restaurant.name.toLowerCase() }}</h1>

				<InputField v-model="state.restaurant.name" label="Restaurant name" :value="state.restaurant.name" class="my-12" />

				<div class="flex">
					<InputField v-model="state.restaurant.streetName" label="Street" :value="state.restaurant.streetName" class="w-3/4 mr-3" />
					<InputField v-model="state.restaurant.houseNumber" label="No" :value="state.restaurant.houseNumber.toString()" class="w-1/4" />
				</div>

				<div class="flex">
					<InputField v-model="state.restaurant.city" label="City" :value="state.restaurant.city" class="w-3/4 mr-3" />
					<InputField v-model="state.restaurant.zipCode" label="Zip code" :value="state.restaurant.zipCode.toString()" class="w-1/4" />
				</div>

				<InputField v-model="state.restaurant.phoneNumber" label="Phone number" type="tel" :value="state.restaurant.phoneNumber" class="my-12" />

				<Button @click="saveChanges" text="Save changes" color="red" :classes="['w-full', 'px-12', 'py-2', 'text-lg', 'rounded-lg']" />
			</div>
			<div v-else-if="state.error">
				<p class="text-lg text-alpha-red">{{ $t('ERROR-LOADING-RESTAURANT') }}</p>
			</div>
			<div v-else>
				<LoadingIcon />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import route from '@/router';

import { get, put } from '@/utils/api';
import cookie from '@/utils/cookie';
import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import Button from '@/presentations/pizza/shared/components/Button.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import LoadingIcon from '@/presentations/pizza/shared/components/LoadingIcon.vue';

type State = {
	restaurant: any;
	error: Boolean;
};

export default defineComponent({
	components: {
		InputField,
		Button,
		NavigationBar,
		LoadingIcon,
	},

	setup() {
		const state: State = reactive({
			restaurant: {
				id: ref(route.currentRoute.value.params.id).value as string,
				name: '',
				streetName: '',
				houseNumber: 0,
				phoneNumber: '',
				zipCode: 0,
				city: '',
			},
			error: false,
		});

		const getRestaurant = async () => {
			const data = await get(`restaurants/${state.restaurant.id}`);

			if (data == null) {
				state.error = true;
			} else {
				state.restaurant = data;
			}
		};

		getRestaurant();

		const saveChanges = async () => {
			const token = cookie.get('token');

			await put('restaurants', state.restaurant.id, state.restaurant, token);

			route.push('/admin/restaurants');
		};

		return {
			state,
			saveChanges,
		};
	},
});
</script>
