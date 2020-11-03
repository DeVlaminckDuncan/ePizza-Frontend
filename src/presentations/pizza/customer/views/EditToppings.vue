<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Edit your toppings</h1>

			<div class="flex flex-wrap items-center pt-8">
				<div class="w-1/2">
					<img class="pizza-image rounded-lg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/320px-Pizza_Margherita_stu_spivack.jpg" alt="Pizza margherita" />
				</div>

				<div class="flex flex-col items-end w-1/2">
					<p class="text-xl text-right font-semibold">Pizza margherita</p>

					<span class="price text-right font-semibold my-6">€ 8.00</span>

					<ButtonMedium :text="'Add to cart'" :color="'red'" />
				</div>
			</div>

			<div class="flex flex-wrap justify-between items-center w-full text-lg mt-12">
				<div class="flex">
					<ButtonExtraSmall :text="'-'" :color="'red'" />
				</div>

				Mozzarella

				<div class="flex">
					<ButtonExtraSmall :text="'+'" :color="'green'" />
					<ButtonExtraSmall class="opacity-50 mx-1" :text="'+'" :color="'green'" />
					<ButtonExtraSmall class="opacity-50" :text="'+'" :color="'green'" />
				</div>
			</div>

			<p class="text-2xl text-left font-semibold mt-12">Add more toppings</p>

			<div class="flex flex-wrap justify-between items-center w-full text-lg mt-4">
				<span class="font-semibold">€ 1.50</span>

				Bacon

				<button @click="addTopping" class="text-white font-semibold  bg-alpha-yellow px-4 py-1 rounded-lg shadow-md">Add</button>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ButtonMedium from '../components/ButtonMedium.vue';
import ButtonExtraSmall from '../components/ButtonExtraSmall.vue';

export default defineComponent({
	components: {
		ButtonMedium: ButtonMedium,
		ButtonExtraSmall: ButtonExtraSmall,
	},

	setup() {
		const addToCart = () => {};

		const addTopping = () => {};

		const increaseTopping = () => {};

		const decreaseTopping = () => {};

		return {
			addToCart: addToCart,
			addTopping: addTopping,
			increaseTopping: increaseTopping,
			decreaseTopping: decreaseTopping,
		};
	},
});
</script>
