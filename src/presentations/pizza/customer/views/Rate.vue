<template>
	<NavigationBar text="Order type" :backIcon="true" :cartIcon="true" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Rate the pizza {{ pizzaName }}</h1>

			<div class="w-full mt-8">
				<InputField v-model="newReview.name" label="Name" />

				<div class="relative">
					<textarea v-model="newReview.review" class="input block border border-dark border-opacity-25 rounded shadow-md px-3 py-2 focus:outline-none w-full" type="text" required></textarea>
					<label class="label absolute text-opacity-75 bg-white px-3 py-1 pointer-events-none">Your review</label>
				</div>

				<Rating class="flex justify-center my-6" v-model="newReview.rating" />

				<ButtonWide @click="submitReview" text="Submit" color="red" />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import route from '@/router';

import { get, post } from '@/utils/api';
import cookie from '@/utils/cookie';
import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import Rating from '../components/Rating.vue';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

export default defineComponent({
	components: {
		InputField,
		Rating,
		ButtonWide,
		NavigationBar,
	},

	setup() {
		const pizzaName = ref('');
		let pizzaId = '';

		const newReview = {
			name: '',
			review: '',
			rating: 0,
		};

		const getPizza = async () => {
			pizzaId = ref(route.currentRoute.value.params.id).value as string;

			const data = await get(`pizzas/${pizzaId}`);

			pizzaName.value = data.name;
		};

		getPizza();

		const submitReview = async () => {
			const data = newReview;
			data.rating = +data.rating;

			const token = cookie.get('token');

			await post('ratings', data, token);

			route.push(`/details/${pizzaId}`);
		};

		return {
			pizzaName,
			newReview,
			submitReview,
		};
	},
});
</script>
