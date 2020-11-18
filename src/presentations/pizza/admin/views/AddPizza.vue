<template>
	<NavigationBar :text="'Add pizza'" :backIcon="true" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl mb-3">Add a new pizza</h1>

			<div class="flex flex-wrap items-center mt-12 mb-12">
				<div class="w-1/2 ">
					<img v-if="pizza.imageUploaded" @click="uploadImage" ref="imageRef" class="pizza-image rounded-lg cursor-pointer" :src="pizza.imageUrl" alt="Pizza margherita" />

					<div v-else class="flex items-center justify-center">
						<svg @click="uploadImage" class="cursor-pointer" fill="#999" width="36" height="36" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
						</svg>
					</div>
				</div>

				<div class="w-1/2">
					<ButtonMedium @click="uploadImage" :text="`${pizza.imageUploaded ? 'Change' : 'Upload'} image`" :color="'yellow'" />
					<input ref="uploadImageRef" @change="imageInputChange" class="hidden" type="file" />
				</div>
			</div>

			<InputField :label="'Pizza name'" :value="pizza.name" />

			<InputField :label="'Price in €'" :type="'number'" :value="pizza.price ? pizza.price.toString() : ''" :step="0.01" />

			<div class="flex justify-between items-center mt-12 mb-8">
				<span class="text-2xl font-semibold">Toppings</span>

				<button class="w-6 h-6 flex items-center justify-center rounded-full shadow-md bg-alpha-yellow text-white text-xl">+</button>
			</div>

			<div v-for="topping of pizza.toppings" :key="topping" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mb-6">
				<div class="w-full flex justify-between items-center">
					<span>{{ topping }}</span>

					<button>
						<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</svg>
					</button>
				</div>
			</div>

			<ButtonWide @click="addPizza" :text="'Add pizza'" :color="'red'" />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import ButtonMedium from '@/presentations/pizza/shared/components/ButtonMedium.vue';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

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

		const pizza = reactive({
			name: 'Margherita',
			price: 8,
			toppings: ['Mozzarella', 'Oregano'],
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/320px-Pizza_Margherita_stu_spivack.jpg',
			imageUploaded: false,
		});

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

				pizza.imageUploaded = true;
			}
		};

		const addPizza = () => {};

		return {
			pizza,
			uploadImage,
			imageInputChange,
			imageRef,
			uploadImageRef,
			addPizza,
		};
	},
});
</script>
