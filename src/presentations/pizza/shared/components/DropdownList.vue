<template>
	<div class="relative">
		<select class="select block border border-dark border-opacity-10 rounded shadow-md px-3 py-1 focus:outline-none w-full" required>
			<option v-if="label" disabled selected>{{ label }}</option>
			<option v-for="option of options" :key="option.text" :value="option.text" :selected="option.selected">{{ option.text }}</option>
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
