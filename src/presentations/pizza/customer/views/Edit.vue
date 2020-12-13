<template>
	<NavigationBar :text="$t('BUTTON-EDIT-TOPPINGS')" :backIcon="true" previousPage="/menu" :cartIcon="true" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">{{ $t('PAGE-INFO-EDIT-TOPPINGS') }}</h1>

			<div v-if="state.pizza.name != ''">
				<div class="flex flex-wrap items-center pt-8 mb-12">
					<div class="w-1/2">
						<img class="pizza-image rounded-lg" :src="state.pizza.imgUrl" :alt="`Pizza ${state.pizza.name}`" />
					</div>

					<div class="flex flex-col items-end w-1/2">
						<p class="text-xl text-right font-semibold">{{ state.pizza.name }}</p>

						<span class="price text-right font-semibold my-6">{{ makePricePrettier(sizeMultiplier(state.totalPrice, state.pizza.size)) }}</span>

						<Button @click="saveChanges" class="bg-alpha-red" :text="isNaN(state.pizza.pizzaUrl) ? $t('BUTTON-ADD-TO-CART') : $t('BUTTON-SAVE-CHANGES')" color="red" :classes="['w-24', 'h-8', 'text-lg', 'rounded-lg']" />
					</div>
				</div>

				<div v-for="topping of state.pizza.toppings" :key="topping.name" class="flex flex-wrap justify-between items-center w-full text-lg mb-2">
					<div class="flex">
						<Button @click="decreaseTopping(topping)" text="-" color="red" :classes="['w-4', 'h-4', 'flex', 'justify-center', 'items-center', 'text-sm', 'rounded']" />
					</div>

					{{ topping.name }}

					<div class="flex -mr-1">
						<Button v-for="i of topping.amount" :key="i" @click="increaseTopping(topping)" class="bg-alpha-green mr-1" text="+" color="green" :classes="['w-4', 'h-4', 'flex', 'justify-center', 'items-center', 'text-sm', 'rounded']" />
						<Button v-for="i of 3 - (topping.amount ? topping.amount : 0)" :key="i" @click="increaseTopping(topping)" class="opacity-50 mr-1" text="+" color="green" :classes="['w-4', 'h-4', 'flex', 'justify-center', 'items-center', 'text-sm', 'rounded']" />
					</div>
				</div>
			</div>
			<div v-else-if="state.errorPizza" class="my-4">
				<p class="text-lg text-alpha-red">{{ $t('ERROR-LOADING-PIZZA') }}</p>
			</div>
			<div v-else>
				<LoadingIcon />
			</div>

			<div v-if="state.allToppings.length">
				<p class="text-2xl text-left font-semibold mt-12">{{ $t('SUBTITLE-ADD-MORE-TOPPINGS') }}</p>

				<div v-for="topping of state.allToppings" :key="topping.id" class="flex flex-wrap justify-between items-center w-full text-lg mt-4">
					<span class="font-semibold">{{ makePricePrettier(topping.price ? topping.price : 0) }}</span>

					{{ topping.name }}

					<button @click="addTopping(topping.id ? topping.id : '')" class="text-white font-semibold  bg-alpha-yellow px-4 py-1 rounded-lg shadow-md">Add</button>
				</div>
			</div>
			<div v-else-if="state.errorToppings" class="my-4">
				<p class="text-lg text-alpha-red">{{ $t('ERROR-LOADING-TOPPINGS') }}</p>
			</div>
			<div v-else>
				<LoadingIcon />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import route from '@/router';

import { get } from '@/utils/api';
import { getItemById, saveItem, editItem } from '@/utils/idb';
import { makePricePrettier, sizeMultiplier } from '@/utils/dataFormattings';
import Pizza from '@/models/Pizza';
import Topping from '@/models/Topping';
import Button from '@/presentations/pizza/shared/components/Button.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import LoadingIcon from '@/presentations/pizza/shared/components/LoadingIcon.vue';

type State = {
	pizza: Pizza;
	totalPrice: number;
	allToppings: Array<Topping>;
	errorPizza: Boolean;
	errorToppings: Boolean;
};

