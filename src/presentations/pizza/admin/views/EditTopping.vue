<template>
	<NavigationBar text="Edit topping" :backIcon="true" previousPage="/admin/toppings" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl mb-3">Edit topping {{ topping.name.toLowerCase() }}</h1>

			<InputField v-model="topping.name" label="Topping name" :value="topping.name" class="my-12" />

			<InputField v-model="topping.price" label="Price" type="number" :value="topping.price" :step="0.01" class="my-12" />

			<ButtonWide @click="saveChanges" text="Save changes" color="red" />
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import route from '@/router';

import { get, put } from '@/utils/api';
import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

export default defineComponent({
	components: {
		InputField,
		ButtonWide,
		NavigationBar,
	},

	setup() {
		const topping = ref({
			id: ref(route.currentRoute.value.params.id).value as string,
			name: '',
			price: 0,
		});

		const getTopping = async () => {
			const data = await get(`toppings/${topping.value.id}`);

			topping.value = data;
		};

		getTopping();

		const saveChanges = async () => {
			const data = {
				id: topping.value.id,
				name: topping.value.name,
				price: +topping.value.price,
			};

			await put('toppings', topping.value.id, topping.value);

			route.push('/admin/toppings');
		};

		return {
			topping,
			saveChanges,
		};
	},
});
</script>
