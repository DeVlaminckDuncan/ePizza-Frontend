<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Choose the order type</h1>
			<div class="flex justify-center mt-8">
				<router-link to="/delivery" class="button-lg text-white font-semibold text-xl bg-alpha-yellow px-12 py-3 rounded-lg shadow-md">Delivery</router-link>
			</div>
			<div class="flex justify-center mt-6">
				<router-link to="/takeaway" class="button-lg text-white font-semibold text-xl bg-alpha-orange px-12 py-3 rounded-lg shadow-md">Takeaway</router-link>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss">
.main {
	width: 348px;
}

.button-lg {
	width: 312px;
}
</style>
