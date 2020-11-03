<template>
	<button :class="bgClassName" class="text-white font-semibold text-lg w-24 h-8 rounded-lg shadow-md">{{ text }}</button>
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
