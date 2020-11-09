<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Edit pizza margherita</h1>

			<div class="flex flex-wrap items-center mt-8 mb-12">
				<div class="w-1/2">
					<img ref="imageRef" class="pizza-image rounded-lg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/320px-Pizza_Margherita_stu_spivack.jpg" alt="Pizza margherita" />
				</div>

				<div class="w-1/2">
					<ButtonMedium @click="uploadImage" :text="'Change image'" :color="'yellow'" />
					<input ref="uploadImageRef" @change="imageInputChange" class="hidden" type="file" />
				</div>
			</div>

			<InputField :label="'Pizza name'" :value="'Margherita'" />

			<InputField :label="'Price in €'" :type="'number'" :value="'8'" />

			<div class="flex justify-between items-center mt-12 mb-8">
				<span class="text-2xl font-semibold">Toppings</span>

				<button class="w-6 h-6 flex items-center justify-center rounded-full shadow-md bg-alpha-yellow text-white text-xl">+</button>
			</div>

			<div class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3">
				<div class="w-full flex justify-between items-center">
					<span>Mozzarella</span>

					<button>
						<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import InputField from '@/presentations/shared/components/InputField.vue';
import ButtonMedium from '@/presentations/shared/components/ButtonMedium.vue';

export default defineComponent({
	components: {
		InputField: InputField,
		ButtonMedium: ButtonMedium,
	},

	setup() {
		const imageRef = ref();
		const uploadImageRef = ref();

		const uploadImage = () => {
			uploadImageRef.value.click();
		};

		const imageInputChange = (e: any) => {
			const reader = new FileReader();

			reader.onload = (e: any) => {
				imageRef.value.src = e.target.result;
			};

			reader.readAsDataURL(e.target.files[0]);
		};

		return {
			uploadImage: uploadImage,
			imageInputChange: imageInputChange,
			imageRef: imageRef,
			uploadImageRef: uploadImageRef,
		};
	},
});
</script>
