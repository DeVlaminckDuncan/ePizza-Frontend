<template>
	<button :class="bgClassName" class="text-white font-semibold text-lg px-12 py-2 mt-3 rounded-lg w-full shadow-md">{{ text }}</button>
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
