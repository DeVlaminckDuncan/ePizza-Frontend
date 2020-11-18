<template>
	<NavigationBar :text="'Add pizza'" :backIcon="true" :previousPage="'/admin/menu'" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl mb-3">Add a new pizza</h1>

			<ButtonWide @click="addPizza" :text="'Add pizza'" :color="'red'" />

			<div class="flex flex-wrap items-center mt-12 mb-12">
				<div class="w-1/2 ">
					<img v-if="imageUploaded" @click="uploadImage" ref="imageRef" class="pizza-image rounded-lg cursor-pointer" :src="pizza.imageUrl" alt="Pizza margherita" />

					<div v-else class="flex items-center justify-center">
						<svg @click="uploadImage" class="cursor-pointer" fill="#999" width="36" height="36" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
						</svg>
					</div>
				</div>

				<div class="w-1/2">
					<ButtonMedium @click="uploadImage" :text="`${imageUploaded ? 'Change' : 'Upload'} image`" :color="'yellow'" />
					<input ref="uploadImageRef" @change="imageInputChange" class="hidden" type="file" />
				</div>
			</div>

			<InputField v-model="pizza.name" :label="'Pizza name'" />

			<InputField v-model="pizza.price" :label="'Price in €'" :type="'number'" :step="0.01" />

			<div class="flex justify-between items-center mt-12 mb-8">
				<span class="text-2xl font-semibold">Toppings</span>

				<button @click="addTopping" class="w-6 h-6 flex items-center justify-center rounded-full shadow-md bg-alpha-yellow text-white text-xl">+</button>
			</div>

			<div class="mb-6">
				<div v-if="state.toppings.length">
					<div v-for="(topping, index) of state.toppings" :key="topping.id ? topping.id : topping.name" class="flex flex-wrap items-center mb-4">
						<div class="w-full flex mb-8">
							<div class="w-1/6 flex flex-col justify-around items-center">
								<input v-model="topping.selected" :checked="topping.selected ? true : false" type="checkbox" />
								<button @click="removeTopping(index)">
									<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
										<path d="M0 0h24v24H0z" fill="none" />
										<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
									</svg>
								</button>
							</div>

							<div class="w-5/6 flex flex-col justify-between">
								<InputField v-model="topping.name" :label="'Topping name'" :value="topping.name ? topping.name : ''" />
								<InputField v-model="topping.price" :label="'Price in €'" :value="(topping.price ? topping.price : 0).toString()" :type="'number'" :step="0.01" :marginBottom="false" />
							</div>
						</div>

						<hr v-if="index - 3 > state.toppings.length" />
					</div>
				</div>

				<div v-else-if="!state.toppingsLoaded" class="text-lg">
					Loading...
				</div>

				<div v-else class="text-lg">
					Add some toppings!
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import { get, post } from '@/utils/api';
// import Topping from '@/models/Topping';
import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import ButtonMedium from '@/presentations/pizza/shared/components/ButtonMedium.vue';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

type CustomTopping = {
	id?: string;
	name: string;
	price: number;
	selected?: Boolean;
};

type State = {
	toppings: Array<CustomTopping>;
	toppingsLoaded: Boolean;
};

export default defineComponent({
	components: {
		InputField,
		ButtonMedium,
		ButtonWide,
		NavigationBar,
	},

	setup() {
		const imageRef = ref();
		const uploadImageRef = ref();

		const imageUploaded = ref(false);

		const pizza = {
			name: '',
			price: 0,
			imageUrl: '',
		};

		const state: State = reactive({
			toppings: [],
			toppingsLoaded: false,
		});

		// let apiToppings: Array<Topping> = [];

		const getToppings = async () => {
			const data = await get('toppings');
			state.toppings = data;
			// apiToppings = data;
			state.toppings.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => a.price!.toString().localeCompare(b.price!.toString()));
			state.toppingsLoaded = true;
		};

		getToppings();

		const uploadImage = () => {
			uploadImageRef.value.click();
		};

		const imageInputChange = (e: any) => {
			const reader = new FileReader();

			reader.onload = (e: any) => {
				imageRef.value.src = e.target.result;
			};

			if (e.target.files.length) {
				reader.readAsDataURL(e.target.files[0]);

				imageUploaded.value = true;
			}
		};

		const addTopping = () => {
			state.toppings.push({
				name: '',
				price: 0,
				selected: true,
			});
		};

		const removeTopping = (index: number) => {
			state.toppings.splice(index, 1);
		};

		const addPizza = async () => {
			let toppings: Array<CustomTopping> = JSON.parse(JSON.stringify(state.toppings));
			toppings = toppings.filter((t) => t.selected == true);
			toppings.forEach((t) => {
				delete t.selected;
				// if (apiToppings.findIndex((t2) => t2.name.toLowerCase() == t.name.toLowerCase()) > 0) {
				delete t.id;
				// }
			});

			const data = {
				name: pizza.name,
				price: pizza.price,
				imgUrl: pizza.imageUrl,
				toppings: toppings,
			};

			await post('toppings', data);
		};

		return {
			pizza,
			state,
			imageUploaded,
			uploadImage,
			imageInputChange,
			imageRef,
			uploadImageRef,
			addTopping,
			removeTopping,
			addPizza,
		};
	},
});
</script>
