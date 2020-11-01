<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<div class="flex justify-between items-center px-3 mb-8">
				<h1 class="font-semibold text-2xl">Menu list</h1>
				<DropdownList :label="'Filter'" :options="['Filter1', 'Filter2', 'Filter3']" />
			</div>

			<div class="flex flex-wrap border border-dark border-opacity-5 rounded-lg shadow-md p-3">
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

				<div class="w-1/2 text-xl flex justify-start pt-5">
					Pizza margherita
				</div>

				<div class="price w-1/2 font-semibold flex justify-end pt-5">
					€ 8.00
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DropdownList from '@/presentations/shared/components/DropdownList.vue';

export default defineComponent({
	components: {
		DropdownList: DropdownList,
	},

	setup() {
		const editToppings = () => {};

		const addToCart = () => {};

		return {
			editToppings: editToppings,
			addToCart: addToCart,
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
