<template>
	<div class="relative mb-6">
		<select class="select block border border-dark border-opacity-25 rounded shadow-md px-3 py-2 focus:outline-none w-full" required>
			<option class="label absolute text-dark text-opacity-75 bg-white px-3 py-1 pointer-events-none" disabled selected>{{ label }}</option>
			<option value="Restaurant 1">Restaurant 1</option>
			<option value="Restaurant 2">Restaurant 2</option>
			<option value="Restaurant 3">Restaurant 3</option>
		</select>
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

.select {
	background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right white;
	background-size: 12px 12px;
	@apply bg-opacity-50;
	-webkit-appearance: none;
	background-position-x: 95%;

	&:focus,
	&:valid {
		// @apply border-alpha-green;

		& ~ .label {
			padding: 2px 12px;
			top: -16px;
			font-size: 14px;
			// @apply text-alpha-green;
		}
	}
}
</style>
