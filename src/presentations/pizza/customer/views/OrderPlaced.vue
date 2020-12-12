<template>
	<NavigationBar text="Order placed" :backIcon="true" previousPage="/ordertype" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Thank you for your order!</h1>

			<div class="max-height-fit-screen h-screen flex flex-col justify-center">
				<p class="text-2xl">Your order has been placed ✅</p>
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
});
</script>

<style lang="scss" scoped>
.max-height-fit-screen {
	max-height: calc(100vh - 262px);
}
</style>
