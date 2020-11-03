<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Your cart</h1>

			<div class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mt-8">
				<div class="flex flex-col w-1/2 text-left pr-3">
					<span class="text-xl">Pizza margherita</span>
					<span class="opacity-75">Medium</span>
				</div>

				<div class="flex justify-end items-center w-1/2 pl-3">
					<button @click="decreaseAmount" class="w-4 h-4 flex justify-center items-center text-white text-sm font-semibold  bg-alpha-red rounded shadow-md">-</button>
					<span class="font-semibold px-2">1</span>
					<button @click="increaseAmount" class="w-4 h-4 flex justify-center items-center text-white text-sm font-semibold  bg-alpha-red rounded shadow-md">+</button>
				</div>

				<div class="flex items-center w-full pt-3">
					<div class="flex w-3/4">
						<button @click="editPizza" class="text-white font-semibold text-lg bg-alpha-yellow w-24 h-8 rounded-lg shadow-md">Edit</button>
						<button @click="removePizza" class="text-white font-semibold text-lg bg-alpha-orange w-24 h-8 ml-3 rounded-lg shadow-md">Remove</button>
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

			<button @click="checkout" class="button-lg text-white font-semibold text-2xl bg-alpha-red h-16 rounded-lg shadow-md">Checkout</button>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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

<style lang="scss">
.main {
	width: 348px;
}

.price {
	font-size: 22px;
}

.button-lg {
	width: 348px;
}
</style>
