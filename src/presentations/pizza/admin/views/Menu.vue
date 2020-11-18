<template>
	<NavigationBar :text="'Menu'" :menuIcon="true" />

	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<div class="flex justify-between mb-8">
				<h1 class="font-semibold text-2xl">Menu list</h1>

				<router-link to="/admin/add" class="w-6 h-6 flex items-center justify-center rounded-full shadow-md bg-alpha-yellow text-white text-xl">+</router-link>
			</div>

			<div class="flex flex-wrap items-center border border-dark border-opacity-5 rounded-lg shadow-md p-3">
				<div class="w-full flex justify-between items-center">
					<span>Pizza margherita</span>

					<div class="flex">
						<router-link to="/admin/edit/1">
							<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
								<path d="M0 0h24v24H0z" fill="none" />
								<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
							</svg>
						</router-link>
						<button>
							<svg fill="#999" width="24" height="24" viewBox="0 0 24 24">
								<path d="M0 0h24v24H0z" fill="none" />
								<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
							</svg>
						</button>
					</div>
				</div>

				<div class="font-semibold mt-1">
					€ 8.00
				</div>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

export default defineComponent({
	components: {
		NavigationBar,
	},

	setup() {
		const addPizza = () => {};

		const removePizza = () => {};

		return {
			addPizza,
			removePizza,
		};
	},
});
</script>
