<template>
	<NavigationBar :text="'Orders'" :menuIcon="true" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Today's orders</h1>

			<DatePicker class="mt-4" />

			<div class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mt-8">
				<div class="w-full flex justify-between">
					<div class="font-semibold">
						Order #123456
					</div>
					<div>
						01/12/2020
					</div>
				</div>

				<div class="w-full text-left">
					Customer #123456
				</div>

				<div class="w-full flex justify-between">
					<div class="font-semibold">
						Delivery
					</div>
					<div class="text-right">
						Barnes Avenue 3081,
						<br />
						Cincinnati
					</div>
				</div>

				<div class="w-full flex justify-between text-lg mt-1">
					<div class="flex flex-col items-start">
						<span>1 x Pizza margherita</span>
						<span class="text-base opacity-80">Medium</span>
					</div>
					<div>
						€ 8.00
					</div>
				</div>

				<div class="w-full flex justify-between items-center mt-6">
					<div class="text-xl">
						Total
					</div>
					<div class="price font-semibold">
						€ 8.00
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DatePicker from '../components/DatePicker.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

export default defineComponent({
	components: {
		DatePicker,
		NavigationBar,
	},

	setup() {
		const changePeriod = () => {};

		return {
			changePeriod,
		};
	},
});
</script>
