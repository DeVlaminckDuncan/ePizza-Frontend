<template>
	<NavigationBar :text="'Cart'" :previousPage="'/menu'" :backIcon="true" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Your cart</h1>

			<div class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mt-8">
				<div class="flex flex-col w-1/2 text-left pr-3">
					<span class="text-xl">Pizza margherita</span>
					<span class="opacity-80">Medium</span>
				</div>

				<div class="flex justify-end items-center w-1/2 pl-3">
					<ButtonExtraSmall :text="'-'" :color="'red'" />
					<span class="font-semibold px-2">1</span>
					<ButtonExtraSmall :text="'+'" :color="'red'" />
				</div>

				<div class="flex items-center w-full pt-3">
					<div class="flex w-3/4">
						<ButtonSmall :text="'Edit'" :color="'yellow'" />
						<ButtonSmall class="ml-3" :text="'Remove'" :color="'orange'" />
					</div>

					<div class="w-1/4 font-semibold text-xl flex justify-end">
						€ 8.00
					</div>
				</div>
			</div>

			<div class="flex justify-between font-semibold py-8">
				<span class="text-xl">Total</span>
				<span class="price">€ 8.00</span>
			</div>

			<ButtonBig :text="'Checkout'" :color="'red'" />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ButtonBig from '../components/ButtonBig.vue';
import ButtonSmall from '../components/ButtonSmall.vue';
import ButtonExtraSmall from '../components/ButtonExtraSmall.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

export default defineComponent({
	components: {
		ButtonBig,
		ButtonSmall,
		ButtonExtraSmall,
		NavigationBar,
	},

	setup() {
		const decreaseAmount = () => {};

		const increaseAmount = () => {};

		const editPizza = () => {};

		const removePizza = () => {};

		const checkout = () => {};

		return {
			decreaseAmount: decreaseAmount,
			increaseAmount: increaseAmount,
			editPizza: editPizza,
			removePizza: removePizza,
			checkout: checkout,
		};
	},
});
</script>
