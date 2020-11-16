<template>
	<NavigationBar :text="'Delivery'" :backIcon="true" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Enter your address</h1>

			<form class="w-full mt-8">
				<div class="flex">
					<InputField v-model="location.street" :label="'Street'" class="w-3/4 mr-3" />
					<InputField v-model="location.streetNo" :label="'No'" class="w-1/4" />
				</div>

				<InputField v-model="location.city" :label="'City'" />

				<ButtonWide @click="continueToMenu" :text="'Continue'" :color="'red'" />
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import route from '@/router';
import store, { MutationTypes } from '@/store';

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
		const location = {
			street: '',
			streetNo: '',
			city: '',
		};

		const continueToMenu = (event: Event) => {
			event.preventDefault();

			store.commit(MutationTypes.SET_ORDER_TYPE, {
				orderType: 'delivery',
				orderTypeData: location,
			});

			route.push({ name: 'Menu' });
		};

		return {
			location,
			continueToMenu,
		};
	},
});
</script>
