<template>
	<div class="relative mb-6">
		<input class="input block border border-dark border-opacity-25 rounded shadow-md px-3 py-2 focus:outline-none w-full" type="text" required />
		<label class="label absolute text-opacity-75 bg-white px-3 py-1 pointer-events-none">{{ label }}</label>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		label: String,
	},
});
</script>

<style lang="scss">
.label {
	left: 4px;
	top: 6px;
	transition: 0.2s ease all;
	-moz-transition: 0.2s ease all;
	-webkit-transition: 0.2s ease all;
}

.input:focus,
.input:valid {
	// @apply border-alpha-green;

	& ~ .label {
		padding: 2px 12px;
		top: -16px;
		font-size: 14px;
		// @apply text-alpha-green;
	}
}
</style>
