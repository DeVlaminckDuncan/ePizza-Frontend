<template>
	<div class="relative">
		<select class="select block border border-dark border-opacity-10 rounded shadow-md px-3 py-1 focus:outline-none w-full" required>
			<option class="label absolute text-opacity-75 bg-white px-3 py-1 pointer-events-none" disabled selected>{{ label }}</option>
			<option v-for="option of options" :key="option" :value="option">{{ option }}</option>
		</select>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		label: String,
		options: Array,
	},
});
</script>
