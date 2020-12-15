<template>
	<NavigationBar text="Ratings" :menuItems="navigationMenuItems" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">This week's ratings</h1>

			<!-- TODO: DatePicker -->
			<!-- <DatePicker @click="changePeriod" class="mt-4 mb-8" /> -->

			<div v-if="state.reviews.length">
				<div v-for="review of state.reviews" :key="review.id" class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3">
					<div class="w-full flex justify-between">
						<div class="font-semibold">Rating #{{ review.id }}</div>
						<div>
							{{ review.date }}
						</div>
					</div>

					<div class="w-full text-left">Customer #{{ review.customer.id }}</div>

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

					<div class="w-full text-left mt-4">
						{{ review.customer.name }}
					</div>

					<div>
						{{ review.description }}
					</div>
				</div>
			</div>
			<div v-else-if="state.error">
				<p class="text-lg text-alpha-red">{{ $t('ERROR-LOADING-RATINGS') }}</p>
			</div>
			<div v-else-if="!dataLoaded" class="text-lg">
				There are no ratings yet.
			</div>
			<div v-else>
				<LoadingIcon />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

import cookie from '@/utils/cookie';
import { get } from '@/utils/api';
import Review from '@/models/Review';
// import DatePicker from '../components/DatePicker.vue';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import LoadingIcon from '@/presentations/pizza/shared/components/LoadingIcon.vue';
import navigationMenuItems from '@/assets/navigationMenuItems.json';

type State = {
	reviews: Array<Review>;
	error: Boolean;
};

export default defineComponent({
	components: {
		// DatePicker,
		NavigationBar,
		LoadingIcon,
	},

	setup() {
		const state: State = reactive({
			reviews: [],
			error: false,
		});

		const dataLoaded = ref(false);

		const getReviews = async () => {
			const token = cookie.get('token');

			const data = await get('pizzareviews', token);

			if (data == null) {
				state.error = true;
			} else {
				state.reviews = data;

				dataLoaded.value = true;
			}
		};

		getReviews();

		const changePeriod = () => {};

		return {
			state,
			dataLoaded,
			changePeriod,
			navigationMenuItems: navigationMenuItems.sort((a: any, b: any) => a.text.localeCompare(b.text)),
		};
	},
});
</script>
