<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Pizza margherita</h1>

			<div class="flex flex-wrap items-center pt-8">
				<div class="w-1/2 pr-3">
					<img class="pizza-image rounded-lg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/320px-Pizza_Margherita_stu_spivack.jpg" alt="Pizza margherita" />
				</div>

				<div class="flex justify-end flex-col w-1/2 pl-3">
					<div class="relative">
						<select class="select block border border-dark border-opacity-10 rounded shadow-md px-3 py-1 focus:outline-none w-full" required>
							<option value="Small">Small</option>
							<option value="Medium" selected>Medium</option>
							<option value="Large">Large</option>
						</select>
					</div>
					<button @click="editToppings" class="text-white font-semibold text-lg bg-alpha-yellow px-2 py-1 mt-6 rounded-lg w-full shadow-md">Edit toppings</button>
					<button @click="addToCart" class="text-white font-semibold text-lg bg-alpha-red px-2 py-1 mt-6 rounded-lg w-full shadow-md">Add to cart</button>
				</div>

				<div class="w-1/2 text-left pt-5">
					<p class="text-lg">Pizza margherita</p>
					<p>Mozzarella, oregano.</p>
				</div>

				<div class="price w-1/2 font-semibold flex justify-end pt-5">
					€ 8.00
				</div>
			</div>

			<div class="flex justify-between items-center mt-8">
				<p class="text-2xl font-semibold">Ratings</p>
				<button @click="ratePizza" class="text-white font-semibold text-lg bg-alpha-orange px-3 py-1 rounded-lg shadow-md">Rate this pizza</button>
			</div>

			<div class="flex flex-wrap border border-dark border-opacity-5 rounded-lg shadow-md p-3 mt-8">
				<div class="flex flex-wrap w-full justify-between">
					<div class="w-1/2 text-lg text-left">
						Connor Reed
					</div>

					<div class="flex">
						<svg fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
						</svg>
						<svg fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
						</svg>
						<svg fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
						</svg>
						<svg fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
						</svg>
						<svg class="opacity-50" fill="#F7C738" width="20" height="20" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
						</svg>
					</div>
				</div>

				<div class="text-left">
					The pizza margherita was delicious!
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const editToppings = () => {};

		const addToCart = () => {};

		const ratePizza = () => {};

		return {
			editToppings: editToppings,
			addToCart: addToCart,
			ratePizza: ratePizza,
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
