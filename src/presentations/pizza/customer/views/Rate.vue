<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Rate the pizza margherita</h1>

			<form class="w-full mt-8">
				<InputField :label="'Name'" />

				<div class="relative">
					<textarea class="input block border border-dark border-opacity-25 rounded shadow-md px-3 py-2 focus:outline-none w-full" type="text" required></textarea>
					<label class="label absolute text-opacity-75 bg-white px-3 py-1 pointer-events-none">Your review</label>
				</div>

				<Rating class="flex justify-center my-6" v-model="newReview.rating" />

				<button class="text-white font-semibold text-lg bg-alpha-red px-12 py-2 rounded-lg w-full shadow-md">Submit</button>
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import InputField from '@/presentations/shared/components/InputField.vue';
import Rating from '../components/Rating.vue';

export default defineComponent({
	components: {
		InputField: InputField,
		Rating: Rating,
	},

	setup() {
		const newReview = reactive({
			rating: 0,
		});

		return {
			newReview: newReview,
		};
	},
});
</script>

<style lang="scss">
.main {
	width: 348px;
}
</style>

<style lang="scss">
.label {
	left: 4px;
	top: 6px;
	transition: 0.2s ease all;
	-moz-transition: 0.2s ease all;
	-webkit-transition: 0.2s ease all;
}

.input:focus,
.input:valid {
	// @apply border-alpha-green;

	& ~ .label {
		padding: 2px 12px;
		top: -16px;
		font-size: 14px;
		// @apply text-alpha-green;
	}
}
</style>
