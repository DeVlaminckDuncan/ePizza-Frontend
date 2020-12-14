<template>
	<NavigationBar text="Add topping" :backIcon="true" previousPage="/admin/toppings" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl mb-3">Add a new topping</h1>

			<InputField v-model="topping.name" label="Topping name" class="my-12" />

			<InputField v-model="topping.price" label="Price" type="number" :step="0.01" class="my-12" />

			<Button @click="addTopping" text="Add topping" color="red" :classes="['w-full', 'px-12', 'py-2', 'text-lg', 'rounded-lg']" />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import route from '@/router';

import { post } from '@/utils/api';
import cookie from '@/utils/cookie';
import Topping from '@/models/Topping';
import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import Button from '@/presentations/pizza/shared/components/Button.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

export default defineComponent({
	components: {
		InputField,
		Button,
		NavigationBar,
	},

	setup() {
		const topping: Topping = {
			name: '',
			price: 0,
		};

		const addTopping = async () => {
			const data = {
				id: topping.id,
				name: topping.name,
				price: +topping.price!,
			};

			const token = cookie.get('token');

			await post('toppings', data, token);

			route.push('/admin/toppings');
		};

		return {
			topping,
			addTopping,
		};
	},
});
</script>
