<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Edit your toppings</h1>

			<div class="flex flex-wrap items-center pt-8">
				<div class="w-1/2 pr-3">
					<img class="pizza-image rounded-lg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/320px-Pizza_Margherita_stu_spivack.jpg" alt="Pizza margherita" />
				</div>

				<div class="flex flex-col justify-end w-1/2 pl-3">
					<p class="text-xl text-right font-semibold">Pizza margherita</p>

					<span class="price text-right font-semibold my-6">€ 8.00</span>

					<button @click="addToCart" class="text-white font-semibold text-lg bg-alpha-red px-2 py-1 rounded-lg w-full shadow-md">Add to cart</button>
				</div>
			</div>

			<div class="flex flex-wrap justify-between items-center w-full text-lg mt-12">
				<div class="flex">
					<button @click="increaseTopping" class="w-4 h-4 flex justify-center items-center text-white text-sm font-semibold  bg-alpha-red rounded shadow-md">-</button>
				</div>

				Mozzarella

				<div class="flex">
					<button @click="increaseTopping" class="w-4 h-4 flex justify-center items-center text-white text-sm font-semibold  bg-alpha-green rounded shadow-md">+</button>
					<button @click="increaseTopping" class="opacity-50 w-4 h-4 flex justify-center items-center text-white text-sm font-semibold  bg-alpha-green ml-1 rounded shadow-md">+</button>
					<button @click="increaseTopping" class="opacity-50 w-4 h-4 flex justify-center items-center text-white text-sm font-semibold  bg-alpha-green ml-1 rounded shadow-md">+</button>
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

export default defineComponent({
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

<style lang="scss">
.main {
	width: 348px;
}

.price {
	font-size: 22px;
}
</style>
