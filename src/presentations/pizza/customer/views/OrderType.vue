<template>
	<main class="px-6 py-8">
		<h1 class="text-dark font-semibold text-2xl">Choose the order type</h1>
		<div class="flex justify-center mt-8">
			<router-link to="/delivery" class="text-white font-semibold text-xl bg-alpha-yellow px-12 py-3 rounded-lg w-64 shadow-md">Delivery</router-link>
		</div>
		<div class="flex justify-center mt-6">
			<router-link to="/takeaway" class="text-white font-semibold text-xl bg-alpha-orange px-12 py-3 rounded-lg w-64 shadow-md">Takeaway</router-link>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
