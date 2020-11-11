<template>
	<div class="relative mb-6">
		<input @change="changeInputValue" class="input block border border-dark border-opacity-25 rounded shadow-md px-3 py-2 focus:outline-none w-full" :type="type ? type : 'text'" :value="value" required />
		<label class="label absolute text-opacity-75 bg-white px-3 py-1 pointer-events-none">{{ label }}</label>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		label: String,
		type: String,
		value: String,
		modelValue: {
			type: String,
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
