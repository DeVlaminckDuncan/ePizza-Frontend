<template>
	<NavigationBar text="Ratings" :menuIcon="true" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">This week's ratings</h1>

			<DatePicker class="mt-4" />

			<div class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3 mt-8">
				<div class="w-full flex justify-between">
					<div class="font-semibold">
						Rating #123456
					</div>
					<div>
						01/12/2020
					</div>
				</div>

				<div class="w-full text-left">
					Customer #123456
				</div>

				<div class="w-full flex justify-between text-lg mt-2">
					<div class="flex flex-col items-start">
						Pizza margherita
					</div>
					<div>
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
				</div>

				<div class="mt-4">
					Connor Reed
				</div>

				<div>
					The pizza margherita was delicious!
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
