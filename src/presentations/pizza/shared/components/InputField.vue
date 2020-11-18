<template>
	<div :class="marginBottom ? 'mb-6' : ''" class="relative">
		<input @change="changeInputValue" class="input block border border-dark border-opacity-25 rounded shadow-md px-3 py-2 focus:outline-none w-full" :type="type" :value="value" :step="step" required />
		<label v-if="label" class="label absolute text-opacity-75 bg-white px-3 py-1 pointer-events-none">{{ label }}</label>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		label: String,
		type: {
			type: String,
			default: 'text',
		},
		value: String,
		modelValue: String,
		step: {
			type: Number,
			default: 1,
		},
		marginBottom: {
			type: Boolean,
			default: true,
		},
	},

	setup(props, { emit }) {
		const changeInputValue = (event: any) => {
			emit('update:modelValue', event.target.value);
		};

		return {
			changeInputValue,
		};
	},
});
</script>
