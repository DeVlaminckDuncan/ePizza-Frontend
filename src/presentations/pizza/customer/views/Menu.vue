<template>
	<NavigationBar :text="$t('HEADER-TITLE-MENU')" :backIcon="true" :previousPage="state.previousPage" :cartIcon="true" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<div class="flex justify-between items-center px-3 mb-8">
				<h1 class="font-semibold text-2xl">{{ $t('PAGE-INFO-MENU') }}</h1>
				<DropdownList
					label="Filter"
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

			<div v-if="state.pizzas.length">
				<div v-for="pizza of state.pizzas" :key="pizza.id" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mb-6">
					<div class="w-1/2">
						<router-link :to="`/details/${pizza.pizzaUrl}`">
							<img class="pizza-image rounded-lg" :src="pizza.imgUrl" :alt="`Pizza ${pizza.name.toLowerCase()}`" />
						</router-link>
					</div>

					<div class="flex items-end flex-col w-1/2">
						<DropdownList
							v-model="pizza.size"
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
						<router-link :to="`/edit/${pizza.pizzaUrl}`" class="button-md flex justify-center items-center bg-alpha-yellow text-white font-semibold text-lg h-8 my-6 rounded-lg shadow-md">{{ $t('BUTTON-EDIT-TOPPINGS') }}</router-link>
						<ButtonMedium @click="addToCart(pizza)" :text="$t('BUTTON-ADD-TO-CART')" color="red" />
					</div>

					<div class="w-full flex justify-between pt-5">
						<router-link :to="`/details/${pizza.pizzaUrl}`">
							<span class="text-xl">{{ pizza.name }}</span>
						</router-link>

						<span class="price font-semibold">{{ makePricePrettier(sizeMultiplier(pizza.price, pizza.size)) }}</span>
					</div>
				</div>
			</div>
			<div v-else>
				<LoadingIcon />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import route from '@/router';
import store from '@/store';

import { get } from '@/utils/api';
import cookie from '@/utils/cookie';
import { saveItem } from '@/utils/idb';
import { makePricePrettier, sizeMultiplier } from '@/utils/dataFormattings';
import Pizza from '@/models/Pizza';
import DropdownList from '@/presentations/pizza/shared/components/DropdownList.vue';
import ButtonMedium from '@/presentations/pizza/shared/components/ButtonMedium.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import LoadingIcon from '@/presentations/pizza/shared/components/LoadingIcon.vue';

type State = {
	pizzas: Array<Pizza>;
	previousPage: string;
};

export default defineComponent({
	components: {
		DropdownList,
		ButtonMedium,
		NavigationBar,
		LoadingIcon,
	},

	setup() {
		const state: State = reactive({
			pizzas: [],
			previousPage: '',
		});

		const getOrderType = async () => {
			const data = store.getters.getOrderType();
			state.previousPage = data.orderType ? data.orderType : '';
		};

		getOrderType();

		const getPizzas = async () => {
			const token = cookie.get('token');

			const data = await get('pizzas', token);

			state.pizzas = data;

			state.pizzas.forEach((pizza) => {
				pizza.pizzaUrl = pizza.id;
				pizza.size = 'Medium';
			});
		};

		getPizzas();

		const addToCart = async (pizza: Pizza) => {
			const data = {
				id: pizza.id,
				name: pizza.name,
				price: pizza.price,
				imgUrl: pizza.imgUrl,
				size: pizza.size,
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
