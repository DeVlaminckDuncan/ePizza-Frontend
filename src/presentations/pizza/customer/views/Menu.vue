<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<div class="flex justify-between items-center px-3 mb-8">
				<h1 class="font-semibold text-2xl">Menu list</h1>
				<DropdownList
					:label="'Filter'"
					:options="[
						{
							text: 'Filter1',
						},
						{
							text: 'Filter2',
						},
						{
							text: 'Filter3',
						},
					]"
				/>
			</div>

			<div class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3">
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
import ButtonMedium from '../components/ButtonMedium.vue';

export default defineComponent({
	components: {
		DropdownList: DropdownList,
		ButtonMedium: ButtonMedium,
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
