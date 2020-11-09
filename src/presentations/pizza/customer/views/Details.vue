<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Pizza margherita</h1>

			<div class="flex flex-wrap items-center pt-8">
				<div class="w-1/2">
					<img class="pizza-image rounded-lg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/320px-Pizza_Margherita_stu_spivack.jpg" alt="Pizza margherita" />
				</div>

				<div class="flex items-end flex-col w-1/2">
					<DropdownList
						class="select-md"
						:options="[
							{
								text: 'Small',
							},
							{
								text: 'Medium',
								selected: true,
							},
							{
								text: 'Large',
							},
						]"
					/>
					<ButtonMedium class="my-6" :text="'Edit toppings'" :color="'yellow'" />
					<ButtonMedium :text="'Add to cart'" :color="'red'" />
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
				<ButtonMedium :text="'Rate this pizza'" :color="'orange'" />
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

import DropdownList from '@/presentations/shared/components/DropdownList.vue';
import ButtonMedium from '@/presentations/shared/components/ButtonMedium.vue';

export default defineComponent({
	components: {
		DropdownList: DropdownList,
		ButtonMedium: ButtonMedium,
	},

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
