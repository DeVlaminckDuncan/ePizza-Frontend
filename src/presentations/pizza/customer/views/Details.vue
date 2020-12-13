<template>
	<NavigationBar text="Details" :backIcon="true" previousPage="/menu" :cartIcon="true" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">{{ state.pizza.name }}</h1>

			<div v-if="state.pizza.name != ''">
				<div class="flex flex-wrap items-center pt-8">
					<div class="w-1/2">
						<img class="pizza-image rounded-lg" :src="state.pizza.imgUrl" :alt="`Pizza ${state.pizza.name}`" />
					</div>

					<div class="flex items-end flex-col w-1/2">
						<DropdownList
							v-model="state.pizza.size"
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
						<router-link :to="`/edit/${state.pizza.pizzaUrl}`" class="button-md flex justify-center items-center bg-alpha-yellow text-white font-semibold text-lg h-8 my-6 rounded-lg shadow-md">{{ $t('BUTTON-EDIT-TOPPINGS') }}</router-link>
						<ButtonMedium @click="addToCart" :text="$t('BUTTON-ADD-TO-CART')" color="red" />
					</div>

					<div class="w-full flex justify-between pt-5">
						<div class="text-left">
							<p v-if="state.pizza.toppings.length">{{ state.pizza.toppings.map((t) => t.name).join(', ') }}.</p>
						</div>

						<div class="price font-semibold">{{ makePricePrettier(sizeMultiplier(state.pizza.price, state.pizza.size)) }}</div>
					</div>
				</div>

				<div class="flex justify-between items-center mt-8">
					<p class="text-2xl font-semibold">Ratings</p>
					<router-link :to="`/rate/${state.pizza.pizzaUrl}`" class="button-md flex justify-center items-center bg-alpha-orange text-white font-semibold text-lg h-8 my-6 rounded-lg shadow-md">Rate this pizza</router-link>
				</div>

				<div v-if="state.pizza.reviews != null">
					<div v-for="review of state.pizza.reviews" :key="review.id" class="flex flex-wrap border border-dark border-opacity-5 rounded-lg shadow-md p-3 mt-8">
						<div class="flex flex-wrap w-full justify-between">
							<div class="w-1/2 text-lg text-left">
								{{ review.customer.name }}
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
							{{ review.description }}
						</div>
					</div>
				</div>
				<div v-else>
					There are no ratings yet for this pizza.
				</div>
			</div>
			<div v-else-if="state.error">
				<p class="text-lg text-alpha-red">{{ $t('ERROR-LOADING-PIZZA') }}</p>
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
import { getItemById, saveItem } from '@/utils/idb';
import { makePricePrettier, sizeMultiplier } from '@/utils/dataFormattings';
import Pizza from '@/models/Pizza';
import DropdownList from '@/presentations/pizza/shared/components/DropdownList.vue';
import ButtonMedium from '@/presentations/pizza/shared/components/ButtonMedium.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import LoadingIcon from '@/presentations/pizza/shared/components/LoadingIcon.vue';

type PizzaState = {
	pizza: Pizza;
	error: Boolean;
};

export default defineComponent({
	components: {
		DropdownList,
		ButtonMedium,
		NavigationBar,
		LoadingIcon,
	},

	setup() {
		const state: PizzaState = reactive({
			pizza: {
				id: '',
				name: '',
				price: 0,
				imgUrl: '',
				toppings: [],
				reviews: [],

				pizzaUrl: ref(route.currentRoute.value.params.id).value as string,
				size: 'Medium',
			},
			error: false,
		});

		const getPizza = async () => {
			if (!isNaN(state.pizza.pizzaUrl)) {
				const data = await getItemById('pizzas', state.pizza.pizzaUrl);
				state.pizza.pizzaUrl = data.id;
			}

			const data = await get(`pizzas/${state.pizza.pizzaUrl}`);

			if (data == null) {
				state.error = true;
			} else {
				state.pizza.id = state.pizza.id;
				state.pizza.name = data.name;
				state.pizza.price = data.price;
				state.pizza.imgUrl = data.imgUrl;
				state.pizza.toppings = data.toppings ? data.toppings.map((name: string) => ({ name })) : [];
				state.pizza.reviews = data.orderReviews;
			}
		};

		getPizza();

		const addToCart = async () => {
			const data = {
				id: state.pizza.id,
				name: state.pizza.name,
				price: state.pizza.price,
				imgUrl: state.pizza.imgUrl,
				size: state.pizza.size,
			};

			await saveItem('pizzas', data);

			route.push({ name: 'Cart' });
		};

		return {
			state,
			addToCart,
			makePricePrettier,
			sizeMultiplier,
		};
	},
});
</script>