export default defineComponent({
	components: {
		Button,
		NavigationBar,
		LoadingIcon,
	},

	setup() {
		const state: State = reactive({
			pizza: {
				id: '',
				name: '',
				price: 0,
				imgUrl: '',
				toppings: [],
				reviews: [],

				pizzaUrl: ref(route.currentRoute.value.params.id).value as string,
			},

			totalPrice: 0,

			allToppings: [],

			errorPizza: false,
			errorToppings: false,
		});

		const calculateTotalPrice = () => {
			state.totalPrice = state.pizza.price;

			if (state.pizza.toppings && state.pizza.toppings.length) {
				state.totalPrice += state.pizza.toppings.reduce((a, b) => a + (b.price ? b.price : 0) * (b.amount ? b.amount : 1), 0);
			}
		};

		const getPizza = async () => {
			const pizzaUrl = state.pizza.pizzaUrl;

			if (isNaN(pizzaUrl)) {
				const data = await get(`pizzas/${pizzaUrl}`);

				if (data == null) {
					state.errorPizza = true;
				} else {
					state.pizza.id = data.id;
					state.pizza.name = data.name;
					state.pizza.price = data.price;
					state.pizza.imgUrl = data.imgUrl;
					state.pizza.toppings = data.toppings ? data.toppings.map((name: string) => ({ name })) : [];
					state.pizza.reviews = data.orderReviews;
				}
			} else {
				const data = await getItemById('pizzas', pizzaUrl);

				state.pizza = data;
				state.pizza.pizzaUrl = pizzaUrl;
				state.pizza.idbId = +pizzaUrl;
			}

			calculateTotalPrice();
		};

		getPizza();

		const getToppings = async () => {
			const data = await get('toppings');

			if (data == null) {
				state.errorToppings = true;
			} else {
				state.allToppings = data.map((t: Topping) => ({
					id: t.id,
					name: t.name,
					price: t.price,
					amount: 1,
				}));

				// sort on name first, then on price
				state.allToppings.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => a.price!.toString().localeCompare(b.price!.toString()));

				if (state.pizza.toppings) {
					state.allToppings = state.allToppings.filter((a) => state.pizza.toppings.findIndex((b) => b.name == a.name) == -1);
				}
			}
		};

		getToppings();

		const increaseTopping = (topping: Topping) => {
			const toppingIndex = state.pizza.toppings.findIndex((t) => t.name == topping.name);
			let amount: any = 2;

			if (toppingIndex < 0) {
				topping.amount = amount;
				state.pizza.toppings.push(topping);
			} else if (topping.amount! < 3) {
				topping.amount!++;
				state.pizza.toppings[toppingIndex].amount = topping.amount;
				amount = topping.amount;
			}

			calculateTotalPrice();
		};

		const decreaseTopping = (topping: Topping) => {
			const toppingIndex = state.pizza.toppings.findIndex((t) => t.name == topping.name);
			let amount: any = 0;

			if (toppingIndex > -1 && state.pizza.toppings[toppingIndex].amount! > 0) {
				state.pizza.toppings[toppingIndex].amount!--;
				amount = state.pizza.toppings[toppingIndex].amount;
			}

			if (amount < 1 && toppingIndex >= 0) {
				state.pizza.toppings.splice(toppingIndex, 1);
				state.allToppings.push(topping);
				state.allToppings.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => a.price!.toString().localeCompare(b.price!.toString()));
			}

			calculateTotalPrice();
		};

		const addTopping = (toppingId: string) => {
			const toppingIndex = state.allToppings.findIndex((t) => t.id == toppingId);
			const topping = state.allToppings[toppingIndex];
			topping.amount = 1;

			if (!state.pizza.toppings) {
				state.pizza.toppings = [];
			}

			state.pizza.toppings.push(topping);

			if (state.pizza.toppings.length > 1) {
				state.pizza.toppings.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => a.price!.toString().localeCompare(b.price!.toString()));
			}

			state.allToppings.splice(toppingIndex, 1);

			calculateTotalPrice();
		};

		const saveChanges = async () => {
			if (!state.pizza.size) {
				state.pizza.size = 'Medium';
			}

			const data = {
				idbId: state.pizza.idbId,
				id: state.pizza.id,
				name: state.pizza.name,
				price: state.pizza.price,
				imgUrl: state.pizza.imgUrl,
				amount: state.pizza.amount ? state.pizza.amount : 1,
				size: state.pizza.size,
				toppings: [],
			};

			state.pizza.toppings.forEach((t) => {
				const topping: Topping = {
					id: t.id,
					name: t.name,
					price: t.price,
					amount: t.amount,
				};
				// @ts-ignore
				data.toppings.push(topping);
			});

			if (isNaN(state.pizza.pizzaUrl)) {
				delete data.idbId;

				await saveItem('pizzas', data);
			} else {
				await editItem('pizzas', data);
			}

			route.push('/cart');
		};

		return {
			state,
			increaseTopping,
			decreaseTopping,
			addTopping,
			saveChanges,
			makePricePrettier,
			sizeMultiplier,
		};
	},
});
</script>
