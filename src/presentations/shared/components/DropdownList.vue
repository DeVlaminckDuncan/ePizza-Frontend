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

<style lang="scss">
.label {
	left: 4px;
	top: 6px;
	transition: 0.2s ease all;
	-moz-transition: 0.2s ease all;
	-webkit-transition: 0.2s ease all;
}

.select {
	min-width: 8rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC) no-repeat right white;
	background-position-x: 95%;
	-webkit-appearance: none;

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
