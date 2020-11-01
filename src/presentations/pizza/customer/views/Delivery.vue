<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="text-dark font-semibold text-2xl">Enter your address</h1>

			<form class="w-full mt-8">
				<div class="flex">
					<InputField :label="'Street'" class="w-3/4 mr-3" />
					<InputField :label="'No'" class="w-1/4" />
				</div>

				<InputField :label="'City'" />

				<button class="text-white font-semibold text-lg bg-alpha-red px-12 py-2 mt-3 rounded-lg w-full shadow-md">Continue</button>
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import InputField from '@/presentations/shared/components/InputField.vue';

export default defineComponent({
	components: {
		InputField: InputField,
	},
});
</script>

<style lang="scss">
.main {
	width: 348px;
}
</style>
