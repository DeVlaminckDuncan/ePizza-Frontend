<template>
	<NavigationBar text="Edit topping" :backIcon="true" previousPage="/admin/toppings" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<div v-if="state.topping.name != ''">
				<h1 class="font-semibold text-2xl mb-3">Edit topping {{ state.topping.name.toLowerCase() }}</h1>

				<InputField v-model="state.topping.name" label="Topping name" :value="state.topping.name" class="my-12" />

				<InputField v-model="state.topping.price" label="Price" type="number" :value="state.topping.price.toString()" :step="0.01" class="my-12" />

				<Button @click="saveChanges" text="Save changes" color="red" :classes="['w-full', 'px-12', 'py-2', 'text-lg', 'rounded-lg']" />
			</div>
			<div v-else-if="state.error">
				<p class="text-lg text-alpha-red">{{ $t('ERROR-LOADING-TOPPING') }}</p>
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

import { get, put } from '@/utils/api';
import cookie from '@/utils/cookie';
import Topping from '@/models/Topping';
import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import Button from '@/presentations/pizza/shared/components/Button.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import LoadingIcon from '@/presentations/pizza/shared/components/LoadingIcon.vue';

type State = {
	topping: Topping;
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
		const state = reactive({
			topping: {
				id: ref(route.currentRoute.value.params.id).value as string,
				name: '',
				price: 0,
			},
			error: false,
		});

		const getTopping = async () => {
			const token = cookie.get('token');

			const data = await get(`toppings/${state.topping.id}`);

			if (data == null) {
				state.error = true;
			} else {
				state.topping = data;
			}
		};

		getTopping();

		const saveChanges = async () => {
			const data = {
				id: state.topping.id,
				name: state.topping.name,
				price: +state.topping.price,
			};

			const token = cookie.get('token');

			await put('toppings', state.topping.id, state.topping, token);

			route.push('/admin/toppings');
		};

		return {
			state,
			saveChanges,
		};
	},
});
</script>
