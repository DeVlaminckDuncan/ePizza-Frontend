<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Choose a restaurant</h1>

			<form class="w-full mt-8">
				<DropdownList
					v-model="restaurant.name"
					class="mb-6"
					:label="'Choose a restaurant'"
					:options="[
						{
							text: 'Restaurant1',
						},
						{
							text: 'Restaurant2',
						},
						{
							text: 'Restaurant3',
						},
					]"
				/>

				<ButtonWide @click="continueToMenu" :text="'Continue'" :color="'red'" />
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import route from '@/router';

import DropdownList from '@/presentations/pizza/shared/components/DropdownList.vue';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';

export default defineComponent({
	components: {
		DropdownList: DropdownList,
		ButtonWide: ButtonWide,
	},

	setup() {
		const restaurant = reactive({
			name: '',
		});

		const continueToMenu = (event: Event) => {
			event.preventDefault();
			console.log(restaurant);
			// TODO: save data in localStorage
			route.push({ name: 'Menu' });
		};

		return {
			restaurant,
			continueToMenu,
		};
	},
});
</script>
