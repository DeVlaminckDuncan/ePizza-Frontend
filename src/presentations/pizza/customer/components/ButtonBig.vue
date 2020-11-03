<template>
	<button :class="bgClassName" class="button-lg text-white font-semibold text-2xl h-16 rounded-lg shadow-md">{{ text }}</button>
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
