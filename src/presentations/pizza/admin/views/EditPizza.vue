<template>
	<NavigationBar text="Edit pizza" :backIcon="true" previousPage="/admin/menu" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl mb-3">Edit pizza {{ state.pizza.name.toLowerCase() }}</h1>

			<Button @click="saveChanges" text="Save changes" color="red" :classes="['w-full', 'px-12', 'py-2', 'text-lg', 'rounded-lg']" />

			<!-- <div class="flex flex-wrap items-center mt-12 mb-12">
				<div class="w-1/2">
					<img v-if="dataLoaded && state.pizza.imgUrl" @click="uploadImage" ref="imageRef" class="pizza-image rounded-lg cursor-pointer" :src="state.pizza.imgUrl" :alt="`Pizza ${state.pizza.name}`" />
					<span v-else>
						<LoadingIcon />
					</span>
				</div>

				<div class="w-1/2">
					<Button @click="uploadImage" text="Change image" color="yellow" :classes="['w-24', 'h-8', 'text-lg', 'rounded-lg']" />
					<input ref="uploadImageRef" @change="imageInputChange" class="hidden" type="file" />
				</div>
			</div> -->

			<InputField v-model="state.pizza.imgUrl" :value="state.pizza.imgUrl" label="URL to image" class="my-12" />

			<InputField v-model="state.pizza.name" :value="state.pizza.name" label="Pizza name" />

			<InputField v-model="state.pizza.price" :value="state.pizza.price.toString()" label="Price in €" type="number" :step="0.01" />

			<div class="flex justify-between items-center mt-12 mb-8">
				<span class="text-2xl font-semibold">Toppings</span>

				<button @click="addTopping" class="w-6 h-6 flex items-center justify-center rounded-full shadow-md bg-alpha-yellow text-white text-xl">+</button>
			</div>

			<div class="mb-6">
				<div v-if="state.pizza.toppings.length">
					<div v-for="(topping, index) of state.pizza.toppings" :key="topping.id ? topping.id : topping.name" class="flex flex-wrap items-center mb-4">
						<div class="w-full flex mb-8">
							<div class="w-1/6 flex justify-center items-center">
								<button @click="removeTopping(index)">
									<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
										<path d="M0 0h24v24H0z" fill="none" />
										<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
									</svg>
								</button>
							</div>

							<div class="w-5/6 flex flex-col justify-between">
								<InputField v-model="topping.name" label="Topping name" :value="topping.name ? topping.name : ''" />
								<!-- <InputField v-model="topping.price" label="Price in €" :value="(topping.price ? topping.price : 0).toString()" type="number" :step="0.01" :marginBottom="false" /> -->
							</div>
						</div>

						<hr v-if="index - 3 > state.pizza.toppings.length" />
					</div>
				</div>

				<div v-else-if="state.error">
					<p class="text-lg text-alpha-red">{{ $t('ERROR-LOADING-TOPPINGS') }}</p>
				</div>

				<div v-else-if="!dataLoaded">
					<LoadingIcon />
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
import route from '@/router';

import { get, put } from '@/utils/api';
import cookie from '@/utils/cookie';
import Pizza from '@/models/Pizza';
import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import Button from '@/presentations/pizza/shared/components/Button.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import LoadingIcon from '@/presentations/pizza/shared/components/LoadingIcon.vue';

type State = {
	pizza: Pizza;
	error: Boolean;
};

export default defineComponent({
	components: {
		InputField,
		Button,
		NavigationBar,
		LoadingIcon,
	},

	setup() {
		const imageRef = ref();
		const uploadImageRef = ref();

		const state: State = reactive({
			pizza: {
				id: ref(route.currentRoute.value.params.id).value as string,
				name: '',
				price: 0,
				imgUrl: '',
				toppings: [],
			},
			error: false,
		});

		const dataLoaded = ref(false);

		const getPizza = async () => {
			const data = await get(`pizzas/${state.pizza.id}`);

			if (data == null) {
				state.error = true;
			} else {
				state.pizza.id = data.id;
				state.pizza.name = data.name;
				state.pizza.price = data.price;
				state.pizza.imgUrl = data.imgUrl;
				state.pizza.toppings = data.toppings ? data.toppings.map((name: string) => ({ name })) : [];

				dataLoaded.value = true;
			}
		};

		getPizza();

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

		const addTopping = () => {
			state.pizza.toppings.push({
				name: '',
				price: 0,
			});
		};

		const removeTopping = (index: number) => {
			state.pizza.toppings.splice(index, 1);
		};

		const saveChanges = async () => {
			const pizzaData: Pizza = JSON.parse(JSON.stringify(state.pizza));
			pizzaData.price = +pizzaData.price;

			// pizzaData.toppings.forEach((t) => {
			// 	if (t.price) {
			// 		t.price = +t.price;
			// 	}
			// });

			const data = {
				name: pizzaData.name,
				price: pizzaData.price.toString(),
				imgUrl: pizzaData.imgUrl,
				toppings: pizzaData.toppings,
			};

			const token = cookie.get('token');

			await put('pizzas', state.pizza.id, data, token);

			route.push('/admin/menu');
		};

		return {
			state,
			dataLoaded,
			// uploadImage,
			// imageInputChange,
			// imageRef,
			// uploadImageRef,
			addTopping,
			removeTopping,
			saveChanges,
		};
	},
});
</script>
