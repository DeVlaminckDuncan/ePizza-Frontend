<template>
	<button :class="bgClassName" class="w-4 h-4 flex justify-center items-center text-white font-semibold text-sm rounded shadow-md">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		text: String,
		color: String,
	},

	setup(props) {
		const bgClassName = `bg-alpha-${props.color}`;

		return {
			bgClassName: bgClassName,
		};
	},
});
</script>
