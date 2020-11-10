<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Enter your address</h1>

			<form class="w-full mt-8">
				<div class="flex">
					<InputField :label="'Street'" class="w-3/4 mr-3" />
					<InputField :label="'No'" class="w-1/4" />
				</div>

				<InputField :label="'City'" />

				<ButtonWide :text="'Continue'" :color="'red'" />
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';

export default defineComponent({
	components: {
		InputField: InputField,
		ButtonWide: ButtonWide,
	},
});
</script>
