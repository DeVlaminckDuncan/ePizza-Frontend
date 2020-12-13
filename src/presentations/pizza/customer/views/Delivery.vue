<template>
	<NavigationBar :text="$t('ORDERTYPE-DELIVERY')" :backIcon="true" previousPage="/ordertype" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">{{ $t('PAGE-INFO-DELIVERY') }}</h1>

			<form class="w-full mt-8">
				<div class="flex">
					<InputField v-model="location.street" :label="$t('INPUT-LABEL-STREET')" class="w-3/4 mr-3" />
					<InputField v-model="location.streetNo" :label="$t('INPUT-LABEL-HOUSE-NUMBER')" class="w-1/4" />
				</div>

				<InputField v-model="location.city" :label="$t('INPUT-LABEL-CITY')" />

				<Button @click="continueToMenu" :text="$t('BUTTON-CONTINUE')" color="red" :classes="['w-full', 'px-12', 'py-2', 'text-lg', 'rounded-lg']" />
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import route from '@/router';
import store, { MutationTypes } from '@/store';

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
