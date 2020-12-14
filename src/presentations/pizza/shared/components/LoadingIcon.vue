<template>
	<div v-if="showLoadingIcon" class="flex justify-center items-center m-6">
		<img :src="`${publicPath}gif/Loading.gif`" :alt="altText" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

export default defineComponent({
	props: {
		timeout: {
			type: Number,
			default: 1000,
		},
		altText: {
			type: String,
			default: 'Loading...',
		},
	},

	setup(props) {
		const showLoadingIcon: Ref<boolean> = ref(false);

		setTimeout(() => {
			showLoadingIcon.value = true;
		}, props.timeout);

		return {
			showLoadingIcon,
			publicPath: process.env.BASE_URL,
		};
	},
});
</script>
